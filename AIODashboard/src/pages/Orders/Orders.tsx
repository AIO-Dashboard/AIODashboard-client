import { useOrders } from "../../hooks/useOrders";
import { Box, Typography } from "@mui/material";
import OrdersTable from "./OrdersTable";
import Spinner from "../../components/Spinner";

export default function Orders() {
  const { data, isLoading, isError } = useOrders();
  console.log("Orders:", data && data);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error loading orders</div>;
  // }

  if (isLoading) {
    return <Spinner text="Loading table..." />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" sx={{ m: 4 }}>
        Failed to load table. Please try again later.
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" color="warning.main" sx={{ m: 4 }}>
        No orders found.
      </Typography>
    );
  }

  return (
    <Box>
      <h1>Orders</h1>
      <OrdersTable {...data} />
    </Box>
  );
}
