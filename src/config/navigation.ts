export interface NavLinkItem {
  label: string;
  href: string;
  icon?: string; // optional emoji or icon identifier
}

// Main navigation items (always visible)
export const mainNavLinks: NavLinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop Books', href: '/books' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Charles', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Additional navigation items (in "More" dropdown)
export const moreNavLinks: NavLinkItem[] = [
  { label: 'Categories', href: '/categories' },
  { label: 'Aviation News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Returns', href: '/returns' },
  { label: 'Support', href: '/support' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Track Order', href: '/order-tracking' },
];

// Legacy primary nav links (kept for backward compatibility)
export const primaryNavLinks: NavLinkItem[] = [
  ...mainNavLinks,
  ...moreNavLinks,
];

export const categoryNavLinks: NavLinkItem[] = [
  { label: 'Scottish Aviation History', href: '/category/scottish-aviation-history' },
  { label: 'WWI Aviation', href: '/category/wwi-aviation' },
  { label: 'WWII Aviation', href: '/category/wwii-aviation' },
  { label: 'Aviation Biography', href: '/category/aviation-biography' },
  { label: 'Helicopter History', href: '/category/helicopter-history' },
  { label: 'Jet Age Aviation', href: '/category/jet-age-aviation' },
  { label: 'Naval Aviation', href: '/category/naval-aviation' },
  { label: 'Military History', href: '/category/military-history' },
  { label: 'Industrial History', href: '/category/industrial-history' },
  { label: 'Travel Literature', href: '/category/travel-literature' },
  { label: 'Aviation History', href: '/category/aviation-history' },
];


