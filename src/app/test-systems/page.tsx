'use client';

import { useState } from 'react';
import { runCompleteWebsiteFix } from '../../utils/runComprehensiveFix';

export default function TestSystemsPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runSystems = async () => {
    setIsRunning(true);
    setError(null);
    setResults(null);

    try {
      console.log('🚀 Starting Complete Website Fix Process...');
      const result = await runCompleteWebsiteFix();
      setResults(result);
      console.log('✅ Complete Website Fix Process Finished!', result);
    } catch (err) {
      console.error('❌ Complete Website Fix Process Failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="content h1 text-primary mb-4">
            🧪 Test All Systems
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Run the complete website fixer system and all available tools to test the entire infrastructure.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="content h2 text-primary mb-2">
                System Test Control
              </h2>
              <p className="text-secondary">
                Execute all systems and generate comprehensive reports
              </p>
            </div>
            <button
              onClick={runSystems}
              disabled={isRunning}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'badge badge-blue'
              }`}
            >
              {isRunning ? '🔄 Running Systems...' : '🚀 Run All Systems'}
            </button>
          </div>
        </div>

        {error && (
          <div className="card-compact bg-accent-red text-white p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">❌ Error</h3>
            <p className="text-white">{error}</p>
          </div>
        )}

        {results && (
          <div className="card-compact bg-accent-green text-white p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">✅ Systems Test Complete</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Comprehensive Fix</h4>
                <p className="text-sm text-secondary">
                  Status: {results.comprehensiveFix?.overallStatus || 'N/A'}
                </p>
                <p className="text-sm text-secondary">
                  Issues Found: {results.comprehensiveFix?.summary?.totalIssuesFound || 0}
                </p>
                <p className="text-sm text-secondary">
                  Issues Fixed: {results.comprehensiveFix?.summary?.totalIssuesFixed || 0}
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Multi-Agent Audit</h4>
                <p className="text-sm text-secondary">
                  Status: {results.multiAgentAudit?.status || 'N/A'}
                </p>
                <p className="text-sm text-secondary">
                  Pages Audited: {results.multiAgentAudit?.pagesAudited || 0}
                </p>
                <p className="text-sm text-secondary">
                  Average Score: {results.multiAgentAudit?.averageScore || 0}
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Quality Assurance</h4>
                <p className="text-sm text-secondary">
                  Overall Score: {results.qualityAssurance?.overallScore || 0}/100
                </p>
                <p className="text-sm text-secondary">
                  Tests Passed: {results.qualityAssurance?.summary?.passed || 0}
                </p>
                <p className="text-sm text-secondary">
                  Tests Failed: {results.qualityAssurance?.summary?.failed || 0}
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Cross-Linking</h4>
                <p className="text-sm text-secondary">
                  Status: {results.crossLinking?.status || 'N/A'}
                </p>
                <p className="text-sm text-secondary">
                  Links Created: {results.crossLinking?.linksCreated || 0}
                </p>
                <p className="text-sm text-secondary">
                  Average Relevance: {results.crossLinking?.averageRelevance || 0}
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Task Breakdown</h4>
                <p className="text-sm text-secondary">
                  Status: {results.taskBreakdown?.status || 'N/A'}
                </p>
                <p className="text-sm text-secondary">
                  Tasks Created: {results.taskBreakdown?.tasksCreated || 0}
                </p>
                <p className="text-sm text-secondary">
                  Tasks Completed: {results.taskBreakdown?.tasksCompleted || 0}
                </p>
              </div>

              <div className="card p-4">
                <h4 className="font-semibold text-primary mb-2">Overall Results</h4>
                <p className="text-sm text-secondary">
                  Total Issues Found: {results.totalIssuesFound || 0}
                </p>
                <p className="text-sm text-secondary">
                  Total Issues Fixed: {results.totalIssuesFixed || 0}
                </p>
                <p className="text-sm text-secondary">
                  Critical Actions: {results.criticalActions?.length || 0}
                </p>
              </div>
            </div>

            {results.recommendations && results.recommendations.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-primary mb-3">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.recommendations.slice(0, 10).map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-secondary">{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.criticalActions && results.criticalActions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-accent-red mb-3">Critical Actions Required</h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.criticalActions.slice(0, 5).map((action: string, index: number) => (
                    <li key={index} className="text-sm text-accent-red">{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 