# Website Audit Report - Charles Mackay Books
**Date:** December 18, 2025
**Website:** https://charlesmackaybooks.com

## 🔴 Critical Issues Found

### 1. **X-Frame-Options Meta Tag Warning**
**Issue:** Console shows warning: "X-Frame-Options may only be set via an HTTP header sent along with a document. It may not be set inside <meta>."
**Location:** `src/app/layout.tsx` line 208
**Impact:** Browser console warnings, potential security header not working correctly
**Fix:** Remove meta tag, configure via Netlify headers or Next.js headers

### 2. **Missing performanceMonitor.js (404 Error)**
**Issue:** Script tries to load `/utils/performanceMonitor.js` which doesn't exist
**Location:** `src/app/layout.tsx` line 226
**Impact:** 404 error in network requests, failed script load
**Fix:** Remove the import or create the missing file

### 3. **Sitemap.xml Incorrectly Set to Noindex**
**Issue:** Middleware sets `X-Robots-Tag: noindex, nofollow` on `/sitemap.xml`
**Location:** `src/middleware.ts` line 24-27
**Impact:** Search engines may not index the sitemap, hurting SEO
**Fix:** Remove sitemap.xml from noindex list (sitemaps should be indexable)

### 4. **Search Page Not Indexed**
**Issue:** Search page has `robots: { index: false }`
**Location:** `src/app/search/page.tsx` line 29-30
**Impact:** Search results pages won't appear in search engines (may be intentional)
**Status:** Verify if intentional - if users should find search results, change to `index: true`

## ⚠️ Medium Priority Issues

### 5. **Placeholder Verification Codes**
**Issue:** Yandex, Yahoo, and Bing verification codes are placeholders
**Location:** `src/app/layout.tsx` lines 108-109, 115-116
**Impact:** Missing verification for these search engines
**Fix:** Remove placeholders or add real verification codes if needed

### 6. **Blog Posts May Lack Canonical URLs**
**Issue:** Blog posts using `ComprehensiveBlogTemplate` don't export metadata with canonical URLs
**Location:** Blog post pages (e.g., `src/app/blog/supermarine-spitfire-development-evolution/page.tsx`)
**Impact:** Potential duplicate content issues, missing canonical signals
**Fix:** Add metadata exports with canonical URLs to all blog posts

### 7. **Robots.txt Missing Image Sitemap Reference**
**Issue:** `public/robots.txt` only references main sitemap, not image sitemap
**Location:** `public/robots.txt` line 9
**Impact:** Search engines may not discover image sitemap
**Fix:** Add reference to `Sitemap: https://charlesmackaybooks.com/sitemap-images.xml`

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

