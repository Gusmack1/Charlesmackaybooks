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
        <div className="text-3xl font-bold text-accent-green mb-2">£{book.price}</div>
        <div className="text-sm text-gray-600">{book.condition} condition</div>
        <div className="text-sm text-gray-600">
          {book.inStock ? (
            <span className="text-accent-green font-semibold">✓ In Stock</span>
          ) : (
                          <span className="text-accent-red font-semibold">✗ Out of Stock</span>
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

      {/* Contact */}
      <div className="text-center pt-3 border-t">
        <a
          href="mailto:charlese1mackay@hotmail.com"
          onClick={handleEmailClick}
                        className="text-accent-blue hover:text-blue-800 text-sm font-medium"
        >
          📧 Contact Charles for bulk orders
        </a>
      </div>
    </div>
  );
}
