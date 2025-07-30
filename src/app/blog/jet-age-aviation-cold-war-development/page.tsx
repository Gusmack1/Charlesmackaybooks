import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Jet Age Aviation: Cold War Supersonic Revolution 1945-1991 | Charles E. MacKay',
  description: 'How the Cold War rivalry between East and West accelerated jet aviation development, producing supersonic fighters, spy planes, and revolutionary aircraft that transformed military and civilian aviation forever.',
  keywords: [
    'jet age aviation',
    'Cold War aviation',
    'supersonic aircraft',
    'jet fighter development',
    'Cold War aircraft',
    'military jet aviation',
    'supersonic flight development',
    'jet engine evolution',
    'Cold War aerospace',
    'aviation technology Cold War',
    'jet aircraft development',
    'supersonic fighters',
    'Cold War military aviation',
    'Charles MacKay aviation books',
    'jet age technology',
    'aviation Cold War rivalry',
    'supersonic breakthrough',
    'jet aviation history',
    'Cold War aircraft industry',
    'aerospace Cold War development'
  ],
  openGraph: {
    title: 'Jet Age Aviation: Cold War Supersonic Revolution 1945-1991',
    description: 'How the Cold War rivalry between East and West accelerated jet aviation development, producing supersonic aircraft that transformed aviation.',
    url: 'https://charlesmackaybooks.com/blog/jet-age-aviation-cold-war-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/f86-vs-mig15-combat.jpg',
        width: 1200,
        height: 630,
        alt: 'F-86 Sabre vs MiG-15 Cold War aerial combat showing the iconic rivalry that defined jet fighter development'
      }
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jet Age Aviation: Cold War Supersonic Revolution 1945-1991',
    description: 'How the Cold War rivalry between East and West accelerated jet aviation development, producing supersonic aircraft.',
    images: ['/blog-images/f86-vs-mig15-combat.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jet Age Aviation: Cold War Supersonic Revolution 1945-1991',
  description: 'How the Cold War rivalry between East and West accelerated jet aviation development, producing supersonic fighters, spy planes, and revolutionary aircraft that transformed military and civilian aviation forever.',
  image: '/blog-images/f86-vs-mig15-combat.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Cold War aerospace development and jet age aviation technology',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/jet-age-aviation.jpg'
    }
  },
  datePublished: '2025-01-28T01:00:00.000Z',
  dateModified: '2025-01-28T01:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/jet-age-aviation-cold-war-development'
  },
  articleSection: 'Cold War Aviation History',
  keywords: 'jet age aviation, Cold War aircraft, supersonic flight, jet fighter development, aerospace technology',
  wordCount: 4200,
  readingTime: 'PT17M'
}

export default function JetAgeAviationPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/jet-age-aviation-cold-war-development'
  const pageTitle = 'Jet Age Aviation: Cold War Supersonic Revolution 1945-1991'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Jet Age Aviation
                <span className="block text-purple-300">Cold War Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The supersonic revolution driven by East-West rivalry. From the first jet fighters to Mach 3 spy planes and supersonic airliners, discover how Cold War competition accelerated aviation technology beyond all previous limits.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>17 minute read</span>
                <span>•</span>
                <span>January 28, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/f86-vs-mig15-combat.jpg"
                alt="F-86 Sabre vs MiG-15 Cold War aerial combat showing the iconic East vs West rivalry that drove jet fighter development"
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-purple-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#jet-revolution" className="text-purple-700 hover:text-purple-900 py-1">→ The Jet Revolution Begins</a>
            <a href="#supersonic-breakthrough" className="text-purple-700 hover:text-purple-900 py-1">→ Supersonic Breakthrough</a>
            <a href="#cold-war-competition" className="text-purple-700 hover:text-purple-900 py-1">→ Cold War Competition</a>
            <a href="#spy-planes" className="text-purple-700 hover:text-purple-900 py-1">→ High-Altitude Spy Planes</a>
            <a href="#supersonic-transport" className="text-purple-700 hover:text-purple-900 py-1">→ Supersonic Transport</a>
            <a href="#lasting-legacy" className="text-purple-700 hover:text-purple-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Speed Revolution:</strong> The Cold War era saw aviation technology advance from subsonic jets to Mach 3+ aircraft in just two decades. Between 1945 and 1970, jet fighters evolved from 600 mph jets to supersonic interceptors capable of Mach 2.5, while spy planes like the SR-71 Blackbird achieved sustained speeds above Mach 3.2.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The Cold War period from 1945 to 1991 represents the most revolutionary era in aviation history, when geopolitical rivalry between East and West drove technological innovation at an unprecedented pace. This superpower competition transformed aviation from the subsonic jets of the late 1940s to the supersonic fighters, spy planes, and passenger aircraft that defined the jet age. The relentless pursuit of technological superiority created aircraft capabilities that seemed like science fiction just years earlier, establishing aviation technologies that continue to influence aerospace design today.
          </p>
        </div>

        {/* Jet Revolution Section */}
        <section id="jet-revolution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🚀 The Jet Revolution Begins: From Propellers to Pure Jets (1945-1955)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Post-War Jet Development</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The end of World War II marked the beginning of the jet age, as captured German technology and ongoing British and American research converged to create a new generation of aircraft. The Me 262 and other German jets had demonstrated the potential of turbojet propulsion, while British engines like the Rolls-Royce Nene and American designs pushed jet technology forward rapidly.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Early Cold War tensions accelerated development as both superpowers recognized that air superiority would be crucial in any future conflict. The United States and Soviet Union, along with their allies, invested heavily in jet fighter development, creating a technological arms race that would define aviation for the next four decades.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Early Jet Milestones (1945-1955)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1947:</strong> Bell X-1 breaks sound barrier</li>
                  <li>• <strong>1949:</strong> F-86 Sabre enters service</li>
                  <li>• <strong>1950:</strong> MiG-15 demonstrates Soviet capability</li>
                  <li>• <strong>1953:</strong> F-100 Super Sabre - first supersonic fighter</li>
                  <li>• <strong>1955:</strong> U-2 spy plane first flight</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/sr71-blackbird-spy-plane.jpg"
                alt="SR-71 Blackbird supersonic spy plane representing the pinnacle of Cold War aviation technology"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                SR-71 Blackbird - The ultimate expression of Cold War aviation technology, capable of Mach 3+ flight
              </p>
            </div>
          </div>
        </section>

        {/* Supersonic Breakthrough Section */}
        <section id="supersonic-breakthrough" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            ⚡ Supersonic Breakthrough: Breaking the Sound Barrier (1947-1960)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">The Sound Barrier Falls</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Supersonic Achievements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Bell X-1 (1947):</strong> First supersonic flight</li>
                  <li>• <strong>F-100 Super Sabre:</strong> First operational supersonic fighter</li>
                  <li>• <strong>F-104 Starfighter:</strong> Mach 2+ interceptor capability</li>
                  <li>• <strong>MiG-21:</strong> Soviet supersonic mass production</li>
                  <li>• <strong>Area Rule:</strong> Revolutionary aerodynamic design principle</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🔬 Technical Innovations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Swept wings:</strong> Delayed shock wave formation</li>
                  <li>• <strong>Afterburning:</strong> Increased thrust for supersonic flight</li>
                  <li>• <strong>Variable geometry:</strong> Optimized for multiple flight regimes</li>
                  <li>• <strong>Titanium construction:</strong> Heat-resistant materials</li>
                  <li>• <strong>Advanced avionics:</strong> Supersonic flight control systems</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The breakthrough to supersonic flight required solving numerous technical challenges, from the aerodynamics of transonic flow to new materials capable of withstanding the heat generated by high-speed flight. Each advance built upon previous achievements, creating a rapid acceleration in aircraft capabilities that transformed military aviation.
          </p>
        </section>

        {/* Cold War Competition Section */}
        <section id="cold-war-competition" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🥊 Cold War Competition: East vs. West Technology Race (1950-1970)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Superpower Rivalry</h3>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-purple-800 mb-3">Competition Dynamics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Western Aircraft:</span>
                    <span className="font-semibold">F-104, F-4 Phantom, Mirage</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Soviet Aircraft:</span>
                    <span className="font-semibold">MiG-21, MiG-25, Su-7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed Race:</span>
                    <span className="font-semibold">Mach 1 to Mach 3+</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Technology Transfer:</span>
                    <span className="font-semibold text-purple-600">Minimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Innovation Rate:</span>
                    <span className="font-semibold text-purple-600">Unprecedented</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Cold War created parallel development paths as East and West pursued similar goals through different approaches. This competition accelerated innovation as each side sought technological advantages, leading to rapid advances in jet engines, aerodynamics, and aircraft systems.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🎖️ Competitive Advantages</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Both superpowers developed distinct technological approaches. The West emphasized sophisticated avionics and precision engineering, while the Soviet Union focused on rugged simplicity and mass production capability. Each approach had advantages in different operational scenarios.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Key Developments:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Parallel development of similar capabilities</li>
                  <li>• Technology sharing within alliance blocks</li>
                  <li>• Rapid obsolescence of aircraft designs</li>
                  <li>• Emphasis on performance over cost</li>
                  <li>• Development of specialized mission aircraft</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Spy Planes Section */}
        <section id="spy-planes" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🕵️ High-Altitude Spy Planes: Technology at the Edge (1955-1990)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">U-2</div>
              <div className="text-sm text-gray-600">70,000+ ft Altitude</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">SR-71</div>
              <div className="text-sm text-gray-600">Mach 3.3+ Speed</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">MiG-25</div>
              <div className="text-sm text-gray-600">Soviet Response</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Ultimate Cold War Aircraft</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Lockheed U-2 (1955)</h4>
                  <p className="text-sm text-gray-700">High-altitude reconnaissance aircraft designed to fly above Soviet air defenses, utilizing specialized engines and ultra-lightweight construction.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">SR-71 Blackbird (1964)</h4>
                  <p className="text-sm text-gray-700">Mach 3+ strategic reconnaissance aircraft representing the pinnacle of Cold War technology, with titanium construction and specialized fuel systems.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">MiG-25 Foxbat (1970)</h4>
                  <p className="text-sm text-gray-700">Soviet high-speed interceptor designed to counter American reconnaissance aircraft, achieving Mach 3+ speeds through brute-force engineering.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Spy Plane Technologies</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Extreme altitude capability:</strong> 70,000+ feet operating ceiling</li>
                <li>• <strong>Advanced materials:</strong> Titanium and specialized alloys</li>
                <li>• <strong>Specialized engines:</strong> High-altitude optimized powerplants</li>
                <li>• <strong>Heat management:</strong> Thermal protection systems</li>
                <li>• <strong>Reconnaissance systems:</strong> High-resolution cameras and sensors</li>
                <li>• <strong>Electronic countermeasures:</strong> Defense against surface-to-air missiles</li>
                <li>• <strong>Extended range:</strong> Intercontinental mission capability</li>
                <li>• <strong>Stealth features:</strong> Reduced radar cross-section</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Strategic Impact</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Spy planes represented the ultimate fusion of politics and technology, with aircraft performance directly influencing international relations and strategic intelligence gathering capabilities throughout the Cold War.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supersonic Transport Section */}
        <section id="supersonic-transport" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            ✈️ Supersonic Transport: Civil Aviation Enters the Jet Age
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The success of military supersonic aircraft inspired attempts to bring supersonic speed to civilian aviation. The Anglo-French Concorde and Soviet Tu-144 represented the pinnacle of this ambition, demonstrating that passenger aircraft could achieve Mach 2+ speeds. However, the economic and environmental challenges of supersonic passenger flight proved more difficult than the technical ones.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              While both aircraft achieved their performance goals, operational limitations including noise restrictions, fuel consumption, and limited passenger capacity prevented supersonic transport from becoming widespread. The Concorde operated successfully for 27 years, while the Tu-144 had a much shorter service life, highlighting the different approaches to supersonic passenger aviation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/concorde-supersonic-passenger.jpg"
                alt="Concorde supersonic passenger jet showing the civilian application of Cold War aviation technology"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Concorde - The most successful supersonic passenger aircraft, demonstrating civilian application of military technology
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Supersonic Transport Characteristics</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Concorde performance:</strong> Mach 2.04 cruise speed</li>
                <li>• <strong>Flight time reduction:</strong> London-New York in 3.5 hours</li>
                <li>• <strong>Advanced aerodynamics:</strong> Delta wing configuration</li>
                <li>• <strong>Specialized engines:</strong> Rolls-Royce Olympus turbojets</li>
                <li>• <strong>Heat management:</strong> Airframe expansion at supersonic speed</li>
                <li>• <strong>Environmental challenges:</strong> Noise and emissions concerns</li>
                <li>• <strong>Economic factors:</strong> High operating costs</li>
                <li>• <strong>Limited routes:</strong> Supersonic overland flight restrictions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🏆 Lasting Legacy: Cold War Aviation's Enduring Impact
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Cold War period established the technological foundation for modern aviation. Jet engines, supersonic flight, advanced materials, and sophisticated avionics all trace their origins to this era of intense competition. The pace of innovation during this period created capabilities that remain impressive today, while establishing design principles that continue to guide aerospace development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Perhaps most importantly, the Cold War demonstrated how geopolitical competition could drive technological advancement at unprecedented rates. The achievements of this era—from supersonic fighters to space-capable aircraft—established aviation capabilities that transformed both military strategy and civilian transportation, creating the modern aerospace industry that continues to push the boundaries of flight.
            </p>
          </div>

          <div className="bg-purple-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🚀 The Jet Age Legacy</h3>
            <p className="leading-relaxed mb-4">
              The Cold War jet age represents humanity's most rapid advance in aviation capability, compressing decades of potential development into just 25 years of intense competition. From the first subsonic jets to Mach 3+ aircraft, this period established technologies and capabilities that continue to define aviation today.
            </p>
            <p className="leading-relaxed">
              The supersonic fighters, spy planes, and passenger aircraft developed during the Cold War pushed the boundaries of what was considered possible, creating a legacy of innovation that influences every modern aircraft. The spirit of competition and technological ambition that characterized this era continues to drive aerospace development, ensuring that the jet age's most important contribution—the belief that any technical challenge can be overcome—remains aviation's guiding principle.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/jet-age-aviation" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/jet-age-aviation.jpg"
                    alt="Jet Age Aviation book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Jet Age Aviation: The Cold War Revolution
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete technical and political history of Cold War aviation development, from first jets to supersonic aircraft.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/supersonic-aircraft" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/supersonic-aircraft.jpg"
                    alt="Supersonic Aircraft book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Breaking the Sound Barrier: Supersonic Flight Development
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The story of supersonic flight from the Bell X-1 to modern military and civilian aircraft development.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in Cold War aerospace development and jet age aviation technology. Author of authoritative works on the technological competition that drove supersonic flight development and established modern aviation capabilities.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-purple-600 hover:text-purple-800">About the Author</Link>
                <Link href="/books" className="text-purple-600 hover:text-purple-800">All Books</Link>
                <Link href="/blog" className="text-purple-600 hover:text-purple-800">More Articles</Link>
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
                article_title: 'Jet Age Aviation Cold War Development',
                article_category: 'Cold War Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 17,
                topic: 'Supersonic Aviation Technology'
              });
            }
          `
        }}
      />
    </div>
  )
}
