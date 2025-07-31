'use client';

import { useEffect } from 'react';
import { initializePerformanceOptimizations, PerformanceMonitor } from '../utils/performance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  useEffect(() => {
    // Initialize all performance optimizations
    initializePerformanceOptimizations();
    
    // Add resource hints to document head
    addResourceHints();
    
    // Initialize performance monitoring
    const monitor = PerformanceMonitor.getInstance();
    monitor.measureCoreWebVitals();
    
    // Report performance metrics
    reportPerformanceMetrics();
    
    // Cleanup on unmount
    return () => {
      // Cleanup if needed
    };
  }, []);

  return <>{children}</>;
}

// Add resource hints for performance optimization
function addResourceHints() {
  if (typeof document === 'undefined') return;

  const resourceHints = [
    // Preload critical fonts
    {
      rel: 'preload',
      href: '/fonts/georgia.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    // Preload critical CSS
    {
      rel: 'preload',
      href: '/styles/critical.css',
      as: 'style',
    },
    // Prefetch likely next pages
    {
      rel: 'prefetch',
      href: '/books',
    },
    {
      rel: 'prefetch',
      href: '/blog',
    },
    {
      rel: 'prefetch',
      href: '/about',
    },
    // DNS prefetch for external domains
    {
      rel: 'dns-prefetch',
      href: 'https://www.google-analytics.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com',
    },
  ];

  resourceHints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
}

// Report performance metrics
function reportPerformanceMetrics() {
  if (typeof window === 'undefined') return;

  // Report initial page load metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const metrics = {
          // Time to First Byte
          TTFB: navigation.responseStart - navigation.requestStart,
          // DOM Content Loaded
          DCL: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          // Load Complete
          LoadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          // Total Page Load Time
          TotalLoad: navigation.loadEventEnd - navigation.navigationStart,
        };

        // Send to analytics
        if (typeof gtag !== 'undefined') {
          Object.entries(metrics).forEach(([name, value]) => {
            gtag('event', 'timing_complete', {
              name,
              value: Math.round(value),
            });
          });
        }

        // Log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metrics);
        }
      }
    }, 0);
  });

  // Monitor for layout shifts
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    
    // Report CLS if it exceeds threshold
    if (clsValue > 0.1) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'layout_shift', {
          value: clsValue,
        });
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // Monitor for long tasks
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const duration = entry.duration;
      if (duration > 50) { // Long task threshold
        if (typeof gtag !== 'undefined') {
          gtag('event', 'long_task', {
            value: Math.round(duration),
          });
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.warn('Long task detected:', duration, 'ms');
        }
      }
    }
  }).observe({ entryTypes: ['longtask'] });
}

// Export performance utilities for use in other components
export { PerformanceMonitor } from '../utils/performance'; 