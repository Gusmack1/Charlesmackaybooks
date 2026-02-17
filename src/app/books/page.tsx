import { Metadata } from 'next'
import BookCard from '@/components/BookCard'
import BundleOfferCard from '@/components/BundleOfferCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'
import Testimonials from '@/components/Testimonials'
import type { Book } from '@/types/book'

const quickFilters = [
  { label: 'WWI Aviation', slug: 'wwi-aviation' },
  { label: 'WWII Aviation', slug: 'wwii-aviation' },
  { label: 'Scottish Aviation', slug: 'scottish-aviation-history' },
  { label: 'Naval Aviation', slug: 'naval-aviation' },
  { label: 'Jet Age', slug: 'jet-age-aviation' },
  { label: 'Biographies', slug: 'aviation-biography' },
]

const staffPickIds = [
  'beardmore-aviation',
  'clydeside-aviation-vol1',
  'clydeside-aviation-vol2',
  'british-aircraft-great-war',
  'german-aircraft-great-war',
  'aircraft-carrier-argus',
]

const bundleConfigs = [
  {
    id: 'clydeside-duo',
    title: 'Clydeside Aviation Duo',
    description: 'Volume One + Volume Two together for readers building a complete Clydeside reference set.',
    badge: 'Best value',
    bookIds: ['clydeside-aviation-vol1', 'clydeside-aviation-vol2'],
  },
  {
    id: 'great-war-comparison',
    title: 'Great War Air Power Set',
    description: 'Compare both sides of WWI aviation with British and German aircraft development volumes.',
    badge: 'Popular',
    bookIds: ['british-aircraft-great-war', 'german-aircraft-great-war'],
  },
  {
    id: 'enemy-two-volume',
    title: 'This Was The Enemy Collection',
    description: 'Pair both volumes for complete late-war Luftwaffe coverage and production context.',
    badge: 'Research set',
    bookIds: ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two'],
  },
]

export const metadata: Metadata = {
  title: 'Aviation History Books by Charles E. MacKay',
  description: `Browse ${books.length} aviation history books by Charles E. MacKay. WWI/WWII aircraft, Scottish aviation, helicopters, and naval ops. Free worldwide shipping with secure guest checkout.`,
  alternates: {
    canonical: 'https://charlesmackaybooks.com/books'
  },
  keywords: [
    'aviation history books',
    'Charles E MacKay',
    'Charles E. MacKay',
    'Charles E. MacKay Books',
    'Charles E. MacKay Aviation',
    'aviation books for sale',
    'WWI aircraft books',
    'WWII aviation history',
    'Scottish aviation books',
    'military aviation books',
    'helicopter history books',
    'jet age aviation',
    'naval aviation books'
  ],
  openGraph: {
    title: 'Aviation History Books by Charles E. MacKay',
    description: `Browse ${books.length} aviation history books by Charles E. MacKay with free worldwide shipping and secure guest checkout.`,
    url: 'https://charlesmackaybooks.com/books',
    siteName: 'Charles E. MacKay Aviation Books',
    images: [
      {
        url: 'https://charlesmackaybooks.com/charles-mackay-aviation-books.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay Aviation History Books Collection'
      }
    ]
  }
}

export default function BooksPage() {
  const newBooks = [...books]
    .sort((a, b) => (b.publicationYear || 0) - (a.publicationYear || 0))
    .slice(0, 6)

  const staffPicks = books.filter((b) => staffPickIds.includes(b.id))
  const bookMap = new Map(books.map((book) => [book.id, book]))
  const bundles = bundleConfigs
    .map((bundle) => {
      const bundleBooks = bundle.bookIds
        .map((bookId) => bookMap.get(bookId))
        .filter((book): book is Book => Boolean(book))
      return { ...bundle, books: bundleBooks }
    })
    .filter((bundle) => bundle.books.length === bundle.bookIds.length)

  return (
    <div className="surface-dark relative -mx-0 bg-slate-900">
      <UnifiedSchema
        pageType="books"
        pageTitle="Aviation History Books by Charles E. MacKay"
        pageDescription={`Browse ${books.length} aviation history books by Charles E. MacKay with free worldwide shipping and secure guest checkout.`}
        pageUrl="/books"
        books={books}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://charlesmackaybooks.com/' },
              { '@type': 'ListItem', position: 2, name: 'Books', item: 'https://charlesmackaybooks.com/books' },
            ],
          }),
        }}
      />

      {/* Hero Section - Matching Homepage Style */}
      <div className="hero-section bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-0 md:py-1">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Aviation History Books Collection
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto">
              Discover {books.length} authoritative aviation history books by Charles E. MacKay. From WWI fighters to modern jets, Scottish aviation heritage to global military aviation.
            </p>
          </div>
        </div>
      </div>

      {/* Books Section - Exact Match to Homepage */}
      <section className="py-2" id="books">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              📚 Complete Book Collection
            </h2>
            <p className="text-center opacity-90 mb-4">
              {books.length} books available • Expert research • Academic references • FREE shipping worldwide
            </p>
          </div>

          <section className="mb-10">
            <div className="rounded-xl border border-white/15 bg-slate-800/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Trusted seller profile</p>
                <p className="text-sm text-white/75">
                  Charles' eBay profile shows 100% positive feedback. Buy direct here for guest checkout and bundle savings.
                </p>
              </div>
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-slate-900 border border-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View eBay profile
              </a>
            </div>
          </section>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {quickFilters.map((filter) => (
              <a
                key={filter.slug}
                href={`/category/${filter.slug}`}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-colors"
              >
                {filter.label}
              </a>
            ))}
          </div>

          {newBooks.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-xl font-semibold text-white">New &amp; notable</h3>
                <span className="text-sm text-white/70">
                  Recent releases and latest editions from Charles E. MacKay
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {newBooks.map((book) => (
                  <BookCard key={`new-${book.id}`} book={book} sourceContext="books-new-notable" />
                ))}
              </div>
            </section>
          )}

          {staffPicks.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-xl font-semibold text-white">Staff picks</h3>
                <span className="text-sm text-white/70">
                  Foundational titles our readers return to again and again
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {staffPicks.map((book) => (
                  <BookCard key={`staff-${book.id}`} book={book} sourceContext="books-staff-picks" />
                ))}
              </div>
            </section>
          )}

          {bundles.length > 0 && (
            <section id="bundles" className="mb-10">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-xl font-semibold text-white">Bundle offers</h3>
                <span className="text-sm text-white/70">
                  Add multiple books quickly and unlock automatic multi-book discount
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {bundles.map((bundle) => (
                  <BundleOfferCard
                    key={bundle.id}
                    title={bundle.title}
                    description={bundle.description}
                    books={bundle.books}
                    badge={bundle.badge}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Books Grid - Matching Homepage Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} sourceContext="books-catalog" />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials - Matching Homepage */}
      <div className="container mx-auto container-padding py-12">
        <Testimonials />
      </div>

      {/* Trust & Security Badges provided globally via layout */}
    </div>
  )
}
