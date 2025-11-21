#!/usr/bin/env node

/**
 * Keyword Rank Dashboard
 *
 * Fetches Search Console metrics for priority keywords and writes
 * JSON + Markdown reports under reports/keywords/.
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const KEYWORD_FILE = path.join(DATA_DIR, 'keyword-tracking.json')
const REPORT_DIR = path.join(ROOT_DIR, 'reports', 'keywords')

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return fallback
    throw error
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function parseArgs(config) {
  const args = process.argv.slice(2)
  const options = {
    startDate: null,
    endDate: null,
    propertyUrl: process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || config.propertyUrl || 'https://charlesmackaybooks.com/',
    windowDays: config.defaultWindowDays || 7,
  }

  args.forEach((arg) => {
    if (arg.startsWith('--start=')) {
      options.startDate = arg.replace('--start=', '')
    } else if (arg.startsWith('--end=')) {
      options.endDate = arg.replace('--end=', '')
    } else if (arg.startsWith('--property=')) {
      options.propertyUrl = arg.replace('--property=', '')
    } else if (arg.startsWith('--window=')) {
      options.windowDays = Number(arg.replace('--window=', '')) || options.windowDays
    }
  })

  const today = new Date()
  if (!options.endDate) {
    const end = new Date(today)
    end.setUTCDate(end.getUTCDate() - 1)
    options.endDate = end.toISOString().split('T')[0]
  }
  if (!options.startDate) {
    const start = new Date(options.endDate)
    start.setUTCDate(start.getUTCDate() - (options.windowDays - 1))
    options.startDate = start.toISOString().split('T')[0]
  }

  return options
}

function loadCredentials() {
  const keySource = process.env.GOOGLE_SEARCH_CONSOLE_KEY
  if (!keySource) {
    throw new Error(
      'GOOGLE_SEARCH_CONSOLE_KEY is not set. Provide a service-account JSON string or path to the JSON file.'
    )
  }

  let credentials
  if (keySource.trim().startsWith('{')) {
    credentials = JSON.parse(keySource)
  } else {
    const keyPath = path.isAbsolute(keySource) ? keySource : path.join(ROOT_DIR, keySource)
    credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'))
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('Invalid Search Console credentials. Missing client_email or private_key.')
  }

  return new google.auth.JWT(credentials.client_email, null, credentials.private_key, [
    'https://www.googleapis.com/auth/webmasters.readonly',
  ])
}

async function fetchKeywordMetrics(client, propertyUrl, keywordEntry, dates) {
  const searchconsole = google.searchconsole({ version: 'v1', auth: client })
  const request = {
    siteUrl: propertyUrl,
    requestBody: {
      startDate: dates.startDate,
      endDate: dates.endDate,
      dimensions: ['query', 'page'],
      rowLimit: 1,
      dimensionFilterGroups: [
        {
          filters: [
            { dimension: 'query', operator: 'equals', expression: keywordEntry.keyword },
            { dimension: 'page', operator: 'equals', expression: keywordEntry.targetUrl },
          ],
        },
      ],
    },
  }

  const response = await searchconsole.searchanalytics.query(request)
  const row = response.data.rows?.[0]

  if (!row) {
    return {
      keyword: keywordEntry.keyword,
      targetUrl: keywordEntry.targetUrl,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: null,
      priority: keywordEntry.priority || 'tier-3',
      contentType: keywordEntry.contentType,
      bookId: keywordEntry.bookId || null,
      status: 'no-data',
    }
  }

  return {
    keyword: keywordEntry.keyword,
    targetUrl: keywordEntry.targetUrl,
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || null,
    priority: keywordEntry.priority || 'tier-3',
    contentType: keywordEntry.contentType,
    bookId: keywordEntry.bookId || null,
    status: 'ok',
  }
}

function buildMarkdown(report) {
  const lines = [
    `## Keyword rank dashboard (${report.startDate} → ${report.endDate})`,
    '',
    `Tracked keywords: ${report.items.length}`,
    '',
  ]

  report.items.forEach((item) => {
    const headline = `- **${item.keyword}** → ${item.targetUrl}`
    if (item.status === 'no-data') {
      lines.push(`${headline} — no data returned (check page/keyword match).`)
    } else {
      const ctr = `${(item.ctr * 100).toFixed(2)}%`
      const position = item.position ? item.position.toFixed(1) : 'n/a'
      lines.push(
        `${headline} — position ${position}, ${item.clicks} clicks, ${item.impressions} impressions, CTR ${ctr}.`
      )
    }
  })

  return lines.join('\n')
}

async function main() {
  const config = readJson(KEYWORD_FILE, null)
  if (!config) {
    console.error('Missing data/keyword-tracking.json. Create it before running the dashboard.')
    process.exit(1)
  }

  const options = parseArgs(config)
  const keywords = config.keywords || []
  if (!keywords.length) {
    console.error('No keywords configured in data/keyword-tracking.json')
    process.exit(1)
  }

  const authClient = await loadCredentials()

  const metrics = []
  for (const keywordEntry of keywords) {
    try {
      const result = await fetchKeywordMetrics(authClient, options.propertyUrl, keywordEntry, options)
      metrics.push(result)
    } catch (error) {
      console.error(`Failed to fetch metrics for "${keywordEntry.keyword}": ${error.message}`)
      metrics.push({
        keyword: keywordEntry.keyword,
        targetUrl: keywordEntry.targetUrl,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        position: null,
        priority: keywordEntry.priority || 'tier-3',
        contentType: keywordEntry.contentType,
        bookId: keywordEntry.bookId || null,
        status: 'error',
        error: error.message,
      })
    }
  }

  ensureDir(REPORT_DIR)
  const timestamp = new Date().toISOString()
  const snapshotName = `${options.startDate}_${options.endDate}.json`
  const snapshotPath = path.join(REPORT_DIR, snapshotName)

  const report = {
    generatedAt: timestamp,
    propertyUrl: options.propertyUrl,
    startDate: options.startDate,
    endDate: options.endDate,
    windowDays: options.windowDays,
    items: metrics,
  }

  fs.writeFileSync(snapshotPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  fs.writeFileSync(path.join(REPORT_DIR, 'latest.md'), buildMarkdown(report), 'utf8')

  console.log(`Keyword dashboard written to ${path.relative(ROOT_DIR, snapshotPath)}`)
}

main().catch((error) => {
  console.error('Failed to generate keyword dashboard:', error.message)
  process.exit(1)
})

