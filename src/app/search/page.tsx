import { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'
import { blogPosts } from '@/data/blogCategories'
import { trackedKeywords } from '@/data/keywordTracking'
import { getPublishedNewsArticles } from '@/lib/newsroom'

type SearchParams = { query?: string; q?: string }

const priorityScore: Record<string, number> = {
  'tier-1': 1,
  'tier-2': 2,
  'tier-3': 3,
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const resolved = await searchParams
  const raw = ((resolved?.query ?? resolved?.q) ?? '').toString()
  const hasQuery = raw.trim().length > 0

  return {
    title: hasQuery ? `Search Results for "${raw}" | Charles E. MacKay` : 'Search | Charles E. MacKay',
    description: hasQuery
      ? `Search results for "${raw}" across Charles E. MacKay books, Scottish aviation briefings, and long-form blog articles.`
      : 'Search the Charles E. MacKay aviation books, newsroom briefings, and blog archive.',
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

function formatDate(iso: string | undefined) {
  if (!iso) return 'Date pending'
  return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}
export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolved = await searchParams
  const raw = ((resolved?.query ?? resolved?.q) ?? '').toString()
  const q = raw.trim().toLowerCase()

  const matchingBooks = q
    ? books.filter((book) =>
        matchesQuery(
          [book.title, book.description, book.category, book.researchThemes?.join(' '), book.tags?.join(' ')]
            .filter(Boolean)
            .join(' '),
          q,
        ),
      )
    : []

  const matchingBlogArticles = q
    ? blogPosts.filter((post) =>
        matchesQuery([post.title, post.excerpt, post.tags?.join(' '), post.category].filter(Boolean).join(' '), q),
      )
    : []

  const newsArticles = q ? await getPublishedNewsArticles(50) : []
  const matchingBriefings = q
    ? newsArticles.filter((article) =>
        matchesQuery(
          [
            article.title,
            article.sections?.map((section) => section.content).join(' '),
            article.keywords?.map((entry) => entry.keyword).join(' '),
            article.relatedBooks?.map((entry) => entry.bookId ?? '').join(' '),
          ]
            .filter(Boolean)
            .join(' '),
          q,
        ),
      )
    : []

  const keywordMatches = q
    ? trackedKeywords.filter((entry) =>
        matchesQuery([entry.keyword, entry.targetUrl, entry.contentType, entry.bookId ?? ''].join(' '), q),
      )
    : trackedKeywords

  const keywordFacets = trackedKeywords
    .slice()
    .sort((a, b) => (priorityScore[a.priority] || 99) - (priorityScore[b.priority] || 99))
    .slice(0, 12)

  const totalResults = matchingBooks.length + matchingBlogArticles.length + matchingBriefings.length

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-2">Search</h1>
          <p className="text-white/90">
            Query: <span className="font-medium">{q || '—'}</span>
          </p>
          <p className="text-white/70">
            {q
              ? `${totalResults} result${totalResults === 1 ? '' : 's'} across books, Scottish Aviation Newsroom briefings, and long-form articles.`
              : 'Type a query in the header search bar and press Enter.'}
          </p>
        </header>

        <section aria-label="Popular keyword facets" className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Priority keyword facets</h2>
            <span className="text-xs text-white/60">Tap to rerun search instantly</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordFacets.map((facet) => (
              <Link
                key={facet.keyword}
                href={`/search?query=${encodeURIComponent(facet.keyword)}`}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition-colors"
              >
                {facet.keyword}
              </Link>
            ))}
          </div>
        </section>

        {q.length > 0 && (
          <div className="space-y-10">
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Books</h2>
                <span className="text-sm text-white/70">
                  {matchingBooks.length} match{matchingBooks.length === 1 ? '' : 'es'}
                </span>
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
                <h2 className="text-2xl font-semibold">Blog Articles</h2>
                <span className="text-sm text-white/70">
                  {matchingBlogArticles.length} match{matchingBlogArticles.length === 1 ? '' : 'es'}
                </span>
              </div>
              {matchingBlogArticles.length === 0 ? (
                <p className="text-white/70">No long-form blog posts match this query yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingBlogArticles.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block border border-white/15 bg-slate-800 rounded-lg p-4 hover:border-white/40 transition-colors"
                    >
                      <div className="font-semibold mb-1 line-clamp-2">{post.title}</div>
                      <p className="text-sm text-white/80 line-clamp-3">{post.excerpt}</p>
                      <p className="text-xs text-white/60 mt-3">{post.category}</p>
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
                      href={`/aviation-news/${article.slug}`}
                      className="block border border-white/15 bg-slate-800 rounded-lg p-4 hover:border-white/40 transition-colors"
                    >
                      <div className="font-semibold mb-1">{article.title}</div>
                      <p className="text-sm text-white/80 line-clamp-3">
                        {article.sections?.[0]?.content || 'Operational snapshot awaiting editor expansion.'}
                      </p>
                      <div className="text-xs text-white/60 mt-3 flex flex-wrap gap-2">
                        <span>{formatDate(article.createdAt)}</span>
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

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Keyword Tracking</h2>
                <span className="text-sm text-white/70">
                  {keywordMatches.length} keyword{keywordMatches.length === 1 ? '' : 's'}
                </span>
              </div>
              {keywordMatches.length === 0 ? (
                <p className="text-white/70">No tracked keywords align with this query yet.</p>
              ) : (
                <div className="overflow-x-auto border border-white/10 rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-800/80 text-left">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Keyword</th>
                        <th className="px-4 py-2 font-semibold">Priority</th>
                        <th className="px-4 py-2 font-semibold">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywordMatches
                        .slice()
                        .sort((a, b) => (priorityScore[a.priority] || 99) - (priorityScore[b.priority] || 99))
                        .map((entry) => (
                          <tr key={`${entry.keyword}-${entry.targetUrl}`} className="border-t border-white/5">
                            <td className="px-4 py-2">{entry.keyword}</td>
                            <td className="px-4 py-2 capitalize">{entry.priority.replace('-', ' ')}</td>
                            <td className="px-4 py-2">
                              <a
                                href={entry.targetUrl}
                                className="text-blue-300 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {entry.targetUrl.replace('https://charlesmackaybooks.com', '') || '/'}
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
