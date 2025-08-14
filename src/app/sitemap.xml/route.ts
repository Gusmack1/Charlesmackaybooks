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
    { path: '/books', priority: '0.95' },
    { path: '/blog', priority: '0.9' },
    { path: '/about', priority: '0.8' },
    { path: '/contact', priority: '0.7' },
    { path: '/how-to-order', priority: '0.6' },
    { path: '/returns', priority: '0.6' },
    { path: '/support', priority: '0.6' },
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

  // Include key blog posts to improve discovery in the primary sitemap
  const blogPosts = [
    // Existing key posts
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
    'naval-aviation-history',
    // Newly added long‑form posts
    'dieter-dengler-skyraider-escape',
    'morris-furniture-war-work-aviation',
    'maud-alsos-atomic-program',
    'german-aces-organization-wwi',
    'scottish-aviation-between-the-wars',
    'beardmore-wbiii-naval-fighter',
    'arado-ar234-jet-bomber',
    'autogyro-vs-helicopter',
    'avro-vulcan-bomber',
    'albatros-dva-technical-legacy',
    'dorothy-wordsworth-scottish-tour-1803'
  ]
    .map((slug) => `
  <url>
    <loc>${domain}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homepage}
 ${bookUrls}
 ${blogPosts}
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