import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { books } from '@/data/books';
import { getBookReviews, getAllReviews } from '@/data/reviews';
import BookCard from '@/components/BookCard';
import AddToBasketButton from '@/components/AddToBasketButton';

export function generateStaticParams() {
  return books.map(b => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = books.find(b => b.id === id);
  if (!book) return {};
  const desc = book.seoDescription || book.description.substring(0, 155).replace(/\n/g, ' ') + '…';
  return {
    title: `Buy ${book.title} — Aviation History Book by Charles E. MacKay`,
    description: desc,
    alternates: { canonical: `/books/${book.id}` },
    openGraph: {
      title: book.title,
      description: desc,
      type: 'book',
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      images: [{ url: book.imageUrl || `/book-covers/${book.id}.jpg`, width: 600, height: 800, alt: book.title }],
    },
    twitter: { card: 'summary_large_image', title: book.title, description: desc },
  };
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find(b => b.id === id);
  if (!book) notFound();

  const related = (book.relatedBookIds || []).map(rid => books.find(b => b.id === rid)).filter(Boolean).slice(0, 3);

  // Get per-book reviews, fall back to all reviews if none for this book
  const bookSpecificReviews = getBookReviews(id);
  const allReviews = getAllReviews();
  const displayReviews = bookSpecificReviews.length > 0
    ? bookSpecificReviews
    : allReviews.slice(0, 5);
  const reviewCount = displayReviews.length;
  const avgRating = reviewCount > 0
    ? (displayReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
    : '5.0';

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://charlesmackaybooks.com' },
      { '@type': 'ListItem', position: 2, name: 'Books', item: 'https://charlesmackaybooks.com/books' },
      { '@type': 'ListItem', position: 3, name: book.title, item: `https://charlesmackaybooks.com/books/${book.id}` },
    ],
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    image: `https://charlesmackaybooks.com${book.imageUrl || `/book-covers/${book.id}.jpg`}`,
    description: book.description.substring(0, 300),
    brand: { '@type': 'Brand', name: 'Charles E. MacKay Books' },
    gtin13: book.isbn,
    category: 'Media > Books > Non-Fiction > History',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    review: displayReviews.map(r => ({
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: r.author },
      reviewRating: { '@type': 'Rating' as const, ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
      datePublished: r.date,
    })),
    offers: {
      '@type': 'Offer',
      price: book.price.toFixed(2),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Charles E. MacKay Books' },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
      },
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'GBP' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'd' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4, unitCode: 'd' },
          },
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'GBP' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'd' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 14, unitCode: 'd' },
          },
        },
      ],
    },
  };

  const bookLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: 'Charles E. MacKay' },
    isbn: book.isbn,
    numberOfPages: book.pageCount,
    datePublished: book.publicationYear ? `${book.publicationYear}` : undefined,
    image: `https://charlesmackaybooks.com${book.imageUrl || `/book-covers/${book.id}.jpg`}`,
    description: book.description.substring(0, 300),
    publisher: { '@type': 'Organization', name: 'A Mackay (Publisher) Ltd' },
    inLanguage: 'en',
    bookFormat: 'https://schema.org/Paperback',
    url: `https://charlesmackaybooks.com/books/${book.id}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }} />
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

      {/* Reviews Section */}
      {displayReviews.length > 0 && (
        <section style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
              Verified Reviews
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--gold)', fontSize: 18 }}>{'★'.repeat(5)}</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{avgRating}/5 ({reviewCount} reviews)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {displayReviews.map((review, i) => (
              <div key={i} style={{ padding: 20, background: 'var(--cream)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 1 }}>{'★'.repeat(review.rating)}</span>
                  {review.source && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'white', padding: '2px 8px', borderRadius: 10, border: '1px solid var(--border)' }}>
                      {review.source}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.6, margin: '0 0 10px 0', fontStyle: 'italic' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  — {review.author}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
