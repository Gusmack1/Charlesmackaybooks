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
      itemScope
      itemType="https://schema.org/Product"
      id={`book-${book.isbn || book.id}`}
    >
      <Link href={`/books/${book.id}`} onClick={handleBookClick} className="block">
        <div className="relative h-72 overflow-hidden bg-secondary">
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

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-accent-blue transition-colors line-clamp-2 text-primary" itemProp="name">
            {book.title}
          </h3>

          <p className="text-secondary text-sm mb-3 line-clamp-2" itemProp="description">
            {book.description}
          </p>

          {(book.era || book.aircraftTypes || book.geographicFocus) && (
            <div className="text-xs text-muted mb-3">
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

          <div className="flex items-center justify-between text-sm text-muted mb-3">
            <span className="badge badge-gray text-xs px-2 py-1 rounded">
              {book.category}
            </span>
            <span>{book.condition}</span>
          </div>
          
          <div className="text-xs text-muted mb-2">
            📦 Weight: {(book as any).weight || 300}g • 🏷️ ISBN: {book.isbn || 'N/A'}
          </div>

          {/* Invisible microdata meta for additional product identifiers */}
          <meta itemProp="sku" content={book.isbn || book.id} />
          <meta itemProp="gtin13" content={book.isbn || book.id} />
          <meta itemProp="productID" content={`isbn:${book.isbn || book.id}`} />
          <meta itemProp="category" content="Books" />
          <meta itemProp="author" content="Charles E. MacKay" />

          {/* Non-visual Offer microdata */}
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
            <meta itemProp="price" content={Number(book.price).toFixed(2)} />
            <meta itemProp="priceCurrency" content="GBP" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
            <meta itemProp="seller" content="Charles E. MacKay Books" />
            <link itemProp="url" href={`https://charlesmackaybooks.com#${book.isbn || book.id}`} />
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
              className="w-full badge badge-green py-3 px-5 disabled:opacity-50 text-base font-semibold rounded-lg min-h-[44px]"
            >
              {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
            </button>

            <button
              onClick={handleEbayClick}
              className="w-full badge badge-amber py-3 px-5 text-base font-semibold rounded-lg min-h-[44px]"
            >
              🛒 Buy on eBay
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full badge badge-gray py-3 px-5 cursor-not-allowed text-base font-semibold rounded-lg min-h-[44px]"
          >
            📋 Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
