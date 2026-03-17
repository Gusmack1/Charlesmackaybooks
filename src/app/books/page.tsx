import { Metadata } from 'next'
import Link from 'next/link'
import BookCard from '@/components/BookCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'
import Testimonials from '@/components/Testimonials'

const quickFilters = [
  { label: 'WWI Aviation', slug: 'wwi-aviation' },
  { label: 'WWII Aviation', slug: 'wwii-aviation' },
  { label: 'Scottish Aviation', slug: 'scottish-aviation-history' },
  { label: 'Naval Aviation', slug: 'naval-aviation' },
  { label: 'Jet Age', slug: 'jet-age-aviation' },
  { label: 'Biographies', slug: 'aviation-biography' },
]

export const metadata: Metadata = {
  title: 'Aviation History Books for Sale',
  description: `Shop ${books.length} aviation history books by Charles E. MacKay on Scottish aviation, WWI, WWII, naval aviation, and helicopters. Free worldwide shipping and guest checkout.`,
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
    title: 'Aviation History Books for Sale',
    description: `Shop ${books.length} aviation history books by Charles E. MacKay with free worldwide shipping and secure guest checkout.`,
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
  return (
    <div className="surface-dark relative mx-0 bg-slate-900">
      <UnifiedSchema
        pageType="books"
        pageTitle="Aviation History Books for Sale"
        pageDescription={`Shop ${books.length} aviation history books by Charles E. MacKay with free worldwide shipping and secure guest checkout.`}
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
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
              {[
                '100% positive feedback',
                'Guest checkout',
                'Free worldwide shipping',
                '30-day returns',
                'Used by researchers and institutions',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-white/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-4 bg-slate-900">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto rounded-xl border border-white/15 bg-slate-800/70 p-4 sm:p-5 text-sm sm:text-base text-white/85">
            Start with
            {' '}
            <Link href="/category/scottish-aviation-history" className="text-blue-300 underline hover:text-blue-200">
              Scottish aviation history books
            </Link>
            ,
            {' '}
            <Link href="/category/wwi-aviation" className="text-blue-300 underline hover:text-blue-200">
              WWI aviation books
            </Link>
            ,
            {' '}
            <Link href="/category/naval-aviation" className="text-blue-300 underline hover:text-blue-200">
              naval aviation titles
            </Link>
            ,
            or
            {' '}
            <Link href="/category/aviation-biography" className="text-blue-300 underline hover:text-blue-200">
              aviation biographies
            </Link>
            .
            {' '}
            You can also follow the
            {' '}
            <Link href="/aviation-news" className="text-blue-300 underline hover:text-blue-200">
              latest aviation news
            </Link>
            {' '}
            for briefing-led reading paths into the catalogue.
          </div>
        </div>
      </section>

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

          <section className="mb-6">
            <div className="rounded-lg border border-white/15 bg-slate-800/80 px-3 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Buy direct with confidence</p>
                <p className="text-xs text-white/75 leading-snug">
                  Secure guest checkout, free worldwide shipping, 30-day returns, and automatic multi-book discounts. Charles&apos; eBay profile: 100% positive feedback.
                </p>
              </div>
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white/10 text-white border border-white/25 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/15 transition-colors shrink-0"
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

          {/* Books Grid - 20 unique books */}
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
