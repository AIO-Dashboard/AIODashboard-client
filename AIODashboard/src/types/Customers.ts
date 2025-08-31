import type { Sort } from "./EnhancedTable";

// TYPES FOR RESPONSE DATA -----------------------------
export interface UserResponse {
  customers: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female" | string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string; // e.g. "1996-5-30"
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: CustomerAddress;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: "admin" | "moderator" | "user" | string;
}

export interface CustomerAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface Bank {
  cardExpire: string; // e.g. "03/26"
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: CustomerAddress;
}

// TYPES FOR TABLE USE -----------------------------
export interface TableUser {
  id: number;
  name: string; // full name: firstName + lastName
  email: string;
  phone: string;
  username: string;
  age: number;
  address: string; // derived from city + state or full address
  company: string;
  role: "admin" | "moderator" | "user";
  action?: React.ReactNode; // action buttons (edit/view/delete etc.)
}

export interface CustomerHeadCell {
  disablePadding: boolean;
  id: keyof TableUser;
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
export interface CustomerEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableUser
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Sort;
  orderBy: string;
  rowCount: number;
}
