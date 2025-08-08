'use client';

import PageSEO from '@/components/PageSEO'
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useState } from 'react';

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
  'Pioneer': 'from-amber-400 to-orange-500',
  'WWI': 'from-red-400 to-red-600',
  'Inter-War': 'from-green-400 to-green-600',
  'WWII-Cold-War': 'from-blue-400 to-blue-600',
  'Modern': 'from-purple-400 to-purple-600'
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
      "location": {
        "@type": "Place",
        "name": event.location
      },
      "description": event.description
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto container-padding section-padding">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-block badge badge-blue px-6 py-2 rounded-full text-sm font-semibold mb-4">
              🏴󠁧󠁢󠁳󠁣󠁴󠁿 130 Years of Scottish Aviation Heritage
            </div>
            <h1 className="text-primary">
              Scottish Aviation Timeline
            </h1>
            <p className="text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
              From Percy Pilcher's pioneering glider experiments in 1895 to modern aerospace innovation. 
              Discover the remarkable story of Scottish aviation through comprehensive historical documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="card">
                <span className="text-2xl font-bold text-accent-blue">{timelineEvents.length}</span>
                <span className="text-secondary ml-2">Historical Events</span>
              </div>
              <div className="card">
                <span className="text-2xl font-bold text-accent-green">130</span>
                <span className="text-secondary ml-2">Years Covered</span>
              </div>
              <div className="card">
                <span className="text-2xl font-bold text-accent-amber">19</span>
                <span className="text-secondary ml-2">Related Books</span>
              </div>
            </div>
          </div>

          {/* Era Navigation */}
          <div className="mb-12">
            <h2 className="text-primary mb-6 text-center">Explore by Historical Era</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(selectedEra === era ? null : era)}
                  className={`relative overflow-hidden rounded-xl p-6 text-white font-semibold transition-all duration-300 transform hover:scale-105 badge badge-blue ${
                    selectedEra === era ? 'ring-4 ring-accent-blue scale-105' : ''
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-lg font-bold mb-1">{era.replace('-', ' & ')}</div>
                    <div className="text-sm opacity-90">
                      {timelineEvents.filter(e => e.era === era).length} events
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {era === 'Pioneer' && '1895-1914'}
                      {era === 'WWI' && '1914-1918'}
                      {era === 'Inter-War' && '1918-1939'}
                      {era === 'WWII-Cold-War' && '1939-1991'}
                      {era === 'Modern' && '1991-Present'}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  <span className="mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                  {category}
                  <span className="ml-2 text-xs">
                    ({timelineEvents.filter(e => e.category === category).length})
                  </span>
                </button>
              ))}
            </div>
            {(selectedEra || selectedCategory) && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setSelectedEra(null);
                    setSelectedCategory(null);
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            <h2 className="text-primary mb-8 text-center">Historical Timeline</h2>
            
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 hidden lg:block"></div>

            <div className="space-y-8">
              {filteredEvents
                .sort((a, b) => a.year - b.year)
                .map((event, index) => (
                  <div key={`${event.year}-${index}`} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg hidden lg:block z-10">
                      <div className="absolute inset-1 bg-blue-500 rounded-full"></div>
                    </div>

                    {/* Event Card */}
                    <div className="lg:ml-20 card card-large">
                      {/* Card Header */}
                      <div className={`bg-gradient-to-r ${eraColors[event.era]} p-6 text-white`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-3xl font-bold text-white">{event.year}</h3>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium text-white">
                            {categoryIcons[event.category]} {event.category}
                          </span>
                        </div>
                        <h4 className="text-xl font-semibold mb-2 text-white">{event.title}</h4>
                        <div className="text-sm opacity-90 text-white">📍 {event.location}</div>
                      </div>

                      {/* Card Content */}
                      <div className="content">
                        <p>{event.description}</p>
                        
                        {/* Significance */}
                        <div className="card-compact bg-accent-blue text-white mb-6">
                          <h5 className="font-semibold mb-2 text-white">Historical Significance:</h5>
                          <p className="text-white">{event.significance}</p>
                        </div>

                        {/* Technical Details */}
                        {event.technicalDetails && (
                          <div className="card-compact bg-gray-50 mb-6">
                            <h5 className="font-semibold text-primary mb-2">Technical Details:</h5>
                            <p className="text-secondary">{event.technicalDetails}</p>
                          </div>
                        )}

                        {/* Related Content */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Related Books */}
                          {event.relatedBooks && event.relatedBooks.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-primary mb-3">📚 Related Books:</h5>
                              <div className="space-y-2">
                                {event.relatedBooks.map((bookId) => (
                                  <Link
                                    key={bookId}
                                    href={`/books/${bookId}`}
                                    className="block card-compact bg-accent-green text-white hover:opacity-90 transition-colors group"
                                  >
                                    <div className="text-white font-medium">
                                      📖 View Book →
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Related Blog Posts */}
                          {event.relatedBlogs && event.relatedBlogs.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-primary mb-3">📝 Related Articles:</h5>
                              <div className="space-y-2">
                                {event.relatedBlogs.map((blogId) => (
                                  <Link
                                    key={blogId}
                                    href={`/blog/${blogId}`}
                                    className="block card-compact bg-accent-blue text-white hover:opacity-90 transition-colors group"
                                  >
                                    <div className="text-white font-medium">
                                      📰 Read Article →
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Key Figures & Aircraft */}
                        {(event.keyFigures || event.aircraftTypes) && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              {event.keyFigures && (
                                <div>
                                  <span className="font-medium text-muted">Key Figures:</span>
                                  <div className="text-secondary">{event.keyFigures.join(', ')}</div>
                                </div>
                              )}
                              {event.aircraftTypes && (
                                <div>
                                  <span className="font-medium text-muted">Aircraft Types:</span>
                                  <div className="text-secondary">{event.aircraftTypes.join(', ')}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Book Collection CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Complete Aviation History Collection</h2>
            <p className="text-xl mb-6 opacity-90">
              Explore the full story through Charles E. MacKay's comprehensive collection of aviation history books
            </p>
            <Link
              href="/books"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All 19 Books →
            </Link>
          </div>
        </div>
        {/* Footer removed to avoid duplication; provided by root layout */}
      </div>
    </>
  );
}