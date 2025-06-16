import { Grid, Link, Stack, Typography } from "@mui/material";
import { useOrderDetail } from "../../hooks/useOrders";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import StatusHistory from "./StatusHistory";
import OrderedItems from "./OrderedItems";

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
        <h1 style={{ marginBottom: 0 }}>Order Details</h1>
        <Typography variant="caption" gutterBottom>
          ({data.orderNumber})
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
            Estimated Delivery:{" "}
            {new Date(data.estimatedDelivery).toLocaleString()}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Delivered At: {data.deliveredAt}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StatusHistory statusHistory={data.statusHistory} />
        <OrderedItems items={data.items} currency={data.currency} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="overline" gutterBottom>
          <h2>Shipping & Billing</h2>
        </Typography>
        <Grid size={{ xs: 12 }} container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="overline" gutterBottom>
                Shipping
              </Typography>
              {/* Christopher West 1656 Eighth Street Denver, PA 63011 United States
              Phone: +49 968-571-2475 */}
              {/* customer.name shpiingAddress.address .city, .stateCode .postalCode .country 
              customer.phone */}
              <Typography variant="caption" gutterBottom>
                {data.customer.name}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {`${data.shippingAddress.address},
                ${data.shippingAddress.city}, ${data.shippingAddress.stateCode}
                ${data.shippingAddress.postalCode} ${data.shippingAddress.country}`}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {data.customer.phone}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="overline" gutterBottom>
                Billing
              </Typography>
              {data.shippingAddress.address !== data.billingAddress.address ? (
                <>
                  {" "}
                  <Typography variant="caption" gutterBottom>
                    {data.customer.name}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {`${data.shippingAddress.address},
                ${data.shippingAddress.city}, ${data.shippingAddress.stateCode}
                ${data.shippingAddress.postalCode} ${data.shippingAddress.country}`}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {data.customer.phone}
                  </Typography>
                </>
              ) : (
                <Typography variant="caption" gutterBottom>
                  Same as Shipping Address
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack direction={"column"}>
            <Typography variant="overline" gutterBottom>
              <h2>Customer Info</h2>
            </Typography>
            <Typography variant="caption" gutterBottom>
              {data.customer.name} ({data.customer.role})
            </Typography>
            <Typography variant="caption" gutterBottom>
              <Link href={`mailto:${data.customer.email}`}>
                {data.customer.email}
              </Link>
            </Typography>
            <Typography variant="caption" gutterBottom>
              {data.customer.phone}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
