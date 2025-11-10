import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scottish Aviation Timeline | Historical Development | Charles E. MacKay',
  description: 'Comprehensive timeline of Scottish aviation history from 1895 to present, covering manufacturing, military operations, commercial aviation, and technological innovation.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/scottish-aviation-timeline'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Scottish Aviation Timeline | Historical Development',
    description: 'Comprehensive timeline of Scottish aviation history from 1895 to present.',
    url: 'https://charlesmackaybooks.com/scottish-aviation-timeline',
    type: 'website',
  },
};

export default function ScottishAviationTimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

