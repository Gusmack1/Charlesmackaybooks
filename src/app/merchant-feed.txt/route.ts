import { books } from '@/data/books'

function tsvEscape(value: string): string {
  return (value || '')
    .replace(/[\t\n\r]+/g, ' ') // no tabs/newlines inside fields
    .trim()
}

export async function GET() {
  const domain = 'https://charlesmackaybooks.com'

  const header = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'condition',
    'availability',
    'price',
    'gtin',
    'mpn',
    'brand',
    'google_product_category',
    'shipping',
    'shipping_weight',
    'product_type',
    'identifier_exists',
    'author',
  ].join('\t')

  const rows = books.map((b) => {
    const isbn = (b.isbn || b.id || '').toString()
    const id = isbn
    const title = `${b.title} - Charles E. MacKay`
    const description = tsvEscape(b.description || '')
    const link = `${domain}#${isbn}`
    const image = `${domain}${b.imageUrl || `/book-covers/${b.id}.jpg`}`
    const condition = 'new'
    const availability = 'in stock'
    // Use existing prices only (do not modify)
    const price = `${Number(b.price).toFixed(2)} GBP`
    const gtin = isbn
    const mpn = isbn
    const brand = 'Charles E. MacKay'
    const googleCategory = 'Media > Books > Non-Fiction > Transportation > Aviation'
    const shipping = 'GB:::0.00 GBP'
    const shippingWeight = `${((b as any).weight || 300)}g`
    const productType = `Aviation History > ${b.category}`
    const identifierExists = 'TRUE'
    const author = 'Charles E. MacKay'

    return [
      id,
      tsvEscape(title),
      description,
      link,
      image,
      condition,
      availability,
      price,
      gtin,
      mpn,
      brand,
      googleCategory,
      shipping,
      shippingWeight,
      tsvEscape(productType),
      identifierExists,
      author,
    ].join('\t')
  })

  const body = [header, ...rows].join('\n') + '\n'

  return new Response(body, {
    headers: {
      'Content-Type': 'text/tab-separated-values; charset=utf-8',
      'Content-Disposition': 'inline; filename="merchant-feed.txt"',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}


