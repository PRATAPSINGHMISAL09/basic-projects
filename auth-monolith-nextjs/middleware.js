import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) { // Middleware to protect certain routes
  const token = request.cookies.get('token')?.value; // Get the JWT token from cookies

  const protectedPaths = ['/dashboard']; // Define paths that require authentication

  const pathname = request.nextUrl.pathname; // Get the current request path

  if (protectedPaths.includes(pathname)) { // Check if the request path is protected
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url)); // If no token is found, redirect to login
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
      // All good — let user proceed
      return NextResponse.next(); 
    } catch (err) {
      console.error('JWT VERIFICATION FAILED:', err);
      return NextResponse.redirect(new URL('/login', request.url)); // If token verification fails, redirect to login
    }
  }

  return NextResponse.next(); // Allow all other routes
}

export const config = { // Middleware configuration
  matcher: ['/((?!login|register|api|public).*)'],
};

