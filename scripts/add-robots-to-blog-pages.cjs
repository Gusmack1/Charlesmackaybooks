#!/usr/bin/env node

/**
 * Add robots meta tags to all blog pages
 * Ensures all blog pages explicitly allow indexing
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
    
    // Check if robots already exists
    const hasRobots = content.includes('robots:') && content.includes('index:');
    
    if (!hasRobots) {
      // Find the metadata export
      const metadataMatch = content.match(/export\s+(const|async\s+function)\s+metadata[\s\S]*?\{[\s\S]*?\}/);
      
      if (metadataMatch) {
        // Try to find after alternates or openGraph block
        let insertPosition = -1;
        
        // Try after alternates
        const alternatesEnd = content.indexOf('  }', content.indexOf('alternates:'));
        if (alternatesEnd > -1) {
          insertPosition = alternatesEnd + 3;
        } else {
          // Try after openGraph
          const openGraphEnd = content.indexOf('  }', content.indexOf('openGraph:'));
          if (openGraphEnd > -1) {
            insertPosition = openGraphEnd + 3;
          }
        }
        
        if (insertPosition > -1) {
          // Insert robots block
          const before = content.substring(0, insertPosition);
          const after = content.substring(insertPosition);
          const needsComma = !before.trim().endsWith(',') && !before.trim().endsWith('{');
          const robotsBlock = (needsComma ? ',' : '') + '\n  robots: {\n    index: true,\n    follow: true,\n    googleBot: {\n      index: true,\n      follow: true,\n      \'max-video-preview\': -1,\n      \'max-image-preview\': \'large\',\n      \'max-snippet\': -1,\n    },\n  }';
          content = before + robotsBlock + after;
          modified = true;
        }
      }
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

console.log('\n✅ Blog robots meta tags fixes complete!');

