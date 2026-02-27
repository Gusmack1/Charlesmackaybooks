# Charles Mackay Books – Improvement Plan (Sell More Books)

**Created:** 2025-02-16  
**Goal:** Increase book sales by addressing legacy content, conversion blockers, and UX gaps.

---

## High Priority (Sales Impact)

| # | Action | Effort | Status |
|---|--------|--------|--------|
| 1 | Add "Add to basket" button to blog related books section | Low | Done |
| 2 | Add "Guest checkout" / "No account needed" on book cards | Low | Done |
| 3 | Add urgency badges (Bestseller, Popular) on top-selling books | Low | Done |
| 4 | Make blog sticky bar purchase-focused when related books exist | Low–Medium | Done |
| 5 | Reduce repetitive AI-style copy in blog posts | Medium–High | Backlog |

## Medium Priority (Structure & Clarity)

| # | Action | Effort | Status |
|---|--------|--------|--------|
| 6 | Clarify news vs aviation-news in navigation | Low | Done |
| 7 | Fix duplicate Spitfire content – make overview a hub | Low | Done |
| 8 | Sticky order summary on mobile checkout | Medium | Done |

## Low Priority (Cleanup)

| # | Action | Effort | Status |
|---|--------|--------|--------|
| 9 | Move hardcoded email to constants | Low | Done |
| 10 | Fix book count consistency (use getPublishedBookCountText) | Low | Done |
| 11 | Consolidate timeline routes (/timeline vs /scottish-aviation-timeline) | Low | Done |
| 12 | Replace generic placeholder images in blog posts | Medium | Backlog |

---

## Notes

- Blog related books: ComprehensiveBlogTemplate.tsx renders related books; add addToCart from useCart.
- Blog sticky bar: Currently says "Browse Charles's aviation books"; when related books exist, show "Buy [Book] – £X.XX".
- Book count: Use SITE_CONSTANTS.PUBLISHED_BOOKS or getPublishedBookCountText() everywhere.
- Top books for badges: beardmore-aviation, clydeside-aviation-vol1, british-aircraft-great-war, german-aircraft-great-war, aircraft-carrier-argus.
