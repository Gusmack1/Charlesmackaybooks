'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { addToCart, openBasket } = useCart();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { trackContactEmail, trackEbayRedirect } = useAnalytics();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket(); // Open basket sidebar after adding item
    }, 500);
  };

  const handleBuyNow = () => {
    if (isBuyingNow) return;
    setIsBuyingNow(true);
    addToCart(book);
    setTimeout(() => {
      router.push('/checkout?method=stripe');
    }, 250);
  };

  const handleEmailClick = () => {
    // Track email click analytics
    trackContactEmail();
  };

  const handleEbayClick = () => {
    trackEbayRedirect(book.title);
  };

  const isPreOrder = book.authorInsights?.toLowerCase().includes('pre-order') || book.authorInsights?.toLowerCase().includes('release date');

  return (
    <div className="space-y-4 pb-24 lg:pb-0">
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

              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEbayClick}
                className="w-full bg-slate-800 text-white py-3 px-4 text-sm font-semibold rounded-lg min-h-[44px] hover:bg-slate-700 transition-colors flex items-center justify-center border border-white/25"
              >
                Trusted seller profile on eBay
              </a>
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

        <p className="mt-3 text-center text-xs text-white/70">
          No account required. Guest checkout is available, and PayPal is offered during checkout.
        </p>
      </div>

      <div className="mt-2 border border-white/10 rounded-lg bg-white/5 px-4 py-3 text-sm text-white/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center sm:text-left">
          <div>Free UK shipping</div>
          <div>30-day returns</div>
          <div>Secure card and PayPal</div>
        </div>
      </div>

      <div className="text-center pt-3 border-t border-white/10">
        <a
          href="mailto:charlese1mackay@hotmail.com"
          onClick={handleEmailClick}
          className="text-blue-300 hover:text-blue-200 text-sm font-medium"
        >
          Contact Charles for bulk orders
        </a>
      </div>

      {(book.inStock || isPreOrder) && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-slate-900/95 backdrop-blur lg:hidden">
          <div className="mx-auto max-w-3xl px-3 py-3 flex items-center gap-2">
            <div className="min-w-[74px]">
              <p className="text-[10px] text-white/70 uppercase tracking-wide">Price</p>
              <p className="text-lg font-bold text-white">£{book.price.toFixed(2)}</p>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              className="flex-1 bg-white text-slate-900 py-2.5 px-3 rounded-lg text-sm font-semibold border border-slate-900 disabled:opacity-60"
            >
              {isBuyingNow ? 'Opening...' : 'Buy now'}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-slate-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold border border-white/20 disabled:opacity-60"
            >
              {isAddingToCart ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
