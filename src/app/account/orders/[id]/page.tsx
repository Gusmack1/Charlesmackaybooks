import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

const styles = {
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 8,
  } as React.CSSProperties,
  subtext: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 32,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 32,
    marginTop: 32,
  } as React.CSSProperties,
  section: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    background: 'var(--white)',
    marginBottom: 24,
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)',
  } as React.CSSProperties,
  itemRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    gap: 16,
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
  } as React.CSSProperties,
  itemTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-dark)',
  } as React.CSSProperties,
  itemPrice: {
    fontSize: 14,
    color: 'var(--text-body)',
    textAlign: 'right' as const,
  } as React.CSSProperties,
  totalRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 16,
    padding: '16px 0',
    marginTop: 16,
    fontSize: 14,
    fontWeight: 600,
  } as React.CSSProperties,
  address: {
    fontSize: 14,
    lineHeight: 1.6,
    color: 'var(--text-body)',
  } as React.CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 12,
    fontWeight: 600,
    background: 'var(--success)',
    color: 'var(--white)',
    marginBottom: 16,
  } as React.CSSProperties,
  backLink: {
    color: 'var(--gold)',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', session.user.id)
    .single();

  if (!order) {
    notFound();
  }

  const { data: items } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', order.id);

  const formatCurrency = (pennies: number) =>
    `£${(pennies / 100).toFixed(2)}`;
  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(
      new Date(dateString)
    );

  const shippingAddr = order.shipping_address as any;

  return (
    <div>
      <Link href="/account/orders">
        <span style={styles.backLink}>← Back to orders</span>
      </Link>

      <h1 style={styles.heading}>Order {order.id.substring(0, 8).toUpperCase()}</h1>
      <p style={styles.subtext}>{formatDate(order.created_at)}</p>

      <div style={styles.grid}>
        {/* Left Column: Items & Address */}
        <div>
          {/* Items */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Items</h2>
            {items?.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <div style={styles.itemTitle}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  x{item.quantity}
                </div>
                <div style={styles.itemPrice}>
                  {formatCurrency(item.unit_price_pennies * item.quantity)}
                </div>
              </div>
            ))}
            <div style={styles.totalRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal_pennies)}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Shipping</span>
              <span>{formatCurrency(order.shipping_pennies)}</span>
            </div>
            <div
              style={{
                ...styles.totalRow,
                borderTop: '1px solid var(--border)',
                paddingTop: 16,
                fontSize: 16,
                color: 'var(--navy)',
              }}
            >
              <span>Total</span>
              <span>{formatCurrency(order.total_pennies)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          {shippingAddr && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping Address</h2>
              <div style={styles.address}>
                {shippingAddr.line1}
                {shippingAddr.line2 && (
                  <>
                    <br />
                    {shippingAddr.line2}
                  </>
                )}
                <br />
                {shippingAddr.city}, {shippingAddr.postcode}
                <br />
                {shippingAddr.country}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Status & Provider */}
        <div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Status</h2>
            <div
              style={{
                ...styles.badge,
                background:
                  order.status === 'completed' || order.status === 'paid'
                    ? 'var(--success)'
                    : 'var(--gold-light)',
                color:
                  order.status === 'completed' || order.status === 'paid'
                    ? 'var(--white)'
                    : 'var(--navy)',
              }}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              {order.status === 'completed' || order.status === 'paid'
                ? 'Your order has been processed successfully.'
                : 'Your order is pending.'}
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Payment Method</h2>
            <div style={{ fontSize: 14, color: 'var(--text-body)' }}>
              {order.provider === 'stripe' ? 'Stripe' : 'PayPal'}
            </div>
            <div
              style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}
            >
              Order ID: {order.provider_order_id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
