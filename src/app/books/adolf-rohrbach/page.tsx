import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { books } from '@/data/books'
import Header from '@/components/Header'
import BookOrderClient from '@/components/BookOrderClient'

const book = books.find(b => b.id === 'adolf-rohrbach')!

export const metadata: Metadata = {
  title: book.title + " | Charles E. MacKay Aviation Books",
  description: "The story of Adolf Rohrbach, German aviation pioneer who revolutionized metal aircraft construction. From early welded steel tube fuselages to the world's largest flying boats.",
  openGraph: {
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "The story of Adolf Rohrbach, German aviation pioneer who revolutionized metal aircraft construction. From early welded steel tube fuselages to the world's largest flying boats.",
    type: 'website',
    images: [
      {
        url: book.imageUrl || '/book-covers/adolf-rohrbach.jpg',
        width: 1200,
        height: 630,
        alt: book.title + " by Charles E. MacKay"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: book.title + " | Charles E. MacKay Aviation Books",
    description: "The story of Adolf Rohrbach, German aviation pioneer who revolutionized metal aircraft construction. From early welded steel tube fuselages to the world's largest flying boats."
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  description: book.description,
  isbn: book.isbn,
  isbn10: '1838056758',
  isbn13: '9781838056758',
  numberOfPages: book.pageCount,
  datePublished: book.publicationYear?.toString() || '2021',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in German aviation pioneers and aircraft design',
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
  image: book.imageUrl || '/book-covers/adolf-rohrbach.jpg',
  genre: 'Aviation Biography',
  about: [
    'Adolf Rohrbach Biography',
    'German Aviation Pioneer',
    'Aircraft Design Innovation',
    'Rohrbach Aircraft',
    'Aviation Engineering'
  ],
  keywords: book.tags?.join(', ') || 'Adolf Rohrbach, German Aviation, Aircraft Design',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/books/adolf-rohrbach'
  }
}

export default function AdolfRohrbachPage() {

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src={book.imageUrl || '/book-covers/adolf-rohrbach.jpg'}
                  alt={`${book.title} by Charles E. MacKay`}
                  width={450}
                  height={675}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  £{book.price}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <div className="text-sm text-gray-300 mb-3 flex items-center gap-2">
                <span>Aviation Biography</span>
                <span>•</span>
                <span>German Pioneer</span>
                <span>•</span>
                <span>Aircraft Design</span>
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
                  <div className="text-sm text-gray-300 mb-1">Pages</div>
                  <div className="text-2xl font-bold">{book.pageCount}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Published</div>
                  <div className="text-2xl font-bold">{book.publicationYear}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">ISBN-13</div>
                  <div className="text-lg font-semibold">9781838056758</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Condition</div>
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
                    className="w-full bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors text-center block"
                  >
                    🛒 Buy Now on eBay
                  </a>
                  <button className="w-full border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 hover:text-gray-800 transition-colors">
                    📧 Contact for Academic Bulk Orders
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    href="/books"
                    className="text-gray-300 hover:text-gray-100 underline"
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
                This comprehensive study chronicles the revolutionary work of Adolf Rohrbach, the German engineer who transformed aviation through his pioneering all-metal aircraft construction techniques. From his early innovations in stressed-skin monocoque design to the development of the world's most advanced flying boats, Rohrbach's engineering legacy continues to influence modern aircraft manufacturing.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
                <p className="text-orange-800 font-semibold">🏆 ESSENTIAL REFERENCE</p>
                <p className="text-orange-700">Comprehensive coverage of the transition from wood-and-fabric to all-metal aircraft construction. Essential reading for understanding how German engineering innovations influenced global aviation development and modern manufacturing techniques.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Coverage</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Metal aircraft construction techniques</li>
                    <li>• Stressed-skin monocoque design</li>
                    <li>• Rohrbach Metall-Flugzeugbau company</li>
                    <li>• Roland flying boat development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Research Sources</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Rohrbach company archives</li>
                    <li>• Technical drawings and specifications</li>
                    <li>• Contemporary engineering reports</li>
                    <li>• German aviation museum records</li>
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
                    <span className="font-mono">1838056728</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISBN-13:</span>
                    <span className="font-mono">9781838056728</span>
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
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🔧 Engineering Innovation</h3>
              <p className="text-gray-700 mb-4">Comprehensive coverage of Rohrbach's revolutionary metal aircraft construction techniques, including stressed-skin monocoque design principles that transformed aviation manufacturing.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aluminum alloy applications</li>
                <li>• Stressed-skin construction</li>
                <li>• Manufacturing precision</li>
                <li>• Quality control systems</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">✈️ Aircraft Development</h3>
              <p className="text-gray-700 mb-4">Detailed technical analysis of Rohrbach aircraft designs, from the pioneering Ro I to the advanced Roland flying boats that demonstrated the potential of all-metal construction.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rohrbach Ro I development</li>
                <li>• Roland flying boat series</li>
                <li>• Multi-engine aircraft</li>
                <li>• Maritime aviation applications</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🌍 Global Influence</h3>
              <p className="text-gray-700 mb-4">Analysis of how Rohrbach's innovations influenced aircraft manufacturers worldwide, establishing all-metal construction as the industry standard for reliable, efficient aircraft.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• International technology transfer</li>
                <li>• Manufacturing standardization</li>
                <li>• Design philosophy influence</li>
                <li>• Legacy in modern aviation</li>
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
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-800">Metal Construction</h4>
                    <p className="text-sm text-gray-600">Revolutionary aluminum alloy applications for aircraft structures</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Stressed-Skin Design</h4>
                    <p className="text-sm text-gray-600">Integration of structural elements with aerodynamic surfaces</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Manufacturing Precision</h4>
                    <p className="text-sm text-gray-600">Advanced production techniques and quality control systems</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Innovation & Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Materials science:</strong> Advanced aluminum alloy applications</li>
                  <li>• <strong>Structural integration:</strong> Stressed-skin monocoque principles</li>
                  <li>• <strong>Manufacturing systems:</strong> Precision production techniques</li>
                  <li>• <strong>Quality assurance:</strong> Systematic inspection procedures</li>
                  <li>• <strong>Design philosophy:</strong> Functional engineering approach</li>
                  <li>• <strong>International impact:</strong> Global technology transfer</li>
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
                  <div className="text-3xl font-bold text-orange-600">{book.citationCount || 25}</div>
                  <div className="text-sm text-gray-600">Academic citations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">{book.difficulty}</div>
                  <div className="text-sm text-gray-600">Academic level</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-800">PRIMARY SOURCE</div>
                  <div className="text-sm text-gray-600">German aviation archives research</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Used by Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-orange-600">🏛️</span>
                  <span className="text-gray-700">Deutsches Technikmuseum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-600">🏛️</span>
                  <span className="text-gray-700">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-600">🏛️</span>
                  <span className="text-gray-700">Royal Aeronautical Society</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        {book.tableOfContents && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Table of Contents</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Main Chapters</h3>
                  <ol className="space-y-2 text-gray-700">
                    {book.tableOfContents.slice(0, Math.ceil(book.tableOfContents.length / 2)).map((chapter, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-orange-600 font-semibold text-sm mt-1">{index + 1}.</span>
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Additional Content</h3>
                  <ol className="space-y-2 text-gray-700">
                    {book.tableOfContents.slice(Math.ceil(book.tableOfContents.length / 2)).map((chapter, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-orange-600 font-semibold text-sm mt-1">{Math.ceil(book.tableOfContents.length / 2) + index + 1}.</span>
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sample Content */}
        {book.sampleContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Sample Content</h2>
            <div className="space-y-8">
              {book.sampleContent.map((content, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {content.chapter}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-800">{content.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{content.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author Insights */}
        {book.authorInsights && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Author Insights</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
              <p className="text-gray-700 leading-relaxed mb-4">{book.authorInsights}</p>
              {book.researchBackground && (
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Research Background</h4>
                  <p className="text-sm text-gray-600">{book.researchBackground}</p>
                </div>
              )}
              {book.academicValue && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Academic Value</h4>
                  <p className="text-sm text-gray-600">{book.academicValue}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Books */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Books</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/books/german-aircraft-great-war" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/german-aircraft-great-war.jpg"
                    alt="German Aircraft in the Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      German Aircraft in the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Comprehensive coverage of German aviation innovation during WWI, including the engineering developments that paved the way for Rohrbach's post-war metal aircraft revolution.
                    </p>
                    <div className="text-orange-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Blog Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/blog/adolf-rohrbach-metal-aircraft-construction" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/blog-images/metal-aircraft-construction.jpg"
                    alt="Metal aircraft construction"
                    width={80}
                    height={60}
                    className="rounded flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      Adolf Rohrbach: Metal Aircraft Revolution
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The visionary engineer who transformed aviation through revolutionary all-metal construction and stressed-skin monocoque design.
                    </p>
                    <div className="text-orange-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/blog/german-aircraft-great-war-development" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/blog-images/german-aircraft-albatros-d3-historical.jpg"
                    alt="German Albatros D3 aircraft"
                    width={80}
                    height={60}
                    className="rounded flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      German Aircraft Development in the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      How German aviation innovation during WWI laid the foundation for post-war aircraft construction techniques.
                    </p>
                    <div className="text-orange-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
