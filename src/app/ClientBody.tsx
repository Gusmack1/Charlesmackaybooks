"use client";

import { useEffect } from "react";
import { CartProvider } from '@/context/CartContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import CartSidebar from '@/components/CartSidebar';
import LiveChat from '@/components/LiveChat';

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body suppressHydrationWarning className="antialiased">
      <CartProvider>
        <RecentlyViewedProvider>
          {children}
          <CartSidebar />
          <LiveChat />
        </RecentlyViewedProvider>
      </CartProvider>
    </body>
  );
}
