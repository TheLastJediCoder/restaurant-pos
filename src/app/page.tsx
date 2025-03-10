"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
    id: "ORD-005",
    customer: "David K.",
    items: 4,
    total: 32.5,
    status: "preparing",
    time: "10:10 AM",
    timeElapsed: "25m",
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
];

// Sample popular items
const popularItems = [
  { name: "Burger", count: 42, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Coffee", count: 38, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Pizza", count: 27, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Fries", count: 23, icon: <RestaurantIcon fontSize="small" /> },
];

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={3}>
          <Card>
            <CardHeader
              title="Today's Sales"
              action={<CurrencyRupeeIcon color="action" fontSize="small" />}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                $1,245.89
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +18% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardHeader
              title="Orders Today"
              action={<ShoppingBagIcon color="action" fontSize="small" />}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                48
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +12% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardHeader
              title="Avg. Order Value"
              action={<TrendingUpIcon color="action" fontSize="small" />}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                $25.95
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +5% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardHeader
              title="Customers"
              action={<PeopleIcon color="action" fontSize="small" />}
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                36
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +8% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={7}>
          <Card>
            <CardHeader title="Orders in Progress" />
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body1" fontWeight="medium">
                            {order.id}
                          </Typography>
                          <Chip
                            label={
                              order.status === "ready" ? "Ready" : "Preparing"
                            }
                            color={
                              order.status === "ready" ? "primary" : "default"
                            }
                            size="small"
                            variant={
                              order.status === "ready" ? "filled" : "outlined"
                            }
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
                          <Typography variant="body2">
                            {order.timeElapsed}
                          </Typography>
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
        </Grid>
        <Grid size={5}>
          <Grid container spacing={3} direction="column">
            <Grid>
              <Card>
                <CardHeader title="Popular Items" />
                <CardContent>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {popularItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {item.icon}
                          <Typography>{item.name}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            width: "40%",
                          }}
                        >
                          <Typography variant="body2" fontWeight="medium">
                            {item.count} sold
                          </Typography>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress
                              variant="determinate"
                              value={(item.count / popularItems[0].count) * 100}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
