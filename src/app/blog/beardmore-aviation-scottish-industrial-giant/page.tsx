import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Beardmore Aviation: Scottish Industrial Giant from Shipbuilding to Aircraft Manufacturing | Charles E. MacKay',
  description: 'The remarkable transformation of William Beardmore & Company from Clydeside shipbuilding giant to major WWI aircraft manufacturer. Discover how this Scottish industrial powerhouse shaped British aviation history and contributed to the war effort.',
  keywords: [
    'Beardmore aviation',
    'William Beardmore Company',
    'Scottish aircraft manufacturing',
    'Clydeside aviation',
    'Beardmore aircraft WWI',
    'Scottish shipbuilding aviation',
    'Dalmuir aircraft factory',
    'Beardmore engines',
    'Scottish industrial aviation',
    'Clydeside industrial giant',
    'Beardmore Sopwith production',
    'Scottish aviation heritage',
    'William Beardmore shipbuilding',
    'Industrial aviation Scotland',
    'Beardmore aircraft engines',
    'Charles MacKay aviation books',
    'Scottish aviation industry',
    'Clydeside manufacturing',
    'Aviation industrial history',
    'Scottish engineering excellence'
  ],
  openGraph: {
    title: 'Beardmore Aviation: Scottish Industrial Giant from Shipbuilding to Aircraft Manufacturing',
    description: 'The remarkable transformation of William Beardmore & Company from Clydeside shipbuilding giant to major WWI aircraft manufacturer.',
    url: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/beardmore-factory-worker-manufacturing.jpg',
        width: 1200,
        height: 630,
        alt: 'Beardmore factory worker at manufacturing machinery showing the Scottish industrial excellence that powered aviation development'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beardmore Aviation: Scottish Industrial Giant from Shipbuilding to Aircraft Manufacturing',
    description: 'The remarkable transformation of William Beardmore & Company from Clydeside shipbuilding giant to major WWI aircraft manufacturer.',
    images: ['/blog-images/beardmore-factory-worker-manufacturing.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Beardmore Aviation: Scottish Industrial Giant from Shipbuilding to Aircraft Manufacturing',
  description: 'The remarkable transformation of William Beardmore & Company from Clydeside shipbuilding giant to major WWI aircraft manufacturer. Discover how this Scottish industrial powerhouse shaped British aviation history and contributed to the war effort.',
  image: '/blog-images/beardmore-factory-worker-manufacturing.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Scottish aviation industry and industrial aviation development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/beardmore-aviation.jpg'
    }
  },
  datePublished: '2025-01-27T17:00:00.000Z',
  dateModified: '2025-01-27T17:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant'
  },
  articleSection: 'Aviation History',
  keywords: 'Beardmore aviation, Scottish aircraft manufacturing, Clydeside aviation, William Beardmore Company',
  wordCount: 3600,
  readingTime: 'PT15M'
}

export default function BeardmoreAviationPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant'
  const pageTitle = 'Beardmore Aviation: Scottish Industrial Giant from Shipbuilding to Aircraft Manufacturing'

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
                Beardmore Aviation
                <span className="block text-emerald-300">Scottish Industrial Giant</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The extraordinary transformation of William Beardmore & Company from Clydeside shipbuilding powerhouse to major WWI aircraft manufacturer - how Scottish industrial engineering excellence shaped British aviation history and the wartime sky.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>15 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/beardmore-factory-worker-manufacturing.jpg"
                alt="Beardmore factory worker at precision manufacturing machinery showing the Scottish industrial excellence that powered aviation development during WWI"
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
            <a href="#industrial-foundation" className="text-emerald-700 hover:text-emerald-900 py-1">→ Industrial Foundation</a>
            <a href="#aviation-entry" className="text-emerald-700 hover:text-emerald-900 py-1">→ Entry into Aviation</a>
            <a href="#aircraft-production" className="text-emerald-700 hover:text-emerald-900 py-1">→ Aircraft Production</a>
            <a href="#engine-development" className="text-emerald-700 hover:text-emerald-900 py-1">→ Engine Development</a>
            <a href="#wartime-contribution" className="text-emerald-700 hover:text-emerald-900 py-1">→ Wartime Contribution</a>
            <a href="#lasting-legacy" className="text-emerald-700 hover:text-emerald-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> William Beardmore & Company produced over 1,500 aircraft during WWI, transforming from purely shipbuilding operations to become one of Britain's major aircraft manufacturers, demonstrating the rapid industrial mobilization of Scottish engineering excellence.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The story of Beardmore Aviation represents one of the most remarkable industrial transformations of the Great War era. William Beardmore & Company, already established as one of Scotland's premier shipbuilding and engineering concerns, successfully diversified into aircraft manufacturing to become a cornerstone of Britain's wartime aviation production. This Scottish industrial giant's journey from Clydeside shipyards to aircraft factories exemplifies the engineering versatility and rapid adaptation that characterized British industrial mobilization during the First World War.
          </p>
        </div>

        {/* Industrial Foundation Section */}
        <section id="industrial-foundation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏭 Industrial Foundation: From Shipbuilding to Engineering Excellence (1886-1914)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Clydeside Engineering Heritage</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 1886 by William Beardmore, the company rapidly established itself as one of the Clyde's premier heavy engineering concerns. Based in Dalmuir, near Glasgow, Beardmore's works became synonymous with quality shipbuilding, marine engineering, and precision manufacturing. The company's reputation was built on naval construction, including warships for the Royal Navy and merchant vessels for global trade.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                By 1914, Beardmore had expanded beyond shipbuilding to encompass steel production, armor plate manufacturing, and precision engineering. This diversified industrial capability would prove crucial when the demands of aviation manufacturing required rapid adaptation of existing production facilities and skilled workforce deployment.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Pre-War Capabilities (1914)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Shipbuilding:</strong> Naval and merchant vessel construction</li>
                  <li>• <strong>Steel production:</strong> High-quality metallurgy expertise</li>
                  <li>• <strong>Armor plate:</strong> Military specification manufacturing</li>
                  <li>• <strong>Marine engines:</strong> Power plant design and production</li>
                  <li>• <strong>Precision engineering:</strong> Complex machinery fabrication</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/beardmore-shipbuilding-advertisement.jpg"
                alt="Beardmore shipbuilding advertisement showing the company's naval construction expertise before entering aviation"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Beardmore's shipbuilding heritage provided the engineering foundation for aviation manufacturing expansion
              </p>
            </div>
          </div>
        </section>

        {/* Aviation Entry Section */}
        <section id="aviation-entry" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            ✈️ Entry into Aviation: Strategic Diversification (1914-1916)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Wartime Opportunity and Challenge</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Strategic Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Engineering expertise:</strong> Complex manufacturing experience</li>
                  <li>• <strong>Skilled workforce:</strong> Precision machining capabilities</li>
                  <li>• <strong>Production facilities:</strong> Large-scale manufacturing infrastructure</li>
                  <li>• <strong>Supply networks:</strong> Established material procurement</li>
                  <li>• <strong>Quality control:</strong> Military specification standards</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-3">⚡ Adaptation Challenges</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>New technology:</strong> Aviation engineering unfamiliar</li>
                  <li>• <strong>Rapid scaling:</strong> Urgent production requirements</li>
                  <li>• <strong>Specialized materials:</strong> Aircraft-specific components</li>
                  <li>• <strong>Quality demands:</strong> Life-critical precision requirements</li>
                  <li>• <strong>Competition:</strong> Established aviation manufacturers</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Beardmore's entry into aviation manufacturing was driven by wartime necessity and government encouragement for industrial diversification. The company's established engineering capabilities and manufacturing infrastructure made it an ideal candidate for aircraft production, while the urgent demand for military aircraft provided both opportunity and imperative for rapid expansion into this new field.
          </p>
        </section>

        {/* Aircraft Production Section */}
        <section id="aircraft-production" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🛩️ Aircraft Production: Manufacturing Excellence (1916-1918)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Production Achievement</h3>

              <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-emerald-800 mb-3">Beardmore Production Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Aircraft Produced:</span>
                    <span className="font-semibold">1,500+ aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sopwith Pup:</span>
                    <span className="font-semibold">1,773 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sopwith Camel:</span>
                    <span className="font-semibold">364 aircraft</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Peak Employment:</span>
                    <span className="font-semibold text-emerald-600">15,000+ workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production Period:</span>
                    <span className="font-semibold text-emerald-600">1916-1920</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Beardmore's aircraft production focused primarily on licensed manufacture of proven designs, particularly Sopwith aircraft types. This approach leveraged the company's manufacturing strengths while minimizing development risks, enabling rapid scaling of production to meet urgent wartime demands.
              </p>
            </div>

            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">🏗️ Manufacturing Innovation</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beardmore adapted shipbuilding production techniques to aircraft manufacturing, introducing assembly line methods and quality control procedures that improved both efficiency and aircraft reliability. The company's experience with complex engineering projects enabled rapid problem-solving and continuous process improvement.
                </p>

                <h5 className="font-semibold text-blue-700 mb-2">Key Production Features:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Dedicated aircraft assembly halls</li>
                  <li>• Precision tooling and jigs</li>
                  <li>• Skilled workforce training programs</li>
                  <li>• Quality inspection procedures</li>
                  <li>• Efficient material flow systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Engine Development Section */}
        <section id="engine-development" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🔧 Engine Development: Power Plant Innovation
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">160 HP</div>
              <div className="text-sm text-gray-600">Beardmore Engine Power</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,500+</div>
              <div className="text-sm text-gray-600">Engines Produced</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">Reliability Rate</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Engine Manufacturing Excellence</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Beardmore's engine division produced licensed versions of proven designs, including the Austro-Daimler engine used in various aircraft types. The company's precision manufacturing capabilities and metallurgical expertise ensured high-quality engine production that met the demanding requirements of military aviation.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                The transition from marine engine production to aircraft engines required significant adaptation, as aviation powerplants demanded much higher power-to-weight ratios and operational reliability. Beardmore successfully met these challenges through systematic engineering and quality control procedures.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Technical Achievements</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Precision manufacturing:</strong> Aircraft-quality production standards</li>
                <li>• <strong>Metallurgical expertise:</strong> High-strength, lightweight components</li>
                <li>• <strong>Quality assurance:</strong> Comprehensive testing procedures</li>
                <li>• <strong>Production scaling:</strong> Rapid expansion to meet demand</li>
                <li>• <strong>Reliability focus:</strong> Operational readiness priority</li>
              </ul>
            </div>

            <div>
              <Image
                src="/blog-images/clydeside-industrial-workers.jpg"
                alt="Clydeside industrial workers showing the skilled workforce that powered Beardmore's aviation manufacturing success"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                The skilled Clydeside workforce provided the foundation for Beardmore's aviation manufacturing success
              </p>
            </div>
          </div>
        </section>

        {/* Wartime Contribution Section */}
        <section id="wartime-contribution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🎖️ Wartime Contribution: Scottish Industrial Mobilization
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Strategic Impact</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Aircraft Delivered to RAF</span>
                    <span className="text-2xl font-bold text-green-600">1,500+</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Direct contribution to British air power</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Employment Created</span>
                    <span className="text-2xl font-bold text-blue-600">15,000</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Jobs in aviation manufacturing</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Technology Transfer</span>
                    <span className="text-2xl font-bold text-purple-600">Significant</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Manufacturing innovation advancement</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Industrial Legacy</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Manufacturing capability:</strong> Advanced production techniques</li>
                <li>• <strong>Workforce development:</strong> Skilled aviation manufacturing</li>
                <li>• <strong>Quality standards:</strong> Military specification procedures</li>
                <li>• <strong>Supply chain:</strong> Aviation component networks</li>
                <li>• <strong>Engineering expertise:</strong> Complex system integration</li>
                <li>• <strong>Innovation culture:</strong> Rapid problem-solving capability</li>
                <li>• <strong>International recognition:</strong> Export market development</li>
                <li>• <strong>Post-war foundation:</strong> Civilian aviation contribution</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Strategic Significance</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Beardmore's successful transition to aviation manufacturing demonstrated the adaptability of Scottish heavy industry and contributed significantly to Britain's wartime aircraft production capacity, helping establish the foundation for post-war aerospace development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏆 Lasting Legacy: Scottish Aviation's Industrial Foundation
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Beardmore's wartime aviation activities established important precedents for industrial diversification and demonstrated the potential for traditional heavy industries to successfully adapt to emerging technologies. The company's experience provided valuable lessons in workforce retraining, production adaptation, and quality control that influenced subsequent industrial development in Scotland and beyond.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Although Beardmore's direct involvement in aviation manufacturing ended with the post-war economic downturn, the company's contribution to British aviation capability during the critical war years was substantial. The skilled workforce, manufacturing techniques, and quality standards developed during this period contributed to the foundation of modern Scottish aerospace industry.
            </p>
          </div>

          <div className="bg-emerald-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Industrial Aviation Heritage</h3>
            <p className="leading-relaxed mb-4">
              The Beardmore story exemplifies the remarkable adaptability and engineering excellence of Scottish industry during the Great War. From Clydeside shipyards to aircraft production lines, the company demonstrated how established industrial capability could be rapidly transformed to meet national needs and technological challenges.
            </p>
            <p className="leading-relaxed">
              William Beardmore & Company's aviation chapter, though relatively brief, represents an important element of Scottish contributions to aviation development. The company's success in manufacturing high-quality aircraft and engines under wartime pressures helped establish Scotland's reputation for precision engineering and manufacturing excellence that continues to influence aerospace development today.
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
                      The comprehensive history of Clydeside's aviation industry, including Beardmore's transformation from shipbuilding to aircraft manufacturing.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/beardmore-aviation-giant" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/beardmore-aviation.jpg"
                    alt="Beardmore Aviation Giant book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Beardmore: Scottish Industrial Aviation Giant
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The detailed story of William Beardmore & Company's aviation division and its contribution to British air power during WWI.
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
                Aviation historian specializing in Scottish aviation industry and industrial aviation development. Author of authoritative works on Clydeside aviation heritage, with particular expertise in the transformation of traditional Scottish industries to aviation manufacturing during the Great War.
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
                article_title: 'Beardmore Aviation Scottish Industrial Giant',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 15,
                topic: 'Scottish Aviation Industry'
              });
            }
          `
        }}
      />
    </div>
  )
}
