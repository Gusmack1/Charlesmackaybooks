import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const NOINDEX_PATHS = ['/checkout', '/order-complete', '/order-tracking', '/search']

// Legacy /book/* slug → current /books/* id (for 308 redirects)
const LEGACY_BOOK_SLUG_TO_ID: Record<string, string> = {
  'captain-clouds': 'captain-eric-brown',
}

// Legacy /aircraft/* slug → /blog/* slug
const LEGACY_AIRCRAFT_TO_BLOG: Record<string, string> = {
  'hawker-hurricane': 'hawker-hurricane-fighter-development',
  'supermarine-spitfire': 'supermarine-spitfire-development-evolution',
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url
  let shouldRedirect = false

  // Legacy /book/{slug} → /books/{id}
  if (pathname.startsWith('/book/')) {
    const slug = pathname.replace(/^\/book\/?/, '').replace(/\/+$/, '')
    const targetId = LEGACY_BOOK_SLUG_TO_ID[slug] || slug
    url.pathname = `/books/${targetId}`
    shouldRedirect = true
  }

  // Legacy /books/{old-slug} → /books/{correct-id}
  if (!shouldRedirect && pathname.startsWith('/books/')) {
    const slug = pathname.replace(/^\/books\/?/, '').replace(/\/+$/, '')
    const targetId = LEGACY_BOOK_SLUG_TO_ID[slug]
    if (targetId) {
      url.pathname = `/books/${targetId}`
      shouldRedirect = true
    }
  }

  // Legacy /aircraft/{slug} → /blog/{slug} or /blog if no mapping
  if (!shouldRedirect && pathname.startsWith('/aircraft/')) {
    const slug = pathname.replace(/^\/aircraft\/?/, '').replace(/\/+$/, '')
    const blogSlug = LEGACY_AIRCRAFT_TO_BLOG[slug]
    url.pathname = blogSlug ? `/blog/${blogSlug}` : '/blog'
    shouldRedirect = true
  }

  // /ai-prompt-system: 410 Gone (no page, tell Google to remove)
  if (!shouldRedirect && pathname === '/ai-prompt-system') {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  // Consolidate retired newsroom URLs into the current aviation-news path.
  if (!shouldRedirect && (pathname === '/blog/scottish-aviation-news' || pathname.startsWith('/blog/scottish-aviation-news/'))) {
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

  // Forward pathname for layout (e.g. breadcrumbs, metadata)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname || '/')
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
