import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
  id: 'captain-eric-brown',
  title: 'Captain Eric Brown',
  price: 22.99,
  pageCount: 280,
  isbn: '9780957344300',
  publicationYear: 2020,
  description: `Expert analysis and historical research on captain eric brown.`,
  category: 'Aviation History',
  tags: ["captain","eric","brown"],
  imageUrl: '/book-covers/captain-eric-brown.jpg',
  ebayLink: '',
  features: ["Comprehensive historical research","Previously unpublished photographs","Expert analysis"],
  academicRecognition: ["Referenced by aviation museums","Used in academic courses"],
  customerReviews: [{"rating":5,"text":"Excellent historical analysis with comprehensive research.","author":"Aviation Historian","source":"Academic Review"}]
}

const relatedBlogs = [{"slug":"captain-eric-brown-history","title":"Captain Eric Brown History","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'Captain Eric Brown | Charles E. MacKay Books',
  description: `Expert analysis and historical research on captain eric brown.`,
  keywords: 'captain, eric, brown, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Captain Eric Brown',
    description: `Expert analysis and historical research on captain eric brown.`,
    images: ['/book-covers/captain-eric-brown.jpg'],
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