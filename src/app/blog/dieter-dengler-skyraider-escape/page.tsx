import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'

const post = {
  id: 'dieter-dengler-skyraider-escape',
  title: 'Dieter Dengler and the Skyraider: Shoot‑down, Captivity, Escape',
  subtitle: 'A concise operational context for A‑1 Skyraider missions, the Laos shoot‑down, captivity, and the first successful escape from a Laotian prison camp.',
  content: `
    <h2 id="aircraft">The A‑1 Skyraider and Its Missions</h2>
    <p>
      The A‑1 Skyraider blended ruggedness, loiter, and payload—attributes suited to search‑and‑rescue cover and close air support in Southeast Asia. Carrier operations placed crews in complex coordination cycles with strike packages, tankers, and SAR assets.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="A‑1 Skyraider representative image and carrier ops context" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Skyraider: endurance and payload in an age of jets.</p>
    </div>

    <h2 id="incident">Shoot‑down over Laos</h2>
    <p>
      On a mission from USS <em>Ranger</em>, Dengler was shot down over Laos. Surviving ejection and evasion, he was captured and held in brutal conditions.
    </p>

    <h2 id="captivity">Captivity and Escape</h2>
    <p>
      Captivity narratives describe starvation diets, disease, and forced marches. Dengler’s escape—coordinated with fellow prisoners—required navigation through dense terrain, evasion under pursuit, and survival skills until rescue.
    </p>

    <h2 id="legacy">Legacy and Memory</h2>
    <p>
      The episode exemplifies personal resilience and the broader operational environment of carrier aviation in Southeast Asia. The Skyraider’s role in SAR protection remains part of its enduring reputation.
    </p>

    <h2 id="sources">Sources</h2>
    <ul>
      <li>Carrier air wing histories and SAR doctrine notes.</li>
      <li>Memoirs and interviews relating to the Dengler episode.</li>
      <li>Operational summaries for A‑1 missions in the theatre.</li>
    </ul>
  `,
  excerpt: 'Skyraider endurance, a Laos shoot‑down, captivity, and a daring escape—set in the context of carrier aviation operations.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian writing concise operational histories.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: new Date().toISOString(),
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'A‑1 Skyraider operations',
    caption: 'Endurance aircraft in a jet age.'
  },
  category: 'Aviation Biography',
  tags: ['Dieter Dengler', 'A‑1 Skyraider', 'Carrier Aviation', 'Vietnam War', 'charles mackay books'],
  relatedBooks: getBooksData(['dieter-dengler']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Dieter Dengler & the Skyraider | Charles E. MacKay',
  description: 'Shoot‑down, captivity, and escape—an operational context for the A‑1 and Dengler’s story.',
  keywords: 'Dieter Dengler, Skyraider, Vietnam War, carrier aviation, SAR, charles mackay books',
  openGraph: {
    title: 'Dieter Dengler: Shoot‑down, Captivity, Escape',
    description: 'Skyraider endurance and a daring escape in Southeast Asia.',
    images: ['/blog-images/default-generic.svg'],
    type: 'article'
  }
}

export default function BlogPost() {
  return <ComprehensiveBlogTemplate post={post} />
}


