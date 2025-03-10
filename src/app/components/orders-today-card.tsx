import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export const OrderTodayCard = () => {
  return (
    <Card>
      <CardHeader
        title="Orders Today"
        action={<ShoppingBagIcon color="action" fontSize="small" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          48
        </Typography>
        <Typography variant="caption" color="text.secondary">
          +12% from yesterday
        </Typography>
      </CardContent>
    </Card>
  );
};
