import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction That Changed Aviation Forever | Charles E. MacKay',
  description: 'The complete story of Adolf Rohrbach\'s revolutionary metal aircraft construction techniques that transformed aviation design. Discover how this German engineer\'s innovations established modern aircraft manufacturing principles.',
  keywords: [
    'Adolf Rohrbach',
    'metal aircraft construction',
    'Rohrbach aircraft design',
    'metal aircraft manufacturing',
    'aviation construction techniques',
    'aircraft design innovation',
    'Rohrbach flying boats',
    'metal aircraft development',
    'aviation engineering',
    'aircraft manufacturing history',
    'Rohrbach Metall-Flugzeugbau',
    'metal aircraft pioneers',
    'aviation construction methods',
    'aircraft structural design',
    'Rohrbach Roland',
    'metal aircraft technology',
    'aviation manufacturing innovation',
    'aircraft construction evolution',
    'Charles MacKay aviation books',
    'German aircraft engineering'
  ],
  openGraph: {
    title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction That Changed Aviation Forever',
    description: 'The complete story of Adolf Rohrbach\'s revolutionary metal aircraft construction techniques that transformed aviation design and manufacturing.',
    url: 'https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-revolution',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/rohrbach-roland-flying-boat.jpg',
        width: 1200,
        height: 630,
        alt: 'Rohrbach Roland flying boat showing revolutionary metal aircraft construction'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction That Changed Aviation Forever',
    description: 'The complete story of Adolf Rohrbach\'s revolutionary metal aircraft construction techniques that transformed aviation design and manufacturing.',
    images: ['/blog-images/rohrbach-roland-flying-boat.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction That Changed Aviation Forever',
  description: 'The complete story of Adolf Rohrbach\'s revolutionary metal aircraft construction techniques that transformed aviation design. Discover how this German engineer\'s innovations established modern aircraft manufacturing principles.',
  image: '/blog-images/rohrbach-roland-flying-boat.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in aircraft construction techniques and German aviation engineering',
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
  datePublished: '2025-01-29T21:00:00.000Z',
  dateModified: '2025-01-29T21:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-revolution'
  },
  articleSection: 'Aviation Engineering',
  keywords: 'Adolf Rohrbach, metal aircraft construction, aviation engineering, aircraft manufacturing, German aviation',
  wordCount: 2700,
  readingTime: 'PT12M'
}

export default function AdolfRohrbachPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/adolf-rohrbach-metal-aircraft-revolution'
  const pageTitle = 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction That Changed Aviation Forever'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <UnifiedSchema
        pageType="blog-post"
        pageTitle={pageTitle}
        pageDescription="The complete story of Adolf Rohrbach's revolutionary metal aircraft construction techniques that transformed aviation design and manufacturing."
        pageUrl="/blog/adolf-rohrbach-metal-aircraft-revolution"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Rohrbach
                <span className="block text-amber-300">Metal Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                The visionary story of Adolf Rohrbach - the German engineer whose revolutionary metal aircraft construction techniques transformed aviation design and established the manufacturing principles that guide modern aircraft production.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-amber-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>12 minute read</span>
                <span>•</span>
                <span>Aviation Engineering</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/rohrbach-roland-flying-boat.jpg"
                alt="Rohrbach Roland flying boat showing revolutionary metal aircraft construction"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Rohrbach Roland - Revolutionary Metal Aircraft Construction</p>
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
            description="Discover how Adolf Rohrbach revolutionized aircraft construction with innovative metal design techniques"
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Introduction */}
        <div className="prose prose-lg prose-slate max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            In the early 1920s, when most aircraft were still constructed from wood and fabric, a German engineer named Adolf Rohrbach was quietly revolutionizing aviation with metal construction techniques that would transform the industry. His innovative approaches to aircraft design and manufacturing established principles that remain fundamental to modern aviation, yet his contributions have often been overlooked in aviation history.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Rohrbach's work extended far beyond simple material substitution - he developed entirely new approaches to aircraft design that leveraged metal's unique properties while solving fundamental problems of strength, weight, and manufacturing efficiency. Charles E. MacKay's research reveals how this pioneering engineer's innovations influenced aircraft development worldwide and established manufacturing techniques still used today.
          </p>
        </div>

        {/* Book Promotion */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 mb-2">Featured in "Adolf Rohrbach's Metal Airplanes"</h3>
              <p className="text-amber-800 mb-4">
                The complete Adolf Rohrbach story and his revolutionary metal aircraft construction techniques are extensively covered in Charles MacKay's definitive study of this pioneering aviation engineer.
              </p>
              <Link
                href="/books/adolf-rohrbach"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                View Book Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Early Career and Vision */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Engineering Vision: Rohrbach's Early Career and Innovations</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Adolf Rohrbach's path to aviation innovation began in German shipbuilding, where he gained expertise in metal construction techniques and structural engineering. This background provided crucial insights into stress analysis, material properties, and manufacturing methods that would prove invaluable when applied to aircraft design and construction.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Working at Zeppelin-Werke Staaken during World War I, Rohrbach encountered the limitations of traditional wood and fabric aircraft construction. He recognized that metal construction could provide superior strength-to-weight ratios while enabling more sophisticated aerodynamic shapes impossible with conventional materials and construction methods.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach's engineering philosophy emphasized functional design optimized for manufacturing efficiency and operational performance. Unlike many contemporaries who focused on single-aircraft prototypes, he developed construction systems that could be applied across multiple aircraft types while maintaining structural integrity and performance characteristics.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Post-war Treaty of Versailles restrictions on German aviation actually accelerated Rohrbach's innovations by forcing efficiency and innovation within constrained parameters. These limitations encouraged creative solutions that maximized performance from available materials and manufacturing capabilities while establishing new standards for aircraft construction.
            </p>
          </div>
        </section>

        {/* Metal Construction Techniques */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Construction: Metal Aircraft Manufacturing Techniques</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach's metal aircraft construction techniques represented a fundamental departure from traditional methods. His stressed-skin design approach integrated structural elements with aerodynamic surfaces, creating aircraft that were simultaneously stronger, lighter, and more aerodynamically efficient than conventional wood and fabric designs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The development of specialized joining techniques allowed Rohrbach to create seamless metal structures without the weight penalties and stress concentrations associated with bolted or welded joints. These innovations enabled smooth external surfaces while maintaining structural integrity under operational loads and environmental conditions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Manufacturing standardization became a cornerstone of Rohrbach's approach, with interchangeable components and systematic production methods that reduced costs while improving quality control. This industrial approach to aircraft construction influenced manufacturing practices throughout the aviation industry worldwide.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Quality control procedures developed by Rohrbach established standards for metal aircraft inspection and testing that ensured consistent performance and safety. These systematic approaches to manufacturing verification became industry standards that continue to influence modern aircraft production methods.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/rohrbach-construction-techniques.jpg"
              alt="Rohrbach metal aircraft construction showing innovative manufacturing techniques"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Rohrbach construction techniques - revolutionary metal aircraft manufacturing methods
            </p>
          </div>
        </section>

        {/* Flying Boat Innovations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Marine Aviation: Rohrbach Flying Boat Developments</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach's most significant achievements came in flying boat design, where metal construction techniques provided crucial advantages for marine aviation operations. The corrosion resistance and structural durability of metal construction made it ideal for aircraft operating in challenging saltwater environments.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Rohrbach Roland represented the pinnacle of 1920s flying boat design, incorporating advanced hull shapes, efficient wing structures, and innovative powerplant installations. This aircraft demonstrated how metal construction could enable larger, more capable flying boats with improved performance and operational reliability.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Hydrodynamic optimization became possible through metal construction techniques that allowed complex hull shaping impossible with traditional materials. Rohrbach's flying boats achieved superior water handling characteristics while maintaining excellent aerodynamic performance in flight operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              International recognition of Rohrbach flying boat capabilities led to export contracts and licensing agreements that spread his construction techniques worldwide. These aircraft established German aviation technology leadership while demonstrating the commercial viability of advanced metal aircraft construction.
            </p>
          </div>
        </section>

        {/* Technical Innovations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Engineering Excellence: Technical Innovations and Design Philosophy</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach's technical innovations extended beyond construction materials to encompass entire design philosophies that optimized aircraft performance through systematic engineering approaches. His work established principles of structural efficiency that influenced aircraft design for decades after his pioneering contributions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Wing design innovations included advanced spar arrangements and control surface installations that maximized structural efficiency while providing excellent flight characteristics. These developments demonstrated how metal construction could enable more sophisticated aerodynamic designs with improved performance characteristics.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Engine installation techniques developed by Rohrbach provided better cooling, reduced drag, and improved maintenance access compared to conventional approaches. These innovations influenced powerplant integration practices throughout the aviation industry while establishing new standards for aircraft-engine compatibility.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Systems integration approaches pioneered by Rohrbach enabled more sophisticated aircraft equipment installations while maintaining structural integrity and operational simplicity. These systematic approaches to aircraft systems design established practices that continue to influence modern aircraft development.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/rohrbach-technical-drawings.jpg"
              alt="Rohrbach technical drawings showing innovative aircraft design principles"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Rohrbach technical drawings - demonstrating systematic engineering approaches to aircraft design
            </p>
          </div>
        </section>

        {/* International Influence */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Impact: International Adoption of Rohrbach Techniques</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach's construction techniques spread internationally through licensing agreements, technical exchanges, and direct observation by foreign aviation engineers. His innovations influenced aircraft development in multiple countries while establishing metal construction as the standard for advanced aircraft design.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              American aviation companies studied Rohrbach techniques extensively, adapting his construction methods for domestic aircraft production. These transfers of technology accelerated American aviation development while validating the superiority of metal aircraft construction over traditional materials and methods.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              British and French aviation industries incorporated Rohrbach innovations into their own aircraft development programs, recognizing the advantages of systematic metal construction approaches. This international adoption established metal aircraft construction as the global standard for advanced aviation development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Training programs and technical publications spread Rohrbach methodologies throughout the international aviation community, ensuring that his innovations influenced aircraft development far beyond his direct involvement in specific projects. This knowledge transfer established lasting legacies in aviation engineering education.
            </p>
          </div>
        </section>

        {/* Commercial Applications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Commercial Success: Rohrbach Aircraft in Service</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rohrbach aircraft achieved significant commercial success through their operational reliability, performance characteristics, and economic efficiency. Airlines and operators worldwide recognized the advantages of metal construction for commercial aviation operations, establishing market demand for advanced aircraft designs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Maintenance advantages of metal aircraft construction included improved durability, reduced inspection requirements, and simplified repair procedures compared to wood and fabric aircraft. These operational benefits provided significant economic advantages that justified the higher initial costs of metal aircraft construction.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Performance improvements achieved through Rohrbach construction techniques enabled new aviation services and route structures previously impossible with conventional aircraft. These operational capabilities demonstrated the commercial value of advanced aircraft design and construction methods.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Safety improvements inherent in metal aircraft construction provided crucial advantages for commercial aviation operations. The structural reliability and damage tolerance of metal aircraft enhanced operational safety while building public confidence in commercial aviation services.
            </p>
          </div>
        </section>

        {/* Legacy and Modern Relevance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Enduring Legacy: Rohrbach's Influence on Modern Aviation</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Modern aircraft construction continues to rely on principles established by Adolf Rohrbach nearly a century ago. Contemporary manufacturing techniques, structural design approaches, and quality control procedures all trace their origins to innovations pioneered by this German engineering visionary.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Advanced materials and manufacturing technologies have evolved from Rohrbach's fundamental insights about systematic aircraft construction. Carbon fiber composites, computer-aided manufacturing, and automated production systems represent technological evolution of concepts he established in the 1920s.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Engineering education continues to benefit from Rohrbach's systematic approaches to aircraft design and construction. His methodologies for structural analysis, manufacturing optimization, and quality control remain relevant for contemporary aerospace engineering education and practice.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The aviation industry's commitment to continuous improvement and systematic innovation reflects principles established by Rohrbach's pioneering work. His emphasis on functional design, manufacturing efficiency, and operational excellence continues to guide modern aircraft development programs worldwide.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/modern-aircraft-construction.jpg"
              alt="Modern aircraft construction showing evolution of Rohrbach principles"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Modern aircraft construction - evolution of principles established by Adolf Rohrbach
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: The Engineering Visionary Who Transformed Aviation</h2>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Adolf Rohrbach stands as one of aviation's most influential yet underappreciated pioneers, whose revolutionary metal aircraft construction techniques fundamentally transformed the industry. His systematic approach to engineering problems and innovative manufacturing solutions established principles that remain central to modern aircraft development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              From his early work at Zeppelin-Werke to his groundbreaking flying boat designs, Rohrbach consistently demonstrated how engineering excellence could overcome traditional limitations while establishing new standards for aircraft performance and reliability. His contributions extend far beyond individual aircraft to encompass entire design philosophies.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today, as the aviation industry continues to evolve with new materials and manufacturing technologies, Adolf Rohrbach's legacy endures through the systematic approaches he established for aircraft design and construction. His vision of functional, efficient aircraft design continues to inspire engineers working to advance aviation technology for future generations.
            </p>
          </div>
        </section>

        {/* Book Promotion Bottom */}
        <div className="bg-gradient-to-r from-amber-600 to-gray-800 text-white p-8 rounded-xl mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Aviation Engineering History</h3>
            <p className="text-lg mb-6">
              Discover the complete story of Adolf Rohrbach's revolutionary metal aircraft construction techniques in Charles MacKay's definitive study of this pioneering aviation engineer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books/adolf-rohrbach"
                className="bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 View "Adolf Rohrbach's Metal Airplanes" Book
              </Link>
              <Link
                href="/books"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors"
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
            <p className="text-gray-600">Help others discover Adolf Rohrbach's revolutionary contributions to aviation engineering</p>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how Adolf Rohrbach revolutionized aircraft construction with innovative metal design techniques"
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/aviation-manufacturing-wartime-production" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 mb-2">Aviation Manufacturing: Wartime Production Revolution</h4>
              <p className="text-gray-600 text-sm">How wartime demands transformed aircraft manufacturing</p>
            </Link>
            <Link href="/blog/german-aircraft-great-war-development" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 mb-2">German Aircraft Development in the Great War</h4>
              <p className="text-gray-600 text-sm">The foundations of German aviation engineering excellence</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
