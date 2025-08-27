export async function GET() {
  // Return an empty WOFF2 payload with correct content type to avoid 404s in crawls
  const emptyFont = new Uint8Array();
  return new Response(emptyFont, {
    status: 200,
    headers: {
      'Content-Type': 'font/woff2',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}


