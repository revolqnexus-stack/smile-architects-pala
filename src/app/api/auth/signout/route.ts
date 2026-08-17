import { signOut } from '@/lib/supabase/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await signOut();
    return NextResponse.redirect(new URL('/jeotomadmin/login', process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3000'));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}
