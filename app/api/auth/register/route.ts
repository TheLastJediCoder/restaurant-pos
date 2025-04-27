import { NextResponse } from 'next/server';
import type { CreateUserRequest, User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { generateId } from '@/lib/utils';

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL;

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(request: Request) {
  try {
    const body: CreateUserRequest = await request.json();

    // Validate request body
    if (!body.name || !body.email || !body.password || !body.role) {
      return NextResponse.json(
        { error: 'Name, email, password, and role are required' },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === body.email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // In a real implementation, this would register with the backend API
    // const response = await fetch(`${API_URL}/auth/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const newUser: User = {
      id: generateId(),
      name: body.name,
      email: body.email,
      passwordHash: 'hashed_' + body.password, // In a real app, use proper password hashing
      role: body.role,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    // Don't return the password hash in the response
    const { passwordHash, ...userWithoutPassword } = newUser;

    // In a real app, generate a JWT token here
    const token = 'mock_jwt_token';

    return NextResponse.json({ token, user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Error registering:', error);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
