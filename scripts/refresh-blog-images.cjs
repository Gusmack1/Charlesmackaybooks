#!/usr/bin/env node
/**
 * Refresh Wikimedia-sourced blog images and update the manifest.
 * Usage:
 *   node scripts/refresh-blog-images.cjs                   # all posts
 *   node scripts/refresh-blog-images.cjs hms-argus ...     # specific slugs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'blog-images');
const MANIFEST_TS = path.join(ROOT, 'src', 'data', 'blogImageManifest.ts');
const TARGET_SLUGS = process.argv.slice(2).map((arg) => arg.toLowerCase());

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getBlogSlugs() {
  try {
    return fs
      .readdirSync(BLOG_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => fs.existsSync(path.join(BLOG_DIR, slug, 'page.tsx')));
  } catch {
    return [];
  }
}

function resolveSlugs(allSlugs) {
  if (!TARGET_SLUGS.length) return { slugs: allSlugs, missing: [] };
  const normalized = allSlugs.map((slug) => slug.toLowerCase());
  const resolved = [];
  const missing = [];
  for (const target of TARGET_SLUGS) {
    const idx = normalized.indexOf(target);
    if (idx >= 0) {
      resolved.push(allSlugs[idx]);
    } else {
      missing.push(target);
    }
  }
  return { slugs: [...new Set(resolved)], missing };
}

function extractTitleAndTags(source) {
  const titleMatch = source.match(/title:\s*`([^`]+)`|title:\s*'([^']+)'|title:\s*"([^"]+)"/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]) : '';
  const tagsMatch = source.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(',')
        .map((token) => token.replace(/['"`]/g, '').trim())
        .filter(Boolean)
    : [];
  return { title, tags };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'CharlesMackayBooksBot/1.0 (+https://charlesmackaybooks.com/contact)',
            Accept: 'application/json',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (err) {
              reject(err);
            }
          });
        }
      )
      .on('error', reject);
  });
}

function download(url, dest) {
  ensureDir(path.dirname(dest));
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'CharlesMackayBooksBot/1.0 (+https://charlesmackaybooks.com/contact)',
            Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return resolve(download(res.headers.location, dest));
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          const ext = guessExtension(res.headers['content-type']);
          const finalDest = `${dest}${ext}`;
          const file = fs.createWriteStream(finalDest);
          res.pipe(file);
          file.on('finish', () => file.close(() => resolve(finalDest)));
          file.on('error', reject);
        }
      )
      .on('error', reject);
  });
}

function guessExtension(contentType = '') {
  if (contentType.includes('image/webp')) return '.webp';
  if (contentType.includes('image/avif')) return '.avif';
  if (contentType.includes('image/png')) return '.png';
  return '.jpg';
}

async function queryWikimedia(query) {
  const endpoint = 'https://commons.wikimedia.org/w/api.php';
  const url = `${endpoint}?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrlimit=25&prop=imageinfo|info&iiprop=url|extmetadata&iiurlwidth=2000&format=json&origin=*`;
  const json = await fetchJson(url);
  const pages = json?.query?.pages ? Object.values(json.query.pages) : [];
  const items = [];
  for (const page of pages) {
    const info = page.imageinfo && page.imageinfo[0];
    if (!info || !info.extmetadata) continue;
    if (!isLicenseAllowed(info.extmetadata)) continue;
    const imageUrl = info.thumburl || info.url;
    if (!imageUrl || /\.(svg|gif)$/i.test(imageUrl)) continue;
    const cleaned = (info.extmetadata.ImageDescription?.value || page.title || '').replace(/<[^>]+>/g, '');
    items.push({
      url: imageUrl,
      alt: cleaned.slice(0, 140) || 'Historical image',
      caption: cleaned.slice(0, 200),
    });
  }
  return items;
}

function isLicenseAllowed(meta) {
  const license = (meta?.LicenseShortName?.value || '').toLowerCase();
  return ['public domain', 'cc0', 'cc-by', 'cc-by-sa'].some((token) => license.includes(token));
}

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

function updateManifest(manifestSrc, slug, images) {
  const key = `'${slug}': [`;
  const entry = images
    .map(
      (image) =>
        `    { url: '${image.local}', alt: '${(image.alt || '').replace(/'/g, "\\'")}', caption: '${(image.caption || '').replace(/'/g, "\\'")}' }`
    )
    .join(',\n');

  if (manifestSrc.includes(key)) {
    const pattern = new RegExp(`('${slug}': \\[)[\\s\\S]*?\\]`, 'm');
    return manifestSrc.replace(pattern, `$1\n${entry}\n  ]`);
  }

  const anchor = 'const bySlug:';
  const anchorIndex = manifestSrc.indexOf(anchor);
  if (anchorIndex === -1) return manifestSrc;
  const braceIndex = manifestSrc.indexOf('{', anchorIndex);
  const injection = `  '${slug}': [\n${entry}\n  ],\n`;
  return `${manifestSrc.slice(0, braceIndex + 1)}\n${injection}${manifestSrc.slice(braceIndex + 1)}`;
}

async function refreshSlug(slug) {
  const pagePath = path.join(BLOG_DIR, slug, 'page.tsx');
  const source = readFileSafe(pagePath);
  if (!source) return { slug, images: [] };
  const { title, tags } = extractTitleAndTags(source);
  const query = [title, ...tags, slug].filter(Boolean).join(' ');

  ensureDir(PUBLIC_IMAGES);
  for (const file of fs.readdirSync(PUBLIC_IMAGES)) {
    if (file.startsWith(`${slug}-`)) {
      fs.unlinkSync(path.join(PUBLIC_IMAGES, file));
    }
  }

  const wikimediaResults = await queryWikimedia(query);
  const images = [];
  let index = 1;
  for (const item of wikimediaResults) {
    const extless = sanitizeFilename(item.alt || `${slug}-${index}`);
    const destBase = path.join(PUBLIC_IMAGES, `${slug}-${extless}-${index}`);
    try {
      const savedPath = await download(item.url, destBase);
      const relative = savedPath.replace(path.join(ROOT, 'public'), '').replace(/\\/g, '/');
      images.push({ local: relative, alt: item.alt || '', caption: item.caption || '' });
      if (images.length >= 4) break;
      index += 1;
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.warn(`[WARN] Download failed for ${slug}: ${error.message}`);
    }
  }
  return { slug, images };
}

function readManifestSource() {
  const src = readFileSafe(MANIFEST_TS);
  if (!src) {
    console.error(`Manifest file not found at ${MANIFEST_TS}`);
    process.exit(1);
  }
  return src;
}

async function main() {
  const availableSlugs = getBlogSlugs();
  const { slugs, missing } = resolveSlugs(availableSlugs);
  if (missing.length) {
    console.warn(`Requested slug(s) not found: ${missing.join(', ')}`);
  }
  if (!slugs.length) {
    console.error('No blog posts matched the provided filters.');
    process.exit(1);
  }

  let manifestSrc = readManifestSource();
  const successful = [];

  for (const slug of slugs) {
    console.log(`Refreshing images for ${slug}...`);
    const { images } = await refreshSlug(slug);
    if (images.length >= 4) {
      manifestSrc = updateManifest(manifestSrc, slug, images);
      successful.push(slug);
    } else {
      console.warn(`  ↳ Only found ${images.length} usable images (need at least 4). Skipping manifest update.`);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  fs.writeFileSync(MANIFEST_TS, manifestSrc, 'utf8');
  console.log(`\nRefresh complete. Updated manifest entries for ${successful.length} slug(s).`);
}

main().catch((err) => {
  console.error('Unexpected error while refreshing images:', err);
  process.exit(1);
});


