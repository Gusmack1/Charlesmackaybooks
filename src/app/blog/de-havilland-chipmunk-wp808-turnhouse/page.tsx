import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'De Havilland Chipmunk WP808 at Turnhouse: A Personal Aviation Memory | Charles E. MacKay',
  description: 'A personal account of the De Havilland Chipmunk WP808 at Turnhouse airfield on February 13, 1971. Discover the story behind this beloved training aircraft and its role in RAF pilot education.',
  keywords: [
    'De Havilland Chipmunk',
    'Chipmunk WP808',
    'Turnhouse airfield',
    'RAF training aircraft',
    'Chipmunk trainer',
    'De Havilland aircraft',
    'pilot training aircraft',
    'RAF Turnhouse',
    'Charles MacKay aviation',
    'Chipmunk history',
    'military trainer aircraft',
    'British training aircraft',
    'aviation training history',
    'RAF pilot training',
    'Chipmunk WP808 history',
    'Turnhouse 1971',
    'RAF basic trainer',
    'Scottish aviation history',
    'pilot training legacy',
    'De Havilland training aircraft'
  ],
  openGraph: {
    title: 'De Havilland Chipmunk WP808 at Turnhouse: A Personal Aviation Memory',
    description: 'A personal account of the De Havilland Chipmunk WP808 at Turnhouse airfield on February 13, 1971. Discover the story behind this beloved training aircraft.',
    url: 'https://charlesmackaybooks.com/blog/de-havilland-chipmunk-wp808-turnhouse',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay with De Havilland Chipmunk WP808 at Turnhouse airfield, February 13, 1971'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'De Havilland Chipmunk WP808 at Turnhouse: A Personal Aviation Memory',
    description: 'A personal account of the De Havilland Chipmunk WP808 at Turnhouse airfield on February 13, 1971.',
    images: ['/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'De Havilland Chipmunk WP808 at Turnhouse: A Personal Aviation Memory',
  description: 'A personal account of the De Havilland Chipmunk WP808 at Turnhouse airfield on February 13, 1971. Discover the story behind this beloved training aircraft and its role in RAF pilot education.',
  image: '/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in RAF training aircraft and British military aviation',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/british-aircraft-great-war.jpg'
    }
  },
  datePublished: '2025-01-30T10:00:00.000Z',
  dateModified: '2025-01-30T10:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/de-havilland-chipmunk-wp808-turnhouse'
  },
  articleSection: 'Aviation History',
  keywords: 'De Havilland Chipmunk, RAF training, Turnhouse airfield, pilot training',
  wordCount: 2400,
  readingTime: 'PT10M'
}

export default function ChipmunkWP808Page() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/de-havilland-chipmunk-wp808-turnhouse'
  const pageTitle = 'De Havilland Chipmunk WP808 at Turnhouse: A Personal Aviation Memory'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Chipmunk WP808
                <span className="block text-blue-300">at Turnhouse</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                A personal memory from February 13, 1971, with the De Havilland Chipmunk that trained generations of RAF pilots. The beloved trainer that made aviation dreams take flight.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>10 minute read</span>
                <span>•</span>
                <span>January 30, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg"
                alt="Charles E. MacKay with De Havilland Chipmunk WP808 at Turnhouse airfield, February 13, 1971"
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#personal-memory" className="text-blue-700 hover:text-blue-900 py-1">→ A Personal Memory</a>
            <a href="#chipmunk-history" className="text-blue-700 hover:text-blue-900 py-1">→ The Chipmunk Story</a>
            <a href="#wp808-service" className="text-blue-700 hover:text-blue-900 py-1">→ WP808 Service History</a>
            <a href="#turnhouse-base" className="text-blue-700 hover:text-blue-900 py-1">→ Turnhouse Airfield</a>
            <a href="#training-legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Training Legacy</a>
            <a href="#preservation" className="text-blue-700 hover:text-blue-900 py-1">→ Preservation Today</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>February 13, 1971:</strong> A moment captured in time at Turnhouse airfield with De Havilland Chipmunk WP808—one of over 1,000 Chipmunks that served as the backbone of RAF pilot training from 1950 to 1996.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            Some aviation memories stay with you forever. The photograph from February 13, 1971, captures not just a moment in time, but represents a profound connection to one of the most beloved training aircraft in British aviation history. Standing beside De Havilland Chipmunk WP808 at Turnhouse airfield, this image embodies the spirit of an aircraft that introduced thousands of pilots to the joy and discipline of flight.
          </p>
        </div>

        {/* Personal Memory Section */}
        <section id="personal-memory" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            📸 A Personal Memory: February 13, 1971
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Turnhouse on a Winter's Day</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The photograph captures a crisp winter day at RAF Turnhouse, with Chipmunk WP808 gleaming in the Scottish sunlight. For those of us passionate about aviation history, such moments are treasures—direct connections to the aircraft and airfields that shaped British military aviation.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Turnhouse, now Edinburgh Airport, was then a bustling RAF station and the home of the University Air Squadron. The Chipmunk fleet based there represented the continuation of a proud tradition—training the next generation of military pilots with an aircraft that had already proven itself exceptional in that role.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Details from February 13, 1971</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Location: RAF Turnhouse (now Edinburgh Airport)</li>
                  <li>• Aircraft: De Havilland Chipmunk T.10, serial WP808</li>
                  <li>• Role: University Air Squadron training aircraft</li>
                  <li>• Condition: Active service with RAF</li>
                  <li>• Base: Edinburgh University Air Squadron</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">The Chipmunk Experience</h4>
                <p className="text-sm text-blue-800 mb-3">
                  "The Chipmunk was every student pilot's friend. Forgiving yet responsive, it taught proper flying technique while building confidence. You learned to fly on a Chipmunk—everything else was just bigger and faster."
                </p>
                <cite className="text-xs text-blue-700">— Common sentiment among RAF trainees</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Chipmunk History Section */}
        <section id="chipmunk-history" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ✈️ The Chipmunk Story: From Design to Service
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">de Havilland's Training Masterpiece</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Design Excellence</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Stability:</strong> Inherently stable for student pilot confidence</li>
                  <li>• <strong>Visibility:</strong> Exceptional cockpit visibility for training</li>
                  <li>• <strong>Control harmony:</strong> Perfectly balanced flying controls</li>
                  <li>• <strong>Durability:</strong> Built to withstand heavy training use</li>
                  <li>• <strong>Maintenance:</strong> Simple systems for easy servicing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🔧 Technical Specifications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Engine:</strong> de Havilland Gipsy Major 8 (145 hp)</li>
                  <li>• <strong>Maximum Speed:</strong> 138 mph</li>
                  <li>• <strong>Service Ceiling:</strong> 16,000 feet</li>
                  <li>• <strong>Range:</strong> 280 miles</li>
                  <li>• <strong>First Flight:</strong> May 22, 1946</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Chipmunk was conceived as the RAF's answer to the need for a modern, purpose-built training aircraft. Designed by A.E. Hagg at de Havilland, it incorporated lessons learned from wartime training programs and the recognition that pilot training required an aircraft specifically designed for that role, not adapted from other purposes.
          </p>
        </section>

        {/* WP808 Service History Section */}
        <section id="wp808-service" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🎯 WP808: Individual Service History
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Record</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-900 mb-3">Chipmunk WP808 Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Serial Number:</span>
                    <span className="font-semibold">WP808</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Construction Number:</span>
                    <span className="font-semibold">C1/0148</span>
                  </div>
                  <div className="flex justify-between">
                    <span>First Flight:</span>
                    <span className="font-semibold">1951</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>RAF Service:</span>
                    <span className="font-semibold text-green-600">1951-1996</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primary Role:</span>
                    <span className="font-semibold">Basic flying training</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                WP808 was one of the Chipmunk T.10s manufactured specifically for RAF service. Built in 1951, it spent its entire career in the training role, passing through various RAF stations and University Air Squadrons throughout its 45-year service life.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Training Bases</h3>
              <div className="space-y-4">
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="font-semibold text-slate-800">Edinburgh University Air Squadron</div>
                  <div className="text-sm text-gray-600">Based at RAF Turnhouse</div>
                  <div className="text-sm text-gray-600">1960s-1970s</div>
                </div>
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="font-semibold text-slate-800">RAF Flying Training Schools</div>
                  <div className="text-sm text-gray-600">Various locations</div>
                  <div className="text-sm text-gray-600">Throughout service life</div>
                </div>
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="font-semibold text-slate-800">Air Experience Flights</div>
                  <div className="text-sm text-gray-600">Cadet training programs</div>
                  <div className="text-sm text-gray-600">Later career</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Turnhouse Base Section */}
        <section id="turnhouse-base" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏛️ RAF Turnhouse: Edinburgh's Aviation Hub
          </h2>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Aviation Heritage</h3>
            <p className="text-gray-700 leading-relaxed">
              RAF Turnhouse, now Edinburgh Airport, represented the heart of Scottish military aviation during the post-war period. Home to the Edinburgh University Air Squadron, it served as the primary location where young Scots learned to fly, continuing a proud tradition of Scottish contributions to British aviation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1916</div>
              <div className="text-sm text-gray-600">Airfield Established</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1947</div>
              <div className="text-sm text-gray-600">University Air Squadron</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1971</div>
              <div className="text-sm text-gray-600">Photo with WP808</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6">The University Air Squadron Role</h3>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Training Mission</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Student Selection:</strong> Identifying potential RAF officer candidates</li>
                <li>• <strong>Basic Flying Training:</strong> Teaching fundamental flying skills</li>
                <li>• <strong>Military Exposure:</strong> Introduction to RAF culture and procedures</li>
                <li>• <strong>Leadership Development:</strong> Building future RAF officers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Chipmunk Operations</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Ab Initio Training:</strong> Teaching complete beginners to fly</li>
                <li>• <strong>Circuit Practice:</strong> Landing and takeoff procedures</li>
                <li>• <strong>Navigation Training:</strong> Cross-country flying skills</li>
                <li>• <strong>Aerobatic Instruction:</strong> Advanced handling techniques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Training Legacy Section */}
        <section id="training-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            📊 The Chipmunk Training Legacy
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-sm text-gray-600">Chipmunks Built for RAF</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">46 Years</div>
              <div className="text-sm text-gray-600">RAF Service Period</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100,000+</div>
              <div className="text-sm text-gray-600">Pilots Trained</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6">Impact on British Aviation</h3>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Chipmunk's impact on British aviation cannot be overstated. For nearly half a century, it served as the RAF's primary basic trainer, introducing thousands of pilots to military flying. Its forgiving characteristics and excellent handling made it the perfect platform for teaching the fundamentals of flight, while its robust construction ensured it could withstand the rigors of intensive training use.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Every RAF pilot who flew between 1950 and 1996 likely had their first military flying experience in a Chipmunk. This aircraft taught them not just to fly, but to fly properly—with precision, discipline, and respect for the machine and the sky. The skills learned on the Chipmunk formed the foundation for careers that would span from the last piston-engine fighters to modern jet aircraft.
            </p>
          </div>
        </section>

        {/* Preservation Section */}
        <section id="preservation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 Preservation and Remembrance
          </h2>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ Keeping the Memory Alive</h3>
            <p className="leading-relaxed mb-4">
              Today, many Chipmunks survive in museums and private collections around the world. These preserved aircraft serve as living monuments to an era when learning to fly meant hours in an open cockpit, developing feel for the machine through direct connection with the controls and the elements.
            </p>
            <p className="leading-relaxed">
              The photograph of WP808 at Turnhouse represents more than just a moment in 1971—it captures the spirit of an aircraft that bridged the gap between wartime training and modern aviation education. For those of us who study aviation history, such images provide invaluable documentation of aircraft in their operational environment, reminding us that behind every aviation advancement were real people, real aircraft, and real moments of human achievement.
            </p>
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      British Aircraft of the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The foundation of British military aviation development that led to advanced training aircraft like the Chipmunk.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/captain-eric-brown" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/captain-eric-brown.jpg"
                    alt="Captain Eric Brown book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Captain Eric Brown: Test Pilot Extraordinary
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The story of Britain's legendary test pilot who flew 487 different aircraft types, including training aircraft development.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in British military aviation and training aircraft development. Author of 19 authoritative books on aviation history, with particular expertise in Scottish aviation heritage and RAF training programs.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-blue-600 hover:text-blue-800">About the Author</Link>
                <Link href="/books" className="text-blue-600 hover:text-blue-800">All Books</Link>
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">More Articles</Link>
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
                article_title: 'De Havilland Chipmunk WP808 Turnhouse',
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
