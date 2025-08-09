BBC Color & Contrast Audit TODO

Goal: Ensure all pages using dark surfaces follow the hero/header scheme (dark backgrounds with white text) with no conflicts.

Global Tasks
- [ ] Constrain global CSS so only light surfaces inherit dark text, and header enforces white text
- [ ] Provide utilities for dark surfaces: `.surface-dark` applies white text to descendants
- [ ] Verify dropdown/menus inherit white text and adequate contrast

Page Checklist (update as each page is verified)
- [ ] / (Home) – `src/app/page.tsx`
- [ ] /books – `src/app/books/page.tsx`
- [ ] /books/[id] – `src/app/books/[id]/page.tsx`
- [ ] /book/[id] (redirect)
- [ ] /category/[category]
- [ ] /blog (index)
- [ ] All blog posts under `src/app/blog/*/page.tsx` (22)
- [ ] /scottish-aviation-timeline (aligned)
- [ ] /timeline
- [ ] /for-researchers
- [ ] /how-to-order
- [ ] /about
- [ ] /contact
- [ ] /faq
- [ ] /aviation-glossary
- [ ] /aviation-bibliography
- [ ] /aviation-news
- [ ] /academic-resources
- [ ] /research-guides
- [ ] /checkout
- [ ] /order-complete
- [ ] /search
- [ ] /aircraft/[aircraft] and static aircraft pages
- [ ] Optimizer/utility pages: `/seo-optimizer`, `/seo-audit`, `/performance-optimizer`, `/optimize-website`, `/comprehensive-optimization-suite`, `/comprehensive-fix`, `/run-optimizations`, `/test-systems`, `/test-react`, `/google-indexing`, `/deployment`, `/partnerships/imperial-war-museum`

Conflicts To Watch For
- Over-broad global link color rules overriding dark surfaces
- `.content` class forcing slate text inside dark cards
- Cards with `.card` and `.content` used on dark backgrounds → wrap with `.surface-dark`
- Any `bg-gradient-to-*` expecting white text

Implementation Notes
- Prefer wrapping any dark blocks with `.surface-dark`
- Avoid applying `.content` on dark backgrounds unless color is overridden
- Use borders `border-slate-700/800` for separation on dark surfaces
- Ensure focus states meet WCAG AA contrast

