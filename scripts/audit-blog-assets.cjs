// Audit blog posts for image assets and approvals status
// Outputs data/blog-assets-audit.json

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const APPROVALS_PATH = path.join(ROOT, 'data', 'image-approvals.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'blog-assets-audit.json');

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function getSubdirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  } catch {
    return [];
  }
}

function extractFeaturedUrl(source) {
  // naive regex to find featuredImage.url or featuredImage: { url: '...' }
  const m1 = source.match(/featuredImage\s*:\s*\{[\s\S]*?url\s*:\s*['"]([^'"]+)['"]/);
  if (m1) return m1[1];
  const m2 = source.match(/featuredImage\.url\s*[,}]\s*['"]?([^'"}]+)['"]?/);
  if (m2) return m2[1];
  return null;
}

function countPlaceholders(source) {
  const matches = source.match(/\/blog-images\/default-generic\.svg/g) || [];
  return matches.length;
}

function loadApprovals() {
  const raw = readFileSafe(APPROVALS_PATH);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function getApprovalStats(approvals, slug) {
  const rec = approvals && approvals.posts ? approvals.posts[slug] : null;
  if (!rec) return { approvedCount: 0, requiredCount: 0, pendingCount: 0 };
  const approvedCount = (rec.candidates || []).filter(c => c.approved && c.url).length;
  const requiredCount = Number(rec.requiredCount || 0);
  const pendingCount = Math.max(0, requiredCount - approvedCount);
  return { approvedCount, requiredCount, pendingCount };
}

function main() {
  const approvals = loadApprovals();
  const slugs = getSubdirs(BLOG_DIR).filter(s => s !== 'layout.tsx' && s !== 'page.tsx');
  const report = [];

  for (const slug of slugs) {
    const pagePath = path.join(BLOG_DIR, slug, 'page.tsx');
    const src = readFileSafe(pagePath);
    if (!src) continue;
    const featured = extractFeaturedUrl(src) || '';
    const featuredIsDefault = featured.trim() === '/blog-images/default-generic.svg';
    const placeholdersInContent = countPlaceholders(src);
    const stats = getApprovalStats(approvals, slug);
    report.push({
      slug,
      featuredUrl: featured,
      featuredIsDefault,
      placeholdersInContent,
      approvedCount: stats.approvedCount,
      requiredCount: stats.requiredCount,
      pendingCount: stats.pendingCount
    });
  }

  // Ensure data directory exists
  const dataDir = path.join(ROOT, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2), 'utf8');

  // Print summary
  const total = report.length;
  const needsFeatured = report.filter(r => r.featuredIsDefault).length;
  const hasPlaceholders = report.filter(r => r.placeholdersInContent > 0).length;
  const pendingImages = report.reduce((sum, r) => sum + r.pendingCount, 0);

  console.log(`Blog assets audit complete.`);
  console.log(`Posts scanned: ${total}`);
  console.log(`Posts needing featured image: ${needsFeatured}`);
  console.log(`Posts with inline placeholders: ${hasPlaceholders}`);
  console.log(`Total pending approved images: ${pendingImages}`);
  console.log(`Report written to: ${OUTPUT_PATH}`);
}

main();


