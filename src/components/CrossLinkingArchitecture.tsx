'use client';

import { useState, useEffect, useMemo } from 'react';
import { Link, BookOpen, Tag, TrendingUp, Users } from 'lucide-react';
import { getBooksData } from '@/utils/bookUtils';

interface ContentItem {
  id: string;
  title: string;
  type: 'book' | 'blog';
  tags: string[];
  category: string;
  excerpt: string;
  url: string;
}

interface CrossLinkingArchitectureProps {
  currentContent: ContentItem;
  allBooks: any[];
  allBlogPosts: any[];
}

export default function CrossLinkingArchitecture({
  currentContent,
  allBooks,
  allBlogPosts
}: CrossLinkingArchitectureProps) {
  const [relatedContent, setRelatedContent] = useState<ContentItem[]>([]);
  const [topicClusters, setTopicClusters] = useState<string[]>([]);

  // Topic modeling and keyword extraction
  const extractTopics = useMemo(() => {
    const topics = new Set<string>();
    
    // Extract from tags
    currentContent.tags.forEach(tag => topics.add(tag.toLowerCase()));
    
    // Extract from category
    topics.add(currentContent.category.toLowerCase());
    
    // Extract from title and excerpt (simple keyword extraction)
    const text = `${currentContent.title} ${currentContent.excerpt}`.toLowerCase();
    const keywords = ['aviation', 'aircraft', 'war', 'british', 'german', 'fighter', 'bomber', 'pilot', 'history', 'military'];
    keywords.forEach(keyword => {
      if (text.includes(keyword)) topics.add(keyword);
    });
    
    return Array.from(topics);
  }, [currentContent]);

  // Content relationship mapping
  const findRelatedContent = useMemo(() => {
    const related: ContentItem[] = [];
    const currentTopics = extractTopics;
    
    // Find books with similar topics
    allBooks.forEach(book => {
      if (book.id === currentContent.id) return;
      
      const bookTopics = [
        book.category?.toLowerCase(),
        ...(book.tags || []).map((tag: string) => tag.toLowerCase())
      ];
      
      const overlap = currentTopics.filter(topic => 
        bookTopics.some(bookTopic => bookTopic.includes(topic) || topic.includes(bookTopic))
      );
      
      if (overlap.length > 0) {
        related.push({
          id: book.id,
          title: book.title,
          type: 'book',
          tags: book.tags || [],
          category: book.category || '',
          excerpt: book.description || '',
          url: `/books/${book.id}`
        });
      }
    });
    
    // Find blog posts with similar topics
    allBlogPosts.forEach(post => {
      if (post.id === currentContent.id) return;
      
      const postTopics = [
        post.category?.toLowerCase(),
        ...(post.tags || []).map((tag: string) => tag.toLowerCase())
      ];
      
      const overlap = currentTopics.filter(topic => 
        postTopics.some(postTopic => postTopic.includes(topic) || topic.includes(postTopic))
      );
      
      if (overlap.length > 0) {
        related.push({
          id: post.id,
          title: post.title,
          type: 'blog',
          tags: post.tags || [],
          category: post.category || '',
          excerpt: post.excerpt || '',
          url: `/blog/${post.id}`
        });
      }
    });
    
    // Sort by relevance (more topic overlap = higher relevance)
    return related.sort((a, b) => {
      const aOverlap = currentTopics.filter(topic => 
        [...a.tags, a.category].some(t => t.toLowerCase().includes(topic))
      ).length;
      const bOverlap = currentTopics.filter(topic => 
        [...b.tags, b.category].some(t => t.toLowerCase().includes(topic))
      ).length;
      return bOverlap - aOverlap;
    }).slice(0, 6);
  }, [currentContent, allBooks, allBlogPosts, extractTopics]);

  useEffect(() => {
    setRelatedContent(findRelatedContent);
    setTopicClusters(extractTopics);
  }, [findRelatedContent, extractTopics]);

  return (
    <div className="space-y-6">
      {/* Topic Clusters */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Related Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topicClusters.map(topic => (
            <span
              key={topic}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Related Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Link className="w-5 h-5 mr-2" />
          Related Content
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedContent.map(item => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  item.type === 'book' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {item.type === 'book' ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className="capitalize">{item.type}</span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Path */}
      {relatedContent.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Suggested Reading Path
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              Based on your interest in <strong>{currentContent.title}</strong>, 
              we recommend exploring these related topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {topicClusters.slice(0, 3).map(topic => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-white text-gray-700 rounded text-xs border"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 