'use client';

import Image from 'next/image';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';

interface BookCoverBuyProps {
  book: Book;
  width?: number;
  height?: number;
  className?: string;
}

export default function BookCoverBuy({ book, width = 320, height = 480, className = '' }: BookCoverBuyProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (!book.inStock) return;
    addToCart(book);
    // Same basket as Add to basket – go to checkout basket step first
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!book.inStock}
      className={`block relative group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl overflow-hidden ${!book.inStock ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      aria-label={book.inStock ? `Buy ${book.title} - go to checkout` : `${book.title} - out of stock`}
    >
      <Image
        src={book.imageUrl || `/book-covers/${book.id}.jpg`}
        alt={`${book.title} by Charles E. MacKay`}
        width={width}
        height={height}
        className={`rounded-xl shadow-2xl transition-transform group-hover:scale-[1.02] ${className}`}
        priority
      />
      {book.inStock && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center rounded-xl">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm">
            Buy now →
          </span>
        </div>
      )}
    </button>
  );
}
