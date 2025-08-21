import { Metadata } from 'next'

import HeroSection from '@/components/HeroSection';
import AcademicAuthority from '@/components/AcademicAuthority';
import BookCard from '@/components/BookCard';
import Testimonials from '@/components/Testimonials';
import TrustSecurityBadges from '@/components/TrustSecurityBadges';
import AuthorSEOEnhancer from '@/components/AuthorSEOEnhancer';

import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Charles MacKay & Charles E. MacKay - Aviation History Books | Expert Aviation Historians',
  description: 'Authoritative aviation history books by Charles MacKay and Charles E. MacKay. Expert aviation historians specializing in Scottish aviation heritage, WWI & WWII aircraft, military aviation, helicopter development, and jet age history. 19+ books available.',
  keywords: [
    'aviation history books',
    'Charles MacKay',
    'Charles E MacKay',
    'Charles E. MacKay',
    'Charles Mackay Books',
    'Charles E. MacKay Books',
    'Charles MacKay Aviation',
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
  openGraph: {
    title: 'Charles MacKay & Charles E. MacKay - Aviation History Books | Expert Aviation Historians',
    description: 'Authoritative aviation history books by Charles MacKay and Charles E. MacKay. Expert aviation historians specializing in Scottish aviation heritage, WWI & WWII aircraft, military aviation, helicopter development, and jet age history.',
    url: 'https://charlesmackaybooks.com',
    siteName: 'Charles MacKay & Charles E. MacKay - Aviation Historians',
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
    title: 'Charles MacKay & Charles E. MacKay - Aviation History Books',
    description: 'Authoritative aviation history books by expert historians Charles MacKay and Charles E. MacKay. WWI & WWII aircraft, Scottish aviation heritage, and military aviation.'
  }
}

export default function Home() {
  // Show all books - no search filtering
  const filteredBooks = books;

  return (
    <div className="surface-dark relative -mx-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
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
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} sourceContext="homepage" />
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

      {/* Trust & Security Badges */}
      <TrustSecurityBadges />
    </div>
  );
}
