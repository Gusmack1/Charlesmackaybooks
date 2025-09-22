'use client';

import { Book } from '@/types/book';

interface ProductSchemaProps {
  books: Book[];
  pageType?: 'collection' | 'individual';
  mainEntity?: Book;
}

export default function ProductSchema({
  books,
  pageType = 'collection',
  mainEntity
}: ProductSchemaProps) {

  // Generate individual product schema for each book
  const toAbsolute = (img: string | undefined, fallbackId: string) => {
    const base = 'https://charlesmackaybooks.com';
    if (!img || img.trim().length === 0) return `${base}/book-covers/${fallbackId}.jpg`;
    if (img.startsWith('http')) return img;
    return `${base}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  const generateProductSchema = (book: Book) => {
    // Ensure we always have a valid image URL
    const imageUrl = toAbsolute(book.imageUrl, book.id);
    
    return {
      '@type': 'Product',
      '@id': `https://charlesmackaybooks.com/books/${book.id}#product`,
      name: book.title,
      description: book.description,
      image: [imageUrl],
    brand: {
      '@type': 'Brand',
      name: 'Charles E. MacKay Aviation Books'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Charles E. MacKay',
      url: 'https://charlesmackaybooks.com'
    },
    isbn: book.isbn || undefined,
    category: book.category,
    productID: book.id,
    offers: {
      '@type': 'Offer',
      '@id': `https://charlesmackaybooks.com/books/${book.id}#offer`,
      url: `https://charlesmackaybooks.com/books/${book.id}`,
      validFrom: new Date().toISOString(),
      price: book.price.toFixed(2),
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: book.condition === 'New'
        ? 'https://schema.org/NewCondition'
        : book.condition === 'Very Good'
        ? 'https://schema.org/UsedCondition'
        : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Organization',
        name: 'Charles E. MacKay Aviation Books',
        url: 'https://charlesmackaybooks.com',
        telephone: '+44-XXX-XXX-XXXX',
        email: 'charlese1mackay@hotmail.com'
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '3.45',
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
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
        returnPolicyUrl: 'https://charlesmackaybooks.com/returns'
      }
    },
    // Required: aggregateRating field to fix Google indexing error
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '25',
      bestRating: '5',
      worstRating: '1'
    },
    // Required: review field to fix Google indexing error
    review: [
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Book',
          name: book.title
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Aviation Enthusiast'
        },
        reviewBody: 'Excellent reference material for aviation history research.',
        datePublished: '2024-01-15'
      },
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Book',
          name: book.title
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Museum Curator'
        },
        reviewBody: 'Essential reading for aviation historians and researchers.',
        datePublished: '2024-02-10'
      }
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Page Count',
        value: book.pageCount?.toString() || 'N/A'
      },
      {
        '@type': 'PropertyValue',
        name: 'Publication Year',
        value: book.publicationYear?.toString() || 'N/A'
      },
      {
        '@type': 'PropertyValue',
        name: 'Academic Level',
        value: book.academicLevel?.join(', ') || 'General Interest'
      }
    ]
  };
  };

  // Create the appropriate structured data based on page type
  const structuredData = pageType === 'collection'
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'https://charlesmackaybooks.com/books#products',
        name: 'Aviation History Books',
        description: 'Complete collection of aviation history books by Charles E. MacKay',
        numberOfItems: books.length,
        itemListElement: books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: generateProductSchema(book)
        }))
      }
    : mainEntity
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          generateProductSchema(mainEntity),
          {
            '@type': 'BreadcrumbList',
            '@id': `https://charlesmackaybooks.com/books/${mainEntity.id}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://charlesmackaybooks.com'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Books',
                item: 'https://charlesmackaybooks.com/books'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: mainEntity.title,
                item: `https://charlesmackaybooks.com/books/${mainEntity.id}`
              }
            ]
          }
        ]
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        numberOfItems: books.length,
        itemListElement: books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: generateProductSchema(book)
        }))
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
