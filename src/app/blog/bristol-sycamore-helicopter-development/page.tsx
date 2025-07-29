import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution | Charles E. MacKay',
  description: 'The complete development story of the Bristol Type 171 Sycamore - Britain\'s first production helicopter. Discover how this revolutionary rotorcraft established British helicopter manufacturing and transformed military operations.',
  keywords: [
    'Bristol Sycamore helicopter',
    'Bristol Type 171',
    'British helicopter development',
    'first British helicopter',
    'Sycamore helicopter history',
    'Bristol rotorcraft',
    'helicopter production',
    'British aviation',
    'helicopter development',
    'rotorcraft innovation',
    'military helicopter',
    'Bristol aircraft',
    'helicopter manufacturing',
    'British aerospace',
    'helicopter evolution',
    'Bristol helicopter',
    'rotorcraft history',
    'Charles MacKay aviation books',
    'helicopter technology',
    'British military aviation'
  ],
  openGraph: {
    title: 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution',
    description: 'The complete development story of the Bristol Sycamore - Britain\'s first production helicopter that revolutionized rotorcraft manufacturing.',
    url: 'https://charlesmackaybooks.com/blog/bristol-sycamore-helicopter-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/bristol-sycamore.jpg',
        width: 1200,
        height: 630,
        alt: 'Bristol Sycamore helicopter - Britain\'s first production rotorcraft'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution',
    description: 'The complete development story of the Bristol Sycamore - Britain\'s first production helicopter that revolutionized rotorcraft manufacturing.',
    images: ['/blog-images/bristol-sycamore.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution',
  description: 'The complete development story of the Bristol Type 171 Sycamore - Britain\'s first production helicopter. Discover how this revolutionary rotorcraft established British helicopter manufacturing and transformed military operations.',
  image: '/blog-images/bristol-sycamore.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in British helicopter development and rotorcraft innovation',
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
  datePublished: '2025-01-29T13:00:00.000Z',
  dateModified: '2025-01-29T13:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/bristol-sycamore-helicopter-development'
  },
  articleSection: 'Helicopter History',
  keywords: 'Bristol Sycamore, British helicopter, rotorcraft development, helicopter manufacturing',
  wordCount: 2700,
  readingTime: 'PT12M'
}

export default function BristolSycamorePage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/bristol-sycamore-helicopter-development'
  const pageTitle = 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <UnifiedSchema
        pageType="blog-post"
        pageTitle={pageTitle}
        pageDescription="The complete development story of the Bristol Sycamore - Britain's first production helicopter that revolutionized rotorcraft manufacturing."
        pageUrl="/blog/bristol-sycamore-helicopter-development"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Bristol Sycamore
                <span className="block text-emerald-300">Helicopter Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Britain's first production helicopter changed vertical flight forever. Discover how the Bristol Type 171 Sycamore established British helicopter manufacturing, pioneered rotorcraft technology, and transformed military operations worldwide.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>12 minute read</span>
                <span>•</span>
                <span>Helicopter Innovation</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/bristol-sycamore.jpg"
                alt="Bristol Sycamore helicopter - Britain's first production rotorcraft"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Bristol Sycamore - Pioneering British Helicopter Production</p>
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
            description="Discover how the Bristol Sycamore established Britain as a helicopter manufacturing pioneer"
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Introduction */}
        <div className="prose prose-lg prose-slate max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            When the Bristol Type 171 Sycamore first lifted off in 1947, it marked Britain's entry into the helicopter age and established the foundation for decades of British rotorcraft innovation. This wasn't merely another experimental aircraft - it was Britain's first successful production helicopter, a revolutionary machine that would transform military operations and establish Bristol as a pioneer in vertical flight technology.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Sycamore's development story represents a fascinating intersection of wartime innovation, peacetime adaptation, and the practical application of rotorcraft technology. Drawing from extensive autogyro experience gained during the 1930s, Bristol's engineers created a helicopter that combined reliability, versatility, and operational effectiveness in ways that would influence helicopter design for generations. Charles E. MacKay's research reveals how this remarkable aircraft emerged from the crucible of British aerospace innovation.
          </p>
        </div>

        {/* Book Promotion */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Featured in "The Sycamore Seeds - Early History of the Helicopter"</h3>
              <p className="text-emerald-800 mb-4">
                The complete Bristol Sycamore development story is extensively covered in Charles MacKay's comprehensive study of early helicopter history, including detailed technical analysis and operational records.
              </p>
              <Link
                href="/books/sycamore-seeds"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                View Book Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Origins Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Origins: From Autogyro Experience to Helicopter Innovation</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Bristol Sycamore's story begins with the Bristol Aeroplane Company's extensive experience with autogyros during the 1930s. Under license from Juan de la Cierva, Bristol had manufactured the Type 148 autogyro, gaining invaluable experience with rotorcraft technology, rotor systems, and the unique challenges of vertical flight.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              During World War II, the success of the German Fa 223 and American Sikorsky R-4 helicopters demonstrated the military potential of rotorcraft. British military planners recognized that helicopter technology would be crucial for postwar operations, particularly for reconnaissance, casualty evacuation, and liaison duties.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              In 1944, Bristol began preliminary design studies for a helicopter based on their autogyro experience. The design team, led by Raoul Hafner who had joined Bristol from the Cierva company, brought deep understanding of rotorcraft aerodynamics and the practical challenges of implementing vertical flight in operational aircraft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The initial specification called for a five-seat helicopter capable of multiple military roles including casualty evacuation, observation, and light transport. This versatility requirement drove design decisions that would make the Sycamore one of the most adaptable helicopters of its era.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/cierva-autogyro-historical.jpg"
              alt="Cierva autogyro showing the rotorcraft experience that led to Sycamore development"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Cierva autogyro experience provided crucial foundation for Bristol's helicopter development program
            </p>
          </div>
        </section>

        {/* Design and Development Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Design: Engineering Britain's First Helicopter</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Type 171's design represented a masterful synthesis of proven autogyro principles with cutting-edge helicopter technology. The aircraft featured a conventional single-rotor configuration with tail rotor anti-torque system, establishing the layout that would become standard for most subsequent helicopters.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The main rotor system incorporated a fully articulated head with lead-lag hinges, flapping hinges, and feathering bearings that allowed individual blade control. This sophisticated system provided the control authority necessary for precise hovering and maneuvering while maintaining structural integrity under varying flight loads.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Power came from a Bristol Alvis Leonides radial engine producing 520 horsepower, chosen for its reliability and power-to-weight ratio. The engine installation featured advanced cooling systems and vibration isolation that addressed the unique challenges of helicopter powerplant integration.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The fuselage design prioritized versatility and ease of maintenance. Large cabin doors, removable cabin fittings, and accessible mechanical systems allowed rapid reconfiguration for different missions. This adaptability would prove crucial to the Sycamore's commercial success.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Perhaps most significantly, the Type 171 incorporated advanced stability and control systems that made it relatively easy to fly compared to early helicopters. These characteristics would prove essential for training new helicopter pilots and demonstrating the practical utility of rotorcraft operations.
            </p>
          </div>
        </section>

        {/* Development Challenges Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overcoming the Unknown: Development Challenges</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Developing Britain's first production helicopter presented unprecedented challenges that tested the limits of 1940s engineering capabilities. Every aspect of the aircraft required innovative solutions, from basic aerodynamic principles to complex mechanical systems that had no equivalent in conventional aircraft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Vibration control emerged as one of the most significant challenges. The rotating rotor system generated complex vibration patterns that threatened both structural integrity and operational effectiveness. Bristol's engineers developed sophisticated vibration isolation systems and dynamic balancing techniques that became industry standards.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The transmission system required entirely new approaches to power transfer and control. Converting the engine's rotational power to the main rotor while providing anti-torque power to the tail rotor demanded precision gearing, clutch systems, and control mechanisms that exceeded existing automotive or aviation practice.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Flight testing revealed numerous unexpected phenomena unique to helicopter operations. Retreating blade stall, vortex ring state, and autorotation characteristics required extensive investigation and modification of control systems, rotor blade design, and pilot training procedures.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Manufacturing challenges were equally daunting. Precision rotor blade production, dynamic component balancing, and quality control procedures for helicopter-specific systems required development of entirely new industrial processes and inspection techniques.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/sikorsky-vs300-helicopter.jpg"
              alt="Early helicopter development showing the challenging nature of rotorcraft engineering"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Early helicopter development worldwide faced similar challenges - complex rotor systems and unprecedented engineering requirements
            </p>
          </div>
        </section>

        {/* First Flight and Testing Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Historic Achievement: First Flight and Testing Program</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Type 171 prototype made its maiden flight on July 24, 1947, at Bristol's Filton airfield. Test pilot Cyril Unwins' successful first flight marked a historic moment in British aviation - the first flight of a British-designed and built production helicopter.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Early flight testing revealed the aircraft's excellent handling characteristics and operational versatility. Unlike many contemporary helicopters that were difficult to control and required extensive pilot training, the Type 171 demonstrated stable flight characteristics that made it accessible to pilots with conventional aircraft experience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The comprehensive test program included evaluation of military configurations, civilian transport applications, and specialized missions such as casualty evacuation and external load carrying. These tests demonstrated the helicopter's remarkable versatility and established performance baselines for operational deployment.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              International interest developed quickly as demonstration flights showcased the Sycamore's capabilities. Foreign military delegations and civilian operators recognized the aircraft's potential for operations that conventional aircraft could not perform effectively.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              By 1949, the Type 171 had received its Certificate of Airworthiness and entered production as the Sycamore Mk 1. This achievement established Bristol as the first British company to successfully develop, certify, and produce a helicopter for commercial and military service.
            </p>
          </div>
        </section>

        {/* Military Service Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Military Pioneer: Sycamore in Service</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sycamore's entry into military service marked the beginning of rotorcraft operations in the British Armed Forces. The RAF, Royal Navy, and Army all adopted variants of the Sycamore for diverse operational roles that demonstrated the versatility and effectiveness of helicopter operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RAF operations included search and rescue missions, communications flights, and training programs that established helicopter doctrine for the British military. The Sycamore's reliability and ease of maintenance made it ideal for introducing helicopter operations to RAF squadrons worldwide.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Royal Navy operations aboard aircraft carriers demonstrated the Sycamore's naval capabilities. Modified versions with folding rotors and deck landing equipment proved that helicopters could operate effectively from ships, establishing rotorcraft as essential naval aviation assets.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Army operations showcased the Sycamore's utility for casualty evacuation, reconnaissance, and liaison duties. These missions, often conducted in challenging terrain and weather conditions, proved that helicopters could provide capabilities impossible with conventional aircraft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              International military operators, including forces in Australia, Belgium, and Germany, adopted the Sycamore for similar roles. This widespread military adoption validated the aircraft's design and established Bristol's reputation in the international helicopter market.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/sycamore-seeds-helicopter.jpg"
              alt="Sycamore helicopter in operational service showing military configuration"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Sycamore in military service - establishing helicopter operations across British Armed Forces
            </p>
          </div>
        </section>

        {/* Technical Innovation Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Innovations: Advancing Helicopter Technology</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sycamore's technical innovations extended far beyond its successful first flight. Throughout its production run, Bristol continuously refined the aircraft's systems, incorporating advanced technologies that influenced helicopter development worldwide.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Advanced rotor blade design incorporated sophisticated airfoils and structural techniques that optimized performance across the helicopter's operational envelope. These innovations improved efficiency, reduced vibration, and enhanced control authority in all flight conditions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The transmission system featured precision gearing and lubrication systems that established new standards for helicopter reliability. Advanced materials and manufacturing techniques developed for Sycamore production influenced subsequent rotorcraft programs throughout the industry.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Control system innovations included powered flight controls and stability augmentation that reduced pilot workload and improved operational safety. These systems became standard features in later helicopter designs and contributed to the widespread adoption of rotorcraft operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Manufacturing process innovations developed for Sycamore production established British helicopter manufacturing capabilities that supported decades of subsequent rotorcraft development. These processes influenced not only Bristol's later programs but the entire British aerospace industry.
            </p>
          </div>
        </section>

        {/* Legacy and Impact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lasting Legacy: The Sycamore's Enduring Impact</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Bristol Sycamore's influence on British helicopter development extended far beyond its operational service life. As Britain's first production helicopter, it established design principles, manufacturing capabilities, and operational doctrines that influenced decades of subsequent rotorcraft development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The aircraft's success demonstrated that British aerospace companies could compete effectively in the emerging helicopter market. This capability encouraged continued investment in rotorcraft technology and established Britain as a major player in international helicopter development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Operational experience gained with the Sycamore provided crucial foundation for subsequent British helicopter programs. The lessons learned in design, manufacturing, and operations directly influenced later aircraft including the Wessex, Sea King, and modern rotorcraft programs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sycamore's international success established export markets and technology transfer relationships that benefited British aerospace for decades. These connections facilitated collaboration on advanced helicopter programs and maintained British influence in global rotorcraft development.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Today, the principles established by the Sycamore program continue to influence modern helicopter design. The emphasis on reliability, versatility, and operational effectiveness that characterized the Type 171 remains central to contemporary rotorcraft development philosophy.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Pioneering British Helicopter Excellence</h2>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Bristol Type 171 Sycamore stands as a landmark achievement in British aviation history. More than just the first British production helicopter, it represented a successful transition from experimental rotorcraft to practical operational aircraft that demonstrated the viability of helicopter operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Sycamore's technical achievements, operational success, and international recognition established Britain as a major force in helicopter development. The aircraft's influence on subsequent rotorcraft programs demonstrates the lasting impact of this pioneering achievement.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              As modern helicopter technology continues to evolve, the Sycamore's legacy of innovation, reliability, and operational excellence remains relevant. The principles established by this remarkable aircraft continue to guide helicopter development and ensure Britain's continued leadership in rotorcraft technology.
            </p>
          </div>
        </section>

        {/* Book Promotion Bottom */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white p-8 rounded-xl mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Helicopter History</h3>
            <p className="text-lg mb-6">
              Discover the complete story of early helicopter development, including extensive Sycamore coverage and analysis of rotorcraft evolution, in Charles MacKay's comprehensive study.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books/sycamore-seeds"
                className="bg-white text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 View "Sycamore Seeds" Book
              </Link>
              <Link
                href="/books"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition-colors"
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
            <p className="text-gray-600">Help others discover the story of Britain's first production helicopter</p>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how the Bristol Sycamore established Britain as a helicopter manufacturing pioneer"
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/helicopter-development-pioneers" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 mb-2">Helicopter Development Pioneers</h4>
              <p className="text-gray-600 text-sm">The evolution of vertical flight technology from autogyros to helicopters</p>
            </Link>
            <Link href="/blog/sycamore-seeds-helicopter-evolution" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 mb-2">Sycamore Seeds and Helicopter Evolution</h4>
              <p className="text-gray-600 text-sm">How nature's spinning seeds revealed the principles of autorotation</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
