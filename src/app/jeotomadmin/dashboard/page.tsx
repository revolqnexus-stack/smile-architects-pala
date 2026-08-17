import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

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

const CARD_ACCENT = [
  '#6366f1', '#0ea5e9', '#10b981', '#f59e0b',
  '#ec4899', '#8b5cf6', '#14b8a6', '#f97316',
];

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect('/jeotomadmin/login');

  const counts = await getCounts();

  const sections = [
    { title: 'Homepage', href: '/jeotomadmin/homepage', description: 'Hero text, clinic hours, CTAs', count: null },
    { title: 'Doctors', href: '/jeotomadmin/doctors', description: 'Doctor profiles & credentials', count: counts.doctors },
    { title: 'Treatments', href: '/jeotomadmin/treatments', description: 'Service pages & content', count: counts.treatments },
    { title: 'Dental Guides', href: '/jeotomadmin/guides', description: 'Patient education articles', count: counts.guides },
    { title: 'Patient Stories', href: '/jeotomadmin/patient-stories', description: 'Testimonials & reviews', count: counts.stories },
    { title: 'FAQs', href: '/jeotomadmin/faqs', description: 'Frequently asked questions', count: counts.faqs },
    { title: 'Media Library', href: '/jeotomadmin/media', description: 'Uploaded images & files', count: counts.media },
    { title: 'Settings', href: '/jeotomadmin/settings', description: 'Clinic info & contact details', count: null },
  ];

  const totalContent = counts.doctors + counts.treatments + counts.guides + counts.stories + counts.faqs;

  return (
    <AdminShell>
      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Welcome back — your website is live and running.
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Doctors', value: counts.doctors, color: '#6366f1' },
          { label: 'Treatments', value: counts.treatments, color: '#0ea5e9' },
          { label: 'Guides', value: counts.guides, color: '#10b981' },
          { label: 'Total Content', value: totalContent, color: '#f59e0b' },
        ].map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: '#161b27',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.375rem', fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content cards */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Content Sections
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem',
      }}>
        {sections.map((section, i) => (
          <Link
            key={section.href}
            href={section.href}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: '#161b27',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = CARD_ACCENT[i % CARD_ACCENT.length] + '66'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
            >
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.25rem' }}>
                  {section.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {section.description}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                {section.count !== null && (
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: CARD_ACCENT[i % CARD_ACCENT.length],
                    minWidth: '2rem',
                    textAlign: 'right',
                  }}>
                    {section.count}
                  </div>
                )}
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
