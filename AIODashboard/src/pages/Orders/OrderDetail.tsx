import { Grid, Stack, Typography } from "@mui/material";
import { useOrderDetail } from "../../hooks/useOrders";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import StatusHistory from "./StatusHistory";
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
      <Grid size={{ xs: 12 }}>
        <h1>Order Summary</h1>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="caption" gutterBottom>
            Total Amount: {data.totalAmount.toFixed(2)} {data.currency}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Payment Status: {data.paymentStatus}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Payment Method: {data.paymentMethod}
          </Typography>

          <Typography variant="caption" gutterBottom>
            Transaction ID: {data.transactionId}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Order Date: {new Date(data.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Order Number: {data.orderNumber}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="caption" gutterBottom>
            Status: {data.status}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Tracking No.: {data.trackingNumber || "N/A"}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Carrier: {data.carrier}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Estimated Delivery: {data.estimatedDelivery}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Delivered At: {data.deliveredAt}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="overline" gutterBottom>
          Status History
        </Typography>
        <StatusHistory statusHistory={data.statusHistory} />
      </Grid>
    </Grid>
  );
}
