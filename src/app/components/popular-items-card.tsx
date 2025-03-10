import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export const PopularItemsCard = () => {
  return (
    <Card>
      <CardHeader title="Popular Items" />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {popularItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
  );
};

const popularItems = [
  { name: "Burger", count: 42, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Coffee", count: 38, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Pizza", count: 27, icon: <RestaurantIcon fontSize="small" /> },
  { name: "Fries", count: 23, icon: <RestaurantIcon fontSize="small" /> },
];
