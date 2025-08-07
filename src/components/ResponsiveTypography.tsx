'use client';

import { ReactNode } from 'react';

interface ResponsiveTypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'small' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineClamp?: number;
}

export default function ResponsiveTypography({
  children,
  variant = 'p',
  className = '',
  as,
  color = 'primary',
  weight = 'normal',
  align = 'left',
  truncate = false,
  lineClamp
}: ResponsiveTypographyProps) {
  const Component = as || variant;

  const getVariantClasses = () => {
    const baseClasses = [];
    
    switch (variant) {
      case 'h1':
        baseClasses.push('text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight');
        break;
      case 'h2':
        baseClasses.push('text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight');
        break;
      case 'h3':
        baseClasses.push('text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight');
        break;
      case 'h4':
        baseClasses.push('text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-tight');
        break;
      case 'h5':
        baseClasses.push('text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-tight');
        break;
      case 'h6':
        baseClasses.push('text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-tight');
        break;
      case 'lead':
        baseClasses.push('text-lg md:text-xl lg:text-2xl leading-relaxed');
        break;
      case 'p':
        baseClasses.push('text-base md:text-lg leading-relaxed');
        break;
      case 'small':
        baseClasses.push('text-sm md:text-base leading-relaxed');
        break;
      case 'caption':
        baseClasses.push('text-xs md:text-sm leading-relaxed');
        break;
    }
    
    return baseClasses.join(' ');
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      case 'muted':
        return 'text-muted';
      case 'accent':
        return 'text-accent-blue';
      case 'success':
        return 'text-accent-green';
      case 'warning':
        return 'text-accent-amber';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-primary';
    }
  };

  const getWeightClasses = () => {
    switch (weight) {
      case 'light':
        return 'font-light';
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      case 'extrabold':
        return 'font-extrabold';
      default:
        return 'font-normal';
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      default:
        return 'text-left';
    }
  };

  const getTruncateClasses = () => {
    if (truncate) {
      return 'truncate';
    }
    if (lineClamp) {
      return `line-clamp-${lineClamp}`;
    }
    return '';
  };

  const classes = [
    getVariantClasses(),
    getColorClasses(),
    getWeightClasses(),
    getAlignClasses(),
    getTruncateClasses(),
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
}

// Predefined typography components for common use cases
export const PageTitle = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="h1" {...props} />
);

export const SectionTitle = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="h2" {...props} />
);

export const SubsectionTitle = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="h3" {...props} />
);

export const CardTitle = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="h4" {...props} />
);

export const LeadText = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="lead" {...props} />
);

export const BodyText = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="p" {...props} />
);

export const SmallText = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="small" {...props} />
);

export const CaptionText = (props: Omit<ResponsiveTypographyProps, 'variant'>) => (
  <ResponsiveTypography variant="caption" {...props} />
);

// Specialized typography components for the Charles Mackay Books website
export const BookTitle = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="h2" 
    color="primary" 
    weight="bold"
    {...props} 
  />
);

export const BookAuthor = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="h4" 
    color="secondary" 
    weight="medium"
    {...props} 
  />
);

export const BookDescription = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="p" 
    color="secondary" 
    lineClamp={3}
    {...props} 
  />
);

export const BookPrice = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="h3" 
    color="accent" 
    weight="bold"
    {...props} 
  />
);

export const BlogTitle = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="h3" 
    color="primary" 
    weight="semibold"
    {...props} 
  />
);

export const BlogExcerpt = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="p" 
    color="secondary" 
    lineClamp={2}
    {...props} 
  />
);

export const CategoryLabel = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="small" 
    color="accent" 
    weight="medium"
    {...props} 
  />
);

export const MetaText = (props: Omit<ResponsiveTypographyProps, 'variant' | 'color'>) => (
  <ResponsiveTypography 
    variant="caption" 
    color="muted" 
    {...props} 
  />
); 