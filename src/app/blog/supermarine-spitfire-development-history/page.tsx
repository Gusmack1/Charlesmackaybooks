import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import UnifiedSchema from '@/components/UnifiedSchema'
import EnhancedBlogSEO from '@/components/EnhancedBlogSEO'
import { getBooksData } from '@/utils/bookUtils'

const post = {
  id: 'supermarine-spitfire-development-history',
  title: 'Supermarine Spitfire Development History',
  subtitle:
    'A structured, site-based overview of the Spitfire’s development pathway, with curated links to related articles and resources on Charlesmackaybooks.com.',
  content: `
    <h2 id="overview">Overview</h2>
    <p>
      This article is intentionally framed as a site-based overview: it summarises the major topics covered across related pages on this website and links you directly to the deeper treatments.
      Where images are used in this post, captions and alt text are kept deliberately conservative to avoid implying details beyond what is shown on the page.
    </p>

    <div class="my-8">
      <img src="/blog-images/spitfire-k5054-prototype.jpg" alt="Spitfire aircraft (photograph)." class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Spitfire development: a reference image used for context (photograph).</p>
    </div>

    <h2 id="what-this-page-covers">What this page covers</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Development & evolution</strong>: a consolidated technical overview of design growth and operational refinements.</li>
      <li><strong>Comparisons</strong>: links to companion pages that discuss contemporary British aircraft development and operational context.</li>
      <li><strong>Pre‑war high‑speed discipline</strong>: links to material on racing-era engineering culture and systems thinking.</li>
    </ul>

    <h2 id="recommended-reading-on-this-site">Recommended reading on this site</h2>
    <ul>
      <li><a class="underline" href="/blog/supermarine-spitfire-development-evolution">Supermarine Spitfire Development: Evolution of a Legend</a> — the main deep-dive post currently available on this site.</li>
      <li><a class="underline" href="/blog/hawker-hurricane-fighter-development">Hawker Hurricane: The Forgotten Hero of the Battle of Britain</a> — a complementary comparison page with its own development narrative.</li>
      <li><a class="underline" href="/blog/schneider-trophy-racing-development">Schneider Trophy Racing: The Golden Age of Aviation Speed</a> — background on engineering discipline and systems constraints in high-speed programmes.</li>
    </ul>

    <h2 id="image-notes">Image notes</h2>
    <p>
      Some Spitfire-related image filenames and older metadata across the site previously referenced assets that were not present in <code>/public/blog-images</code>.
      This page uses only verified, local assets that exist in the repository.
    </p>
  `,
  excerpt:
    'A structured, site-based overview of the Spitfire’s development pathway, linking to the deeper Spitfire evolution article and related context posts.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com',
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 8,
  featuredImage: {
    url: '/blog-images/spitfire-k5054-prototype.jpg',
    alt: 'Supermarine Spitfire Development History',
    caption: 'Spitfire development history: overview and curated links (context image).',
  },
  category: 'WWII Aviation',
  tags: ['spitfire', 'development', 'wwii', 'aviation history'],
  // Keep relatedBooks empty unless there is a canonical matching book entry in src/data/books.ts
  relatedBooks: getBooksData([]),
  relatedPosts: [
    {
      id: 'supermarine-spitfire-development-evolution',
      title: 'Supermarine Spitfire Development: Evolution of a Legend',
      excerpt: 'A technical overview of the Spitfire’s development and mark-by-mark evolution.',
      image: '/blog-images/spitfire-prototype-k5054-historical.jpg',
      readingTime: 12,
    },
    {
      id: 'hawker-hurricane-fighter-development',
      title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
      excerpt: 'A complementary development narrative for the Hurricane.',
      image: '/blog-images/hawker-hurricane-battle-of-britain.jpg',
      readingTime: 13,
    },
    {
      id: 'schneider-trophy-racing-development',
      title: 'Schneider Trophy Racing: The Golden Age of Aviation Speed',
      excerpt: 'Engineering discipline and systems constraints in high-speed programmes.',
      image: '/blog-images/schneider-s6b-systems-featured-schematic.svg',
      readingTime: 12,
    },
  ],
}

export const metadata: Metadata = {
  title: 'Supermarine Spitfire Development History | Charles E. MacKay',
  description:
    'A structured, site-based overview of Spitfire development with curated links to related aviation history articles on charlesmackaybooks.com.',
  keywords:
    'supermarine spitfire development history, spitfire development, aviation history, Charles E. MacKay, charles mackay books',
  openGraph: {
    title: 'Supermarine Spitfire Development History',
    description:
      'A structured, site-based overview of Spitfire development with curated links to deeper articles on charlesmackaybooks.com.',
    images: ['/blog-images/spitfire-k5054-prototype.jpg'],
    type: 'article',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/blog/supermarine-spitfire-development-history',
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
  },
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/supermarine-spitfire-development-history"
        pageImageUrl={post.featuredImage.url}
      />

      <EnhancedBlogSEO post={post} relatedBooks={[]} relatedPosts={[]} />

      <ComprehensiveBlogTemplate post={post} />
    </>
  )
}

