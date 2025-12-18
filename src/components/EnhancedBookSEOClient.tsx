'use client'
import dynamic from 'next/dynamic'

const EnhancedBookSEO = dynamic(() => import('@/components/EnhancedBookSEO'), {
  loading: () => null,
  ssr: false,
})

export default function EnhancedBookSEOClient(props: any) {
  return <EnhancedBookSEO {...props} />
}
