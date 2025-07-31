import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'


const book = books.find(b => b.id === 'beardmore-aviation')!

export const metadata: Metadata = {
  title: `${book.title} | Charles E. MacKay Aviation Books`,
  description: book.description,
  keywords: book.tags?.join(', ') || 'Beardmore, Scottish Aviation, R101, Airships',
  openGraph: {
    title: book.title,
    description: book.description,
    url: `https://charlesmackaybooks.com/books/beardmore-aviation`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: book.imageUrl || '/book-covers/beardmore-aviation.jpg',
        width: 600,
        height: 800,
        alt: book.title
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: book.title,
    description: book.description,
    images: [book.imageUrl || '/book-covers/beardmore-aviation.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '0957344309',
  isbn13: '9780957344309',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2020',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Scottish aviation and industrial history',
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
  image: book.imageUrl || '/book-covers/beardmore-aviation.jpg',
  genre: 'Scottish Aviation History',
  about: [
    'Beardmore Aviation History',
    'Scottish Aircraft Manufacturing',
    'R101 Airship Development',
    'Industrial Aviation Heritage',
    'Scottish Engineering History'
  ],
  keywords: book.tags?.join(', ') || 'Beardmore, Scottish Aviation, R101, Airships',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/beardmore-aviation'
  }
}

export default function BeardmoreAviationPage() {

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/beardmore-aviation.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-purple-300 mb-3 flex items-center gap-2">
                <span>Scottish Aviation History</span>
                <span>•</span>
                <span>Industrial Heritage</span>
                <span>•</span>
                <span>Airship Development</span>
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
                  <div className="text-sm text-purple-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9780957344309</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">Condition</div>
                  <div className="text-2xl font-bold text-green-300">{book.condition}</div>
                </div>
              </div>

              {/* Purchase Options */}
              <div className="space-y-4">
                <BookOrderClient book={book} />
                <div className="grid gap-4">
                  <Link
                    href="/contact"
                    className="w-full border-2 border-purple-400 text-purple-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 hover:text-purple-800 transition-colors text-center block"
                  >
                    📧 Contact for Academic Bulk Orders
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-purple-300 hover:text-purple-100 underline"
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
                This comprehensive history chronicles the remarkable transformation of William Beardmore & Company from Scotland's premier shipbuilding concern into Britain's most ambitious aviation manufacturer. From 1913 to 1930, Beardmore Aviation produced everything from pioneering aircraft to the world's largest airships, including the ill-fated R101.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
                <p className="text-purple-800 font-semibold">🏆 PRIMARY REFERENCE SOURCE</p>
                <p className="text-purple-700">Listed as Reference #1 on British Aviation Database alongside Putnam and Jane's publications. Essential reading for Scottish aviation history, industrial aviation development, and airship research with unprecedented access to company archives.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Aircraft design and manufacturing</li>
                    <li>• R101 airship development</li>
                    <li>• Industrial mobilization for aviation</li>
                    <li>• Engine development programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Research Sources</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Beardmore company archives</li>
                    <li>• Admiralty airship records</li>
                    <li>• Personal employee testimonies</li>
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
                    <span className="font-mono">0957344309</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9780957344309</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>Hardcover, {book.pageCount} pages</span>
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
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🏭 Industrial Heritage</h3>
              <p className="text-gray-700 mb-4">Comprehensive coverage of Beardmore's transformation from shipbuilding giant to aviation pioneer, including detailed analysis of industrial processes and manufacturing innovations.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Parkhead Forge operations</li>
                <li>• Aircraft production facilities</li>
                <li>• Engineering expertise transfer</li>
                <li>• Workforce adaptation programs</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">✈️ Aircraft Development</h3>
              <p className="text-gray-700 mb-4">Detailed technical analysis of Beardmore aircraft designs, from early experimental types to advanced military aircraft produced during the Great War and beyond.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• W.B.III early designs</li>
                <li>• Military aircraft production</li>
                <li>• Naval aircraft development</li>
                <li>• Post-war commercial aviation</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🎈 Airship Innovation</h3>
              <p className="text-gray-700 mb-4">Unprecedented coverage of Beardmore's airship program, including exclusive details on the R101 project based on previously unpublished company documents.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Coastal patrol airships</li>
                <li>• R101 Imperial Airship</li>
                <li>• Structural engineering innovations</li>
                <li>• Airship operational history</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Analysis & Engineering Innovation</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Engineering Excellence</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">Aircraft Manufacturing</h4>
                    <p className="text-sm text-gray-600">Advanced production techniques adapted from shipbuilding expertise</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Airship Construction</h4>
                    <p className="text-sm text-gray-600">Revolutionary metal framework design for Imperial Airways Service</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Engine Development</h4>
                    <p className="text-sm text-gray-600">Beardmore Halford Pullinger engines for aviation applications</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Innovation & Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Materials innovation:</strong> Advanced metallurgy and alloy development</li>
                  <li>• <strong>Production scaling:</strong> Mass production techniques for aircraft</li>
                  <li>• <strong>Quality control:</strong> Precision manufacturing standards</li>
                  <li>• <strong>Design integration:</strong> Shipbuilding principles applied to aviation</li>
                  <li>• <strong>International contracts:</strong> Export success and technology transfer</li>
                  <li>• <strong>Research programs:</strong> Advanced aerodynamic studies</li>
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
                  <div className="text-3xl font-bold text-purple-600">{book.citationCount || 150}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">PRIMARY SOURCE</div>
                  <div className="text-sm text-gray-600">Beardmore archives research</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-purple-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600">🏛️</span>
                  <span className="text-gray-700">Royal Aeronautical Society</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600">🏛️</span>
                  <span className="text-gray-700">University of Glasgow</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600">🏛️</span>
                  <span className="text-gray-700">Edinburgh University</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600">🏛️</span>
                  <span className="text-gray-700">National Museums Scotland</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts and related books for deeper insights into Scottish industrial aviation:</p>
          <div className="grid md:grid-cols-2 gap-6">
            {book.relatedBlogPosts?.map((post, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-purple-600 hover:text-purple-800">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete the Scottish Aviation Collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-purple-600 hover:text-purple-800">
                <Link href="/books/clydeside-aviation-vol1">
                  Clydeside Aviation Volume One: The Great War
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">First volume covering aviation activities on the Clyde during WWI, including Beardmore's wartime aircraft production and military contracts.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£16.08</span>
                <Link
                  href="/books/clydeside-aviation-vol1"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-purple-600 hover:text-purple-800">
                <Link href="/books/aircraft-carrier-argus">
                  Aircraft Carrier - Beardmore's HMS Argus
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">The story of HMS Argus aircraft carrier, converted by Beardmore from the liner Conte Rosso, pioneering naval aviation operations.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£12.91</span>
                <Link
                  href="/books/aircraft-carrier-argus"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
          <div className="bg-gradient-to-r from-purple-50 to-slate-50 rounded-lg p-8 border border-purple-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reading for Scottish aviation historians, industrial heritage researchers, and anyone studying the evolution from shipbuilding to aerospace manufacturing.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Referenced by aviation historians worldwide • 🎓 Used by universities for industrial heritage studies • ✈️ Essential Scottish aviation reference
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in Scottish Aviation History, Industrial Heritage, and Airship Development
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's research into Beardmore Aviation represents the first comprehensive study using the company's complete archives. His five years of intensive research uncovered previously unpublished technical drawings, correspondence, and production records that reveal the true extent of Beardmore's contribution to British aviation development. This work stands as the definitive account of one of Scotland's most important industrial aviation enterprises.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  <span>📧 charlese1mackay@hotmail.com</span>
                  <span>📍 Glasgow, Scotland</span>
                  <span>📚 19 Published Aviation Books</span>
                  <span>🏛️ Referenced by Imperial War Museum</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
