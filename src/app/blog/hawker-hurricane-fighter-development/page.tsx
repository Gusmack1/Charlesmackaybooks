import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain | Charles E. MacKay',
  description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain. Discover Sydney Camm\'s masterpiece that truly won Britain\'s finest hour.',
  keywords: [
    'Hawker Hurricane fighter',
    'Battle of Britain Hurricane',
    'Hurricane fighter development',
    'RAF Hurricane',
    'Hurricane vs Spitfire',
    'Hawker Aircraft Hurricane',
    'Hurricane fighter aircraft',
    'WWII Hurricane',
    'Hurricane combat record',
    'British fighter aircraft',
    'Hurricane fighter history',
    'Charles MacKay aviation books',
    'Hurricane production',
    'Sydney Camm designer',
    'Hurricane specifications',
    'Fighter Command Hurricane',
    'Hurricane squadron service',
    'Hurricane Battle of Britain',
    'Hurricane overseas service',
    'Hurricane variants'
  ],
  openGraph: {
    title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
    description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
    url: 'https://charlesmackaybooks.com/blog/hawker-hurricane-fighter-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/hawker-hurricane-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Hawker Hurricane fighter aircraft - the forgotten hero of the Battle of Britain'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
    description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
    images: ['/blog-images/hawker-hurricane-professional.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
  description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain. Discover Sydney Camm\'s masterpiece that truly won Britain\'s finest hour.',
  image: '/blog-images/hawker-hurricane-professional.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in WWII fighter aircraft development and British military aviation',
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
  datePublished: '2025-01-27T10:00:00.000Z',
  dateModified: '2025-01-27T10:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/hawker-hurricane-fighter-development'
  },
  articleSection: 'Aviation History',
  keywords: 'Hawker Hurricane, Battle of Britain, RAF fighter, Sydney Camm',
  wordCount: 2800,
  readingTime: 'PT12M'
}

export default function HawkerHurricaneePage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/hawker-hurricane-fighter-development'
  const pageTitle = 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain'

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
                Hawker Hurricane
                <span className="block text-blue-300">The Forgotten Hero</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The unsung workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain. While the Spitfire claimed the glory, the Hurricane won the war.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>12 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/hawker-hurricane-professional.jpg"
                alt="Hawker Hurricane LF363 in Battle of Britain Memorial Flight livery showing the authentic fighter aircraft that won the Battle of Britain"
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
            <a href="#origins" className="text-blue-700 hover:text-blue-900 py-1">→ Origins and Development</a>
            <a href="#design" className="text-blue-700 hover:text-blue-900 py-1">→ Design Philosophy</a>
            <a href="#production" className="text-blue-700 hover:text-blue-900 py-1">→ Production Success</a>
            <a href="#battle-britain" className="text-blue-700 hover:text-blue-900 py-1">→ Battle of Britain Hero</a>
            <a href="#combat-record" className="text-blue-700 hover:text-blue-900 py-1">→ Combat Record</a>
            <a href="#legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> The Hawker Hurricane shot down 1,593 enemy aircraft during the Battle of Britain—significantly more than the famous Spitfire's 529 victories. Yet history remembers the Hurricane as the "supporting actor" in Britain's finest hour.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            In the pantheon of Second World War fighter aircraft, few have suffered such historical injustice as the Hawker Hurricane. While its stable-mate, the Supermarine Spitfire, captured public imagination and became the symbol of British defiance, it was the Hurricane that bore the brunt of the fighting and emerged as the true victor of the Battle of Britain. This is the story of Sydney Camm's masterpiece—a fighter that combined rugged reliability with devastating effectiveness to save a nation.
          </p>
        </div>

        {/* Origins Section */}
        <section id="origins" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🛠️ Origins and Development (1930-1935)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sydney Camm's Vision</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Hurricane's story begins in 1930 with Sydney Camm, Hawker Aircraft's chief designer, who recognized that the era of biplane fighters was ending. While other manufacturers clung to traditional designs, Camm envisioned a revolutionary monoplane fighter that would combine the structural strength of Hawker's proven construction methods with the speed potential of modern aerodynamics.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Camm's design philosophy was refreshingly practical: create a fighter that could be built quickly, maintained easily, and operated from grass airfields by average pilots. This approach would prove prescient as Britain faced the urgent need to expand Fighter Command in the late 1930s.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Design Specifications (1934)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Maximum Speed: 340+ mph</li>
                  <li>• Service Ceiling: 35,000 feet</li>
                  <li>• Armament: 8 × .303 Browning machine guns</li>
                  <li>• Construction: Steel tube fuselage, fabric covering</li>
                  <li>• Engine: Rolls-Royce Merlin I (1,030 hp)</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/hurricane-development-workshop.jpg"
                alt="Hawker Aircraft factory showing Hurricane development and construction during the 1930s"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Hurricane development at Hawker Aircraft's Kingston-upon-Thames facility, 1935
              </p>
            </div>
          </div>
        </section>

        {/* Design Philosophy Section */}
        <section id="design" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚙️ Design Philosophy: Strength Through Simplicity
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">The Hurricane Advantage</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Strengths</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Stable gun platform:</strong> Exceptional accuracy in combat</li>
                  <li>• <strong>Rapid production:</strong> Steel tube construction allowed fast manufacturing</li>
                  <li>• <strong>Battle damage tolerance:</strong> Fabric-covered rear fuselage absorbed hits</li>
                  <li>• <strong>Easy maintenance:</strong> Designed for field servicing</li>
                  <li>• <strong>Pilot-friendly:</strong> Forgiving handling characteristics</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-amber-700 mb-3">⚡ Trade-offs</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Speed limitation:</strong> Thick wing profile limited top speed</li>
                  <li>• <strong>High-altitude performance:</strong> Less effective above 25,000 feet</li>
                  <li>• <strong>Roll rate:</strong> Heavier ailerons than contemporary fighters</li>
                  <li>• <strong>Aesthetic appeal:</strong> Workmanlike appearance vs. Spitfire elegance</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            These design choices reflected Camm's understanding that air combat success depended more on reliability, maintainability, and pilot confidence than pure performance. The Hurricane's thick wing, while limiting top speed, provided exceptional structural strength and ample space for fuel and ammunition—factors that proved crucial in sustained combat operations.
          </p>
        </section>

        {/* Battle of Britain Section */}
        <section id="battle-britain" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🎯 Battle of Britain: The Hurricane's Finest Hour
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/hawker-hurricane-battle-britain-pilots.jpg"
                alt="RAF pilots of No. 32 Squadron relaxing beside their Hawker Hurricane during the Battle of Britain at Hawkinge"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Pilots of No. 32 Squadron with their Hurricane at Hawkinge during the Battle of Britain, 1940
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Numbers Tell the Story</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-900 mb-3">Battle of Britain Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Hurricane squadrons:</span>
                    <span className="font-semibold">32 operational</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spitfire squadrons:</span>
                    <span className="font-semibold">19 operational</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Hurricane victories:</span>
                    <span className="font-semibold text-green-600">1,593 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spitfire victories:</span>
                    <span className="font-semibold">529 aircraft</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Hurricane percentage:</span>
                    <span className="font-semibold text-green-600">75% of victories</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Hurricane's dominance in the Battle of Britain stemmed from strategic deployment. While Spitfires primarily engaged German fighters, Hurricanes were tasked with attacking the bomber formations—the primary threat to British cities and infrastructure. This unglamorous but vital role required exactly the qualities Camm had built into his design.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">💭 Pilot Testimonial</h3>
            <blockquote className="text-gray-700 italic text-lg leading-relaxed">
              "The Hurricane was the pilot's friend. It would bring you home when a Spitfire wouldn't. You could put burst after burst into a Hurricane and it would keep flying. The fabric rear fuselage was like armor—it absorbed the hits that would have been fatal in an all-metal aircraft."
            </blockquote>
            <cite className="text-sm text-green-700 mt-2 block">— Squadron Leader Peter Townsend, No. 43 Squadron RAF</cite>
          </div>
        </section>

        {/* Combat Record Section */}
        <section id="combat-record" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            📊 Combat Record: Beyond the Battle of Britain
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">14,533</div>
              <div className="text-sm text-gray-600">Total Aircraft Built</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">32</div>
              <div className="text-sm text-gray-600">Countries Operated</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1940-1960</div>
              <div className="text-sm text-gray-600">Service Period</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6">Global Service Record</h3>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">European Theater</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Battle of Britain (1940):</strong> Primary defender of British airspace</li>
                <li>• <strong>Malta Siege (1940-42):</strong> Critical air defense role</li>
                <li>• <strong>Russian Front (1941-45):</strong> 2,952 aircraft delivered to USSR</li>
                <li>• <strong>D-Day (1944):</strong> Ground attack and reconnaissance missions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Other Theaters</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>North Africa (1940-43):</strong> Desert Air Force backbone</li>
                <li>• <strong>Burma Campaign (1941-45):</strong> Jungle warfare adaptation</li>
                <li>• <strong>Battle of Java (1942):</strong> Final defense against Japanese invasion</li>
                <li>• <strong>Post-war Service:</strong> Continued with numerous air forces until 1960s</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 The Hurricane Legacy: More Than Statistics
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Hurricane's greatest achievement was not any single performance metric, but its role as the dependable workhorse that allowed the RAF to transition from peacetime to wartime operations. While the Spitfire represented the pinnacle of fighter design, the Hurricane represented the practical reality of air warfare: that conflicts are won by reliable, producible aircraft that can be operated and maintained under combat conditions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sydney Camm's design philosophy—prioritizing structural integrity, production efficiency, and operational practicality over absolute performance—created an aircraft that could be built in quantity, flown by average pilots, and maintained by ground crews with basic facilities. These qualities, unglamorous though they may seem, proved decisive in Britain's victory.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ Why the Hurricane Matters Today</h3>
            <p className="leading-relaxed mb-4">
              In an era of increasingly complex military systems, the Hurricane reminds us that effectiveness often lies not in cutting-edge technology, but in thoughtful engineering that prioritizes reliability, maintainability, and operational flexibility. The aircraft that saved Britain was not the most glamorous or the fastest—it was the most dependable.
            </p>
            <p className="leading-relaxed">
              The Hurricane's story is ultimately one of unsung heroism: the aircraft, like the pilots who flew it, performed its duty with quiet competence while others claimed the headlines. In the annals of aviation history, this makes it not the forgotten hero, but the truest hero of them all.
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
                      The comprehensive history of British military aviation development, including the foundations that led to Hurricane design.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Mother of the Few
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The untold story of Lady Houston and her crucial role in funding Britain's fighter development program.
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
                Aviation historian specializing in British military aviation and fighter aircraft development. Author of 19 authoritative books on aviation history, with particular expertise in Scottish aviation heritage and WWII fighter operations.
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
                article_title: 'Hawker Hurricane Fighter Development',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 12
              });
            }
          `
        }}
      />
    </div>
  )
}
