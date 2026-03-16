import { getAllPublishedNewsArticles } from '@/lib/newsroom'
import type { NewsArticleRecord } from '@/lib/newsroom'

function formatDate(iso: string | undefined): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getExcerpt(article: NewsArticleRecord, maxLength = 120): string {
  const raw = article.sections?.[0]?.content || ''
  const firstLine = raw
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length > 20 && !l.startsWith('-') && !l.startsWith('Daily digest'))
  const text = firstLine || raw.replace(/\n/g, ' ').trim() || article.title
  const plain = text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/_(.+?)_/g, '$1')
  return plain.length > maxLength ? `${plain.slice(0, maxLength).trim()}…` : plain
}

export default async function LatestAviationNews() {
  const articles = await getAllPublishedNewsArticles(3)

  if (articles.length === 0) {
    return (
      <section className="rounded-xl border border-white/15 bg-slate-800/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Latest aviation news</h2>
        <p className="text-white/60 text-sm">
          No briefings published yet. Check back soon for Scottish aviation news and research updates.
        </p>
        <a
          href="/aviation-news"
          className="mt-3 inline-block text-sm text-blue-300 hover:text-blue-200 underline"
        >
          Visit aviation news →
        </a>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-white/15 bg-slate-800/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Latest aviation news</h2>
        <a
          href="/aviation-news"
          className="text-sm text-blue-300 hover:text-blue-200 underline"
        >
          View all →
        </a>
      </div>
      <div className="space-y-4">
        {articles.map((article) => {
          const excerpt = getExcerpt(article)
          const dateStr = formatDate(article.createdAt)
          return (
            <a
              key={article.slug}
              href={`/aviation-news/${article.slug}`}
              className="block border border-white/10 rounded-lg p-4 bg-slate-900/60 hover:border-white/20 hover:bg-slate-800/70 transition-colors"
            >
              <h3 className="font-semibold text-white mb-1 line-clamp-2 hover:text-blue-200">
                {article.title}
              </h3>
              {dateStr && (
                <p className="text-xs text-white/50 mb-2">{dateStr}</p>
              )}
              <p className="text-white/70 text-sm line-clamp-2">{excerpt}</p>
            </a>
          )
        })}
      </div>
    </section>
  )
}
