import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import BasketDrawer from "@/components/BasketDrawer";

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
  description: 'Buy 20 aviation history books by Charles E. MacKay. Scottish aviation, Beardmore, Clydeside, WWI/WWII aircraft, Luftwaffe, helicopters. Free worldwide shipping from Glasgow.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Charles E. MacKay — Aviation History Books',
    title: 'Charles E. MacKay — Aviation History Books',
    description: 'Definitive histories of Scottish aviation and military aircraft. 20 titles, 25+ years of research. Free worldwide shipping.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Charles E. MacKay Aviation History Books' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles E. MacKay — Aviation History Books',
    description: 'Definitive histories of Scottish aviation and military aircraft. Free worldwide shipping.',
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
        {/* Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RJS2CCBSJP" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RJS2CCBSJP');
          gtag('config', 'GT-MR8KZP58');
          gtag('config', 'GT-WKRHZDSX');
        `}</Script>
        {/* Google Customer Reviews */}
        <Script src="https://apis.google.com/js/platform.js?onload=renderBadge" strategy="afterInteractive" />
        <Script id="gcr-badge" strategy="afterInteractive">{`
          window.renderBadge = function() {
            var ratingBadgeContainer = document.getElementById("gcr-badge");
            if (ratingBadgeContainer && window.gapi) {
              window.gapi.load('ratingbadge', function() {
                window.gapi.ratingbadge.render(ratingBadgeContainer, {"merchant_id": 5631213189, "position": "BOTTOM_RIGHT"});
              });
            }
          };
          if (window.gapi) { window.renderBadge(); }
        `}</Script>
      </head>
      <body>
        <CartProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          {/* Discount banner */}
          <div style={{ background: 'var(--gold)', color: 'var(--navy)', textAlign: 'center', padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>
            Save 5% on 2 books or 10% on 3+ — Free worldwide shipping on every order
          </div>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <BasketDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
