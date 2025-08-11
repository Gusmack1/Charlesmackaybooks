import type { Metadata } from 'next'

interface ServerSideMetaTagsProps {
  pageUrl: string
  pageTitle: string
  pageDescription: string
  ogImage?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  isArticle?: boolean
  author?: string
  siteName?: string
}

/**
 * Server-side SEO component that generates comprehensive meta tags and structured data
 * This replaces the problematic client-side SEOIndexingFix component
 */
export function generateServerSideMetadata(props: ServerSideMetaTagsProps): Metadata {
  const baseUrl = 'https://charlesmackaybooks.com'
  const canonicalUrl = props.pageUrl.startsWith('http') ? props.pageUrl : `${baseUrl}${props.pageUrl}`
  const imageUrl = props.ogImage?.startsWith('http') ? props.ogImage : `${baseUrl}${props.ogImage || '/charles-mackay-aviation-historian.jpg'}`

  return {
    title: props.pageTitle,
    description: props.pageDescription,
    keywords: props.tags?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-GB': canonicalUrl,
        'en-US': canonicalUrl,
        'en': canonicalUrl,
      }
    },
    openGraph: {
      type: props.isArticle ? 'article' : 'website',
      title: props.pageTitle,
      description: props.pageDescription,
      url: canonicalUrl,
      siteName: props.siteName || 'Charles E. MacKay - Aviation Historian',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: props.pageTitle,
        }
      ],
      locale: 'en_GB',
      ...(props.isArticle && {
        publishedTime: props.publishedTime,
        modifiedTime: props.modifiedTime || props.publishedTime,
        tags: props.tags,
        authors: [props.author || 'Charles E. MacKay'],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: props.pageTitle,
      description: props.pageDescription,
      images: [imageUrl],
      creator: '@CharlesMacKayAviation',
    },
    verification: {
      google: 'a7ce294f58dd63f7',
    },
  }
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateJSONLD(props: ServerSideMetaTagsProps & {
  type?: 'Article' | 'Book' | 'WebPage'
  isbn?: string
  pageCount?: number
  publicationYear?: string
  category?: string
}) {
  const baseUrl = 'https://charlesmackaybooks.com'
  const canonicalUrl = props.pageUrl.startsWith('http') ? props.pageUrl : `${baseUrl}${props.pageUrl}`

  const toAbsolute = (img?: string) => {
    if (!img) return `${baseUrl}/charles-mackay-aviation-historian.jpg`;
    return img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': props.type || 'WebPage',
    name: props.pageTitle,
    description: props.pageDescription,
    url: canonicalUrl,
    image: toAbsolute(props.ogImage || '/charles-mackay-aviation-historian.jpg'),
    author: {
      '@type': 'Person',
      name: props.author || 'Charles E. MacKay',
      description: 'Aviation historian specializing in Scottish aviation heritage and military aviation history',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Charles E. MacKay',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  // Add Article-specific properties
  if (props.type === 'Article' && props.isArticle) {
    return {
      ...baseSchema,
      '@type': 'Article',
      headline: props.pageTitle,
      datePublished: props.publishedTime,
      dateModified: props.modifiedTime || props.publishedTime,
      keywords: props.tags?.join(', '),
      articleSection: 'Aviation History',
    }
  }

  // Add Book-specific properties
  if (props.type === 'Book') {
    return {
      ...baseSchema,
      '@type': 'Book',
      isbn: props.isbn,
      numberOfPages: props.pageCount,
      datePublished: props.publicationYear,
      genre: props.category || 'Aviation History',
      about: props.tags,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Person',
          name: 'Charles E. MacKay'
        }
      }
    }
  }

  return baseSchema
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbJSONLD(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `https://charlesmackaybooks.com${crumb.url}`
    }))
  }
}

/**
 * Server component that renders JSON-LD structured data
 */
export function StructuredData({ jsonLd }: { jsonLd: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
