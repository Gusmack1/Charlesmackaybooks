'use client';

import { Book } from '@/types/book';
import { getValidISBN, getValidGTIN13, getValidSKU } from '@/utils/isbn';

interface EnhancedBookSEOProps {
  book: Book;
  relatedBlogPosts?: Array<{ slug: string; title: string; excerpt: string }>;
}

/**
 * Enhanced SEO component for books with AI/GEO optimization
 * Includes FAQ schema, review schema, and enhanced metadata for AI search engines
 */
export default function EnhancedBookSEO({ book, relatedBlogPosts = [] }: EnhancedBookSEOProps) {
  const validISBN = getValidISBN(book.isbn);
  const validGTIN13 = getValidGTIN13(book.isbn);
  const validSKU = getValidSKU(book.isbn, book.id);
  const baseUrl = 'https://charlesmackaybooks.com';

  // Generate FAQ schema based on book content
  const generateFAQSchema = () => {
    const faqs = [];
    
    // What is this book about?
    faqs.push({
      '@type': 'Question',
      name: `What is ${book.title} about?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: book.description.substring(0, 300) + (book.description.length > 300 ? '...' : '')
      }
    });

    // Who wrote this book?
    faqs.push({
      '@type': 'Question',
      name: `Who wrote ${book.title}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${book.title} was written by Charles E. MacKay, a renowned aviation historian specializing in Scottish and British aviation heritage, WWI/WWII aircraft, helicopter development, and military aviation.`
      }
    });

    // What is the ISBN?
    if (validISBN) {
      faqs.push({
        '@type': 'Question',
        name: `What is the ISBN for ${book.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ISBN for ${book.title} is ${validISBN}.`
        }
      });
    }

    // Where can I buy this book?
    faqs.push({
      '@type': 'Question',
      name: `Where can I buy ${book.title}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${book.title} is available for purchase at charlesmackaybooks.com for £${book.price} with worldwide shipping. The book is also available on eBay from seller chaza87.`
      }
    });

    // What category is this book?
    faqs.push({
      '@type': 'Question',
      name: `What category is ${book.title}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${book.title} is classified as ${book.category}.`
      }
    });

    // What era does this book cover?
    if (book.era && book.era.length > 0) {
      faqs.push({
        '@type': 'Question',
        name: `What historical era does ${book.title} cover?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${book.title} covers ${book.era.join(', ')}.`
        }
      });
    }

    return {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/books/${book.id}#faq`,
      mainEntity: faqs
    };
  };


  // Enhanced Book schema with AI-friendly metadata
  const enhancedBookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${baseUrl}/books/${book.id}#book`,
    name: book.title,
    alternateName: [
      book.title,
      `${book.title} by Charles E. MacKay`,
      `${book.title} - ${book.category}`
    ],
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/about#author`,
      name: 'Charles E. MacKay',
      jobTitle: 'Aviation Historian',
      description: 'Expert aviation historian specializing in Scottish and British aviation heritage, WWI/WWII aircraft, helicopter development, and military aviation',
      url: `${baseUrl}/about`,
      sameAs: [
        'https://www.imperialwarmuseum.org/',
        'https://www.rafmuseum.org.uk/',
        'https://www.ebay.co.uk/usr/chaza87'
      ],
      // Enhanced for AI recognition
      knowsAbout: [
        'Scottish Aviation History',
        'WWI Aviation',
        'WWII Aviation',
        'Helicopter Development',
        'Jet Age Aviation',
        'Naval Aviation',
        'Military Aviation',
        'Aircraft Development',
        book.category,
        ...(book.researchThemes || [])
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Aviation Historian',
        occupationLocation: {
          '@type': 'Country',
          name: 'Scotland'
        }
      }
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#publisher`,
      name: 'Charles E. MacKay Publishing',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Glasgow',
        addressCountry: 'Scotland',
        addressRegion: 'Scotland'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'charlese1mackay@hotmail.com',
        contactType: 'customer service'
      }
    },
    ...(validISBN && { isbn: validISBN }),
    numberOfPages: book.pageCount,
    bookFormat: book.condition === 'New' ? 'Paperback' : 'UsedBook',
    bookEdition: '1st Edition',
    inLanguage: 'en-GB',
    datePublished: book.publicationYear?.toString() || '2023',
    copyrightYear: book.publicationYear?.toString() || '2023',
    description: book.description,
    abstract: book.description.substring(0, 200) + '...',
    genre: ['Aviation History', 'Military History', book.category],
    about: [
      {
        '@type': 'Thing',
        name: book.category,
        description: `Comprehensive coverage of ${book.category.toLowerCase()}`
      },
      ...(book.researchThemes || []).map(theme => ({
        '@type': 'Thing',
        name: theme,
        description: `Expert analysis of ${theme.toLowerCase()}`
      }))
    ],
    keywords: [
      book.title,
      'Charles E MacKay',
      'Charles MacKay',
      'aviation history',
      book.category,
      ...(book.tags || []),
      ...(book.researchThemes || []),
      'aviation books',
      'military aviation',
      'aircraft history',
      'buy aviation books',
      'aviation history books online',
      `ISBN ${validISBN || book.isbn}`
    ].filter(Boolean).join(', '),
    image: {
      '@type': 'ImageObject',
      url: (book.imageUrl && book.imageUrl.startsWith('http'))
        ? book.imageUrl
        : `${baseUrl}${(book.imageUrl || `/book-covers/${book.id}.jpg`).startsWith('/') ? '' : '/'}${book.imageUrl || `book-covers/${book.id}.jpg`}`,
      width: 400,
      height: 600,
      caption: `${book.title} by Charles E. MacKay - Aviation History Book Cover`
    },
    contentLocation: book.geographicFocus ? book.geographicFocus.map(location => ({
      '@type': 'Place',
      name: location
    })) : undefined,
    temporalCoverage: book.era ? book.era.join(', ') : undefined,
    educationalLevel: book.academicLevel ? book.academicLevel.join(', ') : undefined,
    learningResourceType: book.academicLevel ? 'Reference Material' : undefined,
    // Enhanced for AI: citation and academic value
    citation: book.citationCount ? {
      '@type': 'CreativeWork',
      name: `Academic Citations: ${book.citationCount}`,
      description: 'Number of times this work has been cited in academic research'
    } : undefined,
    // Enhanced for AI: related works
    ...(relatedBlogPosts.length > 0 && {
      relatedLink: relatedBlogPosts.map(post => ({
        '@type': 'Article',
        '@id': `${baseUrl}/blog/${post.slug}#article`,
        headline: post.title,
        url: `${baseUrl}/blog/${post.slug}`
      }))
    }),
    // Note: aggregateRating is only in Product schema below to avoid duplicate aggregate ratings
    offers: {
      '@type': 'Offer',
      '@id': `${baseUrl}/books/${book.id}#offer`,
      price: book.price.toString(),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: book.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      url: `${baseUrl}/books/${book.id}`,
      seller: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#publisher`
      },
      priceValidUntil: '2026-12-31',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: book.inStock ? 1 : 0
      }
    }
  };

  // Product schema for e-commerce
  // IMPORTANT: Only ONE Product schema per page with aggregateRating to avoid Google errors
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/books/${book.id}#product`,
    name: book.title,
    description: ((book.description || '').length >= 50 && (book.description || '').length <= 5000)
      ? book.description
      : ((book.description || book.title || 'Aviation history book by Charles E. MacKay. Expert research on Scottish aviation, WWI & WWII aircraft, helicopter development, and military aviation history. Essential reference material for historians and researchers.').slice(0, 5000)),
    image: (book.imageUrl && book.imageUrl.startsWith('http'))
      ? book.imageUrl
      : `${baseUrl}${(book.imageUrl || `/book-covers/${book.id}.jpg`).startsWith('/') ? '' : '/'}${book.imageUrl || `book-covers/${book.id}.jpg`}`,
    sku: validSKU,
    ...(validISBN && { isbn: validISBN }),
    ...(validGTIN13 && { gtin13: validGTIN13 }),
    brand: {
      '@type': 'Brand',
      name: 'Charles E. MacKay'
    },
    category: book.category,
    offers: {
      '@type': 'Offer',
      price: book.price.toString(),
      priceCurrency: 'GBP',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${baseUrl}/books/${book.id}`,
      seller: {
        '@type': 'Organization',
        name: 'Charles E. MacKay Publishing'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'GBP'
        },
        shippingDestination: [
          { '@type': 'DefinedRegion', addressCountry: 'GB' },
          { '@type': 'DefinedRegion', addressCountry: 'EU' },
          { '@type': 'DefinedRegion', addressCountry: 'US' }
        ],
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
        returnPolicyUrl: `${baseUrl}/returns`
      }
    }
  };

  // Breadcrumb schema for better navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}/books/${book.id}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Books',
        item: `${baseUrl}/books`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: book.category,
        item: `${baseUrl}/books?category=${encodeURIComponent(book.category)}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: book.title,
        item: `${baseUrl}/books/${book.id}`
      }
    ]
  };




  return (
    <>
      {/* Enhanced Book Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedBookSchema)
        }}
      />
      
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema())
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      
    </>
  );
}

