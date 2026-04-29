import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Dynamic site configuration for Netlify with Next.js runtime
  output: undefined,
  distDir: '.next',

  // Webpack alias to resolve '@/...' to './src/...'
  webpack: (config) => {
    if (!config.resolve) config.resolve = {}
    if (!config.resolve.alias) config.resolve.alias = {}
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src')
    return config
  },

  // Image configuration with performance optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'charlesmackaybooks.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.charlesmackaybooks.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'same-assets.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
  },

  // Turbopack configuration to resolve build error
  turbopack: {},

  // Compiler optimizations enabled by default in Next.js

  // Compression
  compress: true,

  // Security headers — V2 #6 (Audit A §7). Native next.config headers()
  // because netlify.toml [[headers]] for "/*" is bypassed by
  // @netlify/plugin-nextjs (failure-mode: brain ship-c-redo). CSP shipped in
  // REPORT-ONLY mode for first 24h per R4; flip to enforce in follow-up bd
  // issue after reviewing violation reports.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self "https://checkout.stripe.com")',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://*.charlesmackaybooks.com https://www.googletagmanager.com https://www.google-analytics.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co https://api.resend.com https://www.googletagmanager.com https://www.google-analytics.com",
              "frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ]
  },

  // Legacy route cleanup — non-ghost redirects only.
  // GHOST routes (/blog, /aviation-news, /aviation-bibliography,
  // /aviation-glossary, /research-guides, /scottish-aviation-timeline,
  // /golden-age-1918-1939, /great-war-1914-1918, /pioneer-era-1895-1914,
  // /for-researchers, /categories) are now handled by src/middleware.ts
  // returning 410 Gone (V2 #4).
  async redirects() {
    return [
      { source: '/blog-:rest', destination: '/', permanent: true },
      { source: '/aircraft/:slug*', destination: '/', permanent: true },
      { source: '/academic-resources', destination: '/', permanent: true },
      { source: '/academic-resources/:slug*', destination: '/', permanent: true },
      { source: '/research/:slug*', destination: '/', permanent: true },
      { source: '/tag/:slug*', destination: '/', permanent: true },
      { source: '/category/:slug*', destination: '/books', permanent: true },
      { source: '/author/:slug*', destination: '/about', permanent: true },
      { source: '/how-to-order', destination: '/shipping', permanent: true },
      { source: '/how-to-order/:slug*', destination: '/shipping', permanent: true },
      { source: '/timeline', destination: '/', permanent: true },
      { source: '/timeline/:slug*', destination: '/', permanent: true },
      { source: '/faq', destination: '/contact', permanent: true },
      { source: '/faq/:slug*', destination: '/contact', permanent: true },
      { source: '/glasgow-aviation-history', destination: '/', permanent: true },
      { source: '/glasgow-aviation-history/:slug*', destination: '/', permanent: true },
      { source: '/order-complete', destination: '/books', permanent: true },
      { source: '/order-complete/:slug*', destination: '/books', permanent: true },
      { source: '/partnerships', destination: '/about', permanent: true },
      { source: '/partnerships/:slug*', destination: '/about', permanent: true },
      // Renamed canonical paths
      { source: '/book/:slug', destination: '/books/:slug', permanent: true },
      { source: '/basket', destination: '/books', permanent: true },
      { source: '/newsletter-thanks', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
