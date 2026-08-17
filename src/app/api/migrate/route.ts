/**
 * ONE-TIME CONTENT MIGRATION API
 * POST /api/migrate?secret=<MIGRATION_SECRET>
 *
 * Migrates all existing hardcoded content from the codebase into Supabase.
 * - Idempotent: uses upsert on slug — safe to run multiple times
 * - Server-side only: uses service role key, never exposed to browser
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  MIGRATE_DOCTORS,
  MIGRATE_TREATMENTS,
  MIGRATE_GUIDES,
  MIGRATE_PATIENT_STORIES,
  MIGRATE_FAQS,
  MIGRATE_SITE_SETTINGS,
} from '@/lib/migration-data';

// Guard against accidental public calls
const MIGRATION_SECRET = process.env.MIGRATION_SECRET || 'migrate-smile-architects-2026';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE env vars');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== MIGRATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAdminClient();
  const results: Record<string, { success: number; errors: string[] }> = {};

  // ── 1. DOCTORS ─────────────────────────────────────────────────────────────
  results.doctors = { success: 0, errors: [] };
  for (const doc of MIGRATE_DOCTORS) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('doctors')
      .upsert(doc, { onConflict: 'slug' });
    if (error) results.doctors.errors.push(`${doc.slug}: ${error.message}`);
    else results.doctors.success++;
  }

  // ── 2. TREATMENTS ──────────────────────────────────────────────────────────
  results.treatments = { success: 0, errors: [] };
  for (const t of MIGRATE_TREATMENTS) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('treatments')
      .upsert(t, { onConflict: 'slug' });
    if (error) results.treatments.errors.push(`${t.slug}: ${error.message}`);
    else results.treatments.success++;
  }

  // ── 3. DENTAL GUIDES ───────────────────────────────────────────────────────
  results.guides = { success: 0, errors: [] };
  for (const g of MIGRATE_GUIDES) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('dental_guides')
      .upsert(
        { ...g, published_at: new Date().toISOString() },
        { onConflict: 'slug' }
      );
    if (error) results.guides.errors.push(`${g.slug}: ${error.message}`);
    else results.guides.success++;
  }

  // ── 4. PATIENT STORIES ─────────────────────────────────────────────────────
  results.patient_stories = { success: 0, errors: [] };
  for (const story of MIGRATE_PATIENT_STORIES) {
    // Check if story already exists by title (no slug field)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabase as any)
      .from('patient_stories')
      .select('id')
      .eq('title', story.title)
      .single();

    if (existing) {
      // Update existing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('patient_stories')
        .update(story)
        .eq('id', existing.id);
      if (error) results.patient_stories.errors.push(`${story.title}: ${error.message}`);
      else results.patient_stories.success++;
    } else {
      // Insert new
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('patient_stories')
        .insert(story);
      if (error) results.patient_stories.errors.push(`${story.title}: ${error.message}`);
      else results.patient_stories.success++;
    }
  }

  // ── 5. FAQS ────────────────────────────────────────────────────────────────
  results.faqs = { success: 0, errors: [] };
  for (const faq of MIGRATE_FAQS) {
    // Check if FAQ already exists by question
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabase as any)
      .from('faqs')
      .select('id')
      .eq('question', faq.question)
      .single();

    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('faqs')
        .update(faq)
        .eq('id', existing.id);
      if (error) results.faqs.errors.push(`FAQ: ${error.message}`);
      else results.faqs.success++;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('faqs')
        .insert(faq);
      if (error) results.faqs.errors.push(`FAQ: ${error.message}`);
      else results.faqs.success++;
    }
  }

  // ── 6. SITE SETTINGS ───────────────────────────────────────────────────────
  results.site_settings = { success: 0, errors: [] };
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('site_settings')
      .upsert(MIGRATE_SITE_SETTINGS, { onConflict: 'key' });
    if (error) results.site_settings.errors.push(error.message);
    else results.site_settings.success++;
  }

  // ── SUMMARY ────────────────────────────────────────────────────────────────
  const summary = {
    status: 'Migration complete',
    timestamp: new Date().toISOString(),
    results: {
      doctors: `${results.doctors.success}/${MIGRATE_DOCTORS.length}`,
      treatments: `${results.treatments.success}/${MIGRATE_TREATMENTS.length}`,
      guides: `${results.guides.success}/${MIGRATE_GUIDES.length}`,
      patient_stories: `${results.patient_stories.success}/${MIGRATE_PATIENT_STORIES.length}`,
      faqs: `${results.faqs.success}/${MIGRATE_FAQS.length}`,
      site_settings: `${results.site_settings.success}/1`,
    },
    errors: Object.fromEntries(
      Object.entries(results)
        .filter(([, v]) => v.errors.length > 0)
        .map(([k, v]) => [k, v.errors])
    ),
  };

  const hasErrors = Object.values(results).some(r => r.errors.length > 0);
  return NextResponse.json(summary, { status: hasErrors ? 207 : 200 });
}

// GET: just verify the route is reachable
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== MIGRATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({
    message: 'Migration endpoint ready. Send POST request to run migration.',
    counts: {
      doctors: MIGRATE_DOCTORS.length,
      treatments: MIGRATE_TREATMENTS.length,
      guides: MIGRATE_GUIDES.length,
      patient_stories: MIGRATE_PATIENT_STORIES.length,
      faqs: MIGRATE_FAQS.length,
    },
  });
}
