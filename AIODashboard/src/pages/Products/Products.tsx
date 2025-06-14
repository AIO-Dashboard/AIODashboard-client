import { useProducts } from "../../hooks/useProducts";

import { CircularProgress, Box } from "@mui/material";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function Products() {
  const { data, isLoading, isError } = useProducts();
  // const first20 = data.slice(0, 20);
  console.log("Products:", data && data);
  return (
    <div>
      <h1>Products list</h1>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data &&
            data.products.map((product: Product) => (
              <li key={product.id}>{product.title}</li>
            ))}
        </>
      )}
      {isError ? <>Error</> : ""}
    </div>
  );
}
