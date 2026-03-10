#!/usr/bin/env node
/**
 * reduce-ai-phrases.cjs
 *
 * Scans blog page.tsx files and performs safe find-replace for repetitive AI phrases.
 * Only modifies the content string (HTML), not metadata.
 *
 * Usage:
 *   node scripts/reduce-ai-phrases.cjs        # Dry run (default)
 *   node scripts/reduce-ai-phrases.cjs --apply # Apply changes
 */
const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT_DIR, 'src', 'app', 'blog')

// Replacement rules: [pattern, replacement, description]
// Order matters: longer/more specific patterns first
const REPLACEMENTS = [
  [
    /The comprehensive documentation of/gi,
    'The documentation of',
    'The comprehensive documentation of -> The documentation of'
  ],
  [
    /Understanding ([^.]+?) provides valuable insights into /gi,
    '$1 shows ',
    'Understanding X provides valuable insights into -> X shows'
  ],
  [
    /provides valuable insights into /gi,
    'shows ',
    'provides valuable insights into -> shows'
  ],
  [
    /ensures that the ([^.]+?) is properly understood/gi,
    'documents the $1',
    'ensures that the X is properly understood -> documents the X'
  ],
  [
    /is properly understood/gi,
    'is documented',
    'is properly understood -> is documented (conservative)'
  ],
  [
    /properly recognized and preserved/gi,
    'documented',
    'properly recognized and preserved -> documented'
  ],
  [
    /preserved for future generations/gi,
    'recorded',
    'preserved for future generations -> recorded'
  ],
  [
    /comprehensive documentation/gi,
    'documentation',
    'comprehensive documentation -> documentation'
  ],
  [
    /ensures that the/gi,
    'shows how the',
    'ensures that the -> shows how the'
  ]
]

function findBlogPages(dir) {
  if (!fs.existsSync(dir)) return []
  const results = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory() && !name.startsWith('[')) {
      const pagePath = path.join(full, 'page.tsx')
      if (fs.existsSync(pagePath)) {
        results.push(pagePath)
      }
    }
  }
  return results
}

/**
 * Extract the content string from a blog page.tsx file.
 * Looks for content: ` ... `, (template literal before excerpt)
 */
function extractContent(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  // Match content: ` ... `,  (template literal ending before excerpt:)
  const match = raw.match(/content:\s*`([\s\S]*?)`\s*,\s*\n\s*excerpt:/)
  if (!match) return null
  return { full: raw, content: match[1], contentStart: match.index + match[0].indexOf(match[1]), contentEnd: match.index + match[0].indexOf(match[1]) + match[1].length }
}

/**
 * Apply all replacements to a string and return { result, changes }
 */
function applyReplacements(text) {
  let result = text
  const changes = []

  for (const [pattern, replacement, desc] of REPLACEMENTS) {
    const before = result
    result = result.replace(pattern, replacement)
    if (before !== result) {
      const count = (before.match(pattern) || []).length
      changes.push({ desc, count })
    }
  }

  return { result, changes }
}

function processFile(filePath, dryRun) {
  const extracted = extractContent(filePath)
  if (!extracted) {
    return { file: filePath, skipped: true, reason: 'No content block found' }
  }

  const { result, changes } = applyReplacements(extracted.content)
  if (changes.length === 0) {
    return { file: filePath, skipped: false, changed: false }
  }

  if (!dryRun) {
    const newFull =
      extracted.full.slice(0, extracted.contentStart) +
      result +
      extracted.full.slice(extracted.contentEnd)
    fs.writeFileSync(filePath, newFull, 'utf8')
  }

  return {
    file: filePath,
    skipped: false,
    changed: true,
    changes,
    dryRun
  }
}

function main() {
  const apply = process.argv.includes('--apply')
  const dryRun = !apply

  console.log(`reduce-ai-phrases: ${dryRun ? 'DRY RUN (use --apply to write)' : 'APPLYING CHANGES'}\n`)

  const files = findBlogPages(BLOG_DIR)
  console.log(`Found ${files.length} blog page(s) in src/app/blog/*/page.tsx\n`)

  let totalChanges = 0
  const results = []

  for (const filePath of files) {
    const rel = path.relative(ROOT_DIR, filePath)
    const r = processFile(filePath, dryRun)

    if (r.skipped) {
      console.log(`Skip: ${rel} (${r.reason})`)
      continue
    }

    if (!r.changed) {
      continue
    }

    results.push({ ...r, rel })
    const changeCount = r.changes.reduce((s, c) => s + c.count, 0)
    totalChanges += changeCount

    console.log(`${dryRun ? '[DRY] Would change' : 'Changed'}: ${rel}`)
    for (const c of r.changes) {
      console.log(`  - ${c.desc}: ${c.count} replacement(s)`)
    }
    console.log()
  }

  console.log('---')
  console.log(
    dryRun
      ? `Dry run complete. ${totalChanges} replacement(s) would be made across ${results.length} file(s). Run with --apply to write.`
      : `Done. ${totalChanges} replacement(s) applied across ${results.length} file(s).`
  )
}

main()
