import type { Metadata } from 'next'
import { books } from '@/data/books'
import ComprehensiveBookSalesTemplate from '@/components/ComprehensiveBookSalesTemplate'

const bookData = books.find(b => b.id === 'beardmore-aviation')!

export const metadata: Metadata = {
  title: `${bookData.title} | Charles E. MacKay Aviation Books`,
  description: bookData.description,
  keywords: bookData.tags?.join(', ') || 'aviation history',
  openGraph: {
    title: bookData.title,
    description: bookData.description,
    url: `https://charlesmackaybooks.com/books/beardmore-aviation`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: bookData.imageUrl || '/book-covers/beardmore-aviation.jpg',
      width: 600,
      height: 800,
      alt: bookData.title
    }],
    locale: 'en_GB',
    type: 'product',
  },
  twitter: {
    card: 'summary_large_image',
    title: bookData.title,
    description: bookData.description,
    images: [bookData.imageUrl || '/book-covers/beardmore-aviation.jpg'],
  }
}

export default function BookPage() {
  const relatedBlogs = [
    {
      id: 'beardmore-aviation-scottish-industrial-giant',
      title: 'Expert Analysis: beardmore aviation scottish industrial giant',
      excerpt: 'Comprehensive historical analysis with expert commentary and rare archival material.',
      readingTime: 12
    },
    {
      id: 'clydeside-aviation-revolution',
      title: 'Expert Analysis: clydeside aviation revolution',
      excerpt: 'Comprehensive historical analysis with expert commentary and rare archival material.',
      readingTime: 12
    }
  ];

  const relatedBooks = [
    {
      id: 'british-aircraft-great-war',
      title: 'British Aircraft of the Great War',
      price: 24.99,
      cover: '/book-covers/british-aircraft-great-war.jpg'
    },
    {
      id: 'captain-eric-brown',
      title: 'Captain Eric Brown: Test Pilot Extraordinary',
      price: 26.99,
      cover: '/book-covers/captain-eric-brown.jpg'
    }
  ];
  
  return (
    <ComprehensiveBookSalesTemplate 
      book={{
        ...bookData,
        description: 'The definitive account of William Beardmore & Company ambitious venture into aviation manufacturing, from early experiments at Dalmuir to the tragic loss of R101.'
      }}
      relatedBlogs={relatedBlogs}
      relatedBooks={relatedBooks}
    />
  );
}