'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  // Always show the header site-wide (menu is required on every page)
  return (
    <div className="header-container">
      <Header />
    </div>
  );
}