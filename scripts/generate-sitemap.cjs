#!/usr/bin/env node
/**
 * Generates sitemap.xml at build time.
 * Run before next build so public/sitemap.xml is included in the deployment.
 * Fixes Netlify 500 where fs is unavailable at sitemap request time.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://charlesmackaybooks.com';

function toUrl(route) {
  const p = route === '/' || route === '' ? '' : (route.startsWith('/') ? route : `/${route}`);
  return `${BASE_URL}${p}`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap() {
  const now = new Date().toISOString().split('T')[0];
  const urls = [];

  // Static pages
  const staticPaths = [
    '/', '/books', '/blog', '/about', '/how-to-order', '/contact', '/for-researchers',
    '/aviation-bibliography', '/aviation-glossary', '/aviation-news', '/academic-resources',
    '/faq', '/research-guides', '/golden-age-1918-1939', '/great-war-1914-1918',
    '/pioneer-era-1895-1914', '/scottish-aviation-timeline', '/categories', '/returns',
    '/delivery', '/support', '/privacy', '/terms', '/partnerships/imperial-war-museum',
    '/glasgow-aviation-history'
  ];
  staticPaths.forEach((p) => urls.push({ loc: toUrl(p), lastmod: now, changefreq: p === '/aviation-news' ? 'daily' : 'monthly', priority: p === '/' ? '1.0' : '0.8' }));

  // Books
  try {
    const booksPath = path.join(ROOT, 'src', 'data', 'books.ts');
    const booksContent = fs.readFileSync(booksPath, 'utf8');
    const idMatches = booksContent.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    for (const m of idMatches) urls.push({ loc: toUrl(`/books/${m[1]}`), lastmod: now, changefreq: 'weekly', priority: '0.9' });
  } catch (e) {
    console.warn('[generate-sitemap] Could not read books:', e.message);
  }

  // Blog
  try {
    const blogDir = path.join(ROOT, 'src', 'app', 'blog');
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && fs.existsSync(path.join(blogDir, e.name, 'page.tsx')))
        .forEach((e) => urls.push({ loc: toUrl(`/blog/${e.name}`), lastmod: now, changefreq: 'monthly', priority: '0.8' }));
    }
  } catch (e) {
    console.warn('[generate-sitemap] Could not read blog:', e.message);
  }

  // Categories (from books + fallbacks)
  const cats = new Set(['scottish-aviation-history', 'wwi-aviation', 'wwii-aviation', 'aviation-biography', 'helicopter-history', 'aviation-history', 'military-history', 'naval-aviation', 'jet-age-aviation', 'industrial-history', 'travel-literature']);
  cats.forEach((c) => urls.push({ loc: toUrl(`/category/${c}`), lastmod: now, changefreq: 'weekly', priority: '0.75' }));

  // News (indexable only)
  try {
    const newsRoot = path.join(ROOT, 'data', 'news-articles');
    if (fs.existsSync(newsRoot)) {
      const listJson = (dir) => {
        const out = [];
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, e.name);
          if (e.isDirectory()) out.push(...listJson(full));
          else if (e.name.endsWith('.json')) out.push(full);
        }
        return out;
      };
      const countWords = (s) => (s || '').split(/\s+/).filter(Boolean).length;
      for (const fp of listJson(newsRoot)) {
        try {
          const rec = JSON.parse(fs.readFileSync(fp, 'utf8'));
          if (!rec.slug || rec.status === 'draft') continue;
          const sections = rec.sections || [];
          const text = sections.map((s) => s?.content || '').join(' ');
          const wc = rec.wordCount || countWords(text);
          const sc = sections.filter((s) => s?.content?.trim()).length;
          if (wc >= 180 || (wc >= 100 && sc >= 2)) {
            urls.push({ loc: toUrl(`/aviation-news/${rec.slug}`), lastmod: now, changefreq: 'daily', priority: '0.7' });
          }
        } catch (_) {}
      }
    }
  } catch (e) {
    console.warn('[generate-sitemap] Could not read news:', e.message);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outPath = path.join(ROOT, 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`[generate-sitemap] Wrote ${urls.length} URLs to public/sitemap.xml`);
}

buildSitemap();
