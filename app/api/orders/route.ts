import { NextResponse } from "next/server"
import type { CreateOrderRequest } from "@/lib/types"
import { createOrder, mockOrders } from "@/lib/mock-data"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/orders
 * Get all orders
 */
export async function GET() {
  try {
    // In a real implementation, this would fetch from the backend API
    // const response = await fetch(`${API_URL}/orders`)
    // const data = await response.json()

    // Using mock data for demonstration
    return NextResponse.json(mockOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: Request) {
  try {
    const body: CreateOrderRequest = await request.json()

    // Validate request body
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Items are required and must be a non-empty array" }, { status: 400 })
    }

    // In a real implementation, this would create an order in the backend API
    // const response = await fetch(`${API_URL}/orders`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const data = await response.json()

    // Using mock data for demonstration
    const newOrder = createOrder(body.items)

    // Add table and customer if provided
    if (body.tableId) {
      newOrder.table = `Table ${body.tableId}`
    }

    mockOrders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
