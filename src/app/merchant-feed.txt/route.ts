import { books } from '@/data/books'
import { getValidISBN, getValidGTIN13, getValidSKU } from '@/utils/isbn'

function tsvEscape(value: string): string {
  return (value || '')
    .replace(/[\t\n\r]+/g, ' ') // no tabs/newlines inside fields
    .trim()
}

export async function GET() {
  const domain = 'https://charlesmackaybooks.com'

  // IMPORTANT: Only include actual books (products) - NEVER include blog posts
  // Filter to ensure only valid products with required fields
  const productBooks = books.filter((b) => {
    return b && b.id && b.title && !b.id.startsWith('blog-') &&
           b.price !== undefined && b.price !== null &&
           typeof b.price === 'number' && b.price > 0;
  });

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

  const rows = productBooks.map((b) => {
    // Get validated ISBN, GTIN, and SKU values
    const validGTIN13 = getValidGTIN13(b.isbn);
    const validSKU = getValidSKU(b.isbn, b.id);
    
    // Use valid GTIN13 for gtin field, or empty string if no valid GTIN
    const gtin = validGTIN13 || '';
    const id = validGTIN13 || validSKU; // Use GTIN13 as ID if available, else SKU
    const mpn = validSKU; // MPN can be SKU format
    
    const title = `${b.title} - Charles E. MacKay`
    const description = tsvEscape(b.description || '')
    const link = `${domain}/books/${b.id}`
    const image = `${domain}${b.imageUrl || `/book-covers/${b.id}.jpg`}`
    const condition = b.condition === 'New' ? 'new' : 'used'
    const availability = b.inStock ? 'in stock' : 'out of stock'
    // Use existing prices only (do not modify)
    const price = `${Number(b.price).toFixed(2)} GBP`
    const brand = 'Charles E. MacKay'
    const googleCategory = 'Media > Books > Non-Fiction > Transportation > Aviation'
    const shipping = 'GB:::0.00 GBP'
    const shippingWeight = `${((b as any).weight || 300)}g`
    const productType = `Aviation History > ${b.category}`
    // Only set identifier_exists to TRUE if we have a valid GTIN
    const identifierExists = validGTIN13 ? 'TRUE' : 'FALSE'
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


