export default function WebSiteSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Charles E. MacKay Aviation Books",
    "alternateName": "Charles E. MacKay Aviation Research",
    "url": "https://charlesmackaybooks.com",
    "description": "Official website of aviation historian Charles E. MacKay featuring 19 published books on Scottish aviation heritage, military aircraft history, and aviation research resources.",
    "inLanguage": "en-GB",
    "isAccessibleForFree": true,
    "publisher": {
      "@type": "Organization",
      "name": "Charles E. MacKay Aviation Research",
      "url": "https://charlesmackaybooks.com"
    },
    "author": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com/about"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://charlesmackaybooks.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@type": "ItemList",
      "name": "Aviation History Resources",
      "description": "Comprehensive collection of aviation history books, research materials, and educational resources",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CollectionPage",
            "name": "Aviation History Books",
            "url": "https://charlesmackaybooks.com",
            "description": "19 published books on aviation history and Scottish aviation heritage"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebPage",
            "name": "Aviation Bibliography Database",
            "url": "https://charlesmackaybooks.com/aviation-bibliography",
            "description": "Comprehensive aviation history bibliography with 150+ primary sources"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "WebPage",
            "name": "Aviation Glossary",
            "url": "https://charlesmackaybooks.com/aviation-glossary",
            "description": "Complete dictionary of aviation terminology with 500+ technical terms"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "WebPage",
            "name": "Scottish Aviation Timeline",
            "url": "https://charlesmackaybooks.com/scottish-aviation-timeline",
            "description": "Comprehensive timeline of Scottish aviation history from 1903 to present"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "WebPage",
            "name": "Aviation Research Guides",
            "url": "https://charlesmackaybooks.com/research-guides",
            "description": "Academic research resources for aviation history studies"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "WebPage",
            "name": "For Researchers",
            "url": "https://charlesmackaybooks.com/for-researchers",
            "description": "Academic resources and research collaboration opportunities"
          }
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://charlesmackaybooks.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Books",
          "item": "https://charlesmackaybooks.com#books"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Research Resources",
          "item": "https://charlesmackaybooks.com/research-guides"
        }
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".book-title", ".author-name"]
    },
    "audience": [
      {
        "@type": "Audience",
        "audienceType": "Academic Researchers",
        "name": "Aviation History Researchers"
      },
      {
        "@type": "Audience",
        "audienceType": "Students",
        "name": "Aviation Studies Students"
      },
      {
        "@type": "Audience",
        "audienceType": "Professionals",
        "name": "Aviation Industry Professionals"
      },
      {
        "@type": "Audience",
        "audienceType": "Enthusiasts",
        "name": "Aviation History Enthusiasts"
      }
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Scottish Aviation History"
      },
      {
        "@type": "Thing",
        "name": "Military Aircraft Development"
      },
      {
        "@type": "Thing",
        "name": "Aviation Research"
      },
      {
        "@type": "Thing",
        "name": "Helicopter History"
      },
      {
        "@type": "Thing",
        "name": "WWI Aviation"
      },
      {
        "@type": "Thing",
        "name": "WWII Aviation"
      }
    ],
    "keywords": [
      "Charles E MacKay",
      "aviation history books",
      "Scottish aviation history",
      "aviation research",
      "military aircraft",
      "helicopter development",
      "Beardmore Aviation",
      "Clydeside Aviation",
      "aviation bibliography",
      "aviation glossary",
      "Scottish aviation timeline"
    ],
    "copyrightHolder": {
      "@type": "Person",
      "name": "Charles E. MacKay"
    },
    "copyrightYear": 2023,
    "license": "https://charlesmackaybooks.com/terms",
    "accessibilityFeature": [
      "readingOrder",
      "structuralNavigation",
      "tableOfContents",
      "index"
    ],
    "accessibilityHazard": "none",
    "accessibilityControl": [
      "fullKeyboardControl",
      "fullMouseControl"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
