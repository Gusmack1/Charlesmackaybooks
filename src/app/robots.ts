import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://charlesmackaybooks.com';

  return {
    rules: [
      // Primary search engines - full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/',
          '/backups/',
          '/seo-reports/',
          '/*.zip',
          '/*.tar.gz',
          '/charles-mackay-books-*',
          '/deployment-*',
          '/output/',
          '/netlify-deployment/',
          '/node_modules/',
          '.env*',
          '*.log'
        ],
        crawlDelay: 1
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/',
          '/backups/',
          '/seo-reports/',
          '/*.zip',
          '/*.tar.gz',
          '/charles-mackay-books-*',
          '/deployment-*',
          '/output/',
          '/netlify-deployment/',
          '/node_modules/',
          '.env*',
          '*.log'
        ],
        crawlDelay: 1
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/',
          '/backups/',
          '/seo-reports/',
          '/*.zip',
          '/*.tar.gz',
          '/charles-mackay-books-*',
          '/deployment-*',
          '/output/',
          '/netlify-deployment/',
          '/node_modules/',
          '.env*',
          '*.log'
        ],
        crawlDelay: 2
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/',
          '/backups/',
          '/seo-reports/',
          '/*.zip',
          '/*.tar.gz',
          '/charles-mackay-books-*',
          '/deployment-*',
          '/output/',
          '/netlify-deployment/',
          '/node_modules/',
          '.env*',
          '*.log'
        ]
      },
      // Academic and research bots
      {
        userAgent: 'ia_archiver', // Internet Archive
        allow: [
          '/',
          '/books/',
          '/blog/',
          '/about/',
          '/research-guides/',
          '/aviation-bibliography/',
          '/aviation-glossary/'
        ],
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/'
        ]
      },
      // SEO and analysis bots
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 10
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 10
      },
      {
        userAgent: 'MJ12bot',
        allow: '/',
        crawlDelay: 10
      },
      // Social media bots
      {
        userAgent: 'facebookexternalhit',
        allow: [
          '/',
          '/books/',
          '/blog/',
          '/about/'
        ]
      },
      {
        userAgent: 'Twitterbot',
        allow: [
          '/',
          '/books/',
          '/blog/',
          '/about/'
        ]
      },
      {
        userAgent: 'LinkedInBot',
        allow: [
          '/',
          '/books/',
          '/blog/',
          '/about/',
          '/for-researchers/'
        ]
      },
      // Generic rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/scripts/',
          '/backups/',
          '/seo-reports/',
          '/*.zip',
          '/*.tar.gz',
          '/charles-mackay-books-*',
          '/deployment-*',
          '/output/',
          '/netlify-deployment/',
          '/node_modules/',
          '.env*',
          '*.log',
          '/.git/',
          '/.github/',
          '/same/',
          '*.json',
          '*.lock'
        ],
        crawlDelay: 5
      }
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/sitemap-indexing-fix.xml`
    ],
    host: baseUrl
  };
}
