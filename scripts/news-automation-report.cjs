#!/usr/bin/env node

/**
 * News Automation Report Generator
 *
 * Summarises ingestion/drafting state for scheduled runs so CI can decide
 * whether to raise alerts or simply notify editors.
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return fallback
    throw error
  }
}

function listArticleFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listArticleFiles(fullPath)
    if (entry.isFile() && entry.name.endsWith('.json')) return [fullPath]
    return []
  })
}

function buildLatestArticleMeta() {
  const articlesDir = path.join(DATA_DIR, 'news-articles')
  const files = listArticleFiles(articlesDir)
  if (!files.length) return null

  const sorted = files
    .map((filePath) => {
      const stats = fs.statSync(filePath)
      return { filePath, mtime: stats.mtimeMs }
    })
    .sort((a, b) => b.mtime - a.mtime)

  const latest = sorted[0]
  try {
    const article = JSON.parse(fs.readFileSync(latest.filePath, 'utf8'))
    return {
      slug: article.slug,
      title: article.title,
      createdAt: article.createdAt,
      path: path.relative(ROOT_DIR, latest.filePath),
    }
  } catch (error) {
    return {
      slug: path.basename(latest.filePath, '.json'),
      title: 'Unknown (failed to parse)',
      createdAt: null,
      path: path.relative(ROOT_DIR, latest.filePath),
      parseError: error.message,
    }
  }
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function parseArgs() {
  const args = process.argv.slice(2)
  const result = {
    output: path.join(ROOT_DIR, 'reports', 'automation', 'latest.json'),
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--output' && args[i + 1]) {
      result.output = path.resolve(ROOT_DIR, args[i + 1])
      i += 1
    }
  }

  return result
}

function main() {
  const { output } = parseArgs()
  const queue = readJson(path.join(DATA_DIR, 'news-queue.json'), [])
  const ingestLog = readJson(path.join(DATA_DIR, 'news-ingest-log.json'), [])

  const byStatus = queue.reduce(
    (acc, item) => {
      const status = item.status || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    { total: queue.length }
  )

  const draftedCount = byStatus.drafted || 0
  const newCount = byStatus.new || 0
  const latestArticle = buildLatestArticleMeta()

  let alertLevel = 'ok'
  const alertReasons = []
  if (queue.length === 0) {
    alertLevel = 'warning'
    alertReasons.push('Queue is empty – ingestion produced no pending items.')
  }
  if (draftedCount > 0 && alertLevel !== 'warning') {
    alertLevel = 'attention'
    alertReasons.push(`${draftedCount} draft(s) await editor approval.`)
  } else if (draftedCount > 0) {
    alertReasons.push(`${draftedCount} draft(s) await editor approval.`)
  }

  const summaryLines = [
    `Total queued items: ${queue.length}`,
    `New items awaiting draft: ${newCount}`,
    `Drafts awaiting editor review: ${draftedCount}`,
    `Total ingest log entries: ${ingestLog.length}`,
  ]
  if (latestArticle) {
    summaryLines.push(`Latest article: ${latestArticle.title} (${latestArticle.path})`)
  } else {
    summaryLines.push('Latest article: none generated yet.')
  }

  const report = {
    generatedAt: new Date().toISOString(),
    alertLevel,
    alertReasons,
    queue: {
      total: queue.length,
      byStatus,
    },
    latestArticle,
    summaryMarkdown: summaryLines.map((line) => `- ${line}`).join('\n'),
  }

  ensureDir(output)
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`News automation report written to ${path.relative(ROOT_DIR, output)}`)
  console.log(JSON.stringify(report, null, 2))
}

main()
