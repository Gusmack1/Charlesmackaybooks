import { books } from '@/data/books';
import { getImageCandidates } from '@/data/blogImageManifest';
import { BASE_URL, getBlogSlugs } from '@/lib/sitemapData';

export const dynamic = 'force-static';

const FALLBACK_IMAGE = {
  url: `${BASE_URL}/blog-images/default-generic.svg`,
  alt: 'Charles E. MacKay Aviation Books illustration',
  caption: 'Illustration representing Charles E. MacKay’s aviation research archive',
};

function toAbsoluteUrl(src?: string) {
  if (!src) return FALLBACK_IMAGE.url;
  if (src.startsWith('http')) return src;
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

export async function GET() {
  const blogSlugs = getBlogSlugs();

  const bookEntries = books.map((book) => {
    const imageUrl = toAbsoluteUrl(book.imageUrl || `/book-covers/${book.id}.jpg`);
    return {
      loc: `${BASE_URL}/books/${book.id}`,
      images: [
        {
          url: imageUrl,
          title: book.title,
          caption: book.description?.slice(0, 300) || `${book.title} by Charles E. MacKay`,
        },
      ],
    };
  });

  const blogEntries = blogSlugs.map((slug) => {
    const candidates = getImageCandidates(slug) || [];
    const images = (candidates.length ? candidates : [FALLBACK_IMAGE]).map((candidate) => ({
      url: toAbsoluteUrl(candidate.url),
      title: candidate.alt,
      caption: candidate.caption || candidate.alt,
    }));
    return {
      loc: `${BASE_URL}/blog/${slug}`,
      images,
    };
  });

  const specialEntries = [
    {
      loc: `${BASE_URL}/about`,
      images: [
        {
          url: toAbsoluteUrl('/book-covers/beardmore-aviation.jpg'),
          title: 'Charles E. MacKay Aviation Books',
          caption: 'Catalogued collection of Scottish and British aviation titles',
        },
      ],
    },
    {
      loc: `${BASE_URL}/scottish-aviation-timeline`,
      images: [
        {
          url: toAbsoluteUrl('/blog-images/historical-scotland-map.jpg'),
          title: 'Scottish Aviation Timeline',
          caption: 'Map showing Scotland’s aviation heritage milestones',
        },
      ],
    },
  ];

  const allEntries = [...bookEntries, ...blogEntries, ...specialEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
${entry.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(image.url)}</image:loc>
      <image:title>${escapeXml(image.title || '')}</image:title>
      <image:caption>${escapeXml(image.caption || image.title || '')}</image:caption>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
