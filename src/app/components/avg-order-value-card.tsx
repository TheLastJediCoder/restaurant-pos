import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const AvgOrderValueCard = () => {
  return (
    <Card>
      <CardHeader
        title="Avg. Order Value"
        action={<TrendingUpIcon color="action" fontSize="small" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          $25.95
        </Typography>
        <Typography variant="caption" color="text.secondary">
          +5% from yesterday
        </Typography>
      </CardContent>
    </Card>
  );
};
