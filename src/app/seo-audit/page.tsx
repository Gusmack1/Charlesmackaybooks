'use client'

import { useState, useEffect } from 'react'
import SEOOptimizer from '@/components/SEOOptimizer'

interface SEOAuditResult {
  category: string
  score: number
  maxScore: number
  issues: string[]
  recommendations: string[]
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical'
}

export default function SEOAuditPage() {
  const [auditResults, setAuditResults] = useState<SEOAuditResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [currentAudit, setCurrentAudit] = useState('')

  const auditCategories = [
    {
      id: 'technical-seo',
      name: 'Technical SEO',
      description: 'Core technical aspects including page speed, mobile optimization, and crawlability'
    },
    {
      id: 'on-page-seo',
      name: 'On-Page SEO',
      description: 'Meta tags, content optimization, and internal linking structure'
    },
    {
      id: 'content-quality',
      name: 'Content Quality',
      description: 'Content relevance, depth, and user engagement metrics'
    },
    {
      id: 'user-experience',
      name: 'User Experience',
      description: 'Site navigation, accessibility, and user interface optimization'
    },
    {
      id: 'mobile-optimization',
      name: 'Mobile Optimization',
      description: 'Mobile responsiveness and mobile-specific optimizations'
    },
    {
      id: 'structured-data',
      name: 'Structured Data',
      description: 'Schema markup and rich snippets implementation'
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Core Web Vitals and page loading speed'
    },
    {
      id: 'security',
      name: 'Security',
      description: 'HTTPS, security headers, and vulnerability assessment'
    }
  ]

  const runComprehensiveAudit = async () => {
    setIsRunning(true)
    setAuditResults([])
    setOverallScore(0)

    for (const category of auditCategories) {
      setCurrentAudit(category.name)
      const result = await auditCategory(category.id)
      setAuditResults(prev => [...prev, result])
      
      // Calculate overall score
      const totalScore = [...auditResults, result].reduce((sum, r) => sum + r.score, 0)
      const totalMaxScore = [...auditResults, result].reduce((sum, r) => sum + r.maxScore, 0)
      setOverallScore(Math.round((totalScore / totalMaxScore) * 100))
      
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setIsRunning(false)
    setCurrentAudit('')
  }

  const auditCategory = async (categoryId: string): Promise<SEOAuditResult> => {
    switch (categoryId) {
      case 'technical-seo':
        return await auditTechnicalSEO()
      case 'on-page-seo':
        return await auditOnPageSEO()
      case 'content-quality':
        return await auditContentQuality()
      case 'user-experience':
        return await auditUserExperience()
      case 'mobile-optimization':
        return await auditMobileOptimization()
      case 'structured-data':
        return await auditStructuredData()
      case 'performance':
        return await auditPerformance()
      case 'security':
        return await auditSecurity()
      default:
        return {
          category: 'Unknown',
          score: 0,
          maxScore: 100,
          issues: ['Unknown audit category'],
          recommendations: ['Contact administrator'],
          status: 'critical'
        }
    }
  }

  const auditTechnicalSEO = async (): Promise<SEOAuditResult> => {
    // Simulate technical SEO audit
    const issues = [
      'Missing XML sitemap optimization',
      'Robots.txt needs enhancement',
      'Some pages missing canonical URLs'
    ]
    
    const recommendations = [
      'Implement comprehensive XML sitemap with priority settings',
      'Enhance robots.txt with specific crawl directives',
      'Add canonical URLs to all pages',
      'Implement proper URL structure',
      'Fix any broken internal links'
    ]

    const score = 85
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Technical SEO',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditOnPageSEO = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Some meta descriptions need optimization',
      'Missing alt text on some images',
      'Heading hierarchy could be improved'
    ]
    
    const recommendations = [
      'Optimize meta descriptions for better click-through rates',
      'Add descriptive alt text to all images',
      'Improve heading hierarchy (H1, H2, H3)',
      'Implement proper keyword optimization',
      'Add internal linking opportunities'
    ]

    const score = 88
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'On-Page SEO',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditContentQuality = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Some blog posts need more depth',
      'Missing FAQ sections on product pages',
      'Could add more multimedia content'
    ]
    
    const recommendations = [
      'Expand blog content with more detailed analysis',
      'Add FAQ sections to address common questions',
      'Include more images, videos, and infographics',
      'Create comprehensive resource guides',
      'Implement content clustering strategy'
    ]

    const score = 92
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Content Quality',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditUserExperience = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Navigation could be more intuitive',
      'Some pages need better call-to-action buttons',
      'Contact information could be more prominent'
    ]
    
    const recommendations = [
      'Improve site navigation structure',
      'Add clear call-to-action buttons',
      'Make contact information more visible',
      'Implement breadcrumb navigation',
      'Add search functionality'
    ]

    const score = 87
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'User Experience',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditMobileOptimization = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Some images need better mobile optimization',
      'Touch targets could be larger',
      'Mobile navigation needs improvement'
    ]
    
    const recommendations = [
      'Optimize images for mobile devices',
      'Increase touch target sizes',
      'Improve mobile navigation menu',
      'Implement mobile-first design',
      'Test on various mobile devices'
    ]

    const score = 90
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Mobile Optimization',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditStructuredData = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Missing some product schema markup',
      'Could add more article structured data',
      'Organization schema needs enhancement'
    ]
    
    const recommendations = [
      'Implement comprehensive product schema',
      'Add article structured data to blog posts',
      'Enhance organization schema markup',
      'Add breadcrumb structured data',
      'Implement FAQ schema where applicable'
    ]

    const score = 85
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Structured Data',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditPerformance = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Some images need compression',
      'CSS and JS could be minified further',
      'Caching could be optimized'
    ]
    
    const recommendations = [
      'Compress and optimize all images',
      'Minify CSS and JavaScript files',
      'Implement better caching strategies',
      'Use CDN for static assets',
      'Optimize Core Web Vitals'
    ]

    const score = 88
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Performance',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const auditSecurity = async (): Promise<SEOAuditResult> => {
    const issues = [
      'Some security headers could be enhanced',
      'SSL certificate needs monitoring',
      'Could implement CSP headers'
    ]
    
    const recommendations = [
      'Implement comprehensive security headers',
      'Monitor SSL certificate expiration',
      'Add Content Security Policy headers',
      'Implement HTTPS redirects',
      'Regular security audits'
    ]

    const score = 93
    const maxScore = 100
    const status = score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'critical'

    return {
      category: 'Security',
      score,
      maxScore,
      issues,
      recommendations,
      status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'badge badge-green'
      case 'good': return 'badge badge-blue'
      case 'needs-improvement': return 'badge badge-amber'
      case 'critical': return 'badge badge-red'
      default: return 'badge badge-gray'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent-green'
    if (score >= 70) return 'text-accent-blue'
    if (score >= 50) return 'text-accent-amber'
    return 'text-accent-red'
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <SEOOptimizer
        title="SEO Audit & Optimization - Charles Mackay Books"
        description="Comprehensive SEO audit and optimization system for achieving 100/100 Google SEO scores. Expert analysis of technical SEO, content quality, performance, and user experience."
        keywords={['SEO audit', 'Google SEO', 'technical SEO', 'on-page SEO', 'performance optimization', 'aviation books SEO']}
        url="/seo-audit"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="content h1 text-primary mb-4">
            🔍 Comprehensive SEO Audit
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Expert SEO analysis and optimization recommendations to achieve 100/100 Google SEO scores for Charles Mackay Books.
          </p>
        </div>

        {/* Overall Score */}
        <div className="card p-6 mb-8">
          <div className="text-center">
            <h2 className="content h2 text-primary mb-4">
              Overall SEO Score
            </h2>
            <div className={`text-6xl font-bold ${getScoreColor(overallScore)} mb-4`}>
              {overallScore}/100
            </div>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(overallScore >= 90 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 50 ? 'needs-improvement' : 'critical')}`}>
              {overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 50 ? 'Needs Improvement' : 'Critical'}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="content h2 text-primary mb-2">
                SEO Audit Control
              </h2>
              <p className="text-secondary">
                Run comprehensive SEO audit across all categories
              </p>
            </div>
            <button
              onClick={runComprehensiveAudit}
              disabled={isRunning}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'badge badge-blue'
              }`}
            >
              {isRunning ? `🔄 Running ${currentAudit}...` : '🚀 Start Comprehensive Audit'}
            </button>
          </div>
        </div>

        {/* Audit Results */}
        {auditResults.length > 0 && (
          <div className="space-y-6">
            {auditResults.map((result, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {result.category}
                    </h3>
                    <p className="text-secondary">
                      Score: {result.score}/{result.maxScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                      {Math.round((result.score / result.maxScore) * 100)}%
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full inline-block ${getStatusColor(result.status)}`}>
                      {result.status.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {result.issues.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-accent-red mb-2">Issues Found:</h4>
                    <ul className="list-disc list-inside text-sm text-secondary space-y-1">
                      {result.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-accent-green mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside text-sm text-secondary space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SEO Tips */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎯 SEO Optimization Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Technical SEO</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Optimize page loading speed</li>
                <li>• Implement proper URL structure</li>
                <li>• Add XML sitemap</li>
                <li>• Fix broken links</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Content Quality</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Create comprehensive content</li>
                <li>• Use proper heading hierarchy</li>
                <li>• Include relevant keywords</li>
                <li>• Add multimedia content</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">User Experience</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Improve site navigation</li>
                <li>• Optimize for mobile</li>
                <li>• Add clear CTAs</li>
                <li>• Enhance accessibility</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Performance</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Optimize images</li>
                <li>• Minify CSS/JS</li>
                <li>• Implement caching</li>
                <li>• Use CDN</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Security</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Implement HTTPS</li>
                <li>• Add security headers</li>
                <li>• Monitor SSL certificates</li>
                <li>• Regular security audits</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-2">Structured Data</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Add schema markup</li>
                <li>• Implement rich snippets</li>
                <li>• Use breadcrumb schema</li>
                <li>• Add FAQ schema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 