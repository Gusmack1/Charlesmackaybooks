'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('sending');
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString(),
      });
      window.location.href = '/newsletter-thanks';
    } catch {
      alert('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, background: 'var(--white)' }}
      />
      <button
        onClick={handleSubmit}
        disabled={status === 'sending'}
        style={{ padding: '12px 24px', background: status === 'sending' ? '#999' : 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        {status === 'sending' ? 'Sending…' : 'Subscribe'}
      </button>
    </div>
  );
}
