/**
 * Blog Post Enhancement Script
 * 
 * Enhances all blog posts to:
 * 1. Minimum 3000 words with factual, research-backed content
 * 2. Expert SEO linking to related books
 * 3. Consistent style matching book pages
 * 4. 100% factual accuracy - no made up content
 */

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/app/blog');
const booksDataPath = path.join(__dirname, '../src/data/books.ts');

// Read books data to extract book information for linking
let booksData = '';
try {
  booksData = fs.readFileSync(booksDataPath, 'utf-8');
} catch (err) {
  console.error('Could not read books.ts:', err.message);
  process.exit(1);
}

// Extract book information
const bookMatches = booksData.matchAll(/id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]([^'"]+)['"]/g);
const books = [];
for (const match of bookMatches) {
  const bookId = match[1];
  const title = match[2];
  const category = match[3];
  
  // Extract description snippet
  const descMatch = booksData.substring(match.index).match(/description:\s*['"]([^'"]{0,200})/);
  
  books.push({
    id: bookId,
    title: title,
    category: category,
    description: descMatch ? descMatch[1] : ''
  });
}

console.log(`📚 Found ${books.length} books for linking\n`);

// Function to count words in HTML content
function countWords(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

// Function to find related books for a blog post
function findRelatedBooks(postTitle, postTags, postCategory, postContent) {
  const related = [];
  const titleLower = postTitle.toLowerCase();
  const contentLower = postContent.toLowerCase();
  
  books.forEach(book => {
    const bookTitleLower = book.title.toLowerCase();
    const bookCategoryLower = book.category.toLowerCase();
    
    // Match by category
    if (bookCategoryLower === postCategory.toLowerCase() || 
        postCategory.toLowerCase().includes(bookCategoryLower) ||
        bookCategoryLower.includes(postCategory.toLowerCase())) {
      if (!related.find(r => r.id === book.id)) {
        related.push(book);
      }
    }
    
    // Match by title keywords
    const titleWords = titleLower.split(' ').filter(w => w.length > 4);
    titleWords.forEach(word => {
      if (bookTitleLower.includes(word) || bookTitleLower.includes(word.substring(0, word.length - 1))) {
        if (!related.find(r => r.id === book.id)) {
          related.push(book);
        }
      }
    });
    
    // Match by content keywords
    const contentKeywords = ['scottish', 'aviation', 'wwi', 'wwii', 'luftwaffe', 'raf', 'helicopter', 'jet', 'carrier', 'naval', 'fighter', 'bomber'];
    contentKeywords.forEach(keyword => {
      if (contentLower.includes(keyword) && bookTitleLower.includes(keyword)) {
        if (!related.find(r => r.id === book.id)) {
          related.push(book);
        }
      }
    });
  });
  
  return related.slice(0, 6); // Limit to 6 related books
}

// Process each blog post
const blogDirs = fs.readdirSync(blogDir)
  .filter(dir => {
    const dirPath = path.join(blogDir, dir);
    return fs.statSync(dirPath).isDirectory() && dir !== 'page.tsx';
  });

let enhanced = 0;
let needsEnhancement = [];

blogDirs.forEach(slug => {
  const pagePath = path.join(blogDir, slug, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${slug} - page.tsx not found`);
    return;
  }

  const content = fs.readFileSync(pagePath, 'utf-8');
  
  // Extract post data
  const titleMatch = content.match(/title:\s*[`'"]+(.*?)[`'"]+/);
  const contentMatch = content.match(/content:\s*[`'"]+([\s\S]*?)[`'"]+,/);
  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
  const categoryMatch = content.match(/category:\s*['"]([^'"]+)['"]/);
  
  const postTitle = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');
  const postContent = contentMatch ? contentMatch[1] : '';
  const postTags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [];
  const postCategory = categoryMatch ? categoryMatch[1] : 'Aviation History';
  
  const wordCount = countWords(postContent);
  
  console.log(`📄 ${slug}:`);
  console.log(`   Words: ${wordCount}${wordCount < 3000 ? ' ⚠️  NEEDS ENHANCEMENT' : ' ✅'}`);
  console.log(`   Title: ${postTitle}`);
  
  if (wordCount < 3000) {
    needsEnhancement.push({
      slug,
      title: postTitle,
      currentWords: wordCount,
      needsWords: 3000 - wordCount,
      category: postCategory,
      tags: postTags,
      content: postContent
    });
  }
  
  // Check for book links
  const bookLinkMatches = postContent.match(/\/books\/[a-z0-9-]+/g);
  const bookLinkCount = bookLinkMatches ? bookLinkMatches.length : 0;
  console.log(`   Book Links: ${bookLinkCount}`);
  
  const relatedBooks = findRelatedBooks(postTitle, postTags, postCategory, postContent);
  console.log(`   Related Books Found: ${relatedBooks.length}`);
  relatedBooks.forEach(book => {
    console.log(`     - ${book.title}`);
  });
  
  console.log('');
});

console.log(`\n📊 Summary:`);
console.log(`Total Blog Posts: ${blogDirs.length}`);
console.log(`Posts with 3000+ words: ${blogDirs.length - needsEnhancement.length}`);
console.log(`Posts needing enhancement: ${needsEnhancement.length}\n`);

if (needsEnhancement.length > 0) {
  console.log(`\n⚠️  Posts needing enhancement to reach 3000 words:\n`);
  needsEnhancement.forEach(post => {
    console.log(`   ${post.slug}: ${post.currentWords} words (needs ${post.needsWords} more)`);
  });
}

console.log(`\n✨ Analysis complete!`);
console.log(`\nNext step: Enhance each blog post with factual, research-backed content to reach 3000+ words.`);

