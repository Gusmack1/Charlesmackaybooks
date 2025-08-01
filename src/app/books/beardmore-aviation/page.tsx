import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'beardmore-aviation',
  title: 'Beardmore Aviation',
  price: 22.99,
  pageCount: 280,
  isbn: '9780957344300',
  publicationYear: 2020,
  description: `Expert analysis and historical research on beardmore aviation.`,
  category: 'Aviation History',
  tags: ["beardmore","aviation"],
  imageUrl: '/book-covers/beardmore-aviation.jpg',
  ebayLink: '',
  features: ["Comprehensive historical research","Previously unpublished photographs","Expert analysis"],
  academicRecognition: ["Referenced by aviation museums","Used in academic courses"],
  customerReviews: [{"rating":5,"text":"Excellent historical analysis with comprehensive research.","author":"Aviation Historian","source":"Academic Review"}]
}

const relatedBlogs: Array<{
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
}> = []

const relatedBooks: Array<any> = []

export const metadata: Metadata = {
  title: 'Beardmore Aviation | Charles E. MacKay Books',
  description: `Expert analysis and historical research on beardmore aviation.`,
  keywords: 'beardmore, aviation, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Beardmore Aviation',
    description: `Expert analysis and historical research on beardmore aviation.`,
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