# Sales Conversion Audit – Charles Mackay Books

**Date:** 2026-03-10  
**Focus:** Conversion blockers, UX friction, CTA visibility, cart, checkout, how-to-order, mobile, trust signals

---

## Executive Summary

The site has a solid foundation (guest checkout, cart persistence, bulk discounts) but several conversion blockers and UX gaps were identified. Highest impact fixes: checkout mobile CTA, trust badges on checkout, how-to-order messaging, and quick-pairing add-to-basket.

---

## 1. Book Detail Page – Add to Basket & CTA Visibility

### File: `src/components/BookDetailClient.tsx`

**Strengths:**
- Buy now (primary) and Add to basket (secondary) CTAs
- Guest checkout messaging
- Bulk discount hint
- Mobile sticky bar with Buy now + Add (lines 154–176)
- Trust strip: Free UK shipping, 30-day returns, Secure card and PayPal

**Issues & Fixes:**

| Issue | Location | Suggested Fix |
|-------|----------|---------------|
| **eBay CTA competes with primary purchase** | Lines 103–112 | Move eBay link below primary CTAs or make it a smaller text link. Primary focus should be website checkout. |
| **Add to basket is secondary (slate-700)** | Lines 95–100 | Consider making Add to basket more prominent (e.g. outline style) or equal visual weight so users see both options clearly. |
| **500ms artificial delay on add** | Lines 28–34 | Remove or reduce `setTimeout(..., 500)` – adds perceived lag. Use immediate state update. |
| **Mobile sticky bar "Add" is truncated** | Line 171 | Change label from "Add" to "Add to basket" for clarity (or "Add to cart" if space allows). |

### File: `src/app/books/[id]/page.tsx`

**Quick Pairings (lines 479–504):**
- Related books link to detail pages only – no direct Add to basket
- **Fix:** Add an "Add to basket" button next to each quick pairing so users can add without leaving the page. Requires passing `addToCart` from a client wrapper or making the quick pairings a client component.

**Related Books section (lines 643–668):**
- Links only – no Add to basket on cards
- **Fix:** Add Add to basket / Buy now on related book cards for faster multi-book purchase.

---

## 2. Checkout Flow – Friction Points

### File: `src/app/checkout/page.tsx`

**Strengths:**
- 2-step flow (Basket → Delivery & Payment)
- Guest checkout messaging
- Saved profile for returning users
- Add-on suggestions
- Bulk discount visibility

**Issues & Fixes:**

| Issue | Location | Suggested Fix |
|-------|----------|---------------|
| **Mobile sticky bar has no CTA** | Lines 674–682 | The sticky bar shows total and "Free shipping" but no Pay/Continue button. On step 2 (delivery & payment), users must scroll to find payment buttons. **Add a sticky "Pay £X.XX" or "Continue to payment" button** that scrolls to or triggers the payment section. |
| **Long form before payment** | Lines 436–558 | 9+ fields in one step. Consider: (a) optional address autocomplete, (b) country default to GB, (c) optional phone. |
| **PayPal popup can be blocked** | Lines 381–420 | Fallback redirect exists, but some users may not notice. Add a visible "Popup blocked? Click here" link if `window.open` returns null. |
| **Back to Basket button placement** | Line 799 | "← Back to Basket" is easy to hit by mistake. Consider moving it or making it less prominent. |
| **No TrustSecurityBadges on checkout** | Line 962 | Comment says "Trust & Security Badges are rendered globally via layout" but `TrustSecurityBadges` is unused (per WEBSITE_CLEANUP_TODO). **Add TrustSecurityBadges to checkout** – SSL, PCI, 30-day guarantee, etc. |

---

## 3. How-to-Order Page – Does It Drive to Purchase?

### File: `src/app/how-to-order/page.tsx`

**Issues & Fixes:**

| Issue | Location | Suggested Fix |
|-------|----------|---------------|
| **eBay listed as "Most Popular"** | Lines 74–97 | Positions eBay above website checkout. **Swap order** so "Guest Checkout" or "Website Cart" is first, or remove "Most Popular" from eBay to avoid directing traffic away. |
| **CTAs go to /books, not checkout** | Lines 114–119, 138–143 | "Buy via Website" and "Browse Books" both link to `/books`. If user came from how-to-order with intent to buy, consider a primary CTA like "Start shopping" with secondary "Already have books? Go to checkout" when cart has items (requires client component). |
| **How to Order not in main nav** | `src/config/navigation.ts` | Page is only in footer. Consider adding "How to Order" to main nav or More dropdown for pre-purchase reassurance. |
| **No urgency or scarcity** | N/A | Add subtle trust/urgency: "Orders ship within 1–2 business days", "Free worldwide shipping on all orders". |

---

## 4. Cart Visibility and Persistence

### File: `src/context/CartContext.tsx`

**Strengths:**
- Cart persisted in `localStorage` (`charles_mackay_cart`)
- Persists across sessions and page refreshes
- `cartUpdated` custom event for cross-component sync

**Issues & Fixes:**

| Issue | Location | Suggested Fix |
|-------|----------|---------------|
| **No cart count in tab title** | N/A | Optional: Update document title when cart has items, e.g. "(3) Charles Mackay Books". |
| **Cart clears on order complete** | `src/app/order-complete/page.tsx` | Correct behavior – no change needed. |

### File: `src/components/CartSidebar.tsx`

**Strengths:**
- Slide-in sidebar with items, quantity controls, add-ons
- Checkout (card) and PayPal CTAs
- Discount nudge text
- Price breakdown (collapsible)

**Issues & Fixes:**

| Issue | Location | Suggested Fix |
|-------|----------|---------------|
| **Basket only opens on explicit action** | N/A | After Add to basket, `openBasket()` is called from BookDetailClient – good. BookCard does NOT open basket (intentional to avoid interrupting browsing) – acceptable. |
| **Empty state could drive to books** | Lines 80–86 | Add "Browse books" link in empty state to convert abandoned cart viewers. |

### File: `src/components/Header.tsx`

**Strengths:**
- Basket button always visible (lines 58–80)
- Badge shows item count
- Bulk discount badge when applicable

**Minor:** On mobile, basket shows emoji only (`🛒`) – consider adding "Basket" text for clarity if space allows.

---

## 5. Mobile CTA Placement

### File: `src/components/BookDetailClient.tsx`

**Strengths:**
- Fixed bottom bar on mobile (`lg:hidden`) with Buy now + Add (lines 154–176)
- `pb-24 lg:pb-0` on parent prevents content from being hidden behind sticky bar

**Issues:**
- Mobile bar "Add" could say "Add to basket"
- Ensure bar has sufficient contrast and tap targets (min 44px) – currently `py-2.5` which may be tight on some devices

### File: `src/app/checkout/page.tsx`

**Critical:** Mobile sticky bar (lines 674–682) shows total only – **no CTA**. Users on step 2 must scroll to pay. Add a sticky "Pay £X.XX" or "Continue" button.

### File: `src/components/BookCard.tsx`

- CTAs are full-width and stacked – good for mobile
- Consider order: Buy now first (primary), Add to basket second – already correct

---

## 6. Paywall and Trust Signals

**Paywall:** None – no paywall or gated content. Good.

**Trust Signals – Gaps:**

| Location | Current State | Suggested Fix |
|---------|--------------|---------------|
| **Checkout page** | Security notice in Order Summary (lines 661–672) only. `TrustSecurityBadges` component exists but is unused. | Import and render `TrustSecurityBadges` in checkout (e.g. above or below Order Summary). |
| **Book detail** | "Trusted seller with 100% positive feedback" + eBay link in "Why readers choose" (books/[id]/page.tsx:536–539). Proof strip: Free UK shipping, 30-day returns. | Consider adding a small "Secure checkout" badge near CTAs. |
| **Footer** | PayPal, eBay store, location mentioned. | Adequate. |
| **Layout** | No global trust bar. | Optional: Add a thin trust bar (SSL, 30-day returns) in header or above footer on key pages. |

---

## Priority Summary

| Priority | Item | File(s) | Effort |
|----------|------|---------|--------|
| **P0** | Add CTA to checkout mobile sticky bar | `checkout/page.tsx` | Low |
| **P0** | Add TrustSecurityBadges to checkout | `checkout/page.tsx`, `TrustSecurityBadges.tsx` | Low |
| **P1** | Reorder how-to-order: website first, eBay second | `how-to-order/page.tsx` | Low |
| **P1** | Add Add to basket on quick pairings (book detail) | `books/[id]/page.tsx` | Medium |
| **P2** | Reduce/remove 500ms delay on Add to basket | `BookDetailClient.tsx` | Trivial |
| **P2** | Add "Browse books" in empty cart sidebar | `CartSidebar.tsx` | Low |
| **P2** | Demote or relocate eBay CTA on book detail | `BookDetailClient.tsx` | Low |
| **P3** | Add How to Order to nav (main or More) | `navigation.ts` | Low |
| **P3** | Add Add to basket on Related Books cards | `books/[id]/page.tsx` | Medium |

---

## Files Referenced

| File | Purpose |
|------|---------|
| `src/components/BookDetailClient.tsx` | Book detail CTAs, mobile sticky bar |
| `src/app/books/[id]/page.tsx` | Book detail layout, quick pairings, related books |
| `src/app/checkout/page.tsx` | Checkout flow, mobile sticky bar |
| `src/app/how-to-order/page.tsx` | How-to-order content and CTAs |
| `src/context/CartContext.tsx` | Cart state and persistence |
| `src/components/CartSidebar.tsx` | Basket sidebar |
| `src/components/Header.tsx` | Basket button, nav |
| `src/components/BookCard.tsx` | Listing grid CTAs |
| `src/components/TrustSecurityBadges.tsx` | Trust badges (currently unused) |
| `src/config/navigation.ts` | Nav structure |
