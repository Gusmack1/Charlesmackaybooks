# Newsroom Live Feed – Setup Guide

The Scottish Aviation Newsroom is a live feed that:

1. **Searches** the web for Scottish aviation news (Serper API)
2. **Ingests** official feeds (MOD, RAF, HIAL, DfT, AAIB)
3. **Rewrites** articles in BBC style with 100% factuality (OpenAI)
4. **Publishes** automatically every 12 hours

## Add GitHub Secrets (Required for full automation)

### Step-by-step

1. Open your repo: **https://github.com/Gusmack1/Charlesmackaybooks**
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:

| Secret name | Value | Where to get it |
|-------------|-------|-----------------|
| `SERPER_API_KEY` | Your Serper API key | [serper.dev](https://serper.dev) – sign up for 2,500 free searches/month |
| `OPENAI_API_KEY` | Your OpenAI API key | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

5. Click **Add secret** for each one.

### Using the setup script (PowerShell)

1. Install GitHub CLI: `winget install GitHub.cli`
2. Log in: `gh auth login`
3. Run: `.\scripts\setup-newsroom-secrets.ps1`
4. Paste each API key when prompted

### Using GitHub CLI manually

```powershell
# Serper (get key from https://serper.dev)
"YOUR_SERPER_KEY" | gh secret set SERPER_API_KEY

# OpenAI (get key from https://platform.openai.com/api-keys)
"YOUR_OPENAI_KEY" | gh secret set OPENAI_API_KEY
```

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
