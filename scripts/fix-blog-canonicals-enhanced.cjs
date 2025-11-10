#!/usr/bin/env node

/**
 * Enhanced script to fix canonical URLs in blog pages
 * Adds canonical tags to metadata exports if missing
 * Ensures all URLs have trailing slashes
 */

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/app/blog');

// Get all blog post directories
const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'page.tsx')
  .map(dirent => dirent.name);

console.log(`Found ${blogPosts.length} blog posts to check\n`);

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
    
    const blogSlug = slug;
    const canonicalUrl = `https://charlesmackaybooks.com/blog/${blogSlug}/`;
    
    // Check if canonical already exists
    const hasCanonical = content.includes('canonical:') || content.includes('alternates:');
    
    if (!hasCanonical) {
      // Find the metadata export
      const metadataMatch = content.match(/export\s+(const|async\s+function)\s+metadata[\s\S]*?\{[\s\S]*?\}/);
      
      if (metadataMatch) {
        // Find the openGraph block or the end of the metadata object
        let insertPosition = -1;
        
        // Try to find after openGraph block
        const openGraphEnd = content.indexOf('  }', content.indexOf('openGraph:'));
        if (openGraphEnd > -1) {
          insertPosition = openGraphEnd + 3;
        } else {
          // Find the last property before closing brace
          const lastPropertyMatch = content.match(/export\s+(const|async\s+function)\s+metadata[\s\S]*?(\w+:\s*\{[^}]*\}|\w+:\s*[^,}]+),?\s*(?=\})/g);
          if (lastPropertyMatch) {
            const lastMatch = lastPropertyMatch[lastPropertyMatch.length - 1];
            insertPosition = content.indexOf(lastMatch) + lastMatch.length;
          }
        }
        
        if (insertPosition > -1) {
          // Insert alternates block
          const before = content.substring(0, insertPosition);
          const after = content.substring(insertPosition);
          const needsComma = !before.trim().endsWith(',') && !before.trim().endsWith('{');
          content = before + (needsComma ? ',' : '') + '\n  alternates: {\n    canonical: \'' + canonicalUrl + '\'\n  }' + after;
          modified = true;
        }
      }
    } else {
      // Fix existing canonical URL to have trailing slash
      const canonicalRegex = /canonical:\s*['"]https:\/\/charlesmackaybooks\.com\/blog\/([^'"]+)['"]/g;
      content = content.replace(canonicalRegex, (match) => {
        if (!match.includes('/"') && !match.includes("/'")) {
          modified = true;
          return match.replace(/['"]$/, '/\'');
        }
        return match;
      });
    }
    
    // Also fix OpenGraph URL to have trailing slash
    const ogUrlRegex = /url:\s*['"]https:\/\/charlesmackaybooks\.com\/blog\/([^'"]+)['"]/g;
    content = content.replace(ogUrlRegex, (match) => {
      if (!match.includes('/"') && !match.includes("/'")) {
        modified = true;
        return match.replace(/['"]$/, '/\'');
      }
      return match;
    });
    
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

