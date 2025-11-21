#!/usr/bin/env node

/**
 * Scottish Aviation News - Feed Ingestion MVP
 *
 * Usage: node scripts/news-ingest.cjs
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')
const { XMLParser } = require('fast-xml-parser')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const SOURCES_FILE = path.join(DATA_DIR, 'news-sources.json')
const INGEST_LOG_FILE = path.join(DATA_DIR, 'news-ingest-log.json')
const QUEUE_FILE = path.join(DATA_DIR, 'news-queue.json')

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  removeNSPrefix: true,
})

const USER_AGENT = 'CharlesMackayNewsBot/1.0 (+https://charlesmackaybooks.com/)'

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return fallback
    }
    throw error
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function ensureArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function stripHtml(input) {
  if (!input) return ''
  return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
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
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '-')
}

function stripOrdinalSuffix(value) {
  if (!value) return value
  return value.replace(/(\d+)(st|nd|rd|th)/gi, '$1')
}

function toIsoDate(input) {
  if (!input) return null
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function normaliseRssItems(channel) {
  const items = ensureArray(channel.item)
  return items.map((item) => {
    const guidValue = item.guid?.['#text'] || item.guid || item.link || item.title
    const summary = item.description || item['content:encoded'] || ''
    return {
      guid: guidValue?.trim(),
      title: item.title?.trim() || 'Untitled',
      link: item.link || item.guid?.['#text'] || '',
      summary: summary.trim(),
      publishedAt: toIsoDate(item.pubDate) || toIsoDate(item['dc:date']),
      categories: ensureArray(item.category)
        .map((cat) => (typeof cat === 'string' ? cat : cat?._text || ''))
        .filter(Boolean),
      media: [],
    }
  })
}

function normaliseAtomEntries(feed) {
  const entries = ensureArray(feed.entry)
  return entries.map((entry) => {
    const guidValue = entry.id || entry.link?.href || entry.title
    const summary = entry.summary?.['#text'] || entry.summary || entry.content?.['#text'] || entry.content || ''
    const linkHref =
      (Array.isArray(entry.link) ? entry.link.find((l) => l.rel === 'alternate')?.href : entry.link?.href) || entry.id || ''
    return {
      guid: guidValue?.trim(),
      title: (entry.title?.['#text'] || entry.title || 'Untitled').trim(),
      link: linkHref,
      summary: summary.trim(),
      publishedAt: toIsoDate(entry.updated) || toIsoDate(entry.published),
      categories: ensureArray(entry.category).map((cat) => cat.term || cat.label).filter(Boolean),
      media: [],
    }
  })
}

function parseFeed(xml) {
  const parsed = parser.parse(xml)
  if (parsed?.rss?.channel) {
    return normaliseRssItems(parsed.rss.channel)
  }
  if (parsed?.feed) {
    return normaliseAtomEntries(parsed.feed)
  }
  throw new Error('Unknown feed format')
}

async function fetchRssFeed(source) {
  if (!source.feedUrl) {
    throw new Error('Missing feedUrl for RSS/Atom source')
  }

  const response = await fetch(source.feedUrl, {
    headers: { 'user-agent': USER_AGENT },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }
  const xml = await response.text()
  return parseFeed(xml)
}

async function fetchGovUkEntries(source) {
  if (!source.apiUrl) {
    throw new Error('Missing apiUrl for GOV.UK Content API source')
  }

  const response = await fetch(source.apiUrl, {
    headers: { 'user-agent': USER_AGENT, accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const rows = data.results || []

  return rows.map((item) => {
    const link = item.link || (item.base_path ? `https://www.gov.uk${item.base_path}` : '')
    return {
      guid: link || item.document_id || item.id,
      title: decodeHtmlEntities(stripHtml(item.title || 'Untitled')),
      link,
      summary: decodeHtmlEntities(stripHtml(item.description || '')),
      publishedAt: toIsoDate(item.public_timestamp),
      categories: ensureArray(item.organisations || item.format || []).filter(Boolean),
      media: [],
    }
  })
}

async function fetchWordPressEntries(source) {
  if (!source.apiUrl) {
    throw new Error('Missing apiUrl for WordPress JSON source')
  }

  const response = await fetch(source.apiUrl, {
    headers: { 'user-agent': USER_AGENT, accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }

  const posts = await response.json()
  const list = ensureArray(posts)

  return list.map((post) => ({
    guid: String(post.id || post.link),
    title: decodeHtmlEntities(stripHtml(post.title?.rendered || post.title || 'Untitled')),
    link: post.link || `${source.siteUrl || ''}/?p=${post.id}`,
    summary: decodeHtmlEntities(stripHtml(post.excerpt?.rendered || post.excerpt || post.title?.rendered || '')),
    publishedAt: toIsoDate(post.date_gmt || post.date),
    categories: ensureArray(post.categories).map(String),
    media: [],
  }))
}

async function fetchHialHtmlEntries(source) {
  if (!source.pageUrl || !source.siteUrl) {
    throw new Error('Missing pageUrl/siteUrl for HIAL HTML source')
  }

  const response = await fetch(source.pageUrl, {
    headers: { 'user-agent': USER_AGENT },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }
  const html = await response.text()
  const blocks = [...html.matchAll(/<article class="listing[\s\S]*?<\/article>/g)]

  return blocks.map((match) => {
    const block = match[0]
    const linkMatch = block.match(/<a[^>]*href="([^"#]+)"/)
    const titleMatch = block.match(/<h2[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/)
    const summaryMatch = block.match(/<p class="listing__summary">([\s\S]*?)<\/p>/)
    const dateMatch = block.match(/<p class="meta meta--date">[\s\S]*?<strong>Published:<\/strong>\s*([^<]+)</)

    const relativeLink = linkMatch?.[1] || ''
    const link = relativeLink ? new URL(relativeLink, source.siteUrl).toString() : ''
    const title = decodeHtmlEntities(stripHtml(titleMatch?.[1] || 'Untitled'))
    const summary = decodeHtmlEntities(stripHtml(summaryMatch?.[1] || ''))
    const publishedAt = toIsoDate(stripOrdinalSuffix(dateMatch?.[1]?.trim()))

    return {
      guid: link || title,
      title,
      link,
      summary,
      publishedAt,
      categories: ['HIAL'],
      media: [],
    }
  })
}

async function fetchEntriesForSource(source) {
  const mode = (source.mode || 'rss').toLowerCase()
  if (mode === 'govuk-content-api') {
    return fetchGovUkEntries(source)
  }
  if (mode === 'wordpress-json') {
    return fetchWordPressEntries(source)
  }
  if (mode === 'hial-html') {
    return fetchHialHtmlEntries(source)
  }
  return fetchRssFeed(source)
}

async function main() {
  const sources = readJson(SOURCES_FILE, [])
  if (!sources.length) {
    console.error('No sources configured in data/news-sources.json')
    process.exit(1)
  }

  const ingestLog = readJson(INGEST_LOG_FILE, [])
  const queue = readJson(QUEUE_FILE, [])

  const existingLogKeys = new Set(ingestLog.map((entry) => `${entry.sourceId}::${entry.guid}`))
  const existingQueueKeys = new Set(queue.map((entry) => `${entry.sourceId}::${entry.guid}`))

  let totalNewItems = 0

  for (const source of sources) {
    if (source.enabled === false) {
      console.log(`\n[${source.id}] Skipped (disabled).`)
      continue
    }

    try {
      console.log(`\n[${source.id}] Fetching feed...`)
      const entries = await fetchEntriesForSource(source)
      let addedForSource = 0

      for (const entry of entries) {
        if (!entry.guid) continue
        const key = `${source.id}::${entry.guid}`
        if (existingLogKeys.has(key)) continue

        const fetchedAt = new Date().toISOString()
        const logEntry = {
          sourceId: source.id,
          sourceName: source.name,
          guid: entry.guid,
          title: entry.title,
          sourceUrl: entry.link,
          summary: entry.summary,
          categories: entry.categories,
          licence: source.licence,
          imagePolicy: source.imagePolicy,
          publishedAt: entry.publishedAt,
          fetchedAt,
        }

        ingestLog.push(logEntry)
        existingLogKeys.add(key)
        addedForSource += 1
        totalNewItems += 1

        if (!existingQueueKeys.has(key)) {
          queue.push({
            id: randomUUID(),
            sourceId: source.id,
            guid: entry.guid,
            title: entry.title,
            sourceUrl: entry.link,
            summary: entry.summary,
            categories: entry.categories,
            licence: source.licence,
            imagePolicy: source.imagePolicy,
            publishedAt: entry.publishedAt,
            fetchedAt,
            status: 'new',
          })
          existingQueueKeys.add(key)
        }
      }

      console.log(`[${source.id}] Added ${addedForSource} new item(s).`)
    } catch (error) {
      console.error(`[${source.id}] Failed: ${error.message}`)
    }
  }

  if (totalNewItems > 0) {
    writeJson(INGEST_LOG_FILE, ingestLog)
    writeJson(QUEUE_FILE, queue)
  }

  console.log(`\nIngestion complete. ${totalNewItems} new item(s) queued.`)
}

main().catch((error) => {
  console.error('Unexpected error during news ingestion:', error)
  process.exit(1)
})
