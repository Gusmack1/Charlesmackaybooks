'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function WishlistButton({
  bookId,
  isAuthenticated,
  initialInWishlist = false,
}: {
  bookId: string;
  isAuthenticated: boolean;
  initialInWishlist?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect_to=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (res.ok && typeof data.in_wishlist === 'boolean') {
        setIsInWishlist(data.in_wishlist);
      } else {
        setErrorMsg(data.error || 'Failed to update wishlist');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {errorMsg && (
      <div style={{ color: '#900', fontSize: 12, marginBottom: 6 }}>{errorMsg}</div>
    )}
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
    </>
  );
}
