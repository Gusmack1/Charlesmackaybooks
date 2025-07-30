import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'British Aircraft of the Great War: RFC & RNAS Evolution from Reconnaissance to Mastery | Charles E. MacKay',
  description: 'The complete story of British WWI aviation - from the Royal Flying Corps and Royal Naval Air Service to RAF formation. Discover how the Sopwith Camel, SE5a, and Bristol Fighter revolutionized aerial warfare and established British air supremacy.',
  keywords: [
    'British WWI aircraft',
    'Royal Flying Corps',
    'Royal Naval Air Service',
    'RAF formation',
    'Sopwith Camel',
    'SE5a fighter',
    'Bristol Fighter',
    'WWI aviation history',
    'British fighter aircraft',
    'Great War aviation',
    'RFC RNAS history',
    'British air supremacy',
    'WWI aircraft development',
    'Charles MacKay aviation books',
    'British military aviation',
    'Fighter aircraft WWI',
    'Royal Aircraft Factory',
    'Bristol aircraft',
    'Sopwith aviation',
    'Aviation history WWI'
  ],
  openGraph: {
    title: 'British Aircraft of the Great War: RFC & RNAS Evolution from Reconnaissance to Mastery',
    description: 'The complete story of British WWI aviation - from the Royal Flying Corps and Royal Naval Air Service to RAF formation.',
    url: 'https://charlesmackaybooks.com/blog/british-aircraft-great-war-rfc-rnas',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/rfc-pilots-no32-squadron-1916.jpg',
        width: 1200,
        height: 630,
        alt: 'RFC pilots of No. 32 Squadron showing British military aviation development during WWI'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'British Aircraft of the Great War: RFC & RNAS Evolution from Reconnaissance to Mastery',
    description: 'The complete story of British WWI aviation - from the Royal Flying Corps and Royal Naval Air Service to RAF formation.',
    images: ['/blog-images/rfc-pilots-no32-squadron-1916.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'British Aircraft of the Great War: RFC & RNAS Evolution from Reconnaissance to Mastery',
  description: 'The complete story of British WWI aviation - from the Royal Flying Corps and Royal Naval Air Service to RAF formation. Discover how the Sopwith Camel, SE5a, and Bristol Fighter revolutionized aerial warfare and established British air supremacy.',
  image: '/blog-images/rfc-pilots-no32-squadron-1916.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in British WWI aviation development and military aircraft history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/british-aircraft-great-war.jpg'
    }
  },
  datePublished: '2025-01-27T16:00:00.000Z',
  dateModified: '2025-01-27T16:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/british-aircraft-great-war-rfc-rnas'
  },
  articleSection: 'Aviation History',
  keywords: 'British WWI aircraft, RFC, RNAS, Sopwith Camel, SE5a, Bristol Fighter',
  wordCount: 3400,
  readingTime: 'PT14M'
}

export default function BritishAircraftGreatWarPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/british-aircraft-great-war-rfc-rnas'
  const pageTitle = 'British Aircraft of the Great War: RFC & RNAS Evolution from Reconnaissance to Mastery'

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
                British Aircraft
                <span className="block text-blue-300">Great War Mastery</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                From the pioneering Royal Flying Corps to the formation of the Royal Air Force - the extraordinary story of how British aircraft evolution from reconnaissance machines to the world's most effective fighters revolutionized aerial warfare forever.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>14 minute read</span>
                <span>•</span>
                <span>January 27, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/rfc-pilots-no32-squadron-1916.jpg"
                alt="RFC pilots of No. 32 Squadron with their aircraft in 1916 showing the British military aviation development and esprit de corps during WWI"
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
            description="The complete story of British WWI aviation - from the Royal Flying Corps and Royal Naval Air Service to RAF formation. Discover how the Sopwith Camel, SE5a, and Bristol Fighter revolutionized aerial warfare and established British air supremacy."
            hashtags={['WWI Aviation', 'RFC', 'RNAS', 'SopwithCamel', 'BritishAviation', 'GreatWar', 'AviationHistory', 'CharlesMacKay']}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">

        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#early-foundations" className="text-blue-700 hover:text-blue-900 py-1">→ RFC & RNAS Foundations</a>
            <a href="#sopwith-excellence" className="text-blue-700 hover:text-blue-900 py-1">→ Sopwith Excellence</a>
            <a href="#royal-aircraft-factory" className="text-blue-700 hover:text-blue-900 py-1">→ Royal Aircraft Factory</a>
            <a href="#bristol-innovation" className="text-blue-700 hover:text-blue-900 py-1">→ Bristol Innovation</a>
            <a href="#raf-formation" className="text-blue-700 hover:text-blue-900 py-1">→ RAF Formation</a>
            <a href="#lasting-legacy" className="text-blue-700 hover:text-blue-900 py-1">→ Lasting Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> British aircraft production during WWI increased from 50 aircraft in 1914 to over 30,000 by 1918, while aircraft types evolved from unarmed reconnaissance machines to sophisticated fighters that dominated the skies by war's end.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            The transformation of British military aviation during the Great War stands as one of the most remarkable technological and organizational achievements in military history. Beginning with the modest Royal Flying Corps and Royal Naval Air Service in 1914, Britain ended the war with the world's largest and most effective air force, equipped with aircraft that had evolved from fragile reconnaissance machines to sophisticated fighters, bombers, and specialized aircraft that established the foundation for modern air power.
          </p>
        </div>

        {/* Early Foundations Section */}
        <section id="early-foundations" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🎯 RFC & RNAS Foundations: From Reconnaissance to Combat (1912-1915)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Dual Service Origins</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Royal Flying Corps, established in 1912, and the Royal Naval Air Service, formalized in 1914, began the war with contrasting philosophies but shared determination. The RFC focused on army cooperation and tactical reconnaissance, while the RNAS pursued more aggressive roles including strategic bombing and naval operations. This dual approach would prove invaluable as aviation evolved rapidly during the conflict.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Early British aircraft like the Avro 504 and BE2c were designed for stability and reliability rather than combat performance. However, the harsh realities of aerial warfare quickly demonstrated the need for fighters capable of engaging enemy aircraft and protecting reconnaissance missions.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Early British Aircraft (1914-1915)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Avro 504:</strong> Primary training and reconnaissance aircraft</li>
                  <li>• <strong>BE2c:</strong> Stable observation platform with defensive guns</li>
                  <li>• <strong>Bristol Scout:</strong> First British single-seat fighter</li>
                  <li>• <strong>Vickers FB5:</strong> Purpose-built fighter with pusher configuration</li>
                  <li>• <strong>Focus:</strong> Reconnaissance, artillery spotting, and air defense</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/bristol-f2b-fighter-replica.jpg"
                alt="Bristol F2B Fighter replica showing the advanced two-seater fighter design that dominated late-war operations"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Bristol F2B Fighter - The two-seater that redefined tactical aviation in the latter war years
              </p>
            </div>
          </div>
        </section>

        {/* Sopwith Excellence Section */}
        <section id="sopwith-excellence" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            ✈️ Sopwith Excellence: Revolutionary Fighter Design (1916-1918)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">The Camel Revolution</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Sopwith Innovations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Twin synchronized guns:</strong> Devastating forward firepower</li>
                  <li>• <strong>Compact design:</strong> Exceptional maneuverability</li>
                  <li>• <strong>Rotary engine:</strong> Excellent power-to-weight ratio</li>
                  <li>• <strong>Rugged construction:</strong> Survived combat damage</li>
                  <li>• <strong>Production efficiency:</strong> Rapid manufacturing capability</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🎖️ Combat Achievements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>1,294 enemy aircraft:</strong> Confirmed Camel victories</li>
                  <li>• <strong>5,490 aircraft built:</strong> Most produced British fighter</li>
                  <li>• <strong>Major aces:</strong> Roy Brown, Arthur Roy Brown</li>
                  <li>• <strong>Versatile roles:</strong> Fighter, ground attack, naval operations</li>
                  <li>• <strong>Global service:</strong> Multiple Allied air forces</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/blog-images/sopwith-camel-historical-1918.jpg"
                alt="Historical Sopwith Camel from 1918 showing the iconic British fighter that achieved more victories than any other WWI aircraft"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Sopwith Camel - The fighter that shot down more enemy aircraft than any other type in WWI
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Sopwith Camel became the most successful fighter aircraft of WWI, credited with destroying 1,294 enemy aircraft—more than any other type. Its distinctive appearance, with the hump-backed fuselage housing twin synchronized Vickers machine guns, made it instantly recognizable and feared by German pilots.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">💭 Pilot Assessment</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "The Camel was a pilot's aircraft - sensitive, responsive, and deadly in the right hands. It would turn on a sixpence and its twin guns were devastating. No German pilot wanted to face a well-flown Camel in a turning fight."
                </blockquote>
                <cite className="text-sm text-green-700">— Major William Barker, VC, DSO & Bar, MC & Two Bars</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Royal Aircraft Factory Section */}
        <section id="royal-aircraft-factory" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏭 Royal Aircraft Factory: Engineering Excellence and the SE5a (1917-1918)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The SE5a Masterpiece</h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-blue-800 mb-3">SE5a Specifications</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Maximum Speed:</span>
                    <span className="font-semibold">138 mph (222 km/h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Ceiling:</span>
                    <span className="font-semibold">19,000 feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Armament:</span>
                    <span className="font-semibold">1 × Vickers + 1 × Lewis gun</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Engine:</span>
                    <span className="font-semibold text-blue-600">Hispano-Suiza 8B 200hp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production:</span>
                    <span className="font-semibold text-blue-600">5,205 aircraft</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The SE5a represented the pinnacle of British fighter design, combining speed, stability, and firepower in a platform that was both forgiving for average pilots and devastating in the hands of experts. Unlike the sensitive Camel, the SE5a was a stable gun platform that could engage enemies at high speed and altitude.
              </p>
            </div>

            <div>
              <Image
                src="/blog-images/se5a-royal-aircraft-factory.jpg"
                alt="Royal Aircraft Factory SE5a biplane fighter showing the stable, fast design that equipped Britain's top aces"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                SE5a - The stable, fast fighter that equipped many of Britain's highest-scoring aces
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">138 mph</div>
              <div className="text-sm text-gray-600">Top Speed</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">19,000 ft</div>
              <div className="text-sm text-gray-600">Service Ceiling</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5,205</div>
              <div className="text-sm text-gray-600">Aircraft Built</div>
            </div>
          </div>
        </section>

        {/* Bristol Innovation Section */}
        <section id="bristol-innovation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🔧 Bristol Innovation: The Fighter That Changed Everything
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Revolutionary Two-Seater Fighter</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Bristol F2B Fighters Built</span>
                    <span className="text-2xl font-bold text-green-600">5,329</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Total production run</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Maximum Speed</span>
                    <span className="text-2xl font-bold text-blue-600">123 mph</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Fast for a two-seater</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Service Period</span>
                    <span className="text-2xl font-bold text-purple-600">1917-1932</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Long operational life</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Revolutionary Features</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Fighter-like performance:</strong> Fast despite two-seat configuration</li>
                <li>• <strong>Rolls-Royce Falcon:</strong> Powerful and reliable V12 engine</li>
                <li>• <strong>Forward and rear guns:</strong> 360-degree defensive capability</li>
                <li>• <strong>Reconnaissance and combat:</strong> Multi-role effectiveness</li>
                <li>• <strong>Robust construction:</strong> Suitable for ground attack missions</li>
                <li>• <strong>Post-war service:</strong> Continued use into the 1930s</li>
                <li>• <strong>Export success:</strong> Operated by numerous air forces</li>
                <li>• <strong>Training value:</strong> Excellent advanced trainer aircraft</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Design Philosophy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The Bristol Fighter proved that two-seater aircraft could match single-seat fighters in performance while providing additional reconnaissance and defensive capabilities. This concept influenced fighter development well into the WWII era.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RAF Formation Section */}
        <section id="raf-formation" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🎖️ RAF Formation: The World's First Independent Air Force (1918)
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              On April 1, 1918, the Royal Flying Corps and Royal Naval Air Service merged to form the Royal Air Force—the world's first independent air service. This historic merger created an organization with over 290,000 personnel and nearly 23,000 aircraft, demonstrating that air power had become a decisive element of modern warfare requiring dedicated command and control structures.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The RAF's formation represented more than administrative reorganization; it embodied the recognition that air power was a strategic weapon requiring independent leadership, doctrine, and resources. This concept would influence military aviation organization worldwide and establish the template for modern air forces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">RAF Formation Statistics (April 1918)</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Personnel:</strong> 291,175 officers and enlisted</li>
                <li>• <strong>Aircraft:</strong> 22,647 total aircraft on strength</li>
                <li>• <strong>Squadrons:</strong> 185 operational squadrons</li>
                <li>• <strong>Training units:</strong> 199 training squadrons</li>
                <li>• <strong>Global presence:</strong> Operations on every continent</li>
                <li>• <strong>Manufacturing:</strong> 30+ aircraft factories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Strategic Impact</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Independent command:</strong> Air operations under air leaders</li>
                <li>• <strong>Strategic bombing:</strong> Dedicated long-range strike capability</li>
                <li>• <strong>Air defense:</strong> Coordinated homeland protection</li>
                <li>• <strong>International influence:</strong> Model for other nations</li>
                <li>• <strong>Doctrine development:</strong> Air power theory advancement</li>
                <li>• <strong>Technology focus:</strong> Dedicated aviation research</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="lasting-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
            🏆 Lasting Legacy: British Aviation's Enduring Influence
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              British aircraft development during the Great War established fundamental principles that continue to influence military aviation today. The integration of multiple roles in single aircraft designs, emphasis on pilot training and aircraft reliability, and systematic approach to operational requirements created a template for modern air force development that remains relevant today.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More importantly, Britain's creation of the RAF as an independent service demonstrated that air power required dedicated leadership and resources to reach its full potential. This organizational innovation influenced military structures worldwide and established the foundation for strategic air power that would prove decisive in future conflicts.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ The British Aviation Achievement</h3>
            <p className="leading-relaxed mb-4">
              From the modest beginnings of the RFC and RNAS to the creation of the world's most powerful air force, British aviation during WWI achieved a transformation that established the United Kingdom as the leading aviation power. The Sopwith Camel, SE5a, and Bristol Fighter became the gold standard for fighter aircraft, while British organizational innovations created the modern air force concept.
            </p>
            <p className="leading-relaxed">
              The legacy of British Great War aviation extends far beyond aircraft design to encompass pilot training, maintenance procedures, operational doctrine, and strategic employment of air power. These innovations established principles that guided military aviation through WWII and into the jet age, making British WWI aviation development one of the most influential periods in military history.
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
                    alt="British Aircraft of the Great War book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      British Aircraft of the Great War - RFC & RNAS
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The definitive history of British military aviation development during WWI, covering all major aircraft types and their operational history.
                    </p>
                    <div className="text-blue-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/mother-of-the-few" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/mother-of-the-few.jpg"
                    alt="Mother of the Few book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Mother of the Few
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Lady Houston's crucial role in funding British aviation development and the Schneider Trophy victories that advanced fighter technology.
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
                Aviation historian specializing in British WWI aviation development and military aircraft history. Author of authoritative works on the RFC, RNAS, and RAF formation, with particular expertise in the technical evolution of British fighter aircraft during the Great War.
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
                article_title: 'British Aircraft Great War RFC RNAS',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 14,
                topic: 'British WWI Aviation'
              });
            }
          `
        }}
      />
    </div>
  )
}
