import { books } from '@/data/books';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://charlesmackaybooks.com';

  // Generate image sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage Images -->
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/book-covers/charles-mackay-logo.jpg</image:loc>
      <image:title>Charles E. MacKay Aviation Books Logo</image:title>
      <image:caption>Official logo of Charles E. MacKay Aviation Books, renowned aviation historian and author specializing in Scottish aviation heritage</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/og-image-aviation-books.jpg</image:loc>
      <image:title>Charles MacKay Aviation History Books Collection</image:title>
      <image:caption>Collection of authentic aviation history books by Charles E. MacKay covering Scottish aviation, WWI and WWII aircraft</image:caption>
    </image:image>
  </url>

  <!-- Book Cover Images -->
  ${books.map(book => `
  <url>
    <loc>${baseUrl}/books/${book.id}</loc>
    <image:image>
      <image:loc>${baseUrl}${book.imageUrl || '/book-covers/placeholder-book.svg'}</image:loc>
      <image:title>${book.title} by Charles E. MacKay - Aviation History Book Cover</image:title>
      <image:caption>Cover of "${book.title}" by renowned aviation historian Charles E. MacKay. ${book.description.substring(0, 100)}...</image:caption>
      <image:license>${baseUrl}/terms</image:license>
    </image:image>
  </url>`).join('')}

  <!-- Aircraft Images for Technical Pages -->
  <url>
    <loc>${baseUrl}/aircraft/bristol-fighter</loc>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/bristol-f2b-fighter.jpg</image:loc>
      <image:title>Bristol F2B Fighter - WWI Aircraft</image:title>
      <image:caption>Historical photograph of Bristol F2B Fighter aircraft, detailed in Charles MacKay's comprehensive WWI aviation books</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/bristol-fighter-cockpit.jpg</image:loc>
      <image:title>Bristol Fighter Cockpit Detail</image:title>
      <image:caption>Detailed cockpit view of Bristol F2B Fighter showing pilot controls and instruments</image:caption>
    </image:image>
  </url>

  <url>
    <loc>${baseUrl}/aircraft/sopwith-camel</loc>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/sopwith-camel-profile.jpg</image:loc>
      <image:title>Sopwith Camel Fighter Aircraft - WWI</image:title>
      <image:caption>Side profile of famous Sopwith Camel fighter aircraft, extensively documented in Charles MacKay's WWI aviation histories</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/sopwith-camel-squadron.jpg</image:loc>
      <image:title>Sopwith Camel Squadron Formation</image:title>
      <image:caption>Historical photograph of RFC Sopwith Camel squadron in formation during WWI</image:caption>
    </image:image>
  </url>

  <url>
    <loc>${baseUrl}/aircraft/hawker-hurricane</loc>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/hawker-hurricane-battle-britain.jpg</image:loc>
      <image:title>Hawker Hurricane - Battle of Britain Fighter</image:title>
      <image:caption>Hawker Hurricane fighter aircraft during Battle of Britain, featured in Charles MacKay's WWII aviation books</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/aircraft-images/hurricane-technical-drawing.jpg</image:loc>
      <image:title>Hawker Hurricane Technical Specifications</image:title>
      <image:caption>Technical drawing and specifications of Hawker Hurricane fighter aircraft</image:caption>
    </image:image>
  </url>

  <!-- Scottish Aviation Heritage Images -->
  <url>
    <loc>${baseUrl}/category/scottish-aviation-history</loc>
    <image:image>
      <image:loc>${baseUrl}/scottish-aviation/beardmore-factory.jpg</image:loc>
      <image:title>Beardmore Aviation Factory Glasgow</image:title>
      <image:caption>Historical photograph of Beardmore Aviation factory in Glasgow, Scotland, covered extensively in Charles MacKay's Scottish aviation books</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/scottish-aviation/clydeside-aviation-works.jpg</image:loc>
      <image:title>Clydeside Aviation Manufacturing</image:title>
      <image:caption>Clydeside aviation manufacturing facility showing aircraft production in Scotland</image:caption>
    </image:image>
  </url>

  <!-- Author and Research Images -->
  <url>
    <loc>${baseUrl}/about</loc>
    <image:image>
      <image:loc>${baseUrl}/author/charles-mackay-researcher.jpg</image:loc>
      <image:title>Charles E. MacKay Aviation Historian</image:title>
      <image:caption>Charles E. MacKay, renowned aviation historian and author, researching in aviation archives</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/author/aviation-research-archives.jpg</image:loc>
      <image:title>Aviation Research Archives</image:title>
      <image:caption>Historical aviation archives and research materials used by Charles MacKay for his aviation books</image:caption>
    </image:image>
  </url>

  <!-- Museum Partnership Images -->
  <url>
    <loc>${baseUrl}/partnerships/imperial-war-museum</loc>
    <image:image>
      <image:loc>${baseUrl}/partnerships/iwm-collaboration.jpg</image:loc>
      <image:title>Imperial War Museum Partnership</image:title>
      <image:caption>Collaboration between Charles MacKay and Imperial War Museum for aviation historical research</image:caption>
    </image:image>
  </url>

</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
