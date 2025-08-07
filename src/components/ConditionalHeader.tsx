'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on blog posts (but not blog index page)
  const shouldHideHeader = pathname.startsWith('/blog/') && pathname !== '/blog';
  
  if (shouldHideHeader) {
    return null;
  }
  
  return (
    <div className="header-container">
      <Header />
    </div>
  );
}