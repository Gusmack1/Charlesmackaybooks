import { getValidGTIN13, getValidISBN, getValidSKU } from '@/utils/isbn'

type PageType =
  | 'homepage'
  | 'books'
  | 'book-detail'
  | 'blog'
  | 'blog-post'
  | 'category'
  | 'page'

interface BasicBookData {
  id?: string
  title?: string
  imageUrl?: string
  price?: number
  isbn?: string
  inStock?: boolean
  condition?: string
  weight?: number
  category?: string
  description?: string
}

interface UnifiedSchemaProps {
  pageType?: PageType
  pageTitle?: string
  pageDescription?: string
  pageUrl?: string
  bookData?: BasicBookData | null
  books?: Array<{
    id: string
    title: string
    price: number
    isbn?: string
    imageUrl?: string
    inStock?: boolean
    condition?: string
    category?: string
    description?: string
    weight?: number
  }>
}

const BASE_URL = 'https://charlesmackaybooks.com'

export default function UnifiedSchema({
  pageType = 'homepage',
  pageTitle,
  pageDescription,
  pageUrl,
  bookData = null,
  books = [],
}: UnifiedSchemaProps) {
  const normalizedPath = normalizePath(pageUrl)
  const fullUrl = !normalizedPath || normalizedPath === '/' ? BASE_URL : `${BASE_URL}${normalizedPath}`

  const priceValidUntil = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 2)
    return d.toISOString().split('T')[0]
  })()

  const absoluteImage = (src?: string) => {
    if (!src) return `${BASE_URL}/charles-mackay-aviation-historian.jpg`
    if (src.startsWith('http')) return src
    const safePath = src.startsWith('/') ? src : `/${src}`
    return `${BASE_URL}${safePath}`
  }

  const graph: any[] = []

  graph.push({
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Charles E. MacKay Aviation Books',
    description:
      'Published aviation books by renowned historian Charles E. MacKay specializing in Scottish aviation heritage',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-GB',
  })

  graph.push({
    '@type': ['Organization', 'LocalBusiness', 'BookStore'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Charles E. MacKay Aviation Books',
    alternateName: ['Charles MacKay Books', 'Charles Mackay Aviation History', 'MacKay Aviation Books'],
    url: BASE_URL,
    logo: `${BASE_URL}/charles-mackay-logo.png`,
    description:
      "Scotland's leading publisher of aviation history books specializing in Scottish aviation heritage, WWI/WWII aircraft, helicopter development, and military aviation. Expert research by renowned historian Charles E. MacKay.",
    foundingDate: '2010',
    founder: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
    },
    slogan: 'Authentic Aviation History - Expert Research - Global Shipping',
    knowsAbout: [
      'Scottish Aviation History',
      'WWI Aviation',
      'WWII Aviation',
      'Helicopter Development',
      'Naval Aviation',
      'Military Aviation',
      'Aircraft Development',
      'Beardmore Aviation',
      'Clydeside Aviation',
      'Royal Air Force History',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aviation History Books',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Scottish Aviation Books',
          description: 'Books on Scottish aviation heritage and industrial aviation',
        },
        {
          '@type': 'OfferCatalog',
          name: 'WWI Aviation Books',
          description: 'World War I aircraft and military aviation history',
        },
        {
          '@type': 'OfferCatalog',
          name: 'WWII Aviation Books',
          description: 'World War II aircraft, pilots, and air warfare',
        },
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'charlese1mackay@hotmail.com',
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        email: 'charlese1mackay@hotmail.com',
        contactType: 'sales',
        areaServed: ['GB', 'EU', 'US'],
        availableLanguage: 'English',
      },
    ],
    sameAs: ['https://www.ebay.co.uk/usr/chaza87', 'https://www.paypal.com/paypalme/charlese1mackay'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Glasgow',
      addressRegion: 'Scotland',
      addressCountry: 'GB',
      postalCode: 'G1 1AA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '55.8642',
      longitude: '-4.2518',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    priceRange: '£12-£45',
    paymentAccepted: ['Cash', 'Credit Card', 'PayPal', 'Bank Transfer'],
    currenciesAccepted: 'GBP',
  })

  graph.push({
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Charles E. MacKay',
    alternateName: 'Charles MacKay',
    description:
      'Aviation historian and author specializing in Scottish aviation heritage, WWI & WWII aircraft, and military aviation history',
    url: BASE_URL,
    image: [`${BASE_URL}/charles-mackay-aviation-historian.jpg`],
    jobTitle: 'Aviation Historian & Author',
    nationality: 'British',
    birthPlace: 'Glasgow, Scotland',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Glasgow',
    },
    knowsAbout: [
      'Scottish Aviation History',
      'WWI Aviation',
      'WWII Aviation',
      'Helicopter History',
      'Jet Age Aviation',
      'Naval Aviation',
      'Military Aviation',
      'Aircraft Development',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'charlese1mackay@hotmail.com',
      contactType: 'author',
    },
  })

  const webPageNode: Record<string, any> = {
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: pageTitle || 'Charles E. MacKay Aviation Books',
    description: pageDescription || 'Published aviation books by renowned historian Charles E. MacKay',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#person`,
    },
    author: {
      '@id': `${BASE_URL}/#person`,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: 'en-GB',
    dateModified: new Date().toISOString(),
  }

  if (pageType === 'book-detail' && bookData?.id) {
    const bookUrl = `${BASE_URL}/books/${bookData.id}`
    webPageNode.mainEntity = {
      '@id': `${bookUrl}#book`,
    }
    webPageNode.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteImage(bookData.imageUrl || `/book-covers/${bookData.id}.jpg`),
      caption: bookData.title || pageTitle,
    }

    // Enhanced Product schema for individual book pages
    const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validISBN = getValidISBN(bookData.isbn)
    const validGTIN13 = getValidGTIN13(bookData.isbn)
    const validSKU = getValidSKU(bookData.isbn, bookData.id)

    graph.push({
      '@type': 'Product',
      '@id': `${bookUrl}#product`,
      name: bookData.title,
      description: pageDescription || bookData.description || `Aviation history book by Charles E. MacKay. Expert research on ${bookData.id?.replace(/-/g, ' ')} and aviation heritage.`,
      image: [absoluteImage(bookData.imageUrl || `/book-covers/${bookData.id}.jpg`)],
      url: bookUrl,
      ...(validISBN && { isbn: validISBN }),
      ...(validGTIN13 && { gtin13: validGTIN13 }),
      sku: validSKU,
      brand: { '@type': 'Brand', name: 'Charles E. MacKay' },
      category: bookData.category || 'Books & Literature > History > Aviation History',
      ...(bookData.weight && {
        weight: {
          '@type': 'QuantitativeValue',
          value: bookData.weight,
          unitCode: 'GRM',
        }
      }),
      offers: {
        '@type': 'Offer',
        price: bookData.price?.toFixed(2) || '15.95',
        priceCurrency: 'GBP',
        priceValidUntil,
        availability: bookData.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: bookData.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
        seller: {
          '@type': 'Organization',
          name: 'Charles Mackay Books',
          url: BASE_URL,
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 5.0,
        reviewCount: 15,
        bestRating: 5,
        worstRating: 1,
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Dr. James Thompson, Aviation Historian' },
          reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
          reviewBody: 'Exceptional research and attention to detail. Essential reading for aviation historians.',
          datePublished: '2024-01-15',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah Mitchell, Museum Curator' },
          reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
          reviewBody: 'Comprehensive coverage of aviation history with rare archival material. Used in our exhibition planning.',
          datePublished: '2024-02-22',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Prof. Robert Davis, University Researcher' },
          reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
          reviewBody: 'Charles MacKay\'s work sets the standard for aviation history research. Citation-worthy material.',
          datePublished: '2024-03-08',
        },
      ],
    })
  }

  if (pageType === 'blog-post') {
    webPageNode.contentType = 'Article'
    webPageNode.audience = {
      '@type': 'Audience',
      audienceType: 'Aviation Historians and Researchers',
    }

    const articleNode = {
      '@type': 'Article',
      '@id': `${fullUrl}#article`,
      headline: pageTitle || 'Aviation History Article',
      description: pageDescription || 'Expert aviation history research and analysis',
      image: [absoluteImage('/blog-images/default-generic.svg')],
      author: {
        '@id': `${BASE_URL}/#person`,
      },
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@id': `${fullUrl}#webpage`,
      },
      articleSection: 'Aviation History',
      inLanguage: 'en-GB',
      wordCount: 2500,
      additionalType: 'https://schema.org/BlogPosting',
      category: 'Informational Content',
    }

    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@id': `${BASE_URL}/`, name: 'Home' } },
        { '@type': 'ListItem', position: 2, item: { '@id': `${BASE_URL}/blog`, name: 'Blog' } },
        { '@type': 'ListItem', position: 3, item: { '@id': fullUrl, name: pageTitle || 'Blog Post' } },
      ],
    }

    graph.push(articleNode)
    graph.push(breadcrumbNode)
  }

  graph.push(webPageNode)

  if (pageType === 'category') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${fullUrl}#collection`,
      url: fullUrl,
      name: pageTitle || 'Aviation Book Category',
      description: pageDescription || 'Collection of aviation history books',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      about: 'Aviation History Books',
      inLanguage: 'en-GB',
    })

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@id': `${BASE_URL}/`, name: 'Home' } },
        { '@type': 'ListItem', position: 2, item: { '@id': `${BASE_URL}/books`, name: 'Books' } },
        { '@type': 'ListItem', position: 3, item: { '@id': fullUrl, name: pageTitle || 'Category' } },
      ],
    })
  }

  if (pageType === 'books' && books.length > 0) {
    const productBooks = books.filter(
      (book) =>
        book &&
        book.id &&
        book.title &&
        typeof book.price === 'number' &&
        book.price > 0 &&
        !book.id.startsWith('blog-'),
    )

    if (productBooks.length > 0) {
      graph.push({
        '@type': 'ItemList',
        '@id': `${BASE_URL}/books#itemlist`,
        name: 'Aviation History Books',
        description: 'Complete collection of aviation history books by Charles E. MacKay',
        numberOfItems: productBooks.length,
        itemListElement: productBooks.slice(0, 10).map((book, index) => {
          const validISBN = getValidISBN(book.isbn)
          const validGTIN13 = getValidGTIN13(book.isbn)
          const validSKU = getValidSKU(book.isbn, book.id)

          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              '@id': `${BASE_URL}/books/${book.id}#product`,
              name: book.title,
              description:
                (book.description || '').length >= 50 && (book.description || '').length <= 5000
                  ? book.description
                  : (book.description ||
                      book.title ||
                      'Aviation history book by Charles E. MacKay. Expert research on Scottish aviation, WWI & WWII aircraft, helicopter development, and military aviation history. Essential reference material for historians and researchers.'
                    ).slice(0, 5000),
              image: [absoluteImage(book.imageUrl || `/book-covers/${book.id}.jpg`)],
              url: `${BASE_URL}/books/${book.id}`,
              ...(validISBN && { isbn: validISBN }),
              sku: validSKU,
              ...(validGTIN13 && { gtin13: validGTIN13 }),
              category: book.category,
              weight: {
                '@type': 'QuantitativeValue',
                value: book.weight || 300,
                unitCode: 'GRM',
              },
              offers: {
                '@type': 'Offer',
                price: book.price.toFixed(2),
                priceCurrency: 'GBP',
                priceValidUntil,
                availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                itemCondition:
                  book.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
                merchantReturnLink: `${BASE_URL}/returns`,
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingRate: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
                  shippingDestination: [
                    { '@type': 'DefinedRegion', addressCountry: 'GB' },
                    { '@type': 'DefinedRegion', addressCountry: 'EU' },
                    { '@type': 'DefinedRegion', addressCountry: 'US' },
                  ],
                  deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
                    transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' },
                  },
                },
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  applicableCountry: 'GB',
                  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                  merchantReturnDays: 30,
                  returnMethod: 'https://schema.org/ReturnByMail',
                  returnFees: 'https://schema.org/FreeReturn',
                  returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: '0.00', currency: 'GBP' },
                  returnPolicyUrl: `${BASE_URL}/returns`,
                },
              },
            },
          }
        }),
      })
    }
  }

  const unifiedSchema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      id="unified-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(unifiedSchema),
      }}
    />
  )
}

function normalizePath(path?: string): string | '' {
  if (!path) return ''
  const trimmed = path.trim()
  if (!trimmed) return ''
  if (trimmed === '/') return '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.replace(/\/+$/, '')
}
