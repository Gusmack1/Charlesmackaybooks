import { Metadata } from 'next'

import HeroSection from '@/components/HeroSection';
import AcademicAuthority from '@/components/AcademicAuthority';
import BookCard from '@/components/BookCard';
import Testimonials from '@/components/Testimonials';
import RecentlyViewed from '@/components/RecentlyViewed';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Charles E. MacKay - Aviation History Books | WWI & WWII Aircraft Expert',
  description: 'Authoritative aviation history books by Charles E. MacKay. Expert on Scottish aviation heritage, WWI & WWII aircraft, military aviation, helicopter development, and jet age history. 19+ books available.',
  keywords: [
    'aviation history books',
    'Charles E MacKay',
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
    title: 'Charles E. MacKay - Aviation History Books | Expert Aviation Historian',
    description: 'Authoritative aviation history books by Charles E. MacKay. Expert on Scottish aviation heritage, WWI & WWII aircraft, military aviation, helicopter development, and jet age history.',
    url: 'https://charlesmackaybooks.com',
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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">

        <HeroSection />

        {/* Books Section */}
        <section className="py-12 bg-gray-100" id="books">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                📚 Aviation History Books - Ready to Ship
              </h2>
              <p className="text-center text-gray-600 mb-4">
                {filteredBooks.length} books available • Instant purchase with PayPal or eBay • UK £3.45 • EU £4.95 • USA £8.95 • Worldwide £12.95
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

        {/* Customer Testimonials */}
        <Testimonials />
        <RecentlyViewed />
        <Footer />
      </div>
    </>
  );
}
