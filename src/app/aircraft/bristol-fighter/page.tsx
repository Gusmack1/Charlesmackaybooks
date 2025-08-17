import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBooksData } from '@/utils/bookUtils';

export const metadata: Metadata = {
  title: 'Bristol Fighter F2B "Brisfit" | Complete Technical Guide & Combat History | Charles E. MacKay',
  description: 'Comprehensive analysis of the Bristol Fighter F2B - technical specifications, combat performance, operational history, and legacy. Authoritative research by aviation historian Charles E. MacKay.',
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
    'Rolls-Royce Falcon engine',
    'Charles E MacKay',
    'aviation history'
  ],
  openGraph: {
    title: 'Bristol Fighter F2B "Brisfit" | Complete Technical Guide & Combat History',
    description: 'Comprehensive analysis of the Bristol Fighter F2B including specifications, combat performance, and operational history during World War I.',
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
    "image": "https://charlesmackaybooks.com/blog-images/default-generic.svg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://charlesmackaybooks.com/aircraft/bristol-fighter"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bristol Fighter F2B "Brisfit"
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              The Aggressive Two-Seat Fighter That Revolutionized WWI Combat
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded-full">WWI Fighter</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">1917-1918</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Rolls-Royce Falcon</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Two-Seat Design</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction: The Aggressive Two-Seat Fighter</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Bristol Fighter F.2B — the "Brisfit" — overturned assumptions about two-seat aircraft in 1917. 
                Properly flown, it fought like a single-seat fighter while retaining reconnaissance power and observation. 
                This comprehensive analysis provides a formal, research-backed account of its conception, structure, 
                engine and systems, armament, gunnery, crew coordination, maintenance and logistics, tactics, 
                operational history, comparisons with contemporaries, and its long legacy in multi-role doctrine.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Bristol F.2B in formation, sunlight on upper wing surfaces, observer scanning astern" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  A fighter with two minds: pilot's forward firepower; observer's situational guard.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{spec.category}</h3>
                  <div className="space-y-3">
                    {spec.specifications.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start">
                        <span className="font-medium text-slate-700">{item.parameter}:</span>
                        <div className="text-right">
                          <span className="text-slate-900">{item.value}</span>
                          {item.notes && (
                            <div className="text-sm text-slate-600 mt-1">{item.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Narrative */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Origins and Requirements</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Royal Flying Corps sought a two-seat aircraft capable of aggressive patrols, escort, and reconnaissance 
                under hostile skies. Early two-seaters survived by defensive fire and tight formations; the Brisfit was 
                designed to change the grammar of two-seat fighting from passive to offensive. The design brief emphasised 
                speed, climb, and manoeuvrability with a second gun position that added capability rather than drag alone.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Design and Structure</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Chief designer Frank Barnwell's team balanced strength and weight through a conventional wood-and-fabric 
                structure with steel fittings at high-load joints. Mass was concentrated around the centre of gravity to 
                improve roll response. The centre-section was robust, the wings braced for stiffness, and the tail volume 
                generous for control authority. Field repairability was a design requirement: spares, fabric, wire, and 
                standard fittings enabled rapid patching near the front.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Powerplant: Rolls-Royce Falcon</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Falcon V-12 provided the decisive margin: robust power delivery, responsive throttle, and dependable 
                cooling when cowlings and shutters were managed correctly. Unit practices covered plug inspection, coolant 
                checks, and radiator care; hot-weather operations demanded attention to mixture and climb schedules. 
                The engine's reliability underpinned offensive tactics, allowing confident dives and climbs back to altitude.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Close shot of Falcon engine installation with cowlings off; mechanics check magnetos and coolant lines" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Power and process: Falcon maintenance discipline sustained availability.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Armament and Fields of Fire</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Forward armament comprised a synchronized Vickers gun aligned to deliver stable fire at convergence. 
                Aft, one or two Lewis guns on the Scarff ring covered the upper rear hemisphere. Ammunition management 
                — belt care and drum changes — was drilled. The intent was unity of action: the pilot pressed attacks; 
                the observer controlled the geometry astern, denying enemy aircraft preferred approach arcs.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Combat diagram showing Brisfit forward cone of fire and observer arcs; recommended break patterns" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Geometry of advantage: coordinated cones of fire and disciplined breaks.
                </p>
              </div>
            </div>
          </section>

          {/* Service Records */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Operational Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceRecords.map((record, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{record.squadron}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Period:</span> {record.period}</p>
                    <p><span className="font-medium">Theatre:</span> {record.theatre}</p>
                    <p><span className="font-medium">Role:</span> {record.role}</p>
                    <div>
                      <span className="font-medium">Notable Operations:</span>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        {record.notableOperations.map((op, opIndex) => (
                          <li key={opIndex}>{op}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Combat Records */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notable Combat Engagements</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-2 text-left">Date</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Pilot</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Observer</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Enemy</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {combatRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-2">{record.date}</td>
                      <td className="border border-slate-300 px-4 py-2">{record.pilot}</td>
                      <td className="border border-slate-300 px-4 py-2">{record.observer}</td>
                      <td className="border border-slate-300 px-4 py-2">{record.location}</td>
                      <td className="border border-slate-300 px-4 py-2">{record.enemy}</td>
                      <td className="border border-slate-300 px-4 py-2">{record.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Development History */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Development Timeline</h2>
            <div className="space-y-4">
              {developmentHistory.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                    {item.date}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{item.milestone}</h4>
                    <p className="text-slate-700">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Legacy and Influence</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The Brisfit validated the offensive two-seat fighter. Lessons in crew coordination, maintenance practice, 
                and armament management flowed into later multi-role doctrine and training. Its long post-war service 
                confirmed robustness and adaptability across climates and roles, from patrol to policing, where reliability 
                and repairability mattered as much as peak speed.
              </p>
              
              <div className="my-8">
                <Image 
                  src="/blog-images/default-generic.svg" 
                  alt="Post-war F.2B on a grass field; maintenance party with fabric patching frame" 
                  width={800} 
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2 text-center italic text-gray-600">
                  Longevity by design: repairable structure, reliable engine, and trained crews.
                </p>
              </div>
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
                  <Link href="/books/german-aircraft-great-war" className="block text-blue-600 hover:text-blue-800 underline">
                    German Aircraft of the Great War
                  </Link>
                  <Link href="/books/clydeside-aviation-vol1" className="block text-blue-600 hover:text-blue-800 underline">
                    Clydeside Aviation Volume One: The Great War
                  </Link>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  <Link href="/blog/british-aircraft-great-war-rfc-rnas" className="block text-blue-600 hover:text-blue-800 underline">
                    British Aircraft of the Great War: RFC & RNAS Development
                  </Link>
                  <Link href="/blog/sopwith-camel-wwi-fighter" className="block text-blue-600 hover:text-blue-800 underline">
                    Sopwith Camel: WWI Fighter
                  </Link>
                  <Link href="/blog/aviation-manufacturing-wartime-production" className="block text-blue-600 hover:text-blue-800 underline">
                    Aviation Manufacturing in Wartime
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
                The Brisfit's achievement lies in integration: airframe agility, reliable power, coordinated armament, 
                trained crews, and maintainable structure. Its record stands as a study in how concept, engineering, 
                and operations combine to create combat power — a lesson with modern relevance wherever multi-role 
                aircraft and crew coordination determine outcomes.
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
