'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/AdminShell';
import ImagePicker from '@/components/admin/ImagePicker';

export default function HomepageEditorPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Hero section
  const [heroHeading, setHeroHeading] = useState('Advanced Dental Care & Smile Design');
  const [heroDescription, setHeroDescription] = useState('Multispeciality dental clinic & advanced orthodontics led by Dr. Jeo Tom Charls, MDS.');
  const [heroCtaPrimary, setHeroCtaPrimary] = useState('Explore Treatments');
  const [heroCtaPrimaryLink, setHeroCtaPrimaryLink] = useState('/treatments');
  const [heroCtaSecondary, setHeroCtaSecondary] = useState('Book an Appointment →');
  const [heroCtaSecondaryLink, setHeroCtaSecondaryLink] = useState('/book-appointment');

  // Clinic hours
  const [clinicDays, setClinicDays] = useState('Mon – Sat');
  const [clinicTime, setClinicTime] = useState('9:30 AM – 8:00 PM');

  useEffect(() => {
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('homepage_content')
        .select('*')
        .eq('section', 'hero')
        .single();

      if (data && data.content) {
        const content = data.content as Record<string, string>;
        setHeroHeading(content.heading || heroHeading);
        setHeroDescription(content.description || heroDescription);
        setHeroCtaPrimary(content.ctaPrimary || heroCtaPrimary);
        setHeroCtaPrimaryLink(content.ctaPrimaryLink || heroCtaPrimaryLink);
        setHeroCtaSecondary(content.ctaSecondary || heroCtaSecondary);
        setHeroCtaSecondaryLink(content.ctaSecondaryLink || heroCtaSecondaryLink);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: hoursData } = await (supabase as any)
        .from('homepage_content')
        .select('*')
        .eq('section', 'clinic-hours')
        .single();

      if (hoursData && hoursData.content) {
        const content = hoursData.content as Record<string, string>;
        setClinicDays(content.days || clinicDays);
        setClinicTime(content.time || clinicTime);
      }
    } catch (err) {
      console.error('Error fetching homepage content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Save hero section
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: heroError } = await (supabase as any)
        .from('homepage_content')
        .upsert({
          section: 'hero',
          content: {
            heading: heroHeading,
            description: heroDescription,
            ctaPrimary: heroCtaPrimary,
            ctaPrimaryLink: heroCtaPrimaryLink,
            ctaSecondary: heroCtaSecondary,
            ctaSecondaryLink: heroCtaSecondaryLink,
          },
          published: true,
        }, {
          onConflict: 'section',
        });

      if (heroError) throw heroError;

      // Save clinic hours
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: hoursError } = await (supabase as any)
        .from('homepage_content')
        .upsert({
          section: 'clinic-hours',
          content: {
            days: clinicDays,
            time: clinicTime,
          },
          published: true,
        }, {
          onConflict: 'section',
        });

      if (hoursError) throw hoursError;

      setSuccess('Homepage content saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save homepage content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          Loading...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Homepage Editor
          </h1>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Edit homepage content. Layout and design remain unchanged.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee',
            color: '#c00',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#d1fae5',
            color: '#065f46',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Hero Section */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Hero Section
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Main Heading
              </label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Description
              </label>
              <textarea
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={heroCtaPrimary}
                  onChange={(e) => setHeroCtaPrimary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={heroCtaPrimaryLink}
                  onChange={(e) => setHeroCtaPrimaryLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Secondary CTA Text
                </label>
                <input
                  type="text"
                  value={heroCtaSecondary}
                  onChange={(e) => setHeroCtaSecondary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Secondary CTA Link
                </label>
                <input
                  type="text"
                  value={heroCtaSecondaryLink}
                  onChange={(e) => setHeroCtaSecondaryLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Clinic Hours */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Clinic Hours
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Days
                </label>
                <input
                  type="text"
                  value={clinicDays}
                  onChange={(e) => setClinicDays(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Time
                </label>
                <input
                  type="text"
                  value={clinicTime}
                  onChange={(e) => setClinicTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: saving ? '#93c5fd' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
