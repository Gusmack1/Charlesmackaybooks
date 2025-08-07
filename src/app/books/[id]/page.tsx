import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import BookDetailClient from '@/components/BookDetailClient';
import MobileBuyBar from '@/components/MobileBuyBar';
import SamplePages from '@/components/SamplePages';
import BookFAQ from '@/components/BookFAQ';
import UnifiedSchema from '@/components/UnifiedSchema';
import BookSEOContent from '@/components/BookSEOContent';
import BookDetailNavigation from '@/components/BookDetailNavigation';
import RelatedBooks from '@/components/RelatedBooks';
import MobileFooterNav from '@/components/MobileFooterNav';
import BookAnalytics from '@/components/BookAnalytics';


// Simplified category gradient function - only used for hero backgrounds
function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    'Scottish Aviation History': 'from-slate-900 via-amber-900 to-slate-800',
    'WWI Aviation': 'from-slate-900 via-red-900 to-slate-800',
    'WWII Aviation': 'from-slate-900 via-blue-900 to-slate-800',
    'Aviation Biography': 'from-slate-900 via-purple-900 to-slate-800',
    'Helicopter History': 'from-slate-900 via-green-900 to-slate-800',
    'Jet Age Aviation': 'from-slate-900 via-indigo-900 to-slate-800',
    'Naval Aviation': 'from-slate-900 via-cyan-900 to-slate-800',
    'Aviation History': 'from-slate-900 via-orange-900 to-slate-800',
    'Military History': 'from-slate-900 via-gray-900 to-slate-800',
    'Industrial History': 'from-slate-900 via-yellow-900 to-slate-800',
    'Travel Literature': 'from-slate-900 via-emerald-900 to-slate-800'
  };
  return gradients[category] || 'from-slate-900 via-gray-900 to-slate-800';
}

// Generate static params for all books
export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

// Generate comprehensive SEO metadata for each book
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    return {
      title: 'Book Not Found | Charles E. MacKay Aviation Books',
      description: 'The requested aviation history book could not be found.',
    };
  }

  // Enhanced SEO keywords based on book content
  const generateKeywords = (book: Book) => {
    const baseKeywords = [
      book.title,
      'Charles E MacKay',
      'Charles MacKay',
      'charlesmackaybooks.com',
      'aviation history books',
      'aviation books for sale',
      'buy aviation books online',
      book.category.toLowerCase(),
      `${book.category.toLowerCase()} books`,
      `ISBN ${book.isbn}`,
      'aviation historian',
      'aviation reference books',
      'academic aviation books',
      'aviation research'
    ];

    // Category-specific keywords
    if (book.category === 'Scottish Aviation History') {
      baseKeywords.push(
        'Scottish aviation history',
        'Scotland aviation books',
        'Clydeside aviation',
        'Beardmore aviation',
        'Glasgow aviation history',
        'Scottish aircraft development',
        'Scottish aviation heritage',
        'Scottish aviation pioneers',
        'Scotland aircraft manufacturing',
        'Scottish aerospace history'
      );
    }

    if (book.category === 'WWI Aviation') {
      baseKeywords.push(
        'WWI aviation books',
        'World War 1 aircraft',
        'Great War aviation',
        'RFC history books',
        'RNAS history',
        'WWI fighter aircraft',
        'Great War pilots',
        'WWI aviation history',
        'First World War aircraft',
        'Great War air force'
      );
    }

    if (book.category === 'WWII Aviation') {
      baseKeywords.push(
        'WWII aviation books',
        'World War 2 aircraft',
        'RAF history books',
        'Luftwaffe history',
        'WWII fighter aircraft',
        'Battle of Britain books',
        'WWII bomber aircraft',
        'Second World War aviation',
        'RAF operations',
        'Luftwaffe aircraft'
      );
    }

    if (book.category === 'Aviation Biography') {
      baseKeywords.push(
        'aviation biography',
        'pilot biography',
        'test pilot books',
        'aviation pioneer biography',
        'famous aviators',
        'aviation memoirs',
        'pilot stories',
        'aviation legends',
        'flying biography',
        'aircraft test pilots'
      );
    }

    if (book.category === 'Helicopter History') {
      baseKeywords.push(
        'helicopter history',
        'rotorcraft development',
        'autogyro history',
        'Cierva autogyro',
        'helicopter pioneers',
        'rotorcraft books',
        'helicopter development',
        'autogyro books',
        'vertical flight history',
        'helicopter evolution'
      );
    }

    if (book.category === 'Jet Age Aviation') {
      baseKeywords.push(
        'jet age aviation',
        'Cold War aviation',
        'jet fighter history',
        'supersonic aircraft',
        'jet engine development',
        'Cold War aircraft',
        'military jet aircraft',
        'jet fighter books',
        'NATO aviation',
        'jet aviation history'
      );
    }

    if (book.category === 'Naval Aviation') {
      baseKeywords.push(
        'naval aviation',
        'aircraft carrier history',
        'Fleet Air Arm',
        'carrier aviation',
        'naval aircraft',
        'maritime aviation',
        'aircraft carrier books',
        'naval aviation history',
        'carrier operations',
        'naval air force'
      );
    }

    // Add research themes as keywords
    if (book.researchThemes) {
      baseKeywords.push(...book.researchThemes.map(theme => theme.toLowerCase()));
    }

    // Add geographic focus as keywords
    if (book.geographicFocus) {
      baseKeywords.push(...book.geographicFocus.map(geo => `${geo.toLowerCase()} aviation`));
    }

    // Add era-specific keywords
    if (book.era) {
      baseKeywords.push(...book.era.map(e => e.toLowerCase().replace(/[()]/g, '')));
    }

    return baseKeywords;
  };

  const keywords = generateKeywords(book);

  // Enhanced meta description
  const generateDescription = (book: Book) => {
    let description = book.description;

    // Add selling points
    description += ` Written by renowned aviation historian Charles E. MacKay. ${book.condition} condition. ISBN: ${book.isbn}.`;

    // Add academic credentials if available
    if (book.citationCount && book.citationCount > 0) {
      description += ` Cited ${book.citationCount} times in academic research.`;
    }

    // Add institutional backing
    if (book.academicInstitutions && book.academicInstitutions.length > 0) {
      description += ` Used by ${book.academicInstitutions[0]} and other leading institutions.`;
    }

    // Add purchase info
    description += ` Available for £${book.price}. FREE shipping worldwide.`;

    return description;
  };

  return {
    title: `${book.title} | Charles E. MacKay Aviation Books | £${book.price}`,
    description: generateDescription(book),
    keywords,
    authors: [{ name: 'Charles E. MacKay' }],
    creator: 'Charles E. MacKay',
    publisher: 'Charles E. MacKay',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${book.title} | Charles E. MacKay | £${book.price}`,
      description: generateDescription(book),
      type: 'website',
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      siteName: 'Charles E. MacKay Aviation Books',
      locale: 'en_GB',
      images: [
        {
          url: book.imageUrl || `/book-covers/${book.id}.jpg`,
          width: 400,
          height: 600,
          alt: `${book.title} by Charles E. MacKay - Aviation History Book Cover`,
          type: 'image/jpeg',
        },
        {
          url: '/charles-mackay-aviation-author.jpg',
          width: 300,
          height: 400,
          alt: 'Charles E. MacKay - Aviation Historian and Author',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@charlesmackaybooks',
      creator: '@charlesmackay',
      title: `${book.title} | Aviation History Book`,
      description: `${book.category} book by Charles E. MacKay. £${book.price}. UK £3.45 shipping.`,
      images: {
        url: book.imageUrl || `/book-covers/${book.id}.jpg`,
        alt: `${book.title} - Aviation History Book Cover`,
        width: 400,
        height: 600,
      },
    },
    alternates: {
      canonical: `https://charlesmackaybooks.com/books/${book.id}`,
    },
    other: {
      'product:price:amount': book.price.toString(),
      'product:price:currency': 'GBP',
      'product:availability': book.inStock ? 'in stock' : 'out of stock',
      'product:condition': book.condition.toLowerCase(),
      'product:isbn': book.isbn || '',
      'product:brand': 'Charles E. MacKay',
      'product:category': book.category,
      'book:author': 'Charles E. MacKay',
      'book:isbn': book.isbn || '',
      'book:tag': book.tags?.join(', ') || '',
    },
  };
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  const gradientClass = getCategoryGradient(book.category);

  // Get proper book cover image path - use book.imageUrl with fallback
  const bookCoverSrc = book.imageUrl || `/book-covers/${book.id}.jpg`;

  return (
    <>
      <UnifiedSchema
        pageType="book-detail"
        pageTitle={`${book.title} | Charles E. MacKay Aviation Books`}
        pageDescription={book.description}
        pageUrl={`/books/${book.id}`}
        bookData={book}
      />

      <BookAnalytics book={book} />

      <div className="min-h-screen bg-white">

        {/* Hero Section - refined for clarity and unique per-book presentation */}
        <div className={`hero-section relative bg-gradient-to-br ${gradientClass} text-white py-16 lg:py-24`}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Book Cover */}
              <div className="flex justify-center mb-10">
                <div className="relative">
                  <Image
                    src={bookCoverSrc}
                    alt={`${book.title} by Charles E. MacKay`}
                    width={400}
                    height={600}
                    className="rounded-xl shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div className="text-sm font-semibold text-white mb-4 flex items-center gap-3 justify-center flex-wrap">
                  <span className="badge badge-blue">{book.category}</span>
                  {book.era && book.era[0] && (
                    <span className="badge badge-amber">{book.era[0]}</span>
                  )}
                  {book.geographicFocus && book.geographicFocus[0] && (
                    <span className="badge badge-green">{book.geographicFocus[0]}</span>
                  )}
                  {book.isbn && <span className="badge badge-gray">ISBN: {book.isbn}</span>}
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  {book.title}
                </h1>
                
                <p className="text-xl lg:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">
                  {book.subtitle || (book.description?.length > 220 ? `${book.description.slice(0, 220)}…` : book.description)}
                </p>

                {/* Book Specifications - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-lg font-semibold text-white mb-2">Weight</div>
                    <div className="text-3xl font-bold text-white">{(book as any).weight || 300}g</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-lg font-semibold text-white mb-2">Published</div>
                    <div className="text-3xl font-bold text-white">{book.publicationYear}</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-lg font-semibold text-white mb-2">ISBN-13</div>
                    <div className="text-lg font-bold text-white leading-tight">{book.isbn}</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-lg font-semibold text-white mb-2">Condition</div>
                    <div className="text-3xl font-bold text-white">{book.condition}</div>
                  </div>
                </div>

                {/* Purchase CTA */}
                <div className="space-y-4 max-w-2xl mx-auto">
                  <BookDetailClient book={book} />
                  <div className="text-center mt-2 text-white/90 text-sm">FREE worldwide shipping • Secure PayPal checkout</div>
                  <div className="text-center mt-4">
                    <Link href="/books" className="badge badge-white text-accent-blue">
                      ← Browse All Aviation Books
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <main className="container mx-auto container-padding section-padding">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Content */}
            <div className="lg:col-span-2">
              <div className="card card-large content">
                <BookSEOContent book={book} />

                {/* Sample Pages */}
                <div className="mt-8">
                  <SamplePages book={book} />
                </div>

                {/* Table of contents */}
                {book.tableOfContents && (
                  <div className="mt-8 card-compact bg-gray-50">
                    <h3 className="content h3">Table of Contents</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {book.tableOfContents.map((chapter, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-muted mr-3 mt-1 text-sm font-mono">
                            {(index + 1).toString().padStart(2, '0')}.
                          </span>
                          <span>{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sample content */}
                {book.sampleContent && book.sampleContent.length > 0 && (
                  <div className="mt-8 card bg-accent-blue text-white">
                    <h3 className="content h3 text-white">Sample Content</h3>
                    {book.sampleContent.map((sample, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-semibold mb-2 text-white">{sample.chapter}: {sample.title}</h4>
                        <p className="italic text-sm leading-relaxed text-white">"{sample.excerpt}..."</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Research themes */}
                {book.researchThemes && book.researchThemes.length > 0 && (
                  <div className="mt-8">
                    <h3 className="content h3">Key Research Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.researchThemes.map((theme, index) => (
                        <span key={index} className="badge badge-blue">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic information */}
                {(book.academicLevel || book.academicInstitutions) && (
                  <div className="mt-8 card bg-accent-amber text-white">
                    <h3 className="content h3 text-white">Academic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {book.academicLevel && (
                        <div>
                          <h4 className="font-semibold mb-2 text-white">Academic Level</h4>
                          <div className="space-y-1">
                            {book.academicLevel.map((level, index) => (
                              <span key={index} className="block text-sm text-white">• {level}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {book.academicInstitutions && book.academicInstitutions.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-white">Used by Institutions</h4>
                          <div className="space-y-1">
                            {book.academicInstitutions.map((institution, index) => (
                              <span key={index} className="block text-sm text-white">• {institution}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {book.citationCount && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <span className="font-semibold text-white">Academic Citations: {book.citationCount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Specifications */}
                {book.specifications && (
                  <div className="mt-8 card-compact bg-gray-50">
                    <h3 className="content h3">Book Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {book.specifications.format && (
                        <div><strong>Format:</strong> {book.specifications.format}</div>
                      )}
                      {book.specifications.illustrations && (
                        <div><strong>Illustrations:</strong> {book.specifications.illustrations}</div>
                      )}
                      {book.specifications.maps && (
                        <div><strong>Maps:</strong> Included</div>
                      )}
                      {book.specifications.bibliography && (
                        <div><strong>Bibliography:</strong> Comprehensive</div>
                      )}
                      {book.specifications.index && (
                        <div><strong>Index:</strong> Detailed</div>
                      )}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                <div className="mt-8">
                  <BookFAQ />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <div className="aspect-[3/4] mb-6 relative">
                  <Image
                    src={bookCoverSrc}
                    alt={`${book.title} cover - Aviation history book by Charles E. MacKay`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>

                <div className="mt-6 card-compact bg-accent-blue text-white">
                  <h3 className="font-semibold mb-2 text-white">Book Details</h3>
                  <div className="space-y-2 text-sm text-white">
                    <div>Weight: {(book as any).weight || 300}g</div>
                    <div>Category: {book.category}</div>
                    <div>Year: {book.publicationYear || 'Not specified'}</div>
                    {book.isbn && <div>ISBN: {book.isbn}</div>}
                    {book.citationCount && <div>Citations: {book.citationCount}</div>}
                    {book.difficulty && <div>Level: {book.difficulty}</div>}
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 card-compact bg-accent-green text-white">
                  <h4 className="font-semibold mb-2 text-white">Why Choose This Book</h4>
                  <ul className="text-sm space-y-1 text-white">
                    <li>✓ Written by renowned aviation historian</li>
                    <li>✓ {book.condition} condition guaranteed</li>
                    <li>✓ FREE shipping worldwide</li>
                    <li>✓ Secure PayPal checkout</li>
                    {book.citationCount && <li>✓ {book.citationCount} academic citations</li>}
                    {book.academicInstitutions && book.academicInstitutions.length > 0 && (
                      <li>✓ Used by {book.academicInstitutions[0]}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced related books section */}
          <RelatedBooks books={books} currentBook={book} />

          {/* Related Blog Posts */}
          {book.relatedBlogPosts && book.relatedBlogPosts.length > 0 && (
            <div className="mt-12 card card-large content">
              <h2 className="content h2">Related Expert Insights</h2>
              <p>Explore Charles MacKay's expert blog posts related to this book's topics:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {book.relatedBlogPosts.map((post, index) => (
                  <div key={index} className="card hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-3 text-accent-blue">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-accent-blue font-medium"
                    >
                      Read Article
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 card card-large content">
            <h2 className="content h2">About Charles E. MacKay</h2>
            <p>
              Charles E. MacKay is a renowned aviation historian and author specializing in Scottish aviation heritage,
              military aviation history, and aircraft development. With over 19 published books and more than 1,700
              satisfied customers worldwide, Charles has established himself as a leading authority on aviation history.
              His works are used as primary references by aviation researchers, museums, and academic institutions
              including the Imperial War Museum, RAF Museum, and major universities.
            </p>
            <p>
              Based in Glasgow, Scotland, Charles conducts extensive archival research and has unprecedented access
              to historical aviation documents, photographs, and company records. His books combine rigorous academic
              research with engaging storytelling, making complex aviation history accessible to both scholars and
              enthusiasts.
            </p>
          </div>
        </main>

        <MobileFooterNav />
        {/* Sticky mobile buy bar */}
        <MobileBuyBar book={book} />
        

      </div>
    </>
  );
}
