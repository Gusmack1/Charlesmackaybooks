import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = ['/ai-prompt-system']

// URL redirects for Google Search indexing issues
const REDIRECTS: Record<string, string> = {
  // Book URL fixes: /book/* -> /books/*
  '/book/dieter-dengler': '/books/dieter-dengler',
  '/book/sabres-from-north': '/books/sabres-from-north',
  '/book/dorothy-wordsworth': '/books/dorothy-wordsworth',
  '/book/modern-furniture': '/books/modern-furniture',
  '/book/german-aircraft-great-war': '/books/german-aircraft-great-war',
  '/book/beardmore-aviation': '/books/beardmore-aviation',
  '/book/clydeside-aviation-vol1': '/books/clydeside-aviation-vol1',
  '/books/aviation-manufacturing-wartime-production': '/books/aviation-manufacturing-wartime-production',

  // Aircraft URL fixes: /aircraft/* -> /blog/* (correct blog post URLs)
  '/aircraft/hawker-hurricane': '/blog/hawker-hurricane-fighter-development',
  '/aircraft/sopwith-camel': '/blog/sopwith-camel-wwi-fighter',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle URL redirects for SEO indexing fixes
  if (REDIRECTS[pathname]) {
    const redirectUrl = new URL(REDIRECTS[pathname], request.url)
    return NextResponse.redirect(redirectUrl, { status: 301 })
  }

  // Add X-Robots-Tag to internal tooling routes to avoid indexing
  if (NOINDEX_PATHS.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Add noindex to sitemap.xml and font files
  if (pathname === '/sitemap.xml' || pathname.startsWith('/fonts/') || pathname.includes('.woff2')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


