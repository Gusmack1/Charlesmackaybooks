import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import PageSEO from '@/components/PageSEO'


export const metadata: Metadata = {
  title: 'Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII | Charles E. MacKay',
  description: 'The extraordinary story of wartime aviation manufacturing - how Allied industrial mobilization produced 650,000+ aircraft during WWII. Discover the factories, workers, and innovations that achieved the impossible.',
  keywords: [
    'aviation manufacturing WWII',
    'wartime aircraft production',
    'industrial mobilization',
    'aircraft factory production',
    'WWII aviation industry',
    'Willow Run factory',
    'Boeing aircraft production',
    'wartime manufacturing',
    'aircraft assembly lines',
    'aviation industrial complex',
    'wartime production statistics',
    'aircraft manufacturing capacity',
    'industrial aviation history',
    'WWII production methods',
    'aviation workforce',
    'Charles MacKay aviation books',
    'military aircraft production',
    'wartime industrial policy',
    'aircraft manufacturing innovation',
    'aviation production surge'
  ],
  openGraph: {
    title: 'Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII',
    description: 'The extraordinary story of wartime aviation manufacturing - how Allied industrial mobilization produced 650,000+ aircraft during WWII.',
    url: 'https://charlesmackaybooks.com/blog/aviation-manufacturing-wartime-production',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/wwii-aircraft-factory-production.jpg',
        width: 1200,
        height: 630,
        alt: 'WWII aircraft factory assembly line showing the massive industrial mobilization that produced hundreds of thousands of aircraft'
      }
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII',
    description: 'The extraordinary story of wartime aviation manufacturing - how Allied industrial mobilization produced 650,000+ aircraft.',
    images: ['/blog-images/aircraft-factory-assembly-line.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII',
  description: 'The extraordinary story of wartime aviation manufacturing - how Allied industrial mobilization produced 650,000+ aircraft during WWII. Discover the factories, workers, and innovations that achieved the impossible.',
  image: '/blog-images/aircraft-factory-assembly-line.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in wartime industrial production and aircraft manufacturing history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/aviation-manufacturing.jpg'
    }
  },
  datePublished: '2025-01-27T23:00:00.000Z',
  dateModified: '2025-01-27T23:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/aviation-manufacturing-wartime-production'
  },
  articleSection: 'Industrial Aviation History',
  keywords: 'aviation manufacturing, WWII production, industrial mobilization, aircraft factories, wartime production',
  wordCount: 4100,
  readingTime: 'PT17M'
}

export default function AviationManufacturingPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/aviation-manufacturing-wartime-production'
  const pageTitle = 'Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII'

  return (
    <div className="min-h-screen bg-slate-50">

      <PageSEO
        title="Aviation Manufacturing Wartime Production: Industrial Mobilization That Won WWII"
        description="How wartime aviation manufacturing transformed from peacetime production to massive industrial mobilization, producing over 300,000 aircraft during World War II."
        path="/blog/aviation-manufacturing-wartime-production"
        type="article"
      />
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-amber-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Aviation Manufacturing
                <span className="block text-amber-300">Wartime Mobilization</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The unprecedented industrial mobilization that produced over 650,000 aircraft during WWII. From Detroit auto plants to purpose-built megafactories, discover how Allied manufacturing might achieved the impossible and won the war in the skies.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-amber-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>17 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/wwii-aircraft-factory-production.jpg"
                alt="WWII aircraft factory assembly line showing the massive industrial mobilization that produced hundreds of thousands of aircraft to win the war"
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
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-amber-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#industrial-mobilization" className="text-amber-700 hover:text-amber-900 py-1">→ Industrial Mobilization</a>
            <a href="#factory-conversion" className="text-amber-700 hover:text-amber-900 py-1">→ Factory Conversion</a>
            <a href="#production-surge" className="text-amber-700 hover:text-amber-900 py-1">→ Production Surge</a>
            <a href="#workforce-revolution" className="text-amber-700 hover:text-amber-900 py-1">→ Workforce Revolution</a>
            <a href="#innovation-efficiency" className="text-amber-700 hover:text-amber-900 py-1">→ Innovation & Efficiency</a>
            <a href="#lasting-legacy" className="text-amber-700 hover:text-amber-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Production Miracle:</strong> Allied nations produced over 650,000 aircraft during WWII, with the United States alone manufacturing 324,750 military aircraft. At peak production in 1944, American factories were completing one aircraft every 295 seconds, demonstrating industrial mobilization on a scale never before achieved in human history.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The story of aviation manufacturing during World War II represents one of the greatest industrial achievements in human history. In less than five years, Allied nations transformed their economies from peacetime production to an unprecedented war machine capable of producing aircraft at rates that seemed impossible just years earlier. This mobilization not only provided the tools for military victory but established the foundation for the modern aerospace industry and demonstrated the power of industrial democracy when fully unleashed.
          </p>
        </div>

        {/* Industrial Mobilization Section */}
        <section id="industrial-mobilization" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            🏭 Industrial Mobilization: From Peace to War Production (1939-1942)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Unprecedented Transformation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When war erupted in Europe in 1939, the United States aircraft industry was a modest affair producing fewer than 6,000 military aircraft annually. By 1944, American factories alone were producing over 96,000 aircraft per year - a sixteen-fold increase that required completely reimagining industrial production. This transformation involved not just scaling existing facilities but creating entirely new manufacturing paradigms.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                The mobilization effort required unprecedented cooperation between government and industry, with federal agencies coordinating production across hundreds of factories while private companies contributed engineering expertise and manufacturing innovation. This partnership model established principles of industrial organization that would influence American manufacturing for decades.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Mobilization Statistics (1939-1945)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>U.S. aircraft production:</strong> 324,750 military aircraft</li>
                  <li>• <strong>Peak annual production:</strong> 96,318 aircraft (1944)</li>
                  <li>• <strong>Factory workforce:</strong> 2.1 million at peak</li>
                  <li>• <strong>Investment:</strong> $45 billion in aircraft production</li>
                  <li>• <strong>Production increase:</strong> 1,600% from 1939 levels</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/women-aircraft-workers.jpg"
                alt="Women workers in aircraft factory during WWII representing the workforce revolution in aviation manufacturing"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Women workers became the backbone of wartime aircraft production, comprising 40% of the aerospace workforce
              </p>
            </div>
          </div>
        </section>

        {/* Factory Conversion Section */}
        <section id="factory-conversion" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            🔧 Factory Conversion: Auto Plants to Aircraft Factories (1940-1943)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Detroit's Aviation Revolution</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Conversion Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Existing infrastructure:</strong> Large factory buildings and utilities</li>
                  <li>• <strong>Skilled workforce:</strong> Experienced manufacturing workers</li>
                  <li>• <strong>Supply chains:</strong> Established vendor networks</li>
                  <li>• <strong>Management expertise:</strong> Large-scale production experience</li>
                  <li>• <strong>Quality systems:</strong> Precision manufacturing standards</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🚗 Major Conversions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Ford Willow Run:</strong> B-24 Liberator production</li>
                  <li>• <strong>General Motors:</strong> P-75 fighters and aircraft engines</li>
                  <li>• <strong>Chrysler:</strong> Tank and aircraft component production</li>
                  <li>• <strong>Nash-Kelvinator:</strong> P-51 Mustang subassemblies</li>
                  <li>• <strong>Studebaker:</strong> Aircraft engine manufacturing</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The conversion of automotive plants to aircraft production represented one of WWII's most remarkable industrial achievements. Henry Ford's Willow Run plant, stretching over a mile long, became the world's largest aircraft factory, producing B-24 Liberators at rates previously thought impossible. This transformation demonstrated American industry's flexibility and innovation under pressure.
          </p>
        </section>

        {/* Production Surge Section */}
        <section id="production-surge" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            📈 Production Surge: Breaking All Records (1942-1945)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Record-Breaking Output</h3>

              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-amber-800 mb-3">Production Records</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Daily peak production:</span>
                    <span className="font-semibold">291 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aircraft per hour (peak):</span>
                    <span className="font-semibold">12.2 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B-24s at Willow Run:</span>
                    <span className="font-semibold">18,482 produced</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>1944 total production:</span>
                    <span className="font-semibold text-amber-600">96,318 aircraft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Workforce at peak:</span>
                    <span className="font-semibold text-amber-600">2.1 million</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The production surge reached extraordinary levels by 1944, when American factories were completing an aircraft every 295 seconds. This output exceeded the combined production of all other nations and provided overwhelming material superiority that proved decisive in every theater of operations.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🏆 Production Achievements</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  American aircraft production achieved rates that seemed impossible in 1939. The combination of mass production techniques, innovative tooling, and dedicated workforce created an industrial machine capable of overwhelming any opponent through sheer volume of output.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Key Milestones:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1942: 47,836 aircraft produced</li>
                  <li>• 1943: 85,898 aircraft produced</li>
                  <li>• 1944: 96,318 aircraft produced (peak year)</li>
                  <li>• 1945: 46,001 aircraft (war end)</li>
                  <li>• Total war production: 324,750 aircraft</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/blog-images/aircraft-production-statistics.jpg"
              alt="WWII aircraft production statistics chart showing the massive increase in manufacturing output"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 italic text-center">
              WWII aircraft production statistics: The exponential growth in manufacturing capacity that won the war
            </p>
          </div>
        </section>

        {/* Workforce Revolution Section */}
        <section id="workforce-revolution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            👥 Workforce Revolution: Rosie the Riveter and Industrial Democracy
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">2.1M</div>
              <div className="text-sm text-gray-600">Peak Workforce</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">40%</div>
              <div className="text-sm text-gray-600">Women Workers</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
              <div className="text-sm text-gray-600">Production Increase per Worker</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Social Transformation</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Women in Aviation Manufacturing</h4>
                  <p className="text-sm text-gray-700">Women comprised 40% of aircraft industry workers, taking on roles previously reserved for men and proving their capabilities in precision manufacturing.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Minority Workforce Integration</h4>
                  <p className="text-sm text-gray-700">The urgent need for workers broke down many employment barriers, creating opportunities for minorities and establishing precedents for post-war equality.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Training and Skills Development</h4>
                  <p className="text-sm text-gray-700">Massive training programs created skilled workers from scratch, developing human capital that would power post-war economic growth.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Workforce Innovations</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Rapid training programs:</strong> 6-week aircraft assembly courses</li>
                <li>• <strong>Safety improvements:</strong> Industrial accident reduction</li>
                <li>• <strong>Productivity incentives:</strong> Bonus systems and recognition</li>
                <li>• <strong>Childcare services:</strong> Factory-provided daycare facilities</li>
                <li>• <strong>Housing programs:</strong> Worker accommodation near plants</li>
                <li>• <strong>Transportation systems:</strong> Bus services to remote factories</li>
                <li>• <strong>Health services:</strong> On-site medical facilities</li>
                <li>• <strong>Recreation programs:</strong> Worker morale and retention</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Social Impact</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The wartime workforce revolution permanently changed American society, demonstrating that women and minorities could excel in high-skill manufacturing roles and establishing precedents for post-war social progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation & Efficiency Section */}
        <section id="innovation-efficiency" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            💡 Innovation & Efficiency: Manufacturing Revolution
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Wartime aircraft production drove unprecedented innovations in manufacturing technology and industrial organization. Assembly line techniques pioneered in automotive production were adapted and refined for aircraft manufacturing, while new quality control methods ensured that rapidly-produced aircraft met demanding military specifications. These innovations established the foundation for modern aerospace manufacturing.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The pressure to increase production while maintaining quality led to breakthrough developments in tooling, materials handling, and production planning. Statistical quality control, advanced metallurgy, and precision manufacturing techniques developed during the war would later enable the jet age and space exploration programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Manufacturing Innovations</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Assembly line adaptation:</strong> Aircraft-specific production lines</li>
                <li>• <strong>Standardized tooling:</strong> Interchangeable manufacturing equipment</li>
                <li>• <strong>Quality control systems:</strong> Statistical process control</li>
                <li>• <strong>Materials handling:</strong> Automated component movement</li>
                <li>• <strong>Precision machining:</strong> Advanced cutting and forming tools</li>
                <li>• <strong>Subcontractor networks:</strong> Coordinated supplier management</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Efficiency Improvements</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Cycle time reduction:</strong> 75% decrease in production time</li>
                <li>• <strong>Defect reduction:</strong> Quality improvements through training</li>
                <li>• <strong>Resource optimization:</strong> Material waste minimization</li>
                <li>• <strong>Production planning:</strong> Advanced scheduling systems</li>
                <li>• <strong>Cost reduction:</strong> Economy of scale benefits</li>
                <li>• <strong>Continuous improvement:</strong> Kaizen-like methodologies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Lasting Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-amber-200 pb-4">
            🏆 Lasting Legacy: Foundation of Modern Aerospace
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The wartime aviation manufacturing surge established the foundation for America's post-war aerospace dominance. The factories, workforce skills, and production techniques developed during WWII enabled the rapid development of jet aircraft, guided missiles, and eventually spacecraft. Companies like Boeing, Lockheed, and Douglas evolved from wartime contractors into global aerospace leaders.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More importantly, the wartime experience demonstrated that democratic societies could mobilize industrial resources more effectively than totalitarian regimes. The combination of government coordination, private innovation, and worker dedication created an industrial machine that overwhelmed enemy production and established principles of industrial organization that continue to influence manufacturing today.
            </p>
          </div>

          <div className="bg-amber-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🏭 The Arsenal of Democracy</h3>
            <p className="leading-relaxed mb-4">
              The wartime aviation manufacturing surge transformed the United States into the "Arsenal of Democracy," producing not only the aircraft that won WWII but establishing the industrial foundation for American global leadership in the post-war era. The lessons learned and capabilities developed during this period enabled victory in WWII and shaped the trajectory of American economic development for decades.
            </p>
            <p className="leading-relaxed">
              From Willow Run's mile-long assembly lines to thousands of smaller facilities across the nation, American aviation manufacturing during WWII represents one of history's greatest industrial achievements. The workers, engineers, and managers who accomplished this production miracle demonstrated that free societies, when fully mobilized, possess unlimited capacity for innovation and achievement in the service of liberty and justice.
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
                    alt="Clydeside Aviation Volume One book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      Clydeside Aviation Volume One: The Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The story of Scottish aviation during WWI, including wartime aircraft production and industrial mobilization.
                    </p>
                    <div className="text-amber-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/beardmore-aviation" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/beardmore-aviation.jpg"
                    alt="Beardmore Aviation book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      Beardmore Aviation: Scottish Industrial Giant
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The story of Scottish industrial mobilization for aviation, from shipbuilding to aircraft production during both world wars.
                    </p>
                    <div className="text-amber-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in wartime industrial production and aircraft manufacturing history. Author of authoritative works on the industrial mobilization that won WWII and established the foundation for modern aerospace manufacturing.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-amber-600 hover:text-amber-800">About the Author</Link>
                <Link href="/books" className="text-amber-600 hover:text-amber-800">All Books</Link>
                <Link href="/blog" className="text-amber-600 hover:text-amber-800">More Articles</Link>
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
                article_title: 'Aviation Manufacturing Wartime Production',
                article_category: 'Industrial Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 17,
                topic: 'WWII Manufacturing'
              });
            }
          `
        }}
      />
    </div>
  )
}
