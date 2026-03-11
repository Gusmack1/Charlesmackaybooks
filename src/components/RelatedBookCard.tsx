'use client';

import Image from 'next/image';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';

interface RelatedBookCardProps {
  book: Book;
}

export default function RelatedBookCard({ book }: RelatedBookCardProps) {
  const { addToCart, openBasket } = useCart();

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    openBasket();
  };

  return (
    <div className="border rounded-lg p-4 hover:border-secondary/50 hover:shadow-md transition-all bg-slate-800/50 border-white/15">
      <a href={`/books/${book.id}`} className="block">
        <div className="aspect-[3/4] mb-3 bg-muted rounded overflow-hidden">
          <Image
            src={book.imageUrl || `/book-covers/${book.id}.jpg`}
            alt={book.title}
            width={200}
            height={267}
            className="w-full h-full object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEB//EACUQAAIBAwMEAwEBAAAAAAAAAAECAwAEEQUSITFBURNhcZEigf/EABUBAFEAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4+iiigAooooAKKKKACiiigD/2Q=="
          />
        </div>
        <div className="font-semibold text-primary mb-1 line-clamp-2">{book.title}</div>
        <div className="text-secondary text-sm mb-2">{book.category}</div>
        <div className="text-lg font-bold text-primary">£{book.price}</div>
      </a>
      <button
        type="button"
        onClick={handleAddToBasket}
        disabled={!book.inStock}
        className="mt-3 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to basket
      </button>
    </div>
  );
}
