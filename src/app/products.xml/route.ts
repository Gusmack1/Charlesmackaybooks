import { books } from '@/data/books';
import { SHIPPING_ZONES } from '@/data/shipping-zones';

export const dynamic = 'force-static';
export const revalidate = 3600;

const SITE = 'https://charlesmackaybooks.com';

// Representative country per zone (one per zone is sufficient for Google Merchant
// Center to interpolate; we still emit at least one block per zone). All 5 zones
// covered: UK / EUROPE / WORLD1 (NA) / WORLD2 (RoW) / WORLD3 (APAC).
const ZONE_REPRESENTATIVES: Record<string, string[]> = {
  UK: ['GB'],
  EUROPE: ['IE', 'FR', 'DE'],
  WORLD1: ['US', 'CA'],
  WORLD2: ['IN', 'NG', 'BR'],
  WORLD3: ['AU'],
};

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Strip HTML and collapse whitespace. No em-dashes per brand rule (#894).
function cleanDescription(raw: string, max = 5000): string {
  const noTags = raw.replace(/<[^>]+>/g, ' ');
  const noEntities = noTags
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&mdash;/gi, ', ')
    .replace(/&ndash;/gi, ' to ');
  const noDashes = noEntities
    .replace(/—/g, ', ') // em dash
    .replace(/–/g, ' to ') // en dash
    .replace(/\s+-\s+/g, ', '); // surrounded hyphen used as dash
  const collapsed = noDashes.replace(/\s+/g, ' ').trim();
  return collapsed.length > max ? collapsed.slice(0, max) : collapsed;
}

function shippingBlocks(): string {
  const blocks: string[] = [];
  for (const zone of SHIPPING_ZONES) {
    const reps = ZONE_REPRESENTATIVES[zone.key] ?? [zone.countries[0]];
    for (const country of reps) {
      blocks.push(
        [
          '      <g:shipping>',
          `        <g:country>${country}</g:country>`,
          `        <g:service>${escapeXml(zone.displayName)}</g:service>`,
          `        <g:price>${(zone.amountPence / 100).toFixed(2)} GBP</g:price>`,
          `        <g:min_transit_time>${zone.minDays}</g:min_transit_time>`,
          `        <g:max_transit_time>${zone.maxDays}</g:max_transit_time>`,
          '      </g:shipping>',
        ].join('\n'),
      );
    }
  }
  return blocks.join('\n');
}

// Classify a book's primary era for custom_label_0 segmentation
function eraLabel(book: (typeof books)[number]): string {
  const eras = book.era ?? [];
  const join = eras.join(' ');
  if (/Cold War/i.test(join)) return 'Cold War';
  if (/WWII|World War II/i.test(join)) return 'WWII';
  if (/WWI|World War I/i.test(join)) return 'WWI';
  if (/Inter-?War/i.test(join)) return 'Inter-War';
  if (/Pre-?WWI|Early/i.test(join)) return 'Early Aviation';
  if (/Postwar/i.test(join)) return 'Postwar';
  return 'Scottish Aviation';
}

// Derive 3 to 5 selling-bullets for Google Shopping product_highlight from book metadata
function productHighlights(book: (typeof books)[number]): string[] {
  const highlights: string[] = [];
  const era = eraLabel(book);

  // 1. Author brand + research credibility
  highlights.push('By Charles E. MacKay, Glasgow aviation historian since 1982');

  // 2. Length + scope
  if (book.pageCount && book.pageCount > 0) {
    highlights.push(`${book.pageCount} pages of original research, photographs and technical drawings`);
  }

  // 3. Era + geographic focus
  const geo = (book.geographicFocus ?? []).slice(0, 2).join(' and ');
  if (geo) {
    highlights.push(`${era} aviation, ${geo}`);
  } else {
    highlights.push(`${era} aviation history`);
  }

  // 4. Aircraft types covered
  const types = (book.aircraftTypes ?? []).slice(0, 3).join(', ');
  if (types) {
    highlights.push(`Covers ${types}`);
  }

  // 5. Shipping promise
  highlights.push('Posted by Charles from Glasgow, Royal Mail tracked, 1 to 2 business days');

  return highlights.slice(0, 5);
}

function buildItem(book: (typeof books)[number]): string {
  const id = book.isbn ?? book.id;
  const link = `${SITE}/books/${book.id}`;
  const image = book.imageUrl
    ? (book.imageUrl.startsWith('http') ? book.imageUrl : `${SITE}${book.imageUrl}`)
    : `${SITE}/book-covers/${book.id}.jpg`;
  const description = cleanDescription(book.description ?? '');
  const availability = book.inStock ? 'in_stock' : 'out_of_stock';
  const era = eraLabel(book);
  const highlights = productHighlights(book);

  return [
    '    <item>',
    `      <g:id>${escapeXml(id)}</g:id>`,
    `      <title>${escapeXml(book.title)}</title>`,
    `      <description>${escapeXml(description)}</description>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <g:image_link>${escapeXml(image)}</g:image_link>`,
    `      <g:price>${book.price.toFixed(2)} GBP</g:price>`,
    `      <g:availability>${availability}</g:availability>`,
    '      <g:condition>new</g:condition>',
    '      <g:brand>Charles E. MacKay</g:brand>',
    book.isbn ? `      <g:gtin>${escapeXml(book.isbn)}</g:gtin>` : '',
    `      <g:identifier_exists>${book.isbn ? 'yes' : 'no'}</g:identifier_exists>`,
    `      <g:product_type>${escapeXml(`Aviation History > ${era}`)}</g:product_type>`,
    '      <g:google_product_category>784</g:google_product_category>',
    `      <g:custom_label_0>${escapeXml(era)}</g:custom_label_0>`,
    '      <g:custom_label_1>Charles E. MacKay (aviation historian)</g:custom_label_1>',
    book.publicationYear ? `      <g:custom_label_2>${book.publicationYear}</g:custom_label_2>` : '',
    ...highlights.map(h => `      <g:product_highlight>${escapeXml(h)}</g:product_highlight>`),
    '      <g:min_handling_time>1</g:min_handling_time>',
    '      <g:max_handling_time>2</g:max_handling_time>',
    shippingBlocks(),
    '    </item>',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function GET(): Promise<Response> {
  const updated = new Date().toUTCString();
  const items = books.map(buildItem).join('\n');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    '  <channel>',
    '    <title>Charles E. MacKay Aviation Books</title>',
    `    <link>${SITE}</link>`,
    '    <description>Original Scottish and British aviation history, written and published by Charles E. MacKay (Glasgow). Posted by Charles in 1 to 2 business days.</description>',
    `    <lastBuildDate>${updated}</lastBuildDate>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
