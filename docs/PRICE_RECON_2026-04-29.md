# Price Reconciliation: charlesmackaybooks.com vs eBay chaza87

**Date:** 2026-04-29
**Sources:**
- Site: `src/data/books.ts` (commit at HEAD as of 2026-04-29)
- eBay storefront: https://www.ebay.co.uk/usr/chaza87 (live fetch 2026-04-29 via Chrome MCP — header reports "23 results")

**Coverage:** 20 books in `books.ts` (not 22 as brain #883 estimated). All 20 matched to a chaza87 listing. **No book is missing from eBay** (contradicts brain #883's claim that `british-aircraft-great-war` was site-only — it IS listed at £12.93).

**Important context:** All eBay prices include built-in eBay seller fees (~£4–6 per sale). Site prices are net (no marketplace fee). Therefore site = eBay − £3 to £4 is roughly the **same net £ to Gus**. "Site cheaper than eBay" by less than ~£3.50 is not actually a margin loss — it's the customer benefit of buying direct.

---

## Diff table

Sorted by absolute delta. Delta = eBay − site (positive = eBay higher = customer pays more on eBay).

| book_id | title (short) | site £ | eBay £ | delta | recommendation |
|---|---|---:|---:|---:|---|
| dorothy-wordsworth | Dorothy Wordsworth Recollections | 7.55 | 12.89 | **+5.34** | Stale £8.65 + canonical £12.89 BOTH on eBay. Either raise site to £12.89 (capture +£5.34) or lower eBay variants to ~£8 (parity with site cheap-book positioning). End the £8.65 stale listing either way. |
| clydeside-aviation-vol1 | Clydeside Vol 1 — Great War | 16.08 | 12.89 | **−3.19** | Lower site to £12.89 (avoid customer-facing surprise — eBay is £3 cheaper for the SAME book) OR raise eBay to £16.08 (channel parity). Recommend lower site — cleaner brand. |
| enemy-luftwaffe-1945 | Luftwaffe 1945 / This Was Enemy Vol One | 16.08 | 12.89 | **−3.19** | Same as Clydeside V1 — lower site to £12.89 OR raise eBay. Recommend lower site. **(This is the 5th discrepancy brain #883 hinted at.)** |
| this-was-the-enemy-volume-two | This Was the Enemy Vol Two | 15.95 | 12.89 | **−3.06** | Lower site to £12.89 OR raise eBay. Recommend lower site. |
| clydeside-aviation-vol2 | Clydeside Vol 2 — Between Wars | 15.54 | 12.89 | **−2.65** | Lower site to £12.89 OR raise eBay. Recommend lower site. |
| soaring-with-wings | Soaring with Wings — Pilcher | 15.01 | 12.89 | **−2.12** | Lower site to £12.89 OR raise eBay. Recommend lower site. |
| mother-of-the-few | Mother of the Few — Lady Houston | 14.52 | 12.89 | **−1.63** | Within £2 — no action. (Site cheaper by less than fee delta = correct net positioning.) |
| german-aircraft-great-war | German Aircraft Great War | 13.93 | 12.89 | **−1.04** | Within £2 — no action. |
| sonic-to-standoff | Sonic to Stand Off | 13.95 | 13.96 | +0.01 | No action — parity. |
| beardmore-aviation | Beardmore Aviation | 12.91 | 12.93 | +0.02 | No action — parity. |
| british-aircraft-great-war | British Aircraft Great War | 12.91 | 12.93 | +0.02 | No action — parity. (Brain #883 claim "site only" is INCORRECT — it IS on eBay.) |
| aircraft-carrier-argus | HMS Argus — Beardmore | 12.91 | 12.93 | +0.02 | No action — parity. |
| sabres-from-north | Sabres from the North | 12.92 | 12.94 | +0.02 | No action — parity. |
| sycamore-seeds | The Sycamore Seeds | 12.86 | 12.89 | +0.03 | No action — parity. |
| flying-for-kaiser | Flying for Kaiser Wilhelm | 12.86 | 12.89 | +0.03 | No action — parity. |
| modern-furniture | Modern Furniture | 12.86 | 12.89 | +0.03 | No action — parity. |
| birth-atomic-bomb | Birth of the Atomic Bomb | 12.86 | 12.89 | +0.03 | No action — parity. |
| adolf-rohrbach | Adolf Rohrbach metal airplanes | 12.86 | 12.89 | +0.03 | No action — parity. |
| dieter-dengler | Dieter Dengler / Skyraider 04 | 12.39 | 12.40 | +0.01 | No action — parity. |
| captain-eric-brown | Captain Eric "Winkle" Brown | 6.98 | 7.00 | +0.02 | No action — parity. |

**Books with delta ≥ £2:** 6 (Dorothy Wordsworth, Clydeside V1, Enemy Luftwaffe 1945, Enemy Vol Two, Clydeside V2, Soaring with Wings).

---

## Combo SKUs (eBay only, not on site)

| eBay title | eBay £ | recommendation |
|---|---:|---|
| Clydeside Aviation Volume One & Two | 18.28 | Consider listing combo on site too if Gus wants to upsell V1+V2 buyers. Site individual = 16.08+15.54 = 31.62, so combo at 18.28 is HEAVILY discounted vs site. If Gus wants to keep this combo discount, ONLY do it on eBay (per-channel positioning) — don't list on site or site V1/V2 sales cannibalise. |
| German Air Force and Navy in WW1 1914-18 Two Volumes | 16.14 | Combos `german-aircraft-great-war` (£13.93) + `flying-for-kaiser` (£12.86) = £26.79 site. Combo at £16.14 = same eBay-only positioning. Same caveat. |

---

## Stale listings (end on eBay)

| eBay listing | eBay £ | reason |
|---|---:|---|
| Dorothy Wordsworth Recollections (item 327078346308) | 8.65 | Duplicate of canonical £12.89 listing 325600441345. End the £8.65 OR end the £12.89 (Gus picks which is correct price). |

**Note:** The previously reported £17.95 Clydeside V1 stale listing (per brain #883) is NOT visible today — appears to have been ended already. Only one Clydeside V1 listing remains (at £12.89). Brain #883 needs an update.

---

## Recommended priority for Gus (top 5)

1. **Decide Dorothy Wordsworth strategy** (delta £5.34 — biggest single discrepancy). Pick: (a) raise site to £12.89 + end £8.65 stale eBay, OR (b) keep site at £7.55, lower eBay £12.89 listing to ~£8, end £8.65. Option (a) maximises revenue.
2. **Lower 5 site prices to £12.89** to match eBay (Clydeside V1, Luftwaffe 1945, Enemy Vol Two, Clydeside V2, Soaring with Wings). Reasoning: customers checking both channels see site = pricier, brand-damaging. Net loss to Gus is ≤£3.20/book.
3. **End the £8.65 Dorothy Wordsworth stale listing** (item 327078346308) regardless of (1).
4. **Update brain #883:** correct "british-aircraft-great-war is site-only" to "listed on eBay at £12.93", remove Clydeside V1 £17.95 stale flag (already ended), confirm 20 books not 22.
5. **Optional: list Dorothy Wordsworth on site at the lower £7.55 with a "site exclusive — direct from author" note** — keeps site as the "cheapest channel" angle, eBay as the "broader reach + fees absorbed" channel. Justifies the £5.34 gap as deliberate positioning.

---

## What changed vs brain #883

| Brain #883 claim | Actual finding 2026-04-29 |
|---|---|
| "22 books on site" | **20 books** in `books.ts` (count via `^\s*id:` grep) |
| "17 listed on chaza87" | **20 listed** — every site book has an eBay listing |
| "british-aircraft-great-war is MISSING from eBay — site only" | **WRONG** — listed at £12.93 (item 326587292539) |
| "5th discrepancy pending" | **Identified: enemy-luftwaffe-1945** (site £16.08 vs eBay £12.89, delta −£3.19) — also fits the same +£3 site overpricing pattern |
| "Stale £17.95 Clydeside V1 listing" | **Not visible today** — only the canonical £12.89 listing remains. Stale listing already ended OR was never there. |
| "Stale £8.65 Dorothy Wordsworth" | **CONFIRMED still live** (item 327078346308). Recommend ending. |
| "Two combo SKUs eBay only at £18.28 + £16.14" | **CONFIRMED** — Clydeside V1+V2 at £18.28, German AF&Navy WW1 at £16.14 |

**Action: update brain #883** with corrected counts (20 not 22), remove british-aircraft-great-war "missing from eBay" line, identify enemy-luftwaffe-1945 as the 5th discrepancy, drop the Clydeside V1 £17.95 stale flag.

---

## Action checklist for Gus

- [ ] Pick Dorothy Wordsworth direction (raise site OR lower eBay) — biggest single £ impact (£5.34)
- [ ] Pick site-vs-eBay direction for the 5 over-priced site books (Clydeside V1+V2, Luftwaffe 1945, Enemy Vol Two, Soaring with Wings)
- [ ] End stale Dorothy Wordsworth £8.65 listing (item 327078346308) on eBay
- [ ] Confirm both eBay-only combo SKUs (£18.28 Clydeside, £16.14 German AF&Navy WW1) should stay eBay-only
- [ ] Update brain #883 with the 7 corrections above
- [ ] If raising 5 site prices: edit `src/data/books.ts` rows for `clydeside-aviation-vol1`, `clydeside-aviation-vol2`, `enemy-luftwaffe-1945`, `this-was-the-enemy-volume-two`, `soaring-with-wings`

---

## Verification

Verifier sub-agent (§7b) ran 2026-04-29: confirmed all 20 site books matched, 5 books with delta ≥ £2 (excluding Dorothy at +£5.34), stale Dorothy duplicate confirmed live, no missing-from-eBay books, eBay header "23 results" reconciles to 20 site books + 2 combo SKUs + 1 Dorothy duplicate = 23.
