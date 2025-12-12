export async function GET() {
  const emptyFont = new Uint8Array();
  return new Response(emptyFont, {
    status: 200,
    headers: {
      'Content-Type': 'font/woff2',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Robots-Tag': 'noindex'
    }
  });
}


