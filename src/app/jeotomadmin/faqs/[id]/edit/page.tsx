'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { type FAQ } from '@/lib/supabase/queries';
import AdminShell from '@/components/admin/AdminShell';

export default function EditFAQPage() {
  const router = useRouter();
  const params = useParams();
  const faqId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchFAQ();
  }, [faqId]);

  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', faqId)
        .single();

      if (error) throw error;

      const faq = data as FAQ;
      if (faq) {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setCategory(faq.category || '');
        setPublished(faq.published || false);
        setDisplayOrder(faq.display_order || 0);
      }
    } catch (err) {
      console.error('Error fetching FAQ:', err);
      setError('Failed to load FAQ');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('faqs')
        .update({
          question,
          answer,
          category: category || null,
          published,
          display_order: displayOrder,
          updated_at: new Date().toISOString(),
        })
        .eq('id', faqId);

      if (updateError) throw updateError;

      router.push('/jeotomadmin/faqs');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update FAQ';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('faqs')
        .delete()
        .eq('id', faqId);

      if (deleteError) throw deleteError;

      router.push('/jeotomadmin/faqs');
    } catch (err) {
      setError('Failed to delete FAQ');
      setLoading(false);
      setDeleteConfirm(false);
    }
  };

  if (fetching) {
    return (
      <AdminShell>
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
          Loading...
        </div>
      </AdminShell>
    );
  }

  if (error && !question) {
    return (
      <AdminShell>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#e2e8f0' }}>
            FAQ not found
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            {error}
          </p>
          <button
            onClick={() => router.back()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f1f5f9' }}>
            Edit FAQ
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Update FAQ information
          </p>
        </div>

        {error && question && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: '#fca5a5',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            backgroundColor: '#161b27',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '2rem',
            marginBottom: '1rem',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Question *
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Answer *
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. General, Orthodontics, Treatments"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                style={{
                  width: '200px',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>Published</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: deleteConfirm ? '#dc2626' : 'transparent',
                  color: deleteConfirm ? 'white' : '#fca5a5',
                  border: deleteConfirm ? 'none' : '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {deleteConfirm ? 'Click again to confirm' : 'Delete'}
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
