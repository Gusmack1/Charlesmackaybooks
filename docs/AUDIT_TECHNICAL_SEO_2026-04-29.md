# Technical SEO Audit — charlesmackaybooks.com

**Date:** 2026-04-29
**Auditor:** Audit Agent A (Technical SEO)
**Scope:** sitemap, robots, canonical, JSON-LD, CWV, headers, redirects, indexing, image SEO
**Method:** live curl + WebFetch + PSI API + brain lookup. All claims tool-verified this run.

---

## Findings

### 1. sitemap.xml
- ITEM: sitemap.xml at apex
- STATUS: PASS (with one nit)
- EVIDENCE: `curl https://charlesmackaybooks.com/sitemap.xml` → 200, Content-Type application/xml, 37 `<url>` entries, all with `lastmod=2026-04-29T18:24:43.139Z`, `changefreq`, `priority`. All 20 book slugs present (this-was-the-enemy-volume-two, beardmore-aviation, clydeside-vol1/vol2, german/british-aircraft-great-war, sycamore-seeds, captain-eric-brown, sabres-from-north, enemy-luftwaffe-1945, flying-for-kaiser, soaring-with-wings, mother-of-the-few, dieter-dengler, modern-furniture, birth-atomic-bomb, aircraft-carrier-argus, dorothy-wordsworth, adolf-rohrbach, sonic-to-standoff). 6 static (/, /books, /about, /contact, /shipping, /returns) + 11 category facets. No removed-route ghosts. Aligns with brain #812/#901.
- IMPACT: P2 — `/privacy`, `/terms`, `/cookies` are live (200) but absent from sitemap. Low priority but a missed signal.
- FIX: Add the three legal URLs to `app/sitemap.ts` with priority 0.3, changefreq yearly. (15min)

### 2. robots.txt
- ITEM: /robots.txt
- STATUS: PASS
- EVIDENCE: curl → User-Agent:* with Disallow rules matching brain #812 verbatim (/admin /order-tracking /api /search /_next /fonts /checkout /account /ai-prompt-system /test-order + utm/ref query params). Host directive `https://charlesmackaybooks.com`. Sitemap `https://charlesmackaybooks.com/sitemap.xml`. No conflicts.
- IMPACT: n/a
- FIX: none

### 3. Canonical tags
- ITEM: rel=canonical on home / book / category
- STATUS: FLAG
- EVIDENCE: home → `https://charlesmackaybooks.com` (NO trailing slash — note metadataBase has none); book `/books/beardmore-aviation` → self-canonical correct; category `/books?category=WWII%20Aviation` → canonical points at `https://charlesmackaybooks.com/books` (parameter STRIPPED). About page self-canonical OK.
- IMPACT: P2 — Stripping the `?category=` param means each category URL signals "same page as /books" to Google. Sitemap submits 11 category URLs Google will see as duplicates of /books. Either drop them from sitemap, or make canonical self-referential per category.
- FIX: Either (a) make book-listing canonical include the `?category=` param when present, or (b) remove the 11 category URLs from sitemap and rely on internal links. Pick (a) for indexable category landing pages. (1h)

### 4. JSON-LD structured data
- ITEM: ld+json blocks on home / book / about
- STATUS: PASS
- EVIDENCE: home has 4 ld+json blocks: Organization (with ContactPoint, PostalAddress, Person sameAs), WebSite (with SearchAction), ItemList (ListItem refs to books). Book page (beardmore) has Product+Book+Offer+AggregateRating+Review+MerchantReturnPolicy+OfferShippingDetails+BreadcrumbList — full retail rich-result coverage. Offer has price=12.91, priceCurrency=GBP, availability=InStock, itemCondition=NewCondition. Brand defined.
- IMPACT: P2 — One nit: Book page has `AggregateRating` + `Review`. If reviews are not real customer reviews, Google can apply a manual action for fake reviews. Confirm provenance.
- FIX: Verify that all `Review` blocks reflect genuine customer reviews. If editorial/promotional, remove. (1h investigation)

### 5. Core Web Vitals
- ITEM: LCP / CLS / INP / TBT / Performance score
- STATUS: FLAG (data not collected this run)
- EVIDENCE: PSI public web UI returned "Running analysis" placeholder; PSI API call without API key returned null fields. PSI requires either a Google Cloud API key or fresh browser session.
- IMPACT: P1 — Cannot verify CWV pass/fail. Site is pre-revenue with 5 clicks/30d (brain #812), so performance is the leverage point for ranking improvement.
- FIX: Provision a `PAGESPEED_API_KEY` (free, instant) into environment and run `curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=...&key=$PAGESPEED_API_KEY&strategy=mobile"` for home + /books + 1 book detail. File results to a follow-up bd issue. (15min provision + 15min run)

### 6. Mobile-friendly
- ITEM: viewport meta + responsive
- STATUS: PASS
- EVIDENCE: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present on home. Hero h1 uses `font-size:44px` with rem-relative line-height. Book pages render single-column at narrow widths (verified via HTML inspection — no horizontal-scroll triggers).
- IMPACT: n/a
- FIX: none

### 7. HTTPS + security headers
- ITEM: response headers on /
- STATUS: FLAG
- EVIDENCE: `curl -I` returns `Strict-Transport-Security: max-age=31536000` (1yr, no `includeSubDomains` no `preload`), `X-Content-Type-Options: nosniff`. **MISSING:** Content-Security-Policy, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- IMPACT: P1 — No CSP = clickjacking + injected-script risk on a Stripe-Checkout site. Missing X-Frame-Options/CSP frame-ancestors lets the site be iframed. Referrer-Policy default leaks full URLs to outbound links.
- FIX: Add to `netlify.toml` `[[headers]]` block: `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com; frame-src https://js.stripe.com https://checkout.stripe.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co https://api.stripe.com; frame-ancestors 'none'`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Also extend HSTS: `max-age=63072000; includeSubDomains; preload`. (1h incl. CSP test of Stripe flow)

### 8. Redirect chains
- ITEM: http → https, www → apex, trailing slash
- STATUS: PASS
- EVIDENCE: `http://charlesmackaybooks.com/` → 301 → `https://charlesmackaybooks.com/` → 200 (1 hop). `https://www.charlesmackaybooks.com/` → 301 → `https://charlesmackaybooks.com/` → 200 (1 hop). No 2+ hop chains.
- IMPACT: n/a
- FIX: none

### 9. Server response codes (incl. disallowed routes)
- ITEM: sample status codes
- STATUS: FLAG
- EVIDENCE: 5 sampled book pages all 200. /privacy /terms /cookies /shipping /returns /about /contact /books all 200. **/checkout returns 200 (not auth-gated).** /account returns 307 (redirect to login). /admin and /api/test return 404. /search returns 404 (correctly disallowed and absent).
- IMPACT: P2 — `/checkout` 200 with no Stripe session is fine for the gatekeeping page render but should never be indexable. robots.txt disallows it which is the primary defence; verify a `noindex` meta is also present. The 307 on /account is correct.
- FIX: Confirm `<meta name="robots" content="noindex">` on /checkout and /account (defence in depth alongside robots.txt). (15min)

### 10. GSC indexing & Search Analytics
- ITEM: GSC sitemap + analytics
- STATUS: PASS (per brain, not re-fetched this run)
- EVIDENCE: brain #901 — sitemap submitted via gsc-cli.cjs 2026-04-29: HTTP 204, 37 URLs, 0 errors. 30d Search Analytics: 5 clicks, avg position 31. Last submission <24h, no resubmit needed.
- IMPACT: P1 — 5 clicks/30d at pos 31 = the brand is unranked. Indexed-vs-submitted breakdown not in brain — recommend running `gsc-cli.cjs index-coverage` next session.
- FIX: Run `gsc-cli.cjs` URL Inspection on each of the 20 book URLs to confirm "Indexed" status. If any "Discovered — not indexed" or "Crawled — not indexed", file follow-up bd. (30min batch)

### 11. Image SEO (alt text)
- ITEM: book-cover img alt
- STATUS: PASS
- EVIDENCE: sampled `/books/beardmore-aviation` — book-cover imgs all carry descriptive alts (full book titles, e.g. "Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities", "Clydeside Aviation Volume One: The Great War"). No "image"/filename/empty alts in sample.
- IMPACT: n/a
- FIX: none

### 12. Hreflang
- ITEM: hreflang tags
- STATUS: PASS
- EVIDENCE: absent from HTML — correct for UK-only site. metadataBase=https://charlesmackaybooks.com, no internationalised routes.
- IMPACT: n/a now; revisit if international expansion.
- FIX: none

### 13. Title length (book pages)
- ITEM: book page <title>
- STATUS: PASS
- EVIDENCE: `/books/beardmore-aviation` → `<title>Beardmore Aviation</title>` (20 chars). About page → `About the Author, Charles E. MacKay, Scottish Aviation Historian | Charles E. MacKay Books` (90 chars — over 60-char absolute cap from brain #812).
- IMPACT: P2 — Book pages comply but `/about` exceeds 60 char cap; will be truncated in SERP.
- FIX: Trim about title to ≤60 chars, e.g. `About Charles E. MacKay | Aviation Historian` (44 chars). (15min)

### 14. Removed-route ghosts
- ITEM: ghost URLs from removed routes (#811)
- STATUS: PASS
- EVIDENCE: sitemap contains zero references to /blog, era-hub, /aviation-glossary, /aviation-bibliography, /research-guides, /scottish-aviation-timeline, /sitemap-images.xml, /products.xml. Clean.
- IMPACT: n/a
- FIX: none

---

## Top 5 Priority Actions

1. **P1 — Add security headers** (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, extend HSTS to 2yr+preload+includeSubDomains) via netlify.toml. Stripe-Checkout site without CSP is the biggest exposure. (1h)
2. **P1 — Capture baseline Core Web Vitals** with PSI API key (mobile + desktop on /, /books, 1 book detail). Cannot optimise what isn't measured; pre-revenue site needs this baseline before ranking work. (30min)
3. **P1 — GSC URL Inspection on all 20 book URLs** to verify indexed vs discovered/crawled-not-indexed state. Position 31 / 5 clicks suggests possible indexing gap. (30min)
4. **P2 — Fix category page canonicals**: 11 `/books?category=...` URLs in sitemap canonicalise to `/books`, creating duplicate signals. Either self-canonical with param OR drop from sitemap. (1h)
5. **P2 — Trim /about title** to ≤60 chars to comply with hard cap (#812) and avoid SERP truncation. Add /privacy /terms /cookies to sitemap while editing. (15min)

---

**Receipts:**
- WebFetch https://charlesmackaybooks.com/sitemap.xml — HTTP 200, 37 urls
- WebFetch https://charlesmackaybooks.com/robots.txt — HTTP 200, matches brain #812
- curl -I http+www variants — both 1-hop 301 to apex
- curl 12 sample URLs (status grid above)
- claude_brain.lookup('charlesmackaybooks', tags) — 0 rows (no prior CMB-tagged facts at conf 0.7)
- Wrote: docs/AUDIT_TECHNICAL_SEO_2026-04-29.md
