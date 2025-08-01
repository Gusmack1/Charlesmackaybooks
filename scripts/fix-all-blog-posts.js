import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fix a single blog post file
function fixBlogPost(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if the file uses blogData instead of post
    if (content.includes('const blogData = {')) {
      console.log(`Fixing ${filePath}`);
      
      // Extract the blog post ID from the file path
      const fileName = path.basename(path.dirname(filePath));
      const postId = fileName;
      
      // Replace blogData with post and add id
      content = content.replace(
        /const blogData = \{\s*title: `([^`]+)`,\s*excerpt: `([^`]+)`/,
        `const post = {\n  id: '${postId}',\n  title: \`$1\`,\n  subtitle: \`$2\``
      );

      // Replace the old structure with the new one - multiple patterns to catch different formats
      const patterns = [
        // Pattern 1: Standard format
        /,\s*publishDate: '[^']+',\s*readTime: '[^']+',\s*category: '([^']+)',\s*tags: \[([^\]]+)\],\s*author: \{[^}]+\},\s*featuredImage: \{[^}]+\},\s*tableOfContents: \[[^\]]+\]\s*\}/,
        // Pattern 2: Without tableOfContents
        /,\s*publishDate: '[^']+',\s*readTime: '[^']+',\s*category: '([^']+)',\s*tags: \[([^\]]+)\],\s*author: \{[^}]+\},\s*featuredImage: \{[^}]+\}\s*\}/,
        // Pattern 3: Different author format
        /,\s*publishDate: '[^']+',\s*readTime: '[^']+',\s*category: '([^']+)',\s*tags: \[([^\]]+)\],\s*author: \{[^}]+\},\s*featuredImage: \{[^}]+\}\s*\}/,
      ];

      let replaced = false;
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, `,\n  excerpt: \`$2\`,\n  author: {\n    name: 'Charles E. MacKay',\n    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',\n    image: '/charles-mackay-aviation-historian.jpg',\n    email: 'charlese1mackay@hotmail.com'\n  },\n  publishedDate: '2025-01-30T12:00:00.000Z',\n  readingTime: 12,\n  featuredImage: {\n    url: '/blog-images/hawker-hurricane-professional.jpg',\n    alt: '$1',\n    caption: '$1 - Expert analysis by Charles E. MacKay'\n  },\n  category: '$1',\n  tags: [$2],\n  relatedBooks: [],\n  relatedPosts: []\n}`);
          replaced = true;
          break;
        }
      }

      // Remove old relatedBooks and relatedPosts variables
      content = content.replace(
        /const relatedBooks = \[[\s\S]*?\];?\s*const relatedPosts = \[[\s\S]*?\];?/g,
        ''
      );

      // Remove any remaining old structure that wasn't caught
      content = content.replace(
        /,\s*publishDate: '[^']+',\s*readTime: '[^']+',\s*category: '[^']+',\s*tags: \[[^\]]+\],\s*author: \{[^}]+\},\s*featuredImage: \{[^}]+\}\s*\}/,
        `,\n  excerpt: \`$2\`,\n  author: {\n    name: 'Charles E. MacKay',\n    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',\n    image: '/charles-mackay-aviation-historian.jpg',\n    email: 'charlese1mackay@hotmail.com'\n  },\n  publishedDate: '2025-01-30T12:00:00.000Z',\n  readingTime: 12,\n  featuredImage: {\n    url: '/blog-images/hawker-hurricane-professional.jpg',\n    alt: '$1',\n    caption: '$1 - Expert analysis by Charles E. MacKay'\n  },\n  category: '$1',\n  tags: [$2],\n  relatedBooks: [],\n  relatedPosts: []\n}`
      );

      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Function to recursively find all blog post files
function findBlogPosts(dir) {
  const blogPosts = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item === 'page.tsx' && currentDir.includes('/blog/')) {
        blogPosts.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return blogPosts;
}

// Main execution
const blogDir = path.join(__dirname, '..', 'src', 'app', 'blog');
const blogPosts = findBlogPosts(blogDir);

console.log(`Found ${blogPosts.length} blog post files`);

for (const blogPost of blogPosts) {
  fixBlogPost(blogPost);
}

console.log('All blog post fixing complete!'); 