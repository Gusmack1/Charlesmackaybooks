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
        <div className="relative h-96 overflow-hidden bg-secondary">
          <Image
            src={imgSrc}
            alt={`${book.title} by Charles E. MacKay`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
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
      <div className="px-6 pb-6 space-y-3">
        {book.inStock ? (
          <>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full badge badge-green py-4 px-6 disabled:opacity-50 text-lg font-semibold rounded-lg min-h-[52px]"
            >
              {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
            </button>

            <button
              onClick={handleEbayClick}
              className="w-full badge badge-amber py-4 px-6 text-lg font-semibold rounded-lg min-h-[52px]"
            >
              🛒 Buy on eBay
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full badge badge-gray py-4 px-6 cursor-not-allowed text-lg font-semibold rounded-lg min-h-[52px]"
          >
            📋 Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
