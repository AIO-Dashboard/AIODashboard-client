// import { useProducts } from "../../hooks/useProducts";
import { useOutletContext } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import ProductsTable from "./ProductsTable";

import Spinner from "../../components/Spinner";
import type { ProductsResponse } from "../../types/Products";

export default function Products() {
  // const { data, isLoading, isError } = useProducts();
  const {
    products: data,
    productsisLoading: isLoading,
    productsisError: isError,
  } = useOutletContext<{
    products: ProductsResponse;
    productsisLoading: boolean;
    productsisError: boolean;
  }>();

  console.log("Products:", data && data);
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
        No product found.
      </Typography>
    );
  }

  return (
    <Box>
      <h1>Products</h1>
      <ProductsTable {...data} />
    </Box>
  );
}
