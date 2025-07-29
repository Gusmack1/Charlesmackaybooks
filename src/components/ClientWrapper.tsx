'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import BasketSidebar from '@/components/BasketSidebar';
import Analytics from '@/components/Analytics';
import { useCart } from '@/context/CartContext';

function BasketSidebarWrapper() {
  const { isBasketOpen, closeBasket } = useCart();
  return <BasketSidebar isOpen={isBasketOpen} onClose={closeBasket} />;
}

interface ClientWrapperProps {
  children?: React.ReactNode;
  pageType?: string;
}

export default function ClientWrapper({ children, pageType }: ClientWrapperProps) {
  return (
    <CartProvider>
      <RecentlyViewedProvider>
        {children}
        <BasketSidebarWrapper />
        <Analytics />
      </RecentlyViewedProvider>
    </CartProvider>
  );
}
