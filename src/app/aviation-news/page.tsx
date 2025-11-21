import Link from 'next/link'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import books from '@/data/books'
import { getNewsArticles } from '@/lib/newsroom'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Aviation News & Research Updates | Latest Discoveries | Charles E. MacKay',
  description:
    'Latest aviation history discoveries, research updates, museum exhibitions, and archaeological findings. Expert analysis and commentary by aviation historian Charles E. MacKay.',
  keywords: [
    'aviation news',
    'aviation history discoveries',
    'aircraft archaeology',
    'aviation museum news',
    'aviation research updates',
    'aircraft restoration news',
    'aviation conference news',
    'historical aircraft discoveries',
    'aviation exhibition news',
    'aircraft wreck discoveries',
    'aviation archive discoveries',
    'military aviation news',
    'Scottish aviation news',
    'aviation book releases',
  ],
  openGraph: {
    title: 'Aviation News & Research Updates | Latest Discoveries',
    description: 'Latest aviation history discoveries and research updates with expert analysis.',
    type: 'website',
  },
}

const upcomingEvents = [
  {
    title: 'Charles E. MacKay Guest Lecture: "Hidden Stories of Scottish Aviation"',
    date: '2024-02-15',
    location: 'University of Glasgow',
    type: 'Lecture',
    description: "Guest lecture exploring untold stories from Scotland's aviation heritage, including recently discovered archival materials.",
    registrationUrl: 'https://glasgow.ac.uk/events/aviation-lecture',
  },
  {
    title: 'RAF Museum "Battle of Britain 84th Anniversary" Exhibition Opening',
    date: '2024-03-08',
    location: 'RAF Museum London',
    type: 'Exhibition',
    description: 'New exhibition featuring Hurricane and Spitfire aircraft with emphasis on Scottish squadrons and pilots.',
  },
  {
    title: 'Aviation Archaeology Symposium',
    date: '2024-04-22',
    location: 'Imperial War Museum Duxford',
    type: 'Conference',
    description: 'International symposium on aviation archaeology methods and recent discoveries.',
    registrationUrl: 'https://iwm.org.uk/events/aviation-archaeology',
  },
  {
    title: 'New Book Launch: "Clydeside Aviation Volume Three"',
    date: '2024-05-10',
    location: 'Glasgow, Scotland',
    type: 'Book Launch',
    description: 'Launch event for the third volume covering post-war Scottish aviation development.',
  },
]

const researchHighlights = [
  {
    title: 'Digital Archive Expansion',
    description: 'Over 2,000 new documents added to our digital aviation archive this quarter',
    metric: '2,147 documents',
    period: 'Q4 2023',
  },
  {
    title: 'Academic Citations',
    description: 'Our research has been cited in academic papers and dissertations worldwide',
    metric: '89 citations',
    period: 'Last 6 months',
  },
  {
    title: 'Museum Partnerships',
    description: 'Active collaborations with major aviation museums for research and exhibitions',
    metric: '7 active partnerships',
    period: 'Current',
  },
  {
    title: 'Student Resources',
    description: 'Downloads of our academic research guides and citation templates',
    metric: '1,834 downloads',
    period: 'This quarter',
  },
]

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

export default async function AviationNewsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Charles E. MacKay Aviation News',
    description: 'Latest aviation history discoveries, research updates, and expert analysis',
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

  const articles = await getNewsArticles(10)

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
        subtitle="Daily Scottish aviation intelligence: verified sources, expert context, and book tie-ins so readers can move from breaking news to our definitive volumes."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation News' }]}
      >
        <div className="mb-12 card p-8">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Research Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {researchHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-accent-blue mb-2">{highlight.metric}</div>
                <div className="font-semibold text-primary mb-1">{highlight.title}</div>
                <div className="text-sm text-secondary mb-2">{highlight.description}</div>
                <div className="text-xs text-muted">{highlight.period}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary">Latest Newsroom Drafts</h2>
              <p className="text-secondary">
                Automated briefs pulled from MOD, RAF, and HIAL sources. Editors expand these to the required 3,000-word Charles E.
                MacKay essays before publication.
              </p>
            </div>
            <Link href="/aviation-news" className="btn btn-primary px-6 py-2 w-fit">
              Refresh feed
            </Link>
          </div>

          {articles.length === 0 && (
            <div className="card border border-dashed border-muted p-6 text-secondary">
              No newsroom drafts available yet. Run <code className="font-mono text-sm">npm run news:ingest</code> followed by
              <code className="font-mono text-sm"> npm run news:draft</code> to capture the latest sources.
            </div>
          )}

          <div className="space-y-8">
            {articles.map((article) => {
              const firstSection = article.sections?.[0]
              const bookLink = article.relatedBooks?.[0]
              const book = bookLink ? bookMap.get(bookLink.bookId) : undefined
              return (
                <article key={article.slug} className="card p-6 border-l-4 border-accent-blue">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{article.title}</h3>
                      <div className="text-sm text-muted">{formatDate(article.createdAt)}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        article.status === 'draft' ? 'badge badge-amber' : 'badge badge-green'
                      }`}
                    >
                      {article.status === 'draft' ? 'Draft awaiting expansion' : article.status}
                    </span>
                  </div>

                  <p className="text-secondary mb-4">
                    {buildExcerpt(firstSection?.content) || 'Draft summary pending editorial expansion.'}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                    <span>{estimateReadMinutes(article.wordCount)} min read target</span>
                    {article.keywords?.slice(0, 3).map((keyword) => (
                      <span key={keyword.keyword} className="badge badge-gray px-2 py-1 rounded">
                        #{keyword.keyword}
                      </span>
                    ))}
                  </div>

                  {article.editorNotes && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-900">
                      <p className="font-semibold mb-1">Editor Notes</p>
                      <p>{article.editorNotes}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-3">
                      <Link href={`/aviation-news/${article.slug}`} className="btn btn-primary px-5 py-2 text-sm font-semibold">
                        Read working draft
                      </Link>
                      {book && (
                        <Link href={`/books/${book.id}`} className="btn btn-outline px-5 py-2 text-sm font-semibold">
                          Explore {book.title}
                        </Link>
                      )}
                    </div>
                    {book && (
                      <div className="text-sm text-secondary">
                        Book spotlight:{' '}
                        <Link href={`/books/${book.id}`} className="text-accent-blue hover:underline">
                          {book.title}
                        </Link>{' '}
                        — {article.relatedBooks?.[0]?.reason || 'Direct research tie-in to this briefing.'}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mb-12 card p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
                    <div className="text-secondary text-sm">{event.location}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Conference'
                        ? 'badge badge-blue'
                        : event.type === 'Exhibition'
                        ? 'badge badge-purple'
                        : event.type === 'Lecture'
                        ? 'badge badge-green'
                        : 'badge badge-amber'
                    }`}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="text-muted text-sm mb-3">📅 {formatDate(event.date)}</div>

                <p className="text-secondary mb-3">{event.description}</p>

                {event.registrationUrl && (
                  <a href={event.registrationUrl} className="text-accent-blue hover:underline text-sm font-medium">
                    Register Now →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </BBCPageTemplate>
    </>
  )
}
