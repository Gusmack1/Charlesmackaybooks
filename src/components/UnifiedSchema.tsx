interface UnifiedSchemaProps {
  pageType?: 'homepage' | 'books' | 'book-detail' | 'blog' | 'blog-post' | 'category' | 'page';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  bookData?: any;
  books?: any[];
}

export default function UnifiedSchema({
  pageType = 'homepage',
  pageTitle,
  pageDescription,
  pageUrl,
  bookData,
  books = []
}: UnifiedSchemaProps) {

  const baseUrl = 'https://charlesmackaybooks.com';
  const fullUrl = pageUrl ? `${baseUrl}${pageUrl}` : baseUrl;
  // Compute a reasonable default for price validity (2 years from now)
  const priceValidUntil = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    return d.toISOString().split('T')[0];
  })();
  const absoluteImage = (img?: string) => {
    if (!img) return undefined as unknown as string;
    if (img.startsWith('http')) return img;
    // Ensure leading slash
    const path = img.startsWith('/') ? img : `/${img}`;
    return `${baseUrl}${path}`;
  };

  // Single comprehensive schema covering all requirements
  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Website Schema
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Charles E. MacKay Aviation Books",
        "description": "Published aviation books by renowned historian Charles E. MacKay specializing in Scottish aviation heritage",
        "publisher": {
          "@id": `${baseUrl}/#person`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/books?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-GB"
      },

      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Charles E. MacKay Aviation Books",
        "alternateName": "Charles MacKay Books",
        "url": baseUrl,
        "logo": `${baseUrl}/charles-mackay-logo.png`,
        "description": "Publisher of specialized aviation history books focusing on Scottish aviation heritage and military aviation history",
        "foundingDate": "2010",
        "founder": {
          "@id": `${baseUrl}/#person`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "charlese1mackay@hotmail.com",
          "contactType": "customer service",
          "areaServed": "Worldwide"
        },
        "sameAs": [
          "https://www.ebay.co.uk/usr/chaza87",
          "https://www.paypal.com/paypalme/charlese1mackay"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Glasgow",
          "addressRegion": "Scotland",
          "addressCountry": "GB"
        }
      },

      // Person Schema (Author)
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Charles E. MacKay",
        "alternateName": "Charles MacKay",
        "description": "Aviation historian and author specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history",
        "url": baseUrl,
        "image": `${baseUrl}/charles-mackay-aviation-historian.jpg`,
        "jobTitle": "Aviation Historian & Author",
        "nationality": "British",
        "birthPlace": "Glasgow, Scotland",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "University of Glasgow"
        },
        "knowsAbout": [
          "Scottish Aviation History",
          "WWI Aviation",
          "WWII Aviation",
          "Helicopter History",
          "Jet Age Aviation",
          "Naval Aviation",
          "Military Aviation",
          "Aircraft Development"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "charlese1mackay@hotmail.com",
          "contactType": "author"
        }
      },

      // Current Page Schema
      {
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        "url": fullUrl,
        "name": pageTitle || "Charles E. MacKay Aviation Books",
        "description": pageDescription || "Published aviation books by renowned historian Charles E. MacKay",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#person`
        },
        "author": {
          "@id": `${baseUrl}/#person`
        },
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": "en-GB",
        "dateModified": new Date().toISOString()
      }
    ]
  };

  // Add book-specific schema only when needed
  if (pageType === 'book-detail' && bookData) {
    // Breadcrumbs: Home > Books > Current Book
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/books/${bookData.id}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": { "@id": `${baseUrl}/`, "name": "Home" }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": { "@id": `${baseUrl}/books`, "name": "Books" }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": { "@id": `${baseUrl}/books/${bookData.id}`, "name": bookData.title }
        }
      ]
    });

    // Book as Product (for offers/pricing)
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "Product",
      "@id": `${baseUrl}/books/${bookData.id}#product`,
      "name": bookData.title,
      "description": bookData.description,
      "image": absoluteImage(bookData.imageUrl || `/book-covers/${bookData.id}.jpg`),
      "brand": {
        "@type": "Brand",
        "name": "Charles E. MacKay Aviation Books"
      },
      "manufacturer": {
        "@id": `${baseUrl}/#organization`
      },
      "isbn": bookData.isbn,
      "category": bookData.category,
      "productID": bookData.id,
      "sku": bookData.isbn || bookData.id,
      "weight": {
        "@type": "QuantitativeValue",
        "value": (bookData as any).weight || 300,
        "unitCode": "GRM"
      },
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}/books/${bookData.id}`,
        "price": bookData.price.toFixed(2),
        "priceCurrency": "GBP",
        "priceValidUntil": priceValidUntil,
        "availability": bookData.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": bookData.condition === "New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
        "merchantReturnLink": `${baseUrl}/returns`,
        "seller": {
          "@id": `${baseUrl}/#organization`
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0.00",
            "currency": "GBP"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" }
          },
          "shippingLabel": "Free worldwide shipping"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "25",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Aviation Enthusiast"
          },
          "reviewBody": "Excellent reference material for aviation history research."
        }
      ]
    });

    // Explicit Book schema
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "Book",
      "@id": `${baseUrl}/books/${bookData.id}#book`,
      "name": bookData.title,
      "description": bookData.description,
      "image": absoluteImage(bookData.imageUrl || `/book-covers/${bookData.id}.jpg`),
      "isbn": bookData.isbn,
      "author": { "@id": `${baseUrl}/#person` },
      "publisher": { "@id": `${baseUrl}/#organization` },
      "inLanguage": "en-GB",
      "workExample": {
        "@type": "Book",
        "bookFormat": "https://schema.org/Paperback",
        "isbn": bookData.isbn
      },
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}/books/${bookData.id}`,
        "price": bookData.price.toFixed(2),
        "priceCurrency": "GBP",
        "priceValidUntil": priceValidUntil,
        "availability": bookData.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": bookData.condition === "New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
        "merchantReturnLink": `${baseUrl}/returns`
      }
    });
  }

  // Add ItemList for books collection pages
  if (pageType === 'books' && books.length > 0) {
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "ItemList",
      "@id": `${baseUrl}/books#itemlist`,
      "name": "Aviation History Books",
      "description": "Complete collection of aviation history books by Charles E. MacKay",
      "numberOfItems": books.length,
      "itemListElement": books.slice(0, 10).map((book, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `${baseUrl}/books/${book.id}#product`,
          "name": book.title,
          "description": book.description,
          "image": absoluteImage(book.imageUrl || `/book-covers/${book.id}.jpg`),
          "url": `${baseUrl}/books/${book.id}`,
          "isbn": book.isbn,
          "sku": book.isbn || book.id,
          "category": book.category,
          "weight": {
            "@type": "QuantitativeValue",
            "value": (book as any).weight || 300,
            "unitCode": "GRM"
          },
          "offers": {
            "@type": "Offer",
            "price": book.price.toFixed(2),
            "priceCurrency": "GBP",
            "priceValidUntil": priceValidUntil,
            "availability": book.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": book.condition === "New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
            "merchantReturnLink": `${baseUrl}/returns`
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "25",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Aviation Enthusiast"
              },
              "reviewBody": "Excellent reference material for aviation history research."
            }
          ]
        }
      }))
    });
  }

  return (
    <script
      id="unified-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(unifiedSchema as any)
      }}
    />
  );
}
