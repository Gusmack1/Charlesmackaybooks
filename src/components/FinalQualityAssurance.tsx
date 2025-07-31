'use client';

import { useState, useMemo } from 'react';
import {
  useFinalQualityAssurance,
  defaultQualityAssuranceConfig,
  QualityTest,
  QualityReport,
  QualityAssuranceConfig
} from '@/utils/finalQualityAssurance';

interface FinalQualityAssuranceProps {
  className?: string;
  showConfiguration?: boolean;
  showResults?: boolean;
  showRecommendations?: boolean;
}

export default function FinalQualityAssurance({
  className = '',
  showConfiguration = true,
  showResults = true,
  showRecommendations = true
}: FinalQualityAssuranceProps) {
  const {
    runQualityAssurance,
    isRunning,
    report,
    error,
    qaSystem
  } = useFinalQualityAssurance();

  const [activeTab, setActiveTab] = useState<'overview' | 'configuration' | 'results' | 'recommendations' | 'next-steps'>('overview');
  const [selectedTest, setSelectedTest] = useState<QualityTest | null>(null);
  const [showTestDetail, setShowTestDetail] = useState(false);
  const [customConfig, setCustomConfig] = useState<QualityAssuranceConfig>(defaultQualityAssuranceConfig);

  // Analytics calculations
  const analytics = useMemo(() => {
    if (!report) return null;

    const categoryBreakdown = report.tests.reduce((acc, test) => {
      if (!acc[test.category]) {
        acc[test.category] = { total: 0, passed: 0, failed: 0, warnings: 0, avgScore: 0 };
      }
      acc[test.category].total++;
      acc[test.category][test.status]++;
      acc[test.category].avgScore += test.score || 0;
      return acc;
    }, {} as Record<string, { total: number; passed: number; failed: number; warnings: number; avgScore: number }>);

    // Calculate average scores
    Object.keys(categoryBreakdown).forEach(category => {
      categoryBreakdown[category].avgScore = Math.round(categoryBreakdown[category].avgScore / categoryBreakdown[category].total);
    });

    const priorityBreakdown = report.tests.reduce((acc, test) => {
      if (!acc[test.priority]) {
        acc[test.priority] = { total: 0, passed: 0, failed: 0 };
      }
      acc[test.priority].total++;
      acc[test.priority][test.status]++;
      return acc;
    }, {} as Record<string, { total: number; passed: number; failed: number }>);

    return {
      categoryBreakdown,
      priorityBreakdown,
      overallScore: report.overallScore,
      isReadyForProduction: report.overallScore >= 95 && report.summary.criticalIssues === 0
    };
  }, [report]);

  // Handle quality assurance run
  const handleRunQualityAssurance = async () => {
    await runQualityAssurance();
  };

  // Handle configuration changes
  const handleConfigChange = (key: keyof QualityAssuranceConfig, value: any) => {
    setCustomConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle performance targets changes
  const handlePerformanceTargetChange = (key: keyof QualityAssuranceConfig['performanceTargets'], value: number) => {
    setCustomConfig(prev => ({
      ...prev,
      performanceTargets: {
        ...prev.performanceTargets,
        [key]: value
      }
    }));
  };

  // Render functions for each tab
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance Overview</h3>
        
        {!report ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Ready to run comprehensive quality assurance tests</p>
            <button
              onClick={handleRunQualityAssurance}
              disabled={isRunning}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isRunning ? 'Running Tests...' : 'Start Quality Assurance'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{report.summary.passed}</div>
                <div className="text-sm text-green-700">Tests Passed</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{report.summary.failed}</div>
                <div className="text-sm text-red-700">Tests Failed</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{report.summary.warnings}</div>
                <div className="text-sm text-yellow-700">Warnings</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{report.overallScore}%</div>
                <div className="text-sm text-blue-700">Overall Score</div>
              </div>
            </div>

            {analytics && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Category Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(analytics.categoryBreakdown).map(([category, data]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 capitalize">{category}</span>
                        <span className="text-sm text-gray-600">{data.avgScore}%</span>
                      </div>
                      <div className="flex space-x-2 text-xs">
                        <span className="text-green-600">{data.passed} passed</span>
                        <span className="text-red-600">{data.failed} failed</span>
                        <span className="text-yellow-600">{data.warnings} warnings</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                analytics?.isReadyForProduction 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <span className="mr-2">
                  {analytics?.isReadyForProduction ? '✅' : '⚠️'}
                </span>
                {analytics?.isReadyForProduction 
                  ? 'Ready for Production Deployment' 
                  : 'Needs Improvement Before Production'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance Configuration</h3>
        
        <div className="space-y-6">
          {/* Target Scores */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Target Scores</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Score (%)
                </label>
                <input
                  type="number"
                  value={customConfig.targetScore}
                  onChange={(e) => handleConfigChange('targetScore', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Critical Threshold (%)
                </label>
                <input
                  type="number"
                  value={customConfig.criticalThreshold}
                  onChange={(e) => handleConfigChange('criticalThreshold', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warning Threshold (%)
                </label>
                <input
                  type="number"
                  value={customConfig.warningThreshold}
                  onChange={(e) => handleConfigChange('warningThreshold', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Performance Targets */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Performance Targets</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LCP (ms)
                </label>
                <input
                  type="number"
                  value={customConfig.performanceTargets.lcp}
                  onChange={(e) => handlePerformanceTargetChange('lcp', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FID (ms)
                </label>
                <input
                  type="number"
                  value={customConfig.performanceTargets.fid}
                  onChange={(e) => handlePerformanceTargetChange('fid', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CLS
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={customConfig.performanceTargets.cls}
                  onChange={(e) => handlePerformanceTargetChange('cls', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lighthouse Score
                </label>
                <input
                  type="number"
                  value={customConfig.performanceTargets.lighthouse}
                  onChange={(e) => handlePerformanceTargetChange('lighthouse', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Test Types */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Test Types</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={customConfig.automatedTests}
                  onChange={(e) => handleConfigChange('automatedTests', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Automated Tests</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={customConfig.manualTests}
                  onChange={(e) => handleConfigChange('manualTests', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Manual Tests</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
        
        {!report ? (
          <div className="text-center py-8 text-gray-500">
            No test results available. Run quality assurance tests first.
          </div>
        ) : (
          <div className="space-y-4">
            {report.tests.map((test) => (
              <div
                key={test.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  test.status === 'passed' ? 'border-green-200 bg-green-50' :
                  test.status === 'failed' ? 'border-red-200 bg-red-50' :
                  test.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200 bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedTest(test);
                  setShowTestDetail(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        test.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        test.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        test.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {test.priority}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        test.status === 'passed' ? 'bg-green-100 text-green-800' :
                        test.status === 'failed' ? 'bg-red-100 text-red-800' :
                        test.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {test.status}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{test.category}</span>
                    </div>
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                    {test.details && (
                      <p className="text-sm text-gray-700 mt-2">{test.details}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    {test.score !== undefined && (
                      <div className="text-2xl font-bold text-gray-900">{test.score}%</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
        
        {!report || report.recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recommendations available.
          </div>
        ) : (
          <div className="space-y-4">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-900">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderNextSteps = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        
        {!report || report.nextSteps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No next steps available.
          </div>
        ) : (
          <div className="space-y-4">
            {report.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-900">{step}</p>
                </div>
              </div>
            ))}
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
          <h1 className="text-3xl font-bold text-gray-900">Final Quality Assurance & Testing</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive testing to achieve 100/100 SEO scores and "excellent" Google Search Console status
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'configuration', label: 'Configuration' },
              { id: 'results', label: 'Results' },
              { id: 'recommendations', label: 'Recommendations' },
              { id: 'next-steps', label: 'Next Steps' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'configuration' && showConfiguration && renderConfiguration()}
          {activeTab === 'results' && showResults && renderResults()}
          {activeTab === 'recommendations' && showRecommendations && renderRecommendations()}
          {activeTab === 'next-steps' && renderNextSteps()}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Test Detail Modal */}
        {showTestDetail && selectedTest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedTest.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">{selectedTest.description}</p>
                  </div>
                  {selectedTest.details && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                      <p className="text-sm text-gray-700">{selectedTest.details}</p>
                    </div>
                  )}
                  {selectedTest.recommendations && selectedTest.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {selectedTest.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setShowTestDetail(false)}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 