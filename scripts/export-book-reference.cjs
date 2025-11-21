#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const booksSrcPath = path.join(__dirname, '..', 'src', 'data', 'books.ts')
let source = fs.readFileSync(booksSrcPath, 'utf8')
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
fn(moduleObj.exports, require, moduleObj, booksSrcPath, path.dirname(booksSrcPath))

const { books } = moduleObj.exports
if (!Array.isArray(books)) {
  console.error('Unable to load books data from src/data/books.ts')
  process.exit(1)
}

const formatPrice = (price) => (typeof price === 'number' ? `£${price.toFixed(2)}` : '—')
const escapePipes = (value) => String(value ?? '').replace(/\|/g, '\\|')
const formatList = (value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return '—'
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}
const quoteBlock = (text) => {
  if (!text) return ''
  return text
    .split(/\r?\n/)
    .map((line) => `> ${line.trim()}`)
    .join('\n')
}

const out = []
out.push('# Charles E. MacKay Books – Canonical Catalogue')
out.push('')
out.push('Auto-generated from `src/data/books.ts`. Update the TypeScript data first, then rerun `node scripts/export-book-reference.cjs` to refresh this reference.')
out.push('')
out.push(`Last generated: ${new Date().toISOString()}`)
out.push('')
out.push('## Summary (alphabetical by ID)')
out.push('')
out.push('| ID | Title | ISBN | Price | Pages | Category | In Stock |')
out.push('| --- | --- | --- | --- | --- | --- | --- |')
books
  .slice()
  .sort((a, b) => a.id.localeCompare(b.id))
  .forEach((book) => {
    out.push(
      `| ${escapePipes(book.id)} | ${escapePipes(book.title)} | ${book.isbn || '—'} | ${formatPrice(book.price)} | ${book.pageCount ?? '—'} | ${escapePipes(book.category || '—')} | ${book.inStock ? 'Yes' : 'No'} |`,
    )
  })
out.push('')

books.forEach((book, index) => {
  out.push(`## ${book.title}`)
  out.push('')
  out.push(`**ID:** \`${book.id}\``)
  out.push('')
  const metadata = [
    `- **ISBN:** ${book.isbn || '—'}`,
    `- **Price:** ${formatPrice(book.price)}`,
    `- **Category:** ${book.category || '—'}`,
    `- **Condition:** ${book.condition || '—'}`,
    `- **In Stock:** ${book.inStock ? 'Yes' : 'No'}`,
    `- **Page Count:** ${book.pageCount ?? '—'}`,
    `- **Publication Year:** ${book.publicationYear ?? '—'}`,
    `- **Weight:** ${book.weight ? `${book.weight} g` : '—'}`,
    `- **Tags:** ${formatList(book.tags)}`,
    `- **Era:** ${formatList(book.era)}`,
    `- **Aircraft Types:** ${formatList(book.aircraftTypes)}`,
    `- **Geographic Focus:** ${formatList(book.geographicFocus)}`,
    `- **Source Type:** ${formatList(book.sourceType)}`,
    `- **Research Themes:** ${formatList(book.researchThemes)}`,
    `- **Difficulty:** ${book.difficulty || '—'}`,
    `- **Academic Level:** ${formatList(book.academicLevel)}`,
    `- **Academic Institutions:** ${formatList(book.academicInstitutions)}`,
    `- **Related Books:** ${formatList(book.relatedBookIds)}`,
  ]

  if (book.relatedBlogPosts && book.relatedBlogPosts.length) {
    metadata.push(`- **Related Blog Posts:** ${book.relatedBlogPosts.map((post) => `${post.title} (${post.slug})`).join('; ')}`)
  } else {
    metadata.push('- **Related Blog Posts:** —')
  }

  out.push(metadata.join('\n'))
  out.push('')

  if (book.tableOfContents && book.tableOfContents.length) {
    out.push('**Table of Contents:**')
    book.tableOfContents.forEach((entry) => {
      out.push(`- ${entry}`)
    })
    out.push('')
  }

  if (book.sampleContent && book.sampleContent.length) {
    out.push('**Sample Content:**')
    book.sampleContent.forEach((entry) => {
      const heading = [entry.chapter, entry.title].filter(Boolean).join(' – ')
      out.push(`- ${heading}`)
      if (entry.excerpt) {
        out.push(quoteBlock(entry.excerpt))
      }
    })
    out.push('')
  }

  if (book.authorInsights) {
    out.push('**Author Insights:**')
    out.push(quoteBlock(book.authorInsights))
    out.push('')
  }

  if (book.researchBackground) {
    out.push('**Research Background:**')
    out.push(quoteBlock(book.researchBackground))
    out.push('')
  }

  if (book.academicValue) {
    out.push('**Academic Value:**')
    out.push(quoteBlock(book.academicValue))
    out.push('')
  }

  if (book.specifications) {
    out.push('**Specifications:**')
    Object.entries(book.specifications).forEach(([key, value]) => {
      out.push(`- ${key}: ${value}`)
    })
    out.push('')
  }

  if (book.description) {
    out.push('**Primary Description:**')
    out.push(quoteBlock(book.description))
    out.push('')
  }

  if (index !== books.length - 1) {
    out.push('---')
    out.push('')
  }
})

const outputPath = path.join(__dirname, '..', 'Bookinfo.txt')
fs.writeFileSync(outputPath, out.join('\n'), 'utf8')
console.log('Updated Bookinfo.txt from books.ts')

