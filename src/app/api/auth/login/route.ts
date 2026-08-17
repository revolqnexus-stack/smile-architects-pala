import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_CREDENTIALS = {
  email: 'smile@revolq.com',
  password: 'Smilejeotom@revolq2026',
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check hardcoded credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session = {
        user: { email: ADMIN_CREDENTIALS.email, id: 'admin-hardcoded' },
        access_token: 'hardcoded-session-token',
        expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      };

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true, session });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
