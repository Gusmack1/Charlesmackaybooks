# BBC-style Global Header Redesign – Implementation Plan

Goal: Make the header consistent across all pages, inspired by BBC’s clear, categorized, accessible global navigation. Keep our overall aesthetic but with white text and improved IA. Ensure Buy Books, Blog, and About Charles are always immediately accessible.

## Phase 0 – Prep (commit before work)
- [x] Remove blog share UI and add sticky Buy Books bar on blog templates
- [x] Improve menu dropdown contrast and hover-off close behavior
- [x] Create this implementation plan and commit it before further changes

## Phase 1 – Information Architecture and Design
- [ ] Define top-level navigation model (single source of truth):
  - Home, Shop Books, Blog, Scottish Timeline, For Researchers, How to Order, About Charles, Contact, Basket
  - Optional: More dropdown for overflow on small screens
- [ ] Specify BBC-inspired structure:
  - Top bar: brand left, Basket and Search right (keyboard-accessible, aria-expanded states)
  - Primary nav row: horizontal list of categories with clear separators; sticky; white text on dark background
  - Mobile: menu toggle that opens an accessible drawer (focus trap, ESC to close, click/hover away to close)
- [ ] Accessibility and UX requirements:
  - Landmarks: <header> with role="banner" and <nav> with aria-label
  - Skip link to main content
  - Visible focus styles; keyboard navigation for dropdowns
  - Hover-off closes menu; ESC closes; tab order cycles logically
  - Reduced motion support

## Phase 2 – Implementation
- [ ] Create `src/components/BBCHeader.tsx` (or refactor `Header.tsx`) implementing:
  - Top brand bar (logo/name left; Basket, Search right)
  - Primary nav row with categories and a “More” dropdown (dark background, white text)
  - Fully responsive behavior (desktop → tablet → mobile)
  - Keyboard/ARIA handling (aria-controls, aria-expanded, role=menu/menuitem)
- [ ] Centralize category config in a single map (labels, hrefs, icon optional) used by both desktop and mobile nav
- [ ] Update styles in `src/app/globals.css` for header/nav tokens (spacing, separators, contrast, sticky safeties)
- [ ] Ensure sticky header does not cause CLS (reserve space, test LCP)

## Phase 3 – Integration
- [ ] Ensure header is rendered site-wide via `ConditionalHeader.tsx` (or root layout) and remove any per-page navs
- [ ] Remove superseded nav blocks in templates (blog, books pages) to avoid duplication
- [ ] Verify Basket and Cart context integration (badge, click opens basket)
- [ ] Add Search placeholder or stub for future (non-blocking)

## Phase 4 – QA and Accessibility
- [ ] Keyboard-only nav test (TAB/SHIFT+TAB across items; ENTER/SPACE toggles menu)
- [ ] Screen reader labels, roles, regions validated
- [ ] Color contrast ≥ WCAG AA on all header states
- [ ] Hover-out closes menus; ESC closes; outside click closes
- [ ] Mobile drawer focus-trap and body scroll lock verified

## Phase 5 – Performance & Rollout
- [ ] Audit CLS, LCP, INP for header on key pages (Home, Books, Blog, Detail pages)
- [ ] Cross-browser test (Chrome, Safari, Firefox, Edge; Mobile Safari/Chrome)
- [ ] Commit and push changes; deploy to Netlify and verify

## Navigation Configuration (draft)
```ts
const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Shop Books', href: '/books' },
  { label: 'Blog', href: '/blog' },
  { label: 'Scottish Timeline', href: '/scottish-aviation-timeline' },
  { label: 'For Researchers', href: '/for-researchers' },
  { label: 'How to Order', href: '/how-to-order' },
  { label: 'About Charles', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

## Deliverables
- Updated global header component with BBC-style IA and accessibility
- Consistent header across all routes; minimal per-page nav
- Docs in code (component JSDoc) and this checklist updated with statuses


