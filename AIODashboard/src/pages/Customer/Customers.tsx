import { useCustomers } from "../../hooks/useCustomers";

import { Box } from "@mui/material";

import CustomersTable from "./CustomersTable";

import Spinner from "../../components/Spinner";

export default function Customers() {
  const { data, isLoading, isError } = useCustomers();

  console.log("Customers:", data && data);
  return (
    <Box>
      <h1>Customer list</h1>
      {isLoading ? (
        <Spinner text={"LOADING TABLE"} />
      ) : (
        <>{data && <CustomersTable {...data} />}</>
      )}
      {isError ? <>Error</> : ""}
    </Box>
  );
}
