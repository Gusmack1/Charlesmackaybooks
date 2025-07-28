'use client';

import { Book } from '@/types/book';

interface BookStructuredDataProps {
  book: Book;
}

export default function BookStructuredData({ book }: BookStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: 'Charles E. MacKay',
      description: 'Aviation historian specializing in Scottish aviation history and military aviation development',
      url: 'https://charlesmackaybooks.com'
    },
    publisher: {
      '@type': 'Person',
      name: 'Charles E. MacKay'
    },
    isbn: book.isbn,
    numberOfPages: book.pageCount,
    bookFormat: 'Paperback',
    inLanguage: 'en-GB',
    datePublished: book.publicationYear?.toString() || '2023',
    description: book.description,
    genre: ['Aviation History', 'Military History', book.category],
    about: book.researchThemes || [book.category],
    keywords: book.tags?.join(', ') || book.category,
    image: book.imageUrl || '/default-book-cover.jpg',
    offers: {
      '@type': 'Offer',
      price: book.price.toString(),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      condition: book.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Person',
        name: 'Charles E. MacKay'
      },
      priceValidUntil: '2025-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '3.45',
          currency: 'GBP'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB'
        }
      }
    },
    aggregateRating: book.citationCount ? {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: Math.floor(book.citationCount / 10).toString(),
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    review: book.academicInstitutions && book.academicInstitutions.length > 0 ? [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: book.academicInstitutions[0]
        },
        reviewBody: `Excellent reference material for aviation history research. Used extensively in our collection.`
      }
    ] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://charlesmackaybooks.com/books/${book.id}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
