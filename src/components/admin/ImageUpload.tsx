'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase/client';

interface ImageUploadProps {
  currentImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  label?: string;
  maxSizeMB?: number;
  accept?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUploaded,
  label = 'Upload Image',
  maxSizeMB = 5,
  accept = 'image/jpeg,image/jpg,image/png,image/webp',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    const validTypes = accept.split(',').map(t => t.trim());
    if (!validTypes.some(type => file.type === type)) {
      setError(`Please upload a valid image file (${validTypes.join(', ')})`);
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(filePath);

      // Save to media table
      await supabase.from('media').insert({
        filename: file.name,
        storage_path: filePath,
        public_url: publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
      });

      onImageUploaded(publicUrl);
      setError(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#374151',
        marginBottom: '0.5rem',
      }}>
        {label}
      </label>

      <div style={{
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
      }}>
        {previewUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                borderRadius: '4px',
                objectFit: 'contain',
                margin: '0 auto',
              }}
            />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: uploading ? '#d1d5db' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : previewUrl ? 'Change Image' : 'Choose Image'}
        </button>

        {error && (
          <p style={{
            marginTop: '0.75rem',
            fontSize: '0.875rem',
            color: '#dc2626',
          }}>
            {error}
          </p>
        )}

        <p style={{
          marginTop: '0.75rem',
          fontSize: '0.75rem',
          color: '#666',
        }}>
          {accept.split(',').map(t => t.split('/')[1].toUpperCase()).join(', ')} · Max {maxSizeMB}MB
        </p>
      </div>
    </div>
  );
}
