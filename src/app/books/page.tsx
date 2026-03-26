'use client';
import { useState, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';

const categories = Array.from(new Set(books.map(b => b.category))).sort();

export default function ShopPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sort, setSort] = useState('popular');

  const toggleCat = (cat: string) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const filtered = useMemo(() => {
    let list = selectedCats.length ? books.filter(b => selectedCats.includes(b.category)) : [...books];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [selectedCats, sort]);

  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Buy Aviation History Books by Charles E. MacKay</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 640, margin: '8px auto 0', lineHeight: 1.6 }}>Browse 20 meticulously researched titles covering Scottish aviation, Beardmore &amp; Clydeside factories, WWI &amp; WWII aircraft, the Luftwaffe, helicopters, and naval aviation. Every book ships free worldwide from Glasgow.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }} className="shop-layout">
        <aside>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16 }}>Filter Books</h3>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1, display: 'block', marginBottom: 8 }}>Category</label>
            {categories.map(cat => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>
                <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                {cat} ({books.filter(b => b.category === cat).length})
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>Multi-buy discount</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>Save 5% on 2 books<br/>Save 10% on 3+</p>
          </div>
        </aside>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Showing {filtered.length} books</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-body)', background: 'var(--white)' }}>
              <option value="popular">Sort by: Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Title: A–Z</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="shop-grid">
            {filtered.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </div>
    </>
  );
}
