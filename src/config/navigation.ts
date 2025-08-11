export interface NavLinkItem {
  label: string;
  href: string;
  icon?: string; // optional emoji or icon identifier
}

export const primaryNavLinks: NavLinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop Books', href: '/books' },
  { label: 'Blog', href: '/blog' },
  { label: 'Scottish Timeline', href: '/scottish-aviation-timeline' },
  { label: 'For Researchers', href: '/for-researchers' },
  { label: 'How to Order', href: '/how-to-order' },
  { label: 'Support', href: '/support' },
  { label: 'About Charles', href: '/about' },
  { label: 'Contact', href: '/contact' },
];


