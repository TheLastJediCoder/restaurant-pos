import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export const TotalSalesCard = () => {
  return (
    <Card>
      <CardHeader
        title="Today's Sales"
        action={<CurrencyRupeeIcon color="action" fontSize="small" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          $1,245.89
        </Typography>
        <Typography variant="caption" color="text.secondary">
          +18% from yesterday
        </Typography>
      </CardContent>
    </Card>
  );
};
