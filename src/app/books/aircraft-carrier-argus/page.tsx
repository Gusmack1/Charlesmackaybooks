import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'aircraft-carrier-argus',
  title: 'Aircraft Carrier - Beardmore\'s HMS Argus',
  subtitle: 'ex Conte Rosso',
  price: 12.91,
  pageCount: 175,
  isbn: '9780957344358',
  publicationYear: 2018,
  description: `HMS Argus was the world's true aircraft carrier with a flat deck, this concept being planned by the Marquis of Montrose a Beardmore director. Built as the emigrant carrier SS Conte Rosso for the Italian Line Lloyd Sabuado at Dalmuir, Scotland, in 1914, the vessel was ultimately bought by the Admiralty in 1916. She was launched in December 1917 as HMS Argus. By 1918 she was redesigned and sailed in September 1918 for Burntisland for trials with aircraft on the first carrier landings and take off with Sopwith aircraft including Pups. In 1919 she was sent to Archangel in Russia, then in 1922 to Chanak in Turkish waters and by 1927 voyaged to Shanghai to reinforce the British presence in China. Between 1931 and 1938 she was modernised at Rosyth and at Devonport Dockyard to have a catapult and re-engined with scrap destroyer machinery. (The destroyers have been identified.). With the outbreak of war in 1939 she was deployed to Toulon in France for deck landing training. She was also deployed in the Firth of Clyde for deck landing training. One of her instructor's was the celebrated test-pilot Eric "Winkle" Brown.`,
  category: 'Naval Aviation History',
  tags: ["HMS Argus","Aircraft Carrier","Naval Aviation","Beardmore","WWI","WWII"],
  imageUrl: '/book-covers/aircraft-carrier-argus.jpg',
  ebayLink: 'https://www.ebay.co.uk/itm/123456789',
  features: [
    "175 page highly detailed book, with 330 illustrations",
    "Includes restored ship covers",
    "Traces her history and wartime record in the Royal Navy",
    "Details of her demolition at Inverkeithing in 1947",
    "Companion to the ever popular 'Beardmore Aviation'",
    "Originally researched and published",
    "Not a collection of internet or Wikipedia articles"
  ],
  academicRecognition: [
    "A very well researched book which includes details of her entire career - Maritime Quest",
    "Beginning with a review of the early days of naval aviation, a detailed well-illustrated history - Aerosociety Journal",
    "Used by naval history institutions"
  ],
  customerReviews: [
    {
      rating: 5,
      text: "My grandfather served on this vessel, and I am delving into the family history. This will be a valuable resource. Wartime is not my thing, I have made an exception! Thank you for providing the text.",
      author: "Recent purchase",
      source: "eBay"
    },
    {
      rating: 5,
      text: "A very well researched book which includes details of her entire career. Filled with photographs, including aircraft used, and drawings. Appendix includes commanding officers of the ship and the Fleet Air Arm as well as details of the various operations involving HMS Argus",
      author: "Maritime Quest",
      source: "Review"
    },
    {
      rating: 5,
      text: "Beginning with a review of the early days of naval aviation, a detailed well-illustrated history of the world's first flat- top aircraft carrier constructed by William Beardmore & Co Ltd at the Dalmuir Naval Construction Works on the hull of an Italian liner Conte Rosso. Launched in 1918, HMS Argus was subsequently to become during WW2 the Royal Navy's principal deck landing training carrier, playing a significant role in Operation Torch – the 1942 Allied invasion of French North Africa.",
      author: "Aerosociety Journal",
      source: "Review"
    },
    {
      rating: 5,
      text: "......................a lovely piece of work.",
      author: "Purchase July 2025",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Excellent book, beautiful images and a good addition to my library of books on British aircraft carriers.",
      author: "Purchased July 2025",
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
    slug: "hms-argus-first-aircraft-carrier",
    title: "HMS Argus: The First Aircraft Carrier",
    excerpt: "Comprehensive analysis of HMS Argus, the world's first true aircraft carrier with a flat deck",
    readTime: "12 min read"
  },
  {
    slug: "hms-argus-first-aircraft-carrier-operations",
    title: "HMS Argus: First Aircraft Carrier Operations",
    excerpt: "Detailed examination of HMS Argus's operational history and carrier aviation development",
    readTime: "14 min read"
  }
]

const relatedBooks: Array<BookData> = []

export const metadata: Metadata = {
  title: 'Aircraft Carrier - Beardmore\'s HMS Argus | Charles E. MacKay Books',
  description: `HMS Argus was the world's true aircraft carrier with a flat deck, this concept being planned by the Marquis of Montrose a Beardmore director. Built as the emigrant carrier SS Conte Rosso for the Italian Line Lloyd Sabuado at Dalmuir, Scotland, in 1914.`,
  keywords: 'HMS Argus, Aircraft Carrier, Naval Aviation, Beardmore, WWI, WWII, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Aircraft Carrier - Beardmore\'s HMS Argus',
    description: `HMS Argus was the world's true aircraft carrier with a flat deck, this concept being planned by the Marquis of Montrose a Beardmore director. Built as the emigrant carrier SS Conte Rosso for the Italian Line Lloyd Sabuado at Dalmuir, Scotland, in 1914.`,
    images: ['/book-covers/aircraft-carrier-argus.jpg'],
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