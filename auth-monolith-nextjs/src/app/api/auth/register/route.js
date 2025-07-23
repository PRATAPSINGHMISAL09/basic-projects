// REGISTER API ROUTE
// This route handles user registration by accepting email and password, checking for existing users, hashing the password, and creating a new user in the database.
// It returns appropriate responses based on the success or failure of the registration process.

import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) { //post request handler for user registration
  try {
    const { email, password } = await req.json(); // Extract email and password from the request body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 }); // Check if email and password are provided
    }

    const existingUser = await prisma.user.findUnique({ where: { email } }); // Check if the user already exists

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 }); // If user exists, return conflict status
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt

    const newUser = await prisma.user.create({ // Create a new user in the database
      data: {
        email,
        password: hashedPassword,
      },
    });
 
    return NextResponse.json({ message: 'User registered', userId: newUser.id }, { status: 201 }); // Return success response with user ID
  } catch (err) { 
    console.error('REGISTER ERROR:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); // Handle any errors that occur during the process
  }
}
