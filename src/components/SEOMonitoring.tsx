'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

// Analytics declarations are now in Analytics.tsx to avoid conflicts

export default function SEOMonitoring() {
  useEffect(() => {
    // Core Web Vitals tracking
    const trackWebVitals = () => {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS((metric: Metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'CLS', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(metric.value * 1000),
              non_interaction: true,
            });
          }
        });

        onINP((metric: Metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'INP', {
              event_category: 'Web Vitals',
              event_label: 'INP',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });

        onFCP((metric: Metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'FCP', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });

        onLCP((metric: Metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'LCP', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });

        onTTFB((metric: Metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'TTFB', {
              event_category: 'Web Vitals',
              event_label: 'TTFB',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });
      });
    };

    // Track page load performance
    const trackPagePerformance = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation && window.gtag) {
          // DOM Content Loaded
          window.gtag('event', 'DOM_Content_Loaded', {
            event_category: 'Performance',
            event_label: 'DOM Ready',
            value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
            non_interaction: true,
          });

          // Page Load Complete
          window.gtag('event', 'Page_Load_Complete', {
            event_category: 'Performance',
            event_label: 'Load Complete',
            value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
            non_interaction: true,
          });
        }
      }
    };

    // Track user device information
    const trackDeviceInfo = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'Device_Info', {
          event_category: 'Technical',
          screen_resolution: `${screen.width}x${screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          user_agent: navigator.userAgent.substring(0, 100), // Truncate for privacy
          connection_type: (navigator as { connection?: { effectiveType?: string } }).connection?.effectiveType || 'unknown',
          non_interaction: true,
        });
      }
    };

    // Initialize tracking
    if (document.readyState === 'complete') {
      trackWebVitals();
      trackPagePerformance();
      trackDeviceInfo();
    } else {
      window.addEventListener('load', () => {
        trackWebVitals();
        trackPagePerformance();
        trackDeviceInfo();
      });
    }

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;

        // Track milestone scroll depths
        if (scrollPercent >= 25 && maxScrollDepth < 25) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: '25%',
              value: 25,
            });
          }
        } else if (scrollPercent >= 50 && maxScrollDepth < 50) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: '50%',
              value: 50,
            });
          }
        } else if (scrollPercent >= 75 && maxScrollDepth < 75) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: '75%',
              value: 75,
            });
          }
        } else if (scrollPercent >= 90 && maxScrollDepth < 90) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: '90%',
              value: 90,
            });
          }
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);

  return (
    <>
      {/* Google Search Console verification */}
      <meta name="google-site-verification" content="a7ce294f58dd63f7" />

      {/* Bing Webmaster Tools verification */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

      {/* Schema.org structured data for monitoring */}
      <Script
        id="seo-monitoring"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Charles E. MacKay Aviation Books",
            "alternateName": "Charles MacKay Books",
            "url": "https://charlesmackaybooks.com",
            "description": "Authentic aviation history books by renowned historian Charles E. MacKay",
            "publisher": {
              "@type": "Person",
              "name": "Charles E. MacKay",
              "jobTitle": "Aviation Historian & Author"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://charlesmackaybooks.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Enhanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </>
  );
}
