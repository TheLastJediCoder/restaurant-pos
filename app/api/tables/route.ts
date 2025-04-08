import { NextResponse } from "next/server"
import { mockTables } from "@/lib/mock-data"
import { generateId } from "@/lib/utils"
import type { Table } from "@/lib/types"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/tables
 * Get all tables
 */
export async function GET() {
  try {
    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/tables`)
    // const data = await response.json()

    // Using mock data for demonstration
    return NextResponse.json(mockTables)
  } catch (error) {
    console.error("Error fetching tables:", error)
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 })
  }
}

/**
 * POST /api/tables
 * Create a new table
 */
export async function POST(request: Request) {
  try {
    const body: { name: string; capacity: number } = await request.json()

    // Validate request body
    if (!body.name || !body.capacity) {
      return NextResponse.json({ error: "Name and capacity are required" }, { status: 400 })
    }

    // In a real implementation, this would create a table in the backend API
    // const response = await fetch(`${API_URL}/tables`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const newTable: Table = {
      id: generateId(),
      name: body.name,
      capacity: body.capacity,
      status: "Available",
    }

    mockTables.push(newTable)

    return NextResponse.json(newTable, { status: 201 })
  } catch (error) {
    console.error("Error creating table:", error)
    return NextResponse.json({ error: "Failed to create table" }, { status: 500 })
  }
}
