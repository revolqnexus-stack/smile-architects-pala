'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { type Treatment } from '@/lib/supabase/queries';
import AdminShell from '@/components/admin/AdminShell';
import ImagePicker from '@/components/admin/ImagePicker';

export default function EditTreatmentPage() {
  const router = useRouter();
  const params = useParams();
  const treatmentId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [benefits, setBenefits] = useState('');
  const [icon, setIcon] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchTreatment();
  }, [treatmentId]);

  const fetchTreatment = async () => {
    try {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('id', treatmentId)
        .single();

      if (error) throw error;

      const treatment = data as Treatment;
      if (treatment) {
        setSlug(treatment.slug);
        setTitle(treatment.title);
        setShortDescription(treatment.short_description || '');
        setHeroImageUrl(treatment.hero_image_url || '');
        setContent(treatment.content || '');
        setBenefits(treatment.benefits ? treatment.benefits.join('\n') : '');
        setIcon(treatment.icon || '');
        setSeoTitle(treatment.seo_title || '');
        setSeoDescription(treatment.seo_description || '');
        setOgImageUrl(treatment.og_image_url || '');
        setPublished(treatment.published || false);
        setFeatured(treatment.featured || false);
        setDisplayOrder(treatment.display_order || 0);
      }
    } catch (err) {
      console.error('Error fetching treatment:', err);
      setError('Failed to load treatment');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const benefitsArray = benefits.split('\n').filter(b => b.trim());

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('treatments')
        .update({
          slug,
          title,
          short_description: shortDescription || null,
          hero_image_url: heroImageUrl || null,
          content: content || null,
          benefits: benefitsArray.length > 0 ? benefitsArray : null,
          icon: icon || null,
          seo_title: seoTitle || null,
          seo_description: seoDescription || null,
          og_image_url: ogImageUrl || null,
          published,
          featured,
          display_order: displayOrder,
          updated_at: new Date().toISOString(),
        })
        .eq('id', treatmentId);

      if (updateError) throw updateError;

      router.push('/jeotomadmin/treatments');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update treatment';
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
        .from('treatments')
        .delete()
        .eq('id', treatmentId);

      if (deleteError) throw deleteError;

      router.push('/jeotomadmin/treatments');
    } catch (err) {
      setError('Failed to delete treatment');
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
            Treatment not found
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
            Edit Treatment
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Update treatment information
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
              Basic Information
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
                Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Short Description
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={3}
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
                Hero Image
              </label>
              <ImagePicker
                value={heroImageUrl}
                onChange={setHeroImageUrl}
                onClear={() => setHeroImageUrl('')}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Icon
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="e.g. tooth, braces, implant"
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

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Full treatment description and details..."
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
                Benefits (one per line)
              </label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                rows={5}
                placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  color: '#f1f5f9',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem', color: '#e2e8f0' }}>
              SEO
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8' }}>
                SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
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
                SEO Description
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={3}
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
                OG Image
              </label>
              <ImagePicker
                value={ogImageUrl}
                onChange={setOgImageUrl}
                onClear={() => setOgImageUrl('')}
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
