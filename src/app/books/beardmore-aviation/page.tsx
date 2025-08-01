import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'beardmore-aviation',
  title: 'Beardmore Aviation',
  subtitle: 'Airships Aeroplanes Engines R101 1913 - 1930',
  price: 12.91,
  pageCount: 238,
  isbn: '9780957344303',
  publicationYear: 2012,
  description: `A detailed history of the William Beardmore and Co Ltd.'s significant contribution to the development of the Scottish aircraft industry from the various aircraft designs it manufactured (including the WBI/WBII/ WBIIb/ WBIV/WBV/ WBIX /WBX/WBXXIV/ WBXXXVI series, Beardmore Inflexible and under licence the Sopwith Pup and Sopwith Camel and DFW, Handley Page V1500, Nieuport XII), aero engines (including the Beardmore Typhoon/Cyclone/ Tornado [used on the R-101 airship]), airships, the HMS Argus aircraft carrier and the Beardmore School of Reserve Flying at Renfrew.`,
  category: 'Scottish Aviation History',
  tags: ["Beardmore","Scottish Aviation","Airships","Aircraft Engines","WWI","Industrial History"],
  imageUrl: '/book-covers/beardmore-aviation.jpg',
  ebayLink: 'https://www.ebay.co.uk/itm/123456789',
  features: [
    "238 pages profusely illustrated in 61000 words",
    "Over 300 hundred photographs all perfectly reproduced",
    "Accurate production figures deeply researched from Beardmore archive records",
    "Covers aircraft production, aero-engines, airships and HMS Argus",
    "Includes Sopwith Pup and Sopwith Camel operations off cruisers and carriers",
    "Details of the Beardmore Halford Pullinger (B.H.P.) aero engine",
    "Comprehensive bibliography and appendix"
  ],
  academicRecognition: [
    "Fills an important gap in British industrial history - Archivist",
    "A valuable addition to the histories of British Aviation - Buyer",
    "Used by aviation history courses and museums"
  ],
  customerReviews: [
    {
      rating: 5,
      text: "Quick delivery, my dad 'A Beardmore' loved it",
      author: "Recent sale",
      source: "eBay"
    },
    {
      rating: 5,
      text: "The Beardmore book is also a treat.....",
      author: "Recent sale",
      source: "eBay"
    },
    {
      rating: 5,
      text: ".....an excellent book on the man and the company",
      author: "Recent description May 2023",
      source: "eBay"
    },
    {
      rating: 5,
      text: "This book is unique. A treasure trove of over 300 hundred photographs all perfectly reproduced that add immensely to the text...",
      author: "Recent review",
      source: "eBay"
    },
    {
      rating: 5,
      text: "The detail is amazing, you feel as though your back there, you can see how they produced for the Empire and the world-a brilliant read.",
      author: "Review today 24 May 2024",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Fantastic book, posted super fast and great quality. Highly recommended item and seller",
      author: "September 2024",
      source: "eBay"
    },
    {
      rating: 5,
      text: "A detailed and accurate volume on quite a specialist part of a much wider subject. A well produced book, recommended for all early aviation enthusiasts.",
      author: "July 2021",
      source: "eBay"
    },
    {
      rating: 5,
      text: "The book from Charles MacKay was especially useful in filling in the gaps and clearing the mystery of the W.B.VI designations. A very worthwhile addition to my library!",
      author: "Reader",
      source: "Review"
    },
    {
      rating: 5,
      text: "... a splendid account.",
      author: "Recent buyer",
      source: "eBay"
    }
  ]
}

const relatedBlogs: Array<{
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
}> = [
  {
    slug: "beardmore-aviation-scottish-industrial-giant",
    title: "Beardmore Aviation: Scottish Industrial Giant",
    excerpt: "Comprehensive analysis of Beardmore's contribution to Scottish aviation and industrial development",
    readTime: "14 min read"
  }
]

const relatedBooks: Array<BookData> = []

export const metadata: Metadata = {
  title: 'Beardmore Aviation | Charles E. MacKay Books',
  description: `A detailed history of the William Beardmore and Co Ltd.'s significant contribution to the development of the Scottish aircraft industry from 1913-1930.`,
  keywords: 'Beardmore, Scottish Aviation, Airships, Aircraft Engines, WWI, Industrial History, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Beardmore Aviation',
    description: `A detailed history of the William Beardmore and Co Ltd.'s significant contribution to the development of the Scottish aircraft industry from 1913-1930.`,
    images: ['/book-covers/beardmore-aviation.jpg'],
    type: 'book'
  }
}

export default function BookPage() {
  return (
    <BookSalesTemplate 
      book={bookData}
      relatedBlogs={relatedBlogs}
      relatedBooks={relatedBooks}
    />
  )
}