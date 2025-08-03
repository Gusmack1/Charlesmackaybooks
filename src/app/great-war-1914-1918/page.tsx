import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/Footer'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Great War Aviation 1914-1918: RFC, RNAS & Birth of RAF | Charles E. MacKay',
  description: 'Comprehensive guide to Great War aviation 1914-1918. Discover RFC & RNAS operations, Sopwith Camel, SE5a, German aircraft, Western Front air warfare, and the birth of the Royal Air Force.',
  keywords: [
    'Great War aviation',
    'WWI aircraft',
    'Royal Flying Corps',
    'Royal Naval Air Service',
    'RAF formation',
    'Sopwith Camel',
    'SE5a fighter',
    'Bristol Fighter',
    'German WWI aircraft',
    'Western Front aviation',
    'WWI air warfare',
    'British WWI fighters',
    'German fighters WWI',
    'aerial warfare development',
    'military aviation WWI',
    'fighter pilots WWI',
    'bomber aircraft WWI',
    'reconnaissance aircraft',
    'Charles MacKay aviation books',
    'aviation history 1914-1918'
  ],
  openGraph: {
    title: 'Great War Aviation 1914-1918: RFC, RNAS & Birth of RAF',
    description: 'Comprehensive guide to Great War aviation - discover how WWI transformed aircraft from reconnaissance tools to fighters and bombers.',
    url: 'https://charlesmackaybooks.com/great-war-1914-1918',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/sopwith-camel-historical-1918.jpg',
        width: 1200,
        height: 630,
        alt: 'Sopwith Camel representing Great War aviation development'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Great War Aviation 1914-1918: RFC, RNAS & Birth of RAF',
    description: 'Comprehensive guide to Great War aviation - discover how WWI transformed aircraft from reconnaissance tools to fighters and bombers.',
    images: ['/blog-images/sopwith-camel-historical-1918.jpg'],
  }
}

export default function GreatWarPage() {
  const pageUrl = 'https://charlesmackaybooks.com/great-war-1914-1918'
  const pageTitle = 'Great War Aviation 1914-1918: RFC, RNAS & Birth of RAF'

  const warBooks = [
    {
      id: 'british-aircraft-great-war',
      title: 'British Aircraft of the Great War',
      subtitle: 'RFC & RNAS Development',
      price: '£12.91',
      description: 'Comprehensive guide to British WWI aircraft and operations',
      category: 'British Aviation'
    },
    {
      id: 'german-aircraft-great-war',
      title: 'German Aircraft in the Great War',
      subtitle: '1914-1918',
      price: '£13.93',
      description: 'The complete story of German military aviation',
      category: 'German Aviation'
    },
    {
      id: 'clydeside-aviation-vol1',
      title: 'Clydeside Aviation Volume One',
      subtitle: 'The Great War',
      price: '£16.08',
      description: 'Aviation activities on the Clyde during WWI',
      category: 'Scottish Aviation'
    }
  ]

  const warArticles = [
    {
      slug: 'british-aircraft-great-war-rfc-rnas',
      title: 'British Aircraft Great War: RFC & RNAS Development',
      excerpt: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters.',
      category: 'British Aviation'
    },
    {
      slug: 'german-aircraft-great-war-development',
      title: 'German Aircraft Great War Development',
      excerpt: 'Revolutionary German aviation development from Albatros to Fokker.',
      category: 'German Aviation'
    },
    {
      slug: 'beardmore-aviation-scottish-industrial-giant',
      title: 'Beardmore Aviation: Great War Production',
      excerpt: 'How Scottish shipbuilders became aircraft manufacturers during WWI.',
      category: 'Scottish Aviation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">

      <UnifiedSchema
        pageType="page"
        pageTitle={pageTitle}
        pageDescription="Comprehensive guide to Great War aviation - discover how WWI transformed aircraft from reconnaissance tools to fighters and bombers."
        pageUrl="/great-war-1914-1918"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-crimson-700 to-rose-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Great War Aviation
              <span className="block text-3xl md:text-5xl text-red-300 font-normal mt-4">
                1914-1918: Warfare Transformed
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-4xl mx-auto">
              Four years that revolutionized aviation forever. From reconnaissance scouts to deadly fighters,
              discover how the Great War transformed aircraft into weapons of war and created modern air power.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-300">4 Years</div>
                <div className="text-sm text-gray-300">of Revolution</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-orange-300">RFC to RAF</div>
                <div className="text-sm text-gray-300">Service Evolution</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-rose-300">Air Supremacy</div>
                <div className="text-sm text-gray-300">New Doctrine</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-400">Global</div>
                <div className="text-sm text-gray-300">Industrial Impact</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#featured-books"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📚 Explore War Aviation Books
              </Link>
              <Link
                href="#timeline"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30"
              >
                ⚔️ View War Timeline
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
            description="Discover how the Great War transformed aviation from reconnaissance to air supremacy"
          />
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Aviation's Crucible of War</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Great War of 1914-1918 transformed aviation from a fledgling technology into a decisive military
                weapon. In just four years, aircraft evolved from fragile reconnaissance machines into sophisticated
                fighters, bombers, and specialized military platforms that would define aerial warfare for generations.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Royal Flying Corps and Royal Naval Air Service pioneered British air power, developing legendary
                aircraft like the Sopwith Camel, SE5a, and Bristol Fighter. Meanwhile, German innovation produced
                the feared Albatros fighters and Fokker triplanes that challenged Allied air supremacy.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Charles E. MacKay's extensive research reveals how this period of unprecedented innovation established
                the foundations of modern air power and created the Royal Air Force as the world's first independent air service.
              </p>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/sopwith-camel-historical-1918.jpg"
                alt="Sopwith Camel representing Great War aviation development"
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
      <section id="timeline" className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Great War Aviation Timeline</h2>

          <div className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">August 1914</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">War Begins - Aviation Mobilizes</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The Royal Flying Corps deploys to France with 37 aircraft for reconnaissance duties. Aircraft are
                viewed primarily as "eyes of the army" for observing enemy positions. The RNAS begins naval aviation
                operations, establishing the dual-service structure that would dominate British aviation.
              </p>
              <div className="text-sm text-red-700">
                <strong>Significance:</strong> First military deployment of organized aviation forces in warfare
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">1915</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">The Fighter Revolution</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Introduction of synchronized machine guns creates the first true fighter aircraft. The "Fokker Scourge"
                demonstrates German technological superiority, prompting urgent Allied fighter development. Air combat
                evolves from individual encounters to organized fighter tactics.
              </p>
              <div className="text-sm text-orange-700">
                <strong>Significance:</strong> Birth of air-to-air combat and fighter aircraft doctrine
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500">
              <div className="flex items-center mb-4">
                <span className="bg-rose-500 text-white px-4 py-2 rounded-full font-bold">1916-1917</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">British Fighter Supremacy</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The Sopwith Pup, Triplane, and SE5a establish British air superiority. Coordinated fighter tactics,
                improved training, and superior aircraft design overcome German advantages. Large-scale air battles
                become commonplace over the Western Front.
              </p>
              <div className="text-sm text-rose-700">
                <strong>Significance:</strong> Allied air supremacy enables ground offensive operations
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-600">
              <div className="flex items-center mb-4">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">April 1918</span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Birth of the Royal Air Force</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The RFC and RNAS merge to form the Royal Air Force - the world's first independent air service.
                This organizational innovation recognizes aviation as a distinct form of warfare requiring specialized
                leadership, doctrine, and resources.
              </p>
              <div className="text-sm text-red-700">
                <strong>Significance:</strong> Creation of independent air power as a military service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Development Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Legendary Aircraft of the Great War</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">🇬🇧 British Fighters</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Sopwith Camel - 1,294 victories</li>
                <li>• Royal Aircraft Factory SE5a</li>
                <li>• Sopwith Pup & Triplane</li>
                <li>• Bristol F2B Fighter</li>
                <li>• Sopwith Snipe</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🇩🇪 German Fighters</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Albatros D.III & D.Va</li>
                <li>• Fokker Dr.I Triplane</li>
                <li>• Fokker D.VII</li>
                <li>• Pfalz D.III</li>
                <li>• Halberstadt D.II</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3">🎯 Reconnaissance</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Royal Aircraft Factory BE2</li>
                <li>• Armstrong Whitworth FK8</li>
                <li>• Rumpler C.IV</li>
                <li>• Albatros C.III</li>
                <li>• DFW C.V</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Great War Aviation Books</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {warBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl p-8 border border-red-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <span className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded-full">{book.category}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{book.title}</h3>
                    <p className="text-lg text-red-700 mb-3">{book.subtitle}</p>
                  </div>
                  <span className="text-3xl font-bold text-green-600">{book.price}</span>
                </div>
                <p className="text-gray-700 mb-6">{book.description}</p>
                <div className="flex gap-3">
                  <Link
                    href={`/books/${book.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex-1 text-center"
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
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
            {warArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-red-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-red-600 group-hover:text-red-700 transition-colors">Read Article →</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📖 Read All Expert Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Industrial Impact Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Industrial Revolution in Aviation</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl border border-red-200">
              <div className="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mass Production</h3>
              <p className="text-gray-600 text-sm">
                From handcraft to factory lines - aircraft production scales to meet wartime demand
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl border border-red-200">
              <div className="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Engine Innovation</h3>
              <p className="text-gray-600 text-sm">
                Rotary, inline, and V-engines push power and reliability boundaries
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl border border-red-200">
              <div className="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Material Science</h3>
              <p className="text-gray-600 text-sm">
                Advanced alloys, doped fabrics, and structural innovations emerge
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl border border-red-200">
              <div className="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Training Systems</h3>
              <p className="text-gray-600 text-sm">
                Professional pilot training programs and flight schools establish standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Era Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Continue Your Aviation Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover how Great War innovations shaped the Golden Age of aviation between the wars,
            when commercial aviation flourished and racing pushed the boundaries of speed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pioneer-era-1895-1914"
              className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              ← Pioneer Era (1895-1914)
            </Link>
            <Link
              href="/golden-age-1918-1939"
              className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Golden Age (1918-1939) →
            </Link>
            <Link
              href="/timeline"
              className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-700 transition-colors"
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
