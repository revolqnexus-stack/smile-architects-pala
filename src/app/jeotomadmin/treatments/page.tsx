import { getTreatments } from '@/lib/supabase/queries';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function TreatmentsPage() {
  // Auth is handled by middleware

  const treatments = await getTreatments();

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
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              Treatments
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Manage treatment pages and content
            </p>
          </div>
          <Link href="/jeotomadmin/treatments/new">
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
              + Add Treatment
            </button>
          </Link>
        </div>

        {!treatments || treatments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦷</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No treatments yet
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Add your first treatment to get started
            </p>
            <Link href="/jeotomadmin/treatments/new">
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
                + Add Treatment
              </button>
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {treatment.hero_image_url && (
                  <img
                    src={treatment.hero_image_url}
                    alt={treatment.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '1rem',
                    }}
                  />
                )}
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  {treatment.title}
                </h3>
                {treatment.short_description && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                  }}>
                    {treatment.short_description.substring(0, 100)}
                    {treatment.short_description.length > 100 ? '...' : ''}
                  </p>
                )}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: treatment.published ? '#d1fae5' : '#fee',
                    color: treatment.published ? '#065f46' : '#991b1b',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}>
                    {treatment.published ? 'Published' : 'Draft'}
                  </span>
                  {treatment.featured && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}>
                      Featured
                    </span>
                  )}
                </div>
                <Link href={`/jeotomadmin/treatments/${treatment.id}/edit`} style={{ marginTop: '1rem' }}>
                  <button style={{
                    width: '100%',
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
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
