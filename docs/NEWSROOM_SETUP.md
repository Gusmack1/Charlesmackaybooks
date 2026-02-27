# Newsroom Live Feed – Setup Guide

The Scottish Aviation Newsroom is a live feed that:

1. **Searches** the web for Scottish aviation news (Serper API)
2. **Ingests** official feeds (MOD, RAF, HIAL, DfT, AAIB)
3. **Rewrites** articles in BBC style with 100% factuality (OpenAI)
4. **Publishes** automatically every 12 hours

## GitHub Secrets (Required for full automation)

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `SERPER_API_KEY` | Web search for Scottish aviation news. [Get free key](https://serper.dev) (2,500 searches/month). |
| `OPENAI_API_KEY` | AI rewrite for BBC-style, factual articles. Required for auto-publishing. |

## Optional Secrets

| Secret | Purpose |
|--------|---------|
| `NETLIFY_BUILD_HOOK` | Triggers Netlify deploy after each run. |
| `NEWSROOM_SLACK_WEBHOOK` | Sends digest to Slack. |
| `NEWSROOM_GSC_KEY` | Google Search Console for keyword reports. |

## Schedule

- **Cron:** Every 12 hours (`0 */12 * * *` = 00:00 and 12:00 UTC)
- **Manual:** Run via **Actions → Newsroom Automation → Run workflow**

## Pipeline Order

1. `news:ingest` – Fetch from RSS/GOV.UK/HIAL
2. `news:search` – Serper web search (if `SERPER_API_KEY` set)
3. `news:rewrite` – OpenAI rewrite & publish (if `OPENAI_API_KEY` set)
4. `news:draft` – Create digest from remaining queue items
5. `news:report` – Generate automation report

## Output

- **Published articles:** `data/news-articles/YYYY/MM/*.json`
- **Display:** `/news` and `/aviation-news/[slug]`
- **Style:** BBC News tone, Charles Mackay Books theme (slate-900, blue accents)
