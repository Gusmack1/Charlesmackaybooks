import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'

const book = books.find(b => b.id === 'clydeside-aviation-vol1')!

export const metadata: Metadata = {
  title: book.title + " | Charles E. MacKay Aviation Books",
  description: "Clydeside Aviation Volume One: The Great War - How Glasgow's shipyards became aviation powerhouses during WWI. Discover Scotland's vital role in aircraft production.",
  openGraph: {
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "Clydeside Aviation Volume One: The Great War - How Glasgow's shipyards became aviation powerhouses during WWI. Discover Scotland's vital role in aircraft production.",
    type: 'website',
    images: [
      {
        url: book.imageUrl || '/book-covers/clydeside-aviation-vol1.jpg',
        width: 1200,
        height: 630,
        alt: book.title + " by Charles E. MacKay"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "Clydeside Aviation Volume One: The Great War - How Glasgow's shipyards became aviation powerhouses during WWI. Discover Scotland's vital role in aircraft production."
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '0957344389',
  isbn13: '9780957344389',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2022',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Scottish aviation history and WWI military aviation',
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
  image: book.imageUrl || '/book-covers/clydeside-aviation-vol1.jpg',
  genre: 'Aviation History',
  about: [
    'WWI Aviation History',
    'Scottish Military Aviation',
    'Royal Flying Corps',
    'Royal Naval Air Service',
    'Great War Aviation'
  ],
  keywords: book.tags?.join(', ') || 'Clydeside, Scottish Aviation, WWI',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/clydeside-aviation-vol1'
  }
}

export default function ClydesideAviationVol1Page() {

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-amber-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/clydeside-aviation-vol1.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-amber-300 mb-3 flex items-center gap-2">
                <span>WWI Aviation History</span>
                <span>•</span>
                <span>Scottish Military Aviation</span>
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
                  <div className="text-sm text-amber-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-amber-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-amber-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9780957344389</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-amber-300 mb-1">Condition</div>
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
                    className="w-full bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors text-center block"
                  >
                    🛒 Buy Now on eBay
                  </a>
                  <button className="w-full border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 hover:text-amber-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-amber-300 hover:text-amber-100 underline"
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
                This comprehensive first volume chronicles the remarkable transformation of the River Clyde region from Scotland's shipbuilding heartland into a crucial center of British aviation during the Great War. From 1914 to 1918, the Clydeside witnessed unprecedented growth in aircraft manufacturing, pilot training, and military aviation operations that would shape the future of Scottish aviation.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
                <p className="text-amber-800 font-semibold">🏆 ACADEMIC REFERENCE SOURCE</p>
                <p className="text-amber-700">Referenced by British Aviation historians and cited in academic papers on WWI aviation training. Essential reading for RFC, RNAS operations in Scotland, and Great War aircraft production research with extensive archival documentation.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• RFC training facilities and operations</li>
                    <li>• RNAS coastal defense stations</li>
                    <li>• Aircraft manufacturing expansion</li>
                    <li>• Pilot training programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Research Sources</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• RFC squadron records</li>
                    <li>• Local newspaper archives</li>
                    <li>• Personal pilot testimonies</li>
                    <li>• Government aviation reports</li>
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
                    <span className="font-mono">0957344389</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9780957344389</span>
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
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">✈️ Royal Flying Corps Operations</h3>
              <p className="text-gray-700 mb-4">Comprehensive coverage of RFC establishment in Scotland, including training facilities at Montrose and operational squadrons defending Scottish airspace during the Great War.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Montrose flying training school</li>
                <li>• Squadron deployments and operations</li>
                <li>• Pilot training curriculum development</li>
                <li>• Aircraft types and specifications</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">⚓ Royal Naval Air Service</h3>
              <p className="text-gray-700 mb-4">Detailed analysis of RNAS coastal defense operations, seaplane stations, and anti-submarine patrols protecting vital shipping lanes around Scotland's coast.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Coastal defense strategy</li>
                <li>• Seaplane operations</li>
                <li>• Anti-submarine patrols</li>
                <li>• Naval aviation development</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🏭 Industrial Mobilization</h3>
              <p className="text-gray-700 mb-4">Complete history of Clydeside's transformation from shipbuilding to aircraft production, including Beardmore Aviation and other manufacturers contributing to the war effort.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aircraft manufacturing expansion</li>
                <li>• Workforce adaptation and training</li>
                <li>• Production statistics and output</li>
                <li>• Industrial innovation and development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Analysis & Aircraft Types</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Aircraft & Operations</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h4 className="font-semibold text-amber-800">Training Aircraft</h4>
                    <p className="text-sm text-gray-600">Avro 504, Maurice Farman Shorthorn, and other primary trainers used in Scottish facilities</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Fighter Aircraft</h4>
                    <p className="text-sm text-gray-600">Sopwith Camel, SE5a, and Bristol Fighter operations from Scottish bases</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Naval Aircraft</h4>
                    <p className="text-sm text-gray-600">Seaplanes and flying boats for coastal patrol and anti-submarine operations</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Training & Operations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pilot training:</strong> Comprehensive flight instruction programs</li>
                  <li>• <strong>Navigation training:</strong> Advanced navigation and reconnaissance</li>
                  <li>• <strong>Gunnery practice:</strong> Aerial combat training and techniques</li>
                  <li>• <strong>Formation flying:</strong> Squadron tactics and coordination</li>
                  <li>• <strong>Cross-country flights:</strong> Long-distance navigation exercises</li>
                  <li>• <strong>Weather operations:</strong> Scottish climate flying challenges</li>
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
                  <div className="text-3xl font-bold text-amber-600">{book.citationCount || 95}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">WWI SPECIALIST</div>
                  <div className="text-sm text-gray-600">Great War aviation focus</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">🏛️</span>
                  <span className="text-gray-700">RAF Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">🏛️</span>
                  <span className="text-gray-700">University of Glasgow</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">🏛️</span>
                  <span className="text-gray-700">Stirling University</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">🏛️</span>
                  <span className="text-gray-700">National Museums Scotland</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Expert Content */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Expert Analysis & Further Reading</h2>
          <p className="text-gray-600 mb-6">Explore Charles MacKay's expert blog posts and related books for deeper insights into WWI Scottish aviation:</p>
          <div className="grid md:grid-cols-2 gap-6">
            {book.relatedBlogPosts?.map((post, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-amber-600 hover:text-amber-800">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium"
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
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Complete the Scottish Aviation Trilogy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-amber-600 hover:text-amber-800">
                <Link href="/books/clydeside-aviation-vol2">
                  Clydeside Aviation Volume Two: Between the Wars
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Second volume documenting the development of aviation on the Clyde between WWI and WWII (1918-1939), covering civilian aviation growth and military preparation.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£15.54</span>
                <Link
                  href="/books/clydeside-aviation-vol2"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  View Book
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-amber-600 hover:text-amber-800">
                <Link href="/books/beardmore-aviation">
                  Beardmore Aviation: Scottish Industrial Giant
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Comprehensive history of Beardmore Aviation covering airships and aircraft from 1913-1930, complementing the Clydeside story with industrial focus.</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">£12.76</span>
                <Link
                  href="/books/beardmore-aviation"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
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
          <div className="bg-gradient-to-r from-amber-50 to-slate-50 rounded-lg p-8 border border-amber-200 max-w-3xl mx-auto">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Essential reading for WWI aviation historians, Scottish military history researchers, and anyone studying the Great War's impact on aviation development.
              </p>
              <div className="text-2xl font-bold text-amber-600 mb-2">£{book.price}</div>
              <p className="text-sm text-gray-600">Free worldwide shipping • Secure payment via PayPal</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.ebay.co.uk/usr/chaza87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors"
              >
                🛒 Order Now on eBay
              </a>
              <Link
                href="/books"
                className="border border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors"
              >
                Browse All Books
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              📚 Referenced by aviation historians worldwide • 🎓 Used by universities for WWI studies • ✈️ Essential Great War aviation reference
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Charles E. MacKay</h3>
                <p className="text-lg text-slate-700 mb-4">
                  Aviation Historian & Author specializing in Scottish Aviation History, WWI Military Aviation, and Great War Aircraft Development
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Charles MacKay's research into Clydeside aviation during the Great War represents the first comprehensive study of Scottish aviation operations from 1914-1918. His extensive archival work uncovered previously unpublished RFC squadron records, local newspaper accounts, and personal testimonies from WWI pilots and ground crew. This volume represents over three years of intensive research into Scotland's crucial role in Great War aviation.
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
