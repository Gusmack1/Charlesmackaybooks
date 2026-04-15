import type { MetadataRoute } from 'next';
import { books } from '@/data/books';

const SITE = 'https://charlesmackaybooks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/books`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE}/shipping`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE}/returns`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const bookPages: MetadataRoute.Sitemap = books.map(b => ({
    url: `${SITE}/books/${b.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...bookPages];
}
