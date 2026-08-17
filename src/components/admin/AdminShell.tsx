'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  const navItems = [
    { title: 'Dashboard', href: '/jeotomadmin/dashboard', icon: '📊' },
    { title: 'Homepage', href: '/jeotomadmin/homepage', icon: '🏠' },
    { title: 'Doctors', href: '/jeotomadmin/doctors', icon: '👨‍⚕️' },
    { title: 'Treatments', href: '/jeotomadmin/treatments', icon: '🦷' },
    { title: 'Guides', href: '/jeotomadmin/guides', icon: '📚' },
    { title: 'Patient Stories', href: '/jeotomadmin/patient-stories', icon: '⭐' },
    { title: 'FAQs', href: '/jeotomadmin/faqs', icon: '❓' },
    { title: 'Media', href: '/jeotomadmin/media', icon: '🖼️' },
    { title: 'Settings', href: '/jeotomadmin/settings', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '1.5rem 1rem' }}>
          <Link href="/jeotomadmin/dashboard" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '0.25rem',
            }}>
              Smile Architects
            </h1>
            <p style={{
              fontSize: '0.75rem',
              color: '#666',
            }}>
              CMS Admin
            </p>
          </Link>
        </div>

        <nav style={{ padding: '0 0.5rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.25rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                  color: isActive ? '#1a1a1a' : '#666',
                  transition: 'all 0.15s',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
        }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'block',
              padding: '0.5rem',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: '#666',
              textDecoration: 'none',
              marginBottom: '0.5rem',
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
                backgroundColor: '#fee',
                color: '#c00',
                border: '1px solid #fcc',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 500,
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
        marginLeft: '240px',
        flex: 1,
        padding: '2rem',
        maxWidth: 'calc(100% - 240px)',
      }}>
        {children}
      </main>
    </div>
  );
}
