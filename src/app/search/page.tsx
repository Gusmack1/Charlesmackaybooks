import { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'
import { getPublishedNewsArticles } from '@/lib/newsroom'

type SearchParams = { query?: string; q?: string }

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const raw = (searchParams?.query ?? searchParams?.q ?? '').toString()
  const hasQuery = raw.trim().length > 0

  return {
    title: hasQuery ? `Search Results for "${raw}" | Charles E. MacKay` : 'Search | Charles E. MacKay',
    description: hasQuery
      ? `Search results for "${raw}" across Charles E. MacKay books and Scottish aviation briefings.`
      : 'Search the Charles E. MacKay aviation books, briefings, and blog archive.',
    alternates: {
      canonical: 'https://charlesmackaybooks.com/search',
    },
    robots: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  }
}

function matchesQuery(haystack: string | undefined, needle: string) {
  if (!haystack || !needle) return false
  return haystack.toLowerCase().includes(needle)
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = (searchParams?.query ?? searchParams?.q ?? '').toString()
  const q = raw.trim().toLowerCase()

  const matchingBooks = q
    ? books.filter((book) =>
        matchesQuery(
          [book.title, book.description, book.category, book.researchThemes?.join(' ')].filter(Boolean).join(' '),
          q,
        ),
      )
    : []

  const newsArticles = q ? await getPublishedNewsArticles(50) : []
  const matchingBriefings = q
    ? newsArticles.filter((article) =>
        matchesQuery(
          [
            article.title,
            article.sections?.map((section) => section.content).join(' '),
            article.relatedBooks?.map((entry) => entry.reason).join(' '),
          ]
            .filter(Boolean)
            .join(' '),
          q,
        ),
      )
    : []

  const totalResults = matchingBooks.length + matchingBriefings.length

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Search</h1>
        <p className="text-white/90 mb-6">
          Query: <span className="font-medium">{q || '—'}</span>
        </p>

        {q.length === 0 && <p className="text-white/80">Type a query in the header search bar and press Enter.</p>}

        {q.length > 0 && (
          <>
            <p className="text-white/80 mb-6">
              {totalResults} result{totalResults === 1 ? '' : 's'} found across books and automated Scottish aviation briefings.
            </p>

            <div className="space-y-10">
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold">Books</h2>
                  <span className="text-sm text-white/70">{matchingBooks.length} match{matchingBooks.length === 1 ? '' : 'es'}</span>
                </div>
                {matchingBooks.length === 0 ? (
                  <p className="text-white/70">No books match this query.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchingBooks.map((book) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className="block border border-white/15 bg-slate-800 rounded-lg p-4 hover:border-white/40 transition-colors"
                      >
                        <div className="font-semibold mb-1 line-clamp-2">{book.title}</div>
                        <p className="text-sm text-white/80 line-clamp-3">{book.description}</p>
                        <p className="text-xs text-white/60 mt-3">{book.category}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold">Automated Briefings</h2>
                  <span className="text-sm text-white/70">
                    {matchingBriefings.length} match{matchingBriefings.length === 1 ? '' : 'es'}
                  </span>
                </div>
                {matchingBriefings.length === 0 ? (
                  <p className="text-white/70">No Scottish Aviation Newsroom briefings match this query yet.</p>
                ) : (
                  <div className="space-y-4">
                    {matchingBriefings.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/blog/scottish-aviation-news/${article.slug}`}
                        className="block border border-white/15 bg-slate-800 rounded-lg p-4 hover:border-white/40 transition-colors"
                      >
                        <div className="font-semibold mb-1">{article.title}</div>
                        <p className="text-sm text-white/80 line-clamp-3">
                          {article.sections?.[0]?.content || 'Operational snapshot awaiting editor expansion.'}
                        </p>
                        <div className="text-xs text-white/60 mt-3 flex flex-wrap gap-2">
                          <span>{new Date(article.createdAt).toLocaleDateString('en-GB')}</span>
                          {article.relatedBooks?.length ? (
                            <span>
                              Book tie-in: <strong>{article.relatedBooks[0].bookId}</strong>
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
