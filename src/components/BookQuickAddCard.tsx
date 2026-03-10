'use client';

import Link from 'next/link';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';

interface BookQuickAddCardProps {
  book: Book;
}

export default function BookQuickAddCard({ book }: BookQuickAddCardProps) {
  const { addToCart, openBasket } = useCart();

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    openBasket();
  };

  return (
    <div className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2 hover:border-blue-300/70 transition-colors flex flex-col">
      <Link href={`/books/${book.id}`} className="flex-1 min-w-0">
        <div className="text-xs text-white/80 line-clamp-2">{book.title}</div>
        <div className="text-sm font-semibold text-white mt-1">£{book.price.toFixed(2)}</div>
      </Link>
      <button
        type="button"
        onClick={handleAddToBasket}
        disabled={!book.inStock}
        className="mt-2 w-full py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to basket
      </button>
    </div>
  );
}
