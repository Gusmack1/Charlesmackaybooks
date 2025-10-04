export interface CategoryDescription {
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  featuredBooks: string[];
}

export const categoryDescriptions: Record<string, CategoryDescription> = {
  'scottish-aviation-history': {
    name: 'Scottish Aviation History',
    description: 'Discover Scotland\'s remarkable aviation heritage through meticulously researched books covering Clydeside aviation, Beardmore manufacturing, and Scottish contributions to global aviation.',
    longDescription: `Scotland's aviation heritage represents one of the most fascinating chapters in British industrial history. From the pioneering days of early flight to the sophisticated manufacturing of the World Wars, Scottish engineers, pilots, and industrialists made extraordinary contributions to aviation development.

The Clydeside region, with its world-renowned shipbuilding expertise, naturally transitioned into aircraft manufacturing during the Great War. Companies like William Beardmore & Company transformed their engineering capabilities to produce aircraft, engines, and airships that served Britain's military needs.

Our Scottish Aviation History collection explores this rich heritage through primary source research, archival photographs, and detailed technical analysis. Each book represents years of research into company archives, government records, and personal testimonies that bring Scotland's aviation story to life.

From the early experiments of aviation pioneers to the mass production techniques that emerged during wartime, these books document how Scotland's industrial might was harnessed for the skies. They reveal the stories of the men and women who built, flew, and maintained the aircraft that shaped aviation history.`,
    keywords: [
      'Scottish aviation history',
      'Clydeside aviation',
      'Beardmore aviation',
      'Scottish aircraft manufacturing',
      'Glasgow aviation',
      'Scottish aviation heritage',
      'William Beardmore',
      'Scottish aviation pioneers',
      'Scottish aviation books',
      'Charles E MacKay Scottish aviation'
    ],
    featuredBooks: ['beardmore-aviation', 'clydeside-aviation-vol1', 'clydeside-aviation-vol2']
  },
  'military-history': {
    name: 'Military History',
    description: 'Comprehensive military aviation history books covering strategic operations, aircraft development, and the evolution of air power from WWI to the modern era.',
    longDescription: `Military aviation history represents the intersection of technology, strategy, and human courage. From the first reconnaissance flights over the Western Front to the sophisticated operations of modern air forces, military aviation has fundamentally transformed the nature of warfare.

Our Military History collection examines this evolution through detailed analysis of aircraft development, operational doctrine, and the strategic thinking that shaped air power. Each book draws on extensive research into military archives, operational records, and technical specifications to provide authoritative accounts of aviation's role in military history.

The collection covers the full spectrum of military aviation, from fighter aircraft and their development to bomber operations and strategic air campaigns. It explores how technological advances in aircraft design, engine development, and weapons systems influenced military strategy and tactics.

These books also examine the human dimension of military aviation, including pilot training, crew coordination, and the logistical challenges of maintaining air forces in combat. They reveal how military aviation evolved from a supporting role to a decisive element of modern warfare.`,
    keywords: [
      'military aviation history',
      'military aircraft',
      'air power history',
      'military aviation books',
      'fighter aircraft history',
      'bomber aircraft history',
      'military aviation strategy',
      'air warfare history',
      'military aviation operations',
      'Charles E MacKay military aviation'
    ],
    featuredBooks: ['british-aircraft-great-war', 'german-aircraft-great-war']
  },
  'wwi-aviation': {
    name: 'WWI Aviation',
    description: 'Expert analysis of World War I aviation, covering aircraft development, aerial combat, and the birth of modern air warfare from 1914-1918.',
    longDescription: `World War I marked the birth of military aviation as a decisive force in warfare. From the primitive reconnaissance aircraft of 1914 to the sophisticated fighters and bombers of 1918, the Great War witnessed an unprecedented acceleration in aviation technology and tactics.

Our WWI Aviation collection provides comprehensive coverage of this revolutionary period, examining aircraft development, engine technology, aerial combat tactics, and the strategic use of air power. Each book represents years of research into wartime records, technical specifications, and operational histories.

The collection explores how aviation evolved from a novelty to a critical military capability. It examines the development of fighter aircraft and the emergence of aerial combat, the evolution of bomber aircraft and strategic bombing campaigns, and the role of reconnaissance in military operations.

These books also examine the human stories behind the aircraft - the pilots, observers, and ground crews who operated and maintained the aircraft under the most challenging conditions. They reveal how the lessons learned during the Great War shaped the development of military aviation for decades to come.`,
    keywords: [
      'WWI aviation',
      'World War I aircraft',
      'Great War aviation',
      'WWI fighter aircraft',
      'WWI bomber aircraft',
      'aerial combat WWI',
      'military aviation WWI',
      'aviation history WWI',
      'Charles E MacKay WWI aviation',
      'WWI aviation books'
    ],
    featuredBooks: ['british-aircraft-great-war', 'german-aircraft-great-war', 'bristol-fighter-f2b-brisfit']
  },
  'wwii-aviation': {
    name: 'WWII Aviation',
    description: 'Comprehensive coverage of World War II aviation, from aircraft development and production to strategic operations and the evolution of air power.',
    longDescription: `World War II represented the golden age of military aviation, with unprecedented technological advances and the full realization of air power's strategic potential. From the Battle of Britain to the strategic bombing campaigns, WWII aviation shaped the course of the war and the future of military technology.

Our WWII Aviation collection examines this pivotal period through detailed analysis of aircraft development, production techniques, operational doctrine, and strategic thinking. Each book draws on extensive research into wartime records, technical specifications, and operational histories to provide authoritative accounts of aviation's role in the conflict.

The collection covers the full spectrum of WWII aviation, from fighter aircraft and their development to bomber operations and strategic air campaigns. It explores how technological advances in aircraft design, engine development, and weapons systems influenced military strategy and tactics.

These books also examine the industrial aspects of WWII aviation, including mass production techniques, quality control, and the logistical challenges of maintaining air forces in combat. They reveal how aviation technology and production methods evolved to meet the demands of total war.`,
    keywords: [
      'WWII aviation',
      'World War II aircraft',
      'WWII fighter aircraft',
      'WWII bomber aircraft',
      'Battle of Britain',
      'strategic bombing',
      'WWII aviation history',
      'military aviation WWII',
      'Charles E MacKay WWII aviation',
      'WWII aviation books'
    ],
    featuredBooks: ['hawker-hurricane-fighter-development', 'spitfire-development-history']
  },
  'aviation-biography': {
    name: 'Aviation Biography',
    description: 'Fascinating biographies of aviation pioneers, pilots, and engineers who shaped the course of aviation history through their innovations and achievements.',
    longDescription: `Aviation history is ultimately the story of people - the pioneers, pilots, engineers, and visionaries who pushed the boundaries of what was possible in the air. Our Aviation Biography collection brings these remarkable individuals to life through detailed research and compelling storytelling.

Each biography represents years of research into personal papers, contemporary accounts, and archival records to provide comprehensive portraits of aviation's most influential figures. From early aviation pioneers to wartime heroes and post-war innovators, these books reveal the human stories behind aviation's greatest achievements.

The collection covers a diverse range of aviation personalities, including aircraft designers, test pilots, military aviators, and aviation entrepreneurs. It explores how their personal experiences, technical expertise, and visionary thinking shaped the development of aviation technology and operations.

These biographies also examine the broader historical context in which these individuals operated, revealing how social, political, and technological factors influenced their achievements. They provide insights into the challenges and opportunities that shaped aviation's development from its earliest days to the modern era.`,
    keywords: [
      'aviation biography',
      'aviation pioneers',
      'famous pilots',
      'aviation engineers',
      'aviation history biography',
      'aviation personalities',
      'aviation heroes',
      'Charles E MacKay aviation biography',
      'aviation biography books',
      'aviation pioneers biography'
    ],
    featuredBooks: ['captain-eric-brown', 'dieter-dengler']
  },
  'helicopter-history': {
    name: 'Helicopter History',
    description: 'Comprehensive coverage of helicopter development, from early experiments to modern rotorcraft technology and their impact on aviation and society.',
    longDescription: `Helicopter development represents one of aviation's most fascinating technological challenges, combining the principles of rotary-wing flight with the practical requirements of vertical takeoff and landing. Our Helicopter History collection examines this remarkable journey from early experiments to modern rotorcraft technology.

The collection explores the technical challenges of helicopter development, including rotor design, power transmission systems, and flight control mechanisms. It examines how engineers and designers overcame the fundamental problems of rotary-wing flight to create practical aircraft capable of vertical flight.

These books also examine the operational applications of helicopters, from military operations and search-and-rescue missions to civilian transportation and commercial applications. They explore how helicopter technology has evolved to meet diverse operational requirements and how it has influenced aviation and society more broadly.

The collection includes detailed technical analysis of helicopter systems and performance characteristics, as well as operational histories that reveal how helicopters have been used in various roles. It provides comprehensive coverage of helicopter development from its earliest days to the sophisticated rotorcraft of the modern era.`,
    keywords: [
      'helicopter history',
      'rotary-wing aircraft',
      'helicopter development',
      'helicopter technology',
      'vertical flight',
      'rotorcraft history',
      'helicopter aviation',
      'Charles E MacKay helicopter history',
      'helicopter books',
      'helicopter aviation history'
    ],
    featuredBooks: ['sycamore-seeds', 'captain-eric-brown']
  },
  'jet-age-aviation': {
    name: 'Jet Age Aviation',
    description: 'Explore the revolutionary impact of jet propulsion on aviation, from early experiments to modern jet aircraft and their role in shaping air travel and military aviation.',
    longDescription: `The introduction of jet propulsion revolutionized aviation, enabling aircraft to achieve speeds and altitudes that were impossible with piston engines. Our Jet Age Aviation collection examines this revolutionary period, from early jet experiments to the sophisticated aircraft of the modern era.

The collection explores the technical development of jet engines, from early turbojet designs to modern turbofan and turboprop engines. It examines how jet propulsion technology evolved and how it influenced aircraft design, performance, and operational capabilities.

These books also examine the operational impact of jet aircraft, from military applications to commercial aviation. They explore how jet technology transformed air combat, commercial air travel, and the broader aviation industry.

The collection includes detailed technical analysis of jet engine systems and aircraft performance characteristics, as well as operational histories that reveal how jet aircraft have been used in various roles. It provides comprehensive coverage of the jet age from its earliest days to the sophisticated aircraft of the modern era.`,
    keywords: [
      'jet age aviation',
      'jet aircraft',
      'jet propulsion',
      'jet engine development',
      'jet aviation history',
      'modern aviation',
      'jet technology',
      'Charles E MacKay jet aviation',
      'jet age books',
      'jet aviation history'
    ],
    featuredBooks: ['sabres-from-north', 'f86-sabre-cold-war-fighter']
  },
  'naval-aviation': {
    name: 'Naval Aviation',
    description: 'Comprehensive coverage of naval aviation history, from early shipboard aircraft to modern carrier operations and the evolution of maritime air power.',
    longDescription: `Naval aviation represents one of aviation's most challenging and innovative applications, combining the complexities of aircraft operations with the unique requirements of maritime environments. Our Naval Aviation collection examines this fascinating field from its earliest days to modern carrier operations.

The collection explores the technical challenges of naval aviation, including aircraft carrier design, shipboard aircraft operations, and the unique requirements of maritime aircraft. It examines how naval aviation technology and tactics have evolved to meet the demands of maritime operations.

These books also examine the operational history of naval aviation, from early experiments with shipboard aircraft to modern carrier strike operations. They explore how naval aviation has influenced maritime strategy and how it has shaped the development of naval forces.

The collection includes detailed technical analysis of naval aircraft systems and performance characteristics, as well as operational histories that reveal how naval aviation has been used in various roles. It provides comprehensive coverage of naval aviation from its earliest days to the sophisticated operations of the modern era.`,
    keywords: [
      'naval aviation',
      'aircraft carriers',
      'shipboard aircraft',
      'maritime aviation',
      'naval aviation history',
      'carrier operations',
      'naval aviation books',
      'Charles E MacKay naval aviation',
      'maritime air power',
      'naval aviation technology'
    ],
    featuredBooks: ['aircraft-carrier-argus', 'hms-argus-first-aircraft-carrier']
  },
  'industrial-history': {
    name: 'Industrial History',
    description: 'Explore the industrial aspects of aviation development, from manufacturing techniques and production systems to the economic and social impact of aviation industry.',
    longDescription: `Aviation's development has been deeply intertwined with industrial progress, requiring advances in manufacturing techniques, materials science, and production systems. Our Industrial History collection examines this fascinating intersection of aviation and industry.

The collection explores the industrial aspects of aviation development, including aircraft manufacturing techniques, production systems, and the evolution of aviation industry. It examines how industrial capabilities and limitations have influenced aircraft design and production.

These books also examine the economic and social impact of aviation industry, from job creation and economic development to the broader influence of aviation on industrial society. They explore how aviation has shaped industrial development and how industrial capabilities have shaped aviation.

The collection includes detailed analysis of manufacturing processes, production systems, and industrial organization, as well as economic and social histories that reveal aviation's broader impact. It provides comprehensive coverage of aviation's industrial aspects from the earliest days of aircraft manufacturing to the sophisticated production systems of the modern era.`,
    keywords: [
      'aviation industrial history',
      'aircraft manufacturing',
      'aviation industry',
      'industrial aviation',
      'aviation production',
      'aviation manufacturing history',
      'Charles E MacKay industrial aviation',
      'aviation industry books',
      'aircraft production history',
      'aviation manufacturing'
    ],
    featuredBooks: ['beardmore-aviation', 'modern-furniture']
  },
  'aviation-history': {
    name: 'Aviation History',
    description: 'Comprehensive aviation history books covering the full spectrum of flight, from early experiments to modern aviation and its impact on society and technology.',
    longDescription: `Aviation history encompasses the full spectrum of human flight, from early experiments with balloons and gliders to the sophisticated aircraft of the modern era. Our Aviation History collection provides comprehensive coverage of this remarkable journey.

The collection explores the technical development of aviation, from early aircraft designs to modern aviation technology. It examines how aviation technology has evolved and how it has influenced society, economy, and culture.

These books also examine the operational aspects of aviation, from early flight operations to modern aviation systems. They explore how aviation has been used for transportation, military operations, and various other applications.

The collection includes detailed technical analysis of aircraft systems and performance characteristics, as well as operational and social histories that reveal aviation's broader impact. It provides comprehensive coverage of aviation history from its earliest days to the sophisticated systems of the modern era.`,
    keywords: [
      'aviation history',
      'flight history',
      'aircraft history',
      'aviation development',
      'flight technology',
      'aviation books',
      'Charles E MacKay aviation history',
      'aviation history books',
      'flight development',
      'aviation technology history'
    ],
    featuredBooks: ['british-aircraft-great-war', 'german-aircraft-great-war']
  },
  'travel-literature': {
    name: 'Travel Literature',
    description: 'Aviation-themed travel literature and memoirs that capture the romance and adventure of flight, from early aviation adventures to modern air travel experiences.',
    longDescription: `Aviation has inspired some of the most compelling travel literature and memoirs, capturing the romance, adventure, and wonder of flight. Our Travel Literature collection brings together these fascinating accounts of aviation adventures and experiences.

The collection includes memoirs, travel accounts, and literary works that explore the human experience of flight. From early aviation adventures to modern air travel experiences, these books capture the unique perspective that aviation provides on the world.

These books also examine the cultural and social aspects of aviation, exploring how flight has influenced literature, art, and popular culture. They reveal how aviation has shaped our understanding of travel, adventure, and human achievement.

The collection includes both historical accounts and contemporary works, providing a comprehensive view of aviation's influence on travel literature and culture. It explores how aviation has inspired writers, artists, and travelers throughout its history.`,
    keywords: [
      'aviation travel literature',
      'flight memoirs',
      'aviation adventures',
      'aviation literature',
      'flight travel books',
      'aviation memoirs',
      'Charles E MacKay travel literature',
      'aviation travel books',
      'flight literature',
      'aviation adventures books'
    ],
    featuredBooks: ['dorothy-wordsworth', 'soaring-with-wings']
  }
};
