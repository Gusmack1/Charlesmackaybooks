/*
 Refresh blog images uniquely per post by fetching 4+ high-quality, freely-licensed images
 from Wikimedia Commons and writing a manifest used by templates.
 - Deletes any existing images matching the slug prefix in public/blog-images/<slug>-*.jpg
 - Fetches suitable images per slug based on title + tags heuristics
 - Saves as public/blog-images/<slug>-N.jpg
 - Updates src/data/blogImageManifest.ts with entries per slug
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'blog-images');
const MANIFEST_TS = path.join(ROOT, 'src', 'data', 'blogImageManifest.ts');

function readFile(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } }
function writeFile(p, data) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data, 'utf8'); }

function getSlugs() {
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(n => n !== 'layout.tsx' && n !== 'page.tsx');
}

function extractTitleTags(src) {
  // crude extraction of title and tags from page.tsx source
  const titleMatch = src.match(/title:\s*`([^`]+)`|title:\s*'([^']+)'|title:\s*"([^"]+)"/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]) : '';
  const tagsMatch = src.match(/tags:\s*\[([^\]]+)\]/);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch[1].split(',').map(s => s.replace(/['"`]/g,'').trim()).filter(Boolean);
  }
  return { title, tags };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'CharlesMackayBooksBot/1.0 (+https://charlesmackaybooks.com/contact) images-refresh-script',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data='';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'CharlesMackayBooksBot/1.0 (+https://charlesmackaybooks.com/contact) images-refresh-script'
      }
    }, (res) => {
      if (res.statusCode !== 200) { return reject(new Error('HTTP '+res.statusCode)); }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', (err) => { fs.unlink(dest, () => reject(err)); });
  });
}

function licenseOk(meta) {
  const lic = meta?.LicenseShortName?.value || '';
  const licenses = ['public domain','cc0','cc-by','cc-by-sa'];
  return licenses.some(l => lic.toLowerCase().includes(l));
}

async function queryWikimedia(query) {
  const api = 'https://commons.wikimedia.org/w/api.php';
  const url = `${api}?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=20&prop=imageinfo|info&iiprop=url|extmetadata&iiurlwidth=2000&format=json&origin=*`;
  const json = await fetchJson(url);
  const pages = json?.query?.pages ? Object.values(json.query.pages) : [];
  const items = [];
  for (const p of pages) {
    const ii = p.imageinfo && p.imageinfo[0];
    if (!ii) continue;
    const meta = ii.extmetadata || {};
    if (!licenseOk(meta)) continue;
    const url = ii.thumburl || ii.url;
    if (!url || /(svg|gif)$/i.test(url)) continue; // skip svg/gif
    const desc = meta.ImageDescription?.value?.replace(/<[^>]+>/g, '') || p.title || '';
    items.push({ url, alt: desc.slice(0, 140) || 'Historical image', caption: desc.slice(0, 200) });
  }
  return items;
}

function readManifestTs() {
  const src = readFile(MANIFEST_TS) || '';
  return src;
}

function updateManifestTs(src, slug, images) {
  // naive injection: if slug exists replace array, else add entry in bySlug
  const key = `'${slug}': [`;
  if (src.includes(key)) {
    // replace inner array
    const pattern = new RegExp(`('${slug}': \[)[\s\S]*?\]`, 'm');
    const arr = images.map(i => `    { url: '${i.local}', alt: '${(i.alt||'').replace(/'/g, "\\'")}' }`).join(',\n');
    return src.replace(pattern, `$1\n${arr}\n  ]`);
  } else {
    const insertPoint = src.indexOf('const bySlug:');
    if (insertPoint === -1) return src;
    const open = src.indexOf('{', insertPoint);
    const arr = images.map(i => `    { url: '${i.local}', alt: '${(i.alt||'').replace(/'/g, "\\'")}' }`).join(',\n');
    const injected = `  '${slug}': [\n${arr}\n  ],\n`;
    return src.slice(0, open+1) + '\n' + injected + src.slice(open+1);
  }
}

async function processSlug(slug) {
  const pagePath = path.join(BLOG_DIR, slug, 'page.tsx');
  const src = readFile(pagePath) || '';
  const { title, tags } = extractTitleTags(src);
  const query = [title || slug, ...(tags||[])].filter(Boolean).join(' ');
  // delete existing slug-prefixed images
  const files = fs.readdirSync(PUBLIC_IMAGES).filter(f => f.startsWith(`${slug}-`));
  for (const f of files) fs.unlinkSync(path.join(PUBLIC_IMAGES, f));
  // fetch from commons
  const items = await queryWikimedia(query);
  const picked = items.slice(0, 6); // try up to 6
  const saved = [];
  let idx = 1;
  for (const it of picked) {
    const ext = path.extname(new URL(it.url).pathname) || '.jpg';
    const local = `/blog-images/${slug}-${idx}${ext}`;
    const dest = path.join(PUBLIC_IMAGES, `${slug}-${idx}${ext}`);
    try {
      await download(it.url, dest);
      saved.push({ local, alt: it.alt || '', caption: it.caption || '' });
      idx++;
      if (saved.length >= 4) break;
      await sleep(300);
    } catch (e) {
      // skip failed download
    }
  }
  return { slug, images: saved };
}

(async () => {
  const slugs = getSlugs();
  const existing = readManifestTs();
  let manifestSrc = existing || readFile(MANIFEST_TS) || '';
  if (!manifestSrc) {
    console.error('Manifest TS not found.');
    process.exit(1);
  }
  for (const slug of slugs) {
    console.log('Refreshing images for', slug);
    try {
      const { images } = await processSlug(slug);
      if (images.length >= 4) {
        manifestSrc = updateManifestTs(manifestSrc, slug, images);
      } else {
        console.warn(`Insufficient images for ${slug} (got ${images.length}).`);
      }
      await sleep(500);
    } catch (e) {
      console.warn('Failed for', slug, e.message);
    }
  }
  writeFile(MANIFEST_TS, manifestSrc);
  console.log('Done. Manifest updated.');
})();


