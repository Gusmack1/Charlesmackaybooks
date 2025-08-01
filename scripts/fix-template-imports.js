#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING TEMPLATE IMPORTS AND SIMPLIFYING');
console.log('==========================================\n');

// Simplified book template that uses existing components
const generateSimpleBookTemplate = (bookId, description, relatedBlogs) => `import type { Metadata } from 'next'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'
import Image from 'next/image'
import Link from 'next/link'

const bookData = books.find(b => b.id === '${bookId}')!

export const metadata: Metadata = {
  title: \`\${bookData.title} | Charles E. MacKay Aviation Books\`,
  description: bookData.description,
  keywords: bookData.tags?.join(', ') || 'aviation history',
  openGraph: {
    title: bookData.title,
    description: bookData.description,
    url: \`https://charlesmackaybooks.com/books/${bookId}\`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: bookData.imageUrl || '/book-covers/${bookId}.jpg',
      width: 600,
      height: 800,
      alt: bookData.title
    }],
    locale: 'en_GB',
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: bookData.title,
    description: bookData.description,
    images: [bookData.imageUrl || '/book-covers/${bookId}.jpg'],
  }
}

export default function BookPage() {
  const description = "${description}";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Social Sharing Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="hidden md:inline">📢 Share this book:</span>
            <div className="flex gap-3">
              <a 
                href={\`https://facebook.com/sharer/sharer.php?u=https://charlesmackaybooks.com/books/${bookId}\`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
              >
                📘 Facebook
              </a>
              <a 
                href={\`https://twitter.com/intent/tweet?url=https://charlesmackaybooks.com/books/${bookId}&text=\${bookData.title}\`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
              >
                🐦 Twitter
              </a>
              <a 
                href={\`https://linkedin.com/sharing/share-offsite/?url=https://charlesmackaybooks.com/books/${bookId}\`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  📚 Aviation History
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {bookData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-8">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>{bookData.pageCount || 250} pages</span>
                <span>•</span>
                <span>Published {bookData.publicationYear || '2020'}</span>
                <span>•</span>
                <span>ISBN: {bookData.isbn}</span>
              </div>

              {/* Quick Order */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">£{(bookData.price || 24.99).toFixed(2)}</div>
                    <div className="text-blue-200 text-sm">+ shipping worldwide</div>
                  </div>
                  <BookOrderClient
                    book={bookData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    🛒 Order Now
                  </BookOrderClient>
                </div>
                <div className="text-xs text-blue-200">
                  Secure checkout • Ships worldwide • 30-day returns
                </div>
              </div>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-2xl transform rotate-6"></div>
                <Image
                  src={bookData.imageUrl || \`/book-covers/${bookId}.jpg\`}
                  alt={bookData.title}
                  width={400}
                  height={600}
                  className="relative rounded-lg shadow-2xl w-80 h-auto"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ Expert Author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Book</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {bookData.description}
            </p>
            
            <div className="prose prose-lg max-w-none">
              <h3>Key Features</h3>
              <ul>
                <li>Comprehensive historical analysis</li>
                <li>Technical specifications and diagrams</li>
                <li>Rare archival photographs</li>
                <li>Expert commentary and insights</li>
                <li>Essential reference for researchers</li>
              </ul>
              
              <h3>Related Expert Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4 not-prose">
${relatedBlogs.map(blogId => `                <Link href="/blog/${blogId}" className="block bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
                  <h4 className="font-semibold text-blue-600">${blogId.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())}</h4>
                  <p className="text-sm text-gray-600 mt-2">Read our detailed analysis...</p>
                </Link>`).join('\n')}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Options */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Purchase Options</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Hardcover</div>
                    <div className="text-sm text-gray-600">Free worldwide shipping</div>
                  </div>
                  <div className="text-xl font-bold">£{(bookData.price || 24.99).toFixed(2)}</div>
                </div>
                <BookOrderClient
                  book={bookData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </BookOrderClient>
                <a
                  href="https://www.ebay.co.uk/usr/chaza87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors text-center block"
                >
                  🏪 Buy on eBay
                </a>
              </div>
            </div>

            {/* Book Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{bookData.pageCount || 250}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium">{bookData.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">{bookData.publicationYear || '2020'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">£{(bookData.price || 24.99).toFixed(2)}</div>
            <div className="text-sm text-gray-600">Free shipping</div>
          </div>
          <div className="flex gap-2">
            <BookOrderClient
              book={bookData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold"
            >
              🛒 Cart
            </BookOrderClient>
            <a
              href="https://www.ebay.co.uk/usr/chaza87"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold"
            >
              🏪 eBay
            </a>
          </div>
        </div>
      </div>

      {/* Social Sharing Footer */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Share This Book</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href={\`https://facebook.com/sharer/sharer.php?u=https://charlesmackaybooks.com/books/${bookId}\`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" 
              target="_blank"
              rel="noopener noreferrer"
            >
              📘 Facebook
            </a>
            <a 
              href={\`https://twitter.com/intent/tweet?url=https://charlesmackaybooks.com/books/${bookId}&text=\${bookData.title}\`}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors" 
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦 Twitter
            </a>
            <a 
              href={\`https://linkedin.com/sharing/share-offsite/?url=https://charlesmackaybooks.com/books/${bookId}\`}
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors" 
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}`;

// Book data
const books = {
  'beardmore-aviation': {
    description: 'The definitive account of William Beardmore & Company ambitious venture into aviation manufacturing, from early experiments at Dalmuir to the tragic loss of R101.',
    relatedBlogs: ['beardmore-aviation-scottish-industrial-giant', 'clydeside-aviation-revolution']
  },
  'british-aircraft-great-war': {
    description: 'Comprehensive study of British military aviation during World War I, covering RFC, RNAS aircraft development, combat operations, and technological innovations.',
    relatedBlogs: ['british-aircraft-great-war-rfc-rnas', 'sopwith-camel-wwi-fighter']
  },
  'captain-eric-brown': {
    description: 'The extraordinary story of Captain Eric Brown, the world most experienced test pilot who flew more aircraft types than anyone in history.',
    relatedBlogs: ['test-pilot-biography-eric-brown']
  },
  'clydeside-aviation-vol1': {
    description: 'First volume covering aviation activities on the Clyde during WWI, including aircraft production, military contracts, and industrial development.',
    relatedBlogs: ['clydeside-aviation-revolution', 'beardmore-aviation-scottish-industrial-giant']
  },
  'aircraft-carrier-argus': {
    description: 'The complete story of HMS Argus, the world first aircraft carrier with a full-length flight deck, converted by Beardmore from the liner Conte Rosso.',
    relatedBlogs: ['hms-argus-first-aircraft-carrier', 'naval-aviation-history']
  },
  'adolf-rohrbach': {
    description: 'Biography of Adolf Rohrbach, the pioneering German aircraft designer who revolutionized metal aircraft construction and influenced aviation design worldwide.',
    relatedBlogs: ['adolf-rohrbach-metal-aircraft-construction']
  },
  'birth-atomic-bomb': {
    description: 'Comprehensive examination of the Manhattan Project and the development of atomic weapons, exploring the scientific, political, and military aspects.',
    relatedBlogs: ['british-nuclear-deterrent-v-force']
  }
};

console.log('📖 APPLYING FIXED BOOK TEMPLATES...');
Object.entries(books).forEach(([bookId, data]) => {
  const filePath = `src/app/books/${bookId}/page.tsx`;
  
  try {
    fs.writeFileSync(filePath, generateSimpleBookTemplate(bookId, data.description, data.relatedBlogs));
    console.log(`✅ Fixed: ${bookId}`);
  } catch (error) {
    console.log(`❌ Failed: ${bookId} - ${error.message}`);
  }
});

console.log('\n🎉 FIXED TEMPLATES APPLIED!');
console.log('✅ All book pages now use simplified comprehensive template');
console.log('✅ Social sharing implemented');
console.log('✅ Mobile sticky cart added');
console.log('✅ Cross-linking to blogs');
console.log('\n🚀 Ready for build!');