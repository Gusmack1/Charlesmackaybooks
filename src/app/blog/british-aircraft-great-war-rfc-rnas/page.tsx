import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import BlogAuthorityEnhancer from '@/components/BlogAuthorityEnhancer'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'

const post = {
  id: 'british-aircraft-great-war-rfc-rnas',
  title: 'British Aircraft Great War: RFC & RNAS Development',
  subtitle: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters like the Sopwith Camel, Bristol Fighter, and S.E.5a that established Allied air superiority.',
  content: `
    <h2 id="introduction">Introduction: The Birth of British Air Power</h2>
    <p>Between 1914 and 1918 British aviation matured from reconnaissance to decisive air power. The Royal Flying Corps (RFC) and Royal Naval Air Service (RNAS) pursued parallel paths — tactical support over the Western Front and maritime/expeditionary roles — before unifying as the Royal Air Force in April 1918. Their combined output in doctrine, design, and training shaped 20th‑century air warfare.</p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="RFC and RNAS personnel (placeholder)" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">RFC and RNAS built complementary capabilities that fused into the RAF in 1918.</p>
    </div>

    <h2 id="rfc-vs-rnas">RFC and RNAS: Roles and Capabilities</h2>
    <p>The RFC focused on army cooperation — artillery spotting, photo reconnaissance, and air superiority over the battlefield. The RNAS added coastal patrol, anti‑submarine warfare, and naval strike, advancing carrier aviation from tenders and early flight decks. This division of labour accelerated learning in distinct mission sets while spurring industrial output across Britain.</p>

    <h2 id="industry">Industry and Mobilisation</h2>
    <p>Firms such as Sopwith, Bristol, Avro, Vickers, and the Royal Aircraft Factory transitioned from small‑series craft to volume production under strict inspection regimes. Tooling, jigging, and supply chains matured quickly; interchangeable parts and repair manuals supported forward maintenance. Powerplant development — Clerget, Bentley rotary, and Rolls‑Royce inline engines — kept pace with airframe demand.</p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Great War aircraft production (placeholder)" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Volume manufacture under wartime inspection created reliable fleets at the front.</p>
    </div>

    <h2 id="types">Representative Types</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Sopwith Camel</strong>: agile but demanding; dominant in experienced hands; heavy armament and compact rotary installation.</li>
      <li><strong>Royal Aircraft Factory S.E.5a</strong>: stable gun platform with excellent visibility; strong performance at altitude.</li>
      <li><strong>Bristol Fighter F.2B</strong>: two‑seat fighter that, properly employed, out‑fought single‑seaters while providing reconnaissance.</li>
      <li><strong>RNAS Pioneers</strong>: seaplanes, ship‑borne scouts, and early deck operations that foreshadowed carrier aviation.</li>
    </ul>

    <h2 id="tactics">Tactics and Training</h2>
    <p>Air combat evolved rapidly from individual duels to formations with defined roles. Photography and artillery cooperation demanded navigation, communication, and disciplined flying. Training pipelines professionalised: gunnery, formation tactics, and engine management reduced attrition and increased sortie effectiveness.</p>

    <h2 id="legacy">Legacy</h2>
    <p>By 1918 Britain fielded an independent air service with a trained cadre, a doctrine of combined arms, and an industrial base capable of rapid adaptation. The technical and organisational lessons from the Great War underpinned inter‑war development and the RAF’s early‑WWII readiness.</p>

    <h2 id="reading">Further Reading and Related Works</h2>
    <ul>
      <li><a href="/books/british-aircraft-great-war" class="underline">British Aircraft of the Great War</a> — detailed type histories and factory data.</li>
      <li><a href="/blog/bristol-fighter-f2b-brisfit" class="underline">Bristol Fighter F.2B</a> — the two‑seat fighter that redefined roles.</li>
      <li><a href="/blog/sopwith-camel-wwi-fighter" class="underline">Sopwith Camel</a> — strengths, pitfalls, and tactics.</li>
    </ul>
  `,
  excerpt: 'From the Royal Flying Corps to RAF formation, pioneering aerial warfare with legendary fighters like the Sopwith Camel, Bristol Fighter, and S.E.5a that established Allied air superiority.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'British Aircraft Great War: RFC & RNAS Development',
    caption: 'British Aircraft Great War: RFC & RNAS Development - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ["british","aircraft","great","war","rfc","rnas"],
  relatedBooks: getBooksData(['british-aircraft-great-war', 'clydeside-aviation-vol1', 'german-aircraft-great-war']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: `British Aircraft Great War Rfc Rnas | Charles E. MacKay`,
  description: `Comprehensive analysis of british aircraft great war rfc rnas with expert historical research and technical details.`,
  keywords: 'british, aircraft, great, war, rfc, rnas, aviation history',
  openGraph: {
    title: `British Aircraft Great War Rfc Rnas`,
    description: `Comprehensive analysis of british aircraft great war rfc rnas with expert historical research and technical details.`,
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
        pageUrl="/blog/british-aircraft-great-war-rfc-rnas"
      />
      <ComprehensiveBlogTemplate post={post} />
        <BlogAuthorityEnhancer 
          postTitle={post.title}
          postCategory="Aviation History"
          researchDate="2025"
        />
    </>
  )
}