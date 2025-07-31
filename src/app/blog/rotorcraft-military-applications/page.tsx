import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: 'Rotorcraft Military Applications: From Experimental Autogyros to Modern Combat Helicopters | Charles E. MacKay',
  description: 'The complete evolution of military rotorcraft from early autogyro experiments to modern attack helicopters. Discover how vertical flight technology revolutionized military operations and battlefield tactics.',
  keywords: [
    'military helicopters',
    'rotorcraft military applications',
    'military autogyros',
    'combat helicopters',
    'military helicopter development',
    'helicopter warfare',
    'rotorcraft military history',
    'military vertical flight',
    'helicopter combat operations',
    'military helicopter evolution',
    'helicopter military technology',
    'rotorcraft warfare',
    'military helicopter tactics',
    'helicopter military roles',
    'military helicopter design',
    'combat rotorcraft',
    'helicopter military service',
    'military helicopter operations',
    'Charles MacKay aviation books',
    'helicopter military history'
  ],
  openGraph: {
    title: 'Rotorcraft Military Applications: From Experimental Autogyros to Modern Combat Helicopters',
    description: 'The complete evolution of military rotorcraft from early autogyro experiments to modern attack helicopters that revolutionized military operations.',
    url: 'https://charlesmackaybooks.com/blog/rotorcraft-military-applications',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/military-helicopter-formation.jpg',
        width: 1200,
        height: 630,
        alt: 'Military helicopters in formation showing modern rotorcraft capabilities'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rotorcraft Military Applications: From Experimental Autogyros to Modern Combat Helicopters',
    description: 'The complete evolution of military rotorcraft from early autogyro experiments to modern attack helicopters that revolutionized military operations.',
    images: ['/blog-images/military-helicopter-formation.jpg'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotorcraft Military Applications: From Experimental Autogyros to Modern Combat Helicopters',
  description: 'The complete evolution of military rotorcraft from early autogyro experiments to modern attack helicopters. Discover how vertical flight technology revolutionized military operations and battlefield tactics.',
  image: '/blog-images/military-helicopter-formation.jpg',
  author: {
    '@type': 'Person',
    name: 'Charles E. MacKay',
    description: 'Aviation historian specializing in helicopter development and military rotorcraft applications',
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
  datePublished: '2025-01-29T20:00:00.000Z',
  dateModified: '2025-01-29T20:00:00.000Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://charlesmackaybooks.com/blog/rotorcraft-military-applications'
  },
  articleSection: 'Military Aviation',
  keywords: 'military helicopters, rotorcraft, combat helicopters, military aviation, helicopter warfare',
  wordCount: 2400,
  readingTime: 'PT10M'
}

export default function RotorcraftMilitaryApplicationsPage() {
  const pageUrl = 'https://charlesmackaybooks.com/blog/rotorcraft-military-applications'
  const pageTitle = 'Rotorcraft Military Applications: From Experimental Autogyros to Modern Combat Helicopters'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <UnifiedSchema
        pageType="blog-post"
        pageTitle={pageTitle}
        pageDescription="The complete evolution of military rotorcraft from early autogyro experiments to modern attack helicopters that revolutionized military operations."
        pageUrl="/blog/rotorcraft-military-applications"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-900 via-gray-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Military
                <span className="block text-green-300">Rotorcraft</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                From experimental autogyros to modern attack helicopters - the revolutionary development of military rotorcraft that transformed battlefield operations and redefined the possibilities of vertical flight in warfare.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-green-200 mb-6">
                <span>By Charles E. MacKay</span>
                <span>•</span>
                <span>Aviation Historian</span>
                <span>•</span>
                <span>10 minute read</span>
                <span>•</span>
                <span>Military Aviation</span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/blog-images/sikorsky-r4-helicopter.jpg"
                alt="Military helicopters in formation showing modern rotorcraft capabilities"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Modern Military Helicopters - Evolution of Rotorcraft Warfare</p>
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
            description="Discover how military rotorcraft evolved from experimental autogyros to modern combat helicopters"
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Introduction */}
        <div className="prose prose-lg prose-slate max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The development of military rotorcraft represents one of aviation's most significant technological achievements, transforming warfare through the unique capabilities of vertical flight. From the earliest autogyro experiments to today's sophisticated attack helicopters, military rotorcraft have revolutionized battlefield operations, medical evacuation, and special operations in ways unimaginable to early aviation pioneers.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Charles E. MacKay's research into rotorcraft development reveals how military necessity drove innovations in vertical flight technology, creating aircraft capable of operating from confined spaces, hovering over targets, and performing missions impossible for conventional aircraft. This evolution continues today as rotorcraft technology advances to meet emerging military challenges.
          </p>
        </div>

        {/* Book Promotion */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">Featured in "The Sycamore Seeds: The Early History of the Helicopter"</h3>
              <p className="text-green-800 mb-4">
                The complete military rotorcraft development story is extensively covered in Charles MacKay's comprehensive study of helicopter evolution, including detailed analysis of military applications and operational history.
              </p>
              <Link
                href="/books/sycamore-seeds"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View Book Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Early Military Interest */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Early Military Recognition of Rotorcraft Potential</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Military interest in rotorcraft began during the 1930s as autogyro technology demonstrated unique operational capabilities. The ability to operate from confined spaces, achieve steep approaches, and maintain slow-speed flight made autogyros attractive for reconnaissance, artillery spotting, and communication roles that conventional aircraft could not perform effectively.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Early military autogyro programs included the U.S. Army's use of Kellett autogyros for mail delivery and observation duties. These initial applications proved the military value of rotorcraft while revealing limitations that would drive development toward true helicopters with improved hovering capabilities and operational flexibility.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              World War II accelerated military rotorcraft development as operational requirements demanded aircraft capable of missions impossible for conventional types. Medical evacuation, rescue operations, and special reconnaissance missions created urgent needs for rotorcraft capabilities that could save lives and provide tactical advantages.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The transition from autogyros to helicopters represented a fundamental shift in military aviation thinking. True helicopters offered precise hovering, vertical takeoff, and landing capabilities that made them indispensable for specialized military operations requiring flexibility unavailable from conventional aircraft.
            </p>
          </div>
        </section>

        {/* Korean War Breakthrough */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Korean War: Proving Helicopter Military Value</h2>

          <div className="prose prose-lg prose-slate max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Korean War marked the first large-scale military deployment of helicopters, proving their operational value in combat conditions. Medical evacuation missions saved thousands of lives, while reconnaissance and transportation roles demonstrated helicopter versatility in challenging terrain and weather conditions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bell H-13 and Sikorsky H-19 helicopters became symbols of humanitarian military aviation through their medical evacuation roles. The ability to extract wounded soldiers from forward positions and transport them quickly to medical facilities revolutionized battlefield medicine and significantly improved survival rates for combat casualties.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Combat experiences revealed both helicopter capabilities and vulnerabilities. While rotorcraft excelled at specialized missions, their slow speed and limited defensive armament made them vulnerable to enemy fire. These lessons drove development of armed helicopters and improved defensive systems for rotorcraft operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Korean War helicopter operations established operational doctrines and procedures that would influence military rotorcraft employment for decades. Techniques for landing zone preparation, medical evacuation procedures, and helicopter-ground coordination became standard practices refined through subsequent conflicts.
            </p>
          </div>

          <div className="my-8">
            <Image
              src="/blog-images/sikorsky-vs300-helicopter.jpg"
              alt="Korean War helicopter medical evacuation showing early military rotorcraft operations"
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Early military helicopter operations - proving the life-saving value of rotorcraft in combat
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Rotorcraft's Continuing Military Evolution</h2>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Military rotorcraft have evolved from experimental curiosities to indispensable components of modern military forces, demonstrating unique capabilities that conventional aircraft cannot match. The ability to hover, operate from confined spaces, and provide precise, responsive support makes helicopters essential for contemporary military operations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The continuing evolution of military rotorcraft reflects both technological advancement and changing operational requirements. As threats evolve and military missions become more complex, helicopter capabilities continue to expand through innovative technologies and operational concepts.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today's military helicopters represent the culmination of decades of development driven by operational necessity and technological innovation. From early autogyro experiments to advanced attack helicopters, rotorcraft have proven their military value while continuing to evolve to meet emerging challenges in an increasingly complex security environment.
            </p>
          </div>
        </section>

        {/* Book Promotion Bottom */}
        <div className="bg-gradient-to-r from-green-600 to-gray-800 text-white p-8 rounded-xl mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Explore More Helicopter Development</h3>
            <p className="text-lg mb-6">
              Discover the complete story of helicopter evolution and military applications in Charles MacKay's comprehensive study of rotorcraft development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books/sycamore-seeds"
                className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 View "The Sycamore Seeds" Book
              </Link>
              <Link
                href="/books"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
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
            <p className="text-gray-600">Help others discover the evolution of military rotorcraft applications</p>
          </div>
          <SocialShare
            url={pageUrl}
            title={pageTitle}
            description="Discover how military rotorcraft evolved from experimental autogyros to modern combat helicopters"
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/helicopter-development-pioneers" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">Helicopter Development Pioneers</h4>
              <p className="text-gray-600 text-sm">The early pioneers who made vertical flight possible</p>
            </Link>
            <Link href="/blog/bristol-sycamore-helicopter-development" className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">Bristol Sycamore: British Helicopter Development</h4>
              <p className="text-gray-600 text-sm">Britain's contribution to early helicopter technology</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
