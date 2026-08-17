import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect('/jeotomadmin/login');
  }

  const sections = [
    { title: 'Homepage', href: '/jeotomadmin/homepage', icon: '🏠', description: 'Edit hero, stats, and homepage content' },
    { title: 'Doctors', href: '/jeotomadmin/doctors', icon: '👨‍⚕️', description: 'Manage doctor profiles and information' },
    { title: 'Treatments', href: '/jeotomadmin/treatments', icon: '🦷', description: 'Add and edit treatment pages' },
    { title: 'Dental Guides', href: '/jeotomadmin/guides', icon: '📚', description: 'Create and publish dental guides' },
    { title: 'Patient Stories', href: '/jeotomadmin/patient-stories', icon: '⭐', description: 'Manage patient testimonials and stories' },
    { title: 'FAQs', href: '/jeotomadmin/faqs', icon: '❓', description: 'Add and organize FAQs' },
    { title: 'Media Library', href: '/jeotomadmin/media', icon: '🖼️', description: 'Upload and manage images' },
    { title: 'Settings', href: '/jeotomadmin/settings', icon: '⚙️', description: 'Clinic info, hours, contact details' },
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
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
              }}>
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
