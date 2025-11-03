'use client';

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
}

interface RelatedBook {
  id: string;
  title: string;
  isbn: string;
  price: number;
}

interface EnhancedBlogSEOProps {
  post: BlogPost;
  relatedBooks?: RelatedBook[];
  relatedPosts?: Array<{ slug: string; title: string; excerpt: string }>;
}

/**
 * Enhanced SEO component for blog posts with AI/GEO optimization
 * Includes Article schema, FAQ schema, and enhanced metadata for AI search engines
 */
export default function EnhancedBlogSEO({ post, relatedBooks = [], relatedPosts = [] }: EnhancedBlogSEOProps) {
  const baseUrl = 'https://charlesmackaybooks.com';
  const fullUrl = `${baseUrl}/blog/${post.id}`;

  // Generate FAQ schema based on blog content
  const generateFAQSchema = () => {
    const faqs = [];
    
    // Extract key questions from content
    const contentLower = post.content.toLowerCase();
    
    // What is this article about?
    faqs.push({
      '@type': 'Question',
      name: `What is "${post.title}" about?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: post.excerpt || post.content.substring(0, 300) + '...'
      }
    });

    // Who wrote this article?
    faqs.push({
      '@type': 'Question',
      name: `Who wrote "${post.title}"?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${post.title} was written by ${post.author.name}, ${post.author.bio}`
      }
    });

    // When was this published?
    faqs.push({
      '@type': 'Question',
      name: `When was "${post.title}" published?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `This article was published on ${new Date(post.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}.`
      }
    });

    // What category is this?
    faqs.push({
      '@type': 'Question',
      name: `What category is "${post.title}"?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `This article is categorized under ${post.category}.`
      }
    });

    // Extract specific questions from content if they exist
    if (contentLower.includes('how')) {
      const howMatch = post.content.match(/how\s+([^?]+)\?/i);
      if (howMatch) {
        faqs.push({
          '@type': 'Question',
          name: `How ${howMatch[1]}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: post.content.substring(0, 300) + '...'
          }
        });
      }
    }

    if (contentLower.includes('why')) {
      const whyMatch = post.content.match(/why\s+([^?]+)\?/i);
      if (whyMatch) {
        faqs.push({
          '@type': 'Question',
          name: `Why ${whyMatch[1]}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: post.content.substring(0, 300) + '...'
          }
        });
      }
    }

    return {
      '@type': 'FAQPage',
      '@id': `${fullUrl}#faq`,
      mainEntity: faqs.slice(0, 6) // Limit to 6 FAQs
    };
  };

  // Enhanced Article schema with AI-friendly metadata
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${baseUrl}${post.featuredImage.url}`,
      alt: post.featuredImage.alt || post.title
    } : `${baseUrl}/blog-images/default-generic.svg`,
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/about#author`,
      name: post.author.name,
      jobTitle: 'Aviation Historian',
      description: post.author.bio,
      url: `${baseUrl}/about`,
      sameAs: [
        'https://www.imperialwarmuseum.org/',
        'https://www.rafmuseum.org.uk/',
        'https://www.ebay.co.uk/usr/chaza87'
      ],
      knowsAbout: [
        'Scottish Aviation History',
        'WWI Aviation',
        'WWII Aviation',
        'Helicopter Development',
        'Jet Age Aviation',
        'Naval Aviation',
        'Military Aviation',
        post.category
      ]
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Charles E. MacKay Aviation Books',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/charles-mackay-logo.png`
      }
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`
    },
    articleSection: post.category,
    inLanguage: 'en-GB',
    keywords: [
      post.title,
      'Charles E MacKay',
      'aviation history',
      post.category,
      ...post.tags,
      'aviation blog',
      'military aviation',
      'aircraft history'
    ].filter(Boolean).join(', '),
    // Enhanced for AI: related works
    ...(relatedBooks.length > 0 && {
      mentions: relatedBooks.map(book => ({
        '@type': 'Book',
        '@id': `${baseUrl}/books/${book.id}#book`,
        name: book.title,
        isbn: book.isbn,
        url: `${baseUrl}/books/${book.id}`
      }))
    }),
    // Enhanced for AI: related articles
    ...(relatedPosts.length > 0 && {
      relatedLink: relatedPosts.map(relatedPost => ({
        '@type': 'Article',
        '@id': `${baseUrl}/blog/${relatedPost.slug}#article`,
        headline: relatedPost.title,
        url: `${baseUrl}/blog/${relatedPost.slug}`
      }))
    }),
    // Word count estimation
    wordCount: Math.ceil(post.content.length / 5), // Rough estimate
    // Content rating
    contentRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1'
    }
  };

  // WebPage schema for the blog post page
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: post.title,
    description: post.excerpt,
    isPartOf: {
      '@id': `${baseUrl}/#website`
    },
    about: {
      '@type': 'Thing',
      name: post.category,
      description: `Expert analysis and research on ${post.category.toLowerCase()}`
    },
    primaryImageOfPage: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${baseUrl}${post.featuredImage.url}`
    } : undefined,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: fullUrl
        }
      ]
    },
    mainEntity: {
      '@id': `${fullUrl}#article`
    }
  };

  // BlogPosting schema (more specific than Article)
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${fullUrl}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${baseUrl}${post.featuredImage.url}`
    } : undefined,
    author: {
      '@id': `${baseUrl}/about#author`
    },
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    mainEntityOfPage: {
      '@id': `${fullUrl}#webpage`
    },
    articleSection: post.category,
    keywords: post.tags.join(', ')
  };

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema)
        }}
      />
      
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema)
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema())
        }}
      />
    </>
  );
}

