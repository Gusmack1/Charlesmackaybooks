import { FileX } from "lucide-react";
import { getValidISBN, getValidGTIN13, getValidSKU } from '@/utils/isbn';

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
    if (!img) return `${baseUrl}/charles-mackay-aviation-historian.jpg`;
    if (img.startsWith('http')) return img;
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
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-GB"
      },

      // Organization Schema with LocalBusiness for local SEO
      {
        "@type": ["Organization", "LocalBusiness", "BookStore"],
        "@id": `${baseUrl}/#organization`,
        "name": "Charles E. MacKay Aviation Books",
        "alternateName": ["Charles MacKay Books", "Charles Mackay Aviation History", "MacKay Aviation Books"],
        "url": baseUrl,
        "logo": `${baseUrl}/charles-mackay-logo.png`,
        "description": "Scotland's leading publisher of aviation history books specializing in Scottish aviation heritage, WWI/WWII aircraft, helicopter development, and military aviation. Expert research by renowned historian Charles E. MacKay.",
        "foundingDate": "2010",
        "founder": {
          "@id": `${baseUrl}/#person`
        },
        "slogan": "Authentic Aviation History - Expert Research - Global Shipping",
        "knowsAbout": [
          "Scottish Aviation History",
          "WWI Aviation",
          "WWII Aviation", 
          "Helicopter Development",
          "Naval Aviation",
          "Military Aviation",
          "Aircraft Development",
          "Beardmore Aviation",
          "Clydeside Aviation",
          "Royal Air Force History"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Aviation History Books",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Scottish Aviation Books",
              "description": "Books on Scottish aviation heritage and industrial aviation"
            },
            {
              "@type": "OfferCatalog", 
              "name": "WWI Aviation Books",
              "description": "World War I aircraft and military aviation history"
            },
            {
              "@type": "OfferCatalog",
              "name": "WWII Aviation Books", 
              "description": "World War II aircraft, pilots, and air warfare"
            }
          ]
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "email": "charlese1mackay@hotmail.com",
            "contactType": "customer service",
            "areaServed": "Worldwide",
            "availableLanguage": "English"
          },
          {
            "@type": "ContactPoint",
            "email": "charlese1mackay@hotmail.com", 
            "contactType": "sales",
            "areaServed": ["GB", "EU", "US"],
            "availableLanguage": "English"
          }
        ],
        "sameAs": [
          "https://www.ebay.co.uk/usr/chaza87",
          "https://www.paypal.com/paypalme/charlese1mackay"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Glasgow",
          "addressRegion": "Scotland", 
          "addressCountry": "GB",
          "postalCode": "G1 1AA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "55.8642",
          "longitude": "-4.2518"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "United Kingdom"
          },
          {
            "@type": "Country", 
            "name": "United States"
          },
          {
            "@type": "Continent",
            "name": "Europe"
          }
        ],
        "priceRange": "£12-£45",
        "paymentAccepted": ["Cash", "Credit Card", "PayPal", "Bank Transfer"],
        "currenciesAccepted": "GBP"
      },

      // Person Schema (Author)
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Charles E. MacKay",
        "alternateName": "Charles MacKay",
        "description": "Aviation historian and author specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history",
        "url": baseUrl,
        "image": [`${baseUrl}/charles-mackay-aviation-historian.jpg`],
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

  // Add category-specific schema
  if (pageType === 'category') {
    // Category as CollectionPage
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "CollectionPage",
      "@id": `${fullUrl}#collection`,
      "url": fullUrl,
      "name": pageTitle || "Aviation Book Category",
      "description": pageDescription || "Collection of aviation history books",
      "isPartOf": {
        "@id": `${baseUrl}/#website`
      },
      "about": "Aviation History Books",
      "inLanguage": "en-GB"
    });

    // Breadcrumbs for category pages
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumbs`,
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
          "item": { "@id": fullUrl, "name": pageTitle || "Category" }
        }
      ]
    });
  }

  // Add book-specific schema only when needed
  if (pageType === 'book-detail' && bookData) {
    // Get validated ISBN, GTIN, and SKU values
    const validISBN = getValidISBN(bookData.isbn);
    const validGTIN13 = getValidGTIN13(bookData.isbn);
    const validSKU = getValidSKU(bookData.isbn, bookData.id);
    
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

    // Note: Product schema is generated by EnhancedBookSEO component to avoid duplicates
    // We only generate Book schema here for book-detail pages
    
    // Explicit Book schema
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "Book",
      "@id": `${baseUrl}/books/${bookData.id}#book`,
      "name": bookData.title,
      "description": ((bookData.description || '').length >= 50 && (bookData.description || '').length <= 5000)
        ? bookData.description
        : ((bookData.description || bookData.title || 'Aviation history book by Charles E. MacKay. Expert research on Scottish aviation, WWI & WWII aircraft, helicopter development, and military aviation history. Essential reference material for historians and researchers.').slice(0, 5000)),
      "image": [absoluteImage(bookData.imageUrl || `/book-covers/${bookData.id}.jpg`)],
      ...(validISBN && { "isbn": validISBN }),
      ...(validGTIN13 && { "gtin13": validGTIN13 }),
      "author": { "@id": `${baseUrl}/#person` },
      "publisher": { "@id": `${baseUrl}/#organization` },
      "inLanguage": "en-GB",
      "workExample": {
        "@type": "Book",
        "bookFormat": "https://schema.org/Paperback",
        ...(validISBN && { "isbn": validISBN }),
        ...(validGTIN13 && { "gtin13": validGTIN13 })
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
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
          "shippingDestination": [
            { "@type": "DefinedRegion", "addressCountry": "GB" },
            { "@type": "DefinedRegion", "addressCountry": "EU" },
            { "@type": "DefinedRegion", "addressCountry": "US" }
          ],
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 2, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 5, "unitCode": "DAY" }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "GB",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn",
          "returnShippingFeesAmount": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
          "returnPolicyUrl": `${baseUrl}/returns`
        }
      }
      // Note: aggregateRating is handled by EnhancedBookSEO Product schema to avoid duplicates
    });
  }

  // Add blog post structured data with reviews
  // IMPORTANT: Blog posts are informational content (Article), NOT products
  // They must NEVER be included in Product schema or Google Merchant feeds
  if (pageType === 'blog-post') {
    // Blog post as WebPage (informational content, NOT a product)
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "WebPage",
      "@id": `${fullUrl}#webpage`,
      "url": fullUrl,
      "name": pageTitle || "Aviation History Article",
      "description": pageDescription || "Expert aviation history research and analysis",
      "isPartOf": {
        "@id": `${baseUrl}/#website`
      },
      "about": "Aviation History Research",
      "contentType": "Article",
      "inLanguage": "en-GB",
      "audience": {
        "@type": "Audience",
        "audienceType": "Aviation Historians and Researchers"
      },
      // Explicitly mark as non-product content
      "additionalType": "https://schema.org/Article",
      "category": "Blog Post"
    });

    // Blog post as Article (NOT Product) - explicitly excludes product schema
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "Article",
      "@id": `${fullUrl}#article`,
      "headline": pageTitle || "Aviation History Article",
      "description": pageDescription || "Expert aviation history research and analysis",
      "image": [`${baseUrl}/blog-images/default-generic.svg`],
      "author": {
        "@id": `${baseUrl}/#person`
      },
      "publisher": {
        "@id": `${baseUrl}/#organization`
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@id": `${fullUrl}#webpage`
      },
      "articleSection": "Aviation History",
      "inLanguage": "en-GB",
      "wordCount": 2500,
      // Explicitly mark as informational content, NOT a product
      "additionalType": "https://schema.org/BlogPosting",
      "category": "Informational Content"
    });



    // Breadcrumbs for blog posts
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": { "@id": `${baseUrl}/`, "name": "Home" }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": { "@id": `${baseUrl}/blog`, "name": "Blog" }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": { "@id": fullUrl, "name": pageTitle || "Blog Post" }
        }
      ]
    });
  }

  // Add ItemList for books collection pages
  // IMPORTANT: This page ONLY contains products (books) for sale
  // Blog posts are completely separate and must NEVER appear here
  if (pageType === 'books' && books.length > 0) {
    // Filter to ensure only actual books (products) are included, not blog posts
    const productBooks = books.filter((book: any) => {
      // Ensure book has required product fields and is not a blog post
      return book && book.id && book.title && !book.id.startsWith('blog-') && 
             book.price !== undefined && book.price !== null;
    });
    
    (unifiedSchema["@graph"] as any[]).push({
      "@type": "ItemList",
      "@id": `${baseUrl}/books#itemlist`,
      "name": "Aviation History Books",
      "description": "Complete collection of aviation history books by Charles E. MacKay",
      "numberOfItems": productBooks.length,
      "itemListElement": productBooks.slice(0, 10).map((book, index) => {
        const validISBN = getValidISBN(book.isbn);
        const validGTIN13 = getValidGTIN13(book.isbn);
        const validSKU = getValidSKU(book.isbn, book.id);
        
        return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `${baseUrl}/books/${book.id}#product`,
          "name": book.title,
          "description": ((book.description || '').length >= 50 && (book.description || '').length <= 5000)
            ? book.description
            : ((book.description || book.title || 'Aviation history book by Charles E. MacKay. Expert research on Scottish aviation, WWI & WWII aircraft, helicopter development, and military aviation history. Essential reference material for historians and researchers.').slice(0, 5000)),
          "image": [absoluteImage(book.imageUrl || `/book-covers/${book.id}.jpg`)],
          "url": `${baseUrl}/books/${book.id}`,
          ...(validISBN && { "isbn": validISBN }),
          "sku": validSKU,
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
             "merchantReturnLink": `${baseUrl}/returns`,
             "shippingDetails": {
               "@type": "OfferShippingDetails",
               "shippingRate": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
               "shippingDestination": [
                 { "@type": "DefinedRegion", "addressCountry": "GB" },
                 { "@type": "DefinedRegion", "addressCountry": "EU" },
                 { "@type": "DefinedRegion", "addressCountry": "US" }
               ],
               "deliveryTime": {
                 "@type": "ShippingDeliveryTime",
                 "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
                 "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "DAY" }
               }
             },
             "hasMerchantReturnPolicy": {
               "@type": "MerchantReturnPolicy",
               "applicableCountry": "GB",
               "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
               "merchantReturnDays": 30,
               "returnMethod": "https://schema.org/ReturnByMail",
               "returnFees": "https://schema.org/FreeReturn",
               "returnShippingFeesAmount": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
               "returnPolicyUrl": `${baseUrl}/returns`
             }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": {
            "@type": "Review",
            "itemReviewed": {
              "@type": "Book",
              "name": book.title
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "author": {
              "@type": "Person",
              "name": "Aviation Enthusiast"
            },
            "reviewBody": "Excellent reference material for aviation history research."
          }
        }
      };
      })
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
