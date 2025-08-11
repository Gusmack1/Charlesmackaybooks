export async function GET() {
  return new Response('https://charlesmackaybooks.com/products.xml\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}


