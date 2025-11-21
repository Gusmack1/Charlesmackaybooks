#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Download approved remote images into /public/blog-images/<slug>/ and rewrite manifest URLs.
 * Usage:
 *   node scripts/localize-approved-images.cjs                    # all slugs
 *   node scripts/localize-approved-images.cjs spitfire ...       # specific slugs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const manifestPath = path.join(ROOT, 'src', 'data', 'image-approvals.json');
const publicDir = path.join(ROOT, 'public', 'blog-images');
const TARGET_SLUGS = process.argv.slice(2).map((arg) => arg.toLowerCase());

if (!fs.existsSync(manifestPath)) {
  console.error('image-approvals.json not found at', manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugMatchesFilter(slug) {
  if (!TARGET_SLUGS.length) return true;
  return TARGET_SLUGS.includes(slug.toLowerCase());
}

function guessExtension(contentType = '') {
  if (contentType.includes('image/webp')) return '.webp';
  if (contentType.includes('image/avif')) return '.avif';
  if (contentType.includes('image/png')) return '.png';
  if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) return '.jpg';
  return '.jpg';
}

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

function chooseClient(url) {
  return url.startsWith('https') ? https : http;
}

function downloadToFile(url, destBase) {
  ensureDir(path.dirname(destBase));
  const client = chooseClient(url);
  return new Promise((resolve, reject) => {
    const request = client.get(
      url,
      {
        headers: {
          'User-Agent': 'CharlesMackayBooks/1.0 (+https://charlesmackaybooks.com)',
          Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(downloadToFile(res.headers.location, destBase));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const ext = guessExtension(res.headers['content-type'] || '');
        const dest = `${destBase}${ext}`;
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
        file.on('error', reject);
      }
    );
    request.on('error', reject);
  });
}

(async () => {
  ensureDir(publicDir);
  let downloaded = 0;
  let skipped = 0;

  for (const [slug, record] of Object.entries(manifest.posts || {})) {
    if (!slugMatchesFilter(slug)) continue;

    const folder = path.join(publicDir, slug);
    ensureDir(folder);

    for (const [index, candidate] of (record.candidates || []).entries()) {
      if (!candidate.approved) continue;
      const url = candidate.url || '';
      const isRemote = /^https?:\/\//i.test(url);
      if (!isRemote && url.startsWith('/blog-images/')) {
        skipped += 1;
        continue;
      }

      if (!isRemote) {
        console.warn(`[WARN] ${slug} candidate ${index}: URL is not remote (${url}). Skipping.`);
        skipped += 1;
        continue;
      }

      try {
        const baseName = sanitizeFilename(candidate.title || path.basename(new URL(url).pathname) || `image-${index}`);
        const destBase = path.join(folder, baseName.replace(/\.[a-z0-9]+$/i, ''));
        console.log(`[DL] ${slug} -> ${url}`);
        const savedPath = await downloadToFile(url, destBase);
        candidate.url = savedPath.replace(path.join(ROOT, 'public'), '').replace(/\\/g, '/');
        candidate.source = 'internal';
        candidate.license = candidate.license || 'owned';
        downloaded += 1;
      } catch (error) {
        console.error(`[ERROR] Failed to download for ${slug} candidate ${index}: ${error.message}`);
      }
    }
  }

  manifest.updatedAt = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('\nLocalization summary:');
  console.log(`  Downloaded: ${downloaded}`);
  console.log(`  Skipped (already local / invalid): ${skipped}`);
})();


