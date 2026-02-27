import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { books } from '@/data/books'
import { getPublishedNewsArticles } from '@/lib/newsroom'

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

function formatDate(input: string) {
  return new Date(input).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadMinutes(wordCount?: number) {
  if (!wordCount) return 3
  return Math.max(3, Math.round(wordCount / 225))
}

function buildExcerpt(content?: string) {
  if (!content) return ''
  const words = content.split(/\s+/).filter(Boolean)
  return `${words.slice(0, 80).join(' ')}${words.length > 80 ? '…' : ''}`
}

const bookMap = new Map(books.map((book) => [book.id, book]))

function displayReason(reason: string | undefined): string {
  const generic = 'Topical link between news items and catalogue research focus.'
  if (!reason || reason === generic) return 'Related research volume.'
  return reason
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BBCPageTemplate
        title="Aviation News & Updates"
        subtitle="Scottish aviation news and briefings, with links to our research volumes."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation News' }]}
      >
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Latest briefings</h2>

          {articles.length === 0 ? (
            <div className="card border border-white/10 p-8 text-center text-white/80">
              <p>Scottish aviation news and briefings will appear here.</p>
              <Link href="/news" className="text-blue-300 hover:underline mt-2 inline-block">View news page →</Link>
            </div>
          ) : (
          <div className="space-y-6">
            {articles.map((article) => {
              const firstSection = article.sections?.[0]
              const bookLink = article.relatedBooks?.[0]
              const book = bookLink ? bookMap.get(bookLink.bookId) : undefined
              return (
                <article key={article.slug} className="card p-6 border-l-4 border-accent-blue">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-primary mb-1">{article.title}</h3>
                    <div className="text-sm text-muted">{formatDate(article.createdAt)}</div>
                  </div>

                  <p className="text-secondary mb-4">
                    {buildExcerpt(firstSection?.content) || 'Scottish aviation briefing.'}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-muted mb-4">
                    <span>{estimateReadMinutes(article.wordCount)} min read</span>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                      <Link href={`/aviation-news/${article.slug}`} className="btn btn-primary px-5 py-2 text-sm font-semibold">
                        Read full briefing
                      </Link>
                      {book && (
                        <Link href={`/books/${book.id}`} className="btn btn-outline px-5 py-2 text-sm font-semibold">
                          View related book
                        </Link>
                      )}
                    </div>
                    {book && (
                      <Link href={`/books/${book.id}`} className="flex items-center gap-3 text-sm text-secondary hover:text-accent-blue transition-colors">
                        <div className="shrink-0 w-14 aspect-[3/4] rounded overflow-hidden bg-slate-700">
                          <Image
                            src={book.imageUrl || `/book-covers/${book.id}.jpg`}
                            alt={book.title}
                            width={56}
                            height={75}
                            className="w-full h-full object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-primary">{book.title}</span>
                          {' — '}
                          {displayReason(article.relatedBooks?.[0]?.reason)}
                        </div>
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
          )}
        </div>

        <div className="mb-12 card p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Explore more</h2>
          <p className="text-secondary mb-6">
            Browse our aviation history books, research guides, and Scottish aviation timeline.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/books" className="btn btn-primary px-5 py-2 text-sm font-semibold">
              All books
            </Link>
            <Link href="/news" className="btn btn-outline px-5 py-2 text-sm font-semibold">
              News
            </Link>
            <Link href="/scottish-aviation-timeline" className="btn btn-outline px-5 py-2 text-sm font-semibold">
              Scottish aviation timeline
            </Link>
          </div>
        </div>
      </BBCPageTemplate>
    </>
  )
}
