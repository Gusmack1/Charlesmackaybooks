import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Naval Aviation History: From First Flights to Modern Carrier Operations | Charles E. MacKay',
  description: 'The complete history of naval aviation from early seaplane experiments to modern carrier strike groups. Discover how naval aviation evolved from experimental flights to the dominant force in maritime warfare.',
  keywords: [
    'naval aviation history',
    'aircraft carrier development',
    'naval aircraft evolution',
    'carrier aviation history',
    'naval aviation pioneers',
    'fleet air arm history',
    'carrier operations',
    'naval fighter aircraft',
    'maritime aviation',
    'naval aviation development',
    'carrier-based aircraft',
    'naval air service history',
    'Fleet Air Arm',
    'naval aviation technology',
    'carrier aviation evolution',
    'Charles MacKay aviation books',
    'maritime air power',
    'naval aircraft carriers',
    'carrier strike groups',
    'naval aviation warfare'
  ],
  openGraph: {
    title: 'Naval Aviation History: From First Flights to Modern Carrier Operations',
    description: 'The complete history of naval aviation from early seaplane experiments to modern carrier strike groups.',
    url: 'https://charlesmackaybooks.com/blog/naval-aviation-history',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/uss-lexington-aircraft-operations.jpg',
        width: 1200,
        height: 630,
        alt: 'USS Lexington aircraft carrier operations showing the evolution of naval aviation from experimental flights to dominant maritime force'
      }
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naval Aviation History: From First Flights to Modern Carrier Operations',
    description: 'The complete history of naval aviation from early seaplane experiments to modern carrier strike groups.',
    images: ['/blog-images/uss-lexington-aircraft-operations.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Naval Aviation History: From First Flights to Modern Carrier Operations',
  description: 'The complete history of naval aviation from early seaplane experiments to modern carrier strike groups. Discover how naval aviation evolved from experimental flights to the dominant force in maritime warfare.',
  image: '/blog-images/uss-lexington-aircraft-operations.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in naval aviation development and maritime air power evolution',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/naval-aviation.jpg'
    }
  },
  datePublished: '2025-01-30T10:00:00.000Z',
  dateModified: '2025-01-30T10:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/naval-aviation-history'
  },
  articleSection: 'Naval Aviation History',
  keywords: 'naval aviation, aircraft carriers, carrier operations, Fleet Air Arm, maritime aviation',
  wordCount: 4500,
  readingTime: 'PT18M'
}

export default function NavalAviationHistoryPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/naval-aviation-history'
  const pageTitle = 'Naval Aviation History: From First Flights to Modern Carrier Operations'

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
                Naval Aviation History
                <span className="block text-blue-300">From Sea to Sky</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The evolution of maritime air power from pioneering seaplane flights to modern carrier strike groups. Discover how naval aviation transformed from experimental curiosity to the backbone of naval warfare and maritime security.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>18 minute read</span>
                <span>•</span>
                <span>January 30, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/uss-lexington-aircraft-operations.jpg"
                alt="USS Lexington aircraft carrier operations showing the evolution of naval aviation from experimental flights to dominant maritime force"
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
            <a href="#early-pioneers" className="text-blue-700 hover:text-blue-900 py-1">→ Early Aviation Pioneers</a>
            <a href="#wwi-development" className="text-blue-700 hover:text-blue-900 py-1">→ WWI Naval Aviation</a>
            <a href="#carrier-evolution" className="text-blue-700 hover:text-blue-900 py-1">→ Aircraft Carrier Evolution</a>
            <a href="#wwii-dominance" className="text-blue-700 hover:text-blue-900 py-1">→ WWII Naval Dominance</a>
            <a href="#jet-age-transformation" className="text-blue-700 hover:text-blue-900 py-1">→ Jet Age Transformation</a>
            <a href="#modern-operations" className="text-blue-700 hover:text-blue-900 py-1">→ Modern Naval Aviation</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Maritime Revolution:</strong> Naval aviation transformed maritime warfare from battleship-dominated surface actions to three-dimensional operations where control of the air became essential for naval supremacy. From the first tentative flights off ship platforms to modern nuclear-powered supercarriers, naval aviation represents one of the most dramatic technological and tactical evolutions in military history.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The story of naval aviation is one of visionary thinking, technological innovation, and tactical evolution that transformed navies from primarily surface-based forces to integrated air-sea combat systems. Beginning with early experiments in launching aircraft from ships, naval aviation evolved through two world wars to become the dominant force projection capability that defines modern maritime power. This transformation required not just advances in aircraft and ship design, but fundamental changes in naval doctrine, training, and operational concepts that continue to shape naval warfare today.
          </p>
        </div>

        {/* Early Pioneers Section */}
        <section id="early-pioneers" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🛩️ Early Aviation Pioneers: Taking Flight from the Sea (1903-1918)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">First Naval Flight Experiments</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Naval aviation began with visionary officers who recognized that the airplane could extend the reach and effectiveness of naval forces. As early as 1910, American naval officers were experimenting with aircraft operations from ships, leading to the first successful takeoff from a naval vessel by Eugene Ely from USS Birmingham in November 1910, followed by the first ship landing on USS Pennsylvania in January 1911.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                These early experiments, while crude by later standards, demonstrated the potential for aircraft to serve naval missions including reconnaissance, spotting for naval gunfire, and eventually offensive operations. The challenge was developing aircraft capable of operating in the marine environment and ship designs that could accommodate aviation operations.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Naval Aviation Firsts (1910-1918)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1910:</strong> First takeoff from ship (Eugene Ely)</li>
                  <li>• <strong>1911:</strong> First landing on ship (Eugene Ely)</li>
                  <li>• <strong>1912:</strong> First aircraft catapult tested</li>
                  <li>• <strong>1916:</strong> Royal Naval Air Service formed</li>
                  <li>• <strong>1918:</strong> HMS Argus - first full aircraft carrier</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/curtiss-nc4-flying-boat.jpg"
                alt="Curtiss NC-4 flying boat representing early naval aviation development and long-range maritime flight capabilities"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Curtiss NC-4 flying boat - Early naval aviation focused on seaplane operations for reconnaissance and patrol
              </p>
            </div>
          </div>
        </section>

        {/* WWI Development Section */}
        <section id="wwi-development" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚔️ WWI Naval Aviation: From Experiment to Necessity (1914-1918)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Wartime Acceleration</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Operational Roles</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Reconnaissance:</strong> Long-range maritime patrol</li>
                  <li>• <strong>Anti-submarine warfare:</strong> U-boat detection and attack</li>
                  <li>• <strong>Naval gunfire spotting:</strong> Artillery direction</li>
                  <li>• <strong>Fleet air defense:</strong> Protection from enemy aircraft</li>
                  <li>• <strong>Bombing operations:</strong> Attacks on enemy ports and bases</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🚁 Technical Advances</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Seaplane development:</strong> Purpose-built naval aircraft</li>
                  <li>• <strong>Ship modifications:</strong> Platform installations</li>
                  <li>• <strong>Navigation equipment:</strong> Maritime flying instruments</li>
                  <li>• <strong>Radio communications:</strong> Air-to-ship coordination</li>
                  <li>• <strong>Specialized weapons:</strong> Depth charges and naval bombs</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            World War I transformed naval aviation from experimental curiosity to operational necessity. The German U-boat threat demanded long-range maritime patrol aircraft, while the need for fleet reconnaissance drove development of carrier-capable aircraft. By 1918, both Britain and the United States had established naval air services with thousands of aircraft and personnel.
          </p>
        </section>

        {/* Carrier Evolution Section */}
        <section id="carrier-evolution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🚢 Aircraft Carrier Evolution: Platforms for Power Projection (1918-1941)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Interwar Development</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-800 mb-3">Carrier Milestones</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>HMS Argus:</span>
                    <span className="font-semibold">First flush-deck carrier</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HMS Eagle/Hermes:</span>
                    <span className="font-semibold">First purpose-built carriers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>USS Lexington/Saratoga:</span>
                    <span className="font-semibold">Large fleet carriers</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Aircraft evolution:</span>
                    <span className="font-semibold text-blue-600">Biplane to monoplane</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operational doctrine:</span>
                    <span className="font-semibold text-blue-600">Strike force concept</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The interwar period saw rapid evolution in carrier design and aircraft capabilities. Nations developed carrier aviation doctrines, trained specialized pilots and crews, and experimented with different carrier designs and aircraft types. By 1941, carriers had evolved from experimental platforms to the backbone of naval aviation.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🎖️ Design Innovations</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Carrier design evolved rapidly as navies learned from operational experience. Key innovations included angled flight decks, steam catapults, optical landing systems, and radar-controlled air traffic management. Each generation of carriers incorporated lessons from previous designs and operational experience.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Key Developments:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Island superstructure placement and design</li>
                  <li>• Aircraft elevator systems and hangar layout</li>
                  <li>• Catapult and arresting gear technology</li>
                  <li>• Fuel and ordnance handling systems</li>
                  <li>• Damage control and fire suppression</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WWII Dominance Section */}
        <section id="wwii-dominance" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚡ WWII Naval Dominance: Carriers Rule the Seas (1941-1945)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">Pearl Harbor</div>
              <div className="text-sm text-gray-600">Carrier warfare arrives</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Midway</div>
              <div className="text-sm text-gray-600">Decisive carrier battle</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Pacific Victory</div>
              <div className="text-sm text-gray-600">Carrier-dominated war</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Pacific Theater Dominance</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Pearl Harbor (1941)</h4>
                  <p className="text-sm text-gray-700">Japanese carrier strike demonstrated devastating potential of carrier aviation, changing naval warfare forever.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Coral Sea & Midway (1942)</h4>
                  <p className="text-sm text-gray-700">First all-carrier battles proved that carriers had replaced battleships as decisive naval weapons.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Fast Carrier Task Forces</h4>
                  <p className="text-sm text-gray-700">Massed carrier operations enabled rapid advance across the Pacific, providing air superiority and close support.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">WWII Naval Aviation Impact</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Strategic mobility:</strong> Carrier task forces project power globally</li>
                <li>• <strong>Combined operations:</strong> Air-sea integration becomes standard</li>
                <li>• <strong>Technological acceleration:</strong> Rapid aircraft and ship development</li>
                <li>• <strong>Tactical innovation:</strong> New combat techniques and procedures</li>
                <li>• <strong>Personnel expansion:</strong> Massive pilot and crew training programs</li>
                <li>• <strong>Industrial mobilization:</strong> Mass production of carriers and aircraft</li>
                <li>• <strong>Doctrine evolution:</strong> Carrier operations become primary naval strategy</li>
                <li>• <strong>Global reach:</strong> Naval aviation enables worldwide operations</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Strategic Revolution</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  WWII proved that carrier aviation had fundamentally changed naval warfare. Surface fleets without air cover were vulnerable, while carrier task forces could operate effectively across vast ocean distances, making naval aviation the dominant force in maritime warfare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Jet Age Transformation Section */}
        <section id="jet-age-transformation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🚀 Jet Age Transformation: Nuclear Power and Supersonic Flight
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The introduction of jet aircraft and nuclear propulsion revolutionized naval aviation in the 1950s and 1960s. Nuclear-powered carriers provided unlimited range and endurance, while jet aircraft offered unprecedented speed and capability. The combination created naval aviation forces capable of sustained global operations with performance that rivaled land-based aviation.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              This transformation required extensive modifications to carrier designs, including stronger catapults, improved arresting gear, angled flight decks, and enhanced aircraft handling systems. The complexity and cost of these new systems led to larger, more sophisticated carriers that became the centerpieces of naval task forces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/naval-aviation-evolution.jpg"
                alt="Naval aviation evolution showing the progression from early biplanes to modern jet fighters on aircraft carriers"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Naval aviation evolution - From early carrier biplanes to modern supersonic jet fighters
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Jet Age Naval Aviation</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Nuclear carriers:</strong> USS Enterprise and follow-on classes</li>
                <li>• <strong>Supersonic fighters:</strong> F-4 Phantom, F-14 Tomcat development</li>
                <li>• <strong>Advanced systems:</strong> Radar, missiles, and electronic warfare</li>
                <li>• <strong>Global operations:</strong> Extended deployment capabilities</li>
                <li>• <strong>Strike aircraft:</strong> Nuclear-capable attack aircraft</li>
                <li>• <strong>Support aircraft:</strong> AEW, ASW, and logistics aircraft</li>
                <li>• <strong>Precision weapons:</strong> Guided bombs and missiles</li>
                <li>• <strong>Digital systems:</strong> Computer-aided flight and combat systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Modern Operations Section */}
        <section id="modern-operations" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🌊 Modern Naval Aviation: 21st Century Capabilities
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Modern naval aviation represents the culmination of over a century of development, combining nuclear-powered supercarriers with advanced multirole aircraft, precision weapons, and sophisticated command and control systems. Today's carrier strike groups can project power globally, providing governments with flexible response options for crisis management and sustained operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The integration of unmanned aircraft, advanced sensors, and network-centric warfare capabilities has further enhanced naval aviation effectiveness. Modern carriers operate as mobile airbases capable of sustained operations independent of shore-based facilities, making them invaluable for forward presence and crisis response in an interconnected but unstable world.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">⚓ Naval Aviation Today</h3>
            <p className="leading-relaxed mb-4">
              From Eugene Ely's first tentative flight from USS Birmingham to modern supercarriers launching F/A-18 Super Hornets and F-35 Lightning IIs, naval aviation has evolved into the most versatile and powerful force projection capability available to maritime nations. The ability to position a mobile airfield anywhere in international waters provides unmatched strategic flexibility.
            </p>
            <p className="leading-relaxed">
              As naval aviation enters its second century, new challenges including hypersonic weapons, advanced air defenses, and space-based systems are driving continued innovation. The fundamental concept pioneered by early naval aviators—extending the reach and effectiveness of naval forces through aviation—remains as relevant today as it was when the first aircraft lifted off from a ship's deck over a century ago.
            </p>
          </div>

          <div className="mt-8">
            <Image
              src="/blog-images/modern-carrier-operations.jpg"
              alt="Modern aircraft carrier flight operations showing the current state of naval aviation with advanced jet fighters and sophisticated deck operations"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 italic text-center">
              Modern carrier operations - Today's naval aviation combines advanced aircraft, precision weapons, and sophisticated systems
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
                      The complete history of HMS Argus, the world's first true aircraft carrier and pioneer of naval aviation operations.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/captain-eric-brown" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/captain-eric-brown.jpg"
                    alt="Captain Eric Brown book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Captain Eric Brown: Naval Test Pilot
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The extraordinary story of Captain Eric Brown, the world's most experienced naval test pilot and carrier aviation pioneer.
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
                Aviation historian specializing in naval aviation development and maritime air power evolution. Author of authoritative works on aircraft carrier development, Fleet Air Arm history, and the technological innovations that transformed naval warfare.
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
                article_title: 'Naval Aviation History',
                article_category: 'Naval Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 18,
                topic: 'Maritime Aviation Development'
              });
            }
          `
        }}
      />
    </div>
  )
}
