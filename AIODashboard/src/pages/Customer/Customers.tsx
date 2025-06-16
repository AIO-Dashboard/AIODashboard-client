import { useCustomers } from "../../hooks/useCustomers";

import { Box, Typography } from "@mui/material";

import CustomersTable from "./CustomersTable";

import Spinner from "../../components/Spinner";

export default function Customers() {
  const { data, isLoading, isError } = useCustomers();

  console.log("Customers:", data && data);
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
        No customer found.
      </Typography>
    );
  }

  return (
    <Box>
      <h1>Customers</h1>
      <CustomersTable {...data} />
    </Box>
  );
}
