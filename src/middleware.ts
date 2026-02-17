import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = ['/ai-prompt-system', '/checkout', '/order-complete', '/order-tracking', '/search']

// No redirects - each page must be accessible at its own URL
// Netlify handles SSL/HTTPS automatically, no need for redirects here
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Explicitly mark legacy sections as permanently removed (NO redirects).
  // This helps Google drop old URLs faster than a generic 404.
  if (
    pathname === '/book' ||
    pathname.startsWith('/book/') ||
    pathname === '/aircraft' ||
    pathname.startsWith('/aircraft/')
  ) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Explicitly removed legacy page (NO redirects)
  if (pathname === '/research-methodology') {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Legacy newsroom path retired in favor of /aviation-news/*.
  if (pathname === '/blog/scottish-aviation-news' || pathname.startsWith('/blog/scottish-aviation-news/')) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Enforce unique URL shape: trailing-slash variants are treated as non-canonical.
  // IMPORTANT: trailing-slash variants often remain indexed for a long time.
  // Redirecting preserves rankings and ensures search clicks don't land on 404s.
  if (
    pathname.length > 1 &&
    pathname.endsWith('/') &&
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/admin/') &&
    !pathname.startsWith('/book-covers/') &&
    !pathname.startsWith('/blog-images/') &&
    !pathname.startsWith('/fonts/') &&
    pathname !== '/robots.txt/' &&
    pathname !== '/sitemap.xml/' &&
    pathname !== '/sitemap-images.xml/' &&
    pathname !== '/sw.js/' &&
    pathname !== '/manifest.json/' &&
    pathname !== '/offline.html/'
  ) {
    const canonicalPath = pathname.replace(/\/+$/, '')
    // Use the standard URL class to avoid NextURL re-applying trailing slashes.
    const url = new URL(request.url)
    url.pathname = canonicalPath || '/'
    return NextResponse.redirect(url, 308)
  }

  // Note: Aside from the canonical trailing-slash redirect above, we avoid redirects.
  // Old URL patterns return 404/410 naturally if they don't exist.

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

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run for all routes except Next.js internals/static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}


