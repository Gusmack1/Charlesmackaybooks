'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fcp: number | null;
  fmp: number | null;
}

interface PerformanceMonitorProps {
  showMetrics?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export default function PerformanceMonitor({
  showMetrics = false,
  onMetricsUpdate
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
    fmp: null
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  // Core Web Vitals thresholds
  const thresholds = {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 }
  };

  // Get performance rating
  const getRating = (metric: keyof typeof thresholds, value: number) => {
    if (value <= thresholds[metric].good) return 'good';
    if (value <= thresholds[metric].needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  // Get rating color
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Monitor Core Web Vitals
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const newMetrics = { ...metrics };

        switch (entry.entryType) {
          case 'largest-contentful-paint':
            newMetrics.lcp = entry.startTime;
            break;
          case 'first-input':
            newMetrics.fid = entry.processingStart - entry.startTime;
            break;
          case 'layout-shift':
            newMetrics.cls = (newMetrics.cls || 0) + (entry as any).value;
            break;
          case 'navigation':
            newMetrics.ttfb = (entry as any).responseStart - (entry as any).requestStart;
            break;
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              newMetrics.fcp = entry.startTime;
            }
            break;
        }

        setMetrics(newMetrics);
        onMetricsUpdate?.(newMetrics);
      }
    });

    // Observe different performance entry types
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'navigation', 'paint'] });

    setIsMonitoring(true);

    return () => observer.disconnect();
  }, [metrics, onMetricsUpdate]);

  // Performance optimization utilities
  const performanceUtils = {
    // Preload critical resources
    preloadResource: (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    },

    // Preconnect to external domains
    preconnect: (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    },

    // DNS prefetch
    dnsPrefetch: (href: string) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    },

    // Optimize images
    optimizeImages: () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    },

    // Defer non-critical JavaScript
    deferScripts: () => {
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        script.setAttribute('defer', '');
      });
    }
  };

  // Initialize performance optimizations
  useEffect(() => {
    // Preconnect to external domains
    performanceUtils.preconnect('https://fonts.googleapis.com');
    performanceUtils.preconnect('https://fonts.gstatic.com');
    performanceUtils.dnsPrefetch('https://www.google-analytics.com');

    // Optimize images
    performanceUtils.optimizeImages();

    // Defer non-critical scripts
    performanceUtils.deferScripts();
  }, []);

  if (!showMetrics) {
    return null;
  }

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Performance Metrics
        </h3>
        <div className={`flex items-center text-sm ${
          isMonitoring ? 'text-green-600' : 'text-gray-500'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isMonitoring ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          {isMonitoring ? 'Monitoring' : 'Initializing'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* LCP */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">LCP</span>
            <Zap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">
            {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '--'}
          </div>
          {metrics.lcp && (
            <div className={`text-sm ${getRatingColor(getRating('lcp', metrics.lcp))}`}>
              {getRating('lcp', metrics.lcp).replace('-', ' ')}
            </div>
          )}
        </div>

        {/* FID */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">FID</span>
            <Clock className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">
            {metrics.fid ? `${Math.round(metrics.fid)}ms` : '--'}
          </div>
          {metrics.fid && (
            <div className={`text-sm ${getRatingColor(getRating('fid', metrics.fid))}`}>
              {getRating('fid', metrics.fid).replace('-', ' ')}
            </div>
          )}
        </div>

        {/* CLS */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">CLS</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">
            {metrics.cls ? metrics.cls.toFixed(3) : '--'}
          </div>
          {metrics.cls && (
            <div className={`text-sm ${getRatingColor(getRating('cls', metrics.cls))}`}>
              {getRating('cls', metrics.cls).replace('-', ' ')}
            </div>
          )}
        </div>

        {/* TTFB */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">TTFB</span>
            <Activity className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">
            {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '--'}
          </div>
          <div className="text-sm text-gray-500">
            Time to First Byte
          </div>
        </div>

        {/* FCP */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">FCP</span>
            <Zap className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold">
            {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '--'}
          </div>
          <div className="text-sm text-gray-500">
            First Contentful Paint
          </div>
        </div>

        {/* Overall Score */}
        <div className="border rounded-lg p-3 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall</span>
            <AlertTriangle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {(() => {
              const scores = [];
              if (metrics.lcp) scores.push(getRating('lcp', metrics.lcp) === 'good' ? 100 : 50);
              if (metrics.fid) scores.push(getRating('fid', metrics.fid) === 'good' ? 100 : 50);
              if (metrics.cls) scores.push(getRating('cls', metrics.cls) === 'good' ? 100 : 50);
              return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : '--';
            })()}
          </div>
          <div className="text-sm text-blue-600">
            Performance Score
          </div>
        </div>
      </div>
    </div>
  );
} 