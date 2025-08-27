import Link from 'next/link';
import { books } from '@/data/books';
import { Book } from '@/types/book';

interface InternalLinkOptimizerProps {
  currentPage?: string;
  currentCategory?: string;
  currentBook?: string;
}

export default function InternalLinkOptimizer({
  currentPage,
  currentCategory,
  currentBook
}: InternalLinkOptimizerProps) {

  // SEO-optimized internal linking strategy
  const getRelatedLinks = () => {
    const links = [];

    // Always include high-priority pages
    if (currentPage !== 'home') {
      links.push({
        href: '/',
        text: 'Charles MacKay Aviation Books',
        description: 'Browse all authentic aviation history books',
        priority: 'high'
      });
    }

    // Category-based internal linking
    if (currentCategory) {
      // Add related categories
      const relatedCategories = getRelatedCategories(currentCategory);
      relatedCategories.forEach(category => {
        links.push({
          href: `/category/${category.slug}`,
          text: category.name,
          description: category.description,
          priority: 'medium'
        });
      });
    }

    // Book-based internal linking
    if (currentBook) {
      const book = books.find(b => b.id === currentBook);
      if (book) {
        // Add category link
        links.push({
          href: `/category/${book.category.toLowerCase().replace(/ /g, '-')}`,
          text: `${book.category} Books`,
          description: `More books in ${book.category}`,
          priority: 'high'
        });

        // Add related books
        const relatedBooks = getRelatedBooks(book);
        relatedBooks.slice(0, 3).forEach(relatedBook => {
          links.push({
            href: `/books/${relatedBook.id}`,
            text: relatedBook.title,
            description: `${relatedBook.title} by Charles MacKay`,
            priority: 'medium'
          });
        });
      }
    }

    // Add high-value content pages
    if (currentPage !== 'research-guides') {
      links.push({
        href: '/research-guides',
        text: 'Aviation Research Guides',
        description: 'Comprehensive aviation research resources',
        priority: 'high'
      });
    }

    if (currentPage !== 'aviation-glossary') {
      links.push({
        href: '/aviation-glossary',
        text: 'Aviation Glossary',
        description: '500+ aviation terms and definitions',
        priority: 'high'
      });
    }

    if (currentPage !== 'scottish-aviation-timeline') {
      links.push({
        href: '/scottish-aviation-timeline',
        text: 'Scottish Aviation Timeline',
        description: 'Complete Scottish aviation history 1903-2023',
        priority: 'high'
      });
    }

    return links;
  };

  const getRelatedCategories = (currentCategory: string) => {
    const categoryMap: { [key: string]: Array<{ name: string; slug: string; description: string }> } = {
      'scottish-aviation-history': [
        { name: 'WWI Aviation', slug: 'wwi-aviation', description: 'World War I aircraft and pilots' },
        { name: 'Aviation History', slug: 'aviation-history', description: 'General aviation development' },
        { name: 'Industrial History', slug: 'industrial-history', description: 'Aviation manufacturing' }
      ],
      'wwi-aviation': [
        { name: 'WWII Aviation', slug: 'wwii-aviation', description: 'World War II aircraft' },
        { name: 'Military History', slug: 'military-history', description: 'Military aviation development' },
        { name: 'Aviation Biography', slug: 'aviation-biography', description: 'Famous pilots and pioneers' }
      ],
      'wwii-aviation': [
        { name: 'WWI Aviation', slug: 'wwi-aviation', description: 'Great War aircraft' },
        { name: 'Jet Age Aviation', slug: 'jet-age-aviation', description: 'Early jet aircraft' },
        { name: 'Naval Aviation', slug: 'naval-aviation', description: 'Aircraft carriers and naval planes' }
      ],
      'aviation-biography': [
        { name: 'WWI Aviation', slug: 'wwi-aviation', description: 'Great War pilots' },
        { name: 'WWII Aviation', slug: 'wwii-aviation', description: 'WWII aces and heroes' },
        { name: 'Scottish Aviation History', slug: 'scottish-aviation-history', description: 'Scottish aviation pioneers' }
      ]
    };

    return categoryMap[currentCategory] || [];
  };

  const getRelatedBooks = (currentBook: Book) => {
    return books
      .filter(book =>
        book.id !== currentBook.id &&
        (book.category === currentBook.category ||
         book.tags?.some(tag => currentBook.tags?.includes(tag)))
      )
      .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
  };

  const links = getRelatedLinks();

  if (links.length === 0) return null;

  return (
    <nav className="bg-white rounded-lg p-4 shadow-sm mt-6" aria-label="Related content">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        📚 Related Aviation Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.slice(0, 6).map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`block p-3 rounded-lg border transition-colors hover:bg-blue-50 hover:border-blue-300 ${
              link.priority === 'high'
                ? 'border-blue-200 bg-blue-25'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            title={link.description}
          >
            <span className="font-medium text-blue-700 hover:text-blue-800">
              {link.text}
            </span>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      {/* SEO breadcrumb navigation */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Aviation Books Home
          </Link>

          {currentCategory && (
            <>
              <span className="mx-2">•</span>
              <Link
                href={`/category/${currentCategory}`}
                className="hover:text-blue-600"
              >
                {currentCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            </>
          )}

          {currentBook && (
            <>
              <span className="mx-2">•</span>
              <span className="text-gray-800">Current Book</span>
            </>
          )}
        </div>
      </div>

      {/* Hidden SEO-friendly links for search engines */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <ul>
          <li><Link href="/how-to-order">How to Order Aviation Books</Link></li>
          <li><Link href="/for-researchers">Aviation Research Resources</Link></li>
          <li><Link href="/aviation-bibliography">Aviation Bibliography</Link></li>
          <li><Link href="/academic-resources">Academic Aviation Resources</Link></li>
          <li><Link href="/contact">Contact Aviation Historian Charles MacKay</Link></li>
        </ul>
      </div>
    </nav>
  );
}

// SEO-optimized footer navigation component
export function SEOFooterNavigation() {
  return (
    <div className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Book Categories */}
          <div>
            <h3 className="font-semibold mb-3">Aviation Book Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/scottish-aviation-history" className="hover:text-blue-300">Scottish Aviation History</Link></li>
              <li><Link href="/category/wwi-aviation" className="hover:text-blue-300">WWI Aviation Books</Link></li>
              <li><Link href="/category/wwii-aviation" className="hover:text-blue-300">WWII Aviation Books</Link></li>
              <li><Link href="/category/aviation-biography" className="hover:text-blue-300">Aviation Biographies</Link></li>
              <li><Link href="/category/helicopter-history" className="hover:text-blue-300">Helicopter History</Link></li>
            </ul>
          </div>

          {/* Research Resources */}
          <div>
            <h3 className="font-semibold mb-3">Research Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/research-guides" className="hover:text-blue-300">Aviation Research Guides</Link></li>
              <li><Link href="/aviation-glossary" className="hover:text-blue-300">Aviation Glossary</Link></li>
              <li><Link href="/aviation-bibliography" className="hover:text-blue-300">Aviation Bibliography</Link></li>
              <li><Link href="/scottish-aviation-timeline" className="hover:text-blue-300">Scottish Aviation Timeline</Link></li>
              <li><Link href="/academic-resources" className="hover:text-blue-300">Academic Resources</Link></li>
            </ul>
          </div>

          {/* Aircraft Resources replaced with blog equivalents */}
          <div>
            <h3 className="font-semibold mb-3">Aircraft Articles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/bristol-fighter-f2b-brisfit" className="hover:text-blue-300">Bristol F2B Fighter</Link></li>
              <li><Link href="/blog/sopwith-camel-wwi-fighter" className="hover:text-blue-300">Sopwith Camel</Link></li>
              <li><Link href="/blog/hawker-hurricane-fighter-development" className="hover:text-blue-300">Hawker Hurricane</Link></li>
              <li><Link href="/aviation-news" className="hover:text-blue-300">Aviation News</Link></li>
              <li><Link href="/partnerships/imperial-war-museum" className="hover:text-blue-300">Museum Partnerships</Link></li>
            </ul>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-to-order" className="hover:text-blue-300">How to Order Books</Link></li>
              <li><Link href="/faq" className="hover:text-blue-300">Frequently Asked Questions</Link></li>
              <li><Link href="/about" className="hover:text-blue-300">About Charles MacKay</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300">Contact Information</Link></li>
              <li><Link href="/for-researchers" className="hover:text-blue-300">For Researchers</Link></li>
            </ul>
          </div>
        </div>

        {/* SEO-focused footer text */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            Charles E. MacKay Aviation Books - Authentic aviation history books by renowned historian Charles E. MacKay.
            Specializing in Scottish aviation heritage, WWI & WWII aircraft, military aviation history.
            Based in Glasgow, Scotland. Worldwide shipping available.
          </p>
        </div>
      </div>
    </div>
  );
}
