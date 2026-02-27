// Sitemap generator for Charles Mackay Books
import { books } from '@/data/books';

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(): string {
  const baseUrl = 'https://charlesmackaybooks.com';
  const now = new Date().toISOString();

  const pages: SitemapEntry[] = [
    // Main pages
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/books', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/blog', changeFrequency: 'daily', priority: 0.9 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/how-to-order', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/academic-resources', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/aviation-bibliography', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/aviation-glossary', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/scottish-aviation-timeline', changeFrequency: 'monthly', priority: 0.75 },
    { url: '/for-researchers', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/research-guides', changeFrequency: 'monthly', priority: 0.7 },

    // Category pages
    { url: '/category/aviation-biography', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/aviation-history', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/helicopter-history', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/industrial-history', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/jet-age-aviation', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/military-history', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/naval-aviation', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/category/scottish-aviation-history', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/category/travel-literature', changeFrequency: 'weekly', priority: 0.5 },
    { url: '/category/wwi-aviation', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/category/wwii-aviation', changeFrequency: 'weekly', priority: 0.7 },

    // Aircraft pages removed

    // All book pages - dynamically generated
    ...books.map(book => ({
      url: `/books/${book.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9
    })),

    // Blog posts
    { url: '/blog/beardmore-aviation-scottish-industrial-giant', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/hms-argus-first-aircraft-carrier', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/hms-argus-first-aircraft-carrier-operations', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/adolf-rohrbach-metal-aircraft-revolution', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/adolf-rohrbach-metal-aircraft-construction', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/clydeside-aviation-revolution', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/bristol-fighter-f2b-brisfit', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/hawker-hurricane-fighter-development', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/sopwith-camel-wwi-fighter', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/supermarine-spitfire-development-evolution', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/supermarine-spitfire-development-history', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/test-pilot-biography-eric-brown', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/blog/de-havilland-chipmunk-wp808-turnhouse', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/bristol-sycamore-helicopter-development', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/helicopter-development-pioneers', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/sycamore-seeds-helicopter-evolution', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/sikorsky-vs300-helicopter-breakthrough', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/rotorcraft-military-applications', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/percy-pilcher-scotland-aviation-pioneer', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/lucy-lady-houston-schneider-trophy', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/schneider-trophy-racing-development', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/british-aircraft-great-war-rfc-rnas', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/german-aircraft-great-war-development', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/aviation-manufacturing-wartime-production', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/naval-aviation-history', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/jet-age-aviation-cold-war-development', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/blog/english-electric-lightning-development', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/f86-sabre-cold-war-fighter', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/korean-war-air-combat', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/me262-jet-fighter-revolution', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/luftwaffe-1945-final-year', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog/british-nuclear-deterrent-v-force', changeFrequency: 'weekly', priority: 0.6 },

    // Aircraft pages removed

    // Partnership pages
    { url: '/partnerships/imperial-war-museum', changeFrequency: 'monthly', priority: 0.7 }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changeFrequency || 'weekly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateImageSitemap(): string {
  const baseUrl = 'https://charlesmackaybooks.com';
  
  const images = [
    {
      url: '/charles-mackay-aviation-historian.jpg',
      caption: 'Charles E. MacKay Aviation Historian',
      title: 'Charles E. MacKay - Aviation Historian'
    },
    // All book covers - dynamically generated
    ...books.map(book => ({
      url: `/book-covers/${book.id}.jpg`,
      caption: `${book.title} Book Cover`,
      title: `${book.title} by Charles E. MacKay`
    }))
  ];

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(image => `  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return imageSitemap;
}

export function generateRobotsTxt(): string {
  const baseUrl = 'https://charlesmackaybooks.com';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /checkout/
Disallow: /order-complete/

# Allow important static files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico
Allow: /*.css
Allow: /*.js

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml

# Crawl-delay for bots (optional)
Crawl-delay: 1`;
}