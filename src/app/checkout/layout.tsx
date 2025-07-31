import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Checkout | Charles E. MacKay Aviation Books',
  description: 'Complete your order for Charles E. MacKay\'s aviation history books. Secure checkout with PayPal, worldwide shipping available.',
  robots: {
    index: false, // Don't index checkout pages
    follow: false,
  },
  openGraph: {
    title: 'Secure Checkout | Charles E. MacKay Aviation Books',
    description: 'Complete your order for Charles E. MacKay\'s aviation history books. Secure checkout with PayPal, worldwide shipping available.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/checkout'
  }
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
