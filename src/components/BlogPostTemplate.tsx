import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

// Types for the blog post template
interface BlogPostProps {
  title: string
  description: string
  author: {
    name: string
    email: string
    bio: string
    image: string
    location: string
  }
  publishDate: string
  readingTime: number
  category: string
  tags: string[]
  featuredImage: {
    src: string
    alt: string
    caption?: string
  }
  content: React.ReactNode
  relatedBooks?: Array<{
    id: string
    title: string
    price: number
    imageUrl: string
    description: string
  }>
  relatedPosts?: Array<{
    slug: string
    title: string
    excerpt: string
    image: string
  }>
  schemaData?: object
}

// Social Share Component
const SocialShare: React.FC<{
  url: string
  title: string
  description: string
  hashtags: string[]
}> = ({ url, title, description, hashtags }) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`
  }

  const handleShare = (platform: string) => {
    const shareUrl = shareUrls[platform as keyof typeof shareUrls]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <>
      {/* Floating Social Bar */}
      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white rounded-lg shadow-lg p-3 space-y-3">
          <button
            onClick={() => handleShare('facebook')}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
            aria-label="Share on Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('pinterest')}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            aria-label="Share on Pinterest"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('email')}
            className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            aria-label="Share via Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Social Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mt-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Share This Article</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(shareUrls).map(([platform, url]) => (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
            >
              <span className="capitalize">{platform}</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// Reading Progress Bar
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Table of Contents Component
const TableOfContents: React.FC<{ headings: Array<{ id: string; text: string; level: number }> }> = ({ headings }) => {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="bg-slate-50 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
        <span className="text-blue-600 mr-2">📖</span>
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-2 rounded transition-colors text-sm ${
                activeId === heading.id
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              style={{ paddingLeft: `${(heading.level - 2) * 16 + 8}px` }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Related Books Component
const RelatedBooks: React.FC<{ books: Array<{ id: string; title: string; price: number; imageUrl: string; description: string }> }> = ({ books }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        📚 Related Aviation History Books by Charles E. MacKay
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{book.title}</h3>
            <p className="text-slate-700 mb-4 text-sm">{book.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">£{book.price}</span>
              <Link
                href={`/books/${book.id}`}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                View Book
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/books"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          🛒 Browse All Aviation Books
        </Link>
      </div>
    </section>
  )
}

// Related Posts Component
const RelatedPosts: React.FC<{ posts: Array<{ slug: string; title: string; excerpt: string; image: string }> }> = ({ posts }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        📖 Related Blog Posts
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="bg-white rounded-lg p-6 shadow-md group-hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={80}
                  height={60}
                  className="rounded flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-700 text-sm">{post.excerpt}</p>
                  <div className="text-blue-600 text-sm mt-2">Read more →</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Author Bio Component
const AuthorBio: React.FC<{ author: { name: string; email: string; bio: string; image: string; location: string } }> = ({ author }) => {
  return (
    <div className="bg-slate-100 rounded-lg p-8">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600">
          {author.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{author.name}</h3>
          <p className="text-slate-700 mb-3">
            Aviation Historian & Author specializing in Scottish Aviation History, WWI & WWII Aircraft
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{author.bio}</p>
          <div className="flex items-center space-x-4 mt-4 text-sm">
            <span className="text-slate-600">📧 {author.email}</span>
            <span className="text-slate-600">📍 {author.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Blog Post Template Component
const BlogPostTemplate: React.FC<BlogPostProps> = ({
  title,
  description,
  author,
  publishDate,
  readingTime,
  category,
  tags,
  featuredImage,
  content,
  relatedBooks = [],
  relatedPosts = [],
  schemaData
}) => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const hashtags = tags.map(tag => tag.replace(/\s+/g, ''))

  // Generate table of contents from headings (this would be extracted from content)
  const headings = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'early-development', text: 'Early Development', level: 2 },
    { id: 'technical-innovations', text: 'Technical Innovations', level: 2 },
    { id: 'impact-legacy', text: 'Impact and Legacy', level: 2 }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <ReadingProgress />
      
      {/* Schema Markup */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <article>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
                {category}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                {title}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200 mb-6">
                <span>By {author.name}</span>
                <span>•</span>
                <span>{new Date(publishDate).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
            {featuredImage.caption && (
              <p className="text-sm text-slate-600 text-center p-4 italic">
                {featuredImage.caption}
              </p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Table of Contents */}
          {headings.length > 0 && <TableOfContents headings={headings} />}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <div className="font-serif text-lg leading-relaxed" style={{ maxWidth: '70ch' }}>
              {content}
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && <RelatedBooks books={relatedBooks} />}

          {/* Related Posts */}
          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

          {/* Social Share */}
          <SocialShare
            url={pageUrl}
            title={title}
            description={description}
            hashtags={hashtags}
          />

          {/* Author Bio */}
          <AuthorBio author={author} />
        </div>
      </article>
    </div>
  )
}

export default BlogPostTemplate 