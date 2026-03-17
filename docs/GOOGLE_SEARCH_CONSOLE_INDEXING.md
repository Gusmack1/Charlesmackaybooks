# Google Search Console – Indexing

This document explains GSC indexing statuses and how the site is configured.

## Site configuration (brand new, no redirects)

- **No redirects.** Legacy paths (`/news`, `/timeline`, `/book`, `/aircraft`, `/blog/supermarine-spitfire-development`) return 404. Use canonical URLs only.
- **308 redirects** for retired newsroom: `/blog/scottish-aviation-news` → `/aviation-news` (preserves link equity).
- **410 Gone** for explicitly removed page: `/research-methodology`.
- **Sitemap:** `sitemap.xml` submitted in GSC. Canonical URLs only (no trailing slash).
- **robots.txt** blocks `/_next/`, `/api/`, `/checkout/`, `/order-complete/`, `/order-tracking/`, `/search/` to preserve crawl budget.

## Crawled – currently not indexed

**What it means:** Google crawled the URL but chose not to add it to the index. Common reasons: crawl budget, thin content, or low perceived value.

**Examples:**
- `https://charlesmackaybooks.com/how-to-order`
- `https://charlesmackaybooks.com/aviation-news`
- `https://charlesmackaybooks.com/_next/static/media/*.woff2` (font files)

**Action for content pages:** Google decides indexing based on quality and relevance. Ensure:
- Unique, useful content
- Clear internal links from high-value pages
- No duplicate or near-duplicate content

## Canonical URLs

All pages declare canonical URLs without trailing slashes, e.g.:
- `https://charlesmackaybooks.com/books/clydeside-aviation-vol2`
- `https://charlesmackaybooks.com/aviation-news`

Internal links and the sitemap use these canonical forms only.

## GSC updates completed

- **Sitemaps:** `sitemap.xml` and `sitemap-images.xml` submitted.
- **Removals:** Temporary removal requests submitted for legacy URLs:
  - `/news` (URL only)
  - `/timeline` (URL only)
  - `/book` (prefix – all `/book/*`)
  - `/aircraft` (prefix – all `/aircraft/*`)
  - `/blog/supermarine-spitfire-development` (URL only)

Removals last ~6 months; 404s will drop from the index as Google recrawls.
