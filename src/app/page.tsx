import { Metadata } from 'next'
import Link from 'next/link'

import HeroSection from '@/components/HeroSection';
import AcademicAuthority from '@/components/AcademicAuthority';
import BookCard from '@/components/BookCard';
import Testimonials from '@/components/Testimonials';
import AuthorSEOEnhancer from '@/components/AuthorSEOEnhancer';
import FAQSchema from '@/components/FAQSchema';
import LatestAviationNews from '@/components/LatestAviationNews';

import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Aviation History Books by Charles E. MacKay | Free Worldwide Shipping',
  description:
    "Buy aviation history books by Charles E. MacKay: Scottish aviation, WWI/WWII aircraft, helicopters & naval ops. Free worldwide shipping with secure guest checkout.",
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
    title: 'Aviation History Books by Charles E. MacKay',
    description:
      'Buy aviation history books by Charles E. MacKay with free worldwide shipping and secure guest checkout.',
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
    description:
      'Authoritative aviation history books by Charles E. MacKay. Free worldwide shipping with secure guest checkout.'
  }
}

export default function Home() {
  // Show all books - no search filtering
  const filteredBooks = books;

  return (
    <div className="surface-dark relative mx-0 bg-slate-900">
      <HeroSection />

      <section className="py-4 border-y border-white/10 bg-slate-900/80">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-sm sm:text-base text-white/85">
            Explore
            {' '}
            <Link href="/category/scottish-aviation-history" className="text-blue-300 underline hover:text-blue-200">
              Scottish aviation history books
            </Link>
            ,
            {' '}
            <Link href="/category/wwi-aviation" className="text-blue-300 underline hover:text-blue-200">
              WWI aircraft studies
            </Link>
            ,
            {' '}
            <Link href="/category/wwii-aviation" className="text-blue-300 underline hover:text-blue-200">
              WWII aviation titles
            </Link>
            ,
            {' '}
            <Link href="/category/naval-aviation" className="text-blue-300 underline hover:text-blue-200">
              naval aviation history
            </Link>
            ,
            and
            {' '}
            <Link href="/category/aviation-biography" className="text-blue-300 underline hover:text-blue-200">
              pilot biographies
            </Link>
            .
            {' '}
            If you want current context before choosing a book, start with the
            {' '}
            <Link href="/aviation-news" className="text-blue-300 underline hover:text-blue-200">
              latest Scottish aviation news briefings
            </Link>
            .
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-6" id="books">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              📚 Aviation History Books - Ready to Ship
            </h2>
            <p className="text-center opacity-90 mb-4">
              {filteredBooks.length} books available • Secure checkout with card, wallet, or PayPal • FREE shipping worldwide
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} sourceContext="homepage" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Aviation News */}
      <section className="py-6" id="aviation-news-teaser">
        <div className="container mx-auto container-padding">
          <LatestAviationNews />
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
