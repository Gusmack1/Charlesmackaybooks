import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/Footer'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Pioneer Era Aviation 1895-1914: From Dreams to Flight | Charles E. MacKay',
  description: 'Comprehensive guide to aviation\'s Pioneer Era 1895-1914. Discover Percy Pilcher\'s Scottish experiments, Wright Brothers\' breakthrough, early aircraft development, and the visionaries who made human flight reality.',
  keywords: [
    'Pioneer Era aviation',
    'early aviation history',
    'Percy Pilcher gliders',
    'Wright Brothers first flight',
    'aviation pioneers 1895-1914',
    'early aircraft development',
    'first powered flight',
    'aviation experiments',
    'glider development',
    'Scottish aviation pioneers',
    'early flying machines',
    'aviation innovation',
    'pioneer aircraft',
    'flight experiments',
    'early aviators',
    'aviation breakthrough',
    'powered flight development',
    'Charles MacKay aviation books',
    'aviation history 1895-1914',
    'pioneering aviation'
  ],
  openGraph: {
    title: 'Pioneer Era Aviation 1895-1914: From Dreams to Flight',
    description: 'Comprehensive guide to aviation\'s Pioneer Era - discover the visionaries who transformed human flight from dream to reality.',
    url: 'https://charlesmackaybooks.com/pioneer-era-1895-1914',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/percy-pilcher-hawk-glider.jpg',
        width: 1200,
        height: 630,
        alt: 'Percy Pilcher with Hawk glider representing aviation\'s Pioneer Era'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pioneer Era Aviation 1895-1914: From Dreams to Flight',
    description: 'Comprehensive guide to aviation\'s Pioneer Era - discover the visionaries who transformed human flight from dream to reality.',
    images: ['/blog-images/percy-pilcher-hawk-glider.jpg'],
  }
}

export default function PioneerEraPage() {
  const pageUrl = 'https://charlesmackaybooks.com/pioneer-era-1895-1914'
  const pageTitle = 'Pioneer Era Aviation 1895-1914: From Dreams to Flight'

  const pioneerBooks = [
    {
      id: 'soaring-with-wings',
      title: 'Soaring with Wings',
      subtitle: 'Percy Pilcher wants to Fly',
      price: '£15.01',
      description: 'The untold story of Scotland\'s forgotten aviation pioneer',
      category: 'Pioneer Biography'
    },
    {
      id: 'beardmore-aviation',
      title: 'Beardmore Aviation',
      subtitle: 'Early Scottish Aviation',
      price: '£12.76',
      description: 'William Beardmore\'s pioneering entry into aviation manufacturing',
      category: 'Early Industry'
    }
  ]

  const pioneerArticles = [
    {
      slug: 'percy-pilcher-scotland-aviation-pioneer',
      title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer',
      excerpt: 'The Scottish pioneer whose gliding experiments nearly achieved powered flight before the Wright Brothers.',
      category: 'Biography'
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      <UnifiedSchema
        pageType="page"
        pageTitle={pageTitle}
        pageDescription="Comprehensive guide to aviation's Pioneer Era - discover the visionaries who transformed human flight from dream to reality."
        pageUrl="/pioneer-era-1895-1914"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Pioneer Era
              <span className="block text-3xl md:text-5xl text-amber-300 font-normal mt-4">
                1895-1914: Dreams Take Flight
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-4xl mx-auto">
              The extraordinary two decades when human flight transformed from impossible dream to reality.
              Discover the visionaries, experiments, and breakthroughs that launched the aviation age.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-amber-300">19 Years</div>
                <div className="text-sm text-gray-300">of Innovation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-orange-300">1903</div>
                <div className="text-sm text-gray-300">First Powered Flight</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-300">Global</div>
                <div className="text-sm text-gray-300">Pioneer Movement</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#featured-books"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📚 Explore Pioneer Books
              </Link>
              <Link
                href="#timeline"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30"
              >
                📅 View Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Share */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-6">
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover aviation's Pioneer Era - the extraordinary period when human flight became reality"
          />
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Age of Aviation Pioneers</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Pioneer Era of aviation, spanning from 1895 to 1914, represents humanity's greatest leap into the unknown.
                This extraordinary period witnessed the transformation of flight from ancient dream to modern reality through the
                courage, ingenuity, and determination of remarkable individuals.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From Percy Pilcher's Scottish gliding experiments to the Wright Brothers' historic first powered flight,
                these nineteen years of innovation established the foundation for all subsequent aviation development.
                Every modern aircraft can trace its lineage back to the breakthrough achievements of these pioneering years.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Charles E. MacKay's research reveals the untold stories of aviation's earliest pioneers, including forgotten
                figures whose contributions shaped the development of human flight.
              </p>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/percy-pilcher-hawk-glider.jpg"
                alt="Percy Pilcher with Hawk glider representing aviation's Pioneer Era"
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
      <section id="timeline" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Pioneer Era Timeline</h2>

          <div className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-amber-500">
              <div className="flex items-center mb-4">
                <span className="bg-amber-500 text-white px-4 py-2 rounded-full font-bold">1895</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Percy Pilcher Begins Aviation Experiments</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Percy Pilcher, working at Glasgow University, builds his first hang glider "The Bat" and begins systematic
                aviation experiments in Scotland. His correspondence with Otto Lilienthal establishes international collaboration
                in early aviation development.
              </p>
              <div className="text-sm text-amber-700">
                <strong>Significance:</strong> First systematic aviation experiments in Scotland, predating Wright Brothers by 8 years
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">1897</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">World Distance Record</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Percy Pilcher achieves a world distance record of 250 meters flying his glider "Hawk" at Stanford Hall.
                This achievement demonstrates the viability of controlled heavier-than-air flight and establishes gliding
                as a practical approach to aviation development.
              </p>
              <div className="text-sm text-orange-700">
                <strong>Significance:</strong> First world aviation record, proving feasibility of controlled flight
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">1903</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Wright Brothers First Powered Flight</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Orville and Wilbur Wright achieve the first powered, sustained, and controlled heavier-than-air human flight
                at Kitty Hawk, North Carolina. This historic 12-second flight marks the beginning of the aviation age and
                validates years of pioneering work by aviation experimenters worldwide.
              </p>
              <div className="text-sm text-red-700">
                <strong>Significance:</strong> First powered flight - the achievement that launched the aviation age
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-amber-600">
              <div className="flex items-center mb-4">
                <span className="bg-amber-600 text-white px-4 py-2 rounded-full font-bold">1909</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Aviation Manufacturing Begins</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Following successful aviation demonstrations across Europe, industrial interest in aircraft manufacturing
                emerges. Companies like Beardmore in Scotland begin investigating aviation opportunities, laying the
                foundation for the aviation industry.
              </p>
              <div className="text-sm text-amber-700">
                <strong>Significance:</strong> Beginning of commercial aviation industry development
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Pioneer Era Books</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {pioneerBooks.map((book) => (
              <div key={book.id} className="bg-amber-50 rounded-xl p-8 border border-amber-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <span className="text-sm bg-amber-200 text-amber-800 px-3 py-1 rounded-full">{book.category}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{book.title}</h3>
                    <p className="text-lg text-amber-700 mb-3">{book.subtitle}</p>
                  </div>
                  <span className="text-3xl font-bold text-green-600">{book.price}</span>
                </div>
                <p className="text-gray-700 mb-6">{book.description}</p>
                <div className="flex gap-3">
                  <Link
                    href={`/books/${book.id}`}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex-1 text-center"
                  >
                    📚 View Book Details
                  </Link>
                  <Link
                    href={`/books/${book.id}#purchase`}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    🛒 Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/books"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Complete Book Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Articles Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Expert Articles & Analysis</h2>

          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {pioneerArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm bg-amber-200 text-amber-800 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-amber-600 group-hover:text-amber-700 transition-colors">Read Article →</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📖 Read All Expert Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Pioneer Era Visionaries</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Percy Pilcher</h3>
              <p className="text-amber-700 font-medium mb-3">Scottish Pioneer (1866-1899)</p>
              <p className="text-gray-600 text-sm">
                Scotland's forgotten aviation pioneer whose gliding experiments and powered aircraft designs could have
                achieved first flight before the Wright Brothers.
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🇺🇸</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wright Brothers</h3>
              <p className="text-amber-700 font-medium mb-3">American Pioneers (1871-1948, 1867-1912)</p>
              <p className="text-gray-600 text-sm">
                Orville and Wilbur Wright achieved the first powered, sustained, and controlled heavier-than-air human
                flight, launching the aviation age.
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🇩🇪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Otto Lilienthal</h3>
              <p className="text-amber-700 font-medium mb-3">German Pioneer (1848-1896)</p>
              <p className="text-gray-600 text-sm">
                The "Flying Man" whose systematic gliding experiments and publications inspired aviation pioneers
                worldwide, including Percy Pilcher and the Wright Brothers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Era Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Continue Your Aviation Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover how the Pioneer Era's innovations led to the dramatic developments of the Great War period,
            when aviation evolved from experimental machines to military weapons.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/great-war-1914-1918"
              className="bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              ✈️ Great War Era (1914-1918) →
            </Link>
            <Link
              href="/timeline"
              className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-amber-700 transition-colors"
            >
              📅 View Complete Timeline
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
