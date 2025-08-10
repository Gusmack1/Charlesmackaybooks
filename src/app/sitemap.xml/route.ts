import { books } from '@/data/books'

function xml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap(): string {
  const domain = 'https://charlesmackaybooks.com'
  const today = new Date().toISOString().slice(0, 10)

  const homepage = `
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

  // Map existing book ids to clean pretty paths per requested list
  const prettyMap: Record<string, string> = {
    'beardmore-aviation': '/books/beardmore-aviation',
    'clydeside-aviation-vol1': '/books/clydeside-aviation-vol-1',
    'clydeside-aviation-vol2': '/books/clydeside-aviation-vol-2',
    'german-aircraft-great-war': '/books/german-military-aircraft-wwi',
    'british-aircraft-great-war': '/books/british-military-aircraft-wwi',
    'sycamore-seeds': '/books/the-rotorheads',
    'captain-eric-brown': '/books/test-pilot',
    'sabres-from-north': '/books/f86-sabre-european-service',
    'enemy-luftwaffe-1945': '/books/luftwaffe-year-one-1945',
    'flying-for-kaiser': '/books/german-pilots-wwi',
    'soaring-with-wings': '/books/percy-pilcher-aviation-pioneer',
    'mother-of-the-few': '/books/lucy-lady-houston',
    'dieter-dengler': '/books/dieter-dengler-skyraider',
    'modern-furniture': '/books/morris-furniture-company',
    'birth-atomic-bomb': '/books/the-nuclear-bomb',
    'aircraft-carrier-argus': '/books/hms-argus',
    'dorothy-wordsworth': '/books/dorothy-wordsworths-tour',
    'adolf-rohrbach': '/books/adolf-rohrbach'
  }

  const bookUrls = books
    .map((b) => {
      const path = prettyMap[b.id] || `/books/${xml(b.id)}`
      return `
  <url>
    <loc>${domain}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    })
    .join('\n')

  // Product hash anchors for Merchant Center and Rich Results crawling
  const productAnchors = books
    .map((b) => {
      const hash = (b.isbn || b.id)
      return `
  <url>
    <loc>${domain}#${xml(String(hash))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('\n')

  const staticUrls = [
    { path: '/about', priority: '0.8' },
    { path: '/contact', priority: '0.7' },
    { path: '/how-to-order', priority: '0.6' },
    { path: '/aviation-bibliography', priority: '0.7' }
  ]
    .map((u) => `
  <url>
    <loc>${domain}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homepage}
${bookUrls}
${productAnchors}
${staticUrls}
</urlset>`
}

export async function GET() {
  const sitemap = buildSitemap()
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}