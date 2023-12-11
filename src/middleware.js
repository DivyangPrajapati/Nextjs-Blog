import { NextResponse } from 'next/server';
 
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/register';

  const isLogOut = path === '/logout';

  const isAdminPath = path === '/admin' || path.startsWith("/admin/");

  let token = request.cookies.get("token")?.value || '';

  /* if (request.cookies.has("token")) {
    token = request.cookies.get("token")?.value;
  } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    // token = request.headers.get("Authorization")?.substring(7);
    token = request.headers.get("Authorization")?.split(" ")[1];
  } */

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if( isLogOut && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if( isAdminPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

 
// See "Matching Paths"
export const config = {
  matcher: [
    '/login',
    '/register',
    '/logout',
    '/admin',
    '/admin/:path*'
    //'/create'
  ]
}