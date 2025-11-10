#!/usr/bin/env node

/**
 * Remove trailing slashes from all canonical URLs
 * After disabling trailingSlash in Next.js, all canonical tags should not have trailing slashes
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app');

let fixed = 0;
let errors = [];

function processFile(filePath, relativePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix canonical URLs - remove trailing slash
    const canonicalRegex = /canonical:\s*['"]https:\/\/charlesmackaybooks\.com\/([^'"]+)\/['"]/g;
    content = content.replace(canonicalRegex, (match, urlPath) => {
      modified = true;
      return match.replace(/\/['"]$/, "'");
    });
    
    // Also fix canonical URLs without https://
    const canonicalRegex2 = /canonical:\s*['"]\/?([^'"]+)\/['"]/g;
    content = content.replace(canonicalRegex2, (match, urlPath) => {
      if (urlPath.startsWith('http')) return match; // Skip full URLs
      modified = true;
      return match.replace(/\/['"]$/, "'");
    });
    
    // Fix OpenGraph URLs - remove trailing slash
    const ogUrlRegex = /url:\s*['"]https:\/\/charlesmackaybooks\.com\/([^'"]+)\/['"]/g;
    content = content.replace(ogUrlRegex, (match) => {
      modified = true;
      return match.replace(/\/['"]$/, "'");
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${relativePath}`);
      fixed++;
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
    errors.push({ path: relativePath, error: error.message });
    return false;
  }
}

function processDirectory(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name.startsWith('.')) {
        continue;
      }
      processDirectory(fullPath, relPath);
    } else if (entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts')) {
      processFile(fullPath, relPath);
    }
  }
}

// Also check components for canonical URLs
const componentsDir = path.join(__dirname, '../src/components');
function processComponents() {
  const files = fs.readdirSync(componentsDir, { recursive: true, withFileTypes: true });
  
  for (const file of files) {
    if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.ts'))) {
      const fullPath = path.join(componentsDir, file.path || '', file.name);
      processFile(fullPath, `components/${file.path || ''}/${file.name}`);
    }
  }
}

console.log('🔍 Removing trailing slashes from canonical URLs...\n');

// Process app directory
processDirectory(baseDir);

// Process components directory
processComponents();

console.log(`\n📊 Summary:`);
console.log(`✅ Fixed: ${fixed}`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(e => console.log(`   - ${e.path}: ${e.error}`));
}

console.log('\n✅ Canonical URL fixes complete!');

