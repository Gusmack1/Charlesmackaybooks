import type { Metadata } from 'next'
import { books } from '@/data/books'
import ComprehensiveBookSalesTemplate from '@/components/ComprehensiveBookSalesTemplate'

const bookData = books.find(b => b.id === 'birth-atomic-bomb')!

export const metadata: Metadata = {
  title: `${bookData.title} | Charles E. MacKay Aviation Books`,
  description: bookData.description,
  keywords: bookData.tags?.join(', ') || 'aviation history',
  openGraph: {
    title: bookData.title,
    description: bookData.description,
    url: `https://charlesmackaybooks.com/books/birth-atomic-bomb`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: bookData.imageUrl || '/book-covers/birth-atomic-bomb.jpg',
      width: 600,
      height: 800,
      alt: bookData.title
    }],
    locale: 'en_GB',
    type: 'book',
  },
  twitter: {
    card: 'summary_large_image',
    title: bookData.title,
    description: bookData.description,
    images: [bookData.imageUrl || '/book-covers/birth-atomic-bomb.jpg'],
  }
}

export default function BookPage() {
  const relatedBlogs = [
    {
      id: 'british-nuclear-deterrent-v-force',
      title: 'Expert Analysis: british nuclear deterrent v force',
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
        description: 'Comprehensive examination of the Manhattan Project and the development of atomic weapons, exploring the scientific, political, and military aspects.'
      }}
      relatedBlogs={relatedBlogs}
      relatedBooks={relatedBooks}
    />
  );
}