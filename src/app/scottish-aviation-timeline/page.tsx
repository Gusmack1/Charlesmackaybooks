import PageSEO from '@/components/PageSEO'
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Scottish Aviation Timeline | Complete History 1895-2025 | Charles E. MacKay',
  description: 'Comprehensive timeline of Scottish aviation history from Percy Pilcher to modern aerospace. Featuring Beardmore Aviation, Clydeside manufacturers, and 130 years of Scottish aerospace heritage.',
  keywords: [
    'Scottish aviation history',
    'Beardmore Aviation timeline',
    'Clydeside aviation history',
    'Scottish aircraft manufacturers',
    'Glasgow aviation history',
    'Edinburgh aviation',
    'Scottish aerospace heritage',
    'Scotland aviation timeline',
    'Scottish aviation pioneers',
    'William Beardmore aviation',
    'Scottish airship development',
    'Prestwick aviation history',
    'Scottish Aviation Ltd',
    'Govan Shipbuilders aviation',
    'Percy Pilcher Scotland',
    'Scottish aircraft development',
    'Inchinnan airship station',
    'Dalmuir aircraft factory',
    'Scottish aviation books',
    'Charles MacKay aviation historian'
  ],
  openGraph: {
    title: 'Scottish Aviation Timeline | 130 Years of Aviation Heritage',
    description: 'Comprehensive timeline of Scottish aviation from Percy Pilcher to present day.',
    type: 'website',
  },
};

interface TimelineEvent {
  year: number;
  date?: string;
  title: string;
  description: string;
  category: 'Manufacturing' | 'Military' | 'Commercial' | 'Innovation' | 'Infrastructure' | 'Personnel' | 'International' | 'Research';
  location: string;
  significance: string;
  relatedCompanies?: string[];
  relatedBooks?: string[];
  keyFigures?: string[];
  aircraftTypes?: string[];
  technicalDetails?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1895,
    date: 'June',
    title: 'Percy Pilcher Begins Aviation Experiments in Scotland',
    description: 'Percy Pilcher, working as assistant lecturer at Glasgow University, builds and flies his first hang glider "The Bat". Following correspondence with Otto Lilienthal, he develops advanced glider designs that would influence early aviation development.',
    category: 'Innovation',
    location: 'Glasgow University',
    significance: 'Scotland\'s first systematic aviation experiments and glider development, predating Wright Brothers by 8 years',
    relatedCompanies: ['Glasgow University'],
    relatedBooks: ['soaring-with-wings'],
    keyFigures: ['Percy Pilcher', 'Otto Lilienthal'],
    aircraftTypes: ['Gliders', 'Hang Gliders'],
    technicalDetails: 'First controlled glider flights in Scotland, achieving flights of over 100 meters'
  },
  {
    year: 1896,
    date: 'September',
    title: 'Percy Pilcher\'s "Hawk" Glider First Flight',
    description: 'Pilcher\'s most successful glider design, "The Hawk", makes its first flight. This aircraft would later set distance records and demonstrate the viability of controlled flight in Scotland.',
    category: 'Innovation',
    location: 'Cardross, Scotland',
    significance: 'Demonstrated feasibility of controlled flight, inspiring future Scottish aviation development',
    relatedBooks: ['soaring-with-wings'],
    keyFigures: ['Percy Pilcher', 'Ella Pilcher'],
    aircraftTypes: ['Gliders'],
    technicalDetails: 'Wingspan of 23 feet, weight 50 pounds, capable of flights over 250 meters'
  },
  {
    year: 1897,
    date: 'August',
    title: 'Percy Pilcher Sets World Distance Record',
    description: 'Flying his glider "Hawk" at Stanford Hall, Leicestershire, Pilcher achieves a world distance record of 250 meters (820 feet). His sister Ella assists with aircraft construction and flight operations, making her one of the first women involved in aviation development.',
    category: 'Innovation',
    location: 'Stanford Hall (Scottish Connection)',
    significance: 'First world aviation record by Scotland-based pioneer, proving viability of heavier-than-air flight',
    relatedCompanies: ['Glasgow University'],
    relatedBooks: ['soaring-with-wings'],
    keyFigures: ['Percy Pilcher', 'Ella Pilcher'],
    aircraftTypes: ['Gliders'],
    technicalDetails: 'World record flight of 250 meters, demonstrating controlled gliding flight'
  },
  {
    year: 1898,
    date: 'November',
    title: 'Percy Pilcher Designs Powered Triplane',
    description: 'Pilcher completes designs for a powered triplane aircraft capable of sustained flight. The aircraft features a lightweight engine and innovative control systems that could have achieved powered flight before the Wright Brothers.',
    category: 'Innovation',
    location: 'Glasgow',
    significance: 'Could have achieved first powered flight if completed - 4 years before Wright Brothers',
    relatedBooks: ['soaring-with-wings'],
    keyFigures: ['Percy Pilcher'],
    aircraftTypes: ['Powered Aircraft', 'Triplane'],
    technicalDetails: 'Designed with 4hp engine, triplane configuration, estimated capable of sustained flight'
  },
  {
    year: 1899,
    date: 'September 30',
    title: 'Percy Pilcher Fatal Crash - Powered Flight Plans Lost',
    description: 'Percy Pilcher dies in glider crash while demonstrating "Hawk". His powered triplane, which could have achieved first powered flight, was never completed. Later engineering analysis suggests it was capable of successful flight.',
    category: 'Innovation',
    location: 'Stanford Hall (Scottish Pioneer)',
    significance: 'Scotland loses potential claim to first powered flight - predated Wright Brothers by 4 years',
    relatedCompanies: ['Glasgow University', 'Wilson-Pilcher Company'],
    relatedBooks: ['soaring-with-wings'],
    keyFigures: ['Percy Pilcher'],
    aircraftTypes: ['Gliders', 'Powered Aircraft'],
    technicalDetails: 'Crash due to guy wire failure, ending Scotland\'s early aviation leadership'
  },
  {
    year: 1903,
    date: 'December 17',
    title: 'Wright Brothers First Flight Inspires Scottish Interest',
    description: 'The Wright Brothers\' first powered flight at Kitty Hawk sparks immediate interest among Scottish engineers and industrialists, building on the foundation laid by Percy Pilcher\'s earlier work.',
    category: 'Innovation',
    location: 'Scotland (General)',
    significance: 'Catalyst for Scottish aviation development programs, reviving Pilcher\'s legacy',
    technicalDetails: 'Wright Flyer achieves 12 seconds of powered flight, validating Pilcher\'s theories'
  },
  {
    year: 1909,
    date: 'July',
    title: 'First Aircraft Manufacturing Interest in Scotland',
    description: 'Scottish industrialists begin investigating aviation manufacturing opportunities following the success of early European aviation pioneers and building on Scotland\'s strong engineering heritage.',
    category: 'Manufacturing',
    location: 'Glasgow',
    significance: 'Beginning of organized Scottish aviation industry interest',
    relatedCompanies: ['William Beardmore & Company'],
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1']
  },
  {
    year: 1910,
    date: 'March',
    title: 'First Aviation Demonstrations in Scotland',
    description: 'Early aviation demonstrations take place across Scotland, generating public interest and attracting investment from Scottish engineering companies.',
    category: 'Commercial',
    location: 'Edinburgh, Glasgow',
    significance: 'Public awareness and investment interest in aviation development',
    relatedBooks: ['clydeside-aviation-vol1']
  },
  {
    year: 1913,
    date: 'January',
    title: 'Beardmore Aviation Division Established',
    description: 'William Beardmore & Company formally establishes its Aviation Division, becoming Scotland\'s first major aircraft manufacturer. The division leverages the company\'s shipbuilding expertise for aircraft construction.',
    category: 'Manufacturing',
    location: 'Glasgow, Dalmuir',
    significance: 'First major Scottish entry into aviation manufacturing, transforming from shipbuilding to aircraft',
    relatedCompanies: ['William Beardmore & Company'],
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1'],
    keyFigures: ['William Beardmore'],
    technicalDetails: 'Adapted shipbuilding techniques for aircraft construction'
  },
  {
    year: 1913,
    date: 'November',
    title: 'Royal Flying Corps Establishes Montrose Training Base',
    description: 'The RFC establishes its first Scottish training facility at Montrose, chosen for its favorable coastal winds and open spaces. This becomes one of the most important pilot training centers in the British Empire.',
    category: 'Military',
    location: 'Montrose, Scotland',
    significance: 'Scotland becomes center for British military aviation training',
    relatedBooks: ['clydeside-aviation-vol1', 'british-aircraft-great-war'],
    keyFigures: ['Major C.J. Burke'],
    aircraftTypes: ['Training Aircraft', 'Early Military Aircraft'],
    technicalDetails: 'First military aviation facility in Scotland'
  },
  {
    year: 1914,
    date: 'August',
    title: 'WWI Military Aviation Contracts Begin',
    description: 'Beardmore Aviation receives first military contracts for aircraft production as Britain enters World War I. The Dalmuir works rapidly expands to meet wartime demand.',
    category: 'Military',
    location: 'Dalmuir, Glasgow',
    significance: 'Scotland becomes integral to British aviation war effort',
    relatedCompanies: ['Beardmore Aviation', 'Royal Flying Corps'],
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1', 'british-aircraft-great-war'],
    technicalDetails: 'Initial contracts for reconnaissance and training aircraft'
  },
  {
    year: 1915,
    date: 'June',
    title: 'Scottish Pilots Join RFC Operations',
    description: 'Hundreds of Scottish pilots trained at Montrose join RFC squadrons on the Western Front, flying British aircraft against German opposition including the new Fokker Eindeckers.',
    category: 'Military',
    location: 'Western Front (Scottish Personnel)',
    significance: 'Scottish contribution to air war, demonstrating pilot training effectiveness',
    relatedBooks: ['clydeside-aviation-vol1', 'british-aircraft-great-war', 'german-aircraft-great-war'],
    keyFigures: ['Scottish RFC Pilots'],
    aircraftTypes: ['WWI Fighters', 'Reconnaissance Aircraft']
  },
  {
    year: 1916,
    date: 'March',
    title: 'Beardmore W.B.III Fighter Production',
    description: 'Beardmore begins production of the W.B.III single-seat fighter aircraft, one of Scotland\'s first indigenous aircraft designs. The fighter incorporates shipbuilding construction techniques.',
    category: 'Manufacturing',
    location: 'Dalmuir Works',
    significance: 'First major Scottish-designed aircraft in production',
    relatedCompanies: ['Beardmore Aviation'],
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1', 'british-aircraft-great-war'],
    aircraftTypes: ['Fighter Aircraft'],
    technicalDetails: 'Single-seat fighter with synchronized machine gun'
  },
  {
    year: 1917,
    date: 'June',
    title: 'R101 Airship Project Begins',
    description: 'Beardmore Aviation begins development work on components for the R101 airship project, representing Scottish contribution to British airship development. The Inchinnan facility is constructed specifically for airship work.',
    category: 'Innovation',
    location: 'Inchinnan Airship Station',
    significance: 'Major Scottish contribution to airship technology and large-scale engineering',
    relatedCompanies: ['Beardmore Aviation', 'Air Ministry'],
    relatedBooks: ['beardmore-aviation'],
    aircraftTypes: ['Airships'],
    technicalDetails: 'One of largest buildings in Scotland constructed for airship development'
  },
  {
    year: 1917,
    date: 'October',
    title: 'Peak Wartime Production at Clydeside',
    description: 'Scottish aviation manufacturing reaches peak wartime production with multiple facilities producing aircraft, engines, and components for the Allied war effort.',
    category: 'Manufacturing',
    location: 'Clydeside Region',
    significance: 'Scotland becomes major center of British aircraft production',
    relatedBooks: ['clydeside-aviation-vol1', 'beardmore-aviation'],
    technicalDetails: 'Over 2,000 workers employed in Scottish aviation manufacturing'
  },
  {
    year: 1918,
    date: 'April 1',
    title: 'RAF Formation and Scottish Contribution',
    description: 'Formation of the Royal Air Force incorporates Scottish-manufactured aircraft and personnel, with Beardmore aircraft serving in multiple squadrons. Scottish training facilities become part of RAF infrastructure.',
    category: 'Military',
    location: 'Scotland (Various Bases)',
    significance: 'Scottish aviation becomes integral to RAF operations',
    relatedCompanies: ['RAF', 'Beardmore Aviation'],
    relatedBooks: ['clydeside-aviation-vol1', 'british-aircraft-great-war'],
    technicalDetails: 'Scottish facilities integrated into RAF training and operational structure'
  },
  {
    year: 1919,
    date: 'January',
    title: 'Post-War Aviation Industry Transition',
    description: 'Scottish aviation companies face the challenge of transitioning from wartime to peacetime production, seeking civilian markets for aviation technology.',
    category: 'Commercial',
    location: 'Scotland (Multiple Locations)',
    significance: 'Beginning of civilian aviation industry development in Scotland',
    relatedBooks: ['clydeside-aviation-vol2', 'beardmore-aviation']
  },
  {
    year: 1919,
    date: 'November',
    title: 'Civil Aviation Development Begins',
    description: 'Post-war transition sees Scottish aviation companies exploring civilian aircraft markets and passenger services. Early airlines begin considering Scottish routes.',
    category: 'Commercial',
    location: 'Glasgow, Edinburgh',
    significance: 'Beginning of Scottish civil aviation industry',
    relatedCompanies: ['Beardmore Aviation', 'Scottish Airways (Early)'],
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1920,
    date: 'May',
    title: 'Renfrew Aerodrome Established',
    description: 'Renfrew Aerodrome opens as Scotland\'s first major civil aviation facility, serving Glasgow and the surrounding region. It becomes the hub for Scottish commercial aviation.',
    category: 'Infrastructure',
    location: 'Renfrew, Glasgow',
    significance: 'First major Scottish civil aviation infrastructure',
    relatedBooks: ['clydeside-aviation-vol2'],
    technicalDetails: 'Concrete runways and passenger terminal facilities'
  },
  {
    year: 1921,
    date: 'August',
    title: 'First Commercial Flights from Scotland',
    description: 'Regular passenger services begin operating from Scottish airports, connecting Scotland to London and European destinations.',
    category: 'Commercial',
    location: 'Renfrew, Edinburgh',
    significance: 'Scotland enters the commercial aviation age',
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1923,
    date: 'August',
    title: 'Scottish Aviation Training Programs',
    description: 'Formal pilot training programs established in Scotland, contributing to British aviation personnel development and maintaining Scottish expertise in aviation.',
    category: 'Personnel',
    location: 'Prestwick, Renfrew',
    significance: 'Scotland becomes training center for British aviation',
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1925,
    date: 'July',
    title: 'Helicopter Development Research',
    description: 'Early helicopter development research begins in Scotland, laying groundwork for future rotorcraft innovation. Scottish engineers study Cierva autogyro principles.',
    category: 'Innovation',
    location: 'Glasgow University, Industrial Labs',
    significance: 'Scotland enters rotorcraft development field',
    relatedBooks: ['sycamore-seeds'],
    technicalDetails: 'Early research into rotating wing aircraft principles'
  },
  {
    year: 1926,
    date: 'March',
    title: 'Cierva Autogyro Company Expansion to Scotland',
    description: 'The Cierva Autogyro Company establishes Scottish operations, bringing advanced rotorcraft technology to Scotland and building on existing aviation expertise.',
    category: 'Innovation',
    location: 'Glasgow',
    significance: 'Advanced rotorcraft technology comes to Scotland',
    relatedBooks: ['sycamore-seeds'],
    keyFigures: ['Juan de la Cierva'],
    aircraftTypes: ['Autogyros']
  },
  {
    year: 1930,
    date: 'December',
    title: 'Beardmore Aviation Division Closure',
    description: 'Economic pressures force closure of Beardmore Aviation Division, ending the first major phase of Scottish aviation manufacturing. However, the expertise and infrastructure remain.',
    category: 'Manufacturing',
    location: 'Dalmuir, Glasgow',
    significance: 'End of first era of Scottish aviation manufacturing',
    relatedCompanies: ['William Beardmore & Company'],
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol2']
  },
  {
    year: 1932,
    date: 'June',
    title: 'Scottish Flying Clubs Expansion',
    description: 'Flying clubs proliferate across Scotland, making aviation accessible to civilians and maintaining Scottish aviation skills during the economic downturn.',
    category: 'Commercial',
    location: 'Scotland (Multiple Locations)',
    significance: 'Democratization of aviation in Scotland',
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1935,
    date: 'January',
    title: 'Scottish Aviation Ltd Founded',
    description: 'Scottish Aviation Ltd established at Prestwick, beginning the second major era of Scottish aviation manufacturing. The company builds on the legacy of earlier Scottish aviation pioneers.',
    category: 'Manufacturing',
    location: 'Prestwick, Ayrshire',
    significance: 'Revival of Scottish aviation manufacturing',
    relatedCompanies: ['Scottish Aviation Ltd'],
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1936,
    date: 'September',
    title: 'Military Aircraft Contracts Resume',
    description: 'As European tensions rise, Scottish Aviation Ltd receives military contracts, marking the return of large-scale aircraft production to Scotland.',
    category: 'Military',
    location: 'Prestwick',
    significance: 'Scotland re-enters military aircraft production',
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1939,
    date: 'September',
    title: 'WWII Production Mobilization',
    description: 'Scottish aviation facilities rapidly mobilize for WWII production, drawing on experience from the Great War and inter-war development.',
    category: 'Military',
    location: 'Scotland (Multiple Facilities)',
    significance: 'Scotland becomes crucial to WWII aviation effort',
    relatedBooks: ['clydeside-aviation-vol2']
  },
  {
    year: 1940,
    date: 'September',
    title: 'WWII Aircraft Production Expansion',
    description: 'Scottish aviation facilities expand dramatically to support World War II aircraft production and training. Battle of Britain demonstrates importance of British aircraft manufacturing.',
    category: 'Military',
    location: 'Prestwick, Glasgow, Edinburgh',
    significance: 'Scotland becomes major WWII aviation center',
    relatedCompanies: ['Scottish Aviation Ltd', 'RAF'],
    relatedBooks: ['enemy-luftwaffe-1945']
  },
  {
    year: 1941,
    date: 'June',
    title: 'Atlantic Ferry Operations',
    description: 'Scottish airports become crucial for transatlantic aircraft ferry operations, delivering American aircraft to Britain via Scotland.',
    category: 'International',
    location: 'Prestwick',
    significance: 'Scotland becomes Atlantic gateway for aircraft delivery',
    technicalDetails: 'Thousands of aircraft delivered via Scottish routes'
  },
  {
    year: 1942,
    date: 'April',
    title: 'Advanced Aircraft Manufacturing',
    description: 'Scottish facilities begin producing advanced aircraft designs, contributing to Allied technological superiority over Axis forces.',
    category: 'Manufacturing',
    location: 'Scotland (Multiple Locations)',
    significance: 'Scottish expertise contributes to Allied victory',
    relatedBooks: ['enemy-luftwaffe-1945']
  },
  {
    year: 1945,
    date: 'May',
    title: 'End of WWII Production',
    description: 'End of WWII marks another transition period for Scottish aviation, as facilities adapt from wartime to peacetime production.',
    category: 'Military',
    location: 'Scotland (Multiple Locations)',
    significance: 'Transition to post-war aviation development',
    relatedBooks: ['enemy-luftwaffe-1945']
  },
  {
    year: 1947,
    date: 'July',
    title: 'Bristol Sycamore First Flight',
    description: 'The Bristol Type 171 Sycamore helicopter makes its first flight, representing British advancement in rotorcraft technology building on autogyro experience.',
    category: 'Innovation',
    location: 'Bristol (Scottish Connection)',
    significance: 'Britain enters helicopter age',
    relatedBooks: ['sycamore-seeds'],
    aircraftTypes: ['Helicopters'],
    technicalDetails: 'First successful British helicopter design'
  },
  {
    year: 1948,
    date: 'April',
    title: 'Jet Age Development',
    description: 'Scottish aviation companies begin involvement in jet aircraft development and production programs, adapting to new propulsion technology.',
    category: 'Innovation',
    location: 'Prestwick, Glasgow',
    significance: 'Scotland enters jet age development',
    relatedCompanies: ['Scottish Aviation Ltd'],
    relatedBooks: ['sabres-from-north']
  },
  {
    year: 1950,
    date: 'March',
    title: 'Cold War Aviation Programs',
    description: 'Scottish aviation facilities contribute to Cold War military programs, including maintenance and modification of NATO aircraft.',
    category: 'Military',
    location: 'Scotland (Various Bases)',
    significance: 'Scotland supports NATO aviation requirements',
    relatedBooks: ['sabres-from-north']
  },
  {
    year: 1952,
    date: 'June',
    title: 'Helicopter Production Begins',
    description: 'Scottish Aviation begins helicopter production with the Sycamore, marking Scotland\'s entry into rotorcraft manufacturing and building on decades of aviation expertise.',
    category: 'Manufacturing',
    location: 'Prestwick',
    significance: 'Scotland becomes helicopter manufacturing center',
    relatedCompanies: ['Scottish Aviation Ltd'],
    relatedBooks: ['sycamore-seeds'],
    aircraftTypes: ['Helicopters']
  },
  {
    year: 1954,
    date: 'August',
    title: 'F-86 Sabre European Service',
    description: 'F-86 Sabre fighters enter service with European NATO air forces, including operations from Scottish bases during the Cold War.',
    category: 'Military',
    location: 'Scottish NATO Bases',
    significance: 'Scotland supports NATO jet fighter operations',
    relatedBooks: ['sabres-from-north'],
    aircraftTypes: ['Jet Fighters'],
    technicalDetails: 'Advanced swept-wing jet fighter technology'
  },
  {
    year: 1960,
    date: 'October',
    title: 'Commercial Jet Operations',
    description: 'Scottish airports adapt to commercial jet operations, marking the transition to modern air transport.',
    category: 'Commercial',
    location: 'Prestwick, Edinburgh, Glasgow',
    significance: 'Scotland enters jet passenger transport era'
  },
  {
    year: 1965,
    date: 'March',
    title: 'Advanced Helicopter Development',
    description: 'Scottish companies develop advanced helicopter designs, building on the success of earlier rotorcraft programs.',
    category: 'Innovation',
    location: 'Scotland',
    significance: 'Scotland advances helicopter technology',
    relatedBooks: ['sycamore-seeds']
  },
  {
    year: 1970,
    date: 'January',
    title: 'Offshore Aviation Support',
    description: 'Scottish aviation adapts to support North Sea oil operations, creating a new market for helicopter services.',
    category: 'Commercial',
    location: 'Aberdeen, Scotland',
    significance: 'New aviation markets in offshore energy support'
  },
  {
    year: 1977,
    date: 'January',
    title: 'British Aerospace Formation',
    description: 'Scottish Aviation Ltd becomes part of British Aerospace, integrating Scottish facilities into national aerospace strategy.',
    category: 'Manufacturing',
    location: 'Prestwick, Scotland',
    significance: 'Integration into British aerospace industry',
    relatedCompanies: ['British Aerospace', 'Scottish Aviation Ltd']
  },
  {
    year: 1980,
    date: 'June',
    title: 'Modern Manufacturing Techniques',
    description: 'Scottish aerospace facilities adopt modern manufacturing techniques, maintaining competitiveness in global markets.',
    category: 'Manufacturing',
    location: 'Scotland (Multiple Locations)',
    significance: 'Modernization of Scottish aerospace manufacturing'
  },
  {
    year: 1990,
    date: 'March',
    title: 'Commercial Aviation Expansion',
    description: 'Scottish airports and aviation services expand to support growing international commercial aviation market.',
    category: 'Commercial',
    location: 'Glasgow, Edinburgh, Prestwick',
    significance: 'Scotland becomes major European aviation hub'
  },
  {
    year: 2000,
    date: 'January',
    title: 'Modern Aerospace Technology',
    description: 'Scottish aerospace companies embrace modern technologies including advanced materials and digital systems.',
    category: 'Innovation',
    location: 'Glasgow, Edinburgh, East Kilbride',
    significance: 'Scotland modernizes aerospace capabilities',
    relatedCompanies: ['Various Scottish Aerospace Companies']
  },
  {
    year: 2010,
    date: 'September',
    title: 'Sustainable Aviation Research',
    description: 'Scottish institutions begin research into sustainable aviation technologies, building on over a century of aviation expertise.',
    category: 'Research',
    location: 'Scottish Universities',
    significance: 'Scotland leads in sustainable aviation development'
  },
  {
    year: 2020,
    date: 'Present',
    title: 'Sustainable Aviation Development',
    description: 'Scottish aerospace industry focuses on sustainable aviation technologies and environmental innovation, continuing the tradition of Scottish aviation innovation.',
    category: 'Innovation',
    location: 'Scotland (Multiple Locations)',
    significance: 'Scotland leads in sustainable aviation development'
  },
  {
    year: 1952,
    date: 'November',
    title: 'Britain\'s Nuclear Deterrent Strategy Begins',
    description: 'Britain begins development of its independent nuclear deterrent strategy, initially focused on free-fall nuclear weapons delivered by conventional bombers. Early planning involves adapting existing RAF aircraft for nuclear delivery missions.',
    category: 'Military',
    location: 'Britain',
    significance: 'Beginning of British nuclear aviation capability',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Strategic Bombers'],
    technicalDetails: 'Initial nuclear capability using conventional bomber aircraft'
  },
  {
    year: 1955,
    date: 'July',
    title: 'V-Force Strategic Bomber Program',
    description: 'The V-Force strategic bomber program begins with Vulcan, Victor, and Valiant aircraft entering service. These advanced jet bombers form the backbone of Britain\'s nuclear deterrent through the 1960s and 1970s.',
    category: 'Military',
    location: 'Britain',
    significance: 'Establishment of Britain\'s nuclear bomber force',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Strategic Bombers', 'Nuclear Delivery Systems'],
    technicalDetails: 'Advanced delta-wing and crescent-wing jet bomber designs'
  },
  {
    year: 1962,
    date: 'August',
    title: 'Blue Steel Standoff Missile Development',
    description: 'Development of the Blue Steel standoff missile allows British nuclear bombers to attack targets without overflying heavily defended areas. This represents the transition from direct attack to standoff nuclear delivery systems.',
    category: 'Innovation',
    location: 'Britain',
    significance: 'Revolutionary change in nuclear delivery strategy',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Standoff Weapons', 'Strategic Bombers'],
    technicalDetails: 'Air-launched standoff missile with nuclear warhead'
  },
  {
    year: 1968,
    date: 'June',
    title: 'Polaris Submarine Nuclear Deterrent',
    description: 'Britain\'s Polaris submarine-based nuclear deterrent becomes operational, marking the transition from air-delivered to sea-based nuclear weapons. This shift fundamentally changes British nuclear strategy.',
    category: 'Military',
    location: 'Britain',
    significance: 'Transition from aviation-based to submarine-based nuclear deterrent',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Submarine-Launched Ballistic Missiles'],
    technicalDetails: 'Sea-based nuclear deterrent with global reach capability'
  },
  {
    year: 1982,
    date: 'April',
    title: 'Vulcan Black Buck Missions - Falklands',
    description: 'RAF Vulcan bombers conduct the longest bombing missions in history during the Falklands War, demonstrating the continued relevance of strategic aviation in modern conflicts. These missions showcase British aviation\'s global reach capability.',
    category: 'Military',
    location: 'South Atlantic',
    significance: 'Demonstration of strategic aviation in modern warfare',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Strategic Bombers'],
    technicalDetails: 'Long-range bombing missions with multiple air-to-air refueling operations'
  },
  {
    year: 1994,
    date: 'December',
    title: 'Trident Nuclear Deterrent Operational',
    description: 'Britain\'s Trident submarine-based nuclear deterrent becomes fully operational, representing the most advanced nuclear delivery system in British history. This system maintains Britain\'s nuclear deterrent capability into the 21st century.',
    category: 'Military',
    location: 'Britain',
    significance: 'Modern submarine-based nuclear deterrent system',
    relatedBooks: ['sonic-to-standoff'],
    aircraftTypes: ['Submarine-Launched Ballistic Missiles'],
    technicalDetails: 'Advanced submarine-based nuclear deterrent with multiple warhead capability'
  },
  {
    year: 2024,
    date: 'November',
    title: 'British Nuclear Deterrent Aviation History Published',
    description: 'Charles E. MacKay publishes "Sonic to Stand Off – The Evolution of the British Nuclear Deterrent", documenting the complete development of Britain\'s nuclear delivery systems from supersonic aircraft to standoff weapons. This comprehensive 224-page study traces the evolution from early V-Force bombers through Blue Steel missile development to modern Trident systems, providing the first complete historical analysis of British nuclear aviation strategy.',
    category: 'Research',
    location: 'Glasgow, Scotland',
    significance: 'First comprehensive historical analysis of British nuclear aviation strategy and aircraft development spanning 70 years',
    relatedBooks: ['sonic-to-standoff', 'sabres-from-north', 'enemy-luftwaffe-1945'],
    keyFigures: ['Charles E. MacKay'],
    relatedCompanies: ['Royal United Services Institute', 'King\'s College London', 'Imperial War Museum'],
    aircraftTypes: ['Strategic Bombers', 'Nuclear Delivery Systems', 'Standoff Weapons', 'Submarine-Launched Ballistic Missiles'],
    technicalDetails: 'Chronicles V-Force operations, Blue Steel missile development, Polaris submarine deployment, and transition to Trident deterrent system'
  },
  {
    year: 2025,
    date: 'Current',
    title: 'Scottish Aviation Heritage Recognition',
    description: 'Charles E. MacKay\'s comprehensive documentation of Scottish aviation history through 19 published books preserves and celebrates 130 years of Scottish aviation heritage. His research spans from Percy Pilcher\'s pioneering glider experiments to modern British nuclear deterrent systems, establishing the definitive record of Scottish contributions to world aviation development.',
    category: 'Research',
    location: 'Glasgow, Scotland',
    significance: 'Preservation of Scottish aviation heritage and British military aviation history for future generations through definitive historical documentation',
    relatedBooks: ['beardmore-aviation', 'clydeside-aviation-vol1', 'clydeside-aviation-vol2', 'soaring-with-wings', 'sycamore-seeds', 'sonic-to-standoff'],
    keyFigures: ['Charles E. MacKay'],
    technicalDetails: '19 published books documenting 130 years of aviation history, cited by universities worldwide'
  }
];

const categories = [...new Set(timelineEvents.map(event => event.category))];
const locations = [...new Set(timelineEvents.map(event => event.location))];

export default function ScottishAviationTimelinePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HistoricalDigitalDocument",
    "name": "Scottish Aviation Timeline 1895-2025",
    "description": "Comprehensive timeline documenting 130 years of Scottish aviation history from Percy Pilcher to modern aerospace industry.",
    "author": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charles E. MacKay Aviation Research"
    },
    "dateModified": new Date().toISOString(),
    "about": [
      {
        "@type": "Thing",
        "name": "Scottish Aviation History"
      },
      {
        "@type": "Thing",
        "name": "Beardmore Aviation"
      },
      {
        "@type": "Thing",
        "name": "Clydeside Aviation"
      },
      {
        "@type": "Thing",
        "name": "Percy Pilcher"
      }
    ],
    "mentions": timelineEvents.map(event => ({
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Scottish Aviation Timeline
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive chronological history of Scottish aviation from Percy Pilcher's 1895 experiments
              to present day. Documenting 130 years of innovation, manufacturing, and aerospace heritage across Scotland.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 130 Years of History</span>
              <span>🏭 Manufacturing Heritage</span>
              <span>✈️ Innovation Timeline</span>
              <span>📍 Geographic Coverage</span>
              <span>📚 19 Published Books</span>
              <span>🎓 Academic References</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{timelineEvents.length}</div>
              <div className="text-slate-600">Historical Events</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600">130</div>
              <div className="text-slate-600">Years Covered</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-slate-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-orange-600">19</div>
              <div className="text-slate-600">Related Books</div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Browse Timeline</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-3">By Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {categories.map((category) => (
                  <div key={category} className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="font-semibold text-blue-800 text-sm">{category}</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {timelineEvents.filter(event => event.category === category).length} events
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Era Quick Links */}
            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-3">Historical Eras</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-3 bg-amber-50 rounded-lg text-center cursor-pointer hover:bg-amber-100">
                  <div className="font-semibold text-amber-800">Pioneer Era</div>
                  <div className="text-xs text-amber-600">1895-1914</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center cursor-pointer hover:bg-red-100">
                  <div className="font-semibold text-red-800">WWI Period</div>
                  <div className="text-xs text-red-600">1914-1918</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100">
                  <div className="font-semibold text-green-800">Inter-War</div>
                  <div className="text-xs text-green-600">1918-1939</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center cursor-pointer hover:bg-blue-100">
                  <div className="font-semibold text-blue-800">WWII & Cold War</div>
                  <div className="text-xs text-blue-600">1939-1991</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center cursor-pointer hover:bg-purple-100">
                  <div className="font-semibold text-purple-800">Modern Era</div>
                  <div className="text-xs text-purple-600">1991-Present</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Display */}
          <div className="relative">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Chronological Timeline</h2>

            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>

            <div className="space-y-8">
              {timelineEvents
                .sort((a, b) => a.year - b.year)
                .map((event, index) => (
                  <div key={`${event.year}-${index}`} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-md hidden md:block"></div>

                    {/* Event Card */}
                    <div className="md:ml-16 bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-bold text-slate-800">
                              {event.year}
                              {event.date && <span className="text-lg font-normal text-slate-500 ml-2">({event.date})</span>}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.category === 'Manufacturing' ? 'bg-green-100 text-green-800' :
                              event.category === 'Military' ? 'bg-red-100 text-red-800' :
                              event.category === 'Commercial' ? 'bg-blue-100 text-blue-800' :
                              event.category === 'Innovation' ? 'bg-purple-100 text-purple-800' :
                              event.category === 'Infrastructure' ? 'bg-orange-100 text-orange-800' :
                              event.category === 'Research' ? 'bg-pink-100 text-pink-800' :
                              event.category === 'International' ? 'bg-indigo-100 text-indigo-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {event.category}
                            </span>
                          </div>
                          <h4 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h4>
                          <div className="text-sm text-slate-500 mb-3">📍 {event.location}</div>
                        </div>
                      </div>

                      <p className="text-slate-700 text-lg mb-4 leading-relaxed">{event.description}</p>

                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                        <h5 className="font-semibold text-blue-800 mb-2">Historical Significance:</h5>
                        <p className="text-blue-700">{event.significance}</p>
                      </div>

                      {/* Technical Details */}
                      {event.technicalDetails && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold text-gray-800 mb-2">Technical Details:</h5>
                          <p className="text-gray-700 text-sm">{event.technicalDetails}</p>
                        </div>
                      )}

                      {/* Key Figures */}
                      {event.keyFigures && event.keyFigures.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-slate-700 mb-2">Key Figures:</h5>
                          <div className="flex flex-wrap gap-2">
                            {event.keyFigures.map((figure) => (
                              <span key={figure} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                                {figure}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Aircraft Types */}
                      {event.aircraftTypes && event.aircraftTypes.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-slate-700 mb-2">Aircraft Types:</h5>
                          <div className="flex flex-wrap gap-2">
                            {event.aircraftTypes.map((type) => (
                              <span key={type} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                ✈️ {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Companies */}
                      {event.relatedCompanies && event.relatedCompanies.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-slate-700 mb-2">Related Organizations:</h5>
                          <div className="flex flex-wrap gap-2">
                            {event.relatedCompanies.map((company) => (
                              <span key={company} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                                🏢 {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Books */}
                      {event.relatedBooks && event.relatedBooks.length > 0 && (
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <h5 className="font-semibold text-green-800 mb-2">📚 Related Books by Charles E. MacKay:</h5>
                          <div className="flex flex-wrap gap-2">
                            {event.relatedBooks.map((bookId) => (
                              <Link
                                key={bookId}
                                href={`/books/${bookId}`}
                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                              >
                                📖 View Book →
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Geographic Overview */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Geographic Distribution of Scottish Aviation</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => {
                const locationEvents = timelineEvents.filter(event => event.location === location);
                return (
                  <div key={location} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h4 className="font-semibold text-slate-800 mb-2">{location}</h4>
                    <div className="text-sm text-slate-600 mb-2">
                      {locationEvents.length} historical events
                    </div>
                    <div className="text-xs text-slate-500">
                      Years: {Math.min(...locationEvents.map(e => e.year))} - {Math.max(...locationEvents.map(e => e.year))}
                    </div>
                    <div className="mt-2">
                      {locationEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className="text-xs text-slate-600 mt-1">• {event.title}</div>
                      ))}
                      {locationEvents.length > 2 && (
                        <div className="text-xs text-slate-500 mt-1">+ {locationEvents.length - 2} more events</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Book Collection */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Complete Book Collection</h2>
            <p className="text-slate-600 mb-6">
              Explore Charles E. MacKay's complete collection of 18 aviation history books, documenting
              every aspect of Scottish aviation heritage and international aviation development.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/books/beardmore-aviation" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-blue-800 mb-2">📚 Beardmore Aviation</h4>
                <p className="text-blue-700 text-sm">Scottish industrial giant's aviation activities 1913-1930</p>
              </Link>
              <Link href="/books/clydeside-aviation-vol1" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <h4 className="font-semibold text-green-800 mb-2">📚 Clydeside Aviation Vol 1</h4>
                <p className="text-green-700 text-sm">The Great War aviation on the Clyde 1914-1918</p>
              </Link>
              <Link href="/books/soaring-with-wings" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <h4 className="font-semibold text-purple-800 mb-2">📚 Percy Pilcher Biography</h4>
                <p className="text-purple-700 text-sm">Scotland's lost aviation pioneer who wanted to fly</p>
              </Link>
              <Link href="/books/sycamore-seeds" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <h4 className="font-semibold text-orange-800 mb-2">📚 The Sycamore Seeds</h4>
                <p className="text-orange-700 text-sm">Early history of helicopter development</p>
              </Link>
              <Link href="/books/german-aircraft-great-war" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <h4 className="font-semibold text-red-800 mb-2">📚 German Aircraft WWI</h4>
                <p className="text-red-700 text-sm">German military aircraft during the Great War</p>
              </Link>
              <Link href="/books" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">📖 View All Books</h4>
                <p className="text-gray-700 text-sm">Browse the complete collection of 19 aviation books</p>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
