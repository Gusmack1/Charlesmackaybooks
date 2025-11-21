import { MetadataRoute } from 'next';
import { generateSitemapEntries } from '@/lib/sitemapData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapEntries();
}
