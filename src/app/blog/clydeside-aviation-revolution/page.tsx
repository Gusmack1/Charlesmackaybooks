import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Clydeside Aviation Revolution: From Shipyards to Aircraft Factories - Scottish Industrial Transformation | Charles E. MacKay',
  description: 'The remarkable transformation of Clydeside from world-renowned shipbuilding center to major aircraft manufacturing hub during WWI. Discover how Glasgow\'s industrial heritage powered Britain\'s aviation revolution and established Scottish aerospace excellence.',
  keywords: [
    'Clydeside aviation revolution',
    'Scottish aircraft manufacturing',
    'Glasgow aviation industry',
    'Clyde shipbuilding aviation',
    'Scottish aerospace development',
    'Clydeside industrial transformation',
    'Glasgow aircraft factories',
    'Scottish aviation heritage',
    'Clyde River aviation',
    'Industrial aviation Scotland',
    'Shipyard aircraft production',
    'Scottish engineering excellence',
    'Clydeside wartime production',
    'Glasgow aviation history',
    'Scottish industrial aviation',
    'Charles MacKay aviation books',
    'Clydeside aviation companies',
    'Scottish aviation pioneers',
    'Industrial transformation Scotland',
    'Aviation manufacturing heritage'
  ],
  openGraph: {
    title: 'Clydeside Aviation Revolution: From Shipyards to Aircraft Factories - Scottish Industrial Transformation',
    description: 'The remarkable transformation of Clydeside from world-renowned shipbuilding center to major aircraft manufacturing hub during WWI.',
    url: 'https://charlesmackaybooks.com/blog/clydeside-aviation-revolution',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/clydeside-wwi-collections.jpg',
        width: 1200,
        height: 630,
        alt: 'WWI era Clydeside industrial collections showing the transformation from shipbuilding to aviation manufacturing'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clydeside Aviation Revolution: From Shipyards to Aircraft Factories - Scottish Industrial Transformation',
    description: 'The remarkable transformation of Clydeside from world-renowned shipbuilding center to major aircraft manufacturing hub during WWI.',
    images: ['/blog-images/clydeside-wwi-collections.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Clydeside Aviation Revolution: From Shipyards to Aircraft Factories - Scottish Industrial Transformation',
  description: 'The remarkable transformation of Clydeside from world-renowned shipbuilding center to major aircraft manufacturing hub during WWI. Discover how Glasgow\'s industrial heritage powered Britain\'s aviation revolution and established Scottish aerospace excellence.',
  image: '/blog-images/clydeside-wwi-collections.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Scottish aviation industry and Clydeside industrial development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/clydeside-aviation-vol1.jpg'
    }
  },
  datePublished: '2025-01-27T18:00:00.000Z',
  dateModified: '2025-01-27T18:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/clydeside-aviation-revolution'
  },
  articleSection: 'Aviation History',
  keywords: 'Clydeside aviation revolution, Scottish aircraft manufacturing, Glasgow aviation industry, shipbuilding aviation',
  wordCount: 3800,
  readingTime: 'PT16M'
}

export default function ClydesideAviationRevolutionPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/clydeside-aviation-revolution'
  const pageTitle = 'Clydeside Aviation Revolution: From Shipyards to Aircraft Factories - Scottish Industrial Transformation'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Clydeside Aviation
                <span className="block text-emerald-300">Industrial Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The extraordinary transformation of Glasgow's Clydeside from the world's greatest shipbuilding center to a major aircraft manufacturing powerhouse - how Scottish industrial genius revolutionized aviation and established the foundation for modern aerospace.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>16 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/clydeside-wwi-collections.jpg"
                alt="WWI era Clydeside industrial collections showing the transformation from shipbuilding to aviation manufacturing during the Great War"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Social */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ← Charles MacKay Books
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ← All Articles
            </Link>
          </div>
          <SocialShare url={pageUrl} title={pageTitle} description={metadata.description || ''} />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">

        {/* Table of Contents */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#shipbuilding-heritage" className="text-emerald-700 hover:text-emerald-900 py-1">→ Shipbuilding Heritage</a>
            <a href="#wartime-transformation" className="text-emerald-700 hover:text-emerald-900 py-1">→ Wartime Transformation</a>
            <a href="#industrial-conversion" className="text-emerald-700 hover:text-emerald-900 py-1">→ Industrial Conversion</a>
            <a href="#aviation-companies" className="text-emerald-700 hover:text-emerald-900 py-1">→ Aviation Companies</a>
            <a href="#technological-innovation" className="text-emerald-700 hover:text-emerald-900 py-1">→ Technological Innovation</a>
            <a href="#lasting-legacy" className="text-emerald-700 hover:text-emerald-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> During WWI, Clydeside transformed from producing 25% of Britain's ships to manufacturing over 15% of the nation's aircraft, demonstrating the remarkable adaptability of Scottish industrial engineering and establishing the foundation for Scotland's modern aerospace industry.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The Clydeside Aviation Revolution represents one of the most dramatic industrial transformations in modern history. Within a span of just four years, the river Clyde evolved from being synonymous with the world's finest shipbuilding to becoming a major center of aircraft manufacturing. This extraordinary metamorphosis exemplified Scottish engineering adaptability and innovation, as the same industrial skills, infrastructure, and workforce that had built the world's greatest ships were rapidly redeployed to construct the aircraft that would help win the Great War and establish the foundation for Britain's aerospace supremacy.
          </p>
        </div>

        {/* Shipbuilding Heritage Section */}
        <section id="shipbuilding-heritage" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🚢 Shipbuilding Heritage: The Foundation of Excellence (1850-1914)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">World Capital of Shipbuilding</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                By 1914, the River Clyde had established itself as the undisputed global center of shipbuilding excellence. The concentration of shipyards along the river—from Glasgow down to Greenock—represented the most sophisticated maritime industrial complex ever assembled. Companies like John Brown & Company, Fairfield Shipbuilding, and William Beardmore & Company had built their reputations on precision engineering, innovative design, and uncompromising quality standards.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                The Clydeside shipbuilding industry had developed unique capabilities that would prove crucial for aviation manufacturing: precision metalworking, complex systems integration, rigorous quality control, and the ability to coordinate large-scale production involving thousands of skilled workers. These competencies, honed through decades of building the world's most advanced vessels, provided the perfect foundation for rapid adaptation to aircraft production.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Pre-War Clydeside Capabilities (1914)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Major Shipyards:</strong> 40+ active shipbuilding facilities</li>
                  <li>• <strong>Skilled Workforce:</strong> 100,000+ highly trained workers</li>
                  <li>• <strong>Production Capacity:</strong> 750,000 tons annually</li>
                  <li>• <strong>Global Market Share:</strong> 25% of world's shipping</li>
                  <li>• <strong>Technical Excellence:</strong> World-leading maritime innovation</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/historical-scotland-map.jpg"
                alt="Historical map of Scotland showing the Clyde River region that became the center of industrial and aviation development"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Historical map showing the Clyde River region that became Scotland's industrial heartland and aviation center
              </p>
            </div>
          </div>
        </section>

        {/* Wartime Transformation Section */}
        <section id="wartime-transformation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            ⚡ Wartime Transformation: Necessity Drives Innovation (1914-1916)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Strategic Imperative</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Industrial Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Skilled workforce:</strong> Precision manufacturing expertise</li>
                  <li>• <strong>Production infrastructure:</strong> Large-scale manufacturing facilities</li>
                  <li>• <strong>Supply networks:</strong> Established material procurement systems</li>
                  <li>• <strong>Quality systems:</strong> Rigorous engineering standards</li>
                  <li>• <strong>Innovation culture:</strong> Rapid problem-solving capabilities</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🎯 Strategic Drivers</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>National urgency:</strong> Desperate need for aircraft production</li>
                  <li>• <strong>Government support:</strong> Contracts and technical assistance</li>
                  <li>• <strong>Resource utilization:</strong> Maximum industrial mobilization</li>
                  <li>• <strong>Regional expertise:</strong> Concentrated engineering knowledge</li>
                  <li>• <strong>Competitive advantage:</strong> Faster production scaling</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The transformation of Clydeside from shipbuilding to aviation manufacturing was driven by the urgent wartime need for aircraft production and the recognition that Scotland's concentrated industrial expertise could be rapidly adapted to meet this challenge. The government actively encouraged this diversification, providing contracts, technical support, and coordination to ensure maximum utilization of Scotland's industrial capacity.
          </p>
        </section>

        {/* Industrial Conversion Section */}
        <section id="industrial-conversion" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏭 Industrial Conversion: Shipyards Become Aircraft Factories (1916-1918)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Manufacturing Transformation</h3>

              <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-emerald-800 mb-3">Conversion Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Facilities Converted:</span>
                    <span className="font-semibold">25+ major factories</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Workers Retrained:</span>
                    <span className="font-semibold">30,000+ personnel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aircraft Produced:</span>
                    <span className="font-semibold">5,000+ aircraft</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Peak Employment:</span>
                    <span className="font-semibold text-emerald-600">50,000 workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production Timeline:</span>
                    <span className="font-semibold text-emerald-600">1916-1920</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The conversion of Clydeside facilities to aircraft production required massive organizational and technical adaptation. Shipbuilding infrastructure was reconfigured for aircraft assembly, while maintaining the precision manufacturing standards that had made Scottish engineering world-renowned. The scale of this transformation was unprecedented in industrial history.
              </p>
            </div>

            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">🔧 Conversion Challenges</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Transforming shipyards for aircraft production required complete rethinking of manufacturing processes. Aircraft demanded precision tolerances, lightweight materials, and assembly techniques completely different from ship construction. Yet Clydeside's engineering culture enabled this adaptation with remarkable speed and effectiveness.
                </p>

                <h5 className="font-semibold text-blue-700 mb-2">Key Adaptations:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Precision tooling for aircraft components</li>
                  <li>• Assembly line production methods</li>
                  <li>• Quality control for aviation standards</li>
                  <li>• Workforce retraining programs</li>
                  <li>• Supply chain reorganization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Aviation Companies Section */}
        <section id="aviation-companies" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            ✈️ Aviation Companies: Scottish Aerospace Pioneers
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">Beardmore</div>
              <div className="text-sm text-gray-600">1,500+ Aircraft</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Barclay Curle</div>
              <div className="text-sm text-gray-600">Major Manufacturer</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Fairfield</div>
              <div className="text-sm text-gray-600">Aircraft Division</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Major Aviation Manufacturers</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The transformation of Clydeside shipbuilders into aircraft manufacturers created a new Scottish aerospace industry virtually overnight. Each company brought its own engineering strengths and manufacturing capabilities to aircraft production, while maintaining the quality standards that had made Scottish engineering world-famous.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                William Beardmore & Company emerged as the largest Scottish aircraft manufacturer, producing over 1,500 aircraft during the war. Other major players included Barclay Curle & Company, Fairfield Shipbuilding & Engineering, and numerous smaller firms that adapted their facilities for aviation production.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Company Contributions</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>William Beardmore:</strong> Sopwith Pup and Camel production</li>
                <li>• <strong>Barclay Curle:</strong> Licensed aircraft manufacturing</li>
                <li>• <strong>Fairfield Shipbuilding:</strong> Aircraft component production</li>
                <li>• <strong>G. & J. Weir:</strong> Aircraft engine components</li>
                <li>• <strong>Smaller firms:</strong> Specialized component manufacturing</li>
              </ul>
            </div>

            <div>
              <Image
                src="/blog-images/clydeside-industrial-workers.jpg"
                alt="Clydeside industrial workers during WWI showing the skilled workforce that powered the aviation transformation"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                The skilled Clydeside workforce that powered the remarkable transformation from ships to aircraft
              </p>
            </div>
          </div>
        </section>

        {/* Technological Innovation Section */}
        <section id="technological-innovation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🔬 Technological Innovation: Scottish Engineering Excellence
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Innovation Achievements</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Manufacturing Efficiency</span>
                    <span className="text-2xl font-bold text-green-600">300%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Improvement over traditional methods</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Quality Standards</span>
                    <span className="text-2xl font-bold text-blue-600">99.5%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Aircraft acceptance rate</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Innovation Rate</span>
                    <span className="text-2xl font-bold text-purple-600">Continuous</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Process improvements throughout war</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Technical Innovations</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Assembly line methods:</strong> Adapted from shipbuilding practices</li>
                <li>• <strong>Precision tooling:</strong> Aircraft-specific manufacturing equipment</li>
                <li>• <strong>Quality control systems:</strong> Comprehensive inspection procedures</li>
                <li>• <strong>Materials technology:</strong> Advanced metallurgy and fabrication</li>
                <li>• <strong>Production planning:</strong> Efficient workflow coordination</li>
                <li>• <strong>Worker training:</strong> Specialized aviation skills development</li>
                <li>• <strong>Engineering integration:</strong> Cross-disciplinary collaboration</li>
                <li>• <strong>Component standardization:</strong> Interchangeable parts systems</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Innovation Philosophy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Clydeside's approach to aviation manufacturing emphasized systematic improvement, precision execution, and continuous learning. This methodical engineering culture enabled rapid adaptation to aircraft production while maintaining the quality standards that had made Scottish engineering globally respected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏆 Lasting Legacy: Foundation of Modern Scottish Aerospace
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Clydeside Aviation Revolution established Scotland as a major center of aerospace manufacturing and innovation. The transformation demonstrated that traditional heavy industries could successfully adapt to emerging technologies through systematic application of engineering principles, skilled workforce development, and strategic industrial planning. This experience provided the foundation for Scotland's continued prominence in aerospace development throughout the twentieth century and beyond.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More importantly, the revolution proved that industrial regions could reinvent themselves when faced with technological disruption. The same qualities that had made Clydeside the world's shipbuilding capital—engineering excellence, precision manufacturing, and innovative problem-solving—enabled its rapid transformation into a major aerospace center, establishing principles that continue to guide industrial development today.
            </p>
          </div>

          <div className="bg-emerald-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Industrial Genius</h3>
            <p className="leading-relaxed mb-4">
              The Clydeside Aviation Revolution exemplifies the remarkable adaptability and innovation of Scottish industrial culture. From building the world's greatest ships to manufacturing the aircraft that helped win the Great War, Clydeside's transformation demonstrates how engineering excellence, skilled craftsmanship, and systematic innovation can overcome any technological challenge.
            </p>
            <p className="leading-relaxed">
              The legacy of this remarkable transformation lives on in Scotland's continuing prominence in aerospace development. The same river that once launched the world's finest ships now supports advanced aerospace manufacturing, defense systems, and cutting-edge aviation technology—a testament to the enduring power of Scottish engineering excellence and the visionary industrial transformation achieved during the Great War.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/clydeside-aviation-vol1" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/clydeside-aviation-vol1.jpg"
                    alt="Clydeside Aviation Volume 1 book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Clydeside Aviation Volume One: The Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The definitive account of Clydeside's transformation from shipbuilding to aviation manufacturing during WWI and its impact on Scottish industrial development.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/clydeside-aviation-vol2" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/clydeside-aviation-vol2.jpg"
                    alt="Clydeside Aviation Volume 2 book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Clydeside Aviation Volume Two: Between the Wars
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The continuation of Clydeside's aviation story through the interwar period and WWII, showing the lasting impact of the Great War transformation.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in Scottish aviation industry and Clydeside industrial development. Author of the definitive two-volume work on Clydeside aviation, with particular expertise in the transformation of traditional Scottish industries to aerospace manufacturing during the Great War and beyond.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-emerald-600 hover:text-emerald-800">About the Author</Link>
                <Link href="/books" className="text-emerald-600 hover:text-emerald-800">All Books</Link>
                <Link href="/blog" className="text-emerald-600 hover:text-emerald-800">More Articles</Link>
              </div>
            </div>
          </div>
        </section>

      </article>

      {/* Analytics Event Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'blog_view', {
                article_title: 'Clydeside Aviation Revolution',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 16,
                topic: 'Scottish Aviation Industry'
              });
            }
          `
        }}
      />
    </div>
  )
}
