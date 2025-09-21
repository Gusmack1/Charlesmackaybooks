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
  'avro-vulcan-bomber': [
    { url: '/blog-images/avro-vulcan-bomber.jpg', alt: 'Avro Vulcan bomber' },
    { url: '/blog-images/vulcan-bomber-formation.jpg', alt: 'Vulcan bomber formation' },
    { url: '/blog-images/blue-steel-missile.jpg', alt: 'Blue Steel stand-off missile' },
    { url: '/blog-images/vulcan-black-buck-falklands.jpg', alt: 'Vulcan Black Buck context' }
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


