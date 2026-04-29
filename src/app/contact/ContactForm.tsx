'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const SUBJECTS = ['Order question', 'Book research enquiry', 'Other'] as const;

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  fontSize: 14,
  fontFamily: 'var(--font-sans)',
  color: 'var(--text-body)',
  background: 'var(--white)',
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, hp }),
      });
      const j = (await resp.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!resp.ok || !j.ok) {
        setErrorMsg(j.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-dark)', marginBottom: 8 }}>Message sent</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
          Thanks. We will reply within 1 to 2 working days.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          If your enquiry is urgent you can also email{' '}
          <a href="mailto:info@charlesmackaybooks.com" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>
            info@charlesmackaybooks.com
          </a>{' '}
          directly.
        </p>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      onSubmit={onSubmit}
      style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}
      noValidate
    >
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-dark)', marginBottom: 4 }}>Send a message</h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        Fill in the form below and Charles will get back to you.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="contact-name" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="contact-email" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>
          Email address
        </label>
        <input
          id="contact-email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="contact-subject" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>
          Topic
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="contact-message" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can Charles help you?"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
        />
      </div>

      {/* Honeypot field. Hidden from users via inline style + aria-hidden + tabIndex.
          Real browsers leave it blank; spam bots fill it and we silently 200. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="contact-hp">Leave blank</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      {status === 'error' && errorMsg && (
        <div role="alert" style={{ background: '#fff4f4', border: '1px solid #f3c4c4', borderRadius: 'var(--radius-md)', padding: 12, marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#7a1a1a', lineHeight: 1.5 }}>
            {errorMsg}{' '}
            <a href="mailto:info@charlesmackaybooks.com" style={{ color: '#7a1a1a', textDecoration: 'underline' }}>
              Email info@charlesmackaybooks.com instead
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        style={{
          width: '100%',
          padding: 14,
          background: 'var(--gold)',
          color: 'var(--navy)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: 14,
          fontWeight: 600,
          cursor: sending ? 'not-allowed' : 'pointer',
          opacity: sending ? 0.7 : 1,
        }}
      >
        {sending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
