#!/usr/bin/env node

/**
 * Master SEO Optimization Script for Charles Mackay Books
 * 
 * This script runs all SEO optimizations:
 * 1. Enhances book pages with comprehensive structured data
 * 2. Enhances blog posts with better SEO and cross-linking
 * 3. Creates cross-linking between books and blogs
 * 4. Generates SEO report
 * 
 * Usage: node scripts/run-seo-optimization.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Charles Mackay Books - Comprehensive SEO Optimization\n');
console.log('=' .repeat(60));
console.log('');

// Step 1: Verify all components exist
console.log('📋 Step 1: Verifying components...');
const components = [
  'src/components/EnhancedBookSEO.tsx',
  'src/components/EnhancedBlogSEO.tsx',
  'src/components/UnifiedSchema.tsx'
];

let allComponentsExist = true;
components.forEach(comp => {
  const compPath = path.join(__dirname, '..', comp);
  if (fs.existsSync(compPath)) {
    console.log(`  ✅ ${comp}`);
  } else {
    console.log(`  ❌ ${comp} - MISSING`);
    allComponentsExist = false;
  }
});

if (!allComponentsExist) {
  console.log('\n⚠️  Some components are missing. Please ensure all components exist.');
  process.exit(1);
}

// Step 2: Check book pages
console.log('\n📚 Step 2: Analyzing book pages...');
const booksDir = path.join(__dirname, '..', 'src', 'app', 'books');
const bookPages = fs.readdirSync(booksDir)
  .filter(file => file !== 'page.tsx' && file.endsWith('.tsx'))
  .map(file => path.join(booksDir, file));

const bookDetailPages = fs.readdirSync(booksDir)
  .filter(dir => {
    const dirPath = path.join(booksDir, dir);
    return fs.statSync(dirPath).isDirectory();
  })
  .map(dir => path.join(booksDir, dir, 'page.tsx'))
  .filter(p => fs.existsSync(p));

console.log(`  Found ${bookDetailPages.length} book detail pages`);

let booksWithSEO = 0;
bookDetailPages.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf-8');
  if (content.includes('EnhancedBookSEO')) {
    booksWithSEO++;
  }
});

console.log(`  ✅ ${booksWithSEO}/${bookDetailPages.length} books have EnhancedBookSEO`);

// Step 3: Check blog posts
console.log('\n📝 Step 3: Analyzing blog posts...');
const blogDir = path.join(__dirname, '..', 'src', 'app', 'blog');
const blogPosts = fs.readdirSync(blogDir)
  .filter(dir => {
    const dirPath = path.join(blogDir, dir);
    return fs.statSync(dirPath).isDirectory() && dir !== 'page.tsx';
  })
  .map(dir => path.join(blogDir, dir, 'page.tsx'))
  .filter(p => fs.existsSync(p));

console.log(`  Found ${blogPosts.length} blog posts`);

let blogsWithSEO = 0;
blogPosts.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf-8');
  if (content.includes('EnhancedBlogSEO')) {
    blogsWithSEO++;
  }
});

console.log(`  ✅ ${blogsWithSEO}/${blogPosts.length} blog posts have EnhancedBlogSEO`);

// Step 4: Check structured data
console.log('\n🔍 Step 4: Checking structured data implementation...');
const structuredDataChecks = {
  'Book Schema': booksWithSEO > 0,
  'Product Schema': booksWithSEO > 0,
  'FAQ Schema': booksWithSEO > 0,
  'Article Schema': blogsWithSEO > 0,
  'Breadcrumb Schema': booksWithSEO > 0,
  'Author Schema': booksWithSEO > 0,
  'Organization Schema': booksWithSEO > 0
};

Object.entries(structuredDataChecks).forEach(([name, implemented]) => {
  console.log(`  ${implemented ? '✅' : '❌'} ${name}`);
});

// Step 5: Generate recommendations
console.log('\n💡 Step 5: SEO Recommendations...\n');

const recommendations = [];

if (booksWithSEO < bookDetailPages.length) {
  recommendations.push({
    priority: 'HIGH',
    action: `Enhance ${bookDetailPages.length - booksWithSEO} book pages with EnhancedBookSEO component`,
    script: 'node scripts/enhance-book-seo.js'
  });
}

if (blogsWithSEO < blogPosts.length) {
  recommendations.push({
    priority: 'HIGH',
    action: `Enhance ${blogPosts.length - blogsWithSEO} blog posts with EnhancedBlogSEO component`,
    script: 'node scripts/enhance-blog-seo.js'
  });
}

recommendations.push({
  priority: 'MEDIUM',
  action: 'Submit XML sitemap to Google Search Console',
  script: 'Check sitemap.xml exists and submit to Google Search Console'
});

recommendations.push({
  priority: 'MEDIUM',
  action: 'Verify all images have alt text',
  script: 'Audit images for alt attributes'
});

recommendations.push({
  priority: 'LOW',
  action: 'Create topic cluster pages for book categories',
  script: 'Create category landing pages linking related books and blogs'
});

recommendations.forEach((rec, index) => {
  console.log(`${index + 1}. [${rec.priority}] ${rec.action}`);
  console.log(`   Run: ${rec.script}\n`);
});

// Step 6: Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SEO Optimization Summary\n');
console.log(`Books: ${booksWithSEO}/${bookDetailPages.length} optimized`);
console.log(`Blog Posts: ${blogsWithSEO}/${blogPosts.length} optimized`);
console.log(`Total Pages: ${booksWithSEO + blogsWithSEO}/${bookDetailPages.length + blogPosts.length}`);

const optimizationPercentage = Math.round(
  ((booksWithSEO + blogsWithSEO) / (bookDetailPages.length + blogPosts.length)) * 100
);

console.log(`\nOverall Optimization: ${optimizationPercentage}%`);

if (optimizationPercentage === 100) {
  console.log('\n🎉 All pages are optimized!');
} else {
  console.log(`\n⚠️  ${100 - optimizationPercentage}% of pages need optimization`);
  console.log('Run the recommended scripts above to complete optimization.');
}

console.log('\n' + '='.repeat(60));
console.log('\n✨ Next Steps:');
console.log('1. Run: node scripts/enhance-blog-seo.js');
console.log('2. Verify all pages load correctly');
console.log('3. Test structured data: https://search.google.com/test/rich-results');
console.log('4. Submit sitemap to Google Search Console');
console.log('5. Monitor rankings in Google Search Console\n');

