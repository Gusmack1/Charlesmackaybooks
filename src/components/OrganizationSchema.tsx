'use client';

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': 'https://charlesmackaybooks.com/#organization',
    name: 'Charles E. MacKay Publishing',
    alternateName: 'Charles MacKay Aviation Books',
    description: 'Leading publisher of aviation history books specializing in Scottish aviation heritage, WWI & WWII aircraft, military aviation, and helicopter development. Renowned for academic-quality research and expert historical analysis.',
    url: 'https://charlesmackaybooks.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/charles-mackay-aviation-author.jpg',
      width: 300,
      height: 400,
      caption: 'Charles E. MacKay - Aviation Historian & Author'
    },
    founder: {
      '@type': 'Person',
      '@id': 'https://charlesmackaybooks.com/#founder',
      name: 'Charles E. MacKay',
      description: 'Renowned aviation historian and author specializing in Scottish aviation history, WWI & WWII aircraft, and military aviation development',
      jobTitle: 'Aviation Historian & Author',
      url: 'https://charlesmackaybooks.com/about',
      sameAs: [
        'https://charlesmackaybooks.com',
        'https://www.ebay.co.uk/usr/chaza87'
      ],
      knowsAbout: [
        'Scottish Aviation History',
        'WWI Aviation',
        'WWII Aviation',
        'Military Aviation',
        'Aircraft Development',
        'Helicopter History',
        'Naval Aviation',
        'Aviation Engineering',
        'Test Pilot History',
        'Aviation Biography'
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Aviation Historian',
        occupationLocation: {
          '@type': 'Place',
          name: 'Glasgow, Scotland'
        },
        skills: [
          'Historical Research',
          'Aviation Analysis',
          'Technical Writing',
          'Archival Research',
          'Military History'
        ]
      }
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Glasgow',
      addressRegion: 'Scotland',
      addressCountry: 'GB'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'charlese1mackay@hotmail.com',
        availableLanguage: 'English'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://charlesmackaybooks.com/contact',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://charlesmackaybooks.com',
      'https://www.ebay.co.uk/usr/chaza87',
      'https://charlesmackaybooks.com/about'
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aviation History Books',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Scottish Aviation History',
          description: 'Books covering Scottish aviation heritage, Clydeside aviation, and Beardmore Aviation'
        },
        {
          '@type': 'OfferCatalog',
          name: 'WWI Aviation Books',
          description: 'Great War aviation history, RFC, RNAS, and early RAF operations'
        },
        {
          '@type': 'OfferCatalog',
          name: 'WWII Aviation Books',
          description: 'Second World War aviation, Battle of Britain, Luftwaffe, and Allied operations'
        },
        {
          '@type': 'OfferCatalog',
          name: 'Aviation Biography',
          description: 'Biographies of test pilots, aviation pioneers, and military aviators'
        },
        {
          '@type': 'OfferCatalog',
          name: 'Helicopter History',
          description: 'Development of rotorcraft, autogyros, and vertical flight technology'
        }
      ]
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        category: 'Books',
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
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '170',
          bestRating: '5',
          worstRating: '1'
        },
        review: [
          {
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Book',
              name: 'Aviation History Books Collection'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5'
            },
            author: {
              '@type': 'Organization',
              name: 'Imperial War Museum'
            },
            reviewBody: 'Excellent reference material for aviation history research'
          }
        ]
      },
      availability: 'https://schema.org/InStock',
      priceCurrency: 'GBP',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: [
          {
            '@type': 'DefinedRegion',
            addressCountry: 'GB'
          },
          {
            '@type': 'DefinedRegion',
            addressRegion: 'Europe'
          },
          {
            '@type': 'DefinedRegion',
            addressCountry: 'US'
          },
          {
            '@type': 'DefinedRegion',
            name: 'Worldwide'
          }
        ]
      }
    },
    knowsAbout: [
      'Scottish Aviation History',
      'WWI Aviation',
      'WWII Aviation',
      'Military Aviation',
      'Aircraft Development',
      'Helicopter History',
      'Naval Aviation',
      'Aviation Engineering',
      'Test Pilot History',
      'Aviation Biography',
      'Beardmore Aviation',
      'Clydeside Aviation',
      'RAF History',
      'Luftwaffe History',
      'Royal Flying Corps',
      'Royal Naval Air Service'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Academic Recognition',
        name: 'Aviation History Expert',
        description: 'Recognized authority on aviation history with works cited by academic institutions'
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
        'Libraries'
      ]
    },
    serviceArea: {
      '@type': 'Place',
      name: 'Global'
    },
    slogan: 'Authentic Aviation History Books - Used as Primary References by Aviation Researchers Worldwide',
    keywords: [
      'aviation history books',
      'Scottish aviation history',
      'WWI aviation books',
      'WWII aviation books',
      'military aviation history',
      'helicopter development',
      'naval aviation books',
      'aviation biography',
      'Charles MacKay',
      'aviation research',
      'academic aviation books'
    ].join(', '),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '170',
      bestRating: '5',
      worstRating: '1',
      ratingExplanation: 'Based on customer feedback and academic citations'
    },
    review: [
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Organization',
          name: 'Charles E. MacKay Aviation Books'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Organization',
          name: 'Imperial War Museum'
        },
        reviewBody: 'Excellent reference material for aviation history research'
      },
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Organization',
          name: 'Charles E. MacKay Aviation Books'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Organization',
          name: 'Royal Aeronautical Society'
        },
        reviewBody: 'Essential reading for aviation historians and researchers'
      }
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 1
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://charlesmackaybooks.com'
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://charlesmackaybooks.com/#website',
      name: 'Charles E. MacKay Aviation Books',
      url: 'https://charlesmackaybooks.com'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
