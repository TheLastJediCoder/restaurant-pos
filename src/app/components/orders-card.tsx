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

export const OrdersCard = () => {
  return (
    <Card>
      <CardHeader title="Orders" />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ordersInProgress.map((order) => (
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
                      label={order.status === "ready" ? "Ready" : "Preparing"}
                      color={order.status === "ready" ? "primary" : "default"}
                      size="small"
                      variant={order.status === "ready" ? "filled" : "outlined"}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {order.customer} • {order.items} items
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" fontWeight="medium">
                    ${order.total.toFixed(2)}
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
                    <Typography variant="body2">{order.timeElapsed}</Typography>
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

const ordersInProgress = [
  {
    id: "ORD-001",
    customer: "John D.",
    items: 3,
    total: 24.99,
    status: "preparing",
    time: "10:30 AM",
    timeElapsed: "5m",
  },
  {
    id: "ORD-002",
    customer: "Sarah M.",
    items: 2,
    total: 15.5,
    status: "ready",
    time: "10:25 AM",
    timeElapsed: "10m",
  },
  {
    id: "ORD-003",
    customer: "Mike T.",
    items: 5,
    total: 42.75,
    status: "preparing",
    time: "10:20 AM",
    timeElapsed: "15m",
  },
  {
    id: "ORD-004",
    customer: "Emily R.",
    items: 1,
    total: 8.99,
    status: "ready",
    time: "10:15 AM",
    timeElapsed: "20m",
  },
  {
    id: "ORD-005",
    customer: "David K.",
    items: 4,
    total: 32.5,
    status: "preparing",
    time: "10:10 AM",
    timeElapsed: "25m",
  },
  {
    id: "ORD-006",
    customer: "David K.",
    items: 4,
    total: 32.5,
    status: "preparing",
    time: "10:10 AM",
    timeElapsed: "25m",
  },
  {
    id: "ORD-007",
    customer: "David K.",
    items: 4,
    total: 32.5,
    status: "preparing",
    time: "10:10 AM",
    timeElapsed: "25m",
  },
];
