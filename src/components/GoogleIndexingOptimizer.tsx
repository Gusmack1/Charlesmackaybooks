'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface GoogleIndexingOptimizerProps {
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

export default function GoogleIndexingOptimizer({
  priority = 'medium',
  category
}: GoogleIndexingOptimizerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Add structured data for better indexing
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: `https://charlesmackaybooks.com${pathname}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://charlesmackaybooks.com${pathname}`,
      },
      publisher: {
        '@type': 'Person',
        name: 'Charles E. MacKay',
        url: 'https://charlesmackaybooks.com/about'
      },
      dateModified: new Date().toISOString(),
      potentialAction: {
        '@type': 'ReadAction',
        target: `https://charlesmackaybooks.com${pathname}`
      }
    };

    // Create script element for structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add meta tags for indexing hints
    const metaTags = [
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://charlesmackaybooks.com${pathname}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'google-site-verification', content: 'a7ce294f58dd63f7' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.name) meta.name = tag.name;
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Add canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://charlesmackaybooks.com${pathname}`;
    document.head.appendChild(canonical);

    // Add hreflang for international SEO
    const hreflang = document.createElement('link');
    hreflang.rel = 'alternate';
    hreflang.setAttribute('hreflang', 'en-GB');
    hreflang.href = `https://charlesmackaybooks.com${pathname}`;
    document.head.appendChild(hreflang);

    // Request indexing (Google Indexing API simulation)
    if (typeof window !== 'undefined' && priority === 'high') {
      // Notify search engines of the page
      fetch('/api/notify-search-engines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `https://charlesmackaybooks.com${pathname}`,
          priority,
          category
        })
      }).catch(() => {
        // Silent fail - this is enhancement only
      });
    }

    // Cleanup function
    return () => {
      // Remove added elements on unmount
      const addedScript = document.querySelector(`script[type="application/ld+json"]:last-of-type`);
      if (addedScript) addedScript.remove();
    };
  }, [pathname, priority, category]);

  // Render internal links for crawlability
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* Internal navigation links for crawler discovery */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <nav itemScope itemType="https://schema.org/SiteNavigationElement">
        <a href="/" itemProp="url">
          <span itemProp="name">Home</span>
        </a>
        <a href="/books" itemProp="url">
          <span itemProp="name">Books</span>
        </a>
        <a href="/blog" itemProp="url">
          <span itemProp="name">Blog</span>
        </a>
        <a href="/about" itemProp="url">
          <span itemProp="name">About</span>
        </a>
        <a href="/how-to-order" itemProp="url">
          <span itemProp="name">How to Order</span>
        </a>
        <a href="/contact" itemProp="url">
          <span itemProp="name">Contact</span>
        </a>
        <a href="/for-researchers" itemProp="url">
          <span itemProp="name">For Researchers</span>
        </a>
        <a href="/research-guides" itemProp="url">
          <span itemProp="name">Research Guides</span>
        </a>
        <a href="/aviation-glossary" itemProp="url">
          <span itemProp="name">Aviation Glossary</span>
        </a>
        <a href="/scottish-aviation-timeline" itemProp="url">
          <span itemProp="name">Scottish Aviation Timeline</span>
        </a>
        <a href="/aviation-bibliography" itemProp="url">
          <span itemProp="name">Aviation Bibliography</span>
        </a>
        <a href="/timeline" itemProp="url">
          <span itemProp="name">Timeline</span>
        </a>
      </nav>

      {/* Category links for discovery */}
      <nav itemScope itemType="https://schema.org/SiteNavigationElement">
        <a href="/category/scottish-aviation-history" itemProp="url">
          <span itemProp="name">Scottish Aviation History</span>
        </a>
        <a href="/category/wwi-aviation" itemProp="url">
          <span itemProp="name">WWI Aviation</span>
        </a>
        <a href="/category/wwii-aviation" itemProp="url">
          <span itemProp="name">WWII Aviation</span>
        </a>
        <a href="/category/aviation-biography" itemProp="url">
          <span itemProp="name">Aviation Biography</span>
        </a>
        <a href="/category/helicopter-history" itemProp="url">
          <span itemProp="name">Helicopter History</span>
        </a>
        <a href="/category/military-history" itemProp="url">
          <span itemProp="name">Military History</span>
        </a>
        <a href="/category/naval-aviation" itemProp="url">
          <span itemProp="name">Naval Aviation</span>
        </a>
        <a href="/category/jet-age-aviation" itemProp="url">
          <span itemProp="name">Jet Age Aviation</span>
        </a>
      </nav>

      {/* Book links for discovery */}
      <nav itemScope itemType="https://schema.org/SiteNavigationElement">
        <a href="/books/beardmore-aviation" itemProp="url">
          <span itemProp="name">Beardmore Aviation</span>
        </a>
        <a href="/books/clydeside-aviation-vol1" itemProp="url">
          <span itemProp="name">Clydeside Aviation Volume 1</span>
        </a>
        <a href="/books/clydeside-aviation-vol2" itemProp="url">
          <span itemProp="name">Clydeside Aviation Volume 2</span>
        </a>
        <a href="/books/german-aircraft-great-war" itemProp="url">
          <span itemProp="name">German Aircraft Great War</span>
        </a>
        <a href="/books/british-aircraft-great-war" itemProp="url">
          <span itemProp="name">British Aircraft Great War</span>
        </a>
        <a href="/books/sycamore-seeds" itemProp="url">
          <span itemProp="name">Sycamore Seeds</span>
        </a>
      </nav>

      {/* Blog links for discovery */}
      <nav itemScope itemType="https://schema.org/SiteNavigationElement">
        <a href="/blog/beardmore-aviation-scottish-industrial-giant" itemProp="url">
          <span itemProp="name">Beardmore Aviation Scottish Industrial Giant</span>
        </a>
        <a href="/blog/clydeside-aviation-revolution" itemProp="url">
          <span itemProp="name">Clydeside Aviation Revolution</span>
        </a>
        <a href="/blog/german-aircraft-great-war-development" itemProp="url">
          <span itemProp="name">German Aircraft Great War Development</span>
        </a>
        <a href="/blog/percy-pilcher-scotland-aviation-pioneer" itemProp="url">
          <span itemProp="name">Percy Pilcher Scotland Aviation Pioneer</span>
        </a>
        <a href="/blog/lucy-lady-houston-schneider-trophy" itemProp="url">
          <span itemProp="name">Lucy Lady Houston Schneider Trophy</span>
        </a>
      </nav>

      {/* Aircraft pages removed */}
    </div>
  );
}
