import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation | Charles E. MacKay',
  description: 'The complete story of Korean War air combat 1950-1953 - F-86 Sabre vs MiG-15 battles over MiG Alley. Discover how the first jet-on-jet warfare revolutionized aerial combat and established Cold War aviation doctrine.',
  keywords: [
    'Korean War air combat',
    'F-86 Sabre vs MiG-15',
    'MiG Alley battles',
    'jet vs jet combat',
    'Korean War aviation',
    'first jet war',
    'Korean War fighters',
    'aerial combat Korea',
    'F-86 Sabre Korean War',
    'MiG-15 fighter',
    'Korean War pilots',
    'jet age warfare',
    'Korean conflict aviation',
    'Cold War air battles',
    'supersonic combat',
    'Korean War aces',
    'fighter pilot stories',
    'Charles MacKay aviation books',
    'Korean War air force',
    'jet fighter development'
  ],
  openGraph: {
    title: 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation',
    description: 'The complete story of Korean War air combat - F-86 Sabre vs MiG-15 battles that established modern jet warfare principles.',
    url: 'https://charlesmackaybooks.com/blog/korean-war-air-combat',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/korean-war-aviation.jpg',
        width: 1200,
        height: 630,
        alt: 'Korean War air combat - F-86 Sabre vs MiG-15 battles over MiG Alley'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation',
    description: 'The complete story of Korean War air combat - F-86 Sabre vs MiG-15 battles that established modern jet warfare principles.',
    images: ['/blog-images/korean-war-aviation.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation',
  description: 'The complete story of Korean War air combat 1950-1953 - F-86 Sabre vs MiG-15 battles over MiG Alley. Discover how the first jet-on-jet warfare revolutionized aerial combat and established Cold War aviation doctrine.',
  image: '/blog-images/korean-war-aviation.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in jet age warfare and Korean War aviation history',
    url: 'https://charlesmackaybooks.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Aviation Books',
    logo: {
      '@type': 'ImageObject',
      url: 'https://charlesmackaybooks.com/charles-mackay-logo.png'
    }
  },
  datePublished: '2025-01-29T16:00:00.000Z',
  dateModified: '2025-01-29T16:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/korean-war-air-combat'
  },
  articleSection: 'Military Aviation',
  keywords: 'Korean War, F-86 Sabre, MiG-15, jet combat, MiG Alley, aerial warfare',
  wordCount: 2600,
  readingTime: 'PT11M'
}

export default function KoreanWarAirCombatPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/korean-war-air-combat'
  const pageTitle = 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <UnifiedSchema
        pageType="blog-post"
        pageTitle={pageTitle}
        pageDescription="The complete story of Korean War air combat - F-86 Sabre vs MiG-15 battles that established modern jet warfare principles."
        pageUrl="/blog/korean-war-air-combat"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-900 via-red-800 to-yellow-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Korean War
                <span className="block text-orange-300">Jet Age Combat</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The first jet-versus-jet air war that changed aviation forever. Discover how F-86 Sabre and MiG-15 battles over MiG Alley established modern aerial combat doctrine and launched the supersonic age.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-orange-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>11 minute read</span>
                <span>•</span>
                <span>Military Aviation</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/korean-war-aviation.jpg"
                alt="Korean War air combat - F-86 Sabre vs MiG-15 battles over MiG Alley"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Korean War - The First Jet vs Jet Air Combat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Share Top */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-6">
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how Korean War jet combat between F-86 Sabre and MiG-15 shaped modern aviation"
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Introduction */}
        <div className="prose prose-lg prose-slate max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            On December 17, 1950, Lieutenant Russell Brown flying an F-86 Sabre shot down a North Korean MiG-15 over the Yalu River, marking the first victory in jet-versus-jet aerial combat. This historic encounter opened a new chapter in aviation warfare that would fundamentally change how air battles were fought and establish the principles that govern modern aerial combat.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Korean War became the proving ground for jet aircraft technology, tactics, and pilot training. Over the skies of North Korea, particularly in the region known as "MiG Alley," American F-86 Sabres clashed with Soviet-supplied MiG-15s in daily combat that pushed both aircraft and pilots to their limits. Charles E. MacKay's research reveals how this unprecedented aerial warfare shaped the future of military aviation.
          </p>
        </div>

        {/* Book Promotion */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-900 mb-2">Featured in "Sabres from the North - F-86 in European Service"</h3>
              <p className="text-orange-800 mb-4">
                The complete Korean War F-86 Sabre combat story is extensively covered in Charles MacKay's comprehensive study of F-86 operations, including detailed combat analysis and pilot accounts.
              </p>
              <Link
                href="/books/sabres-from-north"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                View Book Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Background Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Setting the Stage: Jet Aircraft Enter Combat</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              When North Korean forces crossed the 38th Parallel in June 1950, both sides initially relied on World War II-era propeller aircraft. The conflict began with F-51 Mustangs and other piston-engine fighters supporting ground operations, but this would rapidly change as the war escalated.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The introduction of Soviet-supplied MiG-15 jets in November 1950 fundamentally altered the conflict's dynamics. These advanced aircraft, flown initially by experienced Soviet pilots, immediately established air superiority over northwestern Korea and threatened UN ground operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The urgent deployment of F-86 Sabres to Korea in December 1950 represented the fastest introduction of new aircraft technology into combat operations in aviation history. These swept-wing fighters were America's most advanced aircraft, rushed into service to counter the MiG threat.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The stage was set for the world's first sustained jet-versus-jet air campaign, with implications far beyond the Korean peninsula. The lessons learned would influence fighter design, pilot training, and aerial tactics for decades to come.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/f86-sabre-korean-war-flight-line.jpg"
              alt="F-86 Sabres on Korean War flight line showing the deployment of America's most advanced fighters"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              F-86 Sabres on Korean War flight line - America's most advanced fighters deployed to counter the MiG threat
            </p>
          </div>
        </section>

        {/* Aircraft Comparison Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Adversaries in the Sky: F-86 Sabre vs MiG-15</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The F-86 Sabre and MiG-15 represented the pinnacle of early jet fighter design, each incorporating advanced technologies developed during and after World War II. Both aircraft featured swept wings, powerful jet engines, and sophisticated armament systems.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The MiG-15 possessed superior climb rate and ceiling performance, allowing it to initiate combat from advantageous positions. Its powerful 37mm and 23mm cannons could destroy enemy aircraft with short bursts, but required precise aiming to be effective.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The F-86 Sabre excelled in high-speed handling, dive performance, and pilot visibility. Its six .50-caliber machine guns provided high rates of fire and better accuracy, while the aircraft's superior control at high speeds gave experienced pilots significant advantages.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Perhaps most significantly, the F-86 featured the A-1CM gunsight with radar ranging, giving Sabre pilots unprecedented accuracy in air-to-air gunnery. This technological advantage proved crucial in the swirling dogfights over MiG Alley.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Both aircraft pushed the boundaries of pilot and aircraft performance. Operating at altitudes and speeds never before encountered in sustained combat, they revealed new challenges in high-altitude jet operations and high-G maneuvering.
            </p>
          </div>
        </section>

        {/* MiG Alley Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">MiG Alley: The World's First Jet Battlefield</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The airspace over northwestern Korea became known as "MiG Alley" - the world's first sustained jet combat zone. This area, bounded by the Yalu and Chongchon Rivers, witnessed daily battles between the world's most advanced fighters and pilots.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              MiG-15s operating from bases in Manchuria enjoyed the advantage of sanctuary, able to retreat across the Yalu River when combat turned against them. This political restriction forced F-86 pilots to fight at a disadvantage, unable to pursue damaged enemies to their bases.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Typical combat operations involved large formations of MiG-15s attempting to intercept UN bomber formations, with F-86 Sabres providing escort and engaging the interceptors. These battles often involved 50 or more aircraft in swirling combats reaching from 30,000 to 50,000 feet altitude.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The high-altitude, high-speed nature of these engagements revealed new aspects of aerial combat. Pilots had to master energy management, understanding that altitude and speed were life-or-death advantages in jet combat.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Combat duration was limited by fuel consumption, with engagements typically lasting only minutes before aircraft had to disengage. This intensity placed unprecedented demands on pilot skill and aircraft reliability.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/f86-vs-mig15-combat.jpg"
              alt="F-86 Sabre vs MiG-15 combat engagement showing jet age aerial warfare"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-small">
              F-86 vs MiG-15 engagement - the jet age brought unprecedented speed and altitude to aerial combat
            </p>
          </div>
        </section>

        {/* Tactical Evolution Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Tactics: Adapting to Jet Age Warfare</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Korean War air combat forced rapid evolution of fighter tactics as pilots adapted World War II techniques to jet aircraft capabilities. Traditional dogfighting methods proved inadequate for the high speeds and altitudes of jet combat.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Energy management became the fundamental principle of jet combat. Pilots learned that altitude and speed were more valuable than turning ability, leading to vertical maneuvering tactics that emphasized climb and dive performance over horizontal turns.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The "boom and zoom" tactic emerged as the preferred engagement method. Pilots would dive on enemy aircraft, fire a quick burst, then use their speed to climb away before the enemy could respond. This technique maximized the advantages of superior dive performance.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Formation flying evolved to accommodate jet performance characteristics. Looser formations allowed pilots to maintain visual contact at higher speeds while providing mutual support during combat maneuvering.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Communication became critical as combat ranges increased. Radio procedures developed during Korean operations established protocols for coordinating large-scale jet engagements that remain relevant today.
            </p>
          </div>
        </section>

        {/* Pilot Experience Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Aces of the Jet Age: Pilot Experiences and Challenges</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Korean War produced a new generation of fighter aces who mastered jet combat in the crucible of MiG Alley. These pilots faced unprecedented challenges adapting to high-speed, high-altitude combat while learning their aircraft's capabilities under fire.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Captain Joseph McConnell became the leading American ace with 16 victories, demonstrating the importance of experience and tactical knowledge in jet combat. His success illustrated how veteran pilots could maximize their aircraft's advantages through superior positioning and timing.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The psychological demands of jet combat differed significantly from propeller aircraft operations. Higher speeds meant less time for decision-making, while the inability to hear enemy engines required complete reliance on visual detection and radar warnings.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              G-force effects became a major factor in jet combat as pilots pushed their aircraft through high-speed maneuvers. Understanding physiological limitations and G-suit technology became essential for survival in the new combat environment.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Training programs rapidly evolved to address jet combat requirements. Gunnery training emphasized deflection shooting at high closure rates, while tactical instruction focused on energy management and vertical maneuvering techniques.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/mig15-korean-war-fighter.jpg"
              alt="MiG-15 fighter showing the Soviet aircraft that challenged Western air superiority"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              MiG-15 fighter - the formidable Soviet aircraft that brought jet technology to Communist forces
            </p>
          </div>
        </section>

        {/* Technology Impact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Technological Breakthroughs: Lessons from Combat</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Korean War combat provided invaluable data about jet aircraft performance under operational conditions. Manufacturers analyzed combat reports to improve aircraft design, engine reliability, and weapons systems for future fighters.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Engine technology advanced rapidly as operators learned about jet performance at high altitudes and in extreme conditions. Cold weather operations, high-G maneuvering, and combat damage tolerance all influenced subsequent engine development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Weapons system development accelerated as combat revealed the limitations of existing armament. The need for more effective air-to-air missiles became apparent as gun-armed fighters struggled with high-speed engagements.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Radar and fire control systems evolved to address jet combat requirements. The success of the F-86's radar gunsight demonstrated the importance of advanced targeting systems for high-speed aerial gunnery.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Maintenance procedures adapted to jet aircraft requirements under combat conditions. The complexity of jet engines and systems demanded new approaches to field maintenance and spare parts logistics.
            </p>
          </div>
        </section>

        {/* Strategic Impact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Consequences: Shaping Cold War Aviation</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Korean War air combat established patterns that would influence Cold War aviation development for decades. The demonstration of jet aircraft superiority accelerated the transition away from propeller fighters worldwide.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The F-86's success in combat made it highly sought after by NATO allies and friendly nations. The Sabre's export success established American dominance in the international fighter market throughout the 1950s.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Soviet analysis of MiG-15 performance led to rapid development of improved aircraft. The lessons learned in Korea directly influenced subsequent Soviet fighter designs and tactics throughout the Cold War.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Training doctrines developed during Korean operations became standard throughout NATO air forces. The emphasis on high-altitude, high-speed combat and vertical maneuvering influenced pilot training programs globally.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The psychological impact of jet combat extended beyond military circles. The public fascination with supersonic fighters and jet aces captured imagination and influenced popular culture throughout the 1950s.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: The Birth of Modern Air Combat</h2>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Korean War marked the definitive transition from propeller to jet-powered aerial warfare. The lessons learned over MiG Alley established fundamental principles of jet combat that remain relevant in modern air-to-air warfare.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The technological and tactical innovations developed during this conflict influenced fighter aircraft design for generations. The emphasis on speed, altitude performance, and advanced weapons systems became standard requirements for military aircraft worldwide.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today, as air forces operate fifth-generation fighters with unprecedented capabilities, the basic principles established during Korean War jet combat continue to influence aerial tactics and aircraft design. The legacy of MiG Alley lives on in every modern air-to-air engagement.
            </p>
          </div>
        </section>

        {/* Book Promotion Bottom */}
        <div className="bg-gradient-to-r from-orange-600 to-red-800 text-white p-8 rounded-xl mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Jet Age Combat</h3>
            <p className="text-lg mb-6">
              Discover the complete story of F-86 Sabre operations, including comprehensive Korean War coverage and European Cold War service, in Charles MacKay's detailed study.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books/sabres-from-north"
                className="bg-white text-orange-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 View "Sabres from the North" Book
              </Link>
              <Link
                href="/books"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-800 transition-colors"
              >
                Browse All Aviation Books
              </Link>
            </div>
          </div>
        </div>

        {/* Social Share Bottom */}
        <div className="border-t pt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share This Article</h3>
            <p className="text-gray-600">Help others discover the first jet age air war that shaped modern aviation</p>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how Korean War jet combat between F-86 Sabre and MiG-15 shaped modern aviation"
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/f86-sabre-cold-war-fighter" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2">F-86 Sabre: Cold War's Legendary Fighter</h4>
              <p className="text-gray-600 text-sm">The complete story of the swept-wing fighter that dominated MiG Alley</p>
            </Link>
            <Link href="/blog/british-nuclear-deterrent-v-force" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2">V-Force: Britain's Nuclear Deterrent</h4>
              <p className="text-gray-600 text-sm">How British nuclear bombers maintained Cold War deterrence</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
