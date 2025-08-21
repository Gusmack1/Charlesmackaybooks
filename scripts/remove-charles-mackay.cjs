const fs = require('fs');
const path = require('path');

function removeCharlesMacKay(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove "Charles MacKay" from keywords while keeping "Charles E. MacKay"
    if (content.includes('Charles MacKay')) {
      // Remove standalone "Charles MacKay" from keywords
      content = content.replace(
        /keywords:\s*'([^']*Charles MacKay[^']*)'/g,
        (match, keywords) => {
          const newKeywords = keywords
            .split(',')
            .map(k => k.trim())
            .filter(k => k !== 'Charles MacKay' && k !== 'charles mackay')
            .join(', ');
          return `keywords: '${newKeywords}'`;
        }
      );
      modified = true;
    }

    // Remove "Charles MacKay" from author attribution sections
    if (content.includes('Charles MacKay') && content.includes('Charles E. MacKay')) {
      content = content.replace(
        /<strong>Charles E\. MacKay<\/strong> and <strong>Charles MacKay<\/strong>/g,
        '<strong>Charles E. MacKay</strong>'
      );
      content = content.replace(
        /Charles E\. MacKay & Charles MacKay/g,
        'Charles E. MacKay'
      );
      content = content.replace(
        /Charles MacKay & Charles E\. MacKay/g,
        'Charles E. MacKay'
      );
      modified = true;
    }

    // Remove "Charles MacKay" from author sections
    if (content.includes('Charles MacKay') && !content.includes('Charles E. MacKay')) {
      content = content.replace(
        /<strong>Charles MacKay<\/strong>/g,
        '<strong>Charles E. MacKay</strong>'
      );
      content = content.replace(
        /Charles MacKay/g,
        'Charles E. MacKay'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function processAllBlogPosts() {
  console.log('🚀 Removing "Charles MacKay" references from all blog posts...\n');

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
        removeCharlesMacKay(pageFile);
        processedCount++;
      }
    }
  });

  console.log(`\n🎉 Completed! Processed ${processedCount} blog posts`);
  console.log('\n📊 Cleanup Summary:');
  console.log('✅ Removed standalone "Charles MacKay" references');
  console.log('✅ Kept "Charles E. MacKay" references');
  console.log('✅ Updated author attribution sections');
  console.log('✅ Cleaned up keywords');
}

// Run the script
processAllBlogPosts();
