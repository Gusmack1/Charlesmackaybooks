/**
 * Security Manager - Comprehensive Security Implementation
 * Based on Charles Mackay Books Website Analysis Report - Prompt 10
 */

interface SecurityConfig {
  environment: 'development' | 'production' | 'test';
  domain: string;
  enableCSP: boolean;
  enableHSTS: boolean;
  enableSecurityHeaders: boolean;
  enableThreatMonitoring: boolean;
  enableGDPRCompliance: boolean;
}

interface SecurityThreat {
  id: string;
  type: 'xss' | 'csrf' | 'injection' | 'brute_force' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: Date;
  details: Record<string, any>;
  resolved: boolean;
}

interface GDPRConsent {
  userId: string;
  sessionId: string;
  consentGiven: boolean;
  consentTypes: string[];
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

class SecurityManager {
  private config: SecurityConfig;
  private threats: SecurityThreat[] = [];
  private gdprConsents: Map<string, GDPRConsent> = new Map();

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = {
      environment: process.env.NODE_ENV as any || 'development',
      domain: 'charlesmackaybooks.com',
      enableCSP: true,
      enableHSTS: true,
      enableSecurityHeaders: true,
      enableThreatMonitoring: true,
      enableGDPRCompliance: true,
      ...config
    };

    this.initializeSecurityMeasures();
  }

  /**
   * Initialize all security measures
   */
  private initializeSecurityMeasures(): void {
    if (typeof window !== 'undefined') {
      this.setupClientSideSecurity();
      this.initializeThreatMonitoring();
      this.setupGDPRCompliance();
    }
  }

  /**
   * Get Content Security Policy headers
   */
  getCSPHeaders(): Record<string, string> {
    const csp = {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Needed for Next.js
        "'unsafe-eval'", // Needed for development
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://vercel.live',
        'https://va.vercel-scripts.com'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Needed for styled-jsx
        'https://fonts.googleapis.com'
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'data:'
      ],
      'img-src': [
        "'self'",
        'data:',
        'https:',
        'blob:'
      ],
      'connect-src': [
        "'self'",
        'https://www.google-analytics.com',
        'https://vitals.vercel-insights.com',
        'https://api.netlify.com'
      ],
      'frame-ancestors': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': []
    };

    // More restrictive in production
    if (this.config.environment === 'production') {
      csp['script-src'] = csp['script-src'].filter(src => src !== "'unsafe-eval'");
    }

    const cspString = Object.entries(csp)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');

    return {
      'Content-Security-Policy': cspString,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      ...(this.config.enableHSTS && {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
      })
    };
  }

  /**
   * Setup client-side security measures
   */
  private setupClientSideSecurity(): void {
    // Disable right-click context menu on production
    if (this.config.environment === 'production') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    }

    // Disable developer tools detection
    this.setupDevToolsDetection();

    // Setup form protection
    this.setupFormProtection();

    // Setup session security
    this.setupSessionSecurity();
  }

  /**
   * Developer tools detection (basic)
   */
  private setupDevToolsDetection(): void {
    if (this.config.environment === 'production') {
      let devtools = false;
      const threshold = 160;

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools) {
            devtools = true;
            this.logSecurityEvent('dev_tools_detected', 'medium', {
              outerHeight: window.outerHeight,
              innerHeight: window.innerHeight,
              outerWidth: window.outerWidth,
              innerWidth: window.innerWidth
            });
          }
        } else {
          devtools = false;
        }
      }, 500);
    }
  }

  /**
   * Form protection against CSRF and injection
   */
  private setupFormProtection(): void {
    // Add CSRF tokens to forms
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        if (!form.querySelector('input[name="csrf_token"]')) {
          const csrfToken = this.generateCSRFToken();
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'csrf_token';
          hiddenInput.value = csrfToken;
          form.appendChild(hiddenInput);
        }
      });
    });

    // Input sanitization
    document.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'text' || target.type === 'email') {
        target.value = this.sanitizeInput(target.value);
      }
    });
  }

  /**
   * Session security management
   */
  private setupSessionSecurity(): void {
    // Session timeout
    let sessionTimeout: NodeJS.Timeout;
    const resetSessionTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(() => {
        this.handleSessionTimeout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Reset timeout on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetSessionTimeout, true);
    });

    resetSessionTimeout();

    // Secure cookie settings
    this.setupSecureCookies();
  }

  /**
   * Initialize threat monitoring
   */
  private initializeThreatMonitoring(): void {
    if (!this.config.enableThreatMonitoring) return;

    // Monitor for XSS attempts
    this.monitorXSSAttempts();

    // Monitor for suspicious activity
    this.monitorSuspiciousActivity();

    // Monitor for brute force attempts
    this.monitorBruteForceAttempts();

    // Report threats periodically
    setInterval(() => {
      this.reportThreats();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Monitor XSS attempts
   */
  private monitorXSSAttempts(): void {
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /eval\s*\(/gi,
      /expression\s*\(/gi
    ];

    // Monitor URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      dangerousPatterns.forEach(pattern => {
        if (pattern.test(value)) {
          this.logThreat('xss', 'high', window.location.href, {
            parameter: key,
            value: value,
            pattern: pattern.toString()
          });
        }
      });
    });

    // Monitor form inputs
    document.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      dangerousPatterns.forEach(pattern => {
        if (pattern.test(target.value)) {
          this.logThreat('xss', 'medium', 'form_input', {
            fieldName: target.name,
            value: target.value.substring(0, 100), // Truncate for security
            pattern: pattern.toString()
          });
        }
      });
    });
  }

  /**
   * Monitor suspicious activity
   */
  private monitorSuspiciousActivity(): void {
    let rapidClicks = 0;
    let rapidClickTimer: NodeJS.Timeout;

    document.addEventListener('click', () => {
      rapidClicks++;
      clearTimeout(rapidClickTimer);
      rapidClickTimer = setTimeout(() => {
        if (rapidClicks > 20) { // More than 20 clicks per second
          this.logThreat('suspicious_activity', 'medium', 'rapid_clicking', {
            clickCount: rapidClicks,
            timeframe: '1_second'
          });
        }
        rapidClicks = 0;
      }, 1000);
    });

    // Monitor for multiple failed attempts (simulated)
    let failedAttempts = 0;
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      if (form.classList.contains('login-form')) {
        // This would be integrated with actual authentication
        failedAttempts++;
        if (failedAttempts > 3) {
          this.logThreat('brute_force', 'high', 'login_form', {
            attempts: failedAttempts,
            form: form.action
          });
        }
      }
    });
  }

  /**
   * Monitor brute force attempts
   */
  private monitorBruteForceAttempts(): void {
    const attempts = new Map<string, number>();
    const attemptTimestamps = new Map<string, number[]>();

    const trackAttempt = (identifier: string) => {
      const now = Date.now();
      const currentAttempts = attempts.get(identifier) || 0;
      const timestamps = attemptTimestamps.get(identifier) || [];

      // Remove attempts older than 15 minutes
      const recentTimestamps = timestamps.filter(timestamp => now - timestamp < 15 * 60 * 1000);
      
      recentTimestamps.push(now);
      attempts.set(identifier, currentAttempts + 1);
      attemptTimestamps.set(identifier, recentTimestamps);

      // Check for brute force pattern
      if (recentTimestamps.length > 5) { // More than 5 attempts in 15 minutes
        this.logThreat('brute_force', 'high', identifier, {
          attempts: recentTimestamps.length,
          timeframe: '15_minutes',
          timestamps: recentTimestamps
        });
      }
    };

    // Monitor form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      const identifier = `form_${form.action || window.location.pathname}`;
      trackAttempt(identifier);
    });
  }

  /**
   * Setup GDPR compliance
   */
  private setupGDPRCompliance(): void {
    if (!this.config.enableGDPRCompliance) return;

    // Check for existing consent
    const existingConsent = localStorage.getItem('gdpr_consent');
    if (!existingConsent) {
      this.showGDPRBanner();
    } else {
      try {
        const consent = JSON.parse(existingConsent) as GDPRConsent;
        this.gdprConsents.set(consent.sessionId, consent);
      } catch (e) {
        console.warn('Invalid GDPR consent data, showing banner');
        this.showGDPRBanner();
      }
    }
  }

  /**
   * Show GDPR consent banner
   */
  private showGDPRBanner(): void {
    const banner = document.createElement('div');
    banner.id = 'gdpr-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1f2937;
        color: white;
        padding: 20px;
        z-index: 9999;
        box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div style="flex: 1; min-width: 300px;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">🍪 Cookie & Privacy Notice</h3>
            <p style="margin: 0; font-size: 14px; line-height: 1.5; opacity: 0.9;">
              We use essential cookies for website functionality and analytics to improve your experience. 
              <a href="/privacy-policy" style="color: #60a5fa; text-decoration: underline;">View Privacy Policy</a>
            </p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button id="gdpr-accept" style="
              background: #16a34a;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.2s;
            ">Accept All</button>
            <button id="gdpr-essential" style="
              background: transparent;
              color: white;
              border: 2px solid #6b7280;
              padding: 10px 20px;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            ">Essential Only</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Handle consent choices
    document.getElementById('gdpr-accept')?.addEventListener('click', () => {
      this.recordGDPRConsent(true, ['essential', 'analytics', 'marketing']);
      banner.remove();
    });

    document.getElementById('gdpr-essential')?.addEventListener('click', () => {
      this.recordGDPRConsent(true, ['essential']);
      banner.remove();
    });
  }

  /**
   * Record GDPR consent
   */
  private recordGDPRConsent(consentGiven: boolean, consentTypes: string[]): void {
    const sessionId = this.getSessionId();
    const consent: GDPRConsent = {
      userId: 'anonymous', // Would be actual user ID if logged in
      sessionId,
      consentGiven,
      consentTypes,
      timestamp: new Date(),
      ipAddress: 'hidden', // Would be actual IP from server
      userAgent: navigator.userAgent
    };

    this.gdprConsents.set(sessionId, consent);
    localStorage.setItem('gdpr_consent', JSON.stringify(consent));

    // Enable/disable tracking based on consent
    this.updateTrackingBasedOnConsent(consent);
  }

  /**
   * Update tracking based on consent
   */
  private updateTrackingBasedOnConsent(consent: GDPRConsent): void {
    if (consent.consentTypes.includes('analytics')) {
      // Enable Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    }

    if (consent.consentTypes.includes('marketing')) {
      // Enable marketing cookies
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          ad_storage: 'granted'
        });
      }
    }
  }

  /**
   * Log security threat
   */
  private logThreat(
    type: SecurityThreat['type'],
    severity: SecurityThreat['severity'],
    source: string,
    details: Record<string, any>
  ): void {
    const threat: SecurityThreat = {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      source,
      timestamp: new Date(),
      details,
      resolved: false
    };

    this.threats.push(threat);

    // Log to console in development
    if (this.config.environment === 'development') {
      console.warn('Security threat detected:', threat);
    }

    // Send to monitoring service in production
    if (this.config.environment === 'production') {
      this.sendThreatToMonitoringService(threat);
    }
  }

  /**
   * Send threat to monitoring service
   */
  private sendThreatToMonitoringService(threat: SecurityThreat): void {
    // In production, this would send to a security monitoring service
    if (navigator.sendBeacon) {
      const data = JSON.stringify(threat);
      navigator.sendBeacon('/api/security/threats', data);
    }
  }

  /**
   * Utility functions
   */
  private generateCSRFToken(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('security_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('security_session_id', sessionId);
    }
    return sessionId;
  }

  private setupSecureCookies(): void {
    // Override document.cookie to enforce secure settings
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    if (originalCookieDescriptor) {
      Object.defineProperty(document, 'cookie', {
        get: originalCookieDescriptor.get,
        set: function(value: string) {
          // Add security flags to cookies
          if (location.protocol === 'https:' && !value.includes('Secure')) {
            value += '; Secure';
          }
          if (!value.includes('SameSite')) {
            value += '; SameSite=Strict';
          }
          originalCookieDescriptor.set?.call(this, value);
        },
        configurable: true
      });
    }
  }

  private handleSessionTimeout(): void {
    alert('Your session has expired for security reasons. Please refresh the page.');
    // Clear sensitive data
    sessionStorage.clear();
    // Redirect to home page
    window.location.href = '/';
  }

  private logSecurityEvent(event: string, severity: string, details: any): void {
    console.log(`Security Event [${severity}]: ${event}`, details);
  }

  private reportThreats(): void {
    const unresolvedThreats = this.threats.filter(t => !t.resolved);
    if (unresolvedThreats.length > 0) {
      console.log(`Security Report: ${unresolvedThreats.length} unresolved threats`);
    }
  }

  // Public methods
  public getSecurityStatus(): {
    threatsDetected: number;
    lastThreatAt: Date | null;
    gdprCompliant: boolean;
    sessionSecure: boolean;
  } {
    return {
      threatsDetected: this.threats.length,
      lastThreatAt: this.threats.length > 0 ? this.threats[this.threats.length - 1].timestamp : null,
      gdprCompliant: this.gdprConsents.size > 0,
      sessionSecure: !!sessionStorage.getItem('security_session_id')
    };
  }

  public hasGDPRConsent(type: string): boolean {
    const sessionId = this.getSessionId();
    const consent = this.gdprConsents.get(sessionId);
    return consent ? consent.consentTypes.includes(type) : false;
  }

  public getThreats(): SecurityThreat[] {
    return [...this.threats];
  }
}

// Export singleton instance
export const securityManager = new SecurityManager();

// Export class for custom instances
export { SecurityManager };

// Utility functions for security
export const SecurityUtils = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 254;
  },

  validateURL: (url: string): boolean => {
    try {
      new URL(url);
      return !url.includes('javascript:') && !url.includes('data:');
    } catch {
      return false;
    }
  },

  sanitizeHTML: (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  generateSecureToken: (): string => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
};