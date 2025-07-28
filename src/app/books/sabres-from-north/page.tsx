'use client'

import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import PageSEO from '@/components/PageSEO'

const book = books.find(b => b.id === 'sabres-from-north')!

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056735',
  isbn13: '9781838056735',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2021',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in jet age aviation and Cold War aircraft',
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
  image: book.imageUrl || '/book-covers/sabres-from-north.jpg',
  genre: 'Aviation History',
  about: [
    'F-86 Sabre History',
    'Cold War Aviation',
    'NATO Fighter Operations',
    'Jet Age Development'
  ],
  keywords: book.tags?.join(', ') || 'F-86 Sabre, Cold War, RAF, RCAF',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/sabres-from-north'
  }
}

export default function SabresFromNorthPage() {
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
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/sabres-from-north.jpg'}
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
                <span>F-86 Sabre History</span>
                <span>•</span>
                <span>Cold War Aviation</span>
                <span>•</span>
                <span>NATO Operations</span>
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
                  <div className="text-lg font-semibold">9781838056735</div>
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
                "Sabres from the North" chronicles the remarkable story of F-86 Sabre operations by Commonwealth air forces during the Cold War era. From Canadian Sabres defending North American airspace to RAF operations across Europe, this comprehensive history covers the international service of history's most successful jet fighter beyond its famous Korean War exploits.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <p className="text-blue-800 font-semibold">🎖️ COLD WAR SPECIALIST</p>
                <p className="text-blue-700">Essential reading for Cold War aviation historians and F-86 Sabre enthusiasts. Covers Commonwealth operations, NATO service, and the international success of North America's premier jet fighter with rare photographs and operational details.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• RCAF Sabre operations</li>
                    <li>• RAF service and NATO missions</li>
                    <li>• Commonwealth air defense</li>
                    <li>• International training programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Research Sources</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• RCAF squadron records</li>
                    <li>• RAF operational histories</li>
                    <li>• Pilot testimonies and memoirs</li>
                    <li>• NATO archive documentation</li>
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
                    <span className="font-mono">1838056735</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9781838056735</span>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Commonwealth Sabre Operations & Cold War Service</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🍁 RCAF Operations</h3>
              <p className="text-gray-700 mb-4">Comprehensive coverage of Royal Canadian Air Force Sabre operations, from NORAD air defense missions to NATO deployments in Europe during the height of the Cold War.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Continental air defense missions</li>
                <li>• NATO 1st Air Division Europe</li>
                <li>• Canadair Sabre Mk 6 production</li>
                <li>• Golden Hawks aerobatic team</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🇬🇧 RAF Service</h3>
              <p className="text-gray-700 mb-4">Royal Air Force Sabre operations across Europe, including front-line squadrons defending against Soviet expansion and training the next generation of jet pilots.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fighter Command squadrons</li>
                <li>• NATO integrated operations</li>
                <li>• Advanced flying training</li>
                <li>• Export and alliance aircraft</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🌍 International Service</h3>
              <p className="text-gray-700 mb-4">Global F-86 operations with allied nations, demonstrating the Sabre's role as the backbone of Western air power during the Cold War's most dangerous years.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Australian CAC Sabre operations</li>
                <li>• South African Air Force service</li>
                <li>• NATO standardization programs</li>
                <li>• Training and technical support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Analysis & Variant Development</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Sabre Variants & Improvements</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-800">Canadair Sabre Mk 6</h4>
                    <p className="text-sm text-gray-600">The ultimate Sabre with Orenda 14 engine and improved performance</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">CAC Sabre Mk 32</h4>
                    <p className="text-sm text-gray-600">Australian-built variant with Rolls-Royce Avon engine</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">International Modifications</h4>
                    <p className="text-sm text-gray-600">Nation-specific upgrades and operational adaptations</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Cold War Deployments</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Continental Defense:</strong> NORAD air defense missions</li>
                  <li>• <strong>NATO Forward Bases:</strong> European deterrent operations</li>
                  <li>• <strong>Training Commands:</strong> Jet pilot education programs</li>
                  <li>• <strong>Air Shows:</strong> Demonstration and diplomacy flights</li>
                  <li>• <strong>International Exercises:</strong> Allied cooperation missions</li>
                  <li>• <strong>Technology Transfer:</strong> Manufacturing and maintenance support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Research Value & Cold War Studies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Research Credentials</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{book.citationCount || 35}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">COLD WAR FOCUS</div>
                  <div className="text-sm text-gray-600">Commonwealth operations specialist</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">Canadian War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">RAF Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">Australian War Memorial</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">RCAF Memorial Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-gray-700">NATO Historical Office</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts for deeper insights into Cold War aviation:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/blog/f86-sabre-cold-war-fighter">
                  F-86 Sabre: Cold War Fighter Supreme
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The complete story of the F-86 Sabre from Korean War skies to NATO service, including Commonwealth operations.</p>
              <Link
                href="/blog/f86-sabre-cold-war-fighter"
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
                <Link href="/blog/commonwealth-cold-war-aviation">
                  Commonwealth Cold War Aviation
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">How Commonwealth air forces adapted to jet age warfare and Cold War defense requirements.</p>
              <Link
                href="/blog/commonwealth-cold-war-aviation"
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete Your Cold War Aviation Collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/sonic-to-standoff">
                  Sonic to Standoff: Jet Age Development
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The broader story of jet age development that includes the F-86 Sabre and other Cold War fighters.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£9.76</span>
                <Link
                  href="/books/sonic-to-standoff"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/captain-eric-brown">
                  Captain Eric Brown: Test Pilot Extraordinary
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Biography of the legendary test pilot who evaluated the F-86 Sabre and numerous other jet fighters.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£6.98</span>
                <Link
                  href="/books/captain-eric-brown"
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
                Essential reading for Cold War aviation historians, F-86 Sabre enthusiasts, and anyone studying Commonwealth air power during the jet age.
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
              📚 Essential Cold War aviation reference • 🎓 Used by military historians • ✈️ Comprehensive F-86 Sabre history
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
                  Aviation Historian & Author specializing in Cold War Aviation, F-86 Sabre Operations, and Commonwealth Air Force History
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's research into Commonwealth F-86 Sabre operations draws upon extensive archival work with the Royal Canadian Air Force, Royal Air Force, and Australian War Memorial. This comprehensive study represents the first detailed examination of F-86 operations beyond Korean War service, documenting the crucial role of Sabres in Cold War defense and NATO operations throughout the 1950s and 1960s.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by Canadian War Museum</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
