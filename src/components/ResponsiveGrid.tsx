'use client';

import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  gap?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  className?: string;
}

export default function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  gap = { mobile: '1rem', tablet: '1.5rem', desktop: '2rem' },
  className = ''
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const classes = [];
    
    // Mobile first - always start with mobile columns
    if (cols.mobile) {
      classes.push(`grid-cols-${cols.mobile}`);
    }
    
    // Tablet breakpoint
    if (cols.tablet && cols.tablet !== cols.mobile) {
      classes.push(`md:grid-cols-${cols.tablet}`);
    }
    
    // Desktop breakpoint
    if (cols.desktop && cols.desktop !== cols.tablet) {
      classes.push(`lg:grid-cols-${cols.desktop}`);
    }
    
    // Large desktop breakpoint
    if (cols.large && cols.large !== cols.desktop) {
      classes.push(`xl:grid-cols-${cols.large}`);
    }
    
    return classes.join(' ');
  };

  const getGridGap = () => {
    const classes = [];
    
    // Mobile gap
    if (gap.mobile) {
      classes.push(`gap-${gap.mobile.replace('rem', '').replace('.', '-')}`);
    }
    
    // Tablet gap
    if (gap.tablet && gap.tablet !== gap.mobile) {
      const tabletGap = gap.tablet.replace('rem', '').replace('.', '-');
      classes.push(`md:gap-${tabletGap}`);
    }
    
    // Desktop gap
    if (gap.desktop && gap.desktop !== gap.tablet) {
      const desktopGap = gap.desktop.replace('rem', '').replace('.', '-');
      classes.push(`lg:gap-${desktopGap}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div className={`grid ${getGridCols()} ${getGridGap()} ${className}`}>
      {children}
    </div>
  );
}

// Predefined grid layouts for common use cases
export const BookGrid = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <ResponsiveGrid
    cols={{ mobile: 1, tablet: 2, desktop: 3, large: 4 }}
    gap={{ mobile: '1rem', tablet: '1.5rem', desktop: '2rem' }}
    className={className}
  >
    {children}
  </ResponsiveGrid>
);

export const BlogGrid = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <ResponsiveGrid
    cols={{ mobile: 1, tablet: 2, desktop: 2, large: 3 }}
    gap={{ mobile: '1.5rem', tablet: '2rem', desktop: '2.5rem' }}
    className={className}
  >
    {children}
  </ResponsiveGrid>
);

export const FeatureGrid = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <ResponsiveGrid
    cols={{ mobile: 1, tablet: 2, desktop: 3, large: 4 }}
    gap={{ mobile: '1.5rem', tablet: '2rem', desktop: '2.5rem' }}
    className={className}
  >
    {children}
  </ResponsiveGrid>
);

export const HeroGrid = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <ResponsiveGrid
    cols={{ mobile: 1, tablet: 1, desktop: 2, large: 2 }}
    gap={{ mobile: '1rem', tablet: '2rem', desktop: '3rem' }}
    className={className}
  >
    {children}
  </ResponsiveGrid>
); 