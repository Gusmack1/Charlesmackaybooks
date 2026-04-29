-- Marketing opt-in for charlesmackaybooks.com customers.
-- UK GDPR / PECR compliance: explicit opt-in, no pre-tick.
-- Author: Angus Mackay <angus_mackay_@hotmail.com>, 2026-04-29

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS marketing_opt_in boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS marketing_opt_in_ts timestamptz NULL,
  ADD COLUMN IF NOT EXISTS marketing_opt_in_source text NULL;  -- 'checkout', 'account-page', 'magic-link-signup'

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS marketing_opt_in_at_checkout boolean NOT NULL DEFAULT false;

-- index for "send to all opted-in" mailings
CREATE INDEX IF NOT EXISTS profiles_marketing_opt_in_idx
  ON public.profiles (marketing_opt_in) WHERE marketing_opt_in = true;
