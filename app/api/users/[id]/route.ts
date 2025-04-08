import { NextResponse } from "next/server"
import type { UpdateUserRequest } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/users/:id
 * Get a user by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/users/${id}`)
    // const data = await response.json()

    // Using mock data for demonstration
    const user = mockUsers.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Don't return the password hash in the response
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

/**
 * PATCH /api/users/:id
 * Update a user
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body: UpdateUserRequest = await request.json()

    // In a real implementation, this would update a user in the backend API
    // const response = await fetch(`${API_URL}/users/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
      ...(body.password && { passwordHash: "hashed_" + body.password }), // In a real app, use proper password hashing
      ...(body.role && { role: body.role }),
    }

    // Don't return the password hash in the response
    const { passwordHash, ...userWithoutPassword } = mockUsers[userIndex]

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

/**
 * DELETE /api/users/:id
 * Delete a user
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would delete a user in the backend API
    // const response = await fetch(`${API_URL}/users/${id}`, {
    //   method: "DELETE",
    // })

    // Using mock data for demonstration
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    mockUsers.splice(userIndex, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
