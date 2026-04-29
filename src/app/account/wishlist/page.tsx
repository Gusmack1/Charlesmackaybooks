import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { books } from '@/data/books';

const styles = {
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 24,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    marginBottom: 32,
  } as React.CSSProperties,
  card: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    background: 'var(--white)',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  cover: {
    width: '100%',
    aspectRatio: '3 / 4',
    position: 'relative' as const,
    marginBottom: 16,
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden' as const,
    background: 'var(--cream)',
  } as React.CSSProperties,
  bookTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 8,
  } as React.CSSProperties,
  bookAuthor: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 12,
  } as React.CSSProperties,
  bookPrice: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--gold)',
    marginBottom: 16,
  } as React.CSSProperties,
  buttonGroup: {
    display: 'flex',
    gap: 8,
    fontSize: 12,
  } as React.CSSProperties,
  button: {
    background: 'none',
    border: 'none',
    color: 'var(--gold)',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    fontSize: 13,
  } as React.CSSProperties,
  buttonDanger: {
    color: 'var(--error)',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: 40,
    color: 'var(--text-muted)',
  } as React.CSSProperties,
};

type WishlistItem = {
  user_id: string;
  book_id: string;
  added_at: string;
};

export default async function WishlistPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: wishlistItems } = await supabase
    .from('wishlist')
    .select('user_id, book_id, added_at')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const items = wishlistItems || [];
  const bookIndex = new Map(books.map((b) => [b.id, b]));

  return (
    <div>
      <h1 style={styles.heading}>Wishlist</h1>

      {items.length === 0 ? (
        <div style={styles.empty}>
          <p>
            No wishlist items yet.{' '}
            <Link href="/books">
              <span style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
                browse the library →
              </span>
            </Link>
          </p>
        </div>
      ) : (
        <div className="wishlist-grid" style={styles.grid}>
          {items.map((item) => {
            const book = bookIndex.get(item.book_id);
            const removeAction = async () => {
              'use server';
              const sb = await createClient();
              const { data: { user: u } } = await sb.auth.getUser();
              if (!u) return;
              await sb
                .from('wishlist')
                .delete()
                .eq('user_id', u.id)
                .eq('book_id', item.book_id);
            };
            if (!book) {
              return (
                <div key={item.book_id} style={styles.card}>
                  <div style={styles.bookTitle}>Book unavailable</div>
                  <div style={styles.bookAuthor}>ID: {item.book_id}</div>
                  <div style={styles.buttonGroup}>
                    <form action={removeAction} style={{ display: 'inline' }}>
                      <button
                        type="submit"
                        style={{ ...styles.button, ...styles.buttonDanger }}
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              );
            }
            const cover = book.imageUrl || `/book-covers/${book.id}.jpg`;
            return (
              <div key={item.book_id} style={styles.card}>
                <Link href={`/books/${book.id}`}>
                  <div style={styles.cover}>
                    <Image
                      src={cover}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <div style={styles.bookTitle}>{book.title}</div>
                <div style={styles.bookAuthor}>Charles E. MacKay</div>
                <div style={styles.bookPrice}>
                  {formatPrice(book.price)}
                </div>
                <div style={styles.buttonGroup}>
                  <Link href={`/books/${book.id}`}>
                    <span style={styles.button}>View</span>
                  </Link>
                  <span style={{ color: 'var(--border)' }}>•</span>
                  <form action={removeAction} style={{ display: 'inline' }}>
                    <button
                      type="submit"
                      style={{ ...styles.button, ...styles.buttonDanger }}
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
