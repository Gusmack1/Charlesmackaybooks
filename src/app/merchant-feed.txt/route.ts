import { books } from '@/data/books';
import { BASE_URL } from '@/lib/sitemapData';

export const dynamic = 'force-static';

const BRAND = 'Charles E. MacKay';
const CURRENCY = 'GBP';
const GOOGLE_PRODUCT_CATEGORY = 'Media > Books';
const DEFAULT_SHIPPING_WEIGHT_GRAMS = 500;

function toAbsoluteUrl(src?: string) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BASE_URL}${src.startsWith('/') ? src : `/${src}`}`;
}

function sanitizeTsv(value: string) {
  return String(value).replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatPrice(price: number) {
  return `${price.toFixed(2)} ${CURRENCY}`;
}

function toMerchantAvailability(inStock: boolean) {
  return inStock ? 'in stock' : 'out of stock';
}

function toMerchantCondition(condition: string) {
  return condition.toLowerCase() === 'new' ? 'new' : 'used';
}

function resolveShippingWeightGrams(weight?: number) {
  if (Number.isFinite(weight) && Number(weight) > 0) {
    return Math.round(Number(weight));
  }
  return DEFAULT_SHIPPING_WEIGHT_GRAMS;
}

function formatShippingWeight(weightGrams: number) {
  return `${weightGrams} g`;
}

function normalizeIsbn13(value?: string | null) {
  if (!value) return '';
  const digits = value.replace(/[^0-9]/g, '');
  return digits.length === 13 ? digits : '';
}

export async function GET() {
  const header = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'availability',
    'price',
    'condition',
    'brand',
    'gtin',
    'product_type',
    'google_product_category',
    'shipping_weight',
    'shipping',
  ].join('\t');

  const rows = books.map((book) => {
    const productUrl = `${BASE_URL}/books/${book.id}`;
    const imageUrl = toAbsoluteUrl(book.imageUrl || `/book-covers/${book.id}.jpg`);
    const gtin = normalizeIsbn13(book.isbn);
    const id = gtin || book.isbn || book.id;

    const description = sanitizeTsv(book.description || '');
    const availability = toMerchantAvailability(Boolean(book.inStock));
    const condition = toMerchantCondition(String(book.condition || 'New'));
    const price = formatPrice(Number(book.price));
    const productType = `Books > ${book.category || 'Aviation History'}`;
    const shippingWeight = formatShippingWeight(resolveShippingWeightGrams(book.weight));
    const shipping = 'GB:::0.00 GBP';

    return [
      sanitizeTsv(id),
      sanitizeTsv(book.title),
      description,
      sanitizeTsv(productUrl),
      sanitizeTsv(imageUrl),
      sanitizeTsv(availability),
      sanitizeTsv(price),
      sanitizeTsv(condition),
      sanitizeTsv(BRAND),
      sanitizeTsv(gtin),
      sanitizeTsv(productType),
      sanitizeTsv(GOOGLE_PRODUCT_CATEGORY),
      sanitizeTsv(shippingWeight),
      sanitizeTsv(shipping),
    ].join('\t');
  });

  const body = `${header}\n${rows.join('\n')}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

