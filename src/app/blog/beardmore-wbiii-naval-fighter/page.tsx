import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'

const post = {
  id: 'beardmore-wbiii-naval-fighter',
  title: 'Beardmore W.B.III and Clyde-Built Naval Fighters',
  subtitle: 'From shipyard ingenuity to deck-landing realities: Scotland’s naval fighter contribution in WWI.',
  content: `
    <h2 id="context">Context and Origins</h2>
    <p>
      William Beardmore & Co., a Scottish industrial giant, diversified into aviation with a focus on naval requirements. The Beardmore W.B.III grew from British attempts to adapt fighter concepts to shipboard use, blending structural robustness with the constraints of early carrier operations. Its development sits within Clyde engineering culture—shipyards, steel, and precision manufacturing—that supplied parts, skills, and discipline to aviation.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Beardmore W.B.III assembly context at Clyde shipyards" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Clyde-built: from shipyard to flight deck—Scotland’s naval aviation contribution.</p>
    </div>

    <h2 id="engineering">Engineering Features</h2>
    <p>
      Naval fighters demanded arresting robustness, corrosion resistance, and compact footprints. Folding wings, reinforced undercarriages, and fittings for deck-handling distinguished the type from land-based peers. Structure prioritised ease of maintenance at sea and controlled weight growth; reliability often trumped ultimate performance as the design criterion.
    </p>

    <h2 id="operations">Operations and Deck-Landing Practice</h2>
    <p>
      Early deck procedures evolved rapidly—barriers, wires, and signalling refined landing risks. The W.B.III stands as a developmental step: operational lessons fed back into succeeding types, while pilots developed airmanship tailored to short, moving decks and turbulent air behind the ship’s island and rigging.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="HMS Argus deck operations" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">HMS Argus: the moving laboratory for Britain’s deck-landing doctrine.</p>
    </div>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Folding wing mechanisms and naval handling gear" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Folding and fittings: compact footprints and handling gear defined naval fighter design.</p>
    </div>

    <h2 id="industrial">Industrial Ecosystem and the Clyde</h2>
    <p>
      The Clyde’s steel, machine, and shipbuilding capacity enabled short supply lines for fixtures, forgings, and repair. Collaboration between yards and airframes accelerated iteration, with naval requirements shaping design priorities distinct from land-based fighters.
    </p>

    <h2 id="legacy">Legacy</h2>
    <p>
      The W.B.III’s significance is cumulative: it contributed to the carrier-fighter lineage by hardening structures, practices, and culture. Later naval aircraft absorbed its lessons, while Clyde’s industrial breadth sustained aviation projects beyond the war.
    </p>

    <h2 id="sources">Sources</h2>
    <ul>
      <li>National Archives and Royal Navy documents on early deck-landing procedures and barrier development.</li>
      <li>Scottish industrial histories on Beardmore & Co. and Clyde shipbuilding.</li>
      <li>Imperial War Museum and RAF Museum collections related to HMS Argus era operations.</li>
      <li>Contemporary engineering journals documenting folding mechanisms and naval fittings.</li>
    </ul>

    <h2 id="related">Further Reading & Related</h2>
    <ul>
      <li><a class="underline" href="/blog/hms-argus-first-aircraft-carrier">HMS Argus: The First True Aircraft Carrier</a></li>
      <li><a class="underline" href="/blog/clydeside-aviation-revolution">Clydeside Aviation Revolution</a></li>
    </ul>
  `,
  excerpt: 'Beardmore W.B.III in the lineage of British naval fighters: Clyde-built engineering meeting deck-landing innovation.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Scottish aviation historian with a focus on Clydeside industry and naval aviation.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: new Date().toISOString(),
  readingTime: 24,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'Beardmore naval fighter context',
    caption: 'Carrier operations defined the problem set and the solution space.'
  },
  category: 'Naval Aviation',
  tags: [
    'Beardmore', 'W.B.III', 'Naval fighter', 'HMS Argus', 'Clydeside', 'charles mackay books'
  ],
  relatedBooks: getBooksData(['beardmore-aviation', 'aircraft-carrier-argus', 'clydeside-aviation-vol1']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Beardmore W.B.III Naval Fighter | Charles E. MacKay',
  description: 'Engineering and operational history of the Beardmore W.B.III and early British naval fighter development on the Clyde.',
  keywords: 'Beardmore W.B.III, Clyde-built naval fighter, HMS Argus carrier, WWI deck-landing, Clydeside aviation, William Beardmore, Charles E. MacKay, charles mackay books',
  openGraph: {
    title: 'Beardmore W.B.III and Clyde-Built Naval Fighters',
    description: 'From shipyard ingenuity to deck-landing realities in WWI.',
    images: ['/blog-images/default-generic.svg'],
    type: 'article'
  }
}

export default function BlogPost() {
  return <ComprehensiveBlogTemplate post={post} />
}


