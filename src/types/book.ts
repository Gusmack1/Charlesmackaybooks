export interface Book {
  id: string;
  title: string;
  price: number;
  isbn?: string;
  category: string;
  condition: 'New' | 'Very Good' | 'Good';
  inStock: boolean;
  description: string;
  imageUrl?: string;
  ebayUrl?: string;
  tags?: string[];
  // Enhanced content for detailed pages
  tableOfContents?: string[];
  sampleContent?: {
    chapter: string;
    title: string;
    excerpt: string;
  }[];
  authorInsights?: string;
  researchBackground?: string;
  academicValue?: string;
  pageCount?: number;
  publicationYear?: number;
  // Shipping and logistics
  weight?: number;
  specifications?: {
    format?: string;
    illustrations?: string;
    maps?: boolean;
    bibliography?: boolean;
    index?: boolean;
  };
  // Advanced academic features
  academicLevel?: (
    'Undergraduate' |
    'Graduate' |
    'Research' |
    'Professional' |
    'General Interest'
  )[];
  era?: (
    'Pre-WWI' |
    'WWI (1914-1918)' |
    'Inter-War (1918-1939)' |
    'WWII (1939-1945)' |
    'Post-WWII' |
    'Cold War (1945-1991)' |
    'Postwar (1945-1960)' |
    'Vietnam War' |
    '19th Century' |
    '20th Century'
  )[];
  aircraftTypes?: string[];
  geographicFocus?: (
    'Scotland' |
    'Britain' |
    'Germany' |
    'Europe' |
    'International' |
    'USA' |
    'Canada' |
    'Vietnam'
  )[];
  sourceType?: (
    'Primary Sources' |
    'Archival Research' |
    'Biographical' |
    'Biography' |
    'Technical Analysis' |
    'Photographic' |
    'Operational History' |
    'Personal Testimony'
  )[];
  researchThemes?: string[];
  difficulty?: 'Introductory' | 'Intermediate' | 'Advanced' | 'Expert';
  citationCount?: number;
  academicInstitutions?: string[];
  relatedBookIds?: string[];
  relatedBlogPosts?: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

// Academic testimonial type
export interface AcademicTestimonial {
  id: string;
  author: string;
  title: string;
  institution: string;
  quote: string;
  bookId?: string;
  type: 'Academic' | 'Museum' | 'Institution' | 'Conference' | 'Review';
  date: string;
  verified: boolean;
}

// Newsletter subscription type
export interface NewsletterSubscription {
  email: string;
  type: 'Academic Institution' | 'Individual Researcher' | 'Student' | 'General Interest';
  interests: string[];
  institution?: string;
  researchFocus?: string[];
}

// Search filters interface
export interface SearchFilters {
  query?: string;
  category?: string;
  academicLevel?: string[];
  era?: string[];
  aircraftTypes?: string[];
  geographicFocus?: string[];
  sourceType?: string[];
  priceRange?: [number, number];
  pageCountRange?: [number, number];
  publicationYearRange?: [number, number];
  difficulty?: string;
  hasTableOfContents?: boolean;
  hasSampleContent?: boolean;
  inStock?: boolean;
}

// Recommendation context
export interface RecommendationContext {
  viewedBooks: string[];
  addedToCart: string[];
  addedToWishlist: string[];
  searchQueries: string[];
  timeSpentOnBooks: { [bookId: string]: number };
  academicInterests: string[];
  preferredEras: string[];
  preferredGeography: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getBulkDiscount: () => { discount: number; tier: string; originalTotal: number; discountedTotal: number };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export interface WishlistItem {
  book: Book;
  addedAt: Date;
}

export interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (bookId: string) => boolean;
  getTotalItems: () => number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}
