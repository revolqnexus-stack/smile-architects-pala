'use client';

export default function TestEnvPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1 style={{ marginBottom: '2rem' }}>Environment Variables Test</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: url ? '#d1fae5' : '#fee', 
          marginTop: '0.5rem',
          wordBreak: 'break-all'
        }}>
          {url || '❌ NOT SET'}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: key ? '#d1fae5' : '#fee', 
          marginTop: '0.5rem',
          wordBreak: 'break-all'
        }}>
          {key ? `✅ SET (${key.substring(0, 50)}...)` : '❌ NOT SET'}
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffc107',
        marginTop: '2rem'
      }}>
        <strong>Status:</strong> {url && key ? '✅ Ready' : '❌ Missing variables'}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/jeotomadmin/login" style={{ color: 'blue', textDecoration: 'underline' }}>
          ← Back to Login
        </a>
      </div>
    </div>
  );
}
