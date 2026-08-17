-- Smile Architects CMS Database Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SITE SETTINGS
-- ============================================================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_site_settings_key ON site_settings(key);

-- ============================================================================
-- HOMEPAGE CONTENT
-- ============================================================================
CREATE TABLE homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL,
  content JSONB NOT NULL,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_homepage_section ON homepage_content(section);
CREATE INDEX idx_homepage_published ON homepage_content(published);

-- ============================================================================
-- DOCTORS
-- ============================================================================
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  qualifications TEXT NOT NULL,
  specialty TEXT NOT NULL,
  designation TEXT,
  roles TEXT[] DEFAULT '{}',
  bio TEXT,
  visiting BOOLEAN DEFAULT false,
  
  -- Registration
  registration_body TEXT,
  registration_number TEXT,
  registration_year TEXT,
  
  -- Professional details
  memberships TEXT[] DEFAULT '{}',
  education JSONB DEFAULT '[]',
  professional_experience TEXT[] DEFAULT '{}',
  training TEXT[] DEFAULT '{}',
  areas_of_expertise TEXT[] DEFAULT '{}',
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  
  -- Publishing
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_doctors_slug ON doctors(slug);
CREATE INDEX idx_doctors_published ON doctors(published);
CREATE INDEX idx_doctors_display_order ON doctors(display_order);

-- ============================================================================
-- TREATMENTS
-- ============================================================================
CREATE TABLE treatments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  hero_image_url TEXT,
  content TEXT,
  benefits TEXT[] DEFAULT '{}',
  icon TEXT,
  
  -- Relationships
  doctor_id UUID REFERENCES doctors(id),
  related_treatment_ids UUID[] DEFAULT '{}',
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  
  -- Publishing
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_treatments_slug ON treatments(slug);
CREATE INDEX idx_treatments_published ON treatments(published);
CREATE INDEX idx_treatments_featured ON treatments(featured);
CREATE INDEX idx_treatments_display_order ON treatments(display_order);

-- ============================================================================
-- DENTAL GUIDES
-- ============================================================================
CREATE TABLE dental_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  
  -- Categorization
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  author TEXT,
  
  -- Related
  related_treatment_ids UUID[] DEFAULT '{}',
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  
  -- Publishing
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_guides_slug ON dental_guides(slug);
CREATE INDEX idx_guides_status ON dental_guides(status);
CREATE INDEX idx_guides_category ON dental_guides(category);
CREATE INDEX idx_guides_published_at ON dental_guides(published_at);

-- ============================================================================
-- PATIENT STORIES
-- ============================================================================
CREATE TABLE patient_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  testimonial TEXT,
  
  -- Images
  before_image_url TEXT,
  after_image_url TEXT,
  
  -- Relationships
  treatment_id UUID REFERENCES treatments(id),
  doctor_id UUID REFERENCES doctors(id),
  
  -- Publishing
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_stories_published ON patient_stories(published);
CREATE INDEX idx_stories_featured ON patient_stories(featured);
CREATE INDEX idx_stories_display_order ON patient_stories(display_order);

-- ============================================================================
-- FAQs
-- ============================================================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  
  -- Relationships (optional - FAQ can be general or associated)
  treatment_id UUID REFERENCES treatments(id),
  guide_id UUID REFERENCES dental_guides(id),
  
  -- Publishing
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_published ON faqs(published);
CREATE INDEX idx_faqs_display_order ON faqs(display_order);
CREATE INDEX idx_faqs_treatment ON faqs(treatment_id);
CREATE INDEX idx_faqs_guide ON faqs(guide_id);

-- ============================================================================
-- MEDIA LIBRARY
-- ============================================================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_media_filename ON media(filename);
CREATE INDEX idx_media_mime_type ON media(mime_type);
CREATE INDEX idx_media_created_at ON media(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dental_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published content)
CREATE POLICY "Public can read published doctors"
  ON doctors FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published treatments"
  ON treatments FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published guides"
  ON dental_guides FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read published stories"
  ON patient_stories FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published FAQs"
  ON faqs FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published homepage content"
  ON homepage_content FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can read media"
  ON media FOR SELECT
  USING (true);

-- Admin policies (authenticated users can do everything)
CREATE POLICY "Authenticated users can manage site_settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage homepage_content"
  ON homepage_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage doctors"
  ON doctors FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage treatments"
  ON treatments FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage guides"
  ON dental_guides FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage stories"
  ON patient_stories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Note: Storage bucket creation must be done via Supabase dashboard or API
-- Bucket name: site-media
-- Public access: true (for public images)
-- File size limit: 5MB recommended
-- Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp

-- Storage policies will be:
-- 1. Public can read all files in site-media bucket
-- 2. Authenticated users can upload to site-media bucket
-- 3. Authenticated users can delete from site-media bucket

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all content tables
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON treatments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON dental_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON patient_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homepage_updated_at BEFORE UPDATE ON homepage_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
