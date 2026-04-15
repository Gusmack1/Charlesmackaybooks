import { createClient } from '@/lib/supabase/server';
import CheckoutClient from './CheckoutClient';

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  let defaultAddress = null;
  if (session?.user) {
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('is_default', true)
      .single();
    defaultAddress = data;
  }

  return <CheckoutClient session={session} defaultAddress={defaultAddress} />;
}
