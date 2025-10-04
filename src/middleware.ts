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

// URL redirect mappings for 404 fixes
const URL_REDIRECTS: Record<string, string> = {
  '/aircraft/hawker-hurricane': '/blog/hawker-hurricane-fighter-development/',
  '/aircraft/hawker-hurricane/': '/blog/hawker-hurricane-fighter-development/',
  '/aircraft/bristol-fighter': '/blog/bristol-fighter-f2b-brisfit/',
  '/aircraft/bristol-fighter/': '/blog/bristol-fighter-f2b-brisfit/',
  '/book/dieter-dengler': '/books/dieter-dengler/',
  '/book/dieter-dengler/': '/books/dieter-dengler/',
  '/book/dorothy-wordsworth': '/books/dorothy-wordsworth/',
  '/book/dorothy-wordsworth/': '/books/dorothy-wordsworth/',
  '/book/enemy-luftwaffe-1945': '/books/enemy-luftwaffe-1945/',
  '/book/enemy-luftwaffe-1945/': '/books/enemy-luftwaffe-1945/',
  '/book/aircraft-carrier-argus': '/books/aircraft-carrier-argus/',
  '/book/aircraft-carrier-argus/': '/books/aircraft-carrier-argus/',
  '/books/aviation-manufacturing-wartime-production': '/blog/aviation-manufacturing-wartime-production/',
  '/books/aviation-manufacturing-wartime-production/': '/blog/aviation-manufacturing-wartime-production/',
  '/books/captain-clouds': '/books/captain-eric-brown/',
  '/books/captain-clouds/': '/books/captain-eric-brown/',
  '/research-methodology': '/research-guides/',
  '/research-methodology/': '/research-guides/',
  '/fonts/inter-var.woff2': '/404'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle URL redirects for 404 fixes
  if (URL_REDIRECTS[pathname]) {
    const redirectUrl = URL_REDIRECTS[pathname]
    if (redirectUrl === '/404') {
      // Return 404 for font files and other non-content URLs
      return new Response('Not Found', { status: 404 })
    }
    // Redirect to correct URL with proper trailing slash handling
    const fullRedirectUrl = redirectUrl.startsWith('/') ? redirectUrl : `/${redirectUrl}`
    return NextResponse.redirect(new URL(fullRedirectUrl, request.url), 301)
  }

  // Add X-Robots-Tag to internal tooling routes to avoid indexing
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
    '/google-indexing/:path*',
    '/aircraft/:path*',
    '/book/:path*',
    '/books/:path*',
    '/research-methodology/:path*',
    '/fonts/:path*'
  ]
}


