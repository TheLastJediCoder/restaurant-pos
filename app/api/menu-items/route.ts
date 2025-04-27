import { NextRequest, NextResponse } from 'next/server';
import type { CreateMenuItemRequest, MenuItem } from '@/lib/types';
import { mockCategories, mockMenuItems } from '@/lib/mock-data';
import { generateId } from '@/lib/utils';

// Base API URL - would typically come from environment variables
const API_URL = process.env.BACKEND_API_URL;

/**
 * GET /api/menu-items
 * Get all menu items
 */
export async function GET(request: NextRequest) {
  try {
    const query = new URLSearchParams();

    const searchParams = request?.nextUrl?.searchParams;
    searchParams.forEach((value: any, key: string) => {
      query.set(key, value);
    });

    const response = await fetch(`${API_URL}/menu-items?${query.toString()}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

/**
 * POST /api/menu-items
 * Create a new menu item
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // In a real implementation, this would create a menu item in the backend API
    const response = await fetch(`${API_URL}/menu-items`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
