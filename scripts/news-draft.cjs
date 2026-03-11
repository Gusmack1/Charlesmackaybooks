#!/usr/bin/env node

/**
 * Scottish Aviation News – Draft Builder
 *
 * Reads queued NewsItems from data/news-queue.json and creates structured
 * article JSON files under data/news-articles/YYYY/MM/slug.json.
 *
 * Creates ONE article per news item (focused, coherent) – no bundling of
 * unrelated stories. Each article has a clear narrative tied to Scottish
 * aviation or UK aviation where relevant.
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const { hasStrongAviationContext, chooseBookIdsFromText } = require('./news-relevance.cjs')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const QUEUE_FILE = path.join(DATA_DIR, 'news-queue.json')
const ARTICLES_DIR = path.join(DATA_DIR, 'news-articles')

/** Source priority for picking best article when multiple cover same topic. Higher = prefer. */
const SOURCE_PRIORITY = {
  'bbc-scotland': 10,
  'bbc-uk': 9,
  'flightglobal': 8,
  'hial-airports': 7,
  'raf-mod-uk': 6,
  'mod-press-office': 6,
  'aaib-bulletins': 5,
  'dft-press-office': 5,
  'caa-gov-uk': 5,
  'serper-scottish-aviation': 4,
  'scotsman-news': 5,
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return fallback
    throw error
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0]
}

/** Build a single focused section from one news item. */
function buildSections(item) {
  const title = (item.title || '').trim()
  const summary = (item.summary || '').trim()
  const content = summary ? `${title}. ${summary}` : title
  if (!content) return [{ heading: 'Summary', content: 'Official release. Full details available from the source.' }]
  return [{ heading: 'Summary', content }]
}

function buildArticleRecord(item) {
  const today = formatDate()
  const slug = `${today}-${slugify(item.title).slice(0, 50) || 'scottish-aviation-briefing'}`
  const bookIds = chooseBookIdsFromText(`${item.title} ${item.summary || ''}`)
  const sections = buildSections(item)
  const wordCount = sections.reduce((sum, section) => sum + section.content.split(/\s+/).filter(Boolean).length, 0)

  return {
    slug,
    title: item.title,
    wordCount,
    sections,
    images: [],
    sourceReferences: [
      {
        sourceId: item.sourceId,
        sourceUrl: item.sourceUrl,
        citationText: `${item.sourceId} – ${item.title}`,
      },
    ],
    relatedBooks: bookIds.map((bookId) => ({ bookId, reason: 'Related research volume' })),
    keywords: [
      { keyword: 'Scottish aviation news', primary: true },
      { keyword: 'aviation news', primary: false },
      { keyword: 'Scottish aerospace industry', primary: false },
    ],
    status: 'published',
    createdAt: new Date().toISOString(),
  }
}

function main() {
  const queue = readJson(QUEUE_FILE, [])
  if (!queue.length) {
    console.log('Queue is empty. Run news:ingest first.')
    process.exit(0)
  }

  const pending = queue
    .filter((item) => item.status === 'new')
    .filter((item) => hasStrongAviationContext(`${item.title} ${item.summary || ''}`))
    .filter((item) => {
      const bookIds = chooseBookIdsFromText(`${item.title} ${item.summary || ''}`)
      if (bookIds.length === 0) {
        console.log(`Skip (no relevant book): ${item.title?.slice(0, 60)}...`)
        return false
      }
      return true
    })
  if (!pending.length) {
    console.log('No new aviation-related items with a relevant book to promote.')
    process.exit(0)
  }

  const sorted = pending.sort((a, b) => (SOURCE_PRIORITY[b.sourceId] ?? 0) - (SOURCE_PRIORITY[a.sourceId] ?? 0))
  const batch = sorted.slice(0, 5)
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  for (const item of batch) {
    const articleRecord = buildArticleRecord(item)
    const articlePath = path.join(ARTICLES_DIR, year, month, `${articleRecord.slug}.json`)
    writeJson(articlePath, articleRecord)

    const idx = queue.findIndex((q) => q.guid === item.guid && q.sourceId === item.sourceId)
    if (idx >= 0) {
      queue[idx] = {
        ...queue[idx],
        status: 'drafted',
        articleSlug: articleRecord.slug,
        articlePath: path.relative(ROOT_DIR, articlePath),
        draftedAt: now.toISOString(),
      }
    }
    console.log(`Draft created: ${path.relative(ROOT_DIR, articlePath)}`)
  }

  writeJson(QUEUE_FILE, queue)

  if (batch.length > 0) {
    const { execSync } = require('child_process')
    execSync('node scripts/fix-news-articles.cjs', { cwd: ROOT_DIR, stdio: 'inherit' })
  }
}

main()

