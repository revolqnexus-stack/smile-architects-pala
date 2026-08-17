import { createClient } from '@supabase/supabase-js';
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

// Use service role key server-side (bypasses RLS), fall back to anon client
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    return createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return supabase;
}

// Helper to cast Supabase query results
function castResult<T>(data: unknown): T[] {
  return (data || []) as T[];
}

function castSingleResult<T>(data: unknown): T | null {
  return (data || null) as T | null;
}

// Doctors
export async function getDoctors() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<Doctor>(data);
}

export async function getDoctor(id: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();
  return castSingleResult<Doctor>(data);
}

// Treatments
export async function getTreatments() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('treatments')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<Treatment>(data);
}

// Guides
export async function getGuides() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('dental_guides')
    .select('*')
    .order('created_at', { ascending: false });
  return castResult<DentalGuide>(data);
}

// FAQs
export async function getFAQs() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<FAQ>(data);
}

// Patient Stories
export async function getPatientStories() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('patient_stories')
    .select('*')
    .order('display_order', { ascending: true });
  return castResult<PatientStory>(data);
}

// Media
export async function getMedia() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('media')
    .select('*')
    .order('created_at', { ascending: false });
  return castResult<Media>(data);
}

// Homepage Content
export async function getHomepageSection(section: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('homepage_content')
    .select('*')
    .eq('section', section)
    .single();
  return castSingleResult<HomepageContent>(data);
}

// Settings
export async function getSetting(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (getClient() as any)
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single();
  return castSingleResult<SiteSetting>(data);
}
