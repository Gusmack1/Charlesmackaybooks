'use client'

interface PageSEOProps {
  title: string
  description: string
  path: string
  type?: 'website' | 'article' | 'book'
  image?: string
  price?: number
  isbn?: string
}

export default function PageSEO({
  title,
  description,
  path,
  type = 'website',
  image,
  price,
  isbn
}: PageSEOProps) {
  const baseUrl = 'https://charlesmackaybooks.com'
  const fullUrl = `${baseUrl}${path}`

  // No-op: canonical and SEO are handled centrally via Next.js metadata in layout.tsx
  return null
}

// Export metadata generation helper
export function generatePageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
  price,
  isbn
}: PageSEOProps) {
  const baseUrl = 'https://charlesmackaybooks.com'
  const fullUrl = `${baseUrl}${path}`
  const fullImage = image?.startsWith('http') ? image : `${baseUrl}${image || '/charles-mackay-aviation-historian.jpg'}`

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Charles E. MacKay Aviation Books',
      images: [{ url: fullImage, width: 1200, height: 630, alt: title }],
      type: type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}
