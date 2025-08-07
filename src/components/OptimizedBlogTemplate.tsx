'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Share2, BookOpen, Clock, User, Calendar, Tag, ChevronRight, Heart, MessageCircle } from 'lucide-react';

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
}

interface OptimizedBlogTemplateProps {
  post: BlogPost;
}

export default function OptimizedBlogTemplate({ post }: OptimizedBlogTemplateProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
        <div 
          className="h-full bg-accent-blue transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b py-4 mb-8 z-40">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted">
            <span>Books</span>
            <ChevronRight className="w-4 h-4" />
            <span>Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent-blue">{post.category}</span>
          </div>
          
          {/* Social Sharing Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleShare('twitter')}
              className="p-2 text-muted hover:text-accent-blue transition-colors"
              aria-label="Share on Twitter"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="p-2 text-muted hover:text-accent-blue transition-colors"
              aria-label="Share on Facebook"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              aria-label="Like this post"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block badge badge-blue text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-xl text-secondary mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-secondary mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By {post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{shareCount} shares</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 badge badge-gray text-xs rounded-md"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            priority
          />
        </div>
        {post.featuredImage.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {post.featuredImage.caption}
          </p>
        )}
      </div>

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div className="mb-8 p-6 card-compact rounded-lg">
          <button
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-2"
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
          dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
        />
      </div>

      {/* Author Bio */}
      <div className="mb-12 p-6 card-compact rounded-lg">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover rounded-full"
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
              className="text-accent-blue hover:text-blue-700 font-medium"
            >
              Contact the author
            </a>
          </div>
        </div>
      </div>

      {/* Related Books */}
      {post.relatedBooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Related Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.relatedBooks.map((book) => (
              <div key={book.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p className="font-bold text-green-600">${book.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {post.relatedPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{relatedPost.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Auto-related books */}
      <PostRelatedBooks category={post.category} tags={post.tags} />

      {/* Social Sharing Footer */}
      <div className="border-t pt-8">
        <div className="text-center">
          <p className="text-secondary mb-4">Share this article</p>
          <div className="flex justify-center gap-4">
            {['twitter', 'facebook', 'linkedin', 'pinterest', 'email'].map((platform) => (
              <button
                key={platform}
                onClick={() => handleShare(platform)}
                className="px-4 py-2 badge badge-gray rounded-lg transition-colors capitalize"
              >
                {platform}
              </button>
            ))}
          </div>
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