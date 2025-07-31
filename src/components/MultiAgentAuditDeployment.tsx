'use client';

import { useState, useMemo } from 'react';
import {
  useMultiAgentAuditDeployment,
  defaultAuditDeploymentConfig,
  AuditTarget,
  WebsiteAuditSummary,
  PageAudit,
  AuditDeploymentConfig
} from '@/utils/multiAgentAuditDeployment';

interface MultiAgentAuditDeploymentProps {
  className?: string;
  showConfiguration?: boolean;
  showResults?: boolean;
  showReports?: boolean;
}

export default function MultiAgentAuditDeployment({
  className = '',
  showConfiguration = true,
  showResults = true,
  showReports = true
}: MultiAgentAuditDeploymentProps) {
  const {
    startAudit,
    isRunning,
    progress,
    results,
    summary,
    error,
    deployment
  } = useMultiAgentAuditDeployment();

  const [activeTab, setActiveTab] = useState<'overview' | 'configuration' | 'results' | 'reports' | 'action-plan'>('overview');
  const [selectedPage, setSelectedPage] = useState<PageAudit | null>(null);
  const [showPageDetail, setShowPageDetail] = useState(false);
  const [customConfig, setCustomConfig] = useState<AuditDeploymentConfig>(defaultAuditDeploymentConfig);

  // Analytics calculations
  const analytics = useMemo(() => {
    if (!summary) return null;

    const criticalPages = results.filter(r => r.overallScore < 60);
    const highPriorityPages = results.filter(r => r.overallScore >= 60 && r.overallScore < 80);
    const goodPages = results.filter(r => r.overallScore >= 80 && r.overallScore < 90);
    const excellentPages = results.filter(r => r.overallScore >= 90);

    return {
      criticalPages,
      highPriorityPages,
      goodPages,
      excellentPages,
      averageScore: summary.averageScore,
      seoScore: summary.seoScore,
      performanceScore: summary.performanceScore,
      accessibilityScore: summary.accessibilityScore,
      bestPracticesScore: summary.bestPracticesScore,
    };
  }, [summary, results]);

  // Handle audit start
  const handleStartAudit = async () => {
    try {
      await startAudit();
    } catch (err) {
      console.error('Audit failed:', err);
    }
  };

  // Handle custom configuration
  const handleConfigChange = (key: keyof AuditDeploymentConfig, value: any) => {
    setCustomConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Render overview tab
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Multi-Agent Website Audit</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive audit system to achieve 100/100 SEO scores and "excellent" Google Search Console status.
        </p>

        {!isRunning && !summary && (
          <div className="text-center">
            <button
              onClick={handleStartAudit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🚀 Start Full Website Audit
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This will audit {defaultAuditDeploymentConfig.targets.length} pages using 5 specialized AI agents
            </p>
          </div>
        )}

        {isRunning && (
          <div className="text-center">
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Progress: {Math.round(progress * 100)}% ({results.length}/{defaultAuditDeploymentConfig.targets.length} pages)
              </p>
            </div>
            <p className="text-gray-600">Running multi-agent audit...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">❌ Error: {error}</p>
          </div>
        )}
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Score</h3>
            <p className="text-3xl font-bold text-blue-600">{summary.averageScore}/100</p>
            <p className="text-sm text-gray-500">Average across all pages</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Score</h3>
            <p className="text-3xl font-bold text-green-600">{summary.seoScore}/100</p>
            <p className="text-sm text-gray-500">Search engine optimization</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
            <p className="text-3xl font-bold text-purple-600">{summary.performanceScore}/100</p>
            <p className="text-sm text-gray-500">Core Web Vitals</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-3xl font-bold text-orange-600">{summary.accessibilityScore}/100</p>
            <p className="text-sm text-gray-500">WCAG compliance</p>
          </div>
        </div>
      )}
    </div>
  );

  // Render configuration tab
  const renderConfiguration = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concurrent Audits
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={customConfig.concurrentAudits}
              onChange={(e) => handleConfigChange('concurrentAudits', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retry Attempts
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={customConfig.retryAttempts}
              onChange={(e) => handleConfigChange('retryAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeout (ms)
            </label>
            <input
              type="number"
              min="5000"
              max="60000"
              step="1000"
              value={customConfig.timeoutMs}
              onChange={(e) => handleConfigChange('timeoutMs', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={customConfig.generateReports}
                onChange={(e) => handleConfigChange('generateReports', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Generate Reports</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={customConfig.notifyOnCompletion}
                onChange={(e) => handleConfigChange('notifyOnCompletion', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Notify on Completion</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Targets</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customConfig.targets.map((target, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {target.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {target.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      target.type === 'book' ? 'bg-blue-100 text-blue-800' :
                      target.type === 'blog' ? 'bg-green-100 text-green-800' :
                      target.type === 'home' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {target.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      target.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      target.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      target.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {target.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {target.expectedScore}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render results tab
  const renderResults = () => (
    <div className="space-y-6">
      {summary && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Results Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{summary.scoreDistribution.excellent}</p>
              <p className="text-sm text-gray-600">Excellent (90-100)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{summary.scoreDistribution.good}</p>
              <p className="text-sm text-gray-600">Good (80-89)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{summary.scoreDistribution.needsImprovement}</p>
              <p className="text-sm text-gray-600">Needs Improvement (60-79)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{summary.scoreDistribution.poor}</p>
              <p className="text-sm text-gray-600">Poor (0-59)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Issues Found</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-red-600">Critical:</span>
                  <span className="font-semibold">{summary.criticalIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600">High Priority:</span>
                  <span className="font-semibold">{summary.highPriorityIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600">Medium Priority:</span>
                  <span className="font-semibold">{summary.mediumPriorityIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Low Priority:</span>
                  <span className="font-semibold">{summary.lowPriorityIssues}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Performance</h3>
              <div className="space-y-2">
                {Object.entries(summary.agentPerformance).map(([agent, perf]) => (
                  <div key={agent} className="flex justify-between">
                    <span className="text-sm text-gray-600">{agent}:</span>
                    <span className="font-semibold">{perf.averageScore}/100</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-sm text-gray-500">{page.url}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-lg font-semibold ${
                      page.overallScore >= 90 ? 'text-green-600' :
                      page.overallScore >= 80 ? 'text-blue-600' :
                      page.overallScore >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {page.overallScore}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      page.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      page.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      page.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {page.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedPage(page);
                        setShowPageDetail(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render reports tab
  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Reports</h2>
        
        {!summary ? (
          <p className="text-gray-600">Run an audit first to generate reports.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Page-by-Page Report</h3>
                <p className="text-sm text-gray-600">Detailed analysis of each audited page</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Download Report
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Summary Report</h3>
                <p className="text-sm text-gray-600">Overall website performance summary</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Download Report
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Action Plan</h3>
                <p className="text-sm text-gray-600">Prioritized recommendations for improvement</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render action plan tab
  const renderActionPlan = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">SEO Action Plan</h2>
        
        {!summary ? (
          <p className="text-gray-600">Run an audit first to generate an action plan.</p>
        ) : (
          <div className="space-y-6">
            {summary.criticalIssues > 0 && (
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  🚨 Immediate Actions (Next 24 hours)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>{summary.criticalIssues} critical issues</strong> found that need immediate attention.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Fix all critical issues immediately</li>
                  <li>Focus on pages with scores below 60</li>
                  <li>Prioritize SEO and performance issues</li>
                </ul>
              </div>
            )}

            {summary.highPriorityIssues > 0 && (
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-orange-700 mb-2">
                  ⚡ Short-term Actions (Next 7 days)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>{summary.highPriorityIssues} high-priority issues</strong> to address.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Address all high-priority issues</li>
                  <li>Implement recommended SEO improvements</li>
                  <li>Optimize Core Web Vitals</li>
                  <li>Enhance accessibility compliance</li>
                </ul>
              </div>
            )}

            {summary.mediumPriorityIssues > 0 && (
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                  📈 Medium-term Actions (Next 30 days)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>{summary.mediumPriorityIssues} medium-priority issues</strong> to implement.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Implement remaining recommendations</li>
                  <li>Optimize content quality</li>
                  <li>Enhance user experience</li>
                  <li>Improve internal linking structure</li>
                </ul>
              </div>
            )}

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                🎯 Target Goals
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>SEO Score:</strong> Achieve 100/100 on all pages</li>
                <li><strong>Performance Score:</strong> Achieve 90+/100 on all pages</li>
                <li><strong>Accessibility Score:</strong> Achieve 95+/100 on all pages</li>
                <li><strong>Best Practices Score:</strong> Achieve 95+/100 on all pages</li>
                <li><strong>Google Search Console:</strong> Achieve "excellent" status</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Multi-Agent Website Audit Deployment</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive audit system to achieve 100/100 SEO scores and "excellent" Google Search Console status
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'configuration', label: 'Configuration', icon: '⚙️' },
              { id: 'results', label: 'Results', icon: '📈' },
              { id: 'reports', label: 'Reports', icon: '📄' },
              { id: 'action-plan', label: 'Action Plan', icon: '🎯' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'configuration' && renderConfiguration()}
          {activeTab === 'results' && renderResults()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'action-plan' && renderActionPlan()}
        </div>

        {/* Page Detail Modal */}
        {showPageDetail && selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPage.title}</h2>
                  <button
                    onClick={() => setShowPageDetail(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">URL</p>
                      <p className="font-medium">{selectedPage.url}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overall Score</p>
                      <p className="font-medium">{selectedPage.overallScore}/100</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium">{selectedPage.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{selectedPage.type}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Agent Results</h3>
                    <div className="space-y-4">
                      {selectedPage.results.map((result, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{result.agentName}</h4>
                          <p className="text-sm text-gray-600 mb-2">Score: {result.score}/100</p>
                          
                          {result.issues.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Issues:</p>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {result.issues.map((issue, i) => (
                                  <li key={i} className={`${
                                    issue.severity === 'critical' ? 'text-red-600' :
                                    issue.severity === 'high' ? 'text-orange-600' :
                                    issue.severity === 'medium' ? 'text-yellow-600' :
                                    'text-gray-600'
                                  }`}>
                                    {issue.description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {result.recommendations.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Recommendations:</p>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {result.recommendations.map((rec, i) => (
                                  <li key={i}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
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