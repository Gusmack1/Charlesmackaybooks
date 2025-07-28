'use client'

import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import PageSEO from '@/components/PageSEO'

const book = books.find(b => b.id === 'dieter-dengler')!

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056715',
  isbn13: '9781838056715',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2021',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Vietnam War aviation and military biographies',
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
  image: book.imageUrl || '/book-covers/dieter-dengler.jpg',
  genre: 'Military Aviation Biography',
  about: [
    'Dieter Dengler Biography',
    'Vietnam War Aviation',
    'POW Story',
    'Skyraider Aircraft',
    'Military Aviation'
  ],
  keywords: book.tags?.join(', ') || 'Dieter Dengler, Vietnam War, POW, Skyraider',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/dieter-dengler'
  }
}

export default function DieterDenglerPage() {
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
      <div className="relative bg-gradient-to-br from-slate-900 via-green-900 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/dieter-dengler.jpg'}
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
                <span>Vietnam War Aviation</span>
                <span>•</span>
                <span>POW Biography</span>
                <span>•</span>
                <span>Military History</span>
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
                  <div className="text-lg font-semibold">9781838056715</div>
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
                    className="w-full bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors text-center"
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

      {/* Rest of content sections would go here */}
    </div>
  )
}
