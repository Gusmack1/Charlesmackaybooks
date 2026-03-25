import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import AddToBasketButton from '@/components/AddToBasketButton';

export function generateStaticParams() {
  return books.map(b => ({ id: b.id }));
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find(b => b.id === id);
  if (!book) notFound();

  const related = (book.relatedBookIds || []).map(rid => books.find(b => b.id === rid)).filter(Boolean).slice(0, 3);

  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/books" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Books</Link>
          {' / '}
          <span style={{ color: 'var(--gold)' }}>{book.title}</span>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '400px 1fr', gap: 48, alignItems: 'start' }} className="book-detail-layout">
        <div style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
          <Image src={book.imageUrl || `/book-covers/${book.id}.jpg`} alt={book.title} fill style={{ objectFit: 'cover' }} />
          {book.category && (
            <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', color: 'var(--navy)', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{book.category}</span>
          )}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 }}>{book.category}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: 16 }}>{book.title}</h1>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            {book.pageCount && `${book.pageCount} pages`}{book.pageCount && book.isbn && ' · '}{book.isbn && `ISBN: ${book.isbn}`}{book.publicationYear && ` · ${book.publicationYear}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, color: 'var(--text-dark)' }}>£{book.price.toFixed(2)}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', display: 'inline-block' }} />
              In stock — ships free worldwide
            </span>
          </div>
          <div style={{ marginBottom: 32 }}><AddToBasketButton book={book} variant="primary" /></div>
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>About this book</h3>
            <div style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{book.description}</div>
          </div>
          {book.tags && book.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {book.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 12px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, color: 'var(--text-muted)' }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ padding: '0 24px 64px', maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 24 }}>You may also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {related.map(r => r && <BookCard key={r.id} book={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
