import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import BookCard from '@/components/BookCard'
import { books } from '@/data/books'
import BBCPageTemplate from '@/components/BBCPageTemplate'

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
  const categoryName = categoryMappings[category]
  
  if (!categoryName) {
    return {
      title: 'Category Not Found | Charles E. MacKay Aviation Books',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${categoryName} Books | Charles E. MacKay Aviation Books`,
    description: `Browse ${categoryName.toLowerCase()} books by aviation historian Charles E. MacKay. Comprehensive collection of specialized aviation history publications.`,
    keywords: [
      `${categoryName.toLowerCase()} books`,
      'Charles E MacKay',
      'aviation history',
      'aviation books for sale',
      categoryName.toLowerCase(),
      'aviation historian'
    ],
    alternates: {
      canonical: `https://charlesmackaybooks.com/category/${category}`
    },
    openGraph: {
      title: `${categoryName} Books | Charles E. MacKay`,
      description: `Browse ${categoryName.toLowerCase()} books by aviation historian Charles E. MacKay.`,
      type: 'website',
      url: `https://charlesmackaybooks.com/category/${category}`
    }
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

  return (
    <BBCPageTemplate
      title={`${categoryName} Books`}
      subtitle={`Discover ${categoryBooks.length} authoritative ${categoryName.toLowerCase()} books by Charles E. MacKay`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Books', href: '/books' }, { label: categoryName }]}
    >
      {/* Books Grid */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          {categoryBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryBooks.map((book) => (
                <BookCard key={book.id} book={book} sourceContext={`category-${category}`} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-primary mb-4">No Books Found</h2>
              <p className="text-secondary mb-8">
                No books are currently available in the {categoryName} category.
              </p>
              <Link
                href="/books"
                className="inline-block badge badge-blue px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse All Books
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(categoryMappings)
              .filter(([slug]) => slug !== category)
              .slice(0, 8)
              .map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-sm">{name}</h3>
                  <p className="text-xs text-muted mt-1">
                    {books.filter(book => book.category === name).length} books
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </BBCPageTemplate>
  )
}