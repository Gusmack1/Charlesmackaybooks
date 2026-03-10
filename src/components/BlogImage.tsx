'use client';

import { useState } from 'react';

// Minimal gray placeholder (1x1) when image fails to load
const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';

interface BlogImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

/**
 * Blog image with fallback when the primary src fails to load.
 * Use for blog post images that may be missing (e.g. JPGs not yet added to public/blog-images).
 */
export default function BlogImage({ src, alt, fallback = PLACEHOLDER, ...props }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...props} />;
}
