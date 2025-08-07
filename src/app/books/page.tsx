import { Metadata } from 'next'
import BookCard from '@/components/BookCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Aviation History Books - Complete Collection | Charles E. MacKay',
  description: 'Browse the complete collection of aviation history books by Charles E. MacKay. 19+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more.',
  keywords: [
    'aviation history books',
    'Charles E MacKay books',
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
    <>
      <UnifiedSchema
        pageType="books"
        pageTitle="Aviation History Books - Complete Collection | Charles E. MacKay"
        pageDescription="Browse the complete collection of aviation history books by Charles E. MacKay. 19+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more."
        pageUrl="/books"
        books={books}
      />

      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Aviation History Books Collection
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover {books.length} authoritative aviation history books by renowned historian Charles E. MacKay.
            From WWI fighters to modern jets, Scottish aviation heritage to global military aviation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="badge badge-blue">📚 {books.length} Books Available</span>
            <span className="badge badge-green">✅ In Stock & Ready to Ship</span>
            <span className="badge badge-amber">🌍 Worldwide Shipping</span>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="content h2 text-primary mb-4">Complete Book Collection</h2>
            <p className="text-secondary mb-6">
              Expert research • Academic references • FREE shipping worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} sourceContext="books-catalog" />
            ))}
          </div>
        </div>
      </section>

        {/* Footer is provided by root layout; avoid duplicate footer here */}
      </div>
    </>
  )
}
