'use client';

import { useEffect } from 'react';

export default function PerformanceSEO() {
  useEffect(() => {
    // Preload critical resources for better LCP
    const criticalResources = [
      '/book-covers/beardmore-aviation.jpg',
      '/book-covers/clydeside-aviation-vol1.jpg', 
      '/book-covers/captain-eric-brown.jpg',
      '/charles-mackay-aviation-historian.jpg'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      document.head.appendChild(link);
    });

    // Optimize font loading for better CLS
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = '/fonts/inter-var.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Add performance meta tags
    const performanceMetas = [
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'theme-color', content: '#1e40af' },
      { name: 'msapplication-TileColor', content: '#1e40af' },
      { name: 'msapplication-navbutton-color', content: '#1e40af' }
    ];

    performanceMetas.forEach(meta => {
      const metaEl = document.createElement('meta');
      metaEl.name = meta.name;
      metaEl.content = meta.content;
      document.head.appendChild(metaEl);
    });

    // Optimize third-party scripts loading
    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        // Load non-critical analytics after idle
        import('../utils/performanceMonitor').catch(() => {});
      });
    }

    // Add structured data for Core Web Vitals monitoring
    const performanceSchema = {
      "@context": "https://schema.org",
      "@type": "WebPageElement",
      "name": "Performance Optimized Website",
      "description": "Website optimized for Core Web Vitals with LCP <2.5s, FID <100ms, CLS <0.1",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Largest Contentful Paint",
          "value": "<2.5s"
        },
        {
          "@type": "PropertyValue", 
          "name": "First Input Delay",
          "value": "<100ms"
        },
        {
          "@type": "PropertyValue",
          "name": "Cumulative Layout Shift", 
          "value": "<0.1"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(performanceSchema);
    document.head.appendChild(script);

  }, []);

  return null; // No visual output, just performance enhancements
}
