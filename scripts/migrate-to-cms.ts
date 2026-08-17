/**
 * Migration Script: Import existing site-config.ts data into Supabase CMS
 * 
 * Run this once to populate the database with existing content:
 * npx ts-node --compiler-options '{"module":"commonjs"}' scripts/migrate-to-cms.ts
 */

import { createClient } from '@supabase/supabase-js';
import { DOCTORS, TREATMENTS, FAQS_GENERAL } from '../src/lib/site-config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateDoctors() {
  console.log('\n📋 Migrating doctors...');
  
  for (const doctor of DOCTORS) {
    const { error } = await supabase.from('doctors').upsert({
      id: doctor.id,
      slug: doctor.slug,
      name: doctor.name,
      photo_url: doctor.photo,
      qualifications: doctor.qualifications,
      specialty: doctor.specialty,
      designation: doctor.roles[0] || null,
      roles: doctor.roles,
      bio: doctor.bio,
      visiting: doctor.visiting,
      registration_body: doctor.registrationBody || null,
      registration_number: doctor.registrationNumber || null,
      registration_year: doctor.registrationYear || null,
      memberships: doctor.memberships.length > 0 ? doctor.memberships : null,
      education: doctor.education,
      professional_experience: doctor.professionalExperience.length > 0 ? doctor.professionalExperience : null,
      training: doctor.training.length > 0 ? doctor.training : null,
      areas_of_expertise: doctor.areasOfExpertise.length > 0 ? doctor.areasOfExpertise : null,
      seo_title: doctor.seo.title,
      seo_description: doctor.seo.description,
      published: true,
    }, {
      onConflict: 'slug',
    });

    if (error) {
      console.error(`  ❌ Failed to migrate ${doctor.name}:`, error.message);
    } else {
      console.log(`  ✅ Migrated: ${doctor.name}`);
    }
  }
}

async function migrateTreatments() {
  console.log('\n🦷 Migrating treatments...');
  
  for (const treatment of TREATMENTS) {
    const { error } = await supabase.from('treatments').upsert({
      id: treatment.id,
      slug: treatment.slug,
      title: treatment.title,
      short_description: treatment.shortDescription,
      icon: treatment.icon,
      featured: treatment.featured,
      published: true,
    }, {
      onConflict: 'slug',
    });

    if (error) {
      console.error(`  ❌ Failed to migrate ${treatment.title}:`, error.message);
    } else {
      console.log(`  ✅ Migrated: ${treatment.title}`);
    }
  }
}

async function migrateFAQs() {
  console.log('\n❓ Migrating FAQs...');
  
  for (let i = 0; i < FAQS_GENERAL.length; i++) {
    const faq = FAQS_GENERAL[i];
    const { error } = await supabase.from('faqs').upsert({
      question: faq.question,
      answer: faq.answer,
      category: 'General',
      published: true,
      display_order: i + 1,
    }, {
      onConflict: 'question',
      ignoreDuplicates: false,
    });

    if (error) {
      console.error(`  ❌ Failed to migrate FAQ:`, error.message);
    } else {
      console.log(`  ✅ Migrated: ${faq.question.substring(0, 50)}...`);
    }
  }
}

async function main() {
  console.log('🚀 Starting migration from site-config.ts to Supabase CMS\n');
  console.log('='.repeat(60));
  
  try {
    await migrateDoctors();
    await migrateTreatments();
    await migrateFAQs();
    
    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Visit http://localhost:3000/jeotomadmin/login');
    console.log('2. Login with: drjeosmilearchitects@gmail.com');
    console.log('3. Verify migrated content in each section');
    console.log('4. Start adding images and additional content\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
