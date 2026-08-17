import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

export default async function FAQsPage() {
  const session = await getSession();
  if (!session) redirect('/jeotomadmin/login');

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

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
              FAQs
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Manage frequently asked questions
            </p>
          </div>
          <Link href="/jeotomadmin/faqs/new">
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
              + Add FAQ
            </button>
          </Link>
        </div>

        {!faqs || faqs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❓</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No FAQs yet
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Add your first FAQ
            </p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: index < faqs.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      {faq.answer.substring(0, 150)}
                      {faq.answer.length > 150 ? '...' : ''}
                    </p>
                    {faq.category && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        backgroundColor: '#f3f4f6',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                      }}>
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: faq.published ? '#d1fae5' : '#fee',
                      color: faq.published ? '#065f46' : '#991b1b',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}>
                      {faq.published ? 'Published' : 'Draft'}
                    </span>
                    <Link href={`/jeotomadmin/faqs/${faq.id}/edit`}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
