# Live Site Test Report – 16 Feb 2026

**URL tested:** https://charlesmackaybooks.com  
**Entry point:** https://charlesmackaybooks.com/books/this-was-the-enemy-volume-two

---

## Issues Found

### 1. Links not clickable (CRITICAL – FIXED)

**Symptom:** Clicking internal links (e.g. "Browse All Books", "Charles E. MacKay", related book links) did not navigate. Error: "Click intercepted by non-interactive text element".

**Root cause:** Decorative overlay divs (`absolute inset-0 bg-black/20`) on hero sections were capturing pointer events instead of letting clicks pass through to the links below.

**Fix applied:** Added `pointer-events-none` and `aria-hidden` to all decorative overlay divs across:
- `src/app/books/[id]/page.tsx` – book detail hero
- `src/components/HeroSection.tsx`
- `src/components/ComprehensiveBlogTemplate.tsx` – blog hero background
- `src/app/pioneer-era-1895-1914/page.tsx` – hero + timeline image overlays
- `src/app/golden-age-1918-1939/page.tsx` – hero + timeline image overlays
- `src/app/great-war-1914-1918/page.tsx` – hero + timeline image overlays

### 2. Direct navigation works

Full-page navigation (e.g. typing URL or using browser back) works correctly. The issue was limited to client-side Link clicks being blocked by overlays.

---

## Speed & Loading

- Initial page load: Acceptable
- Direct navigation to `/books`: Loads correctly
- No observed infinite loading or blank screens once overlays were fixed

---

## Recommendations

1. **Manual retest** – After deploy, verify link clicks work on book detail, blog, and era pages.
2. **Mobile viewport** – Test on real device; mobile sticky bars and cart overlay may behave differently.
3. **Cart overlay** – CartSidebar overlay intentionally blocks clicks (to close on outside click); this is correct behavior.
