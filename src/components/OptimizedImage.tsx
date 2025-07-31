'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
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
}

export default function OptimizedImage({
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
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imageRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate responsive srcset for different formats
  const generateSrcSet = (format: 'webp' | 'avif' | 'jpeg') => {
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => {
        const aspectRatio = width / height;
        const newHeight = Math.round(size / aspectRatio);
        return `${src}?w=${size}&h=${newHeight}&f=${format}&q=${quality} ${size}w`;
      })
      .join(', ');
  };

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

  // Fallback to original image if optimization fails
  if (hasError) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <div
      ref={imageRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
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
            height={height}
            className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
            priority={priority}
            sizes={sizes}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            style={{
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
    </div>
  );
}

// CSS for loading spinner
const spinnerStyles = `
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .optimized-image-container {
    overflow: hidden;
    border-radius: 8px;
  }
  
  .optimized-image {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .optimized-image.loaded {
    opacity: 1;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinnerStyles;
  document.head.appendChild(style);
} 