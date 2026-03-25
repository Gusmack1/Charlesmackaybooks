'use client';
import { useCart } from '@/context/CartContext';
import type { Book } from '@/types/book';

export default function AddToBasketButton({ book, variant = 'primary' }: { book: Book; variant?: 'primary' | 'secondary' }) {
  const { addToCart, openBasket } = useCart();

  const handleAdd = () => {
    addToCart(book);
    openBasket();
  };

  const styles = variant === 'primary'
    ? { padding: '16px 32px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 16, fontWeight: 700 as const, cursor: 'pointer' }
    : { padding: '10px 20px', background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

  return (
    <button onClick={handleAdd} style={styles}>
      Add to basket
    </button>
  );
}
