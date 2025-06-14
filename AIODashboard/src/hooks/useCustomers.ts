import { useQuery } from "@tanstack/react-query";
import type { UserResponse, User } from "../types/Customers";

export const useCustomers = () => {
  return useQuery<UserResponse>({
    queryKey: ["customers"], // unique ID for caching
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/users?limit=30");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
};

export const useCustomerDetail = (id: string) => {
  return useQuery<User>({
    queryKey: ["customerDetail", id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    enabled: !!id, //  Prevents fetch if id is empty
  });
};
