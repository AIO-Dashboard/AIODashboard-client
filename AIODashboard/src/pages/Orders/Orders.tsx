import { useOrders } from "../../hooks/useOrders";
import { Box } from "@mui/material";
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
  if (!data) {
    return <div>No orders found</div>;
  }
  return (
    <Box>
      <h1>Orders</h1>
      {isLoading ? (
        <Spinner text={"LOADING TABLE"} />
      ) : (
        <>{data && <OrdersTable {...data} />}</>
      )}
      {isError ? <>Error</> : ""}
    </Box>
  );
}
