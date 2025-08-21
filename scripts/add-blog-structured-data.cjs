const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/app/blog');

function addUnifiedSchemaToBlogPost(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if UnifiedSchema is already imported
    if (content.includes('import UnifiedSchema')) {
      console.log(`✅ ${path.basename(filePath)} already has UnifiedSchema`);
      return;
    }
    
    // Add UnifiedSchema import
    if (!content.includes('import UnifiedSchema')) {
      content = content.replace(
        "import { getBooksData } from '@/utils/bookUtils'",
        `import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'`
      );
    }
    
    // Extract the blog post ID from the file path
    const blogId = path.basename(path.dirname(filePath));
    
    // Add UnifiedSchema component to the return statement
    if (!content.includes('<UnifiedSchema')) {
      content = content.replace(
        'return <ComprehensiveBlogTemplate post={post} />',
        `return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/${blogId}"
      />
      <ComprehensiveBlogTemplate post={post} />
    </>
  )`
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${path.basename(filePath)} with UnifiedSchema`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function processBlogDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const pageFile = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pageFile)) {
        addUnifiedSchemaToBlogPost(pageFile);
      }
    }
  }
}

console.log('🚀 Adding UnifiedSchema to all blog posts...');
processBlogDirectory(blogDir);
console.log('✅ Completed adding UnifiedSchema to blog posts');
