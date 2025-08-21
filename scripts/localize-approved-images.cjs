#!/usr/bin/env node
/* eslint-disable no-console */
// Download approved images to local /public/blog-images/<slug>/ and rewrite manifest URLs
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const root = path.join(__dirname, '..');
const manifestPath = path.join(root, 'src', 'data', 'image-approvals.json');
const publicDir = path.join(root, 'public', 'blog-images');

if (!fs.existsSync(manifestPath)) {
  console.error('image-approvals.json not found at', manifestPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

function guessExtFromContentType(ct) {
  if (!ct) return '.jpg';
  if (ct.includes('image/webp')) return '.webp';
  if (ct.includes('image/avif')) return '.avif';
  if (ct.includes('image/png')) return '.png';
  if (ct.includes('image/jpeg') || ct.includes('image/jpg')) return '.jpg';
  return '.jpg';
}

function pickClient(url) {
  return url.startsWith('https') ? https : http;
}

async function downloadToFile(url, dest) {
  const client = pickClient(url);
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        return downloadToFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const ct = res.headers['content-type'] || '';
      const finalDest = dest + guessExtFromContentType(ct);
      const file = fs.createWriteStream(finalDest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(finalDest)));
      file.on('error', (err) => reject(err));
    }).on('error', reject);
  });
}

(async () => {
  ensureDir(publicDir);
  let changed = false;
  for (const [slug, rec] of Object.entries(data.posts || {})) {
    const folder = path.join(publicDir, slug);
    ensureDir(folder);
    for (let i = 0; i < (rec.candidates || []).length; i++) {
      const c = rec.candidates[i];
      if (!c.approved) continue;
      const url = c.url || '';
      const isRemote = /^https?:\/\//i.test(url);
      const alreadyLocal = url.startsWith('/blog-images/');
      if (!isRemote && alreadyLocal) continue;
      try {
        if (!isRemote) {
          console.log(`[SKIP] ${slug} candidate ${i}: not remote (${url})`);
          continue;
        }
        const baseName = sanitizeFilename(c.title || path.basename(new URL(url).pathname) || `image-${i}`);
        const withoutExt = baseName.replace(/\.[a-z0-9]+$/i, '');
        const destBase = path.join(folder, `${withoutExt}`);
        console.log(`[DL] ${slug} -> ${url}`);
        const savedPath = await downloadToFile(url, destBase);
        const rel = savedPath.replace(path.join(root, 'public'), '').replace(/\\/g, '/');
        c.url = rel;
        c.source = 'internal';
        c.license = c.license || 'owned';
        changed = true;
      } catch (err) {
        console.error(`[ERROR] Failed to download for ${slug} candidate ${i}:`, err.message);
      }
    }
  }
  if (changed) {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2));
    console.log('Manifest updated with local file paths.');
  } else {
    console.log('No changes made.');
  }
})();


