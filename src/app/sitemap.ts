import { MetadataRoute } from 'next';
import { books } from '@/data/books';

export const dynamic = 'force-static';

// Enhanced blog posts data for sitemap - Complete list
const blogPosts = [
  'beardmore-aviation-scottish-industrial-giant',
  'clydeside-aviation-revolution',
  'german-aircraft-great-war-development',
  'british-aircraft-great-war-rfc-rnas',
  'sycamore-seeds-helicopter-evolution',
  'f86-sabre-cold-war-fighter',
  'luftwaffe-1945-final-year',
  'percy-pilcher-scotland-aviation-pioneer',
  'hms-argus-first-aircraft-carrier',
  'test-pilot-biography-eric-brown',
  'lucy-lady-houston-schneider-trophy',
  'adolf-rohrbach-metal-aircraft-construction',
  'supermarine-spitfire-development-history',
  'jet-age-aviation-cold-war-development',
  'hawker-hurricane-fighter-development',
  'aviation-manufacturing-wartime-production',
  'helicopter-development-pioneers',
  'naval-aviation-history'
];

// Individual book pages (static routes)
const staticBookPages = [
  'beardmore-aviation',
  'clydeside-aviation-vol1',
  'aircraft-carrier-argus',
  'adolf-rohrbach',
  'birth-atomic-bomb',
  'british-aircraft-great-war',
  'captain-eric-brown'
];

// Category pages - all unique categories
const categoryNames = [
  'scottish-aviation-history',
  'wwi-aviation',
  'wwii-aviation',
  'aviation-biography',
  'helicopter-history',
  'aviation-history',
  'military-history',
  'naval-aviation',
  'jet-age-aviation',
  'industrial-history',
  'travel-literature'
];

// Aircraft detail pages
const aircraftPages = [
  'bristol-fighter',
  'sopwith-camel',
  'hawker-hurricane'
];

// Complete sitemap with ALL pages for maximum Google indexing
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://charlesmackaybooks.com';
  const lastModified = new Date().toISOString();

  // 1. Core site pages (13 pages) - High priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/books`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 0.95, // Product catalog - very high priority
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.9, // Blog homepage - high content priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-order`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9, // Important for conversions
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for-researchers`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // Academic audience
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/research-guides`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.8, // High-value content
    },
    {
      url: `${baseUrl}/aviation-glossary`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // SEO valuable content
    },
    {
      url: `${baseUrl}/scottish-aviation-timeline`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // Unique content
    },
    {
      url: `${baseUrl}/aviation-bibliography`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7, // Academic reference
    },
    {
      url: `${baseUrl}/aviation-news`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/academic-resources`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/order-complete`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];

  // 2. Blog post pages (18 pages) - High content priority
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(postId => ({
    url: `${baseUrl}/blog/${postId}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Blog content is crucial for SEO
  }));

  // 3. Dynamic book pages from data (19 pages) - Product priority
  const dynamicBookPages: MetadataRoute.Sitemap = books.map(book => ({
    url: `${baseUrl}/books/${book.id}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Product pages crucial for sales
  }));

  // 4. Static book pages (7 pages) - Product priority
  const staticBookPageUrls: MetadataRoute.Sitemap = staticBookPages.map(bookId => ({
    url: `${baseUrl}/books/${bookId}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 5. Category pages (11 pages) - Navigation priority
  const categoryPages: MetadataRoute.Sitemap = categoryNames.map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Categories important for discovery
  }));

  // 6. Aircraft detail pages (3 pages) - Specialized content
  const aircraftDetailPages: MetadataRoute.Sitemap = aircraftPages.map(aircraft => ({
    url: `${baseUrl}/aircraft/${aircraft}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 7. Partnership and authority pages (1 page)
  const partnershipPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/partnerships/imperial-war-museum`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Combine all pages for complete indexing coverage
  const allPages = [
    ...staticPages,      // 17 pages
    ...blogPages,        // 18 pages
    ...dynamicBookPages, // 19 pages
    ...staticBookPageUrls, // 7 pages (some may overlap, that's OK)
    ...categoryPages,    // 11 pages
    ...aircraftDetailPages, // 3 pages
    ...partnershipPages, // 1 page
  ];

  // Total: 76+ pages for comprehensive Google indexing
  console.log(`Sitemap generated with ${allPages.length} pages for Google indexing`);

  return allPages;
}
