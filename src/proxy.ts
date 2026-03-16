import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = ['/ai-prompt-system', '/checkout', '/order-complete', '/order-tracking', '/search']

// Netlify handles SSL/HTTPS automatically, no need for HTTPS redirects here.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url
  let shouldRedirect = false

  // Consolidate retired newsroom URLs into the current aviation-news path.
  if (pathname === '/blog/scottish-aviation-news' || pathname.startsWith('/blog/scottish-aviation-news/')) {
    const targetPath = pathname
      .replace(/^\/blog\/scottish-aviation-news/, '/aviation-news')
      .replace(/\/+$/, '')
    url.pathname = targetPath || '/aviation-news'
    shouldRedirect = true
  }

  if (!shouldRedirect && pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.replace(/\/+$/, '')
    shouldRedirect = true
  }

  if (url.hostname === 'www.charlesmackaybooks.com') {
    url.hostname = 'charlesmackaybooks.com'
    shouldRedirect = true
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 308)
  }

  // Explicitly removed pages (410 Gone)
  if (pathname === '/research-methodology') {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Add X-Robots-Tag to internal tooling routes to avoid indexing
  if (NOINDEX_PATHS.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // API endpoints should never be indexed.
  if (pathname.startsWith('/api/')) {
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

  // Forward pathname for hreflang generation in layout
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname || '/')
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // Run for all routes except Next.js internals/static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
