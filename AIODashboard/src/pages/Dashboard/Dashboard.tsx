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

import KPICards from "./KPICards";
import SalesChart from "./SalesChart";
import CategoriesPieChart from "./CategoriesPieChart";
import CategoriesList from "./CategoriesList";

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

  // Test
  // function aveOrderVal() {
  //   let total = 0;
  //   for (const order of orders) {
  //     total += order.totalAmount;
  //   }
  //   console.log(
  //     "Average Order Value 2:",
  //     orders.length,
  //     total,
  //     total / orders.length
  //   );
  // }
  // aveOrderVal();

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
    "%c📊 ============== DASHBOARD ANALYTICS START ============== ",
    "color: #1976d2; font-weight: bold;"
  );
  console.log("/🧾 Total Revenue:", totalRevenue);
  console.log("📦 Top Products:", topProducts);
  console.log("/📈 Sales Over Time:", salesOverTime);
  console.log("👥 Top Customers:", topCustomers);
  console.log("📊 Category Distribution:", categoryDist);
  console.log("/💰 Average Order Value:", avgOrderValue.toFixed(2));
  console.log(
    "/🔁 Repeat Purchase Ratio:",
    `${(repeatPurchaseRatio * 100).toFixed(1)}%`
  );
  console.log("⚠️ Low Stock Products:", lowStockProducts);
  console.log(
    "%c📊 ============== DASHBOARD ANALYTICS END============== ",
    "color: #1976d2; font-weight: bold;"
  );
  return (
    <>
      {/* <Grid container size={{ xs: 12 }}> */}
      <Grid size={{ xs: 12 }}>
        <h1>Dashboard</h1>
        {/* | [💰 Revenue] [🧾 AOV] [🔁 Loyalty] [⚠️ Low Stock#]  | <- KPI Cards (4 cols) */}
        <KPICards
          totalRevenue={totalRevenue.toFixed(2)}
          avgOrderValue={avgOrderValue.toFixed(2)}
          lowStockProducts={lowStockProducts.length} // turns red-amber-green
          // lowStockProducts={26}
          repeatPurchaseRatio={repeatPurchaseRatio} // turns red-amber-green
          // repeatPurchaseRatio={0.11}
        />
        <SalesChart salesOverTime={salesOverTime} />
        {/* |         📊 Category Pie        |   🏆 Top Products |
|                                |   👥 Top Customers| */}
        <Grid container sx={{ paddingTop: 2 }}>
          <Grid size={{ xs: 12 }}>
            <h2>Category Distribution</h2>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8 }}>
            <CategoriesPieChart categoryDist={categoryDist} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <CategoriesList categoryDist={categoryDist} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>Top prod</Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>Top customer</Grid>
        </Grid>
      </Grid>
      {/* <Grid size={{ xs: 6 }}> */}
    </>
  );
}
