# Google Search Console – Indexing

**See `docs/SEO_MASTER.md` for the full technical spec.** This doc covers GSC-specific notes.

## Site configuration

- **Legacy 404s:** `/news`, `/timeline`, `/book`, `/book/*`, `/aircraft`, `/aircraft/*`, `/blog/supermarine-spitfire-development`
- **308 redirects:** `/blog/scottish-aviation-news` → `/aviation-news`
- **410 Gone:** `/research-methodology`
- **Sitemaps:** `sitemap.xml`, `sitemap-images.xml` submitted in GSC

## Crawled – currently not indexed

Google crawled but chose not to index. Common causes: thin content, low perceived value, crawl budget.

**Actions:** Ensure unique content, internal links from high-value pages, no duplicates. News articles need ≥180 words (or ≥100 + 2 sections) to be sitemap-eligible.

## GSC maintenance

- **Weekly:** Page indexing → Not indexed → review reasons
- **Monthly:** Sitemaps → verify URL count; Core Web Vitals
- **Removals:** Legacy URLs had temporary removals submitted (~6 months)
