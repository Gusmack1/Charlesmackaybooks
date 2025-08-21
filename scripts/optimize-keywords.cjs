const fs = require('fs');
const path = require('path');

// Keywords to optimize for
const targetKeywords = [
  'Charles E. MacKay',
  'Charles MacKay',
  'Charles Mackay',
  'Charles E MacKay',
  'Charles E. Mackay',
  'Charles Mackay Books',
  'Charles E. MacKay Books',
  'Charles Mackay Aviation',
  'Charles E. MacKay Aviation',
  'Charles Mackay Aviation Books',
  'Charles E. MacKay Aviation Books'
];

// Blog post optimization function
function optimizeBlogPost(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Add Charles MacKay variations to keywords
    if (content.includes('keywords:')) {
      const keywordMatch = content.match(/keywords:\s*'([^']+)'/);
      if (keywordMatch) {
        const existingKeywords = keywordMatch[1];
        if (!existingKeywords.includes('Charles MacKay') && !existingKeywords.includes('Charles E. MacKay')) {
          const newKeywords = `${existingKeywords}, Charles MacKay, Charles E. MacKay`;
          content = content.replace(
            /keywords:\s*'([^']+)'/,
            `keywords: '${newKeywords}'`
          );
          modified = true;
        }
      }
    }

    // Add author attribution in content
    if (content.includes('export default function BlogPost()')) {
      // Add author section if not present
      if (!content.includes('Charles MacKay') && !content.includes('Charles E. MacKay')) {
        const authorSection = `
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Author:</strong> This research is based on extensive archival work by <strong>Charles E. MacKay</strong> and <strong>Charles MacKay</strong>, 
                renowned aviation historians specializing in Scottish aviation heritage and military aviation history.
              </p>
            </div>
          </div>
        </div>`;

        // Insert after the main content
        content = content.replace(
          /(<ComprehensiveBlogTemplate post={post} \/>)/,
          `$1${authorSection}`
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Optimized keywords in ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

// Page optimization function
function optimizePage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Add Charles MacKay variations to titles and descriptions
    if (content.includes('title:') && !content.includes('Charles MacKay')) {
      content = content.replace(
        /title:\s*'([^']+)'/,
        (match, title) => {
          if (!title.includes('Charles MacKay') && !title.includes('Charles E. MacKay')) {
            return `title: '${title} | Charles MacKay & Charles E. MacKay'`;
          }
          return match;
        }
      );
      modified = true;
    }

    // Add to description
    if (content.includes('description:') && !content.includes('Charles MacKay')) {
      content = content.replace(
        /description:\s*'([^']+)'/,
        (match, desc) => {
          if (!desc.includes('Charles MacKay') && !desc.includes('Charles E. MacKay')) {
            return `description: '${desc} Expert research by Charles MacKay and Charles E. MacKay.'`;
          }
          return match;
        }
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Optimized page ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

// Main optimization function
function optimizeAllFiles() {
  console.log('🚀 Starting comprehensive keyword optimization...\n');

  // Optimize blog posts
  const blogDir = path.join(__dirname, '../src/app/blog');
  if (fs.existsSync(blogDir)) {
    console.log('📝 Optimizing blog posts...');
    const blogItems = fs.readdirSync(blogDir);
    blogItems.forEach(item => {
      const itemPath = path.join(blogDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const pageFile = path.join(itemPath, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          optimizeBlogPost(pageFile);
        }
      }
    });
  }

  // Optimize main pages
  const pagesDir = path.join(__dirname, '../src/app');
  console.log('\n📄 Optimizing main pages...');
  const pageFiles = [
    'page.tsx',
    'about/page.tsx',
    'books/page.tsx',
    'blog/page.tsx'
  ];

  pageFiles.forEach(pageFile => {
    const fullPath = path.join(pagesDir, pageFile);
    if (fs.existsSync(fullPath)) {
      optimizePage(fullPath);
    }
  });

  console.log('\n🎉 Keyword optimization completed!');
  console.log('\n📊 Optimization Summary:');
  console.log('✅ Added "Charles MacKay" and "Charles E. MacKay" variations');
  console.log('✅ Enhanced blog post author attribution');
  console.log('✅ Updated page titles and descriptions');
  console.log('✅ Improved keyword targeting for both name variations');
}

// Run optimization
optimizeAllFiles();
