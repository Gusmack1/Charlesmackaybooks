
import { FC } from 'react';
import BookSalesTemplate from './BookSalesTemplate';
import Header from './Header';

const BookSalesTemplateExample: FC = () => {
  // Sample book data
  const bookData = {
    id: 'adolf-rohrbach',
    title: 'Adolf Rohrbach\'s Metal Airplanes',
    subtitle: 'Revolutionary Aircraft Design in the Interwar Period',
    author: 'Charles E. MacKay',
    isbn: '978-1-234567-89-0',
    publicationDate: '2023-06-15',
    publicationYear: 2023,
    pageCount: 320,
    dimensions: '6.1 x 9.2 x 1.1 inches',
    coverImage: '/book-covers/adolf-rohrbach-metal-airplanes.jpg',
    imageUrl: '/book-covers/adolf-rohrbach-metal-airplanes.jpg',
    category: 'Aviation History',
    tags: ['Aviation History', 'Engineering', 'Metal Aircraft', 'German Aviation'],
    price: {
      hardcover: 49.99,
      paperback: 29.99,
      ebook: 19.99,
      audiobook: 24.99
    },
    description: 'A comprehensive examination of Adolf Rohrbach\'s pioneering work in metal aircraft construction during the 1920s and 1930s. This meticulously researched volume explores how Rohrbach\'s innovative designs influenced the development of modern aviation technology.',
    features: ['Comprehensive technical analysis', 'Rare historical photographs', 'Detailed engineering drawings', 'Expert research'],
    academicRecognition: ['Recommended by Aviation History Society', 'Cited in Engineering journals', 'Used in university courses'],
    plotSummary: 'This groundbreaking study traces the evolution of metal aircraft construction through the lens of Adolf Rohrbach\'s revolutionary designs. From his early experiments with all-metal construction to the development of the iconic Rohrbach Roland flying boat, the book examines how Rohrbach\'s engineering innovations shaped the future of aviation.',
    authorBio: 'Charles E. MacKay is a distinguished aviation historian with over three decades of research experience in early 20th-century aircraft development. His expertise spans the technical, social, and economic aspects of aviation history, with particular focus on German aircraft manufacturers and their contributions to aeronautical engineering.',
    editorialReviews: [
      {
        source: 'Aviation History Magazine',
        quote: 'A masterful examination of one of aviation\'s most influential designers. MacKay\'s research is impeccable and his narrative compelling.'
      },
      {
        source: 'Journal of Aeronautical History',
        quote: 'Essential reading for anyone interested in the development of metal aircraft construction. This book fills a significant gap in aviation literature.'
      },
      {
        source: 'Flight International',
        quote: 'MacKay brings Rohrbach\'s story to life with vivid detail and technical accuracy. A must-have for aviation enthusiasts and historians alike.'
      }
    ],
    customerReviews: [
      {
        name: 'Dr. Sarah Johnson',
        rating: 5,
        review: 'Exceptional research and writing. The technical details are accessible without being oversimplified, and the historical context is beautifully presented.',
        date: '2023-07-20'
      },
      {
        name: 'Michael Chen',
        rating: 5,
        review: 'As an aviation engineer, I appreciate the depth of technical analysis. The photographs and diagrams are excellent quality and greatly enhance the text.',
        date: '2023-07-15'
      },
      {
        name: 'Robert Williams',
        rating: 4,
        review: 'Fascinating insight into a lesser-known but crucial figure in aviation history. Well-written and thoroughly researched.',
        date: '2023-07-10'
      }
    ],
    sampleContent: 'The year 1922 marked a turning point in aviation history. Adolf Rohrbach, a brilliant engineer working at the Zeppelin works in Friedrichshafen, had been quietly developing revolutionary concepts in aircraft construction. His vision was simple yet audacious: to create aircraft entirely from metal, eliminating the traditional wood and fabric construction that had dominated aviation since its inception.\n\nRohrbach\'s approach was fundamentally different from his contemporaries. While others experimented with metal components as supplements to wooden structures, Rohrbach envisioned aircraft where every structural element would be metal. This radical departure from established practices required not just engineering innovation, but a complete reimagining of aircraft design philosophy.\n\nThe Rohrbach Ro I, his first all-metal aircraft, represented this new paradigm. Constructed primarily of duralumin, a lightweight aluminum alloy, the aircraft featured a cantilever wing design that eliminated the need for external bracing wires. This clean, streamlined appearance was not merely aesthetic; it represented a significant reduction in aerodynamic drag and a corresponding improvement in performance.\n\nWhat made Rohrbach\'s designs truly revolutionary was his understanding of stressed-skin construction. Unlike traditional aircraft where the skin was merely a covering, Rohrbach\'s designs used the metal skin as a structural element, contributing to the overall strength of the aircraft. This approach allowed for lighter, stronger, and more efficient aircraft structures.',
    series: {
      name: 'Aviation Pioneers',
      books: [
        {
          id: 'german-aircraft-great-war',
          title: 'German Aircraft in the Great War',
          coverImage: '/book-covers/german-aircraft-great-war.jpg'
        },
        {
          id: 'beardmore-aviation',
          title: 'Beardmore Aviation: Scottish Industrial Giant',
          coverImage: '/book-covers/beardmore-aviation.jpg'
        }
      ]
    },
    ratings: {
      average: 4.8,
      count: 127
    },
    badges: ['bestseller', 'new-release'],
    stockCount: 15,
    limitedOffer: {
      text: 'Limited Time: 20% off Hardcover Edition',
      endDate: '2023-12-31'
    }
  };

  // Sample related books
  const relatedBooks = [
    {
      id: 'german-aircraft-great-war',
      title: 'German Aircraft in the Great War',
      author: 'Charles E. MacKay',
      coverImage: '/book-covers/german-aircraft-great-war.jpg',
      price: 44.99
    },
    {
      id: 'beardmore-aviation',
      title: 'Beardmore Aviation: Scottish Industrial Giant',
      author: 'Charles E. MacKay',
      coverImage: '/book-covers/beardmore-aviation.jpg',
      price: 39.99
    },
    {
      id: 'british-aircraft-great-war',
      title: 'British Aircraft in the Great War',
      author: 'Charles E. MacKay',
      coverImage: '/book-covers/british-aircraft-great-war.jpg',
      price: 42.99
    },
    {
      id: 'aviation-manufacturing',
      title: 'Aviation Manufacturing: Wartime Production',
      author: 'Charles E. MacKay',
      coverImage: '/book-covers/aviation-manufacturing.jpg',
      price: 37.99
    }
  ];

  // Sample related blog posts
  const relatedBlogPosts = [
    {
      id: 'adolf-rohrbach-metal-aircraft-construction',
      title: 'Adolf Rohrbach and the Revolution in Metal Aircraft Construction',
      excerpt: 'Explore how Adolf Rohrbach\'s innovative metal aircraft designs transformed aviation technology in the interwar period, setting the stage for modern aircraft construction.',
      image: '/blog-images/rohrbach-ro-ix-aircraft.jpg',
      url: '/blog/adolf-rohrbach-metal-aircraft-construction'
    },
    {
      id: 'german-aircraft-great-war-development',
      title: 'The Development of German Aircraft During the Great War',
      excerpt: 'A comprehensive look at how German aircraft manufacturers evolved their designs and production methods during World War I.',
      image: '/blog-images/german-aircraft-factory.jpg',
      url: '/blog/german-aircraft-great-war-development'
    },
    {
      id: 'aviation-manufacturing-wartime-production',
      title: 'Aviation Manufacturing: The Challenges of Wartime Production',
      excerpt: 'How aircraft manufacturers adapted their production methods and materials during wartime, with focus on metal construction techniques.',
      image: '/blog-images/aircraft-factory-assembly-line.jpg',
      url: '/blog/aviation-manufacturing-wartime-production'
    }
  ];

  // Schema markup for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: bookData.title,
    alternateName: bookData.subtitle,
    author: {
      '@type': 'Person',
      name: bookData.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Charles Mackay Books',
      url: 'https://charlesmackaybooks.com'
    },
    isbn: bookData.isbn,
    numberOfPages: bookData.pageCount,
    datePublished: bookData.publicationDate,
    description: bookData.description,
    image: bookData.coverImage,
    offers: {
      '@type': 'Offer',
      price: bookData.price.hardcover,
      priceCurrency: 'USD',
      availability: bookData.stockCount > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Charles Mackay Books'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: bookData.ratings.average,
      reviewCount: bookData.ratings.count,
      bestRating: 5,
      worstRating: 1
    },
    review: bookData.readerTestimonials.map(testimonial => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5
      },
      reviewBody: testimonial.review,
      datePublished: testimonial.date
    }))
  };

  return (
    <div>
      <Header />
      <BookSalesTemplate
        book={bookData}
        relatedBooks={relatedBooks}
        relatedBlogs={relatedBlogPosts}
      />
    </div>
  );
};

export default BookSalesTemplateExample; 