import { Grid, Link, Stack, Typography } from "@mui/material";
import { useOrderDetail } from "../../hooks/index";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import StatusHistory from "./StatusHistory";
import OrderedItems from "./OrderedItems";

import type { Order } from "../../types/Orders";

export default function OrderDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useOrderDetail<Order>(id ? id : "");
  const order = data && data.data;
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

  if (!data || !order) {
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
          ({order.orderNumber})
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="caption" gutterBottom>
            Total Amount: {order.totalAmount.toFixed(2)} {order.currency}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Payment Status: {order.paymentStatus}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Payment Method: {order.paymentMethod}
          </Typography>

          <Typography variant="caption" gutterBottom>
            Transaction ID: {order.transactionId}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Order Date: {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="caption" gutterBottom>
            Status: {order.status}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Tracking No.: {order.trackingNumber || "N/A"}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Carrier: {order.carrier}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Estimated Delivery:{" "}
            {new Date(order.estimatedDelivery).toLocaleString()}
          </Typography>
          <Typography variant="caption" gutterBottom>
            Delivered At: {order.deliveredAt}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StatusHistory statusHistory={order.statusHistory} />
        <OrderedItems items={order.items} currency={order.currency} />
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
                {order.customer.name}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {`${order.shippingAddress.address},
                ${order.shippingAddress.city}, ${order.shippingAddress.stateCode}
                ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {order.customer.phone}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="overline" gutterBottom>
                Billing
              </Typography>
              {order.shippingAddress.address !==
              order.billingAddress.address ? (
                <>
                  {" "}
                  <Typography variant="caption" gutterBottom>
                    {order.customer.name}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {`${order.shippingAddress.address},
                ${order.shippingAddress.city}, ${order.shippingAddress.stateCode}
                ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {order.customer.phone}
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
              {order.customer.name} ({order.customer.role})
            </Typography>
            <Typography variant="caption" gutterBottom>
              <Link href={`mailto:${order.customer.email}`}>
                {order.customer.email}
              </Link>
            </Typography>
            <Typography variant="caption" gutterBottom>
              {order.customer.phone}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
