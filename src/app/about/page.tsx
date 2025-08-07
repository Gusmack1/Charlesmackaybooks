import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About Charles E. MacKay - Aviation Historian & Author | Charles E. MacKay Aviation Books',
  description: 'Meet Charles E. MacKay, renowned aviation historian specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history. Based in Glasgow, Scotland.',
  keywords: [
    'Charles E MacKay',
    'aviation historian',
    'Scottish aviation history',
    'WWI aviation expert',
    'WWII aircraft historian',
    'military aviation author',
    'helicopter development expert',
    'jet age aviation',
    'naval aviation historian',
    'Glasgow aviation expert',
    'aircraft development history',
    'aviation biography'
  ],
  openGraph: {
    title: 'About Charles E. MacKay - Aviation Historian & Author',
    description: 'Meet Charles E. MacKay, renowned aviation historian specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.',
    url: 'https://charlesmackaybooks.com/about',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: 'https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles E. MacKay - Aviation Historian'
      }
    ],
    locale: 'en_GB',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Charles E. MacKay - Aviation Historian & Author',
    description: 'Meet Charles E. MacKay, renowned aviation historian specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.',
    images: ['https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg'],
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Charles E. MacKay",
  "alternateName": "Charles MacKay",
  "description": "Aviation historian and author specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history",
  "url": "https://charlesmackaybooks.com/about",
  "image": "https://charlesmackaybooks.com/charles-mackay-aviation-historian.jpg",
  "jobTitle": "Aviation Historian & Author",
  "knowsAbout": [
    "Scottish Aviation History",
    "WWI Aviation",
    "WWII Aviation",
    "Helicopter History",
    "Jet Age Aviation",
    "Naval Aviation",
    "Military Aviation",
    "Aircraft Development"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Aviation Historian",
    "occupationLocation": {
      "@type": "City",
      "name": "Glasgow",
      "containedInPlace": {
        "@type": "Country",
        "name": "Scotland"
      }
    }
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University of Glasgow"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "charlese1mackay@hotmail.com",
    "contactType": "author"
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Author Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="/charles-mackay-aviation-historian.jpg"
                  alt="Charles E. MacKay - Aviation Historian & Author"
                  width={384}
                  height={384}
                  className="w-96 h-96 rounded-full object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Personal Aviation Memory - Hero Section */}
            <div className="lg:col-span-2 mt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">A Personal Aviation Memory</h3>
                <div className="flex gap-4 items-start">
                  <Image
                    src="/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg"
                    alt="Charles E. MacKay with De Havilland Chipmunk WP808 at Turnhouse airfield, February 13, 1971"
                    width={120}
                    height={80}
                    className="rounded shadow-lg flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-white mb-2">
                      <strong>Charles with De Havilland Chipmunk WP808 at Turnhouse airfield on February 13, 1971.</strong> This iconic photograph captures a pivotal moment in Charles MacKay's aviation journey, standing beside the very aircraft that would later become the subject of his comprehensive research. The Chipmunk WP808 represents the bridge between wartime training aircraft and post-war aviation development, embodying the transition from military to civilian aviation that has been a central theme in MacKay's historical work.
                    </p>
                    <p className="text-sm text-white mb-2">
                      This personal connection to aviation history reflects his lifelong passion for preserving the stories of aircraft and the people who flew them. The image symbolizes the hands-on approach that characterizes MacKay's research methodology - combining archival investigation with personal experience and direct engagement with aviation heritage.
                    </p>
                    <Link
                      href="/blog/de-havilland-chipmunk-wp808-turnhouse"
                      className="text-white hover:text-gray-200 text-sm font-medium underline"
                    >
                      Read the full story of WP808 and Turnhouse airfield →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                About Charles E. MacKay
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed">
                Aviation historian and author specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history. With 19 published books and extensive archival research, Charles MacKay is recognized as a leading authority on aviation development.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white mb-1">Published Books</div>
                  <div className="text-2xl font-bold text-white">19</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white mb-1">Years Research</div>
                  <div className="text-2xl font-bold text-white">25+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white mb-1">Specialty</div>
                  <div className="text-lg font-semibold text-white">Scottish Aviation</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white mb-1">Location</div>
                  <div className="text-lg font-semibold text-white">Glasgow, Scotland</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/books"
                  className="badge badge-blue px-8 py-3 rounded-lg font-bold transition-colors text-center"
                >
                  Browse Books
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors text-center"
                >
                  Contact Author
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Biography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Biography</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Charles E. MacKay is a distinguished aviation historian based in Glasgow, Scotland, whose extensive research has transformed our understanding of Scottish aviation heritage. Over the past 25 years, his meticulous archival work has uncovered previously unknown aspects of aviation development, particularly focusing on Scottish contributions to military and civilian aircraft advancement.
              </p>
              <p className="text-lg text-secondary mb-6 leading-relaxed">
                His academic approach combines rigorous primary source research with accessible writing, making complex aviation history understandable for both scholars and enthusiasts. MacKay's work is particularly noted for its comprehensive coverage of industrial aviation development, from early pioneers through the jet age.
              </p>
              <p className="text-lg text-secondary mb-6 leading-relaxed">
                As an alumnus of the University of Glasgow, MacKay brings academic rigor to his historical research while maintaining a passionate commitment to preserving Scotland's aviation legacy for future generations.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-primary mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>charlese1mackay@hotmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Glasgow, Scotland</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏛️</span>
                    <span>University of Glasgow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>19 Published Books</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Areas of Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Scottish Aviation Heritage</h3>
              <p className="text-secondary mb-4">Comprehensive research into Scotland's contribution to aviation development, from early pioneers to modern aerospace.</p>
              <ul className="text-sm text-secondary space-y-1">
                <li>• Clydeside aviation history</li>
                <li>• Industrial aviation development</li>
                <li>• Scottish aircraft manufacturers</li>
                <li>• Regional aviation growth</li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Military Aviation History</h3>
              <p className="text-secondary mb-4">Detailed analysis of military aviation development through two world wars and the Cold War period.</p>
              <ul className="text-sm text-secondary space-y-1">
                <li>• WWI aviation operations</li>
                <li>• WWII aircraft development</li>
                <li>• Cold War jet fighters</li>
                <li>• Naval aviation history</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Aircraft Development</h3>
              <p className="text-secondary mb-4">Technical and historical analysis of aircraft design evolution from early biplanes to modern jets.</p>
              <ul className="text-sm text-secondary space-y-1">
                <li>• Test pilot biographies</li>
                <li>• Helicopter development</li>
                <li>• Jet age innovation</li>
                <li>• Manufacturing techniques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Academic Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Academic Recognition & Usage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Referenced By Leading Institutions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">Imperial War Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">Royal Air Force Museum</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">University of Glasgow</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">Edinburgh University</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">National Museums Scotland</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🏛️</span>
                  <span className="text-secondary">Royal Aeronautical Society</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Research Impact</h3>
              <div className="space-y-4">
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-secondary">Academic citations</div>
                </div>
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-secondary">University courses using books</div>
                </div>
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-secondary">Years of research</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Featured Publications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/beardmore-aviation">
                  Beardmore Aviation: Scottish Industrial Giant
                </Link>
              </h3>
              <p className="text-secondary mb-4">Comprehensive history of Beardmore's transformation from shipbuilding to aviation manufacturing, including the R101 airship project.</p>
              <Link
                href="/books/beardmore-aviation"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View Book
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/clydeside-aviation-vol1">
                  Clydeside Aviation Volume One: The Great War
                </Link>
              </h3>
              <p className="text-secondary mb-4">First volume covering aviation activities on the Clyde during WWI, documenting Scotland's crucial role in early military aviation.</p>
              <Link
                href="/books/clydeside-aviation-vol1"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View Book
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-blue-600 hover:text-blue-800">
                <Link href="/books/captain-eric-brown">
                  Captain Eric Brown: Test Pilot Extraordinary
                </Link>
              </h3>
              <p className="text-secondary mb-4">Biography of the legendary test pilot who flew 487 different aircraft types and revolutionized test flying safety.</p>
              <Link
                href="/books/captain-eric-brown"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View Book
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/books"
              className="badge badge-blue px-8 py-3 rounded-lg font-bold transition-colors"
            >
              View All 19 Books
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
