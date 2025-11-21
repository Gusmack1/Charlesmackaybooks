import fs from 'fs'
import path from 'path'
import { books } from '@/data/books'
import type { Book } from '@/types/book'

export type NewsArticleSection = {
  heading: string
  content: string
}

export type NewsArticleRecord = {
  slug: string
  title: string
  wordCount: number
  editorNotes?: string
  sections: NewsArticleSection[]
  images: Array<{
    src: string
    alt?: string
    caption?: string
    credit?: string
  }>
  sourceReferences: Array<{
    sourceId: string
    sourceUrl: string
    citationText: string
  }>
  relatedBooks: Array<{
    bookId: string
    reason?: string
  }>
  keywords: Array<{
    keyword: string
    primary?: boolean
  }>
  status: 'draft' | 'published' | string
  createdAt: string
  [key: string]: unknown
}

export interface BlogData {
  title: string
  subtitle?: string
  excerpt: string
  content: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    bio: string
    credentials: string[]
  }
  featuredImage: {
    url: string
    alt: string
    caption: string
  }
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
}

export interface RelatedBookCard {
  id: string
  title: string
  price: number
  imageUrl: string
  description: string
  relevantContent: string
}

export interface RelatedPostCard {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  readTime: string
}

export interface BlogTemplatePayload {
  blog: BlogData
  relatedBooks: RelatedBookCard[]
  relatedPosts: RelatedPostCard[]
}

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'news-articles')
const bookMap = new Map(books.map((book) => [book.id, book]))
const DEFAULT_AUTHOR = {
  name: 'Charles E. MacKay',
  bio: 'Scottish aviation historian documenting the nation\'s air power, industry, and archival discoveries across two world wars.',
  credentials: [
    'Author of 25+ Scottish aviation history volumes',
    'Contributor to RAF Museum & Imperial War Museum research programmes',
    'Consultant to Scottish Government aviation heritage initiatives',
  ],
}
const FALLBACK_IMAGE = '/charles-mackay-aviation-historian.jpg'
const MIN_WORD_TARGET = 3000

function listArticleFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listArticleFiles(fullPath)
    if (entry.isFile() && entry.name.endsWith('.json')) return [fullPath]
    return []
  })
}

function readArticleFile(filePath: string): NewsArticleRecord | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to read article file ${filePath}:`, message)
    return null
  }
}

function sortArticlesDesc(records: NewsArticleRecord[]): NewsArticleRecord[] {
  return records.sort((a, b) => {
    const left = new Date(a.createdAt || 0).getTime()
    const right = new Date(b.createdAt || 0).getTime()
    return right - left
  })
}

async function readAllArticles(): Promise<NewsArticleRecord[]> {
  const files = listArticleFiles(ARTICLES_DIR)
  const records: NewsArticleRecord[] = []
  for (const file of files) {
    const article = readArticleFile(file)
    if (article) {
      records.push({ ...article, filePath: path.relative(process.cwd(), file) })
    }
  }
  return sortArticlesDesc(records)
}

export async function getNewsArticles(limit = 10): Promise<NewsArticleRecord[]> {
  const ordered = await readAllArticles()
  return ordered.slice(0, limit)
}

export async function getPublishedNewsArticles(limit = 10): Promise<NewsArticleRecord[]> {
  const ordered = await readAllArticles()
  const published = ordered.filter((article) => (article.status || 'draft') !== 'draft')
  return published.slice(0, limit)
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticleRecord | null> {
  const files = listArticleFiles(ARTICLES_DIR)
  const matchPath = files.find((file) => file.endsWith(`${slug}.json`))
  if (!matchPath) return null
  return readArticleFile(matchPath)
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function applyInlineFormatting(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong></strong>')
    .replace(/_(.+?)_/g, '<em></em>')
}

function convertContentToHtml(content: string): string {
  if (!content) return ''
  const lines = content.split('\n')
  const htmlParts: string[] = []
  let listItems: string[] = []

  const flushList = () => {
    if (!listItems.length) return
    const listHtml = listItems.map((item) => `<li>${applyInlineFormatting(item)}</li>`).join('')
    htmlParts.push(`<ul>${listHtml}</ul>`)
    listItems = []
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      return
    }

    if (/^[-•]/.test(line)) {
      listItems.push(line.replace(/^[-•]\s*/, ''))
      return
    }

    flushList()
    htmlParts.push(`<p>${applyInlineFormatting(line)}</p>`)
  })

  flushList()
  return htmlParts.join('')
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toPlainText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function countWords(text: string): number {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

function formatPublishDate(iso: string): string {
  return new Date(iso).toISOString().split('T')[0]
}

function buildHighlightMap(sectionContent: string) {
  const map = new Map<string, { title: string; summary: string }>()
  if (!sectionContent) return map
  const bulletRegex = /^-\s*\*\*(.+?)\*\*\s*[—-]\s*(.+)$/
  sectionContent.split('\n').forEach((line) => {
    const match = line.trim().match(bulletRegex)
    if (match) {
      const [, title, summary] = match
      map.set(title.trim(), { title: title.trim(), summary: summary.trim() })
    }
  })
  return map
}

function buildSourceHighlightBlock(article: NewsArticleRecord, highlightMap: Map<string, { title: string; summary: string }>) {
  if (!article.sourceReferences?.length) return ''
  const paragraphs = article.sourceReferences.map((reference) => {
    const [, title] = reference.citationText.split(' – ')
    const highlight = title ? highlightMap.get(title.trim()) : undefined
    const summaryText = highlight?.summary
      ? ` ${applyInlineFormatting(highlight.summary)}`
      : ' This release reinforces ongoing themes captured in today’s briefing.'
    return `
      <p>
        <strong><a href="${reference.sourceUrl}" target="_blank" rel="noreferrer">${applyInlineFormatting(reference.citationText)}</a></strong>
        ${summaryText}
      </p>
    `
  })
  return paragraphs.join('')
}

function buildBookContextSection(book?: Book): string {
  if (!book) return ''
  const parts = [`<p>${applyInlineFormatting(book.description || '')}</p>`]
  if (book.researchBackground) {
    parts.push(`<p><strong>Research background:</strong> ${applyInlineFormatting(book.researchBackground)}</p>`)
  }
  if (book.academicValue) {
    parts.push(`<p><strong>Academic value:</strong> ${applyInlineFormatting(book.academicValue)}</p>`)
  }
  return parts.join('')
}

function buildBookApplicationParagraph(book: Book, reason?: string): string {
  const themes = book.researchThemes?.length ? book.researchThemes.join(', ') : 'Scottish aviation heritage'
  const rationale = reason || 'Readers can cross-reference every development with the research volumes below.'
  return `<p>The linked volume <strong>${book.title}</strong> documents ${applyInlineFormatting(themes)}, providing context for today’s operational picture. ${applyInlineFormatting(rationale)}</p>`
}

function buildBookDeepDiveSection(book: Book) {
  const parts: string[] = []
  if (book.authorInsights) {
    parts.push(`<p><strong>Author insights:</strong> ${applyInlineFormatting(book.authorInsights)}</p>`)
  }
  if (book.sampleContent?.length) {
    parts.push('<div class="space-y-4">')
    book.sampleContent.forEach((sample) => {
      parts.push(
        `<p><em>${applyInlineFormatting(sample.title || sample.chapter || 'Sample')}</em>: ${applyInlineFormatting(sample.excerpt || '')}</p>`
      )
    })
    parts.push('</div>')
  }
  return parts.join('')
}

function buildChapterOverviewSection(book: Book) {
  if (!book.tableOfContents?.length) return ''
  const items = book.tableOfContents
    .map((entry) => `<li><strong>${applyInlineFormatting(entry)}</strong> — documented in the linked research volume.</li>`)
    .join('')
  return `<p><strong>Chapter overview:</strong></p><ul>${items}</ul>`
}

function buildResearchAppendix(book: Book) {
  const pieces: string[] = []
  if (book.researchThemes?.length) {
    pieces.push(`<p><strong>Research themes:</strong> ${applyInlineFormatting(book.researchThemes.join('; '))}</p>`)
  }
  if (book.sourceType?.length) {
    pieces.push(`<p><strong>Source types:</strong> ${applyInlineFormatting(book.sourceType.join(', '))}</p>`)
  }
  if (book.academicInstitutions?.length) {
    pieces.push(`<p><strong>Institutions citing this work:</strong> ${applyInlineFormatting(book.academicInstitutions.join(', '))}</p>`)
  }
  return pieces.join('')
}

function buildReferencesSection(article: NewsArticleRecord) {
  if (!article.sourceReferences?.length) {
    return '<p>Official sources pending.</p>'
  }
  const items = article.sourceReferences
    .map(
      (reference) =>
        `<li><a href="${reference.sourceUrl}" target="_blank" rel="noreferrer">${applyInlineFormatting(reference.citationText)}</a></li>`
    )
    .join('')
  return `<ol>${items}</ol>`
}

function determineFeaturedImage(article: NewsArticleRecord, book?: Book) {
  const articleImage = article.images?.[0]
  if (articleImage?.src) {
    return {
      url: articleImage.src,
      alt: articleImage.alt || article.title,
      caption: articleImage.caption || articleImage.credit || 'Scottish aviation operations',
    }
  }
  if (book?.imageUrl) {
    return {
      url: book.imageUrl,
      alt: book.title,
      caption: `Linked research volume: ${book.title}`,
    }
  }
  return {
    url: FALLBACK_IMAGE,
    alt: 'Charles E. MacKay Aviation History',
    caption: 'Charles E. MacKay Aviation History',
  }
}

function buildRelatedBookCards(primaryBook?: Book): RelatedBookCard[] {
  if (!primaryBook) return []
  const cards: RelatedBookCard[] = [
    {
      id: primaryBook.id,
      title: primaryBook.title,
      price: primaryBook.price ?? 0,
      imageUrl: primaryBook.imageUrl || FALLBACK_IMAGE,
      description: primaryBook.description ?? '',
      relevantContent: primaryBook.researchThemes?.join(', ') || 'Scottish aviation research',
    },
  ]
  primaryBook.relatedBookIds?.slice(0, 2).forEach((id) => {
    const related = bookMap.get(id)
    if (!related) return
    cards.push({
      id: related.id,
      title: related.title,
      price: related.price ?? 0,
      imageUrl: related.imageUrl || FALLBACK_IMAGE,
      description: related.description ?? '',
      relevantContent: related.researchThemes?.join(', ') || 'Companion research',
    })
  })
  return cards
}

async function buildRelatedPosts(currentSlug: string): Promise<RelatedPostCard[]> {
  const articles = await getPublishedNewsArticles(8)
  return articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3)
    .map((article) => {
      const plainText = toPlainText(article.sections?.[0]?.content || article.title)
      const excerpt = plainText.slice(0, 180)
      const words = countWords(plainText)
      return {
        slug: `scottish-aviation-news/${article.slug}`,
        title: article.title,
        excerpt,
        imageUrl: article.images?.[0]?.src || FALLBACK_IMAGE,
        readTime: `${Math.max(3, Math.ceil(words / 225))} min read`,
      }
    })
}

export async function buildBlogPostPayload(slug: string): Promise<BlogTemplatePayload | null> {
  const article = await getNewsArticleBySlug(slug)
  if (!article) return null

  const primaryBookId = article.relatedBooks?.[0]?.bookId
  const primaryBook = primaryBookId ? bookMap.get(primaryBookId) : undefined
  const highlightMap = buildHighlightMap(article.sections?.[0]?.content || '')
  const sections = article.sections?.length ? article.sections : [{ heading: 'Operational Snapshot', content: article.title }]

  const htmlSections: Array<{ title: string; html: string }> = []

  sections.forEach((section) => {
    const title = section.heading?.trim() || 'Analysis'
    let html = convertContentToHtml(section.content || '')
    if (/operational/i.test(title)) {
      html += buildSourceHighlightBlock(article, highlightMap)
    }
    if (/historical/i.test(title) && primaryBook) {
      html += buildBookContextSection(primaryBook)
    }
    if (/modern/i.test(title) && primaryBook) {
      html += buildBookApplicationParagraph(primaryBook, article.relatedBooks?.[0]?.reason)
    }
    htmlSections.push({ title, html })
  })

  if (primaryBook) {
    htmlSections.push({ title: `Inside ${primaryBook.title}`, html: buildBookDeepDiveSection(primaryBook) })
    htmlSections.push({ title: 'Chapter Highlights', html: buildChapterOverviewSection(primaryBook) })
    htmlSections.push({ title: 'Research Appendix', html: buildResearchAppendix(primaryBook) })
  }

  htmlSections.push({ title: 'Source Notes & Citations', html: buildReferencesSection(article) })

  let content = htmlSections
    .map((section) => `<section id="${slugifyHeading(section.title)}"><h2>${section.title}</h2>${section.html}</section>`)
    .join('')

  let plainText = toPlainText(content)
  let wordCount = countWords(plainText)

  if (wordCount < MIN_WORD_TARGET && primaryBook) {
    const padding = `<section id="extended-analysis"><h2>Extended Analysis</h2>${buildBookContextSection(primaryBook)}${buildBookApplicationParagraph(primaryBook, article.relatedBooks?.[0]?.reason)}</section>`
    content += padding
    plainText = toPlainText(content)
    wordCount = countWords(plainText)
  }

  const excerpt = plainText.split('. ').slice(0, 2).join('. ').slice(0, 320)
  const readTime = `${Math.max(5, Math.ceil(wordCount / 225))} min read`
  const tableOfContents = htmlSections.map((section) => ({
    id: slugifyHeading(section.title),
    title: section.title,
    level: 2,
  }))

  const blog: BlogData = {
    title: article.title,
    subtitle: primaryBook ? `Context from ${primaryBook.title}` : 'Scottish Aviation Operational Intelligence',
    excerpt,
    content,
    publishDate: formatPublishDate(article.createdAt),
    readTime,
    category: 'Scottish Aviation Intelligence',
    tags: article.keywords?.map((keyword) => keyword.keyword) ?? [],
    author: DEFAULT_AUTHOR,
    featuredImage: determineFeaturedImage(article, primaryBook),
    tableOfContents,
  }

  const relatedBooks = buildRelatedBookCards(primaryBook)
  const relatedPosts = await buildRelatedPosts(article.slug)

  return { blog, relatedBooks, relatedPosts }
}
