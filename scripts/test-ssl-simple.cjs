#!/usr/bin/env node

/**
 * Simple SSL Test - Check if SSL connection works
 */

const https = require('https');

console.log('🔒 Testing SSL Connection...\n');

const testSSL = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'charlesmackaybooks.com',
      port: 443,
      path: '/',
      method: 'GET',
      timeout: 10000,
      rejectUnauthorized: true
    };

    console.log('Connecting to charlesmackaybooks.com...');
    
    const req = https.request(options, (res) => {
      console.log('✅ SSL Connection: SUCCESS');
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Protocol: ${req.socket.getProtocol()}`);
      console.log(`   Cipher: ${req.socket.getCipher()?.name || 'Unknown'}`);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`   Content Length: ${data.length} bytes`);
        resolve({ success: true, status: res.statusCode });
      });
    });

    req.on('error', (error) => {
      console.log('❌ SSL Connection: FAILED');
      console.log(`   Error: ${error.message}`);
      reject({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ SSL Connection: TIMEOUT');
      req.destroy();
      reject({ success: false, error: 'Connection timeout' });
    });

    req.end();
  });
};

// Run test
testSSL()
  .then(result => {
    console.log('\n🎉 SSL Test Result: SUCCESS');
    process.exit(0);
  })
  .catch(error => {
    console.log('\n💥 SSL Test Result: FAILED');
    console.log('Error:', error.error || error);
    process.exit(1);
  });
