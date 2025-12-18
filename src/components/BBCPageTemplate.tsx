'use client';

import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BBCPageTemplateProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  centerHero?: boolean;
}

export default function BBCPageTemplate({ title, subtitle, breadcrumbs = [], centerHero = false, children }: BBCPageTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="hero-section bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          {breadcrumbs.length > 0 && !centerHero && (
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
              <ol className="flex flex-wrap gap-2 items-center">
                {breadcrumbs.map((bc, idx) => (
                  <li key={`${bc.label}-${idx}`} className="flex items-center gap-2">
                    {bc.href ? (
                      <Link href={bc.href} className="hover:underline text-white/90">
                        {bc.label}
                      </Link>
                    ) : (
                      <span className="text-white/90">{bc.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span aria-hidden>›</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className={centerHero ? 'text-center' : 'text-center md:text-left'}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
            {subtitle && (
              <p className={`text-lg md:text-xl text-white/90 ${centerHero ? 'max-w-4xl mx-auto' : 'max-w-3xl md:max-w-4xl md:pr-12'}`}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}


