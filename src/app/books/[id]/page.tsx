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
import EnhancedBookSEO from '@/components/EnhancedBookSEO';


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

  const keywords = [...generateKeywords(book), 'charles mackay books'];

  // Meta description derived strictly from book content (no extra marketing)
  const generateDescription = (book: Book) => {
    const base = (book.description || '').replace(/\s+/g, ' ').trim();
    // Clamp to typical meta length ~160 chars without cutting mid‑word
    if (base.length <= 160) return base;
    const slice = base.slice(0, 157);
    const lastSpace = slice.lastIndexOf(' ');
    return (lastSpace > 120 ? slice.slice(0, lastSpace) : slice) + '…';
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
      url: `https://charlesmackaybooks.com/books/${book.id}/`,
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
      description: generateDescription(book),
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

  // Consistent dark-blue hero across all book pages - solid dark blue
  const gradientClass = 'bg-slate-900';

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

  // ISBN helpers: normalize and convert between 10/13 to generate match candidates
  const normalizeIsbn = (s?: string) => (s ? s.replace(/[^0-9Xx]/g, '').toUpperCase() : '');
  const computeIsbn13From10 = (isbn10?: string): string | undefined => {
    const n = normalizeIsbn(isbn10);
    if (!n || n.length !== 10) return undefined;
    const core = n.slice(0, 9);
    const prefixed = '978' + core;
    const digits = prefixed.split('').map(d => parseInt(d, 10));
    if (digits.some(Number.isNaN)) return undefined;
    const sum = digits.reduce((acc, d, idx) => acc + d * (idx % 2 === 0 ? 1 : 3), 0);
    const check = (10 - (sum % 10)) % 10;
    return prefixed + String(check);
  };
  const computeIsbn10From13 = (isbn13?: string): string | undefined => {
    const n = normalizeIsbn(isbn13);
    if (!n || n.length !== 13 || (n.slice(0, 3) !== '978' && n.slice(0, 3) !== '979')) return undefined;
    const core = n.slice(3, 12); // 9 digits
    const digits = core.split('').map(d => parseInt(d, 10));
    if (digits.some(Number.isNaN)) return undefined;
    const sum = digits.reduce((acc, d, idx) => acc + d * (10 - idx), 0);
    let checkVal = 11 - (sum % 11);
    if (checkVal === 10) return core + 'X';
    if (checkVal === 11) checkVal = 0;
    return core + String(checkVal);
  };
  const generateIsbnCandidates = (raw?: string): string[] => {
    const base = normalizeIsbn(raw);
    if (!base) return [];
    const candidates = new Set<string>();
    candidates.add(base);
    if (base.length === 10) {
      const v13 = computeIsbn13From10(base);
      if (v13) candidates.add(v13);
    } else if (base.length === 13) {
      const v10 = computeIsbn10From13(base);
      if (v10) candidates.add(v10);
    }
    return Array.from(candidates);
  };

  const bookIsbnCandidates = generateIsbnCandidates(book.isbn);
  const byIsbn = entries.find(e => !!e.isbn && bookIsbnCandidates.includes(normalizeIsbn(e.isbn)));
  const byTitle = entries.find(e => e.title.toLowerCase().includes(book.title.toLowerCase()) || book.title.toLowerCase().includes(e.title.toLowerCase()));
  const info = byIsbn || byTitle;

  // Prefer curated summary from books.ts; fallback to sanitized Bookinfo.txt content
  const preferredDescription = book.description || info?.description || '';
  const weightFromInfo = info?.weightGrams;

  // Remove legacy ecommerce boilerplate (price/ISBN/shipping) if present
  function sanitizeDescription(raw: string): string[] {
    if (!raw) return [];
    
    // Check if this is a single-line description (likely from books.ts)
    const isSingleLine = !raw.includes('\n') || raw.split('\n').length <= 2;
    
    if (isSingleLine) {
      // For single-line descriptions, just check if it's entirely boilerplate
      const trimmed = raw.trim();
      if (trimmed.length === 0) return [];
      
      // If it's just boilerplate, return empty
      if (/^£\s?\d/.test(trimmed) || /^Condition is/i.test(trimmed) || 
          /^Dispatched with/i.test(trimmed) || /^ISBN[:\s]/i.test(trimmed)) {
        return [];
      }
      
      // Split by sentence endings and create paragraphs
      const sentences = trimmed.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
      if (sentences.length > 0) {
        // Group sentences into paragraphs of 2-3 sentences
        const paragraphs: string[] = [];
        for (let i = 0; i < sentences.length; i += 3) {
          paragraphs.push(sentences.slice(i, i + 3).join(' '));
        }
        return paragraphs;
      }
      
      return [trimmed];
    }
    
    // Multi-line description - process line by line
    const lines = raw
      .split(/\r?\n+/)
      .map(l => l.trim())
      .filter(Boolean)
      // Filter out ecommerce boilerplate but be less aggressive with ISBN mentions in content
      .filter(l => !/^£\s?\d/.test(l)) // Price lines
      .filter(l => !/^isbn[:\s]/i.test(l)) // Lines starting with ISBN
      .filter(l => !/^Condition is/i.test(l))
      .filter(l => !/^Dispatched with/i.test(l))
      .filter(l => !/^Royal Mail/i.test(l))
      .filter(l => !/^\bshipping\b/i.test(l))
      .filter(l => !/Updated copy coming/i.test(l))
      .filter(l => !/^Any questions/i.test(l))
      .filter(l => !/^Highly recommended/i.test(l))
      .filter(l => !/^POST FREE/i.test(l))
      .filter(l => !/^Post Free/i.test(l))
      .filter(l => !/recent (buyer|purchase|comment)/i.test(l))
      .filter(l => !/\bEBay\b/i.test(l))
      .filter(l => !/^".*"\s*(?:-|–)?\s*(?:buyer|review)/i.test(l))
      .filter(l => !/\bRRHT\b/i.test(l));

    // If we filtered out everything, try a less aggressive approach
    if (lines.length === 0) {
      // Split by paragraph breaks and preserve content
      const paragraphs = raw.split(/\n{2,}/);
      return paragraphs
        .map(p => p.trim())
        .filter(p => p.length > 0 && !/^£\s?\d/.test(p) && !/^Condition is/i.test(p))
        .filter(Boolean);
    }

    // Merge back into paragraphs by double-breaks
    const text = lines.join('\n');
    const paragraphs = text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean);
    
    // If we still have no paragraphs, create one from remaining lines
    if (paragraphs.length === 0 && lines.length > 0) {
      return [lines.join(' ')];
    }
    
    return paragraphs;
  }
  const sanitizedParagraphs = sanitizeDescription(preferredDescription);
  
  // Fallback: if sanitization removed everything, use the original description as paragraphs
  const finalParagraphs = sanitizedParagraphs.length > 0 
    ? sanitizedParagraphs 
    : (preferredDescription ? [preferredDescription] : []);

  const metaDescriptionForSchema = sanitizedParagraphs[0] || book.description || '';

  // Infer a best-fit blog article slug for "Explore More" when explicit related posts are missing
  const inferRelatedBlogSlug = (b: Book): string | undefined => {
    // Prefer the first explicit related post when present
    const anyRel = (b as any).relatedBlogPosts?.[0]?.slug as string | undefined;
    if (anyRel) return anyRel;

    // Per-book direct mappings where a highly relevant article exists
    const idToSlug: Record<string, string> = {
      'adolf-rohrbach': 'adolf-rohrbach-metal-aircraft-revolution',
      'german-aircraft-great-war': 'german-aircraft-great-war-development',
      'british-aircraft-great-war': 'british-aircraft-great-war-rfc-rnas',
      'aircraft-carrier-argus': 'hms-argus-first-aircraft-carrier',
      'sycamore-seeds': 'sycamore-seeds-helicopter-evolution',
      'soaring-with-wings': 'percy-pilcher-scotland-aviation-pioneer',
      'mother-of-the-few': 'lucy-lady-houston-schneider-trophy',
      'sonic-to-standoff': 'british-nuclear-deterrent-v-force',
      'sabres-from-north': 'f86-sabre-cold-war-fighter',
      'enemy-luftwaffe-1945': 'luftwaffe-1945-final-year',
      'clydeside-aviation-vol2': 'clydeside-aviation-revolution',
      'flying-for-kaiser': 'german-aircraft-great-war-development',
      'dieter-dengler': 'dieter-dengler-skyraider-escape',
      'modern-furniture': 'morris-furniture-war-work-aviation',
      'birth-atomic-bomb': 'maud-alsos-atomic-program',
      'dorothy-wordsworth': 'dorothy-wordsworth-scottish-tour-1803',
    };
    if ((b as any).id && idToSlug[(b as any).id as string]) return idToSlug[(b as any).id as string];

    // Map common categories to cornerstone blog articles
    const categoryToSlug: Record<string, string> = {
      'WWI Aviation': 'british-aircraft-great-war-rfc-rnas',
      'WWII Aviation': 'luftwaffe-1945-final-year',
      'Scottish Aviation History': 'clydeside-aviation-revolution',
      'Helicopter History': 'helicopter-development-pioneers',
      'Jet Age Aviation': 'jet-age-aviation-cold-war-development',
      'Naval Aviation': 'hms-argus-first-aircraft-carrier',
      'Aviation Biography': 'test-pilot-biography-eric-brown',
      'Aviation History': 'adolf-rohrbach-metal-aircraft-revolution',
      'Military History': 'british-nuclear-deterrent-v-force',
      'Industrial History': 'clydeside-aviation-revolution',
    };
    return categoryToSlug[b.category];
  };

  // Get related blog posts for enhanced SEO
  const relatedBlogPosts = (book as any).relatedBlogPosts || [];
  
  return (
    <>
        <UnifiedSchema
        pageType="book-detail"
        pageTitle={`${book.title} | Charles E. MacKay Aviation Books`}
          pageDescription={metaDescriptionForSchema}
        pageUrl={`/books/${book.id}/`}
        bookData={book}
      />

      {/* Enhanced SEO with FAQ, Reviews, and AI optimization */}
      <EnhancedBookSEO 
        book={book} 
        relatedBlogPosts={relatedBlogPosts}
      />

      <BookAnalytics book={book} />

      <div className="min-h-screen bg-slate-900">

        {/* Hero Section - refined for clarity and unique per-book presentation */}
        <div className={`hero-section relative ${gradientClass} text-white py-6 sm:py-8 lg:py-16`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Book Cover */}
              <div className="flex justify-center mb-4 sm:mb-6">
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
                  <Link href={`/category/${book.category.toLowerCase().replace(/\s+/g, '-')}`} className="badge badge-blue hover:bg-blue-600 transition-colors">
                    {book.category}
                  </Link>
                  {book.era && book.era[0] && (
                    <span className="badge badge-amber">{book.era[0]}</span>
                  )}
                  {book.geographicFocus && book.geographicFocus[0] && (
                    <span className="badge badge-green">{book.geographicFocus[0]}</span>
                  )}
                  {book.isbn && <span className="badge badge-gray">ISBN: {book.isbn}</span>}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
                  {book.title}
                </h1>

                <p className="text-white/90 text-base sm:text-lg -mt-2">
                  By <Link href="/about" className="underline font-semibold">Charles E. MacKay</Link>
                </p>
                
                {/* Per request: no description text in hero */}

                {/* Book Specifications - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-5xl mx-auto">
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-blue-700/50 text-center">
                  <div className="text-lg font-semibold text-white mb-2">Weight</div>
                    <div className="text-3xl font-bold text-white">{weightFromInfo || (book as any).weight || 300}g</div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-blue-700/50 text-center">
                    <div className="text-lg font-semibold text-white mb-2">Published</div>
                    <div className="text-3xl font-bold text-white">{book.publicationYear}</div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-blue-700/50 text-center">
                    <div className="text-lg font-semibold text-white mb-2">ISBN-13</div>
                    <div className="text-lg font-bold text-white leading-tight">{book.isbn}</div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-blue-700/50 text-center">
                    <div className="text-lg font-semibold text-white mb-2">Condition</div>
                    <div className="text-3xl font-bold text-white">{book.condition}</div>
                  </div>
                </div>

                {/* Purchase Options */}
                <div className="space-y-4 max-w-2xl mx-auto">
                  <BookDetailClient book={book} />
                  <div className="text-center mt-6">
                    <Link href="/books" className="text-blue-300 hover:text-white underline">
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
          {/* Overview */}
          <div className="card card-large content">
            <h2 className="content h2">Overview</h2>
            <div className="prose prose-invert max-w-none">
              {finalParagraphs.length > 0 ? (
                finalParagraphs.map((para, idx) => (
                  <p key={idx} className="text-secondary mb-4">{para}</p>
                ))
              ) : (
                <p className="text-secondary">No description available.</p>
              )}
            </div>
          </div>

          {/* At a Glance (derived only from existing fields) */}
          <div className="card mt-8 content">
            <h3 className="content h3">At a Glance</h3>
            <ul className="list-disc list-inside text-secondary space-y-1">
              <li><span className="font-semibold text-primary">Category:</span> {book.category}</li>
              {book.pageCount ? (
                <li><span className="font-semibold text-primary">Pages:</span> {book.pageCount}</li>
              ) : null}
              {book.publicationYear ? (
                <li><span className="font-semibold text-primary">Publication Year:</span> {book.publicationYear}</li>
              ) : null}
              {book.isbn ? (
                <li><span className="font-semibold text-primary">ISBN:</span> {book.isbn}</li>
              ) : null}
              <li><span className="font-semibold text-primary">Condition:</span> {book.condition}</li>
              <li><span className="font-semibold text-primary">In Stock:</span> {book.inStock ? 'Yes' : 'No'}</li>
              <li><span className="font-semibold text-primary">Price:</span> £{book.price}</li>
              {(weightFromInfo || (book as any).weight) ? (
                <li><span className="font-semibold text-primary">Weight:</span> {weightFromInfo || (book as any).weight}g</li>
              ) : null}
              {book.era && book.era.length ? (
                <li><span className="font-semibold text-primary">Era:</span> {book.era.join(', ')}</li>
              ) : null}
              {book.aircraftTypes && book.aircraftTypes.length ? (
                <li><span className="font-semibold text-primary">Aircraft / Systems:</span> {book.aircraftTypes.join(', ')}</li>
              ) : null}
              {book.geographicFocus && book.geographicFocus.length ? (
                <li><span className="font-semibold text-primary">Geographic Focus:</span> {book.geographicFocus.join(', ')}</li>
              ) : null}
              {book.researchThemes && book.researchThemes.length ? (
                <li><span className="font-semibold text-primary">Research Themes:</span> {book.researchThemes.join(', ')}</li>
              ) : null}
              {(book as any).academicInstitutions?.length ? (
                <li><span className="font-semibold text-primary">Academic Use:</span> {(book as any).academicInstitutions.slice(0, 2).join(', ')}{((book as any).academicInstitutions.length > 2 ? '…' : '')}</li>
              ) : null}
              {Array.isArray((book as any).sourceType) && (book as any).sourceType.length ? (
                <li><span className="font-semibold text-primary">Sources:</span> {(book as any).sourceType.join(', ')}</li>
              ) : null}
            </ul>
          </div>

          {/* Scope and Coverage */}
          {(book.era?.length || book.aircraftTypes?.length || book.geographicFocus?.length || book.researchThemes?.length) ? (
            <div className="card mt-8 content">
              <h3 className="content h3">Scope and Coverage</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-secondary">
                {book.era?.length ? (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Era</h4>
                    <ul className="list-disc list-inside">
                      {book.era.map((e) => (<li key={e}>{e}</li>))}
                    </ul>
                  </div>
                ) : null}
                {book.aircraftTypes?.length ? (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Aircraft and Systems</h4>
                    <ul className="list-disc list-inside">
                      {book.aircraftTypes.map((t) => (<li key={t}>{t}</li>))}
                    </ul>
                  </div>
                ) : null}
                {book.geographicFocus?.length ? (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Geographic Focus</h4>
                    <ul className="list-disc list-inside">
                      {book.geographicFocus.map((g) => (<li key={g}>{g}</li>))}
                    </ul>
                  </div>
                ) : null}
                {book.researchThemes?.length ? (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Research Themes</h4>
                    <ul className="list-disc list-inside">
                      {book.researchThemes.map((r) => (<li key={r}>{r}</li>))}
                    </ul>
                  </div>
                ) : null}
                {(book as any).sourceType?.length ? (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Source Types</h4>
                    <ul className="list-disc list-inside">
                      {(book as any).sourceType.map((s: string) => (<li key={s}>{s}</li>))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Research and Sources */}
          {(book.sourceType?.length || (book as any).researchBackground || (book as any).academicInstitutions?.length) ? (
            <div className="card mt-8 content">
              <h3 className="content h3">Research and Sources</h3>
              {book.sourceType?.length ? (
                <p className="text-secondary mb-3">Source types: {book.sourceType.join(', ')}.</p>
              ) : null}
              {(book as any).researchBackground ? (
                <p className="text-secondary mb-3">{(book as any).researchBackground}</p>
              ) : null}
              {(book as any).academicInstitutions?.length ? (
                <p className="text-secondary mb-3">Used by: {(book as any).academicInstitutions.join(', ')}.</p>
              ) : null}
            </div>
          ) : null}

          {/* Technical Specifications */}
          {(book as any).specifications ? (
            <div className="card mt-8 content">
              <h3 className="content h3">Technical Specifications</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-secondary">
                <div>
                  <div className="font-semibold text-primary">Format</div>
                  <div>{(book as any).specifications.format}</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">Illustrations</div>
                  <div>{(book as any).specifications.illustrations}</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">Maps</div>
                  <div>{(book as any).specifications.maps ? 'Included' : '—'}</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">Bibliography</div>
                  <div>{(book as any).specifications.bibliography ? 'Included' : '—'}</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">Index</div>
                  <div>{(book as any).specifications.index ? 'Included' : '—'}</div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Table of Contents */}
          {(book as any).tableOfContents?.length ? (
            <div className="card mt-8 content">
              <h3 className="content h3">Table of Contents</h3>
              <ol className="list-decimal list-inside text-secondary space-y-1">
                {(book as any).tableOfContents.map((item: string, idx: number) => (
                  <li key={`${idx}-${item.slice(0,20)}`}>{item}</li>
                ))}
              </ol>
            </div>
          ) : null}

          {/* Author's Note */}
          {(book as any).authorInsights ? (
            <div className="card mt-8 content">
              <h3 className="content h3">Author’s Note</h3>
              <p className="text-secondary">{(book as any).authorInsights}</p>
            </div>
          ) : null}

          {/* Related Articles only (continuity) */}
          {(book as any).relatedBlogPosts && (book as any).relatedBlogPosts.length > 0 ? (
            <div className="card mt-8 content">
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
            <div className="card mt-8 content">
              <h3 className="content h3">Explore More</h3>
              <p className="text-secondary mb-3">Read expert research that connects to this title.</p>
              {(() => {
                const slug = inferRelatedBlogSlug(book);
                if (slug) {
                  return (
                    <Link href={`/blog/${slug}`} className="badge badge-blue inline-block">Read the related article →</Link>
                  );
                }
                return <Link href="/blog" className="badge badge-blue inline-block">Browse the Blog →</Link>;
              })()}
            </div>
          )}
        </main>

        {/* Mobile footer nav removed on book pages */}
        {/* Sticky mobile buy bar removed per request */}
        

      </div>
    </>
  );
}
