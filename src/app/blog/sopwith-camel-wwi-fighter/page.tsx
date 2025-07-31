import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Sopwith Camel: The WWI Fighter That Won Air Superiority | Charles E. MacKay',
  description: 'The definitive story of the Sopwith Camel - the most successful Allied fighter of WWI. Discover how this tricky but effective aircraft shot down more enemy planes than any other Allied fighter and changed aerial warfare forever.',
  keywords: [
    'Sopwith Camel fighter',
    'WWI Sopwith Camel',
    'Camel fighter aircraft',
    'Great War aviation',
    'Sopwith Camel history',
    'WWI fighter aircraft',
    'RFC Sopwith Camel',
    'Camel combat record',
    'Sopwith Aviation Company',
    'Tommy Sopwith aircraft',
    'Camel specifications',
    'WWI aerial combat',
    'Charles MacKay aviation books',
    'Sopwith Camel development',
    'British fighter WWI',
    'Camel vs Albatros',
    'Western Front aviation',
    'Camel pilot training',
    'Sopwith Camel variants',
    'Great War air superiority'
  ],
  openGraph: {
    title: 'Sopwith Camel: The WWI Fighter That Won Air Superiority',
    description: 'The definitive story of the Sopwith Camel - the most successful Allied fighter of WWI that shot down more enemy planes than any other.',
    url: 'https://charlesmackaybooks.com/blog/sopwith-camel-wwi-fighter',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/sopwith-camel-historical-1918.jpg',
        width: 1200,
        height: 630,
        alt: 'Sopwith Camel WWI fighter aircraft - the most successful Allied fighter that won air superiority'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sopwith Camel: The WWI Fighter That Won Air Superiority',
    description: 'The definitive story of the Sopwith Camel - the most successful Allied fighter of WWI.',
    images: ['/blog-images/sopwith-camel-historical-1918.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sopwith Camel: The WWI Fighter That Won Air Superiority',
  description: 'The definitive story of the Sopwith Camel - the most successful Allied fighter of WWI. Discover how this tricky but effective aircraft shot down more enemy planes than any other Allied fighter and changed aerial warfare forever.',
  image: '/blog-images/sopwith-camel-historical-1918.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in WWI aircraft development and Great War aviation history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/sopwith-camel.jpg'
    }
  },
  datePublished: '2025-01-30T12:00:00.000Z',
  dateModified: '2025-01-30T12:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/sopwith-camel-wwi-fighter'
  },
  articleSection: 'WWI Aviation History',
  keywords: 'Sopwith Camel, WWI fighter, Great War aviation, aerial combat, fighter aircraft',
  wordCount: 4200,
  readingTime: 'PT17M'
}

export default function SopwithCamelPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/sopwith-camel-wwi-fighter'
  const pageTitle = 'Sopwith Camel: The WWI Fighter That Won Air Superiority'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Sopwith Camel
                <span className="block text-red-300">WWI's Greatest Fighter</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The most successful Allied fighter of the Great War. From dangerous quirks to aerial supremacy, discover how the Sopwith Camel shot down more enemy aircraft than any other Allied fighter and turned the tide of aerial warfare over the Western Front.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-red-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>17 minute read</span>
                <span>•</span>
                <span>January 30, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/sopwith-camel-historical-1918.jpg"
                alt="Sopwith Camel WWI fighter aircraft - the most successful Allied fighter that won air superiority over the Western Front"
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-red-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#camel-development" className="text-red-700 hover:text-red-900 py-1">→ Camel Development</a>
            <a href="#design-characteristics" className="text-red-700 hover:text-red-900 py-1">→ Design & Characteristics</a>
            <a href="#combat-service" className="text-red-700 hover:text-red-900 py-1">→ Combat Service</a>
            <a href="#pilot-experience" className="text-red-700 hover:text-red-900 py-1">→ Pilot Experience</a>
            <a href="#combat-record" className="text-red-700 hover:text-red-900 py-1">→ Combat Record</a>
            <a href="#lasting-legacy" className="text-red-700 hover:text-red-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Victory Through Adversity:</strong> The Sopwith Camel destroyed 1,294 enemy aircraft, more than any other Allied fighter of WWI. Despite its tricky handling characteristics that killed more student pilots than enemy fighters, the Camel's unique combination of firepower, maneuverability, and robust construction made it the weapon that won air superiority for the Allies.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The Sopwith Camel occupies a unique position in aviation history as both the most successful Allied fighter of the Great War and one of the most challenging aircraft to fly. Born from the urgent need to counter German aerial supremacy in 1917, the Camel embodied the brutal realities of WWI aerial combat: effectiveness came at the cost of pilot safety, and victory required mastering an aircraft that was as dangerous to its own pilots as it was to the enemy. Yet in the hands of skilled pilots, the Camel became the instrument that broke German dominance of the skies and established Allied air superiority that helped win the war.
          </p>
        </div>

        {/* Camel Development Section */}
        <section id="camel-development" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            🏭 Camel Development: Born from Desperate Need (1916-1917)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Response to "Bloody April"</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Sopwith Camel was conceived during the darkest period of Allied aviation in 1916-1917, when German fighters dominated the skies and Allied losses reached catastrophic levels. The Royal Flying Corps was losing aircraft and pilots at an unsustainable rate, with German fighters like the Albatros D.III enjoying technological and tactical superiority that threatened to give Germany permanent air supremacy.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Herbert Smith and the Sopwith Aviation Company recognized that incremental improvements to existing designs would not overcome German advantages. Instead, they developed an entirely new fighter concept that prioritized firepower and combat effectiveness over flying characteristics, accepting that the resulting aircraft would be challenging to fly in exchange for superior combat capability.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Development Timeline</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Late 1916:</strong> Design work begins at Sopwith</li>
                  <li>• <strong>December 1916:</strong> First prototype flight</li>
                  <li>• <strong>May 1917:</strong> Production begins</li>
                  <li>• <strong>July 1917:</strong> First combat squadrons equipped</li>
                  <li>• <strong>Total built:</strong> 5,490 aircraft</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/sopwith-camel-rfc.jpg"
                alt="Royal Flying Corps Sopwith Camel showing the distinctive twin Vickers machine guns and compact design"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                RFC Sopwith Camel - The twin Vickers guns and compact design that defined WWI's most successful fighter
              </p>
            </div>
          </div>
        </section>

        {/* Design Characteristics Section */}
        <section id="design-characteristics" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            ⚙️ Design & Characteristics: Lethal Beauty and Deadly Quirks
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Revolutionary Design Features</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Combat Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Twin synchronized Vickers guns:</strong> Unprecedented firepower</li>
                  <li>• <strong>Compact, agile design:</strong> Superior maneuverability</li>
                  <li>• <strong>Robust construction:</strong> Could absorb significant damage</li>
                  <li>• <strong>Excellent rate of climb:</strong> Could reach altitude quickly</li>
                  <li>• <strong>Concentrated weight forward:</strong> Enhanced diving performance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-3">⚠️ Dangerous Characteristics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Nose-heavy configuration:</strong> Tendency to nose over on landing</li>
                  <li>• <strong>Torque reaction:</strong> Violent right turns from engine torque</li>
                  <li>• <strong>Tricky takeoff:</strong> Required careful throttle management</li>
                  <li>• <strong>Stall characteristics:</strong> Could enter dangerous spins</li>
                  <li>• <strong>Ground handling:</strong> Prone to nosing over in rough fields</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Camel's distinctive "hump" behind the engine (which gave the aircraft its nickname) housed the twin Vickers machine guns, ammunition, and fuel tank, creating an extremely nose-heavy configuration. This concentration of weight forward of the center of gravity gave the Camel its legendary maneuverability but also made it one of the most challenging aircraft to fly safely.
          </p>
        </section>

        {/* Combat Service Section */}
        <section id="combat-service" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            ⚔️ Combat Service: Turning the Tide of Aerial War (1917-1918)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Western Front Dominance</h3>

              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-red-800 mb-3">Combat Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Enemy aircraft destroyed:</span>
                    <span className="font-semibold">1,294</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service period:</span>
                    <span className="font-semibold">July 1917 - November 1918</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Squadrons equipped:</span>
                    <span className="font-semibold">40+ RFC/RAF squadrons</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Combat effectiveness:</span>
                    <span className="font-semibold text-red-600">Highest of any Allied fighter</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training casualties:</span>
                    <span className="font-semibold text-red-600">385 student pilots killed</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Camel's entry into service in July 1917 coincided with the end of "Bloody April" and marked the beginning of Allied recovery in aerial warfare. By late 1917, Camel squadrons were achieving air superiority over German forces, with experienced pilots exploiting the aircraft's unique characteristics to devastating effect.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">🎖️ Tactical Innovations</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Camel pilots developed new combat techniques that exploited the aircraft's unique handling characteristics. The famous "Camel turn" used engine torque and forward weight distribution to achieve incredibly tight right turns that could out-maneuver any German fighter.
                </p>

                <h5 className="font-semibold text-green-700 mb-2">Combat Techniques:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Exploiting torque reaction for rapid right turns</li>
                  <li>• Using forward weight for superior diving attacks</li>
                  <li>• Coordinated squadron tactics maximizing firepower</li>
                  <li>• Ground attack missions with bombs and strafing</li>
                  <li>• Night fighter operations against German bombers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pilot Experience Section */}
        <section id="pilot-experience" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            👨‍✈️ The Pilot Experience: Mastering a Killer
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">385</div>
              <div className="text-sm text-gray-600">Training Deaths</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Lethal</div>
              <div className="text-sm text-gray-600">In Skilled Hands</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Unforgiving</div>
              <div className="text-sm text-gray-600">To Novices</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Learning to Fly the Camel</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Training Challenges</h4>
                  <p className="text-sm text-gray-700">New pilots faced a deadly learning curve. The Camel's handling characteristics were so unusual that experienced pilots from other aircraft still needed extensive training.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">The "Camel Killer" Reputation</h4>
                  <p className="text-sm text-gray-700">More student pilots died learning to fly the Camel than the aircraft shot down enemy fighters, earning it a reputation as a "pilot killer."</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Mastery Through Survival</h4>
                  <p className="text-sm text-gray-700">Pilots who survived the training period and mastered the Camel's quirks became extraordinarily effective combat pilots.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Pilot Accounts</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>"Vicious characteristics":</strong> Required constant attention to avoid disaster</li>
                <li>• <strong>"Sensitive to engine power":</strong> Throttle changes caused violent reactions</li>
                <li>• <strong>"Unforgiving on landing":</strong> Tendency to nose over in rough fields</li>
                <li>• <strong>"Deadly in a spin":</strong> Recovery required perfect technique</li>
                <li>• <strong>"Magnificent in combat":</strong> Unmatched maneuverability when mastered</li>
                <li>• <strong>"Could turn on a sixpence":</strong> Superior agility over German fighters</li>
                <li>• <strong>"Saved my life many times":</strong> Combat effectiveness offset handling dangers</li>
                <li>• <strong>"The machine that won the war":</strong> Pilot recognition of strategic importance</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Survival Skills</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Successful Camel pilots developed an intimate understanding of their aircraft's behavior, learning to anticipate and counter its dangerous tendencies while exploiting its combat advantages. This knowledge gap between novice and experienced pilots was larger than for any other WWI fighter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Combat Record Section */}
        <section id="combat-record" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            🏆 Combat Record: Victory Through Superior Firepower
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sopwith Camel's combat record remains unmatched among Allied fighters of WWI, with 1,294 confirmed enemy aircraft destroyed representing nearly 20% of all German aircraft lost during the war. This extraordinary success rate stemmed from the combination of concentrated firepower, tactical flexibility, and the skill of pilots who had mastered the aircraft's challenging characteristics.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Beyond air-to-air combat, the Camel proved versatile in ground attack roles, carrying small bombs and conducting strafing runs against German positions. Some squadrons specialized in night operations, intercepting German bombers attempting to attack British cities and supply lines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Combat Achievements</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Air-to-air victories:</strong> 1,294 enemy aircraft destroyed</li>
                <li>• <strong>Ground attack missions:</strong> Extensive strafing and bombing operations</li>
                <li>• <strong>Night fighter role:</strong> Interception of German bombers</li>
                <li>• <strong>Strategic bombing defense:</strong> Protection of British cities</li>
                <li>• <strong>Reconnaissance escort:</strong> Fighter protection for observation aircraft</li>
                <li>• <strong>Tactical support:</strong> Close support for ground operations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Notable Engagements</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Third Battle of Ypres:</strong> Air superiority during ground offensive</li>
                <li>• <strong>German Spring Offensive 1918:</strong> Critical air support</li>
                <li>• <strong>Hundred Days Offensive:</strong> Air dominance in final campaigns</li>
                <li>• <strong>Western Front operations:</strong> Daily combat missions</li>
                <li>• <strong>Home defense:</strong> Protection against Gotha bomber raids</li>
                <li>• <strong>Italian Front:</strong> Limited service with Italian squadrons</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-red-200 pb-4">
            🌟 Lasting Legacy: The Fighter That Changed Everything
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sopwith Camel's legacy extends far beyond its impressive combat statistics. As the first fighter aircraft to demonstrate that concentrated firepower and tactical versatility could overcome superior flight characteristics, the Camel established design principles that influenced fighter development throughout the interwar period and into WWII.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Perhaps more importantly, the Camel proved that air superiority could be achieved through pilot training, tactical innovation, and acceptance of operational risk. The willingness to field an aircraft that was dangerous to its own pilots in order to gain combat effectiveness became a recurring theme in military aviation, influencing fighter design philosophy for decades.
            </p>
          </div>

          <div className="bg-red-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🦅 The Camel's Victory</h3>
            <p className="leading-relaxed mb-4">
              From its dangerous debut in 1917 to the Armistice in 1918, the Sopwith Camel transformed Allied fortunes in aerial warfare. By accepting that effective combat aircraft might be challenging to fly, Sopwith created a fighter that could match and exceed German capabilities, providing Allied forces with the air superiority essential for victory on the Western Front.
            </p>
            <p className="leading-relaxed">
              The Camel's 1,294 victories represent more than statistics—they represent the triumph of industrial innovation, pilot skill, and tactical adaptation over technological disadvantage. In the annals of aviation history, few aircraft have had such a decisive impact on the outcome of warfare, making the Sopwith Camel not just WWI's most successful fighter, but one of the most important military aircraft ever built.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/british-aircraft-great-war" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/british-aircraft-great-war.jpg"
                    alt="British Aircraft Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      British Aircraft of the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete story of British aviation during WWI, including detailed coverage of the Sopwith Camel and other fighters.
                    </p>
                    <div className="text-red-600 text-sm mt-2">Read more →</div>
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      Captain Eric Brown: Test Pilot Legend
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The extraordinary career of the pilot who flew more aircraft types than anyone, including historical fighters like the Camel.
                    </p>
                    <div className="text-red-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Author Bio */}
        <section className="bg-slate-100 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              CM
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Charles E. MacKay</h3>
              <p className="text-gray-700 mb-3">
                Aviation historian specializing in WWI aircraft development and Great War aviation history. Author of authoritative works on the evolution of fighter aircraft and the technological innovations that shaped aerial warfare during the world's first air war.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/about" className="text-red-600 hover:text-red-800">About the Author</Link>
                <Link href="/books" className="text-red-600 hover:text-red-800">All Books</Link>
                <Link href="/blog" className="text-red-600 hover:text-red-800">More Articles</Link>
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
                article_title: 'Sopwith Camel WWI Fighter',
                article_category: 'WWI Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 17,
                topic: 'Great War Fighter Aircraft'
              });
            }
          `
        }}
      />
    </div>
  )
}
