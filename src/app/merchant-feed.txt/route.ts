import { books } from '@/data/books';
import { SHIPPING_ZONES } from '@/data/shipping-zones';

export const dynamic = 'force-static';
export const revalidate = 3600;

const SITE = 'https://charlesmackaybooks.com';

const ZONE_REPRESENTATIVES: Record<string, string> = {
  UK: 'GB',
  EUROPE: 'IE',
  WORLD1: 'US',
  WORLD2: 'IN',
  WORLD3: 'AU',
};

// Strip tabs, newlines, and dash variants from descriptions for TSV safety.
function cleanForTsv(raw: string, max = 4500): string {
  const noTags = raw.replace(/<[^>]+>/g, ' ');
  const noDashes = noTags
    .replace(/—/g, ', ')
    .replace(/–/g, ' to ')
    .replace(/&mdash;/gi, ', ')
    .replace(/&ndash;/gi, ' to ');
  const collapsed = noDashes.replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  return collapsed.length > max ? collapsed.slice(0, max) : collapsed;
}

function shippingField(): string {
  return SHIPPING_ZONES.map((zone) => {
    const country = ZONE_REPRESENTATIVES[zone.key] ?? zone.countries[0];
    const price = (zone.amountPence / 100).toFixed(2);
    return `${country}:${price} GBP:Royal Mail International Tracked`;
  }).join(',');
}

export async function GET(): Promise<Response> {
  const header = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'price',
    'availability',
    'condition',
    'brand',
    'gtin',
    'google_product_category',
    'product_type',
    'shipping',
    'shipping_label',
  ].join('\t');

  const shipping = shippingField();

  const rows = books.map((book) => {
    const id = book.isbn ?? book.id;
    const link = `${SITE}/books/${book.id}`;
    const image = book.imageUrl
      ? (book.imageUrl.startsWith('http') ? book.imageUrl : `${SITE}${book.imageUrl}`)
      : `${SITE}/book-covers/${book.id}.jpg`;
    const description = cleanForTsv(book.description ?? '');
    const title = cleanForTsv(book.title, 150);

    return [
      id,
      title,
      description,
      link,
      image,
      `${book.price.toFixed(2)} GBP`,
      book.inStock ? 'in stock' : 'out of stock',
      'new',
      'Charles E. MacKay',
      book.isbn ?? '',
      'Media > Books > Non-Fiction Books',
      'Media > Books > Non-Fiction > History',
      shipping,
      'royal_mail_tracked',
    ].join('\t');
  });

  const body = [header, ...rows].join('\n') + '\n';

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/tab-separated-values; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
