import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

import { Box } from "@mui/material";

import { useProducts, useCustomers, useOrders } from "../../hooks/index.ts";
import Spinner from "../Spinner.tsx";
import type { UsersResponse } from "../../types/Customers.ts";
import type { ProductsResponse } from "../../types/Products.ts";
import type { OrdersResponse } from "../../types/Orders.ts";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  // const users = useCustomers();
  const {
    data: users,
    isLoading: usersisLoading,
    isError: usersisError,
  } = useCustomers<UsersResponse>();
  const {
    data: products,
    isLoading: productsisLoading,
    isError: productsisError,
  } = useProducts<ProductsResponse>();
  const {
    data: orders,
    isLoading: ordersisLoading,
    isError: ordersisError,
  } = useOrders<OrdersResponse>();
  // const products = useProducts();
  // const orders = useOrders();

  const loading = usersisLoading || productsisLoading || ordersisLoading;
  console.log("ProtectedRoute users:", users);
  console.log("ProtectedRoute products:", products);
  console.log("ProtectedRoute orders:", orders);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <Spinner text="Loading data..." />;
      </Box>
    );
  }

  return isLoggedIn ? (
    <Outlet
      context={{
        users: users && users.data ? users.data : { customers: [] },
        products: products && products.data ? products.data : { products: [] },
        orders: orders && orders.data ? orders.data : { orders: [] },
        usersisError: usersisError,
        productsisError: productsisError,
        ordersisError,
        usersisLoading,
        productsisLoading,
        ordersisLoading,
      }}
    />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
