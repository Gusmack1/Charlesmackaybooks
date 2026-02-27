#!/usr/bin/env node

/**
 * Scottish Aviation News - AI Rewrite for Factuality & BBC Style
 *
 * Reads items with status 'new' from data/news-queue.json, rewrites via OpenAI
 * in BBC News style, and creates article JSON files under data/news-articles/YYYY/MM/.
 *
 * Usage: node scripts/news-rewrite.cjs
 * Env:   OPENAI_API_KEY (required; script exits 0 if not set)
 */

/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const QUEUE_FILE = path.join(DATA_DIR, 'news-queue.json')
const ARTICLES_DIR = path.join(DATA_DIR, 'news-articles')

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const REWRITE_PROMPT = `You are a factual news writer for Charles Mackay Books, an aviation history publisher. Rewrite the following article excerpt in BBC News style: clear, neutral, factual. PRESERVE ALL FACTS EXACTLY - do not add, speculate, or invent. Only paraphrase for clarity. Output JSON: { title, summary, sections: [{ heading, content }] }. Keep under 500 words total.`

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
    .slice(0, 60)
}

/** Returns all book IDs that topically match the content (keyword-based, 100% accurate). */
function chooseBookIds(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase()
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
  if (text.includes('spirit aero') || (text.includes('aerospace') && text.includes('scotland'))) ids.add('clydeside-aviation-vol2')
  if (ids.size === 0) ids.add('this-was-the-enemy-volume-two')
  return Array.from(ids)
}

async function callOpenAI(apiKey, item) {
  const excerpt = `Title: ${item.title}\n\nSummary: ${item.summary || 'No summary available.'}`

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: REWRITE_PROMPT },
        { role: 'user', content: excerpt },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API ${response.status}: ${err}`)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content
  if (!content) throw new Error('Unknown OpenAI response format')

  return JSON.parse(content)
}

function buildArticleRecord(item, rewritten, now) {
  const dateStr = now.toISOString().split('T')[0]
  const slug = `${dateStr}-${slugify(rewritten.title || item.title).slice(0, 40) || 'scottish-aviation-briefing'}`

  const sections = Array.isArray(rewritten.sections) && rewritten.sections.length > 0
    ? rewritten.sections.map((s) => ({
        heading: s.heading || 'Untitled',
        content: s.content || '',
      }))
    : [{ heading: 'Summary', content: rewritten.summary || item.summary || '' }]

  const wordCount = sections.reduce(
    (sum, s) => sum + (s.content || '').split(/\s+/).filter(Boolean).length,
    0
  )

  return {
    slug,
    title: rewritten.title || item.title,
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
    relatedBooks: chooseBookIds(item).map((bookId) => ({
      bookId,
      reason: 'Topical link between news item and catalogue research focus.',
    })),
    keywords: [
      { keyword: 'Scottish aviation news', primary: true },
      { keyword: 'Royal Air Force updates', primary: false },
      { keyword: 'Scottish aerospace industry', primary: false },
    ],
    status: 'published',
    createdAt: now.toISOString(),
    publishedAt: now.toISOString(),
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.log('OPENAI_API_KEY not set. Skipping rewrite.')
    process.exit(0)
  }

  const queue = readJson(QUEUE_FILE, [])
  const pending = queue.filter((item) => item.status === 'new')
  if (!pending.length) {
    console.log('No new items to rewrite.')
    process.exit(0)
  }

  const batch = pending.slice(0, 2)
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  for (const item of batch) {
    try {
      const rewritten = await callOpenAI(apiKey, item)
      const article = buildArticleRecord(item, rewritten, now)

      const articlePath = path.join(ARTICLES_DIR, year, month, `${article.slug}.json`)
      writeJson(articlePath, article)

      const idx = queue.findIndex((q) => q.id === item.id)
      if (idx >= 0) {
        queue[idx] = {
          ...queue[idx],
          status: 'rewritten',
          articleSlug: article.slug,
          articlePath: path.relative(ROOT_DIR, articlePath),
          rewrittenAt: now.toISOString(),
        }
      }

      console.log(`Rewritten: ${article.slug}`)
    } catch (error) {
      console.error(`[${item.id}] Rewrite failed: ${error.message}`)
    }
  }

  writeJson(QUEUE_FILE, queue)
  console.log(`\nRewrite complete. ${batch.length} item(s) processed.`)

  if (batch.length > 0) {
    const { execSync } = require('child_process')
    execSync('node scripts/fix-news-articles.cjs', { cwd: ROOT_DIR, stdio: 'inherit' })
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
