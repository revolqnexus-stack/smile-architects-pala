import { signOut } from '@/lib/supabase/auth';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Clear cookie
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    
    // Also sign out from Supabase
    await signOut();
    
    // Get the origin from the request
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(new URL('/jeotomadmin/login', origin));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}
