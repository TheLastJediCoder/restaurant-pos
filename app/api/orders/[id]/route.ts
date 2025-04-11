import { NextResponse } from "next/server"
import type { OrderStatus, PaymentMethod } from "@/lib/types"

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL

/**
 * GET /api/orders/:id
 * Get an order by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const response = await fetch(`${API_URL}/orders/${id}`)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

/**
 * PATCH /api/orders/:id
 * Update an order status or payment method
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body: { status?: OrderStatus; paymentMethod?: PaymentMethod } = await request.json()
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
