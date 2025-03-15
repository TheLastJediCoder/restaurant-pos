export interface Order {
  id: number;
  tableId: number | null;
  userName: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  menuId: number;
  quantity: number;
  price: number;
}
