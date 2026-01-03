# Daily Keyword & Rank Dashboard

This dashboard tracks the priority keywords that drive book and blog visibility. It pulls Search Console metrics for each keyword/page pair and stores them under `reports/keywords/` for trend analysis.

## Files

- `data/keyword-tracking.json` – canonical list of keywords, their target URLs, associated book IDs, and priority tiers.
- `scripts/keyword-rank-dashboard.cjs` – Search Console client that generates JSON + Markdown summaries.
- `reports/keywords/` – output snapshots (`YYYY-MM-DD_YYYY-MM-DD.json`) plus `latest.md` for quick review. The directory is git-ignored; copy files elsewhere if you need to share them.

## Running Locally

1. Create a Google Cloud service account with access to Search Console for `https://charlesmackaybooks.com/`.
2. Download the JSON key and store it securely (never commit it). Set:
   - `GOOGLE_SEARCH_CONSOLE_KEY` – path to the JSON file or the JSON string itself.
   - `GOOGLE_SEARCH_CONSOLE_PROPERTY` – defaults to `https://charlesmackaybooks.com/`, override for staging.
3. (Optional) adjust `data/keyword-tracking.json` with more keywords or updated priorities.
4. Run `npm run keywords:report` (or `node scripts/keyword-rank-dashboard.cjs --window=14` for a different range).

The script fetches position, clicks, CTR, and impressions for each keyword/url pair over the requested window (default 7 days ending yesterday). Failed lookups are logged and marked with `status: "error"` in the JSON so we know which pages need attention.

## CI Integration

This repo includes a GitHub Actions workflow that runs nightly and on-demand:

- Workflow: `.github/workflows/keyword-rank-dashboard.yml`
- Output: uploaded as a GitHub Actions artifact (`keyword-reports`)

### Required GitHub Secrets

Add these in GitHub → Settings → Secrets and variables → Actions:

- `GOOGLE_SEARCH_CONSOLE_KEY` (required): service-account JSON **string** (recommended) or a path inside the repo (not recommended).
- `GOOGLE_SEARCH_CONSOLE_PROPERTY` (optional): defaults to `https://charlesmackaybooks.com/`

Notes:
- Do **not** commit the JSON key.
- Ensure the service account has access to the Search Console property.

## Updating the Keyword List

- Keep each `keyword` focused (no more than ~60 characters) and map it to a single canonical page to maintain data quality.
- Set `priority` (`tier-1`, `tier-2`, `tier-3`) to help triage alerts once we add thresholds.
- When launching a new campaign, add the keyword, link it to the relevant book/blog page, and re-run the dashboard locally to confirm Search Console returns data.

## Current keyword priorities

The table below reflects the live contents of `data/keyword-tracking.json` (sorted by priority). Use it as a quick reference when checking whether a blog post or book page already owns a strategic query.

| Priority | Keyword | Target URL | Content type |
| --- | --- | --- | --- |
| Tier‑1 | Scottish aviation history books | `/books` | Books hub |
| Tier‑1 | Charles E MacKay Luftwaffe research | `/books/this-was-the-enemy-volume-two` | Book detail |
| Tier‑2 | Beardmore aviation history | `/books/beardmore-aviation` | Book detail |
| Tier‑2 | RAF Lossiemouth heritage | `/blog/raf-lossiemouth-heritage` | Blog article |
| Tier‑3 | Scottish helicopter pioneers | `/books/sycamore-seeds` | Book detail |

For any new newsroom piece or long-form blog post, pick the highest-priority keyword that matches the topic, then ensure the article links back to the target URL above to reinforce relevance.
