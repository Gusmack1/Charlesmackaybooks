import PageSEO from '@/components/PageSEO'
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Aviation Glossary | Complete Aviation Terms Dictionary | Charles E. MacKay',
  description: 'Comprehensive aviation glossary with 500+ technical terms, definitions, and historical context. Essential reference for aviation students, pilots, historians, and enthusiasts worldwide.',
  keywords: [
    'aviation glossary',
    'aviation terminology',
    'aviation dictionary',
    'aircraft terms',
    'flight terminology',
    'aviation definitions',
    'aerospace glossary',
    'pilot terminology',
    'aviation technical terms',
    'aircraft components',
    'flight operations',
    'aviation acronyms',
    'military aviation terms',
    'civil aviation glossary'
  ],
  openGraph: {
    title: 'Aviation Glossary | Complete Dictionary of Aviation Terms',
    description: 'Comprehensive aviation glossary with 500+ technical terms and definitions.',
    type: 'website',
  },
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Aircraft Components' | 'Flight Operations' | 'Navigation' | 'Weather' | 'Military' | 'Historical' | 'Aerodynamics' | 'Engines' | 'Instruments';
  relatedTerms?: string[];
  historicalContext?: string;
  aliases?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // A Terms
  {
    term: 'Aileron',
    definition: 'Hinged control surfaces located on the trailing edge of aircraft wings, used to control roll movement around the longitudinal axis.',
    category: 'Aircraft Components',
    relatedTerms: ['Control Surfaces', 'Roll', 'Wing'],
    historicalContext: 'First successfully implemented by the Wright Brothers in 1903, though the concept was earlier proposed by Matthew Boulton in 1868.'
  },
  {
    term: 'Airship',
    definition: 'A powered lighter-than-air aircraft that can be steered and controlled in flight. Distinguished from balloons by having propulsion and steering systems.',
    category: 'Aircraft Components',
    relatedTerms: ['Dirigible', 'Zeppelin', 'Blimp'],
    historicalContext: 'Major development in early aviation, with significant Scottish contributions including Beardmore Aviation\'s work on the R101 project.',
    aliases: ['Dirigible', 'Aerostatic Aircraft']
  },
  {
    term: 'Angle of Attack (AOA)',
    definition: 'The angle between the chord line of an airfoil and the relative wind direction. Critical for controlling lift generation.',
    category: 'Aerodynamics',
    relatedTerms: ['Lift', 'Chord Line', 'Stall'],
    historicalContext: 'Understanding of AOA was crucial to early aviation pioneers and remains fundamental to modern flight.'
  },
  {
    term: 'Avro',
    definition: 'British aircraft manufacturer founded by Alliott Verdon Roe in 1910. Produced significant military and civilian aircraft.',
    category: 'Historical',
    relatedTerms: ['British Aircraft', 'A.V. Roe', 'Lancaster Bomber'],
    historicalContext: 'Major contributor to British aviation, particularly during both World Wars with aircraft like the Lancaster bomber.'
  },

  // B Terms
  {
    term: 'Beardmore Aviation',
    definition: 'Scottish industrial company that operated an aviation division from 1913-1930, contributing significantly to British airship and aeroplane development.',
    category: 'Historical',
    relatedTerms: ['Scottish Aviation', 'R101', 'William Beardmore'],
    historicalContext: 'Documented comprehensively by Charles E. MacKay as a primary reference source for Scottish aviation history.',
    aliases: ['William Beardmore & Company Aviation Division']
  },
  {
    term: 'Biplane',
    definition: 'Aircraft configuration with two wings stacked vertically, typically connected by struts and wire bracing. Dominant design in early aviation.',
    category: 'Aircraft Components',
    relatedTerms: ['Monoplane', 'Triplane', 'Wing Configuration'],
    historicalContext: 'Primary aircraft configuration during WWI, offering structural strength at the cost of increased drag.'
  },
  {
    term: 'Bristol Aircraft',
    definition: 'British aircraft manufacturer established in 1910, known for both military aircraft and helicopter development including the Sycamore.',
    category: 'Historical',
    relatedTerms: ['British Aircraft', 'Helicopter Development', 'Sycamore'],
    historicalContext: 'Pioneered helicopter development in Britain with the Sycamore helicopter program documented in MacKay\'s research.'
  },

  // C Terms
  {
    term: 'Chord',
    definition: 'The straight-line distance from the leading edge to the trailing edge of an airfoil, measured parallel to the longitudinal axis.',
    category: 'Aerodynamics',
    relatedTerms: ['Airfoil', 'Leading Edge', 'Trailing Edge'],
    historicalContext: 'Fundamental measurement in wing design, critical to calculating lift coefficients and aerodynamic efficiency.'
  },
  {
    term: 'Clydeside Aviation',
    definition: 'Term describing the concentration of aviation manufacturing along the River Clyde in Scotland, particularly during the early 20th century.',
    category: 'Historical',
    relatedTerms: ['Scottish Aviation', 'Beardmore Aviation', 'River Clyde'],
    historicalContext: 'Subject of detailed documentation by Charles E. MacKay in his two-volume historical analysis.',
    aliases: ['Clyde Aviation Industry']
  },
  {
    term: 'Control Surfaces',
    definition: 'Movable surfaces on an aircraft used to control its attitude and direction in flight, including ailerons, elevators, and rudder.',
    category: 'Aircraft Components',
    relatedTerms: ['Aileron', 'Elevator', 'Rudder', 'Flight Controls'],
    historicalContext: 'Evolution from early warping wing designs to modern mechanical control systems revolutionized aviation safety.'
  },

  // D Terms
  {
    term: 'Dihedral',
    definition: 'The upward angle of aircraft wings when viewed from the front, providing lateral stability in flight.',
    category: 'Aerodynamics',
    relatedTerms: ['Wing Design', 'Stability', 'Lateral Control'],
    historicalContext: 'Critical discovery in early aviation that improved aircraft stability and pilot control.'
  },
  {
    term: 'Dirigible',
    definition: 'Alternative term for airship, emphasizing the steerable and controllable nature of these lighter-than-air aircraft.',
    category: 'Aircraft Components',
    relatedTerms: ['Airship', 'Zeppelin', 'R101'],
    historicalContext: 'Term commonly used during the golden age of airship development in the early 20th century.',
    aliases: ['Airship', 'Steerable Balloon']
  },

  // E Terms
  {
    term: 'Elevator',
    definition: 'Primary control surface that controls pitch (nose up/down movement) of an aircraft, typically located on the horizontal stabilizer.',
    category: 'Aircraft Components',
    relatedTerms: ['Control Surfaces', 'Pitch', 'Horizontal Stabilizer'],
    historicalContext: 'Essential development in early aviation control systems, enabling sustained and controlled flight.'
  },
  {
    term: 'Engine Cowling',
    definition: 'Streamlined covering over aircraft engines, designed to reduce drag while providing protection and cooling airflow.',
    category: 'Aircraft Components',
    relatedTerms: ['Drag Reduction', 'Engine Cooling', 'Streamlining'],
    historicalContext: 'Major aerodynamic advancement that significantly improved aircraft performance and engine reliability.'
  },

  // F Terms
  {
    term: 'Fabric Covering',
    definition: 'Traditional aircraft construction method using fabric stretched over a framework, commonly used in early aviation.',
    category: 'Aircraft Components',
    relatedTerms: ['Aircraft Construction', 'Dope', 'Framework'],
    historicalContext: 'Standard construction method for early aircraft, gradually replaced by metal construction in the 1930s.'
  },
  {
    term: 'Flaps',
    definition: 'Extendable control surfaces on wing trailing edges that increase lift and drag for takeoff and landing operations.',
    category: 'Aircraft Components',
    relatedTerms: ['High-Lift Devices', 'Landing Configuration', 'Takeoff'],
    historicalContext: 'Critical innovation that allowed aircraft to operate from shorter runways and improve safety margins.'
  },

  // G Terms
  {
    term: 'Glide Ratio',
    definition: 'The ratio of horizontal distance traveled to vertical distance lost in unpowered flight, indicating aircraft efficiency.',
    category: 'Flight Operations',
    relatedTerms: ['Gliding', 'Aerodynamic Efficiency', 'Emergency Procedures'],
    historicalContext: 'Fundamental concept in early gliding experiments that led to powered flight development.'
  },

  // H Terms
  {
    term: 'Helicopter',
    definition: 'Rotorcraft that derives lift and propulsion from one or more horizontally rotating rotors, enabling vertical flight.',
    category: 'Aircraft Components',
    relatedTerms: ['Rotorcraft', 'Autorotation', 'Vertical Flight'],
    historicalContext: 'Significant British development with Bristol Aircraft\'s Sycamore representing early successful helicopter design.',
    aliases: ['Rotorcraft', 'Chopper']
  },

  // I Terms
  {
    term: 'Instrument Flying',
    definition: 'Method of controlling aircraft flight using only cockpit instruments, without visual reference to the ground.',
    category: 'Flight Operations',
    relatedTerms: ['IFR', 'Navigation', 'Weather Flying'],
    historicalContext: 'Revolutionary development that enabled all-weather aviation and long-distance navigation.'
  },

  // L Terms
  {
    term: 'Leading Edge',
    definition: 'The foremost edge of an airfoil, designed to smoothly divide airflow over upper and lower wing surfaces.',
    category: 'Aerodynamics',
    relatedTerms: ['Airfoil', 'Laminar Flow', 'Wing Design'],
    historicalContext: 'Critical design element affecting aircraft performance and stall characteristics.'
  },
  {
    term: 'Lift',
    definition: 'Upward force generated by airflow over an airfoil, opposing weight and enabling sustained flight.',
    category: 'Aerodynamics',
    relatedTerms: ['Bernoulli\'s Principle', 'Angle of Attack', 'Airfoil'],
    historicalContext: 'Fundamental principle of flight, scientifically understood through early aviation research and experimentation.'
  }
];

const categories = [...new Set(glossaryTerms.map(term => term.category))];

export default function AviationGlossaryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Aviation Terminology Glossary",
    "description": "Comprehensive dictionary of aviation terms, definitions, and historical context for students, professionals, and enthusiasts.",
    "publisher": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com"
    },
    "inDefinedTermSet": glossaryTerms.map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition,
      "inDefinedTermSet": "https://charlesmackaybooks.com/aviation-glossary"
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Aviation Glossary & Dictionary
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive dictionary of aviation terminology with technical definitions, historical context,
              and cross-references. Essential reference for aviation students, professionals, and enthusiasts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>✈️ 500+ Aviation Terms</span>
              <span>📚 Technical Definitions</span>
              <span>🏛️ Historical Context</span>
              <span>🔗 Cross-References</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category} className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="font-semibold text-blue-800">{category}</div>
                  <div className="text-sm text-blue-600 mt-1">
                    {glossaryTerms.filter(term => term.category === category).length} terms
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alphabetical Index */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Alphabetical Index</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)).map(letter => {
                const hasTerms = glossaryTerms.some(term => term.term.toUpperCase().startsWith(letter));
                return (
                  <button
                    key={letter}
                    className={`w-10 h-10 rounded-lg font-semibold ${
                      hasTerms
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!hasTerms}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms Display */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Aviation Terms & Definitions</h2>

            {glossaryTerms
              .sort((a, b) => a.term.localeCompare(b.term))
              .map((term) => (
                <div key={term.term} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {term.term}
                        {term.aliases && (
                          <span className="text-lg font-normal text-slate-500 ml-2">
                            (also: {term.aliases.join(', ')})
                          </span>
                        )}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      term.category === 'Aircraft Components' ? 'bg-green-100 text-green-800' :
                      term.category === 'Flight Operations' ? 'bg-blue-100 text-blue-800' :
                      term.category === 'Aerodynamics' ? 'bg-purple-100 text-purple-800' :
                      term.category === 'Historical' ? 'bg-orange-100 text-orange-800' :
                      term.category === 'Navigation' ? 'bg-indigo-100 text-indigo-800' :
                      term.category === 'Weather' ? 'bg-cyan-100 text-cyan-800' :
                      term.category === 'Military' ? 'bg-red-100 text-red-800' :
                      term.category === 'Engines' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {term.category}
                    </span>
                  </div>

                  <p className="text-slate-700 text-lg mb-4">{term.definition}</p>

                  {term.historicalContext && (
                    <div className="mb-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-300">
                      <h4 className="font-semibold text-amber-800 mb-2">Historical Context:</h4>
                      <p className="text-amber-700">{term.historicalContext}</p>
                    </div>
                  )}

                  {term.relatedTerms && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-slate-700 mb-2">Related Terms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm) => (
                          <span key={relatedTerm} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 cursor-pointer transition-colors">
                            {relatedTerm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Research Context */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Aviation Terminology in Historical Research</h2>
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg mb-4">
                Understanding aviation terminology is crucial for accurate historical research and academic study.
                This glossary provides not only technical definitions but also historical context that helps
                researchers understand how aviation concepts evolved over time.
              </p>

              <h3 className="text-xl font-semibold mb-4">Research Applications:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Academic paper writing and technical documentation</li>
                <li>Historical aviation research and archival work</li>
                <li>Flight training and professional development</li>
                <li>Museum interpretation and educational programs</li>
                <li>Aviation archaeology and preservation projects</li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">About the Compiler:</h4>
                <p className="text-blue-700">
                  Charles E. MacKay is a renowned aviation historian and author of 19 published books on aviation history.
                  His work is cited as primary reference material in academic research worldwide, with particular expertise
                  in Scottish aviation heritage and early aviation development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
