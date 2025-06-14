import type { Order } from "./EnhancedTable";

// TYPES FOR RESPONSE DATA -----------------------------
export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
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
  address: Address;
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

export interface Address {
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
  address: Address;
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

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableUser;
  label: string;
  numeric: boolean;
}
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableUser
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
