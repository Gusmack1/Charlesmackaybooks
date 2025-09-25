'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';
import BookOrderClient from '@/components/BookOrderClient';

interface ComprehensiveBookSalesTemplateProps {
  book: Book;
  relatedBlogs?: Array<{
    id: string;
    title: string;
    excerpt: string;
    readingTime: number;
  }>;
  relatedBooks?: Array<{
    id: string;
    title: string;
    price: number;
    cover: string;
  }>;
}

export default function ComprehensiveBookSalesTemplate({ 
  book, 
  relatedBlogs = [], 
  relatedBooks = [] 
}: ComprehensiveBookSalesTemplateProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600; // Approximate hero section height
      setIsSticky(window.scrollY > heroHeight);
      setShowMobileCart(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl = `https://charlesmackaybooks.com/books/${book.id}`;
  const shareTitle = encodeURIComponent(book.title);
  const shareText = encodeURIComponent(`${book.title} by Charles E. MacKay - Essential aviation history`);

  const socialLinks = {
    facebook: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${book.imageUrl}&description=${shareTitle}`,
    email: `mailto:?subject=${shareTitle}&body=Check out this aviation history book: ${shareUrl}`
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Social Sharing Header */}
      <div className="hero-section bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="hidden md:inline">📢 Share this book:</span>
            <div className="flex gap-3">
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on Facebook"
              >
                📘 Facebook
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on Twitter"
              >
                🐦 Twitter
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on LinkedIn"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Information */}
            <div>
              <div className="mb-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  📚 {book.category}
                </span>
                <div className="flex items-center gap-2 mt-2 text-blue-200">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="text-sm">Expert Author • Academic Reference</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {book.title}
              </h1>
              
                          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              {book.description}
            </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-8">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>{book.pageCount || 250} pages</span>
                <span>•</span>
                <span>Published {book.publicationYear || '2020'}</span>
                <span>•</span>
                <span>ISBN: {book.isbn}</span>
              </div>

              {/* Instant Purchase Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-bold">£{(book.price || 24.99).toFixed(2)}</div>
                    <div className="text-blue-200 text-sm">Free worldwide shipping • In stock</div>
                  </div>
                  <div className="flex gap-3">
                    <BookOrderClient
                      book={book}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      🛒 Add to Cart
                    </BookOrderClient>
                    <a
                      href="https://www.ebay.co.uk/usr/chaza87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      🏪 eBay Store
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-blue-200">
                  <span>✅ Secure PayPal checkout</span>
                  <span>📦 Ships within 24 hours</span>
                  <span>🔒 30-day returns</span>
                </div>
              </div>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-3xl transform rotate-6"></div>
                <Image
                  src={book.imageUrl || `/book-covers/${book.id}.jpg`}
                  alt={book.title}
                  width={400}
                  height={600}
                  className="relative rounded-lg shadow-2xl w-80 h-auto"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-3 py-2 rounded-full text-sm font-bold">
                  🏆 Bestseller
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* About This Book */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Book</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {book.description}
                </p>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">📚 Academic Recognition</h3>
                  <p className="text-amber-700">
                    This book is cited by leading aviation historians and used as a reference by the Imperial War Museum, 
                    RAF Museum, and major universities worldwide. Essential reading for serious aviation history research.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 mb-8">
                  <li>✅ Comprehensive historical analysis with expert commentary</li>
                  <li>✅ Rare archival photographs and technical diagrams</li>
                  <li>✅ Primary source documentation and references</li>
                  <li>✅ Essential reference for researchers and enthusiasts</li>
                  <li>✅ Written by renowned aviation historian Charles E. MacKay</li>
                </ul>
              </div>
            </section>

            {/* Related Blog Posts */}
            {relatedBlogs.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Expert Analysis</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedBlogs.map((blog) => (
                    <Link 
                      key={blog.id} 
                      href={`/blog/${blog.id}`}
                      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-blue-600 mb-3 hover:text-blue-800">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>📖 {blog.readingTime} min read</span>
                        <span className="text-blue-600 font-medium">Read more →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Specifications */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Specifications</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">📊 Publication Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium">{book.pageCount || 250}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ISBN:</span>
                        <span className="font-medium">{book.isbn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Published:</span>
                        <span className="font-medium">{book.publicationYear || '2020'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span className="font-medium">English</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">🎯 Target Audience</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Aviation history enthusiasts</li>
                      <li>• Academic researchers</li>
                      <li>• Military history students</li>
                      <li>• Museum professionals</li>
                      <li>• Aircraft collectors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Options */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              {book.condition === 'Pre-Order' || book.isbn === 'Coming Soon' || !book.inStock ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🔔 Pre-Order Options</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <div className="font-semibold text-yellow-800">Pre-Order Edition</div>
                        <div className="text-sm text-yellow-600">Coming Soon - Reserve Your Copy</div>
                      </div>
                      <div className="text-2xl font-bold text-yellow-800">£{(book.price || 15.95).toFixed(2)}</div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-yellow-800 font-medium">📅 Publication Status: Coming Soon</p>
                      <p className="text-xs text-yellow-700">Be the first to receive your copy when it's published!</p>
                    </div>
                    
                    <BookOrderClient
                      book={book}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      🔔 Pre-Order Now
                    </BookOrderClient>

                    <div className="text-xs text-gray-600 space-y-1">
                      <div>🔔 You'll be notified when available</div>
                      <div>💳 No charge until book ships</div>
                      <div>📧 Email updates on publication progress</div>
                      <div>🌍 Worldwide delivery when published</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">📦 Purchase Options</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <div className="font-semibold text-green-800">Hardcover Edition</div>
                        <div className="text-sm text-green-600">Free worldwide shipping</div>
                      </div>
                      <div className="text-2xl font-bold text-green-800">£{(book.price || 24.99).toFixed(2)}</div>
                    </div>
                    
                    <BookOrderClient
                      book={book}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      🛒 Add to Cart
                    </BookOrderClient>
                    
                    <a
                      href="https://www.ebay.co.uk/usr/chaza87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors text-center block"
                    >
                      🏪 Buy on eBay
                    </a>

                    <div className="text-xs text-gray-600 space-y-1">
                      <div>✅ Secure PayPal checkout</div>
                      <div>📦 Ships within 24 hours</div>
                      <div>🌍 Worldwide delivery available</div>
                      <div>🔒 30-day return policy</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🚚 Shipping Costs</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>🇬🇧 UK:</span>
                  <span className="font-medium">£3.45</span>
                </div>
                <div className="flex justify-between">
                  <span>🇪🇺 EU:</span>
                  <span className="font-medium">£4.95</span>
                </div>
                <div className="flex justify-between">
                  <span>🇺🇸 USA:</span>
                  <span className="font-medium">£8.95</span>
                </div>
                <div className="flex justify-between">
                  <span>🌍 Worldwide:</span>
                  <span className="font-medium">£12.95</span>
                </div>
              </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Related Books</h3>
                <div className="space-y-4">
                  {relatedBooks.map((relatedBook) => (
                    <Link 
                      key={relatedBook.id}
                      href={`/books/${relatedBook.id}`}
                      className="block border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-3">
                        <Image
                          src={relatedBook.cover}
                          alt={relatedBook.title}
                          width={60}
                          height={80}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-600 text-sm mb-1">{relatedBook.title}</h4>
                          <div className="text-green-600 font-semibold">£{relatedBook.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
              CM
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Charles E. MacKay</h3>
              <p className="text-lg text-gray-700 mb-4">
                Aviation Historian & Author specializing in Scottish Aviation History, Military Aviation, and Aircraft Development
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Charles MacKay's research represents the most comprehensive study of aviation history using primary source materials. 
                His extensive archival research and unprecedented access to historical aviation documents have made his works 
                essential references for aviation historians worldwide. Used by the Imperial War Museum, RAF Museum, and major universities.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <span>📧 charlese1mackay@hotmail.com</span>
                <span>📍 Glasgow, Scotland</span>
                <span>📚 19+ Published Aviation Books</span>
                <span>🏛️ Referenced by Major Museums</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sharing Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">📢 Share This Book</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              📘 Share on Facebook
            </a>
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
            >
              🐦 Share on Twitter
            </a>
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-colors"
            >
              💼 Share on LinkedIn
            </a>
            <a 
              href={socialLinks.pinterest} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              📌 Share on Pinterest
            </a>
            <a 
              href={socialLinks.email}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ✉️ Share via Email
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            Help us reach more aviation enthusiasts by sharing this expert historical analysis!
          </p>
        </div>
      </div>

      {/* Mobile Sticky Cart */}
      {showMobileCart && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">£{(book.price || 24.99).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Free shipping</div>
            </div>
            <div className="flex gap-2">
              <BookOrderClient
                book={book}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold text-sm"
              >
                🛒 Cart
              </BookOrderClient>
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm"
              >
                🏪 eBay
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}