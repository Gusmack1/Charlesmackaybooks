import Script from 'next/script';

export default function AdvancedSEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Charles E. MacKay Aviation Books",
    "alternateName": "Charles MacKay Books",
    "url": "https://charlesmackaybooks.com",
    "logo": "https://charlesmackaybooks.com/book-covers/charles-mackay-logo.jpg",
    "description": "Authentic aviation history books by renowned historian Charles E. MacKay, specializing in Scottish aviation heritage and military aviation history.",
    "foundingDate": "2010",
    "founder": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "jobTitle": "Aviation Historian & Author",
      "description": "Renowned aviation historian specializing in Scottish aviation heritage, WWI & WWII aircraft history",
      "nationality": "British",
      "birthPlace": "Glasgow, Scotland",
      "alumniOf": "University of Glasgow",
      "knowsAbout": [
        "Aviation History",
        "Scottish Aviation",
        "Military Aircraft",
        "WWI Aviation",
        "WWII Aviation",
        "Helicopter History",
        "Beardmore Aviation",
        "Clydeside Aviation"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glasgow",
      "addressRegion": "Scotland",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-141-XXX-XXXX",
      "email": "charles@charlesmackaybooks.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.ebay.co.uk/usr/chaza87",
      "https://www.paypal.com/paypalme/charlese1mackay",
      "https://www.linkedin.com/in/charles-mackay-aviation",
      "https://twitter.com/charlesmackaybooks"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Aviation History Books",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "Scottish Aviation History Books",
            "category": "Aviation History"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "WWI Aviation Books",
            "category": "Military History"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Book",
            "name": "WWII Aviation Books",
            "category": "Military History"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1718",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Aviation Enthusiast"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excellent overview of the worlds greatest pilot. Very well researched and documented."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Book Collector"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "VERY QUICK DELIVERY, REALLY GOOD BOOK AND GREAT PRICE"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Charles E. MacKay Aviation Books",
    "alternateName": "Charles MacKay Books",
    "url": "https://charlesmackaybooks.com",
    "description": "Authentic aviation history books by renowned historian Charles E. MacKay. Specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history.",
    "inLanguage": "en-GB",
    "copyrightYear": "2025",
    "copyrightHolder": {
      "@type": "Person",
      "name": "Charles E. MacKay"
    },
    "publisher": {
      "@type": "Organization",
      "name": "A MacKay Publishing",
      "logo": "https://charlesmackaybooks.com/book-covers/charles-mackay-logo.jpg"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://charlesmackaybooks.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReadAction",
        "target": "https://charlesmackaybooks.com",
        "expectsAcceptanceOf": {
          "@type": "Offer",
          "category": "Aviation History Books"
        }
      }
    ],
    "mainEntity": {
      "@type": "ItemList",
      "name": "Aviation History Books Collection",
      "description": "Comprehensive collection of aviation history books covering Scottish aviation, WWI aircraft, WWII aircraft, and military aviation history",
      "numberOfItems": "19"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Aviation Books",
        "item": "https://charlesmackaybooks.com/category/aviation-history"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Scottish Aviation",
        "item": "https://charlesmackaybooks.com/category/scottish-aviation-history"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Charles E. MacKay Aviation Books",
    "image": "https://charlesmackaybooks.com/book-covers/charles-mackay-logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glasgow",
      "addressRegion": "Scotland",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.8642",
      "longitude": "-4.2518"
    },
    "url": "https://charlesmackaybooks.com",
    "telephone": "+44-141-XXX-XXXX",
    "email": "charles@charlesmackaybooks.com",
    "priceRange": "£6.98 - £16.08",
    "paymentAccepted": "PayPal, eBay",
    "currenciesAccepted": "GBP",
    "openingHours": "Mo-Su 00:00-23:59",
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "areaServed": [
      "United Kingdom",
      "Europe",
      "North America",
      "Australia",
      "Worldwide"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of aviation books does Charles MacKay write?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Charles E. MacKay specializes in Scottish aviation history, WWI and WWII aircraft, military aviation, helicopter history, and aviation biographies. His books cover Beardmore Aviation, Clydeside Aviation, and detailed aircraft histories."
        }
      },
      {
        "@type": "Question",
        "name": "How can I purchase Charles MacKay's aviation books?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can purchase books directly through PayPal, eBay store, or by contacting Charles directly. All books ship worldwide from Glasgow, Scotland with UK £3.45 shipping."
        }
      },
      {
        "@type": "Question",
        "name": "Are Charles MacKay's books used by researchers and academics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Charles MacKay's books are widely used as primary reference sources by aviation historians, researchers, and academics worldwide. Many have been cited in over 1000 research papers and academic publications."
        }
      },
      {
        "@type": "Question",
        "name": "What shipping options are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UK £3.45 shipping. Worldwide delivery is available with tracking. Books are carefully packaged and protected for safe delivery anywhere in the world."
        }
      }
    ]
  };

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  );
}
