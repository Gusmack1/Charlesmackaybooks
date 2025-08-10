import { books } from '@/data/books'

function isIsoDate(s?: string) {
  if (!s) return false
  return /^\d{4}-\d{2}-\d{2}/.test(s)
}

export async function GET() {
  const problems: string[] = []

  books.forEach((b, idx) => {
    const ctx = `${idx + 1}:${b.id}`
    if (!b.title) problems.push(`${ctx} missing title`)
    if (!b.isbn) problems.push(`${ctx} missing isbn`)
    if (typeof b.price !== 'number' || b.price <= 0) problems.push(`${ctx} invalid price`)
    if (!b.description || b.description.length < 150) problems.push(`${ctx} description < 150 chars`)
    if (!b.imageUrl) problems.push(`${ctx} missing imageUrl (will fallback)`)    
    if (b.publicationYear && (b.publicationYear < 1900 || b.publicationYear > new Date().getFullYear())) problems.push(`${ctx} suspicious publicationYear ${b.publicationYear}`)
    if (b.pageCount && b.pageCount <= 0) problems.push(`${ctx} invalid pageCount`)
  })

  const ok = problems.length === 0
  const body = JSON.stringify({ ok, problems, total: books.length, timestamp: new Date().toISOString() }, null, 2)

  return new Response(body, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    status: ok ? 200 : 207
  })
}


