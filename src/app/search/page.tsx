import { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Search | Charles E. MacKay',
  description: 'Search results for Charles Mackay Books',
}

export default function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const q = (searchParams?.query || '').trim().toLowerCase()
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p className="text-secondary mb-6">Query: <span className="font-medium">{q || '—'}</span></p>

        {q.length === 0 && (
          <p className="text-secondary">Type a query in the header search bar and press Enter.</p>
        )}

        {q.length > 0 && (
          <>
            <p className="text-secondary mb-4">{results.length} result{results.length === 1 ? '' : 's'} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(book => (
                <Link key={book.id} href={`/books/${book.id}`} className="block border rounded-lg p-4 hover:border-slate-300">
                  <div className="font-semibold text-primary mb-1 line-clamp-2">{book.title}</div>
                  <div className="text-secondary text-sm line-clamp-3">{book.description}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


