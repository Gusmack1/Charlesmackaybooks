'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, Book } from '@/types/book';
import { trackSearch } from '@/components/TrackingUtils';

interface AdvancedSearchProps {
  books: Book[];
  onFilterChange: (filteredBooks: Book[]) => void;
  onFiltersUpdate: (filters: SearchFilters) => void;
}

export default function AdvancedSearch({ books, onFilterChange, onFiltersUpdate }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    era: [],
    aircraftTypes: [],
    geographicFocus: [],
    priceRange: [0, 20],
    difficulty: '',
    hasTableOfContents: false,
    hasSampleContent: false,
    inStock: true
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>(books);

  // Extract unique values from books for filter options with proper typing
  const getUniqueStringValues = (field: 'category') => {
    const values = books.map(book => book[field]).filter(Boolean);
    return [...new Set(values)].sort();
  };

  const getUniqueArrayValues = (field: 'aircraftTypes' | 'geographicFocus') => {
    const values = books.flatMap(book => book[field] || []);
    return [...new Set(values)].sort();
  };

  const categories = getUniqueStringValues('category');
  const eras = ['Pre-WWI', 'WWI (1914-1918)', 'Inter-War (1918-1939)', 'WWII (1939-1945)', 'Post-WWII', 'Cold War (1945-1991)'];
  const aircraftTypes = getUniqueArrayValues('aircraftTypes');
  const geographicFocus = ['Scotland', 'Britain', 'Germany', 'Europe', 'International', 'USA'];
  const difficulties = ['Introductory', 'Intermediate', 'Advanced', 'Expert'];

  // Filter books based on current filters
  const filterBooks = (currentFilters: SearchFilters) => {
    let filtered = books;

    // Text search
    if (currentFilters.query) {
      const query = currentFilters.query.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        book.researchThemes?.some(theme => theme.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (currentFilters.category) {
      filtered = filtered.filter(book => book.category === currentFilters.category);
    }

    // Era filter
    if (currentFilters.era && currentFilters.era.length > 0) {
      filtered = filtered.filter(book =>
        book.era?.some(era => currentFilters.era!.includes(era))
      );
    }

    // Aircraft types filter
    if (currentFilters.aircraftTypes && currentFilters.aircraftTypes.length > 0) {
      filtered = filtered.filter(book =>
        book.aircraftTypes?.some(type => currentFilters.aircraftTypes!.includes(type))
      );
    }

    // Geographic focus filter
    if (currentFilters.geographicFocus && currentFilters.geographicFocus.length > 0) {
      filtered = filtered.filter(book =>
        book.geographicFocus?.some(geo => currentFilters.geographicFocus!.includes(geo))
      );
    }

    // Price range filter
    if (currentFilters.priceRange) {
      filtered = filtered.filter(book =>
        book.price >= currentFilters.priceRange![0] &&
        book.price <= currentFilters.priceRange![1]
      );
    }

    // Difficulty filter
    if (currentFilters.difficulty) {
      filtered = filtered.filter(book => book.difficulty === currentFilters.difficulty);
    }

    // Table of contents filter
    if (currentFilters.hasTableOfContents) {
      filtered = filtered.filter(book => book.tableOfContents && book.tableOfContents.length > 0);
    }

    // Sample content filter
    if (currentFilters.hasSampleContent) {
      filtered = filtered.filter(book => book.sampleContent && book.sampleContent.length > 0);
    }

    // In stock filter
    if (currentFilters.inStock) {
      filtered = filtered.filter(book => book.inStock);
    }

    return filtered;
  };

  // Update filters and results
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const filtered = filterBooks(updatedFilters);
    setSearchResults(filtered);
    onFilterChange(filtered);
    onFiltersUpdate(updatedFilters);

    // Track search usage
    trackSearch(updatedFilters.query || '', filtered.length);
  };

  // Handle checkbox arrays
  const handleArrayFilter = (field: keyof SearchFilters, value: string, checked: boolean) => {
    const currentArray = (filters[field] as string[]) || [];
    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);

    updateFilters({ [field]: updatedArray });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      category: '',
      era: [],
      aircraftTypes: [],
      geographicFocus: [],
      priceRange: [0, 20],
      difficulty: '',
      hasTableOfContents: false,
      hasSampleContent: false,
      inStock: true
    };

    setFilters(clearedFilters);
    setSearchResults(books);
    onFilterChange(books);
    onFiltersUpdate(clearedFilters);
  };

  // Initialize with all books
  useEffect(() => {
    setSearchResults(books);
    onFilterChange(books);
  }, [books, onFilterChange]);

  return (
    <div className="card p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">🔍 Find Your Perfect Aviation Book</h2>
          <p className="text-sm text-secondary">
            Found {searchResults.length} of {books.length} books
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isExpanded ? 'Hide Filters' : 'Show More Filters'}
        </button>
      </div>

      {/* Quick Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, topic, aircraft type, or description..."
          value={filters.query || ''}
          onChange={(e) => updateFilters({ query: e.target.value })}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-sm sm:text-lg max-w-full box-border"
        />
      </div>

      {/* Basic Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Reading Level</label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => updateFilters({ difficulty: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
          >
            <option value="">Any Level</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Price Range: £{filters.priceRange?.[0]} - £{filters.priceRange?.[1]}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={filters.priceRange?.[0] || 0}
              onChange={(e) => updateFilters({
                priceRange: [parseFloat(e.target.value), filters.priceRange?.[1] || 20]
              })}
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={filters.priceRange?.[1] || 20}
              onChange={(e) => updateFilters({
                priceRange: [filters.priceRange?.[0] || 0, parseFloat(e.target.value)]
              })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-secondary">Book Features</label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.hasTableOfContents || false}
              onChange={(e) => updateFilters({ hasTableOfContents: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm">Has Table of Contents</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.hasSampleContent || false}
              onChange={(e) => updateFilters({ hasSampleContent: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm">Has Sample Content</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => updateFilters({ inStock: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t pt-6">
          {/* Historical Era */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-3">Historical Period</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {eras.map(era => (
                <label key={era} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.era?.includes(era) || false}
                    onChange={(e) => handleArrayFilter('era', era, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{era}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Geographic Focus */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-3">Geographic Region</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {geographicFocus.map(geo => (
                <label key={geo} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.geographicFocus?.includes(geo) || false}
                    onChange={(e) => handleArrayFilter('geographicFocus', geo, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{geo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Aircraft Types (if available) */}
          {aircraftTypes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-3">Aircraft Types</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {aircraftTypes.slice(0, 12).map(type => ( // Limit to prevent overcrowding
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.aircraftTypes?.includes(type) || false}
                      onChange={(e) => handleArrayFilter('aircraftTypes', type, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          <div className="flex justify-center">
            <button
              onClick={clearFilters}
              className="badge badge-gray px-6 py-2 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
