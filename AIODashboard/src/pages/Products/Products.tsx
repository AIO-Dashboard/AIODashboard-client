import { useProducts } from "../../hooks/useProducts";

import { Box } from "@mui/material";

import ProductsTable from "./ProductsTable";

import Spinner from "../../components/Spinner";

export default function Products() {
  const { data, isLoading, isError } = useProducts();

  console.log("Products:", data && data);
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
      }}
    >
      <h1>Products list</h1>
      {isLoading ? <Spinner /> : <>{data && <ProductsTable {...data} />}</>}
      {isError ? <>Error</> : ""}
    </Box>
  );
}
