# Website Cleanup TODO – Charles Mackay Books

**Created:** 2026-02-16  
**Source:** Multi-agent audit (legacy pages, dead code, config, content/SEO)

---

## High Priority

### 1. Fix broken internal links
| Issue | Location | Fix |
|-------|----------|-----|
| ~~`/blog/supermarine-spitfire-development` (404)~~ | ~~`lucy-lady-houston-schneider-trophy/page.tsx` (3 links)~~ | **DONE** – Updated to `/blog/supermarine-spitfire-development-evolution` |
| ~~Invalid book IDs in `getBooksData`~~ | ~~4 blog pages~~ | **DONE** – Replaced blog slugs with valid book IDs |

### 2. Config / data path fixes
| Issue | Action |
|-------|--------|
| ~~`audit-blog-assets.cjs`~~ | **DONE** – Path fixed to `src/data/image-approvals.json` |
| ~~`replace-blog-placeholders.cjs`~~ | **DONE** – Path fixed |
| ~~`README.md`~~ | **DONE** – Path fixed |
| ~~`data/blog-assets-audit.json`~~ | **DONE** – Added to `.gitignore` |

### 3. News route consolidation
| Issue | Suggestion |
|-------|------------|
| ~~`/news` and `/aviation-news` both list same articles~~ | **DONE** – `/news` merged into `/aviation-news`; canonical is `/aviation-news` |

---

## Medium Priority

### 4. Duplicate / thin content
| Page | Issue | Suggestion |
|------|-------|-------------|
| `/blog/adolf-rohrbach-metal-aircraft-construction` | Generic, placeholder-style copy; overlaps with `adolf-rohrbach-metal-aircraft-revolution` | Merge into revolution page and redirect, or rewrite with specific content |
| `/blog/dorothy-wordsworth-scottish-tour-1803` | Travel/literature, off-topic for aviation site | Consider removal, relocation, or add aviation angle |
| `/blog/supermarine-spitfire-development-history` | Thin hub page | Keep as hub (intentional) or redirect to evolution page |

### 5. Centralize BASE_URL
| Location | Action |
|----------|--------|
| `src/config/constants.ts` | Add `BASE_URL: 'https://charlesmackaybooks.com'` |
| `layout.tsx`, `HreflangLinks.tsx`, `UnifiedSchema.tsx`, `EnhancedBookSEO.tsx`, `aviation-news/[slug]`, `sitemapData.ts`, `sitemap-generator.ts` | Replace hardcoded URLs with `SITE_CONSTANTS.BASE_URL` or shared import |

### 6. Remove dead sitemap generator
| File | Action |
|------|--------|
| `src/utils/sitemap-generator.ts` | Remove (unused; `sitemapData.ts` + `sitemap.ts` are active) |

---

## Low Priority (Dead Code)

### 7. Unused components (16)
| Component | Path |
|-----------|------|
| BBCHeader | `src/components/BBCHeader.tsx` |
| BlogPostTemplate | `src/components/BlogPostTemplate.tsx` |
| EnhancedBookSEOClient | `src/components/EnhancedBookSEOClient.tsx` |
| EnhancedBookSEO | `src/components/EnhancedBookSEO.tsx` |
| AdminOrdersClient | `src/components/AdminOrdersClient.tsx` |
| BookOrderClient | `src/components/BookOrderClient.tsx` |
| GoogleSEOCompliance | `src/components/GoogleSEOCompliance.tsx` |
| TrustSecurityBadges | `src/components/TrustSecurityBadges.tsx` |
| BacklinkStrategy | `src/components/BacklinkStrategy.tsx` |
| TechnicalSEOAudit | `src/components/TechnicalSEOAudit.tsx` |
| PerformanceSEO | `src/components/PerformanceSEO.tsx` |
| ConditionalHeader | `src/components/ConditionalHeader.tsx` |
| BasketSidebar | `src/components/BasketSidebar.tsx` |
| Analytics | `src/components/Analytics.tsx` |
| OptimizedImage | `src/components/OptimizedImage.tsx` |
| TrackingUtils | `src/components/TrackingUtils.tsx` |

**Note:** Some may be used indirectly or for future features. Verify before deletion.

### 8. Redundant component pairs
| Pair | Action |
|------|--------|
| CartSidebar vs BasketSidebar | BasketSidebar unused; remove or consolidate |
| Header vs BBCHeader | BBCHeader unused; remove or document purpose |
| BlogPostTemplate vs ComprehensiveBlogTemplate | BlogPostTemplate unused; remove |

### 9. Unused scripts
| Script | Action |
|-------|--------|
| `reduce-ai-phrases.cjs` | Add to `package.json` scripts if useful |
| `replace-blog-placeholders.cjs` | Fix path; add to package.json or remove |

### 10. Unused utilities / hooks
| File | Notes |
|-----|-------|
| `useABTest.ts`, `useResponsive.ts` | Never imported |
| `securityManager.ts`, `sslConfig.ts`, `seoCrossLinking.ts` | Never imported |
| `imageOptimization.ts`, `imageOptimizationPipeline.ts`, `imageManagement.ts` | Never imported |
| `performance.ts`, `performance-monitoring.ts` | Never imported (performanceMonitor.ts is used) |

---

## Legacy Routes — DONE (No Redirects, Brand New Site)

**Completed:** All redirects removed. Legacy URLs return 404. GSC removals submitted for `/news`, `/timeline`, `/book`, `/aircraft`, `/blog/supermarine-spitfire-development`.

| Route | Status |
|-------|--------|
| `/news`, `/timeline`, `/book`, `/book/*`, `/aircraft`, `/aircraft/*`, `/blog/supermarine-spitfire-development` | 404 (GSC removals submitted) ✓ |
| `/research-methodology` | 410 Gone ✓ |
| `/blog/scottish-aviation-news` | 410 Gone ✓ |

---

## Suggestions Summary

1. **Quick wins:** Fix broken Spitfire links, add `blog-assets-audit.json` to gitignore, fix image-approvals paths.
2. **SEO:** ~~Consolidate `/news` → `/aviation-news`~~ Done; fix or remove duplicate Rohrbach page.
3. **Maintainability:** Add `BASE_URL` to constants; remove `sitemap-generator.ts`.
4. **Cleanup:** Audit dead components before removal (some may be for admin/future use).
5. **Images:** Verify Spitfire/Hurricane images in `public/blog-images`; add missing or correct paths.

---

## Agent Reports Referenced

- Legacy / redundant pages
- Dead code & redundancy
- Config / data cleanup
- Content & SEO cleanup
