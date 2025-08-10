'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Comment system removed per request

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
  const fallbackSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%230256d4'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><g fill='white' font-family='Source Sans 3, Arial' text-anchor='middle'><text x='300' y='185' font-size='28'>Image unavailable</text><text x='300' y='225' font-size='16'>Charles E. MacKay Aviation History</text></g></svg>`
  )

  const addFallbackToAllImages = (html: string): string =>
    html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
      let updated = attrs
      if (!/\balt\s*=/.test(updated)) updated += ' alt="Aviation history image"'
      updated = updated.replace(/\bshadow-[^\s"]+/g, '')
      if (!/\bclass\s*=/.test(updated)) updated += ' class="rounded-lg"'
      if (!/\bonerror=/.test(updated)) {
        updated += ` onerror=\\"this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'\\"`
      }
      return `<img ${updated}>`
    })

  const ensureThreeImages = (html: string): string => {
    const imgMatches = html.match(/<img\s+[^>]*src=/gi) || []
    if (imgMatches.length >= 3) return html
    const candidates: string[] = []
    if (blog.featuredImage?.url) candidates.push(blog.featuredImage.url)
    if (relatedBooks && relatedBooks.length > 0) {
      candidates.push(...relatedBooks.map(b => b.imageUrl).filter(Boolean))
    }
    while (candidates.length < 3) {
      candidates.push(`data:image/svg+xml;utf8,${fallbackSvg}`)
    }
    const blocksNeeded = 3 - imgMatches.length
    const blocks = Array.from({ length: blocksNeeded }).map((_, idx) =>
      `<figure class=\\"my-6\\"><img src=\\"${candidates[idx]}\\" alt=\\"Historical aviation reference image\\" onerror=\\"this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'\\" class=\\"w-full h-auto rounded-lg\\"/><figcaption class=\\"image-caption text-center text-sm text-secondary mt-2 italic\\">Historical reference image</figcaption></figure>`
    )
    return html + blocks.join('')
  }

  const processContent = (html: string): string => addFallbackToAllImages(ensureThreeImages(html))

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
    <div className="bg-background">
      {/* Reading progress bar removed to avoid jank */}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Main Content */}
        <div className="py-4">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">{blog.title}</h1>
              {blog.subtitle && (
                <h2 className="text-xl text-secondary mb-4">{blog.subtitle}</h2>
              )}
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
                dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
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
                        <span>{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags removed per request */}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="card-compact rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">📖 Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}
                          className="block card p-4 hover:shadow-sm transition-shadow">
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

      {/* Mobile Floating Share removed for simplicity */}

      {/* Bottom Social Sharing removed per request */}

      {/* Comment System removed */}
    </div>
  )
}