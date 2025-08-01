import type { Metadata } from 'next'
import { books } from '@/data/books'
import ComprehensiveBookSalesTemplate from '@/components/ComprehensiveBookSalesTemplate'

const bookData = books.find(b => b.id === 'captain-eric-brown')!

export const metadata: Metadata = {
  title: `${bookData.title} | Charles E. MacKay Aviation Books`,
  description: bookData.description,
  keywords: bookData.tags?.join(', ') || 'aviation history',
  openGraph: {
    title: bookData.title,
    description: bookData.description,
    url: `https://charlesmackaybooks.com/books/captain-eric-brown`,
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [{
      url: bookData.imageUrl || '/book-covers/captain-eric-brown.jpg',
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
    images: [bookData.imageUrl || '/book-covers/captain-eric-brown.jpg'],
  }
}

export default function BookPage() {
  const relatedBlogs = [
    {
      id: 'test-pilot-biography-eric-brown',
      title: 'Expert Analysis: test pilot biography eric brown',
      excerpt: 'Comprehensive historical analysis with expert commentary and rare archival material.',
      readingTime: 12
    },
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
        description: 'The extraordinary story of Captain Eric Brown, the world most experienced test pilot who flew more aircraft types than anyone in history.'
      }}
      relatedBlogs={relatedBlogs}
      relatedBooks={relatedBooks}
    />
  );
}