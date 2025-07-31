import { books } from '@/data/books';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://charlesmackaybooks.com';

  // Book cover images
  const bookImages = books.map(book => ({
    loc: `${baseUrl}/books/${book.id}`,
    image: book.imageUrl ? `${baseUrl}${book.imageUrl}` : `${baseUrl}/book-covers/${book.id}.jpg`,
    title: book.title,
    caption: book.description,
  }));

  // Blog post images
  const blogImages = [
    {
      loc: `${baseUrl}/blog/beardmore-aviation-scottish-industrial-giant`,
      image: `${baseUrl}/blog-images/beardmore-aviation-factory.jpg`,
      title: 'Beardmore Aviation Factory',
      caption: 'Historical photo of Beardmore aviation manufacturing facility',
    },
    {
      loc: `${baseUrl}/blog/clydeside-aviation-revolution`,
      image: `${baseUrl}/blog-images/clydeside-aircraft-factory.jpg`,
      title: 'Clydeside Aircraft Factory',
      caption: 'Aircraft manufacturing on the River Clyde during wartime production',
    },
    {
      loc: `${baseUrl}/blog/german-aircraft-great-war-development`,
      image: `${baseUrl}/blog-images/german-albatros-dva-wwi-fighter.jpg`,
      title: 'German Albatros D.Va Fighter',
      caption: 'German WWI fighter aircraft development and innovation',
    },
    {
      loc: `${baseUrl}/blog/british-aircraft-great-war-rfc-rnas`,
      image: `${baseUrl}/blog-images/se5a-royal-aircraft-factory.jpg`,
      title: 'SE5a Royal Aircraft Factory',
      caption: 'British WWI fighter aircraft of the Royal Flying Corps',
    },
    {
      loc: `${baseUrl}/blog/percy-pilcher-scotland-aviation-pioneer`,
      image: `${baseUrl}/blog-images/percy-pilcher-hawk-glider.jpg`,
      title: 'Percy Pilcher Hawk Glider',
      caption: 'Scottish aviation pioneer Percy Pilcher with his famous Hawk glider',
    },
    {
      loc: `${baseUrl}/blog/lucy-lady-houston-schneider-trophy`,
      image: `${baseUrl}/blog-images/schneider-s6b-race.jpg`,
      title: 'Schneider Trophy S6B Racing',
      caption: 'The Schneider Trophy race supported by Lucy Lady Houston',
    },
    {
      loc: `${baseUrl}/blog/hawker-hurricane-fighter-development`,
      image: `${baseUrl}/blog-images/hawker-hurricane.jpg`,
      title: 'Hawker Hurricane Fighter',
      caption: 'Development of the legendary Hawker Hurricane fighter aircraft',
    },
    {
      loc: `${baseUrl}/blog/f86-sabre-cold-war-fighter`,
      image: `${baseUrl}/blog-images/f86-sabre-fighter-jet.jpg`,
      title: 'F-86 Sabre Jet Fighter',
      caption: 'North American F-86 Sabre during the Cold War era',
    },
    {
      loc: `${baseUrl}/blog/supermarine-spitfire-development-history`,
      image: `${baseUrl}/blog-images/spitfire-prototype-k5054.jpg`,
      title: 'Spitfire Prototype K5054',
      caption: 'The original Supermarine Spitfire prototype that changed aviation history',
    },
    {
      loc: `${baseUrl}/blog/sycamore-seeds-helicopter-evolution`,
      image: `${baseUrl}/blog-images/sycamore-seeds-helicopter.jpg`,
      title: 'Sycamore Seeds and Helicopter Evolution',
      caption: 'Nature\'s inspiration for helicopter rotor design and development',
    },
  ];

  // Additional aviation imagery
  const additionalImages = [
    {
      loc: `${baseUrl}/about`,
      image: `${baseUrl}/book-covers/beardmore-aviation.jpg`,
      title: 'Charles E. MacKay Aviation Books',
      caption: 'Comprehensive collection of Scottish aviation history books',
    },
    {
      loc: `${baseUrl}/scottish-aviation-timeline`,
      image: `${baseUrl}/blog-images/historical-scotland-map.jpg`,
      title: 'Scottish Aviation Timeline',
      caption: 'Historical timeline of Scottish contributions to aviation development',
    },
  ];

  const allImages = [...bookImages, ...blogImages, ...additionalImages];

  const imageXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allImages.map(item => `  <url>
    <loc>${item.loc}</loc>
    <image:image>
      <image:loc>${item.image}</image:loc>
      <image:title>${item.title}</image:title>
      <image:caption>${item.caption}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(imageXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
