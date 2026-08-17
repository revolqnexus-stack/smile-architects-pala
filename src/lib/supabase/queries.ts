import { supabase } from './client';
import type { Database } from './database.types';

// Type aliases for convenience
type Tables = Database['public']['Tables'];
export type Doctor = Tables['doctors']['Row'];
export type Treatment = Tables['treatments']['Row'];
export type DentalGuide = Tables['dental_guides']['Row'];
export type FAQ = Tables['faqs']['Row'];
export type PatientStory = Tables['patient_stories']['Row'];
export type Media = Tables['media']['Row'];
export type HomepageContent = Tables['homepage_content']['Row'];
export type SiteSetting = Tables['site_settings']['Row'];

// Helper to cast Supabase query results
function castResult<T>(data: unknown): T[] {
  return (data || []) as T[];
}

function castSingleResult<T>(data: unknown): T | null {
  return (data || null) as T | null;
}

// Doctors
export async function getDoctors() {
  const { data } = await supabase
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<Doctor>(data);
}

export async function getDoctor(id: string) {
  const { data } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();
  return castSingleResult<Doctor>(data);
}

// Treatments
export async function getTreatments() {
  const { data } = await supabase
    .from('treatments')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<Treatment>(data);
}

// Guides
export async function getGuides() {
  const { data } = await supabase
    .from('dental_guides')
    .select('*')
    .order('created_at', { ascending: false });
  return castResult<DentalGuide>(data);
}

// FAQs
export async function getFAQs() {
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<FAQ>(data);
}

// Patient Stories
export async function getPatientStories() {
  const { data } = await supabase
    .from('patient_stories')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<PatientStory>(data);
}

// Media
export async function getMedia() {
  const { data } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false });
  return castResult<Media>(data);
}

// Homepage Content
export async function getHomepageSection(section: string) {
  const { data } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('section', section)
    .single();
  return castSingleResult<HomepageContent>(data);
}

// Settings
export async function getSetting(key: string) {
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single();
  return castSingleResult<SiteSetting>(data);
}
