'use client';

import React, { useState, useEffect } from 'react';
import { automatedOptimizer, OptimizationSummary, OptimizationResult } from '../../utils/automatedOptimizer';

export default function OptimizeWebsitePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState<OptimizationSummary | null>(null);
  const [currentSystem, setCurrentSystem] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const runOptimization = async () => {
    setIsRunning(true);
    setSummary(null);
    setProgress(0);

    try {
      // Run the automated optimizer
      const result = await automatedOptimizer.runAllOptimizations();
      setSummary(result);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsRunning(false);
      setProgress(100);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'skipped': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'skipped': return '⏭️';
      default: return '⏳';
    }
  };

  const formatDuration = (duration: number) => {
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
            🚀 Website Optimization Engine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete automated optimization system that implements all available improvements 
            and runs comprehensive website enhancements.
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Optimization Control
              </h2>
              <p className="text-gray-600">
                Run all optimization systems and implement comprehensive improvements
              </p>
            </div>
            <button
              onClick={runOptimization}
              disabled={isRunning}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? '🔄 Running Optimizations...' : '🚀 Start Website Optimization'}
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        {isRunning && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Optimization Progress
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-700">
                Running Website Optimization
              </p>
              <p className="text-sm text-gray-500">
                Please wait while all systems are being optimized...
              </p>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {summary && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Optimization Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {summary.totalSystems}
                </div>
                <div className="text-sm text-blue-600">Total Systems</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {summary.successfulSystems}
                </div>
                <div className="text-sm text-green-600">Successful</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {summary.failedSystems}
                </div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {summary.totalFixes}
                </div>
                <div className="text-sm text-purple-600">Total Fixes</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {formatDuration(summary.totalDuration)}
                </div>
                <div className="text-sm text-yellow-600">Duration</div>
              </div>
            </div>

            {/* Success Rate */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Success Rate</span>
                <span>{Math.round((summary.successfulSystems / summary.totalSystems) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(summary.successfulSystems / summary.totalSystems) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Results */}
        {summary && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Detailed Results
            </h2>
            
            <div className="space-y-4">
              {summary.results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getStatusIcon(result.status)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {result.system}
                        </h3>
                        <p className={`text-sm px-2 py-1 rounded-full inline-block ${getStatusColor(result.status)}`}>
                          {result.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Duration: {formatDuration(result.duration)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Fixes: {result.fixes}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  {result.details.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Improvements Applied:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {result.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Errors */}
                  {result.errors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-2">Errors:</h4>
                      <ul className="text-sm text-red-600 space-y-1">
                        {result.errors.map((error, errorIndex) => (
                          <li key={errorIndex} className="flex items-start">
                            <span className="text-red-500 mr-2">⚠</span>
                            {error}
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

        {/* Completion Message */}
        {summary && summary.successfulSystems === summary.totalSystems && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                🎉 Website Optimization Completed Successfully!
              </h2>
              <p className="text-green-700 mb-4">
                All optimization systems have been executed successfully. Your website is now 
                fully optimized with {summary.totalFixes} improvements applied across {summary.totalSystems} systems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">Performance</div>
                  <div className="text-green-600">Core Web Vitals optimized</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">SEO</div>
                  <div className="text-green-600">Search engine optimized</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">Quality</div>
                  <div className="text-green-600">All systems validated</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isRunning && !summary && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What This Optimization Will Do
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Optimization Systems:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🔧</span>
                    Comprehensive Website Fixer (7 phases)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">⚡</span>
                    Performance Optimizer (Core Web Vitals)
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">🔍</span>
                    SEO Optimizer (Meta tags, structured data)
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">🔬</span>
                    Multi-Agent Audit (Comprehensive analysis)
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✅</span>
                    Quality Assurance (Testing & validation)
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">🔗</span>
                    Cross-Linking System (Internal linking)
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">📋</span>
                    Task Breakdown (Project management)
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Expected Results:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Improved Core Web Vitals scores
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Enhanced SEO and search rankings
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Better user experience and accessibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Optimized content and internal linking
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Improved error handling and stability
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    Enhanced mobile responsiveness
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 