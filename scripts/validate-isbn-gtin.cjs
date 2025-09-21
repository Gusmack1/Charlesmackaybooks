#!/usr/bin/env node

/**
 * ISBN and GTIN Validation Script
 * Validates ISBN and GTIN values in the books data
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating ISBN and GTIN Values...\n');

// Read the books data
const booksPath = path.join(__dirname, '../src/data/books.ts');
const booksContent = fs.readFileSync(booksPath, 'utf8');

// Extract book objects with ISBN values
const bookMatches = booksContent.match(/{\s*id:\s*'([^']+)',[\s\S]*?isbn:\s*'([^']*)'/g);
const books = [];

if (bookMatches) {
  bookMatches.forEach(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const isbnMatch = match.match(/isbn:\s*'([^']*)'/);
    
    if (idMatch && isbnMatch) {
      books.push({
        id: idMatch[1],
        isbn: isbnMatch[1]
      });
    }
  });
}

console.log(`Found ${books.length} books to validate\n`);

// ISBN validation functions
function validateISBN10(isbn) {
  if (isbn.length !== 10) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) return false;
    sum += digit * (10 - i);
  }
  
  const checkDigit = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
  if (isNaN(checkDigit)) return false;
  
  return (sum + checkDigit) % 11 === 0;
}

function validateISBN13(isbn) {
  if (isbn.length !== 13) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) return false;
    sum += digit * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = parseInt(isbn[12]);
  if (isNaN(checkDigit)) return false;
  
  return (sum + checkDigit) % 10 === 0;
}

function validateISBN(isbn) {
  if (!isbn || isbn.trim() === '') return { valid: false, reason: 'Empty ISBN' };
  
  // Remove any non-digit characters except X
  const cleanISBN = isbn.replace(/[^0-9X]/g, '');
  
  if (cleanISBN.length === 10) {
    return {
      valid: validateISBN10(cleanISBN),
      type: 'ISBN-10',
      clean: cleanISBN
    };
  } else if (cleanISBN.length === 13) {
    return {
      valid: validateISBN13(cleanISBN),
      type: 'ISBN-13',
      clean: cleanISBN
    };
  } else {
    return {
      valid: false,
      reason: `Invalid length: ${cleanISBN.length} characters`
    };
  }
}

let issues = [];
let validBooks = 0;

books.forEach(book => {
  const validation = validateISBN(book.isbn);
  
  if (!validation.valid) {
    issues.push({
      bookId: book.id,
      isbn: book.isbn,
      issue: validation.reason || `Invalid ${validation.type || 'ISBN'}`
    });
  } else {
    validBooks++;
    console.log(`✅ ${book.id}: ${validation.clean} (${validation.type})`);
  }
});

console.log(`\n📊 Results:`);
console.log(`✅ Valid books: ${validBooks}`);
console.log(`❌ Books with issues: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('❌ Issues found:');
  issues.forEach(issue => {
    console.log(`\n📖 ${issue.bookId}:`);
    console.log(`  ISBN: ${issue.isbn}`);
    console.log(`  Issue: ${issue.issue}`);
  });
  
  console.log('\n🔧 Recommended fixes:');
  issues.forEach(issue => {
    if (issue.issue.includes('Empty')) {
      console.log(`  ${issue.bookId}: Add valid ISBN or remove isbn field`);
    } else if (issue.issue.includes('Invalid length')) {
      console.log(`  ${issue.bookId}: Check ISBN format - should be 10 or 13 digits`);
    } else {
      console.log(`  ${issue.bookId}: Verify ISBN value with publisher or ISBN database`);
    }
  });
} else {
  console.log('🎉 All ISBN values are valid!');
}

// Check for GTIN issues (GTIN should be same as ISBN-13)
console.log('\n🔍 Checking GTIN values...');
const gtinIssues = [];

books.forEach(book => {
  const validation = validateISBN(book.isbn);
  if (validation.valid && validation.type === 'ISBN-13') {
    // GTIN should be the same as ISBN-13
    console.log(`✅ ${book.id}: GTIN ${validation.clean} (matches ISBN-13)`);
  } else if (validation.valid && validation.type === 'ISBN-10') {
    console.log(`⚠️  ${book.id}: ISBN-10 format, GTIN should be converted to ISBN-13`);
    gtinIssues.push({
      bookId: book.id,
      currentISBN: book.isbn,
      issue: 'ISBN-10 format, should convert to ISBN-13 for GTIN'
    });
  } else {
    gtinIssues.push({
      bookId: book.id,
      currentISBN: book.isbn,
      issue: validation.reason || 'Invalid ISBN format'
    });
  }
});

if (gtinIssues.length > 0) {
  console.log(`\n❌ GTIN issues found: ${gtinIssues.length}`);
  gtinIssues.forEach(issue => {
    console.log(`  ${issue.bookId}: ${issue.issue}`);
  });
}

console.log('\n✅ ISBN and GTIN validation complete!');

// Exit with error code if issues found
process.exit(issues.length > 0 ? 1 : 0);
