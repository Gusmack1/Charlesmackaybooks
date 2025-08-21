#!/usr/bin/env node
// Validate src/data/image-approvals.json for source/license/completeness
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'src', 'data', 'image-approvals.json');
const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const allowedSources = [
  'commons.wikimedia.org',
  'wikimedia.org',
  'upload.wikimedia.org',
  'unsplash.com',
  'pixabay.com',
  'pexels.com',
  'internal'
];
const prohibitedSources = [
  'gettyimages.com',
  'alamy.com',
  'shutterstock.com',
  'istockphoto.com',
  'adobe.com'
];

const validLicenseKeywords = ['CC0', 'CC BY', 'CC BY-SA', 'Public Domain', 'owned', 'Custom'];

let ok = true;
for (const [slug, rec] of Object.entries(data.posts || {})) {
  const approved = (rec.candidates || []).filter(c => c.approved);
  if (approved.length < (rec.requiredCount || 0)) {
    console.warn(`[PENDING] ${slug}: approved ${approved.length}/${rec.requiredCount}`);
    ok = false;
  }
  approved.forEach((c, idx) => {
    if (!c.url) { console.error(`[ERROR] ${slug} candidate ${idx}: missing url`); ok = false; }
    const lower = (c.source || '').toLowerCase();
    if (prohibitedSources.some(p => lower.includes(p))) {
      console.error(`[ERROR] ${slug} candidate ${idx}: source is prohibited (${c.source})`);
      ok = false;
    }
    if (!allowedSources.some(a => lower.includes(a))) {
      console.warn(`[WARN] ${slug} candidate ${idx}: source not in allowed list (${c.source})`);
    }
    if (!validLicenseKeywords.some(k => (c.license || '').includes(k))) {
      console.error(`[ERROR] ${slug} candidate ${idx}: invalid/unknown license (${c.license})`);
      ok = false;
    }
  });
}

if (!ok) {
  console.error('Validation failed. Fix errors above.');
  process.exit(1);
}
console.log('Image approvals manifest looks OK.');

