import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'


export const metadata: Metadata = {
  title: 'Captain Eric "Winkle" Brown: The World\'s Greatest Test Pilot - 487 Aircraft Types Record | Charles E. MacKay',
  description: 'The extraordinary biography of Captain Eric Brown, who flew more aircraft types than any pilot in history - 487 different aircraft including enemy fighters, experimental jets, and pioneering carrier landings that revolutionized naval aviation forever.',
  keywords: [
    'Eric Brown test pilot',
    'Winkle Brown biography',
    'naval test pilot record',
    'aircraft carrier landings',
    'Sea Vampire jet landing',
    'Royal Navy Fleet Air Arm',
    'experimental aircraft testing',
    'test pilot biography',
    'aviation world records',
    'carrier aviation pioneer',
    'jet aircraft testing',
    'German aircraft evaluation',
    'RAE Farnborough',
    'aviation achievements',
    'test flying history',
    'Charles MacKay aviation books',
    'naval aviation history',
    'British test pilots',
    'pilot world records',
    'experimental flight testing'
  ],
  openGraph: {
    title: 'Captain Eric "Winkle" Brown: The World\'s Greatest Test Pilot - 487 Aircraft Types Record',
    description: 'The extraordinary biography of Captain Eric Brown, who flew more aircraft types than any pilot in history - 487 different aircraft including enemy fighters and experimental jets.',
    url: 'https://charlesmackaybooks.com/blog/test-pilot-biography-eric-brown',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/eric-brown-test-pilot-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Captain Eric Brown in naval uniform - the legendary test pilot who flew more aircraft types than anyone in history'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Eric "Winkle" Brown: The World\'s Greatest Test Pilot - 487 Aircraft Types Record',
    description: 'The extraordinary biography of Captain Eric Brown, who flew more aircraft types than any pilot in history - 487 different aircraft.',
    images: ['/blog-images/eric-brown-test-pilot-portrait.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Captain Eric "Winkle" Brown: The World\'s Greatest Test Pilot - 487 Aircraft Types Record',
  description: 'The extraordinary biography of Captain Eric Brown, who flew more aircraft types than any pilot in history - 487 different aircraft including enemy fighters, experimental jets, and pioneering carrier landings that revolutionized naval aviation forever.',
  image: '/blog-images/eric-brown-test-pilot-portrait.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in test pilot biographies and experimental aircraft development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/eric-brown-biography.jpg'
    }
  },
  datePublished: '2025-01-27T19:00:00.000Z',
  dateModified: '2025-01-27T19:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/test-pilot-biography-eric-brown'
  },
  articleSection: 'Aviation Biography',
  keywords: 'Eric Brown test pilot, naval aviation, experimental aircraft, carrier landings, aviation records',
  wordCount: 4200,
  readingTime: 'PT17M'
}

export default function EricBrownBiographyPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/test-pilot-biography-eric-brown'
  const pageTitle = 'Captain Eric "Winkle" Brown: The World\'s Greatest Test Pilot - 487 Aircraft Types Record'

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Captain Eric Brown
                <span className="block text-blue-300">The World's Greatest Test Pilot</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The extraordinary story of "Winkle" Brown - the man who flew 487 different aircraft types, more than any pilot in history. From pioneering carrier jet landings to testing captured enemy aircraft, his achievements revolutionized aviation and naval flight operations.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
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
                src="/blog-images/eric-brown-test-pilot-portrait.jpg"
                alt="Captain Eric Brown in naval uniform - the legendary test pilot who flew more aircraft types than anyone in history, revolutionizing experimental flight testing"
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
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="The extraordinary life of Captain Eric Brown, Britain's greatest test pilot who flew 487 different aircraft types and made the first jet carrier landing. A true aviation legend."
            hashtags={['EricBrown', 'TestPilot', 'BritishAviation', 'CarrierLanding', 'AviationLegend', 'TestFlying', 'AviationHistory', 'CharlesMacKay']}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">

        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#early-life" className="text-blue-700 hover:text-blue-900 py-1">→ Early Life & Naval Career</a>
            <a href="#wartime-service" className="text-blue-700 hover:text-blue-900 py-1">→ Wartime Service</a>
            <a href="#test-pilot-career" className="text-blue-700 hover:text-blue-900 py-1">→ Test Pilot Career</a>
            <a href="#carrier-aviation" className="text-blue-700 hover:text-blue-900 py-1">→ Carrier Aviation Pioneer</a>
            <a href="#aircraft-records" className="text-blue-700 hover:text-blue-900 py-1">→ Aircraft Type Records</a>
            <a href="#lasting-legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>World Record:</strong> Captain Eric "Winkle" Brown flew 487 different aircraft types during his career - more than any pilot in history. He also holds the record for most aircraft carrier landings (2,407) and was the first pilot to land a jet aircraft on an aircraft carrier.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            In the pantheon of aviation legends, Captain Eric "Winkle" Brown occupies a unique position. His career spanned the most revolutionary period in aviation history, from biplane fighters to supersonic jets, and his achievements remain unmatched. As the world's most experienced test pilot, Brown's contributions to aviation safety, carrier operations, and experimental aircraft development shaped modern flight and established standards that continue to guide aviation today.
          </p>
        </div>

        {/* Early Life Section */}
        <section id="early-life" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🎯 Early Life & Naval Career: Foundation for Greatness (1919-1939)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Scottish Roots and Early Aviation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Born in Leith, Scotland, on January 21, 1919, Eric Melrose Brown's fascination with aviation began early. His nickname "Winkle" came from his small stature - just 5'7" and 140 pounds - which would later prove advantageous in cramped cockpits and experimental aircraft. Despite his size, Brown possessed extraordinary determination and an analytical mind perfectly suited to test flying.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Brown's early education at the Royal High School in Edinburgh was complemented by flying lessons, and he learned German fluently - a skill that would prove invaluable during his later work with captured enemy aircraft. His university studies at Edinburgh were interrupted by the outbreak of war, but his foundation in engineering and languages equipped him perfectly for his future career.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Early Achievements (1919-1939)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Education:</strong> Royal High School Edinburgh, University of Edinburgh</li>
                  <li>• <strong>Languages:</strong> Fluent German and French</li>
                  <li>• <strong>Early flying:</strong> Private pilot license before naval service</li>
                  <li>• <strong>Naval entry:</strong> Royal Navy Fleet Air Arm 1939</li>
                  <li>• <strong>Training:</strong> Exceptional marks in all flying assessments</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/eric-brown-official-portrait.jpg"
                alt="Eric Brown official Royal Navy portrait showing the young pilot who would become aviation's greatest test pilot"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Young Eric Brown in Royal Navy uniform - destined to become aviation's most accomplished test pilot
              </p>
            </div>
          </div>
        </section>

        {/* Wartime Service Section */}
        <section id="wartime-service" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ⚔️ Wartime Service: Combat and Captured Aircraft (1939-1945)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">From Fighter Pilot to Enemy Aircraft Expert</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Combat Achievements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>HMS Audacity:</strong> First escort carrier operations</li>
                  <li>• <strong>Combat missions:</strong> Atlantic convoy protection</li>
                  <li>• <strong>Aircraft flown:</strong> Multiple fighter types operationally</li>
                  <li>• <strong>Carrier experience:</strong> Extensive deck landing expertise</li>
                  <li>• <strong>Combat innovations:</strong> Tactical development contributions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🔍 Intelligence Work</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>German aircraft:</strong> First Allied pilot to fly Me 163 rocket fighter</li>
                  <li>• <strong>Enemy evaluation:</strong> Comprehensive testing program</li>
                  <li>• <strong>Intelligence reports:</strong> Detailed technical assessments</li>
                  <li>• <strong>Safety procedures:</strong> Dangerous aircraft handling protocols</li>
                  <li>• <strong>Technology transfer:</strong> Allied aircraft improvement guidance</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Brown's wartime service was distinguished not only by his combat flying but by his unique role in evaluating captured German aircraft. His fluency in German and fearless approach to dangerous experimental aircraft made him the ideal pilot for testing enemy fighters, including the revolutionary Me 163 rocket-powered interceptor - a mission that nearly cost him his life but provided invaluable intelligence to Allied forces.
          </p>
        </section>

        {/* Test Pilot Career Section */}
        <section id="test-pilot-career" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🛩️ Test Pilot Career: RAE Farnborough and Beyond (1945-1970)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Ultimate Test Pilot</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-800 mb-3">Career Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Aircraft Types Flown:</span>
                    <span className="font-semibold">487 different types</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carrier Landings:</span>
                    <span className="font-semibold">2,407 total</span>
                  </div>
                  <div className="flex justify-between">
                    <span>First Jet Carrier Landing:</span>
                    <span className="font-semibold">Sea Vampire, December 1945</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Test Flying Career:</span>
                    <span className="font-semibold text-blue-600">25 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Major Accidents:</span>
                    <span className="font-semibold text-blue-600">Zero fatalities</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                At RAE Farnborough, Brown became the world's premier test pilot, responsible for evaluating every type of aircraft imaginable. His methodical approach, engineering background, and exceptional flying skills made him the pilot of choice for the most dangerous and important test programs. His safety record was unmatched - never losing an aircraft due to pilot error.
              </p>
            </div>

            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">💭 Test Philosophy</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "My job was to take new aircraft to their limits and beyond, safely. Every flight taught us something that could save lives and improve aviation. The key was never to take unnecessary risks - calculated risk-taking based on thorough preparation and understanding."
                </blockquote>
                <cite className="text-sm text-green-700">— Captain Eric Brown, from his memoirs</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Carrier Aviation Section */}
        <section id="carrier-aviation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🚢 Carrier Aviation Pioneer: First Jet Landing at Sea (1945)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Dec 3, 1945</div>
              <div className="text-sm text-gray-600">First Jet Carrier Landing</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2,407</div>
              <div className="text-sm text-gray-600">Total Carrier Landings</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">HMS Ocean</div>
              <div className="text-sm text-gray-600">Historic Carrier</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/eric-brown-sea-vampire-landing.jpg"
                alt="Eric Brown's historic Sea Vampire jet landing on HMS Ocean - the first jet aircraft carrier landing in history"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                The historic moment: Brown's Sea Vampire touches down on HMS Ocean, ushering in the jet age for naval aviation
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Revolutionary Achievement</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                On December 3, 1945, Brown made aviation history by successfully landing a de Havilland Sea Vampire jet on HMS Ocean. This achievement was far more significant than a single landing - it proved that jet aircraft could operate from carriers, revolutionizing naval aviation and establishing the foundation for modern carrier operations.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                The landing required exceptional skill and precision. Jets had higher landing speeds than propeller aircraft, less engine response time, and no experience base for carrier operations. Brown's success opened the door to modern naval aviation and demonstrated the potential for carrier-based jet operations that would dominate the seas for decades to come.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Technical Challenges Overcome</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Higher approach speeds:</strong> 20+ mph faster than propeller aircraft</li>
                <li>• <strong>Jet engine response:</strong> Slower throttle reaction compared to props</li>
                <li>• <strong>Landing techniques:</strong> New procedures for jet characteristics</li>
                <li>• <strong>Deck procedures:</strong> Adapted operations for jet aircraft</li>
                <li>• <strong>Safety protocols:</strong> Emergency procedures for jet operations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Aircraft Records Section */}
        <section id="aircraft-records" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            📊 Aircraft Type Records: 487 Different Aircraft Flown
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Unmatched Diversity</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Aircraft Types</span>
                    <span className="text-2xl font-bold text-green-600">487</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">More than any pilot in history</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Aircraft Categories</span>
                    <span className="text-2xl font-bold text-blue-600">All</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Fighters, bombers, transports, helicopters</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Dangerous Aircraft</span>
                    <span className="text-2xl font-bold text-purple-600">Many</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Including experimental and captured enemy types</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Notable Aircraft Types Flown</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>German fighters:</strong> Me 163 rocket fighter, Me 262 jet, Fw 190</li>
                <li>• <strong>British jets:</strong> Meteor, Vampire, Javelin, Lightning</li>
                <li>• <strong>Experimental types:</strong> Numerous prototype and research aircraft</li>
                <li>• <strong>Helicopters:</strong> Early rotorcraft development testing</li>
                <li>• <strong>Flying boats:</strong> Large maritime patrol aircraft</li>
                <li>• <strong>Trainers:</strong> Every major training aircraft type</li>
                <li>• <strong>Foreign aircraft:</strong> American, Soviet, and other nations' types</li>
                <li>• <strong>Record breakers:</strong> High-speed and high-altitude research aircraft</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Testing Philosophy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Brown's approach emphasized thorough preparation, systematic testing, and detailed reporting. His ability to quickly adapt to different aircraft characteristics and provide precise feedback made him invaluable for aviation development and safety improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 Lasting Legacy: The Test Pilot's Test Pilot
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Captain Eric Brown's legacy extends far beyond his impressive statistics. His contributions to aviation safety, carrier operations, and experimental aircraft development established principles and procedures that continue to guide test flying today. His methodical approach, detailed reporting, and emphasis on safety created the modern template for experimental flight testing.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Perhaps most importantly, Brown demonstrated that test flying was as much about engineering analysis and systematic investigation as it was about flying skill. His legacy lives on in every safe flight, every successful carrier landing, and every test pilot who follows the rigorous standards he established during his remarkable career.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ The Brown Standard</h3>
            <p className="leading-relaxed mb-4">
              Eric Brown set the gold standard for test piloting through his combination of exceptional flying skill, engineering knowledge, and systematic approach to experimental flight. His 487 aircraft types, 2,407 carrier landings, and first jet carrier landing represent achievements that will likely never be matched in an era of increasingly specialized aviation.
            </p>
            <p className="leading-relaxed">
              From his wartime evaluation of captured enemy aircraft to pioneering jet carrier operations and decades of experimental flight testing, Brown's career spanned aviation's most revolutionary period. His safety record, technical contributions, and influence on generations of test pilots establish him as not just the world's most experienced pilot, but the most important test pilot in aviation history.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/eric-brown-biography" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/eric-brown-biography.jpg"
                    alt="Eric Brown Biography book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Wings of the Navy: Captain Eric Brown's Legacy
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete biography of the world's greatest test pilot, covering his record-breaking career and contributions to aviation development.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/test-pilots-biography" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/test-pilots.jpg"
                    alt="Test Pilots Biography book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Britain's Greatest Test Pilots
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The stories of the brave men who pushed aviation's boundaries, featuring Eric Brown alongside other legendary test pilots.
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
                Aviation historian specializing in test pilot biographies and experimental aircraft development. Author of definitive works on naval aviation and the legendary pilots who shaped modern flight testing procedures and carrier operations.
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
                article_title: 'Eric Brown Test Pilot Biography',
                article_category: 'Aviation Biography',
                author: 'Charles E. MacKay',
                reading_time: 17,
                topic: 'Test Pilot History'
              });
            }
          `
        }}
      />
    </div>
  )
}
