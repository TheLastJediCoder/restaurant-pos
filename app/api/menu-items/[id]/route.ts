import { NextResponse } from "next/server"
import type { UpdateMenuItemRequest } from "@/lib/types"
import { mockCategories, mockMenuItems } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/menu-items/:id
 * Get a menu item by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/menu-items/${id}`)
    // const data = await response.json()

    // Using mock data for demonstration
    const menuItem = mockMenuItems.find((item) => item.id === id)

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 })
  }
}

/**
 * PATCH /api/menu-items/:id
 * Update a menu item
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body: UpdateMenuItemRequest = await request.json()

    // Validate request body
    if (!body.name || body.price === undefined || !body.description || !body.categoryId) {
      return NextResponse.json({ error: "Name, price, description, and categoryId are required" }, { status: 400 })
    }

    // In a real implementation, this would update a menu item in the backend API
    // const response = await fetch(`${API_URL}/menu-items/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const menuItemIndex = mockMenuItems.findIndex((item) => item.id === id)

    if (menuItemIndex === -1) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    const category = mockCategories.find((cat) => cat.id === body.categoryId)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    mockMenuItems[menuItemIndex] = {
      ...mockMenuItems[menuItemIndex],
      name: body.name,
      price: body.price,
      description: body.description,
      category,
      categoryId: body.categoryId,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockMenuItems[menuItemIndex])
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

/**
 * DELETE /api/menu-items/:id
 * Delete a menu item
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would delete a menu item in the backend API
    // const response = await fetch(`${API_URL}/menu-items/${id}`, {
    //   method: "DELETE",
    // })

    // Using mock data for demonstration
    const menuItemIndex = mockMenuItems.findIndex((item) => item.id === id)

    if (menuItemIndex === -1) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    mockMenuItems.splice(menuItemIndex, 1)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
