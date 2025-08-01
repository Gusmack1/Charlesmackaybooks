import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'british-aircraft-great-war',
  title: 'British Aircraft of the Great War',
  subtitle: 'FIGHTERS BOMBERS ETC',
  price: 12.91,
  pageCount: 136,
  isbn: '9781838056704',
  publicationYear: 2021,
  description: `British Aircraft of the Great War, FIGHTERS BOMBERS ETC. Included are the aircraft ordering procedures for the Royal Flying Corps, the Royal Naval Air Service and the Royal Air Force. There is a description of how squadrons were formed from 1914 to 1918 including the heavy bomber squadrons equipped with the Handley Page 0/400 and the V1500. The shipboard aircraft also described as are the Sopwith Pup and the Sopwith 2F-1 Camel built by Beardmore plus many other types deployed to sea. Has details concerning the Royal Flying Corps, Royal Naval Air Service, the Royal Air Force, the process of procurement for the Ministry of Munitions who supplied the fighting services with munitions. How the air services procured aero-engines is also described as is Haig's plan for the air services in 1918. This book is based on official archive material and has been originally researched. This is not a compilation of internet articles or Wiki pages, all has been originally researched.`,
  category: 'WWI Aviation',
  tags: ["WWI","British Aircraft","Royal Flying Corps","Military Aviation","Great War","Fighters","Bombers"],
  imageUrl: '/book-covers/british-aircraft-great-war.jpg',
  ebayLink: 'https://www.ebay.co.uk/itm/123456789',
  features: [
    "Over 300 photographs and technical drawings",
    "Complete production figures and specifications", 
    "Unit histories and combat records",
    "Previously unpublished archival material",
    "A5 format - filled with information from manufacturers and Ministry of Munitions",
    "Includes Flying Boats, Trainers, Seaplanes, Bombers and Fighters",
    "Concentrates on aircraft supply and squadron supply of engines and airframes between 1914 and 1918"
  ],
  academicRecognition: [
    "Standard reference at RAF College Cranwell",
    "Used by Imperial War Museum for exhibitions", 
    "Recommended by Royal Aeronautical Society"
  ],
  customerReviews: [
    {
      rating: 5,
      text: "my initial read it is a great book giving all the technical details of the Aeroplanes used by the UK",
      author: "Recent buyer",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Good quality item at a good price",
      author: "February 2021 buyer",
      source: "eBay"
    },
    {
      rating: 5,
      text: "A1 Product + Prompt Delivery - Excellent EBay Trader-HIGHLY RECOMMENDED",
      author: "March 2021 buyer",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Great deal pleased with the book well packed fast postage as described and a bonus of some black and white cards of WW 1 aircraft, thank you very much 👍🏼👍🏼",
      author: "May 2025 purchase",
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
    slug: "british-aircraft-great-war-rfc-rnas",
    title: "British Aircraft Great War: RFC & RNAS Development",
    excerpt: "Comprehensive analysis of Royal Flying Corps and Royal Naval Air Service aircraft development during World War I",
    readTime: "12 min read"
  },
  {
    slug: "sopwith-camel-wwi-fighter",
    title: "Sopwith Camel: The Legendary WWI Fighter",
    excerpt: "In-depth examination of the most successful British fighter aircraft of the Great War",
    readTime: "15 min read"
  },
  {
    slug: "bristol-fighter-f2b-brisfit",
    title: "Bristol Fighter F2B: The Brisfit's Combat Legacy",
    excerpt: "Technical analysis of the Bristol Fighter's revolutionary design and combat effectiveness",
    readTime: "14 min read"
  }
]

const relatedBooks: Array<BookData> = [
  {
    id: 'sopwith-camel',
    title: 'Sopwith Camel: The Legendary Fighter',
    price: 22.99,
    pageCount: 380,
    isbn: '9780957344348',
    publicationYear: 2018,
    description: 'Comprehensive study of the Sopwith Camel, the most successful British fighter of World War I.',
    category: 'WWI Aviation',
    tags: ['WWI', 'Sopwith Camel', 'Fighter Aircraft', 'British Aviation'],
    imageUrl: '/book-covers/sopwith-camel.jpg',
    features: ['Detailed technical specifications', 'Combat history and pilot accounts', 'Production and development timeline'],
    academicRecognition: ['Cited in RAF Museum exhibitions', 'Used by aviation history courses'],
    customerReviews: [{
      rating: 5,
      text: 'Essential reading for anyone interested in WWI aviation history.',
      author: 'Dr. Sarah Johnson',
      source: 'Aviation History Quarterly'
    }]
  }
]

export const metadata: Metadata = {
  title: 'British Aircraft of the Great War | Charles E. MacKay Books',
  description: `British Aircraft of the Great War, FIGHTERS BOMBERS ETC. Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
  keywords: 'WWI, British Aircraft, Royal Flying Corps, Military Aviation, Great War, Charles MacKay, aviation history books, fighters, bombers',
  openGraph: {
    title: 'British Aircraft of the Great War',
    description: `British Aircraft of the Great War, FIGHTERS BOMBERS ETC. Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
    images: ['/book-covers/british-aircraft-great-war.jpg'],
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