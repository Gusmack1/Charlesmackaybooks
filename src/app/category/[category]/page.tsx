import { notFound } from 'next/navigation'
import { books } from '@/data/books'
import { categoryDescriptions } from '@/data/category-descriptions'

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

  // Temporarily disable static generation for debugging
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">{categoryName} Books</h1>
        <p className="text-center mb-8 text-white/90">
          Found {categoryBooks.length} books in this category
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryBooks.map((book) => (
            <div key={book.id} className="border border-white/15 bg-slate-800 rounded-lg p-4 text-white">
              <h3 className="font-semibold text-white">{book.title}</h3>
              <p className="text-sm text-white/80">{book.category}</p>
              <p className="text-sm text-white">£{book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}