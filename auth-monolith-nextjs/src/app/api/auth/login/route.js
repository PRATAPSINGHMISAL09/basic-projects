import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) { // POST request handler for user login
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 }); // Check if email and password are provided
    } 

    const user = await prisma.user.findUnique({ where: { email } }); // Find user by email

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }); // If user does not exist, return unauthorized status
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with hashed password in the database

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }); // If passwords do not match, return unauthorized status
    }

    const token = jwt.sign( // Create JWT token with user ID and email
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('token', token, { // Set the token in a cookie
      // Cookie options
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
