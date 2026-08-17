'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/database.types';

type Media = Database['public']['Tables']['media']['Row'];

interface MediaLibraryClientProps {
  initialMedia: Media[];
}

export default function MediaLibraryClient({ initialMedia }: MediaLibraryClientProps) {
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPG, PNG, or WEBP image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(fileName);

      const { data: mediaRecord, error: dbError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          storage_path: fileName,
          public_url: publicUrl,
          mime_type: file.type,
          size_bytes: file.size,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      setMedia(prev => [mediaRecord, ...prev]);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaItem: Media) => {
    if (!confirm('Delete this image?')) return;

    try {
      await supabase.storage.from('site-media').remove([mediaItem.storage_path]);
      await supabase.from('media').delete().eq('id', mediaItem.id);
      setMedia(prev => prev.filter(m => m.id !== mediaItem.id));
    } catch (err) {
      alert('Failed to delete image');
    }
  };

  return (
    <>
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

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <label style={{
          display: 'block',
          padding: '3rem',
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📤</div>
          <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            JPG, PNG, WEBP (max 5MB)
          </div>
        </label>
      </div>

      {media.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
          <p style={{ color: '#666' }}>No images yet</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {media.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={item.public_url}
                alt={item.filename}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '1rem' }}>
                <div style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.filename}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.75rem' }}>
                  {(item.size_bytes / 1024).toFixed(1)} KB
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: 'white',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
