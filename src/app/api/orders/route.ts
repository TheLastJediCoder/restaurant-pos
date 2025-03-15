import { Order, OrderItem } from "@/app/lib/interfaces";
import { getJsonData, OrderItemsFileName, OrdersFileName } from "../utils/read-write-json"

export async function GET(request: Request) {
  const orders = getJsonData<Order[]>(OrdersFileName);
  const orderItems = getJsonData<OrderItem[]>(OrderItemsFileName);

  for (const order of orders) {
    order.orderItems = [...orderItems.filter(orderItem => orderItem.orderId === order.orderId)];
  }

  return Response.json(orders)
}