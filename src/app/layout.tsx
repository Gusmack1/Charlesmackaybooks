import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientBody from './ClientBody'
import { books } from '@/data/books'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'vietnamese'],
  display: 'swap',
  variable: '--font-playfair'
})

const SITE_DOMAIN = 'https://charlesmackaybooks.com'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WKRHZDSX'

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
  },
  category: 'Books & Literature',
  classification: 'Aviation History',
  other: {
    'google-site-verification': 'GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s',
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
        <meta charSet="UTF-8" />
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
        {/* X-Frame-Options should be set via HTTP headers, not meta tag - configured in Netlify */}
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Font preconnects for optimized loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Optimized Core Web Vitals Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring - removed missing file reference
              // Performance is monitored via Google Analytics and Core Web Vitals
              if (typeof window !== 'undefined' && window.location.hostname === 'charlesmackaybooks.com') {
                // Core Web Vitals are tracked via Google Analytics automatically
              }
            `
          }}
        />
      </head>
      <ClientBody>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

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
