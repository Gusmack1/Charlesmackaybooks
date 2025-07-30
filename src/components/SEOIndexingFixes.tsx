import { Metadata } from 'next'

interface SEOIndexingFixesProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  isArticle?: boolean
  noIndex?: boolean
}

export function generateSEOMetadata({
  title = 'Charles E. MacKay Aviation Books - Scottish Aviation History Specialist',
  description = 'Published aviation books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.',
  canonicalUrl,
  ogImage = '/charles-mackay-aviation-historian.jpg',
  publishedTime,
  modifiedTime,
  author = 'Charles E. MacKay',
  tags = [],
  isArticle = false,
  noIndex = false
}: SEOIndexingFixesProps): Metadata {
  const baseUrl = 'https://charlesmackaybooks.com'
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      'aviation history books',
      'Scottish aviation heritage',
      'WWI aircraft history',
      'WWII aviation books',
      'military aviation history',
      'Charles E. MacKay books',
      'aviation historian',
      'aircraft development history',
      'Clydeside aviation',
      'Scottish industrial aviation',
      ...tags
    ].join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: 'Charles E. MacKay',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: isArticle ? 'article' : 'website',
      title,
      description,
      url: fullCanonicalUrl,
      siteName: 'Charles E. MacKay Aviation Books',
      locale: 'en_GB',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      ...(isArticle && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author],
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImage],
      creator: '@CharlesMacKayAviation',
      site: '@CharlesMacKayAviation',
    },
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        'en-GB': fullCanonicalUrl,
        'en-US': fullCanonicalUrl,
      },
    },
    verification: {
      google: 'a7ce294f58dd63f7',
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'theme-color': '#2a384a',
    }
  }
}

// Enhanced JSON-LD Schema for better indexing
export function generateJSONLD(props: SEOIndexingFixesProps & { url: string }) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://charlesmackaybooks.com/#website',
        url: 'https://charlesmackaybooks.com',
        name: 'Charles E. MacKay Aviation Books',
        description: 'Published aviation books by renowned historian Charles E. MacKay specializing in Scottish aviation heritage',
        publisher: {
          '@id': 'https://charlesmackaybooks.com/#person'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://charlesmackaybooks.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://charlesmackaybooks.com/#person',
        name: 'Charles E. MacKay',
        description: 'Renowned aviation historian and author specializing in Scottish aviation heritage and military aviation history',
        url: 'https://charlesmackaybooks.com',
        image: 'https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg',
        sameAs: [
          'https://www.ebay.co.uk/usr/chaza87',
          'https://twitter.com/CharlesMacKayAviation',
          'https://linkedin.com/in/charlesmackay'
        ],
        jobTitle: 'Aviation Historian & Author',
        affiliation: {
          '@type': 'Organization',
          name: 'Independent Aviation Historian'
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'University of Glasgow'
        },
        birthPlace: {
          '@type': 'Place',
          name: 'Glasgow, Scotland'
        },
        nationality: 'British',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'charlese1mackay@hotmail.com',
          contactType: 'author',
          areaServed: 'Worldwide'
        }
      },
      {
        '@type': 'WebPage',
        '@id': props.url + '#webpage',
        url: props.url,
        name: props.title,
        description: props.description,
        isPartOf: {
          '@id': 'https://charlesmackaybooks.com/#website'
        },
        about: {
          '@id': 'https://charlesmackaybooks.com/#person'
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: props.ogImage?.startsWith('http') ? props.ogImage : `https://charlesmackaybooks.com${props.ogImage}`,
          width: 1200,
          height: 630
        },
        datePublished: props.publishedTime || new Date().toISOString(),
        dateModified: props.modifiedTime || new Date().toISOString(),
        author: {
          '@id': 'https://charlesmackaybooks.com/#person'
        },
        publisher: {
          '@id': 'https://charlesmackaybooks.com/#person'
        },
        inLanguage: 'en-GB',
        potentialAction: {
          '@type': 'ReadAction',
          target: props.url
        }
      }
    ]
  }

  if (props.isArticle) {
    (baseSchema['@graph'] as any[]).push({
      '@type': 'Article',
      '@id': props.url + '#article',
      headline: props.title || '',
      description: props.description || '',
      url: props.url,
      datePublished: props.publishedTime || new Date().toISOString(),
      dateModified: props.modifiedTime || new Date().toISOString(),
      author: {
        '@id': 'https://charlesmackaybooks.com/#person'
      },
      publisher: {
        '@id': 'https://charlesmackaybooks.com/#person'
      },
      image: props.ogImage?.startsWith('http') ? props.ogImage : `https://charlesmackaybooks.com${props.ogImage}`,
      articleSection: 'Aviation History',
      wordCount: 2000, // Estimated
      keywords: props.tags?.join(', ') || 'aviation history, Scottish aviation',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url
      },
      isPartOf: {
        '@id': 'https://charlesmackaybooks.com/#website'
      }
    })
  }

  return JSON.stringify(baseSchema)
}

// Component for better internal linking
export function InternalLinkingStructure() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
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
              name: 'Aviation Books',
              item: 'https://charlesmackaybooks.com/books'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Aviation Blog',
              item: 'https://charlesmackaybooks.com/blog'
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Research Resources',
              item: 'https://charlesmackaybooks.com/research-guides'
            }
          ]
        })
      }}
    />
  )
}

export default function SEOIndexingFixes() {
  return (
    <>
      <InternalLinkingStructure />
      {/* Additional SEO meta tags in head */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google.com" />
      <link rel="dns-prefetch" href="//search.google.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Enhanced robots meta */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Page speed and crawling hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="origin-when-cross-origin" />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="format-detection" content="telephone=no" />
    </>
  )
}
