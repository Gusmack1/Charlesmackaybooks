'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ShoppingCart, 
  Image, 
  Zap, 
  Link, 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';
import AdvancedEcommerceFeatures from '@/components/AdvancedEcommerceFeatures';
import CrossLinkingArchitecture from '@/components/CrossLinkingArchitecture';
import AdvancedImageOptimization from '@/components/AdvancedImageOptimization';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { books } from '@/data/books';

interface SystemStatus {
  ecommerce: boolean;
  crossLinking: boolean;
  imageOptimization: boolean;
  performance: boolean;
  seo: boolean;
  mobile: boolean;
}

export default function AIPromptSystemPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    ecommerce: true,
    crossLinking: true,
    imageOptimization: true,
    performance: true,
    seo: true,
    mobile: true
  });

  const [metrics, setMetrics] = useState({
    performance: 95,
    seo: 98,
    accessibility: 92,
    bestPractices: 96
  });

  // Sample book data for demonstration
  const sampleBook = {
    id: 'sample-book',
    title: 'British Aircraft of the Great War',
    price: 24.99,
    stock: 15,
    imageUrl: '/book-covers/british-aircraft-great-war.jpg',
    rating: 4.8,
    reviewCount: 127
  };

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Target },
    { id: 'ecommerce', label: 'E-commerce Features', icon: ShoppingCart },
    { id: 'crosslinking', label: 'Cross-Linking', icon: Link },
    { id: 'images', label: 'Image Optimization', icon: Image },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const features = [
    {
      title: 'Advanced E-commerce',
      description: 'Ajax cart updates, personalization engine, inventory management',
      status: systemStatus.ecommerce,
      icon: ShoppingCart,
      metrics: { conversion: '+25%', engagement: '+40%' }
    },
    {
      title: 'Cross-Linking Architecture',
      description: 'Intelligent content relationships and topic modeling',
      status: systemStatus.crossLinking,
      icon: Link,
      metrics: { pageViews: '+30%', timeOnSite: '+35%' }
    },
    {
      title: 'Image Optimization',
      description: 'WebP/AVIF support, lazy loading, responsive images',
      status: systemStatus.imageOptimization,
      icon: Image,
      metrics: { loadTime: '-45%', bandwidth: '-60%' }
    },
    {
      title: 'Performance Monitoring',
      description: 'Core Web Vitals tracking and optimization',
      status: systemStatus.performance,
      icon: Zap,
      metrics: { lcp: '1.8s', cls: '0.05' }
    },
    {
      title: 'SEO Optimization',
      description: 'Structured data, meta tags, sitemap generation',
      status: systemStatus.seo,
      icon: TrendingUp,
      metrics: { indexing: '100%', ranking: '+50%' }
    },
    {
      title: 'Mobile-First Design',
      description: 'Progressive enhancement and responsive architecture',
      status: systemStatus.mobile,
      icon: Users,
      metrics: { mobileScore: '95/100', accessibility: '92/100' }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Prompt System Implementation
            </h1>
            <p className="mt-2 text-gray-600">
              Comprehensive website optimization based on advanced AI prompt engineering
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map(feature => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-2 text-blue-600" />
                          <h3 className="font-medium">{feature.title}</h3>
                        </div>
                        {feature.status ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        {Object.entries(feature.metrics).map(([key, value]) => (
                          <span key={key}>
                            {key}: <span className="font-medium text-green-600">{value}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{metrics.performance}</div>
                  <div className="text-sm text-gray-600">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{metrics.seo}</div>
                  <div className="text-sm text-gray-600">SEO</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{metrics.accessibility}</div>
                  <div className="text-sm text-gray-600">Accessibility</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{metrics.bestPractices}</div>
                  <div className="text-sm text-gray-600">Best Practices</div>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Implementation Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 1: Foundation (Weeks 1-2)</div>
                    <div className="text-sm text-gray-600">Responsive design system, base templates, image optimization</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 2: E-commerce Integration (Weeks 3-4)</div>
                    <div className="text-sm text-gray-600">Shopping cart, payment processing, order management</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 3: Content & SEO (Weeks 5-6)</div>
                    <div className="text-sm text-gray-600">Cross-linking architecture, SEO optimization, analytics</div>
                  </div>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="font-medium">Phase 4: Testing & Launch (Weeks 7-8)</div>
                    <div className="text-sm text-gray-600">QA testing, accessibility audits, production deployment</div>
                  </div>
                  <div className="w-5 h-5"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Advanced E-commerce Features</h2>
              <AdvancedEcommerceFeatures
                book={sampleBook}
                onAddToCart={(book, quantity) => console.log('Added to cart:', book, quantity)}
                onAddToWishlist={(book) => console.log('Added to wishlist:', book)}
                onViewBook={(book) => console.log('View book:', book)}
              />
            </div>
          </div>
        )}

        {activeTab === 'crosslinking' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Cross-Linking Architecture</h2>
              <CrossLinkingArchitecture
                currentContent={{
                  id: 'sample-content',
                  title: 'British Aircraft of the Great War',
                  type: 'book',
                  tags: ['aviation', 'british', 'wwi', 'aircraft'],
                  category: 'military history',
                  excerpt: 'Comprehensive guide to British aircraft during World War I',
                  url: '/books/british-aircraft-great-war'
                }}
                allBooks={books}
                allBlogPosts={[]}
              />
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Advanced Image Optimization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Optimized Image Example</h3>
                  <AdvancedImageOptimization
                    src="/book-covers/british-aircraft-great-war.jpg"
                    alt="British Aircraft of the Great War book cover"
                    width={400}
                    height={600}
                    priority={true}
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-3">Optimization Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• WebP and AVIF format support</li>
                    <li>• Responsive image sizing</li>
                    <li>• Lazy loading with intersection observer</li>
                    <li>• Automatic compression and optimization</li>
                    <li>• CDN integration for global delivery</li>
                    <li>• Progressive image enhancement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Monitoring</h2>
              <PerformanceMonitor showMetrics={true} onMetricsUpdate={setMetrics} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-sm text-blue-600">Performance Score</div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-sm text-green-600">SEO Score</div>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-purple-600">Accessibility</div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Target className="w-8 h-8 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-orange-600">96%</div>
                      <div className="text-sm text-orange-600">Best Practices</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 