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

  // Headers will be handled by netlify.toml

  // Legacy route cleanup — force redirects to fix GSC coverage
  async redirects() {
    return [
      // Legacy blog/news/taxonomy paths — permanently gone, 301 to home
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:slug*', destination: '/', permanent: true },
      { source: '/blog-:rest', destination: '/', permanent: true },
      { source: '/aircraft/:slug*', destination: '/', permanent: true },
      { source: '/aviation-news/:slug*', destination: '/', permanent: true },
      { source: '/aviation-bibliography', destination: '/', permanent: true },
      { source: '/academic-resources', destination: '/', permanent: true },
      { source: '/academic-resources/:slug*', destination: '/', permanent: true },
      { source: '/research/:slug*', destination: '/', permanent: true },
      { source: '/tag/:slug*', destination: '/', permanent: true },
      { source: '/category/:slug*', destination: '/books', permanent: true },
      { source: '/author/:slug*', destination: '/about', permanent: true },

      // Additional legacy prefixes (slim-down 2026-04-15)
      { source: '/categories', destination: '/books', permanent: true },
      { source: '/categories/:slug*', destination: '/books', permanent: true },
      { source: '/for-researchers', destination: '/about', permanent: true },
      { source: '/for-researchers/:slug*', destination: '/about', permanent: true },
      { source: '/how-to-order', destination: '/shipping', permanent: true },
      { source: '/how-to-order/:slug*', destination: '/shipping', permanent: true },
      { source: '/scottish-aviation-timeline', destination: '/', permanent: true },
      { source: '/scottish-aviation-timeline/:slug*', destination: '/', permanent: true },
      { source: '/timeline', destination: '/', permanent: true },
      { source: '/timeline/:slug*', destination: '/', permanent: true },
      { source: '/aviation-glossary', destination: '/', permanent: true },
      { source: '/aviation-glossary/:slug*', destination: '/', permanent: true },
      { source: '/faq', destination: '/contact', permanent: true },
      { source: '/faq/:slug*', destination: '/contact', permanent: true },
      { source: '/glasgow-aviation-history', destination: '/', permanent: true },
      { source: '/glasgow-aviation-history/:slug*', destination: '/', permanent: true },
      { source: '/golden-age-1918-1939', destination: '/', permanent: true },
      { source: '/golden-age-1918-1939/:slug*', destination: '/', permanent: true },
      { source: '/great-war-1914-1918', destination: '/', permanent: true },
      { source: '/great-war-1914-1918/:slug*', destination: '/', permanent: true },
      { source: '/order-complete', destination: '/books', permanent: true },
      { source: '/order-complete/:slug*', destination: '/books', permanent: true },
      { source: '/partnerships', destination: '/about', permanent: true },
      { source: '/partnerships/:slug*', destination: '/about', permanent: true },
      { source: '/research-guides', destination: '/about', permanent: true },
      { source: '/research-guides/:slug*', destination: '/about', permanent: true },
      // Renamed canonical paths
      { source: '/book/:slug', destination: '/books/:slug', permanent: true },
      { source: '/basket', destination: '/books', permanent: true },
      { source: '/newsletter-thanks', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
