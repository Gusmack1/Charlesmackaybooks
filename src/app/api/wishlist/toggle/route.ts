import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookId } = await req.json();
    if (!bookId) {
      return NextResponse.json({ error: 'bookId is required' }, { status: 400 });
    }

    // Check if already in wishlist
    const { data: existing } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('book_id', bookId)
      .single();

    let inWishlist = false;

    if (existing) {
      // Remove from wishlist
      await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', session.user.id)
        .eq('book_id', bookId);
    } else {
      // Add to wishlist
      await supabase
        .from('wishlist')
        .insert([{ user_id: session.user.id, book_id: bookId }]);
      inWishlist = true;
    }

    return NextResponse.json({ in_wishlist: inWishlist });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Wishlist toggle error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
