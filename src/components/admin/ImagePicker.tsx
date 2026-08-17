'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/database.types';

type Media = Database['public']['Tables']['media']['Row'];

interface ImagePickerProps {
  value: string | null;
  onChange: (url: string) => void;
  onClear?: () => void;
}

export default function ImagePicker({ value, onChange, onClear }: ImagePickerProps) {
  const [showModal, setShowModal] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<Media[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const openPicker = async () => {
    setShowModal(true);
    setLoadingLibrary(true);
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    setMediaLibrary(data || []);
    setLoadingLibrary(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please upload a JPG, PNG, or WEBP image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(filePath);

      // Save to media table
      const { data: mediaRecord, error: dbError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          storage_path: filePath,
          public_url: publicUrl,
          mime_type: file.type,
          size_bytes: file.size,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Add to library and select it
      setMediaLibrary(prev => [mediaRecord, ...prev]);
      onChange(publicUrl);
      setShowModal(false);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value ? (
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '0.5rem',
        }}>
          <img
            src={value}
            alt="Selected"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginBottom: '0.75rem',
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={openPicker}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Replace
            </button>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          style={{
            width: '100%',
            padding: '3rem 1rem',
            backgroundColor: '#f9fafb',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#666',
            cursor: 'pointer',
          }}
        >
          + Choose Image
        </button>
      )}

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Select Image</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  background: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ×
              </button>
            </div>

            {/* Upload Section */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <label style={{
                display: 'block',
                padding: '2rem',
                backgroundColor: '#f9fafb',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: uploading ? 'not-allowed' : 'pointer',
              }}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  {uploading ? 'Uploading...' : 'Click to upload a new image'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>
                  JPG, PNG, WEBP (max 5MB)
                </div>
              </label>
            </div>

            {/* Media Library */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', color: '#666' }}>
                MEDIA LIBRARY
              </h3>
              {loadingLibrary ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  Loading...
                </div>
              ) : mediaLibrary.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  No images uploaded yet
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '1rem',
                }}>
                  {mediaLibrary.map((media) => (
                    <div
                      key={media.id}
                      onClick={() => {
                        onChange(media.public_url);
                        setShowModal(false);
                      }}
                      style={{
                        cursor: 'pointer',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#2563eb';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img
                        src={media.public_url}
                        alt={media.filename}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        color: '#666',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {media.filename}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
