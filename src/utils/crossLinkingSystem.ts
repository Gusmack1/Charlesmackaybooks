// Cross-Linking Architecture System for Charles Mackay Books
// Intelligent content relationship mapping and dynamic linking engine

import { Book } from '@/types/book';

// ===== CONTENT RELATIONSHIP TYPES =====
export interface ContentRelationship {
  sourceId: string;
  targetId: string;
  relationshipType: 'book-to-book' | 'book-to-blog' | 'blog-to-book' | 'blog-to-blog';
  strength: number; // 0-1, where 1 is strongest
  keywords: string[];
  categories: string[];
  era?: string[];
  aircraftTypes?: string[];
  geographicFocus?: string[];
  sourceType?: string[];
  researchThemes?: string[];
  academicLevel?: string[];
  difficulty?: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    lastAccessed?: Date;
    clickCount: number;
    dwellTime?: number;
  };
}

export interface ContentNode {
  id: string;
  type: 'book' | 'blog';
  title: string;
  description: string;
  keywords: string[];
  categories: string[];
  era?: string[];
  aircraftTypes?: string[];
  geographicFocus?: string[];
  sourceType?: string[];
  researchThemes?: string[];
  academicLevel?: string[];
  difficulty?: string;
  tags: string[];
  content?: string;
  excerpt?: string;
  publishDate?: Date;
  author?: string;
  url: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    viewCount: number;
    averageDwellTime: number;
    bounceRate: number;
    socialShares: number;
  };
}

export interface LinkSuggestion {
  targetId: string;
  targetType: 'book' | 'blog';
  targetTitle: string;
  targetUrl: string;
  relevanceScore: number;
  relationshipType: string;
  suggestedAnchorText: string;
  context: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CrossLinkingConfig {
  maxLinksPerPage: number;
  minRelevanceScore: number;
  enableDynamicLinking: boolean;
  enableUserBehaviorTracking: boolean;
  enableAITagging: boolean;
  linkUpdateFrequency: 'daily' | 'weekly' | 'monthly';
  excludedPages: string[];
  priorityKeywords: string[];
  relationshipWeights: {
    keywordMatch: number;
    categoryMatch: number;
    eraMatch: number;
    aircraftTypeMatch: number;
    geographicMatch: number;
    sourceTypeMatch: number;
    researchThemeMatch: number;
    academicLevelMatch: number;
    difficultyMatch: number;
    userBehavior: number;
    contentSimilarity: number;
  };
}

// ===== CONTENT RELATIONSHIP MAPPING =====
export class ContentRelationshipMapper {
  private relationships: Map<string, ContentRelationship[]> = new Map();
  private contentNodes: Map<string, ContentNode> = new Map();
  private config: CrossLinkingConfig;

  constructor(config: CrossLinkingConfig) {
    this.config = config;
  }

  // Add content node to the mapping system
  addContentNode(node: ContentNode): void {
    this.contentNodes.set(node.id, node);
    this.updateRelationships(node);
  }

  // Update relationships when content is added or modified
  private updateRelationships(node: ContentNode): void {
    const existingRelationships = this.relationships.get(node.id) || [];
    
    // Find new relationships with existing content
    for (const [existingId, existingNode] of this.contentNodes) {
      if (existingId === node.id) continue;
      
      const relationship = this.calculateRelationship(node, existingNode);
      if (relationship.strength >= this.config.minRelevanceScore) {
        this.addRelationship(relationship);
      }
    }
  }

  // Calculate relationship strength between two content pieces
  private calculateRelationship(source: ContentNode, target: ContentNode): ContentRelationship {
    let totalScore = 0;
    const matchedKeywords: string[] = [];
    const matchedCategories: string[] = [];

    // Keyword matching
    const keywordScore = this.calculateKeywordMatch(source.keywords, target.keywords);
    totalScore += keywordScore.score * this.config.relationshipWeights.keywordMatch;
    matchedKeywords.push(...keywordScore.matched);

    // Category matching
    const categoryScore = this.calculateCategoryMatch(source.categories, target.categories);
    totalScore += categoryScore.score * this.config.relationshipWeights.categoryMatch;
    matchedCategories.push(...categoryScore.matched);

    // Era matching
    if (source.era && target.era) {
      const eraScore = this.calculateArrayMatch(source.era, target.era);
      totalScore += eraScore * this.config.relationshipWeights.eraMatch;
    }

    // Aircraft type matching
    if (source.aircraftTypes && target.aircraftTypes) {
      const aircraftScore = this.calculateArrayMatch(source.aircraftTypes, target.aircraftTypes);
      totalScore += aircraftScore * this.config.relationshipWeights.aircraftTypeMatch;
    }

    // Geographic focus matching
    if (source.geographicFocus && target.geographicFocus) {
      const geoScore = this.calculateArrayMatch(source.geographicFocus, target.geographicFocus);
      totalScore += geoScore * this.config.relationshipWeights.geographicMatch;
    }

    // Source type matching
    if (source.sourceType && target.sourceType) {
      const sourceScore = this.calculateArrayMatch(source.sourceType, target.sourceType);
      totalScore += sourceScore * this.config.relationshipWeights.sourceTypeMatch;
    }

    // Research themes matching
    if (source.researchThemes && target.researchThemes) {
      const themeScore = this.calculateArrayMatch(source.researchThemes, target.researchThemes);
      totalScore += themeScore * this.config.relationshipWeights.researchThemeMatch;
    }

    // Academic level matching
    if (source.academicLevel && target.academicLevel) {
      const academicScore = this.calculateArrayMatch(source.academicLevel, target.academicLevel);
      totalScore += academicScore * this.config.relationshipWeights.academicLevelMatch;
    }

    // Difficulty matching
    if (source.difficulty && target.difficulty) {
      const difficultyScore = source.difficulty === target.difficulty ? 1 : 0;
      totalScore += difficultyScore * this.config.relationshipWeights.difficultyMatch;
    }

    // Content similarity (if content is available)
    if (source.content && target.content) {
      const similarityScore = this.calculateContentSimilarity(source.content, target.content);
      totalScore += similarityScore * this.config.relationshipWeights.contentSimilarity;
    }

    // User behavior weighting
    const behaviorScore = this.calculateUserBehaviorScore(source, target);
    totalScore += behaviorScore * this.config.relationshipWeights.userBehavior;

    // Normalize score to 0-1 range
    const normalizedScore = Math.min(totalScore, 1);

    return {
      sourceId: source.id,
      targetId: target.id,
      relationshipType: this.determineRelationshipType(source.type, target.type),
      strength: normalizedScore,
      keywords: matchedKeywords,
      categories: matchedCategories,
      era: source.era?.filter(e => target.era?.includes(e)),
      aircraftTypes: source.aircraftTypes?.filter(a => target.aircraftTypes?.includes(a)),
      geographicFocus: source.geographicFocus?.filter(g => target.geographicFocus?.includes(g)),
      sourceType: source.sourceType?.filter(s => target.sourceType?.includes(s)),
      researchThemes: source.researchThemes?.filter(r => target.researchThemes?.includes(r)),
      academicLevel: source.academicLevel?.filter(a => target.academicLevel?.includes(a)),
      difficulty: source.difficulty === target.difficulty ? source.difficulty : undefined,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        clickCount: 0,
      }
    };
  }

  // Calculate keyword match score
  private calculateKeywordMatch(sourceKeywords: string[], targetKeywords: string[]): { score: number; matched: string[] } {
    const matched: string[] = [];
    let matchCount = 0;

    for (const sourceKeyword of sourceKeywords) {
      for (const targetKeyword of targetKeywords) {
        if (this.isKeywordMatch(sourceKeyword, targetKeyword)) {
          matched.push(sourceKeyword);
          matchCount++;
          break;
        }
      }
    }

    const score = matchCount / Math.max(sourceKeywords.length, targetKeywords.length);
    return { score, matched };
  }

  // Check if two keywords match (with fuzzy matching)
  private isKeywordMatch(keyword1: string, keyword2: string): boolean {
    const normalized1 = keyword1.toLowerCase().trim();
    const normalized2 = keyword2.toLowerCase().trim();
    
    // Exact match
    if (normalized1 === normalized2) return true;
    
    // Contains match
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;
    
    // Levenshtein distance for fuzzy matching
    const distance = this.levenshteinDistance(normalized1, normalized2);
    const maxLength = Math.max(normalized1.length, normalized2.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity > 0.8; // 80% similarity threshold
  }

  // Calculate Levenshtein distance for fuzzy matching
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  // Calculate category match score
  private calculateCategoryMatch(sourceCategories: string[], targetCategories: string[]): { score: number; matched: string[] } {
    const matched: string[] = [];
    let matchCount = 0;

    for (const sourceCategory of sourceCategories) {
      if (targetCategories.includes(sourceCategory)) {
        matched.push(sourceCategory);
        matchCount++;
      }
    }

    const score = matchCount / Math.max(sourceCategories.length, targetCategories.length);
    return { score, matched };
  }

  // Calculate array match score
  private calculateArrayMatch(sourceArray: string[], targetArray: string[]): number {
    const intersection = sourceArray.filter(item => targetArray.includes(item));
    return intersection.length / Math.max(sourceArray.length, targetArray.length);
  }

  // Calculate content similarity using basic text analysis
  private calculateContentSimilarity(content1: string, content2: string): number {
    // Simple word frequency analysis
    const words1 = this.extractWords(content1);
    const words2 = this.extractWords(content2);
    
    const freq1 = this.calculateWordFrequency(words1);
    const freq2 = this.calculateWordFrequency(words2);
    
    return this.calculateCosineSimilarity(freq1, freq2);
  }

  // Extract words from content
  private extractWords(content: string): string[] {
    return content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  // Calculate word frequency
  private calculateWordFrequency(words: string[]): Map<string, number> {
    const freq = new Map<string, number>();
    for (const word of words) {
      freq.set(word, (freq.get(word) || 0) + 1);
    }
    return freq;
  }

  // Calculate cosine similarity between two word frequency maps
  private calculateCosineSimilarity(freq1: Map<string, number>, freq2: Map<string, number>): number {
    const allWords = new Set([...freq1.keys(), ...freq2.keys()]);
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (const word of allWords) {
      const f1 = freq1.get(word) || 0;
      const f2 = freq2.get(word) || 0;
      
      dotProduct += f1 * f2;
      norm1 += f1 * f1;
      norm2 += f2 * f2;
    }
    
    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  // Calculate user behavior score
  private calculateUserBehaviorScore(source: ContentNode, target: ContentNode): number {
    // This would integrate with analytics data
    // For now, return a base score based on content quality indicators
    const sourceQuality = (source.metadata.viewCount * source.metadata.averageDwellTime) / 1000;
    const targetQuality = (target.metadata.viewCount * target.metadata.averageDwellTime) / 1000;
    
    return Math.min((sourceQuality + targetQuality) / 2, 1);
  }

  // Determine relationship type
  private determineRelationshipType(sourceType: string, targetType: string): ContentRelationship['relationshipType'] {
    if (sourceType === 'book' && targetType === 'book') return 'book-to-book';
    if (sourceType === 'book' && targetType === 'blog') return 'book-to-blog';
    if (sourceType === 'blog' && targetType === 'book') return 'blog-to-book';
    return 'blog-to-blog';
  }

  // Add relationship to the system
  private addRelationship(relationship: ContentRelationship): void {
    const sourceRelationships = this.relationships.get(relationship.sourceId) || [];
    const targetRelationships = this.relationships.get(relationship.targetId) || [];
    
    // Add to source relationships
    const existingSourceIndex = sourceRelationships.findIndex(r => r.targetId === relationship.targetId);
    if (existingSourceIndex >= 0) {
      sourceRelationships[existingSourceIndex] = relationship;
    } else {
      sourceRelationships.push(relationship);
    }
    
    // Add reverse relationship
    const reverseRelationship: ContentRelationship = {
      ...relationship,
      sourceId: relationship.targetId,
      targetId: relationship.sourceId,
      relationshipType: this.getReverseRelationshipType(relationship.relationshipType),
    };
    
    const existingTargetIndex = targetRelationships.findIndex(r => r.targetId === relationship.sourceId);
    if (existingTargetIndex >= 0) {
      targetRelationships[existingTargetIndex] = reverseRelationship;
    } else {
      targetRelationships.push(reverseRelationship);
    }
    
    this.relationships.set(relationship.sourceId, sourceRelationships);
    this.relationships.set(relationship.targetId, targetRelationships);
  }

  // Get reverse relationship type
  private getReverseRelationshipType(type: ContentRelationship['relationshipType']): ContentRelationship['relationshipType'] {
    switch (type) {
      case 'book-to-book': return 'book-to-book';
      case 'book-to-blog': return 'blog-to-book';
      case 'blog-to-book': return 'book-to-blog';
      case 'blog-to-blog': return 'blog-to-blog';
    }
  }

  // Get link suggestions for a content piece
  getLinkSuggestions(contentId: string, maxSuggestions: number = 10): LinkSuggestion[] {
    const relationships = this.relationships.get(contentId) || [];
    const contentNode = this.contentNodes.get(contentId);
    
    if (!contentNode) return [];

    const suggestions: LinkSuggestion[] = relationships
      .filter(rel => rel.strength >= this.config.minRelevanceScore)
      .map(rel => {
        const targetNode = this.contentNodes.get(rel.targetId);
        if (!targetNode) return null;

        return {
          targetId: rel.targetId,
          targetType: targetNode.type,
          targetTitle: targetNode.title,
          targetUrl: targetNode.url,
          relevanceScore: rel.strength,
          relationshipType: rel.relationshipType,
          suggestedAnchorText: this.generateAnchorText(rel, targetNode),
          context: this.generateContext(rel, contentNode, targetNode),
          priority: this.determinePriority(rel.strength)
        };
      })
      .filter(Boolean) as LinkSuggestion[];

    // Sort by relevance score and limit results
    return suggestions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxSuggestions);
  }

  // Generate anchor text for links
  private generateAnchorText(relationship: ContentRelationship, targetNode: ContentNode): string {
    // Use the most relevant keyword or category
    if (relationship.keywords.length > 0) {
      return relationship.keywords[0];
    }
    if (relationship.categories.length > 0) {
      return relationship.categories[0];
    }
    return targetNode.title;
  }

  // Generate context for link suggestions
  private generateContext(relationship: ContentRelationship, sourceNode: ContentNode, targetNode: ContentNode): string {
    const contextParts: string[] = [];
    
    if (relationship.keywords.length > 0) {
      contextParts.push(`Related to: ${relationship.keywords.join(', ')}`);
    }
    if (relationship.categories.length > 0) {
      contextParts.push(`Category: ${relationship.categories.join(', ')}`);
    }
    if (relationship.era && relationship.era.length > 0) {
      contextParts.push(`Era: ${relationship.era.join(', ')}`);
    }
    
    return contextParts.join(' | ');
  }

  // Determine priority based on relevance score
  private determinePriority(score: number): 'high' | 'medium' | 'low' {
    if (score >= 0.8) return 'high';
    if (score >= 0.5) return 'medium';
    return 'low';
  }

  // Track user interaction with links
  trackLinkClick(sourceId: string, targetId: string): void {
    const relationships = this.relationships.get(sourceId) || [];
    const relationship = relationships.find(r => r.targetId === targetId);
    
    if (relationship) {
      relationship.metadata.clickCount++;
      relationship.metadata.lastAccessed = new Date();
      relationship.metadata.updatedAt = new Date();
    }
  }

  // Get all relationships for a content piece
  getRelationships(contentId: string): ContentRelationship[] {
    return this.relationships.get(contentId) || [];
  }

  // Get content node by ID
  getContentNode(contentId: string): ContentNode | undefined {
    return this.contentNodes.get(contentId);
  }

  // Get all content nodes
  getAllContentNodes(): ContentNode[] {
    return Array.from(this.contentNodes.values());
  }

  // Update content node
  updateContentNode(contentId: string, updates: Partial<ContentNode>): void {
    const existingNode = this.contentNodes.get(contentId);
    if (existingNode) {
      const updatedNode = { ...existingNode, ...updates, metadata: { ...existingNode.metadata, updatedAt: new Date() } };
      this.contentNodes.set(contentId, updatedNode);
      this.updateRelationships(updatedNode);
    }
  }

  // Remove content node and its relationships
  removeContentNode(contentId: string): void {
    this.contentNodes.delete(contentId);
    this.relationships.delete(contentId);
    
    // Remove relationships pointing to this content
    for (const [id, relationships] of this.relationships) {
      const filteredRelationships = relationships.filter(r => r.targetId !== contentId);
      this.relationships.set(id, filteredRelationships);
    }
  }
}

// ===== DYNAMIC LINKING ENGINE =====
export class DynamicLinkingEngine {
  private relationshipMapper: ContentRelationshipMapper;
  private config: CrossLinkingConfig;
  private linkCache: Map<string, LinkSuggestion[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();

  constructor(relationshipMapper: ContentRelationshipMapper, config: CrossLinkingConfig) {
    this.relationshipMapper = relationshipMapper;
    this.config = config;
  }

  // Generate dynamic links for a page
  generateDynamicLinks(contentId: string, context?: string): LinkSuggestion[] {
    // Check cache first
    const cacheKey = `${contentId}-${context || 'default'}`;
    const cached = this.linkCache.get(cacheKey);
    const expiry = this.cacheExpiry.get(cacheKey);
    
    if (cached && expiry && Date.now() < expiry) {
      return cached;
    }

    // Generate new suggestions
    const suggestions = this.relationshipMapper.getLinkSuggestions(contentId, this.config.maxLinksPerPage);
    
    // Apply context filtering if provided
    const filteredSuggestions = context 
      ? this.filterByContext(suggestions, context)
      : suggestions;

    // Cache results for 1 hour
    this.linkCache.set(cacheKey, filteredSuggestions);
    this.cacheExpiry.set(cacheKey, Date.now() + (60 * 60 * 1000));

    return filteredSuggestions;
  }

  // Filter suggestions by context
  private filterByContext(suggestions: LinkSuggestion[], context: string): LinkSuggestion[] {
    const contextKeywords = this.extractKeywords(context);
    
    return suggestions.filter(suggestion => {
      const suggestionKeywords = this.extractKeywords(suggestion.context);
      const matchScore = this.calculateKeywordMatch(contextKeywords, suggestionKeywords);
      return matchScore > 0.3; // 30% keyword match threshold
    });
  }

  // Extract keywords from text
  private extractKeywords(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 10); // Limit to top 10 keywords
  }

  // Calculate keyword match score
  private calculateKeywordMatch(keywords1: string[], keywords2: string[]): number {
    const intersection = keywords1.filter(k1 => keywords2.includes(k1));
    return intersection.length / Math.max(keywords1.length, keywords2.length);
  }

  // Clear cache
  clearCache(): void {
    this.linkCache.clear();
    this.cacheExpiry.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.linkCache.size,
      hitRate: 0.85 // Placeholder - would be calculated from actual usage
    };
  }
}

// ===== LINK MANAGEMENT SYSTEM =====
export class LinkManagementSystem {
  private relationshipMapper: ContentRelationshipMapper;
  private linkingEngine: DynamicLinkingEngine;
  private config: CrossLinkingConfig;
  private linkAnalytics: Map<string, { clicks: number; impressions: number; ctr: number }> = new Map();

  constructor(relationshipMapper: ContentRelationshipMapper, linkingEngine: DynamicLinkingEngine, config: CrossLinkingConfig) {
    this.relationshipMapper = relationshipMapper;
    this.linkingEngine = linkingEngine;
    this.config = config;
  }

  // Create contextual links for a page
  createContextualLinks(contentId: string, content: string): Array<{ text: string; url: string; context: string }> {
    const suggestions = this.linkingEngine.generateDynamicLinks(contentId);
    const contextualLinks: Array<{ text: string; url: string; context: string }> = [];

    for (const suggestion of suggestions) {
      const linkContext = this.findLinkContext(content, suggestion);
      if (linkContext) {
        contextualLinks.push({
          text: suggestion.suggestedAnchorText,
          url: suggestion.targetUrl,
          context: linkContext
        });
      }
    }

    return contextualLinks;
  }

  // Find appropriate context for a link in content
  private findLinkContext(content: string, suggestion: LinkSuggestion): string | null {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      const keywords = suggestion.suggestedAnchorText.toLowerCase().split(' ');
      
      // Check if sentence contains relevant keywords
      const keywordMatches = keywords.filter(keyword => sentenceLower.includes(keyword));
      if (keywordMatches.length >= Math.ceil(keywords.length * 0.5)) {
        return sentence.trim();
      }
    }

    return null;
  }

  // Track link impression
  trackLinkImpression(sourceId: string, targetId: string): void {
    const key = `${sourceId}-${targetId}`;
    const analytics = this.linkAnalytics.get(key) || { clicks: 0, impressions: 0, ctr: 0 };
    analytics.impressions++;
    analytics.ctr = analytics.clicks / analytics.impressions;
    this.linkAnalytics.set(key, analytics);
  }

  // Track link click
  trackLinkClick(sourceId: string, targetId: string): void {
    this.relationshipMapper.trackLinkClick(sourceId, targetId);
    
    const key = `${sourceId}-${targetId}`;
    const analytics = this.linkAnalytics.get(key) || { clicks: 0, impressions: 0, ctr: 0 };
    analytics.clicks++;
    analytics.ctr = analytics.clicks / analytics.impressions;
    this.linkAnalytics.set(key, analytics);
  }

  // Get link analytics
  getLinkAnalytics(sourceId: string, targetId: string): { clicks: number; impressions: number; ctr: number } | null {
    const key = `${sourceId}-${targetId}`;
    return this.linkAnalytics.get(key) || null;
  }

  // Get top performing links
  getTopPerformingLinks(limit: number = 10): Array<{ sourceId: string; targetId: string; ctr: number; clicks: number }> {
    const links = Array.from(this.linkAnalytics.entries())
      .map(([key, analytics]) => {
        const [sourceId, targetId] = key.split('-');
        return { sourceId, targetId, ctr: analytics.ctr, clicks: analytics.clicks };
      })
      .filter(link => link.clicks > 0)
      .sort((a, b) => b.ctr - a.ctr)
      .slice(0, limit);

    return links;
  }

  // Optimize link placement based on analytics
  optimizeLinkPlacement(contentId: string): LinkSuggestion[] {
    const suggestions = this.linkingEngine.generateDynamicLinks(contentId);
    
    // Boost suggestions based on historical performance
    return suggestions.map(suggestion => {
      const analytics = this.getLinkAnalytics(contentId, suggestion.targetId);
      if (analytics && analytics.ctr > 0.05) { // 5% CTR threshold
        return {
          ...suggestion,
          relevanceScore: suggestion.relevanceScore * 1.2, // 20% boost
          priority: 'high' as const
        };
      }
      return suggestion;
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

// ===== SEO INTEGRATION =====
export class SEOIntegration {
  private relationshipMapper: ContentRelationshipMapper;
  private config: CrossLinkingConfig;

  constructor(relationshipMapper: ContentRelationshipMapper, config: CrossLinkingConfig) {
    this.relationshipMapper = relationshipMapper;
    this.config = config;
  }

  // Generate internal linking schema markup
  generateInternalLinkingSchema(contentId: string): object {
    const relationships = this.relationshipMapper.getRelationships(contentId);
    const contentNode = this.relationshipMapper.getContentNode(contentId);
    
    if (!contentNode) return {};

    const relatedItems = relationships
      .filter(rel => rel.strength >= 0.7) // High-strength relationships only
      .map(rel => {
        const targetNode = this.relationshipMapper.getContentNode(rel.targetId);
        if (!targetNode) return null;

        return {
          "@type": targetNode.type === 'book' ? 'Book' : 'Article',
          "@id": targetNode.url,
          "name": targetNode.title,
          "description": targetNode.description,
          "url": targetNode.url,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://charlesmackaybooks.com"
          }
        };
      })
      .filter(Boolean);

    return {
      "@context": "https://schema.org",
      "@type": contentNode.type === 'book' ? 'Book' : 'Article',
      "@id": contentNode.url,
      "name": contentNode.title,
      "description": contentNode.description,
      "url": contentNode.url,
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://charlesmackaybooks.com"
      },
      "relatedLink": relatedItems
    };
  }

  // Generate breadcrumb schema with internal links
  generateBreadcrumbSchema(contentId: string): object {
    const contentNode = this.relationshipMapper.getContentNode(contentId);
    if (!contentNode) return {};

    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://charlesmackaybooks.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": contentNode.type === 'book' ? 'Books' : 'Blog',
        "item": `https://charlesmackaybooks.com/${contentNode.type === 'book' ? 'books' : 'blog'}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": contentNode.title,
        "item": contentNode.url
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  }

  // Generate sitemap with internal linking data
  generateSitemapWithLinks(): object {
    const contentNodes = this.relationshipMapper.getAllContentNodes();
    
    const sitemap = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": contentNodes.map((node, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": node.type === 'book' ? 'Book' : 'Article',
          "@id": node.url,
          "name": node.title,
          "description": node.description,
          "url": node.url,
          "datePublished": node.publishDate?.toISOString(),
          "author": node.author ? { "@type": "Person", "name": node.author } : undefined
        }
      }))
    };

    return sitemap;
  }
}

// ===== USER EXPERIENCE ENHANCEMENT =====
export class UXEnhancement {
  private relationshipMapper: ContentRelationshipMapper;
  private linkingEngine: DynamicLinkingEngine;
  private config: CrossLinkingConfig;

  constructor(relationshipMapper: ContentRelationshipMapper, linkingEngine: DynamicLinkingEngine, config: CrossLinkingConfig) {
    this.relationshipMapper = relationshipMapper;
    this.linkingEngine = linkingEngine;
    this.config = config;
  }

  // Generate reading path suggestions
  generateReadingPath(contentId: string, userLevel: 'beginner' | 'intermediate' | 'advanced'): LinkSuggestion[] {
    const relationships = this.relationshipMapper.getRelationships(contentId);
    const contentNode = this.relationshipMapper.getContentNode(contentId);
    
    if (!contentNode) return [];

    // Filter relationships based on user level
    const levelAppropriate = relationships.filter(rel => {
      const targetNode = this.relationshipMapper.getContentNode(rel.targetId);
      if (!targetNode) return false;

      switch (userLevel) {
        case 'beginner':
          return targetNode.difficulty === 'Introductory' || targetNode.difficulty === 'Intermediate';
        case 'intermediate':
          return targetNode.difficulty === 'Intermediate' || targetNode.difficulty === 'Advanced';
        case 'advanced':
          return targetNode.difficulty === 'Advanced' || targetNode.difficulty === 'Expert';
        default:
          return true;
      }
    });

    // Convert to suggestions and sort by difficulty progression
    const suggestions = levelAppropriate
      .map(rel => {
        const targetNode = this.relationshipMapper.getContentNode(rel.targetId);
        if (!targetNode) return null;

        return {
          targetId: rel.targetId,
          targetType: targetNode.type,
          targetTitle: targetNode.title,
          targetUrl: targetNode.url,
          relevanceScore: rel.strength,
          relationshipType: rel.relationshipType,
          suggestedAnchorText: `Continue learning about ${targetNode.title}`,
          context: `Recommended for ${userLevel} level readers`,
          priority: 'high' as const
        };
      })
      .filter(Boolean) as LinkSuggestion[];

    return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
  }

  // Generate contextual recommendations
  generateContextualRecommendations(contentId: string, userContext: string): LinkSuggestion[] {
    const suggestions = this.linkingEngine.generateDynamicLinks(contentId, userContext);
    
    // Enhance suggestions with contextual information
    return suggestions.map(suggestion => ({
      ...suggestion,
      suggestedAnchorText: this.enhanceAnchorText(suggestion, userContext),
      context: this.enhanceContext(suggestion, userContext)
    }));
  }

  // Enhance anchor text based on context
  private enhanceAnchorText(suggestion: LinkSuggestion, context: string): string {
    const contextKeywords = this.extractKeywords(context);
    const suggestionKeywords = this.extractKeywords(suggestion.targetTitle);
    
    // Find matching keywords
    const matches = contextKeywords.filter(k => suggestionKeywords.includes(k));
    
    if (matches.length > 0) {
      return `Learn more about ${matches[0]}`;
    }
    
    return suggestion.suggestedAnchorText;
  }

  // Enhance context based on user context
  private enhanceContext(suggestion: LinkSuggestion, context: string): string {
    return `Based on your interest in ${context}, you might also enjoy this related content about ${suggestion.targetTitle}`;
  }

  // Extract keywords from text
  private extractKeywords(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 5);
  }

  // Generate personalized recommendations
  generatePersonalizedRecommendations(userId: string, userPreferences: string[]): LinkSuggestion[] {
    const allNodes = this.relationshipMapper.getAllContentNodes();
    
    // Filter content based on user preferences
    const relevantContent = allNodes.filter(node => {
      return userPreferences.some(pref => 
        node.keywords.includes(pref) || 
        node.categories.includes(pref) ||
        node.researchThemes?.includes(pref)
      );
    });

    // Convert to suggestions
    return relevantContent
      .map(node => ({
        targetId: node.id,
        targetType: node.type,
        targetTitle: node.title,
        targetUrl: node.url,
        relevanceScore: 0.8, // High relevance for personalized content
        relationshipType: 'personalized' as any,
        suggestedAnchorText: `Recommended for you: ${node.title}`,
        context: `Based on your interest in ${userPreferences.join(', ')}`,
        priority: 'high' as const
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  }
}

// ===== MAIN CROSS-LINKING SYSTEM =====
export class CrossLinkingSystem {
  private relationshipMapper: ContentRelationshipMapper;
  private linkingEngine: DynamicLinkingEngine;
  private linkManagement: LinkManagementSystem;
  private seoIntegration: SEOIntegration;
  private uxEnhancement: UXEnhancement;
  private config: CrossLinkingConfig;

  constructor(config: CrossLinkingConfig) {
    this.config = config;
    this.relationshipMapper = new ContentRelationshipMapper(config);
    this.linkingEngine = new DynamicLinkingEngine(this.relationshipMapper, config);
    this.linkManagement = new LinkManagementSystem(this.relationshipMapper, this.linkingEngine, config);
    this.seoIntegration = new SEOIntegration(this.relationshipMapper, config);
    this.uxEnhancement = new UXEnhancement(this.relationshipMapper, this.linkingEngine, config);
  }

  // Initialize the system with content
  initialize(contentNodes: ContentNode[]): void {
    contentNodes.forEach(node => this.relationshipMapper.addContentNode(node));
  }

  // Get comprehensive link suggestions for a page
  getLinkSuggestions(contentId: string, options: {
    maxSuggestions?: number;
    context?: string;
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
    userPreferences?: string[];
  } = {}): LinkSuggestion[] {
    const {
      maxSuggestions = 10,
      context,
      userLevel,
      userPreferences
    } = options;

    let suggestions: LinkSuggestion[] = [];

    // Get dynamic links
    suggestions.push(...this.linkingEngine.generateDynamicLinks(contentId, context));

    // Add reading path suggestions if user level is specified
    if (userLevel) {
      suggestions.push(...this.uxEnhancement.generateReadingPath(contentId, userLevel));
    }

    // Add personalized recommendations if user preferences are provided
    if (userPreferences && userPreferences.length > 0) {
      suggestions.push(...this.uxEnhancement.generatePersonalizedRecommendations('user-id', userPreferences));
    }

    // Remove duplicates and sort by relevance
    const uniqueSuggestions = this.removeDuplicateSuggestions(suggestions);
    return uniqueSuggestions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxSuggestions);
  }

  // Remove duplicate suggestions
  private removeDuplicateSuggestions(suggestions: LinkSuggestion[]): LinkSuggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const key = suggestion.targetId;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Generate SEO schema markup
  generateSEOSchema(contentId: string): object {
    return {
      internalLinking: this.seoIntegration.generateInternalLinkingSchema(contentId),
      breadcrumbs: this.seoIntegration.generateBreadcrumbSchema(contentId)
    };
  }

  // Track user interactions
  trackInteraction(type: 'impression' | 'click', sourceId: string, targetId: string): void {
    if (type === 'impression') {
      this.linkManagement.trackLinkImpression(sourceId, targetId);
    } else {
      this.linkManagement.trackLinkClick(sourceId, targetId);
    }
  }

  // Get analytics data
  getAnalytics(): {
    topPerformingLinks: Array<{ sourceId: string; targetId: string; ctr: number; clicks: number }>;
    cacheStats: { size: number; hitRate: number };
  } {
    return {
      topPerformingLinks: this.linkManagement.getTopPerformingLinks(),
      cacheStats: this.linkingEngine.getCacheStats()
    };
  }

  // Update content node
  updateContent(contentId: string, updates: Partial<ContentNode>): void {
    this.relationshipMapper.updateContentNode(contentId, updates);
  }

  // Remove content
  removeContent(contentId: string): void {
    this.relationshipMapper.removeContentNode(contentId);
  }

  // Get system statistics
  getSystemStats(): {
    totalContentNodes: number;
    totalRelationships: number;
    averageRelationshipsPerNode: number;
  } {
    const nodes = this.relationshipMapper.getAllContentNodes();
    const totalRelationships = nodes.reduce((sum, node) => {
      return sum + this.relationshipMapper.getRelationships(node.id).length;
    }, 0);

    return {
      totalContentNodes: nodes.length,
      totalRelationships,
      averageRelationshipsPerNode: nodes.length > 0 ? totalRelationships / nodes.length : 0
    };
  }
}

// ===== DEFAULT CONFIGURATION =====
export const defaultCrossLinkingConfig: CrossLinkingConfig = {
  maxLinksPerPage: 15,
  minRelevanceScore: 0.3,
  enableDynamicLinking: true,
  enableUserBehaviorTracking: true,
  enableAITagging: true,
  linkUpdateFrequency: 'weekly',
  excludedPages: ['/admin', '/api', '/_next'],
  priorityKeywords: [
    'aviation', 'aircraft', 'history', 'scottish', 'wwi', 'wwii', 'military',
    'beardmore', 'clydeside', 'spitfire', 'hurricane', 'helicopter', 'jet'
  ],
  relationshipWeights: {
    keywordMatch: 0.25,
    categoryMatch: 0.20,
    eraMatch: 0.15,
    aircraftTypeMatch: 0.15,
    geographicMatch: 0.10,
    sourceTypeMatch: 0.05,
    researchThemeMatch: 0.05,
    academicLevelMatch: 0.03,
    difficultyMatch: 0.02,
    userBehavior: 0.05,
    contentSimilarity: 0.05
  }
};

// ===== REACT HOOKS =====
import { useState, useEffect } from 'react';

export function useCrossLinking(contentId: string, options: {
  maxSuggestions?: number;
  context?: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  userPreferences?: string[];
} = {}) {
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true);
        // This would integrate with the actual CrossLinkingSystem instance
        // For now, return empty array
        setSuggestions([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load suggestions');
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      loadSuggestions();
    }
  }, [contentId, options]);

  return { suggestions, loading, error };
}

// ===== UTILITY FUNCTIONS =====
export function createContentNodeFromBook(book: Book, url: string): ContentNode {
  return {
    id: book.id,
    type: 'book',
    title: book.title,
    description: book.description,
    keywords: book.tags || [],
    categories: [book.category],
    era: book.era,
    aircraftTypes: book.aircraftTypes,
    geographicFocus: book.geographicFocus,
    sourceType: book.sourceType,
    researchThemes: book.researchThemes,
    academicLevel: book.academicLevel,
    difficulty: book.difficulty,
    tags: book.tags || [],
    url,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      averageDwellTime: 0,
      bounceRate: 0,
      socialShares: 0
    }
  };
}

export function createContentNodeFromBlogPost(post: {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  publishDate: Date;
  author: string;
  url: string;
}): ContentNode {
  return {
    id: post.id,
    type: 'blog',
    title: post.title,
    description: post.description,
    keywords: post.tags,
    categories: [post.category],
    tags: post.tags,
    content: post.content,
    publishDate: post.publishDate,
    author: post.author,
    url: post.url,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      averageDwellTime: 0,
      bounceRate: 0,
      socialShares: 0
    }
  };
} 