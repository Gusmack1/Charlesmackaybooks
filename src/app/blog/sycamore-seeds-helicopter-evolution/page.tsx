import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration for Rotorcraft | Charles E. MacKay',
  description: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired generations of helicopter pioneers to develop modern rotorcraft.',
  keywords: [
    'sycamore seeds helicopter',
    'autorotation principle',
    'biomimicry aviation',
    'helicopter evolution',
    'natural flight inspiration',
    'rotorcraft development',
    'helicopter history',
    'aviation biomimicry',
    'helicopter pioneers',
    'vertical flight',
    'Charles MacKay aviation books',
    'helicopter development',
    'rotorcraft history',
    'natural flight principles',
    'helicopter innovation'
  ],
  openGraph: {
    title: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration for Rotorcraft',
    description: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired helicopter development.',
    url: 'https://charlesmackaybooks.com/blog/sycamore-seeds-helicopter-evolution',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/bristol-sycamore.jpg',
        width: 1200,
        height: 630,
        alt: 'Bristol Sycamore helicopter showing the connection between nature\'s inspiration and practical rotorcraft development'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration for Rotorcraft',
    description: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired helicopter development.',
    images: ['/blog-images/bristol-sycamore.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration for Rotorcraft',
  description: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired generations of helicopter pioneers to develop modern rotorcraft.',
  image: '/blog-images/bristol-sycamore.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in helicopter development and biomimicry in aviation',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/sycamore-seeds.jpg'
    }
  },
  datePublished: '2025-01-28T02:00:00.000Z',
  dateModified: '2025-01-28T02:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/sycamore-seeds-helicopter-evolution'
  },
  articleSection: 'Helicopter History',
  keywords: 'sycamore seeds, helicopter evolution, autorotation, biomimicry, rotorcraft development',
  wordCount: 2800,
  readingTime: 'PT12M'
}

export default function SycamoreSeedsPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/sycamore-seeds-helicopter-evolution'
  const pageTitle = 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration for Rotorcraft'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Sycamore Seeds
                <span className="block text-green-300">Nature's Helicopter Inspiration</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                How nature's spinning sycamore seeds revealed the fundamental principles of autorotation and inspired generations of helicopter pioneers to develop the rotorcraft that revolutionized vertical flight.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-green-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>12 minute read</span>
                <span>•</span>
                <span>January 28, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/bristol-sycamore.jpg"
                alt="Bristol Sycamore helicopter showing the connection between nature's spinning seed inspiration and practical rotorcraft development"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Social */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ← Charles MacKay Books
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ← All Articles
            </Link>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how nature's sycamore seeds inspired the development of helicopters and rotorcraft. From ancient observations to modern vertical flight technology."
            hashtags={['HelicopterHistory', 'SycamoreSeeds', 'RotorcraftDevelopment', 'Biomimicry', 'VerticalFlight', 'AviationHistory', 'CharlesMacKay']}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Nature's Inspiration:</strong> The spinning flight of sycamore seeds demonstrates the principle of autorotation that became fundamental to helicopter safety and inspired generations of rotorcraft pioneers from Leonardo da Vinci to Igor Sikorsky.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            Long before humans achieved powered flight, nature had perfected the art of rotating wing flight through the elegant sycamore seed. These spinning "helicopters" falling from trees each autumn demonstrated the fundamental principles of autorotation, lift generation through rotation, and controlled descent - concepts that would inspire aviation pioneers for centuries and eventually lead to the development of modern helicopters.
          </p>
        </div>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/sycamore-seeds" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/sycamore-seeds.jpg"
                    alt="Sycamore Seeds book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      The Sycamore Seeds: Helicopter Evolution
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete story of how nature's spinning seeds inspired helicopter development and the evolution of vertical flight.
                    </p>
                    <div className="text-green-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/sycamore-seeds" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/sycamore-seeds.jpg"
                    alt="The Sycamore Seeds book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      The Sycamore Seeds: The Early History of the Helicopter
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Early British helicopter development focusing on Cierva autogyros and other rotorcraft pioneers.
                    </p>
                    <div className="text-green-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in helicopter development and biomimicry in aviation. Expert on how natural phenomena inspired aircraft design and the evolution of vertical flight technology.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-green-600 hover:text-green-800">About the Author</Link>
                <Link href="/books" className="text-green-600 hover:text-green-800">All Books</Link>
                <Link href="/blog" className="text-green-600 hover:text-green-800">More Articles</Link>
              </div>
            </div>
          </div>
        </section>

      </article>

      {/* Analytics Event Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'blog_view', {
                article_title: 'Sycamore Seeds Helicopter Evolution',
                article_category: 'Helicopter History',
                author: 'Charles E. MacKay',
                reading_time: 12,
                topic: 'Biomimicry Aviation'
              });
            }
          `
        }}
      />
    </div>
  )
}
