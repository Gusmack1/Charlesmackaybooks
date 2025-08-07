'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import { 
  generateBookStructuredData, 
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateBreadcrumbStructuredData,
  performanceOptimizations
} from '@/utils/seoOptimizer';
import { Book } from '@/types/book';

interface EnhancedSEOProps {
  pageType: 'homepage' | 'books' | 'book-detail' | 'blog' | 'blog-post' | 'category' | 'page';
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  ogImage?: string;
  book?: Book;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: any;
  preloadResources?: string[];
}

export default function EnhancedSEO({
  pageType,
  title,
  description,
  canonicalUrl,
  keywords = [],
  ogImage,
  book,
  breadcrumbs = [],
  jsonLd,
  preloadResources = []
}: EnhancedSEOProps) {
  
  // Performance monitoring
  useEffect(() => {
    // Core Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor LCP (Largest Contentful Paint)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Track to analytics if needed
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
      } catch (e) {
        // Fallback for older browsers
        console.log('Performance observation not supported');
      }

      return () => observer.disconnect();
    }
  }, []);

  // Generate structured data based on page type
  const getStructuredData = () => {
    const schemas = [];

    // Always include organization and website schemas
    schemas.push(generateOrganizationStructuredData());
    schemas.push(generateWebsiteStructuredData());

    // Add breadcrumbs if available
    if (breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbStructuredData(breadcrumbs));
    }

    // Page-specific schemas
    switch (pageType) {
      case 'book-detail':
        if (book) {
          schemas.push(generateBookStructuredData(book));
        }
        break;
      case 'blog-post':
        if (jsonLd) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Article',
            ...jsonLd
          });
        }
        break;
      case 'books':
      case 'category':
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description: description,
          url: canonicalUrl,
          mainEntity: {
            '@type': 'ItemList',
            name: title,
            description: description
          }
        });
        break;
    }

    return {
      '@context': 'https://schema.org',
      '@graph': schemas
    };
  };

  const structuredData = getStructuredData();
  const criticalCSS = performanceOptimizations.getCriticalCSS();

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Viewport and Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph */}
        <meta property="og:type" content={pageType === 'blog-post' ? 'article' : 'website'} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Charles Mackay Books" />
        <meta property="og:locale" content="en_GB" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:alt" content={title} />}
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CharlesMackayBooks" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Apple Touch Icon and Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Charles Mackay Books" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload Critical Resources */}
        {preloadResources.map((resource, index) => (
          <link key={index} rel="preload" href={resource} as="image" />
        ))}
        
        {/* Critical CSS Inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Book-specific meta tags */}
        {book && (
          <>
            <meta property="book:author" content={book.author} />
            <meta property="book:isbn" content={book.isbn} />
            <meta property="product:price:amount" content={book.price.toString()} />
            <meta property="product:price:currency" content="GBP" />
            <meta property="product:availability" content={book.inStock ? 'in stock' : 'out of stock'} />
            <meta property="product:condition" content="new" />
            <meta property="product:weight" content={`${book.weight || 300}g`} />
          </>
        )}
        
        {/* Robots and Search Engine Directives */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Performance Hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      {/* Performance Monitoring Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals monitoring
            (function() {
              if ('web-vital' in window) return;
              
              window.webVitalCallbacks = window.webVitalCallbacks || [];
              
              function vitalsCallback(metric) {
                // Log to console in development
                if (process.env.NODE_ENV === 'development') {
                  console.log('Web Vital:', metric);
                }
                
                // Send to analytics (implement your preferred analytics)
                if (window.gtag) {
                  window.gtag('event', metric.name, {
                    custom_parameter_1: metric.value,
                    custom_parameter_2: metric.id,
                    custom_parameter_3: metric.delta
                  });
                }
              }
              
              // Load Web Vitals library if available
              if (window.webVitals) {
                window.webVitals.getLCP(vitalsCallback);
                window.webVitals.getFID(vitalsCallback);
                window.webVitals.getCLS(vitalsCallback);
                window.webVitals.getFCP(vitalsCallback);
                window.webVitals.getTTFB(vitalsCallback);
              }
            })();
          `
        }}
      />
    </>
  );
}

// Higher-order component for easy SEO integration
export function withEnhancedSEO<P extends object>(
  Component: React.ComponentType<P>,
  seoProps: Omit<EnhancedSEOProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <>
        <EnhancedSEO {...seoProps} />
        <Component {...props} />
      </>
    );
  };
}