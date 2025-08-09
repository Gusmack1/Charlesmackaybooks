'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    bio: string;
    image: string;
    email: string;
  };
  publishedDate: string;
  readingTime: number;
  featuredImage: {
    url: string;
    alt: string;
    caption: string;
  };
  category: string;
  tags: string[];
  relatedBooks: Array<{
    id: string;
    title: string;
    author: string;
    cover: string;
    price: number;
  }>;
  relatedPosts: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    readingTime: number;
  }>;
}

interface ComprehensiveBlogTemplateProps {
  post: BlogPost;
}

export default function ComprehensiveBlogTemplate({ post }: ComprehensiveBlogTemplateProps) {
  const fallbackSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%230256d4'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><g fill='white' font-family='Source Sans 3, Arial' text-anchor='middle'><text x='300' y='185' font-size='28'>Image unavailable</text><text x='300' y='225' font-size='16'>Charles E. MacKay Aviation History</text></g></svg>`
  );

  const addFallbackToAllImages = (html: string): string => {
    // add onerror fallback and tidy classes on every <img>
    return html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
      let updated = attrs
      // ensure alt attribute
      if (!/\balt\s*=/.test(updated)) {
        updated += ' alt="Aviation history image"'
      }
      // remove inline shadow classes if present and ensure rounded
      updated = updated.replace(/\bshadow-[^\s"]+/g, '')
      if (!/\brounded/.test(updated)) {
        updated += ' class="rounded-lg"'
      }
      // add onerror fallback
      if (!/\bonerror=/.test(updated)) {
        updated += ` onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'"`
      }
      return `<img ${updated}>`
    })
  }

  const ensureThreeImages = (html: string): string => {
    const imgMatches = html.match(/<img\s+[^>]*src=/gi) || [];
    if (imgMatches.length >= 3) return html;

    const candidates: string[] = [];
    if (post.featuredImage?.url) candidates.push(post.featuredImage.url);
    if (post.relatedBooks && post.relatedBooks.length > 0) {
      const covers = post.relatedBooks.map((b) => b.cover).filter(Boolean);
      candidates.push(...covers);
    }
    // ensure at least 3
    while (candidates.length < 3) {
      candidates.push(`data:image/svg+xml;utf8,${fallbackSvg}`);
    }

    const paragraphs = html.split(/(<\/p>)/i);
    const insertAt = [2, Math.max(4, Math.floor(paragraphs.length / 2)), paragraphs.length - 1];
    let injected = html;
    let inserted = 0;
    if (paragraphs.length > 1) {
      const rebuilt: string[] = [];
      for (let i = 0, p = 0; i < paragraphs.length; i++) {
        rebuilt.push(paragraphs[i]);
        if (/^<\/p>$/i.test(paragraphs[i])) {
          // after a paragraph closes
          if (insertAt.includes(p) && inserted < 3 - imgMatches.length) {
            const src = candidates[inserted];
            rebuilt.push(
              `<figure class="my-6"><img src="${src}" alt="Historical aviation reference image" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'" class="w-full h-auto rounded-lg"/><figcaption class="image-caption">Historical reference image</figcaption></figure>`
            );
            inserted++;
          }
          p++;
        }
      }
      injected = rebuilt.join('');
    } else {
      // No paragraphs detected; append images at end
      const blocks = Array.from({ length: 3 - imgMatches.length }).map((_, idx) =>
        `<figure class="my-6"><img src="${candidates[idx]}" alt="Historical aviation reference image" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'" class="w-full h-auto rounded-lg"/><figcaption class="image-caption">Historical reference image</figcaption></figure>`
      );
      injected = html + blocks.join('');
    }
    return injected;
  };

  const processContent = (html: string): string => addFallbackToAllImages(ensureThreeImages(html))

  const stripShareUI = (html: string): string => {
    let output = html
    // Remove explicit "Share This Article" blocks
    output = output.replace(/<div[^>]*>\s*<h[1-6][^>]*>[^<]*Share This Article[^<]*<\/h[1-6]>[\s\S]*?<\/div>/gi, '')
    // Remove common social share anchors
    const shareDomains = [
      'facebook.com/sharer',
      'twitter.com/intent/tweet',
      'linkedin.com/sharing/share-offsite',
      'pinterest.com/pin/create',
      'mailto:\?subject='
    ]
    for (const domain of shareDomains) {
      const re = new RegExp(`<a[^>]+href=\"[^\"]*${domain}[^\"]*\"[^>]*>[^<]*<\/a>`, 'gi')
      output = output.replace(re, '')
    }
    return output
  }

  // Removed scroll listeners and floating share to prevent jank

  const shareUrl = `https://charlesmackaybooks.com/blog/${post.id}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareText = encodeURIComponent(`${post.title} - Expert aviation history analysis by Charles E. MacKay`);

  const socialLinks = {
    facebook: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}&hashtags=AviationHistory,Aviation,History`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    reddit: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
    email: `mailto:?subject=${shareTitle}&body=I thought you might find this aviation history article interesting: ${shareUrl}`
  };

  /*
  useEffect(() => {
    // Attach error fallbacks for inline images inside blog content
    const container = document.querySelector('.blog-content');
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach((img) => {
      const handler = () => {
        img.src = `data:image/svg+xml;utf8,${fallbackSvg}`;
        img.removeEventListener('error', handler);
      };
      img.addEventListener('error', handler);
    });
  }, [post.id]);
  */

  return (
    <div className="min-h-screen bg-background blog-page pb-16 md:pb-0">
      {/* Reading Progress Bar removed for performance */}
      {/* Social Sharing Header removed */}

      {/* Hero Section */}
      <div className="hero-section overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {post.featuredImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover opacity-30"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="badge badge-blue px-4 py-2 rounded-full text-sm font-semibold">
                📚 {post.category}
              </span>
              <div className="flex justify-center items-center gap-4 mt-4 text-white/90 text-sm">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>📖 {post.readingTime} min read</span>
                <span>•</span>
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.subtitle}
            </p>

            {/* Reading Stats */}
            <div className="flex justify-center items-center gap-6 text-sm">
              <span>⭐ Expert Analysis</span>
              <span>📖 {post.readingTime} min read</span>
              <span>🎯 2000+ words</span>
              <span>📚 Research-backed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="content card p-8">
          {/* Featured Image Caption */}
          {post.featuredImage?.caption && (
            <div className="text-center mb-8">
              <p className="text-sm text-muted italic">
                {post.featuredImage.caption}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="blog-content content"
            dangerouslySetInnerHTML={{ __html: stripShareUI(processContent(post.content)) }}
          />
          {/* Breadcrumb JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://charlesmackaybooks.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://charlesmackaybooks.com/blog' },
                  { '@type': 'ListItem', position: 3, name: post.title, item: `https://charlesmackaybooks.com/blog/${post.id}` }
                ]
              })
            }}
          />
        </article>

        {/* Related Books Section */}
        {post.relatedBooks.length > 0 && (
          <section className="mt-16 card-compact bg-accent-green text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              📚 Dive Deeper - Related Books by Charles E. MacKay
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedBooks.map((book) => (
                <Link 
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group block card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex gap-4">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={80}
                      height={120}
                      className="rounded group-hover:shadow-lg transition-shadow"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-primary group-hover:text-accent-blue mb-2 leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-sm text-secondary mb-3">
                        Comprehensive historical analysis with expert commentary and rare archival material.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">
                          £{book.price.toFixed(2)}
                        </span>
                        <span className="badge badge-amber">
                          Order Now →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                href="/books"
                className="inline-block badge badge-blue px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📖 Browse All Aviation Books
              </Link>
            </div>
          </section>
        )}

        {/* Auto-related books removed to avoid duplicate related sections */}

        {/* Author Bio */}
        <section className="mt-16 card p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-accent-blue rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-2">
                About {post.author.name}
              </h3>
              <p className="text-secondary leading-relaxed mb-4">
                {post.author.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                <span>📧 {post.author.email}</span>
                <span>📍 Glasgow, Scotland</span>
                <span>📚 19+ Published Books</span>
                <span>🏛️ Referenced by Major Museums</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts.length > 0 && (
          <section className="mt-16">
            <h3 className="text-2xl font-bold text-primary mb-6">📖 Continue Reading</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {relatedPost.image && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="font-bold text-primary group-hover:text-accent-blue mb-2 leading-tight">
                      {relatedPost.title}
                    </h4>
                    <p className="text-secondary text-sm mb-3">{relatedPost.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-muted">
                      <span>📖 {relatedPost.readingTime} min read</span>
                      <span className="text-accent-blue font-medium">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tags removed per request */}
      </div>

      {/* Social Sharing Footer removed */}

      {/* Sticky Buy Books (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-white text-sm">📚 Browse Charles’s aviation books</span>
          <Link href="/books" className="badge badge-blue px-4 py-2 rounded-lg font-semibold">Buy Books</Link>
        </div>
      </div>

      {/* Floating Social Share (Mobile) */}
      {/* Floating Social Share removed */}

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content h2 {
          color: var(--color-text-primary) !important;
          font-size: clamp(1.75rem, 3.5vw, 2rem) !important;
          line-height: 1.25 !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding-bottom: 0.5rem !important;
          font-weight: 600 !important;
        }
        
        .blog-content h3 {
          color: var(--color-text-primary) !important;
          font-size: clamp(1.5rem, 3vw, 1.75rem) !important;
          line-height: 1.3 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          font-weight: 600 !important;
        }
        
        .blog-content p {
          color: var(--color-text-secondary) !important;
          font-size: 18px !important;
          line-height: 1.6 !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content ul, .blog-content ol {
          @apply mb-6 space-y-2;
        }
        
        .blog-content li {
          color: var(--color-text-secondary) !important;
          font-size: 18px !important;
          line-height: 1.6 !important;
        }
        
        .blog-content blockquote {
          @apply border-l-4 border-accent-blue bg-secondary/5 p-6 my-8 italic text-primary;
        }
        
        .blog-content .bg-amber-50,
        .blog-content .bg-blue-50,
        .blog-content .bg-green-50 {
          @apply rounded-lg mb-8 bg-secondary/5;
        }
        
        .blog-content a {
          @apply text-accent-blue hover:text-accent-blue underline;
        }
        
        .blog-content img {
          @apply rounded-lg shadow-md mx-auto block max-w-full h-auto;
          width: 100%;
          height: auto;
        }

        .blog-content img:first-child {
          @apply mb-4;
        }

        .blog-content .image-caption {
          @apply text-sm text-center italic mt-2 mb-6;
          color: var(--color-text-muted) !important;
        }
        
        /* Override ALL hardcoded color classes in blog content */
        .blog-content .text-gray-600,
        .blog-content .text-gray-700,
        .blog-content .text-gray-800,
        .blog-content .text-slate-600,
        .blog-content .text-slate-700,
        .blog-content .text-slate-800 {
          color: var(--color-text-secondary) !important;
        }
        
        .blog-content .text-blue-800,
        .blog-content .text-blue-700,
        .blog-content .text-blue-600 {
          color: var(--color-accent-blue) !important;
        }
        
        /* Ensure proper colors on colored backgrounds */
        .blog-content .bg-blue-50,
        .blog-content .bg-green-50,
        .blog-content .bg-amber-50 {
          background-color: var(--color-bg-accent) !important;
          border-radius: var(--border-radius) !important;
          margin-bottom: 2rem !important;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            @apply text-3xl;
          }
          
          .blog-content h2 {
            @apply text-xl;
          }
          
          .blog-content p, .blog-content li {
            @apply text-base;
          }
        }
      `}</style>
    </div>
  );
}