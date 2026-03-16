#!/usr/bin/env node
/**
 * Rewrite existing news articles into coherent, focused narratives.
 * Each article is rewritten to focus on its PRIMARY story (first source only).
 * Removes bundled unrelated items and generic filler.
 *
 * Run: OPENAI_API_KEY=xxx node scripts/rewrite-news-articles.cjs
 *      --dry-run  to preview without writing
 *      --slug=<slug-fragment> to rewrite only matching files (repeatable)
 * Loads OPENAI_API_KEY from .env.local if not set.
 */
const fs = require('fs')
const path = require('path')
const { chooseBookIdsFromText } = require('./news-relevance.cjs')

const ROOT_DIR = path.join(__dirname, '..')
const envPath = path.join(ROOT_DIR, '.env.local')
if (fs.existsSync(envPath) && !process.env.OPENAI_API_KEY) {
  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*OPENAI_API_KEY\s*=\s*(.+?)\s*$/)
    if (m) {
      process.env.OPENAI_API_KEY = m[1].replace(/^["']|["']$/g, '').trim()
      break
    }
  }
}
const ARTICLES_DIR = path.join(ROOT_DIR, 'data', 'news-articles')
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const REWRITE_PROMPT = `You are a factual news writer for Charles Mackay Books, an aviation history publisher in Scotland. Rewrite the following news excerpt into a single coherent article.

CRITICAL – 100% ACCURACY:
- Preserve ALL facts exactly as stated in the source. Do not add, speculate, or invent anything.
- If a detail is unclear or missing, omit it rather than guess.
- Write in BBC News style: clear, neutral, factual.
- Focus on the PRIMARY story only. Ignore any unrelated items bundled together.
- Write 180–320 words. Use 2–3 short paragraphs.
- Add a brief sentence linking to Scottish aviation heritage where relevant (e.g. "HIAL airports connect communities across the Highlands and Islands, where aviation has played a vital role since the inter-war period.").
- Output JSON only: { "title": "Clear descriptive title", "content": "Paragraph 1...\\n\\nParagraph 2..." }`

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const results = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) results.push(...listFiles(full))
    else if (name.endsWith('.json')) results.push(full)
  }
  return results
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

async function callOpenAI(apiKey, excerpt) {
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
      max_tokens: 600,
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

async function rewriteArticle(filePath, apiKey, dryRun) {
  const article = readJson(filePath)
  const primarySource = article.sourceReferences?.[0]
  if (!primarySource) {
    console.log(`Skip (no source): ${path.basename(filePath)}`)
    return
  }

  const excerpt = `Title: ${primarySource.citationText}\n\nCurrent content:\n${(article.sections || []).map((s) => s.content).join('\n\n')}`

  let rewritten
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      rewritten = await callOpenAI(apiKey, excerpt)
      break
    } catch (err) {
      const isRateLimit = err.message?.includes('429') || err.message?.includes('rate_limit')
      if (isRateLimit && attempt < 3) {
        console.log(`Rate limited, waiting 25s before retry ${attempt + 1}/3...`)
        await new Promise((r) => setTimeout(r, 25_000))
      } else {
        throw err
      }
    }
  }

  try {
    const newContent = (rewritten.content || '').trim()
    const newTitle = (rewritten.title || article.title || primarySource.citationText).trim()

    if (!newContent) {
      console.log(`Skip (empty content): ${path.basename(filePath)}`)
      return
    }

    const textForBooks = `${newTitle} ${newContent}`
    const articleCopy = {
      ...article,
      title: newTitle,
      sections: [{ heading: 'Summary', content: newContent }],
      sourceReferences: [primarySource],
      relatedBooks: chooseBookIdsFromText(textForBooks).map((bookId) => ({
        bookId,
        reason: 'Related research volume',
      })),
    }

    articleCopy.wordCount = newContent.split(/\s+/).filter(Boolean).length

    if (dryRun) {
      console.log(`[DRY] ${path.basename(filePath)} -> "${newTitle}" (${articleCopy.wordCount} words)`)
      return
    }

    writeJson(filePath, articleCopy)
    console.log(`Rewritten: ${path.basename(filePath)} -> "${newTitle}" (${articleCopy.wordCount} words)`)
  } catch (err) {
    console.error(`Failed ${path.basename(filePath)}: ${err.message}`)
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY
  const dryRun = process.argv.includes('--dry-run')
  const slugFilters = process.argv
    .filter((arg) => arg.startsWith('--slug='))
    .map((arg) => arg.slice('--slug='.length))
    .filter(Boolean)

  if (!apiKey) {
    console.log('OPENAI_API_KEY not set. Set it to run the rewrite.')
    process.exit(1)
  }

  const files = listFiles(ARTICLES_DIR).filter((file) => {
    if (!slugFilters.length) return true
    const normalized = file.replace(/\\/g, '/')
    return slugFilters.some((slug) => normalized.includes(slug))
  })
  console.log(`Found ${files.length} articles. ${dryRun ? '(Dry run – no changes)' : ''}\n`)

  const delayMs = 25_000 // 25s between requests to stay under 3 RPM (free tier)
  for (let i = 0; i < files.length; i++) {
    await rewriteArticle(files[i], apiKey, dryRun)
    if (!dryRun && i < files.length - 1) {
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }

  console.log(`\nDone. ${files.length} articles processed.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
