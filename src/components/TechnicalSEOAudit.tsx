'use client';

import { useEffect } from 'react';

export default function TechnicalSEOAudit() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Technical SEO audit and optimizations
    const runTechnicalAudit = () => {
      const results: any[] = [];

      // 1. Check page speed and Core Web Vitals
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              results.push({
                metric: 'LCP',
                value: entry.startTime,
                status: entry.startTime < 2500 ? 'excellent' : entry.startTime < 4000 ? 'good' : 'poor'
              });
            }
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // 2. Crawlability audit
      const crawlabilityAudit = {
        sitemap: document.querySelector('link[rel="sitemap"]') ? 'present' : 'missing',
        robots: 'present', // We know robots.txt exists
        canonicals: document.querySelector('link[rel="canonical"]') ? 'present' : 'missing',
        metaRobots: document.querySelector('meta[name="robots"]') ? 'present' : 'missing',
        internalLinks: document.querySelectorAll('a[href^="/"]').length,
        externalLinks: document.querySelectorAll('a[href^="http"]:not([href*="charlesmackaybooks.com"])').length
      };

      // 3. Schema markup audit
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      const schemaAudit = {
        total: schemaScripts.length,
        types: Array.from(schemaScripts).map(script => {
          try {
            const data = JSON.parse(script.textContent || '{}');
            return data['@type'] || 'Unknown';
          } catch {
            return 'Invalid';
          }
        })
      };

      // 4. Image optimization audit
      const images = document.querySelectorAll('img');
      const imageAudit = {
        total: images.length,
        withAlt: Array.from(images).filter(img => img.alt && img.alt.trim()).length,
        withSrc: Array.from(images).filter(img => img.src && img.src.trim()).length,
        lazyLoaded: Array.from(images).filter(img => img.loading === 'lazy').length
      };

      // 5. Mobile optimization audit
      const mobileAudit = {
        viewport: document.querySelector('meta[name="viewport"]') ? 'present' : 'missing',
        touchIcons: document.querySelectorAll('link[rel*="apple-touch-icon"]').length,
        manifestJson: document.querySelector('link[rel="manifest"]') ? 'present' : 'missing'
      };

      // Log audit results for monitoring
      console.log('Technical SEO Audit Results:', {
        crawlability: crawlabilityAudit,
        schema: schemaAudit,
        images: imageAudit,
        mobile: mobileAudit,
        performance: results
      });

      // Send to analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'technical_seo_audit', {
          custom_parameter_1: `schema_types_${schemaAudit.types.length}`,
          custom_parameter_2: `images_with_alt_${imageAudit.withAlt}`,
          custom_parameter_3: `internal_links_${crawlabilityAudit.internalLinks}`
        });
      }
    };

    // Run audit after page load
    if (document.readyState === 'complete') {
      runTechnicalAudit();
    } else {
      window.addEventListener('load', runTechnicalAudit);
    }

    // Add technical SEO meta tags
    const technicalMetas = [
      { name: 'distribution', content: 'global' },
      { name: 'rating', content: 'general' },
      { name: 'coverage', content: 'worldwide' },
      { name: 'target', content: 'all' },
      { name: 'audience', content: 'aviation enthusiasts, historians, researchers, students' },
      { name: 'subject', content: 'aviation history, aircraft development, military aviation, Scottish aviation' },
      { name: 'classification', content: 'education, reference, history' },
      { name: 'language', content: 'en-GB' },
      { name: 'geography', content: 'Scotland, United Kingdom, Worldwide' },
      { name: 'icbm', content: '55.8642, -4.2518' }, // Glasgow coordinates
      { name: 'geo.position', content: '55.8642;-4.2518' },
      { name: 'geo.region', content: 'GB-SCT' },
      { name: 'geo.placename', content: 'Glasgow, Scotland' }
    ];

    technicalMetas.forEach(meta => {
      if (!document.querySelector(`meta[name="${meta.name}"]`)) {
        const metaEl = document.createElement('meta');
        metaEl.name = meta.name;
        metaEl.content = meta.content;
        document.head.appendChild(metaEl);
      }
    });

    return () => {
      window.removeEventListener('load', runTechnicalAudit);
    };
  }, []);

  return null; // No visual output, just technical SEO enhancements
}
