import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

export default async function DoctorsListPage() {
  const session = await getSession();
  if (!session) redirect('/jeotomadmin/login');

  const { data: doctors } = await supabase
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <AdminLayout>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
              Doctors
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Manage doctor profiles and information
            </p>
          </div>
          <Link
            href="/jeotomadmin/doctors/new"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            + Add Doctor
          </Link>
        </div>

        {doctors && doctors.length > 0 ? (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: index < doctors.length - 1 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {doctor.photo_url ? (
                    <img
                      src={doctor.photo_url}
                      alt={doctor.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      color: '#666',
                    }}>
                      {doctor.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      marginBottom: '0.25rem',
                    }}>
                      {doctor.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#666',
                    }}>
                      {doctor.qualifications} — {doctor.specialty}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: doctor.published ? '#dcfce7' : '#fee',
                    color: doctor.published ? '#166534' : '#991b1b',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}>
                    {doctor.published ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    href={`/jeotomadmin/doctors/${doctor.id}/edit`}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      color: '#374151',
                    }}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>No doctors yet</p>
            <Link
              href="/jeotomadmin/doctors/new"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'inline-block',
              }}
            >
              Add Your First Doctor
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
