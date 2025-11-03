import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'

export const metadata: Metadata = {
  title: `William Beardmore & Company: Scottish Aviation Pioneer | Charles E. MacKay`,
  description: 'The remarkable story of how a Scottish shipbuilding company became a major force in early aviation manufacturing.',
  keywords: ["Beardmore","Scottish Aviation","Industrial History","Manufacturing","WWI"],
  openGraph: {
    title: `William Beardmore & Company: Scottish Aviation Pioneer`,
    description: 'The remarkable story of how a Scottish shipbuilding company became a major force in early aviation manufacturing.',
    url: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant/',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: '/blog-images/beardmore-parkhead-forge.jpg',
      width: 1200,
      height: 630,
      alt: 'William Beardmore & Company: Scottish Aviation Pioneer'
    }],
    locale: 'en_GB',
    type: 'article',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant/'
  }
}

const post = {
  id: 'beardmore-aviation-scottish-industrial-giant',
  title: 'William Beardmore & Company: Scottish Aviation Pioneer',
  subtitle: 'The remarkable story of how a Scottish shipbuilding company became a major force in early aviation manufacturing.',
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>
      William Beardmore & Company stands as one of Scotland's most significant industrial enterprises, 
      seamlessly transitioning from shipbuilding to aviation manufacturing during the crucial early decades 
      of powered flight. This article explores Beardmore's aviation achievements, from airship construction 
      to fighter production, and their lasting impact on British aviation.
    </p>
  `,
  excerpt: 'The remarkable story of how a Scottish shipbuilding company became a major force in early aviation manufacturing.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 15,
  featuredImage: {
    url: '/blog-images/beardmore-parkhead-forge.jpg',
    alt: 'William Beardmore & Company: Scottish Aviation Pioneer',
    caption: 'William Beardmore & Company: Scottish Aviation Pioneer - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ['Beardmore', 'Scottish Aviation', 'Industrial History', 'Manufacturing', 'WWI'],
  relatedBooks: getBooksData(['beardmore-aviation', 'clydeside-aviation-vol1', 'british-aircraft-great-war']),
  relatedPosts: []
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/beardmore-aviation-scottish-industrial-giant"
      />
      <ComprehensiveBlogTemplate post={post} />
    </>
  )
}