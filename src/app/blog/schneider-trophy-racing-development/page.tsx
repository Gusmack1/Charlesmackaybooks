import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation | Charles E. MacKay',
  description: 'The complete story of Schneider Trophy racing 1913-1931 - how high-speed seaplane competition drove aviation innovation. Discover how Supermarine, Macchi, and Curtiss racing seaplanes led directly to Spitfire and modern fighter development.',
  keywords: [
    'Schneider Trophy racing',
    'Schneider Cup competition',
    'seaplane racing history',
    'Supermarine S6B',
    'high-speed seaplanes',
    'aviation racing history',
    'Schneider Trophy winners',
    'racing seaplane development',
    'Supermarine racing',
    'Macchi seaplanes',
    'Curtiss racing aircraft',
    'Lucy Lady Houston',
    'R.J. Mitchell designer',
    'aviation speed records',
    'seaplane innovation',
    'Spitfire development',
    'racing to fighters',
    'Charles MacKay aviation books',
    'aviation competition history',
    'high-speed aviation'
  ],
  openGraph: {
    title: 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation',
    description: 'The complete story of Schneider Trophy racing - how high-speed seaplane competition drove aviation innovation and led to modern fighters.',
    url: 'https://charlesmackaybooks.com/blog/schneider-trophy-racing-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/supermarine-s6b-schneider-trophy.jpg',
        width: 1200,
        height: 630,
        alt: 'Supermarine S6B Schneider Trophy winner that influenced Spitfire development'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation',
    description: 'The complete story of Schneider Trophy racing - how high-speed seaplane competition drove aviation innovation and led to modern fighters.',
    images: ['/blog-images/supermarine-s6b-schneider-trophy.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation',
  description: 'The complete story of Schneider Trophy racing 1913-1931 - how high-speed seaplane competition drove aviation innovation. Discover how Supermarine, Macchi, and Curtiss racing seaplanes led directly to Spitfire and modern fighter development.',
  image: '/blog-images/supermarine-s6b-schneider-trophy.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in racing aircraft development and high-speed aviation innovation',
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
  datePublished: '2025-01-29T12:00:00.000Z',
  dateModified: '2025-01-29T12:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/schneider-trophy-racing-development'
  },
  articleSection: 'Aviation Racing',
  keywords: 'Schneider Trophy, seaplane racing, Supermarine S6B, aviation competition, high-speed development',
  wordCount: 3100,
  readingTime: 'PT14M'
}

export default function SchneiderTrophyPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/schneider-trophy-racing-development'
  const pageTitle = 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <UnifiedSchema
        pageType="blog-post"
        pageTitle={pageTitle}
        pageDescription="The complete story of Schneider Trophy racing - how high-speed seaplane competition drove aviation innovation and led to modern fighters."
        pageUrl="/blog/schneider-trophy-racing-development"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Schneider Trophy
                <span className="block text-cyan-300">Racing Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The world's most prestigious seaplane racing competition drove aviation innovation for nearly two decades. Discover how Schneider Trophy competition between 1913-1931 led directly to Spitfire development and modern high-speed aviation.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-cyan-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>14 minute read</span>
                <span>•</span>
                <span>Racing Innovation</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/supermarine-s6b-schneider-trophy.jpg"
                alt="Supermarine S6B Schneider Trophy winner that influenced Spitfire development"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Supermarine S6B - The Racing Champion That Led to Spitfire</p>
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
            description="Discover how Schneider Trophy seaplane racing drove aviation innovation and led to modern fighter development"
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Introduction */}
        <div className="prose prose-lg prose-slate max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Few sporting competitions have had such profound influence on technological development as the Schneider Trophy for seaplanes. From its establishment in 1913 until Britain's final victory in 1931, this international racing competition drove aviation innovation at an unprecedented pace, ultimately leading to the development of the legendary Supermarine Spitfire.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The trophy, officially known as the Coupe d'Aviation Maritime Jacques Schneider, was created by French industrialist Jacques Schneider to encourage the development of seaplanes for both commercial and military purposes. What began as a gentleman's competition evolved into an intense technological battle between nations, with each racing season pushing the boundaries of speed, power, and aerodynamic design. Charles E. MacKay's research reveals how this competition became the crucible for aviation innovation between the wars.
          </p>
        </div>

        {/* Book Promotion */}
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyan-900 mb-2">Featured in "Mother of the Few - Lucy Lady Houston"</h3>
              <p className="text-cyan-800 mb-4">
                The complete Schneider Trophy story, including Lady Houston's crucial £100,000 donation that saved the 1931 competition, is extensively covered in Charles MacKay's biography of this remarkable aviation patron.
              </p>
              <Link
                href="/books/mother-of-the-few"
                className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                View Book Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Origins Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Origins: Jacques Schneider's Vision</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Schneider Trophy was born from Jacques Schneider's conviction that seaplanes represented the future of aviation. As a French industrialist and aviation enthusiast, Schneider believed that the ability to take off and land on water would prove crucial for both commercial aviation and military reconnaissance.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The competition rules were elegantly simple: an annual race for seaplanes, with the trophy remaining in the possession of the winning nation for one year. Any nation winning three times in five years would gain permanent possession of the trophy. This structure ensured sustained competition while providing a realistic goal for national aviation programs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The first competition, held at Monaco in 1913, featured a modest field of contestants flying relatively slow biplanes. French pilot Maurice Prévost won in a Deperdussin monoplane, averaging just 45.75 mph around the course. This humble beginning gave little indication of the technological revolution that would follow.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              World War I interrupted the competition, but when racing resumed in 1919, the technological pace had accelerated dramatically. Military aviation developments during the war had advanced engine power, structural design, and aerodynamic understanding, setting the stage for increasingly sophisticated racing aircraft.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/schneider-s6b-historical.jpg"
              alt="Schneider S6B racing seaplane showing advanced design for 1931"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Schneider S6B racing configuration - advanced streamlining and powerful engines pushed aviation boundaries
            </p>
          </div>
        </section>

        {/* Early Competition Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Early Competition: The Learning Years 1919-1925</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The post-war resumption of Schneider Trophy competition in 1919 marked the beginning of serious technological development. The Sopwith Tabloid's victory, achieving 86.78 mph, demonstrated that military aircraft technology could be successfully adapted for racing purposes.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Italian participation brought Macchi into prominence, with their flying boats representing the cutting edge of Italian aviation technology. The Macchi M.39, introduced in 1926, featured advanced aerodynamic refinement and powerful Fiat engines that established Italy as a major competitor in high-speed aviation.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              American entries, primarily from Curtiss Aeroplane Company, introduced revolutionary concepts in engine cooling and propeller design. The Curtiss R3C series featured innovative radiator systems and demonstrated that American aviation could compete with European manufacturers in advanced technology development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              By 1925, average speeds had increased to over 230 mph, representing a fivefold increase from the 1913 competition. This rapid advancement demonstrated the competition's effectiveness in driving aviation innovation, with each racing season producing significant technological breakthroughs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The technological exchange between nations was equally significant. Designers studied competitors' innovations, leading to rapid dissemination of advanced concepts across international aviation communities. This cross-pollination accelerated development beyond what any single nation could achieve independently.
            </p>
          </div>
        </section>

        {/* Supermarine Era Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Supermarine Era: R.J. Mitchell's Masterpieces</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The arrival of Reginald Joseph Mitchell's designs for Supermarine Aviation Works marked a new era in Schneider Trophy competition. Mitchell's S4, S5, S6, and S6B represented the pinnacle of racing seaplane development, each aircraft incorporating revolutionary advances in aerodynamics and structural design.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Supermarine S4, introduced in 1925, featured an unprecedented monoplane configuration with knife-edge fuselage cross-sections and minimal frontal area. Although the S4 crashed during practice, its advanced design concepts established the template for future high-speed aircraft development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Mitchell's S5 and S6 designs incorporated lessons learned from the S4's development, featuring improved structural integrity while maintaining the advanced aerodynamic concepts. The S6's victory in 1929, achieving 328.63 mph, demonstrated that British aviation had achieved technological leadership in high-speed flight.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The ultimate Schneider racer, the S6B, represented the absolute peak of 1930s aviation technology. Powered by the specially developed Rolls-Royce R engine producing over 2,300 horsepower, the S6B achieved speeds exceeding 400 mph - performance levels that wouldn't be matched by production aircraft for another decade.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Mitchell's racing aircraft designs incorporated advanced metallurgy, precision manufacturing techniques, and aerodynamic refinement that directly influenced his subsequent work on the Spitfire. The technological lineage from S6B to Spitfire represents one of the most direct connections between racing and military aircraft development in aviation history.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/supermarine-s6a-museum.jpg"
              alt="Supermarine S6A showing the design evolution toward high-speed performance"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Supermarine S6A design showing Mitchell's evolution toward the ultimate high-speed configuration
            </p>
          </div>
        </section>

        {/* Lady Houston's Intervention Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lady Houston's Crucial Intervention: Saving the 1931 Competition</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The 1931 Schneider Trophy competition nearly failed to occur due to the global economic depression's impact on government aviation funding. The British government, facing severe financial constraints, announced its withdrawal from the competition, effectively ending Britain's chance for permanent trophy possession.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Lucy Lady Houston's dramatic intervention changed aviation history. Her personal donation of £100,000 - equivalent to millions in today's currency - enabled the Royal Aero Club to fund Britain's participation in the 1931 competition. This generous act was motivated by both patriotism and her conviction that aviation advancement served national interests.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Lady Houston's funding allowed Supermarine to continue S6B development while providing operational support for the High Speed Flight team. Without her intervention, Britain would have forfeited its chance to win permanent possession of the trophy, and the technological developments leading to the Spitfire might have been delayed or abandoned.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The 1931 competition became a British walkover when international competitors withdrew, but the technological achievement was undeniable. Flight Lieutenant John Boothman's victory flight in S6B S1595, followed by Flight Lieutenant George Stainforth's world absolute speed record of 407.5 mph, demonstrated British aviation supremacy conclusively.
            </p>
          </div>
        </section>

        {/* Technical Innovation Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Technologies: Racing Drives Innovation</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Schneider Trophy competition drove technological innovation across every aspect of aircraft design. Engine development, aerodynamics, materials science, and manufacturing techniques all advanced rapidly under the pressure of international competition and the pursuit of ever-higher speeds.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Engine technology benefited enormously from racing requirements. The progression from 450-horsepower engines in early competitions to the 2,300-horsepower Rolls-Royce R engine represented revolutionary advances in metallurgy, supercharging, and fuel systems. These developments directly influenced military aircraft engines throughout the 1930s.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Aerodynamic refinement reached unprecedented levels in Schneider racers. Mitchell's designs featured mathematical precision in fuselage shaping, advanced wing profiles, and integration of cooling systems that minimized drag. These concepts became standard features in high-performance military aircraft of the 1930s and 1940s.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Manufacturing techniques developed for racing aircraft emphasized precision, weight reduction, and structural efficiency. The specialized construction methods pioneered for Schneider racers established new standards for aircraft production that influenced manufacturing processes for decades.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cooling system innovation was particularly significant, as racing engines operated at power levels far exceeding normal aircraft requirements. Advanced radiator designs, cooling surface integration, and thermal management concepts developed for racing directly influenced fighter aircraft design throughout WWII.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/schneider-trophy-1931.jpg"
              alt="1931 Schneider Trophy ceremony showing the culmination of racing development"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              1931 Schneider Trophy ceremony - Britain's final victory secured permanent possession and completed the racing era
            </p>
          </div>
        </section>

        {/* Legacy to Military Aviation Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">From Racing to War: The Spitfire Connection</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The technological lineage from Schneider Trophy racers to military fighters is most clearly demonstrated by the Supermarine Spitfire's development. R.J. Mitchell's experience with high-speed racing aircraft directly influenced every aspect of Spitfire design, from aerodynamic concepts to structural techniques.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Spitfire's elliptical wing planform, while not directly copied from racing aircraft, incorporated aerodynamic principles developed during Schneider competition. Mitchell's understanding of high-speed flight characteristics, gained through racing experience, proved crucial in creating an effective fighter aircraft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Engine cooling integration, a critical challenge in racing aircraft, was masterfully solved in the Spitfire design. The advanced radiator systems and cooling surface integration demonstrated in Schneider racers directly influenced the Spitfire's thermal management systems.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The precision manufacturing techniques developed for racing aircraft established production standards that enabled efficient Spitfire manufacturing. The emphasis on structural efficiency and weight control, essential in racing aircraft, proved equally valuable in fighter aircraft development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Beyond technical considerations, the competitive spirit and pursuit of excellence that characterized Schneider Trophy competition established cultural attitudes within British aviation that contributed to Spitfire's success. The same dedication to performance and innovation that won racing trophies proved essential in developing war-winning fighters.
            </p>
          </div>
        </section>

        {/* International Impact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Influence: Racing Transforms World Aviation</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Schneider Trophy's influence extended far beyond the participating nations. Racing technologies developed for the competition influenced aviation development worldwide, establishing new standards for aircraft performance and design sophistication.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Italian aviation, through Macchi's participation, developed advanced flying boat technologies that influenced both military and civilian aircraft. The aerodynamic refinement and structural techniques pioneered in Macchi racers contributed to Italian aviation's reputation for sophisticated design.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              American racing participation established technological foundations that influenced subsequent military aircraft development. Curtiss innovations in engine cooling, propeller design, and structural efficiency were incorporated into American fighter aircraft throughout the 1930s.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The competition's emphasis on international technological exchange accelerated aviation development globally. Technical publications, pilot exchanges, and industrial cooperation fostered by racing competition created networks that facilitated rapid dissemination of aviation innovations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Racing aircraft performance demonstrations had profound psychological impact on aviation communities worldwide. The dramatic speed increases achieved in successive competitions convinced designers and governments that revolutionary advances in aircraft capability remained possible through focused development efforts.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Racing's Enduring Legacy</h2>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Schneider Trophy competition stands as one of the most successful technology development programs in aviation history. In just eighteen years, from 1913 to 1931, racing competition drove aircraft speeds from 45 mph to over 400 mph while advancing every aspect of aviation technology.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              More than a sporting competition, the Schneider Trophy became a catalyst for innovation that influenced military aviation throughout WWII and beyond. The direct technological lineage from racing aircraft to combat fighters demonstrates the profound impact of focused competition on technological development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today, as aviation faces new challenges in efficiency and environmental impact, the Schneider Trophy's legacy of innovation through competition remains relevant. The principle that intensive competition drives rapid technological advancement continues to influence aviation development philosophy worldwide.
            </p>
          </div>
        </section>

        {/* Book Promotion Bottom */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-800 text-white p-8 rounded-xl mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Aviation Racing History</h3>
            <p className="text-lg mb-6">
              Discover the complete story of Lady Houston's crucial role in saving the 1931 Schneider Trophy competition and her impact on British aviation development in Charles MacKay's comprehensive biography.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books/mother-of-the-few"
                className="bg-white text-cyan-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 View "Mother of the Few" Book
              </Link>
              <Link
                href="/books"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-800 transition-colors"
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
            <p className="text-gray-600">Help others discover how racing seaplanes shaped modern aviation</p>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how Schneider Trophy seaplane racing drove aviation innovation and led to modern fighter development"
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/supermarine-spitfire-development-history" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-600 mb-2">Spitfire Development History</h4>
              <p className="text-gray-600 text-sm">How Schneider Trophy racing led directly to Britain's legendary fighter</p>
            </Link>
            <Link href="/blog/lucy-lady-houston-schneider-trophy" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-600 mb-2">Lady Houston: Schneider Trophy Savior</h4>
              <p className="text-gray-600 text-sm">The remarkable woman who saved Britain's 1931 racing campaign</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
