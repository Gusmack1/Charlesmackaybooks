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

/** Returns book IDs that topically match the content (keyword-based). */
function chooseBookIds(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase()
  const ids = new Set()
  if (text.includes('helicopter') || text.includes('rotor') || text.includes('sycamore')) ids.add('sycamore-seeds')
  if (text.includes('lossiemouth') || text.includes('typhoon') || text.includes('sabre')) ids.add('sabres-from-north')
  if (text.includes('prestwick') || text.includes('beardmore') || text.includes('argus')) ids.add('beardmore-aviation')
  if (text.includes('hial') || text.includes('wick airport') || text.includes('inverness airport') || text.includes('highland airport') || text.includes('stornoway') || text.includes('dundee airport')) ids.add('clydeside-aviation-vol2')
  if (text.includes('glasgow') || text.includes('clyde') || text.includes('clydeside') || text.includes('weir ')) ids.add('clydeside-aviation-vol1')
  if (text.includes('vulcan') || text.includes('lightning') || text.includes('v-force') || text.includes('deterrent')) ids.add('sonic-to-standoff')
  if (text.includes('nuclear') || text.includes('atomic')) ids.add('birth-atomic-bomb')
  if (text.includes('aircraft carrier') || text.includes('naval aviation')) ids.add('aircraft-carrier-argus')
  if (text.includes('luftwaffe') || text.includes('german aircraft') || text.includes('me262') || text.includes('messerschmitt')) ids.add('this-was-the-enemy-volume-two')
  if (text.includes('spirit aero') || (text.includes('aerospace') && text.includes('scotland'))) ids.add('clydeside-aviation-vol2')
  if (text.includes('aaib') || text.includes('air accident') || text.includes('aircraft')) ids.add('this-was-the-enemy-volume-two')
  if (ids.size === 0) ids.add('this-was-the-enemy-volume-two')
  return Array.from(ids)
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
  const bookIds = chooseBookIds(item)
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
    relatedBooks: bookIds.map((bookId) => ({ bookId, reason: 'Topical link between news item and catalogue research focus.' })),
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

  const aviationTerms = /aircraft|aviation|airport|airspace|flight|raf|hial|aaib|nerl|nats|prestwick|lossiemouth|inverness|stornoway|wick|dundee|glasgow|military aviation|naval aviation|helicopter|rotorcraft/i
  const pending = queue
    .filter((item) => item.status === 'new')
    .filter((item) => aviationTerms.test(`${item.title} ${item.summary || ''}`))
  if (!pending.length) {
    console.log('No new aviation-related items to draft.')
    process.exit(0)
  }

  const batch = pending.slice(0, 5)
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

