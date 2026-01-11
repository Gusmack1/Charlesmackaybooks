import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'

import EnhancedBlogSEO from '@/components/EnhancedBlogSEO';
const post = {
  id: 'korean-war-air-combat',
  title: `Korean War Air Combat: The Jet Age in Battle`,
  subtitle: `Enhanced Edition: MiG Alley, F‑86 vs MiG‑15, transonic aerodynamics, gunnery, pilot accounts, tactics, logistics, and legacy — precise and research‑backed.`,
  content: `
    <h2 id="introduction">Introduction: First Sustained Jet‑vs‑Jet War</h2>
    <p>The Korean War (1950–1953) delivered the first sustained jet‑vs‑jet fighting in history. Over the northwest of the Korean peninsula, in the sector that became known as MiG Alley, United Nations forces flying North American F‑86 Sabres met Soviet‑designed MiG‑15s flown by North Korean, Chinese, and, in key periods, Soviet pilots. The result was a proving ground for transonic aerodynamics, gunnery against swept‑wing targets, radar‑assisted ground control, and the logistics required to keep jet fighters in the air from forward bases. Based on comprehensive research documented in Charles E. MacKay's authoritative work 
      <a href="/books/sabres-from-north" class="underline font-medium">Sabres from the North: F-86 Sabre in RAF, RCAF, Luftwaffe Service</a>, 
      this analysis presents the complete story of jet air combat over Korea with verified historical accuracy.
    </p>
    <p>
      The book <a href="/books/sabres-from-north" class="underline font-medium">Sabres from the North</a> describes the evolution and deployment of the Canadair Sabre in Royal Air Force, Royal Canadian Air Force and in NATO service-includes the West German Air Force. RAF pilots flying the F-86 Sabre in operations over Korea are also illustrated. The MIG-15 is included as well as Soviet jet engine development. This comprehensive 210-page A5 work with over 300 pictures and drawings provides detailed coverage of Sabre operations during the Korean War, including RAF participation and the broader context of NATO operations.
    </p>
    <div class="my-8">
      <img src="/blog-images/f86-sabre-banking-mig-alley-schematic.svg" alt="Original schematic illustration: F-86 banking over terrain motif (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm  mt-2 text-center italic">Original illustration (schematic): F‑86 banking motif representing energy fighting and transonic handling (diagrammatic).</p>
    </div>
    <div class="my-8">
      <img src="/blog-images/mig15-takeoff-runway-schematic.svg" alt="Original schematic illustration: MiG-15 takeoff runway motif (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm  mt-2 text-center italic">Original illustration (schematic): MiG‑15 runway departure motif—speed, climb, and heavy-cannon interception role (diagrammatic).</p>
    </div>
    <div class="my-8">
      <img src="/blog-images/radar-assisted-gunsight-schematic.svg" alt="Original schematic illustration: radar-assisted gunsight reticle motif (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm  mt-2 text-center italic">Original illustration (schematic): radar‑assisted ranging and a computed sight solution improved brief firing windows (diagrammatic).</p>
    </div>
    
    <p>This aerial confrontation between East and West introduced new tactical doctrines, technologies, and pilot training methods that would define air combat for the next half-century. The lessons learned over Korea directly influenced Cold War aviation development and established the principles of supersonic fighter design.</p>

    <p>Korean War air combat proved that jet fighters would dominate future conflicts and demonstrated the critical importance of pilot training, aircraft performance, and technological superiority in determining air superiority. The war's air battles became the testing ground for jet age tactics that continue to influence modern air warfare.</p>

    <h2 id="context">Historical Context and Order of Battle</h2>
    <p>After early war phases dominated by piston types and ground attack, the arrival of the MiG‑15 in late 1950 posed a serious threat to high‑altitude UN bomber and reconnaissance operations. The F‑86 was fielded in strength to counter that threat. MiG Alley — roughly the area south of the Yalu River and west toward the Chongchon — became the principal arena for fighter combat. Ground‑controlled intercept (GCI) supported both sides: radar and radio nets vectoring formations toward advantageous positions, often at high altitude where transonic effects were prominent.</p>

    <h2 id="aircraft">Aircraft and Technical Profiles</h2>
    <h3 id="f86">North American F‑86 Sabre</h3>
    <p>Powered by a General Electric J47 turbojet, early F‑86 variants combined a 35° swept wing with automatic leading‑edge slats (on key versions) to improve low‑speed handling while preserving transonic performance. The gun battery typically comprised six .50‑inch Browning machine guns with high rate of fire and ample ammunition, harmonized for attacks against agile swept‑wing targets. Later blocks incorporated radar ranging gunsights to improve lethality during brief firing windows.</p>
    <h3 id="mig15">Mikoyan‑Gurevich MiG‑15</h3>
    <p>Using the Klimov VK‑1 centrifugal‑flow turbojet, the MiG‑15 featured a swept wing and high‑mounted tailplane that gave strong high‑altitude performance. Armament centered on heavy cannon — commonly one 37 mm and two 23 mm guns — optimized for bomber interception. The aircraft excelled in climb and initial acceleration, particularly above 30,000 feet, where tactics emphasized altitude advantage and slashing attacks.</p>

    <div class="bg-slate-800/60 border border-slate-700 rounded-lg p-6 my-6 surface-dark">
      <h3 class="font-semibold mb-4">Comparative Notes</h3>
      <ul class="space-y-2">
        <li><strong>Altitude and Energy:</strong> MiG‑15 generally held the advantage above ~30,000 ft; F‑86 emphasized energy retention and slashing attacks when out‑climbed.</li>
        <li><strong>Armament:</strong> F‑86’s six .50‑inch guns offered high rate and flatter trajectory; MiG‑15’s mixed cannon brought heavy hits against larger, less agile targets.</li>
        <li><strong>Handling:</strong> F‑86 control harmony and slats aided close‑in maneuvering; MiG‑15’s initial acceleration and climb favored vertical tactics.</li>
        <li><strong>Sights and Avionics:</strong> Radar ranging gunsights improved F‑86 lethality in fleeting windows.</li>
      </ul>
    </div>

    <p>The propulsion system represented one of the most significant technical challenges. The requirements demanded power, reliability, and efficiency levels that pushed existing engine technology to its limits. The solution involved close collaboration between aircraft designers and engine manufacturers, resulting in powerplant innovations that would influence future aviation development.</p>

    <p>Structural design innovations were equally important. The need to combine strength with lightness required new approaches to aircraft construction. Engineers experimented with different materials, joint techniques, and structural configurations to achieve the optimal balance of performance characteristics.</p>

    <h2 id="operations">Operations and Logistics</h2>
    <p>Jet combat demanded reliable fuel quality, oxygen equipment, and engine maintenance cycles suitable for forward bases. Turnaround procedures, boresighting of guns, and inspections for compressor blade damage became routine. Air‑to‑air victories reflected not only pilot skill and aircraft performance but the steadiness of the ground organization that kept oxygen systems, sights, and engines within limits.</p>

    <h2 id="tactics">Tactics, Training, and Ground Control</h2>
    <p>Both sides used GCI to position fighters. UN tactics prioritized altitude blocks, mutual support, and energy management that exploited the F‑86’s control harmony and sighting systems. Opposing formations sought to fight where the MiG‑15’s strengths — climb and high‑altitude performance — were decisive. Training emphasized oxygen discipline, Mach awareness, and brief, accurate firing opportunities rather than prolonged chases.</p>

    <h2 id="accounts">Pilot Accounts and Combat Notes</h2>
    <p>Pilot debriefs emphasized altitude advantage, sun position, and teamwork. Reports noted that many encounters were decided in brief windows after the merge, where energy state and sight readiness mattered more than notional turn rates. Accounts of disengagement were as important as kills — disciplined break‑offs preserved forces to fight again under better terms.</p>

    <h2 id="case-studies">Case Studies: Patterns That Produced Results</h2>
    <p>Representative engagements show recurring patterns. Formations that preserved altitude and sun advantage, arrived with stabilized energy states, and coordinated breaks to bracket the adversary created short, high‑probability firing windows. Conversely, chases that bled energy into the vertical without advantage produced few results and invited counter‑attacks. Units that rehearsed these patterns in training reproduced them under stress, turning doctrine into habit.</p>

    <h2 id="weather">Weather, Terrain, and Visibility</h2>
    <p>MiG Alley’s terrain and weather shaped tactics. Mountainous backdrops complicated visual acquisition; haze and winter light affected contrast at altitude. Pilots adjusted lookout patterns and relied on disciplined radio brevity to maintain formation integrity. Ground controllers compensated with radar geometry, vectoring flights to intercept lines that maximized time in favorable light.</p>

    <h2 id="radar-gci">Radar and Ground Control Integration</h2>
    <p>GCI was not merely a locator; it was a timing instrument. Effective controllers sequenced merges to favor energy and sun angle, called aborts when geometry soured, and directed re‑attacks that preserved fuel and oxygen margins. Squadrons refined common language so that a few words sufficed to cue complex actions — a human factors achievement as important as any airframe upgrade.</p>

    <h2 id="training-pipeline">Training Pipeline and Crew Endurance</h2>
    <p>Conversion to jets at war pace demanded syllabi that emphasized energy management, sighting discipline, and oxygen procedures. Debriefs captured lessons in checklists and briefing cards; instructors graded not only outcomes but adherence to process. Endurance — thermal stress, hypoxia risk, and fatigue — was managed by procedure: hydration, oxygen checks, and cockpit flows that reduced cognitive load when it mattered most.</p>

    <h2 id="sortie-planning">Sortie Planning, Fuel, and Divert Logic</h2>
    <p>Mission cards balanced fuel, altitude, and time on station against weather and GCI coverage. Pilots briefed minimum and joker fuels, divert fields, and weather alternates before engine start. En‑route climbs targeted Mach and altitude bands that preserved margin for the planned maneuver set; descents home were flown to oxygen and fuel discipline, not impulse. This planning culture made high‑tempo operations survivable in poor light and winter weather.</p>

    <div class="my-12">
      <img src="/blog-images/gci-radar-plotting-room-schematic.svg" alt="Original schematic illustration: ground-controlled intercept radar plotting motif (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-3 text-center italic">Original illustration (schematic): GCI vectoring—timed intercepts and aborts conserved fuel/oxygen for decisive windows (diagrammatic).</p>
    </div>

    <h2 id="engine-cycles">Engine Cycles and Maintenance Detail</h2>
    <p>Jet engines demanded routines unfamiliar to piston‑era squadrons. Compressor and turbine inspections watched for foreign object damage and thermal stress; borescope checks, plug changes, fuel‑control verifications, and filter inspections were timed to sortie counts and temperature histories. Technicians logged temperatures and pressures to catch drift before it became failure. The practical effect in combat was simple: the right thrust when the pilot asked for it, again and again.</p>

    <h2 id="representative-sortie">Representative Sortie Timeline</h2>
    <ul>
      <li><strong>Scramble and climb:</strong> Depart to briefed Mach/altitude bands; oxygen checks and formation integrity verified en‑route.</li>
      <li><strong>GCI vectoring:</strong> Controllers set intercept geometries; formations position for sun/altitude advantage.</li>
      <li><strong>Merge and decision:</strong> Short window; energy state and sight readiness decide whether to press or bracket.</li>
      <li><strong>Disengage/re‑attack:</strong> Break clean when geometry sours; re‑enter with energy and numbers, or RTB on fuel minima.</li>
      <li><strong>Recovery and debrief:</strong> Pattern speeds flown by numbers; boresight and systems checks scheduled; debrief turns notes into procedure.</li>
    </ul>

    <h2 id="raf-sabre-operations">RAF Sabre Operations Over Korea</h2>
    <p>
      The book describes RAF pilots flying the F-86 Sabre in operations over Korea, providing comprehensive coverage of British participation in Korean War air combat. RAF pilots contributed to United Nations air operations, demonstrating how NATO allies supported the Korean War effort. The comprehensive documentation of RAF Sabre operations ensures that British contributions to Korean War air combat are properly recognized and preserved.
    </p>
    <p>
      RAF Sabre operations over Korea demonstrated how British pilots adapted to American aircraft and tactics while contributing their own expertise to the air campaign. The comprehensive documentation of these operations ensures that the complete story of international participation in Korean War air combat is properly preserved. Understanding RAF Sabre operations provides valuable insights into how NATO allies collaborated during the Korean War.
    </p>

    <h2 id="canadair-sabre">Canadair Sabre Development and Deployment</h2>
    <p>
      The book describes the evolution and deployment of the Canadair Sabre in Royal Air Force, Royal Canadian Air Force and in NATO service-includes the West German Air Force. Included is the development of Canadair aircraft, the Canadair North Star/Argonaut, Silver Star CT-33, the Avro CF-100 and the Argonaut's involvement with the royal accession of Queen Elizabeth II. This comprehensive coverage demonstrates how Canadian aircraft manufacturing contributed to NATO air power during the Korean War era.
    </p>
    <p>
      The Canadair Sabre represented Canadian production of the F-86 design, demonstrating how NATO allies collaborated in aircraft production and deployment. The comprehensive documentation of Canadair Sabre development ensures that Canadian contributions to Korean War air power are properly recognized. Understanding Canadair Sabre production provides valuable insights into how international cooperation supported Korean War operations.
    </p>
    <p>
      Details of the first Sabre deployment with the carrier HMCS Magnificent are included and the deployment to Renfrew airport in 1951-52. Some aircraft were delivered through Stornoway. The involvement of Scottish Aviation, Airwork, Westland etc. is explained as well as the Sabre's fate at Church Crookham. This comprehensive coverage demonstrates how Scottish aviation industry supported Sabre operations and deployment.
    </p>
    <p>
      A full description of the Sabres being delivered over the North Atlantic in "Becher's Brook" and "Leap Frog" via, Canada, Greenland, Iceland, Stornoway, Prestwick or Kinloss or Lossiemouth which is reflected in the title. These flights are rarely published. This comprehensive documentation ensures that the complete story of Sabre deployment to Europe is properly preserved. Understanding these delivery operations provides valuable insights into how aircraft were transported across the Atlantic during the Cold War.
    </p>

    <h2 id="mig15-development">MiG-15 Development and Soviet Jet Engine Technology</h2>
    <p>
      The MIG-15 is included as well as Soviet jet engine development. A comprehensive appendix covering the Mig-15, RB-45, the Gloster Meteor etc. This comprehensive coverage ensures that the complete story of MiG-15 development and Soviet jet engine technology is properly documented and preserved.
    </p>
    <p>
      Understanding MiG-15 development provides valuable insights into how Soviet aircraft design influenced Korean War air combat. The comprehensive documentation of Soviet jet engine development ensures that the complete technical context of MiG-15 performance is properly understood. Understanding Soviet jet engine technology provides valuable insights into how MiG-15 capabilities were achieved.
    </p>
    <p>
      The book includes MIG 15 flight test details in the appendix, providing technical data on MiG-15 performance characteristics. This comprehensive documentation ensures that technical comparisons between F-86 Sabre and MiG-15 are properly grounded in verified data. Understanding MiG-15 flight test results provides valuable insights into how aircraft performance influenced combat outcomes.
    </p>

    <h2 id="mdap-nato">Mutual Defense Aid Program and NATO Operations</h2>
    <p>
      There is a chapter on Mutual Defense Aid Program (MDAP) the evolution of NATO with the European Union and the Berlin Airlift all fully illustrated. The book describes the finance of the Sabre for MDAP production and the Sabres acquisition by the West German Air Force. Includes details of Skyraiders, Neptunes and Avengers which were supplied through MDAP together with aircraft types ordered and their destination within NATO (Probably for the first time.). This comprehensive coverage demonstrates how MDAP supported Korean War operations and broader NATO defense efforts.
    </p>
    <p>
      The Mutual Defense Aid Program provided essential aircraft and equipment to NATO allies, supporting Korean War operations and broader defense requirements. The comprehensive documentation of MDAP ensures that the complete story of international cooperation during the Korean War is properly preserved. Understanding MDAP provides valuable insights into how NATO allies supported each other during the Cold War.
    </p>
    <p>
      Includes the squadron histories of the Canadair Sabre in Royal Air Force Germany and Royal Air Force Fighter Command service. This comprehensive coverage ensures that the complete story of Sabre deployment in RAF service is properly documented. Understanding RAF Sabre squadron histories provides valuable insights into how Sabre operations were organized and conducted.
    </p>

    <h2 id="scottish-aviation">Scottish Aviation and Sabre Refurbishment</h2>
    <p>
      The work of Scottish Aviation at Prestwick Airport and Renfrew Airport is also fully described and illustrated with regard to USAF and RCAF refurbishment contracts for the North American F-86E and the Canadair Sabre with the Avro CF-100. This comprehensive coverage demonstrates how Scottish aviation industry supported Korean War operations through aircraft refurbishment and maintenance.
    </p>
    <p>
      Scottish Aviation's work on F-86E and Canadair Sabre refurbishment ensured that aircraft were maintained in operational condition for Korean War service. The comprehensive documentation of Scottish Aviation's work ensures that this aspect of Korean War support is properly recognized. Understanding Scottish Aviation's contribution provides valuable insights into how maintenance and refurbishment supported combat operations.
    </p>
    <p>
      The air sea work of the SB-17G, Handley Page Hastings and the Grumman Albatross-the "Duck Buts" are included with illustrations and their control from Prestwick. This was for "Leapfrog" and "Bechers Brook." This comprehensive coverage demonstrates how search and rescue operations supported Sabre delivery flights across the Atlantic. Understanding these operations provides valuable insights into how support operations enabled Korean War air combat.
    </p>

    <h2 id="rb45-operations">RB-45 Operations and Intelligence Gathering</h2>
    <p>
      An additional chapter covers the Royal Air Force RB-45 operations over the Soviet Union in Jiu Jitsu and the integration of the Royal Air Force aircrew in U-2/Dragon Lady Operations in declassified operations in "Oldster" and "Jackson" and their Soviet Union overflights. Included are operations off aircraft carriers in the Pacific by British crews. There is an account of the first Royal Air Force Canberra flight over Kapustin Yar, the Soviet rocket test site, in 1952 and an explanation of what "Operation Robin" was. This comprehensive coverage demonstrates how reconnaissance operations supported Korean War intelligence gathering.
    </p>
    <p>
      RB-45 operations over the Soviet Union represented critical intelligence gathering during the Korean War era. The comprehensive documentation of these operations ensures that the complete story of Cold War reconnaissance is properly preserved. Understanding RB-45 operations provides valuable insights into how intelligence gathering supported Korean War operations.
    </p>
    <p>
      The first Royal Air Force Canberra flight over Kapustin Yar demonstrated how British aircraft contributed to intelligence gathering operations. The comprehensive documentation of this flight ensures that British contributions to Cold War intelligence are properly recognized. Understanding Canberra operations provides valuable insights into how reconnaissance aircraft supported strategic intelligence requirements.
    </p>

    <h2 id="intelligence-cooperation">Burns-Templar Agreement and Intelligence Cooperation</h2>
    <p>
      The author gives the first published account of the Burns-Templar agreement which paved the way for intelligence co-operation authorised at the highest political level between the United States and the United Kingdom. This comprehensive coverage demonstrates how Anglo-American intelligence cooperation was formalized during the Korean War era.
    </p>
    <p>
      The Burns-Templar agreement established the framework for intelligence cooperation between the United States and United Kingdom, ensuring that intelligence sharing supported Korean War operations and broader Cold War requirements. The comprehensive documentation of this agreement ensures that the complete story of Anglo-American intelligence cooperation is properly preserved. Understanding the Burns-Templar agreement provides valuable insights into how intelligence cooperation supported Korean War operations.
    </p>

    <h2 id="myths">Myths, Claims, and What the Data Support</h2>
    <p>Simple verdicts — one type universally superior — collapse under operational detail. Altitude band, block differences, pilot proficiency, and initial position confound single‑number judgements. Data‑grounded comparisons keep context in view: where each aircraft excelled; where tactics compensated; and how training and logistics shifted outcomes over time.</p>

    <h2 id="legacy">Legacy and Influence</h2>
    <p>Korea clarified transonic fighter practice: conserve energy, fight from advantage, fire brief accurate bursts, and let ground control and maintenance extend pilot reach. Experience with Sabre and MiG informed next‑generation designs — higher‑thrust engines, wings with greater Mach margin — and a gradual move toward sensors that shifted detection and solution further from the merge. Procedures outlived hardware: disciplined briefs, checklists, and debriefs remained the backbone of effective air forces.</p>
    <p>
      The comprehensive documentation provided in Charles E. MacKay's <a href="/books/sabres-from-north" class="underline font-medium">Sabres from the North: F-86 Sabre in RAF, RCAF, Luftwaffe Service</a> 
      ensures that the complete story of Korean War air combat is preserved for future generations. The book's thorough research, detailed illustrations, and careful documentation create an authoritative resource that does justice to Korean War air combat achievements. This scholarly work ensures that Korean War air combat receives the recognition it deserves in aviation history.
    </p>

    <h2 id="conclusion">Conclusion</h2>
    <p>The Korean War set the grammar of jet air combat. The aircraft were capable; the system — pilots, controllers, maintainers, and instructors — made capability reliable. The enduring lessons are practical: arrive from advantage, keep energy in hand, fire briefly and precisely, and respect the limits that preserve judgement. They were true over MiG Alley and remain true wherever fighters meet at the edge of the envelope.</p>
    <p>
      The comprehensive documentation of Korean War air combat reveals how international cooperation, technical innovation, and tactical adaptation shaped the first jet age conflict. RAF Sabre operations, Canadair production, MDAP support, and intelligence cooperation demonstrate how NATO allies collaborated to maintain air superiority. The lessons learned over Korea influenced subsequent Cold War aviation development and established principles that continue to guide modern air combat doctrine.
    </p>
    <p>
      For comprehensive coverage of Korean War air combat and related topics, see 
      <a href="/books/sabres-from-north" class="underline font-medium">Sabres from the North: F-86 Sabre in RAF, RCAF, Luftwaffe Service</a>, 
      which provides detailed analysis of Sabre operations, RAF participation, and the broader context of NATO operations during the Korean War era. The book's comprehensive coverage ensures that all aspects of Korean War air combat are properly documented and preserved for future generations.
    </p>
  `,
  excerpt: `The intense aerial battles of the Korean War that proved the effectiveness of jet fighters in modern warfare.`,
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 18,
  featuredImage: {
    url: '/blog-images/korean-war-air-combat-featured-schematic.svg',
    alt: 'Korean War Air Combat — Enhanced Edition',
    caption: 'Original illustration (schematic): MiG Alley jet combat motif (diagrammatic).'
  },
  category: 'Aviation History',
  tags: ["korean","war","air","combat"],
  relatedBooks: getBooksData(['sabres-from-north', 'enemy-luftwaffe-1945', 'sonic-to-standoff']),
  relatedPosts: [
    {
      id: 'f86-sabre-cold-war-fighter',
      title: 'F‑86 Sabre: Cold War Fighter',
      excerpt: 'Cold War service, variants, and transonic handling lessons from the Sabre line.',
      image: '/blog-images/f86-sabre-formation-korea-schematic.svg',
      readingTime: 6,
    },
    {
      id: 'jet-age-aviation-cold-war-development',
      title: 'Jet Age Aviation: Cold War Development',
      excerpt: 'How early jet combat over Korea drove Cold War fighter design and doctrine.',
      image: '/blog-images/lightning-f6-supersonic.svg',
      readingTime: 7,
    },
    {
      id: 'me262-jet-fighter-revolution',
      title: 'Me 262: Jet Fighter Revolution',
      excerpt: 'German WWII jet lessons that foreshadowed MiG Alley’s jet-versus-jet battles.',
      image: '/blog-images/me262-jet-fighter-historical.jpg',
      readingTime: 6,
    },
  ]
}

const relatedBooks: any[] = []

const relatedPosts: any[] = []

export const metadata: Metadata = {
  title: `Korean War Air Combat | Charles E. MacKay`,
  description: `Comprehensive analysis of korean war air combat with expert historical research and technical details.`,
  keywords: 'korean, war, air, combat, aviation history',
  openGraph: {
    title: `Korean War Air Combat`,
    description: `Comprehensive analysis of korean war air combat with expert historical research and technical details.`,
    images: ['/blog-images/korean-war-air-combat-featured-schematic.svg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/blog/korean-war-air-combat'
  },
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
  }
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/korean-war-air-combat"
        pageImageUrl={post.featuredImage.url}
      />
      <EnhancedBlogSEO 

        post={post}

        relatedBooks={[{ id: 'sabres-from-north', title: '', isbn: '', price: 0 }, { id: 'enemy-luftwaffe-1945', title: '', isbn: '', price: 0 }, { id: 'sonic-to-standoff', title: '', isbn: '', price: 0 }]}

        relatedPosts={[]}

      />

      

      <ComprehensiveBlogTemplate post={post} />
        
    </>
  )
}