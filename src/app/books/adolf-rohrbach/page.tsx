import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
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

const relatedBlogs: Array<{
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
}> = [
  {
    slug: "adolf-rohrbach-metal-aircraft-construction",
    title: "Adolf Rohrbach: Revolutionary Metal Aircraft Designer",
    excerpt: "Comprehensive analysis of Adolf Rohrbach's pioneering metal aircraft construction techniques",
    readTime: "14 min read"
  },
  {
    slug: "adolf-rohrbach-metal-aircraft-revolution",
    title: "Adolf Rohrbach: The Metal Aircraft Revolution That Changed Aviation",
    excerpt: "How Adolf Rohrbach's innovative metal aircraft construction techniques revolutionized aviation manufacturing",
    readTime: "16 min read"
  }
]

const relatedBooks: Array<any> = []

export const metadata: Metadata = {
  title: 'Adolf Rohrbach: Pioneer of Metal Aircraft Construction | Charles E. MacKay Books',
  description: `The definitive biography of Adolf Rohrbach, the German engineer who revolutionized aircraft construction with his metal flying boats and transport aircraft.`,
  keywords: 'Adolf Rohrbach, Metal Aircraft, Flying Boats, German Aviation, Engineering History, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Adolf Rohrbach: Pioneer of Metal Aircraft Construction',
    description: `The definitive biography of Adolf Rohrbach, the German engineer who revolutionized aircraft construction with his metal flying boats and transport aircraft.`,
    images: ['/book-covers/adolf-rohrbach.jpg'],
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