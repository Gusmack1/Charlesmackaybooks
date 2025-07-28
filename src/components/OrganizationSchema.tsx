export default function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Charles E. MacKay Aviation Research",
    "alternateName": "Charles E. MacKay Books",
    "url": "https://charlesmackaybooks.com",
    "logo": "https://charlesmackaybooks.com/logo.png",
    "description": "Leading aviation history publisher and research organization specializing in Scottish aviation heritage, military aircraft history, and primary source documentation. Founded by renowned aviation historian Charles E. MacKay.",
    "foundingDate": "2011",
    "founder": {
      "@type": "Person",
      "@id": "https://charlesmackaybooks.com/about",
      "name": "Charles E. MacKay",
      "jobTitle": "Aviation Historian & Author",
      "description": "Renowned aviation historian with 19 published books and over 12 years of specialized research in Scottish aviation heritage and military aircraft development.",
      "expertise": [
        "Scottish Aviation History",
        "Military Aircraft Development",
        "Aviation Manufacturing History",
        "Primary Source Research",
        "Helicopter Development",
        "WWI Aviation",
        "WWII Aviation"
      ],
      "award": [
        "Recognized by Imperial War Museum",
        "Cited by Royal Aeronautical Society",
        "Primary Reference Source - Aviation Academic Database",
        "Over 1,700 Satisfied International Customers"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Charles E. MacKay Aviation Research"
      },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Glasgow University Research Community"
        }
      ],
      "sameAs": [
        "https://www.ebay.co.uk/usr/chaza87",
        "https://charlesmackaybooks.com/about"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glasgow",
      "addressRegion": "Scotland",
      "addressCountry": "GB"
    },
    "areaServed": [
      "Worldwide",
      "United Kingdom",
      "Europe",
      "North America",
      "Academic Institutions Globally"
    ],
    "serviceType": [
      "Aviation History Research",
      "Academic Publishing",
      "Historical Documentation",
      "Primary Source Analysis",
      "Aviation Heritage Preservation"
    ],
    "specialty": [
      "Scottish Aviation Heritage",
      "Beardmore Aviation History",
      "Clydeside Aviation Manufacturing",
      "WWI Aircraft Development",
      "WWII Military Aviation",
      "Helicopter History & Development",
      "Aviation Biography & Personnel",
      "Technical Aviation History"
    ],
    "knowsAbout": [
      "Scottish Aviation History",
      "Aviation Manufacturing",
      "Military Aircraft Development",
      "Helicopter Technology",
      "Aviation Research Methodology",
      "Primary Source Documentation",
      "Aviation Heritage Preservation",
      "Academic Aviation Research"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Aviation History Books & Research",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "Beardmore Aviation: Scottish Industrial Giant's Aviation Activities",
            "category": "Scottish Aviation History"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "Clydeside Aviation Volume One: The Great War",
            "category": "WWI Aviation History"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "The Sycamore Seeds: Early History of the Helicopter",
            "category": "Helicopter Development"
          }
        }
      ]
    },
    "owns": [
      {
        "@type": "WebSite",
        "@id": "https://charlesmackaybooks.com",
        "name": "Charles E. MacKay Aviation Books",
        "description": "Official website for Charles E. MacKay's aviation history research and publications"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Royal Aeronautical Society Research Community"
      },
      {
        "@type": "Organization",
        "name": "Imperial War Museum Research Network"
      },
      {
        "@type": "Organization",
        "name": "Scottish Aviation Heritage Association"
      }
    ],
    "award": [
      "Recognized as Primary Reference Source by Aviation Academic Database",
      "Cited by Imperial War Museum Research",
      "Endorsed by Royal Aeronautical Society",
      "Referenced by International Universities",
      "Over 1,700 Satisfied Customers Worldwide"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Academic Inquiries",
        "description": "For academic research collaboration and university partnerships",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Book Sales",
        "description": "For book purchases and customer service",
        "availableLanguage": ["English"]
      }
    ],
    "publishingPrinciples": "https://charlesmackaybooks.com/research-methodology",
    "ethicsPolicy": "Committed to historical accuracy through primary source research and academic validation",
    "diversityPolicy": "Supporting global access to Scottish aviation heritage and historical knowledge",
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/SellAction",
        "userInteractionCount": 1700,
        "description": "Books sold to customers worldwide"
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CitationOrReference",
        "userInteractionCount": 150,
        "description": "Academic citations in research papers"
      }
    ],
    "isPartOf": {
      "@type": "WebSite",
      "name": "Charles E. MacKay Aviation Research",
      "url": "https://charlesmackaybooks.com"
    }
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
