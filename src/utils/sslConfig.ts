/**
 * SSL/TLS Configuration for Mobile Compatibility
 * Fixes SSL protocol errors on mobile devices
 */

export interface SSLConfig {
  tlsVersion: string;
  cipherSuites: string[];
  hstsEnabled: boolean;
  hstsMaxAge: number;
  hstsIncludeSubDomains: boolean;
  hstsPreload: boolean;
  mobileCompatibility: boolean;
}

export const sslConfig: SSLConfig = {
  tlsVersion: 'TLSv1.2',
  cipherSuites: [
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-SHA384',
    'ECDHE-RSA-AES128-SHA256',
    'AES256-GCM-SHA384',
    'AES128-GCM-SHA256',
    'AES256-SHA256',
    'AES128-SHA256'
  ],
  hstsEnabled: true,
  hstsMaxAge: 31536000, // 1 year
  hstsIncludeSubDomains: true,
  hstsPreload: true,
  mobileCompatibility: true
};

/**
 * Generate SSL headers for mobile compatibility
 */
export function generateSSLHeaders(): Record<string, string> {
  return {
    // HTTP Strict Transport Security (HSTS) - Critical for mobile SSL
    'Strict-Transport-Security': `max-age=${sslConfig.hstsMaxAge}; includeSubDomains; preload`,
    
    // X-Forwarded headers for proper SSL detection
    'X-Forwarded-Proto': 'https',
    'X-Forwarded-Ssl': 'on',
    'X-Forwarded-Port': '443',
    
    // Security headers for mobile browsers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    
    // Content Security Policy optimized for mobile
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://api.netlify.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Permissions Policy for mobile privacy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    
    // Referrer Policy for mobile privacy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Cross-Origin policies for mobile
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin'
  };
}

/**
 * Mobile-specific SSL validation
 */
export function validateMobileSSL(userAgent: string): boolean {
  const mobileBrowsers = [
    'Mobile',
    'Android',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
    'Opera Mini',
    'IEMobile'
  ];
  
  const isMobile = mobileBrowsers.some(browser => 
    userAgent.toLowerCase().includes(browser.toLowerCase())
  );
  
  return isMobile;
}

/**
 * Get TLS configuration for mobile devices
 */
export function getMobileTLSConfig(): Record<string, any> {
  return {
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3',
    ciphers: [
      'ECDHE-ECDSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-ECDSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-ECDSA-AES256-SHA384',
      'ECDHE-RSA-AES256-SHA384',
      'ECDHE-ECDSA-AES128-SHA256',
      'ECDHE-RSA-AES128-SHA256'
    ],
    honorCipherOrder: true,
    secureProtocol: 'TLSv1_2_method'
  };
}

/**
 * SSL Error Detection and Resolution
 */
export function detectSSLErrors(error: string): string[] {
  const commonSSLErrors = [
    'SSL protocol error',
    'TLS handshake failed',
    'Certificate verification failed',
    'Cipher suite mismatch',
    'Protocol version mismatch',
    'Mobile SSL compatibility issue'
  ];
  
  return commonSSLErrors.filter(errorType => 
    error.toLowerCase().includes(errorType.toLowerCase())
  );
}

/**
 * Generate SSL troubleshooting steps
 */
export function getSSLTroubleshootingSteps(): string[] {
  return [
    '1. Verify HTTPS redirects are working properly',
    '2. Check HSTS headers are being sent',
    '3. Ensure TLS 1.2+ is supported',
    '4. Validate SSL certificate chain',
    '5. Test mobile browser compatibility',
    '6. Check Content Security Policy settings',
    '7. Verify cipher suite compatibility',
    '8. Test with different mobile devices'
  ];
}
