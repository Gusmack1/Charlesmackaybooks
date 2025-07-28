'use client'

import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import PageSEO from '@/components/PageSEO'

const book = books.find(b => b.id === 'german-aircraft-great-war')!

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056742',
  isbn13: '9781838056742',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2023',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in WWI military aviation and German aircraft development',
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
  image: book.imageUrl || '/book-covers/german-aircraft-great-war.jpg',
  genre: 'Aviation History',
  about: [
    'German WWI Aviation',
    'Great War Aircraft',
    'Luftstreitkräfte History',
    'German Fighter Development',
    'WWI Military Aviation'
  ],
  keywords: book.tags?.join(', ') || 'WWI, German Aircraft, Fokker, Richthofen',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/german-aircraft-great-war'
  }
}

export default function GermanAircraftGreatWarPage() {
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
      <div className="relative bg-gradient-to-br from-slate-900 via-red-900 to-black text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/german-aircraft-great-war.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-red-300 mb-3 flex items-center gap-2">
                <span>German WWI Aviation</span>
                <span>•</span>
                <span>Luftstreitkräfte History</span>
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
                  <div className="text-sm text-red-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-red-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-red-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9781838056742</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-red-300 mb-1">Condition</div>
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
                    className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors text-center"
                  >
                    🛒 Buy Now on eBay
                  </button>
                  <button className="w-full border-2 border-red-400 text-red-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 hover:text-red-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-red-300 hover:text-red-100 underline"
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
                This comprehensive study covers German military aircraft development during the Great War (1914-1918), from early Taube monoplanes to the sophisticated fighters that dominated the Western Front. Detailed coverage includes fighters, bombers, seaplanes, and trainers used by the German Air Force and Navy during the world's first aerial war.
              </p>
              <div className="bg-gray-50 border-l-4 border-gray-500 p-6 mb-6">
                <p className="text-gray-800 font-semibold">🦅 GERMAN AVIATION AUTHORITY</p>
                <p className="text-gray-700">Definitive reference for German WWI aircraft with rare photographs and detailed technical specifications. Essential for understanding the aviation technology that challenged Allied air superiority.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Aircraft Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Fighters: Albatros D.III, Fokker Dr.I</li>
                    <li>• Bombers: Gotha G.IV, AEG G.IV</li>
                    <li>• Reconnaissance: Rumpler C.VII, LVG C.VI</li>
                    <li>• Seaplanes: Friedrichshafen FF.33</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Historical Context</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Fokker Scourge period</li>
                    <li>• Bloody April 1917</li>
                    <li>• Strategic bombing campaigns</li>
                    <li>• Technology evolution</li>
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
                    <span className="font-mono">9781838056742</span>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">German Aircraft Types & Development</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">⚔️ Fighter Aircraft</h3>
              <p className="text-gray-700 mb-4">From the Fokker Eindecker's machine gun revolution to the advanced D.VII that ended the war, German fighter development led the world in innovation.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fokker Dr.I Triplane (Red Baron's mount)</li>
                <li>• Albatros D.III (backbone of German air force)</li>
                <li>• Fokker D.VII (war's best fighter)</li>
                <li>• Pfalz D.III, Roland D.VI</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">💣 Bombers & Strategic Aircraft</h3>
              <p className="text-gray-700 mb-4">German strategic bombing pioneers that brought the war to London and revolutionized aerial warfare doctrine and civilian targeting.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Gotha G.IV (London bomber)</li>
                <li>• AEG G.IV heavy bomber</li>
                <li>• Zeppelin Staaken R.VI giant</li>
                <li>• Friedrichshafen G.III</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🔍 Reconnaissance & Naval</h3>
              <p className="text-gray-700 mb-4">Two-seater observation aircraft and seaplanes that provided intelligence and coastal defense for the German war effort.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rumpler C.VII high-altitude reconnaissance</li>
                <li>• LVG C.VI general purpose</li>
                <li>• Hansa-Brandenburg W.29 seaplane</li>
                <li>• Friedrichshafen FF.33 floatplane</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Innovation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">German Technical Innovation & Superiority</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Revolutionary Technologies</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-800">Interrupter Gear</h4>
                    <p className="text-sm text-gray-600">Fokker's synchronized machine gun that ended the "Fokker Scourge"</p>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <h4 className="font-semibold text-gray-800">All-Metal Construction</h4>
                    <p className="text-sm text-gray-600">Junkers pioneered all-metal aircraft design years ahead of Allies</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Advanced Engines</h4>
                    <p className="text-sm text-gray-600">Mercedes and BMW engines that powered German air superiority</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Operational Achievements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Fokker Scourge (1915):</strong> First air superiority period</li>
                  <li>• <strong>Bloody April (1917):</strong> Devastating Allied losses</li>
                  <li>• <strong>Strategic Bombing:</strong> First systematic civilian targeting</li>
                  <li>• <strong>High Altitude Flight:</strong> 25,000+ feet reconnaissance</li>
                  <li>• <strong>Night Operations:</strong> Pioneered dark bombing missions</li>
                  <li>• <strong>Formation Tactics:</strong> Organized fighter squadrons</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Famous Aces and Units */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Famous Aces & Elite Units</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Legendary Pilots</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-red-600">80 Victories</div>
                  <div className="text-sm text-gray-600">Manfred von Richthofen (Red Baron)</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">Ernst Udet - 62 victories</div>
                  <div className="text-sm text-gray-600">Ace and aircraft designer</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">Erich Löwenhardt - 54 victories</div>
                  <div className="text-sm text-gray-600">Bavarian ace</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Elite Fighter Units</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🏛️</span>
                  <span className="text-gray-700">Jagdstaffel 11 (Richthofen's squadron)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🏛️</span>
                  <span className="text-gray-700">Jagdgeschwader I (Flying Circus)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🏛️</span>
                  <span className="text-gray-700">Jagdstaffel 2 (Boelcke Squadron)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🏛️</span>
                  <span className="text-gray-700">Marine-Feldflieger-Abteilung</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🏛️</span>
                  <span className="text-gray-700">Kampfgeschwader der OHL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts for deeper insights into German WWI aviation:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-600 hover:text-gray-800">
                <Link href="/blog/german-aircraft-great-war-development">
                  German Aircraft Great War Development
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The technological innovations and tactical developments that made German aircraft the most feared in the skies.</p>
              <Link
                href="/blog/german-aircraft-great-war-development"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-600 hover:text-gray-800">
                <Link href="/blog/flying-for-kaiser-wilhelm">
                  Flying for Kaiser Wilhelm 1914-1918
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Personal accounts from German pilots flying the aircraft covered in this comprehensive reference.</p>
              <Link
                href="/blog/flying-for-kaiser-wilhelm"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete Your WWI Aviation Collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-600 hover:text-gray-800">
                <Link href="/books/british-aircraft-great-war">
                  British Aircraft of the Great War
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The companion volume covering Allied aircraft that fought against the German machines detailed in this book.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£12.91</span>
                <Link
                  href="/books/british-aircraft-great-war"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-600 hover:text-gray-800">
                <Link href="/books/flying-for-kaiser">
                  Flying for Kaiser Wilhelm 1914-1918
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Personal accounts from German pilots who flew the aircraft covered in this technical reference.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£12.86</span>
                <Link
                  href="/books/flying-for-kaiser"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reference for WWI aviation historians, German military enthusiasts, and anyone studying the technological innovations that shaped aerial warfare.
              </p>
              <div className="text-2xl font-bold text-gray-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-gray-600 text-gray-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Definitive German WWI aircraft reference • 🎓 Used by military historians • ✈️ Essential Great War aviation database
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in German Military Aviation, WWI Aircraft Development, and Great War Aerial Combat
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's research into German aircraft of the Great War draws upon German archives, pilot memoirs, and technical documentation from museums across Europe. This comprehensive reference represents years of research into aircraft that challenged Allied air supremacy and pioneered many technologies still used in modern aviation. Essential for understanding the complete picture of WWI aerial warfare.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by Deutsches Technikmuseum</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
