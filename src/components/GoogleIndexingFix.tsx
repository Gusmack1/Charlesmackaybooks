'use client'

import { useEffect } from 'react'

interface PageData {
  url: string
  title: string
  description: string
  lastModified?: string
  priority?: number
  changeFreq?: string
}

export default function GoogleIndexingFix({ pageData }: { pageData: PageData }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Fix 1: Ensure proper canonical URLs
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute('href', pageData.url)
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = pageData.url
      document.head.appendChild(canonical)
    }

    // Fix 2: Add hreflang for international targeting
    const existingHreflang = document.querySelectorAll('link[hreflang]')
    existingHreflang.forEach(el => el.remove())

    const hreflangTags = [
      { lang: 'en-GB', url: pageData.url },
      { lang: 'en-US', url: pageData.url },
      { lang: 'en', url: pageData.url },
      { lang: 'x-default', url: pageData.url }
    ]

    hreflangTags.forEach(({ lang, url }) => {
      const hreflang = document.createElement('link')
      hreflang.rel = 'alternate'
      hreflang.setAttribute('hreflang', lang)
      hreflang.href = url
      document.head.appendChild(hreflang)
    })

    // Fix 3: Ensure proper robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Fix 4: Add specific googlebot meta
    let googlebotMeta = document.querySelector('meta[name="googlebot"]')
    if (!googlebotMeta) {
      googlebotMeta = document.createElement('meta')
      googlebotMeta.setAttribute('name', 'googlebot')
      document.head.appendChild(googlebotMeta)
    }
    googlebotMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Fix 5: Submit URL to Google (if IndexNow API is available)
    const submitToIndexNow = async () => {
      try {
        const indexNowKey = 'a7ce294f58dd63f7' // Google verification code
        const indexNowUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(pageData.url)}&key=${indexNowKey}`

        // Submit to IndexNow API (Bing, Yandex)
        await fetch(indexNowUrl, { method: 'GET' })
        console.log('Submitted to IndexNow API:', pageData.url)
      } catch (error) {
        console.log('IndexNow submission failed:', error)
      }
    }

    // Submit after page load
    setTimeout(submitToIndexNow, 2000)

    // Fix 6: Add structured data for better understanding
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': pageData.url + '#webpage',
      url: pageData.url,
      name: pageData.title,
      description: pageData.description,
      dateModified: pageData.lastModified || new Date().toISOString(),
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://charlesmackaybooks.com/#website',
        url: 'https://charlesmackaybooks.com',
        name: 'Charles E. MacKay Aviation Books'
      },
      author: {
        '@type': 'Person',
        name: 'Charles E. MacKay',
        url: 'https://charlesmackaybooks.com/about'
      },
      publisher: {
        '@type': 'Person',
        name: 'Charles E. MacKay'
      },
      inLanguage: 'en-GB',
      potentialAction: {
        '@type': 'ReadAction',
        target: pageData.url
      }
    }

    // Add structured data script
    let structuredDataScript = document.querySelector('script[data-indexing-fix]') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script') as HTMLScriptElement
      structuredDataScript.type = 'application/ld+json'
      structuredDataScript.setAttribute('data-indexing-fix', 'true')
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)

  }, [pageData])

  return null // This component doesn't render anything visible
}

// Helper function to generate sitemap data for manual submission
export function generateSitemapEntry(pageData: PageData) {
  return {
    url: pageData.url,
    lastModified: pageData.lastModified || new Date().toISOString(),
    changeFrequency: pageData.changeFreq || 'weekly',
    priority: pageData.priority || 0.8
  }
}

// Component to fix common indexing issues
export function IndexingHealthCheck() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check for common indexing issues
    const issues = []

    // Check 1: Missing or incorrect canonical
    const canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      issues.push('Missing canonical URL')
    } else if (!canonical.getAttribute('href')?.startsWith('https://charlesmackaybooks.com')) {
      issues.push('Incorrect canonical URL domain')
    }

    // Check 2: Missing meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription || !metaDescription.getAttribute('content')) {
      issues.push('Missing meta description')
    }

    // Check 3: Missing title
    if (!document.title || document.title.length < 10) {
      issues.push('Missing or too short title tag')
    }

    // Check 4: No-index accidentally set
    const robots = document.querySelector('meta[name="robots"]')
    if (robots?.getAttribute('content')?.includes('noindex')) {
      issues.push('Page accidentally set to noindex')
    }

    // Check 5: Missing structured data
    const structuredData = document.querySelector('script[type="application/ld+json"]')
    if (!structuredData) {
      issues.push('Missing structured data')
    }

    // Log issues for debugging
    if (issues.length > 0) {
      console.warn('SEO Indexing Issues Found:', issues)
    }

    // Report to analytics if available
    if (window.gtag) {
      window.gtag('event', 'seo_health_check', {
        issues_found: issues.length,
        page_url: window.location.href
      })
    }

  }, [])

  return null
}
