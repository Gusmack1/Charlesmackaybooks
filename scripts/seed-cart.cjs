#!/usr/bin/env node
/**
 * Seeds a developer cart payload by pulling book data from src/data/books.ts
 * and writing a consumable JSON file to data/dev-cart.json.
 *
 * Usage:
 *   node scripts/seed-cart.cjs            # defaults to 2 items
 *   node scripts/seed-cart.cjs 4          # seeds with 4 items
 */

const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const ROOT = path.join(__dirname, '..')
const BOOKS_SRC = path.join(ROOT, 'src', 'data', 'books.ts')
const OUTPUT_FILE = path.join(ROOT, 'data', 'dev-cart.json')

const desiredCount = Math.max(1, Number(process.argv[2]) || 2)

function loadBooks() {
let source = fs.readFileSync(BOOKS_SRC, 'utf8')
source = source.replace(/^import[^;]+;\s*/gm, '')

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  })

  const moduleObj = { exports: {} }
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText)
  fn(moduleObj.exports, require, moduleObj, BOOKS_SRC, path.dirname(BOOKS_SRC))

  const { books } = moduleObj.exports
  if (!Array.isArray(books) || !books.length) {
    throw new Error('Failed to load books array from src/data/books.ts')
  }
  return books
}

function buildCartItems(books) {
  const eligible = books.filter((book) => !!book && book.price && book.price > 0)
  if (!eligible.length) {
    throw new Error('No eligible books with price > 0 found.')
  }

  const selections = eligible.slice(0, desiredCount)
  return selections.map((book, index) => ({
    book,
    quantity: Math.min(3, index + 1),
  }))
}

async function main() {
  try {
    const books = loadBooks()
    const items = buildCartItems(books)
    const payload = {
      generatedAt: new Date().toISOString(),
      items,
    }
    await fs.promises.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8')
    console.log(`[seed-cart] Seeded ${items.length} item(s) into ${OUTPUT_FILE}`)
  } catch (error) {
    console.error('[seed-cart] Failed:', error)
    process.exit(1)
  }
}

main()

