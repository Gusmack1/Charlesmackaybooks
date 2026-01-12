export type BlogPostEntry = {
  title: string
  slug: string
  excerpt: string
  date: string
  image: string
  tags: string[]
  readTime: string
}

export type BlogCategoryMap = Record<string, BlogPostEntry[]>

export type BlogPostWithCategory = BlogPostEntry & { category: string }

export const blogCategories: BlogCategoryMap = {
  'Scottish Aviation History': [
    {
      title: 'Beardmore Aviation: Scottish Industrial Giant',
      slug: 'beardmore-aviation-scottish-industrial-giant',
      excerpt: 'The remarkable story of William Beardmore and Company, the Scottish engineering conglomerate that revolutionized shipbuilding, steel production, and aviation from Glasgow and the Clyde.',
      date: 'January 12, 2024',
      image: '/blog-images/beardmore-clyde-shipyard.jpg',
      tags: ['Scottish Aviation', 'Industrial History', 'Shipbuilding', 'Engineering'],
      readTime: '12 min'
    },
    {
      title: 'Clydeside Aviation Revolution: Glasgow\'s Industrial Heritage',
      slug: 'clydeside-aviation-revolution',
      excerpt: 'How Glasgow\'s mighty shipyards transformed into aviation powerhouses during two world wars.',
      date: 'January 16, 2024',
      image: '/blog-images/clydeside-aviation-dalmuir.svg',
      tags: ['Scottish Aviation', 'Industrial History', 'Clydeside', 'WWII'],
      readTime: '10 min'
    },
    {
      title: 'Percy Pilcher: Scotland\'s Forgotten Aviation Pioneer',
      slug: 'percy-pilcher-scotland-aviation-pioneer',
      excerpt: 'The Scottish pioneer whose gliding experiments nearly achieved powered flight before the Wright Brothers.',
      date: 'January 14, 2024',
      image: '/blog-images/percy-pilcher-hawk-glider-scotland.jpg',
      tags: ['Scottish Aviation', 'Aviation Pioneers', 'Gliding', 'Early Flight'],
      readTime: '8 min'
    },
    {
      title: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes',
      slug: 'scottish-aviation-between-the-wars',
      excerpt: 'How Scotland maintained aviation capability between WWI and WWII through routes, clubs, and retained industrial capacity.',
      date: 'January 18, 2025',
      image: '/blog-images/scottish-interwar-air-routes-schematic.svg',
      tags: ['Scottish Aviation', 'Inter-War', 'Civil Aviation', 'Renfrew Airport'],
      readTime: '16 min'
    }
  ],
  'WWI Aviation': [
    {
      title: 'Sopwith Camel: The WWI Fighter That Won Air Superiority',
      slug: 'sopwith-camel-wwi-fighter',
      excerpt: 'The most successful Allied fighter of the Great War. Discover how this tricky but effective aircraft shot down more enemy planes than any other Allied fighter.',
      date: 'January 30, 2025',
      image: '/blog-images/sopwith-camel-historical-1918.jpg',
      tags: ['WWI Aviation', 'Sopwith Camel', 'Fighter Aircraft', 'Great War'],
      readTime: '17 min'
    },
    {
      title: 'Bristol Fighter F2B: The Legendary Brisfit of the Great War',
      slug: 'bristol-fighter-f2b-brisfit',
      excerpt: 'The two-seat fighter that became one of the most successful British aircraft of WWI, transforming from initial disaster to aerial supremacy.',
      date: 'January 25, 2025',
      image: '/blog-images/bristol-fighter-f2b-flying.jpg',
      tags: ['WWI Aviation', 'Bristol Fighter', 'F2B', 'British Aircraft'],
      readTime: '14 min'
    },
    {
      title: 'British Aircraft Great War: RFC & RNAS Development',
      slug: 'british-aircraft-great-war-rfc-rnas',
      excerpt: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters.',
      date: 'January 15, 2024',
      image: '/blog-images/sopwith-camel-rfc.jpg',
      tags: ['WWI Aviation', 'RFC', 'RNAS', 'British Aircraft'],
      readTime: '14 min'
    },
    {
      title: 'German Aircraft Great War Development',
      slug: 'german-aircraft-great-war-development',
      excerpt: 'Revolutionary German aviation development from Albatros to Fokker that challenged Allied air superiority.',
      date: 'January 18, 2024',
      image: '/blog-images/fokker-synchronization-gear-schematic.svg',
      tags: ['WWI Aviation', 'German Aircraft', 'Fighter Development', 'Luftstreitkräfte'],
      readTime: '11 min'
    },
    {
      title: 'Albatros D.Va: Design, Strengths, and Frontline Service',
      slug: 'albatros-dva-technical-legacy',
      excerpt: 'Semi-monocoque fuselage, sesquiplane wings, and the frontline realities of 1917–1918 air combat.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['WWI Aviation', 'Albatros D.Va', 'German Fighter'],
      readTime: '22 min'
    },
    {
      title: 'Aces, Jagdgeschwader, and Organisation: German Fighter Culture in WWI',
      slug: 'german-aces-organization-wwi',
      excerpt: 'Von Hoeppner’s reforms, squadron tactics, and the rise of the “ace” in German fighter aviation.',
      date: 'August 14, 2025',
      image: '/blog-images/jagdgeschwader-organization-schematic.svg',
      tags: ['WWI Aviation', 'German Aces', 'Jagdgeschwader'],
      readTime: '16 min'
    }
  ],
  'WWII Aviation': [
    {
      title: 'Supermarine Spitfire Development History',
      slug: 'supermarine-spitfire-development-history',
      excerpt: 'From racing seaplanes to fighter legend: R.J. Mitchell\'s masterpiece that saved Britain.',
      date: 'January 25, 2024',
      image: '/blog-images/spitfire-k5054-prototype.jpg',
      tags: ['WWII Aviation', 'Spitfire', 'Fighter Aircraft', 'R.J. Mitchell'],
      readTime: '16 min'
    },
    {
      title: 'Supermarine Spitfire Evolution: From Prototype to Legend',
      slug: 'supermarine-spitfire-development-evolution',
      excerpt: 'The complete evolution of the Spitfire from K5054 prototype through all variants, examining how continuous development kept this fighter competitive throughout WWII.',
      date: 'January 22, 2025',
      image: '/blog-images/spitfire-prototype-k5054-historical.jpg',
      tags: ['WWII Aviation', 'Spitfire Evolution', 'Aircraft Development', 'Fighter Variants'],
      readTime: '18 min'
    },
    {
      title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
      slug: 'hawker-hurricane-fighter-development',
      excerpt: 'The workhorse fighter that shot down more German aircraft than any other during the Battle of Britain.',
      date: 'January 25, 2024',
      image: '/blog-images/hawker-hurricane.svg',
      tags: ['WWII Aviation', 'Hurricane', 'Battle of Britain', 'Fighter Aircraft'],
      readTime: '13 min'
    },
    {
      title: 'Luftwaffe 1945: The Final Year',
      slug: 'luftwaffe-1945-final-year',
      excerpt: 'The desperate final months of the German air force, from jet fighters to the collapse of the Third Reich.',
      date: 'January 20, 2024',
      image: '/blog-images/me262-luftwaffe.jpg',
      tags: ['WWII Aviation', 'Luftwaffe', 'German Aircraft', 'Jet Aircraft'],
      readTime: '15 min'
    },
    {
      title: 'Arado Ar 234: The World’s First Operational Jet Bomber',
      slug: 'arado-ar234-jet-bomber',
      excerpt: 'Design, engines, operations, and legacy of the revolutionary German jet bomber that redefined late-war reconnaissance and strike.',
      date: 'August 14, 2025',
      image: '/blog-images/arado-ar234-blitz-schematic.svg',
      tags: ['WWII Aviation', 'Arado Ar 234', 'Jet Bomber'],
      readTime: '26 min'
    }
  ],
  'Cold War Aviation': [
    {
      title: 'Korean War Air Combat: The First Jet vs Jet Battles That Shaped Modern Aviation',
      slug: 'korean-war-air-combat',
      excerpt: 'F-86 Sabre vs MiG-15 battles over MiG Alley that established modern jet warfare principles and launched the supersonic age.',
      date: 'January 29, 2025',
      image: '/blog-images/korean-war-air-combat-featured-schematic.svg',
      tags: ['Korean War', 'F-86 Sabre', 'MiG-15', 'Jet Combat'],
      readTime: '11 min'
    },
    {
      title: 'V-Force: Britain\'s Nuclear Deterrent Bombers That Defended the Free World',
      slug: 'british-nuclear-deterrent-v-force',
      excerpt: 'The complete story of Britain\'s V-Force nuclear deterrent - Vulcan, Victor, and Valiant bombers that maintained Cold War peace.',
      date: 'January 29, 2025',
      image: '/blog-images/vulcan-bomber-formation.jpg',
      tags: ['Cold War', 'V-Force', 'Nuclear Deterrent', 'Strategic Bombers'],
      readTime: '12 min'
    },
    {
      title: 'Avro Vulcan: Aerodynamics, Systems, and Britain’s Cold War Deterrent',
      slug: 'avro-vulcan-bomber',
      excerpt: 'Delta wings, high-altitude penetration, and the V-Force doctrine that shaped RAF nuclear and conventional strategy.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['Cold War', 'Avro Vulcan', 'V-Force'],
      readTime: '24 min'
    }
  ],
  'Jet Age Aviation': [
    {
      title: 'English Electric Lightning: Britain\'s Supersonic Interceptor Revolution',
      slug: 'english-electric-lightning-development',
      excerpt: 'The extraordinary development of Britain\'s first supersonic fighter that could climb to 60,000 feet in under three minutes.',
      date: 'January 29, 2025',
      image: '/blog-images/english-electric-lightning-f6.svg',
      tags: ['Jet Age', 'Lightning', 'Supersonic Fighter', 'Cold War'],
      readTime: '12 min'
    },
    {
      title: 'Messerschmitt Me 262: Revolutionary Jet Fighter That Changed Aerial Warfare',
      slug: 'me262-jet-fighter-revolution',
      excerpt: 'The world\'s first operational jet fighter that introduced the jet age and transformed aerial combat during WWII\'s final phase.',
      date: 'January 29, 2025',
      image: '/blog-images/me262-jet-fighter-historical.jpg',
      tags: ['WWII Aviation', 'Me 262', 'Jet Fighter', 'German Innovation'],
      readTime: '13 min'
    },
    {
      title: 'The Jet Age Revolution: Cold War Aviation Development',
      slug: 'jet-age-aviation-cold-war-development',
      excerpt: 'How the Cold War drove rapid jet development from primitive jets to supersonic fighters.',
      date: 'January 25, 2024',
      image: '/blog-images/lightning-f6-supersonic.svg',
      tags: ['Jet Age', 'Cold War', 'Supersonic Flight', 'Fighter Development'],
      readTime: '17 min'
    },
    {
      title: 'F-86 Sabre: Cold War\'s Legendary Fighter',
      slug: 'f86-sabre-cold-war-fighter',
      excerpt: 'The swept-wing fighter that dominated MiG Alley and established Western air superiority.',
      date: 'January 17, 2024',
      image: '/blog-images/f86-sabre-formation-korea-schematic.svg',
      tags: ['Jet Age', 'F-86 Sabre', 'Cold War', 'Fighter Aircraft'],
      readTime: '12 min'
    }
  ],
  'Aviation Racing': [
    {
      title: 'Schneider Trophy Racing: High-Speed Seaplane Development That Shaped Fighter Aviation',
      slug: 'schneider-trophy-racing-development',
      excerpt: 'How high-speed seaplane competition drove aviation innovation from 1913-1931 and led directly to Spitfire development.',
      date: 'January 29, 2025',
      image: '/blog-images/schneider-s6b-systems-featured-schematic.svg',
      tags: ['Aviation Racing', 'Schneider Trophy', 'Seaplanes', 'Innovation'],
      readTime: '14 min'
    }
  ],
  'Aviation Biography': [
    {
      title: 'De Havilland Chipmunk: The RAF Training Aircraft That Shaped British Aviation',
      slug: 'de-havilland-chipmunk-wp808-turnhouse',
      excerpt: 'The comprehensive story of the De Havilland Chipmunk - Britain\'s most successful training aircraft that trained over 100,000 RAF pilots from 1950 to 1996. Discover the technical excellence and service legacy of this beloved trainer.',
      date: 'January 30, 2025',
      image: '/blog-images/de-havilland-chipmunk-formation.jpg',
      tags: ['Aviation Biography', 'Training Aircraft', 'RAF', 'De Havilland'],
      readTime: '12 min'
    },
    {
      title: 'Captain Eric Brown: Britain\'s Greatest Test Pilot',
      slug: 'test-pilot-biography-eric-brown',
      excerpt: 'The extraordinary life of the test pilot who flew 487 different aircraft types.',
      date: 'December 26, 2024',
      image: '/blog-images/eric-brown-official-portrait.jpg',
      tags: ['Aviation Biography', 'Test Pilots', 'Eric Brown', 'Aircraft Testing'],
      readTime: '18 min'
    },
    {
      title: 'Lucy Lady Houston: Mother of the Few',
      slug: 'lucy-lady-houston-schneider-trophy',
      excerpt: 'How Lady Houston\'s £100,000 donation saved the Schneider Trophy and enabled Spitfire development.',
      date: 'January 22, 2024',
      image: '/blog-images/lucy-lady-houston-portrait-schematic.svg',
      tags: ['Aviation Biography', 'Schneider Trophy', 'Philanthropy', 'Aviation History'],
      readTime: '13 min'
    },
    {
      title: 'Dieter Dengler and the Skyraider: Shoot‑down, Captivity, Escape',
      slug: 'dieter-dengler-skyraider-escape',
      excerpt: 'A‑1 Skyraider endurance, the Laos shoot‑down, captivity, and a daring escape—carrier ops context.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['Aviation Biography', 'Dieter Dengler', 'Skyraider'],
      readTime: '12 min'
    }
  ],
  'Helicopter History': [
    {
      title: 'Sikorsky VS-300: The Helicopter Breakthrough That Started the Vertical Flight Revolution',
      slug: 'sikorsky-vs300-helicopter-breakthrough',
      excerpt: 'The complete story of Igor Sikorsky\'s VS-300 - the helicopter that proved practical vertical flight was possible.',
      date: 'January 29, 2025',
      image: '/blog-images/sikorsky-vs300-helicopter.svg',
      tags: ['Helicopter History', 'Sikorsky VS-300', 'Igor Sikorsky', 'Vertical Flight'],
      readTime: '11 min'
    },
    {
      title: 'Bristol Sycamore: Britain\'s First Production Helicopter Revolution',
      slug: 'bristol-sycamore-helicopter-development',
      excerpt: 'The complete development story of Britain\'s first production helicopter that established British helicopter manufacturing.',
      date: 'January 29, 2025',
      image: '/blog-images/bristol-sycamore.jpg',
      tags: ['Helicopter History', 'Bristol Sycamore', 'British Aviation', 'Rotorcraft'],
      readTime: '12 min'
    },
    {
      title: 'Rotorcraft Military Applications: From Search and Rescue to Combat Operations',
      slug: 'rotorcraft-military-applications',
      excerpt: 'How helicopters transformed military operations from battlefield medical evacuation to special forces insertion and modern combat roles.',
      date: 'January 20, 2025',
      image: '/blog-images/bristol-sycamore.jpg',
      tags: ['Helicopter History', 'Military Aviation', 'Combat Helicopters', 'Search and Rescue'],
      readTime: '15 min'
    },
    {
      title: 'Helicopter Development: From Autogyros to Modern Rotorcraft',
      slug: 'helicopter-development-pioneers',
      excerpt: 'From spinning maple seeds to modern rotorcraft - the evolution of vertical flight technology.',
      date: 'January 12, 2024',
      image: '/blog-images/sikorsky-vs300-helicopter.svg',
      tags: ['Helicopter History', 'Vertical Flight', 'Autogyro', 'Rotorcraft'],
      readTime: '17 min'
    },
    {
      title: 'Autogyro vs Helicopter: The Bridge to True Vertical Flight',
      slug: 'autogyro-vs-helicopter',
      excerpt: 'How Cierva’s autorotation breakthroughs enabled Sikorsky’s controlled powered hover and modern rotorcraft.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['Helicopter History', 'Autogyro', 'Sikorsky'],
      readTime: '26 min'
    },
    {
      title: 'Sycamore Seeds and Helicopter Evolution: Nature\'s Inspiration',
      slug: 'sycamore-seeds-helicopter-evolution',
      excerpt: 'How nature\'s spinning sycamore seeds revealed the fundamental principles of autorotation and inspired generations of helicopter pioneers.',
      date: 'January 18, 2024',
      image: '/blog-images/sycamore-seeds-helicopter.jpg',
      tags: ['Helicopter History', 'Biomimicry', 'Autorotation', 'Natural Flight'],
      readTime: '14 min'
    }
  ],
  'Naval Aviation': [
    {
      title: 'Naval Aviation History: From First Carrier Landings to Modern Fleet Operations',
      slug: 'naval-aviation-history',
      excerpt: 'The development of aircraft carriers and naval aviation from WWI to modern times.',
      date: 'January 10, 2024',
      image: '/blog-images/hms-argus-aircraft-carrier.jpg',
      tags: ['Naval Aviation', 'Aircraft Carriers', 'Fleet Air Arm', 'Maritime Aviation'],
      readTime: '16 min'
    },
    {
      title: 'HMS Argus: The World\'s First True Aircraft Carrier',
      slug: 'hms-argus-first-aircraft-carrier',
      excerpt: 'The pioneering aircraft carrier that established naval aviation principles and transformed maritime warfare forever.',
      date: 'January 20, 2024',
      image: '/blog-images/hms-argus-flush-deck-schematic.svg',
      tags: ['Naval Aviation', 'HMS Argus', 'Aircraft Carriers', 'Naval History'],
      readTime: '11 min'
    },
    {
      title: 'HMS Argus Carrier Operations: Pioneering Naval Aviation Procedures',
      slug: 'hms-argus-first-aircraft-carrier-operations',
      excerpt: 'Detailed examination of the operational procedures, deck operations, and pioneering flight operations that made HMS Argus the template for all future aircraft carriers.',
      date: 'January 18, 2025',
      image: '/blog-images/hms-argus-deck-operations-schematic.svg',
      tags: ['Naval Aviation', 'HMS Argus', 'Carrier Operations', 'Flight Deck Procedures'],
      readTime: '13 min'
    },
    {
      title: 'Beardmore W.B.III and Clyde-Built Naval Fighters',
      slug: 'beardmore-wbiii-naval-fighter',
      excerpt: 'From shipyard ingenuity to deck-landing realities: Scotland’s naval fighter contribution in WWI.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['Naval Aviation', 'Beardmore', 'HMS Argus'],
      readTime: '22 min'
    }
  ],
  'Industrial History': [
    {
      title: 'Aviation Manufacturing Wartime Production',
      slug: 'aviation-manufacturing-wartime-production',
      excerpt: 'How British industry transformed to produce thousands of aircraft monthly during WWII.',
      date: 'January 16, 2024',
      image: '/blog-images/b24-assembly-line-willow-run.jpg',
      tags: ['Industrial History', 'Aircraft Manufacturing', 'WWII Production', 'Factory Systems'],
      readTime: '17 min'
    },
    {
      title: 'Adolf Rohrbach: Revolutionary Metal Aircraft Construction Pioneer',
      slug: 'adolf-rohrbach-metal-aircraft-construction',
      excerpt: 'The visionary engineer who transformed aviation through all-metal aircraft construction and stressed-skin monocoque design principles.',
      date: 'January 15, 2024',
      image: '/blog-images/rohrbach-roland.jpg',
      tags: ['Industrial History', 'Aircraft Construction', 'Metal Aircraft', 'Engineering Innovation'],
      readTime: '13 min'
    },
    {
      title: 'Adolf Rohrbach Metal Aircraft Revolution: Engineering the Future',
      slug: 'adolf-rohrbach-metal-aircraft-revolution',
      excerpt: 'How Adolf Rohrbach\'s innovative metal aircraft construction techniques revolutionized aviation manufacturing and influenced modern aircraft design principles.',
      date: 'January 12, 2025',
      image: '/blog-images/rohrbach-ro-ix-aircraft.jpg',
      tags: ['Industrial History', 'Rohrbach Revolution', 'Metal Construction', 'Aviation Engineering'],
      readTime: '15 min'
    },
    {
      title: 'From Liners to Lancaster Parts: Morris Furniture’s War Work and Aviation Supply Chains',
      slug: 'morris-furniture-war-work-aviation',
      excerpt: 'How Glasgow’s Morris Furniture pivoted to rifle stocks, Upkeep/Highball components, rotor blades, and aerodynamic models.',
      date: 'August 14, 2025',
      image: '/blog-images/women-aircraft-workers.jpg',
      tags: ['Industrial History', 'Glasgow', 'Upkeep', 'Weir', 'Cierva'],
      readTime: '18 min'
    }
  ]
  ,
  'Travel Literature': [
    {
      title: 'Dorothy Wordsworth’s Scottish Tour of 1803',
      slug: 'dorothy-wordsworth-scottish-tour-1803',
      excerpt: 'A richly researched account of Dorothy Wordsworth’s 1803 Scottish journey—routes, people, costs, and the Romantic gaze—contextualised for modern readers.',
      date: 'August 14, 2025',
      image: '/blog-images/default-generic.svg',
      tags: ['Travel Literature', 'Dorothy Wordsworth', 'Scottish Tour 1803', 'Romanticism'],
      readTime: '18 min'
    }
  ]
  ,
  'Military History': [
    {
      title: 'From MAUD to Alsos: Documents Behind the Allied Atomic Program',
      slug: 'maud-alsos-atomic-program',
      excerpt: 'MAUD, Quebec Agreement, Alsos, and 1945 statements—the documentary spine of the bomb.',
      date: 'August 14, 2025',
      image: '/blog-images/maud-to-alsos-documents-schematic.svg',
      tags: ['Military History', 'MAUD', 'Alsos', 'Atomic Bomb'],
      readTime: '16 min'
    }
  ]
};

export const blogPosts: BlogPostWithCategory[] = Object.entries(blogCategories).flatMap(([category, posts]) =>
  posts.map((post) => ({ ...post, category }))
)
