'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '@/types/book';
import { trackAddToCart } from '@/components/GoogleAnalytics';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotal: () => number;
  getBulkDiscount: () => number;
  getShippingCost: (country?: string) => number;
  getFinalTotal: () => number;
  isBasketOpen: boolean;
  isCartOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('charles_mackay_cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('charles_mackay_cart', JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
    }
  }, [items, isClient]);

  const addToCart = (book: Book) => {
    if (!isClient) return;

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.book.id === book.id);

      // Track Google Analytics add to cart event
      trackAddToCart({
        item_id: book.id,
        item_name: book.title,
        category: book.category || 'Aviation Books',
        quantity: 1,
        price: book.price
      });

      if (existingItem) {
        return currentItems.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId: string) => {
    if (!isClient) return;
    setItems(currentItems => currentItems.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (!isClient) return;

    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!isClient) return;
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getTotalPrice();
  };

  const getBulkDiscount = () => {
    const total = getTotalItems();
    if (total >= 5) return getTotalPrice() * 0.15; // 15% discount for 5+ books
    if (total >= 3) return getTotalPrice() * 0.10; // 10% discount for 3+ books
    if (total >= 2) return getTotalPrice() * 0.05; // 5% discount for 2+ books
    return 0;
  };

  const getShippingCost = (country: string = 'GB') => {
    // Free shipping worldwide
    return 0;
  };

  const getFinalTotal = () => {
    const subtotal = getTotalPrice();
    const discount = getBulkDiscount();
    const shipping = getShippingCost();
    return subtotal - discount + shipping;
  };

  const cartItems = items.map(item => item.book);

  const openBasket = () => {
    if (!isClient) return;
    setIsBasketOpen(true);
  };

  const closeBasket = () => {
    if (!isClient) return;
    setIsBasketOpen(false);
  };

  const setIsCartOpen = (open: boolean) => {
    if (!isClient) return;
    setIsBasketOpen(open);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getTotal,
        getBulkDiscount,
        getShippingCost,
        getFinalTotal,
        isBasketOpen,
        isCartOpen: isBasketOpen,
        openBasket,
        closeBasket,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    if (typeof window === 'undefined') {
      return {
        items: [],
        cartItems: [],
        addToCart: () => {},
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
        getTotalItems: () => 0,
        getTotalPrice: () => 0,
        getTotal: () => 0,
        getBulkDiscount: () => 0,
        getShippingCost: (country?: string) => 0,
        getFinalTotal: () => 0,
        isBasketOpen: false,
        isCartOpen: false,
        openBasket: () => {},
        closeBasket: () => {},
        setIsCartOpen: () => {},
      };
    }
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
