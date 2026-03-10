# Google Search Console – Indexing Issues

This document explains common GSC indexing statuses and how the site is configured to address them.

## Page with redirect (37 affected)

**What it means:** Google discovered URLs that redirect to another URL (e.g. trailing slash, legacy paths). It does not index the redirect target as a separate “indexed” page in this report.

**Examples:**
- `https://charlesmackaybooks.com/books/clydeside-aviation-vol2/` → redirects to `/books/clydeside-aviation-vol2`
- `https://charlesmackaybooks.com/book/this-was-the-enemy-volume-two` → redirects to `/books/this-was-the-enemy-volume-two`
- `https://charlesmackaybooks.com/aviation-bibliography/` → redirects to `/aviation-bibliography`

**Site configuration:**
- Middleware redirects trailing-slash URLs to canonical (no slash) with 308.
- Legacy `/book/` paths redirect to `/books/`.
- Sitemap and internal links use canonical URLs only (no trailing slash).

**Action:** No code change needed. Over time, Google will consolidate. To speed up:
1. In GSC, use **Removals** to request removal of old redirecting URLs if they still appear in search.
2. Ensure external links and backlinks point to canonical URLs where possible.

---

## Crawled – currently not indexed (74 affected)

**What it means:** Google crawled the URL but chose not to add it to the index. Common reasons: crawl budget, thin content, or low perceived value.

**Examples:**
- `https://charlesmackaybooks.com/how-to-order`
- `https://charlesmackaybooks.com/aviation-news`
- `https://charlesmackaybooks.com/_next/static/media/*.woff2` (font files)

**Site configuration:**
- `robots.txt` now blocks `/_next/`, `/api/`, `/checkout/`, `/order-complete/`, `/order-tracking/`, `/search/` so Google does not waste crawl budget on these.
- Font files (`/_next/static/media/*.woff2`) are blocked via `Disallow: /_next/`.
- Important pages (how-to-order, aviation-news, blog, etc.) are in the sitemap and have canonical URLs.

**Action for content pages:** Google decides indexing based on quality and relevance. Ensure:
- Unique, useful content
- Clear internal links from high-value pages
- No duplicate or near-duplicate content

**Validation:** “Validate fix” in GSC can fail for redirecting URLs. Validate the **canonical** URL (e.g. `/how-to-order` without trailing slash), not the redirect source.

---

## Canonical URLs

All pages declare canonical URLs without trailing slashes, e.g.:
- `https://charlesmackaybooks.com/books/clydeside-aviation-vol2`
- `https://charlesmackaybooks.com/aviation-news`

Internal links and the sitemap use these canonical forms only.
