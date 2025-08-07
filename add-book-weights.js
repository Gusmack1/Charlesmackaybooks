const fs = require('fs');
const path = require('path');

// Book weights mapping
const bookWeights = {
  'adolf-rohrbach': 226,
  'aircraft-carrier-argus': 279,
  'birth-atomic-bomb': 320,
  'captain-eric-brown': 111,
  'dorothy-wordsworth': 389,
  'modern-furniture': 313,
  'sycamore-seeds': 336,
  'sonic-to-standoff': 324
};

// Read the books.ts file
const booksPath = path.join(__dirname, 'src', 'data', 'books.ts');
let content = fs.readFileSync(booksPath, 'utf8');

// Add weights to each book
Object.entries(bookWeights).forEach(([bookId, weight]) => {
  const regex = new RegExp(`(id: '${bookId}',[\\s\\S]*?)(pageCount: \\d+,\\s*publicationYear: \\d+,)`, 'g');
  content = content.replace(regex, `$1$2\n    weight: ${weight},`);
});

// Write the updated content back
fs.writeFileSync(booksPath, content, 'utf8');

console.log('Book weights added successfully!');
console.log('Added weights for:', Object.keys(bookWeights).join(', ')); 