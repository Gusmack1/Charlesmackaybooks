'use client';

import { useEffect } from 'react';

/**
 * Standard reportWebVitals callback - sends Core Web Vitals to Google Analytics.
 * Tracks LCP (Largest Contentful Paint) and other metrics on all key templates:
 * home page, books listing, book detail, blog posts.
 *
 * Runs once per page load from root layout - LCP is automatically measured
 * for the current page (/, /books, /books/[id], /blog/*).
 */
function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating?: string;
}) {
  if (typeof window === 'undefined') return;

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  // GA4 recommended format for Web Vitals
  // CLS: value * 1000 to avoid decimal; others: value in ms
  const value = Math.round(
    metric.name === 'CLS' ? metric.value * 1000 : metric.value
  );

  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value,
    non_interaction: true,
    // Page context for filtering in GA (home, books, book detail, blog)
    page_path: window.location?.pathname || '/',
    metric_rating: metric.rating || 'unknown',
  });
}

export default function WebVitalsReporter() {
  useEffect(() => {
    let cancelled = false;

    async function initWebVitals() {
      try {
        const { onCLS, onFCP, onLCP, onINP, onTTFB } = await import(
          'web-vitals'
        );

        const report = (metric: Parameters<typeof reportWebVitals>[0]) => {
          if (!cancelled) {
            reportWebVitals(metric);
          }
        };

        // Core Web Vitals - LCP is the primary metric for loading experience
        onLCP(report);
        onFCP(report);
        onCLS(report);
        onINP(report);
        onTTFB(report);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[WebVitals] Could not initialize:', err);
        }
      }
    }

    initWebVitals();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
