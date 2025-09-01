import { useQuery } from "@tanstack/react-query";
// import type { OrdersResponse, Order } from "../types/Orders.ts";
import type { ApiResponse } from "../types";

const baseUrl =
  sessionStorage.getItem("role") === "localhost"
    ? "http://localhost:5000/api"
    : "https://aiodashboard-server.onrender.com/api";

export const useOrders = <T>() =>
  useQuery<ApiResponse<T>>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(baseUrl + "/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

export const useOrderDetail = <T>(id: string) =>
  useQuery<ApiResponse<T>>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/orders/${id}`);

      if (!res.ok) throw new Error(`Failed to fetch order '${id}'`);

      return res.json();
    },
    enabled: !!id,
  });
