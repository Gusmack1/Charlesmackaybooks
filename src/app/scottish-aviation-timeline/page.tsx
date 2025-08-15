'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import BBCPageTemplate from '@/components/BBCPageTemplate';

// Metadata will be handled by layout or parent component

interface TimelineEvent {
  year: number;
  date?: string;
  title: string;
  description: string;
  category: 'Manufacturing' | 'Military' | 'Commercial' | 'Innovation' | 'Infrastructure' | 'Personnel' | 'International' | 'Research';
  location: string;
  significance: string;
  relatedBooks?: string[];
  relatedBlogs?: string[];
  keyFigures?: string[];
  aircraftTypes?: string[];
  technicalDetails?: string;
  era: 'Pioneer' | 'WWI' | 'Inter-War' | 'WWII-Cold-War' | 'Modern';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1895,
    date: 'June',
    title: 'Percy Pilcher Begins Aviation Experiments',
    description: 'Percy Pilcher, working as assistant lecturer at Glasgow University, builds and flies his first hang glider "The Bat". Following correspondence with Otto Lilienthal, he develops advanced glider designs that would influence early aviation development.',
    category: 'Innovation',
    location: 'Glasgow University',
    significance: 'Scotland\'s first systematic aviation experiments and glider development, predating Wright Brothers by 8 years',
    era: 'Pioneer',
    relatedBooks: ['soaring-with-wings'],
    relatedBlogs: ['percy-pilcher-scotland-aviation-pioneer'],
    keyFigures: ['Percy Pilcher', 'Otto Lilienthal'],
    aircraftTypes: ['Gliders', 'Hang Gliders'],
    technicalDetails: 'First controlled glider flights in Scotland, achieving flights of over 100 meters'
  },
  {
    year: 1909,
    title: 'Scottish Aeronautical Society Formed',
    description: 'The Scottish Aeronautical Society is founded to promote practical experimentation and public exhibitions of aeronautics throughout Scotland.',
    category: 'Infrastructure',
    location: 'Glasgow & Edinburgh',
    significance: 'Created an organizational framework for pre-war aviation exhibitions and knowledge sharing in Scotland',
    era: 'Pioneer',
    relatedBlogs: ['clydeside-aviation-revolution']
  },
  {
    year: 1896,
    date: 'September',
    title: 'Percy Pilcher\'s "Hawk" Glider Success',
    description: 'Pilcher\'s most successful glider design, "The Hawk", makes its first flight. This aircraft would later set distance records and demonstrate the viability of controlled flight in Scotland.',
    category: 'Innovation',
    location: 'Cardross, Scotland',
    significance: 'Demonstrated feasibility of controlled flight, inspiring future Scottish aviation development',
    era: 'Pioneer',
    relatedBooks: ['soaring-with-wings'],
    relatedBlogs: ['percy-pilcher-scotland-aviation-pioneer'],
    keyFigures: ['Percy Pilcher', 'Ella Pilcher'],
    aircraftTypes: ['Gliders'],
    technicalDetails: 'Wingspan of 23 feet, weight 50 pounds, capable of flights over 250 meters'
  },
  {
    year: 1913,
    date: 'March',
    title: 'Beardmore Aviation Division Founded',
    description: 'William Beardmore and Company Ltd establishes its aviation division at Dalmuir. This becomes one of Scotland\'s most significant aircraft manufacturing enterprises, producing military aircraft during WWI.',
    category: 'Manufacturing',
    location: 'Dalmuir, Scotland',
    significance: 'Foundation of Scotland\'s largest WWI aircraft manufacturer',
    era: 'Pioneer',
    relatedBooks: ['beardmore-aviation'],
    relatedBlogs: ['beardmore-aviation-scottish-industrial-giant'],
    keyFigures: ['William Beardmore'],
    aircraftTypes: ['Sopwith Pup', 'Sopwith Camel', 'Beardmore WB series'],
    technicalDetails: 'Major production facility for British military aircraft during WWI'
  },
  {
    year: 1914,
    title: 'Great War Aviation Begins',
    description: 'The outbreak of World War I transforms Scottish aviation from experimental activities to large-scale military production. Clydeside becomes a major center for aircraft and aero-engine manufacturing.',
    category: 'Military',
    location: 'Clydeside, Scotland',
    significance: 'Beginning of industrial-scale aviation manufacturing in Scotland',
    era: 'WWI',
    relatedBooks: ['clydeside-aviation-vol1', 'british-aircraft-great-war'],
    relatedBlogs: ['clydeside-aviation-revolution', 'british-aircraft-great-war-rfc-rnas'],
    keyFigures: ['William Beardmore'],
    aircraftTypes: ['Military aircraft production'],
    technicalDetails: 'Transformation from experimental to industrial aviation'
  },
  {
    year: 1917,
    title: 'HMS Argus Aircraft Carrier',
    description: 'HMS Argus, the world\'s first true aircraft carrier with a full-length flight deck, is completed at Beardmore\'s Dalmuir shipyard. Originally started as the Italian liner Conte Rosso.',
    category: 'Manufacturing',
    location: 'Dalmuir, Scotland',
    significance: 'World\'s first true aircraft carrier launched from Scotland',
    era: 'WWI',
    relatedBooks: ['aircraft-carrier-argus'],
    relatedBlogs: ['hms-argus-first-aircraft-carrier', 'hms-argus-first-aircraft-carrier-operations'],
    keyFigures: ['Marquis of Montrose'],
    aircraftTypes: ['Carrier aircraft'],
    technicalDetails: 'Full-length flight deck design, revolutionary for naval aviation'
  },
  {
    year: 1919,
    title: 'Inter-War Aviation Development',
    description: 'Post-war period sees continued aviation development in Scotland with focus on commercial aviation, airship development, and advanced aircraft design.',
    category: 'Commercial',
    location: 'Scotland',
    significance: 'Transition from military to commercial aviation focus',
    era: 'Inter-War',
    relatedBooks: ['clydeside-aviation-vol2'],
    relatedBlogs: ['clydeside-aviation-revolution'],
    keyFigures: ['Various Scottish aviation pioneers'],
    aircraftTypes: ['Commercial aircraft', 'Airships'],
    technicalDetails: 'Development of civilian aviation infrastructure and manufacturing'
  },
  {
    year: 1923,
    title: 'Early Scottish Civil Aviation Routes Established',
    description: 'Post-war demobilization enables small commercial air services linking Scottish cities with England and Europe.',
    category: 'Commercial',
    location: 'Glasgow/Edinburgh – London/Europe',
    significance: 'Lays groundwork for regular scheduled civil aviation to/from Scotland',
    era: 'Inter-War',
    relatedBlogs: ['naval-aviation-history']
  },
  {
    year: 1935,
    title: 'Scottish Helicopter Pioneer Work',
    description: 'Early helicopter development work begins in Scotland, contributing to the global advancement of rotorcraft technology that would later influence military and civilian applications.',
    category: 'Innovation',
    location: 'Scotland',
    significance: 'Scottish contribution to early helicopter development',
    era: 'Inter-War',
    relatedBooks: ['sycamore-seeds'],
    relatedBlogs: ['helicopter-development-pioneers', 'bristol-sycamore-helicopter-development'],
    keyFigures: ['Helicopter pioneers'],
    aircraftTypes: ['Early helicopters'],
    technicalDetails: 'Experimental rotorcraft development and testing'
  },
  {
    year: 1937,
    title: 'Scottish Contribution to Schneider Trophy Legacy',
    description: 'Engineering and manufacturing skills in Scotland contribute to high-speed research that feeds into later fighter development.',
    category: 'Innovation',
    location: 'Clydeside & UK',
    significance: 'Performance research influences advanced fighters ahead of WWII',
    era: 'Inter-War',
    relatedBlogs: ['schneider-trophy-racing-development']
  },
  {
    year: 1940,
    title: 'WWII Aviation Production',
    description: 'Scotland plays a crucial role in WWII aviation production, manufacturing key aircraft types and supporting the war effort through innovative engineering and production techniques.',
    category: 'Military',
    location: 'Scotland',
    significance: 'Major contribution to Allied victory through aviation manufacturing',
    era: 'WWII-Cold-War',
    relatedBooks: ['british-aircraft-great-war'],
    relatedBlogs: ['british-aircraft-great-war-rfc-rnas'],
    keyFigures: ['Scottish aviation workers'],
    aircraftTypes: ['WWII military aircraft'],
    technicalDetails: 'Mass production of military aircraft during WWII'
  },
  {
    year: 1945,
    title: 'Post-war Demobilisation and Factory Conversion',
    description: 'Scottish aviation plants transition from wartime production to peacetime manufacturing and maintenance.',
    category: 'Manufacturing',
    location: 'Clydeside, Scotland',
    significance: 'Preserves skilled workforce and infrastructure for jet age requirements',
    era: 'WWII-Cold-War',
    relatedBlogs: ['luftwaffe-1945-final-year']
  },
  {
    year: 1950,
    title: 'Jet Age Training and RAF Expansion Support',
    description: 'Scottish airfields and engineering facilities support the introduction of jet aircraft and expanded RAF training programmes.',
    category: 'Military',
    location: 'Various Scottish airfields',
    significance: 'Accelerates UK transition to jet-powered air forces',
    era: 'WWII-Cold-War',
    relatedBlogs: ['jet-age-aviation-cold-war-development', 'f86-sabre-cold-war-fighter']
  },
  {
    year: 1952,
    title: 'V-Force Nuclear Deterrent',
    description: 'British nuclear deterrent strategy begins with V-Force bomber development. Scottish aviation industry contributes to strategic bomber and missile programs.',
    category: 'Military',
    location: 'Britain (Scottish involvement)',
    significance: 'Beginning of nuclear age aviation strategy',
    era: 'WWII-Cold-War',
    relatedBooks: ['sonic-to-standoff'],
    relatedBlogs: ['british-nuclear-deterrent-v-force'],
    keyFigures: ['V-Force personnel'],
    aircraftTypes: ['Strategic bombers', 'Nuclear delivery systems'],
    technicalDetails: 'Development of nuclear deterrent aviation capabilities'
  },
  {
    year: 1954,
    title: 'Hawker Hunter and Early Jet Operations Influence',
    description: 'Operational lessons and manufacturing support in Scotland contribute to maturing jet tactics and maintenance.',
    category: 'Military',
    location: 'Scotland/UK',
    significance: 'Feeds Cold War readiness and standardisation of jet maintenance practices',
    era: 'WWII-Cold-War',
    relatedBlogs: ['english-electric-lightning-development']
  },
  {
    year: 1960,
    title: 'Helicopter Operations Expand in Scotland',
    description: 'Rotary-wing operations grow for rescue, maritime, and offshore roles—benefitting from earlier rotorcraft research.',
    category: 'Innovation',
    location: 'Scotland',
    significance: 'Establishes helicopter capability in challenging North Atlantic conditions',
    era: 'WWII-Cold-War',
    relatedBooks: ['sycamore-seeds'],
    relatedBlogs: ['sycamore-seeds-helicopter-evolution']
  },
  {
    year: 1970,
    title: 'Regional Air Services and Aerospace Supply Chain',
    description: 'Regional airlines and component suppliers maintain Scottish aerospace relevance amid UK industry consolidations.',
    category: 'Commercial',
    location: 'Scotland',
    significance: 'Keeps skilled labour and SMEs engaged within the UK aerospace ecosystem',
    era: 'WWII-Cold-War'
  },
  {
    year: 1990,
    title: 'Modern Aerospace Era',
    description: 'Formation of modern aerospace companies and transition to high-tech aviation manufacturing in Scotland, including satellite technology and advanced materials.',
    category: 'Commercial',
    location: 'Scotland',
    significance: 'Transition to modern aerospace manufacturing',
    era: 'Modern',
    relatedBooks: ['sonic-to-standoff'],
    keyFigures: ['Modern aerospace engineers'],
    aircraftTypes: ['Modern aircraft', 'Aerospace technology'],
    technicalDetails: 'Advanced materials and satellite technology development'
  },
  {
    year: 2000,
    title: 'Modernisation of Airfields and Training Technology',
    description: 'Investment in navigation, simulators, and safety systems modernise Scottish aviation infrastructure.',
    category: 'Infrastructure',
    location: 'Scotland',
    significance: 'Improves safety and throughput for commercial and private aviation',
    era: 'Modern'
  },
  {
    year: 2010,
    title: 'Growth in Space & Advanced Materials Research',
    description: 'Scottish universities and companies expand R&D in satellites, composites, and propulsion.',
    category: 'Research',
    location: 'Glasgow & across Scotland',
    significance: 'Positions Scotland within the UK’s space economy and advanced aerospace supply chain',
    era: 'Modern',
    relatedBooks: ['sonic-to-standoff']
  },
  {
    year: 2025,
    title: 'Aviation Heritage Documentation',
    description: 'Charles E. MacKay\'s comprehensive documentation of Scottish aviation history through 19 published books preserves 130 years of Scottish aviation heritage for future generations.',
    category: 'Research',
    location: 'Glasgow, Scotland',
    significance: 'Preservation of Scottish aviation heritage through definitive historical documentation',
    era: 'Modern',
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1', 'clydeside-aviation-vol2', 'soaring-with-wings', 'sycamore-seeds', 'sonic-to-standoff'],
    keyFigures: ['Charles E. MacKay'],
    technicalDetails: '19 published books documenting 130 years of aviation history'
  }
];

const categories = [...new Set(timelineEvents.map(event => event.category))];
const eras = [...new Set(timelineEvents.map(event => event.era))];

const eraColors = {
  'Pioneer': 'from-amber-700 to-amber-900',
  'WWI': 'from-red-700 to-red-900',
  'Inter-War': 'from-green-700 to-green-900',
  'WWII-Cold-War': 'from-blue-700 to-blue-900',
  'Modern': 'from-purple-700 to-purple-900'
};

const categoryIcons = {
  'Innovation': '🔬',
  'Manufacturing': '🏭',
  'Military': '⚔️',
  'Commercial': '✈️',
  'Infrastructure': '🏗️',
  'Personnel': '👥',
  'International': '🌍',
  'Research': '📚'
};

export default function ScottishAviationTimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedEra && event.era !== selectedEra) return false;
    if (selectedCategory && event.category !== selectedCategory) return false;
    return true;
  });

  const toAddress = (loc: string) => {
    let locality = loc;
    if (locality.includes(',')) locality = locality.split(',')[0].trim();
    if (locality.includes('–')) locality = locality.split('–')[0].trim();
    if (locality.includes('-')) locality = locality.split('-')[0].trim();
    return {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: 'Scotland',
      addressCountry: 'GB'
    };
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HistoricalTimeline",
    "name": "Scottish Aviation Timeline",
    "description": "Comprehensive timeline of Scottish aviation history from 1895 to present day",
    "url": "https://charlesmackaybooks.com/scottish-aviation-timeline",
    "author": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "jobTitle": "Aviation Historian"
    },
    "events": timelineEvents.map(event => ({
      "@type": "Event",
      "name": event.title,
      "startDate": `${event.year}-01-01`,
      "endDate": `${event.year}-12-31`,
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": event.location,
        "address": toAddress(event.location)
      },
      "description": event.description,
      "performer": {
        "@type": "Person",
        "name": event.keyFigures?.[0] || "Scottish Aviation Pioneers"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": "https://charlesmackaybooks.com/scottish-aviation-timeline"
      },
      organizer: {
        "@type": "Person",
        "name": "Charles E. MacKay",
        "url": "https://charlesmackaybooks.com/about"
      }
    }))
  };

  const getBookCoverSrc = (bookId: string) => `/book-covers/${bookId}.jpg`;
  const getBlogImageSrc = (slug: string) => {
    const map: Record<string, string> = {
      'beardmore-aviation-scottish-industrial-giant': 'beardmore-aviation-scottish-industrial-giant',
      'clydeside-aviation-revolution': 'clydeside-aviation-revolution',
      'percy-pilcher-scotland-aviation-pioneer': 'percy-pilcher-scotland-aviation-pioneer',
      'hms-argus-first-aircraft-carrier': 'hms-argus-first-aircraft-carrier',
      'hms-argus-first-aircraft-carrier-operations': 'hms-argus-first-aircraft-carrier-operations',
      'british-aircraft-great-war-rfc-rnas': 'british-aircraft-great-war-rfc-rnas',
      'schneider-trophy-racing-development': 'schneider-trophy-racing-development',
      'luftwaffe-1945-final-year': 'luftwaffe-1945-final-year',
      'jet-age-aviation-cold-war-development': 'jet-age-aviation-cold-war-development',
      'f86-sabre-cold-war-fighter': 'f86-sabre-cold-war-fighter',
      'english-electric-lightning-development': 'english-electric-lightning-development',
      'sycamore-seeds-helicopter-evolution': 'sycamore-seeds-helicopter-evolution',
    };
    const base = map[slug] || slug;
    return `/blog-images/${base}.jpg`;
  };

  return (
    <BBCPageTemplate
      title="Scottish Aviation Timeline"
      subtitle="From Percy Pilcher's pioneering gliders to modern aerospace – 130 years of Scottish aviation history."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Scottish Aviation Timeline' }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">
        {/* Era Navigation */}
        <div className="max-w-5xl mx-auto mb-10">
          <h2 className="text-white text-center mb-4">Explore by Era</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(selectedEra === era ? null : era)}
                className={`px-3 py-2 rounded border border-white/30 text-sm hover:bg-white/10 ${selectedEra === era ? 'bg-white/10' : ''}`}
              >
                {era.replace('-', ' & ')}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-center mb-3">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-3 py-2 rounded border border-white/30 text-sm hover:bg-white/10 ${selectedCategory === category ? 'bg-white/10' : ''}`}
              >
                {category}
              </button>
            ))}
            {(selectedEra || selectedCategory) && (
              <button
                onClick={() => { setSelectedEra(null); setSelectedCategory(null); }}
                className="px-3 py-2 rounded border border-white/40 text-sm hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white text-center mb-8">Historical Timeline</h2>
          <div className="space-y-6">
            {filteredEvents
              .sort((a, b) => a.year - b.year)
              .map((event, index) => (
              <article key={`${event.year}-${index}`} className="border border-white/15 rounded-xl p-6 bg-black/10">
                <header className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{event.year}</h3>
                    <div className="text-sm opacity-80">{event.category}</div>
                  </div>
                  <h4 className="text-lg mt-1 font-bold">{event.title}</h4>
                  <div className="text-sm opacity-80">📍 {event.location}</div>
                </header>
                <p className="opacity-90 mb-4">{event.description}</p>
                <div className="mb-4">
                  <div className="font-bold mb-1">Historical Significance</div>
                  <p className="opacity-90">{event.significance}</p>
                </div>
                {event.technicalDetails && (
                  <div className="mb-4">
                    <div className="font-bold mb-1">Technical Details</div>
                    <p className="opacity-90">{event.technicalDetails}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {event.relatedBooks && event.relatedBooks.length > 0 && (
                    <div>
                      <div className="font-bold mb-2">Related Books</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {event.relatedBooks.map((bookId) => (
                          <Link key={bookId} href={`/books/${bookId}`} className="group block">
                            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/15 bg-black/20">
                              <Image src={getBookCoverSrc(bookId)} alt={bookId} fill sizes="(max-width:768px) 50vw, 200px" className="object-cover group-hover:scale-[1.02] transition-transform" />
                            </div>
                            <div className="mt-2 underline">View Book →</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {event.relatedBlogs && event.relatedBlogs.length > 0 && (
                    <div>
                      <div className="font-bold mb-2">Related Articles</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {event.relatedBlogs.map((blogId) => (
                          <Link key={blogId} href={`/blog/${blogId}`} className="group block">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/15 bg-black/20">
                              <Image src={getBlogImageSrc(blogId)} alt={blogId} fill sizes="(max-width:768px) 50vw, 300px" className="object-cover group-hover:scale-[1.02] transition-transform" />
                            </div>
                            <div className="mt-2 underline">Read Article →</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {(event.keyFigures || event.aircraftTypes) && (
                  <div className="mt-4 pt-3 border-t border-white/10 grid md:grid-cols-2 gap-3 text-sm">
                    {event.keyFigures && (
                      <div>
                        <span className="opacity-80 font-semibold">Key Figures:</span>
                        <div>{event.keyFigures.join(', ')}</div>
                      </div>
                    )}
                    {event.aircraftTypes && (
                      <div>
                        <span className="opacity-80 font-semibold">Aircraft Types:</span>
                        <div>{event.aircraftTypes.join(', ')}</div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Book Collection CTA */}
        <div className="mt-16 border border-white/15 rounded-2xl p-8 text-white text-center bg-black/10">
          <h2 className="text-3xl font-bold mb-4">Complete Aviation History Collection</h2>
          <p className="text-xl mb-6 opacity-90">
            Explore the full story through Charles E. MacKay's comprehensive collection of aviation history books
          </p>
          <Link href="/books" className="inline-block underline">
            Browse All 19 Books →
          </Link>
        </div>
        </div>
      </div>
    </BBCPageTemplate>
  );
}