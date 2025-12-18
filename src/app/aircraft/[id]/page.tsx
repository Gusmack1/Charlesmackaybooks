import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate';
import { getBooksData } from '@/utils/bookUtils';
import UnifiedSchema from '@/components/UnifiedSchema';
import EnhancedBlogSEO from '@/components/EnhancedBlogSEO';

// Map aircraft IDs to their corresponding blog post data
const AIRCRAFT_POSTS: Record<string, any> = {
  'hawker-hurricane': {
    id: 'hawker-hurricane-fighter-development',
    title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain - Enhanced Edition',
    subtitle: 'A comprehensive, research-backed account of the Hawker Hurricane: Sydney Camm\'s masterpiece that bore the brunt of the Battle of Britain, combining reliability, maintainability, and operational effectiveness in a fighter that saved Britain from invasion.',
    content: `
    <h2 id="introduction">Introduction: The Forgotten Hero</h2>
    <p>
      The Hawker Hurricane was the Royal Air Force's backbone at the outbreak of the Second World War — a pragmatic fighter whose virtues were reliability, availability, and ease of repair. Designed under Sydney Camm, the Hurricane blended modern performance with familiar manufacturing practice. Though often overshadowed by the Spitfire in popular memory, operational records and pilot recollections emphasise how the Hurricane's robustness, stable gun platform, and distributed production kept squadrons serviceable during the most demanding phases of 1940–1942.
    </p>
    <p>
      While the Spitfire captured headlines and public imagination with its graceful lines and exceptional performance, the Hurricane bore the burden of Britain's defense during its most critical hour. Of the 700 single-seat fighters available to Air Chief Marshal Hugh Dowding in July 1940, 520 were Hurricanes compared to just 180 Spitfires. This numerical superiority reflected not only production capacity but also the Hurricane's proven reliability and ease of maintenance under combat conditions.
    </p>
    <p>
      This Enhanced Edition presents the complete story of the Hurricane's development, engineering trade-offs, production system, tactics, and worldwide service, drawing on verified historical facts and operational records. Understanding the Hurricane's development provides valuable insights into how operational systems determine aircraft effectiveness.
    </p>

    <div class="my-8">
      <img src="/blog-images/hawker-hurricane-battle-of-britain.jpg" alt="Insert image here: A black-and-white photograph of Hawker Hurricanes scrambling during the Battle of Britain, showing aircraft taking off from grass airfields with ground crew in attendance, demonstrating the Hurricane's operational readiness" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Battle of Britain readiness: the Hurricane's forgiving handling and rugged structure sustained high availability.</p>
    </div>

    <h2 id="historical-background">Historical Background: The Inter-War Fighter Requirement</h2>
    <p>
      The Hurricane's development occurred during a crucial period in British aviation history. The inter-war years saw rapid advances in aircraft design, with monoplane fighters replacing biplanes across major air forces. British aviation development during this period demonstrated how industrial capabilities influenced design choices. The comprehensive documentation of inter-war aviation development ensures that the Hurricane's origins are properly understood.
    </p>
    <p>
      For comprehensive coverage of inter-war aviation development, see
      <a href="/books/clydeside-aviation-vol2" class="underline font-medium">Clydeside Aviation Volume Two: Between the Wars</a>,
      which provides detailed analysis of aviation events between 1919 and 1939, including fighter development and industrial growth. This comprehensive coverage demonstrates how inter-war aviation development influenced Hurricane design.
    </p>

    <h2 id="origins-development">Origins and Development (1934–1937)</h2>
    <p>
      The Hurricane emerged from Hawker's incremental evolution path. Moving from biplanes to a monoplane fighter, Camm specified a steel‑tube fuselage with fabric covering aft of the cockpit and metal panels forward for access to the engine and armament. The wing adopted a thick section that simplified manufacture and provided internal volume for guns, fuel, and later equipment. Prototype K5083 flew in 1935 and validated the design's key aims: benign handling, stable firing platform, and a structure that production shops and maintenance units could work with confidently.
    </p>
    <p>
      Sydney Camm's approach was evolutionary rather than revolutionary, building upon the successful Hawker Fury biplane while incorporating lessons learned from racing aircraft and international developments. The decision to use the new Rolls-Royce Merlin engine, then known as the PV-XII, provided the power necessary for competitive performance while maintaining reliability. This pragmatic approach would prove crucial in the aircraft's operational success, as it allowed for rapid production scaling and simplified maintenance procedures.
    </p>
    <p>
      The prototype K5083 first flew on November 6, 1935, piloted by Squadron Leader P.W.S. Bulman. Initial flight tests revealed excellent handling characteristics and performance that exceeded expectations, with a top speed of 315 mph at 16,000 feet. The Air Ministry, initially skeptical of the monoplane concept, quickly recognized the Hurricane's potential and placed an order for 600 aircraft in June 1936, the largest peacetime order for military aircraft in British history.
    </p>
    <p>
      Early service trials revealed the practicality of the type for squadron conversion and day‑to‑day operations. The Hurricane's conventional construction methods eased the transition from biplane fighters, requiring less radical retraining than fully stressed-skin designs. This transition advantage proved decisive when war began, enabling rapid squadron conversion and operational deployment.
    </p>

    <div class="my-8">
      <img src="/blog-images/hawker-hurricane-formation-flight.jpg" alt="Insert image here: A black-and-white photograph showing Hurricane formation flight during the Battle of Britain, demonstrating formation tactics and the aircraft's handling characteristics" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Formation flying: the Hurricane's predictable handling supported tight formations and mutual support.</p>
    </div>

    <h2 id="engineering-trade-offs">Engineering Trade-Offs and Design Philosophy</h2>
    <p>
      The Hurricane's design philosophy prioritised producibility, maintainability, and operational availability over aerodynamic refinement. Camm's approach balanced competing requirements: aerodynamic efficiency, structural integrity, manufacturing complexity, and maintenance accessibility. The resulting aircraft demonstrated how engineering compromises, when properly managed, create operationally superior systems.
    </p>
    <p>
      The steel-tube fuselage with fabric covering provided a proven structural approach that maintenance units understood. Metal panels forward of the cockpit simplified engine access and armament installation. The wing's thick section accommodated eight .303 Browning machine guns in a simple installation that ground crews could service quickly. This emphasis on practical engineering ensured the Hurricane remained available for operations when more complex designs struggled with maintenance challenges.
    </p>

    <h2 id="production-system">Production System and Manufacturing</h2>
    <p>
      The Hurricane's distributed production system demonstrated the effectiveness of industrial mobilisation. Gloster, Hawker, and Austin Motors produced major components under Hawker's supervision, with final assembly at multiple locations. This approach maximised output while minimising disruption from enemy action. The comprehensive documentation of wartime production systems ensures that manufacturing achievements are properly understood.
    </p>
    <p>
      By the end of 1940, production reached 100 aircraft per month, rising to 150 by mid-1941. The Hurricane's conventional construction methods allowed rapid scaling, with 14,000 examples completed before production ended in 1944. This production success reflected not only industrial capacity but also the aircraft's design suitability for mass manufacture.
    </p>

    <h2 id="battle-of-britain">Battle of Britain: The Hurricane's Finest Hour</h2>
    <p>
      During the Battle of Britain, Hurricanes flew 60% of Fighter Command's sorties and claimed 55% of German aircraft destroyed. The Hurricane's numerical superiority and operational availability proved decisive. While Spitfires engaged high-flying Bf 109s, Hurricanes tackled the bomber formations at medium altitudes where their stable gun platform and high ammunition capacity proved most effective.
    </p>
    <p>
      The Hurricane's success reflected Sydney Camm's understanding of operational requirements. The aircraft's robustness allowed pilots to survive otherwise fatal encounters, while its stability provided an effective gun platform. Ground crews maintained high availability, ensuring squadrons remained operational throughout the battle.
    </p>

    <div class="my-8">
      <img src="/blog-images/hawker-hurricane-professional.jpg" alt="Insert image here: A black-and-white photograph showing Hurricane on dispersal with ground crew, demonstrating maintenance access and operational procedures" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Maintenance access: the Hurricane's design facilitated rapid turnaround between sorties.</p>
    </div>

    <h2 id="tactics-and-employment">Tactics and Employment</h2>
    <p>
      Hurricane tactics evolved during 1940, emphasising formation integrity, mutual support, and deflection shooting. The aircraft's stable gun platform supported accurate fire, while its robust structure allowed aggressive tactics. Pilots learned to exploit the Hurricane's strengths: high speed in dives, stable firing platform, and ability to absorb battle damage.
    </p>
    <p>
      The Hurricane's tactical employment demonstrated how aircraft design influences combat effectiveness. The stable gun platform supported accurate shooting, while the robust structure allowed pilots to press attacks aggressively. This combination of design and tactics proved highly effective against Luftwaffe formations.
    </p>

    <h2 id="worldwide-service">Worldwide Service and Variants</h2>
    <p>
      The Hurricane served across multiple theatres, demonstrating versatility and adaptability. Tropical variants operated in North Africa and Asia, while navalised Sea Hurricanes provided carrier-based fighter capability. The aircraft's worldwide service demonstrated the effectiveness of evolutionary design and distributed production.
    </p>
    <p>
      By war's end, Hurricanes had served in 27 countries, with examples still flying in 1950s conflicts. This longevity reflected the aircraft's fundamental soundness and the effectiveness of its design philosophy. The Hurricane's worldwide service provides valuable insights into aircraft adaptability and operational flexibility.
    </p>

    <h2 id="legacy">Legacy and Historical Assessment</h2>
    <p>
      The Hurricane's legacy rests on practical achievements rather than technological innovation. The aircraft demonstrated how operational effectiveness depends on design suitability, production capacity, and maintenance practicality. While the Spitfire captured public imagination, the Hurricane won the battle that preserved Britain.
    </p>
    <p>
      Sydney Camm's approach — evolutionary design, conventional construction, emphasis on producibility — proved more important than aerodynamic refinement. The Hurricane's success demonstrated that aircraft effectiveness depends on the entire system: design, production, maintenance, and tactics.
    </p>

    <h2 id="sources">Sources and Further Reading</h2>
    <p>
      For comprehensive coverage of Hurricane development and operations, consult official Air Ministry records and squadron operational record books. The Imperial War Museum and RAF Museum collections provide extensive photographic and documentary material. The comprehensive documentation of Hurricane operations ensures that historical assessments remain accurate and evidence-based.
    </p>
    `,
    url: '/blog-images/hawker-hurricane-battle-of-britain.jpg',
    images: [
      { url: '/blog-images/hawker-hurricane-battle-of-britain.jpg', alt: 'Hurricane scramble in 1940' },
      { url: '/blog-images/hawker-hurricane-formation-flight.jpg', alt: 'Hurricane formation flight' },
      { url: '/blog-images/hawker-hurricane-professional.jpg', alt: 'Hurricane on dispersal' }
    ],
    readingTime: 15,
    publishedAt: '2024-12-18T10:00:00Z',
    relatedBooks: getBooksData(['british-aircraft-great-war', 'clydeside-aviation-vol2', 'beardmore-aviation', 'captain-eric-brown', 'aviation-manufacturing-wartime-production'])
  },
  'sopwith-camel': {
    id: 'sopwith-camel-wwi-fighter',
    title: 'Sopwith Camel: The Most Deadly Fighter of World War I',
    subtitle: 'The revolutionary British fighter that shot down more enemy aircraft than any other Allied aircraft during the Great War, with over 1,200 confirmed victories.',
    content: `
    <h2 id="introduction">Introduction: The Camel's Reputation and Reality</h2>
    <p>The Sopwith Camel became the most effective British fighter of the Great War by combining concentrated mass, heavy forward armament, and disciplined tactics. Designed under Herbert Smith at Sopwith, the Camel's reputation rests on measurable outcomes — over a thousand credited victories — and on a design grammar that privileged turning authority and fire concentration over raw straight‑line speed. This Enhanced Edition presents a formal, evidence‑based analysis: development lineage, structure and systems, engines and handling, pilot technique and combat accounts, comparisons with German contemporaries, naval operations, and enduring influence. For comprehensive coverage of British aircraft development during this period, see <a href="/books/british-aircraft-great-war" class="underline font-medium">British Aircraft of the Great War</a> by Charles E. MacKay.</p>

    <div class="my-8">
      <img src="/blog-images/sopwith-camel-historical-1918.jpg" alt="Wartime Sopwith Camel in flight profile, twin Vickers cowl visible" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm  mt-2 text-center italic">A compact fighter with mass forward: agility in turns, authority in gun runs.</p>
    </div>

    <h2 id="lineage">Origins and Design Lineage</h2>
    <p>The Camel evolved from the Pup and Triplane programmes, preserving positive control harmony while adding weight forward for gun installation and stability at firing. Development in 1916 set the pattern: a compact, wood‑and‑fabric biplane with twin synchronized Vickers .303 in front of the pilot, Constantinesco‑type gear, and a rotary engine providing high power‑to‑weight. Emphasis fell on reliable turning performance and gun effectiveness rather than extreme speed. The development of such aircraft is thoroughly documented in <a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation Volume One: The Great War</a>.</p>

    <h2 id="structure">Structure, Systems, and Armament</h2>
    <p>Wooden fuselage bays with wire bracing and steel fittings provided strength; fabric covering kept weight down. The forward "hump" over the Vickers installation housed ammunition and synchronization. Fuel and pilot sat forward with the engine, concentrating mass within roughly seven feet — a key to turning behaviour. The twin‑gun layout gave a dense cone of fire exactly along the pilot's sightline, simplifying gunnery solutions compared with wing‑mounted guns. The evolution of aircraft armament during the Great War is comprehensively covered in <a href="/books/german-aircraft-great-war" class="underline font-medium">German Aircraft of the Great War</a>.</p>

    <div class="my-8">
      <img src="/blog-images/sopwith-camel-rfc.jpg" alt="Cockpit and twin Vickers installation of Sopwith Camel" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm  mt-2 text-center italic">Concentrated fire: twin Vickers in the pilot's natural line of sight shortened engagements.</p>
    </div>

    <h2 id="engines-handling">Engines and Handling Characteristics</h2>
    <p>The Camel's Clerget 9B or Bentley BR1 rotary engines delivered 130 hp, sufficient for 115 mph top speed and strong climb. Torque from the rotary created asymmetric thrust that pilots learned to manage through rudder correction. The short-coupled design amplified control responses, making the Camel demanding but highly maneuverable. Handling required precision but rewarded disciplined technique with superior turning and zoom capabilities.</p>

    <h2 id="pilot-technique">Pilot Technique and Combat Employment</h2>
    <p>Camel pilots mastered deflection shooting and high‑G turns. Training emphasised rudder work to counter torque, leading to the aircraft's reputation for killing inexperienced pilots. Combat doctrine stressed surprise, rapid engagement, and disengagement — hit‑and‑run tactics that exploited the Camel's strengths while minimising exposure. The comprehensive documentation of combat techniques ensures that operational effectiveness is properly understood.</p>

    <h2 id="combat-accounts">Combat Accounts and Operational Record</h2>
    <p>The Camel achieved over 1,200 confirmed victories, more than any other Allied fighter. Canadian ace William Barker scored 46 victories in a Camel, while British pilot Arthur Rhys Davids claimed 25 before his death. The aircraft's success reflected not just design excellence but also the quality of training and tactical doctrine that evolved around its capabilities. The detailed combat records provide valuable insights into fighter employment during the Great War.</p>

    <h2 id="german-comparison">Comparison with German Contemporaries</h2>
    <p>Against Albatros D.III/D.V families the Camel traded inferior straight‑line speed for superior turning authority and fire concentration. Later types such as the Fokker D.VII brought excellent high‑lift characteristics and benign handling that narrowed the Camel's advantages, but Camel units retained effectiveness through tactics and numbers. The British design choice — agility and gunnery — remained coherent with the operational context of 1917–1918. For detailed analysis of German aircraft development, see <a href="/books/german-aircraft-great-war" class="underline font-medium">German Aircraft of the Great War</a> by Charles E. MacKay.</p>

    <h2 id="naval-operations">Naval Operations and Variants</h2>
    <p>Navalised 2F.1 Ships' Camels operated from fleet carriers and platforms, with strengthened undercarriages and naval equipment. The type proved effective in shipboard operations, demonstrating versatility beyond land-based fighter duties. The Camel's naval service demonstrated the aircraft's adaptability and the effectiveness of its basic design.</p>

    <h2 id="influence">Enduring Influence and Legacy</h2>
    <p>The Camel's design influenced post‑war fighters, establishing patterns for armament concentration and rotary engine employment. The aircraft demonstrated how design choices determine operational effectiveness. While the Camel became notorious for killing novice pilots, experienced operators achieved extraordinary success. The Camel's legacy provides valuable insights into fighter design and employment.</p>

    <h2 id="sources">Sources and Further Reading</h2>
    <p>For comprehensive coverage of Camel operations and development, consult RFC/RAF combat reports and squadron records. The Imperial War Museum and RAF Museum collections provide extensive material on Camel operations. The detailed historical records ensure that the Camel's achievements remain properly documented and understood.</p>
    `,
    url: '/blog-images/sopwith-camel-historical-1918.jpg',
    images: [
      { url: '/blog-images/sopwith-camel-historical-1918.jpg', alt: 'Sopwith Camel wartime image' },
      { url: '/blog-images/sopwith-camel-rfc.jpg', alt: 'Sopwith Camel cockpit and twin Vickers' }
    ],
    readingTime: 12,
    publishedAt: '2024-12-18T10:00:00Z',
    relatedBooks: getBooksData(['british-aircraft-great-war', 'german-aircraft-great-war', 'clydeside-aviation-vol1', 'captain-eric-brown', 'aircraft-carrier-argus'])
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = AIRCRAFT_POSTS[id];

  if (!post) {
    return {
      title: 'Aircraft Not Found | Charles E. MacKay Aviation Books',
      description: 'The requested aircraft information could not be found.',
    };
  }

  return {
    title: `${post.title} | Charles E. MacKay Aviation Books`,
    description: post.subtitle,
    keywords: [
      id.replace('-', ' '),
      'aircraft history',
      'aviation history',
      'fighter aircraft',
      'military aviation',
      'Charles E MacKay',
      'aviation books',
      post.id
    ],
    authors: [{ name: 'Charles E. MacKay' }],
    creator: 'Charles E. MacKay',
    publisher: 'Charles E. MacKay',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      url: `https://charlesmackaybooks.com/aircraft/${id}`,
      siteName: 'Charles E. MacKay Aviation Books',
      locale: 'en_GB',
      images: post.images || [{ url: post.url, alt: `${id} aircraft` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@charlesmackaybooks',
      creator: '@charlesmackay',
      title: post.title,
      description: post.subtitle,
      images: post.images || [{ url: post.url, alt: `${id} aircraft` }],
    },
    alternates: {
      canonical: `https://charlesmackaybooks.com/aircraft/${id}`,
    },
  };
}

export default async function AircraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = AIRCRAFT_POSTS[id];

  if (!post) {
    notFound();
  }

  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.subtitle}
        pageUrl={`/aircraft/${id}`}
        blogData={{
          id: post.id,
          title: post.title,
          imageUrl: post.url,
        }}
      />

      <EnhancedBlogSEO
        post={post}
        relatedBooks={post.relatedBooks}
      />

      <ComprehensiveBlogTemplate post={post} />
    </>
  );
}
