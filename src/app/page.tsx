"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { TotalSalesCard } from "./components/total-sales-card";
import { OrderTodayCard } from "./components/orders-today-card";
import { AvgOrderValueCard } from "./components/avg-order-value-card";
import { CustomersCard } from "./components/customers-card";
import { OrdersCard } from "./components/orders-card";
import { PopularItemsCard } from "./components/popular-items-card";


export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={3}>
          <TotalSalesCard />
        </Grid>
        <Grid size={3}>
          <OrderTodayCard />
        </Grid>
        <Grid size={3}>
          <AvgOrderValueCard />
        </Grid>
        <Grid size={3}>
          <CustomersCard />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={7}>
          <OrdersCard />
        </Grid>
        <Grid size={5}>
          <PopularItemsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
