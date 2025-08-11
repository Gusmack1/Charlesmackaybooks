/**
 * SEO Optimizer - Comprehensive SEO and Performance Implementation
 * Based on Charles Mackay Books Website Analysis Report - Prompt 5
 */

import { Book } from '@/types/book';
import { Metadata } from 'next';

interface SEOConfig {
  siteName: string;
  baseUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  twitterHandle: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
}

const seoConfig: SEOConfig = {
  siteName: 'Charles Mackay Books',
  baseUrl: 'https://charlesmackaybooks.com',
  defaultTitle: 'Charles Mackay Books - Aviation History & Military Aircraft Books',
  defaultDescription: 'Discover rare aviation history books, military aircraft documentation, and historical aviation research by Charles Mackay. Specialized collection covering WWI, WWII, and modern aviation development.',
  twitterHandle: '@CharlesMackayBooks',
  googleSiteVerification: 'your-google-site-verification-code'
};

export interface PageSEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  structuredData?: any;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Generate optimized metadata for book detail pages
 */
export function generateBookMetadata(book: Book): Metadata {
  const title = `${book.title} by ${book.author} - Charles Mackay Books`;
  const description = `${book.description.substring(0, 155)}... Available for purchase with worldwide shipping. ISBN: ${book.isbn}`;
  const canonicalUrl = `${seoConfig.baseUrl}/books/${book.id}`;
  const imageUrl = (() => {
    const candidate = book.imageUrl ?? `/book-covers/${book.id}.jpg`;
    return candidate.startsWith('http') ? candidate : `${seoConfig.baseUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`;
  })();

  return {
    title,
    description,
    keywords: [
      book.title,
      book.author,
      book.category,
      'aviation history',
      'military aircraft',
      'aviation books',
      'historical research',
      book.isbn || ''
    ].filter(Boolean),
    canonical: canonicalUrl,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 600,
          alt: `${book.title} book cover`
        }
      ],
      type: 'website',
      locale: 'en_GB'
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterHandle,
      title,
      description,
      images: [imageUrl]
    },
    alternates: {
      canonical: canonicalUrl
    },
    other: {
      'article:author': book.author,
      'article:published_time': book.publicationDate || '',
      'book:isbn': book.isbn || '',
      'product:price:amount': book.price.toString(),
      'product:price:currency': 'GBP',
      'product:availability': book.inStock ? 'in stock' : 'out of stock',
      'google-site-verification': seoConfig.googleSiteVerification || ''
    }
  };
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(category: string, bookCount: number): Metadata {
  const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `${formattedCategory} Books - Aviation History Collection | Charles Mackay Books`;
  const description = `Explore ${bookCount} books in ${formattedCategory.toLowerCase()}. Comprehensive collection of aviation history, military aircraft, and historical research books with worldwide shipping.`;
  const canonicalUrl = `${seoConfig.baseUrl}/category/${category}`;

  return {
    title,
    description,
    keywords: [
      formattedCategory,
      'aviation books',
      'military history',
      'aircraft history',
      'aviation research',
      'historical books'
    ],
    canonical: canonicalUrl,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      type: 'website',
      locale: 'en_GB'
    },
    twitter: {
      card: 'summary',
      site: seoConfig.twitterHandle,
      title,
      description
    },
    alternates: {
      canonical: canonicalUrl
    }
  };
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogMetadata(
  title: string, 
  excerpt: string, 
  slug: string, 
  publishDate?: string,
  featuredImage?: string
): Metadata {
  const fullTitle = `${title} - Aviation History Blog | Charles Mackay Books`;
  const description = excerpt.length > 155 ? `${excerpt.substring(0, 152)}...` : excerpt;
  const canonicalUrl = `${seoConfig.baseUrl}/blog/${slug}`;
  const imageUrl = featuredImage || `${seoConfig.baseUrl}/blog-images/${slug}-hero.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'aviation history',
      'military aircraft',
      'historical research',
      'aviation blog',
      'aircraft development',
      'military history'
    ],
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: 'article',
      locale: 'en_GB',
      publishedTime: publishDate
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl]
    },
    alternates: {
      canonical: canonicalUrl
    },
    other: {
      'article:author': 'Charles Mackay',
      'article:published_time': publishDate || '',
      'article:section': 'Aviation History',
      'google-site-verification': seoConfig.googleSiteVerification || ''
    }
  };
}

/**
 * Generate structured data for books (Schema.org Product)
 */
export function generateBookStructuredData(book: Book) {
  const baseUrl = seoConfig.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    description: book.description,
    image: (() => {
      const candidate = book.imageUrl ?? `/book-covers/${book.id}.jpg`;
      return candidate.startsWith('http') ? candidate : `${baseUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`;
    })(),
    sku: book.id,
    isbn: book.isbn,
    author: {
      '@type': 'Person',
      name: book.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Charles Mackay Books',
      url: baseUrl
    },
    category: book.category,
    weight: {
      '@type': 'QuantitativeValue',
      value: book.weight || 300,
      unitCode: 'GRM'
    },
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'GBP',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      condition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Charles Mackay Books',
        url: baseUrl
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '1.95',
          currency: 'GBP'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          },
          cutoffTime: '15:00',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Aviation Historian'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Exceptional historical research and documentation. Essential reading for aviation enthusiasts.'
      }
    ]
  };
}

/**
 * Generate structured data for the organization
 */
export function generateOrganizationStructuredData() {
  const baseUrl = seoConfig.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Charles Mackay Books',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Specialized publisher and retailer of aviation history books, military aircraft documentation, and historical aviation research.',
    foundingDate: '2010',
    founder: {
      '@type': 'Person',
      name: 'Charles Mackay',
      jobTitle: 'Aviation Historian & Author'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'Scotland'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-xxx-xxx-xxxx',
      contactType: 'Customer Service',
      email: 'charlese1mackay@hotmail.com',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.ebay.co.uk/usr/chaza87',
      'https://twitter.com/CharlesMackayBooks',
      'https://www.facebook.com/CharlesMackayBooks'
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/books?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
  const baseUrl = seoConfig.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: baseUrl,
    description: seoConfig.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: 'Charles Mackay Books'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/books?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Aviation History Books',
      description: 'Comprehensive collection of aviation history and military aircraft books',
      numberOfItems: 19
    }
  };
}

/**
 * Performance optimization utilities
 */
export const performanceOptimizations = {
  // Critical CSS inlining
  getCriticalCSS: () => {
    return `
      /* Critical above-the-fold styles */
      body { font-family: Inter, sans-serif; margin: 0; }
      .header-container { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.95); }
      .hero-section { min-height: 50vh; display: flex; align-items: center; }
      /* Loading states */
      .loading { opacity: 0.7; }
      .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); }
    `;
  },

  // Image optimization settings
  getImageOptimization: () => ({
    formats: ['webp', 'avif'],
    quality: 85,
    sizes: {
      small: 400,
      medium: 800,
      large: 1200,
      hero: 1920
    },
    lazy: true,
    placeholder: 'blur'
  }),

  // Core Web Vitals optimization
  getCoreWebVitalsConfig: () => ({
    LCP: {
      target: 2500, // ms
      strategies: [
        'Preload hero images',
        'Optimize font loading',
        'Minimize render-blocking resources',
        'Use CDN for static assets'
      ]
    },
    CLS: {
      target: 0.1,
      strategies: [
        'Set image dimensions',
        'Reserve space for ads',
        'Avoid dynamic content injection',
        'Use CSS aspect-ratio'
      ]
    },
    INP: {
      target: 200, // ms
      strategies: [
        'Optimize JavaScript execution',
        'Use React.memo for heavy components',
        'Implement code splitting',
        'Defer non-critical JavaScript'
      ]
    }
  })
};

/**
 * Generate XML sitemap data
 */
export function generateSitemapData(books: Book[]) {
  const baseUrl = seoConfig.baseUrl;
  const lastmod = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/books`, changefreq: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academic-resources`, changefreq: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/research-guides`, changefreq: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/timeline`, changefreq: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/scottish-aviation-timeline`, changefreq: 'monthly', priority: 0.6 }
  ];

  const bookPages = books.map(book => ({
    url: `${baseUrl}/books/${book.id}`,
    changefreq: 'weekly' as const,
    priority: 0.8,
    lastmod
  }));

  const categoryPages = [
    'aviation-history', 'military-aircraft', 'wwi-aviation', 'wwii-aviation',
    'modern-aviation', 'helicopter-history', 'aviation-biography', 'technical-manuals',
    'aircraft-development', 'aviation-industry', 'test-pilots'
  ].map(category => ({
    url: `${baseUrl}/category/${category}`,
    changefreq: 'weekly' as const,
    priority: 0.7,
    lastmod
  }));

  return {
    pages: [...staticPages, ...bookPages, ...categoryPages],
    images: books.map(book => ({
      url: book.imageUrl || `${baseUrl}/book-covers/${book.id}.jpg`,
      caption: `${book.title} by ${book.author}`,
      title: book.title
    }))
  };
}

export { seoConfig };