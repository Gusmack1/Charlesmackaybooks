import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'

const post = {
  id: 'scottish-aviation-between-the-wars',
  title: 'Scottish Aviation Between the Wars: Clubs, Carriers, and Civil Routes',
  subtitle: 'Renfrew timetables, the Scottish Flying Club, Beardmore/Weir engineering, and the road to rearmament.',
  content: `
    <h2 id="routes">Routes and Aerodromes</h2>
    <p>
      Between 1918 and 1939, Scotland built a civilian air network from Renfrew outward. Timetables reveal early commercial viability and seasonal shifts; accident reports show the safety culture maturing as weather and terrain lessons were absorbed into procedures.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Inter‑war Scotland aerodromes and routes—representative" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Inter‑war connectivity: routes, weather, and infrastructure shaped the Scottish map of flight.</p>
    </div>

    <h2 id="clubs">The Scottish Flying Club</h2>
    <p>
      Club logs and newsletters chronicle training, proficiency, and outreach. Private flying seeded pilot pipelines, technical maintenance skills, and a social identity that later meshed with rearmament.
    </p>

    <h2 id="industry">Industry: Beardmore and Weir</h2>
    <p>
      Beardmore’s aircraft and engines, Weir’s rotary‑wing experiments, and supplier networks kept skilled labour and tooling in circulation. Factory papers link civil orders to retained capacity—critical when rearmament demanded rapid scale‑up.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Workshops, tooling, and retained skills between wars—representative" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Workshops and skills persisted between orders—insurance against the shocks of rearmament.</p>
    </div>

    <h2 id="prewar">Toward Rearmament</h2>
    <p>
      By the mid‑1930s, Scottish units and firms reconnected civilian experience with defence imperatives. 602 (City of Glasgow) Squadron’s evolution foreshadowed fighter modernisation, while civil infrastructure offered training airfields and logistics nodes.
    </p>

    <h2 id="sources">Sources</h2>
    <ul>
      <li>Airline timetables and aerodrome reports (inter‑war).</li>
      <li>Scottish Flying Club logs and newsletters.</li>
      <li>Beardmore and Weir engineering papers; local archives.</li>
    </ul>
  `,
  excerpt: 'A civil‑to‑military bridge: routes, clubs, and industry that sustained Scottish aviation between the wars.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian of Scottish industrial and flight heritage.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: new Date().toISOString(),
  readingTime: 15,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'Scottish inter‑war aviation',
    caption: 'Clubs, routes, and retained industry capacity.'
  },
  category: 'Scottish Aviation History',
  tags: ['Scottish Aviation', 'Inter‑war', 'Beardmore', 'Weir', 'Renfrew', 'charles mackay books'],
  relatedBooks: getBooksData(['clydeside-aviation-vol2', 'beardmore-aviation', 'clydeside-aviation-vol1']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Scottish Aviation Between the Wars | Charles E. MacKay',
  description: 'Routes, clubs, and industry across inter‑war Scotland with Beardmore and Weir at the core.',
  keywords: 'Scottish aviation, inter‑war, Renfrew airport, Scottish Flying Club, Beardmore, Weir, charles mackay books',
  openGraph: {
    title: 'Scottish Aviation Between the Wars',
    description: 'Civil infrastructure, clubs, and industry that bridged to rearmament.',
    images: ['/blog-images/default-generic.svg'],
    type: 'article'
  }
}

export default function BlogPost() {
  return <ComprehensiveBlogTemplate post={post} />
}


