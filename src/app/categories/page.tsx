import type { Metadata } from 'next'
import Link from 'next/link'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { categoryDescriptions } from '@/data/category-descriptions'
import { categoryNavLinks } from '@/config/navigation'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Aviation Book Categories | Charles E. MacKay Aviation Books',
  description: 'Explore comprehensive aviation book categories covering WWI, WWII, Scottish aviation history, helicopter development, jet age aviation, and more. Expert research by Charles E. MacKay.',
  keywords: [
    'aviation book categories',
    'aviation history books',
    'military aviation books',
    'Scottish aviation history',
    'WWI aviation books',
    'WWII aviation books',
    'helicopter history books',
    'jet aviation books',
    'aviation biography books',
    'Charles E MacKay books'
  ],
  alternates: {
    canonical: 'https://charlesmackaybooks.com/categories/'
  },
  openGraph: {
    title: 'Aviation Book Categories | Charles E. MacKay Aviation Books',
    description: 'Comprehensive aviation book categories covering all aspects of aviation history, from early flight to modern aviation.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/categories/'
  }
}

export default function CategoriesPage() {
  // Group categories by theme for better organization
  const categoryGroups = {
    'War & Military Aviation': [
      'wwi-aviation',
      'wwii-aviation',
      'military-history',
      'jet-age-aviation'
    ],
    'Technical & Development': [
      'helicopter-history',
      'naval-aviation',
      'industrial-history',
      'aviation-history'
    ],
    'Biographical & Regional': [
      'aviation-biography',
      'scottish-aviation-history',
      'travel-literature'
    ]
  }

  return (
    <BBCPageTemplate
      title="Aviation Book Categories"
      subtitle="Comprehensive collection of aviation history books organized by theme and era"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
    >
      {/* Introduction */}
      <section className="py-8 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-white/90 mb-6">
              Discover our comprehensive collection of aviation history books, meticulously organized by theme, era, and specialization.
              Each category represents years of expert research by aviation historian Charles E. MacKay.
            </p>
            <p className="text-white/90">
              From the pioneering days of early flight to modern aviation technology, explore {books.length} authoritative titles
              covering every aspect of aviation development, military operations, and technological innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Category Groups */}
      {Object.entries(categoryGroups).map(([groupName, categorySlugs]) => (
        <section key={groupName} className="py-12 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{groupName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorySlugs.map((categorySlug) => {
                const categoryDesc = categoryDescriptions[categorySlug]
                const categoryBooks = books.filter(book =>
                  book.category === categoryDesc?.name ||
                  book.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
                )

                if (!categoryDesc) return null

                return (
                  <div key={categorySlug} className="bg-slate-800 border border-white/15 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-white">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        {categoryDesc.name}
                      </h3>
                      <span className="badge badge-blue text-sm">
                        {categoryBooks.length} books
                      </span>
                    </div>

                    <p className="text-white/90 mb-4 line-clamp-3">
                      {categoryDesc.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-white mb-2">Featured Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {categoryDesc.keywords.slice(0, 4).map((keyword) => (
                          <span key={keyword} className="text-xs bg-slate-700 text-white px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/category/${categorySlug}`}
                      className="inline-block badge badge-blue px-4 py-2 rounded font-semibold transition-colors"
                    >
                      Explore {categoryDesc.name} →
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding the Right Book?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our aviation history experts can help you find the perfect book for your research or collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Our Experts
            </Link>
            <Link
              href="/books"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent-blue transition-colors"
            >
              Browse All Books
            </Link>
          </div>
        </div>
      </section>
    </BBCPageTemplate>
  )
}
