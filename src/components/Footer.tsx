import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '48px 24px 24px', color: 'rgba(255,255,255,0.6)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>CM</div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, color: 'white' }}>Charles E. MacKay</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>Scotland&apos;s foremost aviation historian. 20+ meticulously researched books on aviation heritage.</p>
        </div>
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 16 }}>Books</h4>
          <ul style={{ listStyle: 'none' }}>
            {['All Books', 'Scottish Aviation', 'WWI Aviation', 'WWII Aviation'].map(t => (
              <li key={t} style={{ marginBottom: 10 }}><Link href="/books" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{t}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 16 }}>Help</h4>
          <ul style={{ listStyle: 'none' }}>
            {['How to Order', 'Shipping Info', 'Returns', 'Contact'].map(t => (
              <li key={t} style={{ marginBottom: 10 }}><Link href="/contact" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{t}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 16 }}>About</h4>
          <ul style={{ listStyle: 'none' }}>
            {['About Charles', 'Research Guides'].map(t => (
              <li key={t} style={{ marginBottom: 10 }}><Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{t}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
        <span>&copy; 2026 Charles E. MacKay. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Visa', 'MC', 'PayPal', 'Stripe'].map(p => (
            <span key={p} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
