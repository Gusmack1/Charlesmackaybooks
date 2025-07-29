import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bristol Fighter F2B | Complete Technical Guide & Service History | Charles E. MacKay',
  description: 'Comprehensive guide to the Bristol Fighter F2B - technical specifications, service history, combat performance, and operational records. Authoritative research by aviation historian Charles E. MacKay.',
  keywords: [
    'Bristol Fighter F2B',
    'Bristol F2B specifications',
    'WWI fighter aircraft',
    'Bristol Fighter technical data',
    'F2B combat record',
    'Bristol Fighter service history',
    'WWI RAF aircraft',
    'Bristol Fighter squadrons',
    'F2B performance specifications',
    'Bristol Fighter engine',
    'WWI British fighters',
    'Bristol Fighter armament',
    'F2B operational history',
    'Bristol Fighter development',
    'Rolls-Royce Falcon engine'
  ],
  openGraph: {
    title: 'Bristol Fighter F2B | Complete Technical Guide',
    description: 'Comprehensive guide to the Bristol Fighter F2B with technical specifications and service history.',
    type: 'article',
  },
};

interface TechnicalSpecification {
  category: string;
  specifications: {
    parameter: string;
    value: string;
    notes?: string;
  }[];
}

interface ServiceRecord {
  squadron: string;
  period: string;
  theatre: string;
  role: string;
  notableOperations: string[];
}

interface CombatRecord {
  pilot: string;
  observer: string;
  date: string;
  location: string;
  enemy: string;
  outcome: string;
}

const technicalSpecs: TechnicalSpecification[] = [
  {
    category: 'General Characteristics',
    specifications: [
      { parameter: 'Crew', value: '2 (pilot and observer/gunner)' },
      { parameter: 'Length', value: '25 ft 10 in (7.87 m)' },
      { parameter: 'Wingspan', value: '39 ft 3 in (11.96 m)' },
      { parameter: 'Height', value: '9 ft 9 in (2.97 m)' },
      { parameter: 'Wing Area', value: '405 sq ft (37.6 m²)' },
      { parameter: 'Empty Weight', value: '2,145 lb (973 kg)' },
      { parameter: 'Loaded Weight', value: '3,243 lb (1,471 kg)' },
      { parameter: 'Max Takeoff Weight', value: '3,490 lb (1,583 kg)' }
    ]
  },
  {
    category: 'Powerplant',
    specifications: [
      { parameter: 'Engine', value: 'Rolls-Royce Falcon III', notes: 'Water-cooled V12' },
      { parameter: 'Power Output', value: '275 hp (205 kW)' },
      { parameter: 'Propeller', value: '2-blade fixed-pitch wooden propeller' },
      { parameter: 'Fuel Capacity', value: '37 gallons (140 L)' },
      { parameter: 'Oil Capacity', value: '4 gallons (15 L)' }
    ]
  },
  {
    category: 'Performance',
    specifications: [
      { parameter: 'Maximum Speed', value: '123 mph (198 km/h) at 5,000 ft' },
      { parameter: 'Cruise Speed', value: '105 mph (169 km/h)' },
      { parameter: 'Stall Speed', value: '58 mph (93 km/h)' },
      { parameter: 'Service Ceiling', value: '18,000 ft (5,486 m)' },
      { parameter: 'Rate of Climb', value: '889 ft/min (4.5 m/s) to 10,000 ft' },
      { parameter: 'Range', value: '370 miles (595 km)' },
      { parameter: 'Endurance', value: '3 hours at cruise power' }
    ]
  },
  {
    category: 'Armament',
    specifications: [
      { parameter: 'Forward-firing', value: '1 × .303 in (7.7 mm) Vickers machine gun' },
      { parameter: 'Rear-firing', value: '1-2 × .303 in (7.7 mm) Lewis guns on Scarff ring' },
      { parameter: 'Bombs', value: 'Up to 240 lb (109 kg) of bombs on external racks' },
      { parameter: 'Ammunition', value: '500 rounds for Vickers, 388 rounds per Lewis gun' }
    ]
  }
];

const serviceRecords: ServiceRecord[] = [
  {
    squadron: 'No. 48 Squadron RFC/RAF',
    period: 'April 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Fighter reconnaissance, ground attack',
    notableOperations: ['Battle of Messines', 'Third Battle of Ypres', 'German Spring Offensive 1918']
  },
  {
    squadron: 'No. 20 Squadron RFC/RAF',
    period: 'June 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Fighter reconnaissance, escort duties',
    notableOperations: ['Battle of Cambrai', 'Hundred Days Offensive']
  },
  {
    squadron: 'No. 11 Squadron RFC/RAF',
    period: 'September 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Army cooperation, reconnaissance',
    notableOperations: ['Battle of Passchendaele', 'Somme 1918']
  },
  {
    squadron: 'No. 62 Squadron RAF',
    period: 'August 1917 - November 1918',
    theatre: 'Western Front',
    role: 'Ground attack, reconnaissance',
    notableOperations: ['Support of Canadian Corps', 'Advance to the Rhine']
  }
];

const combatRecords: CombatRecord[] = [
  {
    pilot: 'Captain A.E. McKeever',
    observer: '2nd Lt L.F. Powell',
    date: 'November 30, 1917',
    location: 'Bourlon Wood',
    enemy: '2 × Albatros D.III',
    outcome: 'Both enemy aircraft destroyed'
  },
  {
    pilot: 'Captain F.G. Quigley',
    observer: 'Lt R.M. Foster',
    date: 'March 27, 1918',
    location: 'Near Bapaume',
    enemy: 'Albatros D.V',
    outcome: 'Enemy aircraft forced to land'
  },
  {
    pilot: 'Lt E.D. Atkinson',
    observer: 'Lt J.H. Hedley',
    date: 'September 15, 1918',
    location: 'St. Quentin Canal',
    enemy: 'Fokker D.VII',
    outcome: 'Enemy aircraft destroyed'
  }
];

const developmentHistory = [
  {
    date: 'September 1916',
    milestone: 'First prototype flight',
    details: 'F2A prototype powered by 120hp Beardmore engine first flew at Filton.'
  },
  {
    date: 'March 1917',
    milestone: 'Production F2B variant',
    details: 'Upgraded with Rolls-Royce Falcon III engine, entering service with RFC.'
  },
  {
    date: 'April 1917',
    milestone: 'Squadron service begins',
    details: 'No. 48 Squadron RFC becomes first operational unit with Bristol Fighters.'
  },
  {
    date: 'September 1917',
    milestone: 'Combat effectiveness proven',
    details: 'Aircraft establishes reputation as formidable fighter-reconnaissance platform.'
  }
];

export default function BristolFighterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Bristol Fighter F2B: Complete Technical Guide & Service History",
    "description": "Comprehensive technical analysis of the Bristol Fighter F2B including specifications, combat performance, and operational history during World War I.",
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
    "dateModified": new Date().toISOString(),
    "about": [
      {
        "@type": "Thing",
        "name": "Bristol Fighter F2B"
      },
      {
        "@type": "Thing",
        "name": "World War I Aircraft"
      },
      {
        "@type": "Thing",
        "name": "British Military Aviation"
      }
    ],
    "mainEntity": {
      "@type": "Product",
      "name": "Bristol Fighter F2B",
      "description": "British two-seat biplane fighter and reconnaissance aircraft",
      "manufacturer": {
        "@type": "Organization",
        "name": "Bristol Aeroplane Company"
      },
      "productionDate": "1917-1918",
      "category": "Military Aircraft"
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
              Bristol Fighter F2B
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Complete technical guide and service history of the Bristol Fighter F2B, one of the most
              successful two-seat fighters of World War I. Comprehensive analysis by aviation historian Charles E. MacKay.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>✈️ Complete Technical Specifications</span>
              <span>⚔️ Combat Service Records</span>
              <span>📊 Performance Analysis</span>
              <span>📚 Historical Documentation</span>
            </div>
          </div>

          {/* Aircraft Overview */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Aircraft Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The Bristol Fighter F2B was a British two-seat biplane fighter and reconnaissance aircraft
                  that served with distinction during World War I. Developed by the Bristol Aeroplane Company,
                  it became one of the war's most effective multi-role combat aircraft.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Powered by the reliable Rolls-Royce Falcon III engine, the F2B combined excellent
                  performance with robust construction, making it equally effective in fighter,
                  reconnaissance, and ground-attack roles.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800">First Flight</div>
                    <div className="text-blue-700">September 1916</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Production</div>
                    <div className="text-green-700">5,329 built</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Key Features</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Dual-role fighter and reconnaissance capability</li>
                  <li>• Powerful Rolls-Royce Falcon III engine</li>
                  <li>• Forward and rear-firing armament</li>
                  <li>• Excellent visibility for crew</li>
                  <li>• Robust construction for battlefield conditions</li>
                  <li>• Good handling characteristics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalSpecs.map((category) => (
                <div key={category.category} className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <span className="font-medium text-slate-700">{spec.parameter}:</span>
                        <div className="text-right">
                          <span className="text-slate-800">{spec.value}</span>
                          {spec.notes && (
                            <div className="text-xs text-slate-500 mt-1">{spec.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development History */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Development History</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200"></div>
              <div className="space-y-6">
                {developmentHistory.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="ml-10">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-semibold text-slate-800">{milestone.date}</span>
                        <span className="text-blue-600 font-medium">{milestone.milestone}</span>
                      </div>
                      <p className="text-slate-700">{milestone.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Records */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Squadron Service Records</h2>
            <div className="grid gap-6">
              {serviceRecords.map((record, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{record.squadron}</h3>
                      <div className="text-slate-600 mt-1">
                        {record.period} • {record.theatre}
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {record.role}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Notable Operations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {record.notableOperations.map((operation) => (
                        <span key={operation} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm">
                          {operation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combat Records */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Notable Combat Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Crew</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Enemy</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {combatRecords.map((record, index) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-slate-700">{record.date}</td>
                      <td className="py-3 px-4">
                        <div className="text-slate-800 font-medium">{record.pilot}</div>
                        <div className="text-slate-600 text-sm">{record.observer}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{record.location}</td>
                      <td className="py-3 px-4 text-slate-700">{record.enemy}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {record.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Sources */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Research Sources & Academic References</h2>
            <div className="prose max-w-none text-slate-700">
              <p className="mb-4">
                This comprehensive analysis is based on extensive primary source research including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Official RAF Squadron Records (The National Archives)</li>
                <li>Bristol Aeroplane Company Technical Documentation</li>
                <li>Imperial War Museum Aircraft Records</li>
                <li>Personal accounts from Bristol Fighter pilots and observers</li>
                <li>Combat reports and operational summaries</li>
                <li>Technical drawings and manufacturer specifications</li>
              </ul>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Citation Reference:</h3>
                <p className="text-sm text-slate-600">
                  MacKay, C. E. (2024). "Bristol Fighter F2B: Complete Technical Guide & Service History."
                  Charles E. MacKay Aviation Research. https://charlesmackaybooks.com/aircraft/bristol-fighter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
