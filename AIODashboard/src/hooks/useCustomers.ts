import { useQuery } from "@tanstack/react-query";
// import type { UserResponse, User } from "../types/Customers";
import type { ApiResponse } from "../types";

const baseUrl =
  sessionStorage.getItem("role") === "localhost"
    ? "http://localhost:5000/api"
    : "https://aiodashboard-server.onrender.com/api";

export const useCustomers = <T>() => {
  return useQuery<ApiResponse<T>>({
    queryKey: ["customers"], // unique ID for caching
    queryFn: async () => {
      const res = await fetch(baseUrl + "/customers");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes expiration
    refetchInterval: 1000 * 60 * 5, // refetches every 5 minutes
  });
};

export const useCustomerDetail = <T>(id: string) => {
  return useQuery<ApiResponse<T>>({
    queryKey: ["customerDetail", id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/customers/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch user '${id}'`);
      return res.json();
    },
    enabled: !!id, //  Prevents fetch if id is empty
    staleTime: 1000 * 60 * 3, // 3 minutes expiration
    refetchInterval: 1000 * 60 * 3, // refetches every 3 minutes
  });
};
