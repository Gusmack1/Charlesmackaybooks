import Image from 'next/image'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { books } from '@/data/books'
import { getPublishedNewsArticles, getValidatedRelatedBooks } from '@/lib/newsroom'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Aviation News & Briefings | Charles E. MacKay Books',
  description:
    'Scottish aviation news and briefings, with links to our research volumes.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/aviation-news',
  },
  keywords: [
    'aviation news',
    'Scottish aviation news',
    'aviation history',
    'aviation research',
    'Charles E. MacKay',
  ],
  openGraph: {
    title: 'Aviation News & Briefings | Charles E. MacKay Books',
    description: 'Scottish aviation news and briefings, with links to our research volumes.',
    type: 'website',
  },
}

const bookLookup = new Map(books.map((book) => [book.id, book]))

function displayReason(reason: string | undefined): string {
  const generic = /Topical link between news item(s)? and catalogue research focus\.?/i
  if (!reason || generic.test(reason)) return 'Recommended volume'
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

export default async function AviationNewsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Charles E. MacKay Aviation News',
    description: 'Scottish aviation news and briefings, with links to our research volumes',
    author: {
      '@type': 'Person',
      name: 'Charles E. MacKay',
      url: 'https://charlesmackaybooks.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Charles E. MacKay Aviation Research',
    },
  }

  const articles = await getPublishedNewsArticles(30)
  const [hero, ...rest] = articles
  const secondary = rest.slice(0, 4)
  const remainder = rest.slice(4)
  const heroRelatedBooks = hero ? getValidatedRelatedBooks(hero) : []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
                <a
                  href={`/aviation-news/${hero.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Read full briefing
                  <span aria-hidden>→</span>
                </a>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white">Related book</h2>
                {heroRelatedBooks.length ? (
                  heroRelatedBooks.map(({ bookId, reason }) => {
                    const book = bookLookup.get(bookId)
                    if (!book) return null
                    return (
                      <div key={book.id} className="border border-white/10 rounded-lg p-4 bg-slate-800/60 flex gap-4 items-start">
                        <div className="shrink-0 w-28 min-w-28 aspect-2/3 rounded overflow-hidden bg-slate-700 self-start">
                          <Image
                            src={book.imageUrl || `/book-covers/${book.id}.jpg`}
                            alt={book.title}
                            width={112}
                            height={168}
                            className="object-cover w-full h-full"
                            sizes="112px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm uppercase text-white/50 mb-1">{displayReason(reason)}</p>
                          <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                          <p className="text-white/80 text-sm line-clamp-3">{book.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a href={`/books/${book.id}`} className="text-blue-300 text-sm font-semibold inline-flex gap-1">
                              View book <span aria-hidden>↗</span>
                            </a>
                            <a
                              href={`/books/${book.id}#purchase`}
                              className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-gray-100"
                            >
                              Buy this book
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-white/70 text-sm">Explore our <a href="/books" className="text-blue-300 hover:underline">aviation history books</a> for related reading.</p>
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
                  <a
                    key={article.slug}
                    href={`/aviation-news/${article.slug}`}
                    className="block border border-white/10 rounded-xl p-5 bg-slate-800/60 hover:border-white/30 transition-colors"
                  >
                    <p className="text-xs text-white/60 mb-2">{formatDate(article.createdAt)}</p>
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {getExcerpt(article.sections?.[0]?.content, 120) || 'Scottish aviation briefing.'}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {remainder.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Archive</h2>
              <div className="space-y-2">
                {remainder.map((article) => (
                  <a
                    key={article.slug}
                    href={`/aviation-news/${article.slug}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-white/10 last:border-0 hover:text-white/90"
                  >
                    <span className="font-medium text-white">{article.title}</span>
                    <span className="text-sm text-white/60">{formatDate(article.createdAt)}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="border border-white/10 rounded-2xl p-6 md:p-8 bg-slate-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Explore more</h2>
            <p className="text-white/80 mb-6">
              Browse our aviation history books, research guides, and Scottish aviation timeline.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/books" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-colors">
                All books
              </a>
              <a href="/scottish-aviation-timeline" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                Scottish aviation timeline
              </a>
            </div>
          </section>
        </div>
      </BBCPageTemplate>
    </>
  )
}
