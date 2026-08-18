import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith('/jeotomadmin') && pathname !== '/jeotomadmin/login') {
    const adminSession = request.cookies.get('admin_session');

    if (!adminSession) {
      // Redirect to login if no session cookie
      const loginUrl = new URL('/jeotomadmin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(adminSession.value);
      if (session.expires_at <= Date.now()) {
        // Session expired, redirect to login
        const loginUrl = new URL('/jeotomadmin/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('admin_session');
        return response;
      }
    } catch (e) {
      // Invalid session format, redirect to login
      const loginUrl = new URL('/jeotomadmin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: '/jeotomadmin/:path*',
};
