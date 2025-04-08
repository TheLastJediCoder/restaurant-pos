"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderSidebar } from "@/components/order-sidebar"
import { CreateCategoryDialog } from "@/components/create-category-dialog"
import { CreateMenuItemDialog } from "@/components/create-menu-item-dialog"
import { formatCurrency } from "@/lib/utils"
import type { Category, MenuItem } from "@/lib/types"

/**
 * MenuPage component - Displays menu items in a grid with categories as tabs
 * and allows users to add items to the current order
 */
export function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentOrder, setCurrentOrder] = useState<{
    items: Array<{ menuItem: MenuItem; quantity: number; notes: string }>
  }>({
    items: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch categories and menu items
  const fetchData = async () => {
    try {
      setIsLoading(true)

      // Fetch categories
      const categoriesResponse = await fetch("/api/categories")
      const categoriesData = await categoriesResponse.json()

      // Fetch menu items
      const menuItemsResponse = await fetch("/api/menu-items")
      const menuItemsData = await menuItemsResponse.json()

      setCategories(categoriesData)
      setMenuItems(menuItemsData)

      // Set default selected category if categories exist
      if (categoriesData.length > 0 && selectedCategory === "all") {
        setSelectedCategory("all")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filter menu items by selected category and search query
  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "all" || item.categoryId === selectedCategory) &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Add item to current order
  const addToOrder = (menuItem: MenuItem) => {
    setCurrentOrder((prev) => {
      const existingItemIndex = prev.items.findIndex((item) => item.menuItem.id === menuItem.id)

      if (existingItemIndex >= 0) {
        // Item already exists, increment quantity
        const updatedItems = [...prev.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return { ...prev, items: updatedItems }
      } else {
        // Add new item
        return {
          ...prev,
          items: [...prev.items, { menuItem, quantity: 1, notes: "" }],
        }
      }
    })
  }

  // Remove item from current order
  const removeFromOrder = (menuItemId: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.menuItem.id !== menuItemId),
    }))
  }

  // Update item quantity in current order
  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(menuItemId)
      return
    }

    setCurrentOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.menuItem.id === menuItemId ? { ...item, quantity } : item)),
    }))
  }

  // Update item notes in current order
  const updateNotes = (menuItemId: string, notes: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.menuItem.id === menuItemId ? { ...item, notes } : item)),
    }))
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
        <div className="mb-4 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search menu..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 ml-4">
            <CreateCategoryDialog onCategoryCreated={fetchData} />
            <CreateMenuItemDialog onMenuItemCreated={fetchData} />
          </div>
        </div>

        <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="pos-grid">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addToOrder(item)}
                >
                  <div className="aspect-square relative">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                    <p className="font-semibold mt-1">{formatCurrency(item.price)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="pos-grid">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToOrder(item)}
                  >
                    <div className="aspect-square relative">
                      <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                      <p className="font-semibold mt-1">{formatCurrency(item.price)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <OrderSidebar
        orderItems={currentOrder.items}
        updateQuantity={updateQuantity}
        updateNotes={updateNotes}
        removeItem={removeFromOrder}
      />
    </div>
  )
}
