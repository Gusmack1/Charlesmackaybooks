import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Complete | Charles E. MacKay Aviation Books',
  description: 'Your order has been placed. Thank you for your purchase.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/order-complete',
  },
}

export default function OrderCompleteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
