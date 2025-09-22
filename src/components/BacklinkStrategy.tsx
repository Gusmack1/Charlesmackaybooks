'use client';

export default function BacklinkStrategy() {
  // Linkable assets and content for aviation history community outreach
  const linkableAssets = {
    authorityContent: [
      {
        title: "Scottish Aviation Timeline - Interactive History",
        url: "/scottish-aviation-timeline",
        description: "Comprehensive interactive timeline of Scottish aviation from 1903-2023",
        targetAudience: "Aviation museums, educational institutions, Wikipedia editors"
      },
      {
        title: "Aviation Glossary - Technical Reference",
        url: "/aviation-glossary", 
        description: "Authoritative aviation terminology and technical definitions",
        targetAudience: "Aviation websites, educational resources, reference sites"
      },
      {
        title: "Aviation Bibliography - Research Sources",
        url: "/aviation-bibliography",
        description: "Comprehensive bibliography of aviation history sources and references",
        targetAudience: "Academic researchers, librarians, aviation historians"
      }
    ],
    expertContent: [
      {
        title: "Charles E. MacKay - Aviation Historian Biography",
        url: "/about",
        description: "Expert credentials and background of renowned aviation historian",
        targetAudience: "Aviation publications, interview requests, academic citations"
      },
      {
        title: "Research Guides for Aviation History",
        url: "/research-guides",
        description: "Expert methodology and approach to aviation historical research",
        targetAudience: "University history departments, research institutions"
      }
    ],
    uniqueResearch: [
      {
        title: "Beardmore Aviation - Scottish Industrial Giant's Aviation Activities",
        url: "/books/beardmore-aviation",
        description: "First comprehensive study of Beardmore's aviation work with original archives",
        targetAudience: "Industrial history sites, Scottish heritage organizations"
      },
      {
        title: "HMS Argus - First Aircraft Carrier Operations",
        url: "/blog/hms-argus-first-aircraft-carrier-operations",
        description: "Detailed analysis of world's first true aircraft carrier operations",
        targetAudience: "Naval history sites, maritime museums, military historians"
      }
    ]
  };

  // Schema markup for linkable content authority
  const backlinkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Aviation History Authority Content",
    "description": "Authoritative aviation history content suitable for academic citation and reference linking",
    "author": {
      "@type": "Person", 
      "name": "Charles E. MacKay",
      "jobTitle": "Aviation Historian",
      "affiliation": {
        "@type": "Organization",
        "name": "Charles E. MacKay Aviation Books"
      }
    },
    "about": [
      "Scottish Aviation History",
      "WWI Aviation", 
      "WWII Aviation",
      "Naval Aviation",
      "Helicopter Development",
      "Military Aviation",
      "Aviation Biography"
    ],
    "citation": [
      {
        "@type": "CreativeWork",
        "name": "Imperial War Museum Collections",
        "url": "https://www.iwm.org.uk"
      },
      {
        "@type": "CreativeWork", 
        "name": "Royal Air Force Museum",
        "url": "https://www.rafmuseum.org.uk"
      }
    ],
    "usageInfo": "Content available for academic citation, educational use, and reference linking with proper attribution",
    "license": "https://charlesmackaybooks.com/terms",
    "isAccessibleForFree": true,
    "hasPart": [
      ...linkableAssets.authorityContent.map(asset => ({
        "@type": "WebPage",
        "name": asset.title,
        "url": `https://charlesmackaybooks.com${asset.url}`,
        "description": asset.description
      })),
      ...linkableAssets.expertContent.map(asset => ({
        "@type": "WebPage", 
        "name": asset.title,
        "url": `https://charlesmackaybooks.com${asset.url}`,
        "description": asset.description
      }))
    ]
  };

  // Add meta tags for content syndication and citation
  const syndicationMetas = [
    { name: 'syndication-source', content: 'https://charlesmackaybooks.com' },
    { name: 'original-source', content: 'https://charlesmackaybooks.com' },
    { name: 'citation-format', content: 'APA, MLA, Chicago available' },
    { name: 'academic-level', content: 'undergraduate, graduate, research' },
    { name: 'content-type', content: 'authoritative historical research' },
    { name: 'peer-review-status', content: 'expert-reviewed historical content' },
    { name: 'archive-policy', content: 'permanent archival commitment' }
  ];

  // Only run meta additions on client-side
  if (typeof window !== 'undefined') {
    syndicationMetas.forEach(meta => {
      if (!document.querySelector(`meta[name="${meta.name}"]`)) {
        const metaEl = document.createElement('meta');
        metaEl.name = meta.name;
        metaEl.content = meta.content;
        document.head.appendChild(metaEl);
      }
    });
  }

  return (
    <>
      {/* Backlink strategy schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(backlinkSchema)
        }}
      />

      {/* Hidden linkable content references for crawlers */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h2>Authoritative Aviation History Resources</h2>
        {Object.values(linkableAssets).flat().map((asset, index) => (
          <div key={index}>
            <h3>{asset.title}</h3>
            <p>{asset.description}</p>
            <a href={asset.url} rel="canonical">{asset.title}</a>
          </div>
        ))}
      </div>
    </>
  );
}
