#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Validate src/data/image-approvals.json for license/source accuracy.
 * Usage:
 *   node scripts/validate-image-approvals.cjs                # validate all slugs
 *   node scripts/validate-image-approvals.cjs spitfire ...   # specific slugs
 */

const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'src', 'data', 'image-approvals.json');
const args = process.argv.slice(2).map((arg) => arg.toLowerCase());

const allowedSources = [
  'commons.wikimedia.org',
  'wikimedia.org',
  'upload.wikimedia.org',
  'unsplash.com',
  'pixabay.com',
  'pexels.com',
  'internal',
];

const prohibitedSources = ['gettyimages.com', 'alamy.com', 'shutterstock.com', 'istockphoto.com', 'adobe.com'];
const validLicenseKeywords = ['CC0', 'CC BY', 'CC BY-SA', 'Public Domain', 'owned', 'Custom'];

if (!fs.existsSync(manifestPath)) {
  console.error('image-approvals.json not found at', manifestPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function slugMatchesFilter(slug) {
  if (!args.length) return true;
  return args.includes(slug.toLowerCase());
}

let hasErrors = false;
let warningCount = 0;
let pendingTotal = 0;

for (const [slug, record] of Object.entries(data.posts || {})) {
  if (!slugMatchesFilter(slug)) continue;

  const requiredCount = Number(record.requiredCount || 0);
  const approved = (record.candidates || []).filter((candidate) => candidate.approved);
  if (approved.length < requiredCount) {
    console.warn(`[PENDING] ${slug}: approved ${approved.length}/${requiredCount}`);
    warningCount += 1;
    pendingTotal += requiredCount - approved.length;
  }

  approved.forEach((candidate, index) => {
    if (!candidate.url) {
      console.error(`[ERROR] ${slug} candidate ${index}: missing url`);
      hasErrors = true;
    }
    const source = (candidate.source || '').toLowerCase();
    if (prohibitedSources.some((host) => source.includes(host))) {
      console.error(`[ERROR] ${slug} candidate ${index}: source is prohibited (${candidate.source})`);
      hasErrors = true;
    }
    if (!allowedSources.some((host) => source.includes(host))) {
      console.warn(`[WARN] ${slug} candidate ${index}: source not in allow list (${candidate.source})`);
      warningCount += 1;
    }
    if (!validLicenseKeywords.some((token) => (candidate.license || '').includes(token))) {
      console.error(`[ERROR] ${slug} candidate ${index}: invalid or missing license (${candidate.license || 'n/a'})`);
      hasErrors = true;
    }
    if (!candidate.alt || candidate.alt.trim().length < 10) {
      console.warn(`[WARN] ${slug} candidate ${index}: alt text is very short or missing`);
      warningCount += 1;
    }
  });
}

if (args.length && !Object.keys(data.posts || {}).some((slug) => args.includes(slug.toLowerCase()))) {
  console.warn('None of the requested slugs were found in the manifest.');
}

console.log('\nValidation summary:');
console.log(`  Pending approvals: ${pendingTotal}`);
console.log(`  Warnings: ${warningCount}`);
console.log(`  Errors: ${hasErrors ? 'YES' : 'no'}`);

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log('Image approvals manifest looks OK.');
}

