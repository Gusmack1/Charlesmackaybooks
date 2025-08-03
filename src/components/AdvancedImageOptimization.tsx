'use client';

import { useState, useEffect, useRef } from 'react';
import { Image, Loader2, AlertCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  // Handle image load events
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Generate optimized image URL with Netlify Image CDN
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }
    
    // Use Netlify Image CDN for optimization
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesmackaybooks.com';
    return `${baseUrl}/.netlify/images?url=${encodeURIComponent(originalSrc)}&w=${width}&h=${height}&fit=cover&fm=webp`;
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}>
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Optimized image */}
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source
            type="image/avif"
            srcSet={generateSrcSet(getOptimizedSrc(src) + '&fm=avif')}
            sizes={sizes}
          />
          
          {/* WebP format for broader support */}
          <source
            type="image/webp"
            srcSet={generateSrcSet(getOptimizedSrc(src) + '&fm=webp')}
            sizes={sizes}
          />
          
          {/* Fallback JPEG/PNG */}
          <img
            ref={imgRef}
            src={getOptimizedSrc(src)}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            sizes={sizes}
          />
        </picture>
      )}

      {/* Placeholder for lazy loading */}
      {!isInView && !priority && (
        <img
          src={placeholder}
          alt=""
          width={width}
          height={height}
          className="w-full h-auto"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// Image optimization utilities
export const imageOptimizationUtils = {
  // Generate blur placeholder
  generateBlurPlaceholder: (src: string) => {
    // In a real implementation, this would generate a base64 blur placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYmx1cikiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
  },

  // Preload critical images
  preloadImage: (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  },

  // Generate responsive image sizes
  getResponsiveSizes: (containerWidth: number) => {
    if (containerWidth <= 768) return '100vw';
    if (containerWidth <= 1200) return '50vw';
    return '33vw';
  }
}; 