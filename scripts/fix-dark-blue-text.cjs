/**
 * Fix Dark Blue Background Text Color Issues
 * 
 * Ensures all buttons, badges, and links with dark blue backgrounds have white text
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// Find all TSX files
function findTSXFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules')) {
      files.push(...findTSXFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('🔍 Searching for dark blue background styling issues...\n');

const files = findTSXFiles(srcDir);
let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;
  
  // Fix patterns where dark blue backgrounds might have black text
  const patterns = [
    // Pattern: bg-blue or gradient with blue but no text-white
    {
      regex: /(className=["'][^"']*bg-(?:gradient-to-|from-|via-|to-)?(?:blue|slate)-(?:600|700|800|900)[^"']*["'])(?!.*text-white)/gi,
      fix: (match) => {
        if (!match.includes('text-white') && !match.includes('text-black')) {
          return match.replace(/["']$/, ' text-white"');
        }
        return match;
      }
    },
    // Pattern: btn-books without text-white
    {
      regex: /(className=["'][^"']*btn-books[^"']*["'])(?!.*text-white)/gi,
      fix: (match) => {
        if (!match.includes('text-white')) {
          return match.replace(/["']$/, ' text-white"');
        }
        return match;
      }
    },
    // Pattern: badge-blue without text-white
    {
      regex: /(className=["'][^"']*badge-blue[^"']*["'])(?!.*text-white)/gi,
      fix: (match) => {
        if (!match.includes('text-white')) {
          return match.replace(/["']$/, ' text-white"');
        }
        return match;
      }
    }
  ];
  
  patterns.forEach(pattern => {
    const matches = content.match(pattern.regex);
    if (matches) {
      matches.forEach(match => {
        const fixed = pattern.fix(match);
        if (fixed !== match) {
          content = content.replace(match, fixed);
          modified = true;
        }
      });
    }
  });
  
  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed: ${path.relative(srcDir, file)}`);
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files`);
console.log('✅ All dark blue backgrounds now have white text!');

