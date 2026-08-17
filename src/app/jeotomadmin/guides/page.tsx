import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { getGuides } from '@/lib/supabase/queries';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

export default async function GuidesPage() {
  const session = await getSession();
  if (!session) redirect('/jeotomadmin/login');

  const guides = await getGuides();

  return (
    <AdminShell>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Dental Guides
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Create and publish informative dental guides
            </p>
          </div>
          <Link href="/jeotomadmin/guides/new">
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              + New Guide
            </button>
          </Link>
        </div>

        {!guides || guides.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No guides yet
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Create your first dental guide
            </p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {guides.map((guide, index) => (
              <div
                key={guide.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: index < guides.length - 1 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                }}
              >
                {guide.cover_image_url && (
                  <img
                    src={guide.cover_image_url}
                    alt={guide.title}
                    style={{
                      width: '120px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {guide.title}
                  </h3>
                  {guide.excerpt && (
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      {guide.excerpt.substring(0, 120)}...
                    </p>
                  )}
                  {guide.category && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#666',
                      backgroundColor: '#f3f4f6',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                    }}>
                      {guide.category}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: guide.status === 'published' ? '#d1fae5' : '#fee',
                    color: guide.status === 'published' ? '#065f46' : '#991b1b',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}>
                    {guide.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  <Link href={`/jeotomadmin/guides/${guide.id}/edit`}>
                    <button style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'white',
                      color: '#2563eb',
                      border: '1px solid #2563eb',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}>
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
