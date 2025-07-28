'use client'

import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import PageSEO from '@/components/PageSEO'

const book = books.find(b => b.id === 'sycamore-seeds')!

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '0957344334',
  isbn13: '9780957344334',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2021',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in helicopter development and rotorcraft innovation',
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
  image: book.imageUrl || '/book-covers/sycamore-seeds.jpg',
  genre: 'Aviation History',
  about: [
    'Helicopter History',
    'Rotorcraft Development',
    'Autogyro Evolution',
    'British Aviation Innovation',
    'Vertical Flight Pioneers'
  ],
  keywords: book.tags?.join(', ') || 'Helicopter, Cierva, Autogyro, Rotorcraft',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/sycamore-seeds'
  }
}

export default function SycamoreSeedsPage() {
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
      <div className="relative bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/sycamore-seeds.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-green-300 mb-3 flex items-center gap-2">
                <span>Helicopter History</span>
                <span>•</span>
                <span>Rotorcraft Development</span>
                <span>•</span>
                <span>British Innovation</span>
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
                  <div className="text-sm text-green-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-green-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-green-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9780957344334</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-green-300 mb-1">Condition</div>
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
                    className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors text-center"
                  >
                    🛒 Buy Now on eBay
                  </button>
                  <button className="w-full border-2 border-green-400 text-green-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 hover:text-green-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-green-300 hover:text-green-100 underline"
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
                "The Sycamore Seeds" chronicles the extraordinary journey from nature's inspiration to mechanical flight, tracing how rotating maple seeds led to the development of autogyros and ultimately modern helicopters. This comprehensive history covers the pioneering work of Juan de la Cierva, Igor Sikorsky, and other rotorcraft visionaries who conquered the challenges of vertical flight.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <p className="text-green-800 font-semibold">🚁 ROTORCRAFT SPECIALIST</p>
                <p className="text-green-700">Essential reading for helicopter historians and rotorcraft enthusiasts. Covers the complete evolution from Cierva's first autogyro to modern helicopter operations, with detailed technical analysis and rare photographs.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Autogyro development and operations</li>
                    <li>• Early helicopter experiments</li>
                    <li>• Rotorcraft engineering principles</li>
                    <li>• Military and civilian applications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Research Sources</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Cierva company archives</li>
                    <li>• Sikorsky development records</li>
                    <li>• Test pilot testimonies</li>
                    <li>• Technical drawings and specifications</li>
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
                    <span className="font-mono">0957344334</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9780957344334</span>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Key Features & Historical Coverage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🌱 Natural Inspiration</h3>
              <p className="text-gray-700 mb-4">Explore how nature's rotating seeds inspired centuries of flight experimentation, from Leonardo da Vinci's aerial screw to modern rotorcraft design principles.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Biomimicry in aviation design</li>
                <li>• Historical autorotation studies</li>
                <li>• Early rotorcraft experiments</li>
                <li>• Nature-inspired engineering</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🚁 Autogyro Revolution</h3>
              <p className="text-gray-700 mb-4">Comprehensive coverage of Juan de la Cierva's revolutionary autogyro development, from first flights to worldwide adoption and military applications.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cierva C.4 breakthrough</li>
                <li>• Commercial autogyro operations</li>
                <li>• Military reconnaissance use</li>
                <li>• Technical innovations and improvements</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🚁 Helicopter Evolution</h3>
              <p className="text-gray-700 mb-4">Detailed analysis of the transition from autogyros to true helicopters, covering Sikorsky's innovations and the development of modern rotorcraft.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sikorsky VS-300 development</li>
                <li>• Control system innovations</li>
                <li>• Military helicopter programs</li>
                <li>• Modern helicopter applications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Analysis & Engineering Principles</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Rotorcraft Aerodynamics</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Autorotation Principles</h4>
                    <p className="text-sm text-gray-600">How unpowered rotor systems generate lift and enable safe landings</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Powered Rotor Control</h4>
                    <p className="text-sm text-gray-600">Collective and cyclic control systems for helicopter flight</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">Stability and Control</h4>
                    <p className="text-sm text-gray-600">Engineering solutions for rotorcraft stability challenges</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Development Milestones</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>1923:</strong> Cierva C.4 first successful autogyro flight</li>
                  <li>• <strong>1935:</strong> Jump takeoff autogyros developed</li>
                  <li>• <strong>1939:</strong> Sikorsky VS-300 helicopter first flight</li>
                  <li>• <strong>1942:</strong> First helicopter rescue operations</li>
                  <li>• <strong>1944:</strong> Military helicopter service begins</li>
                  <li>• <strong>1950s:</strong> Commercial helicopter operations expand</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Academic Recognition & Research Value</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Research Credentials</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">{book.citationCount || 20}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">SPECIALIST WORK</div>
                  <div className="text-sm text-gray-600">Rotorcraft development focus</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🏛️</span>
                  <span className="text-gray-700">Helicopter Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🏛️</span>
                  <span className="text-gray-700">RAF Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🏛️</span>
                  <span className="text-gray-700">Smithsonian Institution</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🏛️</span>
                  <span className="text-gray-700">National Air and Space Museum</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts and related books for deeper insights into helicopter development:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-green-600 hover:text-green-800">
                <Link href="/blog/helicopter-development-pioneers">
                  Helicopter Development Pioneers
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The evolution of vertical flight from autogyros to modern helicopters, featuring the pioneers who made it possible.</p>
              <Link
                href="/blog/helicopter-development-pioneers"
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-green-600 hover:text-green-800">
                <Link href="/blog/sycamore-seeds-helicopter-evolution">
                  Sycamore Seeds: Nature's Helicopter Inspiration
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">How nature's spinning seeds inspired the development of rotorcraft and vertical flight technology.</p>
              <Link
                href="/blog/sycamore-seeds-helicopter-evolution"
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete Your Aviation Collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-green-600 hover:text-green-800">
                <Link href="/books/captain-eric-brown">
                  Captain Eric Brown: Test Pilot Extraordinary
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Biography of the legendary test pilot who flew early helicopters and pioneered rotorcraft development testing.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£6.98</span>
                <Link
                  href="/books/captain-eric-brown"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-green-600 hover:text-green-800">
                <Link href="/books/british-aircraft-great-war">
                  British Aircraft of the Great War
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Comprehensive coverage of early British aviation development that set the foundation for rotorcraft innovation.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£12.91</span>
                <Link
                  href="/books/british-aircraft-great-war"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
          <div className="bg-gradient-to-r from-green-50 to-slate-50 rounded-lg p-8 border border-green-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reading for helicopter enthusiasts, rotorcraft historians, and anyone fascinated by the evolution of vertical flight technology.
              </p>
              <div className="text-2xl font-bold text-green-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Essential rotorcraft reference • 🎓 Used by helicopter museums • 🚁 Comprehensive helicopter history
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in Helicopter Development, Rotorcraft History, and Vertical Flight Innovation
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's research into helicopter development spans from the earliest autogyro experiments to modern rotorcraft operations. His work on "The Sycamore Seeds" represents comprehensive coverage of vertical flight evolution, drawing on archives from helicopter manufacturers, test pilot testimonies, and technical documentation from rotorcraft pioneers. This book serves as an essential reference for understanding how nature's inspiration led to one of aviation's greatest achievements.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by Helicopter Museum</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
