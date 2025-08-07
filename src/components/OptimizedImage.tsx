'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { optimizeImages } from '@/utils/performanceMonitor';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  responsive?: boolean;
  breakpoints?: number[];
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  responsive = true,
  breakpoints = [400, 800, 1200]
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSources, setImageSources] = useState<{
    avif: string;
    webp: string;
    fallback: string;
  }>();

  useEffect(() => {
    // Generate optimized image sources
    const sources = optimizeImages.createWebPSources(src);
    setImageSources(sources);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
    
    // Track image loading performance
    if (typeof window !== 'undefined' && window.performance) {
      const loadTime = performance.now();
      console.log(`Image loaded: ${src} (${loadTime.toFixed(2)}ms)`);
    }
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
    console.warn(`Failed to load image: ${src}`);
  };

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (width: number = 8, height: number = 8) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient as placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || 
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  if (hasError) {
    // Error fallback
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || 'auto' }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  // Modern responsive image with multiple formats
  if (responsive && imageSources) {
    return (
      <picture className={`block ${className}`}>
        {/* AVIF format for modern browsers */}
        <source
          srcSet={optimizeImages.generateSrcSet(imageSources.avif, breakpoints)}
          sizes={sizes}
          type="image/avif"
        />
        
        {/* WebP format for broader support */}
        <source
          srcSet={optimizeImages.generateSrcSet(imageSources.webp, breakpoints)}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback to original format */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={lazy ? 'lazy' : 'eager'}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
        />
      </picture>
    );
  }

  // Standard Next.js Image component with optimizations
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        className={`transition-all duration-300 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        loading={lazy ? 'lazy' : 'eager'}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover'
        }}
      />
      
      {/* Performance indicator in development */}
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-1 rounded">
          ✓ Loaded
        </div>
      )}
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// Specialized components for common use cases
export function BookCoverImage({
  bookId,
  title,
  className = '',
  priority = false,
  size = 'medium'
}: {
  bookId: string;
  title: string;
  className?: string;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large' | 'hero';
}) {
  const sizeConfig = {
    small: { width: 150, height: 225 },
    medium: { width: 300, height: 450 },
    large: { width: 400, height: 600 },
    hero: { width: 600, height: 900 }
  };

  const { width, height } = sizeConfig[size];

  return (
    <OptimizedImage
      src={`/book-covers/${bookId}.jpg`}
      alt={`${title} book cover`}
      width={width}
      height={height}
      priority={priority}
      className={`rounded-lg shadow-md ${className}`}
      sizes={`(max-width: 640px) ${width}px, (max-width: 1024px) ${Math.round(width * 0.8)}px, ${width}px`}
      quality={90}
      placeholder="blur"
    />
  );
}

export function BlogHeroImage({
  slug,
  title,
  className = ''
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={`/blog-images/${slug}-hero.jpg`}
      alt={title}
      width={1200}
      height={630}
      priority={true}
      className={`w-full rounded-xl ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      quality={85}
      placeholder="blur"
      responsive={true}
      breakpoints={[600, 900, 1200]}
    />
  );
}

export function AvatarImage({
  src,
  name,
  size = 40,
  className = ''
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={`${name} avatar`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      sizes={`${size}px`}
      quality={80}
      placeholder="blur"
      lazy={false}
    />
  );
}