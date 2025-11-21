#!/usr/bin/env node
/**
 * Replace inline /blog-images/default-generic.svg placeholders inside blog content
 * with real, license-compliant images sourced from image-approvals.json (preferred)
 * or the fallback blogImageManifest.ts entries.
 *
 * Usage:
 *   node scripts/replace-blog-placeholders.cjs             # process every blog post
 *   node scripts/replace-blog-placeholders.cjs slug-a ...  # process specific slugs
 */

const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog')
const APPROVALS_PATH = path.join(ROOT, 'data', 'image-approvals.json')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'blogImageManifest.ts')
const TARGET_SLUGS = process.argv.slice(2).map((arg) => arg.toLowerCase())

function readJsonSafe(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}

function loadApprovals() {
  const json = readJsonSafe(APPROVALS_PATH)
  return json && json.posts ? json.posts : {}
}

function loadManifestApi() {
  try {
    const source = fs.readFileSync(MANIFEST_PATH, 'utf8')
    const transpiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    })
    const module = { exports: {} }
    const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText)
    fn(module.exports, require, module, MANIFEST_PATH, path.dirname(MANIFEST_PATH))
    return module.exports
  } catch (err) {
    console.warn('[placeholder-fix] Unable to load blogImageManifest.ts:', err.message)
    return null
  }
}

function loadBlogSlugs() {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(BLOG_DIR, slug, 'page.tsx')))
}

function resolveSlugs(allSlugs) {
  if (!TARGET_SLUGS.length) return { slugs: allSlugs, missing: [] }
  const normalized = allSlugs.map((slug) => slug.toLowerCase())
  const resolved = []
  const missing = []
  for (const requested of TARGET_SLUGS) {
    const idx = normalized.indexOf(requested)
    if (idx >= 0) {
      resolved.push(allSlugs[idx])
    } else {
      missing.push(requested)
    }
  }
  return { slugs: [...new Set(resolved)], missing }
}

function mapCandidate(raw) {
  if (!raw || !raw.url) return null
  const url = raw.url.startsWith('http') ? raw.url : raw.url.startsWith('/') ? raw.url : `/blog-images/${raw.url}`
  return {
    url,
    alt: (raw.alt || raw.title || '').trim(),
    caption: (raw.caption || '').trim(),
  }
}

function getCandidatesForSlug({ slug, approvals, manifestApi }) {
  const approved =
    approvals[slug]?.candidates
      ?.filter((entry) => entry.approved && entry.url)
      .map(mapCandidate)
      .filter(Boolean) || []

  const manifest =
    typeof manifestApi?.getImageCandidates === 'function'
      ? (manifestApi.getImageCandidates(slug) || []).map(mapCandidate).filter(Boolean)
      : []

  const seen = new Set()
  const deduped = []
  for (const candidate of [...approved, ...manifest]) {
    if (!candidate || !candidate.url || seen.has(candidate.url)) continue
    seen.add(candidate.url)
    deduped.push(candidate)
  }
  return deduped
}

const PLACEHOLDER_IMG_RE = /<img\s+([^>]*?)src=(['"])\/blog-images\/default-generic\.svg\2([^>]*)>/gi

function escapeAttr(value) {
  return value.replace(/"/g, '&quot;')
}

function escapeHtml(value) {
  return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function replacePlaceholdersInSource(source, slug, candidates) {
  if (!PLACEHOLDER_IMG_RE.test(source)) return { source, replacements: 0 }
  PLACEHOLDER_IMG_RE.lastIndex = 0
  let useIndex = 0
  const totalCandidates = candidates.length

  const replaced = source.replace(PLACEHOLDER_IMG_RE, (match, before, quote, after) => {
    if (!totalCandidates) return match
    const candidate = candidates[Math.min(useIndex, totalCandidates - 1)]
    useIndex += 1
    if (!candidate || !candidate.url) return match

    let attrs = `${before}${after}`.trim()
    attrs = attrs.replace(/\bsrc\s*=\s*(['"]).*?\1/gi, '').replace(/\balt\s*=\s*(['"]).*?\1/gi, '').trim()
    const altText = candidate.alt || candidate.caption || 'Historical aviation reference image'
    const caption = candidate.caption || candidate.alt || 'Verified archival imagery'
    const needsClass = !/\bclass\s*=/.test(attrs)
    const classAttr = needsClass ? ' class="w-full h-auto rounded-lg shadow-lg"' : ''
    const extraAttrs = attrs ? ` ${attrs}` : ''
    const img = `<img src="${candidate.url}" alt="${escapeAttr(altText)}"${classAttr}${extraAttrs}/>`
    return `<figure class="my-8 space-y-2">\n        ${img}\n        <figcaption class="text-sm text-center italic text-slate-500">${escapeHtml(caption)}</figcaption>\n      </figure>`
  })

  const actualReplacements = useIndex
  return { source: replaced, replacements: actualReplacements }
}

function main() {
  const approvals = loadApprovals()
  const manifestApi = loadManifestApi()
  const availableSlugs = loadBlogSlugs()
  const { slugs, missing } = resolveSlugs(availableSlugs)

  if (!slugs.length) {
    console.error('No blog slugs matched the requested filters.')
    process.exitCode = 1
    return
  }
  if (missing.length) {
    console.warn(`[placeholder-fix] Missing slugs: ${missing.join(', ')}`)
  }

  let totalFilesTouched = 0
  let totalReplacements = 0
  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, slug, 'page.tsx')
    let source
    try {
      source = fs.readFileSync(filePath, 'utf8')
    } catch {
      console.warn(`[placeholder-fix] Unable to read ${filePath}`)
      continue
    }

    PLACEHOLDER_IMG_RE.lastIndex = 0
    if (!PLACEHOLDER_IMG_RE.test(source)) {
      continue
    }
    PLACEHOLDER_IMG_RE.lastIndex = 0

    const candidates = getCandidatesForSlug({ slug, approvals, manifestApi })
    if (!candidates.length) {
      console.warn(`[placeholder-fix] No candidate images found for slug "${slug}", skipping.`)
      continue
    }

    const { source: updatedSource, replacements } = replacePlaceholdersInSource(source, slug, candidates)
    if (replacements > 0 && updatedSource !== source) {
      fs.writeFileSync(filePath, updatedSource, 'utf8')
      totalFilesTouched += 1
      totalReplacements += replacements
      console.log(`[placeholder-fix] ${slug}: replaced ${replacements} placeholder image(s).`)
    }
  }

  console.log(`[placeholder-fix] Completed. Files updated: ${totalFilesTouched}, placeholders replaced: ${totalReplacements}.`)
  if (totalReplacements === 0) {
    console.log('[placeholder-fix] No placeholders were replaced. You may need to supply more approved images.')
  }
}

main()

