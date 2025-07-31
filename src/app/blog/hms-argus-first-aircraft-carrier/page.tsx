import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'


export const metadata: Metadata = {
  title: 'HMS Argus: The First True Aircraft Carrier - Revolutionary Naval Aviation Pioneer | Charles E. MacKay',
  description: 'The extraordinary story of HMS Argus - the world\'s first aircraft carrier with a full-length flight deck. Discover how this converted liner revolutionized naval warfare and established the foundation for modern carrier operations.',
  keywords: [
    'HMS Argus aircraft carrier',
    'first aircraft carrier',
    'Royal Navy carrier',
    'naval aviation history',
    'aircraft carrier development',
    'HMS Argus flight deck',
    'carrier aviation pioneer',
    'Royal Navy WWI',
    'naval aviation innovation',
    'aircraft carrier operations',
    'HMS Argus history',
    'carrier landing development',
    'naval air service',
    'Fleet Air Arm history',
    'aircraft carrier design',
    'Charles MacKay aviation books',
    'naval aircraft carriers',
    'maritime aviation',
    'carrier evolution',
    'naval warfare revolution'
  ],
  openGraph: {
    title: 'HMS Argus: The First True Aircraft Carrier - Revolutionary Naval Aviation Pioneer',
    description: 'The extraordinary story of HMS Argus - the world\'s first aircraft carrier with a full-length flight deck that revolutionized naval warfare.',
    url: 'https://charlesmackaybooks.com/blog/hms-argus-first-aircraft-carrier',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/hms-argus-dazzle-camouflage.jpg',
        width: 1200,
        height: 630,
        alt: 'HMS Argus in dazzle camouflage - the world\'s first true aircraft carrier with full-length flight deck that revolutionized naval aviation'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMS Argus: The First True Aircraft Carrier - Revolutionary Naval Aviation Pioneer',
    description: 'The extraordinary story of HMS Argus - the world\'s first aircraft carrier with a full-length flight deck.',
    images: ['/blog-images/hms-argus-dazzle-camouflage.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HMS Argus: The First True Aircraft Carrier - Revolutionary Naval Aviation Pioneer',
  description: 'The extraordinary story of HMS Argus - the world\'s first aircraft carrier with a full-length flight deck. Discover how this converted liner revolutionized naval warfare and established the foundation for modern carrier operations.',
  image: '/blog-images/hms-argus-dazzle-camouflage.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in naval aviation development and aircraft carrier history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/hms-argus.jpg'
    }
  },
  datePublished: '2025-01-27T22:00:00.000Z',
  dateModified: '2025-01-27T22:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/hms-argus-first-aircraft-carrier'
  },
  articleSection: 'Naval Aviation History',
  keywords: 'HMS Argus, aircraft carrier, naval aviation, Royal Navy, carrier operations, flight deck',
  wordCount: 3900,
  readingTime: 'PT16M'
}

export default function HMSArgusPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/hms-argus-first-aircraft-carrier'
  const pageTitle = 'HMS Argus: The First True Aircraft Carrier - Revolutionary Naval Aviation Pioneer'

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                HMS Argus
                <span className="block text-blue-300">First True Aircraft Carrier</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The revolutionary warship that changed naval warfare forever. From converted passenger liner to the world's first aircraft carrier with a full-length flight deck, HMS Argus pioneered carrier operations and established the foundation for modern naval aviation.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
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
                src="/blog-images/hms-argus-dazzle-camouflage.jpg"
                alt="HMS Argus in dazzle camouflage - the world's first true aircraft carrier with full-length flight deck that revolutionized naval aviation and established modern carrier operations"
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#origins-conversion" className="text-blue-700 hover:text-blue-900 py-1">→ Origins & Conversion</a>
            <a href="#design-innovation" className="text-blue-700 hover:text-blue-900 py-1">→ Revolutionary Design</a>
            <a href="#carrier-operations" className="text-blue-700 hover:text-blue-900 py-1">→ First Carrier Operations</a>
            <a href="#operational-service" className="text-blue-700 hover:text-blue-900 py-1">→ Operational Service</a>
            <a href="#technical-legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Technical Legacy</a>
            <a href="#lasting-impact" className="text-blue-700 hover:text-blue-900 py-1">→ Lasting Impact</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Historic First:</strong> HMS Argus was the world's first aircraft carrier with a full-length, unobstructed flight deck. Commissioned in 1918, she conducted the first successful deck landing trials and established the operational procedures that became the foundation for all subsequent carrier aviation development.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            HMS Argus holds a unique place in naval history as the vessel that transformed aviation from a land-based curiosity into a fundamental element of naval power. Born from the urgent needs of World War I and the visionary thinking of Royal Navy officers, Argus proved that aircraft could operate effectively from ships at sea, launching an era of carrier-based aviation that would reshape naval warfare and establish new strategic paradigms that continue to dominate maritime operations today.
          </p>
        </div>

        {/* Origins & Conversion Section */}
        <section id="origins-conversion" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🚢 Origins & Conversion: From Passenger Liner to Pioneer (1914-1918)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Wartime Innovation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                HMS Argus began life as the Italian passenger liner Conte Rosso, under construction at William Beardmore's Dalmuir shipyard when World War I erupted. The Royal Navy, recognizing the strategic potential of naval aviation, purchased the incomplete hull in 1916 for conversion into an experimental aircraft carrier. This bold decision represented a revolutionary leap in naval thinking.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                The conversion process, completed between 1916 and 1918, involved completely reimagining the vessel's purpose and design. Unlike earlier carrier experiments that retained traditional naval superstructures, Argus was designed with a completely flat, unobstructed flight deck - earning her the nickname "Flat Iron" and establishing the template for all future aircraft carriers.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Conversion Specifications</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Original ship:</strong> Italian liner Conte Rosso</li>
                  <li>• <strong>Length:</strong> 565 feet (172 meters)</li>
                  <li>• <strong>Flight deck:</strong> 550 feet unobstructed</li>
                  <li>• <strong>Aircraft capacity:</strong> 15-20 aircraft</li>
                  <li>• <strong>Conversion cost:</strong> £2.8 million</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/hms-furious-early-carrier.jpg"
                alt="HMS Furious early aircraft carrier showing the evolution of carrier design before HMS Argus"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                HMS Furious - An earlier carrier experiment that highlighted the need for Argus's innovative flat deck design
              </p>
            </div>
          </div>
        </section>

        {/* Design Innovation Section */}
        <section id="design-innovation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🔧 Revolutionary Design: The Flat Iron Innovation (1918)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Engineering Breakthrough</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Design Innovations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Full-length flight deck:</strong> Unobstructed 550-foot runway</li>
                  <li>• <strong>Flush deck design:</strong> No superstructure interference</li>
                  <li>• <strong>Retractable bridge:</strong> Lowered during flight operations</li>
                  <li>• <strong>Aircraft elevators:</strong> Two lifts connecting hangar to deck</li>
                  <li>• <strong>Arresting gear:</strong> Early deck landing assistance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🚁 Operational Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Hangar space:</strong> Below-deck aircraft storage</li>
                  <li>• <strong>Workshop facilities:</strong> Aircraft maintenance capability</li>
                  <li>• <strong>Fuel systems:</strong> Aviation gasoline storage and supply</li>
                  <li>• <strong>Safety measures:</strong> Fire suppression and damage control</li>
                  <li>• <strong>Navigation aids:</strong> Wireless communication systems</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Argus's revolutionary "flush deck" design eliminated the traditional naval superstructure that had plagued earlier carrier experiments. By moving the bridge and funnel systems below deck level or making them retractable, the designers created an unobstructed platform that allowed aircraft to operate safely in both directions. This innovation became the standard for all subsequent aircraft carriers.
          </p>
        </section>

        {/* Carrier Operations Section */}
        <section id="carrier-operations" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ✈️ First Carrier Operations: Pioneering Naval Aviation (1918-1920)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Historic Achievements</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-800 mb-3">Operational Firsts</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>First deck landing:</span>
                    <span className="font-semibold">October 1918</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aircraft operated:</span>
                    <span className="font-semibold">Sopwith Pup, Camel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flight operations:</span>
                    <span className="font-semibold">Both takeoff and landing</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Service period:</span>
                    <span className="font-semibold text-blue-600">1918-1944</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pilots trained:</span>
                    <span className="font-semibold text-blue-600">Hundreds</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                HMS Argus conducted the world's first successful aircraft carrier landing trials in October 1918, just weeks before the Armistice. Squadron Commander Edwin Dunning's successful deck landings in a Sopwith Pup proved that the carrier concept was not only feasible but practical for operational use.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🎯 Operational Challenges</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Early carrier operations faced unprecedented challenges. Pilots had to master completely new techniques for deck landings, while ground crews developed procedures for aircraft handling, fueling, and maintenance at sea. Every operation was an experiment that contributed to carrier aviation doctrine.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Innovations Developed:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Deck landing techniques and procedures</li>
                  <li>• Aircraft handling and storage methods</li>
                  <li>• Flight deck crew coordination systems</li>
                  <li>• Weather assessment for carrier operations</li>
                  <li>• Emergency procedures and safety protocols</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/blog-images/sopwith-pup-carrier-landing.jpg"
              alt="Sopwith Pup performing early carrier landing on HMS Argus showing the pioneering naval aviation operations"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 italic text-center">
              Sopwith Pup landing on HMS Argus - The historic moment that proved carrier aviation was operationally viable
            </p>
          </div>
        </section>

        {/* Operational Service Section */}
        <section id="operational-service" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚓ Operational Service: From Training Ship to Veteran (1918-1944)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">26 Years</div>
              <div className="text-sm text-gray-600">Active Service</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Training</div>
              <div className="text-sm text-gray-600">Primary Role</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Pioneer</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Service History</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">WWI Service (1918)</h4>
                  <p className="text-sm text-gray-700">Brief operational service before Armistice, primarily conducting trials and establishing carrier operations doctrine.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Interwar Period (1919-1939)</h4>
                  <p className="text-sm text-gray-700">Primary training carrier for Fleet Air Arm, developing pilots and procedures for next-generation carriers.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">WWII Service (1939-1944)</h4>
                  <p className="text-sm text-gray-700">Continued training role despite age, contributing to carrier pilot preparation for Pacific operations.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Legacy Contributions</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Pilot training:</strong> Thousands of carrier pilots trained</li>
                <li>• <strong>Doctrine development:</strong> Carrier operations procedures</li>
                <li>• <strong>Technical evolution:</strong> Arresting gear improvements</li>
                <li>• <strong>Safety protocols:</strong> Flight deck safety standards</li>
                <li>• <strong>Aircraft handling:</strong> Deck crew training methods</li>
                <li>• <strong>Navigation techniques:</strong> Carrier navigation procedures</li>
                <li>• <strong>Communication systems:</strong> Air-to-ship coordination</li>
                <li>• <strong>Emergency procedures:</strong> At-sea rescue operations</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Training Legacy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  As the Royal Navy's primary carrier training ship for over two decades, HMS Argus trained the pilots and deck crews who would operate the fleet carriers of WWII. Her contribution to British naval aviation far exceeded her modest size and age.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Legacy Section */}
        <section id="technical-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🔬 Technical Legacy: Design Principles That Endure
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              HMS Argus established fundamental design principles that continue to influence aircraft carrier construction today. Her flush deck design, below-deck hangar system, and integrated aircraft handling procedures became standard features of all subsequent carriers. The operational lessons learned aboard Argus directly influenced the design of HMS Eagle, HMS Hermes, and eventually the massive fleet carriers of World War II.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More importantly, Argus proved that aircraft carriers were not merely experimental platforms but essential naval weapons capable of projecting air power far from shore. This demonstration changed naval strategy and established the aircraft carrier as the capital ship of modern navies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Design Innovations</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Flush deck concept:</strong> Unobstructed flight operations</li>
                <li>• <strong>Hangar integration:</strong> Below-deck aircraft storage</li>
                <li>• <strong>Elevator systems:</strong> Efficient aircraft movement</li>
                <li>• <strong>Arresting gear:</strong> Safe deck landing capability</li>
                <li>• <strong>Fire suppression:</strong> Aviation fuel safety systems</li>
                <li>• <strong>Workshop facilities:</strong> At-sea maintenance capability</li>
              </ul>
            </div>

            <div>
              <Image
                src="/blog-images/carrier-evolution-diagram.jpg"
                alt="Aircraft carrier evolution diagram showing HMS Argus's influence on modern carrier design"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Carrier evolution: HMS Argus's design principles influenced all subsequent aircraft carriers
              </p>
            </div>
          </div>
        </section>

        {/* Lasting Impact Section */}
        <section id="lasting-impact" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 Lasting Impact: The Carrier Revolution
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              HMS Argus's impact on naval warfare extends far beyond her modest size and experimental nature. By proving that aircraft could operate effectively from ships at sea, Argus launched the carrier aviation era that would fundamentally reshape naval strategy, tactics, and fleet composition. The principles she established continue to guide aircraft carrier design and operations in the 21st century.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Perhaps most importantly, Argus demonstrated that technological innovation could rapidly change the balance of naval power. Nations that embraced carrier aviation gained decisive advantages, while those that clung to traditional battleship-centered fleets found themselves increasingly vulnerable to carrier-based attacks.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">⚓ The Argus Legacy</h3>
            <p className="leading-relaxed mb-4">
              From her pioneering deck landing trials in 1918 to the massive supercarriers of today, HMS Argus established the template for naval aviation that continues to dominate the world's oceans. Her flush deck design, integrated aircraft systems, and operational procedures became the foundation for every aircraft carrier that followed.
            </p>
            <p className="leading-relaxed">
              The strategic revolution begun by HMS Argus reached its full expression at Pearl Harbor, the Coral Sea, and Midway, where carrier aircraft proved decisive in naval warfare. Today's nuclear-powered supercarriers, capable of projecting air power anywhere in the world, trace their lineage directly back to the experimental flat-top that first proved aircraft and ships could work together effectively at sea.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/aircraft-carrier-argus" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/aircraft-carrier-argus.jpg"
                    alt="Aircraft Carrier HMS Argus book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Aircraft Carrier - Beardmore's HMS Argus
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete history of HMS Argus aircraft carrier, originally the Conte Rosso, and its conversion by Beardmore.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Beardmore Aviation: Scottish Industrial Giant
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete story of Beardmore's aviation work, including their role in HMS Argus conversion and naval aircraft development.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in naval aviation development and aircraft carrier history. Author of authoritative works on the evolution of carrier operations and the ships and aircraft that established naval aviation as a decisive military force.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-blue-600 hover:text-blue-800">About the Author</Link>
                <Link href="/books" className="text-blue-600 hover:text-blue-800">All Books</Link>
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">More Articles</Link>
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
                article_title: 'HMS Argus First Aircraft Carrier',
                article_category: 'Naval Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 16,
                topic: 'Aircraft Carrier History'
              });
            }
          `
        }}
      />
    </div>
  )
}
