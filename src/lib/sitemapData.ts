import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { books } from '@/data/books';

const BASE_URL = 'https://charlesmackaybooks.com';
const GENERATED_AT = new Date().toISOString();

const STATIC_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}> = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/books', priority: 0.95, changeFrequency: 'daily' },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/how-to-order', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/for-researchers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/aviation-bibliography', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/aviation-glossary', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/aviation-news', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/academic-resources', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.65, changeFrequency: 'monthly' },
  { path: '/research-guides', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/golden-age-1918-1939', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/great-war-1914-1918', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/pioneer-era-1895-1914', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/scottish-aviation-timeline', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/timeline', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/categories', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/returns', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/support', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/partnerships/imperial-war-museum', priority: 0.6, changeFrequency: 'monthly' },
];

const FALLBACK_CATEGORY_SLUGS = [
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
  'travel-literature',
];

const PROJECT_ROOT = process.cwd();

function toAbsoluteUrl(route: string) {
  if (route === '/' || route === '') {
    return `${BASE_URL}`;
  }
  const normalized = route.startsWith('/') ? route : `/${route}`;
  return `${BASE_URL}${normalized}`;
}

function getFileLastModified(relativePath: string): string {
  try {
    const stats = fs.statSync(path.join(PROJECT_ROOT, relativePath));
    return stats.mtime.toISOString();
  } catch {
    return GENERATED_AT;
  }
}

function guessStaticFile(routePath: string): string | null {
  if (routePath === '/' || routePath === '') return path.join('src', 'app', 'page.tsx');
  const parts = routePath.replace(/^\//, '').split('/');
  const specificPath = path.join('src', 'app', ...parts, 'page.tsx');
  if (fs.existsSync(path.join(PROJECT_ROOT, specificPath))) {
    return specificPath;
  }
  // Fall back to dynamic routes (e.g., /category/[category])
  if (parts.length > 1 && parts[0] === 'category') {
    return path.join('src', 'app', 'category', '[category]', 'page.tsx');
  }
  return null;
}

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getBlogSlugs(): string[] {
  const blogDir = path.join(PROJECT_ROOT, 'src', 'app', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(blogDir, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort();
}

function getBookIds(): string[] {
  return books.map((book) => book.id);
}

function getCategorySlugs(): string[] {
  const derived = new Set<string>();
  books.forEach((book) => {
    if (book.category) {
      derived.add(slugifyCategory(book.category));
    }
  });
  FALLBACK_CATEGORY_SLUGS.forEach((slug) => derived.add(slug));
  return Array.from(derived);
}

function buildStaticRoutes(): MetadataRoute.Sitemap {
  return STATIC_PAGES.map(({ path: routePath, changeFrequency, priority }) => {
    const file = guessStaticFile(routePath);
    const lastModified = file ? getFileLastModified(file) : GENERATED_AT;
    return {
      url: toAbsoluteUrl(routePath),
      lastModified,
      changeFrequency,
      priority,
    };
  });
}

function buildBlogRoutes(): MetadataRoute.Sitemap {
  return getBlogSlugs().map((slug) => {
    const filePath = path.join('src', 'app', 'blog', slug, 'page.tsx');
    return {
      url: toAbsoluteUrl(`/blog/${slug}`),
      lastModified: getFileLastModified(filePath),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });
}

function buildBookRoutes(): MetadataRoute.Sitemap {
  const booksFileModified = getFileLastModified(path.join('src', 'data', 'books.ts'));
  return getBookIds().map((id) => ({
    url: toAbsoluteUrl(`/books/${id}`),
    lastModified: booksFileModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
}

function buildCategoryRoutes(): MetadataRoute.Sitemap {
  const lastModified = getFileLastModified(path.join('src', 'app', 'category', '[category]', 'page.tsx'));
  return getCategorySlugs().map((slug) => ({
    url: toAbsoluteUrl(`/category/${slug}`),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));
}

export function generateSitemapEntries(): MetadataRoute.Sitemap {
  return [
    ...buildStaticRoutes(),
    ...buildBlogRoutes(),
    ...buildBookRoutes(),
    ...buildCategoryRoutes(),
  ];
}

export { BASE_URL };


