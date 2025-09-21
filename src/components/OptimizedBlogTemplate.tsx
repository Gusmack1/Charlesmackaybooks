'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { getApprovedFeatured, getApprovedInline } from '@/utils/approvedImageResolver'

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
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
    caption?: string;
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
  references?: Array<{
    title: string;
    url: string;
    source?: string;
    date?: string;
  }>;
}

interface OptimizedBlogTemplateProps {
  post: BlogPost;
}

export default function OptimizedBlogTemplate({ post }: OptimizedBlogTemplateProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  // Image fallbacks and content processing (ensure at least 3 images, add onerror fallbacks)
  const fallbackSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%230256d4'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><g fill='white' font-family='Source Sans 3, Arial' text-anchor='middle'><text x='300' y='185' font-size='28'>Image unavailable</text><text x='300' y='225' font-size='16'>Charles E. MacKay Aviation History</text></g></svg>`
  );

  const addFallbackToAllImages = (html: string): string => {
    return html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
      let updated = attrs;
      if (!/\balt\s*=/.test(updated)) {
        updated += ' alt="Aviation history image"';
      }
      updated = updated.replace(/\bshadow-[^\s"]+/g, '');
      if (!/\bclass\s*=/.test(updated)) {
        updated += ' class="rounded-lg"';
      }
      if (!/\bonerror=/.test(updated)) {
        updated += ` onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'"`;
      }
      return `<img ${updated}>`;
    });
  };

  const ensureThreeImages = (html: string): string => {
    // Ensure at least 4 images present in the article content
    const minimumImages = 4;
    const imgMatches = html.match(/<img\s+[^>]*src=/gi) || [];
    if (imgMatches.length >= minimumImages) return html;
    const candidates: string[] = [];
    if (post.featuredImage?.url) candidates.push(post.featuredImage.url);
    if (post.relatedBooks && post.relatedBooks.length > 0) {
      candidates.push(...post.relatedBooks.map(b => b.cover).filter(Boolean));
    }
    while (candidates.length < minimumImages) {
      candidates.push(`data:image/svg+xml;utf8,${fallbackSvg}`);
    }
    const blocksNeeded = minimumImages - imgMatches.length;
    const blocks = Array.from({ length: blocksNeeded }).map((_, idx) =>
      `<figure class="my-6"><img src="${candidates[idx]}" alt="Historical aviation reference image" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'" class="w-full h-auto rounded-lg"/><figcaption class="image-caption">Historical reference image</figcaption></figure>`
    );
    return html + blocks.join('');
  };

  // Tidy images and ensure a minimum number of inline visuals
  const processContent = (html: string): string => ensureThreeImages(addFallbackToAllImages(html));

  // Replace any inline placeholders with approved images for this post
  const replacePlaceholdersWithApproved = (html: string): string => {
    if (!approvedInline || approvedInline.length === 0) return html;
    // do not reuse featured image to avoid duplicates
    const pool = approvedInline.filter(img => img.url !== (featured.url || ''))
    let useIndex = 0;
    return html.replace(/<img\s+([^>]*?)src=(['"])\/blog-images\/default-generic\.svg\2([^>]*)>/gi, (match, pre, quote, post) => {
      const cand = pool[useIndex++];
      if (!cand) return match;
      let attrs = pre + post;
      if (!/\balt\s*=/.test(attrs)) {
        attrs = attrs.replace(/\s*>$/, '') + ` alt="${cand.alt || 'Aviation history image'}"`;
      }
      if (cand.caption && !/\btitle\s*=/.test(attrs)) {
        attrs = attrs.replace(/\s*>$/, '') + ` title="${cand.caption.replace(/"/g,'\\"')}"`;
      }
      return `<img ${pre}src="${cand.url}"${post}>`;
    });
  };

  // Replace generic placeholder caption text with approved captions (in order)
  const replaceGenericCaptions = (html: string): string => {
    const generic = 'Where period photography is unavailable, we use curated placeholders and continue to source verified, license-compliant images for archival completeness.';
    if (approvedInline.length === 0) return html;
    let useIndex = 0;
    return html.replace(new RegExp(generic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), () => {
      const next = approvedInline[useIndex++]?.caption;
      return next || generic;
    });
  };

  // Match specific images with their correct captions
  const matchImagesWithCaptions = (html: string): string => {
    if (!approvedInline || approvedInline.length === 0) return html;
    
    // Create a mapping of image URLs to their captions
    const imageCaptionMap = new Map();
    approvedInline.forEach(img => {
      if (img.url && img.caption) {
        // Extract filename from URL for matching
        const filename = img.url.split('/').pop()?.split('?')[0];
        if (filename) {
          imageCaptionMap.set(filename, img.caption);
        }
      }
    });

    // Replace img tags with their correct captions
    return html.replace(/<img\s+([^>]*?)src=(['"])([^'"]+)\2([^>]*)>/gi, (match, pre, quote, src, post) => {
      const filename = src.split('/').pop()?.split('?')[0];
      const caption = imageCaptionMap.get(filename);
      
      if (caption) {
        // Add or update the title attribute with the correct caption
        let attrs = pre + post;
        if (!/\btitle\s*=/.test(attrs)) {
          attrs = attrs.replace(/\s*>$/, '') + ` title="${caption.replace(/"/g,'\\"')}"`;
        } else {
          // Replace existing title
          attrs = attrs.replace(/\btitle\s*=\s*['"][^'"]*['"]/, `title="${caption.replace(/"/g,'\\"')}"`);
        }
        return `<img ${pre}src="${src}"${post}>`;
      }
      
      return match;
    });
  };

  const stripShareUI = (html: string): string => {
    let output = html
    output = output.replace(/<div[^>]*>\s*<h[1-6][^>]*>[^<]*Share This Article[^<]*<\/h[1-6]>[\s\S]*?<\/div>/gi, '')
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

  // Removed reading progress tracking to avoid scroll jank

  // Generate table of contents from content
  const generateTableOfContents = (content: string) => {
    const headings = content.match(/<h[2-6][^>]*>.*?<\/h[2-6]>/g) || [];
    return headings.map((heading, index) => {
      const level = parseInt(heading.match(/h([2-6])/)?.[1] || '2');
      const text = heading.replace(/<[^>]*>/g, '');
      const id = `heading-${index}`;
      return { level, text, id };
    });
  };

  const tableOfContents = generateTableOfContents(post.content);

  const handleNextImageError = (e: any) => {
    try {
      const img = e.currentTarget as HTMLImageElement;
      img.src = `data:image/svg+xml;utf8,${fallbackSvg}`;
    } catch {}
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
      setShareCount(prev => prev + 1);
    }
  };

  const featured = getApprovedFeatured(post.id, post.featuredImage?.url, post.featuredImage?.alt)
  const approvedInline = getApprovedInline(post.id, 4)

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">

      {/* Breadcrumbs only (share removed) */}
      <nav className="mb-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted">
            <span>Books</span>
            <ChevronRight className="w-4 h-4" />
            <span>Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent-blue">{post.category}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="mb-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white rounded-lg p-6">
        
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={featured.url || post.featuredImage.url}
            alt={featured.alt || post.featuredImage.alt}
            width={1200}
            height={630}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
            priority
            className="w-full aspect-[16/9] object-cover"
            onError={handleNextImageError}
          />
        </div>
        {(featured.caption || post.featuredImage.caption) && (
          <p className="text-sm text-secondary text-center mt-2 italic">
            {featured.caption || post.featuredImage.caption}
          </p>
        )}
      </div>

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div className="mb-8 p-6 card-compact rounded-lg">
          <button
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            className="flex items-center justify-between w-full text-left font-semibold text-primary mb-2"
          >
            <span>Table of Contents</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showTableOfContents ? 'rotate-90' : ''}`} />
          </button>
          
          {showTableOfContents && (
            <nav className="space-y-2">
              {tableOfContents.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`block text-sm text-secondary hover:text-accent-blue transition-colors ${
                    item.level > 2 ? 'ml-4' : ''
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* Article Content */}
      <div className="content max-w-none mb-12">
        <div 
          dangerouslySetInnerHTML={{ __html: stripShareUI(matchImagesWithCaptions(replaceGenericCaptions(replacePlaceholdersWithApproved(processContent(post.content))))) }}
        />
        {/* No extra image grid; placeholders only */}

      {/* References */}
      {Array.isArray(post.references) && post.references.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-primary mb-2">References</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-secondary">
            {post.references.map((ref, idx) => (
              <li key={idx}>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="underline text-accent-blue">
                  {ref.title}
                </a>
                {ref.source ? ` — ${ref.source}` : ''}
                {ref.date ? ` (${ref.date})` : ''}
              </li>
            ))}
          </ol>
        </section>
      )}
      </div>

      {/* Author Bio */}
      <div className="mb-12 p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover rounded-full"
              onError={handleNextImageError}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary mb-2">
              About {post.author.name}
            </h3>
            <p className="text-secondary mb-3 leading-relaxed">
              {post.author.bio}
            </p>
            <a 
              href={`mailto:${post.author.email}`}
              className="text-accent-blue hover:text-accent-blue font-medium"
            >
              Contact the author
            </a>
          </div>
        </div>
      </div>

      {/* Related Books - Always show a book link */}
      <section className="mb-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {post.relatedBooks.length > 0 ? 'Related Books' : 'Explore Charles E. MacKay\'s Books'}
          </h2>
          <a href="/books" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">Browse all books</a>
        </div>
        
        {post.relatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.relatedBooks.map((book) => (
              <a key={book.id} href={`/books/${book.id}`} className="group block">
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 p-4 hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-3">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity"
                      onError={handleNextImageError}
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">by {book.author}</p>
                  <p className="font-bold text-slate-900 dark:text-white">£{book.price}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            Dive deeper into aviation and Scottish industrial history with our full catalogue of meticulously researched titles.
          </p>
        )}
      </section>

      {/* Related Posts */}
      {post.relatedPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group cursor-pointer">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleNextImageError}
                  />
                </div>
                <h3 className="font-semibold text-primary mb-2 group-hover:text-accent-blue transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-secondary text-sm mb-2 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock className="w-3 h-3" />
                  <span>{relatedPost.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Auto-related books removed to avoid duplicate related sections */}

      {/* Simple Share removed */}

      {/* Sticky Buy Books (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-white text-sm">📚 Browse Charles’s aviation books</span>
          <a href="/books" className="badge badge-blue px-4 py-2 rounded-lg font-semibold">Buy Books</a>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featuredImage.url,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "email": post.author.email
            },
            "publisher": {
              "@type": "Organization",
              "name": "Charles Mackay Books",
              "logo": {
                "@type": "ImageObject",
                "url": "https://charlesmackaybooks.com/logo.png"
              }
            },
            "datePublished": post.publishedDate,
            "dateModified": post.publishedDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": typeof window !== 'undefined' ? window.location.href : ''
            }
          })
        }}
      />
    </article>
  );
}