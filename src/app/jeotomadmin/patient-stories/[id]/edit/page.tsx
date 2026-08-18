'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { type PatientStory } from '@/lib/supabase/queries';
import AdminShell from '@/components/admin/AdminShell';
import ImagePicker from '@/components/admin/ImagePicker';

export default function EditPatientStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [beforeImageUrl, setBeforeImageUrl] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchStory();
  }, [storyId]);

  const fetchStory = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_stories')
        .select('*')
        .eq('id', storyId)
        .single();

      if (error) throw error;

      const patientStory = data as PatientStory;
      if (patientStory) {
        setTitle(patientStory.title);
        setStory(patientStory.story);
        setTestimonial(patientStory.testimonial || '');
        setBeforeImageUrl(patientStory.before_image_url || '');
        setAfterImageUrl(patientStory.after_image_url || '');
        setPublished(patientStory.published || false);
        setFeatured(patientStory.featured || false);
        setDisplayOrder(patientStory.display_order || 0);
      }
    } catch (err) {
      console.error('Error fetching story:', err);
      setError('Failed to load patient story');
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
        .from('patient_stories')
        .update({
          title,
          story,
          testimonial: testimonial || null,
          before_image_url: beforeImageUrl || null,
          after_image_url: afterImageUrl || null,
          published,
          featured,
          display_order: displayOrder,
          updated_at: new Date().toISOString(),
        })
        .eq('id', storyId);

      if (updateError) throw updateError;

      router.push('/jeotomadmin/patient-stories');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update patient story';
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
        .from('patient_stories')
        .delete()
        .eq('id', storyId);

      if (deleteError) throw deleteError;

      router.push('/jeotomadmin/patient-stories');
    } catch (err) {
      setError('Failed to delete patient story');
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

  if (error && !title) {
    return (
      <AdminShell>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#e2e8f0' }}>
            Patient Story not found
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            {error}
          </p>
          <button
            onClick={() => router.back()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6366f1',
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
            Edit Patient Story
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Update patient story and testimonial
          </p>
        </div>

        {error && title && (
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
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#e2e8f0' }}>
              Story Information
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Patient Name's Smile Transformation"
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
                Story *
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
                rows={6}
                placeholder="Tell the patient's story, their journey, and treatment experience..."
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

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Testimonial / Quote
              </label>
              <textarea
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                rows={4}
                placeholder="Patient's testimonial or quote about their experience..."
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

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem', color: '#e2e8f0' }}>
              Before & After Images
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Before Image
              </label>
              <ImagePicker
                value={beforeImageUrl}
                onChange={setBeforeImageUrl}
                onClear={() => setBeforeImageUrl('')}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                After Image
              </label>
              <ImagePicker
                value={afterImageUrl}
                onChange={setAfterImageUrl}
                onClear={() => setAfterImageUrl('')}
              />
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem', color: '#e2e8f0' }}>
              Settings
            </h2>

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

            <div style={{ marginBottom: '1rem' }}>
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

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>Featured</span>
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
