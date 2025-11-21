import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface CartItem {
  bookId: string;
  quantity: number;
  book: Record<string, unknown>;
}

interface StoredCart {
  id: string;
  customerEmail: string;
  customerName?: string;
  items: CartItem[];
  subtotal: number;
  abandonedAt: string;
  lastEmailSent?: string;
  emailSequence: number;
  recovered: boolean;
  recoveredAt?: string;
  recoveryCode: string;
  incentives: {
    discountApplied: boolean;
    discountAmount?: number;
    discountCode?: string;
    freeShippingApplied: boolean;
  };
  fingerprint: string;
  source?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const CARTS_FILE = path.join(DATA_DIR, 'abandoned-carts.json');
const THROTTLE_MS = 30 * 60 * 1000;

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CARTS_FILE);
  } catch {
    await fs.writeFile(CARTS_FILE, '[]', 'utf8');
  }
}

async function readCarts(): Promise<StoredCart[]> {
  try {
    await ensureDataFile();
    const data = await fs.readFile(CARTS_FILE, 'utf8');
    return JSON.parse(data) as StoredCart[];
  } catch (error) {
    console.error('Failed to read abandoned carts file', error);
    return [];
  }
}

async function writeCarts(carts: StoredCart[]) {
  try {
    await ensureDataFile();
    await fs.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to persist abandoned carts', error);
  }
}

const hashItems = (items: CartItem[]) => {
  return items
    .map(item => `${item.bookId}:${item.quantity}`)
    .sort()
    .join('|');
};

const sanitizeItems = (items: any[]): CartItem[] => {
  return items
    .map(item => {
      if (!item || typeof item !== 'object') return null;
      if (!item.bookId || !item.quantity || !item.book) return null;
      return {
        bookId: String(item.bookId),
        quantity: Number(item.quantity),
        book: item.book
      };
    })
    .filter((item): item is CartItem => Boolean(item && item.bookId && item.quantity > 0));
};

const generateCartId = () => `AC-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();

const generateRecoveryCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export async function GET(request: NextRequest) {
  const carts = await readCarts();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const email = searchParams.get('email')?.toLowerCase();
  const limit = Number(searchParams.get('limit') || '200');

  let filtered = carts;
  if (email) {
    filtered = filtered.filter(cart => cart.customerEmail === email);
  }

  if (code) {
    const cart = filtered.find(entry => entry.recoveryCode === code);
    return NextResponse.json({ cart: cart ?? null });
  }

  const sliced = filtered
    .sort((a, b) => new Date(b.abandonedAt).getTime() - new Date(a.abandonedAt).getTime())
    .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 200);

  return NextResponse.json({ carts: sliced });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawEmail = (body.customerEmail || '').toString().trim().toLowerCase();
    const items = sanitizeItems(Array.isArray(body.items) ? body.items : []);

    if (!rawEmail || !items.length) {
      return NextResponse.json(
        { error: 'customerEmail and items are required' },
        { status: 400 }
      );
    }

    const subtotal =
      typeof body.subtotal === 'number' ? body.subtotal : Number(body.subtotal) || 0;
    const fingerprint = body.fingerprint || hashItems(items);

    const carts = await readCarts();
    const now = Date.now();
    const recentlyLogged = carts.find(
      cart =>
        cart.customerEmail === rawEmail &&
        cart.fingerprint === fingerprint &&
        now - new Date(cart.abandonedAt).getTime() < THROTTLE_MS
    );

    if (recentlyLogged) {
      return NextResponse.json({ success: true, cart: recentlyLogged, deduped: true });
    }

    const newCart: StoredCart = {
      id: body.id || generateCartId(),
      customerEmail: rawEmail,
      customerName: body.customerName,
      items,
      subtotal,
      abandonedAt: body.abandonedAt || new Date().toISOString(),
      lastEmailSent: body.lastEmailSent,
      emailSequence: typeof body.emailSequence === 'number' ? body.emailSequence : 0,
      recovered: Boolean(body.recovered),
      recoveredAt: body.recoveredAt,
      recoveryCode: body.recoveryCode || generateRecoveryCode(),
      incentives: {
        discountApplied: Boolean(body?.incentives?.discountApplied),
        discountAmount: body?.incentives?.discountAmount,
        discountCode: body?.incentives?.discountCode,
        freeShippingApplied: Boolean(body?.incentives?.freeShippingApplied)
      },
      fingerprint,
      source: body.source || 'checkout'
    };

    carts.push(newCart);
    await writeCarts(carts);

    return NextResponse.json({ success: true, cart: newCart });
  } catch (error) {
    console.error('Failed to log abandoned cart', error);
    return NextResponse.json(
      { error: 'Failed to store abandoned cart' },
      { status: 500 }
    );
  }
}

