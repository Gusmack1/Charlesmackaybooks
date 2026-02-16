'use client';

import type { CustomerDetails } from '@/utils/orderUtils';

export const CUSTOMER_PROFILE_STORAGE_KEY = 'charles_mackay_checkout_profile';

export function readSavedCustomerProfile(): CustomerDetails | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(CUSTOMER_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CustomerDetails;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

export function saveCustomerProfile(profile: CustomerDetails): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOMER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function clearSavedCustomerProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CUSTOMER_PROFILE_STORAGE_KEY);
}

