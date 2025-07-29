'use client'

import { useEffect } from 'react'

interface SEOIndexingFixProps {
  pageUrl: string
  pageTitle: string
  pageDescription?: string
}

export default function SEOIndexingFix({ pageUrl, pageTitle, pageDescription }: SEOIndexingFixProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Fix 1: Ensure proper canonical URLs
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute('href', pageUrl)
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = pageUrl
      document.head.appendChild(canonical)
    }

    // Fix 2: Add hreflang for international targeting
    const existingHreflang = document.querySelectorAll('link[hreflang]')
    existingHreflang.forEach(el => el.remove())

    const hreflangTags = [
      { lang: 'en-GB', url: pageUrl },
      { lang: 'en-US', url: pageUrl },
      { lang: 'en', url: pageUrl },
      { lang: 'x-default', url: pageUrl }
    ]

    hreflangTags.forEach(({ lang, url }) => {
      const hreflang = document.createElement('link')
      hreflang.rel = 'alternate'
      hreflang.setAttribute('hreflang', lang)
      hreflang.href = url
      document.head.appendChild(hreflang)
    })

    // Fix 3: Ensure proper robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta') as HTMLMetaElement
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Fix 4: Add specific googlebot meta
    let googlebotMeta = document.querySelector('meta[name="googlebot"]') as HTMLMetaElement
    if (!googlebotMeta) {
      googlebotMeta = document.createElement('meta') as HTMLMetaElement
      googlebotMeta.setAttribute('name', 'googlebot')
      document.head.appendChild(googlebotMeta)
    }
    googlebotMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Fix 5: Add viewport meta if missing
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta') as HTMLMetaElement
      viewportMeta.setAttribute('name', 'viewport')
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1')
      document.head.appendChild(viewportMeta)
    }

    // Fix 6: Ping search engines for indexing
    const submitToSearchEngines = async () => {
      try {
        // Only submit on production domain
        if (window.location.hostname === 'charlesmackaybooks.com') {
          // Ping Google sitemap
          fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent('https://charlesmackaybooks.com/sitemap.xml')}`, {
            mode: 'no-cors'
          }).catch(() => {}) // Ignore errors

          // Ping Bing sitemap
          fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent('https://charlesmackaybooks.com/sitemap.xml')}`, {
            mode: 'no-cors'
          }).catch(() => {}) // Ignore errors

          console.log('✅ Submitted sitemaps to search engines')
        }
      } catch (error) {
        // Silently handle errors
      }
    }

    // Submit after a delay
    setTimeout(submitToSearchEngines, 3000)

    // Fix 7: Add structured data for better understanding
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://charlesmackaybooks.com'
        }
      ]
    }

    // Add book-specific breadcrumb if it's a book page
    if (pageUrl.includes('/books/')) {
      breadcrumbSchema.itemListElement.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Books',
          item: 'https://charlesmackaybooks.com/books'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: pageTitle,
          item: pageUrl
        }
      )
    } else if (pageUrl.includes('/blog/')) {
      breadcrumbSchema.itemListElement.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://charlesmackaybooks.com/blog'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: pageTitle,
          item: pageUrl
        }
      )
    }

    // Add breadcrumb structured data
    let breadcrumbScript = document.querySelector('script[data-breadcrumb-schema]') as HTMLScriptElement
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script') as HTMLScriptElement
      breadcrumbScript.type = 'application/ld+json'
      breadcrumbScript.setAttribute('data-breadcrumb-schema', 'true')
      document.head.appendChild(breadcrumbScript)
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema)

    // Track for analytics
    if (window.gtag) {
      window.gtag('event', 'seo_indexing_fix_applied', {
        page_url: pageUrl,
        page_title: pageTitle
      })
    }

  }, [pageUrl, pageTitle, pageDescription])

  return null // This component doesn't render anything visible
}

// Export additional utility functions
export function generatePageMetadata(props: {
  title: string
  description: string
  canonical: string
  ogImage?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  isArticle?: boolean
}) {
  const baseUrl = 'https://charlesmackaybooks.com'
  const canonicalUrl = props.canonical.startsWith('http') ? props.canonical : `${baseUrl}${props.canonical}`
  const imageUrl = props.ogImage?.startsWith('http') ? props.ogImage : `${baseUrl}${props.ogImage || '/charles-mackay-aviation-historian.jpg'}`

  return {
    title: props.title,
    description: props.description,
    canonical: canonicalUrl,
    openGraph: {
      type: props.isArticle ? 'article' : 'website',
      title: props.title,
      description: props.description,
      url: canonicalUrl,
      siteName: 'Charles E. MacKay Aviation Books',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: props.title,
        }
      ],
      locale: 'en_GB',
      ...(props.isArticle && {
        publishedTime: props.publishedTime,
        modifiedTime: props.modifiedTime || props.publishedTime,
        tags: props.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: [imageUrl],
      creator: '@CharlesMacKayAviation',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-GB': canonicalUrl,
        'en-US': canonicalUrl,
      }
    },
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
    }
  }
}
