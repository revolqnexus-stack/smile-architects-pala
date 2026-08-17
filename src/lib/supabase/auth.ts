import { supabase, isSupabaseConfigured } from './client';

// Hardcoded admin credentials for fallback authentication
const ADMIN_CREDENTIALS = {
  email: 'smile@revolq.com',
  password: 'Smilejeotom@revolq2026',
};

export async function signIn(email: string, password: string) {
  // Try hardcoded credentials first (fallback auth)
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    // Create a mock session for hardcoded auth
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_session', JSON.stringify({
        user: { email: ADMIN_CREDENTIALS.email, id: 'admin-hardcoded' },
        access_token: 'hardcoded-session-token',
        expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      }));
    }
    return {
      user: { email: ADMIN_CREDENTIALS.email, id: 'admin-hardcoded' },
      session: { access_token: 'hardcoded-session-token' }
    };
  }

  // Fall back to Supabase if configured and credentials don't match hardcoded
  if (!isSupabaseConfigured()) {
    throw new Error('Invalid credentials');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  // Clear hardcoded session
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session');
  }
  
  // Also sign out from Supabase if configured
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}

export async function getSession() {
  // Check for hardcoded session first
  if (typeof window !== 'undefined') {
    const storedSession = localStorage.getItem('admin_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        // Check if session is still valid (not expired)
        if (session.expires_at > Date.now()) {
          return session;
        } else {
          // Session expired, remove it
          localStorage.removeItem('admin_session');
        }
      } catch (e) {
        // Invalid session data, remove it
        localStorage.removeItem('admin_session');
      }
    }
  }

  // Fall back to Supabase session
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  // Check for hardcoded session first
  if (typeof window !== 'undefined') {
    const storedSession = localStorage.getItem('admin_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.expires_at > Date.now()) {
          return session.user;
        }
      } catch (e) {
        // Invalid session data
      }
    }
  }

  // Fall back to Supabase user
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
