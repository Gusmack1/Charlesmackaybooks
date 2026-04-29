#!/usr/bin/env node
/**
 * Google Merchant Center Content API CLI for charlesmackaybooks.com.
 * Mirrors gsc-cli.cjs structure but with content scope + shoppingcontent root.
 *
 * Usage:
 *   node scripts/mc-cli.cjs account-status        # full accountstatuses payload
 *   node scripts/mc-cli.cjs product-issues        # summarise per-product issues
 *   node scripts/mc-cli.cjs list-products         # list active products
 *   node scripts/mc-cli.cjs datafeed-status       # last fetch + error count per feed
 */

'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');

const MERCHANT_ID = process.env.MC_MERCHANT_ID || '5631213189';
const SCOPE = 'https://www.googleapis.com/auth/content';
const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const API_ROOT = 'https://shoppingcontent.googleapis.com/content/v2.1';

function loadServiceAccount() {
  const b64 = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (b64) return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path) return JSON.parse(fs.readFileSync(path, 'utf8'));
  throw new Error('Set GSC_SERVICE_ACCOUNT_JSON (base64) or GOOGLE_APPLICATION_CREDENTIALS (path).');
}

function base64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signJwt(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT', kid: sa.private_key_id };
  const claims = { iss: sa.client_email, scope: SCOPE, aud: TOKEN_URI, iat: now, exp: now + 3600 };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  return `${signingInput}.${base64url(signer.sign(sa.private_key))}`;
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
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${text}`);
  return JSON.parse(text).access_token;
}

async function mcFetch(token, urlPath, init = {}) {
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

async function accountStatus(token) {
  return mcFetch(token, `/${MERCHANT_ID}/accountstatuses/${MERCHANT_ID}`);
}

async function productStatuses(token, pageToken) {
  const qs = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}` : '';
  return mcFetch(token, `/${MERCHANT_ID}/productstatuses${qs}`);
}

async function listProducts(token, pageToken) {
  const qs = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}` : '';
  return mcFetch(token, `/${MERCHANT_ID}/products${qs}`);
}

async function summariseProductIssues(token) {
  const all = [];
  let pageToken = undefined;
  do {
    const res = await productStatuses(token, pageToken);
    if (!res.ok) return { error: res };
    all.push(...(res.body.resources || []));
    pageToken = res.body.nextPageToken;
  } while (pageToken);

  const byCode = new Map();
  const productLines = [];
  for (const p of all) {
    const issues = p.itemLevelIssues || [];
    productLines.push({
      productId: p.productId,
      title: p.title,
      issueCount: issues.length,
      codes: issues.map((i) => i.code),
      destStatuses: (p.destinationStatuses || []).map((d) => `${d.destination}:${d.status}`),
    });
    for (const i of issues) {
      const k = i.code;
      if (!byCode.has(k)) byCode.set(k, { code: k, severity: i.severity, count: 0, sample: i });
      byCode.get(k).count += 1;
    }
  }
  return {
    totalProducts: all.length,
    issueCodeSummary: Array.from(byCode.values()).sort((a, b) => b.count - a.count),
    products: productLines,
  };
}

async function datafeedStatuses(token) {
  return mcFetch(token, `/${MERCHANT_ID}/datafeedstatuses`);
}

async function summariseDatafeedStatus(token) {
  const res = await datafeedStatuses(token);
  if (!res.ok) return { error: res };
  const feeds = res.body.resources || [];
  return {
    feedCount: feeds.length,
    feeds: feeds.map((f) => ({
      datafeedId: f.datafeedId,
      country: f.country,
      language: f.language,
      lastUploadDate: f.lastUploadDate || null,
      processingStatus: f.processingStatus || null,
      itemsTotal: f.itemsTotal || 0,
      itemsValid: f.itemsValid || 0,
      errorCount: (f.errors || []).reduce((s, e) => s + (e.count || 0), 0),
      errors: (f.errors || []).map((e) => ({ code: e.code, count: e.count, examples: (e.examples || []).slice(0, 2) })),
      warningCount: (f.warnings || []).reduce((s, w) => s + (w.count || 0), 0),
    })),
  };
}

async function main() {
  const [, , cmd] = process.argv;
  if (!cmd) {
    console.error('Usage: mc-cli.cjs <account-status|product-issues|list-products|datafeed-status>');
    process.exit(2);
  }
  const token = await getAccessToken();
  let result;
  switch (cmd) {
    case 'account-status':
      result = await accountStatus(token); break;
    case 'product-issues':
      result = await summariseProductIssues(token); break;
    case 'list-products':
      result = await listProducts(token); break;
    case 'datafeed-status':
      result = await summariseDatafeedStatus(token); break;
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
