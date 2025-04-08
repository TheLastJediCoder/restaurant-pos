import type { Category, MenuItem, Order, Table, User } from "./types"
import { generateId } from "./utils"

// Mock categories
export const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Main Dishes",
    description: "Main course meals",
    active: true,
    createdAt: new Date().toISOString(),
    menuItems: [],
  },
  {
    id: "cat2",
    name: "Appetizers",
    description: "Starters and small plates",
    active: true,
    createdAt: new Date().toISOString(),
    menuItems: [],
  },
  {
    id: "cat3",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    active: true,
    createdAt: new Date().toISOString(),
    menuItems: [],
  },
  {
    id: "cat4",
    name: "Beverages",
    description: "Drinks and refreshments",
    active: true,
    createdAt: new Date().toISOString(),
    menuItems: [],
  },
]

// Mock menu items
export const mockMenuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Spaghetti Carbonara",
    price: 14.99,
    description: "Classic Italian pasta with eggs, cheese, and pancetta",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[0],
    categoryId: "cat1",
    orderItems: [],
  },
  {
    id: "item2",
    name: "Margherita Pizza",
    price: 12.99,
    description: "Traditional pizza with tomato, mozzarella, and basil",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[0],
    categoryId: "cat1",
    orderItems: [],
  },
  {
    id: "item3",
    name: "Caesar Salad",
    price: 9.99,
    description: "Romaine lettuce with Caesar dressing and croutons",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[1],
    categoryId: "cat2",
    orderItems: [],
  },
  {
    id: "item4",
    name: "Garlic Bread",
    price: 4.99,
    description: "Toasted bread with garlic butter",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[1],
    categoryId: "cat2",
    orderItems: [],
  },
  {
    id: "item5",
    name: "Tiramisu",
    price: 7.99,
    description: "Italian dessert with coffee-soaked ladyfingers and mascarpone",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[2],
    categoryId: "cat3",
    orderItems: [],
  },
  {
    id: "item6",
    name: "Chocolate Cake",
    price: 6.99,
    description: "Rich chocolate cake with ganache",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[2],
    categoryId: "cat3",
    orderItems: [],
  },
  {
    id: "item7",
    name: "Iced Tea",
    price: 2.99,
    description: "Refreshing iced tea",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[3],
    categoryId: "cat4",
    orderItems: [],
  },
  {
    id: "item8",
    name: "Lemonade",
    price: 2.99,
    description: "Fresh squeezed lemonade",
    imageUrl: "/placeholder.svg?height=200&width=200",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategories[3],
    categoryId: "cat4",
    orderItems: [],
  },
]

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    passwordHash: "hashed_password",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    passwordHash: "hashed_password",
    role: "waiter",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user3",
    name: "Bob Johnson",
    email: "bob@example.com",
    passwordHash: "hashed_password",
    role: "kitchen",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user4",
    name: "Alice Brown",
    email: "alice@example.com",
    passwordHash: "hashed_password",
    role: "manager",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cust1",
    name: "Khaled Latte",
    email: "khaled@example.com",
    passwordHash: "hashed_password",
    role: "waiter",
    createdAt: new Date().toISOString(),
  },
]

// Mock tables
export const mockTables: Table[] = [
  {
    id: "table1",
    name: "Table 1",
    capacity: 2,
    status: "Available",
  },
  {
    id: "table2",
    name: "Table 2",
    capacity: 4,
    status: "Occupied",
  },
  {
    id: "table3",
    name: "Table 3",
    capacity: 6,
    status: "Reserved",
  },
  {
    id: "table4",
    name: "Table 4",
    capacity: 2,
    status: "Available",
  },
  {
    id: "table5",
    name: "Table 5",
    capacity: 4,
    status: "Available",
  },
  {
    id: "table6",
    name: "Table 6",
    capacity: 8,
    status: "Available",
  },
]

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "order1",
    total: 27.98,
    status: "Completed",
    paymentMethod: "Credit Card",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderItems: [
      {
        id: "orderItem1",
        quantity: 1,
        price: 14.99,
        notes: "Extra cheese",
        createdAt: new Date().toISOString(),
        order: {} as Order,
        orderId: "order1",
        menuItem: mockMenuItems[0],
        menuItemId: "item1",
      },
      {
        id: "orderItem2",
        quantity: 1,
        price: 12.99,
        notes: "",
        createdAt: new Date().toISOString(),
        order: {} as Order,
        orderId: "order1",
        menuItem: mockMenuItems[1],
        menuItemId: "item2",
      },
    ],
    table: "Table 2",
  },
  {
    id: "order2",
    total: 17.98,
    status: "In Progress",
    paymentMethod: "Cash",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderItems: [
      {
        id: "orderItem3",
        quantity: 1,
        price: 9.99,
        notes: "No croutons",
        createdAt: new Date().toISOString(),
        order: {} as Order,
        orderId: "order2",
        menuItem: mockMenuItems[2],
        menuItemId: "item3",
      },
      {
        id: "orderItem4",
        quantity: 1,
        price: 7.99,
        notes: "",
        createdAt: new Date().toISOString(),
        order: {} as Order,
        orderId: "order2",
        menuItem: mockMenuItems[4],
        menuItemId: "item5",
      },
    ],
    table: "Table 3",
    customer: mockUsers[4],
  },
]

// Function to create a new order
export function createOrder(items: { menuItemId: string; quantity: number; notes: string }[]): Order {
  const orderItems = items.map((item) => {
    const menuItem = mockMenuItems.find((mi) => mi.id === item.menuItemId)
    if (!menuItem) {
      throw new Error(`Menu item with ID ${item.menuItemId} not found`)
    }

    return {
      id: generateId(),
      quantity: item.quantity,
      price: menuItem.price * item.quantity,
      notes: item.notes,
      createdAt: new Date().toISOString(),
      order: {} as Order,
      orderId: "",
      menuItem,
      menuItemId: menuItem.id,
    }
  })

  const total = orderItems.reduce((sum, item) => sum + item.price, 0)

  const order: Order = {
    id: generateId(),
    total,
    status: "Placed",
    paymentMethod: "Cash",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderItems,
  }

  // Set the order reference in each order item
  orderItems.forEach((item) => {
    item.order = order
    item.orderId = order.id
  })

  return order
}
