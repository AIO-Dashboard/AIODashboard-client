import { useQuery } from "@tanstack/react-query";
import type { OrdersResponse, Order } from "../types/Orders.ts";

export const useOrders = () =>
  useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        "https://aiodashboard-server.onrender.com/api/orders"
        // "http://localhost:5000/api/orders"
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

export const useOrderDetail = (id: string) =>
  useQuery<Order>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetch(
        `https://aiodashboard-server.onrender.com/api/orders/${id}`
        // `http://localhost:5000/api/orders/${id}`
      );

      if (!res.ok) throw new Error(`Failed to fetch order '${id}'`);

      return res.json();
    },
    enabled: !!id,
  });
