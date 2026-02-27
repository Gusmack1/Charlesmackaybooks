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

function chooseBookId(items) {
  const text = items.map((item) => `${item.title} ${item.summary}`.toLowerCase()).join(' ')
  if (text.includes('helicopter') || text.includes('rotor')) return 'sycamore-seeds'
  if (text.includes('lossiemouth') || text.includes('raf')) return 'sabres-from-north'
  if (text.includes('prestwick') || text.includes('beardmore')) return 'beardmore-aviation'
  return 'this-was-the-enemy-volume-two'
}

function buildSections(items) {
  const bulletList = items.map((item) => `- **${item.title}** — ${item.summary || 'Summary pending.'}`).join('\n')

  return [
    {
      heading: 'Operational Snapshot',
      content: [
        'Daily digest of official releases touching Scottish and wider UK aviation activity:',
        bulletList,
        '',
        '_Editors: verify figures/details against the primary sources linked below before expanding this section to the full narrative length._',
      ].join('\n'),
    },
    {
      heading: 'Technical & Industrial Notes',
      content:
        'Summarise the engineering, basing, and procurement implications highlighted across today’s releases. ' +
        'Connect them to Scottish industrial capacity (Prestwick, Lossiemouth, Weir, Spirit AeroSystems) and quantify any fleet, workforce, or funding metrics disclosed. ' +
        'Cite the relevant MOD transparency tables where applicable.',
    },
    {
      heading: 'Historical Context & Lessons',
      content:
        'Relate the current developments back to Charles E. MacKay’s archival research—e.g., how modern readiness exercises echo WWII dispersal plans or how present-day logistics mirror Beardmore/Weir supply chains. ' +
        'Draw on verified passages from the corresponding book to reinforce continuity across decades.',
    },
    {
      heading: 'Modern Legacy & Book Recommendation',
      content:
        'Explain why this news matters for contemporary Scottish aviation readers, then steer them toward the recommended book for deeper study. ' +
        'Include a call-to-action linking to the relevant `/books/<id>` page and highlight unique research materials in the volume.',
    },
  ]
}

function buildArticleRecord(items) {
  const today = formatDate()
  const slug = `${today}-${slugify(items[0].title).slice(0, 40) || 'scottish-aviation-briefing'}`
  const bookId = chooseBookId(items)
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
    relatedBooks: [{ bookId, reason: 'Topical link between news items and catalogue research focus.' }],
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

