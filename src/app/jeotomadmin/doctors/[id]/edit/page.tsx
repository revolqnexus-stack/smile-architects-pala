'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { type Doctor } from '@/lib/supabase/queries';
import AdminShell from '@/components/admin/AdminShell';
import ImagePicker from '@/components/admin/ImagePicker';

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Form state
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

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', doctorId)
        .single();

      if (error) throw error;

      const doctor = data as Doctor;
      if (doctor) {
        setName(doctor.name);
        setQualifications(doctor.qualifications);
        setSpecialty(doctor.specialty);
        setDesignation(doctor.designation || '');
        setPhotoUrl(doctor.photo_url || '');
        setBio(doctor.bio || '');
        setVisiting(doctor.visiting || false);
        setRegistrationBody(doctor.registration_body || '');
        setRegistrationNumber(doctor.registration_number || '');
        setRegistrationYear(doctor.registration_year || '');
        setRoles(doctor.roles ? doctor.roles.join('\n') : '');
        setMemberships(doctor.memberships ? doctor.memberships.join('\n') : '');
        setEducation(doctor.education ? JSON.stringify(doctor.education, null, 2) : '');
        setProfessionalExperience(doctor.professional_experience ? doctor.professional_experience.join('\n') : '');
        setTraining(doctor.training ? doctor.training.join('\n') : '');
        setAreasOfExpertise(doctor.areas_of_expertise ? doctor.areas_of_expertise.join('\n') : '');
        setSeoTitle(doctor.seo_title || '');
        setSeoDescription(doctor.seo_description || '');
        setPublished(doctor.published || false);
      }
    } catch (err) {
      console.error('Error fetching doctor:', err);
      setError('Failed to load doctor');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Parse arrays
      const rolesArray = roles.split('\n').filter(r => r.trim());
      const membershipsArray = memberships.split('\n').filter(m => m.trim());
      const professionalExperienceArray = professionalExperience.split('\n').filter(p => p.trim());
      const trainingArray = training.split('\n').filter(t => t.trim());
      const areasOfExpertiseArray = areasOfExpertise.split('\n').filter(a => a.trim());

      // Parse education JSON
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('doctors')
        .update({
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
          updated_at: new Date().toISOString(),
        })
        .eq('id', doctorId);

      if (updateError) throw updateError;

      router.push('/jeotomadmin/doctors');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update doctor';
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
        .from('doctors')
        .delete()
        .eq('id', doctorId);

      if (deleteError) throw deleteError;

      router.push('/jeotomadmin/doctors');
    } catch (err) {
      setError('Failed to delete doctor');
      setLoading(false);
      setDeleteConfirm(false);
    }
  };

  if (fetching) {
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
      <div style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Edit Doctor
          </h1>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Update doctor profile information
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

        <form onSubmit={handleSubmit}>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '1rem',
          }}>
            {/* Basic Information */}
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Basic Information
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Qualifications *
                </label>
                <input
                  type="text"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  required
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
                  Specialty *
                </label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
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
                Photo
              </label>
              <ImagePicker
                value={photoUrl}
                onChange={setPhotoUrl}
                onClear={() => setPhotoUrl('')}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={visiting}
                  onChange={(e) => setVisiting(e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Visiting Consultant</span>
              </label>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
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

            {/* Registration */}
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>
              Registration
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Registration Body
                </label>
                <input
                  type="text"
                  value={registrationBody}
                  onChange={(e) => setRegistrationBody(e.target.value)}
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
                  Registration Number
                </label>
                <input
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
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
                  Registration Year
                </label>
                <input
                  type="text"
                  value={registrationYear}
                  onChange={(e) => setRegistrationYear(e.target.value)}
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

            {/* Professional Details */}
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>
              Professional Details
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Roles (one per line)
              </label>
              <textarea
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Memberships (one per line)
              </label>
              <textarea
                value={memberships}
                onChange={(e) => setMemberships(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Education (JSON format)
              </label>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Professional Experience (one per line)
              </label>
              <textarea
                value={professionalExperience}
                onChange={(e) => setProfessionalExperience(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Training (one per line)
              </label>
              <textarea
                value={training}
                onChange={(e) => setTraining(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Areas of Expertise (one per line)
              </label>
              <textarea
                value={areasOfExpertise}
                onChange={(e) => setAreasOfExpertise(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* SEO */}
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '2rem' }}>
              SEO
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
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

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                SEO Description
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
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

            {/* Publish Status */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Published</span>
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: deleteConfirm ? '#dc2626' : 'white',
                  color: deleteConfirm ? 'white' : '#dc2626',
                  border: deleteConfirm ? 'none' : '1px solid #fca5a5',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {deleteConfirm ? 'Click again to confirm delete' : 'Delete'}
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'white',
                    color: '#666',
                    border: '1px solid #d1d5db',
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
                    backgroundColor: loading ? '#93c5fd' : '#2563eb',
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
