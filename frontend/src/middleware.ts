import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const rewriteUrl = new URL(`${request.nextUrl.pathname}/`, 'http://127.0.0.1:8000/');
  return NextResponse.rewrite(rewriteUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*'
};
