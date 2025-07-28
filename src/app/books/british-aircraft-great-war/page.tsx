'use client'

import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import PageSEO from '@/components/PageSEO'

const book = books.find(b => b.id === 'british-aircraft-great-war')!

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056704',
  isbn13: '9781838056704',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2022',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in WWI military aviation and British aircraft development',
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
  image: book.imageUrl || '/book-covers/british-aircraft-great-war.jpg',
  genre: 'Aviation History',
  about: [
    'British WWI Aviation',
    'Great War Aircraft',
    'Royal Flying Corps',
    'Royal Naval Air Service'
  ],
  keywords: book.tags?.join(', ') || 'British Aircraft, WWI, RFC, RNAS',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/british-aircraft-great-war'
  }
}

export default function BritishAircraftGreatWarPage() {
  const { addToCart, openBasket } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    addToCart(book)
    setTimeout(() => {
      setIsAddingToCart(false)
      openBasket()
    }, 500)
  }

  const handleEbayClick = () => {
    window.open('https://www.ebay.co.uk/usr/chaza87', '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageSEO
        title={book.title + " | Charles E. MacKay Aviation Books"}
        description={book.description}
        path={`/books/${book.id}`}
        type="book"
        price={book.price}
        isbn={book.isbn}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-red-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/british-aircraft-great-war.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-blue-300 mb-3 flex items-center gap-2">
                <span>British WWI Aviation</span>
                <span>•</span>
                <span>RFC & RNAS History</span>
                <span>•</span>
                <span>Great War 1914-1918</span>
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
                  <div className="text-lg font-semibold">9781838056704</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-blue-300 mb-1">Condition</div>
                  <div className="text-2xl font-bold text-green-300">{book.condition}</div>
                </div>
              </div>

              {/* Purchase Options */}
              <div className="space-y-4">
                <div className="grid gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket - £' + book.price}
                  </button>
                  <button
                    onClick={handleEbayClick}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    🛒 Buy Now on eBay
                  </button>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Book Overview</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                This comprehensive reference covers all British military aircraft types used during the Great War (1914-1918), from the earliest reconnaissance machines to the sophisticated fighters that dominated the Western Front. Detailed coverage includes fighters, bombers, seaplanes, trainers, and flying boats operated by the RFC, RNAS, and early RAF.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <p className="text-blue-800 font-semibold">📖 COMPREHENSIVE REFERENCE</p>
                <p className="text-blue-700">Complete technical specifications and operational histories for all British WWI aircraft types. Essential reference for Great War aviation historians, aircraft modelers, and military aviation researchers.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Aircraft Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Fighters: Camel, SE5a, Bristol Fighter</li>
                    <li>• Bombers: Handley Page O/400, DH.9</li>
                    <li>• Trainers: Avro 504K, Maurice Farman</li>
                    <li>• Seaplanes: Short 184, Sopwith Baby</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technical Data</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Complete specifications</li>
                    <li>• Performance data</li>
                    <li>• Production numbers</li>
                    <li>• Operational service records</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3">📖 Publication Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9781838056704</span>
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

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Aircraft Types & Technical Coverage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">⚔️ Fighter Aircraft</h3>
              <p className="text-gray-700 mb-4">Complete coverage of British fighter development from early scouts to sophisticated fighting machines that achieved air superiority over the Western Front.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sopwith Camel (most successful fighter)</li>
                <li>• SE5a (speed and performance leader)</li>
                <li>• Bristol F2B Fighter</li>
                <li>• Sopwith Pup, Triplane, Snipe</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">💣 Bombers & Attack Aircraft</h3>
              <p className="text-gray-700 mb-4">Strategic and tactical bombers that pioneered aerial warfare, from small reconnaissance bombers to heavy strategic aircraft.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Handley Page O/400 heavy bomber</li>
                <li>• DH.9 and DH.9A day bombers</li>
                <li>• RE8 reconnaissance bomber</li>
                <li>• FE2b pusher fighter-bomber</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🌊 Naval & Training Aircraft</h3>
              <p className="text-gray-700 mb-4">RNAS seaplanes, flying boats, and RFC training aircraft that prepared pilots for combat and defended Britain's coasts.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Short 184 torpedo seaplane</li>
                <li>• Felixstowe F2A flying boat</li>
                <li>• Avro 504K primary trainer</li>
                <li>• Curtiss H-12 Large America</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Analysis & Development</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Aircraft Development</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-800">Engine Technology</h4>
                    <p className="text-sm text-gray-600">From rotary engines to V12s - powerplant evolution during the war</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Armament Systems</h4>
                    <p className="text-sm text-gray-600">Machine gun synchronization and bombing equipment development</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Construction Methods</h4>
                    <p className="text-sm text-gray-600">Wood, fabric, and early metal construction techniques</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Operational History</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Western Front:</strong> Fighter combat over France and Belgium</li>
                  <li>• <strong>Home Defense:</strong> Zeppelin and Gotha bomber interception</li>
                  <li>• <strong>Naval Operations:</strong> Anti-submarine and convoy protection</li>
                  <li>• <strong>Strategic Bombing:</strong> Early attacks on German industry</li>
                  <li>• <strong>Training Programs:</strong> Pilot education and aircraft development</li>
                  <li>• <strong>Colonial Operations:</strong> Aircraft in Middle East and Africa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Research Value & Academic Use</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Reference Credentials</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{book.citationCount || 60}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">REFERENCE WORK</div>
                  <div className="text-sm text-gray-600">Complete aircraft database</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">RAF Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">National Air and Space Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">Royal Aeronautical Society</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">Aviation History Museums</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts for deeper insights into Great War aviation:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/blog/british-aircraft-great-war-rfc-rnas">
                  British Aircraft Great War: RFC & RNAS Development
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters and bombers.</p>
              <Link
                href="/blog/british-aircraft-great-war-rfc-rnas"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/blog/clydeside-aviation-revolution">
                  Clydeside Aviation Revolution
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">How Glasgow's mighty shipyards transformed into aviation powerhouses during World War I.</p>
              <Link
                href="/blog/clydeside-aviation-revolution"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete Your WWI Aviation Library</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/german-aircraft-great-war">
                  German Aircraft in the Great War 1914-1918
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Comprehensive study of German military aircraft during WWI - the opposition to British aircraft covered in this volume.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£13.93</span>
                <Link
                  href="/books/german-aircraft-great-war"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/clydeside-aviation-vol1">
                  Clydeside Aviation Volume One: The Great War
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The Scottish perspective on WWI aviation, including production of British aircraft covered in this reference.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£16.08</span>
                <Link
                  href="/books/clydeside-aviation-vol1"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-8 border border-blue-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reference for WWI aviation historians, aircraft modelers, and anyone studying the development of British military aviation during the Great War.
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Complete WWI aircraft reference • 🎓 Used by aviation museums • ✈️ Essential Great War aviation database
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in WWI Military Aviation, British Aircraft Development, and Great War Aerial Warfare
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's comprehensive research into British aircraft of the Great War draws upon extensive archival work at the Imperial War Museum, RAF Museum, and National Archives. This reference work represents the most complete compilation of British WWI aircraft technical data and operational histories available, serving as an essential resource for historians, researchers, and aviation enthusiasts worldwide.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by RAF Museum</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
