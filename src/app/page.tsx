import { Metadata } from 'next'

import HeroSection from '@/components/HeroSection';
import AcademicAuthority from '@/components/AcademicAuthority';
import BookCard from '@/components/BookCard';
import Testimonials from '@/components/Testimonials';
import AuthorSEOEnhancer from '@/components/AuthorSEOEnhancer';
import FAQSchema from '@/components/FAQSchema';

import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Aviation History Books by Charles E. MacKay | Expert Scottish Aviation Research | Buy Online',
  description: 'Buy authentic aviation history books by Scotland\'s leading aviation historian. 20+ books on WWI/WWII aircraft, Scottish aviation, helicopters & military aviation. Free UK shipping. Expert research used by museums & universities.',
  keywords: [
    'aviation history books',
    'Charles E MacKay',
    'Charles E. MacKay',
    'Charles E. MacKay Books',
    'Charles E. MacKay Aviation',
    'WWI aircraft books',
    'WWII aviation history',
    'Scottish aviation heritage',
    'military aviation books',
    'helicopter development history',
    'jet age aviation',
    'naval aviation books',
    'aircraft development books',
    'aviation biography books'
  ],
  alternates: {
    canonical: 'https://charlesmackaybooks.com/'
  },
  openGraph: {
    title: 'Aviation History Books by Charles E. MacKay | Expert Scottish Aviation Research',
    description: 'Buy authentic aviation history books by Scotland\'s leading aviation historian. 20+ books on WWI/WWII aircraft, Scottish aviation, helicopters & military aviation. Free UK shipping. Expert research used by museums.',
    url: 'https://charlesmackaybooks.com/',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: 'https://charlesmackaybooks.com/charles-mackay-aviation-books.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay Aviation History Books Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles E. MacKay - Aviation History Books',
    description: 'Authoritative aviation history books by expert historian Charles E. MacKay. WWI & WWII aircraft, Scottish aviation heritage, and military aviation.'
  }
}

export default function Home() {
  // Show all books - no search filtering
  const filteredBooks = books;

  return (
    <div className="surface-dark relative -mx-0 bg-slate-900">
      <HeroSection />

      {/* Books Section */}
      <section className="py-12" id="books">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              📚 Aviation History Books - Ready to Ship
            </h2>
            <p className="text-center opacity-90 mb-4">
              {filteredBooks.length} books available • Instant purchase with PayPal or eBay • FREE shipping worldwide
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBooks.slice(0, 6).map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.category}</p>
                <p className="text-xl font-bold text-green-600">£{book.price}</p>
                <a href={`/books/${book.id}`} className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author SEO Enhancement */}
      <div className="container mx-auto container-padding py-12">
        <AuthorSEOEnhancer />
      </div>

      {/* Customer Testimonials */}
      <div className="container mx-auto container-padding py-12">
        <Testimonials />
      </div>

      {/* FAQ Schema for rich snippets */}
      <FAQSchema />

      {/* Trust & Security Badges moved to global layout */}
    </div>
  );
}
