import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Disable trailing slashes to prevent redirects - each page should have its own URL
  trailingSlash: false,
  // Disable Next.js URL normalization redirects; we handle trailing slashes via middleware rewrites (no redirect)
  skipTrailingSlashRedirect: true,
  // NOTE: `skipMiddlewareUrlNormalize` is deprecated; Next.js 16 expects `skipProxyUrlNormalize`.
  // We keep URL normalization disabled because the site enforces canonical URLs in middleware.
  skipProxyUrlNormalize: true,
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
}

export default nextConfig
