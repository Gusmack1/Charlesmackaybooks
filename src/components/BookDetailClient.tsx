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
  const { trackContactEmail, trackEbayRedirect } = useAnalytics();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket(); // Open basket sidebar after adding item
    }, 500);
  };

  const handleEmailClick = () => {
    // Track email click analytics
    trackContactEmail();
  };

  const handleEbayClick = () => {
    trackEbayRedirect(book.title);
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

  const isPreOrder = book.authorInsights?.toLowerCase().includes('pre-order') || book.authorInsights?.toLowerCase().includes('release date');

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="text-center">
        <div className="text-3xl font-bold text-accent-green mb-2">£{book.price}</div>
        <div className="text-sm text-secondary">{book.condition} condition</div>
        <div className="text-sm text-secondary">
          {isPreOrder ? (
            <span className="text-accent-blue font-semibold">📅 Available for Pre-Order</span>
          ) : book.inStock ? (
            <span className="text-accent-green font-semibold">✓ In Stock</span>
          ) : (
            <span className="text-accent-red font-semibold">✗ Out of Stock</span>
          )}
        </div>
        {isPreOrder && book.authorInsights && (
          <div className="text-sm text-secondary mt-2">
            {book.authorInsights.match(/Release date:?\s*([^\.]+)/i)?.[1] || 'Pre-order available'}
          </div>
        )}
      </div>

      {/* Action Buttons - Match homepage styling */}
      <div className="space-y-3">
        {(book.inStock || isPreOrder) && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-white text-slate-900 py-3 px-4 disabled:opacity-50 text-sm font-semibold rounded-lg min-h-[44px] hover:bg-gray-100 transition-all duration-200 flex items-center justify-center border border-slate-900"
            >
              {isAddingToCart ? '🔄 Adding...' : isPreOrder ? '📅 Pre-Order Now' : '🛒 Add to Basket'}
            </button>

            <a
              href="https://www.ebay.co.uk/usr/chaza87"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEbayClick}
              className="bg-white text-slate-900 py-3 px-4 text-sm font-semibold rounded-lg min-h-[44px] hover:bg-gray-100 transition-all duration-200 flex items-center justify-center border border-slate-900"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 7.5c-.3-.3-.7-.5-1.2-.5H4.7c-.5 0-.9.2-1.2.5L2 9.8v8.4c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5V9.8l-1.5-2.3zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
              </svg>
              Buy on eBay
            </a>
          </div>
        )}

        {!book.inStock && !isPreOrder && (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-3 px-4 cursor-not-allowed text-sm font-semibold rounded-lg min-h-[44px]"
          >
            📋 Out of Stock
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

      <div className="mt-4 border border-white/10 rounded-lg bg-white/5 px-4 py-3 text-sm text-white/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>🚚 Free UK shipping · 2–5 day dispatch</div>
          <div>↩️ 30-day returns</div>
          <div>🔒 Secure checkout (PayPal & card)</div>
        </div>
      </div>


    </div>
  );
}
