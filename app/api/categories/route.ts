import { NextResponse } from "next/server"
import type { Category, CreateCategoryRequest } from "@/lib/types"
import { mockCategories } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/categories
 * Get all categories
 */
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/categories`)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

/**
 * POST /api/categories
 * Create a new category
 */
export async function POST(request: Request) {
  try {
    const body: CreateCategoryRequest = await request.json()

    // Validate request body
    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
