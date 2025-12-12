import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
// import ConditionalHeader from '@/components/ConditionalHeader'
import BBCHeader from '@/components/BBCHeader'
import TrustSecurityBadges from '@/components/TrustSecurityBadges'
// Footer removed site-wide per request
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClientBody from './ClientBody'
import { performanceMonitor } from '@/utils/performanceMonitor'
import MobileSSLFix from '@/components/MobileSSLFix'
import PerformanceSEO from '@/components/PerformanceSEO'
import TechnicalSEOAudit from '@/components/TechnicalSEOAudit'
import BacklinkStrategy from '@/components/BacklinkStrategy'
import GoogleSEOCompliance from '@/components/GoogleSEOCompliance'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import { books } from '@/data/books'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

const SITE_DOMAIN = 'https://charlesmackaybooks.com'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WKRHZDSX'
const priceSummary = getPriceSummary()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1f2937',
  colorScheme: 'light dark'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://charlesmackaybooks.com'),
  title: {
    default: 'Charles E. MacKay Aviation Books - Expert Aviation History | Scottish Aviation | WWI WWII Aircraft',
    template: '%s | Charles E. MacKay Aviation History Books'
  },
  description: 'Buy authentic aviation history books by Charles E. MacKay. Expert on Scottish aviation, WWI/WWII aircraft, helicopter development, naval aviation. 19+ published books, 1,700+ satisfied customers worldwide. Free shipping.',
  keywords: [
    'Charles E MacKay aviation books',
    'Charles Mackay books',
    'aviation history books',
    'Scottish aviation history books',
    'WWI aircraft books',
    'WWII aviation books',
    'helicopter history books',
    'naval aviation books',
    'jet age aviation books',
    'military aviation history',
    'Beardmore aviation',
    'Clydeside aviation',
    'Supermarine Spitfire books',
    'Hurricane fighter books',
    'aviation biography books',
    'aircraft development history',
    'Glasgow aviation historian',
    'Scotland aviation heritage',
    'Royal Air Force books',
    'Fleet Air Arm books',
    'aviation research books',
    'academic aviation resources'
  ],
  authors: [{ name: 'Charles E. MacKay' }],
  creator: 'Charles E. MacKay',
  publisher: 'Charles Mackay Books',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://charlesmackaybooks.com',
    siteName: 'Charles Mackay Books',
    title: 'Charles E. MacKay - Aviation History Books & Research',
    description: 'Expert aviation history books by Charles E. MacKay. Comprehensive research on Scottish aviation, World War aircraft, helicopter development, and military aviation history.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay Aviation History Books',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles E. MacKay - Aviation History Books & Research',
    description: 'Expert aviation history books by Charles E. MacKay. Comprehensive research on Scottish aviation, World War aircraft, helicopter development, and military aviation history.',
    images: ['/og-image.jpg'],
    creator: '@charlesmackaybooks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Books & Literature',
  classification: 'Aviation History',
  other: {
    'google-site-verification': 'GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
  }
}

// Structured data for organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Charles Mackay Books',
  url: 'https://charlesmackaybooks.com',
  logo: 'https://charlesmackaybooks.com/logo.png',
  description: 'Expert aviation history books and research by Charles E. MacKay',
  founder: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    jobTitle: 'Aviation Historian and Author',
    description: 'Expert aviation historian specializing in Scottish aviation, World War aircraft, and military aviation history'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@charlesmackaybooks.com',
    availableLanguage: 'English'
  },
  sameAs: [
    'https://twitter.com/charlesmackaybooks',
    'https://www.linkedin.com/company/charles-mackay-books'
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
    addressRegion: 'Scotland'
  }
}

// Structured data for website
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Charles Mackay Books',
  url: 'https://charlesmackaybooks.com',
  description: 'Expert aviation history books and research by Charles E. MacKay',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    jobTitle: 'Aviation Historian and Author'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://charlesmackaybooks.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable} font-sans`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Google Fonts for optimal performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Google Product/OG/Twitter product meta tags (non-visual) */}
        <>
          {/* Google Product Metadata */}
          <meta property="product:price:amount" content={priceSummary.minPrice.toFixed(2)} />
          <meta property="product:price:currency" content="GBP" />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta property="product:retailer_item_id" content="multiple" />
          <meta property="product:brand" content="Charles E. MacKay" />

          {/* Open Graph Product Tags */}
          <meta property="og:type" content="og:product" />
          <meta property="og:title" content="Aviation History Books by Charles E. MacKay" />
          <meta
            property="og:description"
            content="Self-published aviation history books used as primary references by researchers worldwide"
          />
          <meta property="og:url" content={SITE_DOMAIN} />
          <meta property="og:site_name" content="Charles MacKay Books" />
          <meta property="product:plural_title" content="Aviation History Books" />
          <meta property="product:price:amount" content={priceSummary.minPrice.toFixed(2)} />
          <meta property="product:price:currency" content="GBP" />

          {/* Twitter Product Card */}
          <meta name="twitter:card" content="product" />
          <meta name="twitter:site" content="@charlesmackaybooks" />
          <meta name="twitter:creator" content="@charlesmackaybooks" />
          <meta name="twitter:domain" content="charlesmackaybooks.com" />
          <meta name="twitter:label1" content="Price" />
          <meta name="twitter:data1" content={`From £${priceSummary.minPrice.toFixed(2)}`} />
          <meta name="twitter:label2" content="Availability" />
          <meta name="twitter:data2" content="In Stock" />

          {/* Rich Snippets microdata helpers */}
          <meta itemProp="name" content="Charles MacKay Aviation Books" />
          <meta itemProp="description" content="Aviation history books" />
          <meta itemProp="image" content={`${SITE_DOMAIN}/images/books-collection.jpg`} />

          {/* Google Rich Results Product Signals */}
          <meta name="product:brand" content="Charles E. MacKay" />
          <meta name="product:category" content="Books > History > Aviation" />
          <meta name="product:condition" content="new" />
          <meta name="product:availability" content="in_stock" />
          <meta name="product:price" content={priceSummary.minPrice.toFixed(2)} />
          <meta name="product:currency" content="GBP" />
          <meta name="product:retailer" content="Charles MacKay Books" />
          <meta name="product:retailer_id" content="charlesmackaybooks" />

          {/* Shopping Actions Metadata */}
          <meta property="product:multiple" content="true" />
          <meta property="product:quantity" content={String(priceSummary.totalBooks)} />
          <meta property="product:shipping_cost" content="0.00" />
          <meta property="product:shipping_country" content="GB" />
          <meta property="product:tax_included" content="true" />

          {/* Book-Specific Metadata */}
          <meta property="book:author" content="Charles E. MacKay" />
          <meta property="book:isbn" content="multiple" />
          <meta property="book:release_date" content="2023" />
          <meta property="book:publisher" content="A MacKay" />
          <meta property="product:price:valid_until" content="2026-12-31" />

          {/* Business Verification */}
          <meta name="google-site-verification" content="GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s" />
          <meta name="business:contact_data:locality" content="Glasgow" />
          <meta name="business:contact_data:country_name" content="Scotland" />
          <meta name="business:contact_data:email" content="charlese1mackay@hotmail.com" />
        </>
        
        {/* Core Web Vitals Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Import performance monitor after page load
                  import('/utils/performanceMonitor.js').then(({ performanceMonitor }) => {
                    console.log('Performance monitoring initialized');
                  }).catch(e => console.log('Performance monitoring not available'));
                });
              }
            `
          }}
        />
      </head>
      <ClientBody>
        <AnalyticsScripts />
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        
        {/* BBC-style header */}
        <BBCHeader />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Trust & Security Badges - Site-wide above footer */}
        <TrustSecurityBadges />
        
        {/* Footer: minimal site-wide links for policy discoverability */}
        <footer className="mt-12 py-8 text-center text-sm opacity-90 text-white bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/how-to-order" className="underline text-white">How to Order</a>
              <span className="hidden sm:inline">•</span>
              <a href="/support" className="underline text-white">Support</a>
              <span className="hidden sm:inline">•</span>
              <a href="/contact" className="underline text-white">Contact</a>
            </div>
            <div className="mt-4">© {new Date().getFullYear()} Charles E. MacKay Books · All rights reserved</div>
            <div className="mt-1">
              <span>A MACKAY (PUBLISHER) LTD · Company number </span>
              <a
                href="https://find-and-update.company-information.service.gov.uk/company/SC858624"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white"
              >
                SC858624
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
        <PerformanceSEO />
        <TechnicalSEOAudit />
        <BacklinkStrategy />
        <GoogleSEOCompliance />

        {/* Invisible Google Merchant Center data layer and product identifiers */}
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html: buildMerchantDataLayer(),
          }}
        />
      </ClientBody>
    </html>
  )
}

function getPriceSummary() {
  const numericPrices = books.map((book) => Number(book.price) || 0).filter((value) => value > 0)
  const minPrice = numericPrices.length ? Math.min(...numericPrices) : 19.99
  return {
    minPrice,
    totalBooks: books.length,
  }
}

function buildMerchantDataLayer() {
  try {
    const itemsWithSlug = books.map((book) => {
      const normalizedPrice = Number(book.price)
      return {
        slug: book.id,
        item_id: String(book.isbn || book.id),
        item_name: book.title,
        item_brand: 'Charles E. MacKay',
        item_category: `Books/${book.category || 'Aviation History'}`,
        price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
        currency: 'GBP',
        quantity: 1,
        item_variant: 'Paperback',
        author: 'Charles E. MacKay',
        isbn: String(book.isbn || book.id),
        availability: 'in_stock',
        condition: 'new',
      }
    })

    const itemsBySlug = itemsWithSlug.reduce<Record<string, any>>((acc, item) => {
      const { slug, ...rest } = item
      acc[slug] = rest
      return acc
    }, {})

    const listItems = itemsWithSlug.map(({ slug, ...rest }) => rest)

    return `
      (function() {
        try {
          const path = window.location?.pathname || '';
          const dataLayer = window.dataLayer = window.dataLayer || [];
          const itemsBySlug = ${JSON.stringify(itemsBySlug)};
          const listItems = ${JSON.stringify(listItems)};
          const slugMatch = path.match(/^\\/books\\/([^/]+)\\/?$/);

          if (path === '/books') {
            dataLayer.push({ event: 'view_item_list', ecommerce: { items: listItems } });
            return;
          }

          if (slugMatch) {
            const slug = slugMatch[1];
            const item = itemsBySlug[slug];
            if (item) {
              dataLayer.push({ event: 'view_item', ecommerce: { items: [item] } });
            }
            return;
          }
        } catch (e) {}
      })();
    `
  } catch {
    return ''
  }
}
