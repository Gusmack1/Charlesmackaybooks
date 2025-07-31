'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  lazy?: boolean;
}

export default function ResponsiveImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  aspectRatio,
  objectFit = 'cover',
  lazy = true
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || !lazy);
  const imageRef = useRef<HTMLDivElement>(null);

  // Calculate height based on aspect ratio if provided
  const finalHeight = aspectRatio ? width / aspectRatio : height;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority, lazy]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcset for different formats
  const generateSrcSet = (format: 'webp' | 'avif' | 'jpeg') => {
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => {
        const newHeight = aspectRatio ? Math.round(size / aspectRatio) : Math.round((size * finalHeight) / width);
        return `${src}?w=${size}&h=${newHeight}&f=${format}&q=${quality} ${size}w`;
      })
      .join(', ');
  };

  // Fallback to regular img if error occurs
  if (hasError) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={finalHeight}
        className={`img-responsive ${className}`}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <div
      ref={imageRef}
      className={`responsive-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        aspectRatio: aspectRatio ? `${aspectRatio}` : `${width} / ${finalHeight}`,
      }}
    >
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source
            type="image/avif"
            srcSet={generateSrcSet('avif')}
            sizes={sizes}
          />
          {/* WebP format for broader support */}
          <source
            type="image/webp"
            srcSet={generateSrcSet('webp')}
            sizes={sizes}
          />
          {/* JPEG fallback */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={finalHeight}
            className={`responsive-image ${isLoaded ? 'loaded' : ''}`}
            priority={priority}
            sizes={sizes}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit,
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </picture>
      )}

      {/* Loading placeholder */}
      {!isLoaded && isInView && (
        <div
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {/* Lazy loading placeholder */}
      {!isInView && (
        <div
          className="lazy-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="lazy-indicator">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// Predefined responsive image components for common use cases
export const HeroImage = (props: Omit<ResponsiveImageProps, 'sizes' | 'priority'>) => (
  <ResponsiveImage
    {...props}
    sizes="100vw"
    priority={true}
    aspectRatio={16 / 9}
    objectFit="cover"
  />
);

export const BookCoverImage = (props: Omit<ResponsiveImageProps, 'sizes' | 'aspectRatio'>) => (
  <ResponsiveImage
    {...props}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    aspectRatio={2 / 3}
    objectFit="cover"
  />
);

export const BlogImage = (props: Omit<ResponsiveImageProps, 'sizes' | 'aspectRatio'>) => (
  <ResponsiveImage
    {...props}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    aspectRatio={16 / 9}
    objectFit="cover"
  />
);

export const ThumbnailImage = (props: Omit<ResponsiveImageProps, 'sizes' | 'aspectRatio'>) => (
  <ResponsiveImage
    {...props}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
    aspectRatio={1}
    objectFit="cover"
  />
); 