'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBooksData } from '@/utils/bookUtils';
import { getImageCandidates } from '@/data/blogImageManifest';
import { getApprovedFeatured, getApprovedInline } from '@/utils/approvedImageResolver'

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    bio: string;
    image: string;
    email: string;
  };
  publishedDate: string;
  readingTime: number;
  featuredImage: {
    url: string;
    alt: string;
    caption: string;
  };
  category: string;
  tags: string[];
  relatedBooks: Array<{
    id: string;
    title: string;
    author: string;
    cover: string;
    price: number;
  }>;
  relatedPosts: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    readingTime: number;
  }>;
  references?: Array<{
    title: string;
    url: string;
    source?: string;
    date?: string;
  }>;
}

interface ComprehensiveBlogTemplateProps {
  post: BlogPost;
}

export default function ComprehensiveBlogTemplate({ post }: ComprehensiveBlogTemplateProps) {
  type Reference = { title: string; url: string; source?: string; date?: string };
  const featured = getApprovedFeatured(post.id, post.featuredImage?.url, post.featuredImage?.alt)
  const approvedInline = getApprovedInline(post.id, 4)
  const fallbackSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%230256d4'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><g fill='white' font-family='Source Sans 3, Arial' text-anchor='middle'><text x='300' y='185' font-size='28'>Image unavailable</text><text x='300' y='225' font-size='16'>Charles E. MacKay Aviation History</text></g></svg>`
  );

  const addFallbackToAllImages = (html: string): string => {
    // add onerror fallback and tidy classes on every <img>
    return html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
      let updated = attrs
      // ensure alt attribute
      if (!/\balt\s*=/.test(updated)) {
        updated += ' alt="Aviation history image"'
      }
      // remove inline shadow classes if present and ensure rounded
      updated = updated.replace(/\bshadow-[^\s"]+/g, '')
      if (!/\brounded/.test(updated)) {
        updated += ' class="rounded-lg"'
      }
      // add onerror fallback
      if (!/\bonerror=/.test(updated)) {
        updated += ` onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'"`
      }
      return `<img ${updated}>`
    })
  }

  const ensureThreeImages = (html: string): string => {
    const minimumImages = 4;
    const imgMatches = html.match(/<img\s+[^>]*src=/gi) || [];
    if (imgMatches.length >= minimumImages) return html;

    const candidates: string[] = [];
    if (post.featuredImage?.url) candidates.push(post.featuredImage.url);
    if (post.relatedBooks && post.relatedBooks.length > 0) {
      const covers = post.relatedBooks.map((b) => b.cover).filter(Boolean);
      candidates.push(...covers);
    }
    // ensure at least minimumImages
    while (candidates.length < minimumImages) {
      candidates.push(`data:image/svg+xml;utf8,${fallbackSvg}`);
    }

    const paragraphs = html.split(/(<\/p>)/i);
    const insertAt = [2, Math.max(4, Math.floor(paragraphs.length / 2)), paragraphs.length - 1, paragraphs.length + 1];
    let injected = html;
    let inserted = 0;
    if (paragraphs.length > 1) {
      const rebuilt: string[] = [];
      for (let i = 0, p = 0; i < paragraphs.length; i++) {
        rebuilt.push(paragraphs[i]);
        if (/^<\/p>$/i.test(paragraphs[i])) {
          // after a paragraph closes
          if (insertAt.includes(p) && inserted < minimumImages - imgMatches.length) {
            const src = candidates[inserted];
            rebuilt.push(
              `<figure class="my-6"><img src="${src}" alt="Historical aviation reference image" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'" class="w-full h-auto rounded-lg"/><figcaption class="image-caption">Historical reference image</figcaption></figure>`
            );
            inserted++;
          }
          p++;
        }
      }
      injected = rebuilt.join('');
    } else {
      // No paragraphs detected; append images at end
      const blocks = Array.from({ length: minimumImages - imgMatches.length }).map((_, idx) =>
        `<figure class="my-6"><img src="${candidates[idx]}" alt="Historical aviation reference image" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${fallbackSvg}'" class="w-full h-auto rounded-lg"/><figcaption class="image-caption">Historical reference image</figcaption></figure>`
      );
      injected = html + blocks.join('');
    }
    return injected;
  };

  // Ensure at least 4 images and add fallbacks
  const processContent = (html: string): string => ensureThreeImages(addFallbackToAllImages(html))

  // Clean hero text: remove any "Enhanced Edition" phrasing from title/subtitle for display
  const cleanHeroText = (text: string) =>
    text
      ?.replace(/\bEnhanced Edition:?\s*/gi, '')
      ?.replace(/\s+—\s*Enhanced Edition/gi, '')
      ?.trim();

  const cleanedTitle = cleanHeroText(post.title);
  const cleanedSubtitle = cleanHeroText(post.subtitle);

  // Compute rough word count from HTML content for display/SEO
  const computeWordCount = (html: string): number => {
    const plain = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
    const words = plain.split(/\s+/).filter(Boolean);
    return words.length;
  };
  const wordCount = computeWordCount(post.content);

  const stripShareUI = (html: string): string => {
    let output = html
    // Remove explicit "Share This Article" blocks
    output = output.replace(/<div[^>]*>\s*<h[1-6][^>]*>[^<]*Share This Article[^<]*<\/h[1-6]>[\s\S]*?<\/div>/gi, '')
    // Remove common social share anchors
    const shareDomains = [
      'facebook.com/sharer',
      'twitter.com/intent/tweet',
      'linkedin.com/sharing/share-offsite',
      'pinterest.com/pin/create',
      'mailto:\?subject='
    ]
    for (const domain of shareDomains) {
      const re = new RegExp(`<a[^>]+href=\"[^\"]*${domain}[^\"]*\"[^>]*>[^<]*<\/a>`, 'gi')
      output = output.replace(re, '')
    }
    return output
  }

  // Removed scroll listeners and floating share to prevent jank

  // Prepare processed content
  // Replace any remaining generic placeholders with local high-quality suggestions
  const replaceGenericPlaceholdersWithManifest = (html: string): string => {
    const candidates = getImageCandidates(post.id, post.category, post.tags);
    if (!candidates || candidates.length === 0) return html;
    let use = 0;
    return html.replace(/<img\s+([^>]*?)src=(['"])\/blog-images\/default-generic\.svg\2([^>]*)>/gi, (match, pre, quote, postAttrs) => {
      const cand = candidates[use++] || candidates[candidates.length - 1];
      const altAttr = /\balt\s*=/.test(pre + postAttrs) ? '' : ` alt="${cand.alt.replace(/"/g,'&quot;')}"`;
      return `<img ${pre}src="${cand.url}"${altAttr}${postAttrs}>`;
    });
  };

  // Ensure every image has a caption directly below it; remove orphan caption paragraphs
  const enforceCaptions = (html: string): string => {
    let out = html;
    // Convert image + following italic paragraph into a figure with figcaption
    out = out.replace(/(<img\s+[^>]*>)(\s*<p[^>]*class=\"[^\"]*italic[^\"]*\"[^>]*>([\s\S]*?)<\/p>)/gi, '<figure>$1<figcaption>$3</figcaption></figure>');
    // Wrap any remaining standalone images in a figure and add caption from alt
    out = out.replace(/(<img\s+[^>]*>)(?!\s*<\/figure>)/gi, (match) => {
      const altMatch = match.match(/\balt\s*=\s*["']([^"']+)["']/i);
      const cap = altMatch ? altMatch[1] : 'Image';
      return `<figure>${match}<figcaption>${cap}</figcaption></figure>`;
    });
    // Remove any italic caption paragraphs that no longer have an image
    out = out.replace(/<p[^>]*class=\"[^\"]*italic[^\"]*\"[^>]*>[\s\S]*?<\/p>/gi, '');
    return out;
  };

  const processedHtml = enforceCaptions(replaceGenericPlaceholdersWithManifest(stripShareUI(processContent(post.content))));
  
  // Fallback references if a post doesn't specify any
  const getCategoryFallbackReferences = (category: string | undefined): Reference[] => {
    // Default authoritative sources (UK aviation history)
    const defaults = [
      { title: 'Royal Air Force Museum — Aircraft Collection', url: 'https://www.rafmuseum.org.uk/research/aircraft-history/', source: 'Royal Air Force Museum' },
      { title: 'Imperial War Museums — Aviation History Articles', url: 'https://www.iwm.org.uk/history', source: 'Imperial War Museums' },
      { title: 'FlightGlobal Archive', url: 'https://www.flightglobal.com/archive/', source: 'FlightGlobal' }
    ];
    return defaults;
  };
  const effectiveReferences: Reference[] = (Array.isArray(post.references) && post.references.length > 0)
    ? (post.references as Reference[])
    : getCategoryFallbackReferences(post.category);
  const replacePlaceholdersWithApproved = (html: string): string => {
    if (!approvedInline || approvedInline.length === 0) return html;
    // avoid duplicating the featured image
    const pool = approvedInline.filter(img => img.url !== (featured.url || ''))
    let useIndex = 0;
    return html.replace(/<img\s+([^>]*?)src=(['"])\/blog-images\/default-generic\.svg\2([^>]*)>/gi, (match, pre, quote, post) => {
      const cand = pool[useIndex++];
      if (!cand) return match;
      let attrs = pre + post;
      if (!/\balt\s*=/.test(attrs)) {
        attrs = attrs.replace(/\s*>$/, '') + ` alt="${cand.alt || 'Aviation history image'}"`;
      }
      if (cand.caption && !/\btitle\s*=/.test(attrs)) {
        attrs = attrs.replace(/\s*>$/, '') + ` title="${cand.caption.replace(/"/g,'\\"')}"`;
      }
      return `<img ${pre}src="${cand.url}"${post}>`;
    });
  };

  // Replace generic placeholder caption text with approved captions (in order)
  const replaceGenericCaptions = (html: string): string => {
    const generic = 'Where period photography is unavailable, we use curated placeholders and continue to source verified, license-compliant images for archival completeness.';
    if (approvedInline.length === 0) return html;
    let useIndex = 0;
    return html.replace(new RegExp(generic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), () => {
      const next = approvedInline[useIndex++]?.caption;
      return next || generic;
    });
  };

  // Match specific images with their correct captions
  const matchImagesWithCaptions = (html: string): string => {
    if (!approvedInline || approvedInline.length === 0) return html;
    
    // Create a mapping of image URLs to their captions
    const imageCaptionMap = new Map();
    approvedInline.forEach(img => {
      if (img.url && img.caption) {
        // Extract filename from URL for matching
        const filename = img.url.split('/').pop()?.split('?')[0];
        if (filename) {
          imageCaptionMap.set(filename, img.caption);
        }
      }
    });

    // Replace img tags with their correct captions
    return html.replace(/<img\s+([^>]*?)src=(['"])([^'"]+)\2([^>]*)>/gi, (match, pre, quote, src, post) => {
      const filename = src.split('/').pop()?.split('?')[0];
      const caption = imageCaptionMap.get(filename);
      
      if (caption) {
        // Add or update the title attribute with the correct caption
        let attrs = pre + post;
        if (!/\btitle\s*=/.test(attrs)) {
          attrs = attrs.replace(/\s*>$/, '') + ` title="${caption.replace(/"/g,'\\"')}"`;
        } else {
          // Replace existing title
          attrs = attrs.replace(/\btitle\s*=\s*['"][^'"]*['"]/, `title="${caption.replace(/"/g,'\\"')}"`);
        }
        return `<img ${pre}src="${src}"${post}>`;
      }
      
      return match;
    });
  };

  // Mid-article CTA removed per requirement; recommendations appear only at bottom

  const shareUrl = `https://charlesmackaybooks.com/blog/${post.id}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareText = encodeURIComponent(`${post.title} - Expert aviation history analysis by Charles E. MacKay`);

  const socialLinks = {
    facebook: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}&hashtags=AviationHistory,Aviation,History`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    reddit: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
    email: `mailto:?subject=${shareTitle}&body=I thought you might find this aviation history article interesting: ${shareUrl}`
  };

  /*
  useEffect(() => {
    // Attach error fallbacks for inline images inside blog content
    const container = document.querySelector('.blog-content');
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach((img) => {
      const handler = () => {
        img.src = `data:image/svg+xml;utf8,${fallbackSvg}`;
        img.removeEventListener('error', handler);
      };
      img.addEventListener('error', handler);
    });
  }, [post.id]);
  */

  return (
    <div className="min-h-screen bg-background blog-page pb-16 md:pb-0">
      {/* Reading Progress Bar removed for performance */}
      {/* Social Sharing Header removed */}

      {/* Hero Section */}
      <div className="hero-section overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {(featured.url || post.featuredImage?.url) && (
          <div className="absolute inset-0">
            <Image
              src={featured.url || post.featuredImage.url}
              alt={featured.alt || post.featuredImage.alt || post.title}
              fill
              className="object-cover opacity-30"
              priority
                onError={(e) => {
                  try {
                    const t = e.currentTarget as HTMLImageElement;
                    t.src = `data:image/svg+xml;utf8,${fallbackSvg}`;
                  } catch {}
                }}
            />
          </div>
        )}
        
        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {cleanedTitle}
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 leading-relaxed max-w-3xl mx-auto">
              {cleanedSubtitle}
            </p>

            {/* Compact related books CTA near the top for strong internal linking */}
            {(() => {
              const hasExplicit = Array.isArray(post.relatedBooks) && post.relatedBooks.length > 0;
              const normalize = (s: string) => (s || '').toLowerCase();
              const category = normalize(post.category || '');
              const tags = (post.tags || []).map(normalize);
              const pick = new Set<string>();
              if (!hasExplicit) {
                if (category.includes('wwi')) { pick.add('british-aircraft-great-war'); pick.add('german-aircraft-great-war'); }
                if (category.includes('wwii') || category.includes('world war ii')) { pick.add('enemy-luftwaffe-1945'); }
                if (category.includes('jet') || category.includes('cold war')) { pick.add('sonic-to-standoff'); }
                if (category.includes('helicopter')) { pick.add('sycamore-seeds'); }
                if (category.includes('naval')) { pick.add('aircraft-carrier-argus'); }
                if (category.includes('scottish')) { pick.add('clydeside-aviation-vol1'); }
                if (category.includes('biography')) { pick.add('captain-eric-brown'); }
              }
              const fallbackMini = !hasExplicit ? getBooksData(Array.from(pick)).slice(0,2) : [];
              const mini = hasExplicit ? post.relatedBooks.slice(0,2) : fallbackMini;
              if (!mini || mini.length === 0) return null;
              return (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {mini.map((b) => (
                    <Link key={b.id} href={`/books/${b.id}`} className="badge badge-blue px-5 py-3 rounded-lg font-semibold shadow">
                      Explore: {b.title}
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="content card p-8">
          {/* Featured Image Caption */}
          {featured.url && (
            <div className="text-center mb-8">
              <p className="text-sm text-muted italic">
                {featured.caption || post.featuredImage?.caption || featured.alt || post.featuredImage?.alt || post.title}
              </p>
            </div>
          )}
          
          {/* Article Content (full) */}
          <div 
            className="blog-content content"
            dangerouslySetInnerHTML={{ __html: matchImagesWithCaptions(replaceGenericCaptions(replacePlaceholdersWithApproved(processedHtml))) }}
          />
          {/* Removed auto-append image grid; images are placed only where placeholders exist */}

      {/* References */}
      {Array.isArray(effectiveReferences) && effectiveReferences.length > 0 && (
        <section className="mt-12">
          <h3 className="text-xl font-bold text-primary mb-3">References</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-secondary">
            {effectiveReferences.map((ref, idx) => (
              <li key={idx}>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="underline text-accent-blue">
                  {ref.title}
                </a>
                {ref.source ? ` — ${ref.source}` : ''}
                {ref.date ? ` (${ref.date})` : ''}
              </li>
            ))}
          </ol>
        </section>
      )}
          {/* Breadcrumb JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://charlesmackaybooks.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://charlesmackaybooks.com/blog' },
                  { '@type': 'ListItem', position: 3, name: post.title, item: `https://charlesmackaybooks.com/blog/${post.id}` }
                ]
              })
            }}
          />

          {/* Article JSON-LD for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: cleanedTitle || post.title,
                description: post.excerpt,
                image: (() => {
                  const list: string[] = [];
                  if (featured.url) list.push(featured.url);
                  try { (approvedInline || []).forEach((i: any) => { if (i?.url) list.push(i.url) }) } catch {}
                  return list.length ? list.slice(0, 4) : undefined;
                })(),
                author: {
                  '@type': 'Person',
                  name: post.author.name,
                  email: post.author.email
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'Charles Mackay Books',
                  url: 'https://charlesmackaybooks.com/'
                },
                datePublished: post.publishedDate,
                dateModified: post.publishedDate,
                keywords: post.tags?.join(', '),
                mainEntityOfPage: `https://charlesmackaybooks.com/blog/${post.id}`
              })
            }}
          />
        </article>

        {/* Related Books CTA (with intelligent fallback) */}
        {(() => {
          const hasExplicit = Array.isArray(post.relatedBooks) && post.relatedBooks.length > 0;
          const normalize = (s: string) => (s || '').toLowerCase();
          const category = normalize(post.category);
          const tags = (post.tags || []).map(normalize);
          const pick = new Set<string>();
          if (!hasExplicit) {
            // Category-based suggestions
            if (category.includes('wwi')) { pick.add('british-aircraft-great-war'); pick.add('german-aircraft-great-war'); }
            if (category.includes('wwii') || category.includes('world war ii')) { pick.add('enemy-luftwaffe-1945'); }
            if (category.includes('jet') || category.includes('cold war')) { pick.add('sonic-to-standoff'); }
            if (category.includes('helicopter')) { pick.add('sycamore-seeds'); }
            if (category.includes('naval')) { pick.add('aircraft-carrier-argus'); }
            if (category.includes('scottish')) { pick.add('clydeside-aviation-vol1'); }
            if (category.includes('biography')) { pick.add('captain-eric-brown'); pick.add('soaring-with-wings'); }
            if (category.includes('industrial') || category.includes('manufacturing')) { pick.add('beardmore-aviation'); }
            // Tag-based augment
            if (tags.includes('v-force') || tags.includes('vulcan')) { pick.add('sonic-to-standoff'); }
            if (tags.includes('hms argus') || tags.includes('carrier')) { pick.add('aircraft-carrier-argus'); }
            if (tags.includes('bristol') || tags.includes('brisfit')) { pick.add('bristol-fighter'); }
            if (tags.includes('schneider') || tags.includes('trophy')) { pick.add('mother-of-the-few'); }
          }
          const fallbackBooks = !hasExplicit ? getBooksData(Array.from(pick)) : [];
          const finalRelated = hasExplicit ? post.relatedBooks : fallbackBooks;
          if (!finalRelated || finalRelated.length === 0) {
            return (
              <section className="mt-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700" aria-labelledby="related-books-heading">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 id="related-books-heading" className="text-2xl font-bold text-primary">Explore Charles E. MacKay’s Books</h3>
                  <Link href="/books" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">Browse all books</Link>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">Dive deeper into aviation and Scottish industrial history with our full catalogue of meticulously researched titles.</p>
              </section>
            );
          }
          return (
          <section className="mt-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700" aria-labelledby="related-books-heading">
            <div className="flex items-center justify-between gap-4 mb-6">
                              <h3 id="related-books-heading" className="text-2xl font-bold text-slate-900 dark:text-white">Related Books by Charles E. MacKay</h3>
                <Link href="/books" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">Browse all books</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalRelated.map((book) => (
                <article key={book.id} className="bg-white dark:bg-slate-700 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 p-5 hover:shadow-lg transition-shadow">
                  <Link href={`/books/${book.id}`} className="block group">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800 mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={book.cover || '/book-covers/default-placeholder.svg'}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover group-hover:opacity-90"
                        onError={(e) => {
                          try { (e.currentTarget as HTMLImageElement).src = '/blog-images/default-generic.svg' } catch {}
                        }}
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{book.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">By {book.author || 'Charles E. MacKay'}</p>
                    {typeof book.price === 'number' && (
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">£{book.price.toFixed(2)}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">View & Buy</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {/* Related Books JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'ItemList',
                  itemListElement: finalRelated.map((b, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@type': 'Book',
                      name: b.title,
                      description: `Aviation history book by Charles E. MacKay covering ${b.title.toLowerCase()}`,
                      url: `https://charlesmackaybooks.com/books/${b.id}`,
                      image: b.cover?.startsWith('http') ? b.cover : `https://charlesmackaybooks.com${b.cover?.startsWith('/') ? '' : '/'}${b.cover || ''}`,
                      author: { '@type': 'Person', name: 'Charles E. MacKay' },
                      publisher: { '@type': 'Organization', name: 'Charles Mackay Books' },
                      bookFormat: 'Hardcover',
                      inLanguage: 'en-GB'
                    }
                  }))
                })
              }}
            />
          </section>
          );
        })()}

        {/* Author Bio */}
        <section className="mt-16 card p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-accent-blue rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-2">
                About {post.author.name}
              </h3>
              <p className="text-secondary leading-relaxed mb-4">
                {post.author.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                <span>📧 {post.author.email}</span>
                <span>📍 Glasgow, Scotland</span>
                <span>📚 19+ Published Books</span>
                <span>🏛️ Referenced by Major Museums</span>
              </div>
            </div>
          </div>
        </section>

        {/* Continue Reading section intentionally removed across all blog posts per site policy */}

        {/* Tags removed per request */}
      </div>

      {/* Social Sharing Footer removed */}

      {/* Sticky Buy Books (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-white text-sm">📚 Browse Charles’s aviation books</span>
          <Link href="/books" className="badge badge-blue px-4 py-2 rounded-lg font-semibold">Buy Books</Link>
        </div>
      </div>

      {/* Floating Social Share (Mobile) */}
      {/* Floating Social Share removed */}

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content h2 {
          color: var(--color-text-primary) !important;
          font-size: clamp(1.75rem, 3.5vw, 2rem) !important;
          line-height: 1.25 !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding-bottom: 0.5rem !important;
          font-weight: 600 !important;
        }
        
        .blog-content h3 {
          color: var(--color-text-primary) !important;
          font-size: clamp(1.5rem, 3vw, 1.75rem) !important;
          line-height: 1.3 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          font-weight: 600 !important;
        }
        
        .blog-content p {
          color: var(--color-text-secondary) !important;
          font-size: 18px !important;
          line-height: 1.6 !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content ul, .blog-content ol {
          @apply mb-6 space-y-2;
        }
        
        .blog-content li {
          color: var(--color-text-secondary) !important;
          font-size: 18px !important;
          line-height: 1.6 !important;
        }
        
        .blog-content blockquote {
          @apply border-l-4 border-accent-blue bg-secondary/5 p-6 my-8 italic text-primary;
        }
        
        .blog-content .bg-amber-50,
        .blog-content .bg-blue-50,
        .blog-content .bg-green-50 {
          @apply rounded-lg mb-8 bg-secondary/5;
        }
        
        .blog-content a {
          @apply text-accent-blue hover:text-accent-blue underline;
        }
        
        .blog-content img {
          @apply rounded-lg shadow-md mx-auto block max-w-full h-auto;
          width: 100%;
          height: auto;
        }

        .blog-content img:first-child {
          @apply mb-4;
        }

        .blog-content .image-caption {
          @apply text-sm text-center italic mt-2 mb-6;
          color: var(--color-text-muted) !important;
        }
        
        /* Override ALL hardcoded color classes in blog content */
        .blog-content .text-gray-600,
        .blog-content .text-gray-700,
        .blog-content .text-gray-800,
        .blog-content .text-slate-600,
        .blog-content .text-slate-700,
        .blog-content .text-slate-800 {
          color: var(--color-text-secondary) !important;
        }
        
        .blog-content .text-blue-800,
        .blog-content .text-blue-700,
        .blog-content .text-blue-600 {
          color: var(--color-accent-blue) !important;
        }
        
        /* Ensure proper colors on colored backgrounds */
        .blog-content .bg-blue-50,
        .blog-content .bg-green-50,
        .blog-content .bg-amber-50 {
          background-color: var(--color-bg-accent) !important;
          border-radius: var(--border-radius) !important;
          margin-bottom: 2rem !important;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            @apply text-3xl;
          }
          
          .blog-content h2 {
            @apply text-xl;
          }
          
          .blog-content p, .blog-content li {
            @apply text-base;
          }
        }
      `}</style>
    </div>
  );
}