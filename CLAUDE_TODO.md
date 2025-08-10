# Claude Plan – Execution Tracker

Source plan: `https://claude.ai/share/ba9dd55c-ff0b-4078-8a90-b79e18de57b0`

This file tracks backend‑only SEO and Google Merchant tasks. No visual changes will be made. Each item is atomic and will be checked off with a commit reference.

## Week 1 — Immediate Backend Files
- [x] Add Product JSON‑LD to homepage head (Prompt 2)
  - [ ] Generate ItemList of 18 Products from `src/data/books.ts`
  - [x] Inject via Next layout (global head) without visual changes
- [x] Create Google Merchant XML feed `products.xml` (Prompt 1)
  - [ ] Include mandatory and optional fields; validate against spec
  - [ ] Place at site root and expose via robots/sitemap
- [x] Update robots.txt (Prompt 5)
  - [ ] Allow crawler access; add feed and sitemap links
- [x] Create comprehensive `sitemap.xml` with product anchors (Prompt 4)
  - [ ] Include homepage ItemList and 18 hash URLs

## Week 2 — Meta and Microdata
- [x] Add product meta tags to head (Prompt 3)
- [x] Add invisible microdata attributes (Prompt 6)
- [x] Add Rich Results testing tags (Prompt 8)

## Week 3 — Feed Files
- [x] Create `merchant-feed.txt` (TSV) (Prompt 7)
- [ ] Create `shopping-actions.xml` (Prompt 12)
- [x] Add `.htaccess` (Apache only) safe rules (Prompt 10)

## Week 4 — Final Integration
- [x] Add JS data layer for Merchant (Prompt 11)
- [x] Create `data-highlighter.json` (Prompt 9)
- [ ] Submit feeds in Google Merchant Center (out‑of‑code step)

## Detailed Prompts (Execution Checklist)
1) Google Merchant Center XML product feed (products.xml)
- [ ] Output for 18 books with: id, title, description (≥150 chars), link, image_link, availability, price, brand, gtin, mpn, condition, google_product_category, product_type, shipping, shipping_weight, identifier_exists, adult
- [ ] Optional enrichments: author, genre, format, publisher, publication_date, number_of_pages, product_detail
- [ ] Validate feed; add weekly refresh script

2) Invisible JSON‑LD Product schema on homepage
- [ ] Insert ItemList of 18 Product nodes before </head>

3) Enhanced product meta tags
- [ ] Add Open Graph/Twitter/Product meta to head (no UI impact)

4) Comprehensive sitemap.xml with product URLs
- [ ] Include homepage product data and 18 #anchor URLs

5) robots.txt
- [ ] Allow crawling, add images, feeds, sitemaps, and inspection bots

6) Invisible Microdata
- [ ] Add `itemscope`/`itemtype` Product wrappers to existing book DOM (no style change)

7) Google Merchant TSV (merchant-feed.txt)
- [ ] Generate full TSV for 18 books

8) Rich Results tags
- [ ] Add product signals meta in head

9) data-highlighter.json
- [ ] Publish selectors and feed URLs JSON

10) .htaccess (if applicable)
- [ ] Compression, MIME types, caching, product hash redirect, headers

11) Merchant Center API/Data layer
- [ ] Add JS dataLayer push for product list

12) shopping-actions.xml
- [ ] Atom feed with g:* fields for 18 books

## Google Merchant Center Setup (Operational)
- [ ] Sign up / verify property
- [ ] Upload feed(s) and set shipping (Free UK)
- [ ] Confirm tax/VAT
- [ ] Submit for review

## Progress Log
- [x] Create tracker file and commit
- [ ] Week 1 tasks in progress

## Completed Items
- 0: Tracker added to repo (commit present)


