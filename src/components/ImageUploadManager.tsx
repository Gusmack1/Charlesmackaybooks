'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useImageManager, ImageMetadata, ImageCategory } from '../utils/imageManagement';

interface ImageUploadManagerProps {
  onImageAdded?: (metadata: ImageMetadata) => void;
  category?: ImageCategory;
  showPreview?: boolean;
}

export default function ImageUploadManager({
  onImageAdded,
  category = 'blog-featured',
  showPreview = true
}: ImageUploadManagerProps) {
  const { addImage, generateAltText } = useImageManager();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<Partial<ImageMetadata>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    source: '',
    license: 'CC0',
    altText: '',
    tags: '',
    attribution: ''
  });

  // Handle file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrors([]);
    setIsUploading(true);
    setUploadProgress(0);

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(['Invalid file type. Please select a JPEG, PNG, WebP, or AVIF file.']);
      setIsUploading(false);
      return;
    }

    if (file.size > 150 * 1024) { // 150KB limit
      setErrors(['File size exceeds 150KB limit. Please compress the image.']);
      setIsUploading(false);
      return;
    }

    // Generate filename
    const filename = `${category}-${file.name.replace(/\.[^/.]+$/, '')}-${Date.now()}`;
    
    // Create metadata
    const imageMetadata: ImageMetadata = {
      id: '',
      filename,
      originalSource: formData.source || 'Unknown',
      license: {
        type: formData.license as any,
        requiresAttribution: formData.license.includes('CC BY'),
        allowsCommercialUse: !formData.license.includes('CC BY-SA'),
        allowsModification: !formData.license.includes('CC BY-SA'),
        description: formData.license
      },
      attribution: formData.attribution || undefined,
      downloadDate: new Date().toISOString(),
      usageHistory: [],
      optimizationData: {
        originalSize: file.size,
        optimizedSize: 0,
        compressionRatio: 0,
        formats: {
          webp: false,
          avif: false,
          jpeg: true,
          png: file.type === 'image/png'
        },
        responsiveSizes: [320, 480, 768, 1024, 1200, 1600],
        quality: 85
      },
      altText: formData.altText || `Image related to ${category}`,
      category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      fileSize: file.size,
      dimensions: { width: 0, height: 0 }
    };

    setMetadata(imageMetadata);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          addImage(imageMetadata);
          onImageAdded?.(imageMetadata);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  }, [category, formData, addImage, onImageAdded]);

  // Handle form submission
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  }, []);

  // Generate alt text suggestions
  const handleGenerateAltText = useCallback(() => {
    const suggestions = generateAltText(category, formData.tags.split(',').map(tag => tag.trim()).filter(Boolean));
    if (suggestions.length > 0) {
      setFormData(prev => ({ ...prev, altText: suggestions[0] }));
    }
  }, [category, formData.tags, generateAltText]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Image Upload Manager
      </h3>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          {errors.map((error, index) => (
            <p key={index} className="text-red-700 text-sm">{error}</p>
          ))}
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Image File
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
          >
            Click to select image file
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPEG, PNG, WebP, AVIF (max 150KB)
          </p>
        </div>

        {/* Source URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Source URL
          </label>
          <input
            type="url"
            value={formData.source}
            onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
            placeholder="https://unsplash.com/photo/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Required for copyright verification
          </p>
        </div>

        {/* License Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Type
          </label>
          <select
            value={formData.license}
            onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CC0">CC0 - No Rights Reserved</option>
            <option value="CC BY">CC BY - Attribution Required</option>
            <option value="CC BY-SA">CC BY-SA - Attribution + Share Alike</option>
            <option value="Public Domain">Public Domain</option>
            <option value="Custom">Custom License</option>
          </select>
        </div>

        {/* Attribution (if required) */}
        {(formData.license.includes('CC BY') || formData.license.includes('CC BY-SA')) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attribution Text
            </label>
            <input
              type="text"
              value={formData.attribution}
              onChange={(e) => setFormData(prev => ({ ...prev, attribution: e.target.value }))}
              placeholder="Photo by John Doe on Unsplash"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="aviation, wwii, aircraft, scottish"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Alt Text */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Alt Text
            </label>
            <button
              type="button"
              onClick={handleGenerateAltText}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Generate Suggestions
            </button>
          </div>
          <textarea
            value={formData.altText}
            onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
            placeholder="Describe the image for accessibility and SEO..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.altText.length}/125 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || !formData.source}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {/* Image Preview */}
      {showPreview && metadata.filename && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Image Metadata Preview</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Filename:</strong> {metadata.filename}</p>
            <p><strong>Category:</strong> {metadata.category}</p>
            <p><strong>License:</strong> {metadata.license?.description}</p>
            <p><strong>Alt Text:</strong> {metadata.altText}</p>
            <p><strong>Tags:</strong> {metadata.tags?.join(', ')}</p>
            {metadata.attribution && (
              <p><strong>Attribution:</strong> {metadata.attribution}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 