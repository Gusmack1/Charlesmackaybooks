'use client';

import { useEffect } from 'react';

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Account section error:', error);
  }, [error]);

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--navy)', marginBottom: 16 }}>
        Something went wrong
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
        {error.message || 'Unknown error'}
      </p>
      {error.digest && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          Digest: <code>{error.digest}</code>
        </p>
      )}
      <pre style={{ background: '#f7f3ea', padding: 16, borderRadius: 8, fontSize: 12, overflow: 'auto', maxHeight: 400, border: '1px solid #e5e0d3' }}>
        {error.stack || String(error)}
      </pre>
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button onClick={reset} style={{ padding: '10px 20px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Try again
        </button>
        <a href="/" style={{ padding: '10px 20px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          Home
        </a>
      </div>
    </div>
  );
}
