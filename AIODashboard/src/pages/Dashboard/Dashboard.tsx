import { useOutletContext } from "react-router-dom";

import { Grid } from "@mui/material";

import {
  getTotalRevenue,
  getTopProducts,
  getSalesOverTime,
  getAverageOrderValue,
  getLowStockProducts,
  getCategoryDistribution,
  getTopCustomers,
  getRepeatCustomerRatio,
} from "../../utils/analytics";

import { useMemo } from "react";
import type { UserResponse } from "../../types/Customers";
import type { OrdersResponse } from "../../types/Orders";
import type { ProductsResponse } from "../../types/Products";

export default function Dashboard() {
  // Accesses the context provided by the ProtectedRoute
  const {
    users: usersResponse,
    products: productsResponse,
    orders: ordersResponse,
  } = useOutletContext<{
    users: UserResponse;
    products: ProductsResponse;
    orders: OrdersResponse;
  }>();

  console.log("Dashboard usersResponse :", usersResponse);
  console.log("Dashboard productsResponse:", productsResponse);
  console.log("Dashboard ordersResponse:", ordersResponse);

  const users = usersResponse.users;
  const products = productsResponse.products;
  const orders = ordersResponse.orders;
  console.log("Dashboard users:", users);
  console.log("Dashboard products:", products);
  console.log("Dashboard orders:", orders);

  // ----- ANALYTICS: useMemo Calculations -----

  // Get products with dangerously low stock
  const lowStockProducts = useMemo(
    () => getLowStockProducts(products, 10),
    [products]
  );

  // Total revenue from all orders
  const totalRevenue = useMemo(() => getTotalRevenue(orders), [orders]);

  // Products ranked by units sold
  const topProducts = useMemo(
    () => getTopProducts(orders, products),
    [orders, products]
  );

  // Daily sales trend
  const salesOverTime = useMemo(() => getSalesOverTime(orders), [orders]);

  // Customers ranked by total spend
  const topCustomers = useMemo(() => getTopCustomers(orders), [orders]);

  // Number of products per category
  const categoryDist = useMemo(
    () => getCategoryDistribution(products),
    [products]
  );

  // Average value per order
  const avgOrderValue = useMemo(() => getAverageOrderValue(orders), [orders]);

  // Percentage of customers with >1 purchase
  const repeatPurchaseRatio = useMemo(
    () => getRepeatCustomerRatio(orders),
    [orders]
  );

  // ----- DEV LOGGING -----
  console.log(
    "%c📊 ============== DASHBOARD ANALYTICS ============== ",
    "color: #1976d2; font-weight: bold;"
  );
  console.log("🧾 Total Revenue:", totalRevenue);
  console.log("📦 Top Products:", topProducts);
  console.log("📈 Sales Over Time:", salesOverTime);
  console.log("👥 Top Customers:", topCustomers);
  console.log("📊 Category Distribution:", categoryDist);
  console.log("💰 Average Order Value:", avgOrderValue.toFixed(2));
  console.log(
    "🔁 Repeat Purchase Ratio:",
    `${(repeatPurchaseRatio * 100).toFixed(1)}%`
  );
  console.log("⚠️ Low Stock Products:", lowStockProducts);

  return (
    <>
      {/* <Grid container size={{ xs: 12 }}> */}
      <Grid size={{ xs: 12 }}>
        <h1>Dashboard</h1>
      </Grid>
      {/* <Grid size={{ xs: 6 }}> */}
    </>
  );
}
