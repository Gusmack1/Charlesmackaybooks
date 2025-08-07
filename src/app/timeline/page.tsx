import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviation History Timeline | Chronological Development | Charles E. MacKay',
  description: 'Comprehensive timeline of aviation history from the Wright Brothers to modern aircraft. Key milestones, breakthrough technologies, and influential figures in aviation development.',
  keywords: [
    'aviation history timeline',
    'aviation chronology',
    'aircraft development history',
    'aviation milestones',
    'flight history',
    'aviation pioneers',
    'aircraft evolution',
    'aviation technology timeline',
    'military aviation history',
    'commercial aviation timeline'
  ],
  openGraph: {
    title: 'Aviation History Timeline | Chronological Development',
    description: 'Comprehensive timeline of aviation history from early flight to modern aircraft development.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/timeline'
  },
}

export default function TimelinePage() {
  const timelineEvents = [
    {
      period: '1783-1903',
      title: 'Early Flight Experiments',
      description: 'From hot air balloons to gliders, the foundations of flight',
      events: [
        '1783: Montgolfier Brothers - First hot air balloon flight',
        '1853: George Cayley - First successful glider carrying a person',
        '1896: Otto Lilienthal - Systematic gliding experiments',
        '1903: Wright Brothers - First powered flight at Kitty Hawk'
      ]
    },
    {
      period: '1904-1914',
      title: 'Pioneer Era',
      description: 'Early aviation development and the first practical aircraft',
      events: [
        '1906: Santos-Dumont - First public powered flight in Europe',
        '1909: Blériot - First flight across the English Channel',
        '1910: Brooklands - First aviation meeting in Britain',
        '1914: First scheduled airline service begins'
      ]
    },
    {
      period: '1914-1918',
      title: 'World War I Aviation',
      description: 'Military aviation development during the Great War',
      events: [
        '1914: Formation of Royal Flying Corps and Royal Naval Air Service',
        '1915: Fokker Eindecker introduces interrupter gear',
        '1917: Formation of Royal Air Force',
        '1918: Strategic bombing campaigns begin'
      ]
    },
    {
      period: '1919-1939',
      title: 'Golden Age',
      description: 'Between the wars: record breaking and commercial development',
      events: [
        '1919: First transatlantic flight by Alcock and Brown',
        '1927: Lindbergh\'s solo Atlantic crossing',
        '1930: Amy Johnson flies solo to Australia',
        '1935: First radar experiments begin'
      ]
    },
    {
      period: '1939-1945',
      title: 'World War II',
      description: 'Aviation reaches maturity in global conflict',
      events: [
        '1940: Battle of Britain',
        '1942: First operational jet aircraft (Me 262)',
        '1944: V-1 and V-2 missiles deployed',
        '1945: Nuclear weapons delivered by air'
      ]
    },
    {
      period: '1945-1970',
      title: 'Jet Age',
      description: 'Transition to jet propulsion and supersonic flight',
      events: [
        '1947: Chuck Yeager breaks sound barrier',
        '1952: De Havilland Comet - First jet airliner',
        '1957: Sputnik launches space age',
        '1969: Concorde supersonic airliner first flight'
      ]
    },
    {
      period: '1970-Present',
      title: 'Modern Aviation',
      description: 'Digital age, efficiency improvements, and space tourism',
      events: [
        '1970: Boeing 747 jumbo jet enters service',
        '1981: First Space Shuttle flight',
        '1988: Fly-by-wire technology becomes standard',
        '2004: SpaceShipOne wins X Prize for private spaceflight'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Aviation History Timeline
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A comprehensive chronological journey through the development of aviation
          </p>
          <div className="mt-6">
            <Link
              href="/scottish-aviation-timeline"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors mr-4"
            >
              🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Aviation Timeline
            </Link>
            <Link
              href="/books"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              📚 Browse Aviation Books
            </Link>
          </div>
        </header>

        {/* Timeline */}
        <section className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-300"></div>

          <div className="space-y-12">
            {timelineEvents.map((period, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 border-4 border-white rounded-full shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {period.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{period.title}</h3>
                    <p className="text-gray-600 mb-4">{period.description}</p>
                    <ul className="space-y-2">
                      {period.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="flex items-start text-sm text-gray-700">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Explore Aviation History in Detail</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover comprehensive books covering each era of aviation development, 
              written by aviation historian Charles E. MacKay with unprecedented detail and analysis.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Link href="/category/wwi-aviation" className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors">
                <h3 className="font-semibold text-red-800 mb-2">WWI Aviation</h3>
                <p className="text-sm text-red-600">Great War aircraft and development</p>
              </Link>
              <Link href="/category/wwii-aviation" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">WWII Aviation</h3>
                <p className="text-sm text-blue-600">World War II aircraft and operations</p>
              </Link>
              <Link href="/category/jet-age-aviation" className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-purple-800 mb-2">Jet Age</h3>
                <p className="text-sm text-purple-600">Modern aviation development</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}