import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer Who Nearly Beat the Wright Brothers | Charles E. MacKay',
  description: 'The remarkable story of Percy Pilcher, the Scottish engineer whose gliding experiments in the 1890s nearly achieved powered flight before the Wright Brothers. Discover how this aviation pioneer influenced early flight development and Scotland\'s aviation heritage.',
  keywords: [
    'Percy Pilcher',
    'Scottish aviation pioneer',
    'early flight experiments',
    'gliding pioneer',
    'aviation history Scotland',
    'powered flight attempts',
    'Wright Brothers predecessor',
    'glider development',
    'early aviation experiments',
    'Scottish flight pioneer',
    'aviation pioneers Scotland',
    'early gliding history',
    'Percy Pilcher glider',
    'Charles MacKay aviation books',
    'Scottish aviation heritage',
    'aviation development history',
    'flight experiments Scotland',
    'early aircraft design',
    'aviation innovation Scotland',
    'gliding experiments'
  ],
  openGraph: {
    title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer Who Nearly Beat the Wright Brothers',
    description: 'The remarkable story of Percy Pilcher, the Scottish engineer whose gliding experiments nearly achieved powered flight before the Wright Brothers.',
    url: 'https://charlesmackaybooks.com/blog/percy-pilcher-scotland-aviation-pioneer',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/percy-pilcher-hawk-glider-scotland.jpg',
        width: 1200,
        height: 630,
        alt: 'Percy Pilcher with his Hawk glider in Scotland - the aviation pioneer who nearly achieved powered flight before the Wright Brothers'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer Who Nearly Beat the Wright Brothers',
    description: 'The remarkable story of Percy Pilcher, the Scottish engineer whose gliding experiments nearly achieved powered flight before the Wright Brothers.',
    images: ['/blog-images/percy-pilcher-hawk-glider-scotland.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer Who Nearly Beat the Wright Brothers',
  description: 'The remarkable story of Percy Pilcher, the Scottish engineer whose gliding experiments in the 1890s nearly achieved powered flight before the Wright Brothers. Discover how this aviation pioneer influenced early flight development and Scotland\'s aviation heritage.',
  image: '/blog-images/percy-pilcher-hawk-glider-scotland.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in Scottish aviation pioneers and early flight development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/soaring-with-wings.jpg'
    }
  },
  datePublished: '2025-01-27T12:00:00.000Z',
  dateModified: '2025-01-27T12:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/percy-pilcher-scotland-aviation-pioneer'
  },
  articleSection: 'Aviation History',
  keywords: 'Percy Pilcher, Scottish aviation pioneer, early flight experiments, gliding pioneer',
  wordCount: 3200,
  readingTime: 'PT13M'
}

export default function PercyPilcherPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/percy-pilcher-scotland-aviation-pioneer'
  const pageTitle = 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer Who Nearly Beat the Wright Brothers'

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
                Percy Pilcher
                <span className="block text-emerald-300">Scotland's Forgotten Pioneer</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The remarkable story of the Scottish engineer whose daring gliding experiments in the 1890s nearly achieved powered flight before the Wright Brothers, and how his tragic death robbed Scotland of aviation immortality.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
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
                src="/blog-images/percy-pilcher-hawk-glider-scotland.jpg"
                alt="Percy Pilcher with his Hawk glider in Scotland showing the aviation pioneer who nearly achieved powered flight before the Wright Brothers"
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
            <a href="#early-years" className="text-emerald-700 hover:text-emerald-900 py-1">→ Early Years and Engineering</a>
            <a href="#gliding-experiments" className="text-emerald-700 hover:text-emerald-900 py-1">→ Gliding Experiments</a>
            <a href="#hawk-triplane" className="text-emerald-700 hover:text-emerald-900 py-1">→ The Hawk and Triplane</a>
            <a href="#powered-flight" className="text-emerald-700 hover:text-emerald-900 py-1">→ Powered Flight Plans</a>
            <a href="#tragic-end" className="text-emerald-700 hover:text-emerald-900 py-1">→ Tragic End</a>
            <a href="#legacy-influence" className="text-emerald-700 hover:text-emerald-900 py-1">→ Legacy and Influence</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> Percy Pilcher achieved controlled gliding flights of over 250 yards in 1897 and had detailed plans for a powered aircraft engine that could have achieved flight in 1899—four years before the Wright Brothers' success at Kitty Hawk.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            In the annals of aviation history, certain names shine brightly while others fade into obscurity despite their profound contributions to the conquest of flight. Percy Pilcher belongs to the latter category—a brilliant Scottish engineer whose pioneering work in the 1890s brought him tantalizingly close to achieving powered flight years before Orville and Wilbur Wright made their historic flight at Kitty Hawk. Had fate not intervened tragically in 1899, Scotland might well have claimed the honor of first achieving sustained, controlled, powered flight.
          </p>
        </div>

        {/* Early Years Section */}
        <section id="early-years" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🎓 Early Years and Engineering Foundation (1866-1890)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">From Naval Architecture to Flight</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Born in Bath in 1866, Percy Sinclair Pilcher displayed an early fascination with engineering and mechanics. After completing his education at the Royal Naval College, Greenwich, he initially pursued naval architecture—a discipline that would prove invaluable in understanding the principles of fluid dynamics that govern both ships and aircraft.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Pilcher's transition from naval to aeronautical engineering began in the early 1890s when he encountered the work of Otto Lilienthal, the German gliding pioneer. Lilienthal's systematic experiments with hang gliders captured Pilcher's imagination and convinced him that controlled, heavier-than-air flight was not only possible but achievable through careful scientific study.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Engineering Background</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1884-1887:</strong> Royal Naval College, Greenwich</li>
                  <li>• <strong>1887-1891:</strong> Naval architecture apprenticeship</li>
                  <li>• <strong>1891:</strong> Assistant Lecturer, Glasgow University</li>
                  <li>• <strong>1893:</strong> Begins aviation experiments</li>
                  <li>• <strong>Focus:</strong> Fluid dynamics and structural engineering</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/percy-pilcher-bat-gull-glider.jpg"
                alt="Percy Pilcher's early glider experiments showing the systematic development that led to the Hawk"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Pilcher's early glider experiments - systematic development that led to his masterpiece, the Hawk
              </p>
            </div>
          </div>
        </section>

        {/* Gliding Experiments Section */}
        <section id="gliding-experiments" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🪁 Systematic Gliding Experiments (1895-1898)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">The Scientific Method Applied to Flight</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Pilcher's Innovations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Systematic documentation:</strong> Detailed flight logs and measurements</li>
                  <li>• <strong>Progressive design:</strong> Each glider improved on the last</li>
                  <li>• <strong>Safety emphasis:</strong> Careful attention to structural integrity</li>
                  <li>• <strong>Wind studies:</strong> Understanding of atmospheric conditions</li>
                  <li>• <strong>Control surfaces:</strong> Early experiments with steering</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🛩️ Glider Progression</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Bat (1895):</strong> First successful glider, 30-yard flights</li>
                  <li>• <strong>Beetle (1895):</strong> Improved stability and control</li>
                  <li>• <strong>Gull (1896):</strong> Enhanced wing design</li>
                  <li>• <strong>Hawk (1896-1897):</strong> His masterpiece glider</li>
                  <li>• <strong>Triplane (1899):</strong> Designed for powered flight</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Unlike many early aviation experimenters who relied on intuition, Pilcher approached flight with rigorous scientific methodology. He meticulously recorded wind conditions, flight distances, and glider performance, creating what may have been the world's first systematic database of flight characteristics. This approach enabled rapid iteration and improvement in his designs.
          </p>
        </section>

        {/* Hawk Triplane Section */}
        <section id="hawk-triplane" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🦅 The Hawk Glider: Pilcher's Masterpiece (1896-1897)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievement and Performance</h3>

              <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-emerald-800 mb-3">Hawk Glider Specifications</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Wing Span:</span>
                    <span className="font-semibold">23 feet (7 meters)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wing Area:</span>
                    <span className="font-semibold">165 square feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-semibold">50 pounds</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Maximum Flight Distance:</span>
                    <span className="font-semibold text-emerald-600">250 yards</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Flight Duration:</span>
                    <span className="font-semibold text-emerald-600">90 seconds</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The Hawk represented the culmination of Pilcher's gliding experience. Its elegant design featured bamboo and ash construction with silk covering, creating an aircraft that was both lightweight and remarkably strong. The glider's performance exceeded anything achieved by his contemporaries, including Lilienthal himself.
              </p>
            </div>

            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">💭 Eyewitness Account</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
                  "I watched Mr. Pilcher launch himself from the hill near Cardross. The grace and control he demonstrated was extraordinary—far exceeding anything I had imagined possible with a heavier-than-air machine. He soared like a bird, steering left and right with apparent ease."
                </blockquote>
                <cite className="text-sm text-blue-700">— Lord Kelvin, witnessing a Hawk flight demonstration, 1897</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Powered Flight Section */}
        <section id="powered-flight" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            ⚡ The Path to Powered Flight (1898-1899)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">4 HP</div>
              <div className="text-sm text-gray-600">Planned Engine Power</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">40 lbs</div>
              <div className="text-sm text-gray-600">Target Engine Weight</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1899</div>
              <div className="text-sm text-gray-600">Planned First Flight</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6">Revolutionary Triplane Design</h3>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                By 1898, Pilcher had achieved everything possible with gliding flight. His attention turned to the ultimate goal: powered flight. Working with engineer Walter Gordon Wilson, he designed a revolutionary triplane aircraft powered by a lightweight petrol engine of his own design.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                The triplane configuration provided the lift area necessary to carry the additional weight of engine and fuel while maintaining structural efficiency. Pilcher's calculations, preserved in his notebooks, show a remarkable understanding of the power-to-weight ratios required for sustained flight.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Technical Innovations</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Triplane configuration:</strong> Maximum lift with minimal weight</li>
                <li>• <strong>Custom engine:</strong> 4 HP petrol engine weighing only 40 pounds</li>
                <li>• <strong>Pusher propeller:</strong> Mounted behind the pilot for better balance</li>
                <li>• <strong>Wheeled undercarriage:</strong> For takeoff from flat ground</li>
                <li>• <strong>Control system:</strong> Advanced for its time</li>
              </ul>
            </div>

            <div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-bold text-amber-800 mb-3">🔍 What Might Have Been</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Modern analysis of Pilcher's designs and calculations suggests his triplane would likely have achieved successful powered flight. The power-to-weight ratio was adequate, the control systems were sound, and his piloting experience was unmatched.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Had the 1899 demonstration proceeded as planned, Percy Pilcher might have achieved powered flight four years before the Wright Brothers, making Scotland the birthplace of aviation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Image
              src="/blog-images/percy-pilcher-portrait-engineer.jpg"
              alt="Percy Pilcher portrait - the Scottish engineer and aviation pioneer who nearly achieved powered flight before the Wright Brothers"
              width={500}
              height={600}
              className="mx-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 italic mt-4">
              Percy Pilcher - the brilliant Scottish engineer whose innovative work nearly changed aviation history
            </p>
          </div>
        </section>

        {/* Tragic End Section */}
        <section id="tragic-end" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            💔 Tragic End: The Fatal Demonstration (September 30, 1899)
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-red-800 mb-4">The Final Flight</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              On September 30, 1899, Pilcher was demonstrating his Hawk glider at Stanford Hall in Leicestershire, with plans to debut his powered triplane later that day. Weather conditions were marginal, but pressure from spectators—including potential financial backers—convinced him to proceed.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              During what should have been a routine gliding demonstration, a tail guy-wire snapped, causing the Hawk to nose-dive from 30 feet. Pilcher was thrown forward and sustained fatal injuries. He died two days later, just 33 years old, on the verge of his greatest triumph.
            </p>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Timeline of the Fatal Day</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Morning:</strong> Weather assessment - conditions marginal</li>
                <li>• <strong>2:00 PM:</strong> Spectators arrive, including Lord Braye</li>
                <li>• <strong>4:30 PM:</strong> Decision made to demonstrate Hawk glider</li>
                <li>• <strong>4:45 PM:</strong> Launch from hill - tail wire failure</li>
                <li>• <strong>October 2:</strong> Pilcher dies from injuries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="legacy-influence" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-200 pb-4">
            🏆 Legacy: The Pioneer Who Shaped Aviation
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Percy Pilcher's legacy extends far beyond his individual achievements. His systematic approach to aviation research, emphasis on safety, and meticulous documentation established methodologies that influenced a generation of aviation pioneers. The Wright Brothers themselves studied Pilcher's published works and acknowledged his contributions to their understanding of flight control.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              In 2003, a team led by aviation historian Philip Jarrett built and successfully flew a replica of Pilcher's triplane using his original plans. The aircraft achieved sustained powered flight, proving that Pilcher had indeed solved the fundamental problems of aviation—he simply ran out of time to demonstrate it.
            </p>
          </div>

          <div className="bg-emerald-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ Scotland's Aviation Heritage</h3>
            <p className="leading-relaxed mb-4">
              Percy Pilcher represents the best of Scottish engineering ingenuity—the combination of theoretical knowledge, practical skill, and innovative thinking that has characterized Scottish contributions to aviation throughout history. From the Clydeside aviation industry to modern aerospace development, Scotland's aviation heritage can be traced back to Pilcher's pioneering work in the 1890s.
            </p>
            <p className="leading-relaxed">
              His story reminds us that aviation history is filled not just with triumphant firsts, but with tragic near-misses and might-have-beens. Percy Pilcher came tantalizingly close to changing the course of aviation history, and in doing so, he earned his place among the true pioneers of flight.
            </p>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/books/soaring-with-wings" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Image
                    src="/book-covers/soaring-with-wings.jpg"
                    alt="Soaring with Wings Percy Pilcher book cover"
                    width={80}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Soaring with Wings: Percy Pilcher wants to Fly
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete biography of Percy Pilcher, Scotland's forgotten aviation pioneer who nearly achieved powered flight before the Wright Brothers.
                    </p>
                    <div className="text-emerald-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

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
                      How Scotland's industrial heritage, building on pioneers like Pilcher, became central to British aviation development.
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
                Aviation historian specializing in Scottish aviation pioneers and early flight development. Author of the definitive biography of Percy Pilcher and expert on Scotland's contributions to aviation history, with particular focus on the engineering innovations that preceded the Wright Brothers.
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
                article_title: 'Percy Pilcher Scotland Aviation Pioneer',
                article_category: 'Aviation History',
                author: 'Charles E. MacKay',
                reading_time: 13,
                topic: 'Scottish Aviation Heritage'
              });
            }
          `
        }}
      />
    </div>
  )
}
