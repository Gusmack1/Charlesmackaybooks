import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { setMarketingOptIn } from '../actions';

export const metadata: Metadata = {
  title: 'Marketing preferences, Charles Mackay Books',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

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
  } as React.CSSProperties,
  card: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    background: 'var(--white)',
  } as React.CSSProperties,
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 24,
  } as React.CSSProperties,
  label: {
    fontFamily: 'var(--font-serif)',
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 6,
  } as React.CSSProperties,
  desc: {
    fontSize: 14,
    color: 'var(--text-body)',
    lineHeight: 1.5,
  } as React.CSSProperties,
  status: {
    marginTop: 16,
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 13,
    background: 'var(--cream)',
    color: 'var(--text-muted)',
  } as React.CSSProperties,
  submit: {
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--navy)',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  } as React.CSSProperties,
};

export default async function MarketingPreferencesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('marketing_opt_in, marketing_opt_in_ts, marketing_opt_in_source')
    .eq('id', user.id)
    .maybeSingle();

  const optedIn: boolean = profile?.marketing_opt_in === true;
  const optTs: string | null = profile?.marketing_opt_in_ts ?? null;
  const optSource: string | null = profile?.marketing_opt_in_source ?? null;

  // Server action: flip to the opposite of the current state.
  async function toggle() {
    'use server';
    await setMarketingOptIn(!optedIn);
  }

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(iso));

  return (
    <div>
      <h1 style={styles.heading}>Marketing preferences</h1>
      <p style={styles.subtext}>
        Choose whether to hear from Charles Mackay Books. We&rsquo;ll only ever
        email you about new titles and the occasional behind-the-scenes note
        from the workshop. See our{' '}
        <Link href="/privacy" style={{ color: 'var(--gold-dark)' }}>
          Privacy Policy
        </Link>{' '}
        for what we do with your email.
      </p>

      <div style={styles.card}>
        <form action={toggle}>
          <div style={styles.row}>
            <div>
              <div style={styles.label}>
                {optedIn
                  ? 'You are subscribed to occasional updates.'
                  : 'You are not subscribed to marketing emails.'}
              </div>
              <p style={styles.desc}>
                {optedIn
                  ? 'You can unsubscribe at any time using the button on the right or the link at the bottom of any email we send.'
                  : 'Tick the box at checkout, or click Subscribe here, to start receiving occasional updates.'}
              </p>
            </div>
            <button type="submit" style={styles.submit}>
              {optedIn ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </div>
        </form>

        {optTs && (
          <div style={styles.status}>
            Last updated {formatDate(optTs)}
            {optSource ? ` via ${optSource}` : ''}.
          </div>
        )}
      </div>
    </div>
  );
}
