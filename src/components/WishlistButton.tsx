'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';

export default function WishlistButton({ bookId, session }: { bookId: string; session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!session?.user) {
      router.push(`/login?redirect_to=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (data.in_wishlist !== undefined) {
        setIsInWishlist(data.in_wishlist);
      } else {
        console.error('Wishlist error:', data.error);
      }
    } catch (err) {
      console.error('Wishlist request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        background: 'none',
        border: 'none',
        cursor: loading ? 'default' : 'pointer',
        color: isInWishlist ? 'var(--gold-dark)' : 'var(--text-muted)',
        fontSize: 14,
        fontWeight: 500,
        padding: '8px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        opacity: loading ? 0.6 : 1,
        transition: 'color 0.2s, opacity 0.2s',
      }}
    >
      <span style={{ fontSize: 16 }}>{isInWishlist ? '♥' : '♡'}</span>
      {isInWishlist ? 'Saved' : 'Save'}
    </button>
  );
}
