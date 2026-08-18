import { getPatientStories } from '@/lib/supabase/queries';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function PatientStoriesPage() {
  // Auth is handled by middleware

  const stories = await getPatientStories();

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
              Patient Stories
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Manage patient testimonials and success stories
            </p>
          </div>
          <Link href="/jeotomadmin/patient-stories/new">
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
              + Add Story
            </button>
          </Link>
        </div>

        {!stories || stories.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No patient stories yet
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Add your first patient story
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.5rem',
          }}>
            {stories.map((story) => (
              <div
                key={story.id}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {(story.before_image_url || story.after_image_url) && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {story.before_image_url && (
                        <img
                          src={story.before_image_url}
                          alt="Before"
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                          }}
                        />
                      )}
                      {story.after_image_url && (
                        <img
                          src={story.after_image_url}
                          alt="After"
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {story.title}
                    </h3>
                    {story.testimonial && (
                      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                        {story.testimonial.substring(0, 150)}
                        {story.testimonial.length > 150 ? '...' : ''}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: story.published ? '#d1fae5' : '#fee',
                      color: story.published ? '#065f46' : '#991b1b',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}>
                      {story.published ? 'Published' : 'Draft'}
                    </span>
                    {story.featured && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}>
                        Featured
                      </span>
                    )}
                    <Link href={`/jeotomadmin/patient-stories/${story.id}/edit`}>
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
