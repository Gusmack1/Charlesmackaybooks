import Image from 'next/image';

const expertise = [
  { title: 'Scottish Aviation', desc: "Comprehensive histories of Scotland's airfields, aircraft factories, and the people who built and flew from them." },
  { title: 'Military Aviation', desc: 'Detailed accounts of RAF, Fleet Air Arm, and Allied operations from Scottish bases during both World Wars.' },
  { title: 'Industrial History', desc: "The story of Glasgow and Scotland's aircraft manufacturing industry, from Rolls-Royce to Beardmore." },
];

export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }} className="about-hero-inner">
          <div style={{ width: 280, height: 340, background: 'var(--navy-mid)', border: '3px solid rgba(200,169,81,0.3)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
            <Image src="/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg" alt="Charles E. MacKay at Turnhouse, 1971" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--white)', marginBottom: 8 }}>Charles E. MacKay</h1>
            <span style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 500, marginBottom: 20, display: 'block' }}>Aviation Historian &amp; Author · Glasgow, Scotland</span>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              Charles E. MacKay is one of Scotland&apos;s foremost aviation historians, with over 25 years of dedicated research into the nation&apos;s rich aviation heritage. His work spans two World Wars, the Cold War era, and Scotland&apos;s industrial contribution to aircraft manufacturing.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              His books have been praised by historians, museum curators, and aviation enthusiasts worldwide for their meticulous research, primary source material, and readable narrative style.
            </p>
            <div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[{ num: '20+', label: 'Books published' }, { num: '25+', label: 'Years research' }, { num: '1,700+', label: 'Readers' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--gold-dark)', marginBottom: 8 }}>Areas of Expertise</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>Research Specialisations</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 40 }} className="expertise-grid">
          {expertise.map(e => (
            <div key={e.title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>{e.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
