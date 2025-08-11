export async function GET() {
  const robots = `# Charles MacKay Books Robots.txt
User-agent: *
Allow: /
Crawl-delay: 1

# Google Shopping Bot
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Google Merchant Center
User-agent: Googlebot-Image
Allow: /images/
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$

# Product Feeds
Allow: /products.xml
Allow: /merchant-feed.txt
Allow: /shopping-actions.xml
Allow: /book-covers/
Allow: /blog-images/

# Sitemaps
Sitemap: https://charlesmackaybooks.com/sitemap.xml
Sitemap: https://charlesmackaybooks.com/sitemap-indexing-fix.xml
Sitemap: https://charlesmackaybooks.com/sitemap-images.xml

# Key policies/pages
Allow: /how-to-order
Allow: /returns

# Allow Google Rich Results Test
User-agent: Google-InspectionTool
Allow: /

# Allow merchant validators
User-agent: Google-Merchant-Center
Allow: /
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}