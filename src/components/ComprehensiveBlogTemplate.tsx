'use client';

import React, { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50 blog-page">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Social Sharing Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="hidden md:inline">📢 Share this article:</span>
            <div className="flex gap-3">
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on Facebook"
              >
                📘 Facebook
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on Twitter"
              >
                🐦 Twitter
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on LinkedIn"
              >
                💼 LinkedIn
              </a>
              <a 
                href={socialLinks.reddit} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                aria-label="Share on Reddit"
              >
                🤝 Reddit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        {post.featuredImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                📚 {post.category}
              </span>
              <div className="flex justify-center items-center gap-4 mt-4 text-blue-100 text-sm">
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
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.subtitle}
            </p>

            {/* Reading Stats */}
            <div className="flex justify-center items-center gap-6 text-sm text-blue-100">
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
        <article className="prose prose-lg max-w-none text-gray-900 modern-prose">
          {/* Featured Image Caption */}
          {post.featuredImage?.caption && (
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 italic">
                {post.featuredImage.caption}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="blog-content text-gray-900 modern-blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Books Section */}
        {post.relatedBooks.length > 0 && (
          <section className="mt-16 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
              📚 Dive Deeper - Related Books by Charles E. MacKay
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedBooks.map((book) => (
                <Link 
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group block bg-white p-6 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex gap-4">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={80}
                      height={120}
                      className="rounded shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-600 group-hover:text-blue-800 mb-2 leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Comprehensive historical analysis with expert commentary and rare archival material.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                          £{book.price.toFixed(2)}
                        </span>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold group-hover:bg-green-700">
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
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📖 Browse All Aviation Books
              </Link>
            </div>
          </section>
        )}

        {/* Author Bio */}
        <section className="mt-16 p-8 bg-gray-100 rounded-lg">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                About {post.author.name}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {post.author.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📖 Continue Reading</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                    <h4 className="font-bold text-blue-600 group-hover:text-blue-800 mb-2 leading-tight">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{relatedPost.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>📖 {relatedPost.readingTime} min read</span>
                      <span className="text-blue-600 font-medium">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🏷️ Topics Covered</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Social Sharing Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">📢 Enjoyed this article? Share it!</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              📘 Share on Facebook
            </a>
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
            >
              🐦 Share on Twitter
            </a>
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-colors"
            >
              💼 Share on LinkedIn
            </a>
            <a 
              href={socialLinks.reddit} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              🤝 Share on Reddit
            </a>
            <a 
              href={socialLinks.email}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ✉️ Share via Email
            </a>
          </div>
          <p className="text-gray-300 text-sm mb-6">
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
                className="text-blue-600 hover:text-blue-800 text-xl"
                aria-label="Share on Facebook"
              >
                📘
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 text-xl"
                aria-label="Share on Twitter"
              >
                🐦
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 text-xl"
                aria-label="Share on LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content h2 {
          @apply text-2xl font-bold text-gray-900 mt-12 mb-6 border-b border-gray-200 pb-2;
        }
        
        .blog-content h3 {
          @apply text-xl font-semibold text-gray-800 mt-8 mb-4;
        }
        
        .blog-content p {
          @apply text-lg text-gray-700 leading-relaxed mb-6;
        }
        
        .blog-content ul, .blog-content ol {
          @apply mb-6 space-y-2;
        }
        
        .blog-content li {
          @apply text-lg text-gray-700 leading-relaxed;
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
          @apply rounded-lg shadow-md mx-auto;
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