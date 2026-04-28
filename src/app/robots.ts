import type { MetadataRoute } from 'next';

const SITE = 'https://charlesmackaybooks.com';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/order-tracking/',
          '/api/',
          '/search/',
          '/_next/',
          '/fonts/',
          '/checkout/',
          '/account/',
          '/ai-prompt-system/',
          '/test-order/',
          '/*?utm_*',
          '/*?ref=*',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
