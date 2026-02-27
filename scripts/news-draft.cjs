#!/usr/bin/env node

/**
 * Scottish Aviation News – Draft Builder (MVP)
 *
 * Reads queued NewsItems from data/news-queue.json and creates structured
 * article JSON files under data/news-articles/YYYY/MM/slug.json.
 *
 * At this stage the script:
 *   - groups the oldest 3 "new" queue entries into a single daily digest
 *   - generates section scaffolding with factual summaries and editor notes
 *   - links the draft to a relevant book slug (placeholder mapping)
 *
 * Editors must expand the sections to the required 3,000 words and enrich
 * them with images before publication. Future iterations will automate the
 * long-form expansion once the summarisation pipeline is in place.
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const QUEUE_FILE = path.join(DATA_DIR, 'news-queue.json')
const ARTICLES_DIR = path.join(DATA_DIR, 'news-articles')

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

/** Returns all book IDs that topically match the combined content (no limit, 100% keyword-based). */
function chooseBookIds(items) {
  const text = items.map((item) => `${item.title} ${item.summary}`.toLowerCase()).join(' ')
  const ids = new Set()
  if (text.includes('helicopter') || text.includes('rotor') || text.includes('sycamore')) ids.add('sycamore-seeds')
  if (text.includes('lossiemouth') || text.includes('typhoon') || text.includes('sabre')) ids.add('sabres-from-north')
  if (text.includes('prestwick') || text.includes('beardmore') || text.includes('argus')) ids.add('beardmore-aviation')
  if (text.includes('hial') || text.includes('wick airport') || text.includes('inverness airport') || text.includes('highland airport')) ids.add('clydeside-aviation-vol2')
  if (text.includes('glasgow') || text.includes('clyde') || text.includes('clydeside') || text.includes('weir ')) ids.add('clydeside-aviation-vol1')
  if (text.includes('vulcan') || text.includes('lightning') || text.includes('v-force') || text.includes('deterrent')) ids.add('sonic-to-standoff')
  if (text.includes('nuclear') || text.includes('atomic')) ids.add('birth-atomic-bomb')
  if (text.includes('aircraft carrier') || text.includes('naval aviation')) ids.add('aircraft-carrier-argus')
  if (text.includes('luftwaffe') || text.includes('german aircraft') || text.includes('me262') || text.includes('messerschmitt')) ids.add('this-was-the-enemy-volume-two')
  if (text.includes('spirit aero') || text.includes('aerospace') && text.includes('scotland')) ids.add('clydeside-aviation-vol2')
  if (ids.size === 0) ids.add('this-was-the-enemy-volume-two')
  return Array.from(ids)
}

function buildSections(items) {
  const paragraphs = items
    .map((item) => {
      const title = (item.title || '').trim()
      const summary = (item.summary || '').trim()
      if (!title && !summary) return null
      return summary ? `${title}. ${summary}` : title
    })
    .filter(Boolean)

  const summaryContent =
    paragraphs.length > 0
      ? paragraphs.join('\n\n')
      : 'Official releases from UK government and aviation bodies. Full citations are linked in the Sources section.'

  const hasAviation = /airspace|aviation|airport|aircraft|raf|mod|flight/i.test(paragraphs.join(' '))
  const contextContent = hasAviation
    ? 'These developments affect aviation connectivity, airspace management, and surface access to airports. Readers interested in Scottish aviation heritage may find parallels in the industrial and operational history documented in our research volumes.'
    : 'Transport and infrastructure decisions shape how passengers and freight reach Scottish and UK airports. For historical context on aviation infrastructure and industrial development, see the linked research volumes.'

  const furtherContent =
    'For deeper context on Scottish aviation history, industrial development, and operational heritage, explore the related titles in our catalogue. Each volume draws on archival research and primary sources.'

  return [
    { heading: 'Summary', content: summaryContent },
    { heading: 'Context', content: contextContent },
    { heading: 'Further reading', content: furtherContent },
  ]
}

function buildArticleRecord(items) {
  const today = formatDate()
  const slug = `${today}-${slugify(items[0].title).slice(0, 40) || 'scottish-aviation-briefing'}`
  const bookIds = chooseBookIds(items)
  const sections = buildSections(items)
  const wordCount = sections.reduce((sum, section) => sum + section.content.split(/\s+/).filter(Boolean).length, 0)

  return {
    slug,
    title: `Scottish Aviation Briefing – ${today}`,
    wordCount,
    editorNotes:
      'Expand each section to ≥3,000 words total, embed at least four approved images, and ensure every factual statement cites the referenced source.',
    sections,
    images: [],
    sourceReferences: items.map((item) => ({
      sourceId: item.sourceId,
      sourceUrl: item.sourceUrl,
      citationText: `${item.sourceId} – ${item.title}`,
    })),
    relatedBooks: bookIds.map((bookId) => ({ bookId, reason: 'Topical link between news items and catalogue research focus.' })),
    keywords: [
      { keyword: 'Scottish aviation news', primary: true },
      { keyword: 'Royal Air Force updates', primary: false },
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

  const pending = queue.filter((item) => item.status === 'new')
  if (!pending.length) {
    console.log('No new items to draft.')
    process.exit(0)
  }

  const batch = pending.slice(0, 3)
  const articleRecord = buildArticleRecord(batch)

  const articlePath = path.join(
    ARTICLES_DIR,
    articleRecord.createdAt.slice(0, 4),
    articleRecord.createdAt.slice(5, 7),
    `${articleRecord.slug}.json`
  )

  writeJson(articlePath, articleRecord)

  // Update queue statuses
  const updatedQueue = queue.map((item) => {
    const match = batch.find((entry) => entry.guid === item.guid && entry.sourceId === item.sourceId)
    if (!match) return item
    return {
      ...item,
      status: 'drafted',
      articleSlug: articleRecord.slug,
      articlePath: path.relative(ROOT_DIR, articlePath),
      draftedAt: new Date().toISOString(),
    }
  })

  writeJson(QUEUE_FILE, updatedQueue)

  console.log(`Draft created: ${path.relative(ROOT_DIR, articlePath)}`)
}

main()

