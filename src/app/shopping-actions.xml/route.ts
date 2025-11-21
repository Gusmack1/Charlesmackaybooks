import { books } from '@/data/books'
import { getValidGTIN13, getValidISBN, getValidSKU } from '@/utils/isbn'

function escapeXml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function padDescription(desc: string): string {
  if (!desc) return ''
  if (desc.length >= 150) return desc
  const doubled = `${desc} ${desc}`.trim()
  return doubled.length >= 150 ? doubled : `${doubled} ${desc}`.trim()
}

function buildShoppingActionsXml(): string {
  const domain = 'https://charlesmackaybooks.com'
  const updated = new Date().toISOString()

  const productBooks = books.filter((book) => {
    return (
      book &&
      book.id &&
      book.title &&
      !book.id.startsWith('blog-') &&
      typeof book.price === 'number' &&
      book.price > 0
    )
  })

  const entries = productBooks
    .map((book) => {
      const validGTIN13 = getValidGTIN13(book.isbn)
      const validSKU = getValidSKU(book.isbn, book.id)
      const validISBN = getValidISBN(book.isbn)
      const identifierExists = validGTIN13 ? 'TRUE' : 'FALSE'
      const id = validGTIN13 || validSKU
      const title = `${book.title} by Charles E. MacKay`
      const description = padDescription(book.description || '')
      const link = `${domain}/books/${book.id}`
      const image = `${domain}${book.imageUrl || `/book-covers/${book.id}.jpg`}`
      const price = `${book.price.toFixed(2)} GBP`
      const weight = `${((book as any).weight || 300)} g`
      const availability = book.inStock ? 'in stock' : 'out of stock'
      const category = book.category || 'History'

      return `
  <entry>
    <g:id>${escapeXml(id)}</g:id>
    <g:title>${escapeXml(title)}</g:title>
    <g:description>${escapeXml(description.slice(0, 5000))}</g:description>
    <g:link>${escapeXml(link)}</g:link>
    <g:image_link>${escapeXml(image)}</g:image_link>
    <g:condition>${book.condition === 'New' ? 'new' : 'used'}</g:condition>
    <g:availability>${availability}</g:availability>
    <g:price>${price}</g:price>
    ${validGTIN13 ? `<g:gtin>${escapeXml(validGTIN13)}</g:gtin>` : ''}
    <g:mpn>${escapeXml(validSKU)}</g:mpn>
    ${validISBN ? `<g:isbn>${escapeXml(validISBN)}</g:isbn>` : ''}
    <g:brand>Charles E. MacKay</g:brand>
    <g:google_product_category>783</g:google_product_category>
    <g:product_type>Books &gt; Non-Fiction &gt; Aviation History &gt; ${escapeXml(category)}</g:product_type>
    <g:shipping>
      <g:country>GB</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 GBP</g:price>
    </g:shipping>
    <g:shipping_weight>${escapeXml(weight)}</g:shipping_weight>
    <g:online_only>FALSE</g:online_only>
    <g:identifier_exists>${identifierExists}</g:identifier_exists>
    <g:adult>FALSE</g:adult>
    <g:multipack>1</g:multipack>
    <g:is_bundle>FALSE</g:is_bundle>
    <g:energy_efficiency_class>exempt</g:energy_efficiency_class>
    <g:custom_label_0>Aviation</g:custom_label_0>
    <g:custom_label_1>${escapeXml(category)}</g:custom_label_1>
    <g:custom_label_2>Academic Reference</g:custom_label_2>
    <g:promotion_id>FREE_UK_SHIPPING</g:promotion_id>
  </entry>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>Charles MacKay Books Product Feed</title>
  <link rel="self" href="${domain}/shopping-actions.xml" />
  <updated>${updated}</updated>
${entries}
</feed>`
}

export async function GET() {
  const xml = buildShoppingActionsXml()
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

