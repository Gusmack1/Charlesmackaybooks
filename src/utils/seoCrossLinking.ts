/**
 * SEO Enhancement Utility
 * Ensures all books have proper blog links and all blogs have proper book links
 * This creates a comprehensive cross-linking structure for better SEO
 */

import { books } from '@/data/books';
import { Book } from '@/types/book';

// Blog post slugs mapped to book IDs
const blogToBookMapping: Record<string, string[]> = {
  'beardmore-aviation-scottish-industrial-giant': ['beardmore-aviation', 'clydeside-aviation-vol1', 'clydeside-aviation-vol2'],
  'clydeside-aviation-revolution': ['clydeside-aviation-vol1', 'clydeside-aviation-vol2', 'beardmore-aviation'],
  'british-aircraft-great-war-rfc-rnas': ['british-aircraft-great-war', 'german-aircraft-great-war', 'flying-for-kaiser'],
  'german-aircraft-great-war-development': ['german-aircraft-great-war', 'flying-for-kaiser', 'british-aircraft-great-war'],
  'luftwaffe-1945-final-year': ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two'],
  'me262-jet-fighter-revolution': ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two'],
  'hms-argus-first-aircraft-carrier': ['aircraft-carrier-argus', 'beardmore-aviation'],
  'f86-sabre-cold-war-fighter': ['sabres-from-north'],
  'sycamore-seeds-helicopter-evolution': ['sycamore-seeds'],
  'percy-pilcher-scotland-aviation-pioneer': ['soaring-with-wings'],
  'test-pilot-biography-eric-brown': ['captain-eric-brown', 'aircraft-carrier-argus'],
  'dieter-dengler-skyraider-escape': ['dieter-dengler', 'soaring-with-wings'],
  'maud-alsos-atomic-program': ['birth-atomic-bomb', 'sonic-to-standoff'],
  'british-nuclear-deterrent-v-force': ['sonic-to-standoff'],
  'adolf-rohrbach-metal-aircraft-revolution': ['adolf-rohrbach', 'beardmore-aviation'],
  'morris-furniture-war-work-aviation': ['modern-furniture', 'sycamore-seeds'],
  'dorothy-wordsworth-scottish-tour-1803': ['dorothy-wordsworth'],
  'lucy-lady-houston-schneider-trophy': ['mother-of-the-few'],
  'jet-age-aviation-cold-war-development': ['sabres-from-north', 'sonic-to-standoff'],
};

// Book ID to blog slug mapping (reverse)
const bookToBlogMapping: Record<string, string[]> = {
  'beardmore-aviation': ['beardmore-aviation-scottish-industrial-giant', 'clydeside-aviation-revolution'],
  'clydeside-aviation-vol1': ['clydeside-aviation-revolution', 'beardmore-aviation-scottish-industrial-giant'],
  'clydeside-aviation-vol2': ['clydeside-aviation-revolution', 'beardmore-aviation-scottish-industrial-giant'],
  'british-aircraft-great-war': ['british-aircraft-great-war-rfc-rnas', 'german-aircraft-great-war-development'],
  'german-aircraft-great-war': ['german-aircraft-great-war-development', 'british-aircraft-great-war-rfc-rnas'],
  'flying-for-kaiser': ['german-aircraft-great-war-development', 'british-aircraft-great-war-rfc-rnas'],
  'enemy-luftwaffe-1945': ['luftwaffe-1945-final-year', 'me262-jet-fighter-revolution'],
  'this-was-the-enemy-volume-two': ['luftwaffe-1945-final-year', 'me262-jet-fighter-revolution'],
  'aircraft-carrier-argus': ['hms-argus-first-aircraft-carrier', 'beardmore-aviation-scottish-industrial-giant'],
  'sabres-from-north': ['f86-sabre-cold-war-fighter', 'jet-age-aviation-cold-war-development'],
  'sycamore-seeds': ['sycamore-seeds-helicopter-evolution', 'morris-furniture-war-work-aviation'],
  'soaring-with-wings': ['percy-pilcher-scotland-aviation-pioneer', 'dieter-dengler-skyraider-escape'],
  'captain-eric-brown': ['test-pilot-biography-eric-brown'],
  'dieter-dengler': ['dieter-dengler-skyraider-escape'],
  'birth-atomic-bomb': ['maud-alsos-atomic-program'],
  'sonic-to-standoff': ['british-nuclear-deterrent-v-force', 'maud-alsos-atomic-program'],
  'adolf-rohrbach': ['adolf-rohrbach-metal-aircraft-revolution'],
  'modern-furniture': ['morris-furniture-war-work-aviation'],
  'dorothy-wordsworth': ['dorothy-wordsworth-scottish-tour-1803'],
  'mother-of-the-few': ['lucy-lady-houston-schneider-trophy'],
};

/**
 * Get related blog posts for a book
 */
export function getRelatedBlogPostsForBook(bookId: string): Array<{ slug: string; title: string; excerpt: string }> {
  const blogSlugs = bookToBlogMapping[bookId] || [];
  
  // Map blog slugs to blog post objects
  const blogPosts: Array<{ slug: string; title: string; excerpt: string }> = blogSlugs.map(slug => {
    // Generate title from slug
    const title = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      slug,
      title,
      excerpt: `Expert analysis on ${title} by Charles E. MacKay`
    };
  });
  
  return blogPosts;
}

/**
 * Get related books for a blog post
 */
export function getRelatedBooksForBlog(blogSlug: string): string[] {
  return blogToBookMapping[blogSlug] || [];
}

/**
 * Generate comprehensive cross-links for all books
 * This ensures every book has at least one related blog post
 */
export function enhanceBookWithBlogLinks(book: Book): Book {
  const existingRelatedPosts = (book as any).relatedBlogPosts || [];
  
  // If no related posts exist, try to find them
  if (existingRelatedPosts.length === 0) {
    const relatedPosts = getRelatedBlogPostsForBook(book.id);
    if (relatedPosts.length > 0) {
      return {
        ...book,
        relatedBlogPosts: relatedPosts
      } as Book;
    }
  }
  
  return book;
}

/**
 * Generate comprehensive SEO metadata for a book
 */
export function generateBookSEOMetadata(book: Book) {
  const relatedPosts = getRelatedBlogPostsForBook(book.id);
  
  return {
    title: `${book.title} | Charles E. MacKay Aviation Books | £${book.price}`,
    description: book.description.substring(0, 160),
    keywords: [
      book.title,
      'Charles E MacKay',
      book.category,
      ...(book.tags || []),
      ...(book.researchThemes || []),
      'aviation history books',
      'buy aviation books',
      `ISBN ${book.isbn}`
    ].filter(Boolean),
    relatedBlogPosts: relatedPosts,
    canonicalUrl: `https://charlesmackaybooks.com/books/${book.id}/`
  };
}

/**
 * Generate comprehensive SEO metadata for a blog post
 */
export function generateBlogSEOMetadata(blogSlug: string, post: any) {
  const relatedBookIds = getRelatedBooksForBlog(blogSlug);
  const relatedBooks = books.filter(book => relatedBookIds.includes(book.id));
  
  return {
    title: `${post.title} | Charles E. MacKay Aviation Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: [
      post.title,
      'Charles E MacKay',
      post.category,
      ...(post.tags || []),
      'aviation history',
      'aviation blog'
    ].filter(Boolean),
    relatedBooks: relatedBooks.map(book => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn || '',
      price: book.price
    })),
    canonicalUrl: `https://charlesmackaybooks.com/blog/${blogSlug}/`
  };
}

/**
 * Generate all cross-links for the entire site
 */
export function generateSiteWideCrossLinks() {
  const bookLinks: Record<string, string[]> = {};
  const blogLinks: Record<string, string[]> = {};
  
  // Build book to blog mapping
  books.forEach(book => {
    const relatedPosts = getRelatedBlogPostsForBook(book.id);
    if (relatedPosts.length > 0) {
      bookLinks[book.id] = relatedPosts.map(p => p.slug);
    }
  });
  
  // Build blog to book mapping
  Object.keys(blogToBookMapping).forEach(blogSlug => {
    blogLinks[blogSlug] = blogToBookMapping[blogSlug];
  });
  
  return {
    bookLinks,
    blogLinks
  };
}

