import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

async function getCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { doctors: 0, treatments: 0, guides: 0, stories: 0, faqs: 0, media: 0 };

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const [doctors, treatments, guides, stories, faqs, media] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('doctors').select('id', { count: 'exact', head: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('treatments').select('id', { count: 'exact', head: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('dental_guides').select('id', { count: 'exact', head: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('patient_stories').select('id', { count: 'exact', head: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('faqs').select('id', { count: 'exact', head: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from('media').select('id', { count: 'exact', head: true }),
  ]);

  return {
    doctors: doctors.count ?? 0,
    treatments: treatments.count ?? 0,
    guides: guides.count ?? 0,
    stories: stories.count ?? 0,
    faqs: faqs.count ?? 0,
    media: media.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect('/jeotomadmin/login');
  }

  const counts = await getCounts();

  const sections = [
    { title: 'Homepage', href: '/jeotomadmin/homepage', icon: '🏠', description: 'Edit hero, stats, and homepage content', count: null },
    { title: 'Doctors', href: '/jeotomadmin/doctors', icon: '👨‍⚕️', description: 'Manage doctor profiles and information', count: counts.doctors },
    { title: 'Treatments', href: '/jeotomadmin/treatments', icon: '🦷', description: 'Add and edit treatment pages', count: counts.treatments },
    { title: 'Dental Guides', href: '/jeotomadmin/guides', icon: '📚', description: 'Create and publish dental guides', count: counts.guides },
    { title: 'Patient Stories', href: '/jeotomadmin/patient-stories', icon: '⭐', description: 'Manage patient testimonials and stories', count: counts.stories },
    { title: 'FAQs', href: '/jeotomadmin/faqs', icon: '❓', description: 'Add and organize FAQs', count: counts.faqs },
    { title: 'Media Library', href: '/jeotomadmin/media', icon: '🖼️', description: 'Upload and manage images', count: counts.media },
    { title: 'Settings', href: '/jeotomadmin/settings', icon: '⚙️', description: 'Clinic info, hours, contact details', count: null },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1a1a1a',
          }}>
            Smile Architects CMS
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: '0.875rem',
                color: '#666',
                textDecoration: 'none',
              }}
            >
              View Website →
            </Link>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '0.5rem',
          }}>
            Dashboard
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1rem',
          }}>
            Manage your website content
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{
                textDecoration: 'none',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {section.count !== null && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '0.125rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {section.count}
                </div>
              )}
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {section.icon}
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '0.5rem',
              }}>
                {section.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#666',
                lineHeight: 1.5,
              }}>
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
