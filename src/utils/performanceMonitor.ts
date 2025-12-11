declare const gtag: (...args: any[]) => void;
/**
 * Performance Monitor - Core Web Vitals Optimization
 * Based on Charles Mackay Books Website Analysis Report - Prompt 5
 */

interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: any[];
}

interface PerformanceConfig {
  enableLogging: boolean;
  enableAnalytics: boolean;
  thresholds: {
    LCP: number; // Largest Contentful Paint
    FID: number; // First Input Delay
    CLS: number; // Cumulative Layout Shift
    FCP: number; // First Contentful Paint
    TTFB: number; // Time to First Byte
    INP: number; // Interaction to Next Paint
  };
}

const defaultConfig: PerformanceConfig = {
  enableLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
  thresholds: {
    LCP: 2500,  // Good: ≤2.5s
    FID: 100,   // Good: ≤100ms
    CLS: 0.1,   // Good: ≤0.1
    FCP: 1800,  // Good: ≤1.8s
    TTFB: 800,  // Good: ≤800ms
    INP: 200    // Good: ≤200ms
  }
};

class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Initialize performance monitoring
    this.initCoreWebVitals();
    this.initResourceTiming();
    this.initNavigationTiming();
    this.initCustomMetrics();
  }

  private initCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observePerformance(['largest-contentful-paint'], (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.recordMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        delta: 0,
        id: this.generateId(),
        entries: [lastEntry]
      });
    });

    // First Input Delay (FID) - use polyfill for better support
    this.observePerformance(['first-input'], (entries) => {
      const firstEntry = entries[0];
      this.recordMetric({
        name: 'FID',
        value: firstEntry.processingStart - firstEntry.startTime,
        delta: 0,
        id: this.generateId(),
        entries: [firstEntry]
      });
    });

    // Cumulative Layout Shift (CLS)
    this.observePerformance(['layout-shift'], (entries) => {
      let clsValue = 0;
      for (const entry of entries) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.recordMetric({
        name: 'CLS',
        value: clsValue,
        delta: 0,
        id: this.generateId(),
        entries
      });
    });

    // First Contentful Paint (FCP)
    this.observePerformance(['paint'], (entries) => {
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.recordMetric({
          name: 'FCP',
          value: fcpEntry.startTime,
          delta: 0,
          id: this.generateId(),
          entries: [fcpEntry]
        });
      }
    });
  }

  private initResourceTiming() {
    this.observePerformance(['resource'], (entries) => {
      entries.forEach((entry: any) => {
        // Monitor critical resources
        if (this.isCriticalResource(entry.name)) {
          this.recordMetric({
            name: `RESOURCE_${this.getResourceType(entry.name)}`,
            value: entry.duration,
            delta: 0,
            id: this.generateId(),
            entries: [entry]
          });
        }
      });
    });
  }

  private initNavigationTiming() {
    this.observePerformance(['navigation'], (entries) => {
      const entry = entries[0] as any;
      
      // Time to First Byte (TTFB)
      const ttfb = entry.responseStart - entry.requestStart;
      this.recordMetric({
        name: 'TTFB',
        value: ttfb,
        delta: 0,
        id: this.generateId(),
        entries: [entry]
      });

      // DOM Content Loaded
      const dcl = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
      this.recordMetric({
        name: 'DCL',
        value: dcl,
        delta: 0,
        id: this.generateId(),
        entries: [entry]
      });

      // Page Load Complete
      const loadComplete = entry.loadEventEnd - entry.loadEventStart;
      this.recordMetric({
        name: 'LOAD',
        value: loadComplete,
        delta: 0,
        id: this.generateId(),
        entries: [entry]
      });
    });
  }

  private initCustomMetrics() {
    // Monitor critical user interactions
    this.monitorInteractionToNextPaint();
    this.monitorShippingCalculatorPerformance();
    this.monitorImageLoadingPerformance();
  }

  private monitorInteractionToNextPaint() {
    let interactionStart = 0;
    
    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionStart = performance.now();
        
        // Use requestIdleCallback or setTimeout to measure to next paint
        requestAnimationFrame(() => {
          const inp = performance.now() - interactionStart;
          this.recordMetric({
            name: 'INP',
            value: inp,
            delta: 0,
            id: this.generateId(),
            entries: []
          });
        });
      }, { passive: true });
    });
  }

  private monitorShippingCalculatorPerformance() {
    // Monitor shipping calculation response times
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      const response = await originalFetch.apply(window, args);
      const duration = performance.now() - start;
      
      if (args[0] && args[0].toString().includes('shipping')) {
        this.recordMetric({
          name: 'SHIPPING_API',
          value: duration,
          delta: 0,
          id: this.generateId(),
          entries: []
        });
      }
      
      return response;
    };
  }

  private monitorImageLoadingPerformance() {
    // Monitor image loading times, especially book covers
    const imageObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const images = element.tagName === 'IMG' ? [element] : element.querySelectorAll('img');
            
            images.forEach((img) => {
              const start = performance.now();
              img.addEventListener('load', () => {
                const duration = performance.now() - start;
                this.recordMetric({
                  name: 'IMAGE_LOAD',
                  value: duration,
                  delta: 0,
                  id: this.generateId(),
                  entries: []
                });
              });
            });
          }
        });
      });
    });

    imageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private observePerformance(entryTypes: string[], callback: (entries: any[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ entryTypes });
      this.observers.push(observer);
    } catch (e) {
      if (this.config.enableLogging) {
        console.warn(`Performance observer not supported for: ${entryTypes.join(', ')}`);
      }
    }
  }

  private recordMetric(metric: PerformanceMetric) {
    this.metrics.set(metric.name, metric);
    
    if (this.config.enableLogging) {
      this.logMetric(metric);
    }
    
    if (this.config.enableAnalytics) {
      this.sendToAnalytics(metric);
    }
    
    this.checkThresholds(metric);
  }

  private logMetric(metric: PerformanceMetric) {
    const threshold = this.config.thresholds[metric.name as keyof typeof this.config.thresholds];
    const status = threshold && metric.value > threshold ? '⚠️' : '✅';
    
    console.log(`${status} ${metric.name}: ${metric.value.toFixed(2)}ms`, {
      threshold: threshold ? `${threshold}ms` : 'N/A',
      status: threshold && metric.value > threshold ? 'SLOW' : 'GOOD',
      metric
    });
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        custom_map: {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_id: metric.id
        }
      });
    }

    // Send to custom analytics endpoint
    if (window.navigator.sendBeacon) {
      const data = JSON.stringify({
        metric: metric.name,
        value: metric.value,
        timestamp: Date.now(),
        page: window.location.pathname,
        userAgent: navigator.userAgent
      });
      
      window.navigator.sendBeacon('/api/analytics/performance', data);
    }
  }

  private checkThresholds(metric: PerformanceMetric) {
    const threshold = this.config.thresholds[metric.name as keyof typeof this.config.thresholds];
    
    if (threshold && metric.value > threshold) {
      this.handleSlowMetric(metric, threshold);
    }
  }

  private handleSlowMetric(metric: PerformanceMetric, threshold: number) {
    // Log warning
    console.warn(`Performance threshold exceeded for ${metric.name}:`, {
      value: metric.value,
      threshold,
      exceedsBy: metric.value - threshold
    });

    // Trigger optimization suggestions
    this.suggestOptimizations(metric.name);
  }

  private suggestOptimizations(metricName: string) {
    const suggestions = {
      LCP: [
        'Optimize hero images',
        'Preload critical resources',
        'Minimize render-blocking CSS',
        'Use a CDN for static assets'
      ],
      FID: [
        'Optimize JavaScript execution',
        'Use code splitting',
        'Defer non-critical JavaScript',
        'Minimize main thread work'
      ],
      CLS: [
        'Set image dimensions',
        'Avoid dynamic content insertion',
        'Use CSS aspect-ratio',
        'Preload fonts'
      ],
      TTFB: [
        'Optimize server response time',
        'Use edge caching',
        'Minimize database queries',
        'Implement proper caching headers'
      ]
    };

    const metricSuggestions = suggestions[metricName as keyof typeof suggestions];
    if (metricSuggestions && this.config.enableLogging) {
      console.group(`💡 Optimization suggestions for ${metricName}:`);
      metricSuggestions.forEach(suggestion => console.log(`• ${suggestion}`));
      console.groupEnd();
    }
  }

  private isCriticalResource(url: string): boolean {
    const criticalPatterns = [
      '/book-covers/',
      '/fonts/',
      'globals.css',
      'mobile-first-responsive.css',
      'shipping-visibility-fix.css'
    ];
    
    return criticalPatterns.some(pattern => url.includes(pattern));
  }

  private getResourceType(url: string): string {
    if (url.includes('.css')) return 'CSS';
    if (url.includes('.js')) return 'JS';
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) return 'IMAGE';
    if (url.includes('.woff') || url.includes('.ttf')) return 'FONT';
    return 'OTHER';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public methods
  public getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  public getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.get(name);
  }

  public exportReport(): object {
    const report = {
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      metrics: Object.fromEntries(this.metrics),
      thresholds: this.config.thresholds,
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    this.metrics.forEach((metric, name) => {
      const threshold = this.config.thresholds[name as keyof typeof this.config.thresholds];
      if (threshold && metric.value > threshold) {
        recommendations.push(`Optimize ${name}: Currently ${metric.value.toFixed(2)}ms, target <${threshold}ms`);
      }
    });

    return recommendations;
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export class for custom instances
export { PerformanceMonitor };

// Utility functions
export const optimizeImages = {
  createWebPSources: (imageSrc: string) => {
    const webpSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const avifSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    
    return {
      avif: avifSrc,
      webp: webpSrc,
      fallback: imageSrc
    };
  },

  generateSrcSet: (imageSrc: string, sizes: number[]) => {
    return sizes.map(size => {
      const extension = imageSrc.split('.').pop();
      const baseName = imageSrc.replace(`.${extension}`, '');
      return `${baseName}-${size}w.${extension} ${size}w`;
    }).join(', ');
  }
};

export const coreWebVitalsHelpers = {
  preloadCriticalResources: (resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.includes('.css')) link.as = 'style';
      else if (resource.includes('.js')) link.as = 'script';
      else if (resource.includes('.woff')) link.as = 'font';
      else link.as = 'image';
      
      document.head.appendChild(link);
    });
  },

  deferNonCriticalCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = function() {
      (this as any).rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }
};