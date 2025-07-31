import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export const metadata: Metadata = {
  title: 'Lucy Lady Houston: Schneider Trophy Champion & Aviation Patron | Charles E. MacKay',
  description: 'Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development. The extraordinary story of aviation\'s most influential patron.',
  keywords: [
    'Lucy Lady Houston',
    'Schneider Trophy',
    'Supermarine S6B',
    'aviation history',
    'aviation patron',
    'Spitfire development',
    'seaplane racing',
    'aviation pioneers',
    'British aviation',
    'Charles MacKay',
    'Mother of the Few',
    'aviation funding',
    'Schneider Trophy 1931',
    'aviation philanthropy',
    'British air racing',
    'Supermarine racing',
    'aviation benefactor',
    'Flight Lieutenant Boothman',
    'R engine development',
    'aviation history books'
  ],
  openGraph: {
    title: 'Lucy Lady Houston: Schneider Trophy Champion & Aviation Patron',
    description: 'Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development.',
    url: 'https://charlesmackaybooks.com/blog/lucy-lady-houston-schneider-trophy',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/lucy-lady-houston-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Lucy Lady Houston portrait - the aviation patron who saved the Schneider Trophy for Britain'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucy Lady Houston: Schneider Trophy Champion & Aviation Patron',
    description: 'Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development.',
    images: ['/blog-images/lucy-lady-houston-portrait.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Lucy Lady Houston: Schneider Trophy Champion & Aviation Patron',
  description: 'Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development. The extraordinary story of aviation\'s most influential patron.',
  image: '/blog-images/lucy-lady-houston-portrait.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in aviation patronage and British aviation development',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/book-covers/mother-of-the-few.jpg'
    }
  },
  datePublished: '2025-01-29T10:00:00.000Z',
  dateModified: '2025-01-29T10:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/lucy-lady-houston-schneider-trophy'
  },
  articleSection: 'Aviation Biography',
  keywords: 'Lucy Lady Houston, Schneider Trophy, Supermarine S6B, aviation patron, Spitfire development',
  wordCount: 3200,
  readingTime: 'PT13M'
}

export default function LucyLadyHoustonPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/lucy-lady-houston-schneider-trophy'
  const pageTitle = 'Lucy Lady Houston: Schneider Trophy Champion & Aviation Patron'

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
                Lucy Lady Houston
                <span className="block text-purple-300">Aviation's Guardian Angel</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The remarkable aviation patron who saved Britain's Schneider Trophy hopes in 1931 with a £100,000 donation, enabling the Supermarine S6B victories that led directly to Spitfire development and British air supremacy.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>13 minute read</span>
                <span>•</span>
                <span>January 29, 2025</span>
              </div>
            </div>
            <div>
              <Image
                src="/blog-images/lucy-lady-houston.jpg"
                alt="Lucy Lady Houston portrait - the aviation patron who saved the Schneider Trophy for Britain in 1931 with her £100,000 donation"
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
            description="Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development. The extraordinary story of aviation's most influential patron."
            hashtags={['LucyLadyHouston', 'SchneiderTrophy', 'SupermarineS6B', 'AviationPatron', 'SpitfireDevelopment', 'BritishAviation', 'AviationHistory', 'CharlesMacKay']}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 pb-16">

        {/* Related Books at Top */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Featured Charles MacKay Books</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Mother of the Few: Lucy Lady Houston Biography
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The definitive biography of Lucy Lady Houston, covering her remarkable life, aviation patronage, and the Schneider Trophy intervention that changed history.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

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
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      British Aircraft of the Great War
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The foundation of British aviation development that led to the Schneider Trophy successes and Spitfire achievement.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Table of Contents */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-purple-900 mb-4">📖 Article Contents</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#early-life" className="text-purple-700 hover:text-purple-900 py-1">→ Early Life & Wealth</a>
            <a href="#aviation-interest" className="text-purple-700 hover:text-purple-900 py-1">→ Aviation Interest</a>
            <a href="#schneider-crisis" className="text-purple-700 hover:text-purple-900 py-1">→ 1931 Trophy Crisis</a>
            <a href="#generous-intervention" className="text-purple-700 hover:text-purple-900 py-1">→ Houston's Intervention</a>
            <a href="#s6b-triumph" className="text-purple-700 hover:text-purple-900 py-1">→ S6B Victory</a>
            <a href="#spitfire-legacy" className="text-purple-700 hover:text-purple-900 py-1">→ Spitfire Legacy</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
            <p className="text-xl leading-relaxed text-gray-800 m-0">
              <strong>Key Fact:</strong> Lucy Lady Houston's £100,000 donation in 1931 (equivalent to £6+ million today) saved Britain's Schneider Trophy participation, directly enabling the technological development that led to the Supermarine Spitfire and British air superiority in WWII.
            </p>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            In the pantheon of aviation heroes, Lucy Lady Houston occupies a unique position as the patron whose single act of generosity changed the course of aviation history. When the British government withdrew funding for the 1931 Schneider Trophy competition, it was Lady Houston's £100,000 intervention that saved Britain's participation, enabling the victories that would lead directly to Spitfire development and ultimately to British air supremacy in World War II.
          </p>
        </div>

        {/* Early Life Section */}
        <section id="early-life" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            👑 Early Life & Extraordinary Wealth (1857-1920)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">From Humble Origins to Immense Fortune</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Born Fanny Lucy Radmall in 1857, the woman who would become Lucy Lady Houston began life in modest circumstances that few could have predicted would lead to her becoming one of Britain's most influential aviation patrons. Through a series of advantageous marriages, particularly to shipping magnate Sir Robert Houston, she accumulated extraordinary wealth that she would later use to change the course of British aviation history.
              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Lady Houston's transformation from middle-class origins to immense wealth was matched by her development of strong patriotic convictions and a belief that Britain should lead the world in technological advancement. Her fortune, estimated at over £5 million in the 1930s (equivalent to hundreds of millions today), provided her with the means to intervene decisively when British aviation faced its greatest challenges.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Houston's Wealth & Character (1920s-1930s)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Estate value:</strong> Over £5 million (hundreds of millions today)</li>
                  <li>• <strong>Source:</strong> Inheritance from shipping magnate Sir Robert Houston</li>
                  <li>• <strong>Philanthropy:</strong> Generous supporter of British causes</li>
                  <li>• <strong>Politics:</strong> Strong Conservative and patriot</li>
                  <li>• <strong>Character:</strong> Independent, determined, and decisive</li>
                </ul>
              </div>
            </div>

            <div>
              <Image
                src="/blog-images/lucy-lady-houston.jpg"
                alt="Lady Houston's portrait showing the aviation patron who funded the Schneider Trophy"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Lady Houston - the remarkable patron whose generosity saved British aviation supremacy
              </p>
            </div>
          </div>
        </section>

        {/* Aviation Interest Section */}
        <section id="aviation-interest" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            ✈️ Growing Aviation Interest & National Pride (1920-1930)
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Aviation as National Prestige</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Houston's Aviation Awareness</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Schneider Trophy interest:</strong> Followed British victories closely</li>
                  <li>• <strong>Technology understanding:</strong> Grasped aviation's military potential</li>
                  <li>• <strong>National pride:</strong> Believed Britain should lead aviation</li>
                  <li>• <strong>Industry contacts:</strong> Connected with aviation manufacturers</li>
                  <li>• <strong>Strategic vision:</strong> Saw racing's military applications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🎯 Schneider Trophy Significance</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>International prestige:</strong> Symbol of aviation leadership</li>
                  <li>• <strong>Technology development:</strong> Crucible for innovation</li>
                  <li>• <strong>Engine advancement:</strong> High-performance power plants</li>
                  <li>• <strong>Aerodynamic progress:</strong> Speed and efficiency gains</li>
                  <li>• <strong>Military applications:</strong> Direct transfer to fighters</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Lady Houston's interest in aviation developed alongside Britain's growing prominence in international air racing during the 1920s. She witnessed the country's success in the Schneider Trophy competition, where British seaplanes dominated the prestigious international contest that had become a proving ground for advanced aeronautical technology. The Schneider Trophy represented more than mere sporting competition—it was a crucible for developing the high-performance engines and aerodynamic innovations that would prove essential for military aircraft.
          </p>
        </section>

        {/* Schneider Crisis Section */}
        <section id="schneider-crisis" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            ⚠️ The 1931 Schneider Trophy Crisis
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Government Withdrawal</h3>

              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-red-800 mb-3">Crisis Statistics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Previous British Victories:</span>
                    <span className="font-semibold">1927, 1929</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wins Needed for Permanent Trophy:</span>
                    <span className="font-semibold">3 in 5 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Funding 1931:</span>
                    <span className="font-semibold text-red-600">£0 - Withdrawn</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Funding Required:</span>
                    <span className="font-semibold text-red-600">£100,000</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                In 1931, Britain faced a crisis that threatened to end its participation in the Schneider Trophy competition. The economic pressures of the Great Depression had forced the government to withdraw funding for the contest, despite Britain's strong position after victories in 1927 and 1929. Without government support, the RAF and Supermarine could not afford to develop and race the advanced S6B seaplane.
              </p>
            </div>

            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">🏆 What Was at Stake</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The stakes were enormous. If Britain could win the 1931 contest, it would claim the Schneider Trophy permanently, having achieved three victories in five contests. More importantly, the technological advances developed for the competition—particularly Rolls-Royce's R engine and Supermarine's aerodynamic innovations—were directly applicable to military aircraft development.
                </p>

                <h5 className="font-semibold text-blue-700 mb-2">Critical Technologies at Risk:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Rolls-Royce R engine development</li>
                  <li>• Advanced aerodynamic research</li>
                  <li>• High-speed flight techniques</li>
                  <li>• Cooling system innovations</li>
                  <li>• Structural design advances</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/blog-images/supermarine-s6-schneider-race.jpg"
              alt="Supermarine S6 racing seaplane showing the aircraft technology threatened by funding cuts in 1931"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 italic text-center">
              The Supermarine S6 - predecessor to the S6B that Lady Houston's funding would enable to triumph
            </p>
          </div>
        </section>

        {/* Generous Intervention Section */}
        <section id="generous-intervention" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            💂 Lady Houston's Decisive Intervention
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">£100,000</div>
              <div className="text-sm text-gray-600">Houston's Donation</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1931</div>
              <div className="text-sm text-gray-600">Year of Crisis</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24 Hours</div>
              <div className="text-sm text-gray-600">Decision Time</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Swift and Decisive Action</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When Lady Houston learned of the government's withdrawal from the Schneider Trophy competition, she acted with characteristic decisiveness and patriotic fervor. Without hesitation, she provided £100,000 (equivalent to several million pounds today) to fund Britain's continued participation in the 1931 contest.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Her intervention was accompanied by a strongly worded public statement criticizing the government's shortsightedness and emphasizing the importance of maintaining Britain's aviation leadership. She understood that the competition represented far more than a sporting event—it was essential for advancing British aeronautical technology and maintaining national prestige.
              </p>

              <h4 className="font-semibold text-gray-800 mb-3">Houston's Public Statement</h4>
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700">
                "Every true Briton would rather sell his last shirt than admit that England could not afford to defend herself against all comers in the conquest of the air."
              </blockquote>
            </div>

            <div>
              <Image
                src="/blog-images/schneider-trophy-1931.jpg"
                alt="Schneider Trophy 1931 victory celebration showing the fruits of Lady Houston's generosity"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                The triumphant 1931 Schneider Trophy victory - made possible by Lady Houston's intervention
              </p>
            </div>
          </div>
        </section>

        {/* S6B Triumph Section */}
        <section id="s6b-triumph" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🏆 S6B Victory and World Speed Records (September 1931)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Spectacular Success</h3>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Schneider Trophy Victory</span>
                    <span className="text-2xl font-bold text-green-600">340.08 mph</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Flight Lieutenant John Boothman, September 13, 1931</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">World Speed Record</span>
                    <span className="text-2xl font-bold text-blue-600">407.5 mph</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Flight Lieutenant George Stainforth, September 29, 1931</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Trophy Status</span>
                    <span className="text-2xl font-bold text-purple-600">Permanent</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Britain achieved 3 victories in 5 attempts</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Historic Achievements</h4>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Schneider Trophy secured permanently:</strong> British aviation triumph</li>
                <li>• <strong>First 400+ mph flight:</strong> Stainforth's world record</li>
                <li>• <strong>Technology validation:</strong> R engine and S6B design proven</li>
                <li>• <strong>International prestige:</strong> Britain leads aviation development</li>
                <li>• <strong>Military applications:</strong> Direct technology transfer possible</li>
                <li>• <strong>Houston vindicated:</strong> Investment pays spectacular dividends</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2">🎯 Immediate Impact</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Lady Houston's investment paid spectacular dividends, validating her faith in British aviation technology and proving that private funding could achieve what government hesitation had nearly prevented. The victories advanced British aviation technology by several crucial years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spitfire Legacy Section */}
        <section id="spitfire-legacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-200 pb-4">
            🔥 The Spitfire Development Legacy
          </h2>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Lady Houston's most enduring legacy lies in how her Schneider Trophy funding enabled the development of the Supermarine Spitfire. The technological advances achieved with the S6B—particularly in aerodynamics, engine cooling, and high-speed flight characteristics—were directly transferred to R.J. Mitchell's fighter design that would become Britain's most famous World War II aircraft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Without Lady Houston's intervention, this technological development would have been delayed by years, potentially leaving Britain vulnerable during the crucial early years of World War II. Her £100,000 investment in 1931 arguably saved far more than money—it may have helped save Britain itself by ensuring the Spitfire was ready when the nation needed it most.
            </p>
          </div>

          <div className="bg-purple-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">✈️ The Houston Legacy</h3>
            <p className="leading-relaxed mb-4">
              From a single act of patriotic generosity to the skies over Britain in 1940, Lady Houston's influence on aviation history extends far beyond her lifetime. The Schneider Trophy victories she enabled provided the technological foundation for the Spitfire, the fighter that would help win the Battle of Britain and secure Allied victory.
            </p>
            <p className="leading-relaxed">
              Lucy Lady Houston demonstrated that individual action, when guided by vision and patriotism, can change the course of history. Her legacy lives on in every Spitfire that flew, every pilot who survived because of superior British fighters, and every person whose freedom was preserved by the aviation supremacy her generosity helped create.
            </p>
          </div>
        </section>

        {/* Social Share */}
        <div className="mb-12">
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how Lucy Lady Houston saved the Schneider Trophy for Britain in 1931, financing the Supermarine S6B that led to Spitfire development. The extraordinary story of aviation's most influential patron."
            hashtags={['LucyLadyHouston', 'SchneiderTrophy', 'SupermarineS6B', 'AviationPatron', 'SpitfireDevelopment', 'BritishAviation', 'AviationHistory', 'CharlesMacKay']}
          />
        </div>

        {/* Related Books at Bottom */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Charles MacKay Books</h2>

          <div className="grid md:grid-cols-3 gap-6">
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Mother of the Few: Lady Houston Biography
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The complete story of Lucy Lady Houston's remarkable life and her crucial role in British aviation development.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/books/supermarine-spitfire-development" className="group">
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Supermarine: From Racing to Fighter Supremacy
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      How Schneider Trophy technology funded by Lady Houston led to the legendary Spitfire fighter aircraft.
                    </p>
                    <div className="text-purple-600 text-sm mt-2">Read more →</div>
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Beardmore Aviation: Scottish Industrial Giant
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The story of Scottish industrial aviation development that provided the foundation for British aviation supremacy.
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
                Aviation historian specializing in aviation patronage, British aviation development, and the untold stories of aviation's most influential figures. Author of the definitive biography "Mother of the Few" covering Lucy Lady Houston's remarkable life and aviation legacy.
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
                article_title: 'Lucy Lady Houston Schneider Trophy',
                article_category: 'Aviation Biography',
                author: 'Charles E. MacKay',
                reading_time: 13,
                topic: 'Aviation Patronage'
              });
            }
          `
        }}
      />
    </div>
  )
}
