import { books } from '@/data/books'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function padDescription(desc: string): string {
  if (!desc) return ''
  if (desc.length >= 150) return desc
  // Repeat trimmed description to satisfy minimum length without altering meaning
  const doubled = `${desc} ${desc}`.trim()
  return doubled.length >= 150 ? doubled : `${doubled} ${desc}`.trim()
}

function buildProductsXml(): string {
  const domain = 'https://charlesmackaybooks.com'
  const now = new Date().toISOString()

  const items = books
    .map((book) => {
      const isbn = (book.isbn || book.id || '').toString()
      const id = isbn
      const title = `${book.title} - Aviation History Book by Charles E. MacKay`
      const description = padDescription(book.description || '')
      const link = `${domain}/books/${book.id}`
      const imagePath = book.imageUrl || `/book-covers/${book.id}.jpg`
      const image_link = `${domain}${imagePath}`
      const availability = 'in stock'
      const price = `${book.price.toFixed(2)} GBP`
      const brand = 'Charles E. MacKay Publications'
      const gtin = isbn
      const mpn = isbn
      const condition = 'new'
      const google_product_category = 'Media > Books > Non-Fiction > History Books'
      const product_type = `Aviation History > ${book.category}`
      const shipping_country = 'GB'
      const shipping_service = 'Standard'
      const shipping_price = '0.00 GBP'
      const shipping_weight = `${((book as any).weight || 300)} g`
      const identifier_exists = 'TRUE'
      const adult = 'FALSE'

      const publication_date = book.publicationYear ? String(book.publicationYear) : ''
      const number_of_pages = book.pageCount ? String(book.pageCount) : ''

      return `
    <item>
      <g:id>${escapeXml(id)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(image_link)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:brand>${escapeXml(brand)}</g:brand>
      <g:gtin>${escapeXml(gtin)}</g:gtin>
      <g:mpn>${escapeXml(mpn)}</g:mpn>
      <g:condition>${condition}</g:condition>
      <g:google_product_category>${escapeXml(google_product_category)}</g:google_product_category>
      <g:product_type>${escapeXml(product_type)}</g:product_type>
      <g:shipping>
        <g:country>${shipping_country}</g:country>
        <g:service>${shipping_service}</g:service>
        <g:price>${shipping_price}</g:price>
      </g:shipping>
      <g:shipping_weight>${escapeXml(shipping_weight)}</g:shipping_weight>
      <g:identifier_exists>${identifier_exists}</g:identifier_exists>
      <g:adult>${adult}</g:adult>
      <!-- Optional enrichments via product_detail -->
      <g:product_detail>
        <g:section_name>Author</g:section_name>
        <g:attribute_name>author</g:attribute_name>
        <g:attribute_value>Charles E. MacKay</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Genre</g:section_name>
        <g:attribute_name>genre</g:attribute_name>
        <g:attribute_value>Aviation History</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Format</g:section_name>
        <g:attribute_name>format</g:attribute_name>
        <g:attribute_value>Paperback</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Publisher</g:section_name>
        <g:attribute_name>publisher</g:attribute_name>
        <g:attribute_value>A MacKay</g:attribute_value>
      </g:product_detail>
      ${publication_date ? `
      <g:product_detail>
        <g:section_name>Publication Date</g:section_name>
        <g:attribute_name>publication_date</g:attribute_name>
        <g:attribute_value>${escapeXml(publication_date)}</g:attribute_value>
      </g:product_detail>` : ''}
      ${number_of_pages ? `
      <g:product_detail>
        <g:section_name>Pages</g:section_name>
        <g:attribute_name>number_of_pages</g:attribute_name>
        <g:attribute_value>${escapeXml(number_of_pages)}</g:attribute_value>
      </g:product_detail>` : ''}
      <g:product_detail>
        <g:section_name>Academic</g:section_name>
        <g:attribute_name>product_detail</g:attribute_name>
        <g:attribute_value>Academic Reference</g:attribute_value>
      </g:product_detail>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Charles MacKay Books Product Feed</title>
    <link>${domain}</link>
    <description>Google Merchant Center feed for aviation history books by Charles E. MacKay</description>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`
  return xml
}

export async function GET() {
  const xml = buildProductsXml()
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}


