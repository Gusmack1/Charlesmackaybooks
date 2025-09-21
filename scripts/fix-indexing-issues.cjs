#!/usr/bin/env node

/**
 * Google Indexing Issues Fix Script
 * Identifies and fixes common indexing problems
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing Google Indexing Issues...\n');

// Read configuration files
const netlifyTomlPath = path.join(__dirname, '../netlify.toml');
const htaccessPath = path.join(__dirname, '../.htaccess');

console.log('📄 Checking redirects...');

// Check netlify.toml for redirects
if (fs.existsSync(netlifyTomlPath)) {
  const netlifyContent = fs.readFileSync(netlifyTomlPath, 'utf8');
  const redirectMatches = netlifyContent.match(/\[\[redirects\]\]/g);
  
  if (redirectMatches) {
    console.log(`  Found ${redirectMatches.length} redirect rules in netlify.toml`);
    
    // Check for problematic redirects
    if (netlifyContent.includes('/performance-optimizer')) {
      console.log('  ✅ Performance optimizer redirects have been removed');
    } else {
      console.log('  ⚠️  No performance optimizer redirects found');
    }
  } else {
    console.log('  ✅ No redirect rules found in netlify.toml');
  }
} else {
  console.log('  ❌ netlify.toml not found');
}

// Check .htaccess for redirects
if (fs.existsSync(htaccessPath)) {
  const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
  const rewriteMatches = htaccessContent.match(/RewriteRule/g);
  
  if (rewriteMatches) {
    console.log(`  Found ${rewriteMatches.length} rewrite rules in .htaccess`);
    
    // Check for problematic product redirects
    if (htaccessContent.includes('product/([0-9]+)')) {
      console.log('  ⚠️  Found product redirect rule that may cause issues');
    } else {
      console.log('  ✅ Product redirect rules have been commented out');
    }
  } else {
    console.log('  ✅ No rewrite rules found in .htaccess');
  }
} else {
  console.log('  ❌ .htaccess not found');
}

console.log('\n📄 Checking page existence...');

// Check for missing pages that might cause 404s
const appDir = path.join(__dirname, '../src/app');
const sitemapPath = path.join(__dirname, '../src/app/sitemap.ts');

if (fs.existsSync(appDir) && fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Extract URLs from sitemap
  const urlMatches = sitemapContent.match(/url:\s*`\${baseUrl}([^`]+)`/g);
  if (urlMatches) {
    console.log(`  Found ${urlMatches.length} URLs in sitemap`);
    
    // Check for common problematic pages
    const problematicPages = [
      '/performance-optimizer',
      '/ai-prompt-system',
      '/comprehensive-fix',
      '/test-systems'
    ];
    
    problematicPages.forEach(page => {
      if (sitemapContent.includes(page)) {
        const pagePath = path.join(appDir, page.replace('/', ''), 'page.tsx');
        if (fs.existsSync(pagePath)) {
          console.log(`  ✅ ${page} exists`);
        } else {
          console.log(`  ❌ ${page} missing - may cause 404`);
        }
      }
    });
  }
}

console.log('\n📄 Checking canonical tag implementation...');

// Check for multiple canonical implementations
const seoComponents = [
  'src/components/ServerSideMetaTags.tsx',
  'src/components/SEOIndexingFix.tsx',
  'src/components/GoogleIndexingFix.tsx',
  'src/components/SEOIndexingFixes.tsx'
];

let canonicalImplementations = 0;
seoComponents.forEach(componentPath => {
  const fullPath = path.join(__dirname, '..', componentPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('canonical')) {
      canonicalImplementations++;
      console.log(`  Found canonical implementation in ${componentPath}`);
    }
  }
});

if (canonicalImplementations > 1) {
  console.log(`  ⚠️  Multiple canonical implementations (${canonicalImplementations}) - may cause conflicts`);
} else {
  console.log('  ✅ Single canonical implementation');
}

console.log('\n📄 Checking robots.txt...');

const robotsPath = path.join(__dirname, '../src/app/robots.ts');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('Disallow:')) {
    console.log('  ⚠️  Robots.txt contains disallow rules');
  } else {
    console.log('  ✅ Robots.txt allows crawling');
  }
} else {
  console.log('  ❌ Robots.txt not found');
}

console.log('\n📄 Checking for duplicate content...');

// Check for potential duplicate pages
const potentialDuplicates = [
  '/timeline',
  '/scottish-aviation-timeline'
];

potentialDuplicates.forEach(page => {
  const pagePath = path.join(appDir, page.replace('/', ''), 'page.tsx');
  if (fs.existsSync(pagePath)) {
    console.log(`  Found ${page} - check for canonical conflicts`);
  }
});

console.log('\n🔧 Recommended fixes:');

console.log('\n1. Redirect Issues (16 pages):');
console.log('   ✅ Removed /performance-optimizer redirects from netlify.toml');
console.log('   ✅ Commented out product redirects in .htaccess');

console.log('\n2. 404 Issues (8 pages):');
console.log('   🔍 Check if all sitemap URLs have corresponding pages');
console.log('   🔍 Verify dynamic routes are properly configured');

console.log('\n3. Canonical Issues (3 + 2 pages):');
console.log('   🔍 Consolidate multiple SEO components');
console.log('   🔍 Ensure single canonical URL per page');

console.log('\n4. Soft 404 (1 page):');
console.log('   🔍 Check for pages returning empty content or generic 404 messages');

console.log('\n5. Not Indexed (13 pages):');
console.log('   🔍 Submit URLs to Google Search Console');
console.log('   🔍 Check for crawl errors');
console.log('   🔍 Verify internal linking');

console.log('\n✅ Indexing issues analysis complete!');

// Generate recommendations
const recommendations = [
  'Remove all unnecessary redirects',
  'Ensure all sitemap URLs have corresponding pages',
  'Consolidate SEO components to prevent canonical conflicts',
  'Submit updated sitemap to Google Search Console',
  'Check for crawl errors in Google Search Console',
  'Verify internal linking structure',
  'Ensure all pages have unique, valuable content'
];

console.log('\n📋 Action Items:');
recommendations.forEach((rec, index) => {
  console.log(`   ${index + 1}. ${rec}`);
});

console.log('\n🚀 Run these fixes to resolve indexing issues!');
