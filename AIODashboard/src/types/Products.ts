import type { Sort } from "./EnhancedTable";

// TYPES FOR RESPONSE DATA -----------------------------
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  page: number;
}
export interface Product {
  _id: string;
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
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// TYPES FOR TABLE USE -----------------------------
export interface TableProduct {
  id: number;
  brand: string;
  stock: number;
  price: number;
  description: string;
  title: string;
  rating: number;
  action: any;
}
export interface ProductsHeadCell {
  disablePadding: boolean;
  id: keyof TableProduct;
  label: string;
  numeric: boolean;
  display?: {
    xs?: string | undefined;
    sm?: string | undefined;
    md?: string | undefined;
    lg?: string | undefined;
    xl?: string | undefined;
  };
}
export interface ProductsEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableProduct
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Sort;
  orderBy: string;
  rowCount: number;
}
