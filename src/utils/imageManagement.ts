// Image Management Utilities for Charles Mackay Books
// Implements the Copyright-Free Image Generation Prompt requirements

export interface ImageMetadata {
  id: string;
  filename: string;
  originalSource: string;
  license: ImageLicense;
  attribution?: string;
  downloadDate: string;
  usageHistory: ImageUsage[];
  optimizationData: OptimizationData;
  altText: string;
  category: ImageCategory;
  tags: string[];
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ImageLicense {
  type: 'CC0' | 'CC_BY' | 'CC_BY_SA' | 'PUBLIC_DOMAIN' | 'CUSTOM';
  requiresAttribution: boolean;
  allowsCommercialUse: boolean;
  allowsModification: boolean;
  description: string;
}

export interface ImageUsage {
  page: string;
  component: string;
  date: string;
  context: string;
}

export interface OptimizationData {
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  formats: {
    webp: boolean;
    avif: boolean;
    jpeg: boolean;
    png: boolean;
  };
  responsiveSizes: number[];
  quality: number;
}

export type ImageCategory = 
  | 'book-covers'
  | 'author-photos'
  | 'blog-featured'
  | 'aviation-history'
  | 'scottish-aviation'
  | 'technical-diagrams'
  | 'facilities'
  | 'backgrounds'
  | 'icons';

export class ImageManager {
  private static instance: ImageManager;
  private imageDatabase: Map<string, ImageMetadata> = new Map();
  private readonly allowedSources = [
    'unsplash.com',
    'pixabay.com',
    'pexels.com',
    'wikimedia.org',
    'commons.wikimedia.org'
  ];

  private readonly prohibitedSources = [
    'gettyimages.com',
    'alamy.com',
    'shutterstock.com',
    'istockphoto.com',
    'adobe.com'
  ];

  static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  // Copyright verification
  verifyCopyright(source: string, license: string): boolean {
    // Check if source is in prohibited list
    if (this.prohibitedSources.some(prohibited => source.includes(prohibited))) {
      throw new Error(`Source ${source} is in prohibited list`);
    }

    // Check if source is in allowed list
    const isAllowedSource = this.allowedSources.some(allowed => source.includes(allowed));
    if (!isAllowedSource) {
      console.warn(`Source ${source} is not in allowed list - manual verification required`);
    }

    // Verify license format
    const validLicenses = ['CC0', 'CC BY', 'CC BY-SA', 'Public Domain', 'Custom'];
    if (!validLicenses.some(valid => license.includes(valid))) {
      throw new Error(`Invalid license format: ${license}`);
    }

    return true;
  }

  // Generate image metadata
  generateMetadata(
    filename: string,
    source: string,
    license: string,
    category: ImageCategory,
    altText: string,
    tags: string[] = []
  ): ImageMetadata {
    const id = this.generateImageId(filename);
    
    const imageLicense: ImageLicense = {
      type: this.parseLicenseType(license),
      requiresAttribution: license.includes('CC BY') || license.includes('CC BY-SA'),
      allowsCommercialUse: !license.includes('CC BY-SA'),
      allowsModification: !license.includes('CC BY-SA'),
      description: license
    };

    return {
      id,
      filename,
      originalSource: source,
      license: imageLicense,
      attribution: imageLicense.requiresAttribution ? this.generateAttribution(source) : undefined,
      downloadDate: new Date().toISOString(),
      usageHistory: [],
      optimizationData: {
        originalSize: 0,
        optimizedSize: 0,
        compressionRatio: 0,
        formats: {
          webp: false,
          avif: false,
          jpeg: false,
          png: false
        },
        responsiveSizes: [320, 480, 768, 1024, 1200, 1600],
        quality: 85
      },
      altText,
      category,
      tags,
      fileSize: 0,
      dimensions: { width: 0, height: 0 }
    };
  }

  // Add image to database
  addImage(metadata: ImageMetadata): void {
    this.verifyCopyright(metadata.originalSource, metadata.license.description);
    this.imageDatabase.set(metadata.id, metadata);
    this.saveToLocalStorage();
  }

  // Track image usage
  trackUsage(imageId: string, page: string, component: string, context: string): void {
    const image = this.imageDatabase.get(imageId);
    if (image) {
      image.usageHistory.push({
        page,
        component,
        date: new Date().toISOString(),
        context
      });
      this.saveToLocalStorage();
    }
  }

  // Generate optimized image paths
  generateImagePaths(filename: string, category: ImageCategory): {
    webp: string[];
    avif: string[];
    jpeg: string[];
    png: string[];
  } {
    const basePath = `/images/${category}`;
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const sizes = [320, 480, 768, 1024, 1200, 1600];

    return {
      webp: sizes.map(size => `${basePath}/${nameWithoutExt}-${size}.webp`),
      avif: sizes.map(size => `${basePath}/${nameWithoutExt}-${size}.avif`),
      jpeg: sizes.map(size => `${basePath}/${nameWithoutExt}-${size}.jpg`),
      png: sizes.map(size => `${basePath}/${nameWithoutExt}-${size}.png`)
    };
  }

  // Generate srcset for responsive images
  generateSrcSet(imagePaths: string[], sizes: number[]): string {
    return imagePaths
      .map((path, index) => `${path} ${sizes[index]}w`)
      .join(', ');
  }

  // Validate image requirements
  validateImageRequirements(
    file: File,
    category: ImageCategory
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const maxSize = 150 * 1024; // 150KB

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size ${(file.size / 1024).toFixed(1)}KB exceeds 150KB limit`);
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} not allowed`);
    }

    // Check minimum dimensions based on category
    const minDimensions = this.getMinimumDimensions(category);
    // Note: Actual dimension checking would require image loading

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Generate alt text suggestions
  generateAltTextSuggestions(category: ImageCategory, tags: string[]): string[] {
    const suggestions: string[] = [];

    switch (category) {
      case 'book-covers':
        suggestions.push('Book cover of [Book Title] by [Author Name]');
        suggestions.push('Professional book cover design for aviation history publication');
        break;
      case 'aviation-history':
        suggestions.push('Historical [Aircraft Type] aircraft from [Era]');
        suggestions.push('Vintage aviation photograph showing [Description]');
        break;
      case 'scottish-aviation':
        suggestions.push('Scottish aviation heritage - [Specific Description]');
        suggestions.push('Historic Scottish aircraft and aviation facilities');
        break;
      case 'technical-diagrams':
        suggestions.push('Technical diagram of [Aircraft/Component] showing [Details]');
        suggestions.push('Engineering schematic for [Specific System]');
        break;
      default:
        suggestions.push('High-quality image related to [Topic]');
    }

    // Add tag-based suggestions
    tags.forEach(tag => {
      suggestions.push(`Image featuring ${tag} in aviation context`);
    });

    return suggestions;
  }

  // Search images by criteria
  searchImages(criteria: {
    category?: ImageCategory;
    tags?: string[];
    license?: string;
    dateRange?: { start: string; end: string };
  }): ImageMetadata[] {
    return Array.from(this.imageDatabase.values()).filter(image => {
      if (criteria.category && image.category !== criteria.category) return false;
      if (criteria.tags && !criteria.tags.some(tag => image.tags.includes(tag))) return false;
      if (criteria.license && image.license.type !== criteria.license) return false;
      if (criteria.dateRange) {
        const downloadDate = new Date(image.downloadDate);
        const start = new Date(criteria.dateRange.start);
        const end = new Date(criteria.dateRange.end);
        if (downloadDate < start || downloadDate > end) return false;
      }
      return true;
    });
  }

  // Generate attribution text
  private generateAttribution(source: string): string {
    if (source.includes('unsplash.com')) {
      const photographer = source.split('/').pop()?.replace(/[^a-zA-Z]/g, ' ') || 'Unknown';
      return `Photo by ${photographer} on Unsplash`;
    }
    if (source.includes('pixabay.com')) {
      return 'Image from Pixabay';
    }
    if (source.includes('pexels.com')) {
      return 'Image from Pexels';
    }
    if (source.includes('wikimedia.org')) {
      return 'Image from Wikimedia Commons';
    }
    return `Image from ${source}`;
  }

  // Parse license type
  private parseLicenseType(license: string): ImageLicense['type'] {
    if (license.includes('CC0')) return 'CC0';
    if (license.includes('CC BY-SA')) return 'CC_BY_SA';
    if (license.includes('CC BY')) return 'CC_BY';
    if (license.includes('Public Domain')) return 'PUBLIC_DOMAIN';
    return 'CUSTOM';
  }

  // Generate unique image ID
  private generateImageId(filename: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${filename.replace(/\.[^/.]+$/, '')}-${timestamp}-${random}`;
  }

  // Get minimum dimensions for category
  private getMinimumDimensions(category: ImageCategory): { width: number; height: number } {
    switch (category) {
      case 'book-covers':
        return { width: 1200, height: 1800 };
      case 'author-photos':
        return { width: 400, height: 400 };
      case 'blog-featured':
        return { width: 1200, height: 630 };
      case 'aviation-history':
      case 'scottish-aviation':
      case 'technical-diagrams':
        return { width: 800, height: 600 };
      default:
        return { width: 400, height: 300 };
    }
  }

  // Save to localStorage
  private saveToLocalStorage(): void {
    try {
      const data = Array.from(this.imageDatabase.entries());
      localStorage.setItem('charles-mackay-images', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save image database to localStorage:', error);
    }
  }

  // Load from localStorage
  loadFromLocalStorage(): void {
    try {
      const data = localStorage.getItem('charles-mackay-images');
      if (data) {
        const entries = JSON.parse(data);
        this.imageDatabase = new Map(entries);
      }
    } catch (error) {
      console.error('Failed to load image database from localStorage:', error);
    }
  }

  // Export image database
  exportDatabase(): string {
    return JSON.stringify(Array.from(this.imageDatabase.entries()), null, 2);
  }

  // Import image database
  importDatabase(data: string): void {
    try {
      const entries = JSON.parse(data);
      this.imageDatabase = new Map(entries);
      this.saveToLocalStorage();
    } catch (error) {
      throw new Error('Invalid image database format');
    }
  }
}

// React hook for image management
export function useImageManager() {
  const manager = ImageManager.getInstance();

  const addImage = (metadata: ImageMetadata) => {
    manager.addImage(metadata);
  };

  const trackUsage = (imageId: string, page: string, component: string, context: string) => {
    manager.trackUsage(imageId, page, component, context);
  };

  const searchImages = (criteria: Parameters<typeof manager.searchImages>[0]) => {
    return manager.searchImages(criteria);
  };

  const generateAltText = (category: ImageCategory, tags: string[]) => {
    return manager.generateAltTextSuggestions(category, tags);
  };

  return {
    addImage,
    trackUsage,
    searchImages,
    generateAltText,
    manager
  };
}

// Utility functions
export const imageUtils = {
  // Generate responsive image component props
  generateImageProps(
    filename: string,
    category: ImageCategory,
    alt: string,
    sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  ) {
    const manager = ImageManager.getInstance();
    const paths = manager.generateImagePaths(filename, category);
    const responsiveSizes = [320, 480, 768, 1024, 1200, 1600];

    return {
      src: paths.webp[2], // Default to 768px size
      srcSet: manager.generateSrcSet(paths.webp, responsiveSizes),
      sizes,
      alt,
      loading: 'lazy' as const,
      decoding: 'async' as const
    };
  },

  // Validate image source
  validateSource(source: string): boolean {
    const manager = ImageManager.getInstance();
    try {
      return manager.verifyCopyright(source, 'CC0'); // Default check
    } catch {
      return false;
    }
  },

  // Generate image filename
  generateFilename(title: string, category: ImageCategory): string {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${category}-${slug}-${Date.now()}`;
  }
}; 