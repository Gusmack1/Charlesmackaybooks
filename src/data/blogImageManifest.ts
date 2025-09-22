export type ImageCandidate = { url: string; alt: string; caption?: string };

const bySlug: Record<string, ImageCandidate[]> = {
  'hms-argus-first-aircraft-carrier': [
    { url: '/blog-images/hms-argus-aircraft-carrier.jpg', alt: 'HMS Argus full-length flight deck' },
    { url: '/blog-images/hms-argus-dazzle-camouflage.jpg', alt: 'HMS Argus dazzle camouflage' },
    { url: '/blog-images/hms-argus-dazzle.jpg', alt: 'HMS Argus dazzle scheme' },
    { url: '/blog-images/hms-formidable-deck-operations.jpg', alt: 'Royal Navy carrier deck operations' }
  ],
  'english-electric-lightning-development': [
    { url: '/blog-images/english-electric-lightning-f6.jpg', alt: 'Lightning F.6 climb-out' },
    { url: '/blog-images/lightning-f6-supersonic-flight.jpg', alt: 'Lightning F.6 in supersonic flight' },
    { url: '/blog-images/lightning-f6-cockpit.jpg', alt: 'Lightning F.6 cockpit with AI.23 radar' },
    { url: '/blog-images/f104-starfighter-supersonic.jpg', alt: 'F-104 Starfighter comparison context' }
  ],
  'supermarine-spitfire-development-history': [
    { url: '/blog-images/spitfire-prototype-k5054.jpg', alt: 'Spitfire prototype K5054' },
    { url: '/blog-images/spitfire-castle-bromwich-production.jpg', alt: 'Castle Bromwich Spitfire production' },
    { url: '/blog-images/spitfire-battle-of-britain.jpg', alt: 'Spitfire during Battle of Britain' },
    { url: '/blog-images/supermarine-spitfire-development.jpg', alt: 'Spitfire development' }
  ],
  'hawker-hurricane-fighter-development': [
    { url: '/blog-images/hawker-hurricane-battle-of-britain.jpg', alt: 'Hurricane scramble in 1940' },
    { url: '/blog-images/hurricane-development-workshop.jpg', alt: 'Hurricane factory workshop' },
    { url: '/blog-images/hurricane-r4118-flight.jpg', alt: 'Hurricane airworthy example' },
    { url: '/blog-images/hawker-hurricane-professional.jpg', alt: 'Hurricane on dispersal' }
  ],
  'sopwith-camel-wwi-fighter': [
    { url: '/blog-images/sopwith-camel-historical-1918.jpg', alt: 'Sopwith Camel wartime image' },
    { url: '/blog-images/sopwith-camel-rfc.jpg', alt: 'Sopwith Camel cockpit and twin Vickers' },
    { url: '/blog-images/se5a-royal-aircraft-factory.jpg', alt: 'S.E.5a comparative type' },
    { url: '/blog-images/bristol-fighter-f2b-flying.jpg', alt: 'Bristol Fighter F.2B in flight' }
  ],
  'british-aircraft-great-war-rfc-rnas': [
    { url: '/blog-images/rfc-pilots-no32-squadron-1916.jpg', alt: 'RFC pilots No.32 Squadron 1916' },
    { url: '/blog-images/aircraft-factory-assembly-line.jpg', alt: 'Great War aircraft assembly line' },
    { url: '/blog-images/se5a-royal-aircraft-factory.jpg', alt: 'S.E.5a display' },
    { url: '/blog-images/bristol-fighter-f2b-flying.jpg', alt: 'Bristol Fighter F.2B' }
  ],
  'german-aircraft-great-war-development': [
    { url: '/blog-images/albatros-dva-wwi-german.jpg', alt: 'Albatros D.Va German fighter' },
    { url: '/blog-images/fokker-triplane-wwi.jpg', alt: 'Fokker triplane lineage' },
    { url: '/blog-images/german-albatros-dva-wwi-fighter.jpg', alt: 'Jagdstaffel lineup' },
    { url: '/blog-images/german-fokker-dvii-museum.jpg', alt: 'Fokker D.VII museum example' }
  ],
  'naval-aviation-history': [
    { url: '/blog-images/hms-argus-aircraft-carrier.jpg', alt: 'HMS Argus aircraft carrier' },
    { url: '/blog-images/hms-argus-first-aircraft-carrier-operations.jpg', alt: 'Argus deck operations' },
    { url: '/blog-images/modern-carrier-operations.jpg', alt: 'Modern carrier operations' },
    { url: '/blog-images/jet-age-aviation-cold-war-development.jpg', alt: 'Jet age carrier deck' }
  ],
  'aviation-manufacturing-wartime-production': [
    { url: '/blog-images/aircraft-factory-assembly-line.jpg', alt: 'Aircraft assembly line' },
    { url: '/blog-images/women-aircraft-workers.jpg', alt: 'Women aircraft workers' },
    { url: '/blog-images/wwii-aircraft-factory-production.jpg', alt: 'WWII factory production' },
    { url: '/blog-images/willow-run-assembly-line.jpg', alt: 'Willow Run B-24 assembly line' }
  ],
  'autogyro-vs-helicopter': [
    { url: '/blog-images/cierva-autogyro-duxford.jpg', alt: 'Cierva autogyro at Duxford' },
    { url: '/blog-images/sikorsky-vs300-helicopter.jpg', alt: 'Sikorsky VS-300' },
    { url: '/blog-images/bristol-sycamore.jpg', alt: 'Bristol Sycamore' },
    { url: '/blog-images/helicopter-development-timeline.jpg', alt: 'Helicopter development timeline' }
  ],
  'albatros-dva-technical-legacy': [
    { url: '/blog-images/albatros-dva-wwi-german.jpg', alt: 'Albatros D.Va German fighter' },
    { url: '/blog-images/albatros-dva-museum-display.jpg', alt: 'Albatros D.Va museum display' },
    { url: '/blog-images/albatros-museum-display.jpg', alt: 'German WWI fighter exhibit' },
    { url: '/blog-images/albatros-dv-flying.jpg', alt: 'Albatros D.V in flight (replica)' }
  ],
  'clydeside-aviation-revolution': [
    { url: '/blog-images/clydeside-aviation-dalmuir.jpg', alt: 'Dalmuir aircraft works on the Clyde' },
    { url: '/blog-images/clydeside-aircraft-factory.jpg', alt: 'Clydeside aircraft factory interior' },
    { url: '/blog-images/clydeside-wwi-collections.jpg', alt: 'Clydeside WWI industrial collections' },
    { url: '/blog-images/clydeside-industrial-workers.jpg', alt: 'Industrial workforce on the Clyde' }
  ],
  'f86-sabre-cold-war-fighter': [
    { url: '/blog-images/f86-sabre-cold-war-fighter.jpg', alt: 'North American F-86 Sabre' },
    { url: '/blog-images/f86-sabre-formation.jpg', alt: 'F-86 Sabre formation flight' },
    { url: '/blog-images/f86-sabre-formation-flight.jpg', alt: 'RCAF Sabre formation' },
    { url: '/blog-images/f86-vs-mig15-combat.jpg', alt: 'F-86 vs MiG-15 engagement (illustrative)' }
  ],
  'german-aces-organization-wwi': [
    { url: '/blog-images/fokker-dr1-triplane-replica.jpg', alt: 'Fokker Dr.I triplane (Red Baron type)' },
    { url: '/blog-images/fokker-triplane-wwi.jpg', alt: 'Fokker triplane on display' },
    { url: '/blog-images/manfred-von-richthofen-portrait.jpg', alt: 'Manfred von Richthofen portrait' },
    { url: '/blog-images/german-albatros-dva-wwi-fighter.jpg', alt: 'Jagdstaffel Albatros fighters' }
  ],
  'jet-age-aviation-cold-war-development': [
    { url: '/blog-images/modern-carrier-operations.jpg', alt: 'Modern jet age carrier operations' },
    { url: '/blog-images/handley-page-victor-bomber.jpg', alt: 'Handley Page Victor bomber' },
    { url: '/blog-images/vickers-valiant-bomber.jpg', alt: 'Vickers Valiant bomber' },
    { url: '/blog-images/sr71-blackbird-spy-plane.jpg', alt: 'SR-71 Blackbird strategic reconnaissance' }
  ],
  'korean-war-air-combat': [
    { url: '/blog-images/korean-war-aviation.jpg', alt: 'Korean War air operations' },
    { url: '/blog-images/f86-sabre-korean-war-flight-line.jpg', alt: 'F-86 Sabres on flight line' },
    { url: '/blog-images/mig15-korean-war-fighter.jpg', alt: 'MiG-15 Korean War fighter' },
    { url: '/blog-images/rcaf-sabre-formation-golden-hawks.jpg', alt: 'RCAF Golden Hawks Sabres' }
  ],
  'luftwaffe-1945-final-year': [
    { url: '/blog-images/fw190-d9-luftwaffe-1945.jpg', alt: 'Focke-Wulf Fw 190 D-9 late war' },
    { url: '/blog-images/me262-luftwaffe.jpg', alt: 'Messerschmitt Me 262 jet fighter' },
    { url: '/blog-images/do335-pfeil-experimental-fighter.jpg', alt: 'Dornier Do 335 Pfeil' },
    { url: '/blog-images/german-fokker-dvii-museum.jpg', alt: 'Fokker D.VII museum example (context)' }
  ],
  'me262-jet-fighter-revolution': [
    { url: '/blog-images/me262-jet-fighter-historical.jpg', alt: 'Me 262 historical photo' },
    { url: '/blog-images/me262-luftwaffe-historical.jpg', alt: 'Luftwaffe Me 262 on airfield' },
    { url: '/blog-images/me262-luftwaffe.jpg', alt: 'Me 262 jet fighter on display' },
    { url: '/blog-images/victor-bomber-formation.jpg', alt: 'Cold War jet context formation' }
  ],
  'scottish-aviation-between-the-wars': [
    { url: '/blog-images/clydeside-aviation-dalmuir-1928.jpg', alt: 'Dalmuir 1928 aviation works' },
    { url: '/blog-images/beardmore-parkhead-forge.jpg', alt: 'Beardmore Parkhead Forge' },
    { url: '/blog-images/beardmore-aviation-factory.jpg', alt: 'Beardmore aviation factory' },
    { url: '/blog-images/historical-scotland-map.jpg', alt: 'Historical Scotland aviation map' }
  ],
  'supermarine-spitfire-development-evolution': [
    { url: '/blog-images/spitfire-prototype-k5054.jpg', alt: 'Spitfire prototype K5054' },
    { url: '/blog-images/spitfire-castle-bromwich-production.jpg', alt: 'Castle Bromwich Spitfire production' },
    { url: '/blog-images/spitfire-battle-of-britain.jpg', alt: 'Spitfire during Battle of Britain' },
    { url: '/blog-images/supermarine-spitfire-development-evolution.jpg', alt: 'Spitfire development evolution' }
  ],
  'sycamore-seeds-helicopter-evolution': [
    { url: '/blog-images/sycamore-seeds-helicopter.jpg', alt: 'Sycamore seed biomimicry for rotorcraft' },
    { url: '/blog-images/sycamore-seeds-nature-inspiration.jpg', alt: 'Sycamore seeds nature inspiration' },
    { url: '/blog-images/sycamore-seeds-multiple.jpg', alt: 'Sycamore seeds in motion' },
    { url: '/blog-images/sycamore-biomimicry-design.jpg', alt: 'Biomimicry design in helicopters' }
  ],
  'test-pilot-biography-eric-brown': [
    { url: '/blog-images/eric-brown-official-portrait.jpg', alt: 'Captain Eric "Winkle" Brown portrait' },
    { url: '/blog-images/eric-brown-sea-vampire-landing.jpg', alt: 'Sea Vampire carrier landing' },
    { url: '/blog-images/vampire-carrier-landing-hms-ocean.jpg', alt: 'Vampire landing on HMS Ocean' },
    { url: '/blog-images/eric-brown-test-pilot-portrait.jpg', alt: 'Eric Brown as test pilot' }
  ],
  'bristol-sycamore-helicopter-development': [
    { url: '/blog-images/bristol-sycamore.jpg', alt: 'Bristol Sycamore helicopter' },
    { url: '/blog-images/bristol-sycamore-formation.jpg', alt: 'Bristol Sycamore formation flight' },
    { url: '/blog-images/sikorsky-vs300-helicopter.jpg', alt: 'Sikorsky VS-300 context' },
    { url: '/blog-images/sikorsky-r4-helicopter.jpg', alt: 'Sikorsky R-4 early helicopter' }
  ],
  'beardmore-wbiii-naval-fighter': [
    { url: '/blog-images/hms-furious-early-carrier.jpg', alt: 'HMS Furious early carrier operations' },
    { url: '/blog-images/formidable-corsair-deck.jpg', alt: 'Fleet Air Arm deck operations (context)' },
    { url: '/blog-images/uss-lexington-aircraft-operations.jpg', alt: 'Carrier aircraft operations' },
    { url: '/blog-images/hms-formidable-deck-operations.jpg', alt: 'Royal Navy carrier deck operations' }
  ],
  'morris-furniture-war-work-aviation': [
    { url: '/blog-images/women-aircraft-workers.jpg', alt: 'Women aircraft workers in wartime production' },
    { url: '/blog-images/wwii-aircraft-factory-production.jpg', alt: 'WWII aircraft factory production line' },
    { url: '/blog-images/aircraft-factory-assembly-line.jpg', alt: 'Aircraft assembly line during war work' },
    { url: '/blog-images/willow-run-assembly-line.jpg', alt: 'Willow Run B-24 assembly line' }
  ],
  'schneider-trophy-racing-development': [
    { url: '/blog-images/schneider-trophy-1931.jpg', alt: '1931 Schneider Trophy race' },
    { url: '/blog-images/supermarine-s6b-schneider-trophy.jpg', alt: 'Supermarine S.6B Schneider Trophy winner' },
    { url: '/blog-images/supermarine-s6b-museum.jpg', alt: 'Supermarine S.6B museum exhibit' },
    { url: '/blog-images/supermarine-s6-schneider-race.jpg', alt: 'Supermarine S.6 racing seaplane' }
  ],
  'sikorsky-vs300-helicopter-breakthrough': [
    { url: '/blog-images/sikorsky-vs300-helicopter.jpg', alt: 'Sikorsky VS-300 prototype helicopter' },
    { url: '/blog-images/sikorsky-vs300-helicopter-breakthrough.jpg', alt: 'VS-300 breakthrough test flights' },
    { url: '/blog-images/sikorsky-vs300-test.jpg', alt: 'VS-300 testing' },
    { url: '/blog-images/sikorsky-vs300-igor-sikorsky.jpg', alt: 'Igor Sikorsky with VS-300' }
  ],
  'dieter-dengler-skyraider-escape': [
    { url: '/blog-images/f86-sabre-cold-war-fighter.jpg', alt: 'Cold War era fighter aircraft context' },
    { url: '/blog-images/korean-war-aviation.jpg', alt: 'Korean War aviation operations' },
    { url: '/blog-images/chuck-yeager-sabre-pilot.jpg', alt: 'Test pilot in Cold War era' },
    { url: '/blog-images/f86-vs-mig15-combat.jpg', alt: 'Air combat engagement illustration' }
  ],
  'dorothy-wordsworth-scottish-tour-1803': [
    { url: '/blog-images/historical-scotland-map.jpg', alt: 'Historical Scotland map from early 1800s' },
    { url: '/blog-images/glasgow-historical-map.jpg', alt: 'Glasgow historical map' },
    { url: '/blog-images/clydeside-industrial-workers.jpg', alt: 'Scottish industrial heritage' },
    { url: '/blog-images/beardmore-parkhead-forge.jpg', alt: 'Scottish industrial landscape' }
  ],
  'avro-vulcan-bomber': [
    { url: '/blog-images/avro-vulcan-bomber.jpg', alt: 'Avro Vulcan strategic bomber' },
    { url: '/blog-images/vulcan-bomber-formation.jpg', alt: 'Vulcan bomber formation flight' },
    { url: '/blog-images/blue-steel-missile.jpg', alt: 'Blue Steel stand-off missile' },
    { url: '/blog-images/vulcan-black-buck-falklands.jpg', alt: 'Vulcan Black Buck operations context' }
  ],
  'maud-alsos-atomic-program': [
    { url: 'https://charlesmackaybooks.com/blog-images/aircraft-production-statistics.jpg?v=1', alt: 'Wartime production and industrial mobilisation context' },
    { url: 'https://charlesmackaybooks.com/blog-images/women-aircraft-workers.jpg?v=1', alt: 'Women in wartime industry supporting Allied programmes' },
    { url: 'https://charlesmackaybooks.com/blog-images/willow-run-assembly-line.jpg?v=1', alt: 'Willow Run assembly line—large-scale wartime manufacturing' },
    { url: 'https://charlesmackaybooks.com/blog-images/boeing-b17-assembly-line.jpg?v=1', alt: 'B-17 assembly line—illustrative of wartime production scale' }
  ],
  'hms-argus-first-aircraft-carrier': [
    { url: '/blog-images/hms-argus-aircraft-carrier.jpg', alt: 'HMS Argus first aircraft carrier' },
    { url: '/blog-images/hms-argus-dazzle-camouflage.jpg', alt: 'HMS Argus dazzle camouflage scheme' },
    { url: '/blog-images/carrier-evolution-diagram.jpg', alt: 'Aircraft carrier evolution diagram' },
    { url: '/blog-images/hms-formidable-deck-operations.jpg', alt: 'Royal Navy carrier deck operations' }
  ]
};

const byTag: Record<string, ImageCandidate[]> = {
  naval: [
    { url: '/blog-images/hms-argus-aircraft-carrier.jpg', alt: 'HMS Argus' },
    { url: '/blog-images/hms-formidable-deck.jpg', alt: 'Carrier deck ops' },
    { url: '/blog-images/modern-carrier-operations.jpg', alt: 'Modern deck ops' }
  ],
  wwi: [
    { url: '/blog-images/rfc-pilots-no32-squadron-1916.jpg', alt: 'RFC pilots 1916' },
    { url: '/blog-images/albatros-dva-german-fighter.jpg', alt: 'Albatros fighter' },
    { url: '/blog-images/sopwith-camel-historical-1918.jpg', alt: 'Sopwith Camel 1918' }
  ],
  german: [
    { url: '/blog-images/german-fokker-dvii-museum.jpg', alt: 'Fokker D.VII' },
    { url: '/blog-images/german-aircraft-albatros-d3-historical.jpg', alt: 'Albatros D.III' }
  ],
  british: [
    { url: '/blog-images/se5a-royal-aircraft-factory.jpg', alt: 'S.E.5a' },
    { url: '/blog-images/bristol-fighter-f2b-flying.jpg', alt: 'Bristol F.2B' }
  ],
  helicopter: [
    { url: '/blog-images/sikorsky-vs300-helicopter.jpg', alt: 'Sikorsky VS-300' },
    { url: '/blog-images/bristol-sycamore-formation.jpg', alt: 'Bristol Sycamore formation' }
  ],
  lightning: [
    { url: '/blog-images/english-electric-lightning-f6.jpg', alt: 'Lightning F.6' },
    { url: '/blog-images/lightning-f6-cockpit.jpg', alt: 'Lightning cockpit' }
  ],
  vulcan: [
    { url: '/blog-images/avro-vulcan-bomber.jpg', alt: 'Avro Vulcan' },
    { url: '/blog-images/vulcan-bomber-formation.jpg', alt: 'Vulcan formation' }
  ]
};

const byCategory: Record<string, ImageCandidate[]> = {
  'Aviation History': [
    { url: '/blog-images/aircraft-production-statistics.jpg', alt: 'Aircraft production' },
    { url: '/blog-images/aviation-manufacturing-wartime-production.jpg', alt: 'Wartime manufacturing' }
  ],
  'Naval Aviation': [
    { url: '/blog-images/naval-aviation-evolution.jpg', alt: 'Naval aviation evolution' },
    { url: '/blog-images/modern-carrier-operations.jpg', alt: 'Carrier ops' }
  ]
};

export function getImageCandidates(slug: string, category?: string, tags?: string[]): ImageCandidate[] {
  const lowerTags = (tags || []).map(t => t.toLowerCase());
  const pool: ImageCandidate[] = [];
  if (bySlug[slug]) pool.push(...bySlug[slug]);
  for (const t of lowerTags) if (byTag[t]) pool.push(...byTag[t]);
  if (category && byCategory[category]) pool.push(...byCategory[category]);
  // de-duplicate by url
  const seen = new Set<string>();
  return pool.filter(c => {
    if (seen.has(c.url)) return false;
    seen.add(c.url);
    return true;
  });
}


