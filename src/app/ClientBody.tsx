"use client";

import { useEffect } from "react";
import { CartProvider } from '../context/CartContext';
import { RecentlyViewedProvider } from '../context/RecentlyViewedContext';
import CartSidebar from '../components/CartSidebar';
import MobileSSLFix from '../components/MobileSSLFix';
// LiveChat removed per request

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

  const sslWrapperEnabled = process.env.NEXT_PUBLIC_ENABLE_MOBILE_SSL_FIX === 'true';

  const content = (
    <CartProvider>
      <RecentlyViewedProvider>
        {children}
        <CartSidebar />
      </RecentlyViewedProvider>
    </CartProvider>
  );

  return (
    <body suppressHydrationWarning className="antialiased">
      {sslWrapperEnabled ? <MobileSSLFix>{content}</MobileSSLFix> : content}
    </body>
  );
}
