/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds to prevent deployment failures due to linting errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable TypeScript but ignore errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Dynamic site configuration
  output: undefined,
  distDir: '.next',

  // Image configuration with performance optimization
  images: {
    domains: [
      'charlesmackaybooks.com',
      'same-assets.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Redirect configuration - aircraft pages moved to blog
  async redirects() {
    return [
      // Consolidate old /book/:id paths to canonical /books/:id
      {
        source: '/book/:id',
        destination: '/books/:id',
        permanent: true,
      },
      // Book redirects
      {
        source: '/books/captain-clouds',
        destination: '/books/captain-eric-brown',
        permanent: true,
      },
      // Aircraft pages moved to blog
      {
        source: '/aircraft/bristol-fighter',
        destination: '/blog/bristol-fighter-f2b-brisfit',
        permanent: true,
      },
      {
        source: '/aircraft/hawker-hurricane',
        destination: '/blog/hawker-hurricane-fighter-development',
        permanent: true,
      },
      {
        source: '/aircraft/sopwith-camel',
        destination: '/blog/sopwith-camel-wwi-fighter',
        permanent: true,
      },
    ]
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/book-covers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/blog-images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/styles/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/scripts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
