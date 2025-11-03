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
    url: 'https://charlesmackaybooks.com/blog/beardmore-aviation-scottish-industrial-giant/",
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
  },