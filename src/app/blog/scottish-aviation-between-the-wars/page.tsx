import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import BlogAuthorityEnhancer from '@/components/BlogAuthorityEnhancer'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'

import EnhancedBlogSEO from '@/components/EnhancedBlogSEO';
const post = {
  id: 'scottish-aviation-between-the-wars',
  title: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes - Enhanced Edition',
  subtitle: 'A comprehensive, research-backed account of inter-war Scottish aviation: Renfrew Airport development, the Scottish Flying Club, Beardmore/Weir engineering, civil air routes, and the transition to rearmament that prepared Scotland for World War II.',
  content: `
    <h2 id="introduction">Introduction: The Inter-War Bridge</h2>
    <p>
      Between 1918 and 1939, Scotland built a civilian air network from Renfrew outward, establishing the infrastructure, skills, and procedures that would prove essential when rearmament demanded rapid scale-up. Based on comprehensive research documented in Charles E. MacKay's authoritative works 
      <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</a> 
      and <a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation, Vol. 1</a>, 
      this analysis presents the complete story of how Scottish aviation maintained capabilities between the wars through civil routes, flying clubs, and retained industrial capacity.
    </p>
    <p>
      The book <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation</a> covers the air school at Renfrew - the original Renfrew Airport - with a list of all aircraft deployed at the airfield, how the school was set up to its closure in 1928. Mentions how the Auxiliary Air Force was set up. There is a complete list of school aircraft including the Avro 504, Bristol Fighter, Bristol 89 and Bristol 89a. This included the Pollockshaws and Springburn Park air crashes. This comprehensive documentation ensures that Renfrew Airport's role in inter-war Scottish aviation is properly understood.
    </p>
    <p>
      The inter-war period represented a crucial bridge between World War I aviation expansion and World War II rearmament. Scottish aviation maintained industrial capabilities, pilot training infrastructure, and operational procedures that would prove essential when military requirements accelerated. Understanding this inter-war period provides valuable insights into how Scotland's aviation ecosystem prepared for wartime demands.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Insert image here: A black-and-white photograph of Renfrew Airport in the 1920s, showing aircraft on the field and the original terminal building, demonstrating Scotland's first major civil aviation facility" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Inter‑war connectivity: routes, weather, and infrastructure shaped the Scottish map of flight.</p>
    </div>

    <h2 id="renfrew-airport">Renfrew Airport: Scotland's First Major Aviation Facility</h2>
    <p>
      The air school at Renfrew - the original Renfrew Airport - has a list of all aircraft deployed at the airfield, how the school was set up to its closure in 1928. The development of Renfrew airport by the Ministry of Munitions is documented in Clydeside Aviation, providing comprehensive coverage of how Scotland's first major aviation facility was established. This comprehensive documentation ensures that Renfrew Airport's development and operation are properly understood.
    </p>
    <p>
      Renfrew Airport represented Scotland's first major civil aviation facility, established by the Ministry of Munitions and maintained through the inter-war period. The comprehensive documentation of Renfrew's development ensures that the complete story of Scottish aviation infrastructure is properly preserved. Understanding Renfrew's development provides valuable insights into how Scottish aviation infrastructure evolved during the inter-war period.
    </p>
    <p>
      The air school at Renfrew maintained pilot training capabilities throughout the inter-war period, using aircraft including the Avro 504, Bristol Fighter, Bristol 89 and Bristol 89a. The comprehensive documentation of these aircraft ensures that the complete story of inter-war pilot training is properly preserved. Understanding Renfrew's training role provides valuable insights into how pilot training was maintained between the wars.
    </p>
    <p>
      The closure of Renfrew Airport in 1928 marked the end of an era, but the skills and procedures developed there continued to influence Scottish aviation. The comprehensive documentation of Renfrew's closure ensures that the complete story of Scottish aviation infrastructure is properly preserved. Understanding Renfrew's closure provides valuable insights into how Scottish aviation infrastructure evolved during the inter-war period.
    </p>

    <h2 id="routes-aerodromes">Routes and Aerodromes: Building Scotland's Air Network</h2>
    <p>
      Between 1918 and 1939, Scotland built a civilian air network from Renfrew outward. Timetables reveal early commercial viability and seasonal shifts; accident reports show the safety culture maturing as weather and terrain lessons were absorbed into procedures. Renfrew, Aberdeen, Inverness, and the Western Isles formed an emerging mesh of routes balancing geography, weather, and aircraft range.
    </p>
    <p>
      Operators tuned schedules to daylight and cloud ceilings, adding alternates and weather minima as experience hardened policy. Radio beacons and ground signals improved navigation; aerodrome logs capture the slow codification of best practice—fuel reserves, diversion protocols, and runway condition reporting. This comprehensive documentation ensures that the complete story of Scottish civil aviation routes is properly preserved.
    </p>
    <p>
      The development of routes between Scottish cities demonstrated how civil aviation could connect Scotland's dispersed population centers. The comprehensive documentation of these routes ensures that the complete story of Scottish civil aviation development is properly preserved. Understanding these routes provides valuable insights into how Scottish civil aviation evolved during the inter-war period.
    </p>
    <p>
      Weather and terrain challenges shaped Scottish aviation operations, requiring careful attention to weather minima and alternate aerodromes. The comprehensive documentation of weather procedures ensures that the complete story of Scottish aviation operations is properly preserved. Understanding weather procedures provides valuable insights into how Scottish aviation adapted to challenging conditions.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Insert image here: A map or diagram showing inter-war Scottish aviation routes connecting Renfrew, Aberdeen, Inverness, and the Western Isles, demonstrating the emerging civil aviation network" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Inter‑war connectivity: routes, weather, and infrastructure shaped the Scottish map of flight.</p>
    </div>

    <h2 id="scottish-flying-club">The Scottish Flying Club: Training and Outreach</h2>
    <p>
      Club logs and newsletters chronicle training, proficiency, and outreach. Private flying seeded pilot pipelines, technical maintenance skills, and a social identity that later meshed with rearmament. The club system sustained currency training, instrument familiarisation, and basic aerobatics. Volunteer instructors established airmanship standards; maintenance crews honed inspection discipline.
    </p>
    <p>
      Youth outreach and air days broadened public acceptance of civil flight—critically, clubs helped normalise safety culture (emergency drills, weather holds) that later eased transitions to service flying. The comprehensive documentation of Scottish Flying Club activities ensures that the complete story of inter-war pilot training is properly preserved. Understanding the club's role provides valuable insights into how pilot training was maintained between the wars.
    </p>
    <p>
      The Scottish Flying Club maintained pilot training capabilities throughout the inter-war period, providing training that would prove essential when rearmament accelerated. The comprehensive documentation of club training ensures that the complete story of inter-war pilot training is properly preserved. Understanding club training provides valuable insights into how pilot pipelines were maintained between the wars.
    </p>
    <p>
      The club's emphasis on safety culture and operational procedures established standards that would influence military aviation training. The comprehensive documentation of safety culture ensures that the complete story of inter-war aviation procedures is properly preserved. Understanding safety culture provides valuable insights into how operational procedures were developed and maintained.
    </p>

    <h2 id="beardmore-industry">Industry: Beardmore Engineering and Manufacturing</h2>
    <p>
      Beardmore's aircraft and engines, Weir's rotary‑wing experiments, and supplier networks kept skilled labour and tooling in circulation. Factory papers link civil orders to retained capacity—critical when rearmament demanded rapid scale‑up. Beardmore's engine test cells, jigs, and heat‑treatment shops underwrote component repeatability.
    </p>
    <p>
      The book <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation</a> covers the aviation history of the Scottish company, William Beardmore & Co., Ltd from 1913 to 1930 at Dalmuir, Clydebank and Parkhead, Glasgow. Follows the infant aircraft industry from the First World War, 1914-1918, to mass production of all-metal aircraft in the Thirties. This comprehensive documentation ensures that Beardmore's inter-war activities are properly understood.
    </p>
    <p>
      Beardmore's retained manufacturing capabilities proved essential when rearmament accelerated, allowing rapid scale-up of production. The comprehensive documentation of Beardmore's capabilities ensures that the complete story of Scottish aviation manufacturing is properly preserved. Understanding Beardmore's capabilities provides valuable insights into how manufacturing capacity was maintained between the wars.
    </p>
    <p>
      Subcontractors—machine shops, foundries, and joiners—maintained capabilities by cycling between civil jobs and light service work. The Clyde's adjacency to shipbuilding ensured fast access to steels, plating, and inspection services. The comprehensive documentation of subcontractor networks ensures that the complete story of Scottish aviation manufacturing is properly preserved. Understanding subcontractor networks provides valuable insights into how manufacturing capabilities were maintained.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Insert image here: A black-and-white photograph of Beardmore workshops at Dalmuir or Parkhead during the inter-war period, showing machinery, tooling, and workers maintaining manufacturing capabilities" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Workshops and skills persisted between orders—insurance against the shocks of rearmament.</p>
    </div>

    <h2 id="weir-autogyro">Weir Autogyro and Rotary-Wing Development</h2>
    <p>
      Weir's autogyro work injected rotorcraft know‑how into the region—lamination techniques, balance, and track. The comprehensive documentation of Weir's autogyro development ensures that the complete story of Scottish rotorcraft development is properly preserved. Understanding Weir's autogyro work provides valuable insights into how rotary-wing capabilities were developed in Scotland.
    </p>
    <p>
      The book <a href="/books/sycamore-seeds" class="underline font-medium">The Sycamore Seeds: The Early History of the Helicopter</a> investigates the role of G & J Weir and the first British helicopters including the Weir W5 and W6. Takes the history past WW2 to the Cierva W9 and the giant Air Horse. This comprehensive documentation ensures that Weir's contribution to rotorcraft development is properly recognized.
    </p>
    <p>
      Weir's autogyro development established rotorcraft manufacturing capabilities that would influence later helicopter development. The comprehensive documentation of Weir's development ensures that the complete story of Scottish rotorcraft development is properly preserved. Understanding Weir's development provides valuable insights into how rotorcraft capabilities were established in Scotland.
    </p>

    <h2 id="auxiliary-air-force">Auxiliary Air Force: 602 Squadron and Military Preparation</h2>
    <p>
      By the mid‑1930s, Scottish units and firms reconnected civilian experience with defence imperatives. 602 (City of Glasgow) Squadron's evolution foreshadowed fighter modernisation, while civil infrastructure offered training airfields and logistics nodes. The book mentions how the Auxiliary Air Force was set up, providing comprehensive coverage of how Scotland's military aviation capabilities were maintained between the wars.
    </p>
    <p>
      602 Squadron's evolution demonstrated how civilian aviation experience could be transitioned to military requirements. The comprehensive documentation of 602 Squadron's development ensures that the complete story of Scottish military aviation preparation is properly preserved. Understanding 602 Squadron's development provides valuable insights into how military aviation capabilities were maintained between the wars.
    </p>
    <p>
      The Auxiliary Air Force represented a crucial bridge between civilian and military aviation, maintaining military capabilities while drawing on civilian experience. The comprehensive documentation of the Auxiliary Air Force ensures that the complete story of Scottish military aviation preparation is properly preserved. Understanding the Auxiliary Air Force provides valuable insights into how military aviation capabilities were maintained between the wars.
    </p>

    <h2 id="aircraft-operations">Aircraft Operations: Avro 504, Bristol Fighter, and Training Aircraft</h2>
    <p>
      There is a complete list of school aircraft including the Avro 504, Bristol Fighter, Bristol 89 and Bristol 89a. This comprehensive documentation ensures that inter-war Scottish aviation aircraft operations are properly understood. These aircraft provided training capabilities that would prove essential when rearmament accelerated.
    </p>
    <p>
      The Avro 504 represented one of the most important training aircraft of the inter-war period, used extensively at Renfrew and other Scottish aerodromes. The comprehensive documentation of Avro 504 operations ensures that the complete story of inter-war training is properly preserved. Understanding Avro 504 operations provides valuable insights into how pilot training was conducted between the wars.
    </p>
    <p>
      The Bristol Fighter continued to serve in training roles during the inter-war period, providing advanced training capabilities. The comprehensive documentation of Bristol Fighter operations ensures that the complete story of inter-war training is properly preserved. Understanding Bristol Fighter operations provides valuable insights into how advanced training was conducted between the wars.
    </p>
    <p>
      The Bristol 89 and Bristol 89a represented more advanced training aircraft used during the inter-war period. The comprehensive documentation of these aircraft ensures that the complete story of inter-war training is properly preserved. Understanding these aircraft provides valuable insights into how training capabilities evolved between the wars.
    </p>

    <h2 id="accidents-safety">Accidents and Safety Culture: Pollockshaws and Springburn Park</h2>
    <p>
      This included the Pollockshaws and Springburn Park air crashes. This comprehensive documentation ensures that inter-war aviation safety issues are properly understood. These accidents demonstrated the importance of safety culture and operational procedures that would influence later aviation operations.
    </p>
    <p>
      The Pollockshaws and Springburn Park crashes highlighted safety challenges during the inter-war period, leading to improved procedures and safety culture. The comprehensive documentation of these accidents ensures that the complete story of inter-war aviation safety is properly preserved. Understanding these accidents provides valuable insights into how safety culture evolved between the wars.
    </p>
    <p>
      Accident reports show the safety culture maturing as weather and terrain lessons were absorbed into procedures. The comprehensive documentation of accident investigations ensures that the complete story of inter-war aviation safety is properly preserved. Understanding accident investigations provides valuable insights into how safety procedures were developed and refined.
    </p>

    <h2 id="rearmament">Toward Rearmament: The Transition to Wartime</h2>
    <p>
      When procurement accelerated, Scotland's blended ecosystem—routes, clubs, and factories—converted quickly to service needs: ground crews familiar with civil inspection moved into RAF standards; pilots transitioned from club machines to trainers; civil aerodromes provided dispersal and training circuits. The inter‑war groundwork reduced conversion friction and time to readiness.
    </p>
    <p>
      The inter-war period's retained capabilities proved essential when rearmament accelerated in the mid-1930s. The comprehensive documentation of this transition ensures that the complete story of Scottish aviation's preparation for war is properly preserved. Understanding this transition provides valuable insights into how inter-war preparation enabled rapid wartime scale-up.
    </p>
    <p>
      Ground crews familiar with civil inspection procedures could quickly transition to RAF standards, demonstrating how inter-war training prepared personnel for wartime demands. The comprehensive documentation of ground crew transition ensures that the complete story of inter-war preparation is properly preserved. Understanding ground crew transition provides valuable insights into how maintenance capabilities were maintained between the wars.
    </p>
    <p>
      Pilots trained on club aircraft could quickly transition to military trainers, demonstrating how inter-war pilot training maintained pilot pipelines. The comprehensive documentation of pilot transition ensures that the complete story of inter-war preparation is properly preserved. Understanding pilot transition provides valuable insights into how pilot training was maintained between the wars.
    </p>
    <p>
      Civil aerodromes provided dispersal and training circuits when military requirements accelerated, demonstrating how inter-war infrastructure supported wartime operations. The comprehensive documentation of aerodrome conversion ensures that the complete story of inter-war preparation is properly preserved. Understanding aerodrome conversion provides valuable insights into how infrastructure was maintained between the wars.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Insert image here: A black-and-white photograph of Scottish aircraft in formation during the inter-war period, showing Avro 504s or Bristol Fighters, demonstrating the training capabilities maintained between the wars" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Inter-war training: maintaining pilot pipelines and operational capabilities for future demands.</p>
    </div>

    <h2 id="comparison-contemporaries">Comparison with Contemporaries: Scottish Aviation in Context</h2>
    <p>
      Scottish aviation's inter-war development occurred within the broader context of British aviation evolution. While England's aviation industry received more attention, Scotland maintained unique capabilities through its industrial heritage and geographic position. The comprehensive documentation of Scottish aviation ensures that its contributions are properly recognized.
    </p>
    <p>
      Scotland's shipbuilding heritage provided unique advantages for aviation manufacturing, with access to steel, plating, and precision engineering capabilities. The comprehensive documentation of these advantages ensures that the complete story of Scottish aviation capabilities is properly preserved. Understanding these advantages provides valuable insights into how Scotland's industrial heritage supported aviation development.
    </p>
    <p>
      Scotland's geographic position made it strategically important for Atlantic operations and northern routes, providing unique operational requirements. The comprehensive documentation of Scotland's geographic advantages ensures that the complete story of Scottish aviation operations is properly preserved. Understanding geographic advantages provides valuable insights into how Scotland's position influenced aviation development.
    </p>

    <h2 id="legacy-influence">Legacy and Influence on Wartime Operations</h2>
    <p>
      The inter-war period's retained capabilities proved essential when World War II began, enabling rapid scale-up of production, training, and operations. The comprehensive documentation of this legacy ensures that the complete story of inter-war preparation is properly preserved. Understanding this legacy provides valuable insights into how inter-war preparation enabled wartime success.
    </p>
    <p>
      The procedures developed during the inter-war period continued to influence wartime operations, demonstrating how inter-war preparation contributed to wartime effectiveness. The comprehensive documentation of these procedures ensures that the complete story of inter-war preparation is properly preserved. Understanding these procedures provides valuable insights into how operational procedures were developed and maintained.
    </p>
    <p>
      The skills maintained during the inter-war period proved essential when rearmament accelerated, demonstrating how inter-war preparation enabled rapid wartime scale-up. The comprehensive documentation of these skills ensures that the complete story of inter-war preparation is properly preserved. Understanding these skills provides valuable insights into how capabilities were maintained between the wars.
    </p>

    <h2 id="modern-legacy">Modern Legacy and Historical Significance</h2>
    <p>
      The inter-war period's retained capabilities established foundations for Scotland's aviation industry that continue to influence modern operations. The comprehensive documentation of this legacy ensures that the complete story of Scottish aviation development is properly preserved. Understanding this legacy provides valuable insights into how inter-war preparation influenced long-term aviation development.
    </p>
    <p>
      The procedures developed during the inter-war period continue to influence modern aviation operations, demonstrating the enduring significance of inter-war preparation. The comprehensive documentation of these procedures ensures that the complete story of inter-war preparation is properly preserved. Understanding these procedures provides valuable insights into how operational procedures were developed and maintained.
    </p>
    <p>
      The comprehensive documentation provided in Charles E. MacKay's <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation</a> 
      and <a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation, Vol. 1</a> 
      ensures that the complete story of inter-war Scottish aviation is preserved for future generations. The books' thorough research, detailed illustrations, and careful documentation create authoritative resources that do justice to Scottish aviation achievements. This scholarly work ensures that inter-war Scottish aviation receives the recognition it deserves in aviation history.
    </p>

    <h2 id="academic-recognition">Academic Recognition and Research Value</h2>
    <p>
      The books are not compendiums of Wikipedia articles, these are original works and are not on-demand prints or compilations of search answers from web sites. This rigorous approach to research ensures factual accuracy and comprehensive coverage. The comprehensive documentation of inter-war Scottish aviation creates a valuable resource for researchers studying aviation history, industrial development, and military preparation.
    </p>
    <p>
      The books' value extends beyond individual aircraft types to provide insights into industrial development, pilot training, and operational procedures. The comprehensive coverage of inter-war Scottish aviation creates a valuable resource for understanding how aviation capabilities were maintained between the wars. The detailed documentation of operations, training, and influence ensures that the complete story of inter-war Scottish aviation is properly preserved.
    </p>

    <h2 id="conclusion">Conclusion: The Inter-War Bridge</h2>
    <p>
      Scottish aviation between the wars represented a crucial bridge between World War I expansion and World War II rearmament. Through civil routes, flying clubs, and retained industrial capacity, Scotland maintained aviation capabilities that would prove essential when military requirements accelerated. The comprehensive documentation of this period ensures that the complete story of inter-war Scottish aviation is properly preserved for future generations.
    </p>
    <p>
      The inter-war period's retained capabilities enabled rapid scale-up when rearmament accelerated, demonstrating how inter-war preparation contributed to wartime success. The comprehensive documentation of this preparation ensures that the complete story of inter-war Scottish aviation is properly preserved. Understanding this preparation provides valuable insights into how aviation capabilities were maintained between the wars.
    </p>
    <p>
      As we look back on inter-war Scottish aviation, its contributions to maintaining capabilities and preparing for future demands remain fundamentally important. The principles established through inter-war operations continue to influence aviation development, demonstrating the enduring significance of inter-war preparation. Inter-war Scottish aviation's legacy is preserved not only in historical records but in every modern aviation operation that benefits from the foundations established during this crucial period.
    </p>

    <h2 id="further-reading">Further Reading and Related Works</h2>
    <p>For comprehensive coverage of inter-war Scottish aviation and related topics, explore these authoritative works by Charles E. MacKay:</p>
    <ul>
      <li><a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</a> — Comprehensive coverage of Beardmore's aviation activities from 1913 to 1930, including Renfrew Airport development, aircraft production, and the air school</li>
      <li><a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation, Vol. 1</a> — Detailed coverage of Scottish aviation manufacturing during World War I and the inter-war period</li>
      <li><a href="/books/clydeside-aviation-vol2" class="underline font-medium">Clydeside Aviation, Vol. 2</a> — Continued coverage of Scottish aviation development and operations</li>
      <li><a href="/blog/beardmore-aviation-scottish-industrial-giant" class="underline font-medium">Beardmore Aviation: Scottish Industrial Giant</a> — Comprehensive analysis of Beardmore's aviation activities</li>
      <li><a href="/blog/clydeside-aviation-revolution" class="underline font-medium">Clydeside Aviation Revolution</a> — The broader context of Scottish aviation manufacturing</li>
    </ul>

    <h3>Related Articles</h3>
    <ul>
      <li><a href="/blog/clydeside-aviation-revolution" class="underline">Clydeside Aviation Revolution</a> — The broader context of Scottish aviation manufacturing</li>
      <li><a href="/blog/beardmore-aviation-scottish-industrial-giant" class="underline">Beardmore Aviation: Scottish Industrial Giant</a> — Detailed analysis of Beardmore's aviation activities</li>
    </ul>
  `,
  excerpt: 'A comprehensive, research-backed account of inter-war Scottish aviation: Renfrew Airport development, the Scottish Flying Club, Beardmore/Weir engineering, civil air routes, and the transition to rearmament that prepared Scotland for World War II.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: new Date().toISOString(),
  readingTime: 25,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes - Enhanced Edition',
    caption: 'Clubs, routes, and retained industry capacity.'
  },
  category: 'Scottish Aviation History',
  tags: ['Scottish Aviation', 'Inter‑war', 'Beardmore', 'Weir', 'Renfrew', 'charles mackay books'],
  relatedBooks: getBooksData(['clydeside-aviation-vol2', 'beardmore-aviation', 'clydeside-aviation-vol1']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes - Enhanced Edition | Charles E. MacKay',
  description: 'A comprehensive, research-backed account of inter-war Scottish aviation: Renfrew Airport development, the Scottish Flying Club, Beardmore/Weir engineering, civil air routes, and the transition to rearmament that prepared Scotland for World War II.',
  keywords: 'Scottish aviation, inter‑war, Renfrew airport, Scottish Flying Club, Beardmore, Weir, charles mackay books, Charles E. MacKay',
  openGraph: {
    title: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes - Enhanced Edition',
    description: 'A comprehensive, research-backed account of inter-war Scottish aviation: Renfrew Airport development, the Scottish Flying Club, Beardmore/Weir engineering, civil air routes, and the transition to rearmament.',
    images: ['/blog-images/default-generic.svg'],
    type: 'article'
  }
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/scottish-aviation-between-the-wars"
      />
      <EnhancedBlogSEO 

        post={post}

        relatedBooks={[{ id: 'clydeside-aviation-vol2', title: '', isbn: '', price: 0 }, { id: 'beardmore-aviation', title: '', isbn: '', price: 0 }, { id: 'clydeside-aviation-vol1', title: '', isbn: '', price: 0 }]}

        relatedPosts={[]}

      />

      

      <ComprehensiveBlogTemplate post={post} />
        
    </>
  )
}

