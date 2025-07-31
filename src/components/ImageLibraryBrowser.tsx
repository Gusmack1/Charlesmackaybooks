'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useImageManager, ImageMetadata, ImageCategory } from '../utils/imageManagement';

interface ImageLibraryBrowserProps {
  onImageSelect?: (metadata: ImageMetadata) => void;
  selectedCategory?: ImageCategory;
  showFilters?: boolean;
  showUsage?: boolean;
}

export default function ImageLibraryBrowser({
  onImageSelect,
  selectedCategory,
  showFilters = true,
  showUsage = true
}: ImageLibraryBrowserProps) {
  const { searchImages, trackUsage } = useImageManager();
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filters, setFilters] = useState({
    category: selectedCategory || 'all',
    tags: '',
    license: 'all',
    dateRange: { start: '', end: '' }
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');

  // Load images on mount
  useEffect(() => {
    const loadImages = () => {
      setLoading(true);
      const searchCriteria: any = {};
      
      if (filters.category !== 'all') {
        searchCriteria.category = filters.category as ImageCategory;
      }
      
      if (filters.tags) {
        searchCriteria.tags = filters.tags.split(',').map(tag => tag.trim());
      }
      
      if (filters.license !== 'all') {
        searchCriteria.license = filters.license;
      }
      
      if (filters.dateRange.start || filters.dateRange.end) {
        searchCriteria.dateRange = filters.dateRange;
      }

      const results = searchImages(searchCriteria);
      setImages(results);
      setLoading(false);
    };

    loadImages();
  }, [filters, searchImages]);

  // Filter and sort images
  useEffect(() => {
    let filtered = [...images];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(image => 
        image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.altText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime();
        case 'name':
          return a.filename.localeCompare(b.filename);
        case 'size':
          return b.fileSize - a.fileSize;
        default:
          return 0;
      }
    });

    setFilteredImages(filtered);
  }, [images, searchTerm, sortBy]);

  // Handle image selection
  const handleImageSelect = useCallback((image: ImageMetadata) => {
    // Track usage
    trackUsage(image.id, 'image-library', 'browser', 'image-selection');
    onImageSelect?.(image);
  }, [trackUsage, onImageSelect]);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Image Library Browser
        </h3>
        
        {/* Search and Sort */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search images by filename, alt text, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
          </select>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="book-covers">Book Covers</option>
                <option value="author-photos">Author Photos</option>
                <option value="blog-featured">Blog Featured</option>
                <option value="aviation-history">Aviation History</option>
                <option value="scottish-aviation">Scottish Aviation</option>
                <option value="technical-diagrams">Technical Diagrams</option>
                <option value="facilities">Facilities</option>
                <option value="backgrounds">Backgrounds</option>
                <option value="icons">Icons</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                placeholder="Filter by tags..."
                value={filters.tags}
                onChange={(e) => setFilters(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License</label>
              <select
                value={filters.license}
                onChange={(e) => setFilters(prev => ({ ...prev, license: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Licenses</option>
                <option value="CC0">CC0</option>
                <option value="CC_BY">CC BY</option>
                <option value="CC_BY_SA">CC BY-SA</option>
                <option value="PUBLIC_DOMAIN">Public Domain</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No images found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredImages.length} of {images.length} images
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleImageSelect(image)}
                >
                  {/* Image Preview Placeholder */}
                  <div className="w-full h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{image.category}</span>
                  </div>

                  {/* Image Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {image.filename}
                    </h4>
                    
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {image.altText}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {image.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {image.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{image.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatFileSize(image.fileSize)}</span>
                      <span>{formatDate(image.downloadDate)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded ${
                        image.license.type === 'CC0' ? 'bg-green-100 text-green-800' :
                        image.license.type === 'PUBLIC_DOMAIN' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {image.license.type}
                      </span>
                      
                      {showUsage && (
                        <span className="text-xs text-gray-500">
                          Used {image.usageHistory.length} times
                        </span>
                      )}
                    </div>

                    {image.attribution && (
                      <p className="text-xs text-gray-500 italic">
                        {image.attribution}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 