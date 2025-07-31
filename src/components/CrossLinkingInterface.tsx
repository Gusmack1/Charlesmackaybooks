'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  CrossLinkingSystem,
  defaultCrossLinkingConfig,
  ContentNode,
  LinkSuggestion,
  createContentNodeFromBook,
  createContentNodeFromBlogPost
} from '@/utils/crossLinkingSystem';
import { books } from '@/data/books';

interface CrossLinkingInterfaceProps {
  className?: string;
  showAnalytics?: boolean;
  showContentNodes?: boolean;
  showRelationships?: boolean;
}

export default function CrossLinkingInterface({
  className = '',
  showAnalytics = true,
  showContentNodes = true,
  showRelationships = true
}: CrossLinkingInterfaceProps) {
  const [crossLinkingSystem] = useState(() => new CrossLinkingSystem(defaultCrossLinkingConfig));
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'relationships' | 'analytics' | 'suggestions'>('overview');
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [userPreferences, setUserPreferences] = useState<string[]>([]);

  // Initialize system with books data
  useEffect(() => {
    const contentNodes: ContentNode[] = books.map(book => 
      createContentNodeFromBook(book, `/books/${book.id}`)
    );
    
    // Add some sample blog posts (in a real implementation, these would come from actual blog data)
    const sampleBlogPosts = [
      {
        id: 'beardmore-aviation-scottish-industrial-giant',
        title: 'Beardmore Aviation: Scottish Industrial Giant',
        description: 'How a Scottish shipbuilder transformed into Britain\'s most ambitious aviation manufacturer.',
        content: 'The story of Beardmore Aviation represents one of the most fascinating chapters in British industrial history...',
        tags: ['Beardmore', 'Scottish Aviation', 'Industrial History'],
        category: 'Scottish Aviation History',
        publishDate: new Date('2023-01-15'),
        author: 'Charles E. MacKay',
        url: '/blog/beardmore-aviation-scottish-industrial-giant'
      },
      {
        id: 'clydeside-aviation-revolution',
        title: 'Clydeside Aviation Revolution',
        description: 'How Glasgow\'s mighty shipyards transformed into aviation powerhouses during two world wars.',
        content: 'The River Clyde, long associated with shipbuilding, became a crucible of aviation innovation...',
        tags: ['Clydeside', 'Scottish Aviation', 'WWI', 'WWII'],
        category: 'Scottish Aviation History',
        publishDate: new Date('2023-02-20'),
        author: 'Charles E. MacKay',
        url: '/blog/clydeside-aviation-revolution'
      }
    ];

    const blogNodes = sampleBlogPosts.map(post => createContentNodeFromBlogPost(post));
    const allNodes = [...contentNodes, ...blogNodes];
    
    crossLinkingSystem.initialize(allNodes);
  }, [crossLinkingSystem]);

  // Get system statistics
  const systemStats = useMemo(() => crossLinkingSystem.getSystemStats(), [crossLinkingSystem]);
  const analytics = useMemo(() => crossLinkingSystem.getAnalytics(), [crossLinkingSystem]);

  // Generate suggestions for selected content
  const generateSuggestions = async () => {
    if (!selectedContentId) return;
    
    setLoading(true);
    try {
      const newSuggestions = crossLinkingSystem.getLinkSuggestions(selectedContentId, {
        maxSuggestions: 10,
        userLevel,
        userPreferences: userPreferences.length > 0 ? userPreferences : undefined
      });
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Track link interaction
  const handleLinkClick = (sourceId: string, targetId: string) => {
    crossLinkingSystem.trackInteraction('click', sourceId, targetId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalContentNodes}</div>
            <div className="text-sm text-gray-600">Content Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{systemStats.totalRelationships}</div>
            <div className="text-sm text-gray-600">Relationships</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{systemStats.averageRelationshipsPerNode.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Relationships/Node</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Cache Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-semibold text-blue-600">{analytics.cacheStats.size}</div>
            <div className="text-sm text-gray-600">Cached Items</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">{(analytics.cacheStats.hitRate * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Cache Hit Rate</div>
          </div>
        </div>
      </div>

      {analytics.topPerformingLinks.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Links</h3>
          <div className="space-y-2">
            {analytics.topPerformingLinks.slice(0, 5).map((link, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">{link.sourceId} → {link.targetId}</span>
                <span className="text-sm font-semibold">{(link.ctr * 100).toFixed(1)}% CTR</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderContentNodes = () => {
    const allNodes = crossLinkingSystem['relationshipMapper'].getAllContentNodes();
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Content Nodes</h3>
          <div className="text-sm text-gray-600">{allNodes.length} total nodes</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allNodes.map((node) => (
            <div
              key={node.id}
              className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-colors ${
                selectedContentId === node.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedContentId(node.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  node.type === 'book' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {node.type}
                </span>
                <span className="text-xs text-gray-500">
                  {crossLinkingSystem['relationshipMapper'].getRelationships(node.id).length} links
                </span>
              </div>
              
              <h4 className="font-semibold text-sm mb-2 line-clamp-2">{node.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-3">{node.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {node.keywords.slice(0, 3).map((keyword, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRelationships = () => {
    if (!selectedContentId) {
      return (
        <div className="text-center py-8 text-gray-500">
          Select a content node to view its relationships
        </div>
      );
    }

    const relationships = crossLinkingSystem['relationshipMapper'].getRelationships(selectedContentId);
    const contentNode = crossLinkingSystem['relationshipMapper'].getContentNode(selectedContentId);

    return (
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Selected Content: {contentNode?.title}</h4>
          <p className="text-sm text-gray-600">{contentNode?.description}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Relationships ({relationships.length})</h3>
          
          {relationships.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No relationships found for this content
            </div>
          ) : (
            <div className="space-y-3">
              {relationships
                .sort((a, b) => b.strength - a.strength)
                .map((relationship, index) => {
                  const targetNode = crossLinkingSystem['relationshipMapper'].getContentNode(relationship.targetId);
                  if (!targetNode) return null;

                  return (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            targetNode.type === 'book' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {targetNode.type}
                          </span>
                          <span className="text-sm font-semibold">{targetNode.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {(relationship.strength * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">strength</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{targetNode.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {relationship.keywords.slice(0, 3).map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <div>Type: {relationship.relationshipType}</div>
                        <div>Clicks: {relationship.metadata.clickCount}</div>
                        {relationship.metadata.lastAccessed && (
                          <div>Last accessed: {relationship.metadata.lastAccessed.toLocaleDateString()}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Link Performance Analytics</h3>
        
        {analytics.topPerformingLinks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No link performance data available yet
          </div>
        ) : (
          <div className="space-y-3">
            {analytics.topPerformingLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{link.sourceId} → {link.targetId}</div>
                  <div className="text-sm text-gray-600">{link.clicks} clicks</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {(link.ctr * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">CTR</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Max Links Per Page</div>
            <div className="text-gray-600">{defaultCrossLinkingConfig.maxLinksPerPage}</div>
          </div>
          <div>
            <div className="font-medium">Min Relevance Score</div>
            <div className="text-gray-600">{(defaultCrossLinkingConfig.minRelevanceScore * 100).toFixed(0)}%</div>
          </div>
          <div>
            <div className="font-medium">Dynamic Linking</div>
            <div className="text-gray-600">{defaultCrossLinkingConfig.enableDynamicLinking ? 'Enabled' : 'Disabled'}</div>
          </div>
          <div>
            <div className="font-medium">User Behavior Tracking</div>
            <div className="text-gray-600">{defaultCrossLinkingConfig.enableUserBehaviorTracking ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Link Suggestions Generator</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Content</label>
            <select
              value={selectedContentId}
              onChange={(e) => setSelectedContentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose content...</option>
              {crossLinkingSystem['relationshipMapper'].getAllContentNodes().map((node) => (
                <option key={node.id} value={node.id}>
                  {node.type === 'book' ? '📚' : '📝'} {node.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">User Level</label>
              <select
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">User Preferences (comma-separated)</label>
              <input
                type="text"
                value={userPreferences.join(', ')}
                onChange={(e) => setUserPreferences(e.target.value.split(',').map(p => p.trim()).filter(Boolean))}
                placeholder="aviation, scottish, wwi"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            onClick={generateSuggestions}
            disabled={!selectedContentId || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Suggestions'}
          </button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Generated Suggestions ({suggestions.length})</h3>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      suggestion.targetType === 'book' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {suggestion.targetType}
                    </span>
                    <span className="font-semibold">{suggestion.targetTitle}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {(suggestion.relevanceScore * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">relevance</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{suggestion.context}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Suggested Anchor Text:</div>
                    <div className="text-blue-600">"{suggestion.suggestedAnchorText}"</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                      suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {suggestion.priority}
                    </span>
                    
                    <button
                      onClick={() => handleLinkClick(selectedContentId, suggestion.targetId)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Track Click
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cross-Linking System</h1>
          <p className="text-gray-600">
            Intelligent content relationship mapping and dynamic linking engine for Charles Mackay Books
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'content', label: 'Content Nodes', icon: '📚' },
              { id: 'relationships', label: 'Relationships', icon: '🔗' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'suggestions', label: 'Suggestions', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'content' && renderContentNodes()}
          {activeTab === 'relationships' && renderRelationships()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'suggestions' && renderSuggestions()}
        </div>
      </div>
    </div>
  );
} 