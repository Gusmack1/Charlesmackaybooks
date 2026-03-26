import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Books',
  description: 'Browse all 20 aviation history books by Charles E. MacKay. Scottish aviation, WWI & WWII aircraft, helicopters, naval ops, and more. Free worldwide shipping.',
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'Aviation History Books by Charles E. MacKay',
    description: 'Browse 20 titles covering Scottish aviation, WWI/WWII aircraft, military history, and more. Free worldwide shipping.',
    url: 'https://charlesmackaybooks.com/books',
  },
};

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
