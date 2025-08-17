import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBooksData } from '@/utils/bookUtils';

export const metadata: Metadata = {
  title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain | Complete Technical Guide | Charles E. MacKay',
  description: 'Comprehensive analysis of the Hawker Hurricane - Battle of Britain hero, technical specifications, combat performance, and operational history. Expert research by aviation historian Charles E. MacKay.',
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
    'Hurricane aces',
    'Charles E MacKay',
    'aviation history'
  ],
  openGraph: {
    title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
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
    period: 'July-October 1940',
    squadrons: ['No. 111 Squadron', 'No. 303 Squadron', 'No. 501 Squadron', 'No. 605 Squadron'],
    enemyTypes: ['Messerschmitt Bf 109', 'Messerschmitt Bf 110', 'Heinkel He 111', 'Dornier Do 17'],
    results: 'Destroyed more enemy aircraft than any other RAF type',
    significance: 'Backbone of Fighter Command during the critical air campaign'
  },
  {
    campaign: 'North Africa Campaign',
    period: '1940-1943',
    squadrons: ['No. 73 Squadron', 'No. 80 Squadron', 'No. 274 Squadron'],
    enemyTypes: ['Messerschmitt Bf 109', 'Fiat CR.42', 'Macchi C.200', 'Junkers Ju 87'],
    results: 'Effective ground attack and air superiority missions',
    significance: 'Proved versatility in desert conditions with tropical modifications'
  },
  {
    campaign: 'Malta Defense',
    period: '1941-1942',
    squadrons: ['No. 261 Squadron', 'No. 185 Squadron'],
    enemyTypes: ['Messerschmitt Bf 109', 'Junkers Ju 88', 'Reggiane Re.2001'],
    results: 'Critical role in defending the strategic island',
    significance: 'Demonstrated ability to operate from limited facilities'
  }
];

const technicalComparison: TechnicalComparison[] = [
  {
    parameter: 'Engine',
    mkI: 'Merlin II/III (1,030 hp)',
    mkII: 'Merlin XX (1,280 hp)',
    notes: 'Improved power and reliability'
  },
  {
    parameter: 'Maximum Speed',
    mkI: '324 mph (521 km/h)',
    mkII: '340 mph (547 km/h)',
    notes: 'Enhanced performance with new engine'
  },
  {
    parameter: 'Armament',
    mkI: '8 × .303 in Browning',
    mkII: '12 × .303 in or 4 × 20mm Hispano',
    notes: 'Increased firepower options'
  },
  {
    parameter: 'Wing Structure',
    mkI: 'Fabric-covered',
    mkII: 'Metal-skinned',
    notes: 'Improved durability and performance'
  }
];

export default function HawkerHurricanePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Hawker Hurricane: The Forgotten Hero of the Battle of Britain",
    "description": "Comprehensive analysis of the Hawker Hurricane fighter aircraft including technical specifications, combat performance, and operational history during World War II.",
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
    "image": "https://charlesmackaybooks.com/blog-images/default-generic.svg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://charlesmackaybooks.com/aircraft/hawker-hurricane"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hawker Hurricane: The Forgotten Hero of the Battle of Britain
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Rugged, Repairable, and Produced in Numbers - The Decisive Workhorse of 1940
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded-full">Battle of Britain</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">1937-1944</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Rolls-Royce Merlin</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Sydney Camm Design</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Hawker Hurricane — rugged, repairable, and produced in numbers — destroyed more enemy aircraft 
                in the Battle of Britain than any other RAF type. This comprehensive analysis focuses on engineering 
                choices, production pragmatism, and combat employment that made Sydney Camm's design the decisive 
                workhorse of 1940 and a versatile fighter through the war's early years.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Hawker Hurricane in RAF service" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  The Hurricane: a stable gun platform with forgiving handling and field-repairable structure.
                </p>
              </div>
            </div>
          </section>

          {/* Origins and Development */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Origins and Development (1934–1937)</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Camm advanced from biplane practice to a pragmatic monoplane: a steel-tube fuselage with fabric 
                aft of the cockpit and stressed-skin forward, married to a thick section wing. This blended proven 
                shop-floor methods with aerodynamic lessons drawn from the era's racers and prototypes, while 
                standardising around the Rolls-Royce Merlin for reliable performance.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Prototype development and flight test" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Prototype K5083 validated the concept: benign handling and a firm foundation for rapid production.
                </p>
              </div>
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Design Philosophy and Innovation</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Compared to the Spitfire's advanced stressed-skin, the Hurricane prioritised maintainability and 
                distributed manufacture. The thick wing section housed guns, fuel, and later equipment; the fuselage 
                permitted straightforward patching after damage. This philosophy traded absolute speed for operational 
                availability — the metric that matters in sustained campaigns.
              </p>
            </div>
          </section>

          {/* Production and Deployment */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Production and Deployment</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Conventional jigs, familiar tooling, and a skilled workforce enabled rapid ramp-up across multiple sites. 
                By September 1939, Hurricanes equipped eighteen squadrons. The type's tolerance of dispersed manufacture 
                and its forgiving flight characteristics accelerated squadron conversion and kept aircraft on the line 
                despite battle damage.
              </p>
            </div>
          </section>

          {/* Battle of Britain Service */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Battle of Britain Service</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Fighter Command's backbone in 1940 was the Hurricane: stable in the guns, reliable in service, and 
                available in numbers. Typical tactics paired Spitfires against Bf 109s while Hurricanes broke bomber 
                formations. Eight Brownings at converging ranges delivered concentrated destructive effect; robust 
                structure brought damaged aircraft home.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Battle of Britain engagements" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Mass, method, and maintainability: the Hurricane's contributions were systemic as much as aerodynamic.
                </p>
              </div>
            </div>
          </section>

          {/* Hurricane Variants */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Hurricane Variants and Evolution</h2>
            <div className="grid gap-6">
              {hurricaneVariants.map((variant, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{variant.designation}</h3>
                      <div className="text-slate-600 mt-1">
                        {variant.productionPeriod} • {variant.role}
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {variant.role}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><span className="font-medium">Engine:</span> {variant.engine}</p>
                      <p><span className="font-medium">Armament:</span> {variant.armament}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Notable Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {variant.notableFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Comparison: Mk I vs Mk II</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-2 text-left">Parameter</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Mk I</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Mk II</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-2 font-medium">{item.parameter}</td>
                      <td className="border border-slate-300 px-4 py-2">{item.mkI}</td>
                      <td className="border border-slate-300 px-4 py-2">{item.mkII}</td>
                      <td className="border border-slate-300 px-4 py-2 text-sm text-slate-600">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Battle Records */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Combat Campaigns and Battle Records</h2>
            <div className="grid gap-6">
              {battleRecords.map((record, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{record.campaign}</h3>
                      <div className="text-slate-600 mt-1">{record.period}</div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {record.results}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Participating Squadrons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {record.squadrons.map((squadron, squadronIndex) => (
                          <li key={squadronIndex}>{squadron}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Enemy Aircraft Types:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {record.enemyTypes.map((enemy, enemyIndex) => (
                          <li key={enemyIndex}>{enemy}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-slate-700"><span className="font-medium">Significance:</span> {record.significance}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Global Operations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Global Operations and Variants</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                From North Africa to the Far East, the Hurricane adapted as interceptor, fighter-bomber, and tactical 
                reconnaissance platform. Cannon-armed marks, tropical filters, and theatre kits extended utility. 
                In austere conditions, ease of maintenance sustained sortie rates where more delicate types struggled.
              </p>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Technical Notes</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Structure:</strong> steel-tube fuselage with fabric aft; metal forward sections for engine mounts and armament access.</li>
                <li><strong>Wing:</strong> thick section for stability and volume; robust gun bays and serviceability features.</li>
                <li><strong>Powerplant:</strong> Merlin III and successors; reliable, maintainable installations with theatre adaptations.</li>
                <li><strong>Armament:</strong> eight .303 Brownings (early), evolving to four 20 mm Hispanos for ground-attack roles.</li>
              </ul>
            </div>
          </section>

          {/* Pilot Perspective */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Pilot Perspective</h2>
            <blockquote className="border-l-4 border-slate-600 bg-slate-800 text-white p-6 mb-8 italic rounded">
              "Honest and predictable — exactly what you need when life depends on it."
              <footer className="text-right mt-2 not-italic text-sm text-white/80">— RAF Squadron recollection</footer>
            </blockquote>
          </section>

          {/* Legacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Legacy and Impact</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Hurricane's legacy is organisational: a design optimised for production reality, squadron training, 
                repairability, and sustained combat availability. In 1940 that calculus defeated a numerically superior foe. 
                The type's later careers across theatres affirmed the wisdom of engineering for the system, not the test stand.
              </p>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Related Books and Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Related Books</h3>
                <div className="space-y-3">
                  <Link href="/books/british-aircraft-great-war" className="block text-blue-600 hover:text-blue-800 underline">
                    British Aircraft of the Great War
                  </Link>
                  <Link href="/books/captain-eric-brown" className="block text-blue-600 hover:text-blue-800 underline">
                    Captain Eric "Winkle" Brown: Test Pilot Biography
                  </Link>
                  <Link href="/books/supermarine-spitfire-development" className="block text-blue-600 hover:text-blue-800 underline">
                    Supermarine Spitfire Development
                  </Link>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  <Link href="/blog/supermarine-spitfire-development-history" className="block text-blue-600 hover:text-blue-800 underline">
                    Supermarine Spitfire Development History
                  </Link>
                  <Link href="/blog/test-pilot-biography-eric-brown" className="block text-blue-600 hover:text-blue-800 underline">
                    Test Pilot Perspectives: Eric Brown
                  </Link>
                  <Link href="/blog/battle-of-britain-aviation-history" className="block text-blue-600 hover:text-blue-800 underline">
                    Battle of Britain: Aviation History
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </div>
  );
}
