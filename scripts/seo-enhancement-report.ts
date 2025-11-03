/**
 * SEO Enhancement Script
 * Applies enhanced SEO to all books and blog articles
 * Run this script to ensure all content has proper cross-linking and SEO metadata
 */

import { books } from '@/data/books';
import { getRelatedBlogPostsForBook, getRelatedBooksForBlog } from '@/utils/seoCrossLinking';
import fs from 'fs';
import path from 'path';

const blogSlugs = [
  'beardmore-aviation-scottish-industrial-giant',
  'clydeside-aviation-revolution',
  'british-aircraft-great-war-rfc-rnas',
  'german-aircraft-great-war-development',
  'luftwaffe-1945-final-year',
  'me262-jet-fighter-revolution',
  'hms-argus-first-aircraft-carrier',
  'f86-sabre-cold-war-fighter',
  'sycamore-seeds-helicopter-evolution',
  'percy-pilcher-scotland-aviation-pioneer',
  'test-pilot-biography-eric-brown',
  'dieter-dengler-skyraider-escape',
  'maud-alsos-atomic-program',
  'british-nuclear-deterrent-v-force',
  'adolf-rohrbach-metal-aircraft-revolution',
  'morris-furniture-war-work-aviation',
  'dorothy-wordsworth-scottish-tour-1803',
  'lucy-lady-houston-schneider-trophy',
  'jet-age-aviation-cold-war-development',
];

/**
 * Generate SEO report for all books
 */
function generateBookSEOReport() {
  const report = {
    totalBooks: books.length,
    booksWithBlogLinks: 0,
    booksWithoutBlogLinks: [] as string[],
    booksWithCompleteMetadata: 0,
    booksNeedingMetadata: [] as string[],
    crossLinks: {} as Record<string, string[]>
  };

  books.forEach(book => {
    const relatedPosts = getRelatedBlogPostsForBook(book.id);
    report.crossLinks[book.id] = relatedPosts.map(p => p.slug);
    
    if (relatedPosts.length > 0) {
      report.booksWithBlogLinks++;
    } else {
      report.booksWithoutBlogLinks.push(book.id);
    }
    
    // Check if book has complete metadata
    const hasCompleteMetadata = 
      book.title &&
      book.description &&
      book.isbn &&
      book.category &&
      book.price;
    
    if (hasCompleteMetadata) {
      report.booksWithCompleteMetadata++;
    } else {
      report.booksNeedingMetadata.push(book.id);
    }
  });

  return report;
}

/**
 * Generate SEO report for all blog posts
 */
function generateBlogSEOReport() {
  const report = {
    totalBlogs: blogSlugs.length,
    blogsWithBookLinks: 0,
    blogsWithoutBookLinks: [] as string[],
    crossLinks: {} as Record<string, string[]>
  };

  blogSlugs.forEach(slug => {
    const relatedBooks = getRelatedBooksForBlog(slug);
    report.crossLinks[slug] = relatedBooks;
    
    if (relatedBooks.length > 0) {
      report.blogsWithBookLinks++;
    } else {
      report.blogsWithoutBookLinks.push(slug);
    }
  });

  return report;
}

/**
 * Generate comprehensive SEO enhancement report
 */
function generateSEOReport() {
  const bookReport = generateBookSEOReport();
  const blogReport = generateBlogSEOReport();
  
  const fullReport = {
    generatedAt: new Date().toISOString(),
    books: bookReport,
    blogs: blogReport,
    summary: {
      totalBooks: bookReport.totalBooks,
      totalBlogs: blogReport.totalBlogs,
      booksWithLinks: bookReport.booksWithBlogLinks,
      blogsWithLinks: blogReport.blogsWithBookLinks,
      coveragePercentage: {
        books: (bookReport.booksWithBlogLinks / bookReport.totalBooks * 100).toFixed(1),
        blogs: (blogReport.blogsWithBookLinks / blogReport.totalBlogs * 100).toFixed(1)
      }
    },
    recommendations: [] as string[]
  };

  // Generate recommendations
  if (bookReport.booksWithoutBlogLinks.length > 0) {
    fullReport.recommendations.push(
      `Create blog articles for ${bookReport.booksWithoutBlogLinks.length} books without blog links: ${bookReport.booksWithoutBlogLinks.join(', ')}`
    );
  }

  if (blogReport.blogsWithoutBookLinks.length > 0) {
    fullReport.recommendations.push(
      `Create book links for ${blogReport.blogsWithoutBookLinks.length} blog posts: ${blogReport.blogsWithoutBookLinks.join(', ')}`
    );
  }

  if (bookReport.booksNeedingMetadata.length > 0) {
    fullReport.recommendations.push(
      `Complete metadata for ${bookReport.booksNeedingMetadata.length} books: ${bookReport.booksNeedingMetadata.join(', ')}`
    );
  }

  return fullReport;
}

/**
 * Write SEO report to file
 */
function writeSEOReport() {
  const report = generateSEOReport();
  const reportPath = path.join(process.cwd(), 'seo-enhancement-report.json');
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`SEO report written to ${reportPath}`);
  
  return report;
}

// Export for use in other scripts
export {
  generateBookSEOReport,
  generateBlogSEOReport,
  generateSEOReport,
  writeSEOReport
};

// Run if executed directly
if (require.main === module) {
  const report = writeSEOReport();
  console.log('\n=== SEO Enhancement Report ===');
  console.log(`Total Books: ${report.summary.totalBooks}`);
  console.log(`Books with Blog Links: ${report.summary.booksWithLinks} (${report.summary.coveragePercentage.books}%)`);
  console.log(`Total Blogs: ${report.summary.totalBlogs}`);
  console.log(`Blogs with Book Links: ${report.summary.blogsWithLinks} (${report.summary.coveragePercentage.blogs}%)`);
  
  if (report.recommendations.length > 0) {
    console.log('\n=== Recommendations ===');
    report.recommendations.forEach(rec => console.log(`- ${rec}`));
  }
}

