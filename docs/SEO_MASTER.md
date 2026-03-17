# SEO Master – Charles Mackay Books

**Purpose:** Single source of truth for search engine configuration. All changes must align with this doc.

---

## 1. Canonical URLs

- **Format:** `https://charlesmackaybooks.com/path` (no trailing slash, no www)
- **Rule:** Every indexable page MUST export `alternates.canonical` in metadata
- **Noindex pages:** Still set canonical to self (prevents wrong inheritance from layout)
- **Source:** Use `SITE_CONSTANTS.BASE_URL` from `@/config/constants` – never hardcode the domain

---

## 2. URL Normalization (proxy.ts)

| Input | Output |
|-------|--------|
| `www.charlesmackaybooks.com/*` | 308 → `charlesmackaybooks.com/*` |
| `*/path/` (trailing slash) | 308 → `*/path` |
| `/blog/scottish-aviation-news*` | 308 → `/aviation-news*` |
| `/book/{slug}` | 308 → `/books/{id}` (slug→id via `LEGACY_BOOK_SLUG_TO_ID`) |
| `/books/captain-clouds` | 308 → `/books/captain-eric-brown` |
| `/aircraft/{slug}` | 308 → `/blog/{slug}` or `/blog` (via `LEGACY_AIRCRAFT_TO_BLOG`) |
| `/ai-prompt-system` | 410 Gone |
| `/research-methodology` | 410 Gone |

---

## 3. Noindex Paths

**Proxy (X-Robots-Tag):** `/checkout`, `/order-complete`, `/order-tracking`, `/search`, `/api/*`, `/fonts/*`, `*.woff2` (note: `/ai-prompt-system` returns 410)

**robots.txt Disallow:** `/_next/`, `/api/`, `/admin/`, `/ai-prompt-system/`, `/checkout/`, `/order-complete/`, `/order-tracking/`, `/search/`, `/fonts/`

---

## 4. Sitemap

- **URL:** `https://charlesmackaybooks.com/sitemap.xml`
- **Source:** `scripts/generate-sitemap.cjs` (runs at prebuild) → `public/sitemap.xml`
- **Includes:** Static pages, blog, books, categories, indexable news only
- **News filter:** ≥180 words OR ≥100 words + 2 sections (matches `isIndexableNewsArticle`)
- **Excludes:** checkout, search, order-*, noindex pages, draft news
- **Why build-time:** Netlify serverless lacks fs at request time; static file avoids 500

---

## 5. Structured Data

- **UnifiedSchema** (`src/components/UnifiedSchema.tsx`): WebSite, Organization, BreadcrumbList, Product (books), Article (blog/news)
- **Book pages:** Product + Offer with price, availability, returns
- **Blog posts:** Article via EnhancedBlogSEO
- **News:** NewsArticle only for indexable articles (no schema for thin/noindex)

---

## 6. Metadata Rules

- **Title:** Unique per page, ≤60 chars, primary keyword
- **Description:** Unique, 150–160 chars, summarize content
- **Robots:** Default index/follow; override only for noindex pages
- **No hreflang** for single-language (en-GB) site – was causing "Alternative page" GSC issues

---

## 7. Internal Links

- Use canonical paths only (no trailing slash)
- Link to `/aviation-news` not `/news`
- Link to `/books/{id}` not `/book/{id}`

---

## 8. GSC Maintenance

- **Weekly:** Check Page indexing → Not indexed reasons
- **Monthly:** Verify sitemap count matches expected; check Core Web Vitals
- **On deploy:** Confirm sitemap.xml returns 200 and lists correct URLs

---

## 9. Do NOT

- Add hreflang for single-language site
- Put noindex pages in sitemap
- Use trailing slash in canonicals or internal links
- Hardcode `https://charlesmackaybooks.com` – use `SITE_CONSTANTS.BASE_URL`
- Add canonical pointing to a different page (except intentional redirect targets)

---

## 10. File Reference

| Concern | File |
|---------|------|
| URL redirects, noindex headers | `src/proxy.ts` |
| Sitemap generation | `scripts/generate-sitemap.cjs` |
| News indexability | `src/lib/newsroom.ts` → `isIndexableNewsArticle()` |
| Schema | `src/components/UnifiedSchema.tsx`, `EnhancedBlogSEO.tsx` |
| robots.txt | `public/robots.txt` |
| Constants | `src/config/constants.ts` |
