#!/usr/bin/env node

/**
 * Simple Schema Validation Script
 * Validates that all schema components have proper image arrays and hasMerchantReturnPolicy fields
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Schema Components...\n');

// Files to check
const filesToCheck = [
  'src/components/ProductSchema.tsx',
  'src/components/UnifiedSchema.tsx',
  'src/components/OptimizedBookSalesTemplate.tsx',
  'src/app/layout.tsx'
];

let allValid = true;

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${filePath}: File not found`);
    allValid = false;
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const fileName = path.basename(filePath);
  
  console.log(`📄 Checking ${fileName}...`);
  
  let fileValid = true;
  
  // Count Offer schemas
  const offerCount = (content.match(/"@type":\s*"Offer"/g) || []).length;
  console.log(`  📦 Found ${offerCount} Offer schemas`);
  
  // Count hasMerchantReturnPolicy fields
  const returnPolicyCount = (content.match(/hasMerchantReturnPolicy/g) || []).length;
  console.log(`  📋 Found ${returnPolicyCount} hasMerchantReturnPolicy fields`);
  
  // Check if all offers have return policies
  if (offerCount > returnPolicyCount) {
    console.log(`  ⚠️  Missing hasMerchantReturnPolicy: ${offerCount - returnPolicyCount} offers without return policy`);
    fileValid = false;
  }
  
  // Count image fields
  const imageCount = (content.match(/image:\s*\[/g) || []).length;
  const nonArrayImageCount = (content.match(/image:\s*[^[]/g) || []).length;
  console.log(`  📸 Found ${imageCount} array image fields, ${nonArrayImageCount} non-array image fields`);
  
  if (nonArrayImageCount > 0) {
    console.log(`  ⚠️  Found ${nonArrayImageCount} non-array image fields`);
    fileValid = false;
  }
  
  if (fileValid) {
    console.log(`  ✅ ${fileName}: All checks passed`);
  } else {
    console.log(`  ❌ ${fileName}: Issues found`);
    allValid = false;
  }
});

console.log('\n📊 Summary:');
if (allValid) {
  console.log('🎉 All schema components are properly configured!');
  console.log('\n✅ All Offer schemas have hasMerchantReturnPolicy');
  console.log('✅ All image fields are arrays');
  console.log('\n🚀 Ready for Google Search Console validation!');
} else {
  console.log('❌ Some issues found that need to be fixed');
  console.log('\nPlease review the warnings above and fix any issues.');
}

// Test schema generation with sample data
console.log('\n🧪 Testing Schema Generation...');

const sampleBook = {
  id: 'test-book',
  title: 'Test Aviation Book',
  price: 25.99,
  imageUrl: '/book-covers/test-book.jpg',
  description: 'A test book for schema validation',
  inStock: true,
  condition: 'New',
  isbn: '9781234567890'
};

// Test the toAbsolute function logic
const toAbsolute = (img, fallbackId) => {
  const base = 'https://charlesmackaybooks.com';
  if (!img || img.trim().length === 0) return `${base}/book-covers/${fallbackId}.jpg`;
  if (img.startsWith('http')) return img;
  return `${base}${img.startsWith('/') ? '' : '/'}${img}`;
};

const testImageUrl = toAbsolute(sampleBook.imageUrl, sampleBook.id);
console.log(`  📸 Sample image URL: ${testImageUrl}`);

// Test hasMerchantReturnPolicy structure
const testReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "GB",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 30,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn",
  "returnShippingFeesAmount": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
  "returnPolicyUrl": "https://charlesmackaybooks.com/returns"
};

console.log(`  📋 Sample return policy structure: ${JSON.stringify(testReturnPolicy).length} characters`);

console.log('\n✅ Schema validation complete!');

// Exit with error code if issues found
process.exit(allValid ? 0 : 1);
