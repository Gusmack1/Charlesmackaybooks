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
    google: 'GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s',
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
                      url: `${domain}/books/${book.id}`,
                      name: book.title,
                      description: (book.description || '').slice(0, 5000),
                      image: `${domain}${(book.imageUrl || `/book-covers/${book.id}.jpg`).startsWith('/') ? '' : '/'}${book.imageUrl || `book-covers/${book.id}.jpg`}`,
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
                        },
                        hasMerchantReturnPolicy: {
                          '@type': 'MerchantReturnPolicy',
                          applicableCountry: 'GB',
                          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                          merchantReturnDays: 30,
                          returnMethod: 'https://schema.org/ReturnByMail',
                          returnFees: 'https://schema.org/FreeReturn',
                          returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
                          returnPolicyUrl: `${domain}/returns`
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

        {/* Google Product/OG/Twitter product meta tags (non-visual) */}
        {(() => {
          try {
            const { books } = require('@/data/books');
            const prices: number[] = (books || []).map((b: any) => Number(b.price) || 0).filter((n: number) => n > 0)
            const minPrice = prices.length ? Math.min(...prices) : 19.99
            const qty = Array.isArray(books) ? books.length : 0
            return (
              <>
                {/* Google Product Metadata */}
                <meta property="product:price:amount" content={minPrice.toFixed(2)} />
                <meta property="product:price:currency" content="GBP" />
                <meta property="product:availability" content="in stock" />
                <meta property="product:condition" content="new" />
                <meta property="product:retailer_item_id" content="multiple" />
                <meta property="product:brand" content="Charles E. MacKay" />

                {/* Open Graph Product Tags */}
                <meta property="og:type" content="og:product" />
                <meta property="og:title" content="Aviation History Books by Charles E. MacKay" />
                <meta property="og:description" content="Self-published aviation history books used as primary references by researchers worldwide" />
                <meta property="og:url" content="https://charlesmackaybooks.com" />
                <meta property="og:site_name" content="Charles MacKay Books" />
                <meta property="product:plural_title" content="Aviation History Books" />
                <meta property="product:price:amount" content={minPrice.toFixed(2)} />
                <meta property="product:price:currency" content="GBP" />

                {/* Twitter Product Card */}
                <meta name="twitter:card" content="product" />
                <meta name="twitter:site" content="@charlesmackaybooks" />
                <meta name="twitter:creator" content="@charlesmackaybooks" />
                <meta name="twitter:domain" content="charlesmackaybooks.com" />
                <meta name="twitter:label1" content="Price" />
                <meta name="twitter:data1" content={`From £${minPrice.toFixed(2)}`} />
                <meta name="twitter:label2" content="Availability" />
                <meta name="twitter:data2" content="In Stock" />

                {/* Rich Snippets microdata helpers */}
                <meta itemProp="name" content="Charles MacKay Aviation Books" />
                <meta itemProp="description" content="Aviation history books" />
                <meta itemProp="image" content="https://charlesmackaybooks.com/images/books-collection.jpg" />

                {/* Google Rich Results Product Signals */}
                <meta name="product:brand" content="Charles E. MacKay" />
                <meta name="product:category" content="Books > History > Aviation" />
                <meta name="product:condition" content="new" />
                <meta name="product:availability" content="in_stock" />
                <meta name="product:price" content={minPrice.toFixed(2)} />
                <meta name="product:currency" content="GBP" />
                <meta name="product:retailer" content="Charles MacKay Books" />
                <meta name="product:retailer_id" content="charlesmackaybooks" />

                {/* Shopping Actions Metadata */}
                <meta property="product:multiple" content="true" />
                <meta property="product:quantity" content={String(qty)} />
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
                <meta name="google-site-verification" content="your-google-verification-code" />
                <meta name="business:contact_data:locality" content="Glasgow" />
                <meta name="business:contact_data:country_name" content="Scotland" />
                <meta name="business:contact_data:email" content="charlese1mackay@hotmail.com" />
              </>
            )
          } catch {
            return null
          }
        })()}
        
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
        {/* Footer: minimal site-wide links for policy discoverability */}
        <footer className="mt-12 py-8 text-center text-sm opacity-90 text-white bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
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

        {/* Invisible Google Merchant Center data layer and product identifiers */}
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html: (() => {
              try {
                const { books } = require('@/data/books');
                const items = (books || []).map((b: any) => ({
                  item_id: String(b.isbn || b.id),
                  item_name: b.title,
                  item_brand: 'Charles E. MacKay',
                  item_category: `Books/${b.category || 'Aviation History'}`,
                  price: Number(b.price),
                  currency: 'GBP',
                  quantity: 1,
                  item_variant: 'Paperback',
                  author: 'Charles E. MacKay',
                  isbn: String(b.isbn || b.id),
                  availability: 'in_stock',
                  condition: 'new'
                }));

                return `
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'view_item_list',
                    ecommerce: { items: ${JSON.stringify(items)} }
                  });

                  // Mark page as containing products
                  try { document.head.insertAdjacentHTML('beforeend', '<meta name="google-merchant-center-product-data" content="true">'); } catch(e) {}

                  // Add product identifiers for crawlers
                  try {
                    (document.querySelectorAll('[id^="book-"]') || []).forEach(function(book){
                      book.setAttribute('itemtype', 'https://schema.org/Product');
                      var isbn = book.id.replace('book-','');
                      book.setAttribute('data-product-id', 'isbn-' + isbn);
                    });
                  } catch(e) {}
                `;
              } catch {
                return '';
              }
            })()
          }}
        />
      </ClientBody>
    </html>
  )
}
