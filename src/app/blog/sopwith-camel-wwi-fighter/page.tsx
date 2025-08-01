import type { Metadata } from 'next'
import OptimizedBlogTemplate from '@/components/OptimizedBlogTemplate'

export const metadata: Metadata = {
  title: 'Sopwith Camel Wwi Fighter | Charles E. MacKay',
  description: 'Expert analysis and historical insights into Sopwith Camel Wwi Fighter',
  keywords: ['Sopwith Camel Wwi Fighter', 'Aviation History', 'Charles MacKay'],
  openGraph: {
    title: 'Sopwith Camel Wwi Fighter',
    description: 'Expert analysis and historical insights into Sopwith Camel Wwi Fighter',
    url: 'https://charlesmackaybooks.com/blog/sopwith-camel-wwi-fighter',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/sopwith-camel-wwi-fighter.jpg',
        width: 1200,
        height: 630,
        alt: 'Sopwith Camel Wwi Fighter'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sopwith Camel Wwi Fighter',
    description: 'Expert analysis and historical insights into Sopwith Camel Wwi Fighter',
    images: ['/blog-images/sopwith-camel-wwi-fighter.jpg'],
  },
}

const post = {
  id: 'sopwith-camel-wwi-fighter',
  title: 'Sopwith Camel Wwi Fighter',
  subtitle: 'Expert analysis and historical insights into Sopwith Camel Wwi Fighter',
  content: `
    <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
      <p class="text-xl leading-relaxed text-gray-800 m-0">
        <strong>Aviation Excellence:</strong> Expert analysis and historical insights into Sopwith Camel Wwi Fighter
      </p>
    </div>

    <p class="text-xl leading-relaxed text-gray-700 mb-6">
      This comprehensive article explores the fascinating history and development of this significant aviation subject. Through detailed analysis and expert research, we uncover the stories, technical innovations, and historical impact that make this topic essential reading for aviation enthusiasts.
    </p>

    <h2>Historical Background</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      The historical context surrounding this aviation development reveals the complex interplay of technological innovation, military necessity, and industrial capability that shaped aviation progress.
    </p>

    <h2>Technical Development</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      Technical specifications and engineering innovations demonstrate the remarkable achievements of aviation pioneers and their lasting impact on aircraft design and performance.
    </p>

    <h2>Operational History</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      Service history and operational deployment showcase the real-world performance and strategic significance of these aviation developments in military and civilian contexts.
    </p>

    <h2>Legacy and Impact</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      The lasting influence and continued relevance of these aviation innovations continue to shape modern aerospace development and inspire new generations of aviation enthusiasts.
    </p>
  `,
  excerpt: 'Expert analysis and historical insights into Sopwith Camel Wwi Fighter',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in military and civilian aircraft development.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charles@charlesmackaybooks.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 10,
  featuredImage: {
    url: '/blog-images/sopwith-camel-wwi-fighter.jpg',
    alt: 'Sopwith Camel Wwi Fighter',
    caption: 'Sopwith Camel Wwi Fighter'
  },
  category: 'Aviation History',
  tags: ['Sopwith Camel Wwi Fighter', 'Aviation History', 'Charles MacKay'],
  relatedBooks: [],
  relatedPosts: []
};

export default function BlogPage() {
  return <OptimizedBlogTemplate post={post} />;
}