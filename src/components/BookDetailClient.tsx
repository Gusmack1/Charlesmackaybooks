'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { addToCart, openBasket } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { trackEbayRedirect, trackContactEmail } = useAnalytics();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket(); // Open basket sidebar after adding item
    }, 500);
  };

  const handleEbayClick = () => {
    // Track eBay redirect analytics
    trackEbayRedirect(book.title);
  };

  const handleEmailClick = () => {
    // Track email click analytics
    trackContactEmail();
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
      // Enhanced tracking parameters
      custom: `ISBN:${book.isbn || 'N/A'}|TITLE:${book.title}|CUSTOMER_EMAIL:WILL_BE_FILLED`,
      invoice: `CM-${book.id}-${Date.now()}`,
      notify_url: 'https://charlesmackaybooks.com/api/paypal-ipn'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">£{book.price}</div>
        <div className="text-sm text-gray-600">{book.condition} condition</div>
        <div className="text-sm text-gray-600">
          {book.inStock ? (
            <span className="text-green-600 font-semibold">✓ In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">✗ Out of Stock</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {book.inStock && (
          <>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
            </button>

            <a
              href="https://www.ebay.co.uk/usr/chaza87"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEbayClick}
              className="block w-full bg-yellow-500 text-black text-center px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              🛒 Buy on eBay Store
            </a>
          </>
        )}

        {!book.inStock && (
          <button
            disabled
            className="block w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            📋 Notify When Available
          </button>
        )}
      </div>

      {/* Shipping Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mt-4">
        <div className="font-bold text-blue-800 mb-2">📦 Royal Mail Shipping</div>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="bg-blue-100 border border-blue-300 rounded p-2">
            <div className="font-semibold text-blue-900">Book Weight: {(book as any).weight || 300}g</div>
          </div>
          <div className="text-blue-800 font-medium">
            <strong>UK</strong> £1.95-£4.79 • <strong>Europe</strong> £3.85-£15.85 • <strong>Rest of World</strong> £4.20-£18.85
          </div>
          <div className="text-blue-600 font-medium">🚚 Fast, secure shipping worldwide • Weight-based pricing</div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center pt-3 border-t">
        <a
          href="mailto:charlese1mackay@hotmail.com"
          onClick={handleEmailClick}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          📧 Contact Charles for bulk orders
        </a>
      </div>
    </div>
  );
}
