import { NextResponse } from "next/server"
import type { CreateUserRequest, User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import { generateId } from "@/lib/utils"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/users
 * Get all users
 */
export async function GET() {
  try {
    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/users`)
    // const data = await response.json()

    // Using mock data for demonstration
    return NextResponse.json(mockUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: Request) {
  try {
    const body: CreateUserRequest = await request.json()

    // Validate request body
    if (!body.name || !body.email || !body.password || !body.role) {
      return NextResponse.json({ error: "Name, email, password, and role are required" }, { status: 400 })
    }

    // In a real implementation, this would create a user in the backend API
    // const response = await fetch(`${API_URL}/users`, {
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
      passwordHash: "hashed_" + body.password, // In a real app, use proper password hashing
      role: body.role,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    // Don't return the password hash in the response
    const { passwordHash, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
