'use client';

import { useState, useMemo } from 'react';
import { useSystemRunner, SystemRunnerReport, SystemResult } from '@/utils/systemRunner';

interface SystemRunnerProps {
  className?: string;
  showDetailedResults?: boolean;
  showRecommendations?: boolean;
}

export default function SystemRunner({
  className = '',
  showDetailedResults = true,
  showRecommendations = true
}: SystemRunnerProps) {
  const { runAllSystems, isRunning, report, error } = useSystemRunner();
  const [activeTab, setActiveTab] = useState<'overview' | 'systems' | 'results' | 'recommendations'>('overview');

  // Calculate progress
  const progress = useMemo(() => {
    if (!report) return 0;
    const completedSystems = report.systems.filter(s => s.status === 'completed').length;
    return completedSystems / report.summary.totalSystems;
  }, [report]);

  // Calculate overall status
  const overallStatus = useMemo(() => {
    if (!report) return 'pending';
    if (report.summary.failedSystems > 0) return 'error';
    if (report.summary.completedSystems === report.summary.totalSystems) return 'completed';
    return 'running';
  }, [report]);

  // Handle system run
  const handleRunAllSystems = async () => {
    try {
      await runAllSystems();
    } catch (err) {
      console.error('System runner failed:', err);
    }
  };

  // Render system status
  const renderSystemStatus = (system: SystemResult, index: number) => {
    const statusColors = {
      pending: 'bg-gray-100 text-gray-600',
      running: 'bg-blue-100 text-blue-600',
      completed: 'bg-green-100 text-green-600',
      error: 'bg-red-100 text-red-600'
    };

    const statusIcons = {
      pending: '⏳',
      running: '🔄',
      completed: '✅',
      error: '❌'
    };

    return (
      <div key={index} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{system.systemName}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[system.status]}`}>
            {statusIcons[system.status]} {system.status}
          </span>
        </div>

        {system.status === 'running' && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Running system tests...</p>
          </div>
        )}

        {system.status === 'completed' && system.result && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Duration: {system.duration ? `${Math.round(system.duration / 1000)}s` : 'N/A'}</span>
              <span>Completed: {system.endTime?.toLocaleTimeString()}</span>
            </div>
            {showDetailedResults && (
              <div className="bg-gray-50 rounded p-3">
                <h4 className="font-medium text-gray-900 mb-2">Results Summary:</h4>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {JSON.stringify(system.result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {system.status === 'error' && system.error && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <h4 className="font-medium text-red-800 mb-2">Error Details:</h4>
            <p className="text-sm text-red-600">{system.error}</p>
          </div>
        )}
      </div>
    );
  };

  // Render overview tab
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 System Runner - Charles Mackay Books</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive testing and validation of all implemented systems to ensure production readiness.
        </p>

        {!isRunning && !report && (
          <div className="text-center">
            <button
              onClick={handleRunAllSystems}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              🚀 Run All Systems
            </button>
            <p className="text-sm text-gray-500 mt-3">
              This will execute all 4 systems: Audit, QA, Cross-Linking, and Task Breakdown
            </p>
          </div>
        )}

        {isRunning && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Progress: {Math.round(progress * 100)}% - Running all systems...
              </p>
            </div>
            <div className="animate-pulse">
              <p className="text-gray-600">🔄 Executing comprehensive system validation...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">❌ Error: {error}</p>
          </div>
        )}
      </div>

      {report && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{report.summary.totalSystems}</div>
            <div className="text-sm text-gray-600">Total Systems</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{report.summary.completedSystems}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{report.summary.failedSystems}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {report.totalDuration ? `${Math.round(report.totalDuration / 1000)}s` : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Total Duration</div>
          </div>
        </div>
      )}
    </div>
  );

  // Render systems tab
  const renderSystems = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 gap-6">
          {report?.systems.map((system, index) => renderSystemStatus(system, index))}
        </div>
      </div>
    </div>
  );

  // Render results tab
  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Results</h2>
        {report && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Overall Report</h3>
              <pre className="text-sm text-gray-600 overflow-auto">
                {JSON.stringify(report, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render recommendations tab
  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations & Next Steps</h2>
        {report?.summary.recommendations && report.summary.recommendations.length > 0 ? (
          <div className="space-y-4">
            {report.summary.recommendations.map((recommendation, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-blue-800">{recommendation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recommendations available yet. Run the systems to generate recommendations.</p>
        )}
      </div>

      {overallStatus === 'completed' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Production Ready!</h3>
          <p className="text-green-700 mb-4">
            All systems have completed successfully. The Charles Mackay Books website is ready for production deployment.
          </p>
          <div className="space-y-2 text-sm text-green-600">
            <p>✅ Multi-Agent Website Audit: Validated SEO and performance</p>
            <p>✅ Final Quality Assurance: Confirmed all quality standards</p>
            <p>✅ Cross-Linking Architecture: Intelligent content relationships active</p>
            <p>✅ Multi-Agent Task Breakdown: Development workflow operational</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Runner</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive testing and validation of all Charles Mackay Books systems
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'systems', label: 'Systems', icon: '🔧' },
              { id: 'results', label: 'Results', icon: '📈' },
              { id: 'recommendations', label: 'Recommendations', icon: '💡' },
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
          {activeTab === 'systems' && renderSystems()}
          {activeTab === 'results' && showDetailedResults && renderResults()}
          {activeTab === 'recommendations' && showRecommendations && renderRecommendations()}
        </div>
      </div>
    </div>
  );
} 