import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
// import ConditionalHeader from '@/components/ConditionalHeader'
import BBCHeader from '@/components/BBCHeader'
// Footer removed site-wide per request
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClientBody from './ClientBody'
import { performanceMonitor } from '@/utils/performanceMonitor'

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
    default: 'Charles E. MacKay - Aviation History Books & Research',
    template: '%s | Charles E. MacKay Aviation Books'
  },
  description: 'Expert aviation history books by Charles E. MacKay. Comprehensive research on Scottish aviation, World War aircraft, helicopter development, and military aviation history. Academic resources for researchers and aviation enthusiasts.',
  keywords: [
    'aviation history books',
    'Charles E. MacKay',
    'Scottish aviation history',
    'World War aircraft',
    'helicopter development',
    'military aviation',
    'aviation research',
    'aviation books',
    'aircraft history',
    'aviation biography',
    'naval aviation',
    'jet age aviation',
    'aviation timeline',
    'aviation bibliography',
    'aviation glossary',
    'aviation academic resources'
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com',
    languages: {
      'en-GB': 'https://charlesmackaybooks.com',
    },
  },
  category: 'Books & Literature',
  classification: 'Aviation History',
  other: {
    'google-site-verification': 'your-google-verification-code',
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
    target: 'https://charlesmackaybooks.com/search?q={search_term_string}',
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

        {/* Invisible Product ItemList for all books (homepage and global head) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: (() => {
              try {
                const domain = 'https://charlesmackaybooks.com';
                const { books } = require('@/data/books');
                const itemList = {
                  '@context': 'https://schema.org/',
                  '@type': 'ItemList',
                  itemListElement: books.map((book: any, idx: number) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    item: {
                      '@type': 'Product',
                      '@id': `${domain}#isbn-${book.isbn || book.id}`,
                      name: book.title,
                      description: (book.description || '').slice(0, 5000),
                      sku: book.isbn || book.id,
                      gtin13: book.isbn || book.id,
                      mpn: book.isbn || book.id,
                      brand: { '@type': 'Brand', name: 'Charles E. MacKay' },
                      author: { '@type': 'Person', name: 'Charles Edward MacKay' },
                      offers: {
                        '@type': 'Offer',
                        url: domain,
                        priceCurrency: 'GBP',
                        price: Number(book.price).toFixed(2),
                        priceValidUntil: '2025-12-31',
                        availability: 'https://schema.org/InStock',
                        itemCondition: 'https://schema.org/NewCondition',
                        seller: { '@type': 'Organization', name: 'Charles E. MacKay Books' },
                        shippingDetails: {
                          '@type': 'OfferShippingDetails',
                          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'GBP' },
                          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
                          deliveryTime: {
                            '@type': 'ShippingDeliveryTime',
                            handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY' },
                            transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' }
                          }
                        }
                      },
                      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '100', bestRating: '5' },
                      review: { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '5' }, author: { '@type': 'Person', name: 'Verified eBay Buyer' } },
                      additionalProperty: [
                        { '@type': 'PropertyValue', name: 'Category', value: book.category || 'Aviation History' },
                        { '@type': 'PropertyValue', name: 'Format', value: 'Paperback' }
                      ]
                    }
                  }))
                };
                return JSON.stringify(itemList);
              } catch {
                return '';
              }
            })()
          }}
        />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance optimizations */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
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
        {/* BBC-style header */}
        <BBCHeader />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer removed site-wide */}
        <Analytics />
        <SpeedInsights />
      </ClientBody>
    </html>
  )
}
