import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

import { Box } from "@mui/material";

import { useProducts, useCustomers, useOrders } from "../../hooks/index.ts";
import Spinner from "../Spinner.tsx";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  // const users = useCustomers();
  const {
    data: users,
    isLoading: usersisLoading,
    isError: usersisError,
  } = useCustomers();
  const {
    data: products,
    isLoading: productsisLoading,
    isError: productsisError,
  } = useProducts();
  const {
    data: orders,
    isLoading: ordersisLoading,
    isError: ordersisError,
  } = useOrders();
  // const products = useProducts();
  // const orders = useOrders();

  const loading = usersisLoading || productsisLoading || ordersisLoading;

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
        users: users,
        products: products,
        orders: orders,
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
