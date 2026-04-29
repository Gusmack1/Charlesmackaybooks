-- Migration: 0002_orders_shipping
-- Purpose: capture rich shipping/customer details on orders for address harvest
-- + post-purchase signup retro-link, plus stash stripe_customer_id.
-- Author: Angus Mackay <angus_mackay_@hotmail.com>, 2026-04-29

-- Add shipping + customer columns to orders
-- (existing shipping_address JSONB is preserved as a denormalised audit copy)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS stripe_customer_id   TEXT,
  ADD COLUMN IF NOT EXISTS shipping_full_name   TEXT,
  ADD COLUMN IF NOT EXISTS shipping_email       TEXT,
  ADD COLUMN IF NOT EXISTS shipping_phone       TEXT,
  ADD COLUMN IF NOT EXISTS shipping_line1       TEXT,
  ADD COLUMN IF NOT EXISTS shipping_line2       TEXT,
  ADD COLUMN IF NOT EXISTS shipping_city        TEXT,
  ADD COLUMN IF NOT EXISTS shipping_state       TEXT,
  ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT,
  ADD COLUMN IF NOT EXISTS shipping_country     TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_stripe_customer_id ON orders(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_shipping_email     ON orders(shipping_email);

-- ----------------------------------------------------------------
-- link_orders_to_user(p_email TEXT, p_user UUID)
-- After a guest checkout, when the customer signs up via magic link,
-- retroactively link their unattributed orders by matching email.
-- SECURITY DEFINER so it bypasses RLS — caller must be authenticated
-- AND must own p_user (we enforce auth.uid() = p_user inside the body).
-- Returns the number of orders updated.
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION link_orders_to_user(p_email TEXT, p_user UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller UUID;
  v_count  INTEGER;
BEGIN
  v_caller := auth.uid();

  -- Only the authenticated user themselves can attach orders to their own user_id.
  IF v_caller IS NULL OR v_caller <> p_user THEN
    RAISE EXCEPTION 'Unauthorized: caller does not match target user';
  END IF;

  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RETURN 0;
  END IF;

  WITH updated AS (
    UPDATE orders
       SET user_id    = p_user,
           updated_at = NOW()
     WHERE user_id IS NULL
       AND lower(email) = lower(p_email)
     RETURNING 1
  )
  SELECT COUNT(*) INTO v_count FROM updated;

  RETURN COALESCE(v_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION link_orders_to_user(TEXT, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION link_orders_to_user(TEXT, UUID) TO authenticated;

-- ----------------------------------------------------------------
-- Auto-create profile row for every new auth.users entry.
-- Idempotent: ON CONFLICT DO NOTHING so manual signup paths still work.
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
