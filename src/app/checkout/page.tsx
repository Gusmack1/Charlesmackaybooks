import { createClient } from '@/lib/supabase/server';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let defaultAddress = null;
  let session = null;
  if (user) {
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_default', true)
      .maybeSingle();
    defaultAddress = data;
    // Build minimal session shape for client component (only email used)
    session = { user: { id: user.id, email: user.email } } as never;
  }

  return <CheckoutClient session={session} defaultAddress={defaultAddress} />;
}
