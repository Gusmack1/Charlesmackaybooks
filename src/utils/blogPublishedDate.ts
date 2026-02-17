import { blogPosts } from '@/data/blogCategories';

const DEFAULT_BLOG_PUBLISHED_DATE = '2024-01-01T12:00:00.000Z';

function normalizeDateToIso(input?: string): string | null {
  if (!input) return null;
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

const publishedDateBySlug = new Map<string, string>(
  blogPosts
    .map((post) => [post.slug, normalizeDateToIso(post.date)] as const)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
);

export function getStableBlogPublishedDate(slug: string, fallback?: string): string {
  const fromCatalog = publishedDateBySlug.get(slug);
  if (fromCatalog) return fromCatalog;
  const normalizedFallback = normalizeDateToIso(fallback);
  return normalizedFallback || DEFAULT_BLOG_PUBLISHED_DATE;
}

