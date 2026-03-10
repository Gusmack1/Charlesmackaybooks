# Website Audit Report – 16 Feb 2026

**Scope:** Multi-agent audit (codebase, sales conversion, mobile, SEO) after redirect removal and GSC updates.

---

## Git Push

- **Commit:** `0bbf79b` – Remove all redirects, update GSC sitemaps and removals, update docs
- **Pushed to:** `origin/main`

---

## Agent Reports Summary

### 1. Codebase Explore Agent

| Priority | Issue | Location |
|----------|-------|----------|
| High | Missing blog JPG images | `public/blog-images/` |
| Medium | Search schema URL param mismatch (`q` vs `query`) | `layout.tsx` lines 164–166 |
| Medium | Duplicate Rohrbach pages | Merge or redirect |
| Medium | Footer "Academic Resources" links to `/for-researchers` | `Footer.tsx` line 30 |
| Low | Inline performance script (comment only) | `layout.tsx` lines 221–226 |
| Low | `featuredBooks` mix of book IDs and blog slugs | `category-descriptions.ts` |

### 2. Sales Conversion Agent

**P0 (Critical) – FIXED**

- ✅ Checkout mobile sticky bar – added CTA button ("Continue to delivery" / "Pay £X.XX")
- ✅ Trust badges – added `TrustSecurityBadges` to checkout

**P1 (High) – FIXED**

- ✅ How-to-order – reordered so website checkout is first. eBay is now "Alternative option".

**P2 (Medium) – Remaining**

- [ ] Reduce 500ms delay on Add to basket (`BookDetailClient.tsx`)
- [ ] Add "Browse books" in empty cart sidebar (`CartSidebar.tsx`)
- [ ] Demote eBay CTA on book detail (`BookDetailClient.tsx`)

**P3 (Low) – Remaining**

- [ ] Add How to Order to nav (`navigation.ts`)
- [ ] Add Add to basket on quick pairings (book detail)
- [ ] Add Add to basket on Related Books cards

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

## Recommended Next Steps

1. **Manual mobile test** – Checkout flow on real device (sticky bar CTA, Pay button)
2. **Missing blog images** – Add or verify JPGs in `public/blog-images/`
3. **Search schema** – Align `urlTemplate` with `query` param in `layout.tsx`
4. **P2/P3** – Implement remaining conversion fixes from `SALES_CONVERSION_AUDIT.md`
