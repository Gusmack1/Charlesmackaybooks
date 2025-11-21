#!/usr/bin/env node
/**
 * Audit blog posts for featured image coverage and placeholder usage.
 * Usage:
 *   node scripts/audit-blog-assets.cjs                 # audit all posts
 *   node scripts/audit-blog-assets.cjs hms-argus ...   # audit specific slugs (case-insensitive)
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const APPROVALS_PATH = path.join(ROOT, 'data', 'image-approvals.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'blog-assets-audit.json');
const TARGET_SLUGS = process.argv.slice(2).map((arg) => arg.toLowerCase());

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function loadBlogSlugs() {
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

function extractFeaturedUrl(source) {
  const primary = source.match(/featuredImage\s*:\s*\{[\s\S]*?url\s*:\s*['"]([^'"]+)['"]/);
  if (primary) return primary[1];
  const fallback = source.match(/featuredImage\.url\s*[,}]\s*['"]?([^'"}]+)['"]?/);
  return fallback ? fallback[1] : '';
}

function countPlaceholders(source) {
  return (source.match(/\/blog-images\/default-generic\.svg/g) || []).length;
}

function loadApprovals() {
  const raw = readFileSafe(APPROVALS_PATH);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getApprovalStats(approvals, slug) {
  const rec = approvals && approvals.posts ? approvals.posts[slug] : null;
  if (!rec) return { approvedCount: 0, requiredCount: 0, pendingCount: 0 };
  const approvedCount = (rec.candidates || []).filter((c) => c.approved && c.url).length;
  const requiredCount = Number(rec.requiredCount || 0);
  const pendingCount = Math.max(0, requiredCount - approvedCount);
  return { approvedCount, requiredCount, pendingCount };
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

function ensureDataDir() {
  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  }
}

function main() {
  const approvals = loadApprovals();
  const availableSlugs = loadBlogSlugs();
  const { slugs, missing } = resolveSlugs(availableSlugs);

  if (missing.length) {
    console.warn(`Requested slug(s) not found: ${missing.join(', ')}`);
  }
  if (!slugs.length) {
    console.error('No blog posts matched the requested filters.');
    process.exit(1);
  }

  const report = [];
  for (const slug of slugs) {
    const source = readFileSafe(path.join(BLOG_DIR, slug, 'page.tsx'));
    if (!source) continue;
    const stats = getApprovalStats(approvals, slug);
    const featuredUrl = extractFeaturedUrl(source);
    report.push({
      slug,
      featuredUrl,
      featuredIsDefault: featuredUrl.trim() === '/blog-images/default-generic.svg',
      placeholdersInContent: countPlaceholders(source),
      approvedCount: stats.approvedCount,
      requiredCount: stats.requiredCount,
      pendingCount: stats.pendingCount,
    });
  }

  ensureDataDir();
  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2),
    'utf8'
  );

  const total = report.length;
  const needsFeatured = report.filter((row) => row.featuredIsDefault).length;
  const hasPlaceholders = report.filter((row) => row.placeholdersInContent > 0).length;
  const pendingImages = report.reduce((sum, row) => sum + row.pendingCount, 0);

  console.log('Blog assets audit complete.');
  console.log(`Posts scanned: ${total}`);
  console.log(`Needing better featured image: ${needsFeatured}`);
  console.log(`Posts with inline placeholders: ${hasPlaceholders}`);
  console.log(`Total pending approved images: ${pendingImages}`);
  console.log(`Report written to: ${OUTPUT_PATH}`);
}

main();


