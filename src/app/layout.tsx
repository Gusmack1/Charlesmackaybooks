import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import BasketDrawer from "@/components/BasketDrawer";
import { SessionProvider } from "@/components/SessionProvider";
import CookieBanner from "@/components/CookieBanner";
import ConsentGate from "@/components/ConsentGate";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const siteUrl = 'https://charlesmackaybooks.com';

export const metadata: Metadata = {
  title: {
    default: 'Charles E. MacKay Books — Buy Scottish Aviation History Books Online',
    template: '%s | Charles E. MacKay Books',
  },
  description: 'Buy 20 aviation history books by Charles E. MacKay. Scottish aviation, Beardmore, Clydeside, WWI/WWII aircraft, Luftwaffe, helicopters. Royal Mail tracked shipping worldwide from Glasgow.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Charles E. MacKay — Aviation History Books',
    title: 'Charles E. MacKay — Aviation History Books',
    description: 'Definitive histories of Scottish aviation and military aircraft. 20 titles, 25+ years of research. Royal Mail tracked shipping worldwide.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Charles E. MacKay Aviation History Books' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles E. MacKay — Aviation History Books',
    description: 'Definitive histories of Scottish aviation and military aircraft. Royal Mail tracked shipping worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <head>
        {/* Performance: dns-prefetch + preconnect for third parties */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        {/* Organization + Website JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'Charles E. MacKay Books',
                  url: siteUrl,
                  logo: `${siteUrl}/icon-192x192.png`,
                  description: 'Aviation history books by Charles E. MacKay — Scottish aviation, WWI/WWII aircraft, military history.',
                  sameAs: ['https://charlesmackaybooks.com'],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: 'charlese1mackay@hotmail.com',
                    areaServed: 'Worldwide',
                    availableLanguage: 'English',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'Charles E. MacKay Books',
                  publisher: { '@id': `${siteUrl}/#organization` },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${siteUrl}/books?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
        {/* Analytics + Customer Reviews are loaded by <ConsentGate /> below,
            only after the visitor accepts analytics cookies via <CookieBanner />. */}
      </head>
      <body>
        <SessionProvider>
          <CartProvider>
            <a href="#main-content" className="skip-link">Skip to content</a>
            {/* Discount banner */}
            <div style={{ background: 'var(--gold)', color: 'var(--navy)', textAlign: 'center', padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>
              Save 5% on 2 books or 10% on 3+ — Royal Mail tracked shipping calculated at checkout
            </div>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
            <BasketDrawer />
            <CookieBanner />
            <ConsentGate />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
