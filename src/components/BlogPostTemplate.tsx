'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CommentSystem from './CommentSystem'

interface BlogData {
  title: string
  subtitle?: string
  excerpt: string
  content: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    bio: string
    credentials: string[]
  }
  featuredImage: {
    url: string
    alt: string
    caption: string
  }
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
}

interface RelatedBook {
  id: string
  title: string
  price: number
  imageUrl: string
  description: string
  relevantContent: string
}

interface BlogPostTemplateProps {
  blog: BlogData
  relatedBooks: RelatedBook[]
  relatedPosts: Array<{
    slug: string
    title: string
    excerpt: string
    imageUrl: string
    readTime: string
  }>
}

export default function BlogPostTemplate({ blog, relatedBooks, relatedPosts }: BlogPostTemplateProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(Math.max(progress, 0), 100))
    }

    const updateActiveSection = () => {
      const sections = blog.tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean)
      const currentSection = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    const handleScroll = () => {
      updateReadingProgress()
      updateActiveSection()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [blog.tableOfContents])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = blog.title
  const shareText = `Expert aviation analysis: ${blog.title} by Charles E. MacKay - ${blog.excerpt.substring(0, 100)}...`

  const socialShares = {
    facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&hashtags=AviationHistory`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${blog.featuredImage.url}&description=${encodeURIComponent(shareTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=Check out this aviation history analysis: ${shareUrl}`
  }

  return (
    <div className="bg-white">
      {/* Reading progress bar removed to avoid jank */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Table of Contents Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 pt-4">
              <div className="card-compact rounded-lg p-4 border">
                <h3 className="font-semibold text-primary mb-4">📋 Table of Contents</h3>
                <nav className="space-y-2">
                  {blog.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm transition-colors hover:text-accent-blue ${
                        activeSection === item.id ? 'text-accent-blue font-medium' : 'text-secondary'
                      } ${item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-4' : 'pl-8'}`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 py-8">
            {/* Article Header */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="badge badge-blue px-3 py-1 rounded-full text-sm font-medium">
                  {blog.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{blog.title}</h1>
              {blog.subtitle && (
                <h2 className="text-xl text-secondary mb-6">{blog.subtitle}</h2>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-6">
                <div className="flex items-center">
                  <span className="font-medium">📅 Published:</span>
                  <span className="ml-1">{blog.publishDate}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">📖 Read time:</span>
                  <span className="ml-1">{blog.readTime}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">✍️ By:</span>
                  <span className="ml-1">{blog.author.name}</span>
                </div>
              </div>

              <p className="text-lg text-secondary leading-relaxed">{blog.excerpt}</p>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={blog.featuredImage.url}
                  alt={blog.featuredImage.alt}
                  width={1200}
                  height={630}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                  priority
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
              {blog.featuredImage.caption && (
                <p className="text-sm text-secondary mt-2 italic text-center">
                  {blog.featuredImage.caption}
                </p>
              )}
            </div>

            {/* Related Books Promotion - Early Placement */}
            {relatedBooks.length > 0 && (
              <div className="card-compact bg-accent-green text-white rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">📚 Learn More in Our Books</h3>
                <p className="text-white mb-4">
                  This analysis is based on extensive research featured in Charles E. MacKay's authoritative books:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedBooks.slice(0, 2).map((book) => (
                    <Link key={book.id} href={`/books/${book.id}`} 
                          className="block card hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <Image
                          src={book.imageUrl}
                          alt={book.title}
                          width={60}
                          height={84}
                          className="rounded flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary mb-2">{book.title}</h4>
                                                      <p className="text-sm text-secondary mb-2">{book.relevantContent}</p>
                          <div className="text-white font-semibold">£{book.price} - Order Now →</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8 blog-content">
              <div 
                className="text-primary leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Author Bio */}
            <div className="card-compact bg-accent-blue text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">👨‍🎓 About the Author</h3>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {blog.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">{blog.author.name}</h4>
                  <p className="text-white/90 mb-3">{blog.author.bio}</p>
                  <div className="space-y-1">
                    {blog.author.credentials.map((credential, index) => (
                      <div key={index} className="flex items-center text-sm text-accent-blue">
                        <span className="mr-2">🏛️</span>
                        {credential}
                      </div>
                    ))}
                  </div>
                </div>
                        {credential}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
                              <h4 className="font-semibold text-primary mb-3">🏷️ Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                                          <span key={tag} className="badge badge-gray px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="card-compact rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">📖 Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}
                          className="block bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={80}
                          height={60}
                          className="rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                                                      <h4 className="font-semibold text-primary mb-2 line-clamp-2">{post.title}</h4>
                            <p className="text-sm text-secondary mb-2 line-clamp-2">{post.excerpt}</p>
                          <div className="text-xs text-accent-blue font-medium">
                            📖 {post.readTime} read →
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Share */}
      <div className="fixed bottom-4 right-4 md:hidden z-40">
        <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
          <div className="flex gap-2">
            <a href={socialShares.facebook} target="_blank" rel="noopener noreferrer"
                                 className="text-accent-blue hover:text-blue-800 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center" 
               aria-label="Share on Facebook">
              📘
            </a>
            <a href={socialShares.twitter} target="_blank" rel="noopener noreferrer"
                                 className="text-accent-blue hover:text-blue-600 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center" 
               aria-label="Share on Twitter">
              🐦
            </a>
            <a href={socialShares.linkedin} target="_blank" rel="noopener noreferrer"
               className="text-accent-blue hover:text-blue-900 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center" 
               aria-label="Share on LinkedIn">
              💼
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Social Sharing */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">📢 Enjoyed this analysis? Share it!</h3>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <a href={socialShares.facebook} target="_blank" rel="noopener noreferrer"
               className="badge badge-blue px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              📘 Share on Facebook
            </a>
            <a href={socialShares.twitter} target="_blank" rel="noopener noreferrer"
               className="badge badge-blue px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              🐦 Share on Twitter
            </a>
            <a href={socialShares.linkedin} target="_blank" rel="noopener noreferrer"
               className="badge badge-blue px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              💼 Share on LinkedIn
            </a>
            <a href={socialShares.pinterest} target="_blank" rel="noopener noreferrer"
               className="badge badge-red px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              📌 Share on Pinterest
            </a>
            <a href={socialShares.email}
               className="badge badge-gray px-6 py-3 rounded-lg transition-colors min-h-[44px] flex items-center">
              ✉️ Share via Email
            </a>
          </div>
          <p className="text-white/70 text-sm">
            Help us reach more aviation enthusiasts by sharing this expert analysis!
          </p>
        </div>
      </div>

      {/* Comment System */}
      <CommentSystem 
        postSlug={blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        postTitle={blog.title}
      />
    </div>
  )
}