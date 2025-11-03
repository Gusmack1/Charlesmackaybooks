#!/usr/bin/env node

/**
 * Fix canonical URLs and OpenGraph URLs in blog pages
 * Ensures all URLs have trailing slashes to match Next.js trailingSlash: true config
 */

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/app/blog');

// Get all blog post directories
const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'page.tsx')
  .map(dirent => dirent.name);

console.log(`Found ${blogPosts.length} blog posts to fix\n`);

let fixed = 0;
let errors = [];

blogPosts.forEach(slug => {
  const pagePath = path.join(blogDir, slug, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${slug}: page.tsx not found`);
    return;
  }

  try {
    let content = fs.readFileSync(pagePath, 'utf8');
    let modified = false;
    
    // Extract slug from directory name
    const blogSlug = slug;
    
    // Fix OpenGraph URL - add trailing slash
    const ogUrlRegex = /url:\s*['"]https:\/\/charlesmackaybooks\.com\/blog\/([^'"]+)['"]/g;
    content = content.replace(ogUrlRegex, (match) => {
      if (!match.endsWith('/')) {
        modified = true;
        return match.replace(/['"]$/, '/"');
      }
      return match;
    });
    
    // Add canonical tag if missing
    if (!content.includes('alternates:') && !content.includes('canonical:')) {
      // Find the openGraph block and add alternates after it
      const openGraphEnd = content.indexOf('},', content.indexOf('openGraph:'));
      if (openGraphEnd > -1) {
        const before = content.substring(0, openGraphEnd + 2);
        const after = content.substring(openGraphEnd + 2);
        content = before + '\n  alternates: {\n    canonical: \'https://charlesmackaybooks.com/blog/' + blogSlug + '/\'\n  },';
        modified = true;
      }
    } else if (content.includes('canonical:')) {
      // Fix existing canonical URL to have trailing slash
      const canonicalRegex = /canonical:\s*['"]https:\/\/charlesmackaybooks\.com\/blog\/([^'"]+)['"]/g;
      content = content.replace(canonicalRegex, (match) => {
        if (!match.endsWith('/')) {
          modified = true;
          return match.replace(/['"]$/, '/"');
        }
        return match;
      });
    }
    
    if (modified) {
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`✅ Fixed ${slug}`);
      fixed++;
    } else {
      console.log(`✓  ${slug} already correct`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${slug}:`, error.message);
    errors.push({ slug, error: error.message });
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Fixed: ${fixed}`);
console.log(`✓  Already correct: ${blogPosts.length - fixed - errors.length}`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(e => console.log(`   - ${e.slug}: ${e.error}`));
}

console.log('\n✅ Blog canonical URL fixes complete!');

