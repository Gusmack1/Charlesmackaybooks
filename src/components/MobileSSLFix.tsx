'use client';

import { useEffect, useState } from 'react';

interface MobileSSLFixProps {
  children: React.ReactNode;
}

export default function MobileSSLFix({ children }: MobileSSLFixProps) {
  const [sslStatus, setSslStatus] = useState<'checking' | 'secure' | 'error'>('checking');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile device
    const userAgent = navigator.userAgent;
    const mobileBrowsers = [
      'Mobile', 'Android', 'iPhone', 'iPad', 'iPod', 
      'BlackBerry', 'Windows Phone', 'Opera Mini', 'IEMobile'
    ];
    
    const isMobileDevice = mobileBrowsers.some(browser => 
      userAgent.toLowerCase().includes(browser.toLowerCase())
    );
    
    setIsMobile(isMobileDevice);

    // Check SSL status
    const checkSSL = () => {
      try {
        // Check if we're on HTTPS
        if (window.location.protocol === 'https:') {
          setSslStatus('secure');
        } else {
          setSslStatus('error');
          // Force redirect to HTTPS
          window.location.href = window.location.href.replace('http:', 'https:');
        }
      } catch (error) {
        console.error('SSL check failed:', error);
        setSslStatus('error');
      }
    };

    checkSSL();

    // Monitor SSL status changes
    const handleBeforeUnload = () => {
      if (window.location.protocol !== 'https:') {
        window.location.href = window.location.href.replace('http:', 'https:');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Show SSL error message for mobile users
  if (isMobile && sslStatus === 'error') {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-600 text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            SSL Connection Required
          </h1>
          <p className="text-gray-600 mb-4">
            This site requires a secure connection. Please ensure you're accessing the site via HTTPS.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
          <p className="text-sm text-gray-500 mt-4">
            If the problem persists, try clearing your browser cache or using a different browser.
          </p>
        </div>
      </div>
    );
  }

  // Show loading state while checking SSL
  if (sslStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying secure connection...</p>
        </div>
      </div>
    );
  }

  // Show secure content
  return <>{children}</>;
}

/**
 * SSL Status Indicator Component
 */
export function SSLStatusIndicator() {
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    setIsSecure(window.location.protocol === 'https:');
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${isSecure ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className={isSecure ? 'text-green-600' : 'text-red-600'}>
        {isSecure ? 'Secure Connection' : 'Insecure Connection'}
      </span>
    </div>
  );
}

/**
 * Mobile SSL Debug Component
 */
export function MobileSSLDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const info = {
      protocol: window.location.protocol,
      host: window.location.host,
      userAgent: navigator.userAgent,
      isSecure: window.location.protocol === 'https:',
      timestamp: new Date().toISOString(),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    setDebugInfo(info);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">SSL Debug Info</h3>
      {debugInfo && (
        <div className="space-y-1">
          <div>Protocol: {debugInfo.protocol}</div>
          <div>Secure: {debugInfo.isSecure ? 'Yes' : 'No'}</div>
          <div>Mobile: {debugInfo.userAgent.includes('Mobile') ? 'Yes' : 'No'}</div>
          <div>Screen: {debugInfo.screenSize}</div>
        </div>
      )}
    </div>
  );
}
