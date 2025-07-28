import { MetadataRoute } from 'next';
import { books } from '@/data/books';

export const dynamic = 'force-static';

// Blog posts data for sitemap - Enhanced with new posts
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
  'aviation-manufacturing-wartime-production'
];

// Enhanced sitemap with SEO optimization
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://charlesmackaybooks.com';

  // Get current date for lastModified
  const lastModified = new Date().toISOString();

  // Core site pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.9, // Blog homepage - very high priority for content
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // About page - high priority
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
      priority: 0.7, // Academic audience
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/research-guides`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.7, // Valuable content for SEO
    },
    {
      url: `${baseUrl}/aviation-glossary`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // High-value content page
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
      priority: 0.6, // News content
    },
    {
      url: `${baseUrl}/academic-resources`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7, // Academic value
    },
  ];

  // Blog post pages - high priority for content SEO
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(postId => ({
    url: `${baseUrl}/blog/${postId}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Blog posts are important for content SEO
  }));

  // Category pages - medium-high priority
  const categoryPages: MetadataRoute.Sitemap = [
    'Scottish Aviation History',
    'WWI Aviation',
    'WWII Aviation',
    'Aviation Biography',
    'Helicopter History',
    'Aviation History',
    'Military History',
    'Naval Aviation',
    'Jet Age Aviation',
    'Industrial History',
    'Travel Literature'
  ].map(category => ({
    url: `${baseUrl}/category/${category.toLowerCase().replace(/ /g, '-')}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Categories are important for navigation
  }));

  // Book pages - high priority for products
  const bookPages: MetadataRoute.Sitemap = books.map(book => ({
    url: `${baseUrl}/books/${book.id}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Product pages are crucial for conversions
  }));

  // Aircraft detail pages - specialized content
  const aircraftPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/aircraft/bristol-fighter`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7, // Specialized content
    },
    {
      url: `${baseUrl}/aircraft/sopwith-camel`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/aircraft/hawker-hurricane`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Partnership and authority pages
  const partnershipPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/partnerships/imperial-war-museum`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6, // Authority building
    },
  ];

  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...bookPages,
    ...aircraftPages,
    ...partnershipPages,
  ];
}
