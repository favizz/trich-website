// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow the maintenance page itself to load
  if (pathname.startsWith('/maintenance')) {
    return NextResponse.next();
  }

  // Redirect all other pages to /maintenance
  return NextResponse.redirect(new URL('/maintenance', request.url));
}

// Apply middleware to all routes
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
