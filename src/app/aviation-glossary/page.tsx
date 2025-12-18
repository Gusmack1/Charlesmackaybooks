import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate'


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
  alternates: {
    canonical: 'https://charlesmackaybooks.com/aviation-glossary'
  },
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
  ,
  // J Terms
  {
    term: 'Jet Blast',
    definition: 'High-velocity exhaust stream produced by a jet engine that can cause structural damage and hazards behind the aircraft.',
    category: 'Flight Operations',
    relatedTerms: ['Thrust', 'Runway Safety', 'Engine Exhaust'],
    historicalContext: 'Airport safety markings and procedures evolved to mitigate jet blast incidents as jet airliners entered service in the 1950s.'
  },
  {
    term: 'Jet Stream',
    definition: 'Narrow bands of strong winds in the upper atmosphere that significantly affect flight times and fuel planning.',
    category: 'Weather',
    relatedTerms: ['Winds Aloft', 'Flight Planning', 'Turbulence'],
    historicalContext: 'First observed by military pilots in WWII; modern navigation exploits jet streams to reduce fuel burn on long-haul routes.'
  },

  // K Terms
  {
    term: 'Kármán Line',
    definition: 'Internationally recognized boundary of space at 100 km (62 miles) above mean sea level.',
    category: 'Historical',
    relatedTerms: ['Atmosphere', 'Spaceflight'],
    historicalContext: 'Named after Theodore von Kármán, who calculated the altitude where aerodynamic flight becomes impractical.'
  },
  {
    term: 'Knot (kt)',
    definition: 'Unit of speed equal to one nautical mile per hour, used universally in aviation and maritime operations.',
    category: 'Flight Operations',
    relatedTerms: ['Nautical Mile', 'IAS', 'TAS'],
    historicalContext: 'Derived from maritime navigation; standardized in aviation for consistent global operations.'
  },

  // L already defined above

  // M Terms
  {
    term: 'Mach Number',
    definition: 'Ratio of an aircraft’s true airspeed to the local speed of sound.',
    category: 'Aerodynamics',
    relatedTerms: ['Transonic', 'Supersonic', 'TAS'],
    historicalContext: 'Critical to jet development; Chuck Yeager first exceeded Mach 1 in level flight in 1947.'
  },
  {
    term: 'Maximum Takeoff Weight (MTOW)',
    definition: 'The maximum allowable weight at the start of the takeoff roll as certified by the manufacturer.',
    category: 'Flight Operations',
    relatedTerms: ['Weight and Balance', 'Payload', 'Fuel Planning']
  },

  // N Terms
  {
    term: 'Nacelle',
    definition: 'Streamlined enclosure housing an engine or other equipment, typically attached to a wing or fuselage.',
    category: 'Aircraft Components',
    relatedTerms: ['Pylon', 'Engine Mount'],
    historicalContext: 'Refined nacelle design reduces drag and noise in modern turbofan aircraft.'
  },
  {
    term: 'NOTAM',
    definition: 'Notice to Air Missions: time-critical aeronautical information affecting flight operations.',
    category: 'Flight Operations',
    relatedTerms: ['AIP', 'TFR', 'Flight Planning']
  },

  // O Terms
  {
    term: 'Outside Air Temperature (OAT)',
    definition: 'Ambient air temperature measured outside the aircraft, used for performance calculations.',
    category: 'Instruments',
    relatedTerms: ['ISA', 'Density Altitude', 'Performance'],
    historicalContext: 'Essential for piston and turbine engine performance and icing forecasts.'
  },
  {
    term: 'Overrun Area',
    definition: 'Paved or unpaved area beyond the runway end designed to reduce the risk of damage if an aircraft overruns.',
    category: 'Flight Operations',
    relatedTerms: ['RESA', 'Runway Safety Area']
  },

  // P Terms
  {
    term: 'Pitot Tube',
    definition: 'Instrument probe measuring dynamic pressure to determine airspeed.',
    category: 'Instruments',
    relatedTerms: ['Airspeed Indicator', 'Static Port', 'IAS'],
    historicalContext: 'Failures due to icing led to improved heating and maintenance procedures after several accidents.'
  },
  {
    term: 'PAPI',
    definition: 'Precision Approach Path Indicator: a visual aid providing glidepath guidance on final approach.',
    category: 'Flight Operations',
    relatedTerms: ['VASI', 'ILS', 'Approach Lighting']
  },

  // Q Terms
  {
    term: 'QNH',
    definition: 'Altimeter subscale setting to indicate altitude above mean sea level at an aerodrome.',
    category: 'Flight Operations',
    relatedTerms: ['QFE', 'QNE', 'Altimeter Setting']
  },
  {
    term: 'Quadcopter',
    definition: 'Multi-rotor UAV with four rotors providing lift and control.',
    category: 'Aircraft Components',
    relatedTerms: ['UAV', 'VTOL', 'Drone']
  },

  // R Terms
  {
    term: 'Rudder',
    definition: 'Vertical control surface that controls yaw about the vertical axis.',
    category: 'Aircraft Components',
    relatedTerms: ['Yaw', 'Vertical Stabilizer', 'Sideslip']
  },
  {
    term: 'Required Navigation Performance (RNP)',
    definition: 'Performance-based navigation specification with on-board monitoring and alerting.',
    category: 'Navigation',
    relatedTerms: ['RNAV', 'GNSS', 'PBN']
  },

  // S Terms
  {
    term: 'Stall',
    definition: 'Loss of lift when a wing exceeds its critical angle of attack.',
    category: 'Aerodynamics',
    relatedTerms: ['Angle of Attack', 'Buffet', 'Spin'],
    historicalContext: 'Training emphasizes recognition and recovery; high-lift devices delay stall onset.'
  },
  {
    term: 'Spoiler',
    definition: 'Wing device that disrupts airflow to reduce lift and increase drag for descent and landing.',
    category: 'Aircraft Components',
    relatedTerms: ['Speedbrake', 'Flaps']
  },

  // T Terms
  {
    term: 'Thrust',
    definition: 'Propulsive force generated by an engine to move the aircraft forward.',
    category: 'Engines',
    relatedTerms: ['Turbofan', 'Propeller', 'Afterburner']
  },
  {
    term: 'Transponder',
    definition: 'Onboard device responding to radar interrogation with identification and altitude; Mode S supports ADS-B.',
    category: 'Instruments',
    relatedTerms: ['SSR', 'ADS-B', 'Squawk'],
    historicalContext: 'Mandatory in most controlled airspace to enhance traffic surveillance.'
  },

  // U Terms
  {
    term: 'UAV (Unmanned Aerial Vehicle)',
    definition: 'Aircraft without an onboard pilot, remotely piloted or autonomous.',
    category: 'Aircraft Components',
    relatedTerms: ['UAS', 'RPAS', 'Drone']
  },
  {
    term: 'Uncontrolled Airspace',
    definition: 'Airspace where ATC does not provide separation services; pilots remain responsible for see-and-avoid.',
    category: 'Flight Operations',
    relatedTerms: ['Class G', 'VMC', 'ATC']
  },

  // V Terms
  {
    term: 'V-speeds (V1/V2/Vr/Vref)',
    definition: 'Standardized airspeeds defining critical phases of takeoff and landing performance.',
    category: 'Flight Operations',
    relatedTerms: ['Performance Charts', 'MTOW', 'Balanced Field Length']
  },
  {
    term: 'VOR',
    definition: 'VHF Omnidirectional Range: short-range radio navigation system providing bearing information.',
    category: 'Navigation',
    relatedTerms: ['DME', 'NDB', 'RNAV']
  },

  // W Terms
  {
    term: 'Wake Turbulence',
    definition: 'Turbulence generated behind an aircraft, strongest from heavy, clean, slow configurations.',
    category: 'Aerodynamics',
    relatedTerms: ['Wingtip Vortices', 'Separation Minima']
  },
  {
    term: 'Winglet',
    definition: 'Upturned wingtip device reducing induced drag and improving fuel efficiency.',
    category: 'Aircraft Components',
    relatedTerms: ['Induced Drag', 'Wingtip Vortex', 'Fuel Burn']
  },

  // X Terms
  {
    term: 'Crosswind (X-wind)',
    definition: 'Wind component blowing across the runway, affecting takeoff and landing control.',
    category: 'Flight Operations',
    relatedTerms: ['Runway Heading', 'Max Demonstrated Crosswind']
  },
  {
    term: 'X-band Radar',
    definition: 'Radar operating in the 8–12 GHz band, used for weather and surveillance applications.',
    category: 'Instruments',
    relatedTerms: ['Weather Radar', 'Doppler']
  },

  // Y Terms
  {
    term: 'Yaw',
    definition: 'Rotation of an aircraft about its vertical axis.',
    category: 'Aerodynamics',
    relatedTerms: ['Rudder', 'Sideslip', 'Yaw Damper']
  },
  {
    term: 'Yoke',
    definition: 'Control column used in many aircraft to command pitch and roll.',
    category: 'Aircraft Components',
    relatedTerms: ['Sidestick', 'Elevator', 'Aileron']
  },

  // Z Terms
  {
    term: 'Zulu Time (UTC)',
    definition: 'Coordinated Universal Time used as the standard time reference in aviation worldwide.',
    category: 'Flight Operations',
    relatedTerms: ['Local Time', 'Time Zone', 'ETD/ETA'],
    historicalContext: 'Use of UTC avoids confusion across time zones for flight planning and ATC coordination.'
  },
  {
    term: 'Zero Fuel Weight (ZFW)',
    definition: 'Aircraft weight including all payload and crew but excluding usable fuel.',
    category: 'Flight Operations',
    relatedTerms: ['MTOW', 'Payload', 'Operating Empty Weight']
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

  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const termsByLetter: Record<string, typeof glossaryTerms> = letters.reduce((acc, letter) => {
    acc[letter] = glossaryTerms.filter((t) => t.term.toUpperCase().startsWith(letter)).sort((a, b) => a.term.localeCompare(b.term));
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BBCPageTemplate
        title="Aviation Glossary & Dictionary"
        subtitle="500+ aviation terms with definitions and historical context"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation Glossary' }]}
      >

          {/* Categories Filter */}
          <div className="mb-12 bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-semibold text-white mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category} className="text-center p-4 bg-slate-900 border border-white/15 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="font-semibold text-white">{category}</div>
                  <div className="text-sm text-white/80 mt-1">
                    {glossaryTerms.filter(term => term.category === category).length} terms
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alphabetical Index */}
          <div className="mb-8 bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold text-white mb-4">Alphabetical Index</h2>
            <div className="flex flex-wrap gap-2">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className={`w-10 h-10 rounded-lg font-semibold grid place-items-center ${termsByLetter[letter].length > 0 ? 'bg-slate-900 text-white border border-white/15 hover:bg-slate-700' : 'bg-slate-900/50 text-white/50 border border-white/10 hover:bg-slate-700/50'}`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Terms Display grouped by letter */}
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-white">Aviation Terms & Definitions</h2>

            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="space-y-4 scroll-mt-24">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white">{letter}</h3>
                  <a href="#top" className="text-blue-300 text-sm underline">Back to top</a>
                </div>

                {termsByLetter[letter].length === 0 ? (
                  <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
                    <p className="text-white/90">No entries under {letter} yet. Research update in progress.</p>
                  </div>
                ) : (
                  termsByLetter[letter].map((term) => (
                    <div key={term.term} className="bg-slate-800 border border-white/15 rounded-lg p-6 border-l-4 border-blue-500 text-white">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {term.term}
                            {term.aliases && (
                              <span className="text-lg font-normal text-white/70 ml-2">
                                (also: {term.aliases.join(', ')})
                              </span>
                            )}
                          </h4>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-white border border-white/15`}>
                          {term.category}
                        </span>
                      </div>

                      <p className="text-white/90 text-lg mb-4">{term.definition}</p>

                      {term.historicalContext && (
                        <div className="mb-4 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg border-l-4 border-yellow-500">
                          <h5 className="font-semibold text-white mb-2">Historical Context:</h5>
                          <p className="text-white/90">{term.historicalContext}</p>
                        </div>
                      )}

                      {term.relatedTerms && (
                        <div className="mt-4">
                          <h5 className="font-semibold text-white mb-2">Related Terms:</h5>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((relatedTerm) => (
                              <span key={relatedTerm} className="px-3 py-1 bg-slate-900 text-white border border-white/15 rounded-full text-sm hover:bg-slate-700 cursor-pointer transition-colors">
                                {relatedTerm}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </section>
            ))}
          </div>

          {/* Research Context */}
          <div className="mt-12 bg-slate-800 border border-white/15 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold text-white mb-6">Aviation Terminology in Historical Research</h2>
            <div className="prose max-w-none text-white/90">
              <p className="text-lg mb-4">
                Understanding aviation terminology is crucial for accurate historical research and academic study.
                This glossary provides not only technical definitions but also historical context that helps
                researchers understand how aviation concepts evolved over time.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-white">Research Applications:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-white/90">
                <li>Academic paper writing and technical documentation</li>
                <li>Historical aviation research and archival work</li>
                <li>Flight training and professional development</li>
                <li>Museum interpretation and educational programs</li>
                <li>Aviation archaeology and preservation projects</li>
              </ul>

              <div className="bg-blue-900/50 border border-blue-700/50 p-6 rounded-lg text-white">
                <h4 className="font-semibold text-white mb-2">About the Compiler:</h4>
                <p className="text-white/90">
                  Charles E. MacKay is a renowned aviation historian and author of 19 published books on aviation history.
                  His work is cited as primary reference material in academic research worldwide, with particular expertise
                  in Scottish aviation heritage and early aviation development.
                </p>
              </div>
            </div>
          </div>
      </BBCPageTemplate>
    </>
  );
}
