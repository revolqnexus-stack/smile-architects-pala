'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/database.types';
import AdminShell from '@/components/admin/AdminShell';
import ImagePicker from '@/components/admin/ImagePicker';

type DoctorInsert = Database['public']['Tables']['doctors']['Insert'];

export default function NewDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [designation, setDesignation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [bio, setBio] = useState('');
  const [visiting, setVisiting] = useState(false);
  const [registrationBody, setRegistrationBody] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [roles, setRoles] = useState('');
  const [memberships, setMemberships] = useState('');
  const [education, setEducation] = useState('');
  const [professionalExperience, setProfessionalExperience] = useState('');
  const [training, setTraining] = useState('');
  const [areasOfExpertise, setAreasOfExpertise] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [published, setPublished] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const rolesArray = roles.split('\n').filter(r => r.trim());
      const membershipsArray = memberships.split('\n').filter(m => m.trim());
      const professionalExperienceArray = professionalExperience.split('\n').filter(p => p.trim());
      const trainingArray = training.split('\n').filter(t => t.trim());
      const areasOfExpertiseArray = areasOfExpertise.split('\n').filter(a => a.trim());

      let educationJson = null;
      if (education.trim()) {
        try {
          educationJson = JSON.parse(education);
        } catch {
          setError('Education must be valid JSON format');
          setLoading(false);
          return;
        }
      }

      const payload: DoctorInsert = {
        slug,
        name,
        qualifications,
        specialty,
        designation: designation || null,
        photo_url: photoUrl || null,
        bio: bio || null,
        visiting,
        registration_body: registrationBody || null,
        registration_number: registrationNumber || null,
        registration_year: registrationYear || null,
        roles: rolesArray.length > 0 ? rolesArray : null,
        memberships: membershipsArray.length > 0 ? membershipsArray : null,
        education: educationJson,
        professional_experience: professionalExperienceArray.length > 0 ? professionalExperienceArray : null,
        training: trainingArray.length > 0 ? trainingArray : null,
        areas_of_expertise: areasOfExpertiseArray.length > 0 ? areasOfExpertiseArray : null,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        published,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from('doctors').insert(payload);
      if (insertError) throw insertError;
      router.push('/jeotomadmin/doctors');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create doctor');
      setLoading(false);
    }
  };

  return (
    <AdminShell>
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Add New Doctor
          </h1>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Create a new doctor profile</p>
        </div>

        {error && (
          <div style={{ padding: '1rem', backgroundColor: '#fee', color: '#c00', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Basic Information</h2>

            {[
              { label: 'Name *', value: name, set: setName, placeholder: 'Dr. Jeo Tom Charls', required: true },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{f.label}</label>
                <input type="text" value={f.value} onChange={e => f.set(e.target.value)} required={f.required} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Qualifications *</label>
                <input type="text" value={qualifications} onChange={e => setQualifications(e.target.value)} required placeholder="MDS"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Specialty *</label>
                <input type="text" value={specialty} onChange={e => setSpecialty(e.target.value)} required placeholder="Orthodontics"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Designation</label>
              <input type="text" value={designation} onChange={e => setDesignation(e.target.value)} placeholder="Consultant Orthodontist"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Photo</label>
              <ImagePicker value={photoUrl} onChange={setPhotoUrl} onClear={() => setPhotoUrl('')} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={visiting} onChange={e => setVisiting(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Visiting Consultant</span>
              </label>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} placeholder="Professional biography..."
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>Registration</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Body', value: registrationBody, set: setRegistrationBody, placeholder: 'Kerala State Dental Council' },
                { label: 'Number', value: registrationNumber, set: setRegistrationNumber, placeholder: '9451' },
                { label: 'Year', value: registrationYear, set: setRegistrationYear, placeholder: '2015' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{f.label}</label>
                  <input type="text" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>Professional Details</h2>

            {[
              { label: 'Roles (one per line)', value: roles, set: setRoles, placeholder: 'Consultant Orthodontist\nCertified Invisalign Provider' },
              { label: 'Memberships (one per line)', value: memberships, set: setMemberships, placeholder: 'Indian Orthodontic Society\nIndian Dental Association' },
              { label: 'Professional Experience (one per line)', value: professionalExperience, set: setProfessionalExperience, placeholder: 'Smile Architects, Pala' },
              { label: 'Training (one per line)', value: training, set: setTraining, placeholder: 'Certified Invisalign Provider' },
              { label: 'Areas of Expertise (one per line)', value: areasOfExpertise, set: setAreasOfExpertise, placeholder: 'Clear aligners\nLingual orthodontics' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{f.label}</label>
                <textarea value={f.value} onChange={e => f.set(e.target.value)} rows={3} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Education (JSON)</label>
              <textarea value={education} onChange={e => setEducation(e.target.value)} rows={5}
                placeholder={'[{"degree":"BDS","institution":"University","year":"2010"}]'}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>SEO</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>SEO Title</label>
              <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>SEO Description</label>
              <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={3}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Publish immediately</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <button type="button" onClick={() => router.back()} disabled={loading}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#666', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: loading ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Saving...' : published ? 'Publish Doctor' : 'Save Draft'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
