import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'


export const metadata: Metadata = {
  title: 'F-86 Sabre: Cold War Fighter Supreme - From Korean Skies to NATO Service | Charles E. MacKay',
  description: 'The complete story of the North American F-86 Sabre - the swept-wing fighter that dominated Korean War skies and established American jet fighter supremacy during the Cold War. Discover its development, combat record, and lasting legacy.',
  keywords: [
    'F-86 Sabre fighter',
    'Korean War aviation',
    'Cold War fighter aircraft',
    'North American Aviation',
    'swept wing fighter',
    'MiG-15 vs F-86',
    'jet fighter development',
    'Korean War air combat',
    'F-86 Sabre pilots',
    'Cold War military aviation',
    'American jet fighters',
    'NATO fighter aircraft',
    'F-86 combat record',
    'Korean War aces',
    'Sabre vs MiG',
    'Charles MacKay aviation books',
    'jet age fighters',
    'Cold War aviation',
    'F-86 specifications',
    'Fighter aircraft history'
  ],
  openGraph: {
    title: 'F-86 Sabre: Cold War Fighter Supreme - From Korean Skies to NATO Service',
    description: 'The complete story of the North American F-86 Sabre - the swept-wing fighter that dominated Korean War skies and established American jet fighter supremacy.',
    url: 'https://charlesmackaybooks.com/blog/f86-sabre-cold-war-fighter',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/f86-sabre-fighter-jet.jpg',
        width: 1200,
        height: 630,
        alt: 'North American F-86 Sabre fighter jet showing the swept-wing design that dominated Korean War skies'
      }
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F-86 Sabre: Cold War Fighter Supreme - From Korean Skies to NATO Service',
    description: 'The complete story of the North American F-86 Sabre - the swept-wing fighter that dominated Korean War skies.',
    images: ['/blog-images/f86-sabre-fighter-jet.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'F-86 Sabre: Cold War Fighter Supreme - From Korean Skies to NATO Service',
  description: 'The complete story of the North American F-86 Sabre - the swept-wing fighter that dominated Korean War skies and established American jet fighter supremacy during the Cold War. Discover its development, combat record, and lasting legacy.',
  image: '/blog-images/f86-sabre-fighter-jet.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Cold War military aviation and fighter aircraft development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/f86-sabre.jpg'
    }
  },
  datePublished: '2025-01-27T21:00:00.000Z',
  dateModified: '2025-01-27T21:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/f86-sabre-cold-war-fighter'
  },
  articleSection: 'Cold War Aviation',
  keywords: 'F-86 Sabre, Korean War, Cold War fighter, swept wing aircraft, MiG-15',
  wordCount: 3800,
  readingTime: 'PT15M'
}

export default function F86SabrePage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/f86-sabre-cold-war-fighter'
  const pageTitle = 'F-86 Sabre: Cold War Fighter Supreme - From Korean Skies to NATO Service'

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
                F-86 Sabre
                <span className="block text-blue-300">Cold War Fighter Supreme</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The swept-wing masterpiece that ruled Korean War skies and established American jet fighter supremacy. From its innovative design to legendary combat record against the MiG-15, the Sabre defined Cold War air power.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
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
                src="/blog-images/f86-sabre-fighter-jet.jpg"
                alt="North American F-86 Sabre fighter jet showing the swept-wing design that dominated Korean War skies and established American Cold War air superiority"
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
            <a href="#development-origins" className="text-blue-700 hover:text-blue-900 py-1">→ Development Origins</a>
            <a href="#swept-wing-innovation" className="text-blue-700 hover:text-blue-900 py-1">→ Swept Wing Innovation</a>
            <a href="#korean-war-combat" className="text-blue-700 hover:text-blue-900 py-1">→ Korean War Combat</a>
            <a href="#sabre-vs-mig" className="text-blue-700 hover:text-blue-900 py-1">→ Sabre vs MiG-15</a>
            <a href="#global-service" className="text-blue-700 hover:text-blue-900 py-1">→ Global Service</a>
            <a href="#lasting-legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Combat Record:</strong> The F-86 Sabre achieved a 10:1 kill ratio against MiG-15s in the Korean War, flying 674,000 combat sorties and producing 39 American jet aces. It remained the backbone of Western air power throughout the 1950s and served with 24 nations worldwide.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The North American F-86 Sabre stands as one of the most successful and influential fighter aircraft in aviation history. Born from captured German swept-wing research and American engineering excellence, the Sabre revolutionized jet fighter design and established the template for modern supersonic fighters. Its combat record in the Korean War, where it faced and defeated the Soviet-designed MiG-15, proved the superiority of Western aircraft design and pilot training while establishing American air power doctrine for the Cold War era.
          </p>
        </div>

        {/* Development Origins Section */}
        <section id="development-origins" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🔧 Development Origins: From German Research to American Excellence (1944-1947)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Post-War Innovation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The F-86 Sabre's development began in 1944 when North American Aviation received a U.S. Army Air Forces contract for a new day fighter. Initially designed as a straight-wing aircraft, the project was revolutionized by captured German research on swept-wing aerodynamics. This German data, combined with American manufacturing expertise and engineering innovation, created the foundation for the world's most successful early jet fighter.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                North American's design team, led by Edgar Schmued (who had previously designed the P-51 Mustang), recognized that swept wings would dramatically improve high-speed performance. The decision to adopt the swept-wing configuration, despite the technical challenges and development delays, proved crucial to the Sabre's eventual success against Soviet jet fighters.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Development Timeline (1944-1947)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1944:</strong> Initial USAAF contract awarded</li>
                  <li>• <strong>1945:</strong> German swept-wing research incorporated</li>
                  <li>• <strong>1946:</strong> Design finalized with 35-degree sweep</li>
                  <li>• <strong>October 1, 1947:</strong> First flight of XP-86</li>
                  <li>• <strong>1948:</strong> Production F-86A deliveries begin</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/f86-vs-mig15-combat.jpg"
                alt="F-86 Sabre and MiG-15 in formation showing the two opposing fighters of the Korean War"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                F-86 Sabre and MiG-15 - the opposing fighters that defined Korean War aerial combat
              </p>
            </div>
          </div>
        </section>

        {/* Swept Wing Innovation Section */}
        <section id="swept-wing-innovation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ✈️ Swept Wing Innovation: Aerodynamic Revolution (1947-1950)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Technical Breakthrough</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Aerodynamic Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>High-speed performance:</strong> Delayed compressibility effects</li>
                  <li>• <strong>35-degree sweep:</strong> Optimal balance of speed and control</li>
                  <li>• <strong>Transonic capability:</strong> Approached Mach 1 in dives</li>
                  <li>• <strong>Stability:</strong> Excellent flight characteristics</li>
                  <li>• <strong>Maneuverability:</strong> Superior turning performance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🔬 Technical Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>J47 engine:</strong> 5,200 lbf thrust General Electric turbojet</li>
                  <li>• <strong>Armament:</strong> Six .50 caliber M3 Browning machine guns</li>
                  <li>• <strong>Leading edge slats:</strong> Automatic deployment for control</li>
                  <li>• <strong>All-flying tail:</strong> Improved control at high speed</li>
                  <li>• <strong>Speed brakes:</strong> Large ventral air brake</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Sabre's swept-wing design represented a quantum leap in fighter aircraft technology. By sweeping the wings back 35 degrees, North American engineers delayed the onset of compressibility effects that plagued straight-wing jets at high speeds. This innovation, combined with powerful engines and advanced flight controls, gave the Sabre a crucial performance advantage that would prove decisive in combat.
          </p>
        </section>

        {/* Korean War Combat Section */}
        <section id="korean-war-combat" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚔️ Korean War Combat: Proving Ground for Jet Fighters (1950-1953)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">MiG Alley Battles</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-800 mb-3">Korean War Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Combat Sorties:</span>
                    <span className="font-semibold">674,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MiGs Destroyed:</span>
                    <span className="font-semibold">792 claimed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabres Lost:</span>
                    <span className="font-semibold">78 in air combat</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Kill Ratio:</span>
                    <span className="font-semibold text-blue-600">10:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jet Aces Created:</span>
                    <span className="font-semibold text-blue-600">39 pilots</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Korean War provided the first major test of jet-versus-jet combat, with F-86 Sabres facing Soviet-supplied MiG-15s over northwest Korea in the area known as "MiG Alley." The Sabre's superior pilot training, advanced radar gunsight, and aerodynamic design gave it decisive advantages in this new form of aerial warfare.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🎖️ Combat Excellence</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  F-86 pilots dominated the skies over Korea through superior training, tactics, and technology. The combination of the Sabre's performance characteristics and American pilot experience created an unmatched aerial combat capability that established air superiority throughout the conflict.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Key Advantages:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Superior pilot training and experience</li>
                  <li>• Advanced A-1C radar gunsight</li>
                  <li>• Better high-altitude performance</li>
                  <li>• Effective combat tactics development</li>
                  <li>• Excellent aircraft maintenance support</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/blog-images/f86-sabre-fighter-jet.jpg"
              alt="F-86 Sabre and MiG-15 fighters in combat formation during the Korean War showing the epic aerial duels that defined the conflict"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 italic text-center">
              F-86 Sabre and MiG-15 in combat - the epic aerial duels that defined Korean War skies
            </p>
          </div>
        </section>

        {/* Sabre vs MiG Section */}
        <section id="sabre-vs-mig" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🥊 Sabre vs MiG-15: The Ultimate Jet Fighter Duel
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">F-86F</div>
              <div className="text-sm text-gray-600">687 mph Max Speed</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">MiG-15</div>
              <div className="text-sm text-gray-600">668 mph Max Speed</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Advantage</div>
              <div className="text-sm text-gray-600">F-86 Sabre</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Comparative Analysis</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">F-86 Sabre Advantages</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Superior low-altitude performance</li>
                    <li>• Better diving characteristics</li>
                    <li>• More effective armament placement</li>
                    <li>• Advanced radar gunsight</li>
                    <li>• Better pilot visibility</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">MiG-15 Advantages</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Higher service ceiling</li>
                    <li>• Better initial climb rate</li>
                    <li>• More powerful cannon armament</li>
                    <li>• Simpler construction and maintenance</li>
                    <li>• Lighter weight</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/mig15-korean-war-fighter.jpg"
                alt="MiG-15 fighter jet - the Soviet fighter that was the F-86 Sabre's primary opponent in Korean War combat"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                MiG-15 - The Sabre's worthy adversary that sparked the first jet-age aerial battles
              </p>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Combat Reality</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  While the MiG-15 possessed certain performance advantages, the F-86's superior pilot training, better armament system, and more forgiving flight characteristics proved decisive in combat. The Sabre's 10:1 kill ratio demonstrated the importance of pilot quality and aircraft systems integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Service Section */}
        <section id="global-service" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🌍 Global Service: NATO and Allied Operations (1950-1980s)
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Beyond its Korean War fame, the F-86 Sabre served as the backbone of Western air power throughout the 1950s and beyond. Twenty-four nations operated various versions of the Sabre, making it one of the most widely-used fighter aircraft in history. From NATO air forces in Europe to allied nations worldwide, the Sabre provided reliable, effective air defense during the tensest years of the Cold War.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The aircraft's versatility was demonstrated through numerous variants, including the F-86D all-weather interceptor, the F-86H fighter-bomber, and various export versions built under license in multiple countries. This global service record established the Sabre as a cornerstone of Western military aviation and helped standardize NATO fighter operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Major Operators</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>United States:</strong> USAF primary fighter 1950-1960</li>
                <li>• <strong>Canada:</strong> Canadair Sabre production</li>
                <li>• <strong>United Kingdom:</strong> Royal Air Force service</li>
                <li>• <strong>West Germany:</strong> Luftwaffe rebuilt around Sabres</li>
                <li>• <strong>Japan:</strong> F-86F production under license</li>
                <li>• <strong>Australia:</strong> CAC Sabre variant</li>
                <li>• <strong>NATO allies:</strong> Spain, Italy, Norway, others</li>
                <li>• <strong>Worldwide service:</strong> 24 nations total</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Production and Variants</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Total production:</strong> 9,860 aircraft</li>
                <li>• <strong>F-86A-E:</strong> Early day fighter versions</li>
                <li>• <strong>F-86D:</strong> All-weather interceptor</li>
                <li>• <strong>F-86F:</strong> Improved fighter variant</li>
                <li>• <strong>F-86H:</strong> Fighter-bomber version</li>
                <li>• <strong>F-86K:</strong> Export interceptor</li>
                <li>• <strong>Licensed production:</strong> Canada, Japan, Australia</li>
                <li>• <strong>Service period:</strong> 1949-1994 (Argentina, last user)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 Lasting Legacy: Template for Modern Fighters
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The F-86 Sabre's influence on fighter aircraft design extends far beyond its operational service life. Its swept-wing configuration, integrated fire control system, and emphasis on pilot-friendly handling characteristics established the template for all subsequent fighter aircraft. The lessons learned from the Sabre's development and combat experience directly influenced the design of supersonic fighters like the F-100 Super Sabre and beyond.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More importantly, the Sabre's combat record proved that superior technology, when combined with excellent pilot training and effective tactics, could achieve decisive air superiority even against numerically superior forces. This lesson became fundamental to Western air power doctrine and continues to influence military aviation strategy today.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ The Sabre Standard</h3>
            <p className="leading-relaxed mb-4">
              The F-86 Sabre established the gold standard for fighter aircraft effectiveness through its unique combination of advanced aerodynamics, reliable systems, and pilot-friendly design. Its 10:1 kill ratio in Korea demonstrated that technological superiority, properly applied, could achieve overwhelming tactical advantage even in the early jet age.
            </p>
            <p className="leading-relaxed">
              From "MiG Alley" over North Korea to NATO bases across Europe, the Sabre provided the backbone of Western air defense during the most dangerous years of the Cold War. Its legacy lives on in every modern fighter aircraft, which still follows the basic design principles and operational concepts pioneered by this remarkable swept-wing fighter that changed the course of military aviation.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/books/sonic-to-standoff" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/sonic-to-standoff.jpg"
                    alt="Sonic to Standoff book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Sonic to Standoff: Jet Age Development
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete story of jet fighter development during the Cold War, featuring the F-86 Sabre and its revolutionary impact on military aviation.
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
                      Captain Eric Brown: Test Pilot Extraordinary
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The biography of history's most experienced test pilot, who flew the F-86 Sabre and hundreds of other aircraft during the jet age transition.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/sabres-from-north" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/sabres-from-north.jpg"
                    alt="Sabres from North book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Sabres from the North: F-86 in RAF, RCAF Service
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The dedicated history of F-86 Sabre service with Commonwealth air forces, covering RAF, RCAF, and NATO operations during the Cold War.
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
                Aviation historian specializing in Cold War military aviation and fighter aircraft development. Author of authoritative works on jet fighter evolution and the technical and tactical innovations that shaped modern air combat.
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
                article_title: 'F86 Sabre Cold War Fighter',
                article_category: 'Cold War Aviation',
                author: 'Charles E. MacKay',
                reading_time: 15,
                topic: 'Fighter Aircraft History'
              });
            }
          `
        }}
      />
    </div>
  )
}
