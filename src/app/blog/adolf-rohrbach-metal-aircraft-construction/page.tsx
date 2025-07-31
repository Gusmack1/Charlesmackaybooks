import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer | Charles E. MacKay',
  description: 'The story of how Adolf Rohrbach transformed aviation with revolutionary all-metal aircraft construction techniques and stressed-skin monocoque design principles that influenced modern aerospace.',
  keywords: [
    'Adolf Rohrbach',
    'metal aircraft construction',
    'all-metal aircraft',
    'stressed-skin construction',
    'aviation engineering',
    'Rohrbach Metall-Flugzeugbau',
    'aircraft design innovation',
    'metal aircraft pioneer',
    'aviation history',
    'Charles MacKay aviation books'
  ],
  openGraph: {
    title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer',
    description: 'The story of how Adolf Rohrbach transformed aviation with revolutionary all-metal aircraft construction techniques.',
    url: 'https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-construction',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/metal-aircraft-construction.jpg',
        width: 1200,
        height: 630,
        alt: 'Adolf Rohrbach metal aircraft construction techniques'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer',
    description: 'The story of how Adolf Rohrbach transformed aviation with revolutionary all-metal aircraft construction techniques.',
    images: ['/blog-images/metal-aircraft-construction.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer',
  description: 'The story of how Adolf Rohrbach transformed aviation with revolutionary all-metal aircraft construction techniques.',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    url: 'https://charlesmackay.co.uk',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay - Aviation Historian',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackay.co.uk/logo.png',
    },
  },
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackay.co.uk/blog/adolf-rohrbach-metal-aircraft-construction/',
  },
  image: {
    '@type': 'ImageObject',
    url: '/blog-images/metal-aircraft-construction.jpg',
    width: 1200,
    height: 800,
  },
  keywords: 'Adolf Rohrbach, metal aircraft construction, all-metal aircraft, stressed-skin construction, aviation engineering',
}

export default function AdolfRohrbachPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-construction'
  const pageTitle = 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
                Engineering Pioneer
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Adolf Rohrbach: Metal Aircraft Revolution
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                The visionary engineer who transformed aviation through revolutionary all-metal construction and stressed-skin monocoque design
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
                <span>• Metal Construction Pioneer</span>
                <span>• Stressed-Skin Innovation</span>
                <span>• Engineering Excellence</span>
                <span>• Aviation Revolution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-slate-50 rounded-lg p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="text-orange-600 mr-2">📖</span>
                Table of Contents
              </h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <a href="#early-life" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  1. Early Life and Engineering Vision
                </a>
                <a href="#metal-construction" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  2. Revolutionary Metal Construction
                </a>
                <a href="#stressed-skin" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  3. Stressed-Skin Monocoque Design
                </a>
                <a href="#rohrbach-aircraft" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  4. Rohrbach Aircraft Development
                </a>
                <a href="#global-influence" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  5. Global Aviation Influence
                </a>
                <a href="#lasting-legacy" className="text-orange-600 hover:text-orange-800 py-1 px-2 rounded hover:bg-orange-50 transition-colors">
                  6. Lasting Engineering Legacy
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Opening Image */}
          <div className="mb-12">
            <Image
              src="/blog-images/metal-aircraft-construction.jpg"
              alt="Adolf Rohrbach's revolutionary metal aircraft construction techniques showcasing advanced engineering"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-lg"
              priority
            />
            <p className="text-sm text-slate-600 text-center mt-2 italic">
              Adolf Rohrbach's revolutionary metal aircraft construction techniques that transformed aviation engineering
            </p>
          </div>

          {/* Early Life Section */}
          <section id="early-life" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Early Life and Engineering Vision
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Born in Nuremberg in 1889, Adolf Rohrbach emerged as one of aviation's most revolutionary engineering minds during the crucial early decades of flight. Unlike his contemporaries who focused primarily on achieving flight, Rohrbach possessed the foresight to recognize that aviation's future lay not just in getting aircraft airborne, but in fundamentally rethinking how they should be constructed.
              </p>

              <p>
                Rohrbach's education at the Technical University of Munich provided him with a solid foundation in mechanical engineering and metallurgy that would prove crucial to his later innovations. His analytical approach to engineering problems, combined with an intuitive understanding of structural mechanics, positioned him perfectly to tackle the challenge of creating more durable, efficient aircraft structures.
              </p>

              <p>
                What distinguished Rohrbach from other aviation pioneers was his systematic methodology and refusal to accept traditional wood-and-fabric construction as the industry standard. He envisioned aircraft as integrated engineering systems where every component contributed to overall structural integrity and performance, a revolutionary concept that would transform aviation manufacturing.
              </p>
            </div>
          </section>

          {/* Metal Construction Section */}
          <section id="metal-construction" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Revolutionary All-Metal Construction
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Rohrbach's breakthrough came with his recognition that aluminum alloys could provide superior strength-to-weight ratios compared to traditional aircraft materials. While other designers viewed metal as too heavy or difficult to work with, Rohrbach saw its potential for creating aircraft that were both stronger and more durable than their wood-and-fabric counterparts.
              </p>

              <p>
                His approach to metal construction involved developing entirely new manufacturing techniques that could shape and join aluminum panels with unprecedented precision. These methods required specialized tools and jigs that ensured consistent quality and dimensional accuracy across multiple aircraft—a level of manufacturing sophistication previously unknown in aviation.
              </p>

              <p>
                The key innovation lay in Rohrbach's understanding of how to distribute structural loads throughout the aircraft's metal framework. By carefully calculating stress patterns and designing joints that could handle multiple load paths, he created structures that were remarkably resilient to both normal flight loads and unexpected stresses. For a comprehensive exploration of Rohrbach's engineering methods and aircraft designs, see <Link href="/books/adolf-rohrbach" className="text-orange-600 hover:text-orange-800 underline font-medium">Adolf Rohrbach's Metal Airplanes</Link>.
              </p>
            </div>
          </section>

          {/* Rohrbach Aircraft Image */}
          <div className="mb-12">
            <Image
              src="/blog-images/rohrbach-ro-ix-aircraft.jpg"
              alt="Rohrbach Ro IX aircraft showcasing all-metal construction techniques"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-slate-600 text-center mt-2 italic">
              The Rohrbach Ro IX aircraft, demonstrating advanced all-metal construction techniques in aviation design
            </p>
          </div>

          {/* Stressed-Skin Section */}
          <section id="stressed-skin" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Stressed-Skin Monocoque Innovation
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Perhaps Rohrbach's most significant contribution to aviation was his development of stressed-skin monocoque construction, a technique that transformed the aircraft's outer covering from a simple weather barrier into an integral structural component. This approach represented a radical departure from conventional thinking about aircraft design.
              </p>

              <p>
                The stressed-skin concept involved designing the aircraft's metal skin panels to share structural loads with the internal framework, creating a unified structure that was both lighter and stronger than traditional designs. This integration required precise engineering calculations to ensure that loads were distributed evenly throughout the structure without creating dangerous stress concentrations.
              </p>

              <p>
                Manufacturing stressed-skin aircraft demanded new levels of precision in both panel shaping and assembly procedures. Rohrbach developed sophisticated riveting patterns and joint designs that maintained structural integrity while providing the smooth surfaces essential for efficient aerodynamic performance. These techniques became the foundation for modern aircraft construction methods.
              </p>
            </div>
          </section>

          {/* Rohrbach Aircraft Section */}
          <section id="rohrbach-aircraft" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Rohrbach Aircraft Development and Achievements
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                The Rohrbach Ro I, introduced in 1922, served as the proving ground for his revolutionary construction methods. This aircraft demonstrated that all-metal construction could produce aircraft that were not only more durable than conventional designs but also offered superior performance characteristics through improved structural efficiency and aerodynamic smoothness. The complete story of Rohrbach's aircraft development, including detailed technical specifications and production history, is available in <Link href="/books/adolf-rohrbach" className="text-orange-600 hover:text-orange-800 underline font-medium">Adolf Rohrbach's Metal Airplanes</Link>.
              </p>

              <p>
                Subsequent Rohrbach designs, including the impressive Roland flying boats, showcased the scalability of his construction techniques. These large aircraft proved that metal construction methods could be successfully applied to multi-engine designs, passenger aircraft, and specialized applications where structural reliability was paramount.
              </p>

              <p>
                The success of Rohrbach flying boats in challenging marine environments particularly demonstrated the advantages of all-metal construction. The corrosion resistance and structural durability of properly designed metal aircraft proved superior to traditional materials when operating in harsh conditions, establishing new standards for aviation reliability and operational longevity.
              </p>
            </div>
          </section>

          {/* Aircraft Manufacturing Image */}
          <div className="mb-12">
            <Image
              src="/blog-images/aircraft-factory-assembly-line.jpg"
              alt="Aircraft factory assembly line showcasing modern manufacturing techniques"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-slate-600 text-center mt-2 italic">
              Modern aircraft manufacturing assembly line, demonstrating the legacy of Rohrbach's production innovations
            </p>
          </div>

          {/* Global Influence Section */}
          <section id="global-influence" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Global Aviation Industry Transformation
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Rohrbach's innovations transcended national boundaries, influencing aircraft manufacturers worldwide who recognized the superior advantages of all-metal construction. Major American manufacturers, including Boeing, Douglas, and Lockheed, studied and adapted his techniques, incorporating stressed-skin construction principles into their own revolutionary designs. For more on the broader context of German aviation innovation during this period, see <Link href="/books/german-aircraft-great-war" className="text-orange-600 hover:text-orange-800 underline font-medium">German Aircraft in the Great War</Link>.
              </p>

              <p>
                The success of iconic aircraft like the Douglas DC-3 and Boeing 247 owed significant debt to construction principles first demonstrated by Rohrbach. These aircraft proved that his engineering concepts could be successfully scaled and adapted for commercial aviation, establishing all-metal construction as the industry standard for reliable, efficient aircraft.
              </p>

              <p>
                Military aviation authorities worldwide quickly recognized the strategic advantages of all-metal construction, particularly the improved damage tolerance and operational reliability that metal aircraft offered in combat conditions. This recognition led to widespread adoption of Rohrbach-influenced design principles in military aircraft development throughout the 1930s and beyond.
              </p>
            </div>
          </section>

          {/* Lasting Legacy Section */}
          <section id="lasting-legacy" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-600">
              Enduring Engineering Legacy
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                The fundamental principles established by Adolf Rohrbach continue to influence modern aircraft design nearly a century after their introduction. Contemporary composite construction methods apply similar integration concepts, where structural elements and outer surfaces work together to optimize strength, weight, and aerodynamic efficiency.
              </p>

              <p>
                Modern manufacturing techniques pioneered by Rohrbach evolved into today's precision aerospace manufacturing systems. Computer-aided design and automated production methods now achieve the dimensional accuracy and quality consistency that Rohrbach accomplished through careful manual craftsmanship, but the underlying principles remain unchanged.
              </p>

              <p>
                Rohrbach's influence extends beyond aviation into automotive, marine, and aerospace engineering, where lightweight, high-strength structures remain essential. His systematic approach to engineering integration and quality control established standards that continue to guide advanced manufacturing across multiple industries, demonstrating the enduring value of innovative engineering thinking.
              </p>
            </div>
          </section>

          {/* Related Books Section */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              📚 Related Aviation History Books by Charles E. MacKay
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Adolf Rohrbach's Metal Airplanes</h3>
                <p className="text-slate-700 mb-4 text-sm">
                  The definitive book on Adolf Rohrbach and his revolutionary metal aircraft construction techniques. Covers the Rohrbach Metall-Flugzeugbau company and innovations in stressed-skin monocoque design.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">£12.86</span>
                  <Link
                    href="/books/adolf-rohrbach"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    View Book
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-lg text-slate-900 mb-2">German Aircraft in the Great War</h3>
                <p className="text-slate-700 mb-4 text-sm">
                  Comprehensive coverage of German aviation innovation during WWI, including the engineering developments that paved the way for Rohrbach's post-war metal aircraft revolution.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">£12.95</span>
                  <Link
                    href="/books/german-aircraft-great-war"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    View Book
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/books"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                🛒 Browse All Aviation Books
              </Link>
            </div>
          </div>

          {/* Related Blog Posts */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              📖 Related Blog Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/german-aircraft-great-war-development" className="group">
                <div className="bg-white rounded-lg p-6 shadow-md group-hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <Image
                      src="/blog-images/german-aircraft-albatros-d3-historical.jpg"
                      alt="German Albatros D3 aircraft"
                      width={80}
                      height={60}
                      className="rounded flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        German Aircraft Development in the Great War
                      </h3>
                      <p className="text-slate-700 text-sm">
                        How German aviation innovation during WWI laid the foundation for post-war aircraft construction techniques.
                      </p>
                      <div className="text-blue-600 text-sm mt-2">Read more →</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/blog/aviation-manufacturing-wartime-production" className="group">
                <div className="bg-white rounded-lg p-6 shadow-md group-hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <Image
                      src="/blog-images/aircraft-factory-assembly-line.jpg"
                      alt="Aircraft factory assembly line"
                      width={80}
                      height={60}
                      className="rounded flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        Aviation Manufacturing: Wartime Production
                      </h3>
                      <p className="text-slate-700 text-sm">
                        The evolution of aircraft manufacturing techniques from wartime production to modern aerospace.
                      </p>
                      <div className="text-blue-600 text-sm mt-2">Read more →</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Social Share */}
          <div className="mb-12">
            <SocialShare
              url="https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-construction"
              title="Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer"
              description="The story of how Adolf Rohrbach transformed aviation with revolutionary all-metal aircraft construction techniques and stressed-skin monocoque design principles that influenced modern aerospace."
              hashtags={['AdolfRohrbach', 'MetalAircraft', 'AviationEngineering', 'AircraftConstruction', 'AviationHistory', 'CharlesMacKay', 'AviationPioneer']}
            />
          </div>

          {/* Author Bio */}
          <div className="bg-slate-100 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600">
                CM
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Charles E. MacKay</h3>
                <p className="text-slate-700 mb-3">
                  Aviation Historian & Author specializing in Scottish Aviation History, WWI & WWII Aircraft
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Published aviation historian with extensive research into aircraft construction innovation and engineering pioneers. Charles MacKay's work explores the technical developments that transformed aviation from experimental craft to reliable transportation, focusing on visionary engineers like Adolf Rohrbach who revolutionized the industry.
                </p>
                <div className="flex items-center space-x-4 mt-4 text-sm">
                  <span className="text-slate-600">📧 charlese1mackay@hotmail.com</span>
                  <span className="text-slate-600">📍 Glasgow, Scotland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
