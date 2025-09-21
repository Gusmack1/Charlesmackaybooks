#!/usr/bin/env node

/**
 * SSL and Mobile Compatibility Test Script
 * Tests SSL configuration and mobile browser compatibility
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const TEST_URL = 'https://charlesmackaybooks.com';
const MOBILE_USER_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
  'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36'
];

console.log('🔒 SSL and Mobile Compatibility Test');
console.log('=====================================\n');

/**
 * Test SSL connection
 */
async function testSSLConnection(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'SSL-Test-Agent/1.0'
      },
      rejectUnauthorized: true,
      secureProtocol: 'TLSv1_2_method'
    };

    const req = https.request(options, (res) => {
      const headers = res.headers;
      
      resolve({
        statusCode: res.statusCode,
        headers: headers,
        sslVersion: res.connection.getProtocol(),
        cipher: res.connection.getCipher(),
        secure: true
      });
    });

    req.on('error', (error) => {
      reject({
        error: error.message,
        secure: false
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        secure: false
      });
    });

    req.end();
  });
}

/**
 * Test mobile user agent compatibility
 */
async function testMobileCompatibility(url, userAgent) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      rejectUnauthorized: true,
      secureProtocol: 'TLSv1_2_method'
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          contentLength: data.length,
          sslVersion: res.connection.getProtocol(),
          cipher: res.connection.getCipher(),
          mobileCompatible: true
        });
      });
    });

    req.on('error', (error) => {
      reject({
        error: error.message,
        mobileCompatible: false
      });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      reject({
        error: 'Mobile test timeout',
        mobileCompatible: false
      });
    });

    req.end();
  });
}

/**
 * Check security headers
 */
function checkSecurityHeaders(headers) {
  const requiredHeaders = [
    'strict-transport-security',
    'x-frame-options',
    'x-content-type-options',
    'x-xss-protection',
    'content-security-policy'
  ];

  const results = {};
  
  requiredHeaders.forEach(header => {
    results[header] = headers[header] ? '✅ Present' : '❌ Missing';
  });

  return results;
}

/**
 * Main test function
 */
async function runTests() {
  try {
    console.log('Testing SSL connection...');
    const sslResult = await testSSLConnection(TEST_URL);
    
    if (sslResult.secure) {
      console.log('✅ SSL Connection: SUCCESS');
      console.log(`   SSL Version: ${sslResult.sslVersion}`);
      console.log(`   Cipher: ${sslResult.cipher.name}`);
      console.log(`   Status: ${sslResult.statusCode}\n`);
      
      // Check security headers
      console.log('Checking security headers...');
      const headerResults = checkSecurityHeaders(sslResult.headers);
      Object.entries(headerResults).forEach(([header, status]) => {
        console.log(`   ${header}: ${status}`);
      });
      console.log('');
      
    } else {
      console.log('❌ SSL Connection: FAILED');
      console.log(`   Error: ${sslResult.error}\n`);
    }

    // Test mobile compatibility
    console.log('Testing mobile compatibility...');
    for (let i = 0; i < MOBILE_USER_AGENTS.length; i++) {
      const userAgent = MOBILE_USER_AGENTS[i];
      const deviceType = userAgent.includes('iPhone') ? 'iPhone' : 
                        userAgent.includes('iPad') ? 'iPad' :
                        userAgent.includes('Android') ? 'Android' :
                        userAgent.includes('Windows Phone') ? 'Windows Phone' : 'Unknown';
      
      try {
        const mobileResult = await testMobileCompatibility(TEST_URL, userAgent);
        
        if (mobileResult.mobileCompatible) {
          console.log(`✅ ${deviceType}: SUCCESS (${mobileResult.statusCode})`);
          console.log(`   SSL: ${mobileResult.sslVersion}, Cipher: ${mobileResult.cipher.name}`);
        } else {
          console.log(`❌ ${deviceType}: FAILED - ${mobileResult.error}`);
        }
      } catch (error) {
        console.log(`❌ ${deviceType}: ERROR - ${error.message}`);
      }
    }
    
    console.log('\n🔒 SSL Test Summary');
    console.log('==================');
    console.log('SSL Connection:', sslResult.secure ? '✅ PASS' : '❌ FAIL');
    console.log('Security Headers:', Object.values(checkSecurityHeaders(sslResult.headers || {})).every(v => v.includes('✅')) ? '✅ PASS' : '❌ FAIL');
    console.log('Mobile Compatibility: Tested across multiple devices');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
runTests();
