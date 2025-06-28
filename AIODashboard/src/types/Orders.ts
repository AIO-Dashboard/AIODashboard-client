import type { Sort } from "./EnhancedTable";

export interface OrdersResponse {
  orders: Order[];
  total: number;
  skip: number;
  limit: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled" | string;
  statusHistory: StatusHistory[];
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  totalAmount: number;
  taxAmount: number;
  shippingCost: number;
  discounts: Discount[];
  paymentMethod: "Credit Card" | "PayPal" | "Cash on Delivery" | string;
  paymentStatus: "Paid" | "Unpaid" | "Failed" | string;
  transactionId: string;
  currency: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  deliveredAt: string | null;
  gift: boolean;
  giftMessage: string;
  riskScore: number;
  manualReview: boolean;
  notes: string;
  attachments: string[];
}

export interface StatusHistory {
  status: string;
  timestamp: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  role: "user" | "admin" | "moderator" | string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface OrderItem {
  productId: number;
  sku: string;
  title: string;
  category: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  returnEligible: boolean;
  reviewed: boolean;
}

export interface Discount {
  code: string;
  amount: number;
  type: "percentage" | "fixed" | string;
}

// TYPES FOR TABLE USE -----------------------------
export interface TableOrder {
  id: number;
  orderNumber: string;
  customer: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  paymentMethod: string;
  carrier: number;
  action: any;
}
export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableOrder;
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
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableOrder
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Sort;
  orderBy: string;
  rowCount: number;
}
