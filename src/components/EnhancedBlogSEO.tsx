import { books } from '@/data/books';
import { resolveRelatedBooks } from '@/utils/blogRelatedBooks';
import { getStableBlogPublishedDate } from '@/utils/blogPublishedDate';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  author: {
    name: string;
    bio: string;
  };
  category: string;
  tags: string[];
  featuredImage?: {
    url: string;
    alt: string;
  };
  relatedBooks?: Array<{ id: string }>;
  relatedPosts?: Array<{ id?: string; slug?: string; title: string; excerpt?: string }>;
}

interface RelatedBook {
  id: string;
  title?: string;
  isbn?: string;
  price?: number;
}

interface RelatedPost {
  slug?: string;
  id?: string;
  title: string;
  excerpt?: string;
}

interface EnhancedBlogSEOProps {
  post: BlogPost;
  relatedBooks?: RelatedBook[];
  relatedPosts?: RelatedPost[];
}

const catalogById = new Map(books.map((book) => [book.id, book]));

function toAbsoluteUrl(baseUrl: string, url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function EnhancedBlogSEO({ post, relatedBooks = [], relatedPosts = [] }: EnhancedBlogSEOProps) {
  const baseUrl = 'https://charlesmackaybooks.com';
  const fullUrl = `${baseUrl}/blog/${post.id}`;
  const stablePublishedDate = getStableBlogPublishedDate(post.id, post.publishedDate);
  const canonicalImage = toAbsoluteUrl(baseUrl, post.featuredImage?.url) || `${baseUrl}/blog-images/default-generic.svg`;

  const explicitRelatedBookInputs = [
    ...((post.relatedBooks || []).map((book) => ({ id: book.id }))),
    ...relatedBooks.map((book) => ({ id: book.id })),
  ];

  const resolvedRelatedBooks = resolveRelatedBooks(
    { id: post.id, title: post.title, category: post.category, tags: post.tags },
    explicitRelatedBookInputs,
    2,
    4
  );

  const normalizedRelatedPosts = [
    ...(post.relatedPosts || []).map((relatedPost) => ({
      slug: relatedPost.slug || relatedPost.id || '',
      title: relatedPost.title || '',
      excerpt: relatedPost.excerpt || '',
    })),
    ...relatedPosts.map((relatedPost) => ({
      slug: relatedPost.slug || relatedPost.id || '',
      title: relatedPost.title || '',
      excerpt: relatedPost.excerpt || '',
    })),
  ]
    .filter((relatedPost) => Boolean(relatedPost.slug && relatedPost.title))
    .filter((relatedPost, index, array) => array.findIndex((item) => item.slug === relatedPost.slug) === index)
    .slice(0, 6);

  const faqEntities: Array<Record<string, unknown>> = [
    {
      '@type': 'Question',
      name: `What does "${post.title}" cover?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: post.excerpt,
      },
    },
    {
      '@type': 'Question',
      name: `Who wrote "${post.title}"?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${post.title} was written by ${post.author.name}.`,
      },
    },
    {
      '@type': 'Question',
      name: `When was "${post.title}" published?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `This article was published on ${new Date(stablePublishedDate).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}.`,
      },
    },
  ];

  if (resolvedRelatedBooks.length > 0) {
    faqEntities.push({
      '@type': 'Question',
      name: `Which books are most relevant to "${post.title}"?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Recommended books include ${resolvedRelatedBooks.map((book) => book.title).join(', ')}.`,
      },
    });
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: canonicalImage,
      alt: post.featuredImage?.alt || post.title,
    },
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/about#author`,
      name: post.author.name,
      jobTitle: 'Aviation Historian',
      description: post.author.bio,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Charles E. MacKay Aviation Books',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/charles-mackay-logo.png`,
      },
    },
    datePublished: stablePublishedDate,
    dateModified: stablePublishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
    },
    articleSection: post.category,
    inLanguage: 'en-GB',
    keywords: [post.title, 'Charles E. MacKay', post.category, ...post.tags].filter(Boolean).join(', '),
    ...(resolvedRelatedBooks.length > 0 && {
      mentions: resolvedRelatedBooks.map((book) => {
        const catalogBook = catalogById.get(book.id);
        const availability = catalogBook?.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock';

        return {
          '@type': 'Book',
          '@id': `${baseUrl}/books/${book.id}#book`,
          name: book.title,
          ...(catalogBook?.isbn ? { isbn: catalogBook.isbn } : {}),
          url: `${baseUrl}/books/${book.id}`,
          ...(typeof catalogBook?.price === 'number'
            ? {
                offers: {
                  '@type': 'Offer',
                  price: catalogBook.price.toFixed(2),
                  priceCurrency: 'GBP',
                  availability,
                  url: `${baseUrl}/books/${book.id}`,
                },
              }
            : {}),
        };
      }),
    }),
    ...(normalizedRelatedPosts.length > 0 && {
      relatedLink: normalizedRelatedPosts.map((relatedPost) => ({
        '@type': 'Article',
        '@id': `${baseUrl}/blog/${relatedPost.slug}#article`,
        headline: relatedPost.title,
        url: `${baseUrl}/blog/${relatedPost.slug}`,
      })),
    }),
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: post.title,
    description: post.excerpt,
    isPartOf: { '@id': `${baseUrl}/#website` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: canonicalImage,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: fullUrl },
      ],
    },
    mainEntity: { '@id': `${fullUrl}#article` },
  };

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${fullUrl}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    image: { '@type': 'ImageObject', url: canonicalImage },
    author: { '@id': `${baseUrl}/about#author` },
    publisher: { '@id': `${baseUrl}/#organization` },
    datePublished: stablePublishedDate,
    dateModified: stablePublishedDate,
    mainEntityOfPage: { '@id': `${fullUrl}#webpage` },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${fullUrl}#faq`,
    mainEntity: faqEntities.slice(0, 4),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

