#!/usr/bin/env node

/**
 * Simple health-checker for publicly exposed commerce feeds and sitemaps.
 * Usage:
 *   node scripts/verify-feeds.cjs                 # uses production base URL
 *   node scripts/verify-feeds.cjs --base=http://localhost:3000
 * Environment override:
 *   FEED_HEALTH_BASE=https://staging.example.com node scripts/verify-feeds.cjs
 */

/* eslint-disable no-console */

const DEFAULT_BASE = 'https://charlesmackaybooks.com'
const USER_AGENT = 'CharlesMackayBooks/FeedHealthCheck'

const argv = process.argv.slice(2)
const cliOverrides = Object.fromEntries(
  argv
    .filter((arg) => arg.startsWith('--') && arg.includes('='))
    .map((arg) => {
      const [key, value] = arg.replace(/^--/, '').split('=')
      return [key, value]
    })
)
const flagSet = new Set(argv.filter((arg) => arg.startsWith('--') && !arg.includes('=')))

const baseUrl =
  process.env.FEED_HEALTH_BASE ||
  cliOverrides.base ||
  (flagSet.has('--local') ? 'http://127.0.0.1:3000' : DEFAULT_BASE)

const verbose = flagSet.has('--verbose')

const targets = [
  {
    path: '/sitemap.xml',
    label: 'Primary sitemap',
    minBytes: 500,
    mustContain: ['<urlset', '<loc>https://charlesmackaybooks.com'],
  },
  {
    path: '/sitemap-images.xml',
    label: 'Image sitemap',
    minBytes: 500,
    mustContain: ['<image:image>', '<image:loc>https://charlesmackaybooks.com/book-covers'],
  },
  {
    path: '/products.xml',
    label: 'Google Merchant RSS',
    minBytes: 1500,
    mustContain: ['<rss', '<g:id>', '<g:price>'],
  },
  {
    path: '/shopping-actions.xml',
    label: 'Shopping Actions Atom',
    minBytes: 1500,
    mustContain: ['<feed', '<entry>', '<g:id>'],
  },
  {
    path: '/merchant-feed.txt',
    label: 'TSV merchant feed',
    minBytes: 1500,
    mustContain: ['id\ttitle\tdescription', 'https://charlesmackaybooks.com/books/'],
  },
]

function formatBytes(num) {
  if (num > 1024 * 1024) return `${(num / (1024 * 1024)).toFixed(2)} MB`
  if (num > 1024) return `${(num / 1024).toFixed(1)} KB`
  return `${num} B`
}

async function fetchWithTimeout(url, { timeoutMs = 15000 } = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': USER_AGENT },
    })
    return res
  } finally {
    clearTimeout(timeout)
  }
}

async function checkTarget(target) {
  const url = new URL(target.path, baseUrl).toString()
  const summary = { url, label: target.label }

  try {
    const res = await fetchWithTimeout(url, { timeoutMs: target.timeoutMs ?? 15000 })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    }

    const body = await res.text()
    const byteLength = Buffer.byteLength(body, 'utf8')

    if (target.minBytes && byteLength < target.minBytes) {
      throw new Error(`response too small (${formatBytes(byteLength)} < ${formatBytes(target.minBytes)})`)
    }

    if (Array.isArray(target.mustContain)) {
      for (const needle of target.mustContain) {
        if (!body.includes(needle)) {
          throw new Error(`missing marker "${needle}"`)
        }
      }
    }

    summary.ok = true
    summary.bytes = byteLength
    if (verbose) {
      console.log(`✅ ${target.label} (${url}) - ${formatBytes(byteLength)}`)
    }
    return summary
  } catch (error) {
    summary.ok = false
    summary.error = error?.message || String(error)
    console.error(`❌ ${target.label} (${url}) failed: ${summary.error}`)
    return summary
  }
}

async function main() {
  console.log(`🔍 Checking feeds at ${baseUrl} ...`)
  const results = []
  for (const target of targets) {
    // eslint-disable-next-line no-await-in-loop
    const result = await checkTarget(target)
    results.push(result)
  }

  const failed = results.filter((r) => !r.ok)
  if (failed.length) {
    console.error(`\n⛔ Feed verification failed for ${failed.length}/${results.length} target(s).`)
    failed.forEach((item) => {
      console.error(`   • ${item.label}: ${item.error}`)
    })
    process.exitCode = 1
    return
  }

  console.log(`\n✅ All ${results.length} feeds responded with healthy content.`)
}

main().catch((error) => {
  console.error('Unexpected error while verifying feeds:', error)
  process.exit(1)
})

