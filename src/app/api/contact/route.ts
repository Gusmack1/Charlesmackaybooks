// POST /api/contact — wires the /contact form to Resend, delivering to
// info@charlesmackaybooks.com (which forwards via ImprovMX to Angus + Charles).
// V2 priorities #2. Brain refs: #900 (Resend wired, send.charlesmackaybooks.com,
// orders@ from), #898 / #899 (info@ inbound forwarding).

import { NextRequest, NextResponse } from 'next/server';
import { renderContact, type ContactEmailData } from '@/lib/email/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Simple in-memory per-IP rate limit: 5 requests / hour / IP. Resets on cold start.
// Sufficient for v1; Supabase-backed limiter is deferred per scope.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipBuckets: Map<string, number[]> = (globalThis as unknown as { __cmbContactBuckets?: Map<string, number[]> }).__cmbContactBuckets
  || new Map<string, number[]>();
(globalThis as unknown as { __cmbContactBuckets?: Map<string, number[]> }).__cmbContactBuckets = ipBuckets;

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for') || '';
  const first = xff.split(',')[0]?.trim();
  if (first) return first;
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const arr = (ipBuckets.get(ip) || []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    ipBuckets.set(ip, arr);
    return true;
  }
  arr.push(now);
  ipBuckets.set(ip, arr);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ParsedBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  hp: string;
}

function parseBody(raw: unknown): { ok: true; data: ParsedBody } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Invalid body' };
  const r = raw as Record<string, unknown>;
  const name = typeof r.name === 'string' ? r.name.trim() : '';
  const email = typeof r.email === 'string' ? r.email.trim() : '';
  const subject = typeof r.subject === 'string' ? r.subject.trim() : '';
  const message = typeof r.message === 'string' ? r.message.trim() : '';
  const hp = typeof r.hp === 'string' ? r.hp : '';
  if (name.length < 1 || name.length > 100) return { ok: false, error: 'Name must be 1 to 100 characters.' };
  if (!EMAIL_RE.test(email) || email.length > 200) return { ok: false, error: 'Please enter a valid email address.' };
  if (subject.length < 1 || subject.length > 200) return { ok: false, error: 'Please choose a topic.' };
  if (message.length < 1 || message.length > 5000) return { ok: false, error: 'Message must be 1 to 5000 characters.' };
  return { ok: true, data: { name, email, subject, message, hp } };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { name, email, subject, message, hp } = parsed.data;

  // Honeypot: silently accept (200) so bots do not retry, but skip send.
  if (hp && hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from your network. Please try again in an hour or email info@charlesmackaybooks.com directly.' },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form: RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Email service unavailable. Please email info@charlesmackaybooks.com directly.' }, { status: 500 });
  }

  const data: ContactEmailData = {
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString(),
    ipHint: ip !== 'unknown' ? ip : undefined,
  };
  const { subject: emailSubject, html, text } = renderContact(data);

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Charles Mackay Books contact <orders@charlesmackaybooks.com>',
        to: ['info@charlesmackaybooks.com'],
        reply_to: email,
        subject: emailSubject,
        html,
        text,
      }),
    });
    if (!resp.ok) {
      const errBody = await resp.text().catch(() => '');
      console.error(`Contact form Resend send failed: HTTP ${resp.status} ${errBody}`);
      return NextResponse.json({ error: 'Could not send your message. Please email info@charlesmackaybooks.com directly.' }, { status: 502 });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'unknown';
    console.error('Contact form send error:', msg);
    return NextResponse.json({ error: 'Could not send your message. Please email info@charlesmackaybooks.com directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
