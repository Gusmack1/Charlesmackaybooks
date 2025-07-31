import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviation History Blog | Expert Insights by Charles E. MacKay',
  description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage by Charles E. MacKay.',
  keywords: [
    'aviation history blog',
    'Scottish aviation history',
    'WWI aviation',
    'WWII aviation',
    'helicopter development',
    'jet age aviation',
    'military aviation heritage',
    'aviation biography',
    'naval aviation history',
    'industrial aviation',
    'Charles MacKay aviation',
    'aviation historian blog',
    'aircraft development history',
    'fighter aircraft history',
    'aviation manufacturing',
    'test pilot biography',
    'aviation innovation',
    'British aviation history',
    'German aviation history',
    'Cold War aviation'
  ],
  openGraph: {
    title: 'Aviation History Blog | Expert Insights by Charles E. MacKay',
    description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage.',
    url: 'https://charlesmackaybooks.com/blog',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/aviation-history-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Aviation History Blog by Charles E. MacKay - Expert insights into aviation heritage'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviation History Blog | Expert Insights by Charles E. MacKay',
    description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage.',
    images: ['/blog-images/aviation-history-blog.jpg'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
