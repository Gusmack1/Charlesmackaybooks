import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hawker Hurricane Mk I/II | Technical Specifications & Battle of Britain Analysis | Charles E. MacKay',
  description: 'Complete technical analysis of the Hawker Hurricane Mk I and Mk II - Battle of Britain hero, detailed specifications, combat performance, and squadron service records. Expert research by Charles E. MacKay.',
  keywords: [
    'Hawker Hurricane Mk I',
    'Hawker Hurricane Mk II',
    'Hurricane specifications',
    'Battle of Britain fighter',
    'Hurricane combat record',
    'Hurricane vs Messerschmitt',
    'Hurricane squadrons',
    'Hurricane performance',
    'Merlin engine Hurricane',
    'Hurricane armament',
    'Hurricane tropical',
    'Hurricane bomber',
    'Hurricane tank buster',
    'Desert Hurricane',
    'Hurricane aces'
  ],
  openGraph: {
    title: 'Hawker Hurricane | Complete Technical & Combat Analysis',
    description: 'Comprehensive analysis of the Hawker Hurricane fighter aircraft with detailed specifications and combat records.',
    type: 'article',
  },
};

interface HurricaneVariant {
  designation: string;
  engine: string;
  armament: string;
  role: string;
  productionPeriod: string;
  notableFeatures: string[];
}

interface BattleRecord {
  campaign: string;
  period: string;
  squadrons: string[];
  enemyTypes: string[];
  results: string;
  significance: string;
}

interface TechnicalComparison {
  parameter: string;
  mkI: string;
  mkII: string;
  notes?: string;
}

const hurricaneVariants: HurricaneVariant[] = [
  {
    designation: 'Hurricane Mk I',
    engine: 'Rolls-Royce Merlin II/III (1,030 hp)',
    armament: '8 × .303 in Browning machine guns',
    role: 'Single-seat fighter',
    productionPeriod: '1937-1941',
    notableFeatures: ['Fabric-covered wings', 'Two-blade wooden propeller', 'Battle of Britain veteran']
  },
  {
    designation: 'Hurricane Mk IIA',
    engine: 'Rolls-Royce Merlin XX (1,280 hp)',
    armament: '8 × .303 in Browning machine guns',
    role: 'Fighter/Fighter-bomber',
    productionPeriod: '1940-1941',
    notableFeatures: ['Metal wings', 'Three-blade metal propeller', 'Improved performance']
  },
  {
    designation: 'Hurricane Mk IIB',
    engine: 'Rolls-Royce Merlin XX (1,280 hp)',
    armament: '12 × .303 in Browning machine guns',
    role: 'Fighter/Ground attack',
    productionPeriod: '1940-1941',
    notableFeatures: ['Increased firepower', 'Universal wing', 'Bomb racks']
  },
  {
    designation: 'Hurricane Mk IIC',
    engine: 'Rolls-Royce Merlin XX (1,280 hp)',
    armament: '4 × 20mm Hispano cannons',
    role: 'Fighter/Tank buster',
    productionPeriod: '1941-1944',
    notableFeatures: ['Cannon armament', 'Anti-tank capability', 'Desert operations']
  },
  {
    designation: 'Hurricane Mk IID',
    engine: 'Rolls-Royce Merlin XX (1,280 hp)',
    armament: '2 × 40mm Vickers S cannons',
    role: 'Tank buster/Anti-ship',
    productionPeriod: '1942-1943',
    notableFeatures: ['Tank-busting variant', 'Specialized anti-armor role', 'Limited production']
  }
];

const battleRecords: BattleRecord[] = [
  {
    campaign: 'Battle of Britain',
    period: 'July - October 1940',
    squadrons: ['32 RAF squadrons', 'No. 1 Squadron RCAF', 'No. 303 Polish Squadron'],
    enemyTypes: ['Messerschmitt Bf 109E', 'Messerschmitt Bf 110', 'Heinkel He 111', 'Dornier Do 17'],
    results: '1,593 enemy aircraft claimed destroyed by Hurricane squadrons',
    significance: 'Primary RAF fighter, responsible for 60% of Battle of Britain victories'
  },
  {
    campaign: 'North African Campaign',
    period: 'June 1940 - May 1943',
    squadrons: ['No. 80 Squadron', 'No. 274 Squadron', 'No. 238 Squadron'],
    enemyTypes: ['Messerschmitt Bf 109F/G', 'Macchi C.202', 'Fiat CR.42'],
    results: 'Over 500 confirmed victories in desert operations',
    significance: 'Proved adaptability in harsh desert conditions and ground attack role'
  },
  {
    campaign: 'Burma Campaign',
    period: 'January 1942 - August 1945',
    squadrons: ['No. 17 Squadron', 'No. 135 Squadron', 'No. 146 Squadron'],
    enemyTypes: ['Nakajima Ki-43 Oscar', 'Mitsubishi A6M Zero', 'Kawasaki Ki-61'],
    results: 'Significant contribution to Allied air superiority',
    significance: 'Long-range operations and close air support in Pacific theater'
  },
  {
    campaign: 'Eastern Front (Soviet)',
    period: 'September 1941 - 1944',
    squadrons: ['Soviet Air Force units', 'Lend-Lease program'],
    enemyTypes: ['Messerschmitt Bf 109F/G', 'Focke-Wulf 190', 'Junkers Ju 88'],
    results: '2,952 Hurricanes delivered to Soviet Union',
    significance: 'Major contribution to Soviet air defense and ground attack operations'
  }
];

const technicalComparison: TechnicalComparison[] = [
  { parameter: 'Length', mkI: '31 ft 4 in (9.55 m)', mkII: '32 ft 3 in (9.83 m)' },
  { parameter: 'Wingspan', mkI: '40 ft 0 in (12.19 m)', mkII: '40 ft 0 in (12.19 m)' },
  { parameter: 'Height', mkI: '13 ft 1 in (3.99 m)', mkII: '13 ft 3 in (4.04 m)' },
  { parameter: 'Empty Weight', mkI: '5,745 lb (2,605 kg)', mkII: '5,800 lb (2,631 kg)' },
  { parameter: 'Loaded Weight', mkI: '7,233 lb (3,281 kg)', mkII: '8,100 lb (3,674 kg)' },
  { parameter: 'Maximum Speed', mkI: '324 mph (521 km/h)', mkII: '342 mph (550 km/h)', notes: 'At 18,000 ft' },
  { parameter: 'Service Ceiling', mkI: '34,200 ft (10,425 m)', mkII: '35,600 ft (10,850 m)' },
  { parameter: 'Range', mkI: '525 miles (845 km)', mkII: '600 miles (965 km)' },
  { parameter: 'Rate of Climb', mkI: '2,420 ft/min (12.3 m/s)', mkII: '2,780 ft/min (14.1 m/s)' }
];

const combatAnalysis = [
  {
    aspect: 'Versus Messerschmitt Bf 109E',
    advantages: ['Better turning radius', 'Heavier armament', 'More robust construction', 'Better at low altitude'],
    disadvantages: ['Lower top speed', 'Poorer climb rate', 'Less maneuverable at high altitude'],
    tactics: 'Hurricanes employed turning combat and used superior firepower concentration'
  },
  {
    aspect: 'Versus Messerschmitt Bf 110',
    advantages: ['Superior maneuverability', 'Better acceleration', 'Single-engine simplicity'],
    disadvantages: ['Lower top speed', 'Less defensive armament'],
    tactics: 'Close-in attacks to negate twin-engine fighter\'s speed advantage'
  },
  {
    aspect: 'Ground Attack Role',
    advantages: ['Stable gun platform', 'Good visibility', 'Robust airframe', 'Bomb-carrying capability'],
    disadvantages: ['Vulnerable to ground fire', 'Limited armor protection'],
    tactics: 'Low-level attacks on tanks, vehicles, and installations using cannons and bombs'
  }
];

const notablePilots = [
  {
    name: 'Squadron Leader Douglas Bader',
    squadron: 'No. 242 Squadron RAF',
    victories: '22 confirmed',
    period: '1940-1941',
    achievement: 'Led "Big Wing" formations, amputee ace pilot'
  },
  {
    name: 'Flight Lieutenant Marmaduke "Pat" Pattle',
    squadron: 'No. 80 Squadron RAF',
    victories: '40+ confirmed',
    period: '1940-1941',
    achievement: 'Highest-scoring Hurricane pilot, killed in action over Greece'
  },
  {
    name: 'Squadron Leader Karel Kuttelwascher',
    squadron: 'No. 1 Squadron RAF',
    victories: '18 confirmed',
    period: '1940-1942',
    achievement: 'Czech pilot, night intruder specialist'
  },
  {
    name: 'Wing Commander Clive Caldwell',
    squadron: 'No. 250 Squadron RAF',
    victories: '28.5 confirmed',
    period: '1941-1943',
    achievement: 'Leading Hurricane ace in North Africa'
  }
];

export default function HawkerHurricanePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Hawker Hurricane: Technical Specifications & Battle of Britain Analysis",
    "description": "Comprehensive technical analysis of the Hawker Hurricane including variants, combat performance, and service records.",
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
      "name": "Hawker Hurricane",
      "description": "British single-seat fighter aircraft of World War II",
      "manufacturer": {
        "@type": "Organization",
        "name": "Hawker Aircraft Limited"
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
              Hawker Hurricane
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              The forgotten hero of the Battle of Britain. Comprehensive technical analysis and combat record
              of the Hurricane Mk I and Mk II - the RAF's most numerous fighter during Britain's finest hour.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>🛡️ Battle of Britain Hero</span>
              <span>🎯 60% of BoB Victories</span>
              <span>🌍 Global Service</span>
              <span>⚙️ 14,533 Built</span>
            </div>
          </div>

          {/* Hurricane Legacy */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">The Unsung Hero</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-slate-700 leading-relaxed mb-4">
                  While the Spitfire gained fame and glory, the Hawker Hurricane quietly shouldered the burden
                  of Britain's defense. During the Battle of Britain, Hurricanes equipped 32 squadrons compared
                  to 19 Spitfire squadrons, and were responsible for destroying more enemy aircraft than all
                  other British fighters combined.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The Hurricane's robust construction, excellent gun platform characteristics, and forgiving
                  flight handling made it the perfect aircraft for newly trained pilots thrust into combat.
                  Its ability to absorb battle damage and continue fighting became legendary.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Beyond the Battle of Britain, the Hurricane served on every front of WWII, from the deserts
                  of North Africa to the jungles of Burma, proving its versatility as fighter, ground-attack
                  aircraft, and even tank-buster.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-800">Battle of Britain</div>
                  <div className="text-blue-700">60% of victories</div>
                  <div className="text-xs text-blue-600">1,593 confirmed kills</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="font-semibold text-green-800">Production Total</div>
                  <div className="text-green-700">14,533 aircraft</div>
                  <div className="text-xs text-green-600">1937-1944</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="font-semibold text-amber-800">Service Life</div>
                  <div className="text-amber-700">1937-1960s</div>
                  <div className="text-xs text-amber-600">Multiple air forces</div>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Hurricane Variants</h2>
            <div className="space-y-6">
              {hurricaneVariants.map((variant, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{variant.designation}</h3>
                      <div className="text-slate-600 mt-1">
                        {variant.engine} • {variant.productionPeriod}
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {variant.role}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Armament:</h4>
                    <p className="text-slate-700">{variant.armament}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Notable Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {variant.notableFeatures.map((feature) => (
                        <span key={feature} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Comparison */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Mk I vs Mk II Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Specification</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Hurricane Mk I</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Hurricane Mk II</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-800">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalComparison.map((spec, index) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium text-slate-800">{spec.parameter}</td>
                      <td className="py-3 px-4 text-slate-700">{spec.mkI}</td>
                      <td className="py-3 px-4 text-slate-700">{spec.mkII}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{spec.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Battle Records */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Major Campaign Records</h2>
            <div className="grid gap-6">
              {battleRecords.map((record, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{record.campaign}</h3>
                      <div className="text-slate-600 mt-1">{record.period}</div>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Combat Theater
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Participating Squadrons:</h4>
                      <div className="space-y-1">
                        {record.squadrons.map((squadron) => (
                          <div key={squadron} className="text-sm text-slate-700">• {squadron}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Enemy Aircraft Types:</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.enemyTypes.map((enemy) => (
                          <span key={enemy} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm">
                            {enemy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Results:</h4>
                      <p className="text-slate-700">{record.results}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Historical Significance:</h4>
                      <p className="text-slate-700">{record.significance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combat Analysis */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Combat Performance Analysis</h2>
            <div className="space-y-8">
              {combatAnalysis.map((analysis, index) => (
                <div key={index} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{analysis.aspect}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {analysis.advantages.map((advantage) => (
                          <li key={advantage} className="text-sm text-slate-700">✓ {advantage}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Disadvantages:</h4>
                      <ul className="space-y-1">
                        {analysis.disadvantages.map((disadvantage) => (
                          <li key={disadvantage} className="text-sm text-slate-700">✗ {disadvantage}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Tactics:</h4>
                      <p className="text-sm text-slate-700">{analysis.tactics}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Pilots */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Hurricane Aces</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {notablePilots.map((pilot, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{pilot.name}</h3>
                      <div className="text-slate-600">{pilot.squadron}</div>
                      <div className="text-sm text-slate-500">{pilot.period}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-600">{pilot.victories}</div>
                      <div className="text-xs text-slate-500">Victories</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">{pilot.achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legacy Assessment */}
          <div className="bg-green-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Hurricane Legacy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Historical Impact</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Saved Britain during its darkest hour</li>
                  <li>• Proved single-seat fighters could defeat bombers</li>
                  <li>• Demonstrated importance of pilot training</li>
                  <li>• Showed value of robust, forgiving design</li>
                  <li>• Pioneer of fighter-bomber role</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Technical Legacy</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Influenced post-war fighter design</li>
                  <li>• Demonstrated eight-gun armament effectiveness</li>
                  <li>• Proved monoplane superiority over biplanes</li>
                  <li>• Advanced cannon armament development</li>
                  <li>• Contributed to ground-attack doctrine</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Academic Citation:</h3>
              <p className="text-sm text-slate-600">
                MacKay, C. E. (2024). "Hawker Hurricane: Technical Specifications & Battle of Britain Analysis."
                Charles E. MacKay Aviation Research. https://charlesmackaybooks.com/aircraft/hawker-hurricane
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
