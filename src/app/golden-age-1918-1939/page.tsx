import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/Footer'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Golden Age Aviation 1918-1939: Commercial Aviation & Racing Innovation | Charles E. MacKay',
  description: 'Comprehensive guide to aviation\'s Golden Age 1918-1939. Discover commercial aviation growth, Schneider Trophy racing, airline development, aviation innovation between the wars, and the foundation of modern air transport.',
  keywords: [
    'Golden Age aviation',
    'aviation 1918-1939',
    'commercial aviation development',
    'Schneider Trophy racing',
    'airline development',
    'aviation between wars',
    'aviation innovation',
    'civilian aviation',
    'airline industry',
    'aviation progress',
    'air transport development',
    'aviation advancement',
    'commercial flight',
    'aviation industry growth',
    'flying boat era',
    'long distance flights',
    'record breaking flights',
    'Charles MacKay aviation books',
    'aviation history 1918-1939',
    'inter-war aviation'
  ],
  openGraph: {
    title: 'Golden Age Aviation 1918-1939: Commercial Aviation & Racing Innovation',
    description: 'Comprehensive guide to aviation\'s Golden Age - discover how commercial aviation and racing innovation flourished between the wars.',
    url: 'https://charlesmackaybooks.com/golden-age-1918-1939',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/supermarine-s6b-schneider-trophy.jpg',
        width: 1200,
        height: 630,
        alt: 'Golden Age aviation represented by Schneider Trophy racing'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Age Aviation 1918-1939: Commercial Aviation & Racing Innovation',
    description: 'Comprehensive guide to aviation\'s Golden Age - discover how commercial aviation and racing innovation flourished between the wars.',
    images: ['/blog-images/supermarine-s6b-schneider-trophy.jpg'],
  }
}

export default function GoldenAgePage() {
  const pageUrl = 'https://charlesmackaybooks.com/golden-age-1918-1939'
  const pageTitle = 'Golden Age Aviation 1918-1939: Commercial Aviation & Racing Innovation'

  const goldenAgeBooks = [
    {
      id: 'clydeside-aviation-vol2',
      title: 'Clydeside Aviation Volume Two',
      subtitle: 'Between the Wars',
      price: '£15.54',
      description: 'Civilian aviation growth and wartime preparation on the Clyde',
      category: 'Scottish Aviation'
    },
    {
      id: 'mother-of-the-few',
      title: 'Mother of the Few',
      subtitle: 'Lucy Lady Houston',
      price: '£14.52',
      description: 'The woman who saved the Schneider Trophy and enabled Spitfire development',
      category: 'Aviation Biography'
    },
    {
      id: 'beardmore-aviation',
      title: 'Beardmore Aviation',
      subtitle: 'Scottish Industrial Legacy',
      price: '£12.76',
      description: 'The complete story of Scotland\'s aviation empire through peace and war',
      category: 'Industrial History'
    },
    {
      id: 'rohrbach-roland',
      title: 'Rohrbach Roland',
      subtitle: 'German Flying Boat',
      price: '£12.92',
      description: 'Advanced flying boat development between the wars',
      category: 'Aircraft Development'
    }
  ]

  const goldenAgeArticles = [
    {
      slug: 'schneider-trophy-racing-development',
      title: 'Schneider Trophy Racing: High-Speed Innovation',
      excerpt: 'How seaplane racing drove aviation innovation and led directly to Spitfire development.',
      category: 'Racing Development'
    },
    {
      slug: 'lucy-lady-houston-schneider-trophy',
      title: 'Lucy Lady Houston: Aviation\'s Unlikely Hero',
      excerpt: 'How a remarkable woman\'s £100,000 donation saved British aviation supremacy.',
      category: 'Aviation Biography'
    },
    {
      slug: 'clydeside-aviation-between-wars',
      title: 'Clydeside Aviation: Peace to War Transition',
      excerpt: 'Scottish aviation industry adapts from wartime to civilian markets.',
      category: 'Scottish Aviation'
    }
  ]

  return (
    <div className="min-h-screen bg-blue-900">

      <UnifiedSchema
        pageType="page"
        pageTitle={pageTitle}
        pageDescription="Comprehensive guide to aviation's Golden Age - discover how commercial aviation and racing innovation flourished between the wars."
        pageUrl="/golden-age-1918-1939"
      />

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Golden Age Aviation
              <span className="block text-3xl md:text-5xl text-blue-300 font-normal mt-4">
                1918-1939: Between the Wars
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-4xl mx-auto">
              The remarkable era when aviation blossomed from military necessity to commercial reality.
              Discover how airlines, racing, and innovation flourished between the Great War and World War II.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-cyan-300">21 Years</div>
                <div className="text-sm text-gray-300">of Innovation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-blue-300">Commercial</div>
                <div className="text-sm text-gray-300">Aviation Birth</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-purple-300">Racing</div>
                <div className="text-sm text-gray-300">Innovation Drive</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-indigo-300">Airlines</div>
                <div className="text-sm text-gray-300">Global Networks</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#featured-books"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📚 Explore Golden Age Books
              </Link>
              <Link
                href="#timeline"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30"
              >
                ✈️ View Era Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Share removed per design directive */}

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Aviation's Most Glamorous Era</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Golden Age of Aviation, spanning from 1918 to 1939, witnessed the transformation of flying from
                a wartime necessity into a peacetime wonder. These two decades saw the birth of commercial airlines,
                the establishment of international air routes, and technological advances that made flying safer and more reliable.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Record-breaking flights captured public imagination while racing competitions like the Schneider Trophy
                drove innovation that would prove crucial in the coming world war. Airlines connected continents,
                flying boats crossed oceans, and aviation became a symbol of human progress and technological achievement.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Charles E. MacKay's research reveals how this golden period laid the foundation for modern aviation,
                establishing the principles of commercial flight and the technological advances that would define military aviation in WWII.
              </p>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/supermarine-s6b-schneider-trophy.jpg"
                alt="Schneider Trophy racing representing Golden Age aviation innovation"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Golden Age Timeline</h2>

          <div className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">1919</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">First Transatlantic Flight</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Alcock and Brown achieve the first non-stop transatlantic flight in a Vickers Vimy, proving that
                long-distance air travel is possible. This breakthrough inspires the development of commercial aviation
                and international air routes.
              </p>
              <div className="text-sm text-blue-700">
                <strong>Significance:</strong> Demonstrates feasibility of long-distance commercial aviation
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-cyan-500">
              <div className="flex items-center mb-4">
                <span className="bg-cyan-500 text-white px-4 py-2 rounded-full font-bold">1924</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Imperial Airways Founded</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Britain establishes Imperial Airways to connect the British Empire through scheduled air services.
                This marks the beginning of systematic commercial aviation development and international airline operations.
              </p>
              <div className="text-sm text-cyan-700">
                <strong>Significance:</strong> Birth of systematic commercial aviation and international air routes
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold">1927</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Lindbergh's Solo Atlantic Crossing</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Charles Lindbergh's solo flight from New York to Paris in the Spirit of St. Louis captures global attention
                and demonstrates the reliability of modern aircraft. This achievement sparks worldwide enthusiasm for aviation.
              </p>
              <div className="text-sm text-purple-700">
                <strong>Significance:</strong> Global recognition of aviation potential and reliability
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-500">
              <div className="flex items-center mb-4">
                <span className="bg-indigo-500 text-white px-4 py-2 rounded-full font-bold">1931</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Schneider Trophy Victory</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Britain wins permanent possession of the Schneider Trophy with the Supermarine S6B, achieving over 400 mph.
                Lady Houston's £100,000 donation saves the competition and enables technology that leads to the Spitfire.
              </p>
              <div className="text-sm text-indigo-700">
                <strong>Significance:</strong> Racing innovation drives fighter development for WWII
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Golden Age Innovations</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Racing Competition</h3>
              <p className="text-gray-600 text-sm">
                Schneider Trophy and other racing events drive rapid technological advancement
              </p>
            </div>

            <div className="text-center p-6 bg-cyan-50 rounded-xl border border-cyan-200">
              <div className="w-16 h-16 bg-cyan-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Commercial Airlines</h3>
              <p className="text-gray-600 text-sm">
                Scheduled passenger services connect cities and continents worldwide
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Flying Boats</h3>
              <p className="text-gray-600 text-sm">
                Large flying boats enable long-distance ocean crossings and passenger service
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Radio Navigation</h3>
              <p className="text-gray-600 text-sm">
                Radio beacons and navigation aids make all-weather flying possible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Golden Age Aviation Books</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {goldenAgeBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <span className="text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">{book.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{book.title}</h3>
                    <p className="text-lg text-blue-700 mb-3">{book.subtitle}</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{book.price}</span>
                </div>
                <p className="text-gray-700 mb-6 text-sm">{book.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/books/${book.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex-1 text-center text-sm"
                  >
                    📚 View Details
                  </Link>
                  <Link
                    href={`/books/${book.id}#purchase`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    🛒 Buy
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/books"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Complete Book Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Expert Analysis & Articles</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {goldenAgeArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-blue-600 group-hover:text-blue-700 transition-colors">Read Article →</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📖 Read All Expert Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Aviation Achievements Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Record-Breaking Achievements</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🏎️ Speed Records</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1931 Schneider Trophy:</span>
                  <span className="font-bold">407.5 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>Land Speed Record:</span>
                  <span className="font-bold">469 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>Altitude Record:</span>
                  <span className="font-bold">47,352 ft</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌍 Distance Records</h3>
              <div className="space-y-2 text-sm">
                <div>London to Australia: 162 hours</div>
                <div>New York to Paris: 33.5 hours</div>
                <div>Non-stop Distance: 5,652 miles</div>
                <div>Round-the-world: 8 days 15 hours</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">✈️ Commercial Milestones</h3>
              <div className="space-y-2 text-sm">
                <div>First scheduled airline: 1919</div>
                <div>First passenger jet: 1939</div>
                <div>Transatlantic service: 1937</div>
                <div>Regular mail service: 1920</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Era Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Continue Your Aviation Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover how Golden Age innovations enabled the massive aviation expansion of World War II,
            when aircraft production reached unprecedented scales and technology advanced rapidly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/great-war-1914-1918"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              ← Great War Era (1914-1918)
            </Link>
            <Link
              href="/world-war-ii-1939-1945"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              World War II (1939-1945) →
            </Link>
            <Link
              href="/timeline"
              className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-700 transition-colors"
            >
              📅 View Complete Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* Footer removed to avoid duplication; provided by root layout */}
    </div>
  )
}
