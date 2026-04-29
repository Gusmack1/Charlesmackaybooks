'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type Address = {
  line1: string;
  line2: string | null;
  city: string;
  postcode: string;
  country: string;
};

export async function addAddress(formData: Address) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase.from('addresses').insert({
    ...formData,
    user_id: user.id,
  });

  if (error) throw error;

  revalidatePath('/account/addresses');
  return { success: true };
}

export async function updateAddress(id: string, formData: Address) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('addresses')
    .update(formData)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/account/addresses');
  return { success: true };
}

export async function deleteAddress(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/account/addresses');
  return { success: true };
}

export async function setDefaultAddress(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Clear all defaults for user
  await supabase
    .from('addresses')
    .update({ is_default: false })
    .eq('user_id', user.id);

  // Set new default
  const { error } = await supabase
    .from('addresses')
    .update({ is_default: true })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/account/addresses');
  return { success: true };
}

export async function removeFromWishlist(wishlistId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', wishlistId)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/account/wishlist');
  return { success: true };
}

/**
 * After a guest checkout completes and the customer signs up via magic link,
 * attach any orders matching their email to their new user_id. Calls the
 * SECURITY DEFINER function link_orders_to_user which enforces auth.uid().
 *
 * Returns the count of orders linked.
 */
export async function linkGuestOrdersToCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { success: false, linked: 0 };
  }

  const { data, error } = await supabase.rpc('link_orders_to_user', {
    p_email: user.email,
    p_user: user.id,
  });

  if (error) {
    console.error('linkGuestOrdersToCurrentUser failed:', error);
    return { success: false, linked: 0 };
  }

  revalidatePath('/account/orders');
  return { success: true, linked: data ?? 0 };
}

export async function updateProfile(updates: {
  full_name?: string;
  email?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id);

  if (error) throw error;

  revalidatePath('/account');
  return { success: true };
}

/**
 * Toggle the customer's marketing opt-in state. UK GDPR: withdrawing consent
 * must be as easy as giving it; no challenge / re-confirm flow. Records the
 * timestamp + source on every change so we have an audit trail of when
 * consent was given or withdrawn.
 */
export async function setMarketingOptIn(optIn: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      marketing_opt_in: optIn,
      marketing_opt_in_ts: new Date().toISOString(),
      marketing_opt_in_source: 'account-page',
    })
    .eq('id', user.id);

  if (error) throw error;

  revalidatePath('/account/marketing');
  revalidatePath('/account');
  return { success: true, optIn };
}
