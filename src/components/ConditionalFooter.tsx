'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Hide footer on individual book pages (/books/[id])
  const hideOnBookDetail = pathname.startsWith('/books/') && pathname !== '/books'

  if (hideOnBookDetail) return null
  return <Footer />
}


