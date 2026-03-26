import Link from 'next/link';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';
import { getAllReviews, getTotalReviewCount } from '@/data/reviews';

const featuredBooks = [
  books.find(b => b.id === 'beardmore-aviation'),
  books.find(b => b.id === 'this-was-the-enemy-volume-two'),
  books.find(b => b.id === 'clydeside-aviation-vol1'),
  books.find(b => b.id === 'german-aircraft-great-war'),
].filter(Boolean);

const heroBooks = [
  { id: 'beardmore-aviation', title: 'Beardmore Aviation', price: 12.91, img: '/book-covers/beardmore-aviation.jpg' },
  { id: 'clydeside-aviation-vol1', title: 'Clydeside Aviation Volume One', price: 16.08, img: '/book-covers/clydeside-aviation-vol1.jpg' },
  { id: 'this-was-the-enemy-volume-two', title: 'This Was the Enemy Volume Two', price: 15.95, img: '/book-covers/this-was-the-enemy-volume-two.jpg' },
];

// Select diverse, compelling real reviews for the homepage
const allReviews = getAllReviews();
const totalReviewCount = getTotalReviewCount();
const handpickedIds = [
  { bookId: 'beardmore-aviation', idx: 1 },   // Maritime Quest
  { bookId: 'beardmore-aviation', idx: 8 },   // "The detail is amazing..."
  { bookId: 'sycamore-seeds', idx: 0 },       // Air Britain
  { bookId: 'mother-of-the-few', idx: 1 },    // RRHT
  { bookId: 'soaring-with-wings', idx: 1 },   // Local History Archive
  { bookId: 'aircraft-carrier-argus', idx: 1 },// Maritime Quest
];
const bookTitles: Record<string, string> = {};
books.forEach(b => { bookTitles[b.id] = b.title; });

const testimonials = handpickedIds.map(({ bookId, idx }) => {
  const bookReviews = allReviews.filter(r => r.bookId === bookId);
  const review = bookReviews[idx] || bookReviews[0];
  return {
    text: review.text,
    author: review.author,
    role: review.source || 'Verified Buyer',
    bookTitle: bookTitles[bookId] || '',
  };
}).filter(Boolean);


const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Aviation History Books by Charles E. MacKay',
  numberOfItems: books.length,
  itemListElement: books.map((book, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://charlesmackaybooks.com/books/${book.id}`,
    name: book.title,
  })),
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Charles E. MacKay Books',
  url: 'https://charlesmackaybooks.com',
  logo: 'https://charlesmackaybooks.com/og-image.jpg',
  description: 'Aviation history books by Charles E. MacKay — 20 titles covering Scottish aviation, WWI/WWII aircraft, and military history.',
  founder: { '@type': 'Person', name: 'Charles E. MacKay' },
  address: { '@type': 'PostalAddress', addressLocality: 'Glasgow', addressCountry: 'GB' },
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Charles E. MacKay — Aviation History Books',
  url: 'https://charlesmackaybooks.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://charlesmackaybooks.com/books?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--navy-mid) 100%)', position: 'relative', overflow: 'hidden', padding: '80px 24px 72px' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A951' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', opacity: 0.5 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
              25+ Years of Aviation Research
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 44, lineHeight: 1.2, color: 'var(--white)', marginBottom: 20, fontWeight: 700 }}>
              Definitive histories of <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Scottish aviation</em> &amp; military aircraft
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 480 }}>
              Meticulously researched books covering Scotland&apos;s aviation heritage, wartime aircraft, and the people who built them. Trusted by historians, collectors, and aviation enthusiasts worldwide.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <Link href="/books" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--gold)', color: 'var(--navy)', fontWeight: 600, fontSize: 14, border: 'none', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Browse all 20 books
              </Link>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'transparent', color: 'var(--white)', fontWeight: 500, fontSize: 14, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                Meet the author
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[{ num: '1,700+', label: 'Readers worldwide' }, { num: '20', label: 'Published titles' }, { num: 'Free', label: 'Worldwide shipping' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--white)' }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="hero-featured-grid">
            {heroBooks.map(b => (
              <Link key={b.id} href={`/books/${b.id}`} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: 12, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: 10, background: 'var(--navy-mid)' }}>
                  <Image src={b.img} alt={b.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--white)', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{b.title}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>£{b.price.toFixed(2)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            { icon: '☑', strong: 'Secure checkout', text: ' — Card or PayPal' },
            { icon: '✈', strong: 'Free shipping', text: ' — worldwide from Glasgow' },
            { icon: '↺', strong: '30-day returns', text: ' — no questions asked' },
            { icon: '★', strong: '1,700+ happy', text: ' readers & counting' },
          ].map(t => (
            <div key={t.strong} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)' }}>
              <div style={{ width: 32, height: 32, background: 'var(--cream)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{t.icon}</div>
              <span><strong style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{t.strong}</strong>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED BOOKS */}
      <section style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--gold-dark)', marginBottom: 8 }}>New &amp; Popular</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>Featured Books</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 560 }}>Our most popular aviation history titles, chosen by readers.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="books-grid">
          {featuredBooks.map(book => book && <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--navy)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 8 }}>Verified Reviews</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>What readers are saying</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--gold)', fontSize: 18 }}>★★★★★</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>5.0/5 from {totalReviewCount} verified reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonial-grid">
            {testimonials.map(t => (
              <div key={t.author + t.bookTitle} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
                  {t.role && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{t.role}</span>}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 16 }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{t.author}</strong>
                  {t.bookTitle && <> — <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>{t.bookTitle}</em></>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* NEWSLETTER */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 48, textAlign: 'center', margin: '0 auto', maxWidth: 640 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--text-dark)', marginBottom: 8 }}>Stay in the loop</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>New book announcements, research articles, and exclusive reader discounts.</p>
          <form name="newsletter" method="POST" data-netlify="true" action="/newsletter-thanks" style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto' }}>
            <input type="hidden" name="form-name" value="newsletter" />
            <input type="email" name="email" required placeholder="Your email address" style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, background: 'var(--white)' }} />
            <button type="submit" style={{ padding: '12px 24px', background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
