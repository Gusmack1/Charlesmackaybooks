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

## 5) Merchant opportunities (Search Console)

To address [Merchant opportunities](https://search.google.com/search-console/merchant-opportunities?resource_id=https://charlesmackaybooks.com/), configure the following in **Google Merchant Center** (merchants.google.com):

### Add delivery policy
1. Go to **Settings** ? **Business information** ? **Delivery and returns**
2. Add a delivery policy:
   - **URL:** https://charlesmackaybooks.com/delivery
   - **Description:** Free worldwide tracked shipping. UK 1–3 days, Europe 5–10 days, worldwide 10–21 days. Dispatched from Glasgow within 1–2 business days.

### Add return policy
1. In the same **Delivery and returns** section
2. Add a return policy:
   - **URL:** https://charlesmackaybooks.com/returns
   - **Return window:** 30 days
   - **Return method:** Return by mail
   - **Return fees:** Free (for defects/not as described)

### Add payment methods
1. Go to **Settings** ? **Business information** ? **Payment methods**
2. Add: Credit Card, Debit Card, PayPal, Bank Transfer

### Store ratings
- The website already includes `aggregateRating` in Organization and LocalBusiness schema (1,700+ positive reviews).
- Google may also pull ratings from linked review partners (e.g. eBay).
- Ensure the eBay store (chaza87) is linked in the same account if applicable.

## 6) Website schema (already implemented)
- **Organization:** `paymentAccepted`, `hasMerchantReturnPolicy`, `shippingDetails`, `aggregateRating`
- **LocalBusiness:** `paymentAccepted`, `aggregateRating`
- **Product pages:** `returnPolicy`, `shippingDetails`, `hasMerchantReturnPolicy`
- **Policy pages:** /delivery, /returns

## 7) Diagnostics & rich results
- Use https://search.google.com/test/rich-results on / and several /books/* URLs.
- Validate Product detection (JSON-LD ItemList and on-page microdata).

## 8) Ongoing maintenance
- Weekly ping workflow: .github/workflows/seo-maintenance.yml
- Local validation: GET https://charlesmackaybooks.com/api/validate-feeds

## Notes
- Pricing is sourced from src/data/books.ts and reused across feeds.
- All implementations are non-visual and ready for production indexing.
