import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect_to') || '/account';

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      // Retroactively link any guest orders for this email to the new user.
      // Best-effort: failures don't block the redirect.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        await supabase.rpc('link_orders_to_user', {
          p_email: user.email,
          p_user: user.id,
        });
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
