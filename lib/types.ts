// Update the types.ts file to include Table type
export interface Table {
  id: string
  name: string
  capacity: number
  status: "Available" | "Occupied" | "Reserved"
}

// Category types
export interface Category {
  id: string
  name: string
  description: string
  active: boolean
  createdAt: string
  menuItems: MenuItem[]
}

export interface CreateCategoryRequest {
  name: string
  description: string
}

export interface UpdateCategoryRequest {
  name: string
  description: string
}

// MenuItem types
export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  inStock: boolean
  createdAt: string
  updatedAt: string
  category: Category
  categoryId: string
  orderItems: OrderItem[]
}

export interface CreateMenuItemRequest {
  name: string
  price: number
  description: string
  categoryId: string
}

export interface UpdateMenuItemRequest {
  name: string
  price: number
  description: string
  categoryId: string
}

// Order types
export type OrderStatus = "Placed" | "In Progress" | "Completed" | "Cancelled" | "Reserved"
export type PaymentMethod = "Cash" | "Credit Card" | "Mobile Payment"

export interface Order {
  id: string
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  createdAt: string
  updatedAt: string
  orderItems: OrderItem[]
  table?: string
  customer?: User
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  notes: string
  createdAt: string
  order: Order
  orderId: string
  menuItem: MenuItem
  menuItemId: string
}

export interface OrderItemRequest {
  menuItemId: string
  quantity: number
  notes: string
}

export interface CreateOrderRequest {
  items: OrderItemRequest[]
  tableId?: string
  customerId?: string
}

// User types
export type UserRole = "admin" | "manager" | "waiter" | "kitchen"

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  createdAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
  role?: UserRole
}

export interface LoginDto {
  email: string
  password: string
}
