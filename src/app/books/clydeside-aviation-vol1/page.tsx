import type { Metadata } from 'next'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'
import Image from 'next/image'

const bookData = books.find(b => b.id === 'clydeside-aviation-vol1')!

export const metadata: Metadata = {
  title: `${bookData.title} | Charles E. MacKay Aviation Books`,
  description: bookData.description,
  keywords: bookData.tags?.join(', ') || 'Clydeside Aviation Vol1',
  openGraph: {
    title: bookData.title,
    description: bookData.description,
    url: `https://charlesmackaybooks.com/books/clydeside-aviation-vol1`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: bookData.imageUrl || '/book-covers/clydeside-aviation-vol1.jpg',
        width: 600,
        height: 800,
        alt: bookData.title
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: bookData.title,
    description: bookData.description,
    images: [bookData.imageUrl || '/book-covers/clydeside-aviation-vol1.jpg'],
  }
}

export default function BookPage() {
  const description = "Comprehensive study of Clydeside Aviation Vol1 with expert analysis and historical context";
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  📚 Aviation History
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {bookData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-8">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>{bookData.pageCount || 250} pages</span>
                <span>•</span>
                <span>Published {bookData.publicationYear || '2020'}</span>
                <span>•</span>
                <span>ISBN: {bookData.isbn}</span>
              </div>

              {/* Quick Order */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">£{(bookData.price || 24.99).toFixed(2)}</div>
                    <div className="text-blue-200 text-sm">+ shipping worldwide</div>
                  </div>
                  <BookOrderClient
                    book={bookData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    🛒 Order Now
                  </BookOrderClient>
                </div>
                <div className="text-xs text-blue-200">
                  Secure checkout • Ships worldwide • 30-day returns
                </div>
              </div>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-2xl transform rotate-6"></div>
                <Image
                  src={bookData.imageUrl || `/book-covers/${id}.jpg`}
                  alt={bookData.title}
                  width={400}
                  height={600}
                  className="relative rounded-lg shadow-2xl w-80 h-auto"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ Expert Author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Book</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {bookData.description}
            </p>
            
            <div className="prose prose-lg max-w-none">
              <h3>Key Features</h3>
              <ul>
                <li>Comprehensive historical analysis</li>
                <li>Technical specifications and diagrams</li>
                <li>Rare archival photographs</li>
                <li>Expert commentary and insights</li>
                <li>Essential reference for researchers</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Options */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Purchase Options</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Hardcover</div>
                    <div className="text-sm text-gray-600">Free worldwide shipping</div>
                  </div>
                  <div className="text-xl font-bold">£{(bookData.price || 24.99).toFixed(2)}</div>
                </div>
                <BookOrderClient
                  book={bookData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </BookOrderClient>
              </div>
            </div>

            {/* Book Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{bookData.pageCount || 250}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium">{bookData.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">{bookData.publicationYear || '2020'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}