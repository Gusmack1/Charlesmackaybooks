import Link from 'next/link'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { books } from '@/data/books'
import { trackedKeywords } from '@/data/keywordTracking'
import { getPublishedNewsArticles } from '@/lib/newsroom'

export const metadata: Metadata = {
  title: 'Scottish Aviation Newsroom | Daily Briefings & Book Tie-ins',
  description:
    'Auto-generated Scottish aviation briefings powered by MOD, RAF, HIAL, DfT, and AAIB sources—each linked to Charles E. MacKay research volumes.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/news',
  },
}

const bookLookup = new Map(books.map((book) => [book.id, book]))

function formatDate(iso: string | undefined) {
  if (!iso) return 'Date pending'
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function NewsPage() {
  const articles = await getPublishedNewsArticles(30)
  const [hero, ...rest] = articles
  const secondary = rest.slice(0, 4)
  const remainder = rest.slice(4)
  const keywordHighlights = trackedKeywords
    .slice()
    .sort((a, b) => (a.priority > b.priority ? 1 : -1))
    .slice(0, 8)

  return (
    <BBCPageTemplate
      title="Scottish Aviation Newsroom"
      subtitle="Fully automated Scottish aviation briefings with citations, book tie-ins, and keyword coverage."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Newsroom' }]}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 bg-slate-900">
        {hero ? (
          <article className="grid gap-8 md:grid-cols-2 border border-white/10 rounded-2xl p-6 bg-slate-800/70">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">Lead briefing</p>
              <h1 className="text-3xl font-bold text-white mb-3">{hero.title}</h1>
              <p className="text-white/80 mb-4">
                {hero.sections?.[0]?.content || 'Operational snapshot ready for 3,000-word expansion.'}
              </p>
              <div className="text-white/60 text-sm mb-6">{formatDate(hero.createdAt)}</div>
              <div className="flex flex-wrap gap-3 text-sm text-white/70 mb-6">
                {hero.keywords?.map((keyword) => (
                  <span key={keyword.keyword} className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    #{keyword.keyword}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                <Link
                  href={`/blog/scottish-aviation-news/${hero.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-colors border border-slate-900"
                >
                  Read briefing
                  <span aria-hidden>→</span>
                </Link>
                <div className="text-xs text-white/60">
                  Generated automatically from {hero.sourceReferences?.length ?? 0} official releases.
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 space-y-4">
              <h2 className="text-xl font-semibold text-white">Book tie-in</h2>
              {hero.relatedBooks?.length ? (
                hero.relatedBooks.map(({ bookId, reason }) => {
                  const book = bookLookup.get(bookId)
                  if (!book) return null
                  return (
                    <div key={book.id} className="border border-white/10 rounded-lg p-4 bg-slate-800/60">
                      <p className="text-sm uppercase text-white/50 mb-1">{reason || 'Recommended volume'}</p>
                      <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-3">{book.description}</p>
                      <Link href={`/books/${book.id}`} className="text-blue-300 text-sm font-semibold mt-3 inline-flex gap-1">
                        View book <span aria-hidden>↗</span>
                      </Link>
                    </div>
                  )
                })
              ) : (
                <p className="text-white/70 text-sm">This briefing will be assigned a book CTA during editorial pass.</p>
              )}
            </div>
          </article>
        ) : (
          <p className="text-white/80">No briefings generated yet. Run the newsroom automation workflow to seed this page.</p>
        )}

        {secondary.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Latest briefings</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {secondary.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/scottish-aviation-news/${article.slug}`}
                  className="border border-white/10 rounded-xl p-5 bg-slate-800/60 hover:border-white/40 transition-colors"
                >
                  <p className="text-xs text-white/60 mb-1">{formatDate(article.createdAt)}</p>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-3 mb-3">
                    {article.sections?.[0]?.content || 'Operational snapshot awaiting expansion.'}
                  </p>
                  <div className="text-xs text-white/60 flex flex-wrap gap-2">
                    {(article.keywords || []).slice(0, 3).map((keyword) => (
                      <span key={keyword.keyword} className="px-2 py-0.5 rounded bg-white/10">
                        #{keyword.keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {remainder.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Archive</h2>
              <Link href="/blog/scottish-aviation-news" className="text-blue-300 text-sm font-semibold hover:underline">
                View all automated posts →
              </Link>
            </div>
            <div className="space-y-3">
              {remainder.map((article) => (
                <div key={article.slug} className="flex flex-col md:flex-row md:items-center justify-between border border-white/10 rounded-lg p-4">
                  <div className="md:w-2/3">
                    <p className="text-xs text-white/60">{formatDate(article.createdAt)}</p>
                    <Link href={`/blog/scottish-aviation-news/${article.slug}`} className="text-lg font-semibold text-white hover:underline">
                      {article.title}
                    </Link>
                  </div>
                  <div className="text-sm text-white/70 mt-3 md:mt-0">
                    {(article.relatedBooks || []).length ? (
                      <span>Book focus: {article.relatedBooks.map((entry) => entry.bookId).join(', ')}</span>
                    ) : (
                      <span>No book tie-in yet</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border border-white/10 rounded-2xl p-6 bg-slate-800/50">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-semibold text-white">Keyword radar</h2>
            <Link href="/search" className="text-blue-300 text-sm font-semibold hover:underline">
              Search all content →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-white/70 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4 font-semibold">Keyword</th>
                  <th className="py-2 pr-4 font-semibold">Priority</th>
                  <th className="py-2 pr-4 font-semibold">Target page</th>
                </tr>
              </thead>
              <tbody>
                {keywordHighlights.map((entry) => (
                  <tr key={entry.keyword} className="border-b border-white/5">
                    <td className="py-2 pr-4">{entry.keyword}</td>
                    <td className="py-2 pr-4 capitalize">{entry.priority.replace('-', ' ')}</td>
                    <td className="py-2 pr-4">
                      <a href={entry.targetUrl} className="text-blue-300 hover:underline" target="_blank" rel="noreferrer">
                        {entry.targetUrl.replace('https://charlesmackaybooks.com', '') || '/'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </BBCPageTemplate>
  )
}
