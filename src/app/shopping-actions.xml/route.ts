import { books } from '@/data/books'

function escapeXml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildShoppingActionsXml(): string {
  const domain = 'https://charlesmackaybooks.com'
  const updated = new Date().toISOString()

  const entries = books
    .map((b) => {
      const id = String(b.isbn || b.id)
      const title = `${b.title} by Charles E. MacKay`
      const description = (b.description || '').slice(0, 5000)
      const link = `${domain}/books/${b.id}`
      const image = `${domain}${b.imageUrl || `/book-covers/${b.id}.jpg`}`
      const price = `${Number(b.price).toFixed(2)} GBP`
      const weight = `${((b as any).weight || 300)} g`
      return `
  <entry>
    <g:id>${escapeXml(id)}</g:id>
    <g:title>${escapeXml(title)}</g:title>
    <g:description>${escapeXml(description)}</g:description>
    <g:link>${escapeXml(link)}</g:link>
    <g:image_link>${escapeXml(image)}</g:image_link>
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${price}</g:price>
    <g:gtin>${escapeXml(id)}</g:gtin>
    <g:mpn>${escapeXml(id)}</g:mpn>
    <g:brand>Charles E. MacKay</g:brand>
    <g:google_product_category>783</g:google_product_category>
    <g:product_type>Books &gt; Non-Fiction &gt; Aviation History</g:product_type>
    <g:shipping>
      <g:country>GB</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 GBP</g:price>
    </g:shipping>
    <g:shipping_weight>${escapeXml(weight)}</g:shipping_weight>
    <g:online_only>FALSE</g:online_only>
    <g:identifier_exists>TRUE</g:identifier_exists>
    <g:adult>FALSE</g:adult>
    <g:multipack>1</g:multipack>
    <g:is_bundle>FALSE</g:is_bundle>
    <g:energy_efficiency_class>exempt</g:energy_efficiency_class>
    <g:custom_label_0>Aviation</g:custom_label_0>
    <g:custom_label_1>${escapeXml(b.category || 'History')}</g:custom_label_1>
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


