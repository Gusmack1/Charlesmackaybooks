#!/usr/bin/env node
/**
 * GSC programmatic CLI for charlesmackaybooks.com
 *
 * No third-party googleapis dependency. Signs an RS256 JWT inline using
 * Node's built-in `crypto`, exchanges it for an OAuth2 access token, then
 * calls the Search Console v3 REST API.
 *
 * Service account credentials are read from
 * `claude_brain.vault.decrypted_secrets` row `cmb_gsc_service_account_json_base64`
 * (Supabase project rhhsaphcqxgrptrpvljm). Pass the decoded JSON via env
 * `GSC_SERVICE_ACCOUNT_JSON` (base64) or path via `GOOGLE_APPLICATION_CREDENTIALS`.
 *
 * Usage:
 *   node scripts/gsc-cli.cjs list-sitemaps
 *   node scripts/gsc-cli.cjs submit-sitemap https://charlesmackaybooks.com/sitemap.xml
 *   node scripts/gsc-cli.cjs sitemap-status https://charlesmackaybooks.com/sitemap.xml
 *   node scripts/gsc-cli.cjs search-analytics 2026-04-01 2026-04-29
 *   node scripts/gsc-cli.cjs audit > docs/GSC_STATUS_2026-04-29.md
 */

'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');

// Service account is registered on the sc-domain (DNS) property, not the
// https:// URL-prefix property. Override via env GSC_SITE if needed.
const SITE = process.env.GSC_SITE || 'sc-domain:charlesmackaybooks.com';
const SCOPE = 'https://www.googleapis.com/auth/webmasters';
const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const API_ROOT = 'https://searchconsole.googleapis.com/webmasters/v3';

function loadServiceAccount() {
  const b64 = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (b64) {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  throw new Error('Set GSC_SERVICE_ACCOUNT_JSON (base64) or GOOGLE_APPLICATION_CREDENTIALS (path).');
}

function base64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function signJwt(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT', kid: serviceAccount.private_key_id };
  const claims = {
    iss: serviceAccount.client_email,
    scope: SCOPE,
    aud: TOKEN_URI,
    iat: now,
    exp: now + 3600,
  };
  const encHeader = base64url(JSON.stringify(header));
  const encClaims = base64url(JSON.stringify(claims));
  const signingInput = `${encHeader}.${encClaims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key);
  return `${signingInput}.${base64url(signature)}`;
}

async function getAccessToken() {
  const sa = loadServiceAccount();
  const jwt = signJwt(sa);
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });
  const res = await fetch(TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }
  return JSON.parse(text).access_token;
}

async function gscFetch(token, urlPath, init = {}) {
  const res = await fetch(`${API_ROOT}${urlPath}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let parsed = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }
  return { status: res.status, ok: res.ok, body: parsed };
}

function siteParam() {
  return encodeURIComponent(SITE);
}

async function listSitemaps(token) {
  return gscFetch(token, `/sites/${siteParam()}/sitemaps`);
}

async function submitSitemap(token, sitemapUrl) {
  return gscFetch(token, `/sites/${siteParam()}/sitemaps/${encodeURIComponent(sitemapUrl)}`, {
    method: 'PUT',
  });
}

async function sitemapStatus(token, sitemapUrl) {
  return gscFetch(token, `/sites/${siteParam()}/sitemaps/${encodeURIComponent(sitemapUrl)}`);
}

async function searchAnalytics(token, startDate, endDate, dimensions = ['page'], rowLimit = 50) {
  return gscFetch(token, `/sites/${siteParam()}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
  });
}

async function listSites(token) {
  return gscFetch(token, '/sites');
}

function md(strings, ...values) { return String.raw({ raw: strings }, ...values); }

async function audit() {
  const token = await getAccessToken();
  const sitemapUrl = 'https://charlesmackaybooks.com/sitemap.xml';
  const startDate = '2026-04-01';
  const endDate = '2026-04-29';

  const sites = await listSites(token);
  const before = await listSitemaps(token);
  const submit = await submitSitemap(token, sitemapUrl);
  const status = await sitemapStatus(token, sitemapUrl);
  const analytics = await searchAnalytics(token, startDate, endDate, ['page'], 50);
  const queryAnalytics = await searchAnalytics(token, startDate, endDate, ['query'], 25);

  const lines = [];
  lines.push('# GSC programmatic audit, charlesmackaybooks.com');
  lines.push('');
  lines.push(`Run date: 2026-04-29`);
  lines.push(`Service account: search-console-reader@charlesmackay-seo.iam.gserviceaccount.com`);
  lines.push(`Property: ${SITE}`);
  lines.push('');

  lines.push('## Verified properties on this service account');
  lines.push('```json');
  lines.push(JSON.stringify(sites.body, null, 2));
  lines.push('```');
  lines.push('');

  lines.push('## Sitemaps registered before submit');
  lines.push(`HTTP ${before.status}`);
  lines.push('```json');
  lines.push(JSON.stringify(before.body, null, 2));
  lines.push('```');
  lines.push('');

  lines.push(`## Submit ${sitemapUrl}`);
  lines.push(`HTTP ${submit.status} (PUT)`);
  lines.push('```json');
  lines.push(JSON.stringify(submit.body, null, 2));
  lines.push('```');
  lines.push('');

  lines.push('## Sitemap status after submit');
  lines.push(`HTTP ${status.status}`);
  lines.push('```json');
  lines.push(JSON.stringify(status.body, null, 2));
  lines.push('```');
  lines.push('');

  lines.push(`## Search analytics ${startDate} to ${endDate}, by page (top 50)`);
  lines.push(`HTTP ${analytics.status}`);
  lines.push('```json');
  lines.push(JSON.stringify(analytics.body, null, 2));
  lines.push('```');
  lines.push('');

  lines.push(`## Search analytics ${startDate} to ${endDate}, by query (top 25)`);
  lines.push(`HTTP ${queryAnalytics.status}`);
  lines.push('```json');
  lines.push(JSON.stringify(queryAnalytics.body, null, 2));
  lines.push('```');

  return lines.join('\n');
}

async function main() {
  const [, , cmd, ...args] = process.argv;
  if (!cmd) {
    console.error('Usage: gsc-cli.cjs <list-sitemaps|submit-sitemap <url>|sitemap-status <url>|search-analytics <start> <end>|audit>');
    process.exit(2);
  }
  if (cmd === 'audit') {
    process.stdout.write(await audit());
    return;
  }
  const token = await getAccessToken();
  let result;
  switch (cmd) {
    case 'list-sitemaps':
      result = await listSitemaps(token); break;
    case 'submit-sitemap':
      result = await submitSitemap(token, args[0]); break;
    case 'sitemap-status':
      result = await sitemapStatus(token, args[0]); break;
    case 'search-analytics':
      result = await searchAnalytics(token, args[0], args[1]); break;
    case 'list-sites':
      result = await listSites(token); break;
    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(2);
  }
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err.stack ?? err.message ?? String(err));
  process.exit(1);
});
