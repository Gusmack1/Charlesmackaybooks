#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all blog post pages
const blogPages = glob.sync('src/app/blog/**/page.tsx');

console.log('🚀 Removing BlogAuthorityEnhancer from all blog posts...\n');

let processedCount = 0;
let removedCount = 0;

blogPages.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove import statement
    if (content.includes("import BlogAuthorityEnhancer from '@/components/BlogAuthorityEnhancer'")) {
      content = content.replace("import BlogAuthorityEnhancer from '@/components/BlogAuthorityEnhancer'\n", '');
      modified = true;
    }

    // Remove BlogAuthorityEnhancer component usage
    const blogAuthorityRegex = /<BlogAuthorityEnhancer[\s\S]*?\/>/g;
    if (blogAuthorityRegex.test(content)) {
      content = content.replace(blogAuthorityRegex, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Removed BlogAuthorityEnhancer from ${path.basename(filePath)}`);
      removedCount++;
    } else {
      console.log(`ℹ️  ${path.basename(filePath)} already clean`);
    }
    
    processedCount++;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Completed! Processed ${processedCount} files, removed BlogAuthorityEnhancer from ${removedCount} files.`);
