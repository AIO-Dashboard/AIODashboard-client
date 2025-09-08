import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Container } from "@mui/material";

import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
/*
import Sidebar from "./components/Sidebar/Sidebar";
import Toast from "./components/Toast/Toast";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import Products from "./pages/Products/Products";
import ProductCreate from "./pages/Products/ProductCreate";
import ProductDetail from "./pages/Products/ProductDetail";

import Orders from "./pages/Orders/Orders";
import OrderDetail from "./pages/Orders/OrderDetail";

import Customers from "./pages/Customer/Customers";
import CustomerDetail from "./pages/Customer/CustomerDetail";

import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound/NotFound";
*/
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const Toast = React.lazy(() => import("./components/Toast/Toast"));

const Login = React.lazy(() => import("./pages/Login/Login"));
// const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));  // causes ugly white flash

const Products = React.lazy(() => import("./pages/Products/Products"));
const ProductCreate = React.lazy(
  () => import("./pages/Products/ProductCreate")
);
const ProductDetail = React.lazy(
  () => import("./pages/Products/ProductDetail")
);

const Orders = React.lazy(() => import("./pages/Orders/Orders"));
const OrderDetail = React.lazy(() => import("./pages/Orders/OrderDetail"));

const Customers = React.lazy(() => import("./pages/Customer/Customers"));
const CustomerDetail = React.lazy(
  () => import("./pages/Customer/CustomerDetail")
);

const Settings = React.lazy(() => import("./pages/Settings"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext/AuthContext";

import { useColorScheme } from "@mui/material/styles";

const IntroBackdrop = React.lazy(
  () => import("./components/IntroBackdrop/IntroBackdrop.widget")
);

function App() {
  const { mode, setMode } = useColorScheme();
  // if (!mode) {
  //   return null;
  //   return <></>;
  // }

  const { isLoggedIn } = useAuth();
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  return (
    <>
      {/* <div> */}
      <IntroBackdrop />
      <Toast />
      <Header
        setisSidebarOpen={setisSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setisSidebarOpen={setisSidebarOpen}
      />
      <Container maxWidth="lg" sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <Routes>
          {/* Always redirect "/" to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* If logged in, redirect from /login to /dashboard */}
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* -metrics, quick links */}

            <Route path="/products" element={<Products />} />
            {/* -view, possibly edit & delete */}
            <Route path="/products/create" element={<ProductCreate />} />
            {/* -create */}
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* -view, edit, delete */}

            <Route path="/orders" element={<Orders />} />
            {/* -all orders */}
            <Route path="/orders/:id" element={<OrderDetail />} />
            {/* -details about one */}

            <Route path="/customers" element={<Customers />} />
            {/* -all customers */}
            <Route path="/customers/:id" element={<CustomerDetail />} />
            {/* -details about one, can see orders and redirect to OrderDetail */}

            <Route path="/settings" element={<Settings setMode={setMode} />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <br />
        <br />
        <br />
      </Container>
      {/* </div> */}
      <footer className={styles.footer}>@AIO Dashboard 2025</footer>
    </>
  );
}

export default App;
