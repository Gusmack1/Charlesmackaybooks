import Link from 'next/link'
import { notFound } from 'next/navigation'
import { books } from '@/data/books'
import { categoryDescriptions } from '@/data/category-descriptions'
import { blogCategories } from '@/data/blogCategories'
import BookCard from '@/components/BookCard'
import UnifiedSchema from '@/components/UnifiedSchema'
import type { Metadata } from 'next'

const CATEGORY_TO_BLOG_CATEGORY: Record<string, string> = {
  'scottish-aviation-history': 'Scottish Aviation History',
  'wwi-aviation': 'WWI Aviation',
  'wwii-aviation': 'WWII Aviation',
  'jet-age-aviation': 'Jet Age Aviation',
  'aviation-biography': 'Aviation Biography',
  'helicopter-history': 'Helicopter History',
  'naval-aviation': 'Naval Aviation',
  'industrial-history': 'Industrial History',
  'travel-literature': 'Travel Literature',
  'military-history': 'Military History',
  'aviation-history': 'Aviation History',
}

// Valid category mappings
const categoryMappings: Record<string, string> = {
  'aviation-biography': 'Aviation Biography',
  'aviation-history': 'Aviation History',
  'helicopter-history': 'Helicopter History',
  'industrial-history': 'Industrial History',
  'jet-age-aviation': 'Jet Age Aviation',
  'military-history': 'Military History',
  'naval-aviation': 'Naval Aviation',
  'scottish-aviation-history': 'Scottish Aviation History',
  'travel-literature': 'Travel Literature',
  'wwi-aviation': 'WWI Aviation',
  'wwii-aviation': 'WWII Aviation'
}

export async function generateStaticParams() {
  return Object.keys(categoryMappings).map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const categoryName = categoryMappings[category] || category
  const categoryDesc = categoryDescriptions[category]

  const baseDescription = categoryDesc?.description
    ? categoryDesc.description.trim()
    : `Browse ${categoryName} books by Charles E. MacKay with free worldwide shipping and secure guest checkout.`
  const description = `${baseDescription.replace(/\.*\s*$/, '')}. Buy direct with free worldwide shipping.`

  return {
    title: `${categoryName} Books & Research`,
    description,
    ...(categoryDesc?.keywords?.length ? { keywords: categoryDesc.keywords } : {}),
    alternates: {
      canonical: `https://charlesmackaybooks.com/category/${category}`
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryName = categoryMappings[category]

  if (!categoryName) {
    notFound()
  }

  const categoryBooks = books.filter(book =>
    book.category === categoryName ||
    book.category.toLowerCase().replace(/\s+/g, '-') === category
  )

  const categoryDesc = categoryDescriptions[category]

  if (!categoryDesc) {
    notFound()
  }

  const longDescriptionParagraphs = categoryDesc.longDescription
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-slate-900">
      <UnifiedSchema
        pageType="category"
        pageTitle={`${categoryName} Books & Research`}
        pageDescription={categoryDesc.description}
        pageUrl={`/category/${category}`}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{categoryName} Books</h1>
          <p className="text-white/90 mb-4">
            Found {categoryBooks.length} books in this category
          </p>
          {categoryDesc && (
            <p className="text-white/80 max-w-3xl mx-auto">
              {categoryDesc.description}
            </p>
          )}
        </div>

        {longDescriptionParagraphs.length > 0 && (
          <section className="max-w-4xl mx-auto mb-10">
            <div className="prose prose-invert max-w-none">
              {longDescriptionParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/books" className="underline text-blue-300 hover:text-blue-200">
                Browse all books
              </Link>
              <Link href="/blog" className="underline text-blue-300 hover:text-blue-200">
                Aviation history blog
              </Link>
              <Link href="/academic-resources" className="underline text-blue-300 hover:text-blue-200">
                Research resources
              </Link>
            </div>
          </section>
        )}

        {(() => {
          const blogCategoryNames = CATEGORY_TO_BLOG_CATEGORY[category]
            ? [CATEGORY_TO_BLOG_CATEGORY[category]]
            : []
          if (category === 'jet-age-aviation') {
            blogCategoryNames.push('Cold War Aviation')
          }
          const relatedBlogPosts = blogCategoryNames
            .flatMap((name) => blogCategories[name] || [])
            .slice(0, 5)
          return (
          <>
        {relatedBlogPosts.length > 0 && (
          <section className="mb-10 p-4 rounded-lg border border-blue-700/50 bg-slate-800/50">
            <h2 className="text-lg font-semibold text-white mb-3">Related blog articles</h2>
            <ul className="space-y-2">
              {relatedBlogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-blue-300 hover:text-white underline transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="inline-block mt-3 text-sm text-blue-300 hover:text-white underline">
              More articles →
            </Link>
          </section>
        )}
        {categoryBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryBooks.map((book) => (
              <BookCard key={book.id} book={book} sourceContext={`category-${category}`} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/70">
            <p>No books found in this category yet.</p>
            <p className="mt-2">Check back soon for new releases!</p>
          </div>
        )}
          </>
          )
        })()}
      </div>
    </div>
  )
}