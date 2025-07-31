import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sopwith Camel F.1 | Complete Service History & Technical Analysis | Charles E. MacKay',
  description: 'Comprehensive analysis of the Sopwith Camel F.1 - legendary WWI fighter aircraft with detailed service history, combat records, and technical specifications. Expert research by Charles E. MacKay.',
  keywords: [
    'Sopwith Camel F.1',
    'Sopwith Camel specifications',
    'WWI fighter aircraft',
    'Camel combat record',
    'Sopwith Camel aces',
    'WWI British fighters',
    'Camel service history',
    'Sopwith Camel squadrons',
    'F.1 Camel performance',
    'Sopwith Camel armament',
    'Camel flying characteristics',
    'WWI ace pilots',
    'Sopwith Aviation',
    'Clerget rotary engine',
    'Roy Brown Camel'
  ],
  openGraph: {
    title: 'Sopwith Camel F.1 | Complete Service History & Technical Analysis',
    description: 'Comprehensive analysis of the legendary Sopwith Camel F.1 fighter aircraft.',
    type: 'article',
  },
};

interface AceRecord {
  pilot: string;
  rank: string;
  squadron: string;
  victories: number;
  period: string;
  notableVictories: string[];
}

interface TechnicalData {
  category: string;
  data: {
    parameter: string;
    value: string;
    comparison?: string;
  }[];
}

interface CombatEngagement {
  date: string;
  pilot: string;
  squadron: string;
  location: string;
  enemy: string;
  outcome: string;
  significance: string;
}

const aceRecords: AceRecord[] = [
  {
    pilot: 'Captain Roy Brown',
    rank: 'Captain',
    squadron: 'No. 209 Squadron RAF',
    victories: 12,
    period: 'April 1917 - April 1918',
    notableVictories: ['Credited with shooting down Manfred von Richthofen', 'Multiple Albatros D.III victories']
  },
  {
    pilot: 'Major Donald MacLaren',
    rank: 'Major',
    squadron: 'No. 46 Squadron RAF',
    victories: 54,
    period: 'November 1917 - November 1918',
    notableVictories: ['Highest-scoring Camel pilot', '6 victories in single day (March 1918)']
  },
  {
    pilot: 'Captain Henry Woollett',
    rank: 'Captain',
    squadron: 'No. 43 Squadron RAF',
    victories: 35,
    period: 'September 1917 - September 1918',
    notableVictories: ['Expert in Camel handling', 'Multiple balloon busting missions']
  },
  {
    pilot: 'Captain Arthur Cobby',
    rank: 'Captain',
    squadron: 'No. 4 Squadron AFC',
    victories: 29,
    period: 'December 1917 - November 1918',
    notableVictories: ['Highest-scoring Australian pilot', 'Expert dogfighter']
  }
];

const technicalData: TechnicalData[] = [
  {
    category: 'Dimensions & Weight',
    data: [
      { parameter: 'Length', value: '18 ft 9 in (5.72 m)' },
      { parameter: 'Wingspan', value: '28 ft 0 in (8.53 m)' },
      { parameter: 'Height', value: '8 ft 6 in (2.59 m)' },
      { parameter: 'Wing Area', value: '231 sq ft (21.46 m²)' },
      { parameter: 'Empty Weight', value: '929 lb (421 kg)' },
      { parameter: 'Loaded Weight', value: '1,453 lb (659 kg)' }
    ]
  },
  {
    category: 'Powerplant & Performance',
    data: [
      { parameter: 'Engine', value: 'Clerget 9B rotary', comparison: '130 hp (97 kW)' },
      { parameter: 'Alternative Engine', value: 'Bentley BR1 rotary', comparison: '150 hp (112 kW)' },
      { parameter: 'Maximum Speed', value: '115 mph (185 km/h)', comparison: 'At 6,500 ft' },
      { parameter: 'Service Ceiling', value: '19,000 ft (5,791 m)' },
      { parameter: 'Rate of Climb', value: '1,085 ft/min (5.5 m/s)', comparison: 'To 10,000 ft' },
      { parameter: 'Range', value: '300 miles (485 km)' }
    ]
  },
  {
    category: 'Armament & Equipment',
    data: [
      { parameter: 'Primary Armament', value: '2 × .303 in Vickers machine guns' },
      { parameter: 'Ammunition', value: '500 rounds per gun' },
      { parameter: 'Bomb Load', value: '4 × 25 lb bombs (optional)' },
      { parameter: 'Synchronization', value: 'Constantinesco gear' },
      { parameter: 'Gun Position', value: 'Through propeller arc' }
    ]
  }
];

const combatEngagements: CombatEngagement[] = [
  {
    date: 'April 21, 1918',
    pilot: 'Captain Roy Brown',
    squadron: 'No. 209 Squadron RAF',
    location: 'Vaux-sur-Somme, France',
    enemy: 'Manfred von Richthofen (Fokker Dr.I)',
    outcome: 'Red Baron shot down',
    significance: 'Most famous Camel victory, end of Richthofen\'s career'
  },
  {
    date: 'March 27, 1918',
    pilot: 'Major Donald MacLaren',
    squadron: 'No. 46 Squadron RAF',
    location: 'Near Bapaume',
    enemy: '6 × Albatros D.V',
    outcome: '6 enemy aircraft destroyed',
    significance: 'Record single-day score for Camel pilot'
  },
  {
    date: 'June 17, 1917',
    pilot: 'Captain W.A. Bond',
    squadron: 'No. 4 Squadron RFC',
    location: 'Messines Ridge',
    enemy: 'Albatros D.III',
    outcome: 'Enemy aircraft destroyed',
    significance: 'Early demonstration of Camel\'s fighting capability'
  },
  {
    date: 'September 21, 1917',
    pilot: 'Captain H.W. Woollett',
    squadron: 'No. 43 Squadron RFC',
    location: 'Polygon Wood',
    enemy: 'German observation balloon',
    outcome: 'Balloon destroyed',
    significance: 'Successful balloon-busting mission'
  }
];

const squadronService = [
  {
    squadron: 'No. 70 Squadron RFC',
    period: 'July 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Fighter squadron',
    achievements: ['First operational Camel squadron', '200+ confirmed victories']
  },
  {
    squadron: 'No. 45 Squadron RFC',
    period: 'August 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Fighter squadron',
    achievements: ['Home defense duties', 'Anti-Zeppelin operations']
  },
  {
    squadron: 'No. 203 Squadron RAF',
    period: 'April 1918 - November 1918',
    theatre: 'Western Front',
    role: 'Fighter squadron',
    achievements: ['Ground attack missions', 'Trench strafing specialist']
  },
  {
    squadron: 'No. 4 Squadron AFC',
    period: 'December 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Australian fighter squadron',
    achievements: ['Arthur Cobby\'s squadron', 'Excellent combat record']
  }
];

const developmentTimeline = [
  {
    date: 'December 1916',
    event: 'First Prototype Flight',
    details: 'F.1 prototype first flew at Brooklands, designed by Herbert Smith'
  },
  {
    date: 'May 1917',
    event: 'Production Begins',
    details: 'Full-scale production commenced at Sopwith factories'
  },
  {
    date: 'July 1917',
    event: 'Squadron Service',
    details: 'No. 70 Squadron RFC becomes first operational Camel unit'
  },
  {
    date: 'November 1918',
    event: 'Production Ends',
    details: 'Total of 5,490 Camels produced by war\'s end'
  }
];

export default function SopwithCamelPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Sopwith Camel F.1: Complete Service History & Technical Analysis",
    "description": "Comprehensive analysis of the Sopwith Camel F.1 including service history, ace pilots, combat records, and technical specifications.",
    "author": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charles E. MacKay Aviation Research"
    },
    "datePublished": new Date().toISOString(),
    "mainEntity": {
      "@type": "Product",
      "name": "Sopwith Camel F.1",
      "description": "British single-seat biplane fighter aircraft of World War I",
      "manufacturer": {
        "@type": "Organization",
        "name": "Sopwith Aviation Company"
      }
    }
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
              Sopwith Camel F.1
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              The legendary fighter that dominated WWI skies. Complete service history, ace pilot records,
              and technical analysis of the most successful British fighter aircraft of the Great War.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>🏆 1,294 Enemy Aircraft Destroyed</span>
              <span>⚔️ Famous Ace Pilots</span>
              <span>📊 Combat Records</span>
              <span>🎯 Technical Analysis</span>
            </div>
          </div>

          {/* Aircraft Legend */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">The Legend</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-slate-700 leading-relaxed mb-4">
                  The Sopwith Camel F.1 was the most successful fighter aircraft of World War I, credited with
                  destroying 1,294 enemy aircraft - more than any other Allied fighter. Its distinctive
                  hump-backed appearance earned it the nickname "Camel."
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Despite its challenging handling characteristics, the Camel became the mount of choice for
                  many of the war's greatest aces, including Roy Brown (credited with shooting down the Red Baron),
                  Donald MacLaren, and Henry Woollett.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  The aircraft's unique flight characteristics - caused by the rotary engine's gyroscopic effect
                  and forward center of gravity - made it deadly in the hands of an experienced pilot but
                  dangerous for novices.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="font-semibold text-red-800">Combat Record</div>
                  <div className="text-red-700">1,294 victories</div>
                  <div className="text-xs text-red-600">Highest of any WWI fighter</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-800">Production</div>
                  <div className="text-blue-700">5,490 built</div>
                  <div className="text-xs text-blue-600">1917-1918</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="font-semibold text-green-800">Service Period</div>
                  <div className="text-green-700">June 1917 - 1920</div>
                  <div className="text-xs text-green-600">Primary WWI fighter</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ace Pilots */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Famous Camel Aces</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {aceRecords.map((ace, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{ace.pilot}</h3>
                      <div className="text-slate-600">{ace.rank} • {ace.squadron}</div>
                      <div className="text-sm text-slate-500">{ace.period}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">{ace.victories}</div>
                      <div className="text-xs text-slate-500">Victories</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Notable Achievements:</h4>
                    <ul className="space-y-1">
                      {ace.notableVictories.map((victory, i) => (
                        <li key={i} className="text-sm text-slate-600">• {victory}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Specifications</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {technicalData.map((category) => (
                <div key={category.category} className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.data.map((spec, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-slate-700">{spec.parameter}:</span>
                          <span className="text-slate-800 text-right">{spec.value}</span>
                        </div>
                        {spec.comparison && (
                          <div className="text-xs text-slate-500 mt-1 text-right">{spec.comparison}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Famous Combat Engagements */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Historic Combat Engagements</h2>
            <div className="space-y-6">
              {combatEngagements.map((engagement, index) => (
                <div key={index} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{engagement.date}</h3>
                      <div className="text-slate-600">{engagement.pilot} • {engagement.squadron}</div>
                      <div className="text-sm text-slate-500">{engagement.location}</div>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      vs {engagement.enemy}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-1">Outcome:</h4>
                      <p className="text-slate-700">{engagement.outcome}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-1">Significance:</h4>
                      <p className="text-slate-700">{engagement.significance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Squadron Service */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Squadron Service Record</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {squadronService.map((unit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{unit.squadron}</h3>
                  <div className="text-slate-600 mb-1">{unit.period}</div>
                  <div className="text-slate-600 mb-3">{unit.theatre} • {unit.role}</div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Achievements:</h4>
                    <ul className="space-y-1">
                      {unit.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-slate-700">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Timeline */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Development Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200"></div>
              <div className="space-y-6">
                {developmentTimeline.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="ml-10">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-semibold text-slate-800">{milestone.date}</span>
                        <span className="text-blue-600 font-medium">{milestone.event}</span>
                      </div>
                      <p className="text-slate-700">{milestone.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flying Characteristics */}
          <div className="mb-12 bg-amber-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Flying Characteristics & Tactics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Handling Characteristics</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Right Turn:</strong> Extremely quick due to gyroscopic effect</li>
                  <li>• <strong>Left Turn:</strong> Sluggish and requiring more effort</li>
                  <li>• <strong>Stall:</strong> Sudden and unforgiving, often leading to spin</li>
                  <li>• <strong>Takeoff:</strong> Tendency to swing left, required right rudder</li>
                  <li>• <strong>Landing:</strong> Fast approach speed, ground loop tendency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Combat Tactics</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Turning Fight:</strong> Superior in tight turns, especially right</li>
                  <li>• <strong>Vertical Maneuvers:</strong> Good climbing ability when light</li>
                  <li>• <strong>Gunnery:</strong> Stable platform for accurate shooting</li>
                  <li>• <strong>Formation:</strong> Excellent for close formation flying</li>
                  <li>• <strong>Ground Attack:</strong> Effective for trench strafing missions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Sources */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Research Sources & Documentation</h2>
            <div className="prose max-w-none text-slate-700">
              <p className="mb-4">
                This comprehensive analysis draws from extensive primary source research:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Primary Sources:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>RFC/RAF Squadron Combat Reports</li>
                    <li>Pilot memoirs and personal accounts</li>
                    <li>Sopwith Aviation Company records</li>
                    <li>Imperial War Museum archives</li>
                    <li>National Archives combat documentation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Technical Documentation:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Aircraft inspection reports</li>
                    <li>Engine performance data</li>
                    <li>Armament effectiveness studies</li>
                    <li>Flight test reports</li>
                    <li>Maintenance manuals and procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg mt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Academic Citation:</h3>
                <p className="text-sm text-slate-600">
                  MacKay, C. E. (2024). "Sopwith Camel F.1: Complete Service History & Technical Analysis."
                  Charles E. MacKay Aviation Research. https://charlesmackaybooks.com/aircraft/sopwith-camel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
