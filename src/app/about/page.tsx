import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Author, Charles E. MacKay, Scottish Aviation Historian',
  description: 'Charles E. MacKay is a Glasgow-based aviation historian. 40+ years researching Scotland\'s aviation heritage, Beardmore, Clydeside factories, and military aircraft history.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Charles E. MacKay, Aviation Historian',
    description: '40+ years researching Scotland\'s aviation heritage. Author of 20 definitive titles on Scottish aviation, WWI and WWII aircraft, and military history.',
    url: 'https://charlesmackaybooks.com/about',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Charles E. MacKay',
  alternateName: 'Charles Edward MacKay',
  birthDate: '1951-04-01',
  birthPlace: {
    '@type': 'Place',
    name: 'Glasgow, Scotland',
    address: { '@type': 'PostalAddress', addressLocality: 'Glasgow', addressCountry: 'GB' },
  },
  nationality: 'British',
  jobTitle: 'Aviation historian',
  description: 'Scottish aviation historian. 40+ years researching Scotland\'s aviation heritage, from a 1982 first article in Airfix Magazine through 20 published titles.',
  url: 'https://charlesmackaybooks.com/about',
  image: 'https://charlesmackaybooks.com/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg',
  affiliation: [
    {
      '@type': 'Organization',
      name: 'A Mackay (Publisher) Ltd',
      identifier: 'SC858624',
      url: 'https://find-and-update.company-information.service.gov.uk/company/SC858624',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'A Mackay (Publisher) Ltd',
    identifier: 'SC858624',
  },
  alumniOf: { '@type': 'Place', name: 'Glasgow, Scotland' },
  sameAs: [
    'https://www.wikidata.org/wiki/Q96824767',
    'https://find-and-update.company-information.service.gov.uk/company/SC858624',
    'https://find-and-update.company-information.service.gov.uk/company/SC005175',
    'https://discovery.nationalarchives.gov.uk/details/c/F270555',
  ],
};

const expertise = [
  { title: 'Scottish Aviation', desc: "Comprehensive histories of Scotland's airfields, aircraft factories, and the people who built and flew from them." },
  { title: 'Military Aviation', desc: 'Detailed accounts of RAF, Fleet Air Arm, and Allied operations from Scottish bases during both World Wars.' },
  { title: 'Industrial History', desc: "The story of Glasgow and Scotland's aircraft manufacturing industry, from Rolls-Royce to Beardmore." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }} className="about-hero-inner">
          <div style={{ width: 280, height: 340, background: 'var(--navy-mid)', border: '3px solid rgba(200,169,81,0.3)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
            <Image src="/blog-images/charles-mackay-chipmunk-wp808-turnhouse-1971.jpg" alt="Charles E. MacKay at Turnhouse, 1971" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--white)', marginBottom: 8 }}>Charles E. MacKay</h1>
            <span style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 500, marginBottom: 20, display: 'block' }}>Aviation Historian &amp; Author · Glasgow, Scotland</span>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              Charles E. MacKay is one of Scotland&apos;s foremost aviation historians. From a first article in Airfix Magazine in 1982 to 20 published titles today, he has spent over 40 years researching the nation&apos;s aviation heritage. His work spans two World Wars, the Cold War era, and Scotland&apos;s industrial contribution to aircraft manufacturing.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              His books have been praised by historians, museum curators, and aviation enthusiasts worldwide for their meticulous research, primary source material, and readable narrative style.
            </p>
            <div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[{ num: '20+', label: 'Books published' }, { num: '40+', label: 'Years research' }, { num: 'Worldwide', label: 'Readership' }].map(s => (
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

      <section style={{ padding: '0 24px 80px', maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--gold-dark)', marginBottom: 8 }}>Living biography</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16 }}>Questions Charles is being asked</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            This page is a living biography. Charles has 60+ years of stories that have not made it into print. Angus is putting these questions to him, and the answers will land here as they come back. If you are a reader, a family member, or a fellow aviation buff and have a question Charles should answer, drop a line via the <Link href="/contact" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>contact page</Link>.
          </p>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Origins &amp; childhood</h3>
        <ol start={1} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>Where and when in Glasgow were you born? Tell me about the neighbourhood and the family home.</li>
          <li style={{ marginBottom: 10 }}>What did your parents do, and what kind of childhood did they give you?</li>
          <li style={{ marginBottom: 10 }}>Brothers and sisters: names, ages, what each of them did.</li>
          <li style={{ marginBottom: 10 }}>Earliest memory you can place exactly in time.</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>School &amp; early years</h3>
        <ol start={5} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>Which primary and secondary schools, and what were the best and worst things about each?</li>
          <li style={{ marginBottom: 10 }}>Subjects you loved, subjects you hated, and the teacher who shaped you most.</li>
          <li style={{ marginBottom: 10 }}>When did aviation first catch your eye? A specific moment, an air show, a model, a relative who flew?</li>
          <li style={{ marginBottom: 10 }}>What did you do straight after school: work, college, national service, other?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Working life before publishing</h3>
        <ol start={9} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>The jobs you held in your 20s. What did each one teach you?</li>
          <li style={{ marginBottom: 10 }}>Did you ever fly yourself, or hold a licence? Hours? Aircraft?</li>
          <li style={{ marginBottom: 10 }}>People you worked with who left a mark, good or bad, and why.</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>The first article (1982, Airfix Magazine)</h3>
        <ol start={12} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>What was that first Airfix Magazine article about: which aircraft, what angle?</li>
          <li style={{ marginBottom: 10 }}>How did you submit it? Cold pitch, contact, commission?</li>
          <li style={{ marginBottom: 10 }}>What was the editor&apos;s reaction? Did they pay you?</li>
          <li style={{ marginBottom: 10 }}>Scots Magazine after that: same approach, or different?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Robert Gibson &amp; Sons Glasgow Limited (1985 onwards)</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
          Robert Gibson &amp; Sons Glasgow Limited (Companies House{' '}
          <a href="https://find-and-update.company-information.service.gov.uk/company/SC005175" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }} rel="noopener">SC005175</a>,
          incorporated 12 September 1902, dissolved 23 August 2022). Gibson holdings are catalogued by the{' '}
          <a href="https://discovery.nationalarchives.gov.uk/details/c/F270555" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }} rel="noopener">UK National Archives (F270555)</a>.
        </p>
        <ol start={16} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>How did Gibson find you, or did you find them?</li>
          <li style={{ marginBottom: 10 }}>The 211 St Vincent Street office: what was it like? Who else worked there?</li>
          <li style={{ marginBottom: 10 }}>The first book you wrote for them: title, year, what it was about, how long it took.</li>
          <li style={{ marginBottom: 10 }}>The editor at Gibson who championed you most. What did you learn from them?</li>
          <li style={{ marginBottom: 10 }}>The Hodder Headline acquisition in 2002: how did that change things, and when did you eventually move on?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>The books, method, and craft</h3>
        <ol start={21} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>Of the 20 titles, which was hardest to write, and which are you proudest of?</li>
          <li style={{ marginBottom: 10 }}>Walk me through your research process: archives you used, libraries, personal collections.</li>
          <li style={{ marginBottom: 10 }}>Pilots, designers, or veterans you interviewed personally. Names worth keeping.</li>
          <li style={{ marginBottom: 10 }}>What is a book you wish you had written but never got to?</li>
          <li style={{ marginBottom: 10 }}>What is a topic you still want to write before you stop?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Family</h3>
        <ol start={26} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>How did you and Mum meet, and where?</li>
          <li style={{ marginBottom: 10 }}>Wedding day: date, place, anything memorable.</li>
          <li style={{ marginBottom: 10 }}>What kind of dad were you trying to be? What do you think you got right, what would you do differently?</li>
          <li style={{ marginBottom: 10 }}>The places you took us as kids that mattered to you.</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Glasgow &amp; Scotland</h3>
        <ol start={30} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>Your favourite places in Glasgow: pubs, parks, libraries, viewpoints. Why each one.</li>
          <li style={{ marginBottom: 10 }}>What has changed most about the city since you were young?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Beliefs, advice, regrets</h3>
        <ol start={32} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>Best piece of advice you were ever given, and who gave it to you.</li>
          <li style={{ marginBottom: 10 }}>Best advice you would give a young aviation enthusiast starting out today.</li>
          <li style={{ marginBottom: 10 }}>Anything you regret not doing or not asking, while there was still time?</li>
        </ol>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginTop: 32, marginBottom: 12 }}>Legacy</h3>
        <ol start={35} style={{ paddingLeft: 24, fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: 10 }}>The archive: photos, manuscripts, correspondence, letters from readers. What is in it, where is it, what should never be thrown out.</li>
          <li style={{ marginBottom: 10 }}>Anyone outside the family, friend, mentor, character, who should be remembered after you have gone.</li>
          <li style={{ marginBottom: 10 }}>The one story you tell most often that you want preserved exactly as you tell it.</li>
          <li style={{ marginBottom: 10 }}>What do you most want your grandchildren to know about you, in your own words?</li>
        </ol>
      </section>
    </>
  );
}
