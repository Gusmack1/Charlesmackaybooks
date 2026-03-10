# Website Audit Report - Charles Mackay Books
**Date:** December 18, 2025 (Updated March 2026)
**Website:** https://charlesmackaybooks.com

## ✅ Resolved Issues

### 1. **X-Frame-Options** — FIXED
**Status:** X-Frame-Options is set via Netlify headers (`netlify.toml`), not meta tag. No meta tag in layout.

### 2. **performanceMonitor.js** — FIXED
**Status:** Layout uses inline script; `performanceMonitor` exists at `src/utils/performanceMonitor.ts` for components that import it.

### 3. **Sitemap.xml Noindex** — FIXED
**Status:** Middleware does NOT add noindex to sitemap.xml. Sitemap is indexable.

### 4. **Robots.txt** — FIXED
**Status:** robots.txt includes image sitemap, Disallow for `/_next/`, `/api/`, `/checkout/`, etc.

---

## 🔴 Critical Issues Found

### 4. **Search Page Not Indexed** (Intentional)
**Issue:** Search page has `robots: { index: false }`
**Location:** `src/app/search/page.tsx`
**Status:** Intentional – search is an internal tool; noindex prevents thin/dynamic results from indexing.

## ⚠️ Medium Priority Issues

### 5. **Placeholder Verification Codes**
**Issue:** Yandex, Yahoo, and Bing verification codes are placeholders
**Location:** `src/app/layout.tsx` lines 108-109, 115-116
**Impact:** Missing verification for these search engines
**Fix:** Remove placeholders or add real verification codes if needed

### 6. **Blog Posts Canonical URLs** — FIXED
**Status:** Blog posts export `alternates.canonical` in metadata. Verified across multiple blog pages.

### 7. **Robots.txt Image Sitemap** — FIXED
**Issue:** `public/robots.txt` only references main sitemap, not image sitemap
**Location:** `public/robots.txt` line 9
**Impact:** Search engines may not discover image sitemap
**Fix:** Added `Sitemap: https://charlesmackaybooks.com/sitemap-images.xml` and also `Disallow: /_next/`, `/api/`, etc. for crawl efficiency

## ✅ Positive Findings

1. **Excellent SEO Foundation:**
   - Comprehensive structured data (Organization, Book, Article schemas)
   - Good meta tags implementation
   - Proper robots configuration (except sitemap issue)
   - Canonical URLs on main pages

2. **Good Technical Setup:**
   - Proper font preloading
   - DNS prefetch for analytics
   - Mobile-first responsive design
   - Good accessibility features

3. **Content Quality:**
   - Rich, detailed blog content
   - Proper image alt text handling
   - Good internal linking structure

## 📋 Recommended Actions

### Immediate (Critical):
1. Fix X-Frame-Options meta tag issue
2. Remove or create performanceMonitor.js
3. Fix sitemap.xml noindex issue
4. Review search page indexing decision

### Short-term (Important):
5. Add canonical URLs to all blog posts
6. Update robots.txt with image sitemap
7. Remove placeholder verification codes

### Long-term (Enhancement):
8. Add hreflang tags if targeting multiple regions
9. Implement breadcrumb schema on all pages
10. Add FAQ schema where applicable
11. Monitor Core Web Vitals performance

## 🔍 Indexing Status Check

Based on previous audit notes:
- **109 pages not indexed** (from previous audit)
- Need to verify current indexing status in Google Search Console
- Check for crawl errors
- Verify sitemap submission status

