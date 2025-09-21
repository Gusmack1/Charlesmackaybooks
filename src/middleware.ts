import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = [
  '/comprehensive-fix',
  '/test-systems',
  '/run-optimizations',
  '/deployment',
  '/optimize-website',
  '/comprehensive-optimization-suite',
  '/google-indexing'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (NOINDEX_PATHS.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/comprehensive-fix/:path*',
    '/test-systems/:path*',
    '/run-optimizations/:path*',
    '/deployment/:path*',
    '/optimize-website/:path*',
    '/comprehensive-optimization-suite/:path*',
    '/google-indexing/:path*'
  ]
}


