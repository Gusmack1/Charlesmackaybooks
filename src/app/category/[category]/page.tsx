import { notFound } from 'next/navigation';
import { books, categories, categoryDescriptions } from '@/data/books';
import Footer from '@/components/Footer';
import CategoryPageContent from '@/components/CategoryPageContent';
import CategoryAnalytics from '@/components/CategoryAnalytics';
import UnifiedSchema from '@/components/UnifiedSchema';
import type { Metadata } from 'next';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = categories.find(c => c.toLowerCase().replace(/ /g, '-') === category);

  if (!categoryName) {
    return {
      title: 'Category Not Found',
    }
  }

  const description = categoryDescriptions[categoryName] || `Browse books in the ${categoryName} category.`;

  return {
    title: `${categoryName} | Charles E. MacKay Aviation Books`,
    description: `Discover a collection of books on ${categoryName}. ${description}`,
    alternates: {
      canonical: `https://charlesmackaybooks.com/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = categories.find(c => c.toLowerCase().replace(/ /g, '-') === category);

  if (!categoryName) {
    notFound();
  }

  const booksInCategory = books.filter(book => book.category === categoryName);
  const description = categoryDescriptions[categoryName];

  return (
    <>
      {/* Analytics tracking for category page */}
      <CategoryAnalytics
        categoryName={categoryName}
        bookCount={booksInCategory.length}
        categorySlug={category}
      />

      {/* Unified Schema for SEO */}
      <UnifiedSchema
        pageType="category"
        pageTitle={`${categoryName} | Charles E. MacKay Aviation Books`}
        pageDescription={`Discover a collection of books on ${categoryName}. ${description || ''}`}
        pageUrl={`/category/${category}`}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex text-sm flex-wrap">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="mx-2">/</li>
              <li><span className="font-semibold text-gray-800">{categoryName}</span></li>
            </ol>
          </nav>

          <CategoryPageContent
            books={booksInCategory}
            categoryName={categoryName}
            description={description}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
