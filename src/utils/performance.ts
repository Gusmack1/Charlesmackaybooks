declare const gtag: (...args: any[]) => void;
// Performance optimization utilities for Charles Mackay Books website

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical above-the-fold styles */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #333;
  }
  
  .hero-section {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e7eb;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e3a8a;
    text-decoration: none;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-links a {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .nav-links a:hover {
    color: #3b82f6;
  }
  
  /* Mobile responsive critical styles */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .mobile-menu-toggle {
      display: block;
    }
  }
`;

// Resource hints for performance optimization
export const resourceHints = {
  // Preload critical resources
  preload: [
    {
      href: '/fonts/georgia.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      href: '/api/books',
      as: 'fetch',
      crossOrigin: 'anonymous',
    },
  ],
  
  // Prefetch likely next pages
  prefetch: [
    '/books',
    '/blog',
    '/about',
    '/contact',
  ],
  
  // DNS prefetch for external domains
  dnsPrefetch: [
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net',
  ],
};

// Code splitting configuration
export const codeSplittingConfig = {
  // Dynamic imports for non-critical components
  dynamicImports: {
    'BlogPostTemplate': () => import('../components/BlogPostTemplate'),
    'OptimizedImage': () => import('../components/OptimizedImage'),
    'SocialShare': () => import('../components/SocialShare'),
  },
  
  // Lazy load thresholds
  lazyLoadThresholds: {
    images: 50, // pixels before viewport
    components: 100, // pixels before viewport
    scripts: 200, // pixels before viewport
  },
};

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  // Measure Core Web Vitals
  measureCoreWebVitals() {
    if (typeof window === 'undefined') return;
    
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const input = entry as any;
        const fid = (input.processingStart ?? input.startTime ?? 0) - (input.startTime ?? 0);
        this.metrics.set('FID', fid);
        this.reportMetric('FID', fid);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.set('CLS', clsValue);
      this.reportMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  // Report metrics to analytics
  private reportMetric(name: string, value: number) {
    // Send to Google Analytics or other analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: Math.round(value),
        metric_id: name,
        metric_value: value,
        metric_delta: 0,
      });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}: ${value}`);
    }
  }
  
  // Get current metrics
  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }
  
  // Check if metrics meet targets
  checkTargets(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    const targets = {
      LCP: 2500, // 2.5 seconds
      FID: 100,  // 100 milliseconds
      CLS: 0.1,  // 0.1
    };
    
    for (const [metric, target] of Object.entries(targets)) {
      const value = this.metrics.get(metric);
      if (value && value > target) {
        issues.push(`${metric}: ${value}ms (target: ${target}ms)`);
      }
    }
    
    return {
      passed: issues.length === 0,
      issues,
    };
  }
}

// Service Worker registration for offline capability
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

// Image optimization utilities
export const imageOptimization = {
  // Generate optimized image URLs
  getOptimizedUrl: (src: string, width: number, format: 'webp' | 'avif' | 'jpeg' = 'webp', quality: number = 85) => {
    // Use Next.js Image optimization or external service
    if (src.startsWith('/')) {
      return `${src}?w=${width}&f=${format}&q=${quality}`;
    }
    return src;
  },
  
  // Generate srcset for responsive images
  generateSrcSet: (src: string, sizes: number[] = [400, 800, 1200, 1600], format: 'webp' | 'avif' | 'jpeg' = 'webp') => {
    return sizes
      .map(size => `${imageOptimization.getOptimizedUrl(src, size, format)} ${size}w`)
      .join(', ');
  },
  
  // Check if browser supports modern formats
  supportsFormat: (format: 'webp' | 'avif') => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    if (format === 'webp') {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    if (format === 'avif') {
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    }
    
    return false;
  },
};

// Cache management utilities
export const cacheManagement = {
  // Clear old caches
  clearOldCaches: async () => {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return;
    }
    
    const cacheNames = await caches.keys();
    const currentCacheVersion = 'v1.0.0';
    
    for (const cacheName of cacheNames) {
      if (cacheName !== currentCacheVersion) {
        await caches.delete(cacheName);
      }
    }
  },
  
  // Precache critical resources
  precacheCriticalResources: async () => {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return;
    }
    
    const criticalResources = [
      '/',
      '/books',
      '/blog',
      '/about',
      '/styles/critical.css',
    ];
    
    const cache = await caches.open('critical-resources');
    await cache.addAll(criticalResources);
  },
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Start performance monitoring
  PerformanceMonitor.getInstance().measureCoreWebVitals();
  
  // Register service worker
  registerServiceWorker();
  
  // Clear old caches
  cacheManagement.clearOldCaches();
  
  // Precache critical resources
  cacheManagement.precacheCriticalResources();
}; 