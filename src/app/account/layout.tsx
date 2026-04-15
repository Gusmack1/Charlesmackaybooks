import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    background: 'var(--cream)',
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '40px',
    padding: '40px 24px',
    maxWidth: 1200,
    margin: '0 auto',
  } as React.CSSProperties,
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  navLink: {
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    textDecoration: 'none',
    color: 'var(--text-body)',
    transition: 'background 0.2s, color 0.2s',
  },
  content: {
    minHeight: 400,
  },
  '@media (max-width: 768px)': {
    container: {
      gridTemplateColumns: '1fr',
      gap: '24px',
    },
    nav: {
      flexDirection: 'row' as const,
      gap: '8px',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '16px',
    },
  },
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login?redirect_to=/account');
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <a
          href="/account"
          style={{
            ...styles.navLink,
            color: 'var(--navy)',
            fontWeight: 600,
          }}
        >
          Dashboard
        </a>
        <a
          href="/account/orders"
          style={{
            ...styles.navLink,
            color: 'var(--navy)',
            fontWeight: 600,
          }}
        >
          Orders
        </a>
        <a
          href="/account/addresses"
          style={{
            ...styles.navLink,
            color: 'var(--navy)',
            fontWeight: 600,
          }}
        >
          Addresses
        </a>
        <a
          href="/account/wishlist"
          style={{
            ...styles.navLink,
            color: 'var(--navy)',
            fontWeight: 600,
          }}
        >
          Wishlist
        </a>
        <form
          action={async () => {
            'use server';
            const supabase = await createClient();
            await supabase.auth.signOut();
            redirect('/');
          }}
          style={{ marginTop: '16px' }}
        >
          <button
            type="submit"
            style={{
              ...styles.navLink,
              background: 'var(--navy)',
              color: 'var(--cream)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
            }}
          >
            Sign Out
          </button>
        </form>
      </nav>
      <div style={styles.content}>{children}</div>
    </div>
  );
}
