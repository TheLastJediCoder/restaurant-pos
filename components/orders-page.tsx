"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";
import { useRouter } from "next/navigation";

/**
 * OrdersPage component - Displays a list of orders with filtering and details
 */
export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const router = useRouter();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsProcessing(true);
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by search query and status
  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "All" || order.status === statusFilter) &&
      (searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.table &&
          order.table.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.customer &&
          order.customer.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())))
  );

  // Get status badge color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-amber-500 text-white";
      case "Placed":
        return "bg-blue-500 text-white";
      case "Cancelled":
        return "bg-destructive text-destructive-foreground";
      case "Reserved":
        return "bg-purple-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleCheckout = async () => {
    if (!selectedOrderData || selectedOrderData.orderItems.length === 0) return

    router.push(`/pos/payments/${selectedOrderData.id}`)
  }
  
  // Get selected order
  const selectedOrderData = orders.find((order) => order.id === selectedOrder);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 h-[calc(100vh-4rem)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button onClick={() => router.push("/pos")}>New Order</Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Status: {statusFilter}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Placed")}>
              Placed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
              Cancelled
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Reserved")}>
              Reserved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={`cursor-pointer ${
                      selectedOrder === order.id ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{formatTime(order.createdAt)}</TableCell>
                    <TableCell>{order.table || "N/A"}</TableCell>
                    <TableCell>
                      {order.customer ? order.customer.name : "N/A"}
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {selectedOrderData && (
          <div>
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Order ID
                  </h3>
                  <p>{selectedOrderData.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Date & Time
                  </h3>
                  <p>
                    {formatDate(selectedOrderData.createdAt)},{" "}
                    {formatTime(selectedOrderData.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedOrderData.status
                      )}`}
                    >
                      {selectedOrderData.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(selectedOrderData.id, "Placed")
                          }
                        >
                          Placed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(
                              selectedOrderData.id,
                              "In Progress"
                            )
                          }
                        >
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(selectedOrderData.id, "Completed")
                          }
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(selectedOrderData.id, "Cancelled")
                          }
                        >
                          Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Payment Method
                  </h3>
                  <p>{selectedOrderData.paymentMethod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Items
                  </h3>
                  <ul className="space-y-2 mt-2">
                    {selectedOrderData.orderItems.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.menuItem.name}
                          {item.notes && (
                            <span className="text-xs text-muted-foreground block">
                              Note: {item.notes}
                            </span>
                          )}
                        </span>
                        <span>{formatCurrency(item.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrderData.total)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                {selectedOrderData.paymentPending ? (
                    <Button
                      disabled={selectedOrderData.orderItems.length === 0 || isProcessing}
                      onClick={handleCheckout}
                    >
                      {isProcessing ? "Processing..." : "Payment"}
                    </Button>
                ) : (
                  <Button variant="outline">Print Receipt</Button>
                )}
                <Button>Update Status</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
