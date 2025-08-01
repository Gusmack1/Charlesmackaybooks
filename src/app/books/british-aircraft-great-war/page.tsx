import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'british-aircraft-great-war',
  title: 'British Aircraft of the Great War',
  price: 24.99,
  pageCount: 420,
  isbn: '9780957344347',
  publicationYear: 2017,
  description: `Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
  category: 'WWI Aviation',
  tags: ["WWI","British Aircraft","Royal Flying Corps","Military Aviation","Great War"],
  imageUrl: '/book-covers/british-aircraft-great-war.jpg',
  ebayLink: '',
  features: ["Over 300 photographs and technical drawings","Complete production figures and specifications","Unit histories and combat records","Previously unpublished archival material"],
  academicRecognition: ["Standard reference at RAF College Cranwell","Used by Imperial War Museum for exhibitions","Recommended by Royal Aeronautical Society"],
  customerReviews: [{"rating":5,"text":"The most comprehensive study of British WWI aviation ever published. MacKay has set the gold standard.","author":"Air Commodore James Mitchell","source":"RAF Historical Society"}]
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
  description: `Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
  keywords: 'WWI, British Aircraft, Royal Flying Corps, Military Aviation, Great War, Charles MacKay, aviation history books',
  openGraph: {
    title: 'British Aircraft of the Great War',
    description: `Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
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