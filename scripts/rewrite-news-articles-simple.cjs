#!/usr/bin/env node
/**
 * Rewrite existing news articles – rule-based (no API).
 * - Keeps only the PRIMARY source (first one)
 * - Focuses content on that story only
 * - Removes bundled unrelated items and generic filler
 * - Formats as coherent paragraphs
 */
const fs = require('fs')
const path = require('path')
const { chooseBookIdsFromText } = require('./news-relevance.cjs')

const ROOT_DIR = path.join(__dirname, '..')
const ARTICLES_DIR = path.join(ROOT_DIR, 'data', 'news-articles')

const FILLER_PATTERNS = [
  /^These developments affect aviation connectivity.*research volumes\.$/im,
  /^Transport and infrastructure decisions shape.*research volumes\.$/im,
  /^For deeper context on Scottish aviation history.*primary sources\.$/im,
  /^Daily digest of official releases touching Scottish and wider UK aviation activity:?\s*$/im,
]

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

function citationToTitle(citationText) {
  if (!citationText) return ''
  const idx = citationText.search(/\s[–-]\s/)
  return idx >= 0 ? citationText.slice(idx + 3).trim() : citationText
}

/** Extract primary story content from first bullet/source. */
function extractPrimaryContent(sections, primaryCitation) {
  const allContent = (sections || []).map((s) => s.content || '').join('\n\n')
  const primaryTitle = citationToTitle(primaryCitation)

  const bulletRegex = /^[-*]\s*\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/gm
  const bullets = []
  let m
  while ((m = bulletRegex.exec(allContent)) !== null) {
    bullets.push({ title: m[1].trim(), text: m[2].trim() })
  }

  const primary = bullets.find((b) =>
    primaryTitle && (b.title.includes(primaryTitle.slice(0, 30)) || primaryTitle.includes(b.title.slice(0, 30)))
  )
  if (primary) {
    return `${primary.title}. ${primary.text}`
  }

  const lines = allContent.split('\n').filter((l) => l.trim())
  for (const line of lines) {
    if (FILLER_PATTERNS.some((p) => p.test(line))) continue
    const trimmed = line.replace(/^[-*]\s*/, '').replace(/\*\*(.+?)\*\*\s*[—–-]\s*/, '$1. ').trim()
    if (trimmed.length > 50 && !trimmed.startsWith('For deeper') && !trimmed.startsWith('These developments')) {
      return trimmed
    }
  }

  const firstBullet = bullets[0]
  return firstBullet ? `${firstBullet.title}. ${firstBullet.text}` : allContent.split('\n').find((l) => l.length > 40) || allContent.slice(0, 500)
}

function rewriteArticle(filePath, dryRun) {
  const article = readJson(filePath)
  const primarySource = article.sourceReferences?.[0]
  if (!primarySource) {
    console.log(`Skip (no source): ${path.basename(filePath)}`)
    return
  }

  const newContent = extractPrimaryContent(article.sections, primarySource.citationText)
  const newTitle = citationToTitle(primarySource.citationText) || article.title

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
}

function main() {
  const dryRun = process.argv.includes('--dry-run')
  const files = listFiles(ARTICLES_DIR)
  console.log(`Found ${files.length} articles. ${dryRun ? '(Dry run – no changes)' : ''}\n`)

  for (const file of files) {
    rewriteArticle(file, dryRun)
  }

  console.log(`\nDone. ${files.length} articles processed.`)
}

main()
