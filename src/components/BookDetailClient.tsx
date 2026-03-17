'use client';

import { useEffect, useState } from 'react';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { trackEbayRedirect, trackBuyNowIntent } = useAnalytics();
  const { addToRecentlyViewed } = useRecentlyViewed();
  useEffect(() => {
    addToRecentlyViewed(book);
  }, [book, addToRecentlyViewed]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 200);
  };

  const handleBuyNow = () => {
    if (isBuyingNow) return;
    setIsBuyingNow(true);
    trackBuyNowIntent({
      id: book.id,
      title: book.title,
      category: book.category || 'Aviation Books',
      price: book.price,
    }, 'book-detail');
    addToCart(book);
    // Same basket as Add to basket – go to checkout basket step first
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 200);
  };

  const handleEbayClick = () => {
    trackEbayRedirect(book.title);
  };

  const isPreOrder = book.authorInsights?.toLowerCase().includes('pre-order') || book.authorInsights?.toLowerCase().includes('release date');

  return (
    <div className="space-y-4 pb-8">
      <div className="rounded-xl border border-white/15 bg-slate-800/70 p-4 sm:p-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-white/70">Price</p>
          <div className="text-4xl font-bold text-white mb-1">£{book.price.toFixed(2)}</div>
          <div className="text-sm text-white/80">{book.condition} condition</div>
          <div className="text-sm mt-1">
            {isPreOrder ? (
              <span className="text-blue-300 font-semibold">Available for pre-order</span>
            ) : book.inStock ? (
              <span className="text-green-300 font-semibold">In stock</span>
            ) : (
              <span className="text-red-300 font-semibold">Out of stock</span>
            )}
          </div>
          {isPreOrder && book.authorInsights && (
            <div className="text-sm text-white/70 mt-2">
              {book.authorInsights.match(/Release date:?\s*([^\.]+)/i)?.[1] || 'Pre-order available'}
            </div>
          )}
          {!isPreOrder && book.inStock && (
            <div className="text-xs text-green-200 mt-2 font-medium">
              Ready to dispatch. Free worldwide shipping.
            </div>
          )}
        </div>

        <div className="mt-4 grid gap-3">
          {(book.inStock || isPreOrder) && (
            <>
              <button
                onClick={handleBuyNow}
                disabled={isBuyingNow}
                className="w-full bg-white text-slate-900 py-3 px-4 disabled:opacity-60 text-base font-bold rounded-lg min-h-[48px] hover:bg-gray-100 transition-colors border border-slate-900"
              >
                {isBuyingNow ? 'Opening checkout...' : 'Buy now - secure checkout'}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-slate-700 text-white py-3 px-4 disabled:opacity-60 text-sm font-semibold rounded-lg min-h-[44px] hover:bg-slate-600 transition-colors border border-white/20"
              >
                {isAddingToCart ? 'Adding...' : 'Add to basket'}
              </button>

              <p className="text-center text-xs text-white/60 pt-1">
                <a
                  href="https://www.ebay.co.uk/usr/chaza87"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEbayClick}
                  className="underline hover:text-white/80 transition-colors"
                >
                  Also available on eBay
                </a>
              </p>
            </>
          )}

          {!book.inStock && !isPreOrder && (
            <button
              disabled
              className="w-full bg-gray-500 text-white py-3 px-4 cursor-not-allowed text-sm font-semibold rounded-lg min-h-[44px]"
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
