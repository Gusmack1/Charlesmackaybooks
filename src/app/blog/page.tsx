import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { blogCategories } from '@/data/blogCategories'

const BLOG_CATEGORY_TO_BOOKS_SLUG: Record<string, string> = {
  'Scottish Aviation History': 'scottish-aviation-history',
  'WWI Aviation': 'wwi-aviation',
  'WWII Aviation': 'wwii-aviation',
  'Cold War Aviation': 'jet-age-aviation',
  'Jet Age Aviation': 'jet-age-aviation',
  'Aviation Racing': 'aviation-history',
  'Aviation Biography': 'aviation-biography',
  'Helicopter History': 'helicopter-history',
  'Naval Aviation': 'naval-aviation',
  'Industrial History': 'industrial-history',
  'Travel Literature': 'travel-literature',
  'Military History': 'military-history',
}

export const metadata: Metadata = {
  title: 'Aviation History Blog: Scottish Aviation, WWI/WWII and Helicopters',
  description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage by Charles E. MacKay.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/blog'
  },
  keywords: [
    'aviation history blog',
    'Charles MacKay aviation',
    'Scottish aviation history',
    'WWI aircraft blog',
    'WWII aviation blog',
    'helicopter development',
    'jet age aviation',
    'military aviation heritage',
    'aviation historian blog',
    'aircraft development history'
  ],
  openGraph: {
    title: 'Aviation History Blog | Expert Insights by Charles E. MacKay',
    description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage.',
    url: 'https://charlesmackaybooks.com/blog',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/beardmore-clyde-shipyard.jpg',
        width: 1200,
        height: 630,
        alt: 'Aviation history blog by Charles E. MacKay'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviation History Blog | Expert Insights by Charles E. MacKay',
    description: 'Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage.',
    images: ['/blog-images/beardmore-clyde-shipyard.jpg'],
  }
}



export default function BlogPage() {
  return (
    <BBCPageTemplate
      title="Aviation History Blog"
      subtitle="Expert insights into Scottish aviation history, WWI & WWII aircraft, helicopter development, jet age aviation, and military aviation heritage."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
    >
      <div className="max-w-6xl mx-auto px-6 py-2 bg-slate-900">
        <div className="mb-10 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-white/90 text-sm sm:text-base">
            Research-led articles by Charles E. MacKay. Each post links to related books you can buy.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Browse all books →
          </Link>
        </div>

        {/* Blog Categories */}
        {Object.entries(blogCategories).map(([category, posts]) => {
          const categorySlug = BLOG_CATEGORY_TO_BOOKS_SLUG[category]
          return (
          <section key={category} className="mb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              {categorySlug && (
                <Link
                  href={`/category/${categorySlug}`}
                  className="text-sm font-medium text-blue-300 hover:text-white underline transition-colors"
                >
                  Browse {category} books →
                </Link>
              )}
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-slate-800 border border-white/15 rounded-lg overflow-hidden hover:border-white/30 hover:shadow-md transition-all duration-200">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      

                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-white/90 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>

                      

                      <div className="text-blue-300 font-medium text-sm">
                        Read Article →
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
          )
        })}

        
      </div>
    </BBCPageTemplate>
  )
}

