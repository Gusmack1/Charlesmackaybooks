import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWrapper from '@/components/ClientWrapper'
import UnifiedSchema from '@/components/UnifiedSchema'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://charlesmackaybooks.com'),
  title: {
    default: 'Charles E. MacKay Aviation Books - Scottish Aviation History Specialist',
    template: '%s | Charles E. MacKay Aviation Books'
  },
  description: 'Published aviation books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history. Used as primary references by aviation researchers worldwide.',
  keywords: [
    'Charles MacKay aviation books',
    'Scottish aviation history',
    'WWI aircraft books',
    'WWII aviation history',
    'Beardmore aviation',
    'Clydeside aviation',
    'military aviation books',
    'aviation historian Charles MacKay',
    'helicopter history books',
    'jet age aviation',
    'naval aviation history',
    'aviation biography books',
    'aircraft development history',
    'Scottish aircraft manufacturing',
    'aviation research books',
    'Glasgow aviation history'
  ],
  authors: [{ name: 'Charles E. MacKay' }],
  creator: 'Charles E. MacKay',
  publisher: 'Charles E. MacKay',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://charlesmackaybooks.com',
    siteName: 'Charles E. MacKay Aviation Books',
    title: 'Charles E. MacKay Aviation Books - Scottish Aviation History Specialist',
    description: 'Published aviation books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.',
    images: [
      {
        url: 'https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay Aviation Books - Scottish Aviation History Specialist',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles E. MacKay Aviation Books - Scottish Aviation History',
    description: 'Published aviation books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft.',
    images: ['https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg'],
    creator: '@CharlesMacKayAviation',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'a7ce294f58dd63f7',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com',
    languages: {
      'en-GB': 'https://charlesmackaybooks.com',
      'en-US': 'https://charlesmackaybooks.com',
    },
  },
  category: 'Aviation History',
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        {/* Performance and SEO optimizations */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        <link rel="preconnect" href="https://c8.alamy.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//upload.wikimedia.org" />
        <link rel="dns-prefetch" href="//c8.alamy.com" />

        {/* Additional SEO meta tags */}
        <meta name="google-site-verification" content="a7ce294f58dd63f7" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

        {/* Single unified structured data */}
        <UnifiedSchema pageType="homepage" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics 4 Tracking */}
        <GoogleAnalytics />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Charles E. MacKay Aviation Books",
              "url": "https://charlesmackaybooks.com",
              "logo": "https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg",
              "description": "Published aviation books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.",
              "founder": {
                "@type": "Person",
                "name": "Charles E. MacKay",
                "jobTitle": "Aviation Historian",
                "description": "Renowned aviation historian specializing in Scottish aviation heritage"
              },
              "sameAs": [
                "https://twitter.com/CharlesMacKayAviation"
              ],
              "publishingPrinciples": "https://charlesmackaybooks.com/about",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://charlesmackaybooks.com/contact"
              }
            })
          }}
        />

        <CartProvider>
          <WishlistProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
