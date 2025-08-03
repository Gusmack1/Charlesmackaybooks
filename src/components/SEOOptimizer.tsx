'use client'

import { useEffect } from 'react'
import Head from 'next/head'

interface SEOOptimizerProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'book' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  bookData?: {
    isbn?: string
    price?: number
    currency?: string
    availability?: string
    author?: string
    publisher?: string
    publishDate?: string
    pageCount?: number
    language?: string
  }
}

export default function SEOOptimizer({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  author = 'Charles E. MacKay',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  bookData
}: SEOOptimizerProps) {
  const fullUrl = url ? `https://charlesmackaybooks.com${url}` : 'https://charlesmackaybooks.com'
  const fullImageUrl = image.startsWith('http') ? image : `https://charlesmackaybooks.com${image}`

  // Generate structured data based on content type
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'book' ? 'Book' : type === 'article' ? 'Article' : 'WebPage',
      name: title,
      description: description,
      url: fullUrl,
      author: {
        '@type': 'Person',
        name: author,
        jobTitle: 'Aviation Historian and Author'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Charles Mackay Books',
        url: 'https://charlesmackaybooks.com'
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      image: fullImageUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      }
    }

    if (type === 'book' && bookData) {
      return {
        ...baseData,
        '@type': 'Book',
        isbn: bookData.isbn,
        bookFormat: 'Hardcover',
        numberOfPages: bookData.pageCount,
        inLanguage: bookData.language || 'en-GB',
        publisher: {
          '@type': 'Organization',
          name: bookData.publisher || 'Charles Mackay Books',
          url: 'https://charlesmackaybooks.com'
        },
        offers: {
          '@type': 'Offer',
          price: bookData.price,
          priceCurrency: bookData.currency || 'GBP',
          availability: bookData.availability || 'https://schema.org/InStock',
          url: fullUrl,
          seller: {
            '@type': 'Organization',
            name: 'Charles Mackay Books',
            url: 'https://charlesmackaybooks.com'
          }
        }
      }
    }

    if (type === 'article') {
      return {
        ...baseData,
        '@type': 'Article',
        articleSection: section,
        keywords: [...keywords, ...tags].join(', '),
        wordCount: description.length,
        timeRequired: 'PT5M'
      }
    }

    return baseData
  }

  // Breadcrumb structured data
  const generateBreadcrumbData = () => {
    if (!url) return null

    const pathSegments = url.split('/').filter(Boolean)
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://charlesmackaybooks.com'
      }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2,
        name: name,
        item: `https://charlesmackaybooks.com${currentPath}`
      })
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    }
  }

  useEffect(() => {
    // Add page to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: title,
        page_location: fullUrl,
        page_path: url || '/'
      })
    }
  }, [title, fullUrl, url])

  const structuredData = generateStructuredData()
  const breadcrumbData = generateBreadcrumbData()

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={[...keywords, 'aviation history', 'Charles E. MacKay', 'aviation books'].join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Charles Mackay Books" />
      <meta property="og:locale" content="en_GB" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta property="twitter:creator" content="@charlesmackaybooks" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Charles Mackay Books" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      )}
      
      {/* Performance optimizations */}
      <link rel="preload" href={fullImageUrl} as="image" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    </Head>
  )
} 