import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Ghost routes — permanently removed pages. Return 410 Gone so Google drops
// them from the index entirely (vs. 308-to-/ which leaks PageRank to root).
// V2 #4 + Audit B §14. Implemented in middleware because @netlify/plugin-nextjs
// intercepts routing before netlify.toml [[redirects]] can fire.
const GHOST_PATTERNS: RegExp[] = [
  /^\/blog(\/.*)?$/,
  /^\/aviation-news(\/.*)?$/,
  /^\/aviation-bibliography\/?$/,
  /^\/aviation-glossary(\/.*)?$/,
  /^\/research-guides(\/.*)?$/,
  /^\/scottish-aviation-timeline(\/.*)?$/,
  /^\/golden-age-1918-1939(\/.*)?$/,
  /^\/great-war-1914-1918(\/.*)?$/,
  /^\/pioneer-era-1895-1914(\/.*)?$/,
  /^\/for-researchers(\/.*)?$/,
  /^\/categories(\/.*)?$/,
]

const GONE_BODY = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>410 Gone — Charles Mackay Books</title>
<meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui,sans-serif;max-width:640px;margin:4rem auto;padding:0 1rem;color:#222}h1{font-size:1.5rem}a{color:#0a58ca}</style>
</head>
<body>
<h1>410 Gone</h1>
<p>This page has been permanently removed.</p>
<p><a href="/">Return home</a> &middot; <a href="/books">Browse books</a></p>
</body>
</html>`

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (GHOST_PATTERNS.some((rx) => rx.test(path))) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Robots-Tag': 'noindex',
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  // Run on all paths except Next internals, API routes, and static asset
  // directories. The trailing `.*\\..*` excludes anything containing a dot
  // (favicon.ico, *.xml, *.txt, *.png, etc.) so feeds/sitemaps/images bypass
  // the middleware entirely.
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|book-covers/|blog-images/|.*\\..*).*)',
  ],
}
