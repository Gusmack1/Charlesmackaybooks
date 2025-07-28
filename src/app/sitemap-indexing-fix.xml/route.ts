import { NextRequest, NextResponse } from 'next/server'
import { books } from '@/data/books'

export const dynamic = 'force-dynamic'

// Generate comprehensive sitemap for better indexing
export async function GET(request: NextRequest) {
  const baseUrl = 'https://charlesmackaybooks.com'
  const currentDate = new Date().toISOString()

  // All blog posts
  const blogPosts = [
    'beardmore-aviation-scottish-industrial-giant',
    'clydeside-aviation-revolution',
    'german-aircraft-great-war-development',
    'british-aircraft-great-war-rfc-rnas',
    'sycamore-seeds-helicopter-evolution',
    'f86-sabre-cold-war-fighter',
    'luftwaffe-1945-final-year',
    'percy-pilcher-scotland-aviation-pioneer',
    'hms-argus-first-aircraft-carrier',
    'test-pilot-biography-eric-brown',
    'lucy-lady-houston-schneider-trophy',
    'adolf-rohrbach-metal-aircraft-construction',
    'supermarine-spitfire-development-history',
    'jet-age-aviation-cold-war-development',
    'hawker-hurricane-fighter-development',
    'aviation-manufacturing-wartime-production',
    'helicopter-development-pioneers',
    'naval-aviation-history'
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}" />
  </url>

  <!-- Main Navigation Pages -->
  <url>
    <loc>${baseUrl}/books</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/books" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/books" />
  </url>

  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/blog" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/blog" />
  </url>

  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/about" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/about" />
  </url>

  <url>
    <loc>${baseUrl}/research-guides</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/research-guides" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/research-guides" />
  </url>

  <url>
    <loc>${baseUrl}/for-researchers</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/for-researchers" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/for-researchers" />
  </url>

  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/contact" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/contact" />
  </url>

  <!-- Individual Book Pages with High Priority -->
  ${books.map(book => `
  <url>
    <loc>${baseUrl}/books/${book.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/books/${book.id}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/books/${book.id}" />
    <image:image>
      <image:loc>${baseUrl}${book.imageUrl || `/book-covers/${book.id}.jpg`}</image:loc>
      <image:title>${book.title} by Charles E. MacKay</image:title>
      <image:caption>Aviation history book: ${book.title}</image:caption>
    </image:image>
  </url>`).join('')}

  <!-- Blog Posts with High Priority for Content -->
  ${blogPosts.map(slug => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/blog/${slug}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/blog/${slug}" />
  </url>`).join('')}

  <!-- Category Pages -->
  <url>
    <loc>${baseUrl}/category/scottish-aviation-history</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/scottish-aviation-history" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/scottish-aviation-history" />
  </url>

  <url>
    <loc>${baseUrl}/category/wwi-aviation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/wwi-aviation" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/wwi-aviation" />
  </url>

  <url>
    <loc>${baseUrl}/category/wwii-aviation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/wwii-aviation" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/wwii-aviation" />
  </url>

  <url>
    <loc>${baseUrl}/category/jet-age-aviation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/jet-age-aviation" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/jet-age-aviation" />
  </url>

  <url>
    <loc>${baseUrl}/category/helicopter-history</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/helicopter-history" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/helicopter-history" />
  </url>

  <url>
    <loc>${baseUrl}/category/aviation-biography</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/aviation-biography" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/aviation-biography" />
  </url>

  <url>
    <loc>${baseUrl}/category/naval-aviation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/category/naval-aviation" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/category/naval-aviation" />
  </url>

  <!-- Additional Important Pages -->
  <url>
    <loc>${baseUrl}/aviation-bibliography</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/aviation-bibliography" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/aviation-bibliography" />
  </url>

  <url>
    <loc>${baseUrl}/aviation-glossary</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/aviation-glossary" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/aviation-glossary" />
  </url>

  <url>
    <loc>${baseUrl}/scottish-aviation-timeline</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/scottish-aviation-timeline" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/scottish-aviation-timeline" />
  </url>

  <url>
    <loc>${baseUrl}/how-to-order</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}/how-to-order" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/how-to-order" />
  </url>

</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
