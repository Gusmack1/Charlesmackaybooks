import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

const styles = {
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 8,
  } as React.CSSProperties,
  subtext: {
    fontSize: 15,
    color: 'var(--text-muted)',
    marginBottom: 32,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    marginTop: 32,
  } as React.CSSProperties,
  card: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    background: 'var(--white)',
  } as React.CSSProperties,
  cardTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 8,
  } as React.CSSProperties,
  cardValue: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--gold)',
    marginBottom: 16,
  } as React.CSSProperties,
  cardLink: {
    color: 'var(--gold)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  section: {
    marginTop: 40,
    marginBottom: 40,
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 16,
  } as React.CSSProperties,
  orderSummary: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 20,
    background: 'var(--white)',
  } as React.CSSProperties,
  orderRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    gap: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)',
  } as React.CSSProperties,
};

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  const session = { user };

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  // Get order count
  const { data: orders, count: orderCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id);

  // Get last order
  const { data: lastOrder } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  // Get last order items if exists
  let lastOrderItems: any[] = [];
  if (lastOrder) {
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', lastOrder.id);
    lastOrderItems = items || [];
  }

  // Get addresses count
  const { data: addresses, count: addressCount } = await supabase
    .from('addresses')
    .select('*', { count: 'exact' })
    .eq('user_id', session.user.id);

  // Get wishlist count
  const { data: wishlist, count: wishlistCount } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact' })
    .eq('user_id', session.user.id);

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  const formatCurrency = (pennies: number) =>
    `£${(pennies / 100).toFixed(2)}`;
  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(
      new Date(dateString)
    );

  return (
    <div>
      <h1 style={styles.heading}>Welcome back, {firstName}</h1>
      <p style={styles.subtext}>
        Manage your orders, addresses, and wishlist
      </p>

      {/* Stats Cards */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Orders</h3>
          <div style={styles.cardValue}>{orderCount || 0}</div>
          <a href="/account/orders" style={styles.cardLink}>
            View all →
          </a>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Saved Addresses</h3>
          <div style={styles.cardValue}>{addressCount || 0}</div>
          <a href="/account/addresses" style={styles.cardLink}>
            Manage →
          </a>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Wishlist</h3>
          <div style={styles.cardValue}>{wishlistCount || 0}</div>
          <a href="/account/wishlist" style={styles.cardLink}>
            View →
          </a>
        </div>
      </div>

      {/* Last Order */}
      {lastOrder && lastOrderItems.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Last Order</h2>
          <div style={styles.orderSummary}>
            <div style={styles.orderRow}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Order ID
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {lastOrder.id.substring(0, 8).toUpperCase()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Date
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {formatDate(lastOrder.created_at)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Total
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {formatCurrency(lastOrder.total_pennies)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                Items ({lastOrderItems.length})
              </div>
              {lastOrderItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 4,
                  }}
                >
                  <span>{item.title}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <Link href={`/account/orders/${lastOrder.id}`}>
                <span style={styles.cardLink}>
                  View order details →
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* No orders yet */}
      {!lastOrder && (
        <div style={styles.section}>
          <div style={styles.orderSummary}>
            <p style={{ color: 'var(--text-muted)' }}>
              No orders yet —{' '}
              <Link href="/books">
                <span style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>
                  browse the library →
                </span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
