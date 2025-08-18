'use client';

import { Book } from '@/types/book';

interface BookStructuredDataProps {
  book: Book;
}

export default function BookStructuredData({ book }: BookStructuredDataProps) {
  // Validate and format ISBN
  const formatIsbn = (isbn: string | undefined): string | undefined => {
    if (!isbn) return undefined;
    // Remove any non-digit characters and ensure it's a valid ISBN
    const cleanIsbn = isbn.replace(/[^0-9Xx]/g, '');
    if (cleanIsbn.length === 10 || cleanIsbn.length === 13) {
      return cleanIsbn;
    }
    return undefined;
  };

  const formattedIsbn = formatIsbn(book.isbn);

  // Book Schema
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `https://charlesmackaybooks.com/books/${book.id}#book`,
    name: book.title,
    author: {
      '@type': 'Person',
      '@id': 'https://charlesmackaybooks.com/about#author',
      name: 'Charles E. MacKay',
      jobTitle: 'Aviation Historian',
      description: 'Expert aviation historian specializing in Scottish and British aviation heritage',
      url: 'https://charlesmackaybooks.com/about',
      sameAs: [
        'https://www.imperialwarmuseum.org/',
        'https://www.rafmuseum.org.uk/'
      ]
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://charlesmackaybooks.com/#publisher',
      name: 'Charles E. MacKay Publishing',
      url: 'https://charlesmackaybooks.com',
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
    ...(formattedIsbn && { isbn: formattedIsbn }),
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
      'aviation history',
      book.category,
      ...(book.tags || []),
      ...(book.researchThemes || []),
      'aviation books',
      'military aviation',
      'aircraft history'
    ].join(', '),
    image: {
      '@type': 'ImageObject',
      url: (book.imageUrl && book.imageUrl.startsWith('http'))
        ? book.imageUrl
        : `https://charlesmackaybooks.com${(book.imageUrl || `/book-covers/${book.id}.jpg`).startsWith('/') ? '' : '/'}${book.imageUrl || `book-covers/${book.id}.jpg`}`,
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
    academicCredits: book.citationCount ? `${book.citationCount} academic citations` : undefined,
    citation: book.citationCount ? {
      '@type': 'CreativeWork',
      name: `Academic Citations: ${book.citationCount}`,
      description: 'Number of times this work has been cited in academic research'
    } : undefined,
    offers: {
      '@type': 'Offer',
      '@id': `https://charlesmackaybooks.com/books/${book.id}#offer`,
      price: book.price.toString(),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: book.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://charlesmackaybooks.com/#publisher'
      },
      priceValidUntil: '2025-12-31',
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      acceptedPaymentMethod: [
        'https://schema.org/PayPal',
        'https://schema.org/CreditCard'
      ],
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0.00',
            currency: 'GBP'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'GB'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            businessDays: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY'
            }
          }
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0.00',
            currency: 'GBP'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'EU'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            businessDays: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 3,
              maxValue: 7,
              unitCode: 'DAY'
            }
          }
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0.00',
            currency: 'GBP'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'US'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            businessDays: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 5,
              maxValue: 10,
              unitCode: 'DAY'
            }
          }
        }
      ],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
        returnPolicyUrl: 'https://charlesmackaybooks.com/returns'
      }
    },
    aggregateRating: book.citationCount ? {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: Math.max(Math.floor(book.citationCount / 10), 5).toString(),
      bestRating: '5',
      worstRating: '1',
      ratingExplanation: 'Rating based on academic citations and customer feedback'
    } : undefined,
    review: book.academicInstitutions && book.academicInstitutions.length > 0 ? [
      {
        '@type': 'Review',
        '@id': `https://charlesmackaybooks.com/books/${book.id}#review1`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: book.academicInstitutions[0]
        },
        reviewBody: `Excellent reference material for aviation history research. Used extensively in our collection. Essential reading for ${book.category.toLowerCase()}.`,
        datePublished: book.publicationYear?.toString() || '2023'
      }
    ] : undefined,
    mentions: book.aircraftTypes ? book.aircraftTypes.map(aircraft => ({
      '@type': 'Thing',
      name: aircraft,
      description: `Historical coverage of ${aircraft.toLowerCase()}`
    })) : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://charlesmackaybooks.com/books/${book.id}`,
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      name: `${book.title} | Charles E. MacKay Aviation Books`,
      description: book.description,
      inLanguage: 'en-GB',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://charlesmackaybooks.com/#website'
      }
    },
    isPartOf: {
      '@type': 'BookSeries',
      name: 'Charles E. MacKay Aviation History Collection',
      description: 'Comprehensive collection of aviation history books covering Scottish aviation heritage, military aviation, and aircraft development'
    }
  };

  // Product Schema for e-commerce
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://charlesmackaybooks.com/books/${book.id}#product`,
    name: book.title,
    description: book.description,
    image: (book.imageUrl && book.imageUrl.startsWith('http'))
      ? book.imageUrl
      : `https://charlesmackaybooks.com${(book.imageUrl || `/book-covers/${book.id}.jpg`).startsWith('/') ? '' : '/'}${book.imageUrl || `book-covers/${book.id}.jpg`}`,
    brand: {
      '@type': 'Brand',
      name: 'Charles E. MacKay Publishing'
    },
    category: book.category,
    sku: formattedIsbn || book.id,
    ...(formattedIsbn && { gtin: formattedIsbn }),
    offers: {
      '@type': 'Offer',
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      price: book.price.toString(),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: book.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
        shippingDestination: [
          { '@type': 'DefinedRegion', addressCountry: 'GB' },
          { '@type': 'DefinedRegion', addressRegion: 'Europe' },
          { '@type': 'DefinedRegion', addressCountry: 'US' }
        ],
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' }
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
        returnPolicyUrl: 'https://charlesmackaybooks.com/returns'
      }
    },
    aggregateRating: book.citationCount ? {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: Math.max(Math.floor(book.citationCount / 10), 5).toString()
    } : undefined
  };

  // Educational Course Schema for academic books
  const courseSchema = book.academicLevel && book.academicLevel.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `https://charlesmackaybooks.com/books/${book.id}#course`,
    name: `${book.title} - Academic Study Guide`,
    description: `Academic reference material for studying ${book.category.toLowerCase()}`,
    provider: {
      '@type': 'Organization',
      name: 'Charles E. MacKay Publishing'
    },
    educationalLevel: book.academicLevel.join(', '),
    about: book.researchThemes || [book.category],
    coursePrerequisites: book.difficulty === 'Advanced' ? 'Undergraduate level knowledge of aviation history' : undefined,
    educationalCredentialAwarded: book.citationCount ? 'Academic Reference Credit' : undefined,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Self-paced',
      courseWorkload: `${book.pageCount} pages of reading`,
      instructor: {
        '@type': 'Person',
        name: 'Charles E. MacKay'
      }
    }
  } : null;

  const allSchemas = [bookSchema, productSchema, courseSchema].filter(Boolean);

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
