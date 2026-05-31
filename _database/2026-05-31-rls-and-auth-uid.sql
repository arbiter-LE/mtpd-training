-- ═══════════════════════════════════════════════════════
-- Arbiter LE — RLS Setup & auth_uid Migration
-- Run this in Supabase SQL Editor (arbiterle project)
-- ═══════════════════════════════════════════════════════

-- Step 1: Add auth_uid column to officers table (if not already there)
ALTER TABLE officers ADD COLUMN IF NOT EXISTS auth_uid UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_officers_auth_uid ON officers(auth_uid);

-- Step 2: Enable Row Level Security on both tables
ALTER TABLE officers   ENABLE ROW LEVEL SECURITY;
ALTER TABLE completions ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop any existing policies (clean slate)
DROP POLICY IF EXISTS "Officers can read own record"     ON officers;
DROP POLICY IF EXISTS "Admins can read all officers"     ON officers;
DROP POLICY IF EXISTS "Officers can read own completions"   ON completions;
DROP POLICY IF EXISTS "Officers can write own completions"  ON completions;
DROP POLICY IF EXISTS "Admins can read all completions"     ON completions;

-- Step 4: Officers table policies
-- Officers can only read their own row
CREATE POLICY "Officers can read own record"
  ON officers FOR SELECT
  USING (auth.uid() = auth_uid);

-- Admins can read all officers
CREATE POLICY "Admins can read all officers"
  ON officers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM officers o
      WHERE o.auth_uid = auth.uid() AND o.role = 'admin'
    )
  );

-- Step 5: Completions table policies
-- Officers can read their own completions
CREATE POLICY "Officers can read own completions"
  ON completions FOR SELECT
  USING (
    badge_number = (
      SELECT badge_number FROM officers WHERE auth_uid = auth.uid() LIMIT 1
    )
  );

-- Officers can insert/update their own completions
CREATE POLICY "Officers can write own completions"
  ON completions FOR ALL
  USING (
    badge_number = (
      SELECT badge_number FROM officers WHERE auth_uid = auth.uid() LIMIT 1
    )
  );

-- Admins can read all completions
CREATE POLICY "Admins can read all completions"
  ON completions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM officers o
      WHERE o.auth_uid = auth.uid() AND o.role = 'admin'
    )
  );

-- ═══════════════════════════════════════════════════════
-- After running the above, you need to link each officer's
-- auth_uid to their Supabase Auth user UUID.
--
-- For each officer, find their UUID in:
--   Supabase Dashboard → Authentication → Users
-- Then run:
--   UPDATE officers SET auth_uid = '<uuid-here>' WHERE badge_number = '<badge>';
--
-- Example:
--   UPDATE officers SET auth_uid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE badge_number = '7903';
-- ═══════════════════════════════════════════════════════
