# Smile Architects CMS - Setup Guide

## ✅ What's Been Configured

### 1. Database
- **Schema created:** All tables (doctors, treatments, guides, stories, FAQs, media, etc.)
- **RLS policies:** Public can read published content, admins can manage everything
- **Indexes:** Optimized for common queries
- **Triggers:** Auto-update timestamps

### 2. Authentication
- **Supabase Auth:** Configured and ready
- **Admin user created:** drjeosmilearchitects@gmail.com / Smile@revolq2026
- **Protected routes:** `/jeotomadmin/*` requires authentication

### 3. Storage
- **Bucket:** `site-media` for image uploads
- **Policies:** Public read, authenticated upload/delete

### 4. Environment
- **`.env.local`:** Configured with your Supabase credentials

### 5. Admin Pages Created
- ✅ `/jeotomadmin/login` - Login page
- ✅ `/jeotomadmin/dashboard` - Main dashboard
- ✅ Admin layout component with sidebar

---

## 🚀 How to Access the CMS

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/jeotomadmin/login
   ```

3. **Login with:**
   - Email: `drjeosmilearchitects@gmail.com`
   - Password: `Smile@revolq2026`

4. **You'll see the dashboard** with sections for:
   - Homepage
   - Doctors
   - Treatments
   - Guides
   - Patient Stories
   - FAQs
   - Media
   - Settings

---

## 📋 What Needs to Be Built (Individual Section Pages)

Each section follows the same pattern. Here's the structure:

### Pattern for Each CMS Section:

```
/jeotomadmin/[section]/
  ├── page.tsx          (List view - shows all items)
  ├── new/
  │   └── page.tsx      (Create new item)
  └── [id]/
      ├── page.tsx      (View single item)
      └── edit/
          └── page.tsx  (Edit single item)
```

### Sections That Need Pages:

1. **Homepage** (`/jeotomadmin/homepage`)
   - Edit hero content
   - Edit stats
   - Edit clinic hours
   - Edit feature cards

2. **Doctors** (`/jeotomadmin/doctors`)
   - List all doctors
   - Add new doctor
   - Edit doctor
   - Upload doctor photo
   - Publish/unpublish

3. **Treatments** (`/jeotomadmin/treatments`)
   - List all treatments
   - Add new treatment
   - Edit treatment content
   - Upload treatment images
   - SEO fields
   - Publish/unpublish

4. **Dental Guides** (`/jeotomadmin/guides`)
   - List all guides
   - Create new guide
   - Rich text editor for content
   - Upload cover image
   - Draft/publish

5. **Patient Stories** (`/jeotomadmin/patient-stories`)
   - List stories
   - Add new story
   - Upload before/after images
   - Assign treatment/doctor
   - Publish/unpublish

6. **FAQs** (`/jeotomadmin/faqs`)
   - List FAQs
   - Add FAQ
   - Organize by category
   - Reorder FAQs

7. **Media Library** (`/jeotomadmin/media`)
   - Grid of uploaded images
   - Upload new image
   - Delete image
   - Select image (for use in other sections)

8. **Settings** (`/jeotomadmin/settings`)
   - Edit clinic info
   - Edit contact details
   - Edit opening hours
   - Edit social links

---

## 🔧 How to Build Each Section

### Example: Doctors List Page

Create: `src/app/jeotomadmin/doctors/page.tsx`

```typescript
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

export default async function DoctorsPage() {
  const session = await getSession();
  if (!session) redirect('/jeotomadmin/login');

  // Fetch doctors from database
  const { data: doctors } = await supabase
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <AdminLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1>Doctors</h1>
          <Link href="/jeotomadmin/doctors/new">
            <button>+ Add Doctor</button>
          </Link>
        </div>

        <div>
          {doctors?.map((doctor) => (
            <div key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <Link href={`/jeotomadmin/doctors/${doctor.id}/edit`}>
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

### Example: Add New Doctor Form

Create: `src/app/jeotomadmin/doctors/new/page.tsx`

```typescript
'use client';

import { useState } from 'use';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewDoctorPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [specialty, setSpecialty] = useState('');
  // ... more fields

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('doctors')
      .insert({
        name,
        qualifications,
        specialty,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        published: true,
      });

    if (!error) {
      router.push('/jeotomadmin/doctors');
    }
  };

  return (
    <AdminLayout>
      <h1>Add New Doctor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor Name"
          required
        />
        {/* More fields... */}
        <button type="submit">Save</button>
      </form>
    </AdminLayout>
  );
}
```

---

## 📸 Image Upload Component

Create: `src/components/admin/ImageUpload.tsx`

```typescript
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('site-media')
      .upload(filePath, file);

    if (error) {
      alert('Upload failed');
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('site-media')
      .getPublicUrl(filePath);

    // Save to media table
    await supabase.from('media').insert({
      filename: file.name,
      storage_path: filePath,
      public_url: publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
    });

    onUploadComplete(publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

---

## 🔄 Migration: Import Existing Content

Create: `src/lib/migrate-content.ts`

```typescript
import { supabase } from './supabase/client';
import { DOCTORS, TREATMENTS } from './site-config';

export async function migrateExistingContent() {
  // Migrate doctors
  for (const doctor of DOCTORS) {
    await supabase.from('doctors').insert({
      slug: doctor.slug,
      name: doctor.name,
      photo_url: doctor.photo,
      qualifications: doctor.qualifications,
      specialty: doctor.specialty,
      designation: doctor.roles[0],
      roles: doctor.roles,
      bio: doctor.bio,
      visiting: doctor.visiting,
      registration_body: doctor.registrationBody,
      registration_number: doctor.registrationNumber,
      registration_year: doctor.registrationYear,
      memberships: doctor.memberships,
      education: doctor.education,
      professional_experience: doctor.professionalExperience,
      training: doctor.training,
      areas_of_expertise: doctor.areasOfExpertise,
      seo_title: doctor.seo.title,
      seo_description: doctor.seo.description,
      published: true,
    });
  }

  // Migrate treatments
  for (const treatment of TREATMENTS) {
    await supabase.from('treatments').insert({
      slug: treatment.slug,
      title: treatment.title,
      short_description: treatment.shortDescription,
      icon: treatment.icon,
      featured: treatment.featured,
      published: true,
    });
  }

  console.log('Migration complete!');
}
```

Run this once to populate the database with existing content.

---

## 🎯 Next Steps

1. **Test the login:** Go to `/jeotomadmin/login` and sign in
2. **Build remaining pages** following the patterns above
3. **Create the migration script** and run it to populate the database
4. **Update public pages** to read from Supabase instead of `site-config.ts`

---

## 🔐 Security Checklist

- ✅ RLS policies enabled
- ✅ Authentication required for admin routes
- ✅ Public can only read published content
- ✅ Storage bucket has proper policies
- ⚠️ Never expose `SUPABASE_SECRET_KEY` in frontend code
- ⚠️ Always validate and sanitize user input

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Database Tables Schema](./supabase/migrations/001_initial_schema.sql)

---

**The foundation is complete. Now build out each section page following the patterns above!**
