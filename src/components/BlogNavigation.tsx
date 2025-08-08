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
            className="text-accent-blue hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Charles Books
          </Link>
          <span className="text-muted">|</span>
          <Link
            href="/blog"
            className="text-accent-blue hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Blogs
          </Link>
          {title && (
            <>
              <span className="text-muted">|</span>
              <span className="text-secondary">{title}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
