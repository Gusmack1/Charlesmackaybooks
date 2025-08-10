# Google Merchant Center & Search Console Submission Guide

This repository already exposes all required backend feeds and metadata. Follow these steps to complete submission and indexing.

## 1) Verify ownership in Google Search Console
- Property: https://charlesmackaybooks.com
- Methods: HTML tag (already present in global head) or DNS.
- After verification, use URL Inspection on:
  - /
  - /sitemap.xml
  - /products.xml
  - /merchant-feed.txt
  - /shopping-actions.xml

## 2) Merchant Center account
- Go to https://merchants.google.com and create/verify the business.
- Business info: Charles MacKay Books, Glasgow, Scotland.
- Website: https://charlesmackaybooks.com (verify via Search Console link).

## 3) Set shipping/tax
- Shipping: Free UK shipping (GB, Standard, £0.00)
- Tax: Configure UK VAT if applicable (or leave inclusive pricing).

## 4) Register feeds
- Primary feed (Products XML): https://charlesmackaybooks.com/products.xml (Daily fetch)
- Supplemental feed (Merchant TSV): https://charlesmackaybooks.com/merchant-feed.txt (Daily fetch)
- Shopping Actions (Atom): https://charlesmackaybooks.com/shopping-actions.xml (Daily fetch)

## 5) Diagnostics & rich results
- Use https://search.google.com/test/rich-results on / and several /books/* URLs.
- Validate Product detection (JSON-LD ItemList and on-page microdata).

## 6) Ongoing maintenance
- Weekly ping workflow: .github/workflows/seo-maintenance.yml
- Local validation: GET https://charlesmackaybooks.com/api/validate-feeds

## Notes
- Pricing is sourced from src/data/books.ts and reused across feeds.
- All implementations are non-visual and ready for production indexing.

