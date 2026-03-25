'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';

export default function BookCard({ book }: { book: Book }) {
  const { addToCart, openBasket } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    openBasket();
  };

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }} className="book-card">
      <Link href={`/books/${book.id}`}>
        <div style={{ aspectRatio: '3/4', background: 'var(--cream-dark)', position: 'relative', overflow: 'hidden' }}>
          <Image src={book.imageUrl || `/book-covers/${book.id}.jpg`} alt={book.title} fill style={{ objectFit: 'cover' }} />
          {book.category && (
            <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--gold)', color: 'var(--navy)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5, zIndex: 2 }}>{book.category}</span>
          )}
        </div>
      </Link>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 6 }}>{book.category}</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
          <Link href={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{book.title}</Link>
        </h3>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
          {book.pageCount && `${book.pageCount} pages`}{book.pageCount && book.publicationYear && ' · '}{book.publicationYear}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-dark)' }}>£{book.price.toFixed(2)}</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: '50%', display: 'inline-block' }}></span>
            In stock
          </span>
        </div>
        <button onClick={handleAdd} style={{ width: '100%', padding: 10, marginTop: 12, background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Add to basket
        </button>
      </div>
    </div>
  );
}
