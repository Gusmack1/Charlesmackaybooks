import { notFound, redirect } from 'next/navigation';

// Map aircraft IDs to their corresponding blog post slugs
const AIRCRAFT_TO_BLOG_MAP: Record<string, string> = {
  'hawker-hurricane': 'hawker-hurricane-fighter-development',
  'sopwith-camel': 'sopwith-camel-wwi-fighter',
  // Add more mappings as needed for other aircraft
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogSlug = AIRCRAFT_TO_BLOG_MAP[id];

  if (!blogSlug) {
    return {
      title: 'Aircraft Not Found | Charles E. MacKay Aviation Books',
      description: 'The requested aircraft information could not be found.',
    };
  }

  // This will redirect, so metadata isn't really used, but providing it for completeness
  return {
    title: `Aircraft: ${id} | Charles E. MacKay Aviation Books`,
    description: `Learn about the ${id} aircraft in aviation history.`,
  };
}

export default async function AircraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogSlug = AIRCRAFT_TO_BLOG_MAP[id];

  if (!blogSlug) {
    notFound();
  }

  // Redirect to the appropriate blog post
  redirect(`/blog/${blogSlug}`);
}
