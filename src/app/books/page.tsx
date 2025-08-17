import { Metadata } from 'next'
import BookCard from '@/components/BookCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Aviation History Books - Complete Collection | Charles E. MacKay',
  description: 'Browse the complete collection of aviation history books by Charles E. MacKay. 19+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/books'
  },
  keywords: [
    'aviation history books',
    'Charles E MacKay books',
    'charles mackay books',
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
    <BBCPageTemplate
      title="Aviation History Books Collection"
      subtitle={`Discover ${books.length} authoritative aviation history books by Charles E. MacKay. From WWI fighters to modern jets, Scottish aviation heritage to global military aviation.`}
      breadcrumbs={[]}
      centerHero
    >
      <UnifiedSchema
        pageType="books"
        pageTitle="Aviation History Books - Complete Collection | Charles E. MacKay"
        pageDescription="Browse the complete collection of aviation history books by Charles E. MacKay. 19+ books covering WWI & WWII aircraft, Scottish aviation heritage, military aviation, and more."
        pageUrl="/books"
        books={books}
      />

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="content h2 text-primary mb-4">Complete Book Collection</h2>
            <p className="text-secondary mb-6">Expert research • Academic references • FREE shipping worldwide</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} sourceContext="books-catalog" />
            ))}
          </div>
        </div>
      </section>
    </BBCPageTemplate>
  )
}
