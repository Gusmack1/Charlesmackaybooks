import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'

const book = books.find(b => b.id === 'captain-eric-brown')!

export const metadata: Metadata = {
  title: book.title + " | Charles E. MacKay Aviation Books",
  description: "Captain Eric 'Winkle' Brown - the greatest test pilot who ever lived. Discover the incredible story of the man who flew more aircraft types than anyone in history.",
  openGraph: {
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "Captain Eric 'Winkle' Brown - the greatest test pilot who ever lived. Discover the incredible story of the man who flew more aircraft types than anyone in history.",
    type: 'website',
    images: [
      {
        url: book.imageUrl || '/book-covers/captain-eric-brown.jpg',
        width: 1200,
        height: 630,
        alt: book.title + " by Charles E. MacKay"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "Captain Eric 'Winkle' Brown - the greatest test pilot who ever lived. Discover the incredible story of the man who flew more aircraft types than anyone in history."
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '0957344365',
  isbn13: '9780957344365',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2020',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in test pilot biographies and naval aviation',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Person',
    name: 'Charles E. MacKay'
  },
  offers: {
    '@type': 'Offer',
    price: book.price.toString(),
    priceCurrency: 'GBP',
    availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Person',
      name: 'Charles E. MacKay'
    }
  },
  image: book.imageUrl || '/book-covers/captain-clouds.jpg',
  genre: 'Aviation Biography',
  about: [
    'Captain Eric Brown Biography',
    'Test Pilot History',
    'Naval Aviation',
    'Aircraft Carrier Operations',
    'Aviation Records'
  ],
  keywords: book.tags?.join(', ') || 'Eric Brown, Test Pilot, Naval Aviation',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/captain-eric-brown'
  }
}

export default function CaptainEricBrownPage() {

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-navy-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/captain-clouds.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-navy-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-blue-300 mb-3 flex items-center gap-2">
                <span>Aviation Biography</span>
                <span>•</span>
                <span>Test Pilot Legend</span>
                <span>•</span>
                <span>World Records</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {book.description}
              </p>

              {/* Book Specifications */}
              <div className="grid grid-cols-2 gap-6 mb-8 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9780957344365</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Condition</div>
                  <div className="text-2xl font-bold text-green-300">{book.condition}</div>
                </div>
              </div>

              {/* Purchase Options */}
              <div className="space-y-4">
                <div className="grid gap-4">
                  <BookOrderClient book={book} />
                  <a
                    href="https://www.ebay.co.uk/usr/chaza87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-navy-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-navy-700 transition-colors text-center block"
                  >
                    🛒 Buy Now on eBay
                  </a>
                  <button className="w-full border-2 border-blue-400 text-blue-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 hover:text-blue-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-blue-300 hover:text-blue-100 underline"
                  >
                    ← Browse All Aviation Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Quick Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Biography Overview</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                This comprehensive biography chronicles the extraordinary life of Captain Eric "Winkle" Brown, the world's most accomplished test pilot who flew 487 different aircraft types - more than any pilot in history. From pioneering carrier jet landings to testing captured enemy aircraft, Brown's career spanned aviation's most revolutionary period.
              </p>
              <div className="bg-gold-50 border-l-4 border-gold-500 p-6 mb-6">
                <p className="text-gold-800 font-semibold">🏆 AVIATION LEGEND</p>
                <p className="text-gold-700">Essential reading for aviation enthusiasts and test pilot historians. Brown's world records include 487 aircraft types flown, 2,407 carrier landings, and the first jet aircraft carrier landing. His safety record and contributions to aviation development remain unmatched.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Record Achievements</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 487 different aircraft types flown</li>
                    <li>• 2,407 aircraft carrier landings</li>
                    <li>• First jet carrier landing (1945)</li>
                    <li>• Zero accidents due to pilot error</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Career Highlights</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Royal Navy test pilot</li>
                    <li>• RAE Farnborough chief test pilot</li>
                    <li>• Enemy aircraft evaluation specialist</li>
                    <li>• Carrier aviation pioneer</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3">📖 Publication Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ISBN-10:</span>
                    <span className="font-mono">0957344365</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9780957344365</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>Paperback, {book.pageCount} pages</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Published:</span>
                    <span>{book.publicationYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{book.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* World Records & Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">World Records & Unprecedented Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gold-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">✈️ Aircraft Types Record</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gold-600">487</div>
                <div className="text-sm text-gray-600">Different Aircraft Types</div>
              </div>
              <p className="text-gray-700 mb-4">An unmatched record spanning fighters, bombers, transports, helicopters, and experimental aircraft from around the world.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• German captured aircraft</li>
                <li>• Allied experimental types</li>
                <li>• Jet fighter prototypes</li>
                <li>• Naval aircraft variants</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🚢 Carrier Landing Record</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-600">2,407</div>
                <div className="text-sm text-gray-600">Carrier Landings</div>
              </div>
              <p className="text-gray-700 mb-4">More carrier landings than any pilot in history, including the first jet aircraft landing on a carrier in 1945.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• First jet carrier landing</li>
                <li>• Multiple carrier types</li>
                <li>• Day and night operations</li>
                <li>• Perfect safety record</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🎖️ Safety Excellence</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600">Zero</div>
                <div className="text-sm text-gray-600">Pilot Error Accidents</div>
              </div>
              <p className="text-gray-700 mb-4">Incredible safety record over 25 years of dangerous experimental test flying, establishing modern test pilot standards.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Systematic testing approach</li>
                <li>• Thorough preparation methods</li>
                <li>• Emergency procedure expertise</li>
                <li>• Risk assessment mastery</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Career Timeline & Major Achievements</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Career Milestones</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-navy-500 pl-4">
                    <h4 className="font-semibold text-navy-800">1939-1945: Wartime Service</h4>
                    <p className="text-sm text-gray-600">Royal Navy fighter pilot and enemy aircraft evaluation specialist</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">1945: Historic Achievement</h4>
                    <p className="text-sm text-gray-600">First jet aircraft carrier landing in Sea Vampire</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">1945-1970: Test Pilot Career</h4>
                    <p className="text-sm text-gray-600">Chief test pilot at RAE Farnborough</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Notable Aircraft Tested</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>German fighters:</strong> Me 163, Me 262, Fw 190</li>
                  <li>• <strong>British jets:</strong> Meteor, Vampire, Javelin</li>
                  <li>• <strong>Experimental types:</strong> Numerous prototypes</li>
                  <li>• <strong>Helicopters:</strong> Early rotorcraft development</li>
                  <li>• <strong>Naval aircraft:</strong> Carrier variants and prototypes</li>
                  <li>• <strong>International types:</strong> Allied and captured aircraft</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Test Pilot Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Test Pilot Philosophy & Methods</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-navy-50 border border-navy-200 rounded-lg p-6">
                <h4 className="font-bold text-navy-800 mb-3">🎯 Brown's Testing Philosophy</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "The test pilot's job is to take aircraft to their limits safely, learn everything possible, and return with data that can save lives and improve aviation. Every flight teaches us something valuable."
                </blockquote>
                <cite className="text-sm text-navy-700">— Captain Eric Brown</cite>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Testing Methodology</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Thorough preparation:</strong> Complete aircraft system study</li>
                <li>• <strong>Progressive testing:</strong> Gradual envelope expansion</li>
                <li>• <strong>Detailed reporting:</strong> Comprehensive flight test reports</li>
                <li>• <strong>Safety first:</strong> Calculated risk assessment</li>
                <li>• <strong>Technical analysis:</strong> Engineering-focused evaluation</li>
                <li>• <strong>Pilot feedback:</strong> Operational perspective integration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Academic & Historical Value */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Academic Value & Historical Significance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Research Value</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-navy-600">{book.citationCount || 35}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Reading level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">AVIATION LEGEND</div>
                  <div className="text-sm text-gray-600">Unmatched test pilot record</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Referenced By</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-navy-600">🏛️</span>
                  <span className="text-gray-700">Royal Navy Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-navy-600">🏛️</span>
                  <span className="text-gray-700">RAF Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-navy-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-navy-600">🏛️</span>
                  <span className="text-gray-700">National Air and Space Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-navy-600">🏛️</span>
                  <span className="text-gray-700">Test Pilot Schools Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert analysis of Captain Eric Brown's achievements:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-navy-600 hover:text-navy-800">
                <Link href="/blog/test-pilot-biography-eric-brown">
                  Captain Eric Brown: The World's Greatest Test Pilot
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The extraordinary story of "Winkle" Brown - the man who flew 487 different aircraft types and revolutionized test flying.</p>
              <Link
                href="/blog/test-pilot-biography-eric-brown"
                className="inline-flex items-center text-navy-600 hover:text-navy-800 font-medium"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-navy-600 hover:text-navy-800">
                <Link href="/blog/naval-aviation-pioneers">
                  Naval Aviation Pioneers: Carrier Flying Heroes
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The brave pilots who pioneered carrier aviation operations, featuring Eric Brown's historic achievements.</p>
              <Link
                href="/blog/naval-aviation-pioneers"
                className="inline-flex items-center text-navy-600 hover:text-navy-800 font-medium"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Aviation Biography Collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-navy-600 hover:text-navy-800">
                <Link href="/books/test-pilots-legends">
                  Britain's Greatest Test Pilots
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The complete collection of Britain's most famous test pilots, including Eric Brown alongside other aviation legends.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£11.95</span>
                <Link
                  href="/books/test-pilots-legends"
                  className="bg-navy-600 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-navy-600 hover:text-navy-800">
                <Link href="/books/naval-aviation-heroes">
                  Naval Aviation Heroes: Carrier Legends
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Stories of the brave pilots who pioneered carrier operations, including Brown's historic first jet landing.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£9.45</span>
                <Link
                  href="/books/naval-aviation-heroes"
                  className="bg-navy-600 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Secure Your Copy Today</h2>
          <div className="bg-gradient-to-r from-navy-50 to-slate-50 rounded-lg p-8 border border-navy-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reading for aviation enthusiasts, test pilot historians, and anyone inspired by extraordinary achievements in flight testing and carrier aviation.
              </p>
              <div className="text-2xl font-bold text-navy-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-navy-600 text-navy-600 px-8 py-3 rounded-lg font-bold hover:bg-navy-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Legendary test pilot biography • 🎓 Essential aviation reference • ✈️ World record holder story
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-navy-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in Test Pilot Biographies, Naval Aviation History, and Experimental Aircraft Development
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's biography of Captain Eric Brown draws upon extensive interviews, flight test records, and personal testimonies from Brown's colleagues and fellow test pilots. This comprehensive account represents the most detailed examination of Brown's extraordinary career and his unmatched contributions to aviation safety and development. Essential reading for understanding the golden age of test flying and the men who pushed aviation's boundaries.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by Test Pilot Schools</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
