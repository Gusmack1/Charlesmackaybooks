import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
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

const relatedBlogs = [{"slug":"british-aircraft-great-war-rfc-rnas","title":"British Aircraft Great War Rfc Rnas","excerpt":"Expert analysis and historical research","readTime":"12 min read"},{"slug":"sopwith-camel-wwi-fighter","title":"Sopwith Camel Wwi Fighter","excerpt":"Expert analysis and historical research","readTime":"12 min read"},{"slug":"bristol-fighter-f2b-brisfit","title":"Bristol Fighter F2b Brisfit","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'British Aircraft of the Great War | Charles E. MacKay Books',
  description: `Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
  keywords: 'WWI, British Aircraft, Royal Flying Corps, Military Aviation, Great War, Charles MacKay, aviation history books',
  openGraph: {
    title: 'British Aircraft of the Great War',
    description: `Comprehensive analysis of British military aviation development from 1914-1918, covering fighters, bombers, and reconnaissance aircraft.`,
    images: ['/book-covers/british-aircraft-great-war.jpg'],
    type: 'product'
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