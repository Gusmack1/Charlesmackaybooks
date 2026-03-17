import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import { SITE_CONSTANTS } from '@/config/constants';
import BookDetailClient from '@/components/BookDetailClient';
import BookCoverBuy from '@/components/BookCoverBuy';
import UnifiedSchema from '@/components/UnifiedSchema';
import BookAnalyticsClient from '@/components/BookAnalyticsClient';
import ShareButton from '@/components/ShareButton';

// Generate static params for all books
export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

// Parse Bookinfo.txt for Primary Description by book ID (markdown format)
function parseBookinfoById(text: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!text) return map;

  const sections = text.split(/^##\s+/m).slice(1);

  for (const section of sections) {
    const idBlock = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
    const id = idBlock?.[1];
    if (!id) continue;

    const primaryMatch = section.match(/\*\*Primary Description:\*\*\s*\n((?:>.*\n?)+)/);
    if (primaryMatch) {
      const desc = primaryMatch[1]
        .split(/\n/)
        .map((l) => l.replace(/^>\s*/, '').trim())
        .filter(Boolean)
        .join('\n')
        .trim();
      if (desc) map.set(id, desc);
    }
  }
  return map;
}

// Fallback: parse legacy asterisk-separated format (e.g. user's Book info.txt)
function parseLegacyBookinfo(text: string): Map<string, { description: string }> {
  const map = new Map<string, { description: string }>();
  if (!text) return map;

  const sections = text.split(/\*{10,}/g).map((s) => s.trim()).filter(Boolean);
  for (const section of sections) {
    const lines = section.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const titleLine = lines[0] || '';
    const isbnMatch = section.match(/ISBN\s*[:]?\s*([0-9Xx\-]+)/);
    const body = lines.slice(1).join('\n').trim();
    if (!body) continue;

    const isbn = isbnMatch ? isbnMatch[1].replace(/[^0-9Xx]/g, '') : '';
    const title = titleLine.replace(/\s+\.+$/, '').trim();

    const book = books.find(
      (b) =>
        (b.isbn && isbn && (b.isbn.replace(/[^0-9Xx]/g, '') === isbn || b.isbn.replace(/[^0-9Xx]/g, '').endsWith(isbn.slice(-10)))) ||
        b.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(b.title.toLowerCase())
    );
    if (book) map.set(book.id, { description: body });
  }
  return map;
}

// Strip only standalone ecommerce boilerplate lines; preserve all substantive content
const MAX_PARAGRAPH_CHARS = 400;

function toDisplayParagraphs(raw: string): string[] {
  if (!raw || !raw.trim()) return [];

  const boilerplatePatterns = [
    /^Condition is\s*["']?New["']?\.?\s*$/i,
    /^Dispatched with Royal Mail[^.]*\.?\s*$/i,
    /^Recommend use offers\.?\s*$/i,
    /^Any questions[^.]*\.?\s*$/i,
    /^POST FREE[^.]*\.?\s*$/i,
    /^Post Free[^.]*\.?\s*$/i,
  ];

  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const filtered = lines.filter((l) => !boilerplatePatterns.some((p) => p.test(l)));
  const text = filtered.join('\n');

  if (!text.trim()) return [raw.trim()];

  // 1. Split on double newlines (existing behavior)
  let blocks = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  // 2. Split each block on bullet points (· or •) so each bullet becomes its own paragraph
  blocks = blocks.flatMap((block) => {
    const bulletItems = block.split(/(?=[·•])/).map((s) => s.trim()).filter(Boolean);
    return bulletItems.length > 1 ? bulletItems : [block];
  });

  // 3 & 4. For blocks longer than ~400 chars, split on single newlines (merging continuations)
  //        and/or on sentence boundaries
  const result: string[] = [];
  for (const block of blocks) {
    if (block.length <= MAX_PARAGRAPH_CHARS) {
      result.push(block);
      continue;
    }
    // Split on single newlines, then merge continuation lines (e.g. starting with lowercase)
    const blockLines = block.split(/\n/).map((l) => l.trim()).filter(Boolean);
    const merged: string[] = [];
    let current = '';
    for (const line of blockLines) {
      const startsWithLowercase = line.length > 0 && /^[a-z]/.test(line);
      const prevEndsMidSentence = current.length > 0 && !/[.!?]\s*$/.test(current);
      const isContinuation =
        (startsWithLowercase && current.length > 0) ||
        (prevEndsMidSentence && line.length > 0 && /^[a-z"'(\[]/.test(line));
      if (isContinuation && current.length > 0) {
        current += ' ' + line;
      } else {
        if (current) merged.push(current);
        current = line;
      }
    }
    if (current) merged.push(current);

    // For any merged segment still > 400 chars, split on sentence boundaries (~3-4 sentences)
    for (const seg of merged) {
      if (seg.length <= MAX_PARAGRAPH_CHARS) {
        result.push(seg);
        continue;
      }
      const sentences = seg.split(/(?<=[.!?])\s+/).filter(Boolean);
      let chunk = '';
      for (const sent of sentences) {
        const wouldExceed = chunk.length + (chunk ? 1 : 0) + sent.length > MAX_PARAGRAPH_CHARS;
        if (wouldExceed && chunk) {
          result.push(chunk);
          chunk = sent;
        } else {
          chunk += (chunk ? ' ' : '') + sent;
        }
      }
      if (chunk) result.push(chunk);
    }
  }

  return result.length > 0 ? result : [text];
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

  const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();
  const stripBoilerplate = (value: string) =>
    normalizeWhitespace(
      value
        .replace(/Newly Published/gi, '')
        .replace(/Condition is\s*["']?New["']?\.?/gi, '')
        .replace(/Dispatched with Royal Mail[^.]*\.?/gi, '')
        .replace(/Recommend use offers\.?/gi, '')
        .replace(/Any questions[^.]*\.?/gi, '')
        .replace(/POST FREE[^.]*\.?/gi, '')
        .replace(/This is not a compendium of Wikipedia[^.]*\.?/gi, '')
    );

  const toMetaDescription = (raw: string): string => {
    const cleaned = stripBoilerplate(raw);
    if (!cleaned) return '';

    const hardLimit = 158;
    if (cleaned.length <= hardLimit) return cleaned;

    const cut = cleaned.slice(0, hardLimit);
    const lastSpace = cut.lastIndexOf(' ');
    return `${cut.slice(0, lastSpace > 80 ? lastSpace : hardLimit - 1).trim()}…`;
  };

  const buildSeoDescription = (item: Book): string => {
    if (item.seoDescription && item.seoDescription.trim()) {
      const concise = toMetaDescription(item.seoDescription);
      if (concise) return concise;
    }
    const firstSentence = stripBoilerplate((item.description || '').split(/(?<=[.!?])\s+/)[0] || '');
    const summary =
      firstSentence && firstSentence.length >= 24 && firstSentence.length <= 110
        ? firstSentence
        : `${item.category} research by Charles E. MacKay.`;
    const editionBits = [
      item.pageCount ? `${item.pageCount} pages` : '',
      item.publicationYear ? `${item.publicationYear} edition` : '',
      'free worldwide shipping',
    ]
      .filter(Boolean)
      .join(', ');
    const candidate = `${item.title} by Charles E. MacKay. ${summary} ${editionBits}. Secure guest checkout.`;
    const concise = toMetaDescription(candidate);
    if (concise) return concise;
    return `${item.title} by Charles E. MacKay. Academic-grade research with secure guest checkout.`;
  };

  const buildSeoTitle = (item: Book): string => {
    const categoryIntent: Record<string, string> = {
      'WWI Aviation': 'WWI Aviation Book',
      'WWII Aviation': 'WWII Aviation Book',
      'Scottish Aviation History': 'Scottish Aviation History',
      'Helicopter History': 'Helicopter History Book',
      'Naval Aviation': 'Naval Aviation History',
      'Jet Age Aviation': 'Cold War Aviation Book',
      'Aviation Biography': 'Aviation Biography',
      'Military History': 'Military History Book',
      'Industrial History': 'Industrial History Book',
      'Travel Literature': 'Scottish Travel Literature',
    };

    const shortTitle = item.title.split(':')[0].trim();
    const shortBase = `${shortTitle} | ${categoryIntent[item.category] || 'History Book'}`;
    if (shortBase.length <= 68) return shortBase;

    const base = `${item.title} | ${categoryIntent[item.category] || 'History Book'}`;
    if (base.length <= 78) return base;

    return item.title.length <= 62 ? item.title : `${item.title.slice(0, 59).trim()}…`;
  };

  const buildKeywords = (item: Book): string[] => {
    const keywords = new Set<string>([
      item.title,
      item.category,
      `${item.category} books`,
      'Charles E. MacKay',
      'aviation history books',
      'buy aviation books online',
    ]);

    if (item.isbn) keywords.add(`ISBN ${item.isbn}`);
    (item.tags || []).slice(0, 6).forEach((tag) => keywords.add(tag));
    (item.era || []).slice(0, 3).forEach((era) => keywords.add(era));
    (item.geographicFocus || []).slice(0, 2).forEach((geo) => keywords.add(`${geo} history`));

    return Array.from(keywords);
  };

  const seoTitle = buildSeoTitle(book);
  const seoDescription = buildSeoDescription(book);
  const keywords = buildKeywords(book);

  return {
    title: seoTitle,
    description: seoDescription,
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
      title: seoTitle,
      description: seoDescription,
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
      title: seoTitle,
      description: seoDescription,
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

  const gradientClass = 'bg-slate-900';

  // Load description from Bookinfo.txt (source of truth) or fallback to books.ts
  const bookInfoPath = path.join(process.cwd(), 'Bookinfo.txt');
  let fileText = '';
  try {
    fileText = await fs.readFile(bookInfoPath, 'utf8');
  } catch {}

  const primaryById = parseBookinfoById(fileText);
  const legacyById = parseLegacyBookinfo(fileText);

  const fromBookinfo = primaryById.get(book.id) || legacyById.get(book.id)?.description;
  const preferredDescription = fromBookinfo || book.description || '';

  const displayParagraphs = toDisplayParagraphs(preferredDescription);
  const finalParagraphs = displayParagraphs.length > 0 ? displayParagraphs : (book.description ? [book.description] : []);
  const metaDescriptionForSchema = finalParagraphs[0] || book.description || '';

  const purchaseFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${book.title} in stock and ready to order?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: book.inStock
            ? `${book.title} is currently in stock and available for secure guest checkout.`
            : `${book.title} is currently out of stock. You can still contact us for availability updates.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer shipping and returns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. We offer free shipping and a 30-day returns policy. Full details are provided on our returns and support pages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a discount for buying multiple books?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Checkout automatically applies 5% off when you buy 2 books and 10% off when you buy 3 or more books.',
        },
      },
    ],
  };

  return (
    <>
      <UnifiedSchema
        pageType="book-detail"
        pageTitle={`${book.title} | Charles E. MacKay Aviation Books`}
        pageDescription={metaDescriptionForSchema}
        pageUrl={`/books/${book.id}`}
        bookData={{
          id: book.id,
          title: book.title,
          imageUrl: book.imageUrl || `/book-covers/${book.id}.jpg`,
          price: book.price,
          isbn: book.isbn,
          inStock: book.inStock,
          condition: book.condition,
          weight: book.weight || (book as any).weight,
          category: book.category,
          description: book.description,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(purchaseFaqSchema) }}
      />

      <BookAnalyticsClient book={book} />

      <div className="min-h-screen bg-slate-900">
        {/* Hero: cover (clickable), title, buy buttons, author */}
        <div className={`book-page-hero hero-section relative ${gradientClass} text-white py-4 sm:py-6 lg:py-8`}>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <BookCoverBuy book={book} width={240} height={360} />
                <ShareButton
                  url={`https://charlesmackaybooks.com/books/${book.id}`}
                  title={book.title}
                  description={book.description?.substring(0, 150) + '...'}
                  hashtags={['AviationHistory', 'Aviation', 'Books']}
                  className="text-base shrink-0"
                />
              </div>
              <a
                href={`/category/${book.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block text-xs font-semibold text-white/90 hover:text-white mb-1"
              >
                {book.category}
              </a>
              <h1 className="text-[10px] sm:text-xs lg:text-sm font-extrabold mb-1 leading-tight">
                {book.title}
              </h1>
              <p className="text-white/90 text-xs sm:text-sm mb-4">
                By <a href="/about" className="underline font-semibold">Charles E. MacKay</a>
              </p>
              <div className="max-w-md mx-auto">
                <BookDetailClient book={book} />
              </div>

              {/* Description - directly under book */}
              <div className="mt-4 text-left max-w-2xl mx-auto space-y-5">
                <h2 className="text-lg font-semibold text-white">Description</h2>
                <div className="prose prose-invert max-w-none space-y-5">
                  {finalParagraphs.length > 0 ? (
                    finalParagraphs.map((para, idx) => (
                      <p key={idx} className="text-white/90 leading-relaxed">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-white/70">No description available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs and trust badges */}
        <div id="purchase" className={`${gradientClass} text-white pt-6 pb-10 px-4 sm:px-6 scroll-mt-24`}>
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Minimal specs */}
            <div className="flex flex-wrap gap-4 text-sm text-white/80 border-t border-white/15 pt-6">
              {book.isbn && <span>ISBN: {book.isbn}</span>}
              {book.pageCount && <span>{book.pageCount} pages</span>}
              {(book as any).weight && <span>{(book as any).weight}g</span>}
            </div>

            {/* Trust badges + Contact Charles (where share used to be) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div className="border border-white/10 rounded-lg bg-white/5 px-4 py-3 text-sm text-white/80">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center sm:text-left">
                  <div>Free worldwide tracked shipping</div>
                  <div>30-day returns</div>
                  <div>PayPal</div>
                  <div>100% positive feedback</div>
                </div>
                <div className="text-center pt-3 mt-3 border-t border-white/10">
                  <a
                    href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}`}
                    className="text-blue-300 hover:text-blue-200 text-sm font-medium"
                  >
                    Contact Charles for bulk orders
                  </a>
                </div>
              </div>
              <a href="/books" className="text-blue-300 hover:text-white underline text-sm shrink-0">
                ← Browse all books
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
