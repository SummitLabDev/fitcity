-- Create signups table for storing membership registration data
CREATE TABLE IF NOT EXISTS signups (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  membership_id TEXT NOT NULL,
  membership_name TEXT NOT NULL,
  membership_price TEXT NOT NULL,
  membership_term TEXT NOT NULL,
  start_date TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  street TEXT NOT NULL,
  house_number TEXT NOT NULL,
  house_number_addition TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  mollie_payment_id TEXT,
  mollie_customer_id TEXT,
  mollie_subscription_id TEXT,
  email_sent_at TEXT
);

-- Index for looking up signups by Mollie payment ID
CREATE INDEX IF NOT EXISTS idx_signups_mollie_payment_id ON signups(mollie_payment_id);

-- Index for looking up signups by email
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);

-- Index for looking up signups by status
CREATE INDEX IF NOT EXISTS idx_signups_status ON signups(status);
