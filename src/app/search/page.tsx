import { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'

export async function generateMetadata({ searchParams }: { searchParams: { query?: string, q?: string } }): Promise<Metadata> {
  const raw = (searchParams?.query ?? searchParams?.q ?? '').toString()
  const hasQuery = raw.trim().length > 0

  return {
    title: hasQuery ? `Search Results for "${raw}" | Charles E. MacKay` : 'Search | Charles E. MacKay',
    description: hasQuery ? `Search results for "${raw}" in Charles Mackay Books collection` : 'Search the Charles Mackay Books collection',
    alternates: {
      canonical: 'https://charlesmackaybooks.com/search/'
    },
    robots: {
      index: false, // Never index search pages (with or without query params)
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  }
}

export default function SearchPage({ searchParams }: { searchParams: { query?: string, q?: string } }) {
  const raw = (searchParams?.query ?? searchParams?.q ?? '').toString()
  const q = raw.trim().toLowerCase()
  const results = q
    ? books.filter(b =>
        [
          (b as any).title,
          (b as any).description,
          (b as any).category,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    : []

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Search</h1>
        <p className="text-white/90 mb-6">Query: <span className="font-medium">{q || '—'}</span></p>

        {q.length === 0 && (
          <p className="text-white/90">Type a query in the header search bar and press Enter.</p>
        )}

        {q.length > 0 && (
          <>
            <p className="text-white/90 mb-4">{results.length} result{results.length === 1 ? '' : 's'} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(book => (
                <Link key={book.id} href={`/books/${book.id}`} className="block border border-white/15 bg-slate-800 rounded-lg p-4 hover:border-white/30 text-white">
                  <div className="font-semibold text-white mb-1 line-clamp-2">{book.title}</div>
                  <div className="text-white/80 text-sm line-clamp-3">{book.description}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


