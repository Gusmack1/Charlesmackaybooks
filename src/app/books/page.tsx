import { Metadata } from 'next'
import BookCard from '@/components/BookCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'
import Testimonials from '@/components/Testimonials'

export const metadata: Metadata = {
  title: 'Aviation History Books - Complete Collection | Charles E. MacKay',
  description: 'Browse the complete collection of aviation history books by Charles E. MacKay. 19+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/books/'
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
    title: 'Aviation History Books - Complete Collection | Charles E. MacKay',
    description: 'Browse 19+ aviation history books by expert historian Charles E. MacKay. WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more.',
    url: 'https://charlesmackaybooks.com/books/',
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
    <div className="surface-dark relative -mx-0 bg-[#020221]">
      <UnifiedSchema
        pageType="books"
        pageTitle="Aviation History Books - Complete Collection | Charles E. MacKay"
        pageDescription="Browse the complete collection of aviation history books by Charles E. MacKay. 20+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more."
        pageUrl="/books"
        books={books}
      />

      {/* Hero Section - Matching Homepage Style */}
      <div className="hero-section bg-[#020221]">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Aviation History Books Collection
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto">
              Discover {books.length} authoritative aviation history books by Charles E. MacKay. From WWI fighters to modern jets, Scottish aviation heritage to global military aviation.
            </p>
          </div>
        </div>
      </div>

      {/* Books Section - Exact Match to Homepage */}
      <section className="py-12" id="books">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              📚 Complete Book Collection
            </h2>
            <p className="text-center opacity-90 mb-4">
              {books.length} books available • Expert research • Academic references • FREE shipping worldwide
            </p>
          </div>

          {/* Books Grid - Matching Homepage Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
