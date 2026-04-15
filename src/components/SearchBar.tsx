'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/data/books';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase()) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="nav-search-input"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', color: 'white', fontSize: 13, width: 180, outline: 'none' }}
      />
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 320, background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', overflow: 'hidden', zIndex: 200 }}>
          {results.map(book => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              onClick={() => { setQuery(''); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}
            >
              <div style={{ width: 36, height: 48, background: 'var(--cream-dark)', borderRadius: 3, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                <Image src={book.imageUrl || `/book-covers/${book.id}.jpg`} alt={`${book.title} book cover`} fill sizes="36px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{book.category} · £{book.price.toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
