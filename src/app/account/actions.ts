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
