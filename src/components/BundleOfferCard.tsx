'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Book } from '@/types/book';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BundleOfferCardProps {
  title: string;
  description: string;
  books: Book[];
  badge?: string;
}

export default function BundleOfferCard({ title, description, books, badge }: BundleOfferCardProps) {
  const { addToCart } = useCart();
  const { trackBundleAddToCart } = useAnalytics();
  const [isAddingBundle, setIsAddingBundle] = useState(false);

  const bundleTotal = books.reduce((total, book) => total + book.price, 0);
  const discountedTotal = bundleTotal * 0.95;

  const handleAddBundle = () => {
    if (isAddingBundle) return;
    setIsAddingBundle(true);
    trackBundleAddToCart(
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      books.map((book) => ({
        id: book.id,
        title: book.title,
        category: book.category || 'Aviation Books',
        quantity: 1,
        price: book.price,
      })),
      bundleTotal
    );
    books.forEach((book) => addToCart(book));
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 300);
  };

  return (
    <article className="rounded-xl border border-blue-700/50 bg-slate-800 p-5">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {badge ? (
          <span className="text-xs font-semibold rounded-full px-2.5 py-1 bg-blue-500/20 border border-blue-300/40 text-blue-200">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="text-sm text-white/75 mb-4">{description}</p>

      <div className="space-y-2 mb-4">
        {books.map((book) => (
          <div key={book.id} className="flex items-center justify-between gap-3 text-sm">
            <Link href={`/books/${book.id}`} className="text-white hover:text-blue-300 hover:underline">
              {book.title}
            </Link>
            <span className="text-white/90">£{book.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 mb-4">
        <div className="flex justify-between text-sm text-white/80">
          <span>Combined book price</span>
          <span>£{bundleTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-300 font-semibold mt-1">
          <span>Auto multi-book discount (5%)</span>
          <span>~£{(bundleTotal - discountedTotal).toFixed(2)} off</span>
        </div>
      </div>

      <button
        onClick={handleAddBundle}
        disabled={isAddingBundle}
        className="w-full bg-white text-slate-900 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-slate-900 disabled:opacity-60"
      >
        {isAddingBundle ? 'Adding bundle...' : 'Add bundle to basket'}
      </button>
      <p className="text-[11px] text-white/60 text-center mt-2">No account required. Checkout as guest.</p>
    </article>
  );
}

