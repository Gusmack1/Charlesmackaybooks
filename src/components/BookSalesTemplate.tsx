'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BookData {
  id: string
  title: string
  subtitle?: string
  price: number
  pageCount: number
  isbn: string
  publicationYear: number
  description: string
  category: string
  tags: string[]
  imageUrl: string
  ebayLink?: string
  features: string[]
  academicRecognition: string[]
  customerReviews: Array<{
    rating: number
    text: string
    author: string
    source: string
  }>
}

interface RelatedBlog {
  slug: string
  title: string
  excerpt: string
  readTime: string
}

interface BookSalesTemplateProps {
  book: BookData
  relatedBlogs: RelatedBlog[]
  relatedBooks: BookData[]
}

export default function BookSalesTemplate({ book, relatedBlogs, relatedBooks }: BookSalesTemplateProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMobileSticky, setShowMobileSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300
      setIsScrolled(scrolled)
      setShowMobileSticky(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `${book.title} by Charles E. MacKay`
  const shareText = `Expert aviation history: ${book.title} - ${book.description.substring(0, 100)}...`

  const socialShares = {
    facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&hashtags=AviationHistory,Books`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${book.imageUrl}&description=${encodeURIComponent(shareTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=Check out this aviation history book: ${shareUrl}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Social Sharing Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="hidden md:inline">📢 Share this book:</span>
            <div className="flex gap-3">
              <a href={socialShares.facebook} target="_blank" rel="noopener noreferrer"
                 className="hover:bg-blue-800 px-3 py-1 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                 aria-label="Share on Facebook">
                📘 Facebook
              </a>
              <a href={socialShares.twitter} target="_blank" rel="noopener noreferrer"
                 className="hover:bg-blue-800 px-3 py-1 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                 aria-label="Share on Twitter">
                🐦 Twitter
              </a>
              <a href={socialShares.linkedin} target="_blank" rel="noopener noreferrer"
                 className="hover:bg-blue-800 px-3 py-1 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                 aria-label="Share on LinkedIn">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white rounded-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={book.imageUrl}
                    alt={`${book.title} book cover`}
                    width={250}
                    height={350}
                    className="rounded-lg shadow-xl mx-auto"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{book.title}</h1>
                  {book.subtitle && (
                    <h2 className="text-xl text-blue-200 mb-4">{book.subtitle}</h2>
                  )}
                  <p className="text-lg text-blue-100 mb-4">By Charles E. MacKay</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <span className="text-blue-200">Pages:</span>
                      <div className="font-semibold">{book.pageCount}</div>
                    </div>
                    <div>
                      <span className="text-blue-200">Published:</span>
                      <div className="font-semibold">{book.publicationYear}</div>
                    </div>
                    <div>
                      <span className="text-blue-200">ISBN:</span>
                      <div className="font-semibold">{book.isbn}</div>
                    </div>
                    <div>
                      <span className="text-blue-200">Format:</span>
                      <div className="font-semibold">Paperback</div>
                    </div>
                  </div>

                  {/* Mobile Purchase Buttons */}
                  <div className="md:hidden flex flex-col gap-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">£{book.price}</div>
                      <p className="text-sm text-blue-200">Free worldwide shipping</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors min-h-[44px]">
                        🛒 Add to Cart
                      </button>
                      {book.ebayLink && (
                        <a href={book.ebayLink} target="_blank" rel="noopener noreferrer"
                           className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors min-h-[44px] flex items-center justify-center">
                          🏪 Buy on eBay
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Book</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>
              
              {book.features.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {book.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Academic Recognition */}
            {book.academicRecognition.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">🎓 Academic Recognition</h3>
                <div className="space-y-3">
                  {book.academicRecognition.map((recognition, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">🏛️</span>
                      <span className="text-blue-700">{recognition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Blog Posts */}
            {relatedBlogs.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-green-800 mb-4">📖 Expert Analysis</h3>
                <p className="text-green-700 mb-4">Dive deeper with our comprehensive blog coverage:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedBlogs.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`} 
                          className="block bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-blue-600 mb-2">{blog.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                      <div className="text-xs text-green-600 font-medium">
                        📖 {blog.readTime} read →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews */}
            {book.customerReviews.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">⭐ Customer Reviews</h3>
                <div className="space-y-6">
                  {book.customerReviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          by {review.author} - {review.source}
                        </span>
                      </div>
                      <p className="text-gray-700 italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className={`sticky top-8 transition-all duration-300 ${isScrolled ? 'top-4' : 'top-8'}`}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">£{book.price}</div>
                  <p className="text-sm text-gray-600">Free worldwide shipping</p>
                  <p className="text-xs text-green-600 font-medium">✓ In Stock - Ships within 24 hours</p>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors">
                    🛒 Add to Cart
                  </button>
                  {book.ebayLink && (
                    <a href={book.ebayLink} target="_blank" rel="noopener noreferrer"
                       className="block w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors">
                      🏪 Buy on eBay
                    </a>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">🔒 Secure Checkout</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      PayPal Secure Payment
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      30-Day Return Policy
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      100% Positive Feedback
                    </div>
                  </div>
                </div>

                {relatedBooks.length > 0 && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">📚 Complete Your Collection</h4>
                    <div className="space-y-3">
                      {relatedBooks.slice(0, 3).map((relatedBook) => (
                        <Link key={relatedBook.id} href={`/books/${relatedBook.id}`}
                              className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <Image
                              src={relatedBook.imageUrl}
                              alt={relatedBook.title}
                              width={40}
                              height={56}
                              className="rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-medium text-gray-900 truncate">
                                {relatedBook.title}
                              </h5>
                              <p className="text-sm text-green-600 font-medium">£{relatedBook.price}</p>
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
        </div>
      </div>

      {/* Mobile Sticky Purchase Bar */}
      {showMobileSticky && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
          <div className="flex justify-between items-center gap-4">
            <div>
              <div className="font-bold text-lg">£{book.price}</div>
              <div className="text-sm text-gray-600">Free shipping</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold min-h-[44px] transition-colors">
                🛒 Cart
              </button>
              {book.ebayLink && (
                <a href={book.ebayLink} target="_blank" rel="noopener noreferrer"
                   className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold min-h-[44px] flex items-center transition-colors">
                  🏪 eBay
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Social Sharing */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">📢 Share This Book</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <a href={socialShares.facebook} target="_blank" rel="noopener noreferrer"
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              📘 Share on Facebook
            </a>
            <a href={socialShares.twitter} target="_blank" rel="noopener noreferrer"
               className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              🐦 Share on Twitter
            </a>
            <a href={socialShares.linkedin} target="_blank" rel="noopener noreferrer"
               className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              💼 Share on LinkedIn
            </a>
            <a href={socialShares.pinterest} target="_blank" rel="noopener noreferrer"
               className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              📌 Share on Pinterest
            </a>
            <a href={socialShares.email}
               className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              ✉️ Share via Email
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            Help us reach more aviation enthusiasts by sharing this expert analysis!
          </p>
        </div>
      </div>
    </div>
  )
}