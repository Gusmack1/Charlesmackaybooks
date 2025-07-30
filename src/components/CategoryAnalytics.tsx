'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface CategoryAnalyticsProps {
  categoryName: string
  bookCount: number
  categorySlug: string
}

export default function CategoryAnalytics({
  categoryName,
  bookCount,
  categorySlug
}: CategoryAnalyticsProps) {
  const { trackCategoryView, trackAviationEvent } = useAnalytics()

  useEffect(() => {
    // Track category page view when component mounts
    trackCategoryView(categoryName)

    // Track aviation-specific category browsing
    trackAviationEvent('category_browse', {
      category_name: categoryName,
      category_slug: categorySlug,
      book_count: bookCount,
      event_label: 'aviation_category_view',
      content_type: 'category_page'
    })

    // Track specific aviation era/topic interest
    const aviationEra = getAviationEra(categoryName)
    if (aviationEra) {
      trackAviationEvent('aviation_era_interest', {
        aviation_era: aviationEra,
        category_name: categoryName,
        event_label: 'historical_period_interest'
      })
    }

    // Track user type based on category
    const userType = getUserType(categoryName)
    if (userType) {
      trackAviationEvent('user_interest_classification', {
        user_type: userType,
        category_preference: categoryName,
        event_label: 'user_segmentation'
      })
    }

  }, [categoryName, bookCount, categorySlug, trackCategoryView, trackAviationEvent])

  // This component doesn't render anything visible
  return null
}

// Helper function to determine aviation era based on category
function getAviationEra(categoryName: string): string | null {
  const eraMapping: Record<string, string> = {
    'Scottish Aviation History': 'Early Aviation',
    'WWI Aviation': 'Great War 1914-1918',
    'WWII Aviation': 'World War II 1939-1945',
    'Jet Age Aviation': 'Cold War 1945-1991',
    'Helicopter History': 'Rotorcraft Era 1940-Present',
    'Naval Aviation': 'Maritime Aviation',
    'Aviation Biography': 'Aviation Personalities',
    'Industrial History': 'Aviation Manufacturing',
    'Military History': 'Military Aviation'
  }

  return eraMapping[categoryName] || null
}

// Helper function to classify user type based on category interest
function getUserType(categoryName: string): string | null {
  const userTypeMapping: Record<string, string> = {
    'Scottish Aviation History': 'Heritage Enthusiast',
    'WWI Aviation': 'Military History Enthusiast',
    'WWII Aviation': 'Military History Enthusiast',
    'Jet Age Aviation': 'Modern Aviation Enthusiast',
    'Helicopter History': 'Rotorcraft Enthusiast',
    'Naval Aviation': 'Naval History Enthusiast',
    'Aviation Biography': 'Biography Reader',
    'Industrial History': 'Technical History Reader',
    'Military History': 'Military History Enthusiast'
  }

  return userTypeMapping[categoryName] || 'General Aviation Enthusiast'
}
