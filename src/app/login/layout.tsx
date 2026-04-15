import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In to Your Account',
  description: 'Sign in to your Charles E. MacKay Books account to view orders, wishlist, and saved addresses.',
  alternates: { canonical: '/login' },
  robots: { index: true, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
