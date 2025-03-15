import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { Order } from "../lib/interfaces";

export const OrdersCard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch("api/orders");
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Card>
      <CardHeader title="Orders" />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order) => (
            <Paper
              key={order.id}
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { bgcolor: "action.hover" },
                transition: "background-color 0.2s",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {order.id}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={order.status === "ready" ? "primary" : "default"}
                      size="small"
                      variant={order.status === "ready" ? "filled" : "outlined"}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {order.tableId && `Table ${order.tableId} • `}{order.orderItems.length} items
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" fontWeight="medium">
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ mr: 0.5, fontSize: 16 }}
                    />
                    <Typography variant="body2">{order.createdAt}</Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
