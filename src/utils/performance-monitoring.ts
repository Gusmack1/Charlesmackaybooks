// Performance monitoring utility for Core Web Vitals

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, WebVitalMetric> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private async initializeMonitoring() {
    try {
      // Dynamically import web-vitals (v5 uses on* API)
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals/attribution');
      
      // Monitor Core Web Vitals
      onCLS(this.handleMetric.bind(this));
      onINP(this.handleMetric.bind(this));
      onFCP(this.handleMetric.bind(this));
      onLCP(this.handleMetric.bind(this));
      onTTFB(this.handleMetric.bind(this));

      console.log('✅ Performance monitoring initialized');
    } catch (error) {
      console.warn('⚠️ Could not initialize performance monitoring:', error);
    }
  }

  private handleMetric(metric: WebVitalMetric) {
    console.log('📊 Core Web Vital:', metric.name, metric.value);
    
    // Store the metric
    this.metrics.set(metric.name, metric);

    // Send to analytics if available
    this.sendToAnalytics(metric);

    // Check if metric exceeds thresholds
    this.checkThresholds(metric);
  }

  private sendToAnalytics(metric: WebVitalMetric) {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Send to other analytics services here
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'web_vital',
        metric_name: metric.name,
        metric_value: metric.value,
        metric_id: metric.id
      });
    }
  }

  private checkThresholds(metric: WebVitalMetric) {
    const thresholds = {
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FID: { good: 100, needsImprovement: 300 },
      LCP: { good: 2500, needsImprovement: 4000 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 }
    };

    const threshold = thresholds[metric.name as keyof typeof thresholds];
    if (!threshold) return;

    let status = 'poor';
    if (metric.value <= threshold.good) {
      status = 'good';
    } else if (metric.value <= threshold.needsImprovement) {
      status = 'needs-improvement';
    }

    console.log(`📈 ${metric.name} status: ${status} (${metric.value})`);

    // Log warnings for poor metrics
    if (status === 'poor') {
      console.warn(`⚠️ Poor ${metric.name} performance: ${metric.value}`);
    }
  }

  public getMetrics(): Map<string, WebVitalMetric> {
    return new Map(this.metrics);
  }

  public getMetric(name: string): WebVitalMetric | undefined {
    return this.metrics.get(name);
  }

  public getPerformanceScore(): number {
    const metrics = Array.from(this.metrics.values());
    if (metrics.length === 0) return 0;

    const scores = metrics.map(metric => {
      const thresholds = {
        CLS: { good: 0.1, needsImprovement: 0.25 },
        FID: { good: 100, needsImprovement: 300 },
        LCP: { good: 2500, needsImprovement: 4000 },
        FCP: { good: 1800, needsImprovement: 3000 },
        TTFB: { good: 800, needsImprovement: 1800 }
      };

      const threshold = thresholds[metric.name as keyof typeof thresholds];
      if (!threshold) return 50;

      if (metric.value <= threshold.good) return 100;
      if (metric.value <= threshold.needsImprovement) return 75;
      return 25;
    });

    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }
}

// Initialize performance monitoring
export const performanceMonitor = PerformanceMonitor.getInstance();

// Performance monitoring for React components
export function usePerformanceMonitoring() {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    getMetrics: () => monitor.getMetrics(),
    getMetric: (name: string) => monitor.getMetric(name),
    getPerformanceScore: () => monitor.getPerformanceScore()
  };
}

// Performance improvement suggestions
export function getPerformanceRecommendations(metrics: Map<string, WebVitalMetric>): string[] {
  const recommendations: string[] = [];

  metrics.forEach((metric) => {
    switch (metric.name) {
      case 'LCP':
        if (metric.value > 2500) {
          recommendations.push('Optimize Largest Contentful Paint by optimizing images and fonts');
        }
        break;
      case 'FID':
        if (metric.value > 100) {
          recommendations.push('Improve First Input Delay by reducing JavaScript execution time');
        }
        break;
      case 'CLS':
        if (metric.value > 0.1) {
          recommendations.push('Fix Cumulative Layout Shift by setting proper image dimensions');
        }
        break;
      case 'FCP':
        if (metric.value > 1800) {
          recommendations.push('Improve First Contentful Paint by optimizing critical rendering path');
        }
        break;
      case 'TTFB':
        if (metric.value > 800) {
          recommendations.push('Reduce Time to First Byte by optimizing server response time');
        }
        break;
    }
  });

  return recommendations;
}