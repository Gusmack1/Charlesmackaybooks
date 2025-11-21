import { Book } from '@/types/book';

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface AbandonedCart {
  id: string;
  customerEmail: string;
  customerName?: string;
  items: CartItem[];
  subtotal: number;
  abandonedAt: Date;
  lastEmailSent?: Date;
  emailSequence: number;
  recovered: boolean;
  recoveredAt?: Date;
  recoveryCode?: string;
  incentives: {
    discountApplied: boolean;
    discountAmount?: number;
    discountCode?: string;
    freeShippingApplied: boolean;
  };
  fingerprint?: string;
  source?: string;
}

type StoredAbandonedCart = Omit<AbandonedCart, 'abandonedAt' | 'lastEmailSent' | 'recoveredAt'> & {
  abandonedAt: string;
  lastEmailSent?: string;
  recoveredAt?: string;
};

const ENDPOINT = '/api/abandoned-carts';
const MINIMUM_LOG_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_PREFIX = 'cmb_abandoned_cart:';

const hashCartItems = (items: CartItem[]): string => {
  return items
    .map(item => `${item.bookId}:${item.quantity}`)
    .sort()
    .join('|');
};

const getThrottleKey = (email: string, fingerprint: string) => {
  return `${STORAGE_PREFIX}${email}:${fingerprint}`;
};

const shouldThrottle = (email: string, fingerprint: string) => {
  if (typeof window === 'undefined') return false;
  try {
    const key = getThrottleKey(email, fingerprint);
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return false;
    const lastLogged = Number(rawValue);
    return Number.isFinite(lastLogged) && Date.now() - lastLogged < MINIMUM_LOG_INTERVAL_MS;
  } catch (error) {
    console.warn('Unable to read abandoned cart throttle key', error);
    return false;
  }
};

const markThrottle = (email: string, fingerprint: string) => {
  if (typeof window === 'undefined') return;
  try {
    const key = getThrottleKey(email, fingerprint);
    window.localStorage.setItem(key, Date.now().toString());
  } catch (error) {
    console.warn('Unable to persist abandoned cart throttle key', error);
  }
};

const serializeCartPayload = (payload: Partial<StoredAbandonedCart>) => {
  return JSON.stringify(payload);
};

const deserializeCart = (cart: StoredAbandonedCart): AbandonedCart => {
  return {
    ...cart,
    abandonedAt: new Date(cart.abandonedAt),
    lastEmailSent: cart.lastEmailSent ? new Date(cart.lastEmailSent) : undefined,
    recoveredAt: cart.recoveredAt ? new Date(cart.recoveredAt) : undefined
  };
};

export async function trackCartAbandonment(
  customerEmail: string,
  customerName: string | undefined,
  items: CartItem[],
  subtotal: number,
  source: string = 'checkout'
): Promise<void> {
  if (!customerEmail || !items.length) {
    return;
  }

  const normalizedEmail = customerEmail.trim().toLowerCase();
  const fingerprint = hashCartItems(items);

  if (shouldThrottle(normalizedEmail, fingerprint)) {
    return;
  }

  const payload: Partial<StoredAbandonedCart> = {
    customerEmail: normalizedEmail,
    customerName,
    items,
    subtotal,
    abandonedAt: new Date().toISOString(),
    emailSequence: 0,
    recovered: false,
    incentives: {
      discountApplied: false,
      freeShippingApplied: false
    },
    fingerprint,
    source
  };

  const body = serializeCartPayload(payload);

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const beaconSent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      if (!beaconSent) {
        await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        });
      }
    } else {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });
    }

    markThrottle(normalizedEmail, fingerprint);
  } catch (error) {
    console.error('Failed to log abandoned cart', error);
  }
}

export async function validateRecoveryCode(code: string): Promise<AbandonedCart | null> {
  if (!code) {
    return null;
  }

  try {
    const response = await fetch(`${ENDPOINT}?code=${encodeURIComponent(code)}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data?.cart) {
      return null;
    }

    return deserializeCart(data.cart);
  } catch (error) {
    console.error('Failed to validate recovery code', error);
    return null;
  }
}
