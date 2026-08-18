import { getMedia } from '@/lib/supabase/queries';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaLibraryClient from '@/components/admin/MediaLibraryClient';

export const dynamic = 'force-dynamic';

export default async function MediaLibraryPage() {
  // Auth is handled by middleware

  const mediaFiles = await getMedia();

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '0.5rem',
          }}>
            Media Library
          </h1>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Upload and manage images for your website
          </p>
        </div>

        <MediaLibraryClient initialMedia={mediaFiles || []} />
      </div>
    </AdminLayout>
  );
}
