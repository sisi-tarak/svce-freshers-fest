-- Freshers Fest 2026 — Complete Database Schema

-- Internal Registrations
CREATE TABLE internal_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  roll_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  year INTEGER NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  price_paid NUMERIC DEFAULT 0,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'free' CHECK (payment_status IN ('free', 'pending', 'paid', 'failed')),
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- External Registrations
CREATE TABLE external_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  college_name TEXT NOT NULL,
  course TEXT NOT NULL,
  year INTEGER NOT NULL,
  phone TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  price_paid NUMERIC DEFAULT 199,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  ambassador_code TEXT,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hackathon Teams
CREATE TABLE hackathon_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  member_names JSONB NOT NULL DEFAULT '[]',
  lab_assignment TEXT,
  block_assignment TEXT,
  submission_url TEXT,
  scores JSONB,
  final_rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ambassadors
CREATE TABLE ambassadors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  college_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  registrations_count INTEGER DEFAULT 0,
  certificate_eligible BOOLEAN DEFAULT FALSE,
  star_ambassador BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsors
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'food')),
  logo_url TEXT,
  contact_person TEXT,
  contact_email TEXT,
  amount NUMERIC,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  is_confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Speakers
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  current_role TEXT,
  company TEXT,
  description TEXT,
  speaker_type TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE
);

-- Admin Users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ Entries
CREATE TABLE faq_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE
);

-- Helper function: Get external registration count
CREATE OR REPLACE FUNCTION get_external_count()
RETURNS INTEGER AS $$
  SELECT COALESCE(COUNT(*)::INTEGER, 0)
  FROM external_registrations
  WHERE payment_status = 'paid';
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function: Get SVCE price based on milestone
CREATE OR REPLACE FUNCTION get_svce_price()
RETURNS JSONB AS $$
DECLARE
  ext_count INTEGER;
  price INTEGER;
  tier TEXT;
  next_threshold INTEGER;
BEGIN
  SELECT get_external_count() INTO ext_count;
  CASE
    WHEN ext_count <= 200 THEN
      price := 99; tier := 'tier1'; next_threshold := 201;
    WHEN ext_count <= 400 THEN
      price := 49; tier := 'tier2'; next_threshold := 401;
    WHEN ext_count <= 600 THEN
      price := 19; tier := 'tier3'; next_threshold := 601;
    ELSE
      price := 0; tier := 'free'; next_threshold := NULL;
  END CASE;
  RETURN jsonb_build_object(
    'external_count', ext_count,
    'svce_price', price,
    'tier', tier,
    'next_threshold', next_threshold
  );
END;
$$ LANGUAGE PLPGSQL SECURITY DEFINER;

-- Enable Realtime on external_registrations
ALTER PUBLICATION supabase_realtime ADD TABLE external_registrations;
ALTER PUBLICATION supabase_realtime ADD TABLE internal_registrations;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('announcement_banner', '{"enabled": false, "text": ""}'),
  ('registration_open', '{"internal": true, "external": true}'),
  ('hackathon_registration_open', '{"enabled": true}');

-- Insert default FAQ entries
INSERT INTO faq_entries (question, answer, sort_order, is_visible) VALUES
  ('Who can attend?', 'Any student. SVCE students get sliding-scale pricing. External students pay ₹199.', 1, true),
  ('What does the ticket include?', 'Full access: hackathon, workshops, exhibitions, startup showcase, fun stalls, musical evening, meals.', 2, true),
  ('How does the sliding scale work?', 'As more external students register, internal price drops. Hit 600 external = SVCE students free.', 3, true),
  ('Can I participate in the hackathon from outside SVCE?', 'Yes! External participants can form teams and compete.', 4, true),
  ('What should I bring?', 'Laptop, charger, college ID. Everything else is provided.', 5, true),
  ('Is food included?', 'Yes. All meals and snacks are included for registered participants.', 6, true),
  ('How do I become a Campus Ambassador?', 'Apply via the form above. Bring 10+ students, get a free pass + certificate.', 7, true),
  ('Is the Musical Evening open to all?', 'Only registered participants with wristbands. No walk-ins.', 8, true),
  ('What are the hackathon team sizes?', '2 to 5 members per team. Cross-college teams allowed.', 9, true),
  ('How do I get my e-ticket?', 'Instantly after registration. PDF with QR code sent to your email and available for download.', 10, true);
