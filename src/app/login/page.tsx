'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Charles E. MacKay Books',
  description: 'Sign in to your account to view your orders and manage your profile.',
  alternates: { canonical: '/login' },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const supabase = createClient();

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.href = '/account';
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: magicError } = await supabase.auth.signInWithOtp({
        email: magicLinkEmail,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (magicError) throw magicError;
      setMagicLinkSent(true);
      setMagicLinkEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', background: 'var(--cream)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--navy)', marginBottom: 8, fontWeight: 700 }}>Sign In</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Access your orders and account</p>
        </div>

        {magicLinkSent ? (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'white', fontSize: 24 }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-dark)', marginBottom: 8 }}>Check your email</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>We've sent a sign-in link to <strong>{magicLinkEmail}</strong>. Click it to access your account.</p>
            <button onClick={() => setMagicLinkSent(false)} style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Send another link</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 32 }}>
            {/* Email + Password */}
            <form onSubmit={handleEmailPassword} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
              {error && <div style={{ background: 'rgba(185,64,64,0.08)', border: '1px solid var(--error)', color: 'var(--error)', padding: 12, borderRadius: 'var(--radius-md)', fontSize: 13, marginBottom: 16 }}>{error}</div>}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="charles@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: 13,
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-dark)',
                  }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="password" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: 13,
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-dark)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--navy)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Link href="/forgot-password" style={{ fontSize: 13, color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
              </div>
            </form>

            {/* Magic Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Or sign in with a magic link</p>
              <form onSubmit={handleMagicLink}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <input
                    type="email"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      fontSize: 13,
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-dark)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '10px 16px',
                      background: 'var(--gold)',
                      color: 'var(--navy)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    Email me a link
                  </button>
                </div>
              </form>
            </div>

            {/* Sign up link */}
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
              Don't have an account? <Link href="/signup" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
