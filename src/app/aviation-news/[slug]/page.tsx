import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import UnifiedSchema from '@/components/UnifiedSchema'
import { books } from '@/data/books'
import { getNewsArticleBySlug, getPublishedNewsArticles } from '@/lib/newsroom'

const BASE_URL = 'https://charlesmackaybooks.com'
const FALLBACK_IMAGE = '/charles-mackay-aviation-historian.jpg'
const bookMap = new Map(books.map((book) => [book.id, book]))

function displayReason(reason: string | undefined): string | null {
  const generic = 'Topical link between news items and catalogue research focus.'
  if (!reason || reason === generic) return null
  return reason
}

function normalizeText(value: string) {
  return value.replace(/\*\*/g, '').replace(/_/g, '').replace(/\s+/g, ' ').trim()
}

function buildDescription(raw?: string, fallback?: string) {
  const cleaned = normalizeText(raw || fallback || '')
  if (!cleaned) return 'Scottish aviation briefing with source-backed analysis and book tie-ins.'
  if (cleaned.length <= 160) return cleaned
  return `${cleaned.slice(0, 157)}...`
}

function formatDate(iso: string | undefined) {
  if (!iso) return 'Date pending'
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function splitSectionContent(content: string) {
  const lines = content.split('\n').map((line) => line.trim()).filter(Boolean)
  return {
    paragraphs: lines.filter((line) => !line.startsWith('-')),
    bullets: lines.filter((line) => line.startsWith('-')).map((line) => line.replace(/^-+\s*/, '')),
  }
}

export async function generateStaticParams() {
  const articles = await getPublishedNewsArticles(500)
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article || article.status === 'draft') {
    return {
      title: 'Briefing not found | Charles E. MacKay',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const primaryBook = article.relatedBooks?.[0] ? bookMap.get(article.relatedBooks[0].bookId) : undefined
  const image = primaryBook?.imageUrl || FALLBACK_IMAGE
  const description = buildDescription(article.sections?.[0]?.content, article.title)
  const canonical = `${BASE_URL}/aviation-news/${article.slug}`

  return {
    title: `${article.title} | Scottish Aviation Briefing`,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: `${article.title} | Scottish Aviation Briefing`,
      description,
      type: 'article',
      url: canonical,
      siteName: 'Charles Mackay Books',
      images: [
        {
          url: image,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function AviationNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article || article.status === 'draft') {
    notFound()
  }

  const description = buildDescription(article.sections?.[0]?.content, article.title)
  const relatedBooks = (article.relatedBooks || [])
    .map((entry) => {
      const book = bookMap.get(entry.bookId)
      if (!book) return null
      return {
        ...book,
        reason: entry.reason,
      }
    })
    .filter((book): book is NonNullable<typeof book> => book !== null)

  return (
    <BBCPageTemplate
      title={article.title}
      subtitle={description}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Aviation News', href: '/aviation-news' },
        { label: article.title },
      ]}
    >
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={article.title}
        pageDescription={description}
        pageUrl={`/aviation-news/${article.slug}`}
        pageImageUrl={relatedBooks[0]?.imageUrl || FALLBACK_IMAGE}
      />

      <div className="max-w-4xl mx-auto px-6 py-2 space-y-8 bg-slate-900">
        <article className="card p-6 md:p-8 space-y-6">
          <header className="space-y-3">
            <p className="text-sm text-white/70">{formatDate(article.createdAt)}</p>
            {article.keywords?.length ? (
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span key={keyword.keyword} className="badge badge-gray">
                    #{keyword.keyword}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <section className="space-y-6">
            {(article.sections || []).map((section, idx) => {
              const { paragraphs, bullets } = splitSectionContent(section.content || '')
              return (
                <section key={`${section.heading}-${idx}`} className="space-y-3">
                  <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
                  {paragraphs.map((line, lineIdx) => (
                    <p key={`${idx}-p-${lineIdx}`} className="text-white/85 leading-relaxed">
                      {normalizeText(line)}
                    </p>
                  ))}
                  {bullets.length ? (
                    <ul className="list-disc list-inside space-y-2 text-white/85">
                      {bullets.map((bullet, bulletIdx) => (
                        <li key={`${idx}-b-${bulletIdx}`}>{normalizeText(bullet)}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              )
            })}
          </section>

          {article.sourceReferences?.length ? (
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Sources</h3>
              <ol className="list-decimal list-inside space-y-2 text-white/80">
                {article.sourceReferences.map((source) => (
                  <li key={`${source.sourceId}-${source.sourceUrl}`}>
                    <a
                      href={source.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 hover:underline"
                    >
                      {source.citationText}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </article>

        {relatedBooks.length ? (
          <section className="card p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white">Related reading</h3>
            <p className="text-white/80 text-sm">
              For deeper context on the topics in this briefing, explore our research volumes.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedBooks.map((book) => {
                const reason = displayReason(book.reason)
                return (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="border border-white/15 rounded-lg p-4 bg-slate-800/60 hover:border-white/35 transition-colors flex gap-4"
                  >
                    <div className="shrink-0 w-24 aspect-[3/4] rounded overflow-hidden bg-slate-700">
                      <Image
                        src={book.imageUrl || `/book-covers/${book.id}.jpg`}
                        alt={book.title}
                        width={96}
                        height={128}
                        className="w-full h-full object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white mb-1">{book.title}</div>
                      <div className="text-sm text-white/80 mb-2">£{book.price.toFixed(2)}</div>
                      {reason ? <p className="text-sm text-white/75">{reason}</p> : null}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}
      </div>
    </BBCPageTemplate>
  )
}
