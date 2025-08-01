import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'

const bookData = {
  id: 'birth-atomic-bomb',
  title: 'The Birth of the Atomic Bomb: From Scientific Discovery to Strategic Weapon',
  price: 21.99,
  pageCount: 380,
  isbn: '9780957344354',
  publicationYear: 2020,
  description: `The complete story of the Manhattan Project, from early atomic research to the bombing of Japan and the dawn of the nuclear age.`,
  category: 'Military History',
  tags: ["Manhattan Project","Atomic Bomb","Nuclear Weapons","WWII","Military Technology"],
  imageUrl: '/book-covers/birth-atomic-bomb.jpg',
  ebayLink: '',
  features: ["Declassified documents and photographs","Personal accounts from project scientists","Technical analysis of bomb design and testing","Strategic and ethical implications"],
  academicRecognition: ["Used by military academies worldwide","Referenced by nuclear policy institutes","Cited in academic papers on nuclear history"],
  customerReviews: [{"rating":5,"text":"Balanced and thoroughly researched account of this pivotal moment in history. Essential reading.","author":"Dr. Sarah Thompson","source":"Institute for Nuclear Studies"}]
}

const relatedBlogs = [{"slug":"british-nuclear-deterrent-v-force","title":"British Nuclear Deterrent V Force","excerpt":"Expert analysis and historical research","readTime":"12 min read"}]

const relatedBooks = []

export const metadata: Metadata = {
  title: 'The Birth of the Atomic Bomb: From Scientific Discovery to Strategic Weapon | Charles E. MacKay Books',
  description: `The complete story of the Manhattan Project, from early atomic research to the bombing of Japan and the dawn of the nuclear age.`,
  keywords: 'Manhattan Project, Atomic Bomb, Nuclear Weapons, WWII, Military Technology, Charles MacKay, aviation history books',
  openGraph: {
    title: 'The Birth of the Atomic Bomb: From Scientific Discovery to Strategic Weapon',
    description: `The complete story of the Manhattan Project, from early atomic research to the bombing of Japan and the dawn of the nuclear age.`,
    images: ['/book-covers/birth-atomic-bomb.jpg'],
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