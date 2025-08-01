import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
  id: 'aircraft-carrier-argus',
  title: 'Aircraft Carrier Argus',
  price: 22.99,
  pageCount: 280,
  isbn: '9780957344300',
  publicationYear: 2020,
  description: `Expert analysis and historical research on aircraft carrier argus.`,
  category: 'Aviation History',
  tags: ["aircraft","carrier","argus"],
  imageUrl: '/book-covers/aircraft-carrier-argus.jpg',
  ebayLink: '',
  features: ["Comprehensive historical research","Previously unpublished photographs","Expert analysis"],
  academicRecognition: ["Referenced by aviation museums","Used in academic courses"],
  customerReviews: [{"rating":5,"text":"Excellent historical analysis with comprehensive research.","author":"Aviation Historian","source":"Academic Review"}]
}

const relatedBlogs = [{"slug":"aircraft-carrier-argus-history","title":"Aircraft Carrier Argus History","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'Aircraft Carrier Argus | Charles E. MacKay Books',
  description: `Expert analysis and historical research on aircraft carrier argus.`,
  keywords: 'aircraft, carrier, argus, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Aircraft Carrier Argus',
    description: `Expert analysis and historical research on aircraft carrier argus.`,
    images: ['/book-covers/aircraft-carrier-argus.jpg'],
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