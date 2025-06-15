import { useProducts } from "../../hooks/useProducts";

import { Box } from "@mui/material";

import ProductsTable from "./ProductsTable";

import Spinner from "../../components/Spinner";

export default function Products() {
  const { data, isLoading, isError } = useProducts();

  console.log("Products:", data && data);
  return (
    <Box>
      <h1>Products</h1>
      {isLoading ? (
        <Spinner text={"LOADING TABLE"} />
      ) : (
        <>{data && <ProductsTable {...data} />}</>
      )}
      {isError ? <>Error</> : ""}
    </Box>
  );
}
