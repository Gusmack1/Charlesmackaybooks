import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
  id: 'adolf-rohrbach',
  title: 'Adolf Rohrbach: Pioneer of Metal Aircraft Construction',
  price: 27.99,
  pageCount: 312,
  isbn: '9780957344330',
  publicationYear: 2021,
  description: `The definitive biography of Adolf Rohrbach, the German engineer who revolutionized aircraft construction with his metal flying boats and transport aircraft.`,
  category: 'Aviation Engineering',
  tags: ["Adolf Rohrbach","Metal Aircraft","Flying Boats","German Aviation","Engineering History"],
  imageUrl: '/book-covers/adolf-rohrbach.jpg',
  ebayLink: '',
  features: ["Complete technical analysis of Rohrbach aircraft designs","Previously unpublished photographs from German archives","Detailed engineering drawings and specifications","Personal correspondence and technical documents"],
  academicRecognition: ["Used by technical universities for aeronautical engineering courses","Referenced in Deutsches Museum aviation exhibitions","Cited by AIAA historical publications"],
  customerReviews: [{"rating":5,"text":"Exceptional technical detail combined with engaging biographical narrative. Essential for understanding early metal aircraft development.","author":"Prof. Dr. Heinrich Weber","source":"Technical University of Munich"}]
}

const relatedBlogs = [{"slug":"adolf-rohrbach-metal-aircraft-construction","title":"Adolf Rohrbach Metal Aircraft Construction","excerpt":"Expert analysis and historical research","readTime":"12 min read"},{"slug":"adolf-rohrbach-metal-aircraft-revolution","title":"Adolf Rohrbach Metal Aircraft Revolution","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'Adolf Rohrbach: Pioneer of Metal Aircraft Construction | Charles E. MacKay Books',
  description: `The definitive biography of Adolf Rohrbach, the German engineer who revolutionized aircraft construction with his metal flying boats and transport aircraft.`,
  keywords: 'Adolf Rohrbach, Metal Aircraft, Flying Boats, German Aviation, Engineering History, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Adolf Rohrbach: Pioneer of Metal Aircraft Construction',
    description: `The definitive biography of Adolf Rohrbach, the German engineer who revolutionized aircraft construction with his metal flying boats and transport aircraft.`,
    images: ['/book-covers/adolf-rohrbach.jpg'],
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