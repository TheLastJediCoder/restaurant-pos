import { NextResponse } from "next/server"
import type { UpdateCategoryRequest } from "@/lib/types"
import { mockCategories } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/categories/:id
 * Get a category by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/categories/${id}`)
    // const data = await response.json()

    // Using mock data for demonstration
    const category = mockCategories.find((cat) => cat.id === id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

/**
 * PATCH /api/categories/:id
 * Update a category
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body: UpdateCategoryRequest = await request.json()

    // Validate request body
    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // In a real implementation, this would update a category in the backend API
    // const response = await fetch(`${API_URL}/categories/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const categoryIndex = mockCategories.findIndex((cat) => cat.id === id)

    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    mockCategories[categoryIndex] = {
      ...mockCategories[categoryIndex],
      name: body.name,
      description: body.description,
    }

    return NextResponse.json(mockCategories[categoryIndex])
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

/**
 * DELETE /api/categories/:id
 * Delete a category
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would delete a category in the backend API
    // const response = await fetch(`${API_URL}/categories/${id}`, {
    //   method: "DELETE",
    // })

    // Using mock data for demonstration
    const categoryIndex = mockCategories.findIndex((cat) => cat.id === id)

    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    mockCategories.splice(categoryIndex, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
