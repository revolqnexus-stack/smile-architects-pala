import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  // If not authenticated and not on login page, redirect to login
  // Note: This check will be done on individual pages for better control
  
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
