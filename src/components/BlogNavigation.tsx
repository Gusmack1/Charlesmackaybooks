import Link from 'next/link'

interface BlogNavigationProps {
  title?: string;
}

export default function BlogNavigation({ title }: BlogNavigationProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Charles Books
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Blogs
          </Link>
          {title && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">{title}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
