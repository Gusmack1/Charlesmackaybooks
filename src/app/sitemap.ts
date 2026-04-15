import type { MetadataRoute } from 'next';
import { books } from '@/data/books';

const SITE = 'https://charlesmackaybooks.com';
// Stable per-deploy timestamp — avoids "everything updated today" signal to crawlers.
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: BUILD_TIME, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/books`, lastModified: BUILD_TIME, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/about`, lastModified: BUILD_TIME, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, lastModified: BUILD_TIME, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE}/shipping`, lastModified: BUILD_TIME, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE}/returns`, lastModified: BUILD_TIME, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE}/login`, lastModified: BUILD_TIME, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/signup`, lastModified: BUILD_TIME, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const bookPages: MetadataRoute.Sitemap = books.map(b => ({
    url: `${SITE}/books/${b.id}`,
    lastModified: b.publicationYear ? new Date(`${b.publicationYear}-01-01`) : BUILD_TIME,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...bookPages];
}
