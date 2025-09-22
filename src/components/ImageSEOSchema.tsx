'use client';

interface ImageSEOSchemaProps {
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  pageTitle?: string;
  pageUrl?: string;
}

export default function ImageSEOSchema({ images, pageTitle, pageUrl }: ImageSEOSchemaProps) {
  if (!images || images.length === 0) return null;

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${pageTitle || 'Aviation History'} - Expert Photography and Illustrations`,
    "description": "High-quality historical aviation photography, technical illustrations, and archival images from Charles E. MacKay's aviation history collection",
    "url": pageUrl,
    "associatedMedia": images.map((image, index) => ({
      "@type": "ImageObject",
      "@id": `${pageUrl}#image-${index + 1}`,
      "contentUrl": image.url.startsWith('http') ? image.url : `https://charlesmackaybooks.com${image.url}`,
      "url": image.url.startsWith('http') ? image.url : `https://charlesmackaybooks.com${image.url}`,
      "name": image.alt || `Aviation History Image ${index + 1}`,
      "description": image.caption || image.alt || "Historical aviation photography from Charles E. MacKay's research collection",
      "width": image.width || 800,
      "height": image.height || 600,
      "encodingFormat": "image/jpeg",
      "license": "https://charlesmackaybooks.com/terms",
      "acquireLicensePage": "https://charlesmackaybooks.com/contact",
      "creditText": "Charles E. MacKay Aviation History Collection",
      "creator": {
        "@type": "Person",
        "name": "Charles E. MacKay",
        "url": "https://charlesmackaybooks.com/about"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Charles E. MacKay Aviation Books",
        "url": "https://charlesmackaybooks.com"
      },
      "representativeOfPage": index === 0,
      "thumbnail": {
        "@type": "ImageObject",
        "contentUrl": image.url.startsWith('http') ? image.url : `https://charlesmackaybooks.com${image.url}`,
        "width": 300,
        "height": 200
      }
    })),
    "mainEntity": {
      "@type": "Article",
      "name": pageTitle,
      "url": pageUrl,
      "author": {
        "@type": "Person",
        "name": "Charles E. MacKay"
      }
    }
  };

  // Enhanced alt text optimization schema
  const altTextSchema = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": "Optimized Image Alt Text",
    "description": "All images include descriptive alt text for accessibility and SEO, focusing on aviation history context and technical details",
    "accessibilityFeature": [
      "alternativeText",
      "longDescription", 
      "highContrastDisplay"
    ],
    "accessibilitySummary": "All aviation history images include comprehensive alt text describing aircraft, historical context, and technical details for screen readers and search engines"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(altTextSchema)
        }}
      />
    </>
  );
}
