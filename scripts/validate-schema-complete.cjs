#!/usr/bin/env node

/**
 * Complete Schema Validation Script
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
  
  // Check for image arrays (should be [imageUrl] not just imageUrl)
  const imageFields = content.match(/image:\s*([^,\n}]+)/g);
  if (imageFields) {
    imageFields.forEach(field => {
      if (!field.includes('[') || !field.includes(']')) {
        console.log(`  ⚠️  Found non-array image field: ${field.trim()}`);
        fileValid = false;
      }
    });
  }
  
  // Check for hasMerchantReturnPolicy in offers
  const offerSections = content.match(/"@type":\s*"Offer"[\s\S]*?}/g);
  if (offerSections) {
    offerSections.forEach((offer, index) => {
      if (!offer.includes('hasMerchantReturnPolicy')) {
        console.log(`  ⚠️  Offer section ${index + 1} missing hasMerchantReturnPolicy`);
        fileValid = false;
      }
    });
  }
  
  // Check for proper hasMerchantReturnPolicy structure
  const returnPolicies = content.match(/hasMerchantReturnPolicy:\s*{[\s\S]*?}/g);
  if (returnPolicies) {
    returnPolicies.forEach((policy, index) => {
      if (!policy.includes('"@type": "MerchantReturnPolicy"')) {
        console.log(`  ⚠️  hasMerchantReturnPolicy ${index + 1} missing @type`);
        fileValid = false;
      }
      if (!policy.includes('merchantReturnDays')) {
        console.log(`  ⚠️  hasMerchantReturnPolicy ${index + 1} missing merchantReturnDays`);
        fileValid = false;
      }
    });
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
  console.log('\n✅ Image fields are arrays');
  console.log('✅ All offers have hasMerchantReturnPolicy');
  console.log('✅ hasMerchantReturnPolicy has proper structure');
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
