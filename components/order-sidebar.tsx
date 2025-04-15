"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/utils"
import type { MenuItem } from "@/lib/types"

interface OrderSidebarProps {
  orderItems: Array<{ menuItem: MenuItem; quantity: number; notes: string }>
  updateQuantity: (menuItemId: string, quantity: number) => void
  updateNotes: (menuItemId: string, notes: string) => void
  removeItem: (menuItemId: string) => void
}

/**
 * OrderSidebar component - Displays the current order and allows for checkout
 */
export function OrderSidebar({ orderItems, updateQuantity, updateNotes, removeItem }: OrderSidebarProps) {
  const router = useRouter()
  const [isNotesOpen, setIsNotesOpen] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate subtotal
  const total = orderItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)

  // Calculate tax (assuming 8.5% tax rate)
  // const taxRate = 0.085
  // const tax = subtotal * taxRate

  // Calculate total
  // const total = subtotal

  // Handle checkout
  const handleCheckout = async () => {
    if (orderItems.length === 0) return

    setIsProcessing(true)

    try {
      // Create order via API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems.map((item) => ({
            menuItemId: item.menuItem.id,
            quantity: item.quantity,
            notes: item.notes,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const data = await response.json();

      // Navigate to payment page
      router.push(`/pos/payments/${data.id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      // Show error message to user
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full md:w-96 border-l bg-background flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Current Order</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {orderItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No items in order</p>
            <p className="text-sm">Click on menu items to add them</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {orderItems.map((item) => (
              <li key={item.menuItem.id} className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.menuItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.menuItem.price)} each</p>
                    {item.notes && <p className="text-xs text-muted-foreground mt-1">Note: {item.notes}</p>}
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.menuItem.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setIsNotesOpen(item.menuItem.id)}
                    >
                      {item.notes ? "Edit Note" : "Add Note"}
                    </Button>
                    <span className="font-medium ml-2">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                  </div>
                </div>

                {isNotesOpen === item.menuItem.id && (
                  <div className="mt-2 relative">
                    <Textarea
                      placeholder="Add special instructions..."
                      className="text-sm"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.menuItem.id, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setIsNotesOpen(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t p-4">
        <div className="space-y-1.5">
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div> */}
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8.5%)</span>
            <span>{formatCurrency(tax)}</span>
          </div> */}
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button disabled={orderItems.length === 0 || isProcessing} onClick={handleCheckout}>
            {isProcessing ? "Processing..." : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  )
}
