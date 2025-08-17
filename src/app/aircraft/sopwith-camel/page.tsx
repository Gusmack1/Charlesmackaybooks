import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBooksData } from '@/utils/bookUtils';

export const metadata: Metadata = {
  title: 'Sopwith Camel: The Most Deadly Fighter of World War I | Complete Technical Guide | Charles E. MacKay',
  description: 'Comprehensive analysis of the Sopwith Camel F.1 - legendary WWI fighter aircraft with detailed service history, combat records, and technical specifications. Expert research by aviation historian Charles E. MacKay.',
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
    'Roy Brown Camel',
    'Charles E MacKay',
    'aviation history'
  ],
  openGraph: {
    title: 'Sopwith Camel: The Most Deadly Fighter of World War I',
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
      { parameter: 'Empty Weight', value: '930 lb (422 kg)' },
      { parameter: 'Loaded Weight', value: '1,453 lb (659 kg)' }
    ]
  },
  {
    category: 'Performance',
    data: [
      { parameter: 'Maximum Speed', value: '113 mph (182 km/h) at 6,500 ft' },
      { parameter: 'Cruise Speed', value: '95 mph (153 km/h)' },
      { parameter: 'Service Ceiling', value: '19,000 ft (5,791 m)' },
      { parameter: 'Rate of Climb', value: '1,085 ft/min (5.5 m/s) to 10,000 ft' },
      { parameter: 'Range', value: '300 miles (483 km)' },
      { parameter: 'Endurance', value: '2.5 hours' }
    ]
  },
  {
    category: 'Powerplant',
    data: [
      { parameter: 'Engine', value: 'Clerget 9B rotary (130 hp)' },
      { parameter: 'Alternative Engine', value: 'Bentley BR.1 rotary (150 hp)' },
      { parameter: 'Propeller', value: '2-blade wooden fixed-pitch' },
      { parameter: 'Fuel Capacity', value: '25 gallons (95 L)' },
      { parameter: 'Oil Capacity', value: '2.5 gallons (9.5 L)' }
    ]
  },
  {
    category: 'Armament',
    data: [
      { parameter: 'Primary Armament', value: '2 × .303 in Vickers machine guns' },
      { parameter: 'Synchronization', value: 'Constantinesco gear' },
      { parameter: 'Ammunition', value: '400 rounds per gun' },
      { parameter: 'Sight', value: 'Ring and bead sight' }
    ]
  }
];

const combatEngagements: CombatEngagement[] = [
  {
    date: 'April 21, 1918',
    pilot: 'Captain Roy Brown',
    squadron: 'No. 209 Squadron RAF',
    location: 'Morlancourt Ridge',
    enemy: 'Fokker Dr.I (Manfred von Richthofen)',
    outcome: 'Victory credited to Brown',
    significance: 'Most famous Camel engagement - Red Baron shot down'
  },
  {
    date: 'March 27, 1918',
    pilot: 'Major Donald MacLaren',
    squadron: 'No. 46 Squadron RAF',
    location: 'Near Arras',
    enemy: '6 × Albatros D.V',
    outcome: '6 victories in single day',
    significance: 'Record for most victories in one day by Camel pilot'
  },
  {
    date: 'September 15, 1917',
    pilot: 'Captain Henry Woollett',
    squadron: 'No. 43 Squadron RAF',
    location: 'Ypres Salient',
    enemy: 'Observation balloon',
    outcome: 'Balloon destroyed',
    significance: 'Demonstrated Camel\'s ground attack capability'
  }
];

export default function SopwithCamelPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Sopwith Camel: The Most Deadly Fighter of World War I",
    "description": "Comprehensive analysis of the Sopwith Camel F.1 fighter aircraft including technical specifications, combat performance, and operational history during World War I.",
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
      "@id": "https://charlesmackaybooks.com/aircraft/sopwith-camel"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sopwith Camel: The Most Deadly Fighter of World War I
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Concentrated Mass, Heavy Forward Armament, and Disciplined Tactics
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded-full">WWI Fighter</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">1917-1918</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Clerget Rotary</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">1,200+ Victories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction: The Camel's Reputation and Reality</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Sopwith Camel became the most effective British fighter of the Great War by combining concentrated 
                mass, heavy forward armament, and disciplined tactics. Designed under Herbert Smith at Sopwith, the 
                Camel's reputation rests on measurable outcomes — over a thousand credited victories — and on a design 
                grammar that privileged turning authority and fire concentration over raw straight-line speed.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="A wartime Sopwith Camel in flight profile, twin Vickers cowl visible, with a broken cloud layer below" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  A compact fighter with mass forward: agility in turns, authority in gun runs.
                </p>
              </div>
            </div>
          </section>

          {/* Origins and Design Lineage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Origins and Design Lineage</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Camel evolved from the Pup and Triplane programmes, preserving positive control harmony while adding 
                weight forward for gun installation and stability at firing. Development in 1916 set the pattern: a compact, 
                wood-and-fabric biplane with twin synchronized Vickers .303 in front of the pilot, Constantinesco-type gear, 
                and a rotary engine providing high power-to-weight. Emphasis fell on reliable turning performance and gun 
                effectiveness rather than extreme speed.
              </p>
            </div>
          </section>

          {/* Structure, Systems, and Armament */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Structure, Systems, and Armament</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Wooden fuselage bays with wire bracing and steel fittings provided strength; fabric covering kept weight down. 
                The forward "hump" over the Vickers installation housed ammunition and synchronization. Fuel and pilot sat 
                forward with the engine, concentrating mass within roughly seven feet — a key to turning behaviour. The 
                twin-gun layout gave a dense cone of fire exactly along the pilot's sightline, simplifying gunnery solutions 
                compared with wing-mounted guns.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Cockpit perspective of a Camel showing twin Vickers breeches, ring-and-bead sight, and simple instrumentation" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Concentrated fire: twin Vickers in the pilot's natural line of sight shortened engagements.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {technicalData.map((category, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.data.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start">
                        <span className="font-medium text-slate-700">{item.parameter}:</span>
                        <div className="text-right">
                          <span className="text-slate-900">{item.value}</span>
                          {item.comparison && (
                            <div className="text-sm text-slate-600 mt-1">{item.comparison}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Engines and Performance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Engines and Performance</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Typical powerplants included the 130 hp Clerget 9B and the 150 hp Bentley BR.1. Reported maximum speeds 
                hovered around the low-hundreds mph depending on fit and altitude; service ceilings and climb reflected 
                the rotary's strong initial torque. Drag from the rotating cylinder assembly limited top speed but enhanced 
                throttle response. The chosen engines delivered the kind of immediate power changes useful in close-in 
                manoeuvre and in recovering from high-alpha moments.
              </p>
            </div>
          </section>

          {/* Handling Characteristics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Handling Characteristics and Pilot Technique</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Mass concentration and rotary torque yielded rapid rolling entry and a pronounced right-turn advantage 
                in skilled hands. The same features penalised inattentive pilots in low-speed, high-alpha regimes. 
                Unit conversion syllabi stressed energy awareness: avoid prolonged low-speed skid; exploit the right-turn 
                for nose placement; time bursts to minimise exposure. Pilots briefed drum-tight gunnery sequences and 
                used the Camel as an energy manoeuvre fighter at modest speeds.
              </p>
            </div>
          </section>

          {/* Tactics and Combat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tactics, Formations, and Combat Grammar</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Engagements opened with altitude and sun advantage where possible. Pairs and fours overlapped arcs and 
                avoided flat turning fights when numbers were uncertain. The Camel's grammar emphasised: short decisive 
                bursts, quick repositioning, and stacking support to prevent enemy reversals. Reports show successful 
                slashing attacks against Albatros types, with rapid right rolls to reset the fight.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Combat diagram — Camel cones of fire, recommended break directions, and supporting wingman geometry" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Discipline over drama: brief attacks, mutual support, and controlled breaks.
                </p>
              </div>
            </div>
          </section>

          {/* Ace Records */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Camel Aces and Combat Records</h2>
            <div className="grid gap-6">
              {aceRecords.map((ace, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{ace.pilot}</h3>
                      <div className="text-slate-600 mt-1">{ace.rank} • {ace.squadron}</div>
                      <div className="text-sm text-slate-500">{ace.period}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{ace.victories}</div>
                      <div className="text-sm text-slate-500">Victories</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Notable Victories:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {ace.notableVictories.map((victory, victoryIndex) => (
                        <li key={victoryIndex}>{victory}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notable Combat Engagements */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notable Combat Engagements</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-2 text-left">Date</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Pilot</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Squadron</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Enemy</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Outcome</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {combatEngagements.map((engagement, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-2">{engagement.date}</td>
                      <td className="border border-slate-300 px-4 py-2">{engagement.pilot}</td>
                      <td className="border border-slate-300 px-4 py-2">{engagement.squadron}</td>
                      <td className="border border-slate-300 px-4 py-2">{engagement.location}</td>
                      <td className="border border-slate-300 px-4 py-2">{engagement.enemy}</td>
                      <td className="border border-slate-300 px-4 py-2">{engagement.outcome}</td>
                      <td className="border border-slate-300 px-4 py-2 text-sm">{engagement.significance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Naval Operations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Naval Camel and Early Carrier Operations</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Ship's Camel variants adapted undercarriage and folding arrangements for deck handling. Operations from 
                early carriers demonstrated feasibility of sea-based fighter activity. The Tondern raid against Zeppelin 
                sheds stands as an early case study in maritime air power projection: limited numbers, carefully briefed 
                routes, and decisive effect against high-value targets.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Ship's Camel on carrier deck with chocks and lashings; deck crew in position" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  From fields to decks: early proof that fighters could launch from ships and strike ashore.
                </p>
              </div>
            </div>
          </section>

          {/* Comparisons with German Contemporaries */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Comparisons with German Contemporaries</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Against Albatros D.III/D.V families the Camel traded inferior straight-line speed for superior turning 
                authority and fire concentration. Later types such as the Fokker D.VII brought excellent high-lift 
                characteristics and benign handling that narrowed the Camel's advantages, but Camel units retained 
                effectiveness through tactics and numbers. The British design choice — agility and gunnery — remained 
                coherent with the operational context of 1917–1918.
              </p>
            </div>
          </section>

          {/* Legacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Legacy and Modern Influence</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Camel's core insights — mass concentration for turning authority, sight-line gunnery, and doctrine 
                emphasising brief decisive action — influenced inter-war training and fighter design. The template for 
                an effective light fighter remained: concentrate fire, keep handling crisp, and train pilots to manage 
                energy and exposure time in the fight.
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
                  <Link href="/books/clydeside-aviation-vol1" className="block text-blue-600 hover:text-blue-800 underline">
                    Clydeside Aviation Volume One: The Great War
                  </Link>
                  <Link href="/books/german-aircraft-great-war" className="block text-blue-600 hover:text-blue-800 underline">
                    German Aircraft of the Great War
                  </Link>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  <Link href="/blog/british-aircraft-great-war-rfc-rnas" className="block text-blue-600 hover:text-blue-800 underline">
                    British Aircraft of the Great War: RFC & RNAS Development
                  </Link>
                  <Link href="/blog/aviation-manufacturing-wartime-production" className="block text-blue-600 hover:text-blue-800 underline">
                    Aviation Manufacturing in Wartime
                  </Link>
                  <Link href="/blog/bristol-fighter-f2b-brisfit" className="block text-blue-600 hover:text-blue-800 underline">
                    Bristol Fighter F2B: The Aggressive Two-Seat Fighter
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Sopwith Camel's enduring standing is earned: a coherent design executed with discipline, flown with 
                technique, and supported by maintenance and tactics that made its strengths decisive. Its story is not 
                of myth but of measured choices that produced results.
              </p>
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
