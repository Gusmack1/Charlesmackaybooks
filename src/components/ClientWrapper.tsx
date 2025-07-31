'use client';

import { ReactNode } from 'react';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import BasketSidebar from '@/components/BasketSidebar';
import Analytics from '@/components/Analytics';
import { useCart } from '@/context/CartContext';

function BasketSidebarWrapper() {
  const { isBasketOpen, closeBasket } = useCart();
  return <BasketSidebar isOpen={isBasketOpen} onClose={closeBasket} />;
}

interface ClientWrapperProps {
  children?: ReactNode;
  pageType?: string;
}

export default function ClientWrapper({ children, pageType }: ClientWrapperProps) {
  return (
    <RecentlyViewedProvider>
      {children}
      <BasketSidebarWrapper />
      <Analytics />
    </RecentlyViewedProvider>
  );
}
