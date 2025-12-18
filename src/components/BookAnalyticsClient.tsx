'use client'
import dynamic from 'next/dynamic'

const BookAnalytics = dynamic(() => import('@/components/BookAnalytics'), {
  loading: () => null,
  ssr: false,
})

export default function BookAnalyticsClient(props: any) {
  return <BookAnalytics {...props} />
}
