'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/jeotomadmin/dashboard' },
    { label: 'Homepage', href: '/jeotomadmin/homepage' },
    { label: 'Doctors', href: '/jeotomadmin/doctors' },
    { label: 'Treatments', href: '/jeotomadmin/treatments' },
    { label: 'Guides', href: '/jeotomadmin/guides' },
    { label: 'Patient Stories', href: '/jeotomadmin/patient-stories' },
    { label: 'FAQs', href: '/jeotomadmin/faqs' },
    { label: 'Media', href: '/jeotomadmin/media' },
    { label: 'Settings', href: '/jeotomadmin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        padding: '1.5rem 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1a1a1a',
          }}>
            Smile Architects
          </h2>
          <p style={{
            fontSize: '0.75rem',
            color: '#666',
            marginTop: '0.25rem',
          }}>
            CMS Admin
          </p>
        </div>

        <nav>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                color: pathname === item.href ? '#2563eb' : '#4b5563',
                backgroundColor: pathname === item.href ? '#eff6ff' : 'transparent',
                borderLeft: pathname === item.href ? '3px solid #2563eb' : '3px solid transparent',
                textDecoration: 'none',
                fontWeight: pathname === item.href ? 500 : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{
          padding: '1.5rem',
          marginTop: '2rem',
          borderTop: '1px solid #e5e7eb',
        }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#666',
              textDecoration: 'none',
              marginBottom: '0.75rem',
            }}
          >
            View Website →
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.5rem',
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
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '240px',
        padding: '2rem',
      }}>
        {children}
      </main>
    </div>
  );
}
