import React, { useState, useCallback, useEffect, useRef } from 'react';

// Image Optimization Utilities
// Implements the "Image Optimization Automation Prompt" requirements

export interface ImageOptimizationConfig {
  // Format settings
  formats: ('webp' | 'avif' | 'jpeg' | 'png')[];
  quality: {
    webp: number;
    avif: number;
    jpeg: number;
    png: number;
  };
  
  // Responsive sizes
  sizes: {
    mobile: number[];
    tablet: number[];
    desktop: number[];
  };
  
  // Performance settings
  lazyLoading: boolean;
  preloadCritical: boolean;
  placeholderStrategy: 'blur' | 'color' | 'lqip';
  
  // CDN settings
  cdnUrl?: string;
  cdnOptimization: boolean;
}

export interface OptimizedImageData {
  src: string;
  srcSet: string;
  sizes: string;
  formats: {
    webp?: string;
    avif?: string;
    jpeg?: string;
    png?: string;
  };
  placeholder?: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
}

export interface ImageMetadata {
  filename: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  formats: string[];
  dimensions: {
    width: number;
    height: number;
  };
  exif?: {
    camera?: string;
    date?: string;
    location?: string;
  };
}

// Default configuration
export const defaultImageConfig: ImageOptimizationConfig = {
  formats: ['webp', 'avif', 'jpeg'],
  quality: {
    webp: 85,
    avif: 80,
    jpeg: 85,
    png: 90
  },
  sizes: {
    mobile: [320, 480, 640],
    tablet: [768, 1024],
    desktop: [1200, 1600, 1920]
  },
  lazyLoading: true,
  preloadCritical: true,
  placeholderStrategy: 'blur',
  cdnOptimization: true
};

// Image optimization class
export class ImageOptimizer {
  private config: ImageOptimizationConfig;
  private cache: Map<string, OptimizedImageData> = new Map();

  constructor(config: Partial<ImageOptimizationConfig> = {}) {
    this.config = { ...defaultImageConfig, ...config };
  }

  // Generate optimized image data
  async optimizeImage(
    originalSrc: string,
    alt: string,
    options: {
      width?: number;
      height?: number;
      priority?: boolean;
      sizes?: string;
    } = {}
  ): Promise<OptimizedImageData> {
    const cacheKey = `${originalSrc}-${JSON.stringify(options)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const {
      width,
      height,
      priority = false,
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    } = options;

    // Generate responsive sizes
    const responsiveSizes = this.generateResponsiveSizes(width);
    
    // Generate srcset for each format
    const srcSets = await this.generateSrcSets(originalSrc, responsiveSizes);
    
    // Generate placeholder
    const placeholder = await this.generatePlaceholder(originalSrc);
    
    // Calculate aspect ratio
    const aspectRatio = height && width ? height / width : 16 / 9;

    const optimizedData: OptimizedImageData = {
      src: this.getOptimizedUrl(originalSrc, width || 800),
      srcSet: srcSets.webp || srcSets.jpeg,
      sizes,
      formats: srcSets,
      placeholder,
      alt,
      width: width || 800,
      height: height || Math.round((width || 800) * aspectRatio),
      aspectRatio
    };

    this.cache.set(cacheKey, optimizedData);
    return optimizedData;
  }

  // Generate responsive sizes based on configuration
  private generateResponsiveSizes(baseWidth?: number): number[] {
    const { sizes } = this.config;
    const allSizes = [
      ...sizes.mobile,
      ...sizes.tablet,
      ...sizes.desktop
    ];

    if (baseWidth) {
      return allSizes.filter(size => size <= baseWidth * 2);
    }

    return allSizes;
  }

  // Generate srcset for multiple formats
  private async generateSrcSets(
    originalSrc: string,
    sizes: number[]
  ): Promise<Record<string, string>> {
    const srcSets: Record<string, string> = {};

    for (const format of this.config.formats) {
      const srcSetParts = await Promise.all(
        sizes.map(async (size) => {
          const url = this.getOptimizedUrl(originalSrc, size, format);
          return `${url} ${size}w`;
        })
      );
      srcSets[format] = srcSetParts.join(', ');
    }

    return srcSets;
  }

  // Generate optimized URL
  private getOptimizedUrl(
    originalSrc: string,
    width: number,
    format?: string
  ): string {
    if (this.config.cdnOptimization && this.config.cdnUrl) {
      // CDN optimization
      const params = new URLSearchParams({
        url: originalSrc,
        w: width.toString(),
        q: this.config.quality[format as keyof typeof this.config.quality]?.toString() || '85',
        fmt: format || 'auto'
      });
      
      return `${this.config.cdnUrl}?${params.toString()}`;
    }

    // Local optimization (for development)
    const extension = format || 'webp';
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    return `${baseName}-${width}w.${extension}`;
  }

  // Generate placeholder image
  private async generatePlaceholder(originalSrc: string): Promise<string | undefined> {
    if (this.config.placeholderStrategy === 'blur') {
      // Generate a tiny, blurred version
      return this.getOptimizedUrl(originalSrc, 20, 'jpeg');
    }
    
    if (this.config.placeholderStrategy === 'color') {
      // Extract dominant color (simplified)
      return '#f3f4f6';
    }
    
    if (this.config.placeholderStrategy === 'lqip') {
      // Low Quality Image Placeholder
      return this.getOptimizedUrl(originalSrc, 40, 'jpeg');
    }

    return undefined;
  }

  // Batch optimize multiple images
  async optimizeImages(
    images: Array<{
      src: string;
      alt: string;
      width?: number;
      height?: number;
      priority?: boolean;
    }>
  ): Promise<OptimizedImageData[]> {
    const promises = images.map(img => 
      this.optimizeImage(img.src, img.alt, {
        width: img.width,
        height: img.height,
        priority: img.priority
      })
    );

    return Promise.all(promises);
  }

  // Generate image metadata
  async getImageMetadata(imagePath: string): Promise<ImageMetadata> {
    // This would typically use a library like 'sharp' or similar
    // For now, we'll return a mock implementation
    return {
      filename: imagePath.split('/').pop() || '',
      originalSize: 0,
      optimizedSize: 0,
      compressionRatio: 0,
      formats: this.config.formats,
      dimensions: {
        width: 0,
        height: 0
      }
    };
  }

  // Preload critical images
  preloadImages(images: OptimizedImageData[]): void {
    if (!this.config.preloadCritical) return;

    images.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image.src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });
  }

  // Generate resource hints
  generateResourceHints(images: OptimizedImageData[]): string[] {
    const hints: string[] = [];

    // DNS prefetch for CDN
    if (this.config.cdnUrl) {
      const cdnDomain = new URL(this.config.cdnUrl).hostname;
      hints.push(`<link rel="dns-prefetch" href="//${cdnDomain}">`);
    }

    // Preload critical images
    if (this.config.preloadCritical) {
      images.forEach(image => {
        hints.push(`<link rel="preload" as="image" href="${image.src}">`);
      });
    }

    return hints;
  }
}

// React hook for image optimization
export function useImageOptimization(config?: Partial<ImageOptimizationConfig>) {
  const [optimizer] = useState(() => new ImageOptimizer(config));
  const [optimizedImages, setOptimizedImages] = useState<Map<string, OptimizedImageData>>(new Map());

  const optimizeImage = useCallback(async (
    src: string,
    alt: string,
    options?: {
      width?: number;
      height?: number;
      priority?: boolean;
      sizes?: string;
    }
  ) => {
    const cacheKey = `${src}-${JSON.stringify(options)}`;
    
    if (optimizedImages.has(cacheKey)) {
      return optimizedImages.get(cacheKey)!;
    }

    const optimized = await optimizer.optimizeImage(src, alt, options);
    setOptimizedImages(prev => new Map(prev).set(cacheKey, optimized));
    
    return optimized;
  }, [optimizer, optimizedImages]);

  return { optimizeImage, optimizer };
}

// Utility functions for image processing

// Generate alt text using AI (placeholder)
export async function generateAltText(imagePath: string): Promise<string> {
  // This would integrate with an AI service like OpenAI or similar
  // For now, return a basic description
  const filename = imagePath.split('/').pop() || '';
  return `Image: ${filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '')}`;
}

// Validate image format and size
export function validateImage(file: File): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  if (file.size > maxSize) {
    errors.push('Image size must be less than 10MB');
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Image must be JPEG, PNG, WebP, or AVIF format');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Generate responsive image sizes
export function generateResponsiveSizes(
  originalWidth: number,
  breakpoints: number[] = [320, 480, 768, 1024, 1200, 1600]
): number[] {
  return breakpoints.filter(size => size <= originalWidth * 2);
}

// Calculate optimal image dimensions
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = Math.min(originalWidth, maxWidth);
  let height = width / aspectRatio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

// Generate image schema markup
export function generateImageSchema(
  imageData: OptimizedImageData,
  context: 'book' | 'blog' | 'author' = 'book'
): any {
  const schema: any = {
    '@type': 'ImageObject',
    url: imageData.src,
    width: imageData.width,
    height: imageData.height,
    alt: imageData.alt
  };

  if (imageData.formats.webp) {
    schema.encodingFormat = 'image/webp';
  }

  if (context === 'book') {
    schema.contentUrl = imageData.src;
    schema.thumbnailUrl = imageData.placeholder;
  }

  return schema;
}

// Image lazy loading utility
export function useLazyImage(
  src: string,
  options: {
    threshold?: number;
    rootMargin?: string;
  } = {}
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  useEffect(() => {
    if (isInView && imgRef.current) {
      const img = imgRef.current;
      
      const handleLoad = () => setIsLoaded(true);
      const handleError = () => console.error('Failed to load image:', src);
      
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      
      img.src = src;
      
      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    }
  }, [isInView, src]);

  return { imgRef, isLoaded, isInView };
}

// Export default optimizer instance
export const imageOptimizer = new ImageOptimizer();
