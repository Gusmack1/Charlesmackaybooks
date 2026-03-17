# Google Search Console Indexing Findings – 17 Mar 2026

## Summary

- **Indexed:** 82 pages
- **Not indexed:** 245 pages (8 reasons)
- **Critical issue:** 23 pages – "Alternative page with proper canonical tag" – **Validation: Failed**

## "Alternative page with proper canonical tag" (23 pages)

**What it means:** Google found pages that declare a canonical URL pointing elsewhere. The "Failed" validation suggests Google could not verify the canonical target (e.g. redirect chain, wrong URL, or target returns an error).

**Next steps:**
1. In GSC Page indexing → Not indexed → expand "Alternative page with proper canonical tag"
2. Export the list of 23 affected URLs
3. For each URL, use URL Inspection to see which canonical Google detected
4. Check for: trailing slash mismatches, www vs non-www, parameter URLs, or canonicals pointing to 404/redirect

**Site configuration (already in place):**
- `proxy.ts` enforces 308 redirects: trailing slash → no slash, www → non-www
- All canonicals use `https://charlesmackaybooks.com` (no trailing slash, no www)
- `HreflangLinks` outputs `rel="alternate"` for en-GB and x-default (same URL)

## Other 7 reasons (222 pages)

To see the full breakdown:
1. Page indexing → Not indexed
2. Click the dropdown next to "Not indexed"
3. Filter table by "Reason" column
4. Export or note each reason and count

Common reasons include: Crawled – currently not indexed, Discovered – currently not indexed, Duplicate without user-selected canonical, etc.

## Fixes applied (Step 4)

1. **Removed HreflangLinks** – `rel="alternate"` hreflang tags were creating "alternative page" signals on every page. For a single-language (en-GB) site, these are unnecessary and can cause validation issues.
2. **Set canonical to self for checkout/order-complete** – These pages were inheriting layout canonical (homepage). Now they correctly point to themselves.
