import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'

const book = books.find(b => b.id === 'birth-atomic-bomb')!

export const metadata: Metadata = {
  title: book.title + " | Charles E. MacKay Aviation Books",
  description: "The birth of the atomic bomb - from scientific discovery to the Manhattan Project and Hiroshima. The complete story of how nuclear weapons changed the world forever.",
  openGraph: {
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "The birth of the atomic bomb - from scientific discovery to the Manhattan Project and Hiroshima. The complete story of how nuclear weapons changed the world forever.",
    type: 'website',
    images: [
      {
        url: book.imageUrl || '/book-covers/birth-atomic-bomb.jpg',
        width: 1200,
        height: 630,
        alt: book.title + " by Charles E. MacKay"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "The birth of the atomic bomb - from scientific discovery to the Manhattan Project and Hiroshima. The complete story of how nuclear weapons changed the world forever."
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056808',
  isbn13: '9781838056808',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2023',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Military historian specializing in WWII science and nuclear weapons development',
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
  image: book.imageUrl || '/book-covers/birth-atomic-bomb.jpg',
  genre: 'WWII Military History',
  about: [
    'Atomic Bomb Development',
    'Manhattan Project',
    'Churchill Nuclear Policy',
    'Truman Atomic Decisions',
    'WWII Nuclear Weapons'
  ],
  keywords: book.tags?.join(', ') || 'Atomic Bomb, Manhattan Project, WWII, Nuclear',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/birth-atomic-bomb'
  }
}

export default function BirthAtomicBombPage() {

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/birth-atomic-bomb.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-orange-300 mb-3 flex items-center gap-2">
                <span>WWII History</span>
                <span>•</span>
                <span>Nuclear Development</span>
                <span>•</span>
                <span>Manhattan Project</span>
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
                  <div className="text-sm text-orange-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-orange-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-orange-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9781838056808</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-orange-300 mb-1">Condition</div>
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
                    className="w-full bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors text-center block"
                  >
                    🛒 Buy Now on eBay
                  </a>
                  <button className="w-full border-2 border-orange-400 text-orange-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 hover:text-orange-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-orange-300 hover:text-orange-100 underline"
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
