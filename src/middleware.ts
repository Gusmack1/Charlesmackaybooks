import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = ['/ai-prompt-system']

// No redirects - each page must be accessible at its own URL
// Netlify handles SSL/HTTPS automatically, no need for redirects here
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Note: All redirects removed - pages must be accessible directly
  // Each page has its own unique URL without redirects
  // Old URL patterns will return 404 naturally if they don't exist

  // Add X-Robots-Tag to internal tooling routes to avoid indexing
  if (NOINDEX_PATHS.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Add noindex to font files only (sitemap.xml should be indexable)
  if (pathname.startsWith('/fonts/') || pathname.includes('.woff2')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/ai-prompt-system/:path*', '/fonts/:path*']
}


