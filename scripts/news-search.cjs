#!/usr/bin/env node

/**
 * Scottish Aviation News - Serper Web Search
 *
 * Uses Serper API to search for Scottish aviation news and adds results
 * to data/news-queue.json in the same format as news-ingest.
 *
 * Usage: node scripts/news-search.cjs
 * Env:   SERPER_API_KEY (required; script exits 0 if not set)
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const QUEUE_FILE = path.join(DATA_DIR, 'news-queue.json')
const INGEST_LOG_FILE = path.join(DATA_DIR, 'news-ingest-log.json')

const SERPER_URL = 'https://google.serper.dev/search'
const SOURCE_ID = 'serper-scottish-aviation'

const SEARCH_QUERIES = [
  'Scottish aviation news',
  'Scotland aviation',
  'RAF Scotland',
  'Prestwick airport news',
  'Glasgow aviation',
]

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') return fallback
    throw error
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function toIsoDate(input) {
  if (!input) return null
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

async function serperSearch(apiKey, query) {
  const response = await fetch(SERPER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ q: query, num: 10, type: 'news' }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Serper API ${response.status}: ${text}`)
  }

  return response.json()
}

function parseNewsResults(data) {
  const news = data?.news || data?.organic || []
  return news.map((item) => ({
    guid: item.link || item.url || `${(item.title || 'Untitled').trim()}-${Date.now()}`,
    title: (item.title || 'Untitled').trim(),
    sourceUrl: item.link || item.url || '',
    summary: (item.snippet || item.description || '').trim(),
    publishedAt: toIsoDate(item.date) || null,
    categories: item.source ? [item.source] : [],
  }))
}

async function main() {
  const apiKey = process.env.SERPER_API_KEY
  if (!apiKey) {
    console.log('SERPER_API_KEY not set. Skipping news search.')
    process.exit(0)
  }

  const queue = readJson(QUEUE_FILE, [])
  const ingestLog = readJson(INGEST_LOG_FILE, [])

  const existingLogKeys = new Set(ingestLog.map((e) => `${e.sourceId}::${e.guid}`))
  const existingQueueKeys = new Set(queue.map((e) => `${e.sourceId}::${e.guid}`))

  let totalNew = 0

  try {
    const allItems = []
    for (const query of SEARCH_QUERIES) {
      const data = await serperSearch(apiKey, query)
      allItems.push(...parseNewsResults(data))
    }
    const items = allItems

    for (const item of items) {
      if (!item.guid || !item.sourceUrl) continue

      const key = `${SOURCE_ID}::${item.guid}`
      if (existingLogKeys.has(key) || existingQueueKeys.has(key)) continue

      const fetchedAt = new Date().toISOString()

      ingestLog.push({
        sourceId: SOURCE_ID,
        sourceName: 'Serper Scottish Aviation Search',
        guid: item.guid,
        title: item.title,
        sourceUrl: item.sourceUrl,
        summary: item.summary,
        categories: item.categories,
        publishedAt: item.publishedAt,
        fetchedAt,
      })
      existingLogKeys.add(key)

      queue.push({
        id: randomUUID(),
        sourceId: SOURCE_ID,
        guid: item.guid,
        title: item.title,
        sourceUrl: item.sourceUrl,
        summary: item.summary,
        categories: item.categories,
        publishedAt: item.publishedAt,
        fetchedAt,
        status: 'new',
      })
      existingQueueKeys.add(key)
      totalNew += 1
    }

    console.log(`[${SOURCE_ID}] ${items.length} results, ${totalNew} new queued`)
  } catch (error) {
    console.error(`[${SOURCE_ID}] Search failed: ${error.message}`)
    process.exit(1)
  }

  if (totalNew > 0) {
    writeJson(INGEST_LOG_FILE, ingestLog)
    writeJson(QUEUE_FILE, queue)
  }

  console.log(`\nSerper search complete. ${totalNew} new item(s) queued.`)
}

main().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
