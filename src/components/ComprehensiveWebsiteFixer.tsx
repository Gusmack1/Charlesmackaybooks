'use client';

import React, { useState, useEffect } from 'react';
import { ComprehensiveWebsiteFixer, WebsiteFixResult, ComprehensiveFixReport } from '../utils/comprehensiveWebsiteFixer';

// Type definitions for event handlers
interface PhaseStartData {
  phase: number;
  name: string;
}

interface PhaseCompleteData {
  phase: number;
  result: WebsiteFixResult;
}

interface PhaseErrorData {
  phase: number;
  error: any;
}

export default function ComprehensiveWebsiteFixerComponent() {
  const [fixer] = useState(() => new ComprehensiveWebsiteFixer());
  const [report, setReport] = useState<ComprehensiveFixReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [phaseProgress, setPhaseProgress] = useState<Map<number, number>>(new Map());

  const runFix = async () => {
    setIsRunning(true);
    try {
      // Run the comprehensive website fix system
      const result = await fixer.runComprehensiveFix();
      setReport(result);
    } catch (error) {
      console.error('Website fix failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    fixer.on('phase-start', (data: PhaseStartData) => {
      setCurrentPhase(data.phase);
      setPhaseProgress(prev => new Map(prev.set(data.phase, 0)));
    });

    fixer.on('phase-complete', (data: PhaseCompleteData) => {
      setPhaseProgress(prev => new Map(prev.set(data.phase, 100)));
      console.log(`Phase ${data.phase} completed:`, data.result);
    });

    fixer.on('complete', (data: ComprehensiveFixReport) => {
      console.log('Comprehensive fix completed:', data);
    });

    fixer.on('error', (error: PhaseErrorData) => {
      console.error('Comprehensive fix error:', error);
    });
  }, [fixer]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'running': return '🔄';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A';
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Comprehensive Website Fixer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete website optimization system that runs all available tools and implements 
            the remaining TODO items from the comprehensive redesign plan.
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                System Control
              </h2>
              <p className="text-gray-600">
                Run all systems and implement comprehensive website fixes
              </p>
            </div>
            <button
              onClick={runFix}
              disabled={isRunning}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRunning ? '🔄 Running...' : '🚀 Start Comprehensive Fix'}
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        {report && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Progress Overview
            </h2>
            
            {/* Overall Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {report.summary.completedPhases}/{report.summary.totalPhases}
                </div>
                <div className="text-sm text-blue-600">Phases Completed</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {report.summary.totalIssuesFixed}
                </div>
                <div className="text-sm text-green-600">Issues Fixed</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.round(report.summary.overallScore)}%
                </div>
                <div className="text-sm text-yellow-600">Overall Score</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatDuration(report.totalDuration)}
                </div>
                <div className="text-sm text-purple-600">Total Duration</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(report.summary.overallScore)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${report.summary.overallScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Phase Details */}
        {report && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Phase Details
            </h2>
            
            <div className="space-y-4">
              {report.phases.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getStatusIcon(phase.status)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {phase.phase}
                        </h3>
                        <p className={`text-sm px-2 py-1 rounded-full inline-block ${getStatusColor(phase.status)}`}>
                          {phase.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Duration: {formatDuration(phase.duration)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Issues: {phase.issuesFound} found, {phase.issuesFixed} fixed
                      </div>
                    </div>
                  </div>

                  {/* Phase Progress Bar */}
                  {phase.status === 'running' && (
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${phaseProgress.get(index + 1) || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {phase.recommendations.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.recommendations.slice(0, 3).map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Next Actions */}
                  {phase.nextActions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Actions:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.nextActions.slice(0, 3).map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary and Critical Actions */}
        {report && report.summary.criticalActions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Critical Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.summary.criticalActions.map((action, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-red-500 text-xl mr-3">⚠️</span>
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">
                        Action {index + 1}
                      </h3>
                      <p className="text-red-700">{action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            System Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-800">Multi-Agent Audit</div>
              <div className="text-sm text-green-600">✅ Operational</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-800">Quality Assurance</div>
              <div className="text-sm text-green-600">✅ Operational</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-800">Cross-Linking</div>
              <div className="text-sm text-green-600">✅ Operational</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-800">Task Breakdown</div>
              <div className="text-sm text-green-600">✅ Operational</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 