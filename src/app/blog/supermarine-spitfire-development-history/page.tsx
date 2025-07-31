import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Supermarine Spitfire Development History: From Racing Seaplanes to Fighter Legend | Charles E. MacKay',
  description: 'The complete development story of the Supermarine Spitfire, from R.J. Mitchell\'s racing seaplanes to the legendary fighter that saved Britain during the Battle of Britain.',
  keywords: 'Supermarine Spitfire development, R.J. Mitchell, Spitfire history, Battle of Britain, British fighter aircraft, WWII aviation, Schneider Trophy, aviation history',
  openGraph: {
    title: 'Supermarine Spitfire Development History: From Racing Seaplanes to Fighter Legend',
    description: 'The complete development story of the Supermarine Spitfire, from R.J. Mitchell\'s racing seaplanes to the legendary fighter that saved Britain.',
    url: 'https://charlesmackaybooks.com/blog/supermarine-spitfire-development-history',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: ['/blog-images/spitfire-prototype-k5054-historical.jpg'],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supermarine Spitfire Development History: From Racing Seaplanes to Fighter Legend',
    description: 'The complete development story of the Supermarine Spitfire, from R.J. Mitchell\'s racing seaplanes to the legendary fighter that saved Britain.',
    images: ['/blog-images/spitfire-prototype-k5054-historical.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Supermarine Spitfire Development History: From Racing Seaplanes to Fighter Legend',
  description: 'The complete development story of the Supermarine Spitfire, from R.J. Mitchell\'s racing seaplanes to the legendary fighter that saved Britain.',
  image: '/blog-images/spitfire-prototype-k5054-historical.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in British fighter aircraft development and WWII aviation history',
    url: 'https://charlesmackaybooks.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/british-aircraft-great-war.jpg',
    },
  },
  datePublished: '2025-01-27',
  dateModified: '2025-01-27',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/supermarine-spitfire-development-history',
  },
  articleSection: 'Aviation History',
  keywords: 'Supermarine Spitfire, R.J. Mitchell, Schneider Trophy, British fighter aircraft',
  wordCount: 2500,
  readingTime: 'PT10M'
}

export default function SpitfireDevelopmentHistoryPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/supermarine-spitfire-development-history'
  const pageTitle = 'Supermarine Spitfire Development History: From Racing Seaplanes to Fighter Legend'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Supermarine Spitfire
                <span className="block text-emerald-300">From Racing to Legend</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The extraordinary development story of R.J. Mitchell's masterpiece, from Schneider Trophy racing heritage to the legendary fighter that saved Britain during the Battle of Britain.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>10 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/spitfire-prototype-k5054-historical.jpg"
                alt="Supermarine Spitfire prototype K5054 in flight showing R.J. Mitchell's revolutionary fighter design that evolved from racing seaplanes"
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
          <SocialShare url={pageUrl} title={pageTitle} description={metadata.description || ''} />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">

        {/* Table of Contents */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#racing-heritage" className="text-emerald-700 hover:text-emerald-900 py-1">→ Racing Heritage</a>
            <a href="#mitchell-genius" className="text-emerald-700 hover:text-emerald-900 py-1">→ Mitchell's Genius</a>
            <a href="#prototype-k5054" className="text-emerald-700 hover:text-emerald-900 py-1">→ Prototype K5054</a>
            <a href="#battle-britain" className="text-emerald-700 hover:text-emerald-900 py-1">→ Battle of Britain</a>
            <a href="#production-evolution" className="text-emerald-700 hover:text-emerald-900 py-1">→ Production Evolution</a>
            <a href="#lasting-legacy" className="text-emerald-700 hover:text-emerald-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> The Spitfire's development directly descended from R.J. Mitchell's Schneider Trophy racing seaplanes, with the S.6B's world speed record experience directly informing the fighter's revolutionary design philosophy.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The Supermarine Spitfire stands as perhaps the most iconic fighter aircraft in aviation history, yet its origins lie not in military specification but in the pursuit of pure speed. R.J. Mitchell's revolutionary design emerged from a decade of racing seaplane development, transforming the lessons learned from Schneider Trophy victories into a fighter that would prove decisive in Britain's darkest hour.
          </p>
        </div>

        {/* Racing Heritage Section */}
        <section id="racing-heritage" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏆 Racing Heritage: The Schneider Trophy Foundation
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/supermarine-s6b-schneider-trophy.jpg"
                alt="Supermarine S.6B racing seaplane that won the Schneider Trophy and influenced Spitfire development"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Supermarine S.6B - The Schneider Trophy winner that laid the foundation for Spitfire development
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">From Racing to War</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Spitfire's genealogy traces directly back to R.J. Mitchell's series of Schneider Trophy racing seaplanes. The S.4, S.5, S.6, and S.6B progressively refined the aerodynamic and structural concepts that would culminate in the fighter design.
              </p>

              <div className="bg-emerald-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-emerald-800 mb-2">Schneider Trophy Achievements</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1927:</strong> S.5 wins at 281.65 mph</li>
                  <li>• <strong>1929:</strong> S.6 wins at 328.63 mph</li>
                  <li>• <strong>1931:</strong> S.6B wins at 340.08 mph</li>
                  <li>• <strong>1931:</strong> S.6B sets world record at 407.5 mph</li>
                  <li>• <strong>Trophy won outright</strong> for Britain</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Each racing iteration pushed the boundaries of aerodynamic efficiency, engine cooling, and structural design. The knowledge gained from operating at extreme speeds and stresses provided Mitchell with unparalleled insight into high-performance aircraft design.
              </p>
            </div>
          </div>
        </section>

        {/* Production Evolution Section */}
        <section id="production-evolution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏭 Production Evolution: From Prototype to Legend
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">The Castle Bromwich Success</h3>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Production Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Production:</span>
                    <span className="font-semibold text-emerald-600">20,351 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Castle Bromwich:</span>
                    <span className="font-semibold">11,693 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supermarine:</span>
                    <span className="font-semibold">7,114 aircraft</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Peak Monthly Production:</span>
                    <span className="font-semibold text-emerald-600">320 aircraft (1944)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The establishment of the Castle Bromwich factory represented a triumph of industrial organization. From a standing start in 1940, the facility became the world's largest fighter aircraft production line, demonstrating the scalability of Mitchell's design.
              </p>
            </div>

            <div>
              <Image
                src="/blog-images/spitfire-castle-bromwich-production.jpg"
                alt="Castle Bromwich Spitfire production line showing mass production of the legendary fighter aircraft"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Castle Bromwich production line - The industrial achievement that turned Mitchell's design into Britain's shield
              </p>
            </div>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/british-aircraft-great-war" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/british-aircraft-great-war.jpg"
                    alt="British Aircraft of the Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      British Aircraft of the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The comprehensive history of British military aviation development, laying the groundwork for Spitfire innovation.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/mother-of-the-few" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/mother-of-the-few.jpg"
                    alt="Mother of the Few book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Mother of the Few
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Lady Houston's crucial funding of the Schneider Trophy program that enabled Spitfire development.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in British fighter aircraft development and WWII aviation history. Author of authoritative works on the Spitfire's development and the technological evolution from racing seaplanes to military fighters.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-emerald-600 hover:text-emerald-800">About the Author</Link>
                <Link href="/books" className="text-emerald-600 hover:text-emerald-800">All Books</Link>
                <Link href="/blog" className="text-emerald-600 hover:text-emerald-800">More Articles</Link>
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
                article_title: 'Supermarine Spitfire Development History',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 10
              });
            }
          `
        }}
      />
    </div>
  )
}
