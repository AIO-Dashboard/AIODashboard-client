import { useOutletContext } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Accesses the context provided by the ProtectedRoute
  const { users, products, orders } = useOutletContext<{
    users: any[];
    products: any[];
    orders: any[];
  }>();

  console.log("Dashboard users:", users);
  console.log("Dashboard products:", products);
  console.log("Dashboard orders:", orders);
  // Use analytics.ts here

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
