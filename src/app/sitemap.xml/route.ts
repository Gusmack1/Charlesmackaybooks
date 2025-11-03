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
  // Use the actual book IDs for consistent URL structure
  const prettyMap: Record<string, string> = {
    'beardmore-aviation': '/books/beardmore-aviation',
    'clydeside-aviation-vol1': '/books/clydeside-aviation-vol1',
    'clydeside-aviation-vol2': '/books/clydeside-aviation-vol2',
    'german-aircraft-great-war': '/books/german-aircraft-great-war',
    'british-aircraft-great-war': '/books/british-aircraft-great-war',
    'sycamore-seeds': '/books/sycamore-seeds',
    'captain-eric-brown': '/books/captain-eric-brown',
    'sabres-from-north': '/books/sabres-from-north',
    'enemy-luftwaffe-1945': '/books/enemy-luftwaffe-1945',
    'flying-for-kaiser': '/books/flying-for-kaiser',
    'soaring-with-wings': '/books/soaring-with-wings',
    'mother-of-the-few': '/books/mother-of-the-few',
    'dieter-dengler': '/books/dieter-dengler',
    'modern-furniture': '/books/modern-furniture',
    'birth-atomic-bomb': '/books/birth-atomic-bomb',
    'aircraft-carrier-argus': '/books/aircraft-carrier-argus',
    'dorothy-wordsworth': '/books/dorothy-wordsworth',
    'adolf-rohrbach': '/books/adolf-rohrbach'
  }

  const bookUrls = books
    .map((b) => {
      const path = prettyMap[b.id] || `/books/${xml(b.id)}`
      // Ensure trailing slash for consistency with Next.js trailingSlash: true
      const pathWithSlash = path.endsWith('/') ? path : `${path}/`
      return `
  <url>
    <loc>${domain}${pathWithSlash}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    })
    .join('\n')

  // Remove product hash anchors - they cause duplicate content issues
  // Google prefers clean URLs without hash fragments for indexing
  // const productAnchors = books
  //   .map((b) => {
  //     const hash = (b.isbn || b.id)
  //     return `
  // <url>
  //   <loc>${domain}#${xml(String(hash))}</loc>
  //   <lastmod>${today}</lastmod>
  //   <changefreq>weekly</changefreq>
  //   <priority>0.8</priority>
  // </url>`
  //   })
  //   .join('\n')

  const staticUrls = [
    { path: '/books/', priority: '0.95' },
    { path: '/blog/', priority: '0.9' },
    { path: '/about/', priority: '0.8' },
    { path: '/contact/', priority: '0.7' },
    { path: '/how-to-order/', priority: '0.6' },
    { path: '/returns/', priority: '0.6' },
    { path: '/support/', priority: '0.6' },
    { path: '/aviation-bibliography/', priority: '0.7' },
    { path: '/academic-resources/', priority: '0.7' },
    { path: '/aviation-glossary/', priority: '0.6' },
    { path: '/aviation-news/', priority: '0.6' },
    { path: '/faq/', priority: '0.6' },
    { path: '/for-researchers/', priority: '0.7' },
    { path: '/golden-age-1918-1939/', priority: '0.7' },
    { path: '/great-war-1914-1918/', priority: '0.7' },
    { path: '/order-complete/', priority: '0.5' },
    { path: '/pioneer-era-1895-1914/', priority: '0.7' },
    { path: '/research-guides/', priority: '0.7' },
    { path: '/scottish-aviation-timeline/', priority: '0.8' },
    { path: '/timeline/', priority: '0.6' },
    { path: '/checkout/', priority: '0.5' },
    { path: '/partnerships/imperial-war-museum/', priority: '0.6' },
    { path: '/comprehensive-fix/', priority: '0.4' },
    { path: '/comprehensive-optimization-suite/', priority: '0.4' },
    { path: '/optimize-website/', priority: '0.4' },
    { path: '/test-systems/', priority: '0.4' },
    { path: '/deployment/', priority: '0.4' },
    { path: '/google-indexing/', priority: '0.4' },
    { path: '/seo-audit/', priority: '0.4' },
    { path: '/performance-optimizer/', priority: '0.4' },
    { path: '/seo-optimizer/', priority: '0.4' },
    { path: '/run-optimizations/', priority: '0.4' },
    { path: '/test-react/', priority: '0.3' },
    { path: '/ai-prompt-system/', priority: '0.4' }
  ]
    .map((u) => {
      // Ensure trailing slash
      const pathWithSlash = u.path.endsWith('/') ? u.path : `${u.path}/`
      return `
  <url>
    <loc>${domain}${pathWithSlash}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    })
    .join('\n')

  // Include ALL blog posts for complete indexing
  const blogPosts = [
    // All existing blog posts
    'adolf-rohrbach-metal-aircraft-construction',
    'adolf-rohrbach-metal-aircraft-revolution',
    'albatros-dva-technical-legacy',
    'arado-ar234-jet-bomber',
    'autogyro-vs-helicopter',
    'aviation-manufacturing-wartime-production',
    'avro-vulcan-bomber',
    'beardmore-aviation-scottish-industrial-giant',
    'beardmore-wbiii-naval-fighter',
    'bristol-fighter-f2b-brisfit',
    'bristol-sycamore-helicopter-development',
    'british-aircraft-great-war-rfc-rnas',
    'british-nuclear-deterrent-v-force',
    'clydeside-aviation-revolution',
    'de-havilland-chipmunk-wp808-turnhouse',
    'dieter-dengler-skyraider-escape',
    'dorothy-wordsworth-scottish-tour-1803',
    'english-electric-lightning-development',
    'f86-sabre-cold-war-fighter',
    'german-aces-organization-wwi',
    'german-aircraft-great-war-development',
    'hawker-hurricane-fighter-development',
    'helicopter-development-pioneers',
    'hms-argus-first-aircraft-carrier',
    'hms-argus-first-aircraft-carrier-operations',
    'jet-age-aviation-cold-war-development',
    'korean-war-air-combat',
    'lucy-lady-houston-schneider-trophy',
    'luftwaffe-1945-final-year',
    'maud-alsos-atomic-program',
    'me262-jet-fighter-revolution',
    'morris-furniture-war-work-aviation',
    'naval-aviation-history',
    'percy-pilcher-scotland-aviation-pioneer',
    'rotorcraft-military-applications',
    'schneider-trophy-racing-development',
    'scottish-aviation-between-the-wars',
    'sikorsky-vs300-helicopter-breakthrough',
    'sopwith-camel-wwi-fighter',
    'supermarine-spitfire-development-evolution',
    'supermarine-spitfire-development-history',
    'sycamore-seeds-helicopter-evolution',
    'test-pilot-biography-eric-brown'
  ]
    .map((slug) => {
      // Ensure trailing slash for blog posts
      const blogPath = `/blog/${slug}/`
      return `
  <url>
    <loc>${domain}${blogPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homepage}
 ${bookUrls}
 ${blogPosts}
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