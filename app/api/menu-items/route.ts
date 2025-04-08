import { NextResponse } from "next/server"
import type { CreateMenuItemRequest, MenuItem } from "@/lib/types"
import { mockCategories, mockMenuItems } from "@/lib/mock-data"
import { generateId } from "@/lib/utils"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/menu-items
 * Get all menu items
 */
export async function GET() {
  try {
    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/menu-items`)
    // const data = await response.json()

    // Using mock data for demonstration
    return NextResponse.json(mockMenuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

/**
 * POST /api/menu-items
 * Create a new menu item
 */
export async function POST(request: Request) {
  try {
    const body: CreateMenuItemRequest = await request.json()

    // Validate request body
    if (!body.name || !body.price === undefined || !body.description || !body.categoryId) {
      return NextResponse.json({ error: "Name, price, description, and categoryId are required" }, { status: 400 })
    }

    // In a real implementation, this would create a menu item in the backend API
    // const response = await fetch(`${API_URL}/menu-items`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const category = mockCategories.find((cat) => cat.id === body.categoryId)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const newMenuItem: MenuItem = {
      id: generateId(),
      name: body.name,
      price: body.price,
      description: body.description,
      imageUrl: "/placeholder.svg?height=200&width=200",
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category,
      categoryId: body.categoryId,
      orderItems: [],
    }

    mockMenuItems.push(newMenuItem)

    return NextResponse.json(newMenuItem, { status: 201 })
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}
