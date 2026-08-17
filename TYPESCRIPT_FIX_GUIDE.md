# TypeScript Fix Guide

## The Problem

Next.js Server Components with Supabase return `never[]` type when not explicitly typed, causing TypeScript errors like:

```
error TS2339: Property 'name' does not exist on type 'never'.
```

## The Solution

Add explicit type assertions to all Supabase queries in Server Components.

## Pattern to Follow

### BEFORE (causes error):
```typescript
const { data: doctors } = await supabase
  .from('doctors')
  .select('*');

// doctors is typed as never[]
```

### AFTER (fixed):
```typescript
import type { Database } from '@/lib/supabase/database.types';

const { data } = await supabase
  .from('doctors')
  .select('*');

const doctors = (data || []) as Database['public']['Tables']['doctors']['Row'][];
```

## Quick Fix for All Admin Pages

### 1. Doctors List (`/jeotomadmin/doctors/page.tsx`)

```typescript
const { data } = await supabase
  .from('doctors')
  .select('*')
  .order('display_order', { ascending: true });

const doctors = (data || []) as Database['public']['Tables']['doctors']['Row'][];
```

### 2. Doctors Edit (`/jeotomadmin/doctors/[id]/edit/page.tsx`)

Add at top:
```typescript
import type { Database } from '@/lib/supabase/database.types';
type Doctor = Database['public']['Tables']['doctors']['Row'];
```

In fetchDoctor function:
```typescript
const { data, error } = await supabase
  .from('doctors')
  .select('*')
  .eq('id', doctorId)
  .single();

if (error) throw error;

const doctor = data as Doctor;
if (doctor) {
  setName(doctor.name);
  // ... rest of assignments
}
```

### 3. Treatments (`/jeotomadmin/treatments/page.tsx`)

```typescript
const { data } = await supabase
  .from('treatments')
  .select('*')
  .order('display_order', { ascending: true });

const treatments = (data || []) as Database['public']['Tables']['treatments']['Row'][];
```

### 4. Guides (`/jeotomadmin/guides/page.tsx`)

```typescript
const { data } = await supabase
  .from('dental_guides')
  .select('*')
  .order('created_at', { ascending: false });

const guides = (data || []) as Database['public']['Tables']['dental_guides']['Row'][];
```

### 5. FAQs (`/jeotomadmin/faqs/page.tsx`)

```typescript
const { data } = await supabase
  .from('faqs')
  .select('*')
  .order('display_order', { ascending: true });

const faqs = (data || []) as Database['public']['Tables']['faqs']['Row'][];
```

### 6. Patient Stories (`/jeotomadmin/patient-stories/page.tsx`)

```typescript
const { data } = await supabase
  .from('patient_stories')
  .select('*')
  .order('display_order', { ascending: true});

const stories = (data || []) as Database['public']['Tables']['patient_stories']['Row'][];
```

### 7. Media (`/jeotomadmin/media/page.tsx`)

```typescript
const { data: mediaFiles } = await supabase
  .from('media')
  .select('*')
  .order('created_at', { ascending: false});

const media = (mediaFiles || []) as Database['public']['Tables']['media']['Row'][];
```

### 8. Homepage (`/jeotomadmin/homepage/page.tsx`)

Client component - no fix needed (uses useState/useEffect).

### 9. Settings (`/jeotomadmin/settings/page.tsx`)

Client component - no fix needed.

## Client Components (No TypeScript Errors)

These don't need fixes because they're client components with proper type inference:
- All `/new/page.tsx` files
- All `/[id]/edit/page.tsx` files
- Homepage editor
- Settings
- Media library client

## Alternative: Use Server Helper

Create `/lib/supabase/queries.ts`:

```typescript
import { supabase } from './client';
import type { Database } from './database.types';

type Tables = Database['public']['Tables'];

export async function getDoctors() {
  const { data } = await supabase
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true });
  
  return (data || []) as Tables['doctors']['Row'][];
}

export async function getTreatments() {
  const { data } = await supabase
    .from('treatments')
    .select('*')
    .order('display_order', { ascending: true });
  
  return (data || []) as Tables['treatments']['Row'][];
}

// ... more helper functions
```

Then in pages:

```typescript
import { getDoctors } from '@/lib/supabase/queries';

const doctors = await getDoctors();
```

## Run Build to Verify

After fixing each file:

```bash
npm run build
```

Fix one file at a time and verify the error count decreases.

## Expected Result

After all fixes:
```bash
npm run build
# ✓ Compiled successfully
```
