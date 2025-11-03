/*
 * Audit and Remove Broken Images Script
 * 
 * Scans all blog posts for broken image references and:
 * 1. Generates a report of broken images
 * 2. Optionally removes broken image references from blog posts
 * 3. Logs all changes for review
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'blog-images');
const REPORT_FILE = path.join(ROOT, 'broken-images-report.json');

function readFile(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (e) {
    return null;
  }
}

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function getBlogSlugs() {
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(n => n !== 'layout.tsx' && n !== 'page.tsx');
}

function extractImageUrls(content) {
  const imageUrls = [];
  
  // Match img tags with src attributes
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgTagRegex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  
  // Match featuredImage URLs
  const featuredImageRegex = /featuredImage:\s*\{[^}]*url:\s*["']([^"']+)["']/gi;
  while ((match = featuredImageRegex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  
  // Match relatedPosts image URLs
  const relatedImageRegex = /image:\s*["']([^"']+)["']/gi;
  while ((match = relatedImageRegex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  
  return [...new Set(imageUrls)]; // Remove duplicates
}

function checkImageExists(imageUrl) {
  // Handle relative URLs
  if (imageUrl.startsWith('/')) {
    const filePath = path.join(ROOT, 'public', imageUrl.substring(1));
    return fileExists(filePath);
  }
  
  // Handle absolute URLs (external images)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return true; // Assume external URLs are valid (could enhance with HTTP check)
  }
  
  // Handle data URIs
  if (imageUrl.startsWith('data:')) {
    return true;
  }
  
  return false;
}

function auditBlogPosts() {
  const slugs = getBlogSlugs();
  const report = {
    timestamp: new Date().toISOString(),
    totalPosts: slugs.length,
    postsWithBrokenImages: [],
    brokenImageCount: 0,
    brokenImages: {}
  };
  
  console.log(`\n🔍 Auditing ${slugs.length} blog posts...\n`);
  
  for (const slug of slugs) {
    const pageFile = path.join(BLOG_DIR, slug, 'page.tsx');
    const content = readFile(pageFile);
    
    if (!content) {
      console.log(`⚠️  Could not read: ${pageFile}`);
      continue;
    }
    
    const imageUrls = extractImageUrls(content);
    const brokenImages = [];
    
    for (const imageUrl of imageUrls) {
      if (!checkImageExists(imageUrl)) {
        brokenImages.push(imageUrl);
        report.brokenImageCount++;
        
        if (!report.brokenImages[slug]) {
          report.brokenImages[slug] = [];
        }
        report.brokenImages[slug].push(imageUrl);
      }
    }
    
    if (brokenImages.length > 0) {
      report.postsWithBrokenImages.push({
        slug,
        brokenCount: brokenImages.length,
        images: brokenImages
      });
      
      console.log(`❌ ${slug}: ${brokenImages.length} broken image(s)`);
      brokenImages.forEach(img => console.log(`   - ${img}`));
    } else {
      console.log(`✅ ${slug}: All images valid`);
    }
  }
  
  // Save report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`\n📊 Report saved to: ${REPORT_FILE}`);
  console.log(`\nSummary:`);
  console.log(`  Total posts: ${report.totalPosts}`);
  console.log(`  Posts with broken images: ${report.postsWithBrokenImages.length}`);
  console.log(`  Total broken images: ${report.brokenImageCount}`);
  
  return report;
}

function removeBrokenImagesFromPost(slug, brokenImages, dryRun = true) {
  const pageFile = path.join(BLOG_DIR, slug, 'page.tsx');
  let content = readFile(pageFile);
  
  if (!content) {
    return { success: false, reason: 'Could not read file' };
  }
  
  let changes = [];
  let modifiedContent = content;
  
  for (const imageUrl of brokenImages) {
    // Remove img tags with broken URLs
    const imgTagRegex = new RegExp(`<img[^>]+src=["']${imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi');
    const before = modifiedContent;
    modifiedContent = modifiedContent.replace(imgTagRegex, '<!-- Broken image removed: ' + imageUrl + ' -->');
    
    if (before !== modifiedContent) {
      changes.push(`Removed img tag: ${imageUrl}`);
    }
    
    // Remove div wrappers that only contain broken images
    modifiedContent = modifiedContent.replace(
      new RegExp(`<div[^>]*>\\s*<!-- Broken image removed: ${imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} -->\\s*</div>`, 'gi'),
      ''
    );
  }
  
  if (!dryRun && modifiedContent !== content) {
    fs.writeFileSync(pageFile, modifiedContent, 'utf8');
    return { success: true, changes };
  }
  
  return { success: true, changes, dryRun: true };
}

function removeBrokenImages(dryRun = true) {
  const report = readFile(REPORT_FILE);
  
  if (!report) {
    console.log('❌ No report found. Run audit first.');
    return;
  }
  
  const data = JSON.parse(report);
  
  console.log(`\n🗑️  ${dryRun ? 'DRY RUN: ' : ''}Removing broken images...\n`);
  
  for (const post of data.postsWithBrokenImages) {
    console.log(`Processing: ${post.slug}`);
    const result = removeBrokenImagesFromPost(post.slug, post.images, dryRun);
    
    if (result.success && result.changes.length > 0) {
      console.log(`  Made ${result.changes.length} change(s)`);
      if (dryRun) {
        result.changes.forEach(change => console.log(`    - ${change}`));
      }
    }
  }
  
  if (dryRun) {
    console.log('\n⚠️  This was a DRY RUN. No files were modified.');
    console.log('Run with --remove flag to actually remove broken images.');
  }
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

if (command === 'audit') {
  auditBlogPosts();
} else if (command === 'remove') {
  const dryRun = !args.includes('--confirm');
  removeBrokenImages(dryRun);
} else {
  console.log(`
Usage:
  node audit-and-remove-broken-images.js audit          - Audit all blog posts for broken images
  node audit-and-remove-broken-images.js remove        - Dry run removal of broken images
  node audit-and-remove-broken-images.js remove --confirm - Actually remove broken images
  
The audit command will create a report at: ${REPORT_FILE}
  `);
}

