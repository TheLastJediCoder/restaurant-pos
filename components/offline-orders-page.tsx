"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { formatCurrency, formatDate, formatTime } from "@/lib/utils"
import type { Order } from "@/lib/types"

/**
 * OfflineOrdersPage component - Displays orders that were created while offline
 */
export function OfflineOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)

        // In a real app, this would fetch from local storage or IndexedDB
        // For demo purposes, we'll fetch from the API
        const response = await fetch("/api/orders")
        const data = await response.json()

        // Filter to just show a few orders as "offline" orders
        setOrders(data.slice(0, 3))
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Filter orders by search query
  const filteredOrders = orders.filter(
    (order) =>
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.table && order.table.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.customer && order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Simulate syncing an order
  const syncOrder = async (orderId: string) => {
    try {
      // In a real app, this would sync the order with the backend
      // For demo purposes, we'll just remove it from the list
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error("Error syncing order:", error)
    }
  }

  // Simulate syncing all orders
  const syncAllOrders = async () => {
    try {
      // In a real app, this would sync all orders with the backend
      // For demo purposes, we'll just clear the list
      setOrders([])
    } catch (error) {
      console.error("Error syncing all orders:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-4 h-[calc(100vh-4rem)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Offline Orders</h1>
        <Button onClick={syncAllOrders} disabled={orders.length === 0}>
          Sync All Orders
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search offline orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Sync Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatTime(order.createdAt)}</TableCell>
                  <TableCell>{order.table || "N/A"}</TableCell>
                  <TableCell>{order.customer ? order.customer.name : "N/A"}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">Pending</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => syncOrder(order.id)}>
                      Sync
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No offline orders to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Sync Status</h2>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Last Sync</p>
              <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
            </div>
            <div>
              <p className="font-medium">Pending Orders</p>
              <p className="text-sm text-muted-foreground">{orders.length} orders</p>
            </div>
            <div>
              <p className="font-medium">Network Status</p>
              <p className="text-sm text-success">Online</p>
            </div>
            <Button onClick={syncAllOrders} disabled={orders.length === 0}>
              Sync All
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
