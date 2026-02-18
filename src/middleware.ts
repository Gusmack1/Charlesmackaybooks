import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add X-Robots-Tag to internal tooling routes to avoid indexing
const NOINDEX_PATHS = ['/ai-prompt-system', '/checkout', '/order-complete', '/order-tracking', '/search']

// Netlify handles SSL/HTTPS automatically, no need for HTTPS redirects here.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Legacy URL migrations.
  // Search Console still shows impressions/clicks for these old routes, so redirect them to the
  // closest canonical equivalents to avoid wasting traffic on 410s.
  if (pathname === '/book' || pathname === '/book/') {
    const url = new URL(request.url)
    url.pathname = '/books'
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith('/book/')) {
    const slug = pathname.replace(/^\/book\/+/, '').replace(/\/+$/, '')
    const url = new URL(request.url)
    url.pathname = slug ? `/books/${slug}` : '/books'
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/aircraft' || pathname === '/aircraft/') {
    const url = new URL(request.url)
    url.pathname = '/blog'
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith('/aircraft/')) {
    const slug = pathname.replace(/^\/aircraft\/+/, '').replace(/\/+$/, '')
    const aircraftRedirects: Record<string, string> = {
      // Observed in Search Console exports.
      'bristol-fighter': '/blog/bristol-fighter-f2b-brisfit',
    }

    const url = new URL(request.url)
    url.pathname = aircraftRedirects[slug] || '/blog'
    return NextResponse.redirect(url, 308)
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


