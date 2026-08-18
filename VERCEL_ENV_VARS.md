# Vercel Environment Variables

Copy these environment variables to your Vercel project settings:

## Required Environment Variables

Add these in your Vercel Dashboard → Project Settings → Environment Variables:

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://eaqxeasrmlisaijpfkqt.supabase.co
```
- **Environment:** Production, Preview, Development
- **Description:** Your Supabase project URL (public)

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcXhlYXNybWxpc2FpanBma3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjQ4MjksImV4cCI6MjA2MzA0MDgyOX0.Cyx37s5P3H2yromânia3pN-zLUhgmSUFFHOLYSNM
```
- **Environment:** Production, Preview, Development
- **Description:** Supabase anonymous key (public, safe for browser)

### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcXhlYXNybWxpc2FpanBma3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njk3OTE0MiwiZXhwIjoyMTAyNTU1MTQyfQ.9nOo4pCI8FaGtTuwB9kOJNOIFPet9POSYV4YJAlzjpo
```
- **Environment:** Production, Preview, Development
- **Description:** Supabase service role key (KEEP SECRET - server-side only)
- **⚠️ IMPORTANT:** This key has admin privileges. Never expose it in client-side code.

---

## How to Add Environment Variables in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project (smile-architects-pala)
3. Go to **Settings** → **Environment Variables**
4. For each variable above:
   - Enter the **Variable Name** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value** (copy from above)
   - Select **All Environments** (Production, Preview, Development)
   - Click **Save**

---

## Default Admin Login Credentials

- **Email:** `smile@revolq.com`
- **Password:** `Smilejeotom@revolq2026`

**Login URL:** https://smile-architects-pala.vercel.app/jeotomadmin/login

---

## After Adding Environment Variables

1. **Redeploy** your application:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **Redeploy**

2. **Test the CMS:**
   - Visit https://smile-architects-pala.vercel.app/jeotomadmin/login
   - Login with the credentials above
   - Verify dashboard loads correctly

---

## Troubleshooting

### If login keeps reloading:
- Ensure all 3 environment variables are added correctly
- Check that there are no extra spaces in the values
- Make sure you selected "All Environments"
- Redeploy after adding variables

### If you see "Failed to fetch":
- Check the Vercel function logs for errors
- Verify the Supabase project is active
- Ensure the service role key is correct

### If dashboard shows 0 items:
- Run the migration script: Visit `/api/migrate` once
- Or manually add content through the CMS

---

## Quick Copy-Paste Format for Vercel

```
NEXT_PUBLIC_SUPABASE_URL=https://eaqxeasrmlisaijpfkqt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcXhlYXNybWxpc2FpanBma3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjQ4MjksImV4cCI6MjA2MzA0MDgyOX0.Cyx37s5P3H2yromânia3pN-zLUhgmSUFFHOLYSNM
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcXhlYXNybWxpc2FpanBma3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njk3OTE0MiwiZXhwIjoyMTAyNTU1MTQyfQ.9nOo4pCI8FaGtTuwB9kOJNOIFPet9POSYV4YJAlzjpo
```
