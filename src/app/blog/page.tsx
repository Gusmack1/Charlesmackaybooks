'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import PageSEO from '@/components/PageSEO'

// Metadata for this page is handled by layout.tsx since this is a client component

const blogCategories = {
  'Scottish Aviation History': [
    {
      title: 'Beardmore Aviation: Scottish Industrial Giant',
      slug: 'beardmore-aviation-scottish-industrial-giant',
      excerpt: 'The remarkable story of William Beardmore and Company, the Scottish engineering conglomerate that revolutionized shipbuilding, steel production, and aviation from Glasgow and the Clyde.',
      date: 'January 12, 2024',
      image: '/blog-images/beardmore-clyde-shipyard.jpg',
      tags: ['Scottish Aviation', 'Industrial History', 'Shipbuilding', 'Engineering']
    },
    {
      title: 'Clydeside Aviation Revolution: Glasgow\'s Industrial Heritage',
      slug: 'clydeside-aviation-revolution',
      excerpt: 'How Glasgow\'s mighty shipyards transformed into aviation powerhouses during two world wars.',
      date: 'January 16, 2024',
      image: '/blog-images/clydeside-aviation-dalmuir.jpg',
      tags: ['Scottish Aviation', 'Industrial History', 'Clydeside', 'WWII']
    },
    {
      title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer',
      slug: 'percy-pilcher-scotland-aviation-pioneer',
      excerpt: 'The Scottish pioneer whose gliding experiments nearly achieved powered flight before the Wright Brothers.',
      date: 'January 14, 2024',
      image: '/blog-images/percy-pilcher-with-glider.jpg',
      tags: ['Scottish Aviation', 'Aviation Pioneers', 'Gliding', 'Early Flight']
    }
  ],
  'WWI Aviation': [
    {
      title: 'British Aircraft Great War: RFC & RNAS Development',
      slug: 'british-aircraft-great-war-rfc-rnas',
      excerpt: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters.',
      date: 'January 15, 2024',
      image: '/blog-images/sopwith-camel-rfc.jpg',
      tags: ['WWI Aviation', 'RFC', 'RNAS', 'British Aircraft']
    },
    {
      title: 'German Aircraft Great War Development',
      slug: 'german-aircraft-great-war-development',
      excerpt: 'Revolutionary German aviation development from Albatros to Fokker that challenged Allied air superiority.',
      date: 'January 18, 2024',
      image: '/blog-images/fokker-triplane-wwi.jpg',
      tags: ['WWI Aviation', 'German Aircraft', 'Fighter Development', 'Luftstreitkräfte']
    }
  ],
  'WWII Aviation': [
    {
      title: 'Supermarine Spitfire Development History',
      slug: 'supermarine-spitfire-development-history',
      excerpt: 'From racing seaplanes to fighter legend: R.J. Mitchell\'s masterpiece that saved Britain.',
      date: 'January 25, 2024',
      image: '/blog-images/spitfire-k5054-prototype.jpg',
      tags: ['WWII Aviation', 'Spitfire', 'Fighter Aircraft', 'R.J. Mitchell']
    },
    {
      title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
      slug: 'hawker-hurricane-fighter-development',
      excerpt: 'The workhorse fighter that shot down more German aircraft than any other during the Battle of Britain.',
      date: 'January 25, 2024',
      image: '/blog-images/hawker-hurricane.jpg',
      tags: ['WWII Aviation', 'Hurricane', 'Battle of Britain', 'Fighter Aircraft']
    },
    {
      title: 'Luftwaffe 1945: The Final Year',
      slug: 'luftwaffe-1945-final-year',
      excerpt: 'The desperate final months of the German air force, from jet fighters to the collapse of the Third Reich.',
      date: 'January 20, 2024',
      image: '/blog-images/me262-luftwaffe.jpg',
      tags: ['WWII Aviation', 'Luftwaffe', 'German Aircraft', 'Jet Aircraft']
    }
  ],
  'Jet Age Aviation': [
    {
      title: 'The Jet Age Revolution: Cold War Aviation Development',
      slug: 'jet-age-aviation-cold-war-development',
      excerpt: 'How the Cold War drove rapid jet development from primitive jets to supersonic fighters.',
      date: 'January 25, 2024',
      image: '/blog-images/english-electric-lightning-f6.jpg',
      tags: ['Jet Age', 'Cold War', 'Supersonic Flight', 'Fighter Development']
    },
    {
      title: 'F-86 Sabre: Cold War\'s Legendary Fighter',
      slug: 'f86-sabre-cold-war-fighter',
      excerpt: 'The swept-wing fighter that dominated MiG Alley and established Western air superiority.',
      date: 'January 17, 2024',
      image: '/blog-images/rcaf-sabre-formation-golden-hawks.jpg',
      tags: ['Jet Age', 'F-86 Sabre', 'Cold War', 'Fighter Aircraft']
    }
  ],
  'Aviation Biography': [
    {
      title: 'Captain Eric Brown: Britain\'s Greatest Test Pilot',
      slug: 'test-pilot-biography-eric-brown',
      excerpt: 'The extraordinary life of the test pilot who flew 487 different aircraft types.',
      date: 'December 26, 2024',
      image: '/blog-images/eric-brown-test-pilot-portrait.jpg',
      tags: ['Aviation Biography', 'Test Pilots', 'Eric Brown', 'Aircraft Testing']
    },
    {
      title: 'Lucy Lady Houston: Mother of the Few',
      slug: 'lucy-lady-houston-schneider-trophy',
      excerpt: 'How Lady Houston\'s £100,000 donation saved the Schneider Trophy and enabled Spitfire development.',
      date: 'January 22, 2024',
      image: '/blog-images/supermarine-s6-schneider-race.jpg',
      tags: ['Aviation Biography', 'Schneider Trophy', 'Philanthropy', 'Aviation History']
    }
  ],
  'Helicopter History': [
    {
      title: 'Helicopter Development: From Autogyros to Modern Rotorcraft',
      slug: 'helicopter-development-pioneers',
      excerpt: 'From spinning maple seeds to modern rotorcraft - the evolution of vertical flight technology.',
      date: 'January 12, 2024',
      image: '/blog-images/cierva-autogyro-duxford.jpg',
      tags: ['Helicopter History', 'Vertical Flight', 'Autogyro', 'Rotorcraft']
    },
    {
      title: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration',
      slug: 'sycamore-seeds-helicopter-evolution',
      excerpt: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired generations of helicopter pioneers.',
      date: 'January 18, 2024',
      image: '/blog-images/bristol-sycamore.jpg',
      tags: ['Helicopter History', 'Biomimicry', 'Autorotation', 'Natural Flight']
    }
  ],
  'Naval Aviation': [
    {
      title: 'Naval Aviation History: From First Carrier Landings to Modern Fleet Operations',
      slug: 'naval-aviation-history',
      excerpt: 'The development of aircraft carriers and naval aviation from WWI to modern times.',
      date: 'January 10, 2024',
      image: '/blog-images/hms-argus-aircraft-carrier.jpg',
      tags: ['Naval Aviation', 'Aircraft Carriers', 'Fleet Air Arm', 'Maritime Aviation']
    },
    {
      title: 'HMS Argus: The World\'s First True Aircraft Carrier',
      slug: 'hms-argus-first-aircraft-carrier',
      excerpt: 'The pioneering aircraft carrier that established naval aviation principles and transformed maritime warfare forever.',
      date: 'January 20, 2024',
      image: '/blog-images/hms-argus-aircraft-carrier.jpg',
      tags: ['Naval Aviation', 'HMS Argus', 'Aircraft Carriers', 'Naval History']
    }
  ],
  'Industrial History': [
    {
      title: 'Aviation Manufacturing Wartime Production',
      slug: 'aviation-manufacturing-wartime-production',
      excerpt: 'How British industry transformed to produce thousands of aircraft monthly during WWII.',
      date: 'January 16, 2024',
      image: '/blog-images/b24-assembly-line-willow-run.jpg',
      tags: ['Industrial History', 'Aircraft Manufacturing', 'WWII Production', 'Factory Systems']
    },
    {
      title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer',
      slug: 'adolf-rohrbach-metal-aircraft-construction',
      excerpt: 'The visionary engineer who transformed aviation through all-metal aircraft construction and stressed-skin monocoque design principles.',
      date: 'January 15, 2024',
      image: '/blog-images/rohrbach-roland.jpg',
      tags: ['Industrial History', 'Aircraft Construction', 'Metal Aircraft', 'Engineering Innovation']
    }
  ]
}

// Get all unique tags from all blog posts
const allTags = [...new Set(
  Object.values(blogCategories)
    .flat()
    .flatMap(post => post.tags)
)].sort()

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageSEO
        title="Aviation History Blog | Expert Insights by Charles E. MacKay"
        description="Explore expert insights into aviation history, Scottish aircraft development, WWI & WWII aviation, and helicopter evolution. Latest research and analysis by aviation historian Charles E. MacKay."
        path="/blog"
        type="website"
      />
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Aviation History Blog
              <span className="block text-blue-300">Expert Insights & Heritage</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
              Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development,
              jet age aviation, and military aviation heritage by Charles E. MacKay.
            </p>
            <div className="text-sm text-blue-200">
              Published by Aviation Historian Charles E. MacKay
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Charles Books
        </Link>
      </div>

      {/* Tags Section */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Blog Categories */}
        {Object.entries(blogCategories).map(([category, posts]) => (
          <section key={category} className="mb-16" data-category={category}>
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-blue-200 pb-3">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  data-tags={post.tags.join(' ')}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="text-blue-600 font-semibold">
                        Read More →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* About the Author */}
        <section className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-8 border border-blue-200 mt-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">About the Author</h3>
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
              <strong>Charles E. MacKay</strong> is a renowned aviation historian specializing in Scottish aviation heritage,
              WWI & WWII aircraft development, and military aviation history. His research draws on extensive archival work
              and provides unique insights into the personalities and technologies that shaped modern aviation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📚 View All Books
              </Link>
              <Link
                href="/contact"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                ✉️ Contact Charles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
