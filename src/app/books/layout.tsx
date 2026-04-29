import type { Metadata } from 'next';
import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Buy Aviation History Books, 20 Titles from £9.95',
  description: 'Buy 20 aviation history books by Charles E. MacKay. Scottish aviation, Beardmore, Clydeside, WWI & WWII aircraft, Luftwaffe, helicopters. Royal Mail tracked shipping worldwide.',
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'Aviation History Books by Charles E. MacKay',
    description: 'Browse 20 titles covering Scottish aviation, WWI/WWII aircraft, military history, and more. Royal Mail tracked shipping worldwide.',
    url: 'https://charlesmackaybooks.com/books',
  },
};

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Aviation History Books by Charles E. MacKay',
    url: 'https://charlesmackaybooks.com/books',
    description: 'Definitive histories of Scottish aviation and military aircraft.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: books.length,
      itemListElement: books.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://charlesmackaybooks.com/books/${b.id}`,
        name: b.title,
      })),
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://charlesmackaybooks.com' },
      { '@type': 'ListItem', position: 2, name: 'Books', item: 'https://charlesmackaybooks.com/books' },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  );
}
