/**
 * Comprehensive Blog SEO Enhancement Script
 * 
 * Enhances all blog posts with EnhancedBlogSEO component
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://charlesmackaybooks.com';
const blogDir = path.join(__dirname, '../src/app/blog');

console.log('🚀 Starting Blog SEO Enhancement...\n');

// Process each blog post
const blogDirs = fs.readdirSync(blogDir)
  .filter(dir => {
    const dirPath = path.join(blogDir, dir);
    return fs.statSync(dirPath).isDirectory() && dir !== 'page.tsx';
  });

let enhanced = 0;
let skipped = 0;

blogDirs.forEach(slug => {
  const pagePath = path.join(blogDir, slug, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${slug} - page.tsx not found`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // Skip if already has EnhancedBlogSEO
  if (content.includes('EnhancedBlogSEO')) {
    console.log(`⏭️  ${slug} - already has EnhancedBlogSEO`);
    skipped++;
    return;
  }

  // Extract post data for related books
  const relatedBooksMatch = content.match(/relatedBooks:\s*getBooksData\(\[(.*?)\]\)/);
  let relatedBooksCode = '[]';
  
  if (relatedBooksMatch) {
    // Extract book IDs from getBooksData call
    const bookIds = relatedBooksMatch[1]
      .split(',')
      .map(id => id.trim().replace(/['"]/g, ''))
      .filter(Boolean);
    
    if (bookIds.length > 0) {
      // Create related books array matching EnhancedBlogSEO interface
      relatedBooksCode = `[${bookIds.map(id => `{ id: '${id}', title: '', isbn: '', price: 0 }`).join(', ')}]`;
    }
  }

  // Extract relatedPosts if available
  const relatedPostsMatch = content.match(/relatedPosts:\s*\[(.*?)\]/s);
  let relatedPostsCode = '[]';
  
  if (relatedPostsMatch) {
    // Try to extract post IDs
    const postIds = [];
    const postIdMatches = relatedPostsMatch[1].matchAll(/id:\s*['"]([^'"]+)['"]/g);
    for (const match of postIdMatches) {
      postIds.push(match[1]);
    }
    
    if (postIds.length > 0) {
      relatedPostsCode = `[${postIds.map(id => `{ id: '${id}', title: '', excerpt: '', image: '', readingTime: 0 }`).join(', ')}]`;
    }
  }

  // Add import if missing
  if (!content.includes("import EnhancedBlogSEO")) {
    // Find the last import statement
    const importRegex = /import\s+.*?from\s+['"][^'"]+['"];?\s*\n/g;
    const imports = content.match(importRegex) || [];
    const lastImportIndex = imports.length > 0 
      ? content.lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length
      : content.indexOf('import type');

    if (lastImportIndex > 0) {
      // Insert after last import
      const before = content.substring(0, lastImportIndex);
      const after = content.substring(lastImportIndex);
      content = before + "import EnhancedBlogSEO from '@/components/EnhancedBlogSEO';\n" + after;
    } else {
      // Add at top if no imports found
      content = "import EnhancedBlogSEO from '@/components/EnhancedBlogSEO';\n" + content;
    }
  }

  // Add component usage - insert before ComprehensiveBlogTemplate
  const templateMatch = content.match(/(\s*)<ComprehensiveBlogTemplate/);
  if (templateMatch) {
    const indent = templateMatch[1];
    const insertPoint = templateMatch.index;
    
    const enhancedBlogSEOComponent = `${indent}<EnhancedBlogSEO 
${indent}  post={post}
${indent}  relatedBooks={${relatedBooksCode}}
${indent}  relatedPosts={${relatedPostsCode}}
${indent}/>
${indent}
`;
    
    content = content.substring(0, insertPoint) + enhancedBlogSEOComponent + content.substring(insertPoint);
  } else {
    // Fallback: add before closing tag
    const closingTagMatch = content.match(/(\s*)<\/>/);
    if (closingTagMatch) {
      const indent = closingTagMatch[1];
      const insertPoint = closingTagMatch.index;
      
      const enhancedBlogSEOComponent = `${indent}<EnhancedBlogSEO 
${indent}  post={post}
${indent}  relatedBooks={${relatedBooksCode}}
${indent}  relatedPosts={${relatedPostsCode}}
${indent}/>
`;
      
      content = content.substring(0, insertPoint) + enhancedBlogSEOComponent + content.substring(insertPoint);
    }
  }

  fs.writeFileSync(pagePath, content);
  console.log(`✅ Enhanced: ${slug}`);
  enhanced++;
});

console.log(`\n✨ Blog SEO enhancement complete!`);
console.log(`📊 Enhanced: ${enhanced} posts`);
console.log(`⏭️  Skipped: ${skipped} posts (already enhanced)`);
console.log(`📈 Total: ${blogDirs.length} posts`);
