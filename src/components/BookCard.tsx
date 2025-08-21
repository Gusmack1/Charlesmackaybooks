'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  sourceContext?: string; // e.g., 'category-page', 'homepage', 'search-results'
}

export default function BookCard({ book, sourceContext = 'unknown' }: BookCardProps) {
  const { addToCart, openBasket } = useCart();
  const { trackBookView, trackEbayRedirect, trackAviationEvent } = useAnalytics();
  const [imgSrc, setImgSrc] = useState(book.imageUrl || `/book-covers/${book.id}.jpg`);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket(); // Open basket sidebar after adding item
    }, 500);
  };

  const handleEbayClick = () => {
    // Track eBay redirect with new analytics system
    trackEbayRedirect(book.title);

    // Track source context for better insights
    trackAviationEvent('ebay_click_from_card', {
      book_id: book.id,
      book_title: book.title,
      category: book.category,
      source_context: sourceContext,
      price: book.price,
      event_label: 'external_purchase_intent'
    });

    window.open(book.ebayUrl || `https://www.ebay.co.uk/usr/chaza87`, '_blank');
  };

  const handleBookClick = () => {
    // Track book view with context of where the click came from
    trackBookView({
      id: book.id,
      title: book.title,
      category: book.category,
      price: book.price,
      author: 'Charles E. MacKay',
      isbn: book.isbn
    });

    // Track aviation-specific browsing behavior
    trackAviationEvent('book_card_click', {
      book_id: book.id,
      book_title: book.title,
      category: book.category,
      source_context: sourceContext,
      price: book.price,
      event_label: 'book_detail_navigation'
    });
  };

  const generatePayPalUrl = (book: Book) => {
    const baseUrl = 'https://www.paypal.com/cgi-bin/webscr';
    const params = new URLSearchParams({
      cmd: '_xclick',
      business: 'charlese1mackay@hotmail.com',
      item_name: `${book.title} - Aviation History Book by Charles E. MacKay`,
      item_number: book.isbn || book.id,
      amount: book.price.toString(),
      currency_code: 'GBP',
      no_shipping: '0',
      no_note: '0',
      tax: '0',
      lc: 'GB',
      bn: 'PP-BuyNowBF',
      return: 'https://charlesmackaybooks.com/thank-you',
      cancel_return: 'https://charlesmackaybooks.com/books',
      custom: `ISBN:${book.isbn || 'N/A'}|TITLE:${book.title}|SOURCE:${sourceContext}`,
      invoice: `CM-${book.id}-${Date.now()}`,
      notify_url: 'https://charlesmackaybooks.com/api/paypal-ipn'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div
      className="group card overflow-hidden hover:shadow-lg transition-shadow"
      id={`book-${book.isbn || book.id}`}
    >
      <Link href={`/books/${book.id}`} onClick={handleBookClick} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
          <Image
            src={imgSrc}
            alt={`${book.title} by Charles E. MacKay`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgSrc('/book-covers/placeholder-book.svg')}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
          <div className="absolute top-2 right-2">
            <span className="badge badge-green text-sm">
              £{book.price}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 group-hover:text-accent-blue transition-colors line-clamp-2 text-primary" itemProp="name">
            {book.title}
          </h3>

          <p className="text-secondary text-base mb-4 line-clamp-3" itemProp="description">
            {book.description}
          </p>

          {(book.era || book.aircraftTypes || book.geographicFocus) && (
            <div className="text-sm text-muted mb-4">
              {book.era && book.era.length > 0 && (
                <span className="mr-3"><span className="font-semibold text-primary">Era:</span> {book.era[0]}</span>
              )}
              {book.aircraftTypes && book.aircraftTypes.length > 0 && (
                <span className="mr-3"><span className="font-semibold text-primary">Focus:</span> {book.aircraftTypes[0]}</span>
              )}
              {book.geographicFocus && book.geographicFocus.length > 0 && (
                <span><span className="font-semibold text-primary">Region:</span> {book.geographicFocus[0]}</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-base text-muted mb-4">
            <span className="badge badge-gray text-sm px-3 py-2 rounded">
              {book.category}
            </span>
            <span>{book.condition}</span>
          </div>
          
          <div className="text-sm text-muted mb-3">
            📦 Weight: {(book as any).weight || 300}g • 🏷️ ISBN: {book.isbn || 'N/A'}
          </div>

          {/* microdata removed; rely on JSON-LD for Product/Offer schema */}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        {book.inStock ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 disabled:opacity-50 text-sm font-semibold rounded-lg min-h-[44px] hover:from-blue-700 hover:to-blue-900 transition-all duration-200 flex items-center justify-center"
            >
              {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
            </button>

            <button
              onClick={handleEbayClick}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 text-sm font-semibold rounded-lg min-h-[44px] hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 7.5c-.3-.3-.7-.5-1.2-.5H4.7c-.5 0-.9.2-1.2.5L2 9.8v8.4c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5V9.8l-1.5-2.3zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
              </svg>
              Buy on eBay
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-3 px-4 cursor-not-allowed text-sm font-semibold rounded-lg min-h-[44px]"
          >
            📋 Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
