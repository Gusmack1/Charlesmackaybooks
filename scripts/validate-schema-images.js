#!/usr/bin/env node

/**
 * Schema Image Validation Script
 * Validates that all books have proper image URLs for Google Search Console
 */

const fs = require('fs');
const path = require('path');

// Read the books data
const booksPath = path.join(__dirname, '../src/data/books.ts');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// Extract book objects (simple regex-based extraction)
const bookMatches = booksContent.match(/{\s*id:\s*'([^']+)',[\s\S]*?imageUrl:\s*'([^']*)'/g);
const books = [];

if (bookMatches) {
  bookMatches.forEach(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const imageUrlMatch = match.match(/imageUrl:\s*'([^']*)'/);
    
    if (idMatch && imageUrlMatch) {
      books.push({
        id: idMatch[1],
        imageUrl: imageUrlMatch[1]
      });
    }
  });
}

console.log(`Found ${books.length} books to validate\n`);

let issues = [];
let validBooks = 0;

books.forEach(book => {
  const issuesForBook = [];
  
  // Check if imageUrl exists
  if (!book.imageUrl || book.imageUrl.trim() === '') {
    issuesForBook.push('Missing imageUrl field');
  } else {
    // Check if imageUrl starts with /book-covers/
    if (!book.imageUrl.startsWith('/book-covers/')) {
      issuesForBook.push(`ImageUrl doesn't start with /book-covers/: ${book.imageUrl}`);
    }
    
    // Check if imageUrl ends with .jpg
    if (!book.imageUrl.endsWith('.jpg')) {
      issuesForBook.push(`ImageUrl doesn't end with .jpg: ${book.imageUrl}`);
    }
  }
  
  if (issuesForBook.length > 0) {
    issues.push({
      bookId: book.id,
      issues: issuesForBook
    });
  } else {
    validBooks++;
  }
});

// Report results
console.log(`✅ Valid books: ${validBooks}`);
console.log(`❌ Books with issues: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('Issues found:');
  issues.forEach(issue => {
    console.log(`\n📖 ${issue.bookId}:`);
    issue.issues.forEach(problem => {
      console.log(`  - ${problem}`);
    });
  });
} else {
  console.log('🎉 All books have valid image URLs!');
}

// Test schema generation
console.log('\n🔍 Testing schema generation...');

// Simulate the toAbsolute function from ProductSchema
const toAbsolute = (img, fallbackId) => {
  const base = 'https://charlesmackaybooks.com';
  if (!img || img.trim().length === 0) return `${base}/book-covers/${fallbackId}.jpg`;
  if (img.startsWith('http')) return img;
  return `${base}${img.startsWith('/') ? '' : '/'}${img}`;
};

// Test a few books
const testBooks = books.slice(0, 3);
testBooks.forEach(book => {
  const imageUrl = toAbsolute(book.imageUrl, book.id);
  console.log(`  ${book.id}: ${imageUrl}`);
});

console.log('\n✅ Schema validation complete!');

// Exit with error code if issues found
process.exit(issues.length > 0 ? 1 : 0);
