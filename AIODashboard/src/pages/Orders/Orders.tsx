// import { useOrders } from "../../hooks/index";
import { useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import OrdersTable from "./OrdersTable";
import Spinner from "../../components/Spinner";
import type { OrdersResponse } from "../../types/Orders";

export default function Orders() {
  // const { data, isLoading, isError } = useOrders();
  const {
    orders: data,
    ordersisLoading: isLoading,
    isError,
  } = useOutletContext<{
    orders: OrdersResponse;
    ordersisLoading: boolean;
    isError: boolean;
  }>();

  console.log("Orders:", data && data);

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
