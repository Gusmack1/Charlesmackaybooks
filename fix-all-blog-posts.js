import fs from 'fs';

const filesToFix = [
  'src/app/blog/schneider-trophy-racing-development/page.tsx',
  'src/app/blog/sikorsky-vs300-helicopter-breakthrough/page.tsx',
  'src/app/blog/me262-jet-fighter-revolution/page.tsx',
  'src/app/blog/korean-war-air-combat/page.tsx',
  'src/app/blog/aviation-manufacturing-wartime-production/page.tsx',
  'src/app/blog/adolf-rohrbach-metal-aircraft-revolution/page.tsx'
];

filesToFix.forEach(filePath => {
  console.log(`Fixing ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract ID from file path
  const id = filePath.split('/').slice(-2)[0];
  
  // Replace blogData with post and add id
  content = content.replace(
    /const blogData = \{\s*title: `([^`]+)`,\s*excerpt: `([^`]+)`,\s*content: `/,
    `const post = {\n  id: '${id}',\n  title: \`$1\`,\n  subtitle: \`$2\`,\n  content: \``
  );
  
  // Replace the old structure with the new one
  content = content.replace(
    /,\s*publishDate: '[^']+',\s*readTime: '[^']+',\s*category: '[^']+',\s*tags: \[[^\]]+\],\s*author: \{[^}]+\},\s*featuredImage: \{[^}]+\},\s*tableOfContents: \[[^\]]+\]/,
    `,\n  excerpt: \`$2\`,\n  author: {\n    name: 'Charles E. MacKay',\n    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',\n    image: '/charles-mackay-aviation-historian.jpg',\n    email: 'charlese1mackay@hotmail.com'\n  },\n  publishedDate: '2025-01-30T12:00:00.000Z',\n  readingTime: 12,\n  featuredImage: {\n    url: '/blog-images/${id}-featured.jpg',\n    alt: '$1',\n    caption: '$1 - Expert analysis by Charles E. MacKay'\n  },\n  category: 'Aviation History',\n  tags: ["${id.replace(/-/g, '","')}"],\n  relatedBooks: [],\n  relatedPosts: []`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
});

console.log('All blog posts fixed!'); 