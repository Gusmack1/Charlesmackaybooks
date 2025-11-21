import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DEV_CART_FILE = path.join(process.cwd(), 'data', 'dev-cart.json')

export async function GET(_request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Dev cart disabled in production' }, { status: 404 })
  }

  try {
    const contents = await fs.readFile(DEV_CART_FILE, 'utf8')
    const data = JSON.parse(contents)
    return NextResponse.json({
      generatedAt: data.generatedAt || null,
      items: Array.isArray(data.items) ? data.items : [],
    })
  } catch (error) {
    console.warn('[dev-cart] Unable to load dev cart payload:', error instanceof Error ? error.message : error)
    return NextResponse.json({ items: [] }, { status: 404 })
  }
}

