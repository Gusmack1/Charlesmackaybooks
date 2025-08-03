'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, Heart, Share2, Star, Shield, Truck, Clock, 
  Gift, CreditCard, Lock, CheckCircle, Users, BookOpen, 
  ChevronDown, ChevronUp, Eye, Download, Play
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  isbn: string;
  publishedDate: string;
  pageCount: number;
  dimensions: string;
  description: string;
  plotSummary: string;
  authorBio: string;
  cover: {
    url: string;
    alt: string;
  };
  formats: Array<{
    type: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
    price: number;
    originalPrice?: number;
    availability: 'in-stock' | 'limited' | 'pre-order' | 'out-of-stock';
    estimatedDelivery?: string;
  }>;
  reviews: {
    average: number;
    count: number;
    distribution: Record<string, number>;
    featured: Array<{
      author: string;
      rating: number;
      comment: string;
      verified: boolean;
      date: string;
    }>;
  };
  series?: {
    name: string;
    bookNumber: number;
    otherBooks: Array<{
      id: string;
      title: string;
      cover: string;
      price: number;
    }>;
  };
  relatedBooks: Array<{
    id: string;
    title: string;
    author: string;
    cover: string;
    price: number;
    rating: number;
  }>;
  sample: {
    firstChapter: string;
    audioPreview?: string;
  };
  editorialReviews: Array<{
    source: string;
    quote: string;
    rating?: string;
  }>;
  awards?: string[];
  categories: string[];
  tags: string[];
}

interface OptimizedBookSalesTemplateProps {
  book: Book;
}

export default function OptimizedBookSalesTemplate({ book }: OptimizedBookSalesTemplateProps) {
  const [selectedFormat, setSelectedFormat] = useState(book.formats[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showSample, setShowSample] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  // Sticky buy bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowStickyBar(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateDiscountPercentage = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100);
  };

  const addToCart = () => {
    setCartItemCount(prev => prev + quantity);
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: selectedFormat.price * quantity,
        items: [{
          item_id: book.id,
          item_name: book.title,
          category: book.categories[0],
          quantity: quantity,
          price: selectedFormat.price
        }]
      });
    }
  };

  const buyNow = () => {
    // Direct checkout logic
    addToCart();
    // Redirect to checkout
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = `${book.title} by ${book.author}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-white">
      {/* Sticky Buy Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-16">
                <Image
                  src={book.cover.url}
                  alt={book.cover.alt}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 truncate max-w-xs">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${selectedFormat.price}
                </div>
                {selectedFormat.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${selectedFormat.originalPrice}
                  </div>
                )}
              </div>
              
              <button
                onClick={buyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Book Cover and Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <Image
                src={book.cover.url}
                alt={book.cover.alt}
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
              
              {/* Look Inside Badge */}
              <button
                onClick={() => setShowSample(true)}
                className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Look Inside
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {book.awards && book.awards.length > 0 && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  🏆 Award Winner
                </span>
              )}
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ In Stock
              </span>
              {selectedFormat.originalPrice && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  🔥 {calculateDiscountPercentage(selectedFormat.originalPrice, selectedFormat.price)}% Off
                </span>
              )}
            </div>

            {/* Title and Author */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-xl text-gray-600 mb-4">{book.subtitle}</p>
              )}
              <p className="text-lg text-gray-700">
                by <span className="font-semibold text-blue-600">{book.author}</span>
              </p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(book.reviews.average)
                        ? 'text-yellow-400 fill-current'
                        : star === Math.ceil(book.reviews.average)
                        ? 'text-yellow-400 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{book.reviews.average}</span>
              <button
                onClick={() => setShowReviews(true)}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                ({book.reviews.count} reviews)
              </button>
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Format</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {book.formats.map((format) => (
                  <button
                    key={format.type}
                    onClick={() => setSelectedFormat(format)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedFormat.type === format.type
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium capitalize">{format.type}</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${format.price}</div>
                        {format.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${format.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {format.availability === 'in-stock' && (
                        <span className="text-green-600">✓ In Stock</span>
                      )}
                      {format.availability === 'limited' && (
                        <span className="text-orange-600">⚠ Limited Stock</span>
                      )}
                      {format.availability === 'pre-order' && (
                        <span className="text-blue-600">📅 Pre-order</span>
                      )}
                      {format.estimatedDelivery && (
                        <div className="mt-1">
                          <Truck className="w-3 h-3 inline mr-1" />
                          {format.estimatedDelivery}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Purchase Buttons */}
              <div className="space-y-3">
                <button
                  onClick={buyNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now - ${(selectedFormat.price * quantity).toFixed(2)}
                </button>
                
                <button
                  onClick={addToCart}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Alternative Purchase Options */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Also available at:</h4>
                <div className="flex gap-2">
                  {['Amazon', 'Barnes & Noble', 'eBay'].map((store) => (
                    <button
                      key={store}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 transition-colors"
                    >
                      {store}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4 text-green-500" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-500" />
                <span>Free shipping over $25</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Gift className="w-4 h-4 text-green-500" />
                <span>Gift wrapping available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Book Details Tabs */}
        <section className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description', active: showDescription },
                { id: 'reviews', label: `Reviews (${book.reviews.count})`, active: showReviews },
                { id: 'details', label: 'Details', active: false }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setShowDescription(tab.id === 'description');
                    setShowReviews(tab.id === 'reviews');
                  }}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    tab.active
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Description Tab */}
          {showDescription && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Book</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Plot Summary</h3>
                <p className="text-gray-700 leading-relaxed">{book.plotSummary}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About the Author</h3>
                <p className="text-gray-700 leading-relaxed">{book.authorBio}</p>
              </div>

              {book.editorialReviews.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Editorial Reviews</h3>
                  <div className="space-y-4">
                    {book.editorialReviews.map((review, index) => (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="text-gray-700 italic mb-2">"{review.quote}"</p>
                        <footer className="text-sm text-gray-600">
                          — {review.source}
                          {review.rating && (
                            <span className="ml-2 font-semibold">{review.rating}</span>
                          )}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {showReviews && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold">{book.reviews.average}</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(book.reviews.average)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on {book.reviews.count} reviews
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Rating Distribution</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${((book.reviews.distribution[rating] || 0) / book.reviews.count) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {book.reviews.distribution[rating] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Reviews */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Featured Reviews</h4>
                <div className="space-y-6">
                  {book.reviews.featured.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">{review.author}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Verified Purchase
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Related Books */}
        {book.relatedBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers Also Bought</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {book.relatedBooks.map((relatedBook) => (
                <div key={relatedBook.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                    <Image
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm">
                    {relatedBook.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">by {relatedBook.author}</p>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= Math.floor(relatedBook.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-green-600 text-sm">${relatedBook.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Series Information */}
        {book.series && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {book.series.name} Series
            </h2>
            <p className="text-gray-600 mb-4">
              This is book {book.series.bookNumber} in the {book.series.name} series
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {book.series.otherBooks.map((seriesBook) => (
                <div key={seriesBook.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                    <Image
                      src={seriesBook.cover}
                      alt={seriesBook.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm">
                    {seriesBook.title}
                  </h3>
                  <p className="font-bold text-green-600 text-sm">${seriesBook.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": book.title,
            "description": book.description,
            "image": book.cover.url,
            "author": {
              "@type": "Person",
              "name": book.author
            },
            "isbn": book.isbn,
            "numberOfPages": book.pageCount,
            "datePublished": book.publishedDate,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": book.reviews.average,
              "reviewCount": book.reviews.count
            },
            "offers": book.formats.map(format => ({
              "@type": "Offer",
              "price": format.price,
              "priceCurrency": "USD",
              "availability": format.availability === 'in-stock' 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition",
              "format": format.type
            }))
          })
        }}
      />
    </div>
  );
}