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
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <Link href={`/books/${book.id}`} onClick={handleBookClick} className="block">
        <div className="relative h-72 overflow-hidden bg-gray-100">
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
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
              £{book.price}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {book.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {book.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              {book.category}
            </span>
            <span>{book.condition}</span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-2">
        {book.inStock ? (
          <>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
            </button>

            <button
              onClick={handleEbayClick}
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-sm font-medium"
            >
              🛒 Buy on eBay
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed text-sm font-medium"
          >
            📋 Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
