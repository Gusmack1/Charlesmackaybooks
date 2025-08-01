import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
  id: 'clydeside-aviation-vol1',
  title: 'Clydeside Aviation Volume 1: The Pioneer Years 1909-1914',
  price: 19.99,
  pageCount: 260,
  isbn: '9780957344361',
  publicationYear: 2016,
  description: `The first comprehensive study of aviation development on Clydeside, covering the pioneering efforts from 1909 to the outbreak of World War I.`,
  category: 'Scottish Aviation History',
  tags: ["Clydeside","Scottish Aviation","Pioneer Aviation","Industrial History","Pre-WWI"],
  imageUrl: '/book-covers/clydeside-aviation-vol1.jpg',
  ebayLink: '',
  features: ["Extensive use of local newspaper archives","Previously unknown photographs from family collections","Maps showing all early flying sites","Biographical sketches of local aviation pioneers"],
  academicRecognition: ["Featured in Glasgow Museums exhibitions","Used by Strathclyde University for local history courses","Referenced by Scottish Aviation Museum"],
  customerReviews: [{"rating":5,"text":"Fascinating account of forgotten aviation history. MacKay has rescued these stories from obscurity.","author":"John MacLeod","source":"Glasgow Herald"}]
}

const relatedBlogs = [{"slug":"clydeside-aviation-revolution","title":"Clydeside Aviation Revolution","excerpt":"Expert analysis and historical research","readTime":"12 min read"},{"slug":"percy-pilcher-scotland-aviation-pioneer","title":"Percy Pilcher Scotland Aviation Pioneer","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'Clydeside Aviation Volume 1: The Pioneer Years 1909-1914 | Charles E. MacKay Books',
  description: `The first comprehensive study of aviation development on Clydeside, covering the pioneering efforts from 1909 to the outbreak of World War I.`,
  keywords: 'Clydeside, Scottish Aviation, Pioneer Aviation, Industrial History, Pre-WWI, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Clydeside Aviation Volume 1: The Pioneer Years 1909-1914',
    description: `The first comprehensive study of aviation development on Clydeside, covering the pioneering efforts from 1909 to the outbreak of World War I.`,
    images: ['/book-covers/clydeside-aviation-vol1.jpg'],
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