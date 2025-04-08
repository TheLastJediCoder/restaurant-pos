import { NextResponse } from "next/server"
import type { LoginDto } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * POST /api/auth/login
 * Authenticate a user
 */
export async function POST(request: Request) {
  try {
    const body: LoginDto = await request.json()

    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real implementation, this would authenticate with the backend API
    // const response = await fetch(`${API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const user = mockUsers.find((u) => u.email === body.email && u.passwordHash === "hashed_" + body.password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Don't return the password hash in the response
    const { passwordHash, ...userWithoutPassword } = user

    // In a real app, generate a JWT token here
    const token = "mock_jwt_token"

    return NextResponse.json({ token, user: userWithoutPassword })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 })
  }
}
