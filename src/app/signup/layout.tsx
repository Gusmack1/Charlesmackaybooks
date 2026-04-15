import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: 'Create a Charles E. MacKay Books account to track orders, save a wishlist, and manage shipping addresses.',
  alternates: { canonical: '/signup' },
  robots: { index: true, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
