'use client';

import React, { useState, useEffect } from 'react';
import PostRelatedBooks from '@/components/PostRelatedBooks';
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
  const [readingProgress, setReadingProgress] = useState(0);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const fallbackSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%230256d4'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><g fill='white' font-family='Source Sans 3, Arial' text-anchor='middle'><text x='300' y='185' font-size='28'>Image unavailable</text><text x='300' y='225' font-size='16'>Charles E. MacKay Aviation History</text></g></svg>`
  );

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

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
      setShowSocialShare(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-white blog-page">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Social Sharing Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="hidden md:inline text-secondary font-medium">📢 Share this article:</span>
            <div className="flex gap-3">
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="badge badge-blue px-4 py-2 rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2"
                aria-label="Share on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="badge badge-blue px-4 py-2 rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="badge badge-blue px-4 py-2 rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href={socialLinks.reddit} 
                target="_blank" 
                rel="noopener noreferrer"
                className="badge badge-red px-4 py-2 rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2"
                aria-label="Share on Reddit"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Reddit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
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
            dangerouslySetInnerHTML={{ __html: ensureThreeImages(post.content) }}
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

        {/* Auto-related books by category/tags */}
        <PostRelatedBooks category={post.category} tags={post.tags} />

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

        {/* Tags */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-primary mb-4">🏷️ Topics Covered</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="badge badge-gray px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Social Sharing Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">📢 Enjoyed this article? Share it!</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="badge badge-blue px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share on Facebook
            </a>
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="badge badge-blue px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share on Twitter
            </a>
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="badge badge-blue px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share on LinkedIn
            </a>
            <a 
              href={socialLinks.reddit} 
              target="_blank" 
              rel="noopener noreferrer"
              className="badge badge-red px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Share on Reddit
            </a>
            <a 
              href={socialLinks.email}
              className="badge badge-gray px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Share via Email
            </a>
          </div>
          <p className="text-white/80 text-sm mb-6">
            Help us reach more aviation enthusiasts by sharing this expert analysis!
          </p>
          

        </div>
      </div>

      {/* Floating Social Share (Mobile) */}
      {showSocialShare && (
        <div className="fixed bottom-4 right-4 md:hidden z-40">
          <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
            <div className="flex gap-2">
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#166FE5] p-2"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1DA1F2] hover:text-[#1A91DA] p-2"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-[#0958A5] p-2"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

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
          @apply border-l-4 border-blue-400 bg-blue-50 p-6 my-8 italic text-gray-800;
        }
        
        .blog-content .bg-amber-50 {
          @apply rounded-lg mb-8;
        }
        
        .blog-content .bg-blue-50 {
          @apply rounded-lg mb-8;
        }
        
        .blog-content .bg-green-50 {
          @apply rounded-lg mb-8;
        }
        
        .blog-content a {
          @apply text-blue-600 hover:text-blue-800 underline;
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