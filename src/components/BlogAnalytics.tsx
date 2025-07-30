'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface BlogAnalyticsProps {
  articleTitle: string
  category: string
  readingTime?: string
  wordCount?: number
}

export default function BlogAnalytics({
  articleTitle,
  category,
  readingTime,
  wordCount
}: BlogAnalyticsProps) {
  const { trackBlogEngagement, trackAviationEvent } = useAnalytics()

  useEffect(() => {
    // Track blog article view when component mounts
    trackBlogEngagement(articleTitle, category)

    // Track additional article metadata
    if (readingTime || wordCount) {
      trackAviationEvent('article_metadata', {
        article_title: articleTitle,
        category: category,
        reading_time: readingTime,
        word_count: wordCount,
        event_label: 'article_engagement'
      })
    }
  }, [articleTitle, category, readingTime, wordCount, trackBlogEngagement, trackAviationEvent])

  // Track reading progress using Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)

      // Track reading milestones
      if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
        trackAviationEvent('reading_progress', {
          article_title: articleTitle,
          category: category,
          scroll_percent: scrollPercent,
          event_label: `${scrollPercent}%_read`
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [articleTitle, category, trackAviationEvent])

  // This component doesn't render anything visible
  return null
}
