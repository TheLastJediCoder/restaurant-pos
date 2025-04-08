import { NextResponse } from "next/server"
import { mockTables } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/tables/:id
 * Get a table by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/tables/${id}`)
    // const data = await response.json()

    // Using mock data for demonstration
    const table = mockTables.find((t) => t.id === id)

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 })
    }

    return NextResponse.json(table)
  } catch (error) {
    console.error("Error fetching table:", error)
    return NextResponse.json({ error: "Failed to fetch table" }, { status: 500 })
  }
}

/**
 * PATCH /api/tables/:id
 * Update a table status
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body: { status?: "Available" | "Occupied" | "Reserved"; name?: string; capacity?: number } =
      await request.json()

    // In a real implementation, this would update a table in the backend API
    // const response = await fetch(`${API_URL}/tables/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const tableIndex = mockTables.findIndex((t) => t.id === id)

    if (tableIndex === -1) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 })
    }

    mockTables[tableIndex] = {
      ...mockTables[tableIndex],
      ...body,
    }

    return NextResponse.json(mockTables[tableIndex])
  } catch (error) {
    console.error("Error updating table:", error)
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 })
  }
}

/**
 * DELETE /api/tables/:id
 * Delete a table
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would delete a table in the backend API
    // const response = await fetch(`${API_URL}/tables/${id}`, {
    //   method: "DELETE",
    // })

    // Using mock data for demonstration
    const tableIndex = mockTables.findIndex((t) => t.id === id)

    if (tableIndex === -1) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 })
    }

    mockTables.splice(tableIndex, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting table:", error)
    return NextResponse.json({ error: "Failed to delete table" }, { status: 500 })
  }
}
