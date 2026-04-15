'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
    marginBottom: 32,
  } as React.CSSProperties,
  card: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    background: 'var(--white)',
    position: 'relative' as const,
  } as React.CSSProperties,
  cardDefault: {
    border: '2px solid var(--gold)',
  } as React.CSSProperties,
  defaultBadge: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 11,
    fontWeight: 600,
    background: 'var(--gold)',
    color: 'var(--navy)',
  } as React.CSSProperties,
  address: {
    fontSize: 14,
    lineHeight: 1.6,
    color: 'var(--text-body)',
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
  } as React.CSSProperties,
  buttonDanger: {
    color: 'var(--error)',
  } as React.CSSProperties,
  addButton: {
    padding: '12px 24px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gold)',
    background: 'var(--cream)',
    color: 'var(--navy)',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: 40,
    color: 'var(--text-muted)',
  } as React.CSSProperties,
  modal: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  } as React.CSSProperties,
  modalContent: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: 32,
    maxWidth: 400,
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
  } as React.CSSProperties,
  modalTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--navy)',
    marginBottom: 16,
  } as React.CSSProperties,
  formGroup: {
    marginBottom: 16,
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-dark)',
    marginBottom: 6,
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    fontSize: 14,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  submitButton: {
    width: '100%',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--navy)',
    color: 'var(--cream)',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
    marginTop: 8,
  } as React.CSSProperties,
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    padding: 0,
    color: 'var(--text-muted)',
    position: 'absolute' as const,
    top: 16,
    right: 16,
  } as React.CSSProperties,
};

type Address = {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  postcode: string;
  country: string;
  is_default: boolean;
};

export default function AddressesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    line1: '',
    line2: '',
    city: '',
    postcode: '',
    country: '',
  });

  // Load addresses on mount
  const loadAddresses = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('is_default', { ascending: false });
      setAddresses(data || []);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    try {
      if (editingId) {
        await supabase
          .from('addresses')
          .update(formData)
          .eq('id', editingId);
      } else {
        await supabase.from('addresses').insert({
          ...formData,
          user_id: session.user.id,
        });
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ line1: '', line2: '', city: '', postcode: '', country: '' });
      loadAddresses();
    } catch (error: any) {
      console.error('Error saving address:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      await supabase.from('addresses').delete().eq('id', id);
      loadAddresses();
    }
  };

  // Handle set default
  const handleSetDefault = async (id: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', session.user.id);

    await supabase.from('addresses').update({ is_default: true }).eq('id', id);

    loadAddresses();
  };

  // Handle edit
  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      line1: address.line1,
      line2: address.line2 || '',
      city: address.city,
      postcode: address.postcode,
      country: address.country,
    });
    setShowModal(true);
  };

  // Load on mount
  if (loading && addresses.length === 0) {
    loadAddresses();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={styles.heading}>Saved Addresses</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ line1: '', line2: '', city: '', postcode: '', country: '' });
            setShowModal(true);
          }}
          style={styles.addButton}
        >
          + Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div style={styles.empty}>
          <p>
            No saved addresses. Add one to speed up checkout on your next purchase.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                ...styles.card,
                ...(addr.is_default ? styles.cardDefault : {}),
              }}
            >
              {addr.is_default && (
                <span style={styles.defaultBadge}>DEFAULT</span>
              )}
              <div style={styles.address}>
                {addr.line1}
                {addr.line2 && (
                  <>
                    <br />
                    {addr.line2}
                  </>
                )}
                <br />
                {addr.city}, {addr.postcode}
                <br />
                {addr.country}
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleEdit(addr)}
                  style={styles.button}
                >
                  Edit
                </button>
                {!addr.is_default && (
                  <>
                    <span style={{ color: 'var(--border)' }}>•</span>
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      style={styles.button}
                    >
                      Set Default
                    </button>
                  </>
                )}
                <span style={{ color: 'var(--border)' }}>•</span>
                <button
                  onClick={() => handleDelete(addr.id)}
                  style={{ ...styles.button, ...styles.buttonDanger }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={styles.closeButton}
            >
              ×
            </button>
            <h2 style={styles.modalTitle}>
              {editingId ? 'Edit Address' : 'Add Address'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address Line 1 *</label>
                <input
                  style={styles.input}
                  type="text"
                  required
                  value={formData.line1}
                  onChange={(e) =>
                    setFormData({ ...formData, line1: e.target.value })
                  }
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address Line 2</label>
                <input
                  style={styles.input}
                  type="text"
                  value={formData.line2}
                  onChange={(e) =>
                    setFormData({ ...formData, line2: e.target.value })
                  }
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>City *</label>
                <input
                  style={styles.input}
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Postcode *</label>
                <input
                  style={styles.input}
                  type="text"
                  required
                  value={formData.postcode}
                  onChange={(e) =>
                    setFormData({ ...formData, postcode: e.target.value })
                  }
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Country *</label>
                <input
                  style={styles.input}
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                {editingId ? 'Update Address' : 'Add Address'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
