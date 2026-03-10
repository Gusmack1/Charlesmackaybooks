# Website Audit Report – 16 Feb 2026

**Scope:** Multi-agent audit (codebase, sales conversion, mobile, SEO) after redirect removal and GSC updates.

---

## Git Push

- **Commit:** `23634c9` – Centralize BASE_URL, remove sitemap-generator, fix Footer link, Rohrbach cleanup
- **Pushed to:** `origin/main`

---

## Agent Reports Summary

### 1. Codebase Explore Agent

| Priority | Issue | Location |
|----------|-------|----------|
| High | Missing blog JPG images | `public/blog-images/` |
| ~~Medium~~ | ~~Search schema URL param mismatch~~ | **DONE** – Schema uses `query` (matches Header) |
| ~~Medium~~ | ~~Duplicate Rohrbach pages~~ | **DONE** – Duplicate deleted, no redirect |
| ~~Medium~~ | ~~Footer "Academic Resources" links to `/for-researchers`~~ | **DONE** – Now links to `/academic-resources` |
| ~~Low~~ | ~~Inline performance script (comment only)~~ | **DONE** – Removed empty script |
| Low | `featuredBooks` mix of book IDs and blog slugs | `category-descriptions.ts` |

### 2. Sales Conversion Agent

**P0 (Critical) – FIXED**

- ✅ Checkout mobile sticky bar – added CTA button ("Continue to delivery" / "Pay £X.XX")
- ✅ Trust badges – added `TrustSecurityBadges` to checkout

**P1 (High) – FIXED**

- ✅ How-to-order – reordered so website checkout is first. eBay is now "Alternative option".

**P2 (Medium) – FIXED**

- ✅ Reduce 500ms delay on Add to basket (`BookDetailClient.tsx`)
- ✅ Add "Browse books" in empty cart sidebar (`CartSidebar.tsx`)
- ✅ Demote eBay CTA on book detail (`BookDetailClient.tsx`) – now small text link "Also available on eBay"

**P3 (Low) – FIXED**

- ✅ Add How to Order to nav (`navigation.ts` – in moreNavLinks)
- ✅ Add Add to basket on quick pairings (book detail) – `BookQuickAddCard`
- ✅ Add Add to basket on Related Books cards – `RelatedBookCard`

### 3. Mobile Browser

- Desktop viewport tested; site loads correctly.
- Mobile viewport emulation not available in current MCP; manual mobile testing recommended.

---

## Fixes Implemented

| File | Change |
|------|--------|
| `src/app/checkout/page.tsx` | Add CTA to mobile sticky bar; add `TrustSecurityBadges`; add `id="payment-section"` for scroll |
| `src/app/how-to-order/page.tsx` | Reorder: Guest Checkout first (Recommended), Website Cart second, eBay third (Alternative option) |

---

## Files to Review Later

| File | Purpose |
|------|---------|
| `docs/SALES_CONVERSION_AUDIT.md` | Full conversion audit |
| `docs/WEBSITE_CLEANUP_TODO.md` | Legacy routes, dead code |
| `docs/GOOGLE_SEARCH_CONSOLE_INDEXING.md` | GSC status |

---

## Remaining Items Completed (This Session)

- ✅ Search schema – `urlTemplate` now uses `query` (matches Header)
- ✅ 500ms delay – Removed from Add to basket in `BookDetailClient`
- ✅ Browse books – Added to empty cart sidebar
- ✅ Add to basket – Added to quick pairings and Related Books via `BookQuickAddCard`, `RelatedBookCard`
- ✅ Blog image fallback – `ComprehensiveBlogTemplate` adds `onerror` fallback to all `<img>` tags
- ✅ Footer Academic Resources – Now links to `/academic-resources` (was `/for-researchers`)
- ✅ Layout performance script – Removed empty no-op script

## Recommended Next Steps

1. **Manual mobile test** – Checkout flow on real device (sticky bar CTA, Pay button)
2. **Missing blog JPGs** – Many referenced in blog posts don't exist in `public/blog-images/`. Either add the images or migrate `<img>` to `<BlogImage>` for fallback. See `docs/BLOG_IMAGES_MISSING.md` for list.
3. ~~**Duplicate Rohrbach page**~~ – Done: duplicate deleted, no redirect
