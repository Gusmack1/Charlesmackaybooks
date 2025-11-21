#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const bookinfoPath = path.join(__dirname, '..', 'Bookinfo.txt')
const generatorPath = path.join(__dirname, 'export-book-reference.cjs')

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return null
  }
}

const TIMESTAMP_REGEX = /^Last generated: .+$/m

const before = readFileSafe(bookinfoPath)
try {
  execFileSync('node', [generatorPath], { stdio: 'ignore' })
} catch (err) {
  console.error('Failed to regenerate Bookinfo.txt:', err.message || err)
  process.exit(1)
}

const after = readFileSafe(bookinfoPath)

const normalize = (content) => {
  if (content === null) return null
  return content.replace(TIMESTAMP_REGEX, 'Last generated: __CHECK__')
}

if (normalize(before) !== null && normalize(before) === normalize(after)) {
  if (before !== null) {
    fs.writeFileSync(bookinfoPath, before, 'utf8')
  }
  console.log('Bookinfo.txt is up to date ✅')
  process.exit(0)
}

if (before !== null) {
  fs.writeFileSync(bookinfoPath, before, 'utf8')
}

console.error('Bookinfo.txt is out of date. Please run `npm run docs:books` to refresh it.')
process.exit(1)

