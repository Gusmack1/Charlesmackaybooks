import type { Metadata } from 'next'
import { SITE_CONSTANTS } from '@/config/constants'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'
import EnhancedBlogSEO from '@/components/EnhancedBlogSEO'

export const metadata: Metadata = {
  title: 'Beardmore Aviation: Tornado Engine, R101 and HMS Argus',
  description:
    'Source-based account of Beardmore\'s aviation work: HMS Argus carrier operations, airship production, and the Beardmore Tornado engine\'s role in the R101 project.',
  keywords: ['Beardmore', 'Beardmore Tornado engine', 'R101', 'HMS Argus', 'Scottish aviation', 'airship production'],
  openGraph: {
    title: 'Beardmore Aviation: Tornado Engine, R101 and HMS Argus',
    description:
      'HMS Argus carrier operations, airship production, and the Beardmore Tornado engine\'s role in the R101 project (source-based).',
    url: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: '/blog-images/beardmore-parkhead-forge.jpg',
      width: 1200,
      height: 630,
      alt: 'Beardmore Aviation: Tornado Engine, R101 and HMS Argus'
    }],
    locale: 'en_GB',
    type: 'article',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant'
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

const post = {
  id: 'beardmore-aviation-scottish-industrial-giant',
  title: 'William Beardmore & Company: Scottish Aviation Pioneer',
  subtitle: 'How William Beardmore & Company moved from heavy industry into aircraft, engines, airships, and early carrier development.',
  content: `
    <h2 id="introduction">Introduction: From Shipbuilding to Aviation</h2>
    <p>
      William Beardmore & Company was one of Scotland's major engineering firms and became an important aviation manufacturer in the early twentieth century. 
      Drawing on archival research in <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</a>, 
      this article covers the transition from shipbuilding and steel production into aircraft, aero-engines, airships, and naval aviation projects.
    </p>

    <div class="my-8">
      <img src="/blog-images/beardmore-parkhead-forge.jpg" alt="Beardmore Parkhead Forge works" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Parkhead Forge: The industrial foundation that enabled Beardmore's entry into aviation manufacturing.</p>
    </div>

    <h2 id="origins">The Origins of Beardmore Aviation (1913-1914)</h2>
    <p>
      The story of Beardmore Aviation begins not with aviation at all, but with the industrial might of William Beardmore & Company, 
      one of Scotland's most powerful engineering firms. By 1913, the company had established itself as a major shipbuilder and steel 
      manufacturer on the River Clyde at Dalmuir, Clydebank and Parkhead, Glasgow. However, it was William Beardmore's personal 
      fascination with the emerging field of aviation that would lead the company into an entirely new realm of engineering.
    </p>
    <p>
      Beardmore's entry into aviation was marked by ambitious plans to produce German D.F.W. (Deutsche Flugzeug-Werke) aircraft 
      in Britain before the First World War. Newly researched details reveal the involvement of E.C. Kny with Beardmore and D.F.W. 
      aircraft production in Germany, supported by rare drawings and pictures that document this pre-war collaboration. These early 
      connections demonstrate the international scope of Beardmore's vision and their recognition of German engineering excellence 
      in the emerging field of aviation.
    </p>
    <p>
      The company's facilities at Dalmuir, Clydebank and Parkhead were ideally suited for aircraft production. The extensive 
      engineering infrastructure, skilled workforce, and existing metalworking capabilities positioned Beardmore perfectly to 
      undertake the complex task of aircraft manufacturing. Their experience in producing precision components for ships translated 
      directly to the exacting requirements of aircraft construction.
    </p>

    <h2 id="great-war-production">The Great War Years: Military Aircraft Production</h2>
    <p>
      When war broke out in 1914, Beardmore's aviation ambitions were rapidly transformed into a crucial component of Britain's 
      war effort. The book <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation</a> provides accurate production figures deeply researched from Beardmore archive records 
      in Scotland and London, with contract numbers never before published. These records reveal the true scale of Beardmore's 
      contribution to British military aviation during the First World War.
    </p>
    <p>
      Beardmore's production programmes for aero-engines and aeroplanes in the First World War were undertaken for the British 
      Ministry of Munitions, supplying the Royal Flying Corps, Royal Naval Air Service, and the infant Royal Air Force (RAF). 
      The company's production lines manufactured a diverse range of aircraft types, each with its own history and operational 
      significance. For comprehensive coverage of British aircraft production during this period, see 
      <a href="/books/british-aircraft-great-war" class="underline font-medium">British Aircraft of the Great War: Fighters, Bombers, Seaplanes, Trainers, Flying Boats</a>, 
      which includes detailed information on aircraft ordering procedures and squadron formation.
    </p>
    <p>
      The Sopwith Pup and Sopwith Camel were among the most significant aircraft types produced by Beardmore. The evolution of 
      these Sopwith aircraft included Camel operations off cruisers and the carriers Argus and Furious. The book documents the 
      history of the deployment of the Sopwith Pup and the Sopwith Camel with the R.N.A.S., including combat details and early 
      aircraft carrier deployment. The tests on H.M.S. Furious and the Tondern raid are covered in detail, including the loss 
      of Dunning on the hybrid carrier Furious.
    </p>

    <div class="my-8">
      <img src="/blog-images/beardmore-sopwith-camel-schematic.svg" alt="Original schematic illustration of a WWI-era biplane fighter in side profile with a simple serial label (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Original illustration (schematic): a Beardmore-built biplane fighter outline, labelled in text for context.</p>
    </div>

    <h2 id="notable-achievements">Notable Combat Achievements</h2>
    <p>
      One of Beardmore's most celebrated achievements was the interception and shooting down of the Zeppelin L70 in August 1918 
      by Stuart Culley in the Beardmore Camel N6812, which is preserved in the Imperial War Museum. This remarkable feat demonstrates 
      the quality and reliability of Beardmore-built aircraft in combat conditions. The detailed accounts of this action, preserved 
      in archival records, illustrate the precision engineering and manufacturing excellence that characterized Beardmore's aviation output.
    </p>
    <p>
      Other aircraft types produced by Beardmore during the war included the Wight Seaplane, the Nieuport XII, the pre-war D.F.W.s, 
      the B.E.2C, and culminating in the production of the Handley Page V1500. Each type had its own unique production challenges 
      and operational requirements. The development of the Handley Page V1500 and the Rolls Royce Eagle aero-engine represents one 
      of the most ambitious projects undertaken by Beardmore during the war years.
    </p>
    <p>
      The Handley Page V1500 was deployed with the Independent Air Force in Afghanistan and in France at St Blin with the American 
      Army Air Service. This deployment illustrates the strategic importance of Beardmore's production capabilities and the global 
      reach of British aviation manufacturing during the Great War. For those interested in the broader context of Scottish aviation 
      during this period, <a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation Volume One: The Great War</a> provides comprehensive coverage 
      of aircraft production across the Clyde region.
    </p>

    <h2 id="aero-engines">Aero-Engine Development</h2>
    <p>
      Beardmore's contribution to aero-engine development was equally significant. The company investigated aero-engine development 
      by the Ministry of Munitions at Arrol Johnston and Siddeley Deasy. The aero-engine programmes with statistics, never before 
      published, reveal the complexity and scale of engine production during the war years.
    </p>
    <p>
      The Beardmore Halford Pullinger (B.H.P.) aero engine was built by Weir and substantial details are included in the book. 
      This engine played a crucial role in powering the DH9 programme, ending with the Siddeley Puma and Tiger engines. The development 
      of these engines represents a significant chapter in British aero-engine history, with Beardmore at the forefront of innovation 
      and production.
    </p>
    <p>
      There are further details of work on experimental diesel engines including the Beardmore Hurricane and Beardmore 12 cylinder 
      flat twelve. These experimental projects demonstrate Beardmore's commitment to innovation and their willingness to explore 
      alternative powerplant technologies. The Beardmore 120/160 h.p. engine and the aircraft it powered are also included, 
      including the deployment of the American F.E.2b and the Armstrong Whitworth "Big Ack."
    </p>

    <h2 id="airships">Airship Development and the R101 Disaster</h2>
    <p>
      Beardmore's entry into airship construction represented one of the most ambitious chapters in British aviation history. 
      The company's expertise in large-scale engineering and metalwork made it a natural choice for the Admiralty's airship programme. 
      The history of the airship and the four airships built at Inchinnan including R.34 and R.36 are comprehensively documented, 
      alongside the manufacture of kite balloons deployed on ships.
    </p>
    <p>
      The aero-engine section of the book sheds light on the Beardmore Tornado and its influence on the R101 airship disaster. 
      This connection reveals the technical challenges and engineering decisions that shaped one of Britain's most tragic aviation 
      accidents. The detailed analysis of the Tornado engine's role in the R101 project provides crucial insights into the technical 
      and operational factors that contributed to the disaster.
    </p>
    <p>
      Airship and aircraft production at Inchinnan represents a significant chapter in Beardmore's aviation history. The facilities 
      established there would play a crucial role in Britain's airship programme and demonstrate Beardmore's capability to undertake 
      large-scale aerospace projects. The company's involvement in airship construction positioned them at the forefront of lighter-than-air 
      technology during a period when airships were seen as the future of long-distance aviation.
    </p>

    <div class="my-8">
      <img src="/blog-images/beardmore-airship-r34-schematic.svg" alt="Original schematic illustration of a rigid airship silhouette above a hangar outline (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Original illustration (schematic): rigid airship silhouette and hangar outline, used here as contextual diagram.</p>
    </div>

    <h2 id="hms-argus">HMS Argus: The World's First True Aircraft Carrier</h2>
    <p>
      Perhaps Beardmore's most significant contribution to naval aviation was their role in the evolution of the aircraft carrier. 
      An in-depth history of H.M.S. Argus from 1918 to her scrapping in 1946 is comprehensively documented, including her service 
      at Chanak, Shanghai and Operations Torch and Harpoon. The first aircraft carrier landings by Bell-Davis from RAF Turnhouse 
      marked a revolutionary moment in naval aviation history.
    </p>
    <p>
      HMS Argus was the world's true aircraft carrier with a flat deck, this concept being planned by the Marquis of Montrose, 
      a Beardmore director. Built as the emigrant carrier SS Conte Rosso for the Italian Line Lloyd Sabuado at Dalmuir, Scotland, 
      in 1914, the vessel was ultimately bought by the Admiralty in 1916. She was launched in December 1917 as HMS Argus and 
      by 1918 was redesigned and sailed in September 1918 for Burntisland for trials with aircraft on the first carrier landings 
      and take-offs with Sopwith aircraft including Pups.
    </p>
    <p>
      For those seeking comprehensive coverage of HMS Argus's complete history, <a href="/books/aircraft-carrier-argus" class="underline font-medium">Aircraft Carrier - Beardmore's HMS Argus</a> 
      provides detailed accounts of her entire operational career, from her revolutionary design through her final service as a 
      training vessel. The book traces her history and wartime record in the Royal Navy to her demolition at Inverkeithing in 1947, 
      including details of her after action damage in Operation Torch.
    </p>
    <p>
      The vessel's service extended far beyond the First World War. In 1919 she was sent to Archangel in Russia, then in 1922 to 
      Chanak in Turkish waters, and by 1927 voyaged to Shanghai to reinforce the British presence in China. Between 1931 and 1938 
      she was modernised at Rosyth and at Devonport Dockyard to have a catapult and re-engined with scrap destroyer machinery. 
      With the outbreak of war in 1939, she was deployed to Toulon in France for deck landing training, and also deployed in the 
      Firth of Clyde for deck landing training. One of her instructors was the celebrated test-pilot Eric "Winkle" Brown, whose 
      story is told in <a href="/books/captain-eric-brown" class="underline font-medium">Captain Eric "Winkle" Brown: Test Pilot Biography</a>.
    </p>

    <h2 id="renfrew-airport">Renfrew Airport and the Flying School</h2>
    <p>
      The air school at Renfrew - the original Renfrew Airport - has a complete list of all aircraft deployed at the airfield, 
      documenting how the school was set up to its closure in 1928. The book mentions how the Auxiliary Air Force was set up, 
      and there is a complete list of school aircraft including the Avro 504, Bristol Fighter, Bristol 89 and Bristol 89a. 
      This included the Pollockshaws and Springburn Park air crashes, which are documented in detail.
    </p>
    <p>
      The early military history of Renfrew Airport in the First World War to the foundation of the Auxiliary Air Force in the 
      twenties represents a crucial chapter in Scottish aviation history. The flying school established there would train generations 
      of pilots and contribute significantly to Britain's aviation capability. The comprehensive documentation of aircraft types, 
      accidents, and operational procedures provides valuable insights into early aviation training methods.
    </p>
    <p>
      Renfrew Airport's development by the Ministry of Munitions represents one of the earliest examples of government investment 
      in aviation infrastructure. The facilities established there would serve multiple purposes: training, aircraft testing, and 
      operational deployment. The transition from wartime military use to peacetime civilian aviation training demonstrates the 
      evolution of aviation infrastructure in Scotland.
    </p>

    <h2 id="all-metal-aircraft">All-Metal Aircraft: The Rohrbach Connection</h2>
    <p>
      Beardmore's involvement with all-metal aircraft construction represents another significant chapter in their aviation history. 
      The history of the British Rohrbach Inverness and Inflexible all-metal aircraft demonstrates the company's commitment to 
      advanced construction techniques. The account of Adolf Rohrbach and Rohrbach Aircraft, possibly the only account of Adolf 
      Rohrbach's aircraft development in print, includes production figures and totals that illuminate this innovative period.
    </p>
    <p>
      Adolf Rohrbach's metal aircraft construction techniques had a profound influence on Beardmore's aviation work. The Rohrbach 
      Inverness and Inflexible represented cutting-edge technology in all-metal aircraft design, incorporating stressed-skin construction 
      techniques that would become standard in later aircraft. For detailed coverage of Rohrbach's work, see 
      <a href="/books/adolf-rohrbach" class="underline font-medium">Adolf Rohrbach's Metal Aeroplanes</a>, which provides comprehensive 
      documentation of this pioneering engineer's achievements.
    </p>
    <p>
      The Beardmore Inflexible, ending the company's aircraft production timeline, represents the pinnacle of Beardmore's aviation 
      achievements. This massive all-metal aircraft demonstrated the company's technical capabilities and their willingness to 
      undertake ambitious projects. The detailed documentation of this aircraft's design, construction, and testing provides 
      valuable insights into early all-metal aircraft development.
    </p>

    <div class="my-8">
      <img src="/blog-images/beardmore-inflexible-aircraft-schematic.svg" alt="Original schematic illustration of a large early all-metal aircraft outline with panel lines (diagrammatic)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Original illustration (schematic): large all-metal aircraft outline with simplified panel lines (diagrammatic).</p>
    </div>

    <h2 id="industrial-context">Industrial Context and Manufacturing Excellence</h2>
    <p>
      Beardmore's aviation achievements must be understood within the broader context of Scottish industrial capability. The book 
      covers the history of aircraft production in Glasgow and the West of Scotland, set up by the Weir brothers, and provides 
      an insight to the setting up of Renfrew Airport. This industrial context demonstrates how Scotland's shipbuilding expertise 
      translated directly into aviation manufacturing capability.
    </p>
    <p>
      The company's production figures, documented with unprecedented accuracy, reveal the scale of Beardmore's contribution to 
      British aviation. Engine and airframe totals and production figures for the First World War are rarely published, making 
      this documentation particularly valuable for historians and researchers. The comprehensive statistical records provide insights 
      into production rates, quality control, and manufacturing efficiency during a period of intense demand.
    </p>
    <p>
      Beardmore's manufacturing processes incorporated quality control systems, precision jigs, and systematic production methods 
      that ensured consistent output. The company's ability to rapidly scale production while maintaining quality standards 
      demonstrated their industrial sophistication. The detailed documentation of production processes, preserved in company archives, 
      provides valuable insights into early aviation manufacturing techniques.
    </p>

    <h2 id="armament-production">Armament Production and Technical Innovation</h2>
    <p>
      The appendix covers aircraft production in the UK during the First World War, armament production, and provides detailed 
      information on the Beardmore 2 Pounder, Axel Bramberg, Beardmore Farquhar machine gun, and Pullinger at Arrol-Johnston. 
      These technical details illustrate the breadth of Beardmore's manufacturing capabilities and their contribution to Britain's 
      war effort beyond aircraft production.
    </p>
    <p>
      The Beardmore Farquhar machine gun represents one of many technical innovations developed by the company. These contributions 
      to armament development demonstrate Beardmore's commitment to technical excellence and their ability to adapt existing 
      manufacturing capabilities to new requirements. The detailed documentation of these projects provides valuable insights into 
      the technical challenges of early aviation armament.
    </p>
    <p>
      Beardmore's work on experimental projects, including diesel engines and advanced armament systems, demonstrates their 
      commitment to innovation. These experimental projects, while not always leading to production aircraft or engines, contributed 
      valuable knowledge to British aviation development. The company's willingness to invest in research and development illustrates 
      their long-term vision for aviation technology.
    </p>

    <h2 id="legacy">Legacy and Historical Assessment</h2>
    <p>
      Beardmore Aviation, covering the period from 1913 to 1930, represents a remarkable chapter in Scottish industrial history. 
      The company's transition from shipbuilding to aviation manufacturing demonstrates the adaptability and technical capability 
      of Scottish industry during a period of rapid technological change. Their achievements in aircraft production, engine development, 
      airship construction, and aircraft carrier evolution left an indelible mark on British aviation history.
    </p>
    <p>
      The comprehensive documentation provided in Charles E. MacKay's <a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation</a> book, with 238 pages profusely 
      illustrated in 61,000 words, has proved an excellent reference work for students, historians and general readers alike. 
      The book has been printed multiple times since 2012 and is now in continuous print due to demand, demonstrating its value 
      as a historical resource. The information contained within is not available in any other publication, making it essential 
      reading for anyone interested in Scottish aviation history.
    </p>
    <p>
      Beardmore's aviation legacy extends beyond their direct manufacturing achievements. The company's development of manufacturing 
      processes, quality control systems, and production techniques influenced subsequent aviation manufacturing in Scotland and beyond. 
      The skills and knowledge developed during their aviation years contributed to Scotland's broader industrial capability and 
      positioned the region as a centre of aviation excellence.
    </p>

    <h2 id="academic-recognition">Academic Recognition and Research Value</h2>
    <p>
      The book has received five-star reviews and is based on extensive original research. It is not a compendium of Wikipedia articles 
      or a compilation of search answers from web sites - this is an original work based on primary archival sources. The research 
      methodology and source documentation make this an essential reference for academic researchers studying British aviation history, 
      Scottish industrial development, and First World War manufacturing.
    </p>
    <p>
      Each section is supported by tables of statistics and the book has a comprehensive bibliography and appendix. These scholarly 
      features ensure that the work meets academic standards while remaining accessible to general readers. The rigorous documentation 
      of sources and comprehensive statistical analysis provide a solid foundation for further research and academic study.
    </p>
    <p>
      The book's value to researchers extends beyond aviation history. It provides insights into industrial organization, manufacturing 
      processes, labour relations, and technological innovation during a crucial period in British history. The detailed documentation 
      of production figures, contract numbers, and operational histories creates a comprehensive resource for understanding early 
      twentieth-century industrial development.
    </p>

    <h2 id="conclusion">Conclusion: A Scottish Industrial Giant's Aviation Legacy</h2>
    <p>
      William Beardmore & Company's aviation activities from 1913 to 1930 represent one of Scotland's most significant contributions 
      to British aviation history. From their early plans to produce German aircraft before the First World War, through their 
      extensive wartime production programmes, to their pioneering work on airships and aircraft carriers, Beardmore demonstrated 
      exceptional technical capability and industrial excellence.
    </p>
    <p>
      The company's achievements in aircraft production, engine development, airship construction, and naval aviation innovation 
      left a lasting legacy that continues to influence aviation manufacturing and research. The comprehensive documentation provided 
      in Charles E. MacKay's authoritative work ensures that this remarkable story is preserved for future generations of historians, 
      researchers, and aviation enthusiasts.
    </p>
    <p>
      Beardmore's aviation legacy demonstrates how Scottish industrial expertise successfully transitioned from traditional shipbuilding 
      to cutting-edge aviation technology. Their achievements illustrate the adaptability, technical capability, and vision that 
      characterized Scottish industry during the early decades of powered flight. The detailed records of their production, 
      preserved in archives and documented in this comprehensive study, provide invaluable insights into one of Britain's most 
      important aviation manufacturing enterprises.
    </p>

    <h2 id="further-reading">Further Reading and Related Works</h2>
    <p>To go deeper, start with the Beardmore book and then use the related titles below for wider Scottish and Great War context.</p>
    <ul>
      <li><a href="/books/beardmore-aviation" class="underline font-medium">Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</a> — The definitive 238-page work with 61,000 words, profusely illustrated with many original images and accurate production figures from Beardmore archive records</li>
      <li><a href="/books/clydeside-aviation-vol1" class="underline font-medium">Clydeside Aviation Volume One: The Great War</a> — Comprehensive coverage of aircraft production across the Clyde region, including Beardmore's role in the broader Scottish aviation industry</li>
      <li><a href="/books/clydeside-aviation-vol2" class="underline font-medium">Clydeside Aviation Volume Two: Between the Wars</a> — Aviation events in the Clydeside district from 1919 to 1939, including Beardmore's post-war activities</li>
      <li><a href="/books/british-aircraft-great-war" class="underline font-medium">British Aircraft of the Great War</a> — Detailed information on aircraft ordering procedures and squadron formation, including Beardmore-built aircraft</li>
      <li><a href="/books/aircraft-carrier-argus" class="underline font-medium">Aircraft Carrier - Beardmore's HMS Argus</a> — Complete history of the world's first true aircraft carrier, from conception to scrapping</li>
      <li><a href="/books/captain-eric-brown" class="underline font-medium">Captain Eric "Winkle" Brown: Test Pilot Biography</a> — Includes details of Brown's service as an instructor on HMS Argus, built by Beardmore</li>
    </ul>

    <h3>Related Articles</h3>
    <ul>
      <li><a href="/blog/clydeside-aviation-revolution" class="underline">Clydeside Aviation Revolution</a> — How Glasgow's shipyards transformed into aviation powerhouses</li>
      <li><a href="/blog/british-aircraft-great-war-rfc-rnas" class="underline">British Aircraft Great War: RFC & RNAS Development</a> — The broader context of British aviation during the First World War</li>
      <li><a href="/blog/hms-argus-first-aircraft-carrier" class="underline">HMS Argus: The World's First Aircraft Carrier</a> — Detailed coverage of Beardmore's revolutionary naval aviation contribution</li>
    </ul>
  `,
  excerpt: 'A source-based account of Beardmore\'s move from heavy industry into aircraft, engine, airship, and carrier-era aviation work.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: SITE_CONSTANTS.AUTHOR_EMAIL
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 15,
  featuredImage: {
    url: '/blog-images/beardmore-parkhead-forge.jpg',
    alt: 'William Beardmore & Company: Scottish Aviation Pioneer',
    caption: 'William Beardmore & Company: Scottish Aviation Pioneer - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ['Beardmore', 'Scottish Aviation', 'Industrial History', 'Manufacturing', 'WWI'],
  relatedBooks: getBooksData(['beardmore-aviation', 'aircraft-carrier-argus', 'clydeside-aviation-vol1']),
  relatedPosts: []
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/beardmore-aviation-scottish-industrial-giant"
        pageImageUrl={post.featuredImage.url}
      />
      
      {/* Enhanced SEO with FAQ, Article schema, and AI optimization */}
      <EnhancedBlogSEO 
        post={post}
        relatedBooks={post.relatedBooks.map(book => ({
          id: book.id,
          title: book.title,
          isbn: (book as any).isbn || '',
          price: book.price
        }))}
        relatedPosts={post.relatedPosts || []}
      />
      
      <ComprehensiveBlogTemplate post={post} />
    </>
  )
}