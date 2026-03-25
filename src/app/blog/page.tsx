'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const allPosts = [
  { slug: 'forgotten-airfields', cat: 'Scottish Aviation', title: 'The Forgotten Airfields of the Scottish Highlands', excerpt: "A look at the wartime airfields scattered across Scotland's remote landscapes, many of which have been reclaimed by nature.", img: '/blog-images/spitfire.jpg' },
  { slug: 'scotlands-first-pilots', cat: 'WWI Aviation', title: "Scotland's First Military Pilots: 1914–1918", excerpt: 'Tracing the stories of the first Scottish men to take to the skies in service during the Great War.', img: '/blog-images/sopwith-camel.jpg' },
  { slug: 'rolls-royce-hillington', cat: 'Industrial History', title: 'Inside the Rolls-Royce Factory at Hillington', excerpt: "How Glasgow's Hillington factory produced thousands of Merlin engines that powered Spitfires and Lancasters.", img: '/blog-images/beardmore-shipyard.jpg' },
  { slug: 'bomber-command-scottish', cat: 'WWII Aviation', title: 'Bomber Command: Scottish Squadrons in Action', excerpt: 'The vital role played by Scotland-based bomber squadrons in the strategic air offensive over occupied Europe.', img: '/blog-images/spitfire.jpg' },
  { slug: 'raf-leuchars', cat: 'Cold War', title: 'RAF Leuchars: Sentinels of the North', excerpt: 'How this Fife air station stood watch against Soviet incursions for four decades during the Cold War.', img: '/blog-images/eric-brown.jpg' },
  { slug: 'fleet-air-arm-machrihanish', cat: 'Naval Aviation', title: 'Fleet Air Arm Operations from RNAS Machrihanish', excerpt: "The often-overlooked story of naval aviation training and operations on Scotland's west coast.", img: '/blog-images/beardmore-shipyard.jpg' },
];

const cats = ['All Articles', ...Array.from(new Set(allPosts.map(p => p.cat)))];

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('All Articles');
  const filtered = activeCat === 'All Articles' ? allPosts : allPosts.filter(p => p.cat === activeCat);

  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Aviation Research Blog</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Articles, research notes, and stories from Scotland&apos;s aviation past</p>
      </div>
      <section style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{
              padding: '8px 16px', borderRadius: 20, border: '1px solid var(--border)', fontSize: 13, fontWeight: activeCat === cat ? 500 : 400, cursor: 'pointer',
              background: activeCat === cat ? 'var(--navy)' : 'white',
              color: activeCat === cat ? 'white' : 'var(--text-body)',
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
          {filtered.map(post => (
            <div key={post.slug} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', background: 'var(--cream-dark)', overflow: 'hidden', position: 'relative' }}>
                <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 }}>{post.cat}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>Read article →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
