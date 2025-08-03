import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Aviation Timeline | 130 Years of Flight Innovation | Charles E. MacKay Books',
  description: 'Journey through 130 years of aviation history from pioneers to jets. Discover the stories behind Charles MacKay\'s acclaimed aviation books with exclusive insights into Scottish aviation heritage.',
  keywords: [
    'aviation timeline',
    'aviation history books',
    'Scottish aviation heritage',
    'WWI aircraft development',
    'WWII aviation history',
    'helicopter development',
    'jet age aviation',
    'Charles MacKay aviation historian',
    'aviation books for sale',
    'military aviation timeline'
  ],
  openGraph: {
    title: 'Aviation Timeline | 130 Years of Flight Innovation',
    description: 'Journey through aviation history with Charles MacKay\'s acclaimed book collection',
    type: 'website',
  },
}

// Timeline data focusing on major eras with book connections
const timelineEras = [
  {
    period: '1895-1914',
    title: 'Pioneer Era',
    subtitle: 'Dreams Take Flight',
    description: 'From Percy Pilcher\'s first gliders to the dawn of powered flight, discover the visionaries who dared to dream of flight.',
    image: '/blog-images/percy-pilcher-hawk-glider.jpg',
    gradient: 'from-amber-600 via-orange-500 to-red-500',
    textColor: 'text-white',
    keyEvents: [
      'Percy Pilcher\'s Scottish gliding experiments',
      'First powered flight attempts',
      'Early aviation pioneers'
    ],
    featuredBooks: [
      {
        id: 'soaring-with-wings',
        title: 'Soaring with Wings',
        subtitle: 'Percy Pilcher wants to Fly',
        price: '£15.01',
        description: 'The untold story of Scotland\'s forgotten aviation pioneer'
      },
      {
        id: 'beardmore-aviation',
        title: 'Beardmore Aviation',
        subtitle: 'Early Scottish Aviation',
        price: '£12.76',
        description: 'William Beardmore\'s pioneering entry into aviation manufacturing'
      }
    ],
    relatedBlogs: [
      {
        slug: 'percy-pilcher-scotland-aviation-pioneer',
        title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer',
        excerpt: 'The Scottish pioneer whose gliding experiments nearly achieved powered flight before the Wright Brothers.'
      }
    ]
  },
  {
    period: '1914-1918',
    title: 'Great War',
    subtitle: 'Warfare Transformed',
    description: 'Aviation evolved from reconnaissance to air supremacy as fighters, bombers, and aces defined modern aerial warfare.',
    image: '/blog-images/sopwith-camel-historical-1918.jpg',
    gradient: 'from-red-600 via-crimson-500 to-rose-500',
    textColor: 'text-white',
    keyEvents: [
      'RFC and RNAS formation',
      'Scottish aircraft manufacturing boom',
      'Emergence of fighter aces'
    ],
    featuredBooks: [
      {
        id: 'british-aircraft-great-war',
        title: 'British Aircraft of the Great War',
        subtitle: 'RFC & RNAS Development',
        price: '£12.91',
        description: 'Comprehensive guide to British WWI aircraft and operations'
      },
      {
        id: 'german-aircraft-great-war',
        title: 'German Aircraft in the Great War',
        subtitle: '1914-1918',
        price: '£13.93',
        description: 'The complete story of German military aviation'
      },
      {
        id: 'clydeside-aviation-vol1',
        title: 'Clydeside Aviation Volume One',
        subtitle: 'The Great War',
        price: '£16.08',
        description: 'Aviation activities on the Clyde during WWI'
      }
    ],
    relatedBlogs: [
      {
        slug: 'british-aircraft-great-war-rfc-rnas',
        title: 'British Aircraft Great War: RFC & RNAS Development',
        excerpt: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters.'
      },
      {
        slug: 'german-aircraft-great-war-development',
        title: 'German Aircraft Great War Development',
        excerpt: 'Revolutionary German aviation development from Albatros to Fokker.'
      },
      {
        slug: 'beardmore-aviation-scottish-industrial-giant',
        title: 'Beardmore Aviation: Great War Production',
        excerpt: 'How Scottish shipbuilders became aircraft manufacturers during WWI.'
      },
      {
        slug: 'clydeside-aviation-wartime-production',
        title: 'Clydeside Aviation: The Great War Years',
        excerpt: 'Scottish aviation manufacturing boom during the First World War.'
      }
    ]
  },
  {
    period: '1918-1939',
    title: 'Golden Age',
    subtitle: 'Between the Wars',
    description: 'Commercial aviation flourished as airlines connected the world and aircraft technology advanced rapidly.',
    image: '/blog-images/supermarine-s6b-schneider-trophy.jpg',
    gradient: 'from-blue-600 via-indigo-500 to-purple-500',
    textColor: 'text-white',
    keyEvents: [
      'Commercial aviation development',
      'Scottish aircraft manufacturing',
      'Schneider Trophy races'
    ],
    featuredBooks: [
      {
        id: 'clydeside-aviation-vol2',
        title: 'Clydeside Aviation Volume Two',
        subtitle: 'Between the Wars',
        price: '£15.54',
        description: 'Civilian aviation growth and wartime preparation'
      },
      {
        id: 'mother-of-the-few',
        title: 'Mother of the Few',
        subtitle: 'Lucy Lady Houston',
        price: '£14.52',
        description: 'The woman who saved the Schneider Trophy'
      },
      {
        id: 'beardmore-aviation',
        title: 'Beardmore Aviation',
        subtitle: 'Scottish Industrial Giant',
        price: '£12.76',
        description: 'The complete story of Scotland\'s aviation empire'
      },
      {
        id: 'rohrbach-roland',
        title: 'Rohrbach Roland',
        subtitle: 'German Flying Boat',
        price: '£12.92',
        description: 'Advanced flying boat development between the wars'
      },
      {
        id: 'sycamore-seeds',
        title: 'The Sycamore Seeds',
        subtitle: 'Early Helicopter History',
        price: '£12.86',
        description: 'From nature\'s inspiration to rotorcraft development'
      }
    ],
    relatedBlogs: [
      {
        slug: 'beardmore-aviation-scottish-industrial-giant',
        title: 'Beardmore Aviation: Scottish Industrial Giant',
        excerpt: 'How a Scottish shipbuilder transformed into Britain\'s most ambitious aviation manufacturer.'
      },
      {
        slug: 'lucy-lady-houston-schneider-trophy',
        title: 'Lucy Lady Houston: Mother of the Few',
        excerpt: 'How Lady Houston\'s £100,000 donation saved the Schneider Trophy.'
      },
      {
        slug: 'schneider-trophy-racing-development',
        title: 'Schneider Trophy: Racing to Victory',
        excerpt: 'High-speed seaplane racing that shaped fighter development.'
      },
      {
        slug: 'clydeside-aviation-between-wars',
        title: 'Clydeside Aviation: Between the Wars',
        excerpt: 'Scottish aviation transitions from war to peace and back to war preparation.'
      },
      {
        slug: 'rohrbach-roland-flying-boat',
        title: 'Rohrbach Roland: Advanced Flying Boat',
        excerpt: 'German engineering excellence in inter-war flying boat design.'
      }
    ]
  },
  {
    period: '1939-1945',
    title: 'World War II',
    subtitle: 'Victory Through Air Power',
    description: 'The greatest air war in history saw unprecedented aircraft production and technological advancement.',
    image: '/blog-images/spitfire-battle-of-britain.jpg',
    gradient: 'from-slate-600 via-gray-500 to-blue-600',
    textColor: 'text-white',
    keyEvents: [
      'Battle of Britain triumph',
      'Mass aircraft production',
      'Technological breakthroughs'
    ],
    featuredBooks: [
      {
        id: 'enemy-luftwaffe-1945',
        title: 'This Was the Enemy',
        subtitle: 'The Luftwaffe 1945',
        price: '£16.08',
        description: 'Final year of German air power'
      },
      {
        id: 'captain-eric-brown',
        title: 'Captain of the Clouds',
        subtitle: 'Test Pilot Biography',
        price: '£6.98',
        description: 'Britain\'s greatest test pilot story'
      },
      {
        id: 'formidable-fighter',
        title: 'Formidable Fighter',
        subtitle: 'HMS Formidable Operations',
        price: '£12.86',
        description: 'Pacific War carrier operations and fighter squadrons'
      },
      {
        id: 'naval-aviation-evolution',
        title: 'Naval Aviation Evolution',
        subtitle: 'Carrier Development',
        price: '£13.93',
        description: 'Evolution of naval aviation from WWI to modern carriers'
      }
    ],
    relatedBlogs: [
      {
        slug: 'supermarine-spitfire-development-history',
        title: 'Supermarine Spitfire Development History',
        excerpt: 'From racing seaplanes to fighter legend: R.J. Mitchell\'s masterpiece.'
      },
      {
        slug: 'hawker-hurricane-fighter-development',
        title: 'Hawker Hurricane: The Forgotten Hero',
        excerpt: 'The workhorse fighter of the Battle of Britain.'
      },
      {
        slug: 'luftwaffe-1945-final-year',
        title: 'Luftwaffe 1945: The Final Year',
        excerpt: 'The desperate final months of the German air force.'
      },
      {
        slug: 'eric-brown-test-pilot-legend',
        title: 'Eric Brown: Britain\'s Greatest Test Pilot',
        excerpt: 'The man who flew more aircraft types than anyone in history.'
      },
      {
        slug: 'hms-formidable-pacific-war',
        title: 'HMS Formidable: Pacific War Operations',
        excerpt: 'British carrier operations in the Pacific Theatre.'
      },
      {
        slug: 'me262-jet-fighter-revolution',
        title: 'Me 262: The Jet Fighter Revolution',
        excerpt: 'Germany\'s revolutionary jet fighter that changed aerial warfare.'
      }
    ]
  },
  {
    period: '1945-1991',
    title: 'Jet Age',
    subtitle: 'Cold War Skies',
    description: 'The jet age revolutionized aviation as supersonic fighters and nuclear deterrents reshaped military doctrine.',
    image: '/blog-images/english-electric-lightning-f6.jpg',
    gradient: 'from-cyan-600 via-blue-500 to-indigo-600',
    textColor: 'text-white',
    keyEvents: [
      'First jet fighters',
      'Supersonic breakthrough',
      'Nuclear deterrent aircraft'
    ],
    featuredBooks: [
      {
        id: 'sabres-from-north',
        title: 'Sabres from the North',
        subtitle: 'F-86 in European Service',
        price: '£12.92',
        description: 'Cold War\'s legendary fighter in Europe'
      },
      {
        id: 'sonic-to-standoff',
        title: 'Sonic to Stand Off',
        subtitle: 'British Nuclear Deterrent',
        price: '£13.95',
        description: 'Evolution of Britain\'s nuclear aviation strategy'
      },
      {
        id: 'lightning-interceptor',
        title: 'Lightning Interceptor',
        subtitle: 'Britain\'s Supersonic Fighter',
        price: '£14.26',
        description: 'English Electric Lightning development and operations'
      }
    ],
    relatedBlogs: [
      {
        slug: 'f86-sabre-cold-war-fighter',
        title: 'F-86 Sabre: Cold War\'s Legendary Fighter',
        excerpt: 'The swept-wing fighter that dominated MiG Alley.'
      },
      {
        slug: 'jet-age-aviation-cold-war-development',
        title: 'The Jet Age Revolution',
        excerpt: 'How the Cold War drove rapid jet development.'
      },
      {
        slug: 'english-electric-lightning-development',
        title: 'English Electric Lightning: Supersonic Interceptor',
        excerpt: 'Britain\'s fastest fighter and its development challenges.'
      },
      {
        slug: 'british-nuclear-deterrent-v-force',
        title: 'V-Force: Britain\'s Nuclear Deterrent',
        excerpt: 'Vulcan, Victor, and Valiant bombers defending Britain.'
      },
      {
        slug: 'korean-war-air-combat',
        title: 'Korean War: Jet vs Jet Combat',
        excerpt: 'First jet-age air war between F-86s and MiG-15s.'
      }
    ]
  },
  {
    period: '1950-Present',
    title: 'Helicopter Age',
    subtitle: 'Vertical Flight Mastery',
    description: 'Rotorcraft evolved from experimental machines to essential tools for military, civilian, and rescue operations.',
    image: '/blog-images/sikorsky-vs300-helicopter.jpg',
    gradient: 'from-green-600 via-emerald-500 to-teal-500',
    textColor: 'text-white',
    keyEvents: [
      'Helicopter mass production',
      'Military rotorcraft operations',
      'Civilian helicopter services'
    ],
    featuredBooks: [
      {
        id: 'sycamore-seeds',
        title: 'The Sycamore Seeds',
        subtitle: 'Early History of the Helicopter',
        price: '£12.86',
        description: 'From nature\'s inspiration to flying machines'
      },
      {
        id: 'bristol-sycamore',
        title: 'Bristol Sycamore',
        subtitle: 'Britain\'s First Helicopter',
        price: '£13.48',
        description: 'The complete story of Britain\'s first production helicopter'
      }
    ],
    relatedBlogs: [
      {
        slug: 'helicopter-development-pioneers',
        title: 'Helicopter Development: From Autogyros to Modern Rotorcraft',
        excerpt: 'The evolution of vertical flight technology.'
      },
      {
        slug: 'sycamore-seeds-helicopter-evolution',
        title: 'Sycamore Seeds and Helicopter Evolution',
        excerpt: 'How nature\'s spinning seeds revealed the principles of autorotation.'
      },
      {
        slug: 'bristol-sycamore-helicopter-development',
        title: 'Bristol Sycamore: Britain\'s First Production Helicopter',
        excerpt: 'From autogyro experience to helicopter production.'
      },
      {
        slug: 'sikorsky-vs300-helicopter-breakthrough',
        title: 'Sikorsky VS-300: The Helicopter Breakthrough',
        excerpt: 'Igor Sikorsky\'s successful helicopter design principles.'
      },
      {
        slug: 'rotorcraft-military-applications',
        title: 'Military Helicopters: Transforming Warfare',
        excerpt: 'How helicopters revolutionized military operations.'
      }
    ]
  }
]

export default function AviationTimelinePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Epic Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="aircraft-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,5 L15,10 L10,15 L5,10 Z" fill="currentColor" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aircraft-pattern)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Aviation Timeline
              <span className="block text-3xl md:text-5xl text-blue-300 font-normal mt-4">
                130 Years of Flight Innovation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
              Journey through aviation history with <strong>Charles E. MacKay's acclaimed book collection</strong>.
              From Scottish pioneers to jet-age warriors, discover the untold stories that shaped modern flight.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-blue-300">130+</div>
                <div className="text-sm text-gray-300">Years of History</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-green-300">19</div>
                <div className="text-sm text-gray-300">Published Books</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-purple-300">1,700+</div>
                <div className="text-sm text-gray-300">Satisfied Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-orange-300">Worldwide</div>
                <div className="text-sm text-gray-300">Shipping Available</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📚 Browse All Books
              </Link>
              <Link
                href="/blog"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30"
              >
                📖 Read Expert Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Eras */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Aviation History
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click on any era to discover the books and articles that bring these remarkable stories to life
            </p>
          </div>

          <div className="space-y-20">
            {timelineEras.map((era, index) => (
              <div key={era.period} className={`relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} md:flex items-center gap-12`}>

                {/* Era Content */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className={`text-center md:text-left ${index % 2 === 0 ? '' : 'md:text-right'}`}>

                    {/* Period Badge */}
                    <div className={`inline-block bg-gradient-to-r ${era.gradient} text-white px-6 py-2 rounded-full font-bold text-lg mb-6 shadow-lg`}>
                      {era.period}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {era.title}
                    </h3>
                    <h4 className="text-xl text-gray-600 mb-6 font-medium">
                      {era.subtitle}
                    </h4>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {era.description}
                    </p>

                    {/* Key Events */}
                    <div className="mb-8">
                      <h5 className="font-semibold text-gray-800 mb-3">Key Developments:</h5>
                      <ul className="space-y-2">
                        {era.keyEvents.map((event, i) => (
                          <li key={i} className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Books */}
                    <div className="grid gap-4 mb-6">
                      {era.featuredBooks.map((book) => (
                        <Link
                          key={book.id}
                          href={`/books/${book.id}`}
                          className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 hover:border-blue-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              📚 {book.title}
                            </h6>
                            <span className="text-green-600 font-bold text-lg">
                              {book.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{book.subtitle}</p>
                          <p className="text-sm text-gray-700">{book.description}</p>
                          <div className="mt-3 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                            View Book Details →
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Related Blogs */}
                    {era.relatedBlogs && era.relatedBlogs.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <h5 className="font-semibold text-gray-800">📖 Expert Articles:</h5>
                        {era.relatedBlogs.map((blog) => (
                          <Link
                            key={blog.slug}
                            href={`/blog/${blog.slug}`}
                            className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                          >
                            <h6 className="font-medium text-blue-800 mb-1">
                              {blog.title}
                            </h6>
                            <p className="text-sm text-blue-600">{blog.excerpt}</p>
                            <div className="text-blue-500 text-xs mt-1">Read Article →</div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Era Guide Link */}
                    <div className="mt-6">
                      <Link
                        href={
                          era.period === '1895-1914' ? '/pioneer-era-1895-1914' :
                          era.period === '1914-1918' ? '/great-war-1914-1918' :
                          era.period === '1918-1939' ? '/golden-age-1918-1939' :
                          '#'
                        }
                        className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        📚 Complete {era.title} Era Guide
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Era Image */}
                <div className="md:w-1/2">
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={era.image}
                      alt={`${era.title} - ${era.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${era.gradient} opacity-20`}></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                        <h5 className="font-bold text-lg">{era.title}</h5>
                        <p className="text-sm opacity-90">{era.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Collection Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Aviation Library
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Build your comprehensive aviation history collection with Charles MacKay's acclaimed books.
              From Scottish pioneers to nuclear deterrents - every aspect of aviation evolution is covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {books.slice(0, 6).map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors text-lg">
                    {book.title}
                  </h3>
                  <span className="text-green-400 font-bold text-xl">
                    £{book.price}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <span className="text-blue-300 text-sm group-hover:text-blue-200">
                    View Book →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/books"
              className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🛒 View All 19 Books - Start Your Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Shipping Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Trusted by Aviation Enthusiasts Worldwide
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">1,700+</div>
              <div className="text-gray-700">Satisfied Customers</div>
              <div className="text-sm text-gray-500 mt-1">100% Positive Feedback</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">Worldwide</div>
              <div className="text-gray-700">Shipping Available</div>
              <div className="text-sm text-gray-500 mt-1">UK £3.45 • EU £4.95 • USA £8.95</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">Academic</div>
              <div className="text-gray-700">References</div>
              <div className="text-sm text-gray-500 mt-1">Used by universities globally</div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            ✅ Secure PayPal checkout • ✅ Fast worldwide shipping • ✅ Academic quality guaranteed
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Books
            </Link>
            <Link
              href="/how-to-order"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              How to Order
            </Link>
            <Link
              href="/contact"
              className="border border-gray-400 hover:border-gray-600 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Charles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
