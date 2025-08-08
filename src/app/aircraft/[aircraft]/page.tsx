import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { books } from '@/data/books'

// Valid aircraft mappings
const aircraftMappings: Record<string, { name: string; description: string; period: string; category: string }> = {
  'bristol-fighter': {
    name: 'Bristol Fighter F2B',
    description: 'Two-seat fighter and reconnaissance aircraft used extensively during WWI',
    period: 'WWI (1916-1932)',
    category: 'Fighter Aircraft'
  },
  'hawker-hurricane': {
    name: 'Hawker Hurricane',
    description: 'British single-seat fighter aircraft that played a crucial role in the Battle of Britain',
    period: 'WWII (1937-1947)',
    category: 'Fighter Aircraft'
  },
  'sopwith-camel': {
    name: 'Sopwith Camel',
    description: 'British single-seat biplane fighter used on the Western Front and home defence',
    period: 'WWI (1917-1920)',
    category: 'Fighter Aircraft'
  }
}

export async function generateStaticParams() {
  return Object.keys(aircraftMappings).map((aircraft) => ({
    aircraft,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ aircraft: string }> }): Promise<Metadata> {
  const { aircraft } = await params
  const aircraftData = aircraftMappings[aircraft]
  
  if (!aircraftData) {
    return {
      title: 'Aircraft Not Found | Charles E. MacKay Aviation Books',
      description: 'The requested aircraft could not be found.',
    }
  }

  return {
    title: `${aircraftData.name} | Aviation History | Charles E. MacKay`,
    description: `${aircraftData.description}. ${aircraftData.period}. Expert analysis and historical context by aviation historian Charles E. MacKay.`,
    keywords: [
      aircraftData.name,
      aircraftData.category.toLowerCase(),
      'aviation history',
      'aircraft development',
      'Charles E MacKay',
      aircraftData.period.includes('WWI') ? 'WWI aviation' : 'WWII aviation',
      'military aviation'
    ],
    openGraph: {
      title: `${aircraftData.name} | Aviation History`,
      description: aircraftData.description,
      type: 'article',
      url: `https://charlesmackaybooks.com/aircraft/${aircraft}`
    }
  }
}

export default async function AircraftPage({ params }: { params: Promise<{ aircraft: string }> }) {
  const { aircraft } = await params
  const aircraftData = aircraftMappings[aircraft]
  
  if (!aircraftData) {
    notFound()
  }

  // Find related books
  const relatedBooks = books.filter(book => 
    book.title.toLowerCase().includes(aircraftData.name.toLowerCase()) ||
    book.description.toLowerCase().includes(aircraftData.name.toLowerCase()) ||
    book.tags?.some(tag => tag.toLowerCase().includes(aircraftData.name.toLowerCase()))
  )

  // Find related blog posts (assuming they exist based on the sitemap)
  const relatedBlogPosts = [
    {
      slug: 'bristol-fighter-f2b-brisfit',
      title: 'Bristol Fighter F2B: The Brisfit',
      aircraft: 'bristol-fighter'
    },
    {
      slug: 'hawker-hurricane-fighter-development',
      title: 'Hawker Hurricane Fighter Development',
      aircraft: 'hawker-hurricane'
    },
    {
      slug: 'sopwith-camel-wwi-fighter',
      title: 'Sopwith Camel WWI Fighter',
      aircraft: 'sopwith-camel'
    }
  ].filter(post => post.aircraft === aircraft)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {aircraftData.name}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {aircraftData.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/10 px-3 py-1 rounded-full">
                {aircraftData.period}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                {aircraftData.category}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                Historical Analysis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-accent-blue hover:text-blue-800">Home</Link>
            <span className="text-muted">/</span>
            <Link href="/aircraft" className="text-accent-blue hover:text-blue-800">Aircraft</Link>
            <span className="text-muted">/</span>
            <span className="text-secondary">{aircraftData.name}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Aircraft Overview</h2>
                <p className="text-secondary leading-relaxed mb-6">
                  The {aircraftData.name} represents a significant chapter in aviation history. 
                  {aircraftData.description} This aircraft played a crucial role during {aircraftData.period} 
                  and contributed to the evolution of {aircraftData.category.toLowerCase()} design and tactics.
                </p>
                
                <h3 className="text-xl font-semibold text-primary mb-4">Historical Significance</h3>
                <p className="text-secondary leading-relaxed mb-6">
                  Aviation historian Charles E. MacKay has extensively researched the {aircraftData.name} 
                  and its impact on military aviation development. Through meticulous analysis of 
                  archival documents, technical specifications, and operational records, this research 
                  provides comprehensive insights into the aircraft's design evolution and combat effectiveness.
                </p>

                {/* Related Blog Posts */}
                {relatedBlogPosts.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Expert Analysis</h3>
                    <div className="space-y-4">
                      {relatedBlogPosts.map((post) => (
                      <div key={post.slug} className="card p-4">
                          <h4 className="font-semibold text-lg mb-2">
                          <Link href={`/blog/${post.slug}`} className="text-accent-blue hover:text-blue-800">
                              {post.title}
                            </Link>
                          </h4>
                        <p className="text-secondary text-sm">
                            Expert insights and historical analysis by Charles E. MacKay
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Books */}
              {relatedBooks.length > 0 && (
                <div className="card p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Related Books</h3>
                  <div className="space-y-4">
                    {relatedBooks.map((book) => (
                      <div key={book.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-sm mb-1">
                          <Link href={`/books/${book.id}`} className="text-accent-blue hover:text-blue-800">
                            {book.title}
                          </Link>
                        </h4>
                        <p className="text-secondary text-xs mb-2">{book.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted">{book.category}</span>
                          <span className="font-semibold text-accent-green">£{book.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Facts */}
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-secondary">Aircraft Type:</span>
                    <span className="ml-2 text-secondary">{aircraftData.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-secondary">Service Period:</span>
                    <span className="ml-2 text-secondary">{aircraftData.period}</span>
                  </div>
                  <div>
                    <span className="font-medium text-secondary">Research Level:</span>
                    <span className="ml-2 text-secondary">Academic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}