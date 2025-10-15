import { MetadataRoute } from 'next';
import { books } from '@/data/books';

export const dynamic = 'force-static';

// COMPLETE blog posts data for sitemap - ALL 43 posts for full Google indexing
const blogPosts = [
  'adolf-rohrbach-metal-aircraft-construction',
  'adolf-rohrbach-metal-aircraft-revolution',
  'albatros-dva-technical-legacy',
  'arado-ar234-jet-bomber',
  'autogyro-vs-helicopter',
  'aviation-manufacturing-wartime-production',
  'avro-vulcan-bomber',
  'beardmore-aviation-scottish-industrial-giant',
  'beardmore-wbiii-naval-fighter',
  'bristol-fighter-f2b-brisfit',
  'bristol-sycamore-helicopter-development',
  'british-aircraft-great-war-rfc-rnas',
  'british-nuclear-deterrent-v-force',
  'clydeside-aviation-revolution',
  'de-havilland-chipmunk-wp808-turnhouse',
  'dieter-dengler-skyraider-escape',
  'dorothy-wordsworth-scottish-tour-1803',
  'english-electric-lightning-development',
  'f86-sabre-cold-war-fighter',
  'german-aces-organization-wwi',
  'german-aircraft-great-war-development',
  'hawker-hurricane-fighter-development',
  'helicopter-development-pioneers',
  'hms-argus-first-aircraft-carrier',
  'hms-argus-first-aircraft-carrier-operations',
  'jet-age-aviation-cold-war-development',
  'korean-war-air-combat',
  'lucy-lady-houston-schneider-trophy',
  'luftwaffe-1945-final-year',
  'maud-alsos-atomic-program',
  'me262-jet-fighter-revolution',
  'morris-furniture-war-work-aviation',
  'naval-aviation-history',
  'percy-pilcher-scotland-aviation-pioneer',
  'rotorcraft-military-applications',
  'schneider-trophy-racing-development',
  'scottish-aviation-between-the-wars',
  'sikorsky-vs300-helicopter-breakthrough',
  'sopwith-camel-wwi-fighter',
  'supermarine-spitfire-development-evolution',
  'supermarine-spitfire-development-history',
  'sycamore-seeds-helicopter-evolution',
  'test-pilot-biography-eric-brown'
];

// All book pages - keeping ALL books including modern-furniture and dorothy-wordsworth
const allBookIds = [
  'beardmore-aviation',
  'clydeside-aviation-vol1',
  'clydeside-aviation-vol2',
  'german-aircraft-great-war',
  'british-aircraft-great-war',
  'sycamore-seeds',
  'captain-eric-brown',
  'sabres-from-north',
  'enemy-luftwaffe-1945',
  'flying-for-kaiser',
  'soaring-with-wings',
  'mother-of-the-few',
  'dieter-dengler',
  'modern-furniture', // keeping as requested
  'birth-atomic-bomb',
  'aircraft-carrier-argus',
  'dorothy-wordsworth', // keeping as requested
  'adolf-rohrbach',
  'sonic-to-standoff'
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

// Aircraft detail pages removed: use blog posts instead
const aircraftPages: string[] = [];

// Complete sitemap with ALL pages for maximum Google indexing
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://charlesmackaybooks.com';
  const lastModified = new Date().toISOString();

  // 1. Core site pages - High priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/books/`,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 0.95, // Product catalog - very high priority
    },
    {
      url: `${baseUrl}/ai-prompt-system/`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.8, // AI Prompt System - high priority
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.9, // Blog homepage - high content priority
    },
    {
      url: `${baseUrl}/scottish-aviation-timeline/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // Required page from user list
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-order/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9, // Important for conversions
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for-researchers/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // Academic audience
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/research-guides/`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.8, // High-value content
    },
    {
      url: `${baseUrl}/aviation-glossary/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // SEO valuable content
    },
    {
      url: `${baseUrl}/aviation-bibliography/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7, // Academic reference
    },
    {
      url: `${baseUrl}/aviation-news/`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/academic-resources/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/timeline/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/order-complete/`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];

  // 2. ALL Blog post pages - High content priority
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(postId => ({
    url: `${baseUrl}/blog/${postId}/`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Blog content is crucial for SEO
  }));

  // 3. ALL Book pages (from books data + additional static ones) - Product priority
  const dynamicBookPages: MetadataRoute.Sitemap = books.map(book => ({
    url: `${baseUrl}/books/${book.id}/`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Product pages crucial for sales
  }));

  // 4. Additional static book pages not in books.ts
  const additionalBookIds = allBookIds.filter(id => !books.some(book => book.id === id));
  const additionalBookPages: MetadataRoute.Sitemap = additionalBookIds.map(bookId => ({
    url: `${baseUrl}/books/${bookId}/`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 5. Category pages - Navigation priority
  const categoryPages: MetadataRoute.Sitemap = categoryNames.map(category => ({
    url: `${baseUrl}/category/${category}/`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Categories important for discovery
  }));

  // 6. Aircraft detail pages removed
  const aircraftDetailPages: MetadataRoute.Sitemap = [];

  // 7. Partnership and authority pages
  const partnershipPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/partnerships/imperial-war-museum/`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Combine all pages for complete indexing coverage
  const allPages = [
    ...staticPages,           // Core pages
    ...blogPages,            // ALL blog posts including new ones
    ...dynamicBookPages,     // Books from books.ts
    ...additionalBookPages,  // Additional static book pages
    ...categoryPages,        // Category pages
    ...aircraftDetailPages,  // (none)
    ...partnershipPages,     // Partnership pages
  ];

  // Remove any potential duplicates based on URL
  const uniquePages = allPages.filter((page, index, self) =>
    index === self.findIndex(p => p.url === page.url)
  );

  console.log(`Sitemap generated with ${uniquePages.length} unique pages for comprehensive Google indexing`);

  return uniquePages;
}
