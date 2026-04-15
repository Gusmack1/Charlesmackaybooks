import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

const styles = {
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 24,
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    borderSpacing: 0,
  } as React.CSSProperties,
  thead: {
    borderBottom: '2px solid var(--border)',
  } as React.CSSProperties,
  th: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  td: {
    padding: '16px',
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
  } as React.CSSProperties,
  orderRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto auto',
    gap: 16,
    padding: '16px 0',
    borderBottom: '1px solid var(--border)',
    alignItems: 'center',
  } as React.CSSProperties,
  idCell: {
    fontFamily: 'var(--font-mono, monospace)',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--navy)',
  } as React.CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,
  link: {
    color: 'var(--gold)',
    textDecoration: 'none',
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: 40,
    color: 'var(--text-muted)',
  } as React.CSSProperties,
};

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const formatCurrency = (pennies: number) =>
    `£${(pennies / 100).toFixed(2)}`;
  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(
      new Date(dateString)
    );

  const getStatusBadge = (status: string, provider: string) => {
    let bgColor = 'var(--border)';
    let textColor = 'var(--text-body)';

    if (status === 'completed' || status === 'paid') {
      bgColor = 'var(--success)';
      textColor = 'var(--white)';
    } else if (status === 'pending') {
      bgColor = 'var(--gold-light)';
      textColor = 'var(--navy)';
    }

    return (
      <div
        style={{
          ...styles.badge,
          background: bgColor,
          color: textColor,
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  const getProviderBadge = (provider: string) => {
    const providerName = provider === 'stripe' ? 'Stripe' : 'PayPal';
    return (
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        via {providerName}
      </span>
    );
  };

  if (!orders || orders.length === 0) {
    return (
      <div>
        <h1 style={styles.heading}>Orders</h1>
        <div style={styles.empty}>
          <p>
            No orders yet —{' '}
            <Link href="/books">
              <span style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
                browse the library →
              </span>
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={styles.heading}>Orders</h1>
      <div>
        {orders.map((order) => (
          <Link key={order.id} href={`/account/orders/${order.id}`}>
            <div style={styles.orderRow}>
              <span style={styles.idCell}>
                {order.id.substring(0, 8).toUpperCase()}
              </span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {formatDate(order.created_at)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>
                  {formatCurrency(order.total_pennies)}
                </div>
              </div>
              <div>{getStatusBadge(order.status, order.provider)}</div>
              <div>{getProviderBadge(order.provider)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
