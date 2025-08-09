import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import BookDetailClient from '@/components/BookDetailClient';
import UnifiedSchema from '@/components/UnifiedSchema';
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
      description: `${book.category} book by Charles E. MacKay. £${book.price}. FREE shipping worldwide.`,
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

  // Parse Bookinfo.txt to extract authoritative descriptions and weights
  const bookInfoPath = path.join(process.cwd(), 'Bookinfo.txt');
  let fileText = '';
  try {
    fileText = await fs.readFile(bookInfoPath, 'utf8');
  } catch {}

  const parseEntries = (text: string) => {
    const sections = text.split(/\*{10,}/g).map(s => s.trim()).filter(Boolean);
    return sections.map(section => {
      const lines = section.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      const titleLine = lines[0] || '';
      const isbnMatch = section.match(/ISBN\s*[:]?\s*([0-9Xx\-]+)/);
      const weightMatch = section.match(/(\d{2,4})\s*(?:gms|g)\b/i);
      // Description: all lines after price/ISBN header block
      // Find first blank line after first 2-3 lines, or fallback to remaining text
      const body = lines.slice(1).join('\n');
      return {
        title: titleLine.replace(/\s+\.+$/, '').trim(),
        isbn: isbnMatch ? isbnMatch[1].replace(/[^0-9Xx]/g, '') : '',
        weightGrams: weightMatch ? parseInt(weightMatch[1], 10) : undefined,
        description: body
      };
    });
  };

  const entries = fileText ? parseEntries(fileText) : [];
  const normaliseIsbn = (s?: string) => (s ? s.replace(/[^0-9Xx]/g, '') : '');
  const byIsbn = entries.find(e => e.isbn && e.isbn === normaliseIsbn(book.isbn));
  const byTitle = entries.find(e => e.title.toLowerCase().includes(book.title.toLowerCase()) || book.title.toLowerCase().includes(e.title.toLowerCase()));
  const info = byIsbn || byTitle;

  // Prefer curated, researched copy from src/data/books.ts; fallback to Bookinfo.txt
  const preferredDescription = book.description || info?.description || '';
  const weightFromInfo = info?.weightGrams;

  // Remove legacy ecommerce boilerplate (price/ISBN/shipping) if present
  function sanitizeDescription(raw: string): string[] {
    const lines = raw
      .split(/\r?\n+/)
      .map(l => l.trim())
      .filter(Boolean)
      .filter(l => !/^£\s?\d/.test(l))
      .filter(l => !/^isbn[:\s]/i.test(l))
      .filter(l => !/\bISBN[-:]/i.test(l))
      .filter(l => !/Condition is/i.test(l))
      .filter(l => !/Dispatched with/i.test(l))
      .filter(l => !/Royal Mail/i.test(l))
      .filter(l => !/\bshipping\b/i.test(l))
      .filter(l => !/Updated copy coming/i.test(l));

    // Merge back into paragraphs by double-breaks
    const text = lines.join('\n');
    return text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean);
  }
  const sanitizedParagraphs = sanitizeDescription(preferredDescription);

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

      <div className="min-h-screen bg-background">

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
                
                {/* Per request: no description text in hero */}

                {/* Book Specifications - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-lg font-semibold text-white mb-2">Weight</div>
                    <div className="text-3xl font-bold text-white">{weightFromInfo || (book as any).weight || 300}g</div>
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

                {/* Purchase Options */}
                <div className="space-y-4 max-w-2xl mx-auto">
                  <BookDetailClient book={book} />
                  <div className="text-center mt-6">
                    <Link href="/books" className="text-accent-blue hover:text-accent-blue underline">
                      ← Browse All Aviation Books
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main description content */}
        <main className="container mx-auto container-padding section-padding">
          <div className="card card-large content">
            <h2 className="content h2">Description</h2>
            <div className="prose prose-invert max-w-none">
              {sanitizedParagraphs.length > 0 ? (
                sanitizedParagraphs.map((para, idx) => (
                  <p key={idx} className="text-secondary mb-4">{para}</p>
                ))
              ) : (
                <p className="text-secondary">No description available.</p>
              )}
            </div>
          </div>

          {/* Related Articles only (continuity) */}
          {(book as any).relatedBlogPosts && (book as any).relatedBlogPosts.length > 0 ? (
            <div className="card mt-8">
              <h3 className="content h3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(book as any).relatedBlogPosts.slice(0, 6).map((p: any) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block border rounded-lg p-4 hover:border-secondary/50">
                    <div className="font-semibold text-primary mb-1 line-clamp-2">{p.title}</div>
                    <div className="text-secondary text-sm line-clamp-3">{p.excerpt}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="card mt-8">
              <h3 className="content h3">Explore More</h3>
              <p className="text-secondary mb-3">Read expert research that connects to this title.</p>
              <Link href="/blog" className="badge badge-blue inline-block">Browse the Blog →</Link>
            </div>
          )}
        </main>

        {/* Mobile footer nav removed on book pages */}
        {/* Sticky mobile buy bar removed per request */}
        

      </div>
    </>
  );
}
