import { books } from '@/data/books';

export const dynamic = 'force-static';
export const revalidate = 3600;

const SITE = 'https://charlesmackaybooks.com';

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cleanSummary(raw: string, max = 300): string {
  const noTags = raw.replace(/<[^>]+>/g, ' ');
  const noDashes = noTags
    .replace(/—/g, ', ')
    .replace(/–/g, ' to ')
    .replace(/&mdash;/gi, ', ')
    .replace(/&ndash;/gi, ' to ');
  const collapsed = noDashes.replace(/\s+/g, ' ').trim();
  return collapsed.length > max ? collapsed.slice(0, max) : collapsed;
}

export async function GET(): Promise<Response> {
  const updated = new Date().toISOString();

  const entries = books
    .map((book) => {
      const gtin = book.isbn ?? book.id;
      const link = `${SITE}/books/${book.id}`;
      const image = book.imageUrl
        ? (book.imageUrl.startsWith('http') ? book.imageUrl : `${SITE}${book.imageUrl}`)
        : `${SITE}/book-covers/${book.id}.jpg`;
      const summary = cleanSummary(book.description ?? '');
      const availability = book.inStock ? 'in_stock' : 'out_of_stock';

      return [
        '  <entry>',
        `    <id>urn:isbn:${escapeXml(gtin)}</id>`,
        `    <title>${escapeXml(book.title)}</title>`,
        `    <updated>${updated}</updated>`,
        `    <link rel="alternate" href="${escapeXml(link)}"/>`,
        `    <summary>${escapeXml(summary)}</summary>`,
        `    <g:price>${book.price.toFixed(2)} GBP</g:price>`,
        `    <g:availability>${availability}</g:availability>`,
        `    <g:image_link>${escapeXml(image)}</g:image_link>`,
        `    <g:brand>Charles E. MacKay</g:brand>`,
        '  </entry>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">',
    '  <title>Charles E. MacKay Aviation Books, Shopping Actions Feed</title>',
    `  <link href="${SITE}"/>`,
    `  <id>${SITE}/shopping-actions.xml</id>`,
    `  <updated>${updated}</updated>`,
    '  <author><name>Charles E. MacKay</name></author>',
    entries,
    '</feed>',
    '',
  ].join('\n');

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
