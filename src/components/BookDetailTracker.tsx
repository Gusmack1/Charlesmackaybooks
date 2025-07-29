'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Book } from '@/types/book';
import { useBookViewTracking } from '@/components/TrackingUtils';

interface BookDetailTrackerProps {
  book: Book;
}

export default function BookDetailTracker({ book }: BookDetailTrackerProps) {
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Track book view analytics
  useBookViewTracking(book);

  useEffect(() => {
    // Add to recently viewed
    addToRecentlyViewed(book);
  }, [book, addToRecentlyViewed]);

  return null;
}
