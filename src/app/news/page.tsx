import Link from 'next/link'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { books } from '@/data/books'
import { getPublishedNewsArticles } from '@/lib/newsroom'

export const metadata: Metadata = {
  title: 'Scottish Aviation News | Charles E. MacKay Books',
  description:
    'Scottish aviation news and briefings, linked to our research volumes.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/news',
  },
}

const bookLookup = new Map(books.map((book) => [book.id, book]))

function displayReason(reason: string | undefined): string {
  const generic = 'Topical link between news items and catalogue research focus.'
  if (!reason || reason === generic) return 'Recommended volume'
  return reason
}

function formatDate(iso: string | undefined) {
  if (!iso) return 'Date pending'
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function getExcerpt(content: string | undefined, maxLength = 200) {
  if (!content) return ''
  const firstLine = content.split('\n').find((l) => l.trim().length > 20 && !l.trim().startsWith('-'))
  const text = firstLine || content.replace(/\n/g, ' ').trim()
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text
}

export default async function NewsPage() {
  const articles = await getPublishedNewsArticles(30)
  const [hero, ...rest] = articles
  const secondary = rest.slice(0, 4)
  const remainder = rest.slice(4)

  return (
    <BBCPageTemplate
      title="Scottish Aviation Newsroom"
      subtitle="Scottish aviation news and briefings"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation News' }]}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {articles.length > 0 && (
          <p className="text-sm text-white/60">
            Latest: {formatDate(articles[0]?.createdAt)}
          </p>
        )}
        {hero ? (
          <article className="grid gap-8 md:grid-cols-2 border border-white/10 rounded-2xl p-6 md:p-8 bg-slate-800/70">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">{formatDate(hero.createdAt)}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{hero.title}</h1>
              <p className="text-white/80 mb-6 leading-relaxed line-clamp-3">
                {hero.sections?.[0]?.content?.split('\n')[0] || hero.sections?.[0]?.content || 'Operational snapshot.'}
              </p>
              <Link
                href={`/aviation-news/${hero.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-colors"
              >
                Read full briefing
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Related book</h2>
              {hero.relatedBooks?.length ? (
                hero.relatedBooks.map(({ bookId, reason }) => {
                  const book = bookLookup.get(bookId)
                  if (!book) return null
                  return (
                    <div key={book.id} className="border border-white/10 rounded-lg p-4 bg-slate-800/60">
                      <p className="text-sm uppercase text-white/50 mb-1">{displayReason(reason)}</p>
                      <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-3">{book.description}</p>
                      <Link href={`/books/${book.id}`} className="text-blue-300 text-sm font-semibold mt-3 inline-flex gap-1">
                        View book <span aria-hidden>↗</span>
                      </Link>
                    </div>
                  )
                })
              ) : (
                <p className="text-white/70 text-sm">Explore our <Link href="/books" className="text-blue-300 hover:underline">aviation history books</Link> for related reading.</p>
              )}
            </div>
          </article>
        ) : (
          <div className="border border-white/10 rounded-2xl p-12 md:p-16 bg-slate-800/50 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">No briefings yet</h2>
            <p className="text-white/80 max-w-md mx-auto">
              Scottish aviation news and briefings will appear here.
            </p>
          </div>
        )}

        {secondary.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">More briefings</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {secondary.map((article) => (
                <Link
                  key={article.slug}
                  href={`/aviation-news/${article.slug}`}
                  className="block border border-white/10 rounded-xl p-5 bg-slate-800/60 hover:border-white/30 transition-colors"
                >
                  <p className="text-xs text-white/60 mb-2">{formatDate(article.createdAt)}</p>
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {getExcerpt(article.sections?.[0]?.content, 120) || 'Scottish aviation briefing.'}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {remainder.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Archive</h2>
            <div className="space-y-2">
              {remainder.map((article) => (
                <Link
                  key={article.slug}
                  href={`/aviation-news/${article.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-white/10 last:border-0 hover:text-white/90"
                >
                  <span className="font-medium text-white">{article.title}</span>
                  <span className="text-sm text-white/60">{formatDate(article.createdAt)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </BBCPageTemplate>
  )
}
