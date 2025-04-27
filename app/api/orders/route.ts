import { NextResponse } from 'next/server';
import type { CreateOrderRequest } from '@/lib/types';

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL;

/**
 * GET /api/orders
 * Get all orders
 */
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/orders`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: Request) {
  try {
    const body: CreateOrderRequest = await request.json();

    // Validate request body
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required and must be a non-empty array' },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
