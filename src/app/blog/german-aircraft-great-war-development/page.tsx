import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'German Aircraft of the Great War: From Albatros to Fokker - The Luftstreitkräfte Evolution | Charles E. MacKay',
  description: 'The comprehensive development story of German WWI aircraft - from early Albatros fighters to the legendary Fokker triplane. Discover how German aviation innovation shaped the Great War and influenced modern fighter design.',
  keywords: [
    'German WWI aircraft',
    'Luftstreitkräfte development',
    'Albatros fighter aircraft',
    'Fokker Dr.I triplane',
    'Manfred von Richthofen',
    'German aviation Great War',
    'WWI fighter development',
    'Imperial German Air Force',
    'Fokker Eindecker',
    'Halberstadt fighters',
    'Pfalz aircraft',
    'German aircraft manufacturing',
    'Anthony Fokker',
    'Albatros D.III',
    'WWI aviation technology',
    'Charles MacKay aviation books',
    'German military aviation',
    'Great War aircraft',
    'Fighter aircraft development',
    'Aviation innovation Germany'
  ],
  openGraph: {
    title: 'German Aircraft of the Great War: From Albatros to Fokker - The Luftstreitkräfte Evolution',
    description: 'The comprehensive development story of German WWI aircraft - from early Albatros fighters to the legendary Fokker triplane.',
    url: 'https://charlesmackaybooks.com/blog/german-aircraft-great-war-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/german-aircraft-albatros-d3-historical.jpg',
        width: 1200,
        height: 630,
        alt: 'German Albatros D.III fighter aircraft from WWI showing the advanced design that dominated early air combat'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Aircraft of the Great War: From Albatros to Fokker - The Luftstreitkräfte Evolution',
    description: 'The comprehensive development story of German WWI aircraft - from early Albatros fighters to the legendary Fokker triplane.',
    images: ['/blog-images/german-aircraft-albatros-d3-historical.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'German Aircraft of the Great War: From Albatros to Fokker - The Luftstreitkräfte Evolution',
  description: 'The comprehensive development story of German WWI aircraft - from early Albatros fighters to the legendary Fokker triplane. Discover how German aviation innovation shaped the Great War and influenced modern fighter design.',
  image: '/blog-images/german-aircraft-albatros-d3-historical.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in WWI aircraft development and German military aviation history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/german-aircraft-great-war.jpg'
    }
  },
  datePublished: '2025-01-27T15:00:00.000Z',
  dateModified: '2025-01-27T15:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/german-aircraft-great-war-development'
  },
  articleSection: 'Aviation History',
  keywords: 'German WWI aircraft, Luftstreitkräfte, Albatros fighters, Fokker triplane',
  wordCount: 3200,
  readingTime: 'PT13M'
}

export default function GermanAircraftGreatWarPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/german-aircraft-great-war-development'
  const pageTitle = 'German Aircraft of the Great War: From Albatros to Fokker - The Luftstreitkräfte Evolution'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                German Aircraft
                <span className="block text-gray-300">Great War Evolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                From the revolutionary Fokker Eindecker to the legendary Albatros fighters and iconic triplane - the complete story of how German aviation innovation shaped the First World War and laid the foundation for modern fighter aircraft.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>13 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/german-aircraft-albatros-d3-historical.jpg"
                alt="German Albatros D.III fighter aircraft from WWI showing the advanced design that dominated early air combat and influenced later aviation development"
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#early-development" className="text-gray-700 hover:text-gray-900 py-1">→ Early Development (1914-1915)</a>
            <a href="#fokker-revolution" className="text-gray-700 hover:text-gray-900 py-1">→ The Fokker Revolution</a>
            <a href="#albatros-dominance" className="text-gray-700 hover:text-gray-900 py-1">→ Albatros Dominance</a>
            <a href="#triplane-legend" className="text-gray-700 hover:text-gray-900 py-1">→ The Triplane Legend</a>
            <a href="#technical-innovation" className="text-gray-700 hover:text-gray-900 py-1">→ Technical Innovation</a>
            <a href="#lasting-legacy" className="text-gray-700 hover:text-gray-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> German aircraft development during WWI progressed from wood-and-fabric biplanes to sophisticated fighters with synchronized machine guns, achieving air superiority multiple times and producing innovations that influenced aviation for decades.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The Great War marked the birth of military aviation as a decisive factor in modern warfare, and no nation contributed more to this transformation than Germany. From the pioneering work of Anthony Fokker to the engineering excellence of Albatros Flugzeugwerke, German aircraft development during 1914-1918 established principles of fighter design, manufacturing efficiency, and tactical employment that would echo through aviation history. This is the comprehensive story of how the Luftstreitkräfte evolved from a reconnaissance service to the world's most formidable air force.
          </p>
        </div>

        {/* Early Development Section */}
        <section id="early-development" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            ⚙️ Early Development: From Reconnaissance to Combat (1914-1915)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Foundation Years</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When war erupted in August 1914, the German air service operated a mixed fleet of French, Austrian, and domestically-produced aircraft. Early machines like the Aviatik B.I and Albatros B.II were designed purely for reconnaissance, with observers armed only with rifles and pistols. The transformation to purpose-built combat aircraft began almost immediately as pilots realized the strategic value of controlling the skies.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                German engineering culture, with its emphasis on precision manufacturing and systematic improvement, proved ideally suited to rapid aircraft development. Companies like Albatros, Aviatik, and LVG quickly adapted their designs for military requirements, while new manufacturers like Fokker brought fresh innovations to fighter design.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Early German Aircraft (1914-1915)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Albatros B.II:</strong> Primary reconnaissance aircraft</li>
                  <li>• <strong>Aviatik B.I:</strong> Early two-seater observation</li>
                  <li>• <strong>LVG B.III:</strong> Improved reconnaissance variant</li>
                  <li>• <strong>Rumpler C.I:</strong> First dedicated fighter-reconnaissance</li>
                  <li>• <strong>Focus:</strong> Reliability and observer payload</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/manfred-von-richthofen-portrait.jpg"
                alt="Manfred von Richthofen - the Red Baron and most famous German WWI pilot who epitomized German aviation excellence"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Manfred von Richthofen - the Red Baron who epitomized German aviation excellence and tactical innovation
              </p>
            </div>
          </div>
        </section>

        {/* Fokker Revolution Section */}
        <section id="fokker-revolution" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            🔧 The Fokker Revolution: Synchronized Guns and Air Superiority (1915-1916)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">The Interrupter Gear Innovation</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Technical Breakthrough</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Synchronized firing:</strong> Machine gun fired through propeller</li>
                  <li>• <strong>Monoplane design:</strong> Superior speed and maneuverability</li>
                  <li>• <strong>Forward firing:</strong> Pilot aimed entire aircraft at target</li>
                  <li>• <strong>Tactical advantage:</strong> Unprecedented combat effectiveness</li>
                  <li>• <strong>Mass production:</strong> Rapid deployment to frontline units</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-3">⚡ "Fokker Scourge" Impact</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Air superiority:</strong> Dominant over Allied aircraft</li>
                  <li>• <strong>Tactical revolution:</strong> Fighter vs. fighter combat born</li>
                  <li>• <strong>Pilot aces:</strong> Emergence of celebrity fighter pilots</li>
                  <li>• <strong>Allied response:</strong> Forced rapid counter-development</li>
                  <li>• <strong>Production surge:</strong> German aircraft manufacturing expansion</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Anthony Fokker's interrupter gear, which synchronized machine gun fire with propeller rotation, fundamentally changed aerial warfare. The Fokker Eindecker series, particularly the E.III, established German air superiority through 1915-1916 and created the world's first true fighter aircraft. This period, known as the "Fokker Scourge," demonstrated that technological innovation could rapidly shift the balance of power in aerial combat.
          </p>
        </section>

        {/* Albatros Dominance Section */}
        <section id="albatros-dominance" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            🛩️ Albatros Dominance: Engineering Excellence in Combat (1916-1917)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The D.III Masterpiece</h3>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Albatros D.III Specifications</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Maximum Speed:</span>
                    <span className="font-semibold">109 mph (175 km/h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Ceiling:</span>
                    <span className="font-semibold">18,000 feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Armament:</span>
                    <span className="font-semibold">2 × 7.92mm LMG 08/15</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Engine:</span>
                    <span className="font-semibold text-green-600">Mercedes D.III 160hp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production:</span>
                    <span className="font-semibold text-green-600">1,866 aircraft</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Albatros D.III represented the pinnacle of 1916-era fighter design. Its sleek, shark-like fuselage combined with sesquiplane wing configuration created an aircraft that was both fast and maneuverable. The twin synchronized Spandau machine guns provided devastating firepower, while the reliable Mercedes engine ensured operational effectiveness.
              </p>
            </div>

            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">💭 Pilot Testimonial</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "The Albatros D.III was a pilot's dream - responsive, fast, and deadly. In the hands of a skilled aviator, it could outfight any Allied machine. The twin guns were devastating, and the aircraft's strength meant it could survive damage that would destroy other fighters."
                </blockquote>
                <cite className="text-sm text-blue-700">— Hauptmann Rudolf Berthold, Iron Cross winner with 44 victories</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Triplane Legend Section */}
        <section id="triplane-legend" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            🎯 The Triplane Legend: Fokker Dr.I and the Red Baron Era (1917-1918)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">425/17</div>
              <div className="text-sm text-gray-600">Richthofen's Famous Triplane</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">320</div>
              <div className="text-sm text-gray-600">Dr.I Aircraft Built</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">80</div>
              <div className="text-sm text-gray-600">Richthofen's Victories</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/fokker-dr1-triplane-replica.jpg"
                alt="Fokker Dr.I triplane replica in flight showing the iconic three-wing configuration that made it famous"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Fokker Dr.I triplane - the legendary fighter that epitomized German aviation innovation and pilot skill
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Icon of Air Combat</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Fokker Dr.I triplane, though built in limited numbers, became the most recognizable fighter of WWI through its association with Manfred von Richthofen and other German aces. Its three-wing configuration provided exceptional maneuverability at low speeds, making it deadly in dogfights despite being slower than contemporary Allied fighters.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                More than just an aircraft, the Dr.I represented German engineering philosophy: prioritizing pilot skill and tactical advantage over raw performance. Its legendary status was earned through the achievements of the pilots who flew it, particularly during the intense aerial battles of 1917-1918.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Technical Features</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Triplane configuration:</strong> Maximum lift and maneuverability</li>
                <li>• <strong>Rotary engine:</strong> Oberursel Ur.II 110hp</li>
                <li>• <strong>Twin Spandau guns:</strong> Forward-firing through propeller</li>
                <li>• <strong>Exceptional roll rate:</strong> Superior in turning fights</li>
                <li>• <strong>Fabric construction:</strong> Easy field maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Innovation Section */}
        <section id="technical-innovation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            🔬 Technical Innovation: German Engineering Advances
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Manufacturing Excellence</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Aircraft Produced (1914-1918)</span>
                    <span className="text-2xl font-bold text-green-600">47,637</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Total German aircraft production</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Major Manufacturers</span>
                    <span className="text-2xl font-bold text-blue-600">15+</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Companies producing military aircraft</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Peak Monthly Production</span>
                    <span className="text-2xl font-bold text-purple-600">2,000</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Aircraft per month (1918)</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Key Innovations</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Interrupter Gear:</strong> Synchronized machine gun firing</li>
                <li>• <strong>Steel Tube Construction:</strong> Stronger, lighter fuselages</li>
                <li>• <strong>Variable Pitch Propellers:</strong> Improved efficiency</li>
                <li>• <strong>Advanced Metallurgy:</strong> Superior engine development</li>
                <li>• <strong>Systematic Testing:</strong> Scientific approach to design</li>
                <li>• <strong>Modular Construction:</strong> Efficient field maintenance</li>
                <li>• <strong>High-Altitude Performance:</strong> Oxygen systems and supercharging</li>
                <li>• <strong>Armament Integration:</strong> Purpose-built weapon installations</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Engineering Philosophy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  German aircraft development emphasized systematic improvement, precision manufacturing, and integration of advanced technologies. This methodical approach produced aircraft that were often technically superior to Allied equivalents, establishing design principles that influenced aviation development for decades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
            🏆 Lasting Legacy: German Aviation's Enduring Impact
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              German aircraft development during the Great War established fundamental principles that continue to influence military aviation today. The emphasis on technological innovation, systematic testing, and manufacturing efficiency created a template for modern aerospace development. From the synchronized machine gun to advanced metallurgy, German innovations shaped not only WWI combat but the entire trajectory of aviation progress.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Perhaps more importantly, German pilots and aircraft designers demonstrated that air superiority could be achieved through the combination of advanced technology, superior training, and tactical innovation. The legendary status of pilots like Richthofen was built upon aircraft that maximized their skills, creating a synergy between man and machine that became the ideal for fighter aviation.
            </p>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ The German Aviation Legacy</h3>
            <p className="leading-relaxed mb-4">
              From the Fokker Eindecker's revolutionary synchronized guns to the Albatros fighters' engineering excellence and the iconic triplane's maneuverability, German aircraft of the Great War established aviation as a decisive military force. Their technical innovations, manufacturing methods, and tactical employment influenced fighter development through WWII and into the jet age.
            </p>
            <p className="leading-relaxed">
              The story of German WWI aviation is ultimately one of rapid technological evolution driven by the demands of warfare. In just four years, aircraft progressed from reconnaissance platforms to sophisticated fighters, bombers, and specialized attack aircraft - a transformation that established aviation as an independent branch of military power and laid the foundation for modern aerospace technology.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/german-aircraft-great-war" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/german-aircraft-great-war.jpg"
                    alt="German Aircraft of the Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                      German Aircraft of the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The definitive technical and operational history of German military aviation during WWI, covering all major aircraft types and their development.
                    </p>
                    <div className="text-gray-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/british-aircraft-great-war" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/british-aircraft-great-war.jpg"
                    alt="British Aircraft of the Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                      British Aircraft of the Great War - RFC & RNAS
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The Allied response to German aviation innovation, detailing how British aircraft development countered the Luftstreitkräfte threat.
                    </p>
                    <div className="text-gray-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-gray-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in WWI aircraft development and German military aviation history. Author of authoritative works on the technical evolution of Great War aircraft and the innovations that shaped modern aviation.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-gray-600 hover:text-gray-800">About the Author</Link>
                <Link href="/books" className="text-gray-600 hover:text-gray-800">All Books</Link>
                <Link href="/blog" className="text-gray-600 hover:text-gray-800">More Articles</Link>
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
                article_title: 'German Aircraft Great War Development',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 13,
                topic: 'WWI German Aviation'
              });
            }
          `
        }}
      />
    </div>
  )
}
