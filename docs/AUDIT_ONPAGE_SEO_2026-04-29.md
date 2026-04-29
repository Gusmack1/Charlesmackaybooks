# On-Page SEO + Content + Brand-Rank Audit, 2026-04-29

Auditor: Agent B (re-spawn). Scope: 14 items. Property: charlesmackaybooks.com (Next.js 16 App Router, Netlify). Window: 30d (2026-03-29 to 2026-04-29).

## 1. "Charles Mackay" SERP rank — STATUS: FAIL P0
- EVIDENCE: WebSearch "charles mackay author" returns Wikipedia 19th-c poet (Q725382) + Goodreads + Pan Macmillan top-3; CMB nowhere on page 1. GSC 30d "/" pos 28.7, 22 imp, 2 clicks. "/about" pos 19.8, 17 imp, 1 click.
- IMPACT: P0. Brand disambiguation is the single largest visibility blocker (Agent F #560).
- FIX: Rebrand all customer-visible copy to "Charles E. MacKay (aviation historian)" — add disambiguator in title.default, h1, og:title, organization schema name. Effort 1h.

## 2. Book-title rank — STATUS: PASS for owned terms, MIXED for generic
- EVIDENCE: WebSearch "Beardmore Aviation book Charles MacKay" — CMB book page rank 1, Amazon UK/US present. "Clydeside Aviation book history" — CMB vol1+vol2 pages rank 2-3 + Google Books + Waterstones + Blackwell's. "Charles E. MacKay aviation Glasgow" — CMB pages dominate but show STALE removed-route titles (categories, /aviation-bibliography, /scottish-aviation-timeline, /for-researchers, /blog/*).
- IMPACT: P1. Stale Google index = wasted authority + 308-redirect dilution.
- FIX: Re-submit sitemap.xml + GSC URL-Inspection on top-20 stale URLs request reindex; convert /blog/* /aviation-news/* /aviation-bibliography /scottish-aviation-timeline /for-researchers /categories from 308 to 410 Gone via Netlify _redirects. Effort 1h.

## 3. Title tags — STATUS: MIXED P1
- EVIDENCE: layout.tsx:30 default "Charles E. MacKay Books, Scottish Aviation History Books Online" (60 chars OK). about:6 "About the Author, Charles E. MacKay, Scottish Aviation Historian" (61 chars over cap). contact:4 "Contact Charles E. MacKay, Book Orders & Research Enquiries" (60). returns:5 "Returns & Refunds Policy" (NO BRAND, weak). privacy:5 "Privacy Policy" (NO BRAND). terms:5 "Terms & Conditions" (NO BRAND). cookies:6 "Cookie Policy" (NO BRAND). shipping:6 "Shipping Information, Royal Mail Tracked Worldwide" (50). Book pages: title.absolute hard-cap 60 (page.tsx:34, verified).
- IMPACT: P1. /returns /privacy /terms /cookies inherit template "%s | Charles E. MacKay Books" so brand IS appended — verify live; but titles too generic for entity recognition.
- FIX: Add disambiguator. e.g. "Returns Policy, Charles E. MacKay (Aviation Historian)". Effort 30min.

## 4. Meta descriptions — STATUS: MOSTLY OK P2
- EVIDENCE: All audited pages have descriptions ≤155-180 chars. layout.tsx:33 default 200 chars (OVER cap). about:7 desc 195 chars (over). returns:6, shipping:7 ≤155. Book pages slice description.substring(0,155).
- IMPACT: P2. Google truncates at ~155-160. Default + about over-cap.
- FIX: Trim layout default + about description to ≤155. Effort 15min.

## 5. H1/H2/H3 hierarchy — STATUS: PASS
- EVIDENCE: All sampled pages have exactly one h1 (page.tsx:97, books:28, about:31, book-detail:187). h2/h3 nested correctly, descriptive. about page: 13 h3 sub-sections under "Living biography" h2.
- IMPACT: none.
- FIX: none.

## 6. Internal linking — STATUS: PASS
- EVIDENCE: WebFetch / counted ~27 internal /books/ links (hero 3, featured 4, cat-hubs ~7 categories, footer-hub links to /about /shipping /returns /contact + /books). Books page has identical hub block (books/page.tsx:64-80). /page.tsx:200 surfaces all categories from books data.
- IMPACT: none.
- FIX: none. (Hub blocks per #812 working.)

## 7. External outbound to authoritative sources — STATUS: FAIL P1
- EVIDENCE: WebFetch / and /about — 0 external links to companieshouse.gov.uk, nationalarchives.gov.uk, openlibrary.org, wikipedia, isbnsearch.org. Body text mentions Robert Gibson 1985, Hodder Headline 2002, Companies House SC858624 BUT none linked. Person schema absent on /about (WebFetch confirms no JSON-LD with Person type).
- IMPACT: P1. E-E-A-T signal missing. Disambiguation harder without authoritative anchors.
- FIX: Add /about external links: Companies House SC005175 (Robert Gibson), SC858624 (A MacKay Publisher Ltd), UK National Archives discovery.nationalarchives.gov.uk/details/c/F270555. Effort 30min.

## 8. Image alt + filename — STATUS: PASS
- EVIDENCE: BookCard.tsx:21 alt={book.title}, sizes responsive, fill. Hero page.tsx:125 alt={b.title} loading="eager". Filenames slug-style /book-covers/<id>.jpg. About page.tsx:28 alt="Charles E. MacKay at Turnhouse, 1971" descriptive. width/height implicit via fill+aspectRatio.
- IMPACT: none.
- FIX: none.

## 9. Schema markup — STATUS: PARTIAL P1
- EVIDENCE: layout.tsx:74 Organization + WebSite schemas present (good). Book pages: Product + Book + BreadcrumbList + AggregateRating + Review (book-detail:97-162, comprehensive). /about MISSING Person schema entirely (WebFetch confirms). Person schema would carry birthDate=1951-04-01, jobTitle, alumniOf=Glasgow if applicable, sameAs to authoritative URLs. Organization schema duplicated (layout L80 + page.tsx:60) — minor duplication.
- IMPACT: P1. Person schema is the strongest disambiguation signal vs Q725382 poet.
- FIX: Add Person JSON-LD to /about with birthDate, jobTitle "Aviation historian", knowsAbout, sameAs (Companies House, National Archives, ISBN registry). Effort 1h.

## 10. E-E-A-T signals — STATUS: MIXED P0 (privacy)
- EVIDENCE: about page has photo (Turnhouse 1971), 1200-word bio, expertise areas, 38 living-bio questions. NO testimonials/credentials linked. NO author photo on book pages. CRITICAL PRIVACY: "87 Knightscliffe Avenue, Glasgow G13 2RX" (residential per orchestrator brain) rendered live on /privacy:58, /terms:61+122, Footer.tsx:59, src/lib/email/order-confirmation.ts:118+212. NOT on /about (good).
- IMPACT: P0 privacy + P1 E-E-A-T.
- FIX: P0 — replace registered-office display with PO Box / accountant address OR use Companies House anonymising service. Effort 4h (needs new address). P1 — add author photo to book sidebar, link credentials. Effort 1h.

## 11. Content depth book pages — STATUS: MIXED P1
- EVIDENCE: Beardmore page word count ~4500-5000, has reviews (13), related books (3), in-this-book excerpts. NO FAQ, NO ToC. Other sampled book entries (books.ts) have descriptions ranging 50-3000+ words; outliers (sycamore-seeds, captain-eric-brown) have shorter copy. No standardised "Specifications" table beyond inline pageCount/ISBN/year (book-detail:189).
- IMPACT: P1. Missing FAQ/ToC = missed long-tail snippets.
- FIX: Add FAQ JSON-LD per book (3-5 Q&A: "Who is the author? What ISBN? How many pages? Shipping?"). Add optional ToC field on books.ts. Effort 4h.

## 12. Tone-rule audit — STATUS: PASS
- EVIDENCE: grep across src/app src/components docs/email-templates: 0 customer-visible em/en-dash hits. All matches are JSX comments (page.tsx:195 internal-nav comment), JSON-LD descriptions (layout.tsx:86 Organization desc — uses em-dash but inside @graph schema string, not visible UI), feed sanitiser regex (merchant-feed:21 .replace(/—/g, ', ')), or docs/email-templates README authoring guide (not customer-visible). One ANTI-pattern in layout L86: Organization schema description uses em-dash — Google may surface this in knowledge-panel text. Docs/email-templates/README.md:177 references "wee corner of Glasgow" but this is authoring guidance not shipped copy.
- IMPACT: P2 (layout.tsx:86 schema em-dash — Google could expose).
- FIX: Replace em-dash with comma in layout.tsx:86 Organization.description. Effort 5min.

## 13. Keyword cannibalisation — STATUS: LOW RISK
- EVIDENCE: / and /books both target "aviation history books Charles E. MacKay" — but / is brand+ItemList, /books is shop-with-filters. Categories surfaced via ?category= query params (not duplicate routes). No /blog/* /categories live.
- IMPACT: P2.
- FIX: Differentiate /books h1 to "Shop all 20 books" or "Buy aviation history books" (already books:28 "Buy Aviation History Books by Charles E. MacKay" — fine). No action.

## 14. GSC top queries 30d — STATUS: SEVERE P0
- EVIDENCE: gsc-cli search-analytics 2026-03-29 to 2026-04-29 dim=page returned 25 rows, 5 clicks total. Top earners: / (2 clicks pos 28.7), /about (1 click pos 19.8), /aviation-news/2026-03-16-... (1 click pos 4 — but route now 308→ redirected!), /aviation-news/2026-03-25-... (1 click pos 7 same), /contact (1 click pos 19.9). /aviation-bibliography 2 imp pos 52 (308). /aviation-news/2025-11-21-regulation-manual 22 imp 0 clicks pos 9.4 (308). 12 of top-25 GSC URLs are 308-redirected ghosts.
- IMPACT: P0. Half the indexed URL footprint is dead-redirect ghosts. Pos 28.7 on root for branded query confirms #812 disambiguation finding.
- FIX: (a) Convert /aviation-news/* /blog/* /aviation-bibliography /categories /scottish-aviation-timeline /for-researchers from 308 to 410 Gone via netlify.toml/_redirects so Google de-indexes. (b) GSC URL Inspection batch-request reindex of /, /about, /books, /contact, top-5 book pages. Effort 2h.

---

## TOP-5 RANKED PRIORITIES

1. **P0 — Brand disambiguation rebrand to "Charles E. MacKay (aviation historian)"** across title.default, h1, og:title, Organization+Person schema.name. Direct cause of pos 28.7 root rank vs Q725382 poet. (item 1, 9, 14). Effort 1h.
2. **P0 — Privacy: remove 87 Knightscliffe Avenue G13 2RX** from /privacy /terms /Footer /email-templates (residential). Replace with PO Box. (item 10). Effort 4h (needs new address from Angus).
3. **P0 — Convert removed routes from 308 to 410 Gone** in netlify.toml: /aviation-news/* /blog/* /aviation-bibliography /scottish-aviation-timeline /for-researchers /categories. Half the GSC footprint is 308-ghosts diluting authority. (item 2, 14). Effort 2h.
4. **P1 — Add Person JSON-LD on /about** with birthDate 1951-04-01, jobTitle, sameAs links to Companies House SC005175 + SC858624 + UK National Archives F270555. Strongest disambiguation signal Google has. (item 7, 9). Effort 1h.
5. **P1 — Add FAQ JSON-LD per book page + standardise description length** (long-tail snippet capture; current outliers 50-word descriptions miss). (item 11). Effort 4h.

EOF
