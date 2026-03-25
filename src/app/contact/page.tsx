export default function ContactPage() {
  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Get in Touch</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Questions about books, research enquiries, or bulk orders</p>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="contact-layout">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--text-dark)', marginBottom: 8 }}>Contact Charles</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32 }}>Whether you have a question about a specific book, want to discuss a research collaboration, or need to place a bulk order, Charles is happy to hear from you.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: '✉', title: 'Email', main: 'charlese1mackay@hotmail.com', sub: 'Usually responds within 24–48 hours' },
              { icon: '⚑', title: 'Location', main: 'Glasgow, Scotland', sub: 'Ships worldwide from Glasgow' },
              { icon: '☑', title: 'eBay Store', main: 'Also available on eBay as "chaza87"', sub: 'Secure worldwide shipping with tracking' },
            ].map(m => (
              <div key={m.title} style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
                <div style={{ width: 44, height: 44, background: 'var(--cream)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>{m.icon}</div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 2 }}>{m.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{m.main}<br/><span style={{ fontSize: 11 }}>{m.sub}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 20, marginTop: 32 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>Academic &amp; Institutional Orders</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>Libraries, museums, and educational institutions can request bulk pricing. Select &ldquo;Institutional enquiry&rdquo; in the form.</p>
          </div>
        </div>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-dark)', marginBottom: 4 }}>Send a message</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Fill in the form below and Charles will get back to you.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>First name</label>
              <input type="text" placeholder="Your first name" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>Last name</label>
              <input type="text" placeholder="Your last name" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>Email address</label>
            <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>Enquiry type</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-body)', background: 'var(--white)' }}>
              <option>General question</option>
              <option>Book enquiry</option>
              <option>Research collaboration</option>
              <option>Bulk / institutional order</option>
              <option>Press &amp; media</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 6 }}>Message</label>
            <textarea placeholder="How can Charles help you?" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-body)', resize: 'vertical', minHeight: 120 }} />
          </div>
          <button style={{ width: '100%', padding: 14, background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send message</button>
        </div>
      </div>
    </>
  );
}
