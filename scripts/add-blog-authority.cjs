const fs = require('fs');
const path = require('path');

function addBlogAuthority(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if BlogAuthorityEnhancer is already imported
    if (!content.includes('import BlogAuthorityEnhancer')) {
      // Add import statement
      content = content.replace(
        "import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'",
        `import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import BlogAuthorityEnhancer from '@/components/BlogAuthorityEnhancer'`
      );
      modified = true;
    }

    // Check if BlogAuthorityEnhancer is already used
    if (!content.includes('<BlogAuthorityEnhancer')) {
      // Extract post title from the post object
      const titleMatch = content.match(/post\.title/);
      if (titleMatch) {
        // Add BlogAuthorityEnhancer component after ComprehensiveBlogTemplate
        content = content.replace(
          /(<ComprehensiveBlogTemplate post={post} \/>)/,
          `$1
        <BlogAuthorityEnhancer 
          postTitle={post.title}
          postCategory="Aviation History"
          researchDate="${new Date().getFullYear()}"
        />`
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Added BlogAuthorityEnhancer to ${path.basename(filePath)}`);
    } else {
      console.log(`ℹ️  ${path.basename(filePath)} already has BlogAuthorityEnhancer`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function processAllBlogPosts() {
  console.log('🚀 Adding BlogAuthorityEnhancer to all blog posts...\n');

  const blogDir = path.join(__dirname, '../src/app/blog');
  if (!fs.existsSync(blogDir)) {
    console.log('❌ Blog directory not found');
    return;
  }

  const blogItems = fs.readdirSync(blogDir);
  let processedCount = 0;

  blogItems.forEach(item => {
    const itemPath = path.join(blogDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const pageFile = path.join(itemPath, 'page.tsx');
      if (fs.existsSync(pageFile)) {
        addBlogAuthority(pageFile);
        processedCount++;
      }
    }
  });

  console.log(`\n🎉 Completed! Processed ${processedCount} blog posts`);
  console.log('\n📊 Authority Enhancement Summary:');
  console.log('✅ Added expert author credentials');
  console.log('✅ Enhanced research methodology display');
  console.log('✅ Added related research links');
  console.log('✅ Included authority badges');
  console.log('✅ Added proper citation information');
}

// Run the script
processAllBlogPosts();
