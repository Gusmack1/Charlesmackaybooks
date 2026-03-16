#!/usr/bin/env node
/**
 * Upgrade existing news articles from their primary source pages (no API keys).
 * - Fetches and extracts factual paragraphs from source URLs
 * - Uses domain-aware fallbacks for GOV.UK and BBC video pages
 * - Rebuilds 2-3 short sections without inventing facts
 */
const fs = require('fs')
const path = require('path')
const { chooseBookIdsFromText } = require('./news-relevance.cjs')

const ROOT_DIR = path.join(__dirname, '..')
const ARTICLES_DIR = path.join(ROOT_DIR, 'data', 'news-articles')
const USER_AGENT = 'CharlesMackayNewsBot/1.0 (+https://charlesmackaybooks.com/)'
const REQUEST_TIMEOUT_MS = 15000
const MIN_PARAGRAPH_CHARS = 60
const MAX_PARAGRAPH_CHARS = 900

const BLOCK_TAGS = /<\/?(p|div|section|article|main|h1|h2|h3|h4|h5|h6|li|ul|ol|blockquote|figure|figcaption|time|br|hr)[^>]*>/gi
const NOISE_PATTERNS = [
  /^skip to main content$/i,
  /^menu$/i,
  /^read more$/i,
  /^related topics$/i,
  /^related posts$/i,
  /^more on this story$/i,
  /^more in /i,
  /^more stories from/i,
  /^people powered politics$/i,
  /^join us today$/i,
  /^getty images$/i,
  /^image:/i,
  /^copyright /i,
  /^newsletter/i,
  /^sign up/i,
  /^share this/i,
  /^follow us/i,
  /^advertisement$/i,
  /^source:/i,
  /^this article is brought to you by our exclusive subscriber partnership/i,
  /^it does not necessarily reflect the view of the herald/i,
  /^\d+ comments?$/i,
  /^get involved with the news/i,
  /^send your news/i,
  /^piano meter debugger/i,
  /^share\b/i,
  /^save\b/i,
  /^\(image:.*\)$/i,
]

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const results = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) results.push(...listFiles(full))
    else if (name.endsWith('.json')) results.push(full)
  }
  return results
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function decodeHtmlEntities(input) {
  if (!input) return ''
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&ldquo;/gi, '"')
    .replace(/&rdquo;/gi, '"')
    .replace(/&mdash;/gi, '-')
    .replace(/&ndash;/gi, '-')
    .replace(/&hellip;/gi, '...')
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, '/')
}

function stripHtmlWithBreaks(input) {
  if (!input) return ''
  return decodeHtmlEntities(
    input
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(BLOCK_TAGS, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim()
  )
}

function countWords(text) {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

function cleanTitle(title) {
  return decodeHtmlEntities(title || '')
    .replace(/\s*[|\-]\s*(BBC News|Air Cargo News|Scottish Greens|The Scotsman|The National|Ayr Advertiser|Glasgow Times)\s*$/i, '')
    .replace(/\s*[|\-]\s*BBC\s*$/i, '')
    .trim()
}

function dedupe(values) {
  const seen = new Set()
  return values.filter((value) => {
    const key = value.toLowerCase().replace(/\s+/g, ' ').trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function normalizeForCompare(text) {
  return decodeHtmlEntities(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[|:–—-]+/g, ' ')
    .trim()
}

function isNoiseParagraph(text, minChars = MIN_PARAGRAPH_CHARS) {
  const cleaned = text.trim()
  if (!cleaned) return true
  if (cleaned.length < minChars || cleaned.length > MAX_PARAGRAPH_CHARS) return true
  if (NOISE_PATTERNS.some((pattern) => pattern.test(cleaned))) return true
  if (/^(facebook|twitter|x|instagram|linkedin)$/i.test(cleaned)) return true
  if (/^last updated/i.test(cleaned)) return true
  return false
}

function paragraphsFromText(text, options = {}) {
  const minChars = options.minChars ?? MIN_PARAGRAPH_CHARS
  return dedupe(
    text
      .split(/\n\s*\n/g)
      .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
      .filter((paragraph) => !isNoiseParagraph(paragraph, minChars))
  )
}

function sentenceSplit(text) {
  return (text.match(/[^.!?]+(?:[.!?]+|$)/g) || [])
    .map((sentence) => sentence.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function splitSingleParagraph(text) {
  const sentences = sentenceSplit(text)
  if (sentences.length < 2) return [text]
  const midpoint = Math.ceil(sentences.length / 2)
  return [sentences.slice(0, midpoint).join(' '), sentences.slice(midpoint).join(' ')]
}

function sectionHeadings(count) {
  if (count <= 1) return ['Summary']
  if (count === 2) return ['What happened', 'Key details']
  return ['What happened', 'Key details', 'Why it matters']
}

function chunkParagraphs(selected, sectionCount) {
  const totalWords = selected.reduce((sum, paragraph) => sum + countWords(paragraph), 0)
  const targetWords = Math.max(45, Math.ceil(totalWords / sectionCount))
  const groups = []
  let current = []
  let currentWords = 0

  for (const paragraph of selected) {
    current.push(paragraph)
    currentWords += countWords(paragraph)
    const remainingGroups = sectionCount - groups.length - 1
    const remainingParagraphs = selected.length - groups.reduce((sum, group) => sum + group.length, 0) - current.length
    if (
      groups.length < sectionCount - 1 &&
      currentWords >= targetWords &&
      remainingParagraphs >= remainingGroups
    ) {
      groups.push(current)
      current = []
      currentWords = 0
    }
  }

  if (current.length) groups.push(current)

  return groups
}

function buildSections(paragraphs, fallbackText) {
  let selected = []
  let selectedWords = 0

  for (const paragraph of paragraphs) {
    selected.push(paragraph)
    selectedWords += countWords(paragraph)
    if (selected.length >= 8 || (selectedWords >= 260 && selected.length >= 3)) {
      break
    }
  }

  if (selected.length === 0 && fallbackText) {
    selected = paragraphsFromText(fallbackText).slice(0, 4)
  }

  if (selected.length === 0) {
    return [{ heading: 'Summary', content: 'Source page available for additional detail.' }]
  }

  if (selected.length === 1) {
    selected = splitSingleParagraph(selected[0])
  }

  const totalWords = selected.reduce((sum, paragraph) => sum + countWords(paragraph), 0)
  const sectionCount = selected.length >= 3 && totalWords >= 135 ? 3 : 2
  const groups = chunkParagraphs(selected, Math.min(sectionCount, selected.length))

  const headings = sectionHeadings(groups.length)
  return groups
    .map((content, index) => ({
      heading: headings[index] || `Section ${index + 1}`,
      content: Array.isArray(content) ? content.join(' ').trim() : (content || '').trim(),
    }))
    .filter((section) => section.content)
}

function extractMetaContent(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([\\s\\S]*?)["'][^>]+property=["']${escaped}["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([\\s\\S]*?)["'][^>]+name=["']${escaped}["'][^>]*>`, 'i'),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return decodeHtmlEntities(match[1]).trim()
  }
  return ''
}

function extractDocumentTitle(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return cleanTitle(stripHtmlWithBreaks(titleMatch?.[1] || ''))
}

function extractBbcReadMoreUrl(html, sourceUrl) {
  const absoluteMatch = html.match(/https?:\/\/www\.bbc\.(?:co\.uk|com)\/news\/articles\/[a-z0-9]+/i)
  if (absoluteMatch?.[0]) return absoluteMatch[0]

  const relativeMatch = html.match(/href=["'](\/news\/articles\/[a-z0-9]+)["']/i)
  if (!relativeMatch?.[1]) return null

  const source = new URL(sourceUrl)
  return `${source.protocol}//${source.hostname}${relativeMatch[1]}`
}

function collectJsonLdCandidates(value, output = []) {
  if (!value) return output
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonLdCandidates(item, output))
    return output
  }
  if (typeof value === 'object') {
    output.push(value)
    Object.values(value).forEach((child) => {
      if (child && typeof child === 'object') {
        collectJsonLdCandidates(child, output)
      }
    })
  }
  return output
}

function extractJsonLdParagraphs(html) {
  const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const paragraphs = []
  let title = ''

  for (const match of matches) {
    const raw = match[1].trim()
    if (!raw) continue

    try {
      const parsed = JSON.parse(raw)
      const candidates = collectJsonLdCandidates(parsed, [])
      for (const candidate of candidates) {
        if (!title && typeof candidate?.headline === 'string') {
          title = cleanTitle(candidate.headline)
        }
        if (typeof candidate?.articleBody === 'string') {
          paragraphs.push(...paragraphsFromText(stripHtmlWithBreaks(candidate.articleBody)))
        }
        if (typeof candidate?.description === 'string') {
          paragraphs.push(candidate.description.trim())
        }
      }
    } catch {
      // Ignore malformed JSON-LD blocks.
    }
  }

  return {
    title,
    paragraphs: dedupe(paragraphs.filter((paragraph) => !isNoiseParagraph(paragraph))),
  }
}

function collectGovUkText(value, options = {}, parentKey = '') {
  const results = []
  const allowedKeys = new Set([
    'body',
    'title',
    'description',
    'summary',
    'caption',
    'label',
    'name',
    'display_title',
    'change_note',
    'text',
  ])

  const walk = (node, key = '') => {
    if (!node) return
    if (typeof node === 'string') {
      if (!key || allowedKeys.has(key)) results.push(node)
      return
    }
    if (Array.isArray(node)) {
      node.forEach((item) => walk(item, key))
      return
    }
    if (typeof node === 'object') {
      for (const [childKey, childValue] of Object.entries(node)) {
        walk(childValue, childKey)
      }
    }
  }

  walk(value, parentKey)
  return results
}

function buildAaibMetadataParagraph(metadata = {}) {
  const parts = []
  if (metadata.aircraft_type) parts.push(`The AAIB record identifies the aircraft as a ${metadata.aircraft_type}.`)
  if (metadata.registration) parts.push(`The registration listed is ${metadata.registration}.`)
  if (metadata.location) parts.push(`The occurrence location is given as ${metadata.location}.`)
  if (metadata.date_of_occurrence) parts.push(`The date of occurrence is recorded as ${metadata.date_of_occurrence}.`)
  if (metadata.report_type) parts.push(`The report type is ${metadata.report_type}.`)
  if (metadata.aircraft_category) parts.push(`The aircraft category is ${metadata.aircraft_category}.`)
  return parts.join(' ')
}

async function fetchText(url, accept) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': USER_AGENT,
        accept: accept || 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return response.text()
  } finally {
    clearTimeout(timer)
  }
}

async function fetchGovUkArticle(sourceUrl) {
  const { pathname } = new URL(sourceUrl)
  const apiUrl = `https://www.gov.uk/api/content${pathname}`
  const raw = await fetchText(apiUrl, 'application/json')
  const data = JSON.parse(raw)
  const title = cleanTitle(data.title || '')
  const textParts = []

  if (data.description) {
    textParts.push(data.description)
  }

  if (typeof data.details?.body === 'string') {
    textParts.push(stripHtmlWithBreaks(data.details.body))
  }

  for (const part of data.details?.parts || []) {
    if (part?.title) textParts.push(part.title)
    if (part?.body) textParts.push(stripHtmlWithBreaks(part.body))
  }

  textParts.push(...collectGovUkText(data.details?.documents))
  textParts.push(...collectGovUkText(data.details?.featured_attachments))
  textParts.push(...collectGovUkText(data.details?.attachments))
  textParts.push(...collectGovUkText(data.details?.child_section_groups))
  textParts.push(...collectGovUkText(data.details?.collection_groups))
  textParts.push(...collectGovUkText(data.links?.documents))

  const aaibParagraph = buildAaibMetadataParagraph(data.details?.metadata)
  if (aaibParagraph) {
    textParts.push(aaibParagraph)
  }

  return {
    title,
    paragraphs: paragraphsFromText(textParts.join('\n\n'), { minChars: 25 }),
    method: 'govuk-api',
  }
}

async function fetchHtmlArticle(sourceUrl) {
  const html = await fetchText(sourceUrl)
  const url = new URL(sourceUrl)

  if (/bbc\.(co\.uk|com)$/i.test(url.hostname) && /\/news\/videos\//i.test(url.pathname)) {
    const linkedArticle = extractBbcReadMoreUrl(html, sourceUrl)
    if (linkedArticle) {
      return fetchHtmlArticle(linkedArticle)
    }
  }

  const jsonLd = extractJsonLdParagraphs(html)
  const articleBlock =
    html.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
    html.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
    html

  const metaDescription = extractMetaContent(html, 'description') || extractMetaContent(html, 'og:description')
  const title = jsonLd.title || cleanTitle(extractMetaContent(html, 'og:title')) || extractDocumentTitle(html)
  const textParagraphs = paragraphsFromText(stripHtmlWithBreaks(articleBlock))
  const fullPageParagraphs = countWords(textParagraphs.join(' ')) < 180 ? paragraphsFromText(stripHtmlWithBreaks(html)) : []
  const titleKey = normalizeForCompare(title)
  const metaKey = normalizeForCompare(metaDescription)
  const paragraphs = dedupe([
    ...(metaDescription && !isNoiseParagraph(metaDescription) ? [metaDescription] : []),
    ...jsonLd.paragraphs,
    ...textParagraphs,
    ...fullPageParagraphs,
  ]).filter((paragraph) => {
    const key = normalizeForCompare(paragraph)
    if (!key) return false
    if (titleKey && key === titleKey) return false
    if (metaKey && key === metaKey) return false
    if (titleKey && key.startsWith(titleKey) && key.includes('|')) return false
    return true
  })

  return {
    title,
    paragraphs,
    method: 'html',
  }
}

async function extractSourceArticle(sourceUrl) {
  const hostname = new URL(sourceUrl).hostname.replace(/^www\./, '')
  if (hostname === 'gov.uk') {
    return fetchGovUkArticle(sourceUrl)
  }
  return fetchHtmlArticle(sourceUrl)
}

async function rewriteArticle(filePath, dryRun) {
  const article = readJson(filePath)
  const primarySource = article.sourceReferences?.[0]
  if (!primarySource?.sourceUrl) {
    console.log(`Skip (no source): ${path.basename(filePath)}`)
    return { status: 'skip' }
  }

  const fallbackText = (article.sections || []).map((section) => section.content || '').join('\n\n')

  try {
    const extracted = await extractSourceArticle(primarySource.sourceUrl)
    const sections = buildSections(extracted.paragraphs, fallbackText)
    const nextTitle = extracted.title || article.title
    const textForBooks = `${nextTitle} ${sections.map((section) => section.content).join(' ')}`
    const nextArticle = {
      ...article,
      title: nextTitle,
      sections,
      sourceReferences: [primarySource],
      relatedBooks: chooseBookIdsFromText(textForBooks).map((bookId) => ({
        bookId,
        reason: 'Related research volume',
      })),
    }
    nextArticle.wordCount = sections.reduce((sum, section) => sum + countWords(section.content), 0)

    const currentWordCount = article.wordCount || countWords(fallbackText)
    if (
      (currentWordCount >= 180 && nextArticle.wordCount < currentWordCount) ||
      (currentWordCount >= 90 && nextArticle.wordCount < 90)
    ) {
      console.log(`Keep current (${currentWordCount} words): ${path.basename(filePath)}`)
      return { status: 'skip' }
    }

    if (dryRun) {
      console.log(`[DRY] ${path.basename(filePath)} -> ${nextArticle.wordCount} words (${extracted.method})`)
      return { status: 'dry' }
    }

    writeJson(filePath, nextArticle)
    console.log(`Upgraded: ${path.basename(filePath)} -> ${nextArticle.wordCount} words (${extracted.method})`)
    return { status: 'updated' }
  } catch (error) {
    console.log(`Skip (${error.message}): ${path.basename(filePath)}`)
    return { status: 'skip' }
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const slugFilters = process.argv
    .filter((arg) => arg.startsWith('--slug='))
    .map((arg) => arg.slice('--slug='.length))
    .filter(Boolean)

  const files = listFiles(ARTICLES_DIR).filter((file) => {
    if (!slugFilters.length) return true
    const normalized = file.replace(/\\/g, '/')
    return slugFilters.some((slug) => normalized.includes(slug))
  })

  console.log(`Found ${files.length} articles. ${dryRun ? '(Dry run - no changes)' : ''}\n`)

  let updated = 0
  let skipped = 0

  for (const file of files) {
    const result = await rewriteArticle(file, dryRun)
    if (result.status === 'updated' || result.status === 'dry') updated += 1
    if (result.status === 'skip') skipped += 1
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
