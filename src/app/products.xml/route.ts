import { books } from '@/data/books';
import { BASE_URL } from '@/lib/sitemapData';

export const dynamic = 'force-static';

const BRAND = 'Charles E. MacKay';
const STORE_NAME = 'Charles Mackay Books';
const CURRENCY = 'GBP';
const GOOGLE_PRODUCT_CATEGORY = 'Media > Books';
const DEFAULT_SHIPPING_WEIGHT_GRAMS = 500;

function toAbsoluteUrl(src?: string) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BASE_URL}${src.startsWith('/') ? src : `/${src}`}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  if (maxLength <= 3) return value.slice(0, maxLength);
  return `${value.slice(0, maxLength - 3)}...`;
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
  if (!value) return null;
  const digits = value.replace(/[^0-9]/g, '');
  return digits.length === 13 ? digits : null;
}

export async function GET() {
  const buildDate = new Date();
  const lastBuildDate = buildDate.toUTCString();

  const itemsXml = books
    .map((book) => {
      const productUrl = `${BASE_URL}/books/${book.id}`;
      const imageUrl = toAbsoluteUrl(book.imageUrl || `/book-covers/${book.id}.jpg`);
      const gtin = normalizeIsbn13(book.isbn);
      const id = gtin || book.isbn || book.id;
      const identifierExists = gtin ? 'yes' : 'no';

      const title = book.title;
      const description = truncate(normalizeWhitespace(book.description || ''), 4900);

      const productType = `Books > ${book.category || 'Aviation History'}`;
      const availability = toMerchantAvailability(Boolean(book.inStock));
      const condition = toMerchantCondition(String(book.condition || 'New'));
      const price = formatPrice(Number(book.price));
      const shippingWeight = formatShippingWeight(resolveShippingWeightGrams(book.weight));

      return `  <item>
    <g:id>${escapeXml(String(id))}</g:id>
    <g:title>${escapeXml(title)}</g:title>
    <g:description>${escapeXml(description)}</g:description>
    <g:link>${escapeXml(productUrl)}</g:link>
    <g:image_link>${escapeXml(imageUrl)}</g:image_link>
    <g:availability>${escapeXml(availability)}</g:availability>
    <g:condition>${escapeXml(condition)}</g:condition>
    <g:price>${escapeXml(price)}</g:price>
    <g:shipping_weight>${escapeXml(shippingWeight)}</g:shipping_weight>
    <g:shipping>
      <g:country>GB</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 ${escapeXml(CURRENCY)}</g:price>
    </g:shipping>
    <g:brand>${escapeXml(BRAND)}</g:brand>
    <g:google_product_category>${escapeXml(GOOGLE_PRODUCT_CATEGORY)}</g:google_product_category>
    <g:product_type>${escapeXml(productType)}</g:product_type>
    <g:identifier_exists>${escapeXml(identifierExists)}</g:identifier_exists>
${gtin ? `    <g:gtin>${escapeXml(gtin)}</g:gtin>\n` : ''}  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(STORE_NAME)} Product Feed</title>
    <link>${escapeXml(BASE_URL)}</link>
    <description>${escapeXml(
      'Aviation history and research books by Charles E. MacKay, available to buy online.'
    )}</description>
    <language>en-gb</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

