import { useProducts } from "../../hooks/useProducts";

import { CircularProgress, Box } from "@mui/material";
import ProductsTable from "./ProductsTable";

export default function Products() {
  const { data, isLoading, isError } = useProducts();

  console.log("Products:", data && data);
  return (
    <div>
      <h1>Products list</h1>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>{data && <ProductsTable {...data} />}</>
      )}
      {isError ? <>Error</> : ""}
    </div>
  );
}
