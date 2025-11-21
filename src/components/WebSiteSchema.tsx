'use client';

export default function WebSiteSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://charlesmackaybooks.com/#website',
    name: 'Charles E. MacKay Aviation Books',
    alternateName: 'Charles MacKay Aviation History Books',
    description: 'Authoritative aviation history books by expert historian Charles E. MacKay. 19+ books covering Scottish aviation heritage, WWI & WWII aircraft, military aviation, helicopter development, and jet age history.',
    url: 'https://charlesmackaybooks.com',
    inLanguage: 'en-GB',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://charlesmackaybooks.com/#organization'
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://charlesmackaybooks.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'BuyAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://charlesmackaybooks.com/books/{book_id}'
        },
        object: {
          '@type': 'Product',
          name: 'Aviation History Books',
          description: 'Specialized aviation history books by Charles E. MacKay covering Scottish aviation heritage, WWI & WWII aircraft, military aviation, and helicopter development',
          brand: {
            '@type': 'Brand',
            name: 'Charles E. MacKay Aviation Books'
          },
          offers: {
            '@type': 'Offer',
            price: '12.86',
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@type': 'Organization',
              name: 'Charles E. MacKay Aviation Books'
            }
          }
        }
      }
    ],
    mainEntity: {
      '@type': 'ItemList',
      name: 'Aviation History Books Collection',
      description: 'Comprehensive collection of aviation history books covering all aspects of flight development',
      numberOfItems: 19,
      itemListElement: [
        {
          '@type': 'Book',
          position: 1,
          name: 'Beardmore Aviation: The Story of a Scottish Industrial Giant\'s Aviation Activities',
          url: 'https://charlesmackaybooks.com/books/beardmore-aviation'
        },
        {
          '@type': 'Book',
          position: 2,
          name: 'Clydeside Aviation Volume One: The Great War',
          url: 'https://charlesmackaybooks.com/books/clydeside-aviation-vol1'
        },
        {
          '@type': 'Book',
          position: 3,
          name: 'The Sycamore Seeds: The Early History of the Helicopter',
          url: 'https://charlesmackaybooks.com/books/sycamore-seeds'
        }
      ]
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Aviation History',
        description: 'Comprehensive coverage of aviation development from early flight to modern aircraft'
      },
      {
        '@type': 'Thing',
        name: 'Scottish Aviation Heritage',
        description: 'Detailed exploration of Scotland\'s contribution to aviation development'
      },
      {
        '@type': 'Thing',
        name: 'Military Aviation',
        description: 'Expert analysis of military aircraft development and operations'
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: [
        'Aviation Enthusiasts',
        'Academic Researchers',
        'Military Historians',
        'Students',
        'Museums',
        'Libraries',
        'Book Collectors'
      ]
    },
    keywords: [
      'aviation history books',
      'Charles E MacKay',
      'Charles MacKay',
      'Scottish aviation history',
      'WWI aircraft books',
      'WWII aviation history',
      'military aviation books',
      'helicopter development history',
      'jet age aviation',
      'naval aviation books',
      'aviation biography books',
      'Beardmore aviation',
      'Clydeside aviation',
      'test pilot biography',
      'aviation research',
      'academic aviation books'
    ].join(', '),
    sameAs: [
      'https://charlesmackaybooks.com',
      'https://www.ebay.co.uk/usr/chaza87'
    ],
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': 'https://charlesmackaybooks.com/books',
        name: 'Aviation History Books',
        description: 'Complete collection of aviation history books'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://charlesmackaybooks.com/blog',
        name: 'Aviation History Blog',
        description: 'Expert insights on aviation history and aircraft development'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://charlesmackaybooks.com/about',
        name: 'About Charles E. MacKay',
        description: 'Biography of aviation historian Charles E. MacKay'
      }
    ],
    copyrightHolder: {
      '@type': 'Person',
      name: 'Charles E. MacKay'
    },
    copyrightYear: '2024',
    license: 'https://charlesmackaybooks.com/terms',
    accessibilityAPI: ['ARIA'],
    accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
    accessibilityFeature: ['alternativeText', 'readingOrder', 'structuralNavigation'],
    accessibilityHazard: 'none',
    accessibilitySummary: 'This website is designed to be accessible to users with disabilities'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: 'Blog',
        item: 'https://charlesmackaybooks.com/blog'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
