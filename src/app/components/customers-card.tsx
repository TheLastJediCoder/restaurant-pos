import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

export const CustomersCard = () => {
  return (
    <Card>
      <CardHeader
        title="Customers"
        action={<PeopleIcon color="action" fontSize="small" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          36
        </Typography>
        <Typography variant="caption" color="text.secondary">
          +8% from yesterday
        </Typography>
      </CardContent>
    </Card>
  );
};
