import { Grid, Stack, Typography } from "@mui/material";
import { useOrderDetail } from "../../hooks/useOrders";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
export default function OrderDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useOrderDetail(id ? id : "");

  console.log("OrderDetail:", data && data);

  if (isLoading) {
    return <Spinner text="Loading order info..." />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" sx={{ m: 4 }}>
        Failed to load order details. Please try again later.
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" color="warning.main" sx={{ m: 4 }}>
        No order data found.
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: {
          xs: "5vw",
        },
      }}
    >
      <Stack direction="column" spacing={1}>
        <h1>Order Summary</h1>
      </Stack>
    </Grid>
  );
}
