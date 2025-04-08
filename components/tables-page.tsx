"use client"

import { useState, useEffect } from "react"
import { Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { OrderSidebar } from "@/components/order-sidebar"
import type { MenuItem, Table } from "@/lib/types"

/**
 * TablesPage component - Displays tables and their status
 */
export function TablesPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [currentOrder, setCurrentOrder] = useState<{
    items: Array<{ menuItem: MenuItem; quantity: number; notes: string }>
  }>({
    items: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tables")
        const data = await response.json()
        setTables(data)
      } catch (error) {
        console.error("Error fetching tables:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTables()
  }, [])

  // Filter tables by search query
  const filteredTables = tables.filter((table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Handle table selection
  const handleSelectTable = (tableId: string) => {
    setSelectedTable(tableId === selectedTable ? null : tableId)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-success-foreground"
      case "Occupied":
        return "bg-destructive text-destructive-foreground"
      case "Reserved":
        return "bg-amber-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Update table status
  const updateTableStatus = async (tableId: string, status: "Available" | "Occupied" | "Reserved") => {
    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update table status")
      }

      // Update local state
      setTables((prevTables) => prevTables.map((table) => (table.id === tableId ? { ...table, status } : table)))
    } catch (error) {
      console.error("Error updating table status:", error)
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
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tables</h1>
        </div>

        <div className="mb-4 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tables..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-grid">
          {filteredTables.map((table) => (
            <Card
              key={table.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedTable === table.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelectTable(table.id)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className={`w-full py-1 mb-2 text-xs font-medium ${getStatusColor(table.status)}`}>
                  {table.status}
                </div>
                <h3 className="font-semibold text-lg">{table.name}</h3>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{table.capacity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTable && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{tables.find((table) => table.id === selectedTable)?.name}</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => updateTableStatus(selectedTable, "Reserved")}>
                  Reserve
                </Button>
                <Button variant="outline" size="sm" onClick={() => updateTableStatus(selectedTable, "Available")}>
                  Mark as Available
                </Button>
                <Button variant="outline" size="sm" onClick={() => updateTableStatus(selectedTable, "Occupied")}>
                  Mark as Occupied
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <OrderSidebar
        orderItems={currentOrder.items}
        updateQuantity={(menuItemId, quantity) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) => (item.menuItem.id === menuItemId ? { ...item, quantity } : item)),
          }))
        }}
        updateNotes={(menuItemId, notes) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) => (item.menuItem.id === menuItemId ? { ...item, notes } : item)),
          }))
        }}
        removeItem={(menuItemId) => {
          setCurrentOrder((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.menuItem.id !== menuItemId),
          }))
        }}
      />
    </div>
  )
}
