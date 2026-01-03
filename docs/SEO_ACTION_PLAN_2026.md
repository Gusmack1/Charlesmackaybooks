## SEO Action Plan (2026) — Charlesmackaybooks.com

### Purpose
This document converts the “long‑term SEO prompt” into a **methodical, repeatable** execution plan for `charlesmackaybooks.com`.

### Non‑negotiables (operating rules)
- **One canonical URL per page**: duplicates are allowed only as legacy access routes, but must not be promoted (no sitemap, no internal links, canonical points to the chosen URL).
- **Measure → ship → validate**: every change should have a measurable intent (GSC/GA4) and a validation step.
- **Accuracy policy for content**: publish only content that can be supported by your own source material (book descriptions, author notes, archival references you possess) or explicitly cited sources you approve.

### Current assets already in the repo (to build on)
- **Keyword tracking**: `data/keyword-tracking.json` + `scripts/keyword-rank-dashboard.cjs` + `reports/keywords/`.
- **Sitemaps**: `src/app/sitemap.ts` + `src/lib/sitemapData.ts`.
- **Structured data**: `src/components/UnifiedSchema.tsx` (+ other SEO components).

---

## Operating cadence (weekly)

### Weekly loop (1–2 small batches/week)
1. **Pick 1–3 targets** (pages/queries) using Search Console + `reports/keywords/latest.md`.
2. **Implement** changes (technical or content) with a clear hypothesis (e.g., “improve CTR for query X by aligning title + snippet”).
3. **Validate**:
   - status codes (200), canonical, robots, sitemap presence
   - structured data (no errors; merchant warnings trending down)
4. **Log outcomes** in a short changelog entry in this doc (or a `docs/seo-changelog.md`).

### Monthly loop
- Refresh keyword map (add/remove keywords), expand topic clusters, and do a light technical audit (indexing + CWV).

---

## Phase 0 — Measurement & technical baseline (Weeks 1–2)

### 0.1 Measurement you will use to make decisions
- **Search Console**: query → page mapping, impressions, clicks, CTR, average position.
- **Site health**: crawlability (robots/sitemaps), duplication signals (canonical alternates), structured data issues.
- **Conversion proxy** (even if checkout is external): clicks on buy buttons, outbound to eBay/PayPal, add‑to‑cart events.

### 0.2 Canonicalization / duplication control (high priority)
Checklist:
- Only canonical URLs appear in **sitemap**.
- Internal links only point to canonical URLs.
- Legacy/duplicate routes:
  - keep accessible for users if needed
  - **noindex** if they create large duplicate sets
  - never appear in nav/sitemap/structured data as the primary URL

Common sources of unwanted duplicates:
- query parameters (search/filter)
- trailing slash variants
- legacy route patterns (e.g., `/book/...` vs `/books/...`)

### 0.3 Structured data correctness (high priority)
Maintain:
- Product/Offer on book pages
- Breadcrumbs (avoid query‑param breadcrumb URLs)
- Returns policy in offers (Merchant warnings)

### 0.4 Performance and crawl efficiency (medium priority)
- Track Core Web Vitals + LCP on key templates (home, books list, book detail, blog post).
- Reduce unnecessary JS on critical pages where possible.

---

## Phase 1 — On‑page & information architecture (Weeks 2–6)

### 1.1 Keyword → page map (canonical targets)
Principle:
- **One primary query per page**.
- Secondary queries must reinforce the primary intent (no cannibalization).

Inputs:
- `SEO_KEYWORD_STRATEGY.md`
- `data/keyword-tracking.json`
- Search Console query exports

Outputs:
- A “primary keyword” field per:
  - category page
  - each book page
  - cornerstone guides (research resources)

### 1.2 Titles, meta descriptions, headings
Execution rules:
- Titles must be **unique** and aligned with the page’s query intent.
- Meta descriptions should summarize what’s on the page (no empty marketing).
- H1 is the page topic; H2s reflect subtopics.

### 1.3 Internal linking (build topic clusters)
Cluster pattern:
- Category page → book pages → 1–3 related blog posts → back to category/books hub
- Research resources pages should link to the most relevant book/category pages.

---

## Phase 2 — Content strategy (Weeks 4–16, then ongoing)

### 2.1 Topic clusters (examples)
- **Scottish aviation history** cluster:
  - category page (`/category/scottish-aviation-history`)
  - cornerstone guide (new): “Scottish Aviation History — research guide” (links to timeline/glossary + key books)
  - supporting posts (existing + new), each mapped to a long‑tail query

- **WWI aviation books** cluster:
  - category page + book pages + glossary expansions + aircraft/engine explainers (only if sourceable)

### 2.2 Editorial calendar
Each new piece should be defined by:
- target query
- target canonical page to reinforce (book/category)
- required source material
- internal links to add

### 2.3 Content QA checklist
- All claims supported by approved sources.
- Images have descriptive alt text.
- Links to relevant books/categories are present.
- Schema present (Article where appropriate).

---

## Phase 3 — Authority & links (Weeks 6–26, ongoing)

### 3.1 Outreach targets (high‑fit)
- museums, archives, aviation history groups, universities, local history societies
- places likely to cite an author/researcher page or a specific book page

### 3.2 Assets that earn links
- researcher guides
- bibliography/glossary/timeline expansions
- “how to cite” pages for academic use

---

## Phase 4 — Merchant + conversion improvements (Weeks 8–26)

### 4.1 Merchant listings hygiene
- keep Product/Offer data complete and consistent
- ensure returns policy is present in `offers`

### 4.2 Conversion tracking
Even with external checkout:
- track outbound clicks to eBay/PayPal
- track add-to-cart / view_item events
- use these as KPI proxies for SEO changes

---

## What we do next (to run this plan)

### Decisions needed from you (to avoid wasted work)
1. **Content sourcing rule**: what sources are allowed (your own descriptions only, or external citations allowed)?
2. **Top 10 priority queries** for the next 6 weeks (we can start from `data/keyword-tracking.json`).
3. **Primary conversion**: PayPal, eBay, or on‑site cart (which should we optimize first)?


