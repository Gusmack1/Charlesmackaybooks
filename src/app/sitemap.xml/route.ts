import { books } from '@/data/books'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap(): string {
  const domain = 'https://charlesmackaybooks.com'
  const today = new Date().toISOString().slice(0, 10)

  const productBlocks = books
    .map((b) => {
      const name = b.title
      const description = (b.description || '').slice(0, 200)
      const image = `${domain}${b.imageUrl || `/book-covers/${b.id}.jpg`}`
      const price = `${Number(b.price).toFixed(2)} GBP`
      const availability = 'in stock'
      const condition = 'new'
      const gtin = b.isbn || b.id
      return `
    <product:product>
      <product:name>${escapeXml(name)}</product:name>
      <product:description>${escapeXml(description)}</product:description>
      <product:image>${escapeXml(image)}</product:image>
      <product:price>${escapeXml(price)}</product:price>
      <product:availability>${availability}</product:availability>
      <product:condition>${condition}</product:condition>
      <product:gtin>${escapeXml(gtin)}</product:gtin>
    </product:product>`
    })
    .join('\n')

  const hashUrls = books
    .map((b) => `
  <url>
    <loc>${domain}/#${b.id}</loc>
    <priority>0.9</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:product="http://www.google.com/schemas/sitemap-product/1.0">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${productBlocks}
  </url>
${hashUrls}
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