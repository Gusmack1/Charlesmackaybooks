'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Book } from '@/types/book'

interface BookAnalyticsProps {
  book: Book
}

export default function BookAnalytics({ book }: BookAnalyticsProps) {
  const { trackBookView } = useAnalytics()

  useEffect(() => {
    // Track book page view when component mounts
    trackBookView({
      id: book.id,
      title: book.title,
      category: book.category,
      price: book.price,
      author: 'Charles E. MacKay',
      isbn: book.isbn
    })
  }, [book, trackBookView])

  // This component doesn't render anything visible
  return null
}
