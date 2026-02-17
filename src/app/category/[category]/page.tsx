import { notFound } from 'next/navigation'
import { books } from '@/data/books'
import { categoryDescriptions } from '@/data/category-descriptions'
import BookCard from '@/components/BookCard'
import type { Metadata } from 'next'

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
  
  return {
    title: `${categoryName} Books | Charles E. MacKay Aviation Books`,
    description: `Browse ${categoryName} books by Charles E. MacKay. Expert aviation history research and documentation.`,
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

  return (
    <div className="min-h-screen bg-slate-900">
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
      </div>
    </div>
  )
}