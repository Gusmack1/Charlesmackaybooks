#!/usr/bin/env node
/**
 * Fix news articles: remove AI/editor instructions, set descriptive titles.
 * Run: node scripts/fix-news-articles.cjs
 */
const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.join(__dirname, '..', 'data', 'news-articles')

const EDITOR_NOTE = /\n*_Editors: verify figures\/details against the primary sources linked below before expanding this section to the full narrative length\._/g
const INSTRUCTION_PATTERNS = [
  /^Summarise the engineering, basing, and procurement implications/i,
  /^Connect them to Scottish industrial capacity/i,
  /^Relate the current developments back to Charles E\. MacKay/i,
  /^Draw on verified passages from the corresponding book/i,
  /^Explain why this news matters for contemporary Scottish aviation readers/i,
  /^Include a call-to-action linking to the relevant/i,
  /^Cite the relevant MOD transparency tables/i,
  /^For deeper context on Scottish aviation history.*explore the related titles/i,
]

function isInstructionOnly(content) {
  if (!content || content.trim().length < 20) return true
  const trimmed = content.trim()
  return INSTRUCTION_PATTERNS.some((p) => p.test(trimmed))
}

function slugToTitle(slug) {
  const match = slug.match(/^\d{4}-\d{2}-\d{2}-(.+)$/)
  const topic = match ? match[1] : slug
  return topic
    .replace(/-+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+$/, '')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
    .replace(/\bUk\b/g, 'UK')
    .replace(/\bHial\b/g, 'HIAL')
    .replace(/\bMod\b/g, 'MOD')
    .replace(/\bDft\b/g, 'DfT')
    .replace(/\bNerl\b/g, 'NERL')
    .replace(/\bPso\b/g, 'PSO')
}

function citationToTitle(citationText) {
  if (!citationText) return ''
  const idx = citationText.search(/\s[–-]\s/)
  return idx >= 0 ? citationText.slice(idx + 3).trim() : citationText
}

/** Derive SEO keywords from title and content for better search visibility. */
function deriveKeywords(article) {
  const text = [
    article.title || '',
    ...(article.sections || []).map((s) => s.content || ''),
  ].join(' ').toLowerCase()

  const knownTerms = [
    'HIAL', 'Highlands and Islands Airports', 'Dundee Airport', 'Loganair',
    'East West Rail', 'Oxford Cambridge', 'NERL', 'NATS', 'airspace',
    'MOD', 'Ministry of Defence', 'RAF', 'Royal Air Force', 'Typhoon',
    'Prestwick', 'Lossiemouth', 'Scottish aviation', 'aviation news',
    'airport', 'aircraft', 'aviation', 'Scotland', 'UK government',
  ]

  const seen = new Set(['Scottish aviation news', 'aviation news', 'Scottish aerospace industry'])
  const keywords = [
    { keyword: 'Scottish aviation news', primary: true },
    { keyword: 'aviation news', primary: false },
  ]

  for (const term of knownTerms) {
    const lower = term.toLowerCase()
    if (text.includes(lower) && !seen.has(term)) {
      seen.add(term)
      keywords.push({ keyword: term, primary: false })
    }
  }

  // Add title-derived keyword (first meaningful phrase, max 4 words)
  const titleWords = (article.title || '').split(/\s+/).filter((w) => w.length > 2).slice(0, 4)
  if (titleWords.length >= 2) {
    const titlePhrase = titleWords.join(' ')
    if (!seen.has(titlePhrase)) {
      seen.add(titlePhrase)
      keywords.push({ keyword: titlePhrase, primary: false })
    }
  }

  return keywords.slice(0, 8) // Cap at 8 for meta keywords
}

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

function fixArticle(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const article = JSON.parse(raw)

  const cleanSections = []
  for (const section of article.sections || []) {
    let content = (section.content || '').replace(EDITOR_NOTE, '').trim()
    if (isInstructionOnly(content)) continue
    if (content) {
      cleanSections.push({
        heading: section.heading === 'Operational Snapshot' ? 'Summary' : section.heading,
        content,
      })
    }
  }

  if (cleanSections.length === 0 && article.sections?.length > 0) {
    const first = article.sections[0]
    let content = (first.content || '').replace(EDITOR_NOTE, '').trim()
    const beforeNote = content.split('_Editors:')[0].trim()
    if (beforeNote) {
      cleanSections.push({ heading: 'Summary', content: beforeNote })
    }
  }

  let newTitle = slugToTitle(article.slug)
  const firstSource = article.sourceReferences?.[0]?.citationText
  if (firstSource) {
    const fromSource = citationToTitle(firstSource)
    if (fromSource && (newTitle.endsWith(' To T') || newTitle.endsWith(' He') || newTitle.endsWith(' Bo') || newTitle.endsWith(' La') || / Promot$| Maint$| Feedstock$/.test(newTitle))) {
      newTitle = fromSource
    }
  }
  const newKeywords = deriveKeywords({ ...article, sections: cleanSections.length ? cleanSections : article.sections, title: newTitle })
  const changed =
    JSON.stringify(article.sections) !== JSON.stringify(cleanSections) ||
    article.title !== newTitle ||
    JSON.stringify(article.keywords) !== JSON.stringify(newKeywords)

  article.sections = cleanSections.length ? cleanSections : article.sections
  article.title = newTitle
  article.keywords = newKeywords
  delete article.editorNotes

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2) + '\n', 'utf8')
    console.log(`Fixed: ${path.basename(filePath)} -> "${newTitle}"`)
  }
}

const files = listFiles(ARTICLES_DIR)
for (const f of files) fixArticle(f)
console.log(`Done. ${files.length} articles processed.`)
