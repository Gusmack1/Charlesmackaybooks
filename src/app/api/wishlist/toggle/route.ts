import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookId } = await req.json();
    if (!bookId || typeof bookId !== 'string') {
      return NextResponse.json({ error: 'bookId is required' }, { status: 400 });
    }

    // Check if already in wishlist (maybeSingle avoids throw when no row)
    const { data: existing, error: selectErr } = await supabase
      .from('wishlist')
      .select('book_id')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .maybeSingle();

    if (selectErr) {
      return NextResponse.json({ error: selectErr.message }, { status: 500 });
    }

    if (existing) {
      const { error: delErr } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);
      if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });
      return NextResponse.json({ in_wishlist: false });
    }

    const { error: insErr } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, book_id: bookId });
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
    return NextResponse.json({ in_wishlist: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Wishlist toggle error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
