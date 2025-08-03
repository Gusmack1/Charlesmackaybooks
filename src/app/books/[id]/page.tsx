import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import BookDetailClient from '@/components/BookDetailClient';
import UnifiedSchema from '@/components/UnifiedSchema';
import BookSEOContent from '@/components/BookSEOContent';
import BookDetailNavigation from '@/components/BookDetailNavigation';
import RelatedBooks from '@/components/RelatedBooks';
import MobileFooterNav from '@/components/MobileFooterNav';
import BookAnalytics from '@/components/BookAnalytics';

// Function to get category-specific gradient colors
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

// Function to get category-specific accent classes
function getCategoryAccentClasses(category: string): {
  textLight: string;
  textDark: string;
  bg: string;
  badge: string;
  link: string;
  linkHover: string;
} {
  const classes: Record<string, any> = {
    'Scottish Aviation History': {
      textLight: 'text-amber-300',
      textDark: 'text-amber-700',
      bg: 'bg-amber-600',
      badge: 'bg-amber-600',
      link: 'text-amber-300',
      linkHover: 'hover:text-amber-100'
    },
    'WWI Aviation': {
      textLight: 'text-red-300',
      textDark: 'text-red-700',
      bg: 'bg-red-600',
      badge: 'bg-red-600',
      link: 'text-red-300',
      linkHover: 'hover:text-red-100'
    },
    'WWII Aviation': {
      textLight: 'text-blue-300',
      textDark: 'text-blue-700',
      bg: 'bg-blue-600',
      badge: 'bg-blue-600',
      link: 'text-blue-300',
      linkHover: 'hover:text-blue-100'
    },
    'Aviation Biography': {
      textLight: 'text-purple-300',
      textDark: 'text-purple-700',
      bg: 'bg-purple-600',
      badge: 'bg-purple-600',
      link: 'text-purple-300',
      linkHover: 'hover:text-purple-100'
    },
    'Helicopter History': {
      textLight: 'text-green-200',
      textDark: 'text-green-700',
      bg: 'bg-green-600',
      badge: 'bg-green-600',
      link: 'text-green-200',
      linkHover: 'hover:text-green-100'
    },
    'Jet Age Aviation': {
      textLight: 'text-indigo-300',
      textDark: 'text-indigo-700',
      bg: 'bg-indigo-600',
      badge: 'bg-indigo-600',
      link: 'text-indigo-300',
      linkHover: 'hover:text-indigo-100'
    },
    'Naval Aviation': {
      textLight: 'text-cyan-300',
      textDark: 'text-cyan-700',
      bg: 'bg-cyan-600',
      badge: 'bg-cyan-600',
      link: 'text-cyan-300',
      linkHover: 'hover:text-cyan-100'
    },
    'Aviation History': {
      textLight: 'text-orange-300',
      textDark: 'text-orange-700',
      bg: 'bg-orange-600',
      badge: 'bg-orange-600',
      link: 'text-orange-300',
      linkHover: 'hover:text-orange-100'
    },
    'Military History': {
      textLight: 'text-gray-300',
      textDark: 'text-gray-700',
      bg: 'bg-gray-600',
      badge: 'bg-gray-600',
      link: 'text-gray-300',
      linkHover: 'hover:text-gray-100'
    },
    'Industrial History': {
      textLight: 'text-yellow-300',
      textDark: 'text-yellow-700',
      bg: 'bg-yellow-600',
      badge: 'bg-yellow-600',
      link: 'text-yellow-300',
      linkHover: 'hover:text-yellow-100'
    },
    'Travel Literature': {
      textLight: 'text-emerald-300',
      textDark: 'text-emerald-700',
      bg: 'bg-emerald-600',
      badge: 'bg-emerald-600',
      link: 'text-emerald-300',
      linkHover: 'hover:text-emerald-100'
    }
  };

  return classes[category] || {
    textLight: 'text-gray-300',
    textDark: 'text-gray-700',
    bg: 'bg-gray-600',
    badge: 'bg-gray-600',
    link: 'text-gray-300',
    linkHover: 'hover:text-gray-100'
  };
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
    description += ` Written by renowned aviation historian Charles E. MacKay. ${book.pageCount} pages. ${book.condition} condition. ISBN: ${book.isbn}.`;

    // Add academic credentials if available
    if (book.citationCount && book.citationCount > 0) {
      description += ` Cited ${book.citationCount} times in academic research.`;
    }

    // Add institutional backing
    if (book.academicInstitutions && book.academicInstitutions.length > 0) {
      description += ` Used by ${book.academicInstitutions[0]} and other leading institutions.`;
    }

    // Add purchase info
    description += ` Available for £${book.price}. UK £3.45, EU £4.95, USA £8.95, Worldwide £12.95 shipping.`;

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
      description: `${book.category} book by Charles E. MacKay. ${book.pageCount} pages. £${book.price}. UK £3.45 shipping.`,
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
  const accentClasses = getCategoryAccentClasses(book.category);

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

      <div className="min-h-screen bg-slate-50">

        {/* Hero Section */}
        <div className={`relative bg-gradient-to-br ${gradientClass} text-white`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="flex justify-start">
                <div className="relative">
                  <Image
                    src={bookCoverSrc}
                    alt={`${book.title} by Charles E. MacKay`}
                    width={450}
                    height={675}
                    className="rounded-lg shadow-2xl"
                    priority
                  />
                  <div className={`absolute -bottom-6 -right-6 ${accentClasses.badge} text-white px-6 py-3 rounded-lg font-bold text-xl`}>
                    £{book.price}
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="pt-0">
                <div className={`text-sm ${accentClasses.textLight} mb-3 flex items-center gap-2`}>
                  <span>{book.category}</span>
                  {book.era && book.era[0] && (
                    <>
                      <span>•</span>
                      <span>{book.era[0]}</span>
                    </>
                  )}
                  {book.geographicFocus && book.geographicFocus[0] && (
                    <>
                      <span>•</span>
                      <span>{book.geographicFocus[0]}</span>
                    </>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                  {book.description}
                </p>

                {/* Book Specifications */}
                <div className="grid grid-cols-2 gap-6 mb-8 text-center">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className={`text-sm ${accentClasses.textLight} mb-1`}>Pages</div>
                    <div className="text-2xl font-bold">{book.pageCount}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className={`text-sm ${accentClasses.textLight} mb-1`}>Published</div>
                    <div className="text-2xl font-bold">{book.publicationYear}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className={`text-sm ${accentClasses.textLight} mb-1`}>ISBN-13</div>
                    <div className="text-lg font-semibold">{book.isbn}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className={`text-sm ${accentClasses.textLight} mb-1`}>Condition</div>
                    <div className="text-2xl font-bold text-green-200">{book.condition}</div>
                  </div>
                </div>

                {/* Purchase Options */}
                <div className="space-y-4">
                  <BookDetailClient book={book} />
                  <div className="text-center">
                    <Link
                      href="/books"
                      className={`${accentClasses.link} ${accentClasses.linkHover} underline`}
                    >
                      ← Browse All Aviation Books
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <main className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <BookSEOContent book={book} />

                {/* Enhanced table of contents */}
                {book.tableOfContents && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {book.tableOfContents.map((chapter, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-gray-500 mr-3 mt-1 text-sm font-mono">
                            {(index + 1).toString().padStart(2, '0')}.
                          </span>
                          <span className="text-gray-700">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sample content preview */}
                {book.sampleContent && book.sampleContent.length > 0 && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Sample Content</h3>
                    {book.sampleContent.map((sample, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-semibold text-blue-700 mb-2">{sample.chapter}: {sample.title}</h4>
                        <p className="text-blue-600 italic text-sm leading-relaxed">"{sample.excerpt}..."</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Research themes and keywords */}
                {book.researchThemes && book.researchThemes.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Key Research Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.researchThemes.map((theme, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic information */}
                {(book.academicLevel || book.academicInstitutions) && (
                  <div className="mt-8 p-6 bg-amber-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-amber-800">Academic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {book.academicLevel && (
                        <div>
                          <h4 className="font-semibold text-amber-700 mb-2">Academic Level</h4>
                          <div className="space-y-1">
                            {book.academicLevel.map((level, index) => (
                              <span key={index} className="block text-amber-600 text-sm">• {level}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {book.academicInstitutions && book.academicInstitutions.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-amber-700 mb-2">Used by Institutions</h4>
                          <div className="space-y-1">
                            {book.academicInstitutions.map((institution, index) => (
                              <span key={index} className="block text-amber-600 text-sm">• {institution}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {book.citationCount && (
                      <div className="mt-4 pt-4 border-t border-amber-200">
                        <span className="text-amber-700 font-semibold">Academic Citations: {book.citationCount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Specifications */}
                {book.specifications && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Book Specifications</h3>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <div className="aspect-[3/4] mb-6 relative">
                  <Image
                    src={bookCoverSrc}
                    alt={`${book.title} cover - Aviation history book by Charles E. MacKay`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Book Details</h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>Pages: {book.pageCount || 'Not specified'}</div>
                    <div>Category: {book.category}</div>
                    <div>Year: {book.publicationYear || 'Not specified'}</div>
                    {book.isbn && <div>ISBN: {book.isbn}</div>}
                    {book.citationCount && <div>Citations: {book.citationCount}</div>}
                    {book.difficulty && <div>Level: {book.difficulty}</div>}
                  </div>
                </div>

                {/* SEO-optimized trust signals */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Why Choose This Book</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Written by renowned aviation historian</li>
                    <li>✓ {book.condition} condition guaranteed</li>
                    <li>✓ UK £3.45 • EU £4.95 • USA £8.95 • Worldwide £12.95 shipping</li>
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
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Related Expert Insights</h2>
              <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts related to this book's topics:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {book.relatedBlogPosts.map((post, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
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

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">About Charles E. MacKay</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Charles E. MacKay is a renowned aviation historian and author specializing in Scottish aviation heritage,
                military aviation history, and aircraft development. With over 19 published books and more than 1,700
                satisfied customers worldwide, Charles has established himself as a leading authority on aviation history.
                His works are used as primary references by aviation researchers, museums, and academic institutions
                including the Imperial War Museum, RAF Museum, and major universities.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Based in Glasgow, Scotland, Charles conducts extensive archival research and has unprecedented access
                to historical aviation documents, photographs, and company records. His books combine rigorous academic
                research with engaging storytelling, making complex aviation history accessible to both scholars and
                enthusiasts.
              </p>
            </div>
          </div>
        </main>

        <MobileFooterNav />
      </div>
    </>
  );
}
